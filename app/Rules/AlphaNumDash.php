<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class AlphaNumDash implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // regular expression for alphanumeric with dashes and underscores
        if (!preg_match('/^[a-zA-Z0-9-_]+$/', $value)) {
            $fail(__('The :attribute must be alphanumeric with dashes and underscores.'));
        }
    }
}
