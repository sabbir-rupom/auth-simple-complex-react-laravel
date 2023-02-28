<?php

namespace Modules\Complex\Entities;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{

    protected $fillable = ['name'];

    public function locations() {
        return $this->hasMany(CustomerLocation::class, 'customer_id', 'id');
    }

}
