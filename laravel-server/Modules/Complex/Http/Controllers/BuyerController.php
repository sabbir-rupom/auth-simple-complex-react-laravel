<?php

namespace Modules\Complex\Http\Controllers;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Complex\Entities\Buyer;

class BuyerController extends Controller
{
    /**
     * Get buyer list
     *
     * @return Responsable
     */
    public function __invoke(Request $request)
    {
        $buyers = Buyer::select('id', 'name')->get();

        return response()->json([
            'message' => 'Buyer list retrieved successful',
            'buyers' => $buyers
        ]);
    }
}
