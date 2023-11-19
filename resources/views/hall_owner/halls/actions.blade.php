<div class="d-flex justify-content-cetner align-items-center">
    @can('hall_owner.halls.edit')
        <a class="btn btn-warning" style="margin: 5px" href="{{ route('hall_owner.halls.edit', [$hall]) }}">
            <i class="fa-solid fa-i-cursor" style="font-size: 1.1rem" class="m-10"></i>
        </a>
    @endcan

    @can('hall_owner.halls.edit')
        <a class="btn btn-primary" style="margin: 5px" href="{{ route('hall_owner.halls.slots.index', [$hall]) }}">
            <i class="fa-solid fa-gear" style="font-size: 1.1rem" class="m-10"></i>
        </a>
    @endcan
</div>
