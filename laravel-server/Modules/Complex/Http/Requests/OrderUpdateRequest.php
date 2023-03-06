<?php

namespace Modules\Complex\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OrderUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'order_number' => Rule::unique('orders', 'order_number')->ignore($this->order),
            'buyer' => 'required|exists:buyers,id',
            'customer' => 'required|exists:customers,id',
            'customer_address' => 'required',
            'order_date' => 'required|date',
            'delivery_date' => 'required|after_or_equal:order_date',
            'order_products' => 'required|array',
            'order_products.*.product' => 'required|integer|exists:products,id',
            'order_products.*.product_unit' => 'required|integer',
            'order_products.*.product_category' => 'nullable|integer',
            'order_products.*.quantity' => 'required|integer',
            'order_products.*.unit_price' => 'required|numeric',
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth('sanctum')->check();
    }
}
