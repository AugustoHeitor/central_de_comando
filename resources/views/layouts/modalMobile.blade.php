<div class="screen-modal-mobile">
    <div class="bd-primary w-full d-flex align-end justify-start flex-column gap-md bg-light radius-md-mobile">
        <section class="pt-md bd-bottom pt-bottom-md w-full d-flex align-center justify-between gap-md">
            <div class="d-flex justify-start items-center gap-sm">
                <img src="{{ asset('imgs/filter.svg') }}" alt="Filtro" class="img-size-20">
                <h2 class="color-third text-xl fw-m">Filtrar Tarefas</h2>
            </div>
        </section>
        <ul class="pt-md d-flex align-start justify-start flex-column gap-md">
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
        <section class="pt-md bd-top pt-top-md w-full d-flex align-start justify-end gap-md">
            <button type="button" class="hover-scale w-full d-flex justify-center items-center gap-sm w-full color-secondary text-sm pt-btn-primary radius-lg fw-m bg-light bd-primary w-mx-280">Cancelar</button>
            <button type="submit" class="hover-scale w-full d-flex justify-center items-center gap-sm w-full color-light text-sm pt-btn-primary radius-lg fw-m bg-btn-save w-mx-280">
                Filtrar
            </button>
        </section>
    </div>
</div>

