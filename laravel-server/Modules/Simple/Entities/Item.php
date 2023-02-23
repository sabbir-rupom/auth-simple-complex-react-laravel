<?php

namespace Modules\Simple\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Item extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'code', 'head', 'status'];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'status' => 'boolean',
        'head' => 'integer',
    ];

    /**
     * Should contain array of Head data for Items
     *
     * @var array
     */
    const HEADS = [
        1 => 'Head 1',
        2 => 'Head 2',
        3 => 'Head 3',
        4 => 'Head 4',
        5 => 'Head 5',
    ];
}
