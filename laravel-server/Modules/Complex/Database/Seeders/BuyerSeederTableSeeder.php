<?php

namespace Modules\Complex\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Faker\Generator as Faker;
use Modules\Complex\Entities\Buyer;

class BuyerSeederTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        Model::unguard();

        for ($i = 0; $i < 3; $i++) {
            Buyer::create([
                'name' => $faker->name,
                'address' => $faker->address(),
            ]);
        }
    }
}
