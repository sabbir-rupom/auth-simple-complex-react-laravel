<?php

namespace Modules\Complex\Entities;

use Illuminate\Database\Eloquent\Model;
use Modules\User\Entities\User;

class Order extends Model
{
    // protected $fillable = [];

    public function buyer() {
        return $this->belongsTo(Buyer::class);
    }

    public function customer() {
        return $this->belongsTo(Customer::class);
    }

    public function author() {
        return $this->belongsTo(User::class);
    }

    public function orderProducts() {
        return $this->hasMany(OrderProduct::class, 'order_id');
    }

}
