<div class="row custom-options-checkable g-1">

    @forelse ($slots ?? [] as $item)
        <div class="col-md-4">
            <input class="custom-option-item-check" type="{{ $type }}" name="{{ $key }}[slot]"
                id="slot_{{ $loop->index + 1 }}_{{ $key }}">
            <label class="custom-option-item p-1" for="slot_{{ $loop->index + 1 }}_{{ $key }}">
                <span class="d-flex justify-content-between flex-wrap mb-50">
                    <span class="fw-bolder">Free</span>
                    <span class="fw-bolder">Basic</span>
                </span>
                <small class="d-block">Get 1 project with 1 team member.</small>
            </label>
        </div>
    @empty
    @endforelse

    <div class="col-md-4">
        <input class="custom-option-item-check" type="{{ $type }}" name="{{ $key }}[slot]"
            id="slot_custom">
        <label class="custom-option-item p-1" for="slot_custom">
            <span class="d-flex justify-content-between flex-wrap mb-50">
                <span class="fw-bolder">Basic</span>
                <span class="fw-bolder">Free</span>
            </span>
            <small class="d-block">Get 1 project with 1 team member.</small>
        </label>
    </div>
</div>
