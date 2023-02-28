<?php

namespace Modules\User\Transformers;

use App\Libraries\FileUpload\FileUpload;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'avatar' => $this->avatar ? FileUpload::getUrl($this->avatar) : null,
            'last_login_at' => (string) $this->last_login_at
        ];
    }
}
