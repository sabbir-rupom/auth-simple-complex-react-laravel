<?php

namespace Modules\Complex\Transformers\Order;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'product' => $this->product_id,
            'product_unit' => $this->unit_id,
            'product_category' => $this->product_category_id,
            'quantity' => $this->quantity,
            'unit_price' => $this->unit_price,
            'total_price' => floatval($this->quantity * $this->unit_price),
        ];
    }
}
