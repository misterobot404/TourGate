<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Location;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $locations = [];
        foreach (Location::all() as $location) {
            array_push($locations, $location->name);
        }

        return response()->json([
            "status" => "success",
            "data" => ["locations" => $locations]
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store()
    {
        $location = new Location;
        $location->name = request('name');
        $location->save();

        $locations = [];
        foreach (Location::all() as $location) {
            array_push($locations, $location->name);
        }

        return response()->json([
            "status" => "success",
            "data" => ["locations" => $locations]
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $name
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($name)
    {
        Location::where('name', $name)->delete();

        $locations = [];
        foreach (Location::all() as $location) {
            array_push($locations, $location->name);
        }
        return response()->json([
            "status" => "success",
            "data" => ["locations" => $locations]
        ], 200);
    }
}
