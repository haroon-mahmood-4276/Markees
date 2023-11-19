@php
    $dir = getIconDirection(LaravelLocalization::getCurrentLocaleDirection());
@endphp
<div class="card">
    <div class="card-body">
        <div class="row mb-3">
            <div class="col-lg-12 col-md-12 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="parent_hall_type">Hall Types</label>
                <select class="select2-size-lg @error('parent_hall_type') is-invalid @enderror form-select" id="parent_hall_type" name="parent_hall_type">
                    <option data-icon="fa-solid fa-angle-{{ $dir }}" value="{{ env('ZERO_UUID') }}" selected>Parent Hall Type
                    </option>
                    @foreach ($hallTypes as $row)
                        @continue(isset($hallType) && $hallType->id == $row->id)
                        <option data-icon="fa-solid fa-angle-{{ $dir }}"
                            value="{{ $row['id'] }}"{{ (isset($hallType) ? $hallType->parent_id : old('hallType')) == $row['id'] ? 'selected' : '' }}>
                            {{ $row['tree'] }}</option>
                    @endforeach
                </select>
                @error('parent_hall_type')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <div id="name-help" class="form-text">Select parent hall type </div>
                @enderror
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-lg-12 col-md-12 col-sm-12 position-relative">
                <div class="form-floating">
                    <input type="text" class="form-control @error('name') is-invalid @enderror" id="name"
                        name="name" aria-describedby="nameHelp" placeholder="Ex. Open Air Hall" autofocus
                        value="{{ isset($hallType) ? $hallType->name : old('name') }}" />
                    <label for="name">Name <span class="text-danger">*</span></label>
                    @error('name')
                        <div id="nameHelp" class="form-text invalid-feedback">{{ $message }}</div>
                    @else
                        <div id="nameHelp" class="form-text">Enter name.</div>
                    @enderror
                </div>
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-lg-12 col-md-12 col-sm-12 position-relative">
                <div class="form-floating">
                    <textarea class="form-control @error('description') is-invalid @enderror" id="description" name="description"
                        placeholder="..." aria-describedby="descriptionHelp"
                        rows="5">{{ isset($hallType) ? $hallType->description : old('description') }}</textarea>
                    <label for="description">Description <span class="text-danger">*</span></label>
                    @error('description')
                        <div id="descriptionHelp" class="form-text invalid-feedback">{{ $message }}</div>
                    @else
                        <div id="descriptionHelp" class="form-text">Enter description.</div>
                    @enderror
                </div>
            </div>
        </div>
    </div>
</div>
