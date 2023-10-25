<div class="d-flex justify-content-center align-items-center">
    @can('admin.roles.edit')
        <a class="btn btn-warning m-1"
            data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Role"
            href="{{ route('admin.roles.edit', [$role]) }}">
            <i class="fa-solid fa-i-cursor" style="font-size: 1.1rem" class="m-10"></i>
        </a>
    @endcan
</div>
