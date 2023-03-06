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
            'attachment' => 'nullable|file|mimes:png,jpg,jpeg,pdf|max:5128',
            'order_date' => 'required|date',
            'delivery_date' => 'required|after_or_equal:order_date',
            'order_products' => 'nullable|array',
            'order_products.*.product' => 'required|integer|exists:products,id',
            'order_products.*.product_unit' => 'required|integer',
            'order_products.*.product_category' => 'nullable|integer',
            'order_products.*.quantity' => 'required|integer',
            'order_products.*.unit_price' => 'required|numeric',
        ];
    }

    /**
     * Get validation failure messages
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'order_number.unique' => 'Order number is already in use',
            'order_product.array' => 'Please provide order products array',
            'attachment.mimes' => 'Allowed attachment file: PNG, JPG, JPEG, PDF',
            'attachment.max' => 'Allowed max attachment file size: 5MB',
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
