<?php

namespace Modules\Complex\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'sku' => $this->sku,
            'name' => $this->name,
            'price' => (int) $this->price,
            'stock' => (int) $this->stock,
            'units' => UnitResource::collection($this->productUnits),
            'categories' => $this->productCategories->map(function ($category) {
                return collect($category->toArray())->only('id', 'category_name');
            })
        ];
    }
}
