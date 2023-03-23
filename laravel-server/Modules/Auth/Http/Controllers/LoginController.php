<?php

namespace Modules\Auth\Http\Controllers;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Modules\User\Entities\User;

class LoginController extends Controller
{
    /**
     * Process User Login Request
     *
     * @return Responsable
     * @throws HttpResponseException If login credentials mismatched
     */
    public function __invoke(Request $request)
    {
        $this->requestValidate($request);

        if (!Auth::attempt($request->only(['email', 'password']))) {
            throw new HttpResponseException(
                response()->json([
                    'result' => false,
                    'message' => 'Login credentials mismatched'
                ], 401)
            );
        }

        $user = User::where('email', $request->email)->first();

        $user->last_login_at = now();
        $user->save();

        return response()->json([
            'result' => true,
            'message' => 'Login successful',
            'data' => [
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ]
        ]);
    }

    /**
     * Validate login request
     *
     * @param Request $request
     * @return void
     * @throws HttpResponseException If request validation fails
     */
    private function requestValidate(Request $request)
    {
        $validateUser = Validator::make(
            $request->all(),
            [
                'email' => 'required|email',
                'password' => 'required'
            ]
        );

        if ($validateUser->fails()) {
            throw new HttpResponseException(
                response()->json([
                    'result' => false,
                    'message' => $validateUser->errors()
                ], 406)
            );
        }
    }
}
