<div class="card">
    <div class="card-body">

        <div class="row mb-1">
            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="name">Cuisines Name <span
                        class="text-danger">*</span></label>
                <input type="text" class="form-control @error('name') is-invalid @enderror" id="name"
                    name="name" placeholder="Cuisine Name"
                    value="{{ isset($cuisine) ? $cuisine->name : old('name') }}" />
                @error('name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0">
                        <small class="text-muted">Enter cuisines.</small>
                    </p>
                @enderror
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="price">Cuisines Price <span
                        class="text-danger">*</span></label>
                <input type="number" min="0" class="form-control @error('price') is-invalid @enderror"
                    id="price" name="price" placeholder="Cuisines Price"
                    value="{{ (isset($cuisine) ? $cuisine->price : old('price')) ?? 0 }}" />
                @error('price')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0">
                        <small class="text-muted">Enter cuisine price.</small>
                    </p>
                @enderror
            </div>
        </div>

        <div class="row mb-1">
            <div class="col-lg-12 col-md-12 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="description">Description <span
                        class="text-danger"></span></label>
                <textarea class="form-control @error('description') is-invalid @enderror" rows="5" id="description"
                    name="description" placeholder="Description">{{ isset($cuisine) ? $cuisine->description : old('description') }}</textarea>
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
