<?php

namespace App\Http\Requests\HallOwner\Packages;

use App\Models\Package;
use Illuminate\Foundation\Http\FormRequest;

class updateRequest extends FormRequest
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
