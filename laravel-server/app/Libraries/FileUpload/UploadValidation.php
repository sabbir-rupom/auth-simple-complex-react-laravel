<?php

namespace App\Libraries\FileUpload;

use Illuminate\Support\Facades\Validator;

class UploadValidation
{

    private $rules;
    private $messages;

    function __construct(public $input)
    {
        $this->messages = [];
        $this->rules['upload'] = [
            'required',
            'file'
        ];
    }

    public function setRules(string $rule)
    {
        $this->rules['upload'][] = $rule;
    }

    public function setMessages(string $rule, string $message)
    {
        $this->messages["upload.$rule"] = $message;
    }

    public function validate()
    {
        $validator = Validator::make([
            'upload' => $this->input
        ], $this->rules, $this->messages);

        if ($validator->fails()) {
            return $validator->errors()->first();
        }

        return false;
    }
}
