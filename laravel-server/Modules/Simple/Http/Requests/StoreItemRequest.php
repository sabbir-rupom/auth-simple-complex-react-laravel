<?php

namespace Modules\Simple\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\Rule;
use Modules\Simple\Entities\Item;

class StoreItemRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'code' => 'required|string|unique:items,code',
            'head' => [
                'required',
                Rule::in(array_keys(Item::HEADS))
            ],
            'name' => 'required|string',
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
            'code.unique' => 'Item code is already in use. Please provide an unique code',
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws HttpResponseException
     */
    public function failedValidation(Validator $validator)
    {

        throw new HttpResponseException(
            response()->json([
                'error' => true,
                'message' => $validator->errors()->first()
            ])
        );
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
}
