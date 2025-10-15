@extends('layouts.template')

@section('title', 'Dashboard')

@section('links')
    <link rel="stylesheet" href="{{asset('css/dashboard.css')}}">
    <link rel="stylesheet" href="{{asset('css/layouts/modal.css')}}">
@endsection

@section('scripts')
    <script defer src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script type="module" defer src="{{asset('js/initializers/pageDashboard.js')}}"></script>
@endsection

@section('content')

    <main class="fade-in h-full w-full d-flex justify-start items-center flex-column gap-md w-mx-1200 scroll-y-mobile">


         @php

            $startOfMonth = date('Y-m-01');
            $endOfMonth = date('Y-m-t');

            $content = '
            
                <div class="d-flex justify-start items-start gap-md">
                    <div class="d-flex justify-center items-center flex-column">
                        <div class="d-flex justify-center items-center flex-column">
                            <button class="hover-scale bg-tertiary bd-shadow-secondary d-flex justify-start items-center gap-sm pt-btn-primary radius-lg color-light text-sm fw-sb h-36 btn-dropdown-filter">
                                <img src="' . asset('imgs/filter-light.svg') . '" alt="Filtros" class="img-size-15">
                                Filtros
                            </button>
                            <div class="position-relative d-flex items-start justify-end w-full container-dropdown-filter">
                                
                            </div>
                        </div>
                    </div>
                </div>
            ';

            $imgPageHeader = 'imgs/chart-light.svg';
     
        @endphp

        @include('layouts.pageHeader', [
            'img' => $imgPageHeader,
            'title' => 'Dashboard',
            'content' => $content
        ])

        <section class="w-full pt-top-md pt-bottom-md d-flex flex-column justify-start align-start gap-md radius-lg">
            <div class="overflow-hidden d-flex justify-start items-center gap-sm">
                <img src="http://127.0.0.1:8000/imgs/list-check-gray.svg" alt="Tarefas" class="img-size-15">
                <h3 class="text-base fw-sb color-primary">Tarefas</h3>
            </div>
            <div class="d-grid grid-tmp-columns-3 grid-tmp-columns-1-mobile grid-tmp-rows-auto-mobile flex-column-mobile justify-start align-start gap-md">
                <div class="hover-scale bg-secondary w-full pt-md d-flex justify-between items-center gap-md radius-lg bd-shadow-primary">
                    <div class="w-full d-flex justify-start items-center gap-sm">
                        <img src="{{ asset('imgs/circle-gray.svg') }}" alt="A Fazer" class="img-size-15">
                        <h4 class="text-base fw-sb color-primary">A Fazer</h4>
                    </div>
                    <span class="text-xl fw-b color-primary" id="value-to-do">0</span>
                </div>
                <div class="hover-scale bg-secondary w-full pt-md d-flex justify-between items-center gap-md radius-lg bd-shadow-primary">
                    <div class="w-full d-flex justify-start items-center gap-sm">
                        <img src="{{ asset('imgs/spinner-gray.svg') }}" alt="Em andamento" class="img-size-15">
                        <h4 class="text-base fw-sb color-primary">Em Andamento</h4>
                    </div>
                    <span class="text-xl fw-b color-primary" id="value-in-progress">0</span>
                </div>
                <div class="hover-scale bg-secondary w-full pt-md d-flex justify-between items-center gap-md radius-lg bd-shadow-primary">
                    <div class="w-full d-flex justify-start items-center gap-sm">
                        <img src="{{ asset('imgs/circle-check-gray.svg') }}" alt="Finalizado" class="img-size-15">
                        <h4 class="text-base fw-sb color-primary">Finalizadas</h4>
                    </div>
                    <span class="text-xl fw-b color-primary" id="value-done">0</span>
                </div>
            </div>
        </section>

        <section class="w-full pt-top-md pt-bottom-md d-flex flex-column justify-start align-start gap-md radius-lg">
            <div class="overflow-hidden d-flex justify-start items-center gap-sm">
                <img src="http://127.0.0.1:8000/imgs/wallet-gray.svg" alt="Financeiro" class="img-size-15">
                <h3 class="text-base fw-sb color-primary">Financeiro</h3>
            </div>
            <div class="d-grid grid-tmp-columns-3 grid-tmp-columns-1-mobile grid-tmp-rows-auto-mobile justify-start align-start gap-md">
                <div class="hover-scale w-full pt-md d-flex flex-column justify-start align-start gap-md radius-lg bd-shadow-primary bg-secondary">
                    <div class="w-full d-flex justify-start items-center gap-sm">
                        <img src="{{ asset('imgs/piggy-bank-gray.svg') }}" alt="Entrada" class="img-size-15">
                        <h4 class="text-base fw-sb color-primary">Total de Entrada</h4>
                    </div>
                    <span class="text-xl fw-b color-primary" id="value-income">0</span>
                </div>
                <div class="hover-scale w-full pt-md d-flex flex-column justify-start align-start gap-md radius-lg bd-shadow-primary bg-secondary">
                    <div class="w-full d-flex justify-start items-center gap-sm">
                        <img src="{{ asset('imgs/money-bill-wave-gray.svg') }}" alt="Saída" class="img-size-15">
                        <h4 class="text-base fw-sb color-primary">Total de Saída</h4>
                    </div>
                    <span class="text-xl fw-b color-primary" id="value-expense">0</span>
                </div>
                <div class="hover-scale w-full pt-md d-flex flex-column justify-start align-start gap-md radius-lg bd-shadow-primary bg-secondary">
                    <div class="w-full d-flex justify-start items-center gap-sm">
                        <img src="{{ asset('imgs/wallet-gray.svg') }}" alt="Todas" class="img-size-15">
                        <h4 class="text-base fw-sb color-primary">Saldo</h4>
                    </div>
                    <span class="text-xl fw-b color-primary" id="value-total">0</span>
                </div>
            </div>
        </section>

    </main>

    <div class="z-index-container pt-md flex-mobile justify-center items-end gap-md flex-column fx-right fx-bottom fixed">
        <button class="hover-scale btn-mobile-filter bd-shadow-primary bg-tertiary h-50 w-50 radius-lg pt-sm d-flex items-center justify-center">
            <img src="{{ asset('imgs/filter-light.svg') }}" alt="Filtros" class="img-size-20">
        </button>
    </div> 

@endsection

