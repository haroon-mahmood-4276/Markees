<div class="d-flex justify-content-cetner align-items-center">
    @if (auth('tenant')->user()->can('tenant.cuisines.edit'))
        <a class="btn btn-warning m-1" href="{{ route('tenant.cuisines.edit', [$cuisine]) }}">
            <i class="fa-solid fa-i-cursor" style="font-size: 1.1rem" class="m-10"></i>
        </a>
    @endif
</div>
