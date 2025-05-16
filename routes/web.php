<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }
    return view('login');
});

Route::get('/login', function () {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }
    return view('login');
})->name('login');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    Route::get('/tasks', function () {
        return view('tasks');
    })->name('tasks');

    Route::get('/financial', function () {
        return view('financial');
    })->name('financial');

    Route::get('/settings', function () {
        return view('settings');
    })->name('settings');

    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
});

Route::post('/login', [AuthController::class, 'login']);