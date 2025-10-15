<div id="page-header" class="bd-shadow-primary bg-secondary min-max-65 radius-lg w-full pt-md d-flex justify-between items-center w-mx-1200">
    <div class="overflow-hidden d-flex justify-start items-center gap-sm">
        @isset($img)
            <img src="{{ asset($img) }}" alt="{{$title}}" class="img-size-20">
        @endisset
        <h1 class="text-2xl fw-sb color-light">{{$title}}</h1>
    </div>
    @isset($content)
        {!! $content !!}
    @endisset
</div>
