<?php

namespace Modules\Complex\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Complex\Entities\Unit;

class UnitSeederTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        Unit::insert([
            [
                'id' => 1,
                'name' => 'piece',
                'short' => 'pc',
            ],
            [
                'id' => 2,
                'name' => 'kilogram',
                'short' => 'kg',
            ],
            [
                'id' => 3,
                'name' => 'litres',
                'short' => 'ltr',
            ],
            [
                'id' => 4,
                'name' => 'metre',
                'short' => 'mtr',
            ],
        ]);
    }
}
