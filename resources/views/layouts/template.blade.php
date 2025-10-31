<!DOCTYPE html>
<html lang="pt-BR" class="w-full h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @yield('metas')

    <title>{{ config('app.name') }} | @yield('title')</title>
    <link rel="icon" href="{{ asset('imgs/satellite-light.svg') }}" type="image/svg+xml">
    <link rel="stylesheet" href="{{asset('css/globalStyles.css')}}">
    <link rel="stylesheet" href="{{asset('css/reset.css')}}">
    <link rel="stylesheet" href="{{asset('css/layouts/template.css')}}">

    @if (Auth::check())
        <link rel="stylesheet" href="{{asset('css/layouts/sideMenu.css')}}">
        <link rel="stylesheet" href="{{asset('css/layouts/menuMobile.css')}}">
    @endif

    @yield('links')
    @yield('scripts')
</head>
<body class="w-full h-full {{ Auth::check() ? 'd-flex' : '' }}">

    <div class="{{ Auth::check() ? 'body-container' : 'w-full h-full' }}">
        @if (Auth::check())
            @include('layouts.sideMenu')
            @include('layouts.menuMobile')
        @endif
        @yield('content')
    </div>
</body>
</html>
