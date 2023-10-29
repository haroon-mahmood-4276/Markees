{{-- @dd($hallSlot) --}}
<div class="card" style="border: 2px solid #7367F0; border-style: dashed; border-radius: 0;">
    <div class="card-body">
        <div class="row mb-1">

            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <label class="form-label fs-5" for="slot_name">Slot Name <span class="text-danger">*</span></label>
                <input type="text" class="form-control form-control-lg @error('slot_name') is-invalid @enderror"
                    id="slot_name" name="slot_name" placeholder="Slot Name"
                    value="{{ isset($hallSlot) ? $hallSlot->slot_name : old('slot_name') }}" />
                @error('slot_name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0"><small class="text-muted">Enter slot name.</small></p>
                @enderror
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <label class="form-label fs-5" for="date_range">Start & End Date <span
                        class="text-danger">*</span></label>
                <input type="text" class="form-control form-control-lg @error('date_range') is-invalid @enderror"
                    id="date_range" name="date_range" placeholder="Start & End Date" />
                @error('date_range')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0"><small class="text-muted">Enter start date.</small></p>
                @enderror
            </div>

        </div>

        <div class="row mb-1 g-1">
            <div class="col-lg-12 col-md-12 col-sm-12 position-relative">
                <div class="card" style="border: 2px solid #eee; border-style: dashed; border-radius: 0;">
                    <div class="card-header">
                        <h4>Slot applicable on week days</h4>
                    </div>
                    <div class="card-body">
                        <div class="row mb-1 g-1">
                            @php
                                $dayArray = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                                $days = isset($hallSlot) ? $hallSlot->days : [];
                            @endphp

                            @forelse ($dayArray as $day)
                                <div class="col-lg-2 col-md-4 col-sm-12 position-relative">
                                    <label class="form-check-label mb-50"
                                        for="day_{{ $day }}">{{ Str::of($day)->ucfirst() }}</label>
                                    <div class="form-check form-switch form-check-primary">
                                        <input type="hidden" name="days[{{ $day }}]" value="0">
                                        <input type="checkbox" class="form-check-input" id="day_{{ $day }}"
                                            name="days[{{ $day }}]" value="1"
                                            {{ count($days) > 0 ? ($days[$day] ? 'checked' : null) : (old('days.' . $day) ? 'checked' : null) }} />
                                        <label class="form-check-label" for="day_{{ $day }}">
                                            <span class="switch-icon-left"><i data-feather="check"></i></span>
                                            <span class="switch-icon-right"><i data-feather="x"></i></span>
                                        </label>
                                    </div>
                                </div>
                            @empty
                            @endforelse

                        </div>
                    </div>
                </div>

            </div>
        </div>


        <div class="row mb-1">

            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <label class="form-label fs-5" for="start_time">Start Time <span class="text-danger">*</span></label>
                <input type="text"
                    class="form-control form-control-lg position-relative @error('start_time') is-invalid @enderror"
                    id="start_time" name="start_time" placeholder="Start Time"
                    value="{{ isset($hallSlot) ? $hallSlot->start_time : now()->format('H:i') }}" />
                @error('start_time')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0"><small class="text-muted">Enter start time.</small></p>
                @enderror
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <label class="form-label fs-5" for="end_time">End Time <span class="text-danger">*</span></label>
                <input type="text"
                    class="form-control form-control-lg position-relative @error('end_time') is-invalid @enderror"
                    id="end_time" name="end_time" placeholder="End Time"
                    value="{{ isset($hallSlot)? $hallSlot->end_time: now()->addHours(8)->format('H:i') }}" />
                @error('end_time')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0"><small class="text-muted">Enter end time.</small></p>
                @enderror
            </div>
        </div>

        <div class="row mb-1 g-1">
            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <div class="form-check form-check-inline">
                    <input type="hidden" name="active" value="0">
                    <input class="form-check-input" type="checkbox" id="active" name="active" value="1"
                        {{ isset($hallSlot) ? ($hallSlot->active ? 'checked' : null) : (old('active') ? 'checked' : null) }}>
                    <label class="form-check-label" for="active">Active</label>
                </div>
                @error('active')
                    <div class="invalid-tooltip">{{ $message }}</div>
                @else
                    <div id="active-help" class="form-text">Check to active the slot</div>
                @enderror
            </div>
        </div>

    </div>
</div>
