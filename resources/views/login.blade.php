@extends('layouts.template')

@section('title', 'Login')

@section('links')
    <link rel="stylesheet" href="{{asset('css/login.css')}}">
@endsection

@section('scripts')

@endsection

@section('content')
    <main class="d-flex w-full h-full justify-center items-center">
        <section class="pt-md bg-gradient d-flex flex-column w-full h-full justify-center items-center gap-lg">
            <div class="d-flex flex-column justify-center items-center gap-sm">
                <img src="{{ asset('imgs/logo.svg') }}" alt="Logo" class="img-logo animation-pulse">
                <div class="d-flex flex-column justify-center items-center gap-md">
                    <h1 class="text-3xl color-light">{{ config('app.name') }}</h1>
                    <p class="text-base color-light">Sua jornada para uma vida equilibrada</p>
                </div>
            </div>
            <ul class="d-flex flex-column justify-start items-start gap-md">
                <li class="d-flex justify-start items-center gap-md">
                    <img src="{{ asset('imgs/circle-check.svg') }}" alt="Check" class="img-circle-check">
                    <p class="text-base color-light">
                        Acompanhe seu progresso pessoal
                    </p>
                </li>
                <li class="d-flex justify-start items-center gap-md">
                    <img src="{{ asset('imgs/circle-check.svg') }}" alt="Check" class="img-circle-check">
                    <p class="text-base color-light">
                        Melhore seus hábitos diários
                    </p>
                </li>
                <li class="d-flex justify-start items-center gap-md">
                    <img src="{{ asset('imgs/circle-check.svg') }}" alt="Check" class="img-circle-check">
                    <p class="text-base color-light">
                        Alcance seu potencial máximo
                    </p>
                </li>
            </ul>
        </section>
        <section class="pt-md d-flex flex-column w-full h-full justify-center items-center gap-md">
            <div class="d-flex flex-column w-full w-mx-400 justify-center items-center gap-md">
                <div class="d-flex flex-column justify-center items-center gap-sm">
                    <h2 class="color-dark text-2xl">Viva com mais leveza</h2>
                    <p class="color-secondary text-base">Rotina, tarefas e finanças com clareza</p>
                </div>
                <form action="#" class="w-full d-flex flex-column justify-center items-center gap-md">
                    <div class="w-full d-flex flex-column justify-start items-start gap-md">
                        <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                            <label class="color-dark text-base" for="email">E-mail</label>
                            <div class="container-focus-scale d-flex justify-start items-center gap-sm bg-light w-full radius-sm bd-shadow-primary pt-md">
                                <img src="{{ asset('imgs/email.svg') }}" alt="Email" class="img-size-20">
                                <input type="email" class="w-full text-base color-secondary">
                            </div>
                        </div>
                        <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                            <label class="color-dark text-base" for="password">Senha</label>
                            <div class="container-focus-scale d-flex justify-start items-center gap-sm bg-light w-full radius-sm bd-shadow-primary pt-md">
                                <img src="{{ asset('imgs/lock.svg') }}" alt="Senha" class="img-size-20">
                                <input type="password" class="w-full text-base color-secondary">
                            </div>
                        </div>
                    </div>
                    <button class="hover-scale w-full d-flex justify-center items-center gap-sm bg-gradient w-full color-light text-sm pt-md radius-sm fw-sb">
                        <img src="{{ asset('imgs/right-bracket.svg') }}" alt="Login" class="img-size-20">
                        Acessar minha conta
                    </button>
                </form>
                <div class="d-flex justify-start items-start gap-sm">
                    <p class="color-secondary text-sm">
                        Não tem uma conta?
                        <a href="#" class="text-sm">Cadastre-se agora</a>
                    </p>
                </div>
                <div class="w-full d-flex justify-start items-start">
                    <p class="w-full color-secondary text-xs text-center">
                        Ao continuar, você concorda com nossos <a href="#" class="text-xs color-secondary">Termos de Serviço</a> e <a href="#" class="text-xs color-secondary">Política de Privacidade</a>.
                    </p>
                </div>
            </div>
        </section>
    </main>
@endsection