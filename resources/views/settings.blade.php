@extends('layouts.template')

@section('title', 'Financeiro')

@section('links')
    <link rel="stylesheet" href="{{asset('css/financial.css')}}">
    <link rel="stylesheet" href="{{asset('css/layouts/modal.css')}}">
@endsection

@section('scripts')
  
@endsection

@section('modals')

@endsection

@section('content')
    <main class="h-full w-full d-flex justify-start items-center flex-column gap-md w-mx-1200">
        @php

            $content = '
                <div class="d-flex justify-start items-start gap-md">
                    
                </div>
            ';

            $imgPageHeader = 'imgs/config-dark.svg';

        @endphp

        @include('layouts.pageHeader', [
            'img' => $imgPageHeader,
            'title' => 'Configurações',
            'content' => $content
        ])

        <form action="#" class="w-full d-flex flex-column align-start justify-between gap-md h-full overflow-hidden">
    
            <div class="w-full d-flex flex-column align-start justify-start gap-md h-full scroll-auto">
                <div class="w-full pt-md radius-lg bd-primary bg-light d-flex flex-column items-center justify-center gap-lg">
                    <h3 class="color-dark text-base fw-m">Foto do Perfil</h3>
                    <div class="w-full d-flex flex-column items-center justify-center gap-lg">
                        <div class="overflow-hidden radius-50p d-flex items-center justify-center bg-light bd-primary w-130 h-130">
                            <label for="upload-photo" class="pointer">
                                <img src="{{ asset('imgs/eu.png') }}" alt="Perfil" class="img-size-100p" onerror="this.src='{{ asset('imgs/image-dark.svg') }}'">
                            </label>
                            <input type="file" id="upload-photo" class="none">
                        </div>
                        <button type="button" class="w-full d-flex justify-center items-center gap-sm color-light text-sm pt-btn-primary radius-lg fw-m bd-primary w-mx-280 bg-btn-delete">
                            <img src="{{ asset('imgs/trash-light.svg') }}" alt="Deletar" class="img-size-15">
                            Deletar Foto
                        </button>
                    </div>
                </div>

                <div class="w-full pt-md radius-lg bd-primary bg-light d-flex flex-column items-start justify-start gap-lg">
                    <h3 class="color-dark text-base fw-m">Informações Pessoais</h3>
                    <div class="w-full d-flex flex-column items-start justify-start gap-lg">
                        <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                            <div class="d-flex justify-start items-center gap-sm">
                                <img src="{{ asset('imgs/user-dark.svg') }}" alt="full-name" class="img-size-15">
                                <label class="color-dark text-base fw-m" for="full-name">Nome Completo</label>
                            </div>
                            <div class="d-flex items-center justify-between w-full w-mx-400 bg-light pt-input-primary bd-primary radius-lg">
                                <input type="text" name="full-name" class="text-base color-secondary w-full">
                            </div>
                        </div>
                        <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                            <div class="d-flex justify-start items-center gap-sm">
                                <img src="{{ asset('imgs/nickname-dark.svg') }}" alt="nickname" class="img-size-15">
                                <label class="color-dark text-base fw-m" for="nickname">Apelido</label>
                            </div>
                            <div class="d-flex items-center justify-between w-full w-mx-400 bg-light pt-input-primary bd-primary radius-lg">
                                <input type="text" name="nickname" class="text-base color-secondary w-full">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full pt-md radius-lg bd-primary bg-light d-flex flex-column items-start justify-start gap-lg">
                    <h3 class="color-dark text-base fw-m">Endereço de E-mail</h3>
                    <div class="w-full d-flex flex-column items-start justify-start gap-lg">
                        <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                            <div class="d-flex justify-start items-center gap-sm">
                                <img src="{{ asset('imgs/email-dark.svg') }}" alt="Email" class="img-size-15">
                                <label class="color-dark text-base fw-m" for="email">E-mail</label>
                            </div>
                            <div class="d-flex items-center justify-between w-full w-mx-400 bg-light pt-input-primary bd-primary radius-lg">
                                <input type="email" name="email" class="text-base color-secondary w-full">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full pt-md radius-lg bd-primary bg-light d-flex flex-column items-start justify-start gap-lg">
                    <h3 class="color-dark text-base fw-m">Alteração de Senha</h3>
                    <div class="w-full d-flex flex-column items-start justify-start gap-lg">
                        <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                            <div class="d-flex justify-start items-center gap-sm">
                                <img src="{{ asset('imgs/lock-dark.svg') }}" alt="Senha" class="img-size-15">
                                <label class="color-dark text-base fw-m" for="current-password">Senha Atual</label>
                            </div>
                            <div class="d-flex items-center justify-between w-full w-mx-400 bg-light pt-input-primary bd-primary radius-lg">
                                <input type="password" id="current-password" class="text-base color-secondary w-full">
                            </div>
                        </div>

                        <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                            <div class="d-flex justify-start items-center gap-sm">
                                <img src="{{ asset('imgs/lock-dark.svg') }}" alt="Senha" class="img-size-15">
                                <label class="color-dark text-base fw-m" for="new-password">Nova Senha</label>
                            </div>
                            <div class="d-flex items-center justify-between w-full w-mx-400 bg-light pt-input-primary bd-primary radius-lg">
                                <input type="password" id="new-password" class="text-base color-secondary w-full">
                            </div>
                        </div>

                        <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                            <div class="d-flex justify-start items-center gap-sm">
                                <img src="{{ asset('imgs/lock-dark.svg') }}" alt="Senha" class="img-size-15">
                                <label class="color-dark text-base fw-m" for="confirm-password">Confirmar Nova Senha</label>
                            </div>
                            <div class="d-flex items-center justify-between w-full w-mx-400 bg-light pt-input-primary bd-primary radius-lg">
                                <input type="password" id="confirm-password" class="text-base color-secondary w-full">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-ful d-flex items-end justify-end">
                <button type="submit" class="hover-scale w-full d-flex justify-center items-center gap-sm w-full color-light text-sm pt-btn-primary radius-lg fw-m bg-btn-save w-mx-280">
                    <img src="{{ asset('imgs/save.svg') }}" alt="Salvar" class="img-size-15">
                    Salvar
                </button>
            </div>
        </form>
        
    </main>
@endsection

<script type="module"> 


</script>