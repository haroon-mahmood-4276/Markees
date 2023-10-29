<div class="d-flex justify-content-cetner align-items-center">
    @if(auth('tenant')->user()->can('tenant.halls.edit'))
        <a class="btn btn-warning " style="margin: 5px"
            data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Hall"
            href="{{ route('tenant.halls.edit', ['id' => encryptParams($id)]) }}">
            <i class="bi bi-pencil m-10" style="font-size: 1.1rem"></i>
        </a>
    @endif

    @if(auth('tenant')->user()->can('tenant.halls.slots.index'))
        <a class="btn btn-primary " style="margin: 5px"
            data-bs-toggle="tooltip" data-bs-placement="top" title="Hall Settings"
            href="{{ route('tenant.halls.slots.index', ['hall_id' => encryptParams($id)]) }}">
            <i class="bi bi-gear m-10" style="font-size: 1.1rem"></i>
        </a>
    @endif
</div>
