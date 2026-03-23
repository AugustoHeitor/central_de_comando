@extends('layouts.template')

@section('title', 'Tags')

@section('metas')
    <meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('links')
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="{{asset('css/pages/tags.css')}}">
    <link rel="stylesheet" href="{{asset('css/layouts/modal.css')}}">
@endsection

@section('scripts')
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script type="module" defer src="{{asset('js/initializers/pageTags.js')}}"></script>
@endsection

@section('content')
    <main class="fade-in h-full w-full d-flex justify-start items-center flex-column gap-md w-mx-1200 scroll-y-mobile">

        @php

            $content = '
                <div class="d-flex justify-start items-start gap-md">
                    <button class="hover-scale bg-btn-create bd-shadow-secondary bg-tertiary d-flex justify-start items-center gap-sm pt-btn-primary radius-sm h-36" id="btn-new-tag">
                        <img src="' . asset('imgs/create-light.svg') . '" alt="Criar Tag" class="img-size-15">
                        <span class="color-light text-sm fw-sb">Nova Tag</span>
                    </button>
                </div>
            ';

            $imgPageHeader = 'imgs/hashtag-light.svg';
        @endphp

        @include('layouts.pageHeader', [
            'img' => $imgPageHeader,
            'title' => 'Tags',
            'content' => $content
        ])

        <div class="bg-secondary bd-shadow-primary radius-sm pt-md w-full flex-desktop justify-start items-center gap-md  flex-wrap">
            <ul class="w-full d-flex justify-between items-center gap-md">
                <li class="w-full">
                    <button class="w-full pt-sm radius-sm color-primary text-sm fw-sb d-flex justify-center items-center gap-sm btn-filter-is-active" data-navigation="null">
                        <img src="{{ asset('imgs/list-check-gray.svg') }}" alt="Todas" class="img-size-15">
                        Todas
                    </button>
                </li>
                <li class="w-full">
                    <button class="w-full pt-sm radius-sm color-primary text-sm fw-sb d-flex justify-center items-center gap-sm btn-filter-is-active" data-navigation="true">
                        <img src="{{ asset('imgs/circle-check-gray.svg') }}" alt="A Fazer" class="img-size-15">
                        Ativas
                    </button>
                </li>
                <li class="w-full">
                    <button class="w-full pt-sm radius-sm color-primary text-sm fw-sb d-flex justify-center items-center gap-sm btn-filter-is-active" data-navigation="false">
                        <img src="{{ asset('imgs/circle-gray.svg') }}" alt="Em andamento" class="img-size-15">
                        Inativas
                    </button>
                </li>
            </ul>
        </div>

        <section class="w-full h-100-mx-vh h-full d-flex flex-column justify-start items-start gap-md" id="tag-section">

        </section>
    </main>

    <div class="z-index-container pt-md flex-mobile justify-center items-end gap-md flex-column fx-right fx-bottom fixed">
        <button class="hover-scale btn-mobile-filter bd-shadow-secondary bg-tertiary h-50 w-50 radius-sm pt-sm d-flex items-center justify-center">
            <img src="{{ asset('imgs/filter-light.svg') }}" alt="Filtros" class="img-size-20">
        </button>
    </div>
@endsection

