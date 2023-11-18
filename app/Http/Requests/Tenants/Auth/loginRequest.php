<?php

namespace App\Http\Requests\Tenants\Auth;

use App\Models\HallOwner\TenantUser;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class loginRequest extends FormRequest
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
        $rules = (new TenantUser())->rules;
        // $rules['password'] = ['required', Password::min(8)->letters()->mixedCase()->numbers()->symbols()->uncompromised()];
        return $rules;
    }
}
