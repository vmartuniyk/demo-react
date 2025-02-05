<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UserStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => ['required', 'max:50'],
            'last_name' => ['required', 'max:50'],
            'email' => ['required', 'max:50', 'email', Rule::unique('users')],
            'organization_id' => ['nullable', Rule::exists('organizations', 'id')->where(function ($query) {
                $query->where('account_id', Auth::user()->account_id);
            })],
            'password' => ['nullable'],
            'owner' => ['required', 'boolean'],
            'photo' => ['nullable', 'image'],
        ];
    }
}
