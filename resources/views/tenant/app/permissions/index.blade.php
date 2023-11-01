@extends('tenant.app.layout.layout')

@section('seo-breadcrumb')
    {{ Breadcrumbs::view('breadcrumbs::json-ld', 'tenant.permissions.index') }}
@endsection

@section('page-title', 'Permissions')

@section('page-vendor')
    @include('tenant.app.layout.libs.datatables.css')
@endsection

@section('page-css')
@endsection

@section('custom-css')
@endsection

@section('breadcrumbs')
    <div class="d-flex justify-content-start align-items-center mb-3">
        <h2 class="content-header-title float-start mb-0 mx-3">Permissions</h2>
        {{ Breadcrumbs::render('tenant.permissions.index') }}
    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <form action="javascript:void(0);" id="permissions-table-form" method="get">
                        {{ $dataTable->table() }}
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('vendor-js')
    @include('tenant.app.layout.libs.datatables.js')
@endsection

@section('page-js')
@endsection

@section('custom-js')
    {{ $dataTable->scripts() }}
    <script>
        function changeRolePermission(role_id, permission_id) {

            var checkBoxState = $('#chkRolePermission_' + role_id + '__' + permission_id).is(':checked');

            var url = "";
            if (checkBoxState) {
                url = "{{ route('tenant.permissions.assign-permission') }}";
            } else {
                url = "{{ route('tenant.permissions.revoke-permission') }}";
            }

            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    role_id: role_id,
                    permission_id: permission_id,
                },
                success: function(response) {
                    // console.log(response);
                    if (response.success) {
                        toastr.success(response.message,
                            "Success!", {
                                // showMethod: "slideDown",
                                // hideMethod: "slideUp",
                                timeOut: 2e3,
                                closeButton: !0,
                                tapToDismiss: !1,
                            });
                        $('#permissions-table').DataTable().ajax.reload();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: response.message,
                        });
                    }
                }
            });
        }
    </script>
@endsection
