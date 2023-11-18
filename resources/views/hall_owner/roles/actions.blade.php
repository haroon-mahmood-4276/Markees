<div class="d-flex justify-content-cetner align-items-center">
    @if(auth('hall-owner')->user()->can('hall_owner.roles.edit')
        <a class="btn btn-warning m-1"
            data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Role"
            href="{{ route('hall_owner.roles.edit', [$role]) }}">
            <i class="fa-solid fa-i-cursor" style="font-size: 1.1rem" class="m-10"></i>
        </a>
    @endcan
</div>
