@extends('hall_owner.layout.layout')

@section('seo-breadcrumb')
    {{ Breadcrumbs::view('breadcrumbs::json-ld', 'hall_owner.halls.slots.index', $hall->id) }}
@endsection

@section('page-title', 'Hall slots')

@section('page-vendor')
    @include('hall_owner.layout.libs.datatables.css')
@endsection

@section('page-css')
@endsection

@section('custom-css')
@endsection

@section('breadcrumbs')
    <div class="d-flex justify-content-start align-items-center mb-3">
        <h2 class="content-header-title float-start mb-0 mx-3">Hall slots</h2>
        {{ Breadcrumbs::render('hall_owner.halls.slots.index', $hall->id) }}
    </div>
@endsection

@section('content')
    <div class="nav-align-top">

        @include('hall_owner.halls.settings.partials.tabs')

        <div class="tab-content">
            <div class="tab-pane fade show active" id="navs-pills-slots" role="tabpanel">
                <form action="{{ route('hall_owner.halls.slots.destroy', [$hall]) }}" id="hall-slots-table-form" method="get">
                    {{ $dataTable->table() }}
                </form>
            </div>
        </div>
    </div>
@endsection

@section('vendor-js')
    @include('hall_owner.layout.libs.datatables.js')
@endsection

@section('page-js')
@endsection

@section('custom-js')
    {{ $dataTable->scripts() }}
    <script>
        function deleteSelected() {
            var selectedCheckboxes = $('.dt-checkboxes:checked').length;
            if (selectedCheckboxes > 0) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: "{{ __('lang.commons.are_you_sure_you_want_to_delete_the_selected_items') }}",
                    showCancelButton: true,
                    cancelButtonText: "{{ __('lang.commons.no_cancel') }}",
                    confirmButtonText: "{{ __('lang.commons.yes_delete') }}",
                    confirmButtonClass: 'btn-danger',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'btn btn-danger me-1',
                        cancelButton: 'btn btn-success me-1'
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        $('#hall-slots-table-form').submit();
                    }
                });
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: "{{ __('lang.commons.please_select_at_least_one_item') }}",
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'btn btn-danger me-1',
                        cancelButton: 'btn btn-success me-1'
                    },
                });
            }
        }

        function addNew() {
            location.href = "{{ route('hall_owner.halls.slots.create', [$hall]) }}";
        }
    </script>
@endsection
