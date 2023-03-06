<?php

namespace Modules\Complex\Http\Controllers;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Complex\Entities\Product;
use Modules\Complex\Transformers\ProductResource;

class ProductController extends Controller
{
    /**
     * Get product list
     *
     * @return Responsable
     */
    public function __invoke(Request $request)
    {
        $products = Product::with(['productUnits', 'productCategories'])->get();

        return response()->json([
            'message' => 'Product list fetched successful',
            'products' => ProductResource::collection($products)
        ]);
    }
}
