<div class="d-flex justify-content-cetner align-items-center">
    @can('tenant.cuisines.edit'))
        <a class="btn btn-warning m-1" href="{{ route('tenant.cuisines.edit', [$cuisine]) }}">
            <i class="fa-solid fa-i-cursor" style="font-size: 1.1rem" class="m-10"></i>
        </a>
    @endcan
</div>
