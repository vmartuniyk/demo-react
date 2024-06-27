<?php

namespace App\Http\Requests;

use App\Traits\LockedDemoUser;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest
{
    use LockedDemoUser;

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
            'email' => ['required', 'max:50', 'email',
                Rule::unique('users')->ignore($this->route('user')->id),
            ],
            'organization_id' => ['nullable', Rule::exists('organizations', 'id')->where(function ($query) {
                $query->where('account_id', Auth::user()->account_id);
            })],
            'password' => ['nullable'],
            'owner' => ['required', 'boolean'],
            'photo' => ['nullable', 'image'],
        ];
    }
}
