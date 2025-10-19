@extends('layouts.template')

@section('title', 'Financeiro')

@section('metas')
    <meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('links')
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="{{asset('css/settings.css')}}">
    <link rel="stylesheet" href="{{asset('css/layouts/modal.css')}}">
@endsection

@section('scripts')
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script type="module" defer src="{{asset('js/initializers/pageSettings.js')}}"></script>
@endsection

@section('content')
    <main class="fade-in h-full w-full d-flex justify-start items-center flex-column gap-md w-mx-1200 scroll-y-mobile">
        @php

            $content = '
                <div class="d-flex justify-start items-start gap-md">

                </div>
            ';

            $imgPageHeader = 'imgs/config-light.svg';

        @endphp

        @include('layouts.pageHeader', [
            'img' => $imgPageHeader,
            'title' => 'Configurações',
            'content' => $content
        ])

        <form action="#" class="w-full d-flex flex-column align-start justify-start gap-md h-full">

            <div class="w-full d-flex flex-column align-start justify-start gap-md">
                <div class="w-full pt-md radius-lg bd-shadow-primary bg-secondary d-flex flex-column items-center justify-center gap-lg">
                    <h3 class="color-light text-xl fw-m">Foto do Perfil</h3>
                    <div class="w-full d-flex flex-column items-center justify-center gap-md">
                        <div class="overflow-hidden radius-50p d-flex items-center justify-center bg-secondary w-130 h-130">
                            <label for="upload-photo" class="pointer">
                                <img id="upload-img-profile" src="{{ asset(Auth::user()->photo) }}" alt="Perfil" class="img-preview-default" onerror="this.src='{{ asset('imgs/photo-default.png') }}';">
                            </label>
                            <input type="file" name="photo" id="upload-photo" class="none">
                        </div>

                        <div class="w-full d-flex items-center justify-center flex-column gap-sm">
                            <button id="btn-delete-upload" type="button" class="w-full d-flex justify-center items-center gap-sm color-light text-sm pt-btn-primary radius-lg fw-m bd-shadow-secondary w-mx-280 bg-btn-delete hover-scale">
                                <img src="{{ asset('imgs/trash-light.svg') }}" alt="Deletar" class="img-size-15">
                                Deletar Foto
                            </button>
                            <button type="button" id="btn-upload-photo" class="bg-btn-create bd-shadow-secondary d-flex justify-center items-center gap-sm pt-btn-primary radius-lg h-36 w-full w-mx-280 color-light text-sm fw-m hover-scale">
                                <img src="{{asset('imgs/upload-light.svg')}}" alt="Upload" class="img-size-15">
                                Carregar foto
                            </button>
                        </div>
                    </div>
                </div>

                <div class="w-full pt-md radius-lg bd-shadow-primary bg-secondary d-flex flex-column items-start justify-start gap-lg">
                    <h3 class="color-light text-xl fw-m">Informações Pessoais</h3>
                    <div class="w-full d-flex items-start justify-start gap-lg">
                        <div class="w-full d-flex flex-column items-start justify-start gap-lg w-mx-400">
                            <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                                <div class="d-flex justify-start items-center gap-sm">
                                    <img src="{{ asset('imgs/user-light.svg') }}" alt="Nome Completo" class="img-size-15">
                                    <label class="color-light text-base fw-m" for="full_name">Nome Completo</label>
                                </div>
                                <div class="d-flex items-center justify-between w-full  bg-secondary pt-input-primary bd-primary radius-lg">
                                    <input value="{{Auth::user()->full_name}}" type="text" name="full_name" class="text-base color-primary w-full">
                                </div>
                            </div>
                            <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                                <div class="d-flex justify-start items-center gap-sm">
                                    <img src="{{ asset('imgs/nickname-light.svg') }}" alt="nickname" class="img-size-15">
                                    <label class="color-light text-base fw-m" for="nickname">Apelido</label>
                                </div>
                                <div class="d-flex items-center justify-between w-full  bg-secondary pt-input-primary bd-primary radius-lg">
                                    <input value="{{Auth::user()->nickname }}" type="text" name="nickname" class="text-base color-primary w-full">
                                </div>
                            </div>
                        </div>
                        <div class="w-full d-flex flex-column items-start justify-start gap-lg w-mx-400">
                            <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                                <div class="d-flex justify-start items-center gap-sm">
                                    <img src="{{ asset('imgs/email-light.svg') }}" alt="Email" class="img-size-15">
                                    <label class="color-light text-base fw-m" for="email">E-mail</label>
                                </div>
                                <div class="d-flex items-center justify-between w-full  bg-secondary pt-input-primary bd-primary radius-lg">
                                    <input value="{{Auth::user()->email}}" disabled type="email" name="email" class="cursor-blocked text-base color-primary w-full">
                                </div>
                            </div>
                            <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                                <div class="d-flex justify-start items-center gap-sm">
                                    <img src="{{ asset('imgs/lock-light.svg') }}" alt="Senha" class="img-size-15">
                                    <label class="color-light text-base fw-m" for="new_password">Nova Senha</label>
                                </div>
                                <div class="d-flex items-center justify-between w-full  bg-secondary pt-input-primary bd-primary radius-lg">
                                    <input type="password" name="new_password" class="text-base color-primary w-full">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full d-flex items-end justify-end">
                <button type="submit" class="hover-scale w-full d-flex justify-center items-center gap-sm w-full color-light text-sm pt-btn-primary radius-lg fw-m bg-btn-save bd-shadow-secondary w-mx-280 b">
                    <img src="{{ asset('imgs/save-light.svg') }}" alt="Salvar" class="img-size-15">
                    Salvar
                </button>
            </div>
        </form>

    </main>
@endsection

