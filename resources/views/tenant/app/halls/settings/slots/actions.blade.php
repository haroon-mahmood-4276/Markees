<div class="d-flex justify-content-cetner align-items-center">
    @can('tenant.halls.slots.edit')
        <a class="btn btn-warning" style="margin: 5px"
            href="{{ route('tenant.halls.slots.edit', ['hall' => $hall, 'slot' => $slot]) }}">
            <i class="fa-solid fa-i-cursor" style="font-size: 1.1rem" class="m-10"></i>
        </a>
    @endcan
</div>
