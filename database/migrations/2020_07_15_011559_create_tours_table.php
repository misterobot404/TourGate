<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateToursTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tours', function (Blueprint $table) {
            $table->id();
            $table->integer('parent_id')->nullable();
            $table->foreign('parent_id')
                ->references('id')->on('tours')
                ->onDelete('cascade');
            $table->boolean('isSection')->default(false);

            $table->string('title');
            $table->string('description');
            $table->string('image_url');
            $table->string('source_url')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tours');
    }
}
