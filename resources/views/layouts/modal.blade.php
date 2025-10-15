<div class="screen-modal">
    <div class="bd-shadow-secondary w-full h-full d-flex align-start justify-between flex-column gap-md bg-secondary radius-lg w-mx-1000">
        <section class="pt-md bd-bottom pt-bottom-md w-full d-flex items-center justify-between gap-md">
            <div class="d-flex justify-start items-center gap-sm">
                <img src="{{ asset('imgs/list-check-gray.svg') }}" alt="Tarefas" class="img-size-20">
                <h2 class="color-primary text-xl fw-m">Criar Tarefa</h2>
            </div>
            <button class="d-flex items-center justify-center soft-shake">
                <img src="{{ asset('imgs/xmark-light.svg') }}" alt="Fechar" class="img-size-15">
            </button>
        </section>
        <section class="pt-md w-full h-full pt-right-sm overflow-hidden">
            <div class="w-full h-full d-flex align-start justify-start flex-column gap-lg scroll-auto">
                <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                    <div class="d-flex justify-start items-center gap-sm">
                        <img src="{{ asset('imgs/heading-dark.svg') }}" alt="Título" class="img-size-15">
                        <label class="color-light text-base fw-m" for="title">Título</label>
                    </div>
                    <div class="d-flex items-center justify-between w-full bg-secondary pt-input-primary bd-primary radius-lg">
                        <input type="text" name="title" class="text-base color-primary w-full">
                    </div>
                </div>
                <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                    <div class="d-flex justify-start items-center gap-sm">
                        <img src="{{ asset('imgs/text-dark.svg') }}" alt="Descrição" class="img-size-15">
                        <label class="color-light text-base fw-m" for="description">Descrição</label>
                    </div>
                    <div class="w-full h-mn-300 bg-secondary pt-right-sm bd-shadow-secondary radius-lg">
                        <textarea type="text" name="description" class="w-full h-full text-base color-primary pt-input-primary"></textarea>
                    </div>
                </div>
                <div class="d-flex w-full align-start justify-start gap-lg flex-wrap">
                    <div class="w-full d-flex flex-column justify-start items-start gap-sm cnt-input-w">
                        <div class="d-flex justify-start items-center gap-sm">
                            <img src="{{ asset('imgs/columns-dark.svg') }}" alt="Status" class="img-size-15">
                            <label class="color-light text-base fw-m" for="status">Status</label>
                        </div>
                        <div class="w-full bg-secondary radius-lg bd-primary pt-input-primary">
                            <select name="status" class="w-full text-base color-primary h-21">
                                <option value="todo">A fazer</option>
                                <option value="in_progress">Em andamento</option>
                                <option value="done">Concluído</option>
                            </select>
                        </div>
                    </div>
                    <div class="w-full d-flex flex-column justify-start items-start gap-sm cnt-input-w">
                        <div class="d-flex justify-start items-center gap-sm">
                            <img src="{{ asset('imgs/circle-exclamation-dark.svg') }}" alt="Prioridade" class="img-size-15">
                            <label class="color-light text-base fw-m" for="priority">Prioridade</label>
                        </div>
                        <div class="w-full bg-secondary radius-lg bd-primary pt-input-primary">
                            <select name="priority" class="w-full text-base color-primary h-21">
                                <option value="low">Baixa</option>
                                <option value="medium">Média</option>
                                <option value="urgent">Urgente</option>
                            </select>
                        </div>
                    </div>
                    <div class="w-full d-flex flex-column justify-start items-start gap-sm cnt-input-w">
                        <div class="d-flex justify-start items-center gap-sm">
                            <img src="{{ asset('imgs/tag-light.svg') }}" alt="Categorias" class="img-size-15">
                            <label class="color-light text-base fw-m" for="taskCategories">Categorias</label>
                        </div>
                        <div class="w-full bg-secondary radius-lg bd-primary pt-input-primary">
                            <select name="taskCategories" class="w-full text-base color-primary h-21">
                                <option value="trabalho">Trabalho</option>
                                <option value="pessoal">Pessoal</option>
                                <option value="estudos">Estudos</option>
                                <option value="urgente">Urgente</option>
                                <option value="outros">Outros</option>
                            </select>
                        </div>
                    </div>
                    <div class="w-full d-flex flex-column justify-start items-start gap-sm cnt-input-w">
                        <div class="d-flex justify-start items-center gap-sm">
                            <img src="{{ asset('imgs/calendar-week-dark.svg') }}" alt="Tempo" class="img-size-15">
                            <label class="color-light text-base fw-m" for="deadline">Prazo</label>
                        </div>
                        <div class="w-full bg-secondary radius-lg bd-shadow-secondary pt-input-primary">
                            <input type="date" name="deadline" class="w-full text-base color-primary h-21">
                        </div>
                    </div>
                </div>
                <div class="w-full d-flex justify-between items-center gap-sm radius-lg pt-input-primary bd-shadow-secondary">
                    <div class="d-flex justify-start items-center gap-sm">
                        <div class="d-flex justify-start items-center gap-sm">
                            <img src="{{ asset('imgs/clock-dark.svg') }}" alt="Tempo" class="img-size-15">
                            <label class="color-light text-base fw-m" for="time">Tempo:</label>
                        </div>
                        <span class="color-light text-base">00:00:00</span>
                    </div>
                    <button class="d-flex justify-center items-center radius-lg">
                        <img src="{{ asset('imgs/play-dark.svg') }}" alt="Tempo" class="img-size-15">
                    </button>
                </div>
            </div>
        </section>
        <section class="pt-md bd-top pt-top-md w-full d-flex align-start justify-end gap-md">
            <button type="button" class="hover-scale w-full d-flex justify-center items-center gap-sm w-full color-primary text-sm pt-btn-primary radius-lg fw-m bg-secondary bd-shadow-secondary w-mx-280">Deletar</button>
            <button type="submit" class="hover-scale w-full d-flex justify-center items-center gap-sm w-full color-light text-sm pt-btn-primary radius-lg fw-m bg-btn-save w-mx-280">
                <img src="{{ asset('imgs/save-light.svg') }}" alt="Salvar" class="img-size-15">
                Salvar
            </button>
        </section>
    </div>
</div>

