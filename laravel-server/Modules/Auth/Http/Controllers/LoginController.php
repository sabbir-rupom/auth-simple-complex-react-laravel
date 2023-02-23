<?php

namespace Modules\Auth\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Modules\User\Entities\User;

class LoginController extends Controller
{
    /**
     * Process user login request
     *
     * @return Renderable
     */
    public function __invoke(Request $request)
    {
        $this->requestValidate($request);

        if (!Auth::attempt($request->only(['email', 'password']))) {
            return $this->message('Credentials mismatched')->response([], 401);
        }

        $user = User::where('email', $request->email)->first();

        $user->last_login_at = now();
        $user->save();

        return response()->json([
            'message' => 'Login successful',
            'token' => $user->createToken("API TOKEN")->plainTextToken
        ]);
    }

    /**
     * Validate login request
     *
     * @param Request $request
     * @return void
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
                    'error' => true,
                    'message' => $validateUser->errors()
                ], 406)
            );
        }
    }
}
