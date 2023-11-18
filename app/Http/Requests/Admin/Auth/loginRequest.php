<?php

namespace App\Http\Requests\Admin\Auth;

use App\Models\Admin\Admin;
use Illuminate\Foundation\Http\FormRequest;

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
        $rules = (new Admin())->rules;
        // $rules['password'] = ['required', Password::min(8)->letters()->mixedCase()->numbers()->symbols()->uncompromised()];
        return $rules;
    }
}
