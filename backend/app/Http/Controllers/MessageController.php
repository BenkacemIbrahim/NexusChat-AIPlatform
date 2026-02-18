<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessagesIndexRequest;
use App\Http\Requests\MessageStoreRequest;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function index(MessagesIndexRequest $request)
    {
        $perPage = (int) ($request->validated()['per_page'] ?? 50);
        $query = Message::where('user_id', Auth::id())
            ->orderBy('created_at');

        $paginator = $query->paginate($perPage);

        return response()->json([
            'data' => $paginator->items(),
            'meta' => [
                'total' => $paginator->total(),
                'per_page' => $paginator->perPage(),
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
            ],
        ]);
    }

    public function store(MessageStoreRequest $request)
    {
        $data = $request->validated();

        $message = Message::create([
            'user_id' => Auth::id(),
            'role' => $data['role'] ?? 'user',
            'content' => $data['content'],
            'model' => $data['model'] ?? null,
        ]);

        return response()->json($message, 201);
    }
}
