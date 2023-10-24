<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Str;

class Password implements ValidationRule
{
    /**
     * The minimum length of the password.
     *
     * @var int
     */
    protected $minlength = 8;

    /**
     * The maximum length of the password.
     *
     * @var int
     */
    protected $maxlength = 16;

    /**
     * Indicates if the password must contain one uppercase character.
     *
     * @var bool
     */
    protected $requireUppercase = false;

    /**
     * Indicates if the password must contain one numeric digit.
     *
     * @var bool
     */
    protected $requireNumeric = false;

    /**
     * Indicates if the password must contain one special character.
     *
     * @var bool
     */
    protected $requireSpecialCharacter = false;

    /**
     * The message that should be used when validation fails.
     *
     * @var string
     */
    protected $message;

    /**
     * Determine if the validation rule passes.
     *
     * @return bool
     */

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $value = is_scalar($value) ? (string) $value : '';

        if ($this->requireUppercase && Str::lower($value) === $value) {
            $fail($this->message());
        }

        if ($this->requireNumeric && ! preg_match('/[0-9]/', $value)) {
            $fail($this->message());
        }

        if ($this->requireSpecialCharacter && ! preg_match('/[\W_]/', $value)) {
            $fail($this->message());
        }

        if (Str::length($value) >= $this->maxlength) {
            $fail($this->message());
        }

        if (Str::length($value) < $this->minlength) {
            $fail($this->message());
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        if ($this->message) {
            return $this->message;
        }

        switch (true) {
            case $this->requireUppercase
            && ! $this->requireNumeric
            && ! $this->requireSpecialCharacter:
                return __('The :attribute must be between :minlength and :maxlength characters and contain at least one uppercase character.', [
                    'minlength' => $this->minlength,
                    'maxlength' => $this->maxlength,
                ]);

            case $this->requireNumeric
            && ! $this->requireUppercase
            && ! $this->requireSpecialCharacter:
                return __('The :attribute must be between :minlength and :maxlength characters and contain at least one number.', [
                    'minlength' => $this->minlength,
                    'maxlength' => $this->maxlength,
                ]);

            case $this->requireSpecialCharacter
            && ! $this->requireUppercase
            && ! $this->requireNumeric:
                return __('The :attribute must be between :minlength and :maxlength characters and contain at least one special character.', [
                    'minlength' => $this->minlength,
                    'maxlength' => $this->maxlength,
                ]);

            case $this->requireUppercase
            && $this->requireNumeric
            && ! $this->requireSpecialCharacter:
                return __('The :attribute must be between :minlength and :maxlength characters and contain at least one uppercase character and one number.', [
                    'minlength' => $this->minlength,
                    'maxlength' => $this->maxlength,
                ]);

            case $this->requireUppercase
            && $this->requireSpecialCharacter
            && ! $this->requireNumeric:
                return __('The :attribute must be between :minlength and :maxlength characters and contain at least one uppercase character and one special character.', [
                    'minlength' => $this->minlength,
                    'maxlength' => $this->maxlength,
                ]);

            case $this->requireUppercase
            && $this->requireNumeric
            && $this->requireSpecialCharacter:
                return __('The :attribute must be between :minlength and :maxlength characters and contain at least one uppercase character, one number, and one special character.', [
                    'minlength' => $this->minlength,
                    'maxlength' => $this->maxlength,
                ]);

            case $this->requireNumeric
            && $this->requireSpecialCharacter
            && ! $this->requireUppercase:
                return __('The :attribute must be between :minlength and :maxlength characters and contain at least one special character and one number.', [
                    'minlength' => $this->minlength,
                    'maxlength' => $this->maxlength,
                ]);

            default:
                return __('The :attribute must be between :minlength and :maxlength characters.', [
                    'minlength' => $this->minlength,
                    'maxlength' => $this->maxlength,
                ]);
        }
    }

    /**
     * Set the minimum length of the password.
     *
     * @return $this
     */
    public function minlength(int $minlength)
    {
        $this->minlength = $minlength;

        return $this;
    }

    /**
     * Set the maximum length of the password.
     *
     * @return $this
     */
    public function maxlength(int $maxlength)
    {
        $this->maxlength = $maxlength;

        return $this;
    }

    /**
     * Indicate that at least one uppercase character is required.
     *
     * @return $this
     */
    public function requireUppercase()
    {
        $this->requireUppercase = true;

        return $this;
    }

    /**
     * Indicate that at least one numeric digit is required.
     *
     * @return $this
     */
    public function requireNumeric()
    {
        $this->requireNumeric = true;

        return $this;
    }

    /**
     * Indicate that at least one special character is required.
     *
     * @return $this
     */
    public function requireSpecialCharacter()
    {
        $this->requireSpecialCharacter = true;

        return $this;
    }

    /**
     * Set the message that should be used when the rule fails.
     *
     * @return $this
     */
    public function withMessage(string $message)
    {
        $this->message = $message;

        return $this;
    }
}
