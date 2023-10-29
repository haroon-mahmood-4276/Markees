<div class="card">
    <div class="card-body">
        <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <label class="form-label" style="font-size: 15px" for="name">Name <span class="text-danger">*</span></label>
                <input type="text" class="form-control @error('name') is-invalid @enderror"
                    id="name" name="name" placeholder="Name"
                    value="{{ isset($hallOwner) ? $hallOwner->name : old('name') }}" />
                @error('name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <div id="name-help" class="form-text">Enter name of Owner.</div>
                @enderror
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <label class="form-label" style="font-size: 15px" for="ntn">NTN <span class="text-danger">*</span></label>
                <input type="text" class="form-control @error('ntn') is-invalid @enderror"
                    id="ntn" name="ntn" placeholder="NTN"
                    value="{{ isset($hallOwner) ? $hallOwner->ntn : old('ntn') }}" />
                @error('ntn')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <div id="ntn-help" class="form-text">Enter NTN of Owner.</div>
                @enderror
            </div>
        </div>

        <div class="row mb-3">

            <div class="col-lg-12 col-md-12 col-sm-12 position-relative">
                <label class="form-label" style="font-size: 15px" for="subdomain">Sub Domain <span class="text-danger">*</span></label>
                <div class="input-group">
                    <span class="input-group-text" id="basic-addon2">{{ $domain['scheme'] }}://</span>
                    <input type="text" class="form-control @error('subdomain') is-invalid @enderror"
                        id="subdomain" name="subdomain" placeholder="Sub Domain"
                        {{ isset($hallOwner) ? 'readonly' : '' }}
                        value="{{ isset($hallOwner) ? $hallOwner->subdomain : old('subdomain') }}" />
                    <span class="input-group-text"
                        id="basic-addon2">.{{ $domain['host'] . (isset($domain['port']) ? ':' . $domain['port'] : null) }}</span>
                </div>
                @error('subdomain')
                    <div class="invalid-feedback" style="display: block;">{{ $message }}</div>
                @else
                    <div id="subdomain-help" class="form-text">Enter Subdomain for the owner.</div>
                @enderror
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <label class="form-label" style="font-size: 15px" for="email">Email <span class="text-danger">*</span></label>
                <input type="email" class="form-control @error('email') is-invalid @enderror"
                    id="email" name="email" placeholder="Email"
                    value="{{ isset($hallOwner) ? $hallOwner->email : old('email') }}" />
                @error('email')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <div id="email-help" class="form-text">Enter email of Owner.</div>
                @enderror
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <label class="form-label" style="font-size: 15px" for="password">Password <span class="text-danger">*</span></label>
                <input type="password" class="form-control @error('password') is-invalid @enderror"
                    id="password" name="password"
                    placeholder="{{ isset($hallOwner) ? 'Leave empty for unchanged' : null }} Password"
                    value="" />
                @error('password')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <div id="password-help" class="form-text">The password must be at least 8 characters and contain at
                        least one
                        uppercase character, one number, and one special character.</div>
                @enderror
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <label class="form-label" style="font-size: 15px" for="phone">Phone Number <span class="text-danger">*</span></label>
                <input type="text" class="form-control @error('phone') is-invalid @enderror"
                    id="phone" name="phone" placeholder="Phone Number"
                    value="{{ isset($hallOwner) ? $hallOwner->phone : old('phone') }}" />
                @error('phone')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <div id="phone-help" class="form-text">Phone of Owner.</div>
                @enderror
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <label class="form-label" style="font-size: 15px" for="cnic">CNIC <span class="text-danger">*</span></label>
                <input type="text" class="form-control @error('cnic') is-invalid @enderror"
                    id="cnic" name="cnic" placeholder="CNIC"
                    value="{{ isset($hallOwner) ? $hallOwner->cnic : old('cnic') }}" />
                @error('cnic')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <div id="cnic-help" class="form-text">CNIC of Owner.</div>
                @enderror
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2">
                <label class="form-label" style="font-size: 15px" for="subscription">Subscriptions <span
                        class="text-danger">*</span></label>
                <select class="form-select" id="subscription" name="subscription">
                    <option value="">Select Subscription</option>
                    @forelse ($subscriptions as $row)
                        <option value="{{ $row->id }}"
                            {{ (isset($hallOwner) ? $hallOwner->subscription_id : old('subscription')) == $row['id'] ? 'selected' : '' }}>
                            {{ $loop->index + 1 }} - {{ $row->name }} ({{ $row->no_of_days }} Days)</option>
                    @empty
                    @endforelse
                </select>
                @error('subscription')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <div id="subscription-help" class="form-text">Assign a subscription to Owner.</div>
                @enderror
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <div class="form-check form-check-inline">
                    <input type="hidden" name="active" value="0">
                    <input class="form-check-input" type="checkbox" id="active" name="active" value="1"
                        {{ isset($hallOwner) ? ($hallOwner->active ? 'checked' : null) : (old('active') ? 'checked' : null) }}>
                    <label class="form-check-label" for="active">Active</label>
                </div>
                @error('active')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <div id="active-help" class="form-text">Check to active the Owner</div>
                @enderror
            </div>
        </div>
    </div>
</div>
