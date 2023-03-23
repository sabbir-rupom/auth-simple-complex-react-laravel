<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Throwable;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

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
                    'result' => false,
                    'message' => 'Not authenticated',
                ], 401);
            }
        });
    }

    public function render($request, Throwable $e)
    {

        if ($request->wantsJson() || strstr($request->url(), '/api/')) {
            if ($e instanceof ModelNotFoundException) {
                // If route depenedant model parameter is empty or unavailable
                return response()->json([
                    'result' => false,
                    'message' => 'Sorry! Model data not found!'
                ], 404);
            } elseif ($e instanceof MethodNotAllowedHttpException) {
                // If route access method not defined

                return response()->json([
                    'result' => false,
                    'message' => $e->getMessage()
                ], 405);
            } elseif ($e instanceof ThrottleRequestsException) {
                // If number of route access request exceeded within given time limit

                return response()->json([
                    'result' => false,
                    'message' => $e->getMessage() . ' Please try again after one minute.'
                ], 400);
            } elseif ($e instanceof NotFoundHttpException) {
                // If route not found

                return response()->json([
                    'result' => false,
                    'message' => $e->getMessage()
                ], 404);
            } elseif ($e instanceof AuthenticationException) {
                // If session / authentication parameter unavailable

                return response()->json([
                    'result' => false,
                    'message' => $e->getMessage()
                ], 401);
            } else {

                return response()->json([
                    'result' => false,
                    'message' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine()
                ], 400);
            }
        }

        return parent::render($request, $e);
    }
}
