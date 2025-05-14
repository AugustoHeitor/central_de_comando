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

            $imgPageHeader = 'imgs/wallet-dark.svg';
            
        @endphp

        @include('layouts.pageHeader', [
            'img' => $imgPageHeader,
            'title' => 'Financeiro',
            'content' => $content
        ])


    </main>

@endsection

<script type="module"> 


</script>