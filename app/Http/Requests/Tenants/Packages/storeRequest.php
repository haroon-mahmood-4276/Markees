<?php

namespace App\Http\Requests\Tenants\Packages;

use App\Models\Tenants\Package;
use Illuminate\Foundation\Http\FormRequest;

class storeRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return (new Package())->rules;
    }
}
