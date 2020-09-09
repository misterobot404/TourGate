<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Tour;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use ZipArchive;
use Hash;
use File;
use Request;

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
            ], 401);
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

        $path = request()->file('image')->store('images_tours/', 'public');
        $tour->image_url = '/storage/' . $path;
        unset(request()->image);

        $tour->isSection = request('isSection');
        if ($tour->isSection === "false") {
            if (request('source_url')) $tour->source_url = request('source_url');
            if (request('address')) $tour->address = request('address');
            if (request('organization_name')) $tour->organization_name = request('organization_name');
            if (request('organization_phone')) $tour->organization_phone = request('organization_phone');
            if (request('organization_email')) $tour->organization_email = request('organization_email');
            if (request('organization_address')) $tour->organization_address = request('organization_address');
            $tour->location = request('location');

            if (request()->hasFile('author_doc')) {
                $author_doc = [];
                foreach (request()->author_doc as $doc) {
                    $path = $doc->store('author_doc', 'public');
                    array_push($author_doc, '/storage/' . $path);
                }
                $tour->author_doc = $author_doc;
            }
        }
        if (auth()->guard('api')->check()) {
            $tour->author = "admin";
            if (request('author_email')) $tour->author_email = request('author_email');
        } else {
            $tour->author = "user";
            if (request('author_phone')) $tour->author_phone = request('author_phone');
            if (request('author_email')) $tour->author_email = request('author_email');
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

        // set title
        $tour->title = request('title');
        // set description
        $tour->description = request('description');
        // set image
        if (request()->hasFile('image')) {
            // remove old image from storage
            Storage::disk('public')->delete('images_tours/' . basename($tour->image_url));
            // save new image
            $path = request()->file('image')->store('images_tours', 'public');
            $tour->image_url = '/storage/' . $path;
        }
        // set other fields
        if (!$tour->isSection) {
            $tour->source_url = request('source_url');
            $tour->address = request('address');
            $tour->organization_name = request('organization_name');
            $tour->organization_phone = request('organization_phone');
            $tour->organization_email = request('organization_email');
            $tour->organization_address = request('organization_address');
            $tour->location = request('location');
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

        $parent_id = $tour->parent_id;
        $previous_status = $tour->status;
        // delete permanently
        if ($tour->status === 'deleted') {
            Tour::destroy($id);
        } // mark as deleted
        else {
            $tour->previous_status = $previous_status;
            $tour->status = 'deleted';
            $tour->save();
        }

        // Get tours
        if ($previous_status === "published") {
            $tours = Tour::where([
                'parent_id' => $parent_id,
                'status' => $previous_status
            ])->get();
        } else $tours = Tour::where(['status' => $previous_status])->get();

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

        $tour->status = $tour->previous_status;
        $tour->previous_status = null;
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

    // Get tour files
    public function getFiles($id)
    {
        $tour = Tour::find($id);
        // check tour
        if (!$tour) {
            return response()->json([
                "status" => "fail",
                "data" => [
                    "id" => "Tour or section not found",
                ]
            ], 404);
        }

        $zip_name = 'docs.zip';
        $zip = new ZipArchive();
        if ($zip->open($zip_name, ZipArchive::CREATE | ZIPARCHIVE::OVERWRITE) === TRUE) {
            foreach ($tour->author_doc as $key => $doc) {
                $zip->addFile('storage/author_doc/' . basename($doc), $key.'.'.pathinfo($doc)['extension']);
            }
            $zip->close();
            return response()->download($zip_name)->deleteFileAfterSend();
        }
    }
}
