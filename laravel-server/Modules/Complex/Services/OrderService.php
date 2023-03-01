<?php

use Modules\Complex\Entities\Order;

class OrderService
{
    function __construct(public $model = new Order())
    {
    }

    public function filter() {
        $request = request();
    }

    public function getOrders() {

    }
}
