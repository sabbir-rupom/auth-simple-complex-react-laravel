<?php

namespace Modules\Complex\Entities;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    protected $fillable = ['sku', 'name', 'price', 'stock', 'description'];

    public function productCategories()
    {
        return $this->hasMany(ProductCategory::class, 'product_id', 'id');
    }

    public function productUnits()
    {
        return $this->belongsToMany(Unit::class)->withPivot('unit_id');
    }

}
