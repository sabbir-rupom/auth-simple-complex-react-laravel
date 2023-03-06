<?php

namespace Modules\Complex\Transformers\Order;

use App\Libraries\FileUpload\FileUpload;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'order_number' => $this->order_number,
            'buyer' => $this->buyer_id,
            'customer' => $this->customer_id,
            'customer_address' => $this->customer_address,
            'order_date' => $this->order_date,
            'delivery_date' => $this->delivery_date,
            'delivery_time' => $this->delivery_time,
            'attachment' => $this->attachment ? FileUpload::getUrl($this->attachment) : null,
            'remark' => $this->remark,
            'order_products' => OrderProductResource::collection($this->orderProducts)
        ];
    }
}
