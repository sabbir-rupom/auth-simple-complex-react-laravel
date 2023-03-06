<?php

namespace Modules\Auth\Http\Controllers;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class AuthController extends Controller
{
    /**
     * Process User Logout Request
     *
     * @return Responsable
     */
    public function logout(Request $request)
    {

        $user = request()->user();
        if ($request->all) {
            $user->tokens()->delete();
        } else if ($request->token) {
            $user->tokens()->where('id', $request->token)->delete();
        } else {
            // Revoke current user token
            //$user->tokens()->where('id', $user->currentAccessToken()->id)->delete();
            $user->currentAccessToken()->delete();
        }

        return response()->json([
            'result' => true,
            'message' => 'User successfully logged out'
        ]);
    }
}
