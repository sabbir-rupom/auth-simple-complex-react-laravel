<?php

namespace Modules\Complex\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class CustomerSaveRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth('sanctum')->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|min:4',
            'location' => 'required|array',
            'location.*' => 'string',
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
            'name.min' => 'Customer name must be atleast 4 characters long',
            'location.array' => 'Please provide customer location array',
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

}
