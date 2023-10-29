<?php

namespace App\Http\Requests\Admin\HallOwners;

use App\Models\HallOwner;
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

        $id = decryptParams($this->id);
        $rules['password'] = ['nullable', Password::min(8)->letters()->mixedCase()->numbers()->symbols()];
        $rules['subdomain'] .= ',' . $id;
        $rules['email'] .= ',' . $id;
        $rules['phone'] .= ',' . $id;
        $rules['cnic'] .= ',' . $id;
        $rules['ntn'] .= ',' . $id;

        return $rules;
    }
}
