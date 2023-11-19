<script>
    var e = null;

    var files = [];

    @forelse ($images ?? [] as $image)
        files.push({
                source: '{{ $image->getFullUrl() }}'
            }),
    @empty
    @endforelse

    FilePond.create(document.getElementById('attachment'), {
        files: files,
        styleButtonRemoveItemPosition: 'right',
        imageCropAspectRatio: '1:1',
        acceptedFileTypes: ['image/png', 'image/jpeg'],
        maxFileSize: '1536KB',
        ignoredFiles: ['.ds_store', 'thumbs.db', 'desktop.ini'],
        storeAsFile: true,
        allowMultiple: true,
        maxFiles: 3,
        checkValidity: true,
        credits: {
            label: '',
            url: ''
        }
    });

    @if ($from == 'create')
        $('#name').on('keyup blur', function() {
            let permalink = $(this).val().toLowerCase()
                .trim().replace(/[\/\\]/g, '').replace(/\s+/g,
                    ' ').replace(/[^a-z0-9- ]/gi, '').replace(/-+/g, '-').replace(/\s/g, '-');
            $('#short_label').val(permalink);
        });
    @endif
</script>
