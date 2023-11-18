<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $exception) {
            if (auth()->check()) {
                $exceptionCode = $exception->getCode();
                $exceptionCode = $exceptionCode > 0 ? $exceptionCode : 500;

                if (in_array($exceptionCode, [401, 402, 403, 404, 419, 500, 503])) {
                    $view = match (request()->segment(1)) {
                        'admin' => 'admin.errors.',
                        'hall-owner' => 'hall_owner.errors.',
                        default => 'user.errors.',
                    } . $exceptionCode;

                    // dd($view);

                    return response()->view($view);
                }
            }
        });
    }
}
