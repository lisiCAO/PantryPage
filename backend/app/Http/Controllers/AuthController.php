<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\UserDetailResource;


/**
 * Class AuthController
 * 
 * This class is responsible for handling authentication related operations.
 */
class AuthController extends Controller
{
    /**
     * Handle user login request.
     * 
     * @param Request $request The HTTP request object.
     * @return JsonResponse The JSON response containing the token and a cookie.
     */
    public function login(Request $request) {
        $credentials = $request->only(['email', 'password']);

        if (!$token = JWTAuth::attempt($credentials)) {
            return $this->sendError('Invalid email or password', [], 401);
        }
    
        return $this->createNewToken($token);
    }

    /**
     * Handle user logout request.
     * 
     * @return JsonResponse The JSON response indicating successful logout.
     */
    public function logout() {
        $user = Auth::user();
 
        JWTAuth::invalidate(JWTAuth::getToken());

        return $this->sendResponse($user->email,'Successfully logged out');
    }

    /**
     * Create a new token response.
     * 
     * @param string $token The JWT token.
     * @return JsonResponse The JSON response containing the token type, expiration time, and user information.
     */
    protected function createNewToken($token){
        $user = Auth::user();
        
        $result = [
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user' => new UserDetailResource($user),
            'token' => $token
        ];
        return $this->sendResponse($result, 'Login successful');
    }
    public function refreshToken(Request $request) {
        try {
            $refreshToken = JWTAuth::getToken();
            
            $newToken = JWTAuth::refresh($refreshToken); 

            return $this->sendResponse(['token' => $newToken], 'Token refreshed');

        } catch (TokenExpiredException $e) {
            return $this->sendError('Token expired', [], 401);
        } catch (TokenInvalidException $e) {
            return $this->sendError('Invalid token', [], 401);
        } catch (JWTException $e) {
            return $this->sendError('Token absent', [], 401);
        }
    }
}
