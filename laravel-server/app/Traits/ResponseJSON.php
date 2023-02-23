<?php

namespace App\Traits;

trait ResponseJSON
{
    /**
     * Undocumented variable
     *
     * @var array
     */
    private $jsonResponse = [
        'success' => false,
        'errors' => [],
        'message' => "",
        'data' => [],
    ];

    /**
     * Set success response status
     *
     * @return object
     */
    protected function success()
    {
        $this->jsonResponse['success'] = true;
        return $this;
    }

    /**
     * Set error results
     *
     * @return object
     */
    protected function setErrors(array $errors = [])
    {
        $this->jsonResponse['errors'] = empty($errors) ?  (isset($this->errors) && is_array($this->errors) ? $this->errors : []) : $errors;
        return $this;
    }

    /**
     * Set response message
     *
     * @param string $message
     * @return object
     */
    protected function message(string $message = '')
    {
        $this->jsonResponse['message'] = $message;
        return $this;
    }

    /**
     * Return formatted JSON response
     *
     * @param (string|array|object|int)[] $data
     * @param integer $httpStatus
     * @param string[] $headers
     * @return \Illuminate\Http\JsonResponse
     */
    protected function response(array $data = [], int $httpStatus = 200, array $headers = [], int $option = 0)
    {
        $this->jsonResponse['data'] = $data;

        return response()->json(
            $this->jsonResponse,
            $httpStatus,
            $headers,
            $option
        );
    }
}
