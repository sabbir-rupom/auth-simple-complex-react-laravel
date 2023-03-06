<?php

namespace Modules\User\Http\Controllers;

use App\Libraries\FileUpload\FileUpload;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Modules\User\Transformers\UserResource;

class UserController extends Controller
{
    /**
     * Get user profile information
     *
     * @return Responsable
     */
    public function profile(Request $request)
    {
        return response()->json([
            'message' => 'Profile information retrieved successfully',
            'profile' => new UserResource($request->user())
        ]);
    }

    /**
     * Update user profile information
     *
     * @param Request $request
     * @return Responsable
     * @throws HttpResponseException If request file validation fails
     */
    public function update(Request $request)
    {
        $this->requestValidate($request);

        $user = $request->user();

        $user->name = $request->name ? trim($request->name) : $user->name;
        if($request->hasFile('avatar')) {
            $fileUpload = FileUpload::instance()->upload($request->file('avatar'));

            if (empty($fileUpload) || is_string($fileUpload)) {
                throw new HttpResponseException(
                    response()->json([
                        'error' => true,
                        'message' => $fileUpload ? $fileUpload : 'Some error occured! Please try again later'
                    ], 400)
                );
            } elseif ($user->avatar) {
                FileUpload::remove($user->avatar);
            }

            $user->avatar = $fileUpload['path'];
        }

        $user->save();

        return response()->json([
            'message' => 'Profile information updated successfully',
            'profile' => new UserResource($user)
        ]);

    }

    /**
     * Validate profile update request
     *
     * @param Request $request
     * @return void
     * @throws HttpResponseException If request validation fails
     */
    private function requestValidate(Request $request) {
        $validateUser = Validator::make(
            $request->all(),
            [
                'name' => 'required|min:4',
                'avatar' => 'nullable|image|max:2048',
            ],
            [
                'avatar.image' => 'Please provide a valid image file',
                'avatar.max' => 'Image file size must not exceed 2MB',
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
