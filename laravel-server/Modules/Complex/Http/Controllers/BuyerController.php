<?php

namespace Modules\Complex\Http\Controllers;

use App\Traits\ResponseJSON;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Complex\Entities\Buyer;

class BuyerController extends Controller
{
    use ResponseJSON;

    /**
     * Get buyer list
     *
     * @return Responsable
     */
    public function __invoke(Request $request)
    {
        $buyers = Buyer::select('id', 'name')->get();

        return $this->success()
            ->message('Buyer list retrieved successful')
            ->response($buyers);
    }
}
