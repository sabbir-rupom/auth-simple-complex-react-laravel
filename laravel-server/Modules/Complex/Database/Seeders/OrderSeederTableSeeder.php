<?php

namespace Modules\Complex\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Complex\Entities\Buyer;
use Modules\Complex\Entities\Customer;
use Modules\Complex\Entities\CustomerLocation;
use Illuminate\Support\Str;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;
use Modules\Complex\Entities\Order;
use Modules\Complex\Entities\OrderProduct;
use Modules\Complex\Entities\Product;
use Modules\User\Entities\User;

class OrderSeederTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        Model::unguard();

        $buyers = Buyer::get()->pluck('id')->toArray();

        $this->addCustomers($faker);

        $customers = Customer::with('locations')->get()->toArray();

        // dd($customers[array_rand($customers)]);

        $user = User::create([
            'name' => 'Example User',
            'email' => 'user@example.com',
            'password' => Hash::make('11223344')
        ]);

        $this->addOrders($customers, $buyers, $user);
    }

    private function addOrders($customers, $buyers, $user)
    {
        for ($i = 0; $i < 5; $i++) {
            $customer = $customers[random_int(0, count($customers) - 1)];

            // Create new order
            $orderDate = now()->addDays(random_int(1, 4));
            $order = Order::create([
                'order_number' => strtoupper(Str::random(3)) . rand(10000, 99999),
                'buyer_id' => $buyers[0],
                'customer_id' => $customer['id'],
                'customer_address' => $customer['locations'][0]['address'],
                'order_date' => $orderDate->format('Y-m-d'),
                'delivery_date' => $orderDate->addDay()->format('Y-m-d'),
                'delivery_time' => '15:00',
                'user_id' => $user->id,
                'remark' => 'Test Order'
            ]);

            $products = Product::inRandomOrder()->with(['productUnits', 'productCategories'])->limit(random_int(1, 3))->get();

            $op = 0;

            foreach ($products as $product) {

                $orderQuantity = random_int(1,3);

                if ($product->stock >= $orderQuantity) {
                    // Add order product
                    $orderProduct = new OrderProduct();
                    $orderProduct->order_id = $order->id;
                    $orderProduct->product_id = $product->id;
                    $orderProduct->unit_id = $product->productUnits[0]['id'];
                    $orderProduct->product_category_id = $product->productCategories[0]['id'];
                    $orderProduct->quantity = $orderQuantity;
                    $orderProduct->unit_price = $product->price;
                    $orderProduct->total_price = $product->price * $orderQuantity;
                    $orderProduct->save();

                    // Update product stock
                    $product->stock = $product->stock - $orderQuantity;
                    $product->save();

                    $op++;
                } else {
                    continue;
                }
            }

            if ($op <= 0) {
                // Delete order if no product is found as order product
                $order->delete();
            }
        }
    }

    private function addCustomers(Faker $faker)
    {
        for ($i = 0; $i < 5; $i++) {
            $customer = Customer::create([
                'name' => $faker->name,
                // 'email' => preg_replace('/@example\..*/', '@domain.com', $faker->unique()->safeEmail),
            ]);

            $location = rand(1, 3);

            for ($x = 0; $x < $location; $x++) {

                CustomerLocation::create([
                    'customer_id' => $customer->id,
                    'address' => $faker->address(),
                ]);
            }
        }
    }
}
