<?php

namespace Modules\Complex\Entities;

use Illuminate\Database\Eloquent\Model;

class OrderProduct extends Model
{
    // protected $fillable = [];

    public function product() {
        $this->belongsTo(Product::class);
    }

    public function unit() {
        $this->belongsTo(Unit::class);
    }

    public function productCategory() {
        $this->belongsTo(ProductCategory::class);
    }

}
