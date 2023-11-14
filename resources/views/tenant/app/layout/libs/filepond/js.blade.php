<script src="{{ asset('theme-assets') }}/vendor/libs/filepond/plugins/filepond.preview.min.js"></script>
<script src="{{ asset('theme-assets') }}/vendor/libs/filepond/plugins/filepond.typevalidation.min.js"></script>
<script src="{{ asset('theme-assets') }}/vendor/libs/filepond/plugins/filepond.imagecrop.min.js"></script>
<script src="{{ asset('theme-assets') }}/vendor/libs/filepond/plugins/filepond.imagesizevalidation.min.js"></script>
<script src="{{ asset('theme-assets') }}/vendor/libs/filepond/plugins/filepond.filesizevalidation.min.js"></script>
<script src="{{ asset('theme-assets') }}/vendor/libs/filepond/filepond.min.js"></script>
{{-- <script src="{{ asset('theme-assets') }}/vendor/libs/cleavejs/cleave.min.js"></script>
    <script src="{{ asset('theme-assets') }}/vendor/libs/cleavejs/addons/cleave-phone.pk.min.js"></script> --}}
<script>
    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginFileValidateType,
        FilePondPluginFileValidateSize,
        FilePondPluginImageValidateSize,
        FilePondPluginImageCrop,
    );
</script>
