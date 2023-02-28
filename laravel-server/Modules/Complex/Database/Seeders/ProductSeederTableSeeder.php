<?php

namespace Modules\Complex\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Modules\Complex\Entities\Product;
use Modules\Complex\Entities\ProductCategory;
use Modules\Complex\Entities\Unit;

class ProductSeederTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $prices = [20, 50, 100, 500, 1050, 700, 840, 420];
        for ($i = 1; $i <= 7; $i++) {
            // Add new product
            $product = Product::create([
                'name' => 'Product ' . $i,
                'sku' => 'PD' . $i,
                'price' => $prices[array_rand($prices)],
                'stock' => rand(1, 10),
            ]);

            // Add product categories for the product
            $cats = rand(1, 4);
            for ($x = 1; $x <= $cats; $x++) {
                ProductCategory::create([
                    'product_id' => $product->id,
                    'category_name' => "Category $x",
                ]);
            }

            // Get available unit array
            $units = Unit::select('id')->get()->pluck('id')->toArray();

            // Attach unit information with product: PIVOT concept
            $product->productUnits()->attach($units[array_rand($units)]);

        }
    }
}
