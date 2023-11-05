<div class="d-flex justify-content-cetner align-items-center">
    @if (auth('tenant')->user()->can('tenant.halls.edit'))
        <a class="btn btn-warning" style="margin: 5px"
            href="{{ route('tenant.halls.edit', [$hall]) }}">
            <i class="fa-solid fa-i-cursor" style="font-size: 1.1rem" class="m-10"></i>
        </a>
    @endif

    {{-- @if (auth('tenant')->user()->can('tenant.halls.slots.index'))
        <a class="btn btn-primary " style="margin: 5px"
            data-bs-toggle="tooltip" data-bs-placement="top" title="Hall Settings"
            href="{{ route('tenant.halls.slots.index', [$hall]) }}">
            <i class="bi bi-gear m-10" style="font-size: 1.1rem"></i>
        </a>
    @endif --}}
</div>
