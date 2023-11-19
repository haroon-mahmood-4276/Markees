<div class="card">
    <div class="card-body">
        <div class="row mb-3">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2">
                <label class="form-label" style="font-size: 15px" for="roles">Roles</label>
                <select class="select2-size-lg form-select" id="roles" name="parent_id">
                    @foreach ($roles as $roleRow)
                        @continue(isset($role) && $roleRow->id == $role->id)
                        <option data-icon="fa-solid fa-angle-right"
                            value="{{ $roleRow['id'] }}"{{ (isset($role) ? $role->parent_id : old('type')) == $roleRow['id'] ? 'selected' : '' }}>
                            {{ $roleRow['tree'] }}</option>
                    @endforeach
                </select>
                @error('parent_id')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0">
                        <small class="text-muted">Enter parent role.</small>
                    </p>
                @enderror
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <div class="form-floating">
                    <input type="text" class="form-control @error('name') is-invalid @enderror" id="name"
                        name="name" aria-describedby="nameHelp" placeholder="Ex. Admin"
                        value="{{ isset($role) ? $role->name : null }}">
                    <label for="name">Role <span class="text-danger">*</span></label>
                    @error('name')
                        <div id="nameHelp" class="form-text invalid-feedback">{{ $message }}</div>
                    @else
                        <div id="nameHelp" class="form-text">Enter role name.</div>
                    @enderror
                </div>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6 position-relative">
                <div class="form-floating">
                    <input type="hidden" class="form-control @error('guard_name') is-invalid @enderror" id="guard_name"
                        name="guard_name" aria-describedby="guard_nameHelp"
                        value="{{ isset($role) ? $role->guard_name : 'admin' }}">
                    <label for="guard_name" class="d-none">Role <span class="text-danger">*</span></label>
                    @error('guard_name')
                        <div id="guard_nameHelp" class="form-text invalid-feedback">{{ $message }}</div>
                    @else
                        <div id="guard_nameHelp" class="form-text d-none">Enter role guard_name.</div>
                    @enderror
                </div>
            </div>
        </div>
    </div>
</div>
