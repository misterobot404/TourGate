<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Storage;

class Tour extends Model
{
    protected $casts = [
        'author_doc' => 'array',
    ];

    public function children()
    {
        return $this->hasMany('App\Tour','parent_id')->with('children');
    }

    public static function boot() {
        parent::boot();

        static::deleting(function($tour) {
            // remove images
            Storage::disk('public')->delete('images_tours/'.basename($tour->image_url));
            // remove docs
            if ($tour->author_doc) {
                foreach ($tour->author_doc as $doc) {
                    Storage::disk('public')->delete('author_doc/' . basename($doc));
                }
            }
            // deleting children
            $tour->children()->get()->each(function ($el) {
                $el->delete();
            });
        });
    }
}
