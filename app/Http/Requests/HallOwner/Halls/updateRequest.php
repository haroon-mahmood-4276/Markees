<?php

namespace App\Http\Requests\HallOwner\Halls;

use App\Models\Hall;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

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
        $rules = (new Hall())->rules;
        unset($rules['short_label']);
        // $rules['short_label'] = 'required|string|between:1,30|unique:halls,short_label,' . decryptParams($this->id);

        return $rules;
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'short_label' => Str::slug($this->short_label),
        ]);
    }
}
