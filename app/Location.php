<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    /**
     * Determines the need for time stamps.
     *
     * @var bool
     */
    public $timestamps = false;

    public $incrementing = false;
}
