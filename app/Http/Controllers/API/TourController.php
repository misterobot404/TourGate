<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Tour;
use Illuminate\Http\JsonResponse;

class TourController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param null $parent_id
     * @return JsonResponse
     */
    public function index($parent_id = NULL)
    {
        // Get all tours of the current parent_id.
        $tours = Tour::where('parent_id', $parent_id)->get();

        // Get path to root of the current parent_id
        $breadcrumbs = [];
        if ($parent_id !== NULL) {
            $section = Tour::where('id', $parent_id)->first();
            array_push($breadcrumbs, $section);

            while ($section->parent_id !== NULL) {
                $section = Tour::where('id', $section->parent_id);
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

        $path = request()->file('image')->store('tours', 'public');
        $tour->image_url = '/storage/' . $path;

        $tour->isSection = request('isSection');
        if ($tour->isSection === "false") {
            $tour->source_url = request('source_url');
        }
        $tour->save();

        // Get all tours of the current parent_id.
        $tours = Tour::where('parent_id', $tour->parent_id)->get();

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

        $tour->title = request('title');
        $tour->description = request('description');

        if (request()->hasFile('image')) {
            $path = request()->file('image')->store('tours', 'public');
            $tour->image_url = '/storage/' . $path;
        }

        if (!$tour->isSection) {
            $tour->source_url = request('source_url');
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
        Tour::destroy($id);

        // Get all tours of the current parent_id.
        $tours = Tour::where('parent_id', $tour->parent_id)->get();

        return response()->json([
            "status" => "success",
            "data" => ["tours" => $tours]
        ], 200);
    }
}
