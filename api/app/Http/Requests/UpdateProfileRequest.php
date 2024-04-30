<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'gender'        => 'required|integer|exists:genders,id',
            'description'   => 'required|string|max:200',
            'birthdate'     => 'required|date',
            'gender_pref'   => 'required|integer|exists:genders,id',
            'bandera'       => 'required|exists:banderas,id',
            'upload'        => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
}
