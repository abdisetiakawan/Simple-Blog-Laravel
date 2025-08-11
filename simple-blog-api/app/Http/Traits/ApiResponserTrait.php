<?php

namespace App\Http\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponserTrait
{
    protected function successResponse(string $message, ?array $data, int $httpResponseCode = 200): JsonResponse
    {
        return response()->json([
            'success'    => true,
            'message'    => $message,
            'data'       => $data,
            'errors'     => null,
        ], $httpResponseCode);
    }

    protected function errorResponse(string $message, ?array $errors = [], int $httpResponseCode = 400): JsonResponse
    {
        return response()->json([
            'success'    => false,
            'message'    => $message ?? null,
            'data'       => null,
            'errors'     => $errors ?? null,
        ], $httpResponseCode);
    }
}
