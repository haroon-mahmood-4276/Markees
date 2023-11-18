<?php

namespace App\Http\Requests\Admin\HallOwners;

use App\Models\Admin\HallOwner;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

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
        $rules = (new HallOwner())->rules;

        $rules['password'] = ['nullable', Password::min(8)->letters()->mixedCase()->numbers()->symbols()];
        $rules['subdomain'] .= ',' . $this->hall_owner;
        $rules['email'] .= ',' . $this->hall_owner;
        $rules['phone'] .= ',' . $this->hall_owner;
        $rules['cnic'] .= ',' . $this->hall_owner;
        $rules['ntn'] .= ',' . $this->hall_owner;

        return $rules;
    }
}
