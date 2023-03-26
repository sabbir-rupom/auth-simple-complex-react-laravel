<?php

namespace Modules\Simple\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Simple\Entities\Item;

class SimpleDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        for ($i=1; $i <= 3; $i++) {
            Item::create([
               'name' => "Item {$i}",
               'code' => "IM{$i}",
               'head' => $i,
               'status' => ($i % 2 === 1)
            ]);
        }
    }
}
