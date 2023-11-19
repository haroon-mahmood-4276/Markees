<div class="card">
    <div class="card-body">
        <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <div class="form-floating">
                    <input type="text" class="form-control @error('name') is-invalid @enderror" id="name"
                        name="name" placeholder="Ex. Usama Riaz"
                        value="{{ isset($hall_owner) ? $hall_owner->name : old('name') }}" aria-describedby="nameHelp">
                    <label for="name">Name <span class="text-danger">*</span></label>
                    @error('name')
                        <div id="nameHelp" class="form-text invalid-feedback">{{ $message }}</div>
                    @else
                        <div id="nameHelp" class="form-text">Enter name of Owner.</div>
                    @enderror
                </div>
            </div>


            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <div class="form-floating">
                    <input type="text" class="form-control @error('ntn') is-invalid @enderror" id="ntn"
                        name="ntn" placeholder="1234567-1"
                        value="{{ isset($hall_owner) ? $hall_owner->ntn : old('ntn') }}" aria-describedby="ntnHelp">
                    <label for="name">NTN <span class="text-danger">*</span></label>
                    @error('ntn')
                        <div id="ntnHelp" class="form-text invalid-feedback">{{ $message }}</div>
                    @else
                        <div id="ntnHelp" class="form-text">Enter NTN of Owner.</div>
                    @enderror
                </div>
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <div class="form-floating">
                    <input type="text" class="form-control @error('email') is-invalid @enderror" id="email"
                        name="email" placeholder="abc@example.com"
                        value="{{ isset($hall_owner) ? $hall_owner->email : old('email') }}" aria-describedby="emailHelp">
                    <label for="email">Email <span class="text-danger">*</span></label>
                    @error('email')
                        <div id="emailHelp" class="form-text invalid-feedback">{{ $message }}</div>
                    @else
                        <div id="emailHelp" class="form-text">Enter Email of Owner.</div>
                    @enderror
                </div>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <div class="form-floating">
                    <input type="text" class="form-control @error('password') is-invalid @enderror" id="password"
                        name="password" aria-describedby="passwordHelp"
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;">
                    <label for="password">Password <span class="text-danger">*</span></label>
                    @error('password')
                        <div id="passwordHelp" class="form-text invalid-feedback">The password must be at least 8 characters
                            and contain at least one uppercase character, one number, and one special character.</div>
                    @else
                        <div id="passwordHelp" class="form-text">Enter Password for the owner login.</div>
                    @enderror
                </div>
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <div class="form-floating">
                    <input type="text" class="form-control @error('phone') is-invalid @enderror" id="phone"
                        name="phone" aria-describedby="phoneHelp" placeholder="0123 4567890"
                        value="{{ isset($hall_owner) ? $hall_owner->phone : old('phone') }}">
                    <label for="phone">Phone <span class="text-danger">*</span></label>
                    @error('phone')
                        <div id="phoneHelp" class="form-text invalid-feedback">{{ $message }}</div>
                    @else
                        <div id="phoneHelp" class="form-text">Enter phone number of the owner.</div>
                    @enderror
                </div>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <div class="form-floating">
                    <input type="text" class="form-control @error('cnic') is-invalid @enderror" id="cnic"
                        name="cnic" aria-describedby="cnicHelp"
                        placeholder="12345-1234567-1"
                        value="{{ isset($hall_owner) ? $hall_owner->cnic : old('cnic') }}">
                    <label for="cnic">CNIC <span class="text-danger">*</span></label>
                    @error('cnic')
                        <div id="cnicHelp" class="form-text invalid-feedback">{{ $message }}</div>
                    @else
                        <div id="cnicHelp" class="form-text">Enter cnic number of the owner.</div>
                    @enderror
                </div>
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
                            {{ (isset($hall_owner) ? $hall_owner->subscription_id : old('subscription')) == $row['id'] ? 'selected' : '' }}>
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
                        {{ isset($hall_owner) ? ($hall_owner->active ? 'checked' : null) : (old('active') ? 'checked' : null) }}>
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
