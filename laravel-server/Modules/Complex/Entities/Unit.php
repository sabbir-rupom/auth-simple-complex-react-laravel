<?php

namespace Modules\Complex\Entities;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{

    protected $fillable = ['name', 'short'];

    public function products()
    {
        return $this->belongsToMany(Product::class)->withPivot('product_id');
    }
}
