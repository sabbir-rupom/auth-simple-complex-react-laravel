<?php

namespace App\Traits;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;

trait ResponseJSON
{
    /**
     * Undocumented variable
     *
     * @var array
     */
    private $jsonResponse = [
        'result' => false,
        'errors' => [],
        'message' => "",
        'data' => [],
    ];

    /**
     * Set success response status
     *
     * @return self
     */
    public function success()
    {
        $this->jsonResponse['result'] = true;
        return $this;
    }

    /**
     * Set error results
     *
     * @return self
     */
    public function setErrors(array $errors = [])
    {
        $this->jsonResponse['errors'] = empty($errors) ?  (isset($this->errors) && is_array($this->errors) ? $this->errors : []) : $errors;
        if(empty($this->jsonResponse['message'])) {
            $this->message($this->jsonResponse['errors'][0] ?? '');
        }
        return $this;
    }

    /**
     * Set response message
     *
     * @param string $message
     * @return self
     */
    public function message(string $message = '')
    {
        $this->jsonResponse['message'] = $message;
        return $this;
    }

    /**
     * Return formatted JSON response
     *
     * @param array|JsonResource|Collection $data
     * @param integer $httpStatus
     * @param string[] $headers
     * @return \Illuminate\Contracts\Support\Responsable
     */
    public function response(
        array|JsonResource|Collection $data = [],
        int $httpStatus = 200,
        array $headers = [],
        int $option = 0
    ) {
        $this->jsonResponse['data'] = $data;

        return response()->json(
            $this->jsonResponse,
            $httpStatus,
            $headers,
            $option
        );
    }
}
