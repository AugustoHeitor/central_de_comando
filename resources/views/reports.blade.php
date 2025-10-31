@extends('layouts.template')

@section('title', 'Relatórios')

@section('links')
    <link rel="stylesheet" href="{{asset('css/pages/reports.css')}}">
    <link rel="stylesheet" href="{{asset('css/layouts/modal.css')}}">
@endsection

@section('scripts')
    <script defer src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script type="module" defer src="{{asset('js/initializers/pageReport.js')}}"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
@endsection

@section('content')

    <main class="fade-in h-full w-full d-flex justify-start items-center flex-column gap-md w-mx-1200 scroll-y-mobile">


         @php

            $content = '
                <div class="d-flex justify-start items-start gap-md">

                </div>
            ';

            $imgPageHeader = 'imgs/report-light.svg';

        @endphp

        @include('layouts.pageHeader', [
            'img' => $imgPageHeader,
            'title' => 'Relatórios',
            'content' => $content
        ])

        <section id="cards-section" class="overflow-x-hidden w-full d-grid gap-md justify-start">

        </section>

        <section id="report-section" class="overflow-x-hidden w-full h-full none gap-md justify-start flex-column">

        </section>

    </main>
@endsection

