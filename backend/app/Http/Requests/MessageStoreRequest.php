<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MessageStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'role' => ['nullable', 'in:user,assistant,system'],
            'content' => ['required', 'string', 'min:1'],
            'model' => ['nullable', 'string', 'max:100'],
        ];
    }
}
