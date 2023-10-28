<div class="card">
    <div class="card-body">
        <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <label class="form-label" style="font-size: 15px" for="name">Name <span class="text-danger">*</span></label>
                <input type="text" class="form-control @error('name') is-invalid @enderror" id="name"
                    name="name" placeholder="Name"
                    value="{{ isset($subscription) ? $subscription->name : old('name') }}" />
                @error('name')
                    <div class="invalid-tooltip">{{ $message }}</div>
                @else
                    <div id="name-help" class="form-text">Enter name of subscription</div>
                @enderror
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <label class="form-label" style="font-size: 15px" for="valid_days">Validity (Days) <span class="text-danger">*</span></label>
                <input type="number" class="form-control @error('no_of_days') is-invalid @enderror" id="valid_days"
                    name="no_of_days" placeholder="Validity (Days)"
                    value="{{ isset($subscription) ? $subscription->no_of_days : old('no_of_days') }}" />
                @error('no_of_days')
                    <div class="invalid-tooltip">{{ $message }}</div>
                @else
                    <div id="no_of_days-help" class="form-text">Enter name of days for subscription to be valid.</div>
                @enderror
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <label class="form-label" style="font-size: 15px" for="price">Price (Rs) <span class="text-danger">*</span></label>
                <input type="number" class="form-control @error('price') is-invalid @enderror" id="price"
                    name="price" placeholder="Price (Rs)"
                    value="{{ isset($subscription) ? $subscription->price : old('price') }}" />
                @error('price')
                    <div class="invalid-tooltip">{{ $message }}</div>
                @else
                    <div id="price-help" class="form-text">Enter price charge for the subscription</div>
                @enderror
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <label class="form-label" style="font-size: 15px" for="halls_count">No of Halls <span class="text-danger">*</span></label>
                <input type="number" class="form-control @error('no_of_halls') is-invalid @enderror" id="halls_count"
                    name="no_of_halls" placeholder="No of Halls"
                    value="{{ isset($subscription) ? $subscription->no_of_halls : old('no_of_halls') }}" />
                @error('no_of_halls')
                    <div class="invalid-tooltip">{{ $message }}</div>
                @else
                    <div id="price-help" class="form-text">Enter number of hall allowed against the subscription</div>
                @enderror
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <div class="form-check form-check-inline">
                    <input type="hidden" name="active" value="0">
                    <input class="form-check-input" type="checkbox" id="active" name="active" value="1"
                        {{ isset($subscription) ? ($subscription->active ? 'checked' : null) : (old('active') ? 'checked' : null) }}>
                    <label class="form-check-label" for="active">Active <span class="text-danger">*</span></label>
                </div>
                @error('active')
                    <div class="invalid-tooltip">{{ $message }}</div>
                @else
                    <div id="active-help" class="form-text">Check to active the subscription</div>
                @enderror
            </div>
        </div>
    </div>
</div>
