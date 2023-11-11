<div class="d-flex justify-content-cetner align-items-center">
    @can('tenant.packages.edit')
        <a class="btn btn-warning " style="margin: 5px" href="{{ route('tenant.packages.edit', [$package]) }}">
            <i class="fa-solid fa-i-cursor" style="font-size: 1.1rem" class="m-10"></i>
        </a>
    @endcan
</div>
