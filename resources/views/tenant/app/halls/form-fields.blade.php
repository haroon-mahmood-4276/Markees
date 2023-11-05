<div class="card">
    <div class="card-body">
        <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="name">Name <span
                        class="text-danger">*</span></label>
                <input type="text" class="form-control @error('name') is-invalid @enderror" id="name"
                    name="name" placeholder="Name" value="{{ isset($hall) ? $hall->name : old('name') }}" />
                @error('name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0">
                        <small class="text-muted">Enter hall name.</small>
                    </p>
                @enderror
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="short_label">Short Label <span
                        class="text-danger">**</span></label>

                <input type="text" class="form-control @error('short_label') is-invalid @enderror" id="short_label"
                    name="short_label" placeholder="Short Label"
                    value="{{ isset($hall) ? $hall->short_label : old('short_label') }}"
                    {{ isset($hall) ? 'disabled' : null }} />
                @error('short_label')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0">
                        <small class="text-muted">Enter hall short label.</small>
                    </p>
                @enderror
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="min_capacity">Minimum Capacity <span
                        class="text-danger">*</span></label>
                <input type="number" class="form-control @error('min_capacity') is-invalid @enderror" id="min_capacity"
                    name="min_capacity" placeholder="Minimum Capacity"
                    value="{{ (isset($hall) ? $hall->min_capacity : old('min_capacity')) ?? 0 }}" />
                @error('min_capacity')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0">
                        <small class="text-muted">Enter minimum capacity of the hall.</small>
                    </p>
                @enderror
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="max_capacity">Maximum Capacity <span
                        class="text-danger">*</span></label>
                <input type="number" class="form-control @error('max_capacity') is-invalid @enderror" id="max_capacity"
                    name="max_capacity" placeholder="Maximum Capacity"
                    value="{{ (isset($hall) ? $hall->max_capacity : old('max_capacity')) ?? 0 }}" />
                @error('max_capacity')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0">
                        <small class="text-muted">Enter maximum capacity of the hall.</small>
                    </p>
                @enderror
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-lg-12 col-md-12 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="description">Description <span
                        class="text-danger"></span></label>
                <textarea class="form-control @error('description') is-invalid @enderror" rows="5"
                    id="description" name="description" placeholder="Description">{{ isset($hall) ? $hall->description : old('description') }}</textarea>
                @error('description')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0">
                        <small class="text-muted">Enter Description.</small>
                    </p>
                @enderror
            </div>
        </div>

        <div class="row mb-3 g-1">
            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <div class="form-check form-check-inline">
                    <input type="hidden" name="active" value="0">
                    <input class="form-check-input" type="checkbox" id="active" name="active" value="1"
                        {{ isset($hall) ? ($hall->active ? 'checked' : null) : (old('active') ? 'checked' : null) }}>
                    <label class="form-check-label" for="active">Active</label>
                </div>
                @error('active')
                    <div class="invalid-tooltip">{{ $message }}</div>
                @else
                    <div id="active-help" class="form-text">Check to active the hall</div>
                @enderror
            </div>
        </div>
    </div>
</div>
