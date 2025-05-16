@extends('layouts.template')

@section('title', 'Tarefas')

@section('links')
    <link rel="stylesheet" href="{{asset('css/tasks.css')}}">
    <link rel="stylesheet" href="{{asset('css/layouts/modal.css')}}">
@endsection

@section('scripts')
  
@endsection

@section('modals')

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
                        <img src="' . asset('imgs/create-light.svg') . '" alt="Criar Tarefa" class="img-size-15">
                        <span class="color-light text-sm fw-sb">Nova Tarefa</span>
                    </button>
                </div>
            ';

            $imgPageHeader = 'imgs/list-check-dark.svg';
        @endphp

        @include('layouts.pageHeader', [
            'img' => $imgPageHeader,
            'title' => 'Tarefas',
            'content' => $content
        ])

        <div class="bg-light bd-primary radius-lg bd-primary pt-md w-full flex-desktop justify-start items-center gap-md radius-sm flex-wrap">
            <ul class="w-full d-flex justify-between items-center gap-md">
                <li class="w-full">
                    <button class="w-full marked-primary pt-sm radius-lg color-third text-sm fw-sb d-flex justify-center items-center gap-sm">
                        <img src="{{ asset('imgs/list-check-dark.svg') }}" alt="Todas" class="img-size-15">
                        Todas
                    </button>
                </li>
                <li class="w-full">
                    <button class="w-full pt-sm radius-lg color-third text-sm fw-sb d-flex justify-center items-center gap-sm">
                        <img src="{{ asset('imgs/circle.svg') }}" alt="A Fazer" class="img-size-15">
                        A Fazer
                    </button>
                </li>
                <li class="w-full">
                    <button class="w-full pt-sm radius-lg color-third text-sm fw-sb d-flex justify-center items-center gap-sm">
                        <img src="{{ asset('imgs/spinner.svg') }}" alt="Em andamento" class="img-size-15">
                        Em andamento
                    </button>
                </li>
                <li class="w-full">
                    <button class="w-full pt-sm radius-lg color-third text-sm fw-sb d-flex justify-center items-center gap-sm">
                        <img src="{{ asset('imgs/circle-check-dark.svg') }}" alt="Finalizado" class="img-size-15">
                        Finalizado
                    </button>
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
        <section class="overflow-hidden w-full h-100-mx-vh d-flex flex-column justify-start items-start gap-md" id="task-section">
            <div class="overflow-hidden h-mn-157 radius-lg pointer d-flex flex-column justify-start items-start gap-md w-full bg-light bd-primary radius-sm">
                <div class="d-flex flex-column justify-start items-start gap-md w-full">
                    <div class="w-full d-flex justify-between items-center gap-md pt-top-md pt-left-md pt-right-md">
                        <h3 class="color-third fw-m text-sm">Tarefa 1</h3>
                        <span class="d-flex justify-center items-center badge-high w-70 radius-lg text-xs pt-xs">
                            Baixa
                        </span>
                    </div>
                    <p class="txt-2-lines color-secondary d-flex justify-start items-start text-sm h-36 pt-left-md pt-right-md">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et.
                    </p>
                </div>

                <div class="w-full d-flex justify-start items-center gap-lg bd-top bg-third pt-left-md pt-right-md pt-top-md pt-bottom-md flex-wrap">
                    <div class="d-flex justify-start items-center gap-sm">
                        <img src="imgs/clock.svg" alt="Iniciar" class="img-size-10">
                        <span class="color-secondary text-xs">00:22:23</span>
                    </div>
                    <div class="d-flex justify-start items-center gap-sm">
                        <img src="imgs/calendar-week.svg" alt="Prazo" class="img-size-10">
                        <span class="color-secondary text-xs">07/05/2025</span>
                    </div>
                    <div class="d-flex justify-start items-center gap-sm">
                        <img src="imgs/tag.svg" alt="Categoria" class="img-size-10">
                        <span class="color-secondary text-xs">Desenvolvimento</span>
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

   document.addEventListener('DOMContentLoaded', ()=>{

        function renderFakeTasks() {

            const section = document.getElementById('task-section');

            const fakeTasks = Array.from({ length: 3 }, (_, i) => ({
                title: `Tarefa ${i + 1}`,
                priority: ['Baixa', 'Média', 'Urgente'][Math.floor(Math.random() * 3)],
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et.',
                time: `${String(i).padStart(2, '0')}:22:23`,
                deadline: '07/05/2025',
                category: 'Desenvolvimento'
            }));

            fakeTasks.forEach(task => {
                // Card container
                const card = document.createElement('div');
                card.className = 'overflow-hidden h-mn-157 radius-lg pointer d-flex flex-column justify-start items-start gap-md w-full bg-light bd-primary radius-sm';

                // Top content
                const topContent = document.createElement('div');
                topContent.className = 'd-flex flex-column justify-start items-start gap-md w-full';

                const titleRow = document.createElement('div');
                titleRow.className = 'w-full d-flex justify-between items-center gap-md pt-top-md pt-left-md pt-right-md';

                const title = document.createElement('h3');
                title.className = 'color-third fw-m text-sm';
                title.textContent = task.title;

                const priority = document.createElement('span');
                priority.className = 'd-flex justify-center items-center badge-high w-70 radius-lg text-xs pt-xs';
                priority.textContent = task.priority;

                titleRow.appendChild(title);
                titleRow.appendChild(priority);

                const description = document.createElement('p');
                description.className = 'txt-2-lines color-secondary d-flex justify-start items-start text-sm h-36 pt-left-md pt-right-md';
                description.textContent = task.description;

                topContent.appendChild(titleRow);
                topContent.appendChild(description);

                // Bottom content
                const bottomContent = document.createElement('div');
                bottomContent.className = 'w-full d-flex justify-start items-center gap-lg bd-top bg-third pt-left-md pt-right-md pt-top-md pt-bottom-md flex-wrap';

                // Helper para criar ícones com texto
                const createInfo = (imgSrc, alt, text) => {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'd-flex justify-start items-center gap-sm';

                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = alt;
                    img.className = 'img-size-10';

                    const span = document.createElement('span');
                    span.className = 'color-secondary text-xs';
                    span.textContent = text;

                    wrapper.appendChild(img);
                    wrapper.appendChild(span);

                    return wrapper;
                };

                bottomContent.appendChild(createInfo('imgs/clock.svg', 'Iniciar', task.time));
                bottomContent.appendChild(createInfo('imgs/calendar-week.svg', 'Prazo', task.deadline));
                bottomContent.appendChild(createInfo('imgs/tag.svg', 'Categoria', task.category));

                // Finalizando o card
                card.appendChild(topContent);
                card.appendChild(bottomContent);
                section.appendChild(card);
            });

            addScrollY('#task-section');
        }


    })

</script>