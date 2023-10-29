<div class="d-flex justify-content-cetner align-items-center">
    @if(auth('tenant')->user()->can('tenant.menus.edit'))
        <a class="btn btn-warning " style="margin: 5px"
            data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Role"
            href="{{ route('tenant.menus.edit', ['id' => encryptParams($id)]) }}">
            <i class="bi bi-pencil" style="font-size: 1.1rem" class="m-10"></i>
        </a>
    @endif
</div>
