@extends('layouts.template')

@section('title', 'Tarefas')

@section('links')
    <link rel="stylesheet" href="{{asset('css/tasks.css')}}">
@endsection

@section('scripts')

@endsection

@section('content')
    <main class="w-full h-full">
        @include('layouts.pageHeader', ['title' => 'Minhas Tarefas'])
    </main>
@endsection