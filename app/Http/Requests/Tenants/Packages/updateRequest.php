<?php

namespace App\Http\Requests\Tenants\Packages;

use Illuminate\Foundation\Http\FormRequest;

class updateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|between:1,254',
            'description' => 'nullable',
            'price' => 'required|gte:0',
            'attachment' => 'nullable|array',
            'attachment.*' => 'image|mimes:jpg,jpeg,png',
            'cuisines' => 'nullable|array',
            'cuisines.*' => 'nullable|numeric|exists:cuisines,id',
            'hall_type' => 'nullable|numeric|exists:hall_types,id',
            'decorations' => 'nullable|array',
            'decorations.*' => 'nullable|numeric|exists:decorations,id',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [];
    }
}
