<?php

namespace Modules\Auth\Http\Controllers;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Modules\User\Entities\User;

class RegistrationController extends Controller
{
    /**
     * Process user registration request
     *
     * @return Responsable
     */
    public function __invoke(Request $request)
    {
        $this->requestValidate($request);

        if (auth('sanctum')->check()) {
            auth()->user()->tokens()->delete();
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $user->email_verified_at = now();
        $user->save();

        return response()->json([
            'result' => true,
            'message' => 'Registration successful',
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
                    'result' => false,
                    'message' => $validateUser->errors()
                ], 406)
            );
        }
    }
}
