<ul class="nav nav-pills mb-2">
    <li class="nav-item">
        <a class="nav-link {{ request()->routeIs('tenant.halls.slots.index') ? 'active' : null }}"
            id="custom-field-tab" data-bs-toggle="tab" role="tab" aria-selected="true"
            href="{{ route('tenant.halls.slots.index', ['hall_id' => encryptParams($hall_id)]) }}" aria-controls="home" >
            <i data-feather="list" class="font-medium-3 me-50"></i>
            <span class="fw-bold">Hall Slots</span>
        </a>
    </li>
</ul>
