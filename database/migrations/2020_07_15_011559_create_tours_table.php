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

            // СИСТЕМНЫЕ
            // код записи
            $table->id();
            // ссылка на родительский уровень
            $table->integer('parent_id')->nullable();
            $table->foreign('parent_id')
                ->references('id')->on('tours');
            // признак наличия вложенности меню
            $table->boolean('isSection')->default(false);
            // статус записи: new, deleted, published
            $table->string('status')->default("new");
            // статус записи до удаления: new, deleted
            $table->string('previous_status')->nullable();
            // дата создания / обновления записи
            $table->timestamps();

            // ПОЛЬЗОВАТЕЛЬСКИЕ
            // название категории или название объекта туризма
            $table->string('title');
            // описание категории или название объекта туризма
            $table->string('description');
            // месторасположение объекта туризма
            $table->string('address')->nullable();
            // ссылка на изображение фоновой картинки для категории или объекта туризма
            $table->string('image_url');
            // ссылка на страницу в интернете для данного объекта туризма
            $table->string('source_url')->nullable();
            // наименеование организации, предоставляющей доступ к объекту туризма
            $table->string('organization_name')->nullable();
            // контактный телефон для объекта туризма
            $table->string('organization_phone')->nullable();
            // контактная эл.почта для объекта туризма
            $table->string('organization_email')->nullable();
            // адрес месторасположения офиса орагнизации
            $table->string('organization_address')->nullable();

            // АДМИНИСТРАТИВНЫЕ
            // признак автора внесения строки: admin, user
            $table->string('author')->default("user");
            // контактный телефон заявителя
            $table->string('author_phone')->nullable();
            // контактная эл. почта заявителя
            $table->string('author_email')->nullable();
            // документы, подтверждающие легитимность заявителя
            $table->jsonb('author_doc')->nullable();
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
