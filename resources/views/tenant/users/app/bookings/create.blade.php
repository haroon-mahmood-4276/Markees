@extends('tenant.users.app.layout.layout')

@section('title', 'Bookings')

@section('page-css')
@endsection

@section('content')
    <div class="container mt-5">
        <div class="p-5 mb-4 bg-light rounded-3">
            <div class="container-fluid py-5">
                <h1 class="display-5 fw-bold">Custom jumbotron</h1>
                <p class="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in
                    previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to
                    your
                    liking.</p>
                <button class="btn btn-primary btn-lg" type="button">Example button</button>
            </div>
        </div>

        <div class="row g-1">

            <div class="row mb-1">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <label class="form-label" style="font-size: 15px" for="booking_days_count">Booking Days<span
                            class="text-danger">*</span></label>
                    <select class="select2-size-lg form-select" id="booking_days_count" name="booking_days_count">
                        <option value="1" selected>1 Day Event</option>
                        <option value="2">2 Days Event</option>
                        <option value="3">3 Days Event</option>
                    </select>
                    @error('booking_days_count')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @else
                        <p class="m-0">
                            <small class="text-muted">Select how many days need to book.</small>
                        </p>
                    @enderror
                </div>
            </div>


            <div class="row g-1">
                {{-- <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <label class="form-label fs-5" for="booking_person_name">Booking Person Name <span
                    class="text-danger">*</span></label>
                <input type="text"
                    class="form-control form-control-lg position-relative @error('booking_person_name') is-invalid @enderror"
                    id="booking_person_name" name="booking_person_name" placeholder="Booking Person Name"
                    value="{{ old('booking_person_name') }}" />
                    @error('booking_person_name')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @else
                    <p class="m-0"><small class="text-muted">Enter booking person name.</small></p>
                    @enderror
            </div> --}}

                <div class="col-12">

                    <ul class="nav nav-pills nav-fill" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="day-1-tab" data-bs-toggle="tab"
                                data-bs-target="#day-1-tab-pane" type="button" role="tab"
                                aria-controls="day-1-tab-pane" aria-selected="true">Day 1</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="day-2-tab" data-bs-toggle="tab" data-bs-target="#day-2-tab-pane"
                                type="button" role="tab" aria-controls="day-2-tab-pane" aria-selected="false">Day
                                2</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="day-3-tab" data-bs-toggle="tab" data-bs-target="#day-3-tab-pane"
                                type="button" role="tab" aria-controls="day-3-tab-pane" aria-selected="false">Day
                                3</button>
                        </li>
                    </ul>

                    <div class="tab-content" id="myTabContent">
                        @php
                            $data = [
                                'hall_id' => $hall_id,
                                'halls' => $halls,
                            ];
                        @endphp
                        <div class="tab-pane fade show active" id="day-1-tab-pane" role="tabpanel"
                            aria-labelledby="day-1-tab" tabindex="0">
                            {{ view('tenant.users.app.bookings.form_fields', [...$data, 'key' => 'day_1']) }}
                        </div>
                        <div class="tab-pane fade" id="day-2-tab-pane" role="tabpanel" aria-labelledby="day-2-tab"
                            tabindex="0">
                            {{ view('tenant.users.app.bookings.form_fields', [...$data, 'key' => 'day_2']) }}
                        </div>
                        <div class="tab-pane fade" id="day-3-tab-pane" role="tabpanel" aria-labelledby="day-3-tab"
                            tabindex="0">
                            {{ view('tenant.users.app.bookings.form_fields', [...$data, 'key' => 'day_3']) }}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    @endsection

    @section('page-scripts')
        <script>
            function populateSlots(hall_id, event_date, key) {

                let DivSlotElement = $('#div_slot_' + key);

                showBlockUI(DivSlotElement);
                let time_slot = $("#time_slots_" + key);

                let need = 'view';

                $.ajax({
                    url: "{{ route('tenant.users.ajax.get-slots-by-hall-id', ['hall_id' => ':hall_id']) }}"
                        .replace(
                            ':hall_id', hall_id),
                    type: "GET",
                    data: {
                        key: key,
                        date: event_date,
                        type: 'radio',
                        need: need,
                    },
                    success: (data) => {
                        DivSlotElement.html(data.data);
                        hideBlockUI(DivSlotElement);
                    },
                    error: (error) => {
                        hideBlockUI(DivSlotElement);
                        console.log(error);
                    },
                });
            }
        </script>
    @endsection
