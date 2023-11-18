<div class="d-flex justify-content-cetner align-items-center">
    @can('admin.hall-owners.edit')
        <a class="btn btn-warning m-1"
            data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Subscription"
            href="{{ route('admin.hall-owners.edit', [$hall_owner]) }}">
            <i class="fa-solid fa-i-cursor" style="font-size: 1.1rem" class="m-10"></i>
        </a>
    @endcan
</div>
