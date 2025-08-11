<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Traits\ApiResponserTrait;

class AuthController extends Controller
{
    use ApiResponserTrait;

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);
        } catch (ValidationException $e) {
            return $this->errorResponse('Validation Error.', $e->errors(), 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return $this->errorResponse('Invalid credentials.', [], 401);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return $this->successResponse('User logged in successfully.', ['token' => $token]);
    }
}
