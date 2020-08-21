<?php
// get files
Route::get('/tours/{id}/files', 'API\TourController@getFiles');

Route::get('/tours/{status}/{parent_id?}', 'API\TourController@index');
Route::post('/tours', 'API\TourController@store');

// Auth
Route::post('/login', 'API\AuthController@login');
Route::middleware('auth:api')->post('/logout', 'API\AuthController@logout');

// Admin Panel
Route::middleware('auth:api')->group(function () {
    // laravel bug. Should be here PUT, not PUT doesn't work with 'Content-Type': 'multipart/form-data'.
    Route::post('/tours/{id}', 'API\TourController@update');
    Route::delete('/tours/{id}', 'API\TourController@destroy');
    // publish tour
    Route::put('/tours/{id}/publish', 'API\TourController@publish');
    // restore tour
    Route::put('/tours/{id}/restore', 'API\TourController@restore');
});
