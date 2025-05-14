<aside class="bg-light bd-primary bd-primary h-full w-full w-mx-280 flex-desktop flex-column justify-start items-start radius-lg overflow-hidden">
    <section class="min-max-65 bg-gradient w-full pt-md bd-bottom d-flex justify-start items-center gap-sm">
        <img src="{{ asset('imgs/satellite-solid.svg') }}" alt="Logo" class="img-size-30">
        <span class="text-xl fw-sb color-light">{{ config('app.name') }}</span>
    </section>
    <section class="w-full h-full">
        <nav class="w-full h-full d-flex flex-column justify-start items-start">
            <a class="link-page pt-md txt-decoration-none text-base text-link color-secondary w-full d-flex justify-start items-center gap-md" href="/dashboard">
                <img src="{{ asset('imgs/chart-simple.svg') }}" alt="Dashboard" class="img-size-20">
                Dashboard
            </a>
            <a class="link-page pt-md txt-decoration-none text-base text-link color-secondary w-full d-flex justify-start items-center gap-md" href="/tasks">
                <img src="{{ asset('imgs/list-check.svg') }}" alt="Tarefas" class="img-size-20">
                Tarefas
            </a>
            <a class="link-page pt-md txt-decoration-none text-base text-link color-secondary w-full d-flex justify-start items-center gap-md" href="/financial">
                <img src="{{ asset('imgs/wallet.svg') }}" alt="Financeiro" class="img-size-20">
                Financeiro
            </a>
            <a class="link-page pt-md txt-decoration-none text-base text-link color-secondary w-full d-flex justify-start items-center gap-md" href="/settings">
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