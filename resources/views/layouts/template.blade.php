<!DOCTYPE html>
<html lang="pt-BR" class="w-full h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name') }} | @yield('title')</title>
    <link rel="icon" href="{{ asset('imgs/satellite-solid.svg') }}" type="image/svg+xml">
    <link rel="stylesheet" href="{{asset('css/globalStyles.css')}}">
    <link rel="stylesheet" href="{{asset('css/reset.css')}}">
    <link rel="stylesheet" href="{{asset('css/layouts/template.css')}}">

    @if (true)
        <link rel="stylesheet" href="{{asset('css/layouts/sideMenu.css')}}">
        <link rel="stylesheet" href="{{asset('css/layouts/menuMobile.css')}}">
    @endif

    @yield('links')
    @yield('scripts')
</head>
<body class="w-full h-full {{ true ? 'd-flex' : '' }}">

    <div class="{{ true ? 'body-container' : '' }}">
        @if (true)
            @include('layouts.sideMenu')
            @include('layouts.menuMobile')
        @endif
        @yield('content') 
    </div>

    @yield('modals') 
</body>
</html>