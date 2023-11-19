<div class="card">
    <div class="card-body">

        <div class="row mb-4">

            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="slot_name">Slot Name <span
                        class="text-danger">*</span></label>
                <input type="text" class="form-control @error('slot_name') is-invalid @enderror" id="slot_name"
                    name="slot_name" placeholder="Slot Name"
                    value="{{ isset($slot) ? $slot->slot_name : old('slot_name') }}" />
                @error('slot_name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0"><small class="text-muted">Enter slot name.</small></p>
                @enderror
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="date_range">Start & End Date <span
                        class="text-danger">*</span></label>
                <input type="text" class="form-control @error('date_range') is-invalid @enderror" id="date_range"
                    name="date_range" placeholder="Start & End Date"
                    value="{{ isset($slot) ? \Carbon\Carbon::parse($slot->start_date)->format('d/m/Y') . ' - ' . \Carbon\Carbon::parse($slot->end_date)->format('d/m/Y') : old('date_range') }}" />
                @error('date_range')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0"><small class="text-muted">Enter start date.</small></p>
                @enderror
            </div>
        </div>

        <h5>Slot applicable on week days</h5>

        <div class="row mb-4 g-3">
            @php
                $dayArray = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                $days = isset($slot) ? $slot->days : [];
            @endphp

            @forelse ($dayArray as $day)
                <div class="col-lg-2 col-md-4 col-sm-12 position-relative">
                    <label class="switch switch-square" for="day_{{ $day }}">
                        <input type="hidden" name="days[{{ $day }}]" value="0">
                        <input type="checkbox" class="switch-input" id="day_{{ $day }}"
                            name="days[{{ $day }}]" value="1"
                            {{ count($days) > 0 ? ($days[$day] ? 'checked' : null) : (old('days.' . $day) ? 'checked' : null) }}>
                        <span class="switch-toggle-slider">
                            <span class="switch-on"><i class="ti ti-check"></i></span>
                            <span class="switch-off"><i class="ti ti-x"></i></span>
                        </span>
                        <span class="switch-label">{{ Str::of($day)->ucfirst() }}</span>
                    </label>
                </div>
            @empty
            @endforelse
        </div>

        <div class="row mb-4">
            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="start_time">Start Time <span
                        class="text-danger">*</span></label>
                <input type="text" class="form-control position-relative @error('start_time') is-invalid @enderror"
                    id="start_time" name="start_time" placeholder="Start Time"
                    value="{{ isset($slot) ? $slot->start_time : now()->format('H:i') }}" />
                @error('start_time')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0"><small class="text-muted">Enter start time.</small></p>
                @enderror
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="end_time">End Time <span
                        class="text-danger">*</span></label>
                <input type="text" class="form-control position-relative @error('end_time') is-invalid @enderror"
                    id="end_time" name="end_time" placeholder="End Time"
                    value="{{ isset($slot)? $slot->end_time: now()->addHours(8)->format('H:i') }}" />
                @error('end_time')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0"><small class="text-muted">Enter end time.</small></p>
                @enderror
            </div>
        </div>

        <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <div class="form-check form-check-inline">
                    <input type="hidden" name="active" value="0">
                    <input class="form-check-input" type="checkbox" id="active" name="active" value="1"
                        {{ isset($slot) ? ($slot->active ? 'checked' : null) : (old('active') ? 'checked' : null) }}>
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
