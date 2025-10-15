@extends('layouts.template')

@section('title', 'Login')

@section('links')
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="{{asset('css/login.css')}}">
    <link rel="stylesheet" href="{{asset('css/pageLoading.css')}}">
@endsection

@section('scripts')
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script type="module" defer src="{{asset('js/initializers/pageLogin.js')}}"></script>
@endsection

@section('content')
    <main class="d-flex justify-center items-center h-full w-full">
        <section class="d-flex flex-column w-full h-full justify-center items-center gap-md">
            <div class="d-flex flex-column w-full h-full justify-center items-center gap-md">
                <div class="d-flex flex-column justify-center items-center gap-md">
                    <img src="{{ asset('imgs/satellite-light.svg') }}" alt="Logo" class="img-size-60 animation-pulse">
                    <h1 class="text-3xl color-light">{{ config('app.name') }}</h1>
                </div>
                <div class="d-flex flex-column w-full w-mx-400 justify-center items-center gap-lg">
                    <div class="d-flex flex-column justify-center items-center gap-sm">
                        <p class="color-primary text-sm">Acesso ao Sistema de Controle</p>
                    </div>
                    <form action="#" class="w-full d-flex flex-column justify-center items-center gap-md">
                        @csrf
                        <div class="w-full d-flex flex-column justify-start items-start gap-md">
                            <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                                <label class="color-light text-base" for="email">E-mail</label>
                                <div class="container-focus-scale d-flex justify-start items-center gap-sm bg-transparent w-full radius-lg pt-md bd-primary">
                                    <img src="{{ asset('imgs/email-light.svg') }}" alt="Email" class="img-size-20">
                                    <input type="email" name="email" class="w-full text-base color-primary" required>
                                </div>
                            </div>
                            <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                                <label class="color-light text-base" for="password">Senha</label>
                                <div class="container-focus-scale d-flex justify-start items-center gap-sm bg-transparent w-full radius-lg pt-md bd-primary">
                                    <img src="{{ asset('imgs/lock-light.svg') }}" alt="Senha" class="img-size-20">
                                    <input type="password" name="password" class="w-full text-base color-primary" required>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="bg-tertiary bd-shadow-secondary bg-btn-save hover-scale w-full d-flex justify-center items-center gap-sm w-full color-light text-sm pt-md radius-lg fw-sb">
                            <img src="{{ asset('imgs/right-bracket.svg') }}" alt="Login" class="img-size-20">
                            Acessar Sistema
                        </button>
                    </form>
                </div>
            </div>
        </section>
    </main>
@endsection
