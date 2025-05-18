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
                                <li>
                                    <div class="w-full d-flex flex-column justify-start items-start gap-sm cnt-input-w">
                                        <label class="text-sm color-third fw-m" for="taskCategories">Categorias</label>
                                        <div class="w-full bg-light radius-lg bd-primary pt-input-primary">
                                            <select name="taskCategories" class="w-full text-sm color-secondary h-21">
                                                <option value="0" disabled selected>Todos</option>
                                                <option value="trabalho">Trabalho</option>
                                                <option value="pessoal">Pessoal</option>
                                                <option value="estudos">Estudos</option>
                                                <option value="urgente">Urgente</option>
                                                <option value="outros">Outros</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="w-full d-flex flex-column justify-start items-start gap-sm cnt-input-w">
                                        <label class="text-sm color-third fw-m" for="priority">Prioridade</label>
                                        <div class="w-full bg-light radius-lg bd-primary pt-input-primary">
                                            <select name="priority" class="w-full text-sm color-secondary h-21">
                                                <option value="0" disabled selected>Todos</option>
                                                <option value="low">Baixa</option>
                                                <option value="medium">Média</option>
                                                <option value="urgent">Urgente</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="d-flex justify-start items-start flex-column">
                        <button onClick="openDropdown(\'#dropdown-order\')" class="bd-primary d-flex justify-start items-center gap-sm pt-btn-primary radius-lg color-third text-sm fw-sb h-36">
                            <img src="' . asset('imgs/sort.svg') . '" alt="Ordenar" class="img-size-10">
                            Ordenar
                        </button>
                        <div class="position-relative d-flex w-full">
                            <ul id="dropdown-order" class="overflow-hidden w-140 dropdown bd-primary z-index-9 bg-light none align-start justify-start flex-column radius-lg position-absolute mt-top-sm">
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
                    <button class="bd-primary d-flex justify-start items-center gap-sm pt-btn-primary radius-lg color-third text-sm fw-sb h-36">
                        <img src="' . asset('imgs/tag-dark.svg') . '" alt="Categoria" class="img-size-15">
                        Categorias
                    </button>
                    <button class="bg-btn-create bd-primary d-flex justify-start items-center gap-sm pt-btn-primary radius-lg h-36">
                        <img src="' . asset('imgs/create-light.svg') . '" alt="Criar Entrada/Saída" class="img-size-15">
                        <span class="color-light text-sm fw-sb">Novo Lançamento</span>
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
                    <button class="w-full marked-primary pt-sm radius-lg color-third text-sm fw-sb d-flex justify-center items-center gap-sm">
                        <img src="{{ asset('imgs/wallet-dark.svg') }}" alt="Todas" class="img-size-15">
                        Todas
                    </button>
                </li>
                <li class="w-full">
                    <button class="w-full pt-sm radius-lg color-third text-sm fw-sb d-flex justify-center items-center gap-sm">
                        <img src="{{ asset('imgs/piggy-bank-dark.svg') }}" alt="Entrada" class="img-size-15">
                        Entrada
                    </button>
                </li>
                <li class="w-full">
                    <button class="w-full pt-sm radius-lg color-third text-sm fw-sb d-flex justify-center items-center gap-sm">
                        <img src="{{ asset('imgs/money-bill-wave-dark.svg') }}" alt="Saída" class="img-size-15">
                        Saída
                    </button>
                </li>
                </li>
            </ul>
        </div>

        <div class="pt-md flex-mobile justify-center items-end gap-md flex-column fx-right fx-bottom fixed">
            <button class="bd-primary bg-light h-50 w-50 radius-lg pt-sm d-flex items-center justify-center">
                <img src="{{ asset('imgs/filter.svg') }}" alt="Filtros" class="img-size-20">
            </button>
            <button class="bd-primary bg-light h-50 w-50 radius-lg pt-sm d-flex items-center justify-center">
                <img src="{{ asset('imgs/sort.svg') }}" alt="Ordem" class="img-size-15">
            </button>
            <button class="bd-primary bg-light h-50 w-50 radius-lg pt-sm d-flex items-center justify-center">
                <img src="{{ asset('imgs/tag-dark.svg') }}" alt="Categorias" class="img-size-20">
            </button>
        </div> 

        <section class="overflow-hidden w-full h-100-mx-vh d-flex flex-column justify-start items-start gap-md" id="financial-section">
            <div class="overflow-hidden h-mn-157 radius-lg pointer d-flex flex-column justify-between items-start gap-md w-full bg-light bd-primary radius-sm">
                <div class="d-flex flex-column justify-start items-start gap-md w-full">
                    <div class="w-full d-flex justify-between items-center gap-md pt-top-md pt-left-md pt-right-md">
                        <div class="d-flex justify-center items-center gap-sm">
                            <img src="imgs/piggy-bank-dark.svg" alt="Entrada" class="img-size-15">
                            <h3 class="color-third fw-m text-sm">Tecnobit Sistemas Inteligentes</h3>
                        </div>
                        <div class="d-flex justify-center items-end gap-sm flex-column">
                            <span class="text-x1 fw-sb color-income">
                                R$ 5.000,00
                            </span>
                            <span class="text-sm fw-m color-secondary txt-align-end">Recebido em 03/06/2025</span>
                        </div>
                    </div>
                    <div class="d-flex justify-center items-center gap-sm pt-left-md pt-right-md h-36">
                        <p class="d-flex justify-center items-center bg-income color-income radius-lg text-sm pt-top-sm pt-bottom-sm pt-left-md pt-right-md">Recebido</p>
                        <div class="d-flex justify-start items-center gap-sm">
                            <img src="imgs/tag.svg" alt="Categoria" class="img-size-10">
                            <span class="color-secondary text-sm fw-m">Prestação de Serviço</span>
                        </div>
                    </div>
                </div>

                <div class="w-full d-flex justify-start items-center gap-lg bd-top bg-third pt-left-md pt-right-md pt-top-md pt-bottom-md flex-wrap">
                    <div class="d-flex justify-start items-center gap-sm">
                        <img src="imgs/calendar-week.svg" alt="Prazo" class="img-size-10">
                        <span class="color-secondary text-sm">Prazo 02/06/2025</span>
                    </div>
                </div>
            </div>
             <div class="overflow-hidden h-mn-157 radius-lg pointer d-flex flex-column justify-between items-start gap-md w-full bg-light bd-primary radius-sm">
                <div class="d-flex flex-column justify-start items-start gap-md w-full">
                    <div class="w-full d-flex justify-between items-center gap-md pt-top-md pt-left-md pt-right-md">
                        <div class="d-flex justify-center items-center gap-sm">
                            <img src="imgs/piggy-bank-dark.svg" alt="Entrada" class="img-size-15">
                            <h3 class="color-third fw-m text-sm">Aluguel</h3>
                        </div>
                        <div class="d-flex justify-center items-end gap-sm flex-column">
                            <span class="text-x1 fw-sb color-expense">
                                - R$ 1.200,00
                            </span>
                        </div>
                    </div>
                    <div class="d-flex justify-center items-center gap-sm pt-left-md pt-right-md h-36">
                        <p class="d-flex justify-center items-center bg-expense radius-lg text-sm pt-top-sm pt-bottom-sm pt-left-md pt-right-md color-expense">Pagar</p>
                        <div class="d-flex justify-start items-center gap-sm">
                            <img src="imgs/tag.svg" alt="Categoria" class="img-size-10">
                            <span class="color-secondary text-sm fw-m">Casa</span>
                        </div>
                    </div>
                </div>

                <div class="w-full d-flex justify-start items-center gap-lg bd-top bg-third pt-left-md pt-right-md pt-top-md pt-bottom-md flex-wrap">
                    <div class="d-flex justify-start items-center gap-sm">
                        <img src="imgs/calendar-week.svg" alt="Prazo" class="img-size-10">
                        <span class="color-secondary text-sm">Prazo 02/06/2025</span>
                    </div>
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