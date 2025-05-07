<aside class="h-full w-full w-mx-300 bd-right d-flex flex-column justify-start items-start">
    <section class="bg-gradient w-full d-flex justify-start items-center gap-md pt-md bd-bottom">
        <img src="{{ asset('imgs/logo.svg') }}" alt="Logo" class="img-size-40">
        <span class="text-2xl fw-sb color-light">{{ config('app.name') }}</span>
    </section>
    <section class="w-full h-full">
        <nav class="w-full h-full d-flex flex-column justify-start items-start">
            <a class="link-page pt-md txt-decoration-none text-base text-link color-secondary w-full d-flex justify-start items-center gap-md" href="/dashboard">
                <img src="{{ asset('imgs/chart-simple.svg') }}" alt="Dashboard" class="img-size-20">
                Dashboard
            </a>
            <a class="link-page pt-md txt-decoration-none text-base text-link color-secondary w-full d-flex justify-start items-center gap-md" href="/tarefas">
                <img src="{{ asset('imgs/list-check.svg') }}" alt="Tarefas" class="img-size-20">
                Tarefas
            </a>
            <a class="link-page pt-md txt-decoration-none text-base text-link color-secondary w-full d-flex justify-start items-center gap-md" href="/rotinas">
                <img src="{{ asset('imgs/clock.svg') }}" alt="Rotinas" class="img-size-20">
                Rotinas
            </a>
            <a class="link-page pt-md txt-decoration-none text-base text-link color-secondary w-full d-flex justify-start items-center gap-md" href="/financeiro">
                <img src="{{ asset('imgs/wallet.svg') }}" alt="Financeiro" class="img-size-20">
                Financeiro
            </a>
            <a class="link-page pt-md txt-decoration-none text-base text-link color-secondary w-full d-flex justify-start items-center gap-md" href="/calendario">
                <img src="{{ asset('imgs/calendar.svg') }}" alt="Calendário" class="img-size-20">
                Calendário
            </a>
            <a class="link-page pt-md txt-decoration-none text-base text-link color-secondary w-full d-flex justify-start items-center gap-md" href="/configuracoes">
                <img src="{{ asset('imgs/config.svg') }}" alt="Configurações" class="img-size-20">
                Configurações
            </a>
          </nav>
    </section>
    <section class="w-full d-flex justify-between items-center gap-md pt-md bd-top">
        <div class="d-flex justify-start items-center gap-sm">
            <img src="{{ asset('imgs/eu.png') }}" alt="Perfil" class="img-size-40 radius-50">
            <div class="w-full d-flex flex-column justify-start items-start gap-sm">
                <span class="text-sm fw-sb color-secondary">Augusto Heitor</span>
                <span class="text-sm color-secondary">auuheitor@gmail.com</span>
            </div>
        </div>
        <a href="#">
            <img src="{{ asset('imgs/right-from-bracket.svg') }}" alt="Logout" class="img-size-20 soft-shake">
        </a>
    </section>
</aside>