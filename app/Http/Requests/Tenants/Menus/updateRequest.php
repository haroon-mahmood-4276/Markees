<?php

namespace App\Http\Requests\Tenants\Menus;

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
            'menu' => 'required',
            'name' => 'required|string|between:1,254',
            'description' => 'nullable',
            'attachment' => 'nullable|array',
            'attachment.*' => 'image|mimes:jpg,jpeg,png',
            'has_sub_menu' => 'required|boolean',
            'cuisines' => 'required_if:has_sub_menu,0',
            'price' => 'required_if:has_sub_menu,0|gte:0',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'cuisines.required_if' => 'The cuisines field is required when has sub menu is unchecked.',
            'price.required_if' => 'The cuisines field is required when has sub menu is unchecked.',
        ];
    }
}
