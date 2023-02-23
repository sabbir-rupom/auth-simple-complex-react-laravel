<?php

namespace Modules\Auth\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Modules\User\Entities\User;

class RegistrationController extends Controller
{
    /**
     * Process user registration request
     *
     * @return Renderable
     */
    public function __invoke(Request $request)
    {
        $this->requestValidate($request);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        if (auth('sanctum')->check()) {
            auth()->user()->tokens()->delete();
        }

        $user->email_verified_at = now();

        return response()->json([
            'message' => 'Registration successful',
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
                'name' => 'required|min:4',
                'email' => 'required|email|unique:users,email',
                'password' => 'min:4|required_with:confirm_password|same:confirm_password',
                'confirm_password' => 'required',
            ],
            [
                'email.unique' => 'Email is already in use by another user',
                'password.same' => 'New password & retype password must be same',
                'password.min' => 'Password length must be atleast 4 characters',
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
