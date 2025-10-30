<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class ReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules()
    {
        return [
            'start_deadline' => 'nullable|date',
            'end_deadline'   => 'nullable|date',
        ];
    }
}
