<div class="row mb-1">
    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
        <label class="form-label" style="font-size: 15px" for="halls_{{ $key }}">Halls <span
                class="text-danger">*</span></label>
        <select class="select2-size-lg form-select" id="halls_{{ $key }}" name="{{ $key }}[hall]">
            <option value="0" selected>Select Hall</option>
            @foreach ($halls as $row)
                <option value="{{ $row->id }}" {{ $hall_id == $row->id ? 'selected' : '' }}>
                    {{ $loop->index + 1 }} - {{ $row->name }}</option>
            @endforeach
        </select>
        @error('halls')
            <div class="invalid-feedback">{{ $message }}</div>
        @else
            <p class="m-0">
                <small class="text-muted">Select Hall.</small>
            </p>
        @enderror
    </div>

    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 position-relative">
        <label class="form-label fs-5" for="event_date_{{ $key }}">Event Date <span
                class="text-danger">*</span></label>
        <input type="text" class="form-control @error('event_date.' . $key) is-invalid @enderror"
            id="event_date_{{ $key }}" name="{{ $key }}[event_date]" placeholder="Event Date" />
        @error('event_date.' . $key)
            <div class="invalid-feedback">{{ $message }}</div>
        @else
            <p class="m-0"><small class="text-muted">Enter event date.</small></p>
        @enderror
    </div>
</div>

<div class="row mb-1">
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">

        <div class="card shadow-none" style="border: 2px solid #7367F0; border-style: dashed; border-radius: 0;">
            <div class="card-header">
                <h3>Slots</h3>
            </div>

            <div class="card-body" id="div_slot_{{ $key }}">

            </div>
        </div>

    </div>
</div>

{{-- Decorations --}}
<div class="row mb-1">
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">

        <div class="card shadow-none" style="border: 2px solid #7367F0; border-style: dashed; border-radius: 0;">
            <div class="card-header">
                <h3>Decorations</h3>
            </div>

            <div class="card-body" id="div_decorations_{{ $key }}">

                <div class="row custom-options-checkable g-1" >

                    @foreach ([1, 1, 1, 1, 1, 1, 1, 1, 1] as $k)
                        <div class="col-md-4">
                            <input class="custom-option-item-check" type="radio" name="wd" id="slot_custom_{{ $loop->index }}">
                            <label class="custom-option-item p-1" for="slot_custom_{{ $loop->index }}">
                                <div class="card m-0 border-0 text-white">
                                    <img class="card-img" src="../../../app-assets/images/slider/10.jpg"
                                        alt="Card image" />
                                    <div class="card-img-overlay bg-overlay">
                                        <h4 class="card-title text-white">Card title</h4>
                                        <p class="card-text">
                                            This is a wider card with supporting text below as a natural lead-in to
                                            additional content. This content is
                                            a little bit longer.
                                        </p>
                                        <p class="card-text">
                                            <small class="text-muted">Last updated 3 mins ago</small>
                                        </p>
                                    </div>
                                </div>
                            </label>
                        </div>
                    @endforeach
                </div>

            </div>
        </div>

    </div>
</div>

{{-- Cuisines --}}
<div class="row mb-1">
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">

        <div class="card shadow-none" style="border: 2px solid #7367F0; border-style: dashed; border-radius: 0;">
            <div class="card-header">
                <h3>Cuisines</h3>
            </div>

            <div class="card-body" id="div_cuisines_{{ $key }}">

                <div class="row custom-options-checkable g-1" >

                    @foreach ([1, 1, 1, 1, 1, 1, 1, 1, 1] as $k)
                        <div class="col-md-4">
                            <input class="custom-option-item-check" type="radio" name="wd" id="slot_custom_{{ $loop->index }}">
                            <label class="custom-option-item p-1" for="slot_custom_{{ $loop->index }}">
                                <div class="card m-0 border-0 text-white">
                                    <img class="card-img" src="../../../app-assets/images/slider/10.jpg"
                                        alt="Card image" />
                                    <div class="card-img-overlay bg-overlay">
                                        <h4 class="card-title text-white">Card title</h4>
                                        <p class="card-text">
                                            This is a wider card with supporting text below as a natural lead-in to
                                            additional content. This content is
                                            a little bit longer.
                                        </p>
                                        <p class="card-text">
                                            <small class="text-muted">Last updated 3 mins ago</small>
                                        </p>
                                    </div>
                                </div>
                            </label>
                        </div>
                    @endforeach
                </div>

            </div>
        </div>

    </div>
</div>

{{-- Extra --}}
<div class="row mb-1">
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">

        <div class="card shadow-none" style="border: 2px solid #7367F0; border-style: dashed; border-radius: 0;">
            <div class="card-header">
                <h3>Extra</h3>
            </div>

            <div class="card-body" id="div_extra_{{ $key }}">

                <div class="row custom-options-checkable g-1" >

                    @foreach ([1, 1, 1] as $k)
                        <div class="col-md-4">
                            <input class="custom-option-item-check" type="radio" name="wd" id="slot_custom_{{ $loop->index }}">
                            <label class="custom-option-item p-1" for="slot_custom_{{ $loop->index }}">
                                <div class="card m-0 border-0 text-white">
                                    <img class="card-img" src="../../../app-assets/images/slider/10.jpg"
                                        alt="Card image" />
                                    <div class="card-img-overlay bg-overlay">
                                        <h4 class="card-title text-white">Card title</h4>
                                        <p class="card-text">
                                            This is a wider card with supporting text below as a natural lead-in to
                                            additional content. This content is
                                            a little bit longer.
                                        </p>
                                        <p class="card-text">
                                            <small class="text-muted">Last updated 3 mins ago</small>
                                        </p>
                                    </div>
                                </div>
                            </label>
                        </div>
                    @endforeach
                </div>

            </div>
        </div>

    </div>
</div>

<script>
    $(document).ready(() => {

        let DivSlotElement = $('#div_slots_{{ $key }}');

        $("#event_date_{{ $key }}").flatpickr({
            defaultDate: "today",
            minDate: "today",
            altInput: !0,
            altFormat: "F j, Y",
            dateFormat: "Y-m-d",
            onChange: function(selectedDates, dateStr, instance) {
                populateSlots('{{ $hall_id }}', dateStr, '{{ $key }}');
            },
        });

        element = $("#halls_{{ $key }}");
        element.wrap('<div class="position-relative"></div>');
        element.select2({
            dropdownAutoWidth: !0,
            dropdownParent: element.parent(),
            width: "100%",
            containerCssClass: "select-lg",
            tags: true,
        }).on('select2:select', function(e) {
            let hall_id = e.params.data.id;
            if (hall_id != 0) {
                window.location.href =
                    "{{ route('tenant.users.bookings.create', ['hall_id' => ':hall_id']) }}".replace(
                        ':hall_id', hall_id);
            }
        });
    });
</script>
