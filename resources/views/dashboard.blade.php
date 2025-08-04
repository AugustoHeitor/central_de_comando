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

    <main class="h-full w-full d-flex justify-start items-center flex-column gap-md w-mx-1200">


         @php

            $startOfMonth = date('Y-m-01');
            $endOfMonth = date('Y-m-t');

            $content = '
            
                <div class="d-flex justify-start items-start gap-md">
                    <div class="d-flex justify-center items-center flex-column">
                        <div class="d-flex justify-center items-center flex-column">
                            <button class="bd-primary d-flex justify-start items-center gap-sm pt-btn-primary radius-lg color-third text-sm fw-sb h-36 btn-dropdown-filter">
                                <img src="' . asset('imgs/filter.svg') . '" alt="Filtros" class="img-size-15">
                                Filtros
                            </button>
                            <div class="position-relative d-flex items-start justify-end w-full container-dropdown-filter">
                                
                            </div>
                        </div>
                        <div class="position-relative d-flex w-full">
                            <ul id="dropdown-filter" class="dropdown bd-primary z-index-dropdown bg-light pt-md none align-start justify-start flex-column gap-md radius-lg position-absolute mt-top-sm">
                                <li>
                                    <div class="w-full d-flex flex-column justify-start items-start gap-sm cnt-input-w">     
                                        <label class="text-sm color-third fw-m" for="deadline">Prazo Inicial</label>
                                        <div class="w-full bg-light radius-lg bd-primary pt-input-primary">
                                            <input value="' . $startOfMonth . '" type="date" name="deadline" class="w-full text-sm color-secondary h-21">
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="w-full d-flex flex-column justify-start items-start gap-sm cnt-input-w">     
                                        <label class="text-sm color-third fw-m" for="deadline">Prazo Final</label>
                                        <div class="w-full bg-light radius-lg bd-primary pt-input-primary">
                                            <input value="' . $endOfMonth . '" type="date" name="deadline" class="w-full text-sm color-secondary h-21">
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ';

            $imgPageHeader = 'imgs/chart-dark.svg';
     
        @endphp

        @include('layouts.pageHeader', [
            'img' => $imgPageHeader,
            'title' => 'Dashboard',
            'content' => $content
        ])

        <div class="pt-md flex-mobile justify-center items-end gap-md flex-column fx-right fx-bottom fixed">
            <button class="btn-mobile-filter bd-primary bg-light h-50 w-50 radius-lg pt-sm d-flex items-center justify-center">
                <img src="{{ asset('imgs/filter.svg') }}" alt="Filtros" class="img-size-20">
            </button>
        </div> 

        <section class="w-full pt-top-md pt-bottom-md bg-light d-flex flex-column justify-start align-start gap-md radius-lg">
            <div class="overflow-hidden d-flex justify-start items-center gap-sm">
                <img src="http://127.0.0.1:8000/imgs/list-check-dark.svg" alt="Tarefas" class="img-size-15">
                <h3 class="text-base fw-sb color-dark">Tarefas</h3>
            </div>
            <div class="d-grid grid-tmp-columns-3 grid-tmp-columns-1-mobile grid-tmp-rows-auto-mobile flex-column-mobile justify-start align-start gap-md">
                <div class="w-full pt-md d-flex justify-between items-center gap-md radius-lg bd-primary">
                    <div class="w-full d-flex justify-start items-center gap-sm">
                        <img src="{{ asset('imgs/circle.svg') }}" alt="A Fazer" class="img-size-15">
                        <h4 class="text-base fw-sb color-dark">A Fazer</h4>
                    </div>
                    <span class="text-xl fw-b color-dark" id="value-to-do">0</span>
                </div>
                <div class="w-full pt-md d-flex justify-between items-center gap-md radius-lg bd-primary">
                    <div class="w-full d-flex justify-start items-center gap-sm">
                        <img src="{{ asset('imgs/spinner.svg') }}" alt="Em andamento" class="img-size-15">
                        <h4 class="text-base fw-sb color-dark">Em Andamento</h4>
                    </div>
                    <span class="text-xl fw-b color-dark" id="value-in-progress">0</span>
                </div>
                <div class="w-full pt-md d-flex justify-between items-center gap-md radius-lg bd-primary">
                    <div class="w-full d-flex justify-start items-center gap-sm">
                        <img src="{{ asset('imgs/circle-check-dark.svg') }}" alt="Finalizado" class="img-size-15">
                        <h4 class="text-base fw-sb color-dark">Finalizadas</h4>
                    </div>
                    <span class="text-xl fw-b color-dark" id="value-done">0</span>
                </div>
            </div>
        </section>

        <section class="w-full pt-top-md pt-bottom-md bg-light d-flex flex-column justify-start align-start gap-md radius-lg">
            <div class="overflow-hidden d-flex justify-start items-center gap-sm">
                <img src="http://127.0.0.1:8000/imgs/wallet-dark.svg" alt="Financeiro" class="img-size-15">
                <h3 class="text-base fw-sb color-dark">Financeiro</h3>
            </div>
            <div class="d-grid grid-tmp-columns-3 grid-tmp-columns-1-mobile grid-tmp-rows-auto-mobile justify-start align-start gap-md">
                <div class="w-full pt-md d-flex flex-column justify-start align-start gap-md radius-lg bd-primary">
                    <div class="w-full d-flex justify-start items-center gap-sm">
                        <img src="{{ asset('imgs/piggy-bank-dark.svg') }}" alt="Entrada" class="img-size-15">
                        <h4 class="text-base fw-sb color-dark">Total de Entrada</h4>
                    </div>
                    <span class="text-xl fw-b color-dark" id="value-income">0</span>
                </div>
                <div class="w-full pt-md d-flex flex-column justify-start align-start gap-md radius-lg bd-primary">
                    <div class="w-full d-flex justify-start items-center gap-sm">
                        <img src="{{ asset('imgs/money-bill-wave-dark.svg') }}" alt="Saída" class="img-size-15">
                        <h4 class="text-base fw-sb color-dark">Total de Saída</h4>
                    </div>
                    <span class="text-xl fw-b color-dark" id="value-expense">0</span>
                </div>
                <div class="w-full pt-md d-flex flex-column justify-start align-start gap-md radius-lg bd-primary">
                    <div class="w-full d-flex justify-start items-center gap-sm">
                        <img src="{{ asset('imgs/wallet-dark.svg') }}" alt="Todas" class="img-size-15">
                        <h4 class="text-base fw-sb color-dark">Saldo</h4>
                    </div>
                    <span class="text-xl fw-b color-dark" id="value-total">0</span>
                </div>
            </div>
        </section>

    </main>

@endsection

