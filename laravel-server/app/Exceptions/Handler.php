<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Throwable;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
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
     *
     * @return void
     */
    public function register()
    {
        $this->renderable(function (AuthenticationException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => 'Not authenticated',
                    'status' => false
                ], 401);
            }
        });
    }

    public function render($request, Throwable $e)
    {

        if ($request->wantsJson() || strstr($request->url(), '/api/')) {
            if ($e instanceof ModelNotFoundException) {
                return response()->json([
                    'error' => true,
                    'message' => 'Sorry! Data Not Found!'
                ], 404);
            } elseif ($e instanceof MethodNotAllowedHttpException) {
                return response()->json([
                    'error' => true,
                    'message' => $e->getMessage()
                ], 401);
            } else {

                return response()->json([
                    'error' => true,
                    'message' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine()
                ], 400);

            }
        }

        return parent::render($request, $e);
    }
}
