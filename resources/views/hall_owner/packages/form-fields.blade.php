<div class="card mb-3">
    <div class="card-body">
        <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="name">Package Name <span
                        class="text-danger">*</span></label>
                <input type="text" class="form-control @error('name') is-invalid @enderror" id="name"
                    name="name" placeholder="Package Name"
                    value="{{ isset($package) ? $package->name : old('name') }}" />
                @error('name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0">
                        <small class="text-muted">Enter Package name.</small>
                    </p>
                @enderror
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="price">Package Price <span
                        class="text-danger">*</span></label>
                <input type="number" min="0" class="form-control @error('price') is-invalid @enderror"
                    id="price" name="price" placeholder="Package Price"
                    value="{{ (isset($package) ? $package->price : old('price')) ?? 0 }}" />
                @error('price')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0">
                        <small class="text-muted">Enter Package price.</small>
                    </p>
                @enderror
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="description">Description <span
                        class="text-danger"></span></label>
                <textarea class="form-control @error('description') is-invalid @enderror" rows="5" id="description"
                    name="description" placeholder="Description">{{ isset($package) ? $package->description : old('description') }}</textarea>
                @error('description')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0">
                        <small class="text-muted">Enter Description.</small>
                    </p>
                @enderror
            </div>
        </div>

    </div>
</div>

<div class="row">
    {{-- Hall Type --}}
    <div class="col-lg-4 col-md-4 col-sm-12 position-relative">
        <div class="card m-0">
            <div class="card-header pb-2">
                <h4 class="card-title">Hall Type</h4>
            </div>
            <div class="card-body">
                <div class="row g-2 position-relative no-scrollbar"
                    style="min-height: 500px; max-height: 500px; overflow-y: scroll;">
                    @forelse ($hallTypes as $hallType)
                        <div class="col-12">
                            <div class="form-check custom-option custom-option-basic">
                                <label class="form-check-label custom-option-content"
                                    for="hall_type_{{ $hallType->id }}">
                                    <input class="form-check-input" type="radio" name="hall_type"
                                        id="hall_type_{{ $hallType->id }}" value="{{ $hallType->id }}"
                                        {{ isset($package) && $package->hall_type_id == $hallType->id ? 'checked' : null }} />
                                    <span class="custom-option-header">
                                        <span class="h6 mb-0">{{ $hallType->name }}</span>
                                        {{-- <span class="text-muted">Free</span> --}}
                                    </span>
                                    <span class="custom-option-body">
                                        <small>{{ Str::words($hallType->description, 10, '...') }}</small>
                                    </span>
                                </label>
                            </div>
                        </div>
                    @empty
                    @endforelse
                </div>
            </div>
        </div>
    </div>

    {{-- Decorations --}}
    <div class="col-lg-4 col-md-4 col-sm-12 position-relative">
        <div class="card m-0">
            <div class="card-header pb-2">
                <h4 class="card-title">Decorations</h4>
            </div>
            <div class="card-body">
                <div class="row g-2 position-relative no-scrollbar"
                    style="min-height: 500px; max-height: 500px; overflow-y: scroll;">
                    @forelse ($decorations as $decoration)
                        <div class="col-12">
                            <div class="form-check custom-option custom-option-basic">
                                <label class="form-check-label custom-option-content"
                                    for="decoration_{{ $decoration->id }}">
                                    <input class="form-check-input" type="radio" name="decorations[]"
                                        id="decoration_{{ $decoration->id }}" value="{{ $decoration->id }}"
                                        {{ isset($package) && in_array($decoration->id, $package->decorations) ? 'checked' : null }} />
                                    <span class="custom-option-header">
                                        <span class="h6 mb-0">{{ $decoration->name }}</span>
                                        <span class="text-muted">{{ $decoration->price }} Rs</span>
                                    </span>
                                    <span class="custom-option-body">
                                        <small>{{ Str::words($decoration->description, 10, '...') }}</small>
                                    </span>
                                </label>
                            </div>
                        </div>
                    @empty
                    @endforelse
                </div>
            </div>
        </div>
    </div>

    {{-- Cuisines --}}
    <div class="col-lg-4 col-md-4 col-sm-12 position-relative">
        <div class="card m-0">
            <div class="card-header pb-2">
                <h4 class="card-title">Cusinies</h4>
            </div>
            <div class="card-body">
                <div class="row g-2 position-relative no-scrollbar"
                    style="min-height: 500px; max-height: 500px; overflow-y: scroll;">
                    @forelse ($cuisines as $cuisine)
                        <div class="col-12">
                            <div class="form-check custom-option custom-option-basic">
                                <label class="form-check-label custom-option-content"
                                    for="decoration_{{ $cuisine->id }}">
                                    <input class="form-check-input" type="checkbox" name="cuisines[]"
                                        id="decoration_{{ $cuisine->id }}" value="{{ $cuisine->id }}"
                                        {{ isset($package) && in_array($cuisine->id, $package->cuisines) ? 'checked' : null }} />
                                    <span class="custom-option-header">
                                        <span class="h6 mb-0">{{ $cuisine->name }}</span>
                                        <span class="text-muted">{{ $cuisine->price }} Rs</span>
                                    </span>
                                    <span class="custom-option-body">
                                        <small>{{ Str::words($cuisine->description, 10, '...') }}</small>
                                    </span>
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
