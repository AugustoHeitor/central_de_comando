<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('login');
});

Route::get('/login', function () {
    return view('login');
})->name('login');

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

