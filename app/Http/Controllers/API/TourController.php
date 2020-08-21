<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Tour;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use ZipArchive;

class TourController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param string $status
     * @param null $parent_id
     * @return JsonResponse
     */
    public function index($status, $parent_id = NULL)
    {
        // Access check
        if ($status !== "published" && !auth()->guard('api')->check()) {
            return response()->json([
                "status" => "fail",
                "data" => ["status" => "Access denied"]
            ], 403);
        }
        // Get tours
        if ($status === "published") {
            $tours = Tour::where([
                'parent_id' => $parent_id,
                'status' => $status
            ])->get();
        } else {
            $tours = Tour::where(['status' => $status])->get()->each(function ($tour) {
                if ($tour->parent_id !== null)
                    $tour['parent_name'] = Tour::find($tour->parent_id)->title;
                else  $tour['parent_name'] = "Главная";
            });
        }
        // Get path to root of the current parent_id
        $breadcrumbs = [];
        if ($parent_id !== NULL) {
            $section = Tour::where('id', $parent_id)->first();
            array_push($breadcrumbs, $section);

            while ($section->parent_id !== NULL) {
                $section = Tour::where('id', $section->parent_id)->first();
                array_push($breadcrumbs, $section);
            }
        }

        return response()->json([
            "status" => "success",
            "data" => [
                "tours" => $tours,
                "breadcrumbs" => $breadcrumbs
            ]
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return JsonResponse
     */
    public function store()
    {
        $tour = new Tour;
        if (request('parent_id') !== "null") $tour->parent_id = request('parent_id');
        $tour->title = request('title');
        $tour->description = request('description');

        $path = request()->file('image')->storeAs('images_tours/', request()->file('image')->getClientOriginalName(), 'public');
        $tour->image_url = '/storage/' . $path;
        unset(request()->image);

        $tour->isSection = request('isSection');
        if ($tour->isSection === "false") {
            if (request('source_url') !== 'undefined') $tour->source_url = request('source_url');
            if (request('address') !== 'undefined') $tour->address = request('address');
            if (request('organization_name') !== 'undefined') $tour->organization_name = request('organization_name');
            if (request('organization_phone') !== 'undefined') $tour->organization_phone = request('organization_phone');
            if (request('organization_email') !== 'undefined') $tour->organization_email = request('organization_email');
            if (request('organization_address') !== 'undefined') $tour->organization_address = request('organization_address');

            if (request()->hasFile('author_doc')) {
                $author_doc = [];
                foreach (request()->author_doc as $doc) {
                    $path = $doc->storeAs('author_doc', $doc->getClientOriginalName(), 'public');
                    array_push($author_doc, '/storage/' . $path);
                }
                $tour->author_doc = $author_doc;
            }
        }
        if (auth()->guard('api')->check()) {
            $tour->author = "admin";
            $tour->author_email = "misterobot404@gmail.com";
        } else {
            $tour->author = "user";
            $tour->author_phone = request('author_phone');
            $tour->author_email = request('author_email');
        }
        $tour->save();

        // Get tours
        $tours = Tour::where([
            'parent_id' => $tour->parent_id,
            'status' => 'published'
        ])->get();
        return response()->json([
            "status" => "success",
            "data" => ["tours" => $tours]
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param $id
     * @return JsonResponse
     */
    public function update($id)
    {
        $tour = Tour::find($id);
        if (!$tour) {
            return response()->json([
                "status" => "fail",
                "data" => [
                    "id" => "Tour or section not found",
                ]
            ], 404);
        }

        // title
        $tour->title = request('title');
        // description
        $tour->description = request('description');
        // image
        if (request()->hasFile('image')) {
            // remove old image from storage
            Storage::disk('public')->delete('images_tours/' . basename($tour->image_url));
            // save new image
            $path = request()->file('image')->store('images_tours', 'public');
            $tour->image_url = '/storage/' . $path;
        }
        if (!$tour->isSection) {
            if (request('source_url') !== 'undefined') $tour->source_url = request('source_url');
            if (request('address') !== 'undefined') $tour->address = request('address');
            if (request('organization_name') !== 'undefined') $tour->organization_name = request('organization_name');
            if (request('organization_phone') !== 'undefined') $tour->organization_phone = request('organization_phone');
            if (request('organization_email') !== 'undefined') $tour->organization_email = request('organization_email');
            if (request('organization_address') !== 'undefined') $tour->organization_address = request('organization_address');
        }
        $tour->save();

        return response()->json([
            "status" => "success",
            "data" => [
                "tour" => $tour
            ]
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $tour = Tour::find($id);
        if (!$tour) {
            return response()->json([
                "status" => "fail",
                "data" => [
                    "id" => "Tour not found",
                ]
            ], 404);
        }

        $tour_parent_id = $tour->parent_id;
        $tour_status = $tour->status;
        // mark as deleted
        if ($tour_status === 'published') {
            $tour->status = 'deleted';
            $tour->save();
        } // delete permanently
        else {
            Tour::destroy($id);
        }

        // Get tours of the current parent_id and status.
        $tours = Tour::where([
            'parent_id' => $tour_parent_id,
            'status' => $tour_status
        ])->get();

        return response()->json([
            "status" => "success",
            "data" => ["tours" => $tours]
        ], 200);
    }

    // Publish tour
    public function publish($id)
    {
        $tour = Tour::find($id);
        if (!$tour) {
            return response()->json([
                "status" => "fail",
                "data" => [
                    "id" => "Tour or section not found",
                ]
            ], 404);
        }

        $tour->status = 'published';
        $tour->save();

        // Get all tours of the current parent_id and status.
        $tours = Tour::where(['status' => 'new'])->get();

        return response()->json([
            "status" => "success",
            "data" => [
                "tours" => $tours
            ]
        ], 200);
    }

    // Restore tour
    public function restore($id)
    {
        $tour = Tour::find($id);
        if (!$tour) {
            return response()->json([
                "status" => "fail",
                "data" => [
                    "id" => "Tour or section not found",
                ]
            ], 404);
        }

        $tour->status = 'published';
        $tour->save();

        // Get all tours of the current parent_id and status.
        $tours = Tour::where(['status' => 'deleted'])->get();

        return response()->json([
            "status" => "success",
            "data" => [
                "tours" => $tours
            ]
        ], 200);
    }

    // Get files
    public function getFiles($id)
    {
        $tour = Tour::find($id);
        if (!$tour) {
            return response()->json([
                "status" => "fail",
                "data" => [
                    "id" => "Tour or section not found",
                ]
            ], 404);
        }

        /*$files = array(request()->author_doc);
        $zipname = 'file.zip';
        $zip = new ZipArchive;
        $zip->open($zipname, ZipArchive::CREATE);
        foreach ($files as $file) {
            $zip->addFile($file);
        }
        $zip->close();*/
        foreach ($tour->author_doc as $file) {
            return response()->file($file);
        }
    }

}
