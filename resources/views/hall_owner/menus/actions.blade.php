<div class="d-flex justify-content-cetner align-items-center">
    @can('hall_owner.menus.edit')
        <a class="btn btn-warning " style="margin: 5px" href="{{ route('hall_owner.menus.edit', [$menu]) }}">
            <i class="fa-solid fa-i-cursor" style="font-size: 1.1rem" class="m-10"></i>
        </a>
    @endcan
</div>
