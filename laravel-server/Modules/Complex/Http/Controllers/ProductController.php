<?php

namespace Modules\Complex\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Complex\Entities\Product;
use Modules\Complex\Transformers\ProductResource;

class ProductController extends Controller
{
    /**
     * Process user login request
     *
     * @return Renderable
     */
    public function __invoke(Request $request)
    {
        $products = Product::get();

        return response()->json([
            'message' => 'Product list fetched successful',
            'products' => ProductResource::collection($products)
        ]);
    }
}
