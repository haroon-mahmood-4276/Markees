<div class="card">
    <div class="card-body">
        <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <div class="form-floating">
                    <input type="text" class="form-control @error('name') is-invalid @enderror" id="name"
                        name="name" aria-describedby="nameHelp" placeholder="Ex. Sliver Subscription"
                        value="{{ isset($subscription) ? $subscription->name : old('name') }}" />
                    <label for="name">Name <span class="text-danger">*</span></label>
                    @error('name')
                        <div id="nameHelp" class="form-text invalid-feedback">{{ $message }}</div>
                    @else
                        <div id="nameHelp" class="form-text">Enter name of subscription</div>
                    @enderror
                </div>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <div class="form-floating">
                    <input type="text" class="form-control @error('no_of_days') is-invalid @enderror" id="valid_days"
                        name="no_of_days" aria-describedby="no_of_daysHelp" placeholder="Like. 25"
                        value="{{ isset($subscription) ? $subscription->no_of_days : old('no_of_days') }}" />
                    <label for="valid_days">Validity <span class="text-danger">*</span></label>
                    @error('no_of_days')
                        <div id="no_of_daysHelp" class="form-text invalid-feedback">{{ $message }}</div>
                    @else
                        <div id="no_of_daysHelp" class="form-text">Enter number of days for subscription to be valid.</div>
                    @enderror
                </div>
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <div class="form-floating">
                    <input type="text" class="form-control @error('price') is-invalid @enderror" id="price"
                        name="price" aria-describedby="priceHelp" placeholder="Like. 24500"
                        value="{{ isset($subscription) ? $subscription->price : old('price') }}" />
                    <label for="price">Price (Rs) <span class="text-danger">*</span></label>
                    @error('price')
                        <div id="priceHelp" class="form-text invalid-feedback">{{ $message }}</div>
                    @else
                        <div id="priceHelp" class="form-text">Enter price charge for the subscription</div>
                    @enderror
                </div>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <div class="form-floating">
                    <input type="text" class="form-control @error('no_of_halls') is-invalid @enderror" id="no_of_halls"
                        name="no_of_halls" aria-describedby="no_of_hallsHelp" placeholder="Like. 2"
                        value="{{ isset($subscription) ? $subscription->no_of_halls : old('no_of_halls') }}" />
                    <label for="no_of_halls">No of Halls <span class="text-danger">*</span></label>
                    @error('no_of_halls')
                        <div id="no_of_hallsHelp" class="form-text invalid-feedback">{{ $message }}</div>
                    @else
                        <div id="no_of_hallsHelp" class="form-text">Enter number of hall allowed against the subscription</div>
                    @enderror
                </div>
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
