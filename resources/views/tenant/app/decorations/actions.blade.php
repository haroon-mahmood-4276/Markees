<div class="d-flex justify-content-cetner align-items-center">
    @if (auth('tenant')->user()->can('tenant.decorations.edit'))
        <a class="btn btn-warning m-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Decorations"
            href="{{ route('tenant.decorations.edit', ['id' => encryptParams($id)]) }}">
            <i class="fa-solid fa-i-cursor" style="font-size: 1.1rem" class="m-10"></i>
        </a>
    @endif
</div>
