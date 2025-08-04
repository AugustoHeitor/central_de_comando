@extends('layouts.template')

@section('title', 'Financeiro')

@section('metas')
    <meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('links')
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="{{asset('css/financial.css')}}">
    <link rel="stylesheet" href="{{asset('css/layouts/modal.css')}}">
@endsection

@section('scripts')
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script type="module" defer src="{{asset('js/initializers/pageFinancial.js')}}"></script>
@endsection

@section('content')

    <main class="h-full w-full d-flex justify-start items-center flex-column gap-md w-mx-1200">

        @php

            $content = '
                <div class="d-flex justify-start items-start gap-md">
                   <div class="d-flex justify-center items-center flex-column">
                        <button class="bd-primary d-flex justify-start items-center gap-sm pt-btn-primary radius-lg color-third text-sm fw-sb h-36 btn-dropdown-filter">
                            <img src="' . asset('imgs/filter.svg') . '" alt="Filtros" class="img-size-15">
                            Filtros
                        </button>
                        <div class="position-relative d-flex w-full container-dropdown-filter">
                            
                        </div>
                    </div>
                    <div class="d-flex justify-start items-start flex-column">
                        <div class="d-flex justify-start items-start flex-column">
                            <button class="btn-dropdown-order bd-primary d-flex justify-start items-center gap-sm pt-btn-primary radius-lg color-third text-sm fw-sb h-36">
                                <img src="' . asset('imgs/sort.svg') . '" alt="Ordenar" class="img-size-10">
                                Ordenar
                            </button>
                            <div class="position-relative d-flex w-full container-dropdown-order">
                                
                            </div>
                        </div>
                        <div class="position-relative d-flex w-full">
                            <ul id="dropdown-order" class="overflow-hidden w-140 dropdown bd-primary z-index-dropdown bg-light none align-start justify-start flex-column radius-lg position-absolute mt-top-sm">
                                <li class="w-full bd-bottom"> 
                                    <button data-value="none" class="d-flex justify-start items-center w-full pt-md text-sm color-third fw-sb">
                                        Sem ordenação
                                    </button>
                                </li>
                                <li class="w-full bd-bottom">
                                    <button data-value="deadline" class="d-flex justify-start items-center w-full pt-md text-sm color-third fw-sb">
                                        Prazo
                                    </button>
                                </li>
                                <li class="w-full">
                                    <button data-value="priority" class="d-flex justify-start items-center w-full pt-md text-sm color-third fw-sb">
                                        Prioridade
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button id="btn-category" class="bd-primary d-flex justify-start items-center gap-sm pt-btn-primary radius-lg color-third text-sm fw-sb h-36">
                        <img src="' . asset('imgs/tag-dark.svg') . '" alt="Categoria" class="img-size-15">
                        Categorias
                    </button>
                    <button class="bg-btn-create bd-primary d-flex justify-start items-center gap-sm pt-btn-primary radius-lg h-36" id="btn-new-financial">
                        <img src="' . asset('imgs/create-light.svg') . '" alt="Criar Entrada/Saída" class="img-size-15">
                        <span class="color-light text-sm fw-sb">Nova Transação</span>
                    </button>
                </div>
            ';

            $imgPageHeader = 'imgs/wallet-dark.svg';
            
        @endphp

        @include('layouts.pageHeader', [
            'img' => $imgPageHeader,
            'title' => 'Financeiro',
            'content' => $content
        ])


        <div class="bg-light bd-primary radius-lg bd-primary pt-md w-full flex-desktop justify-start items-center gap-md radius-sm flex-wrap">
            <ul class="w-full d-flex justify-between items-center gap-md">
                <li class="w-full">
                    <button data-navigation="null" class="w-full btn-filter-type pt-sm radius-lg color-third text-sm fw-sb d-flex justify-center items-center gap-sm">
                        <img src="{{ asset('imgs/wallet-dark.svg') }}" alt="Todas" class="img-size-15">
                        Todas
                    </button>
                </li>
                <li class="w-full">
                    <button data-navigation="income" class="btn-filter-type w-full pt-sm radius-lg color-third text-sm fw-sb d-flex justify-center items-center gap-sm">
                        <img src="{{ asset('imgs/piggy-bank-dark.svg') }}" alt="Entrada" class="img-size-15">
                        Entrada
                    </button>
                </li>
                <li class="w-full">
                    <button data-navigation="expense" class="btn-filter-type w-full pt-sm radius-lg color-third text-sm fw-sb d-flex justify-center items-center gap-sm">
                        <img src="{{ asset('imgs/money-bill-wave-dark.svg') }}" alt="Saída" class="img-size-15">
                        Saída
                    </button>
                </li>
                </li>
            </ul>
        </div>

        <div class="pt-md flex-mobile justify-center items-end gap-md flex-column fx-right fx-bottom fixed">
            <button class="btn-mobile-filter bd-primary bg-light h-50 w-50 radius-lg pt-sm d-flex items-center justify-center">
                <img src="{{ asset('imgs/filter.svg') }}" alt="Filtros" class="img-size-20">
            </button>
            <button class="btn-mobile-order bd-primary bg-light h-50 w-50 radius-lg pt-sm d-flex items-center justify-center">
                <img src="{{ asset('imgs/sort.svg') }}" alt="Ordem" class="img-size-15">
            </button>
            <button id="btn-category-mobile" class="bd-primary bg-light h-50 w-50 radius-lg pt-sm d-flex items-center justify-center">
                <img src="{{ asset('imgs/tag-dark.svg') }}" alt="Categorias" class="img-size-20">
            </button>
        </div> 

        <section class="overflow-hidden w-full h-100-mx-vh d-flex flex-column justify-start items-start gap-md" id="financial-section">

            
        </section>

    </main>

@endsection

