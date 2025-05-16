@extends('layouts.template')

@section('title', 'Login')

@section('links')
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="{{asset('css/login.css')}}">
@endsection

@section('scripts')
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script defer src="{{asset('js/login.js')}}"></script>
@endsection

@section('content')
    <main class="d-flex justify-center items-center h-full w-full">
        <section class="pt-md bg-gradient d-flex flex-column w-full h-full justify-center items-center gap-lg">
            <div class="d-flex flex-column justify-center items-center gap-lg">
                <div class="d-flex flex-column justify-center items-center gap-sm">
                    <img src="{{ asset('imgs/satellite-solid.svg') }}" alt="Logo" class="img-size-60 animation-pulse">
                    <div class="d-flex flex-column justify-center items-center gap-md">
                        <h1 class="text-3xl color-light">{{ config('app.name') }}</h1>
                        <p class="text-base color-light">Tudo muda quando você assume o comando
                        </p>
                    </div>
                </div>
                <ul class="d-flex flex-column justify-start items-start gap-md">
                    <li class="d-flex justify-start items-center gap-md">
                        <img src="{{ asset('imgs/circle-check.svg') }}" alt="Check" class="img-size-15">
                        <p class="text-base color-light">
                            Gerencie suas tarefas com facilidade
                        </p>
                    </li>
                    <li class="d-flex justify-start items-center gap-md">
                        <img src="{{ asset('imgs/circle-check.svg') }}" alt="Check" class="img-size-15">
                        <p class="text-base color-light">
                            Entenda para onde vai seu dinheiro
                        </p>
                    </li>
                    <li class="d-flex justify-start items-center gap-md">
                        <img src="{{ asset('imgs/circle-check.svg') }}" alt="Check" class="img-size-15">
                        <p class="text-base color-light">
                            Tome decisões com base em dados
                        </p>
                    </li>
                </ul>
            </div>
        </section>
        <section class="pt-md d-flex flex-column w-full h-full justify-center items-center gap-md">
            <div class="d-flex flex-column w-full w-mx-400 justify-center items-center gap-md">
                <div class="d-flex flex-column justify-center items-center gap-sm">
                    <h2 class="color-dark text-2xl">Fazer login</h2>
                    <p class="color-secondary text-base">Organize, controle, conquiste.</p>
                </div>
                <form action="#" class="w-full d-flex flex-column justify-center items-center gap-md">
                    @csrf
                    <div class="w-full d-flex flex-column justify-start items-start gap-md">
                        <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                            <label class="color-dark text-base" for="email">E-mail</label>
                            <div class="container-focus-scale d-flex justify-start items-center gap-sm bg-light w-full radius-lg bd-shadow-primary pt-md">
                                <img src="{{ asset('imgs/email.svg') }}" alt="Email" class="img-size-20">
                                <input type="email" name="email" class="w-full text-base color-secondary" required>
                            </div>
                        </div>
                        <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                            <label class="color-dark text-base" for="password">Senha</label>
                            <div class="container-focus-scale d-flex justify-start items-center gap-sm bg-light w-full radius-lg bd-shadow-primary pt-md">
                                <img src="{{ asset('imgs/lock.svg') }}" alt="Senha" class="img-size-20">
                                <input type="password" name="password" class="w-full text-base color-secondary" required>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="hover-scale w-full d-flex justify-center items-center gap-sm bg-gradient w-full color-light text-sm pt-md radius-lg fw-sb">
                        <img src="{{ asset('imgs/right-bracket.svg') }}" alt="Login" class="img-size-20">
                        Acessar minha conta
                    </button>
                </form>
            </div>
        </section>
    </main>
@endsection