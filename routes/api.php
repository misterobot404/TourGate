<?php

Route::get('/tours/{parent_id?}', 'API\TourController@index');

// Auth
Route::post('/login', 'API\AuthController@login');
Route::middleware('auth:api')->post('/logout', 'API\AuthController@logout');

// Admin Panel
Route::middleware('auth:api')->group(function () {
    Route::post('/tours', 'API\TourController@store');
    // Should be here PUT, not PUT doesn't work with 'Content-Type': 'multipart/form-data'. Laravel error.
    Route::post('/tours/{id}', 'API\TourController@update');
    Route::delete('/tours/{id}', 'API\TourController@destroy');
    // Application CRUD
    Route::get('/applications', 'API\ApplicationController@index');
});
