<div class="bg-secondary w-full flex-mobile justify-between items-center gap-md pt-md bd-shadow-primary radius-sm">
     <div class="d-flex justify-start items-center gap-sm">
        <img src="{{ asset('imgs/satellite-light.svg') }}" alt="Logo" class="img-size-30">
        <span class="text-xl fw-sb color-light">{{ config('app.name') }}</span>
     </div>
     <button class="btn-open-menu-mobile soft-shake">
        <img src="{{ asset('imgs/menu.svg') }}" alt="Logo" class="img-size-20">
     </button>
</div>

<div class="fixed none z-index-screen screen-menu-mobile bg-secondary w-full h-full flex-column justify-start items-start flex-column">
   <section class="w-full pt-md bd-bottom d-flex justify-between items-center gap-sm">
      <div class="w-full d-flex justify-start items-center gap-sm">
         <img src="{{ asset('imgs/satellite-light.svg') }}" alt="Logo" class="img-size-30">
         <span class="text-xl fw-sb color-light">{{ config('app.name') }}</span>
      </div>
      <button class="btn-close-menu-mobile d-flex items-center justify-center soft-shake" aria-label="Fechar modal" type="button"><img src="/imgs/xmark-light.svg" alt="Fechar" class="img-size-15"></button>
   </section>
   <section class="w-full h-full d-flex justify-start items-start pt-md">
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
               src="{{ asset(Auth::user()->photo) }}"
               alt="Perfil"
               class="img-size-40 radius-50p img-cover img-profile-menu"
               onerror="this.src='{{ asset('imgs/photo-default.png') }}';"
         />
         <div class="w-full d-flex flex-column justify-start items-start gap-sm">
               <span class="text-sm fw-sb color-primary nickname-menu">{{ Auth::user()->nickname }}</span>
               <span class="text-sm color-primary text-ellipsis-145">{{ Auth::user()->email }}</span>
         </div>
      </div>
        <a href="{{ route('logout') }}">
            <img src="{{ asset('imgs/right-from-bracket-gray.svg') }}" alt="Logout" class="img-size-20 soft-shake">
        </a>
   </section>
</div>
