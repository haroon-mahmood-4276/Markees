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
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}

// if (auth()->check()) {
//     $exceptionCode = method_exists($exception, 'getStatusCode') ? $exception->getStatusCode() : $exception->getCode();
//     $exceptionCode = $exceptionCode > 0 ? $exceptionCode : 500;

//     if (in_array($exceptionCode, [401, 402, 403, 404, 419, 500, 503])) {
//         $view = '';
//         switch ($request->segment(1)) {
//             case 'admin':
//                 $view = 'admin.errors.';
//                 break;

//             case 'seller':
//                 $view = 'seller.errors.';
//                 break;

//             default:
//                 $view = 'user.errors.';
//                 break;
//         }

//         $view .= $exceptionCode;
//         return response()->view($view);
//     }
// }
