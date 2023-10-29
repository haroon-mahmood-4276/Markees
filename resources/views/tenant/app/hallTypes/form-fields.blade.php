@php
    $dir = getIconDirection(LaravelLocalization::getCurrentLocaleDirection());
@endphp
<div class="card">
    <div class="card-body">
        <div class="row mb-3">
            <div class="col-lg-12 col-md-12 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="hallType">Hall Types</label>
                <select class="select2-size-lg form-select" id="hallType" name="hallType">
                    <option data-icon="fa-solid fa-angle-{{ $dir }}" value="0" selected>Parent Hall Type
                    </option>
                    @foreach ($hallTypes as $row)
                        @continue(isset($hallType) && $hallType->id == $row->id)
                        <option data-icon="fa-solid fa-angle-{{ $dir }}"
                            value="{{ $row['id'] }}"{{ (isset($hallType) ? $hallType->parent_id : old('hallType')) == $row['id'] ? 'selected' : '' }}>
                            {{ $row['tree'] }}</option>
                    @endforeach
                </select>
                @error('hallType')
                    <div class="invalid-tooltip">{{ $message }}</div>
                @else
                    <div id="name-help" class="form-text">Select parent hall type </div>
                @enderror
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-lg-12 col-md-12 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="name">Hall Type <span
                        class="text-danger">*</span></label>
                <input type="text" class="form-control @error('name') is-invalid @enderror" id="name"
                    name="name" placeholder="Hall Type"
                    value="{{ isset($hallType) ? $hallType->name : old('name') }}" />
                @error('name')
                    <div class="invalid-tooltip">{{ $message }}</div>
                @else
                    <div id="name-help" class="form-text">Enter hall type</div>
                @enderror
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-lg-12 col-md-12 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="description">Description <span
                        class="text-danger">*</span></label>
                <textarea class="form-control @error('description') is-invalid @enderror" rows="5" id="description"
                    name="description" placeholder="Description">{{ isset($hallType) ? $hallType->description : old('description') }}</textarea>
                @error('description')
                    <div class="invalid-tooltip">{{ $message }}</div>
                @else
                    <div id="name-help" class="form-text">Enter name of description</div>
                @enderror
            </div>
        </div>
    </div>
</div>
