<div class="card">
    <div class="card-body">

        <div class="row mb-1">
            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <div class="form-floating">
                    <input type="text" class="form-control @error('name') is-invalid @enderror" id="name"
                        name="name" aria-describedby="nameHelp" placeholder="Ex. Open Air Hall" autofocus
                        value="{{ isset($cuisine) ? $cuisine->name : old('name') }}" />
                    <label for="name">Name <span class="text-danger">*</span></label>
                    @error('name')
                        <div id="nameHelp" class="form-text invalid-feedback">{{ $message }}</div>
                    @else
                        <div id="nameHelp" class="form-text">Enter cuisines.</div>
                    @enderror
                </div>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <div class="form-floating">
                    <input type="number" min="0" class="form-control @error('price') is-invalid @enderror" id="price"
                        name="price" aria-describedby="priceHelp" placeholder="Ex. Open Air Hall" autofocus
                        value="{{ (isset($cuisine) ? $cuisine->price : old('price')) ?? 0 }}" />
                    <label for="price">Price <span class="text-danger">*</span></label>
                    @error('price')
                        <div id="priceHelp" class="form-text invalid-feedback">{{ $message }}</div>
                    @else
                        <div id="priceHelp" class="form-text">Enter cuisine price.</div>
                    @enderror
                </div>
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-lg-12 col-md-12 col-sm-12 position-relative">
                <div class="form-floating">
                    <textarea class="form-control @error('description') is-invalid @enderror" id="description" name="description"
                        placeholder="..." aria-describedby="descriptionHelp"
                        rows="5">{{ isset($cuisine) ? $cuisine->description : old('description') }}</textarea>
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
