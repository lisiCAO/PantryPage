<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class ParseTokenFromCookie
{

    public function handle(Request $request, Closure $next): Response
    {
        // get JWT from cookie
        if ($jwt = $request->cookie('jwt')) {
            // set the JWT on the request
            $request->headers->set('Authorization', 'Bearer ' . $jwt);
        }

        try {
            // attempt to resolve the user with the token
            JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            // if the token is invalid return 401
            return response()->json(['success'=> 'false', 'message' => 'Access denied'], 403);
        }

        return $next($request);
    }
}
