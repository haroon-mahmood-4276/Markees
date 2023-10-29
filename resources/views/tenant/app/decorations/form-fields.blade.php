<div class="card">
    <div class="card-body">

        <div class="row mb-4">
            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="name">Decoration <span class="text-danger">*</span></label>
                <input type="text" class="form-control @error('name') is-invalid @enderror"
                    id="name" name="name" placeholder="Decoration"
                    value="{{ isset($decoration) ? $decoration->name : old('name') }}" />
                @error('name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0">
                        <small class="text-muted">Enter Decoration.</small>
                    </p>
                @enderror
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="price">Decoration Price <span
                        class="text-danger">*</span></label>
                <input type="number" min="0"
                    class="form-control @error('price') is-invalid @enderror" id="price"
                    name="price" placeholder="Decoration Price"
                    value="{{ (isset($decoration) ? $decoration->price : old('price')) ?? 0 }}" />
                @error('price')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0">
                        <small class="text-muted">Enter decoration price.</small>
                    </p>
                @enderror
            </div>
        </div>

        <div class="row mb-4">
            <div class="col-lg-12 col-md-12 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="description">Description <span class="text-danger"></span></label>
                <textarea class="form-control @error('description') is-invalid @enderror" rows="5"
                    id="description" name="description" placeholder="Description">{{ isset($decoration) ? $decoration->description : old('description') }}</textarea>
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
