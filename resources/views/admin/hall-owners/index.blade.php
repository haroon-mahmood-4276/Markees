@extends('admin.layout.layout')

@section('seo-breadcrumb')
    {{ Breadcrumbs::view('breadcrumbs::json-ld', 'admin.hall-owners.index') }}
@endsection

@section('page-title', 'Hall Owners')

@section('page-vendor')
    {{ view('admin.layout.libs.datatables.css') }}
@endsection

@section('page-css')
@endsection

@section('custom-css')
@endsection

@section('breadcrumbs')
    <div class="d-flex justify-content-start align-items-center mb-3">
        <h2 class="content-header-title float-start mb-0 mx-3">Hall Owners</h2>
        {{ Breadcrumbs::render('admin.hall-owners.index') }}
    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <form action="{{ route('admin.hall-owners.destroy') }}" id="hall-owners-table-form" method="get">
                        {{ $dataTable->table() }}
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('vendor-js')
    {{ view('admin.layout.libs.datatables.js') }}
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
                        $('#hall-owners-table-form').submit();
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

        @can('admin.hall-owners.create')
            function addNew() {
                location.href = "{{ route('admin.hall-owners.create') }}";
            }
        @endcan
    </script>
@endsection
