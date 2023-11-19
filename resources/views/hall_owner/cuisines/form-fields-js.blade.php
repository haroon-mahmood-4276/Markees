<script>
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
</script>
