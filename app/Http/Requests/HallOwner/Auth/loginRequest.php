<?php

namespace App\Http\Requests\HallOwner\Auth;

use App\Models\HallOwner;
use Illuminate\Foundation\Http\FormRequest;

class loginRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => ['required', 'email', 'exists:hall_owners,email'],
            'password' => ['required'],
        ];
    }
}
