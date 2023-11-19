<?php

namespace App\Http\Requests\HallOwner\Halls;

use App\Models\Hall;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class storeRequest extends FormRequest
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
        return (new Hall())->rules;
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
