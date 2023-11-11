<div class="d-flex justify-content-cetner align-items-center">
    @can('tenant.halls.edit'))
        <a class="btn btn-warning" style="margin: 5px" href="{{ route('tenant.halls.edit', [$hall]) }}">
            <i class="fa-solid fa-i-cursor" style="font-size: 1.1rem" class="m-10"></i>
        </a>
    @endcan

    @can('tenant.halls.edit'))
        <a class="btn btn-primary" style="margin: 5px" href="{{ route('tenant.halls.slots.index', [$hall]) }}">
            <i class="fa-solid fa-gear" style="font-size: 1.1rem" class="m-10"></i>
        </a>
    @endcan
</div>
