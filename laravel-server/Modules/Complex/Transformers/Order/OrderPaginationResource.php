<?php

namespace Modules\Complex\Transformers\Order;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderPaginationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
