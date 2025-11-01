@extends('layouts.template')

@section('title', 'Dashboard')

@section('links')
    <link rel="stylesheet" href="{{asset('css/pages/dashboard.css')}}">
    <link rel="stylesheet" href="{{asset('css/layouts/modal.css')}}">
@endsection

@section('scripts')
    <script defer src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script type="module" defer src="{{asset('js/initializers/pageDashboard.js')}}"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
@endsection

@section('content')

    <main class="fade-in h-full w-full d-flex justify-start items-center flex-column gap-md w-mx-1200 scroll-y-mobile">

        @php

            $content =
                '
                    <div class="d-flex justify-start gap-md">
                        <div class="d-flex justify-center items-center flex-column">
                            <div class="d-flex justify-center items-center flex-column">
                                <button class="bg-tertiary bd-shadow-secondary d-flex justify-start items-center gap-sm pt-btn-primary radius-sm color-light text-sm fw-sb h-36 btn-dropdown-filter">
                                    <img src="' . asset('imgs/filter-light.svg') . '" alt="Filtros" class="img-size-15">
                                    Filtros
                                </button>
                                <div class="position-relative d-flex justify-end w-full container-dropdown-filter">

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

        <div id="dashboard-section" class="overflow-x-hidden w-full h-full d-flex flex-column justify-start gap-md">
            <section class="w-full d-flex flex-column justify-start gap-md radius-sm">
                <div class="overflow-hidden d-flex justify-start items-center gap-sm">
                    <img src="{{ asset('imgs/list-check-gray.svg') }}" alt="Tarefas" class="img-size-15">
                    <h3 class="text-base fw-sb color-primary">Tarefas</h3>
                </div>
                <div class="d-grid grid-tmp-columns-3 grid-tmp-columns-1-mobile grid-tmp-rows-auto-mobile flex-column-mobile justify-start gap-md">
                    <div class="bg-secondary w-full pt-md d-flex justify-between items-center gap-md radius-sm bd-shadow-primary">
                        <div class="w-full d-flex justify-start items-center gap-sm">
                            <img src="{{ asset('imgs/circle-gray.svg') }}" alt="A Fazer" class="img-size-15">
                            <h4 class="text-base fw-sb color-primary">A Fazer</h4>
                        </div>
                        <span class="text-xl fw-b color-primary" id="value-to-do">0</span>
                    </div>
                    <div class="bg-secondary w-full pt-md d-flex justify-between items-center gap-md radius-sm bd-shadow-primary">
                        <div class="w-full d-flex justify-start items-center gap-sm">
                            <img src="{{ asset('imgs/spinner-gray.svg') }}" alt="Em andamento" class="img-size-15">
                            <h4 class="text-base fw-sb color-primary">Em Andamento</h4>
                        </div>
                        <span class="text-xl fw-b color-primary" id="value-in-progress">0</span>
                    </div>
                    <div class="bg-secondary w-full pt-md d-flex justify-between items-center gap-md radius-sm bd-shadow-primary">
                        <div class="w-full d-flex justify-start items-center gap-sm">
                            <img src="{{ asset('imgs/circle-check-gray.svg') }}" alt="Finalizado" class="img-size-15">
                            <h4 class="text-base fw-sb color-primary">Finalizadas</h4>
                        </div>
                        <span class="text-xl fw-b color-primary" id="value-done">0</span>
                    </div>
                </div>
            </section>

            <section class="w-full d-flex flex-column justify-start gap-md radius-sm">
                <div class="overflow-hidden d-flex justify-start items-center gap-sm">
                    <img src="{{ asset('imgs/wallet-gray.svg') }}" alt="Financeiro" class="img-size-15">
                    <h3 class="text-base fw-sb color-primary">Financeiro</h3>
                </div>
                <div class="d-grid grid-tmp-columns-3 grid-tmp-columns-1-mobile grid-tmp-rows-auto-mobile justify-start gap-md">
                    <div class="w-full pt-md d-flex flex-column justify-start gap-md radius-sm bd-shadow-primary bg-secondary">
                        <div class="w-full d-flex justify-start items-center gap-sm">
                            <img src="{{ asset('imgs/piggy-bank-gray.svg') }}" alt="Entrada" class="img-size-15">
                            <h4 class="text-base fw-sb color-primary">Total de Entrada</h4>
                        </div>
                        <span class="text-xl fw-b color-primary" id="value-income">0</span>
                    </div>
                    <div class="w-full pt-md d-flex flex-column justify-start gap-md radius-sm bd-shadow-primary bg-secondary">
                        <div class="w-full d-flex justify-start items-center gap-sm">
                            <img src="{{ asset('imgs/money-bill-wave-gray.svg') }}" alt="Saída" class="img-size-15">
                            <h4 class="text-base fw-sb color-primary">Total de Saída</h4>
                        </div>
                        <span class="text-xl fw-b color-primary" id="value-expense">0</span>
                    </div>
                    <div class="w-full pt-md d-flex flex-column justify-start gap-md radius-sm bd-shadow-primary bg-secondary">
                        <div class="w-full d-flex justify-start items-center gap-sm">
                            <img src="{{ asset('imgs/wallet-gray.svg') }}" alt="Todas" class="img-size-15">
                            <h4 class="text-base fw-sb color-primary">Saldo</h4>
                        </div>
                        <span class="text-xl fw-b color-primary" id="value-total">0</span>
                    </div>
                </div>
            </section>

            <section class="w-full d-flex flex-column justify-start gap-md radius-sm">
                <div class="d-flex justify-start items-center gap-sm">
                    <img src="{{ asset('imgs/clock-gray.svg') }}" alt="Distribuição do Tempo" class="img-size-15">
                    <h3 class="text-base fw-sb color-primary">Distribuição do Tempo</h3>
                </div>
                <div class="overflow-hidden w-full d-flex flex-column justify-start gap-md">
                    <canvas height="300" class="bg-secondary pt-md d-flex justify-between items-center gap-md radius-sm bd-shadow-primary" id="container-time-distribution"></canvas>
                </div>
            </section>
        </div>

    </main>

    <div class="z-index-container pt-md flex-mobile justify-center items-end gap-md flex-column fx-right fx-bottom fixed">
        <button class="hover-scale btn-mobile-filter bd-shadow-primary bg-tertiary h-50 w-50 radius-sm pt-sm d-flex items-center justify-center">
            <img src="{{ asset('imgs/filter-light.svg') }}" alt="Filtros" class="img-size-20">
        </button>
    </div>
@endsection

