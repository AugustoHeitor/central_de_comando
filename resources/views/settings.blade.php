@extends('layouts.template')

@section('title', 'Financeiro')

@section('links')
    <link rel="stylesheet" href="{{asset('css/financial.css')}}">
    <link rel="stylesheet" href="{{asset('css/layouts/modal.css')}}">
@endsection

@section('scripts')
  
@endsection

@section('modals')

@endsection

@section('content')
    <main class="h-full w-full d-flex justify-start items-center flex-column gap-md w-mx-1200">
        @php

            $content = '
                <div class="d-flex justify-start items-start gap-md">
                    
                </div>
            ';

            $imgPageHeader = 'imgs/config-dark.svg';

        @endphp

        @include('layouts.pageHeader', [
            'img' => $imgPageHeader,
            'title' => 'Configurações',
            'content' => $content
        ])

        <form action="#">
            <div class="w-full pt-md radius-lg bd-primary bg-light">
                <img src="{{ asset('imgs/eu.png') }}" alt="Perfil" class="img-size-70 radius-50p">
                <button>Remover Foto</button>
            </div>

            <div class="w-full pt-md radius-lg bd-primary bg-light">

            </div>

            <div class="w-full pt-md radius-lg bd-primary bg-light">

            </div>

            <div class="w-full pt-md">
                <button type="submit" class="hover-scale w-full d-flex justify-center items-center gap-sm w-full color-light text-sm pt-btn-primary radius-lg fw-m bg-btn-save w-mx-280">
                    <img src="{{ asset('imgs/save.svg') }}" alt="Salvar" class="img-size-15">
                    Salvar
                </button>
            </div>
        </form>
        
    </main>
@endsection

<script type="module"> 


</script>