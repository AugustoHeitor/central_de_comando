<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskCategoryController;
use App\Http\Controllers\FinancialCategoryController;
use App\Http\Controllers\FinancialTransactionController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskTimeLogController;
use App\Http\Controllers\DashboardController;

// Rotas públicas (sem autenticação)
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

Route::post('/login', [AuthController::class, 'login']);

// Rotas protegidas por autenticação
Route::middleware('auth')->group(function () {

    // Views principais do sistema
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    Route::get('/financial', function () {
        return view('financial');
    })->name('financial');

    Route::get('/settings', function () {
        return view('settings');
    })->name('settings');

    Route::get('/tasks', function () {
        return view('tasks');
    })->name('tasks');

    // Logout
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

    // Atualização de dados do usuário
    Route::post('/api/user/update', [UserController::class, 'update'])->name('user.update');

    // Rotas API para categorias de tarefas
    Route::prefix('api/task-categories')->group(function () {
        Route::get('/', [TaskCategoryController::class, 'index'])->name('task-categories.index');
        Route::post('/', [TaskCategoryController::class, 'store'])->name('task-categories.store');
        Route::patch('/{id}', [TaskCategoryController::class, 'update'])->name('task-categories.update');
        Route::delete('/{id}', [TaskCategoryController::class, 'destroy'])->name('task-categories.destroy');
    });

    // Rotas API para categorias do financeiro
    Route::prefix('api/financial-categories')->group(function () {
        Route::get('/', [FinancialCategoryController::class, 'index'])->name('financial-categories.index');
        Route::post('/', [FinancialCategoryController::class, 'store'])->name('financial-categories.store');
        Route::patch('/{id}', [FinancialCategoryController::class, 'update'])->name('financial-categories.update');
        Route::delete('/{id}', [FinancialCategoryController::class, 'destroy'])->name('financial-categories.destroy');
    });

    // Rotas API para tarefas
    Route::prefix('api/tasks')->group(function () {
        Route::get('/', [TaskController::class, 'index'])->name('tasks.index');
        Route::post('/', [TaskController::class, 'store'])->name('tasks.store');
        Route::patch('/{id}', [TaskController::class, 'update'])->name('tasks.update');
        Route::delete('/{id}', [TaskController::class, 'destroy'])->name('tasks.destroy');
    });

    // Rotas API para registro de tempo das tarefas
    Route::prefix('api/task-time-logs')->group(function () {
        Route::post('/start/{task_id}', [TaskTimeLogController::class, 'startTimeLog'])->name('task-time-logs.start.startTimeLog');
        Route::patch('/stop/{task_id}', [TaskTimeLogController::class, 'stopTimeLog'])->name('task-time-logs.stop.stopTimeLog');
        Route::delete('/{time_log_id}', [TaskTimeLogController::class, 'destroy'])->name('task-time-logs.destroy');
        Route::patch('/{time_log_id}', [TaskTimeLogController::class, 'update'])->name('task-time-logs.update');
    });

    // Rotas API para Transações
    Route::prefix('api/financial-transactions')->group(function () {
        Route::get('/', [FinancialTransactionController::class, 'index'])->name('transactions.index');
        Route::post('/', [FinancialTransactionController::class, 'store'])->name('transactions.store');
        Route::patch('/{id}', [FinancialTransactionController::class, 'update'])->name('transactions.update');
        Route::delete('/{id}', [FinancialTransactionController::class, 'destroy'])->name('transactions.destroy');
    });

    // Rotas API para Dashboard
    Route::prefix('api/dashboard')->group(function () {
        Route::get('/tasks', [DashboardController::class, 'indexTasks'])->name('dashboard.indexTasks');
        Route::get('/financial-transactions', [DashboardController::class, 'indexFinancialTransactions'])->name('dashboard.indexFinancialTransactions');
    });
});
