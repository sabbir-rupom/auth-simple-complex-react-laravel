<?php

namespace Modules\Complex\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class ComplexDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(BuyerSeederTableSeeder::class);
        $this->call(UnitSeederTableSeeder::class);
        $this->call(ProductSeederTableSeeder::class);
        $this->call(OrderSeederTableSeeder::class);
    }
}
