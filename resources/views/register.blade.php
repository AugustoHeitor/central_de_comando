@extends('layouts.template')

@section('title', 'Cadastro')

@section('links')
    <link rel="stylesheet" href="{{asset('css/register.css')}}">
@endsection

@section('scripts')

@endsection

@section('content')
    <main class="d-grid justify-center items-center">
        <section class="bg-gradient d-flex flex-column w-full h-full justify-start items-center gap-lg">
            <div class="d-flex flex-column justify-center items-center gap-lg">
                <div class="d-flex flex-column justify-center items-center gap-sm">
                    <img src="{{ asset('imgs/logo.svg') }}" alt="Logo" class="img-size-60 animation-pulse">
                    <div class="d-flex flex-column justify-center items-center gap-md">
                        <h1 class="text-3xl color-light">{{ config('app.name') }}</h1>
                        <p class="text-base color-light">Sua jornada para uma vida equilibrada</p>
                    </div>
                </div>
                <ul class="d-flex flex-column justify-start items-start gap-md">
                    <li class="d-flex justify-start items-center gap-md">
                        <img src="{{ asset('imgs/circle-check.svg') }}" alt="Check" class="img-size-15">
                        <p class="text-base color-light">
                            Acompanhe seu progresso pessoal
                        </p>
                    </li>
                    <li class="d-flex justify-start items-center gap-md">
                        <img src="{{ asset('imgs/circle-check.svg') }}" alt="Check" class="img-size-15">
                        <p class="text-base color-light">
                            Melhore seus hábitos diários
                        </p>
                    </li>
                    <li class="d-flex justify-start items-center gap-md">
                        <img src="{{ asset('imgs/circle-check.svg') }}" alt="Check" class="img-size-15">
                        <p class="text-base color-light">
                            Alcance seu potencial máximo
                        </p>
                    </li>
                </ul>
            </div>
        </section>
        <section class="d-flex flex-column w-full h-full justify-center items-center gap-md">
            <div class="d-flex flex-column w-full w-mx-400 justify-center items-center gap-md">
                <div class="d-flex flex-column justify-start items-start gap-sm">
                    <h2 class="color-dark text-2xl">Crie sua conta</h2>
                    <p class="color-secondary text-base">Comece sua jornada de autoconhecimento e crescimento pessoal</p>
                </div>
                <form action="#" class="w-full d-flex flex-column justify-center items-center gap-md">
                    <div class="w-full d-flex flex-column justify-start items-start gap-lg">
                        <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                            <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                                <label class="color-dark text-base" for="email">Nome completo</label>
                                <div class="container-focus-scale d-flex justify-start items-center gap-sm bg-light w-full radius-sm bd-shadow-primary pt-md">
                                    <input type="text" class="w-full text-base color-secondary">
                                </div>
                            </div>
                            <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                                <label class="color-dark text-base" for="email">E-mail</label>
                                <div class="container-focus-scale d-flex justify-start items-center gap-sm bg-light w-full radius-sm bd-shadow-primary pt-md">
                                    <input type="email" class="w-full text-base color-secondary">
                                </div>
                            </div>
                            <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                                <label class="color-dark text-base" for="password">Senha</label>
                                <div class="container-focus-scale d-flex justify-start items-center gap-sm bg-light w-full radius-sm bd-shadow-primary pt-md">
                                    <input type="password" class="w-full text-base color-secondary">
                                </div>
                            </div>
                        </div>
                        <div class="w-full d-flex flex-column justify-start items-start gap-lg">
                            <h3 class="text-lg color-dark fw-sb">Nos conte sobre você</h3>
                            <div class="w-full d-flex flex-column justify-start items-start gap-md">
                                <div class="w-full d-flex flex-column justify-start items-start gap-md">
                                    <h4 class="text-base color-dark fw-m">Como você classificaria seu nível atual de estresse?</h4>
                                    <ul class="w-full d-flex flex-column justify-start items-start gap-sm">
                                        <li>
                                            <label class="text-base color-dark">
                                                <input type="radio" name="level" value="low">
                                                Baixo - Consigo lidar bem
                                            </label>
                                        </li>
                                        <li>
                                            <label class="text-base color-dark">
                                                <input type="radio" name="level" value="moderate">
                                                Moderado - Algumas dificuldades
                                            </label>
                                        </li>
                                        <li>
                                            <label class="text-base color-dark">
                                                <input type="radio" name="level" value="high">
                                                Alto - Muitas vezes sobrecarregado
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                                <div class="w-full d-flex flex-column justify-start items-start gap-md">
                                    <h4 class="text-base color-dark fw-m">Quantas horas você dorme em média por noite?</h4>
                                    <div class="d-flex justify-start items-center gap-sm bg-light w-full radius-sm bd-shadow-primary pt-md">                            
                                        <select class="w-full text-base color-secondary">
                                            <option value="" disabled selected>Selecione</option>
                                            <option value="less_than_4">Menos de 4 horas</option>
                                            <option value="4_to_6">De 4 a 6 horas</option>
                                            <option value="6_to_8">De 6 a 8 horas</option>
                                            <option value="more_than_8">Mais de 8 horas</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="w-full d-flex flex-column justify-start items-start gap-md">
                                    <h4 class="text-base color-dark fw-m">Quais áreas da sua vida você gostaria de melhorar? (selecione até 3)</h4>
                                    <ul class="w-full d-flex flex-column justify-start items-start gap-sm">
                                        <li>
                                            <label class="text-base color-dark">
                                                <input type="checkbox" name="life_areas" value="physical_health">
                                                Saúde física
                                            </label>
                                        </li>
                                        <li>
                                            <label class="text-base color-dark">
                                                <input type="checkbox" name="life_areas" value="mental_health">
                                                Saúde mental
                                            </label>
                                        </li>
                                        <li>
                                            <label class="text-base color-dark">
                                                <input type="checkbox" name="life_areas" value="productivity">
                                                Produtividade
                                            </label>
                                        </li>
                                        <li>
                                            <label class="text-base color-dark">
                                                <input type="checkbox" name="life_areas" value="relationships">
                                                Relacionamentos
                                            </label>
                                        </li>
                                        <li>
                                            <label class="text-base color-dark">
                                                <input type="checkbox" name="life_areas" value="finances">
                                                Finanças
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="hover-scale w-full d-flex justify-center items-center gap-sm bg-gradient w-full color-light text-sm pt-md radius-sm fw-sb">
                        Começar minha jornada
                    </button>
                </form>
                <div class="d-flex justify-start items-start gap-sm">
                    <p class="color-secondary text-sm">
                        Já tem uma conta?
                        <a href="{{ route('login') }}" class="text-sm">Faça login</a>
                    </p>
                </div>
                <div class="w-full d-flex justify-start items-start">
                    <p class="w-full color-secondary text-xs text-center">
                        Ao se cadastrar, você concorda com nossos <a href="#" class="text-xs color-secondary">Termos de Serviço</a> e <a href="#" class="text-xs color-secondary">Política de Privacidade</a>.
                    </p>
                </div>
            </div>
        </section>
    </main>
@endsection