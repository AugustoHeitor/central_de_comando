<aside id="side-menu-desktop" class="bg-secondary bd-shadow-tertiary h-full w-full w-mx-280 flex-desktop flex-column justify-start items-start radius-sm overflow-hidden">
    <section class="min-max-65 w-full pt-md bd-bottom d-flex justify-start items-center gap-sm">
        <img src="{{ asset('imgs/satellite-light.svg') }}" alt="Logo" class="img-size-30">
        <span class="text-xl fw-sb color-light">{{ config('app.name') }}</span>
    </section>
    <section class="w-full h-full">
        <nav class="w-full h-full d-flex flex-column justify-start items-start">
            <a class="link-page pt-md txt-decoration-none text-base text-link color-primary w-full d-flex justify-start items-center gap-md" href="/dashboard">
                <img src="{{ asset('imgs/chart-gray.svg') }}" alt="Dashboard" class="img-size-20">
                Dashboard
            </a>
            <a class="link-page pt-md txt-decoration-none text-base text-link color-primary w-full d-flex justify-start items-center gap-md" href="/tasks">
                <img src="{{ asset('imgs/list-check-gray.svg') }}" alt="Tarefas" class="img-size-20">
                Tarefas
            </a>
            <a class="link-page pt-md txt-decoration-none text-base text-link color-primary w-full d-flex justify-start items-center gap-md" href="/financial">
                <img src="{{ asset('imgs/wallet-gray.svg') }}" alt="Financeiro" class="img-size-20">
                Financeiro
            </a>
             <a class="link-page pt-md txt-decoration-none text-base text-link color-primary w-full d-flex justify-start items-center gap-md" href="/virtual-assistant">
                <img src="{{ asset('imgs/robot-gray.svg') }}" alt="Assistente Virtual" class="img-size-20">
                Atlas
            </a>
            <a class="link-page pt-md txt-decoration-none text-base text-link color-primary w-full d-flex justify-start items-center gap-md" href="/tags">
                <img src="{{ asset('imgs/hashtag-gray.svg') }}" alt="Tag" class="img-size-20">
                Tags
            </a>
            <a class="link-page pt-md txt-decoration-none text-base text-link color-primary w-full d-flex justify-start items-center gap-md" href="/reports">
                <img src="{{ asset('imgs/report-gray.svg') }}" alt="Relatórios" class="img-size-20">
                Relatórios
            </a>
            <a class="link-page pt-md txt-decoration-none text-base text-link color-primary w-full d-flex justify-start items-center gap-md" href="/settings">
                <img src="{{ asset('imgs/config-gray.svg') }}" alt="Configurações" class="img-size-20">
                Configurações
            </a>
          </nav>
    </section>
    <section class="w-full d-flex justify-between items-center gap-md pt-md bd-top">
        <div class="d-flex justify-start items-center gap-sm">
            <img
                src="{{ Auth::user()->photo ? asset(Auth::user()->photo) : asset('imgs/photo-default.png') }}"
                alt="Perfil"
                class="img-preview-menu radius-50p img-profile-menu"
                onerror="this.onerror=null; this.src='{{ asset('imgs/photo-default.png') }}';"
            />
            <div class="w-full d-flex flex-column justify-start items-start gap-xs">
                <span class="text-sm fw-sb color-primary nickname-menu">{{ Auth::user()->nickname }}</span>
                <span class="text-sm color-primary text-ellipsis-145">{{ Auth::user()->email }}</span>
            </div>
        </div>
        <a href="{{ route('logout') }}">
            <img src="{{ asset('imgs/right-from-bracket-gray.svg') }}" alt="Logout" class="img-size-20 soft-shake">
        </a>
    </section>
</aside>
