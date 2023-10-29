@extends('tenant.users.app.layout.layout')

@section('title', 'Home')

@section('page-css')
@endsection

@section('content')
    <div class="row g-0 mb-4">
        <div class="col-12">
            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                        aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="{{ global_asset('theme-assets') }}/images/banner/banner-2.jpg" class="d-block w-100"
                            alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="{{ global_asset('theme-assets') }}/images/banner/banner-3.jpg" class="d-block w-100"
                            alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="{{ global_asset('theme-assets') }}/images/banner/banner-4.jpg" class="d-block w-100"
                            alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            @forelse ($halls as $hall)
                <div class="col-xl-6 col-lg-6 col-md-6">
                    <a href="{{ route('tenant.users.bookings.create', ['hall_id' => $hall->id]) }}">
                        <div class="card">
                            <img src="{{ global_asset('theme-assets') }}/images/banner/banner-7.jpg"
                                class="img-fluid card-img rounded-start" alt="...">
                            <div class="card-img-overlay text-dark">
                                <h5 class="card-title">{{ $hall->name }}</h5>
                                <p class="card-text">{{ $hall->description }}</p>
                                <p class="card-text">Available Slots: <small>{{ implode(' | ', $hall->slots->pluck('start_time', 'end_time' )->toArray()) }}</small></p>
                            </div>
                        </div>
                    </a>
                </div>
            @empty
            @endforelse
        </div>
    </div>
@endsection

@section('page-scripts')
@endsection
