<div class="card" style="border: 2px solid #7367F0; border-style: dashed; border-radius: 0;">
    <div class="card-body">

        <div class="row mb-1">
            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <label class="form-label fs-5" for="name">Package Name <span class="text-danger">*</span></label>
                <input type="text" class="form-control form-control-lg @error('name') is-invalid @enderror"
                    id="name" name="name" placeholder="Package Name"
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
                <label class="form-label fs-5" for="price">Package Price <span class="text-danger">*</span></label>
                <input type="number" min="0"
                    class="form-control form-control-lg @error('price') is-invalid @enderror" id="price"
                    name="price" placeholder="Package Price"
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

        <div class="row mb-1">
            <div class="col-lg-12 col-md-12 col-sm-12 position-relative">
                <label class="form-label fs-5" for="description">Description <span class="text-danger"></span></label>
                <textarea class="form-control form-control-lg @error('description') is-invalid @enderror" rows="5"
                    id="description" name="description" placeholder="Description">{{ isset($package) ? $package->description : old('description') }}</textarea>
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

<div class="row mb-1">

    <div class="col-lg-4 col-md-4 col-sm-12 position-relative">
        <div class="card m-0" style="border: 2px solid #7367F0; border-style: dashed; border-radius: 0;">
            <div class="card-header">
                <h4 class="card-title">Hall Type</h4>
            </div>
            <div class="card-body">

                <div class="row custom-options-checkable g-1 position-relative no-scrollbar"
                    style="min-height: 500px; max-height: 500px; overflow-y: scroll;">

                    @forelse ($hallTypes as $hallType)
                        <div class="col-md-12">
                            <input class="custom-option-item-check" type="radio" name="hall_type"
                                id="hall_type_{{ $hallType->id }}" value="{{ $hallType->id }}"
                                {{ isset($package) ? ($package->hall_type_id == $hallType->id ? 'checked' : null) : null }} />
                            <label class="custom-option-item p-1" for="hall_type_{{ $hallType->id }}">
                                <span class="d-flex justify-content-between flex-wrap mb-50">
                                    <span class="fw-bolder">{{ $loop->index + 1 }}. {{ $hallType->name }}</span>
                                    {{-- <span class="fw-bolder">Free</span> --}}
                                </span>
                                <small class="d-block">{{ Str::words($hallType->description, 10, '...') }}</small>
                            </label>
                        </div>
                    @empty
                    @endforelse
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-4 col-md-4 col-sm-12 position-relative">
        <div class="card m-0" style="border: 2px solid #7367F0; border-style: dashed; border-radius: 0;">
            <div class="card-header">
                <h4 class="card-title">Decorations</h4>
            </div>
            <div class="card-body">
                <div class="row custom-options-checkable g-1 position-relative no-scrollbar"
                    style="min-height: 500px; max-height: 500px; overflow-y: scroll;">

                    @forelse ($decorations as $decoration)
                        <div class="col-md-12">
                            <input class="custom-option-item-check" type="checkbox" name="decorations[]"
                                id="decoration_{{ $decoration->id }}" value="{{ $decoration->id }}"
                                {{ isset($package) && in_array($decoration->id, $package->decorations) ? 'checked' : null }} />
                            <label class="custom-option-item p-1" for="decoration_{{ $decoration->id }}">
                                <span class="d-flex justify-content-between flex-wrap mb-50">
                                    <span class="fw-bolder">{{ $loop->index + 1 }}. {{ $decoration->name }}</span>
                                    <span class="fw-bolder">{{ $decoration->price }} Rs</span>
                                </span>
                                <small class="d-block">{{ Str::words($decoration->description, 10, '...') }}</small>
                            </label>
                        </div>
                    @empty
                    @endforelse
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-4 col-md-4 col-sm-12 position-relative">
        <div class="card m-0" style="border: 2px solid #7367F0; border-style: dashed; border-radius: 0;">
            <div class="card-header">
                <h4 class="card-title">Cusinies</h4>
            </div>
            <div class="card-body">
                <div class="row custom-options-checkable g-1 position-relative no-scrollbar"
                    style="min-height: 500px; max-height: 500px; overflow-y: scroll;">

                    @forelse ($cuisines as $cuisine)
                        <div class="col-md-12">
                            <input class="custom-option-item-check" type="checkbox" name="cuisines[]"
                                id="cuisine_{{ $cuisine->id }}" value="{{ $cuisine->id }}"
                                {{ isset($package) && in_array($cuisine->id, $package->cuisines) ? 'checked' : null }} />
                            <label class="custom-option-item p-1" for="cuisine_{{ $cuisine->id }}">
                                <span class="d-flex justify-content-between flex-wrap mb-50">
                                    <span class="fw-bolder">{{ $loop->index + 1 }}. {{ $cuisine->name }}</span>
                                    <span class="fw-bolder">{{ $cuisine->price }} Rs</span>
                                </span>
                                <small class="d-block">{{ Str::words($cuisine->description, 10, '...') }}</small>
                            </label>
                        </div>
                    @empty
                    @endforelse
                </div>
            </div>
        </div>
    </div>

</div>
