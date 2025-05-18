@extends('layouts.template')

@section('title', 'Financeiro')

@section('links')
    <link rel="stylesheet" href="{{asset('css/financial.css')}}">
    <link rel="stylesheet" href="{{asset('css/layouts/modal.css')}}">
@endsection

@section('scripts')
  
@endsection

@section('content')

    <main class="h-full w-full d-flex justify-start items-center flex-column gap-md w-mx-1200">


         @php

            $startOfMonth = date('Y-m-01');
            $endOfMonth = date('Y-m-t');

            $content = '
                <div class="d-flex justify-start items-start gap-md">
                    <div class="d-flex justify-center items-center flex-column">
                        <button onClick="openDropdown(\'#dropdown-filter\')" class="bd-primary d-flex justify-start items-center gap-sm pt-btn-primary radius-lg color-third text-sm fw-sb h-36">
                            <img src="' . asset('imgs/filter.svg') . '" alt="Filtros" class="img-size-15">
                            Filtros
                        </button>
                        <div class="position-relative d-flex w-full">
                            <ul id="dropdown-filter" class="dropdown bd-primary z-index-9 bg-light pt-md none align-start justify-start flex-column gap-md radius-lg position-absolute mt-top-sm">
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

        <section class="w-full pt-top-md pt-bottom-md bg-light d-flex flex-column justify-start align-start gap-md radius-lg">
            <div class="overflow-hidden d-flex justify-start items-center gap-sm">
                <img src="http://127.0.0.1:8000/imgs/list-check-dark.svg" alt="Tarefas" class="img-size-15">
                <h3 class="text-base fw-sb color-dark">Tarefas</h3>
            </div>
            <div class="d-flex justify-start align-start gap-md flex-wrap">
                <div class="w-full w-mx-389 pt-md d-flex justify-between items-center gap-md radius-lg bd-primary">
                    <div class="w-full d-flex justify-start items-center gap-sm">
                        <img src="{{ asset('imgs/circle.svg') }}" alt="A Fazer" class="img-size-15">
                        <h4 class="text-base fw-sb color-dark">A Fazer</h4>
                    </div>
                    <span class="text-xl fw-b color-dark">30</span>
                </div>
                <div class="w-full w-mx-389 pt-md d-flex justify-between items-center gap-md radius-lg bd-primary">
                    <div class="w-full d-flex justify-start items-center gap-sm">
                        <img src="{{ asset('imgs/spinner.svg') }}" alt="Em andamento" class="img-size-15">
                        <h4 class="text-base fw-sb color-dark">Em Andamento</h4>
                    </div>
                    <span class="text-xl fw-b color-dark">10</span>
                </div>
                <div class="w-full w-mx-389 pt-md d-flex justify-between items-center gap-md radius-lg bd-primary">
                    <div class="w-full d-flex justify-start items-center gap-sm">
                        <img src="{{ asset('imgs/circle-check-dark.svg') }}" alt="Finalizado" class="img-size-15">
                        <h4 class="text-base fw-sb color-dark">Finalizadas</h4>
                    </div>
                    <span class="text-xl fw-b color-dark">100</span>
                </div>
            </div>
        </section>

        <section class="w-full pt-top-md pt-bottom-md bg-light d-flex flex-column justify-start align-start gap-md radius-lg">
            <div class="overflow-hidden d-flex justify-start items-center gap-sm">
                <img src="http://127.0.0.1:8000/imgs/wallet-dark.svg" alt="Financeiro" class="img-size-15">
                <h3 class="text-base fw-sb color-dark">Financeiro</h3>
            </div>
            <div class="d-flex justify-start align-start gap-md flex-wrap">
                <div class="w-full w-mx-389 pt-md d-flex flex-column justify-start align-start gap-md radius-lg bd-primary">
                    <div class="w-full d-flex justify-start items-center gap-sm">
                        <img src="{{ asset('imgs/piggy-bank-dark.svg') }}" alt="Entrada" class="img-size-15">
                        <h4 class="text-base fw-sb color-dark">Total de Entrada</h4>
                    </div>
                    <span class="text-xl fw-b color-dark">12.450,00</span>
                </div>
                <div class="w-full w-mx-389 pt-md d-flex flex-column justify-start align-start gap-md radius-lg bd-primary">
                    <div class="w-full d-flex justify-start items-center gap-sm">
                        <img src="{{ asset('imgs/money-bill-wave-dark.svg') }}" alt="Saída" class="img-size-15">
                        <h4 class="text-base fw-sb color-dark">Total de Saída</h4>
                    </div>
                    <span class="text-xl fw-b color-dark">8.720,00</span>
                </div>
                <div class="w-full w-mx-389 pt-md d-flex flex-column justify-start align-start gap-md radius-lg bd-primary">
                    <div class="w-full d-flex justify-start items-center gap-sm">
                        <img src="{{ asset('imgs/wallet-dark.svg') }}" alt="Todas" class="img-size-15">
                        <h4 class="text-base fw-sb color-dark">Saldo</h4>
                    </div>
                    <span class="text-xl fw-b color-dark">3.730,00</span>
                </div>
            </div>
        </section>

    </main>

@endsection

<script type="module"> 

    import { addScrollY, openDropdown } from '{{ asset('js/utils.js') }}';

    window.addEventListener('DOMContentLoaded', () => {
        addScrollY('#task-section');
    });

    window.addEventListener('resize', () => {
        addScrollY('#task-section');
    });

    window.openDropdown = openDropdown;
</script>