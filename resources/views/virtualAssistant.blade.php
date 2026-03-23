@extends('layouts.template')

@section('title', 'Atlas')

@section('metas')
    <meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('links')
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="{{asset('css/pages/virtualAssistant.css')}}">
    <link rel="stylesheet" href="{{asset('css/layouts/modal.css')}}">
@endsection

@section('scripts')
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script type="module" defer src="{{asset('js/initializers/pageVirtualAssistant.js')}}"></script>
@endsection

@section('content')
    <main class="fade-in h-full w-full d-flex justify-start items-center flex-column gap-md w-mx-1200 scroll-y-mobile">

        @php

            $content = '
                <div class="d-flex justify-start items-start gap-md">

                </div>
            ';

            $imgPageHeader = 'imgs/robot-light.svg';

        @endphp

        @include('layouts.pageHeader', [
            'img' => $imgPageHeader,
            'title' => 'Atlas',
            'content' => $content
        ])

        <section class="w-full h-100-mx-vh h-full d-flex flex-column justify-between items-start bg-secondary  radius-sm pt-md gap-md bd-shadow-primary overflow-hidden" id="virtual-assistant-section">
            <form id="form-chat" class="w-full h-full d-flex flex-column justify-between items-start gap-md overflow-hidden">
                <div id="container-chat" class="w-full h-full bd-primary radius-sm pt-md bg-secondary d-flex flex-column justify-start items-start gap-md">

                </div>
                <div id="container-message-input" class="d-flex items-center justify-between w-full bg-secondary pt-input-primary bd-primary radius-sm">
                    <input id="input-message" type="text" name="message" placeholder="Digite sua mensagem..." class="text-base color-primary w-full">
                    <button id="btn-send-message" type="submit" class="hover-scale bd-shadow-secondary bg-btn-create d-flex justify-center items-center pt-btn-primary radius-sm h-36">
                        <img src="imgs/paper-plane-light.svg" alt="Enviar" class="img-size-20">
                    </button>
                </div>
            </form>
        </section>
    </main>
@endsection

