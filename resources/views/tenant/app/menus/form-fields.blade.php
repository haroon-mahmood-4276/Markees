<div class="card" style="border: 2px solid #7367F0; border-style: dashed; border-radius: 0;">
    <div class="card-body">

        <div class="row mb-1">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <label class="form-label" style="font-size: 15px" for="menu">Menus <span
                        class="text-danger">*</span></label>
                <select class="select2-size-lg form-select" id="menu" name="menu">
                    <option value="0" selected>Parent Menu</option>
                    @foreach ($menus as $row)
                        @continue(isset($menu) && $menu->id == $row['id'])
                        <option value="{{ $row['id'] }}"
                            {{ (isset($menu) ? $menu->parent_id : old('menu')) == $row['id'] ? 'selected' : '' }}>
                            {{ $loop->index + 1 }} - {{ $row['tree'] }}</option>
                    @endforeach
                </select>
                @error('menu')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0">
                        <small class="text-muted">Enter menu name.</small>
                    </p>
                @enderror
            </div>
        </div>

        <div class="row mb-1">
            <div class="col-lg-12 col-md-12 col-sm-12 position-relative">
                <label class="form-label fs-5" for="name">Menu Name <span class="text-danger">*</span></label>
                <input type="text" class="form-control form-control-lg @error('name') is-invalid @enderror"
                    id="name" name="name" placeholder="Menu Name"
                    value="{{ isset($menu) ? $menu->name : old('name') }}" />
                @error('name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0">
                        <small class="text-muted">Enter menu name.</small>
                    </p>
                @enderror
            </div>

        </div>

        <div class="row mb-1">
            <div class="col-lg-12 col-md-12 col-sm-12 position-relative">
                <label class="form-label fs-5" for="description">Description <span class="text-danger"></span></label>
                <textarea class="form-control form-control-lg @error('description') is-invalid @enderror" rows="5"
                    id="description" name="description" placeholder="Description">{{ isset($menu) ? $menu->description : old('description') }}</textarea>
                @error('description')
                    <div class="invalid-feedback">{{ $message }}</div>
                @else
                    <p class="m-0">
                        <small class="text-muted">Enter Description.</small>
                    </p>
                @enderror
            </div>
        </div>

        <div class="row mb-1">
            <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                <div class="d-flex flex-column">
                    <label class="form-check-label mb-50" for="has_sub_menu">Has sub menu</label>
                    <div class="form-check form-switch form-check-primary">
                        <input type="hidden" name="has_sub_menu" value="0" />
                        <input type="checkbox" class="form-check-input" id="has_sub_menu" name="has_sub_menu"
                            {{ isset($menu) ? ($menu->has_sub_menu ? 'checked' : '') : 'checked' }} value="1" />
                        <label class="form-check-label" for="has_sub_menu">
                            <span class="switch-icon-left"><i data-feather="check"></i></span>
                            <span class="switch-icon-right"><i data-feather="x"></i></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        @php
            $cuisineArray = isset($menu) ? json_decode($menu->cuisines) : [];
            // dd(in_array($cuisines[0]->id, $cuisineArray));
        @endphp

        <div class="collapse {{ isset($menu) ? (count($cuisineArray) > 0 ? 'show' : null) : null }}" id="menu_price_and_cuisines">
            <div class="row mb-1">
                <div class="col-lg-12 col-md-12 col-sm-12 position-relative">
                    <label class="form-label" style="font-size: 15px" for="cuisines">Cuisines <span
                            class="text-danger">*</span></label>
                    <select class="form-select @error('cuisines') is-invalid @enderror" id="cuisines" name="cuisines[]"
                        multiple>
                        @forelse ($cuisines ?? [] as $cuisine)
                            <option value="{{ $cuisine->id }}" data-price="{{ $cuisine->price }}"
                                {{ in_array($cuisine->id, $cuisineArray) ? 'selected' : null }}>
                                {{ $cuisine->name . ' - ' . $cuisine->price . ' Rs' }}</option>
                        @empty
                        @endforelse
                    </select>
                    @error('cuisines')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @else
                        <p class="m-0">
                            <small class="text-muted">Enter cuisines in this menu.</small>
                        </p>
                    @enderror
                </div>
            </div>

            <div class="row mb-1">
                <div class="col-lg-6 col-md-6 col-sm-12 position-relative">
                    <label class="form-label fs-5" for="price">Menu Price <span class="text-danger">*</span></label>
                    <input type="number" min="0"
                        class="form-control form-control-lg @error('price') is-invalid @enderror" id="price"
                        name="price" placeholder="Menus Price"
                        value="{{ (isset($menu) ? $menu->price : old('price')) ?? 0 }}" />
                    @error('price')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @else
                        <p class="m-0">
                            <small class="text-muted">Enter menu price.</small>
                        </p>
                    @enderror
                </div>
            </div>

        </div>
    </div>
</div>
