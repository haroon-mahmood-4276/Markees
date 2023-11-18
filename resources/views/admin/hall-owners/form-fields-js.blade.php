<script src="{{ asset('theme-assets') }}/vendor/libs/cleavejs/cleave.js"></script>
<script>
    var files = [];

    @forelse($owner_cnic_attachments ?? [] as $image)
        files.push({
            source: '{{ $image->getUrl() }}',
        });
    @empty
    @endforelse

    FilePond.create(document.getElementById('owner_cnic_attachments'), {
        files: files,
        styleButtonRemoveItemPosition: 'right',
        imageCropAspectRatio: '1:1',
        acceptedFileTypes: ['image/png', 'image/jpeg', 'image/jpg'],
        maxFileSize: '536KB',
        ignoredFiles: ['.ds_store', 'thumbs.db', 'desktop.ini'],
        storeAsFile: true,
        allowMultiple: true,
        maxFiles: 2,
        checkValidity: true,
        credits: {
            label: '',
            url: ''
        }
    });

    files = [];
    @if (isset($owner_ntn_attachment))
        files.push({
            source: '{{ $owner_ntn_attachment->getUrl() }}',
        });
    @endif

    FilePond.create(document.getElementById('owner_ntn_attachment'), {
        files: files,
        styleButtonRemoveItemPosition: 'right',
        imageCropAspectRatio: '1:1',
        acceptedFileTypes: ['image/png', 'image/jpeg', 'image/jpg'],
        maxFileSize: '536KB',
        ignoredFiles: ['.ds_store', 'thumbs.db', 'desktop.ini'],
        storeAsFile: true,
        maxFiles: 1,
        checkValidity: true,
        credits: {
            label: '',
            url: ''
        }
    });

    new Cleave($("#ntn"), {
        delimiter: '-',
        numericOnly: !0,
        blocks: [7, 1],
    });

    new Cleave($("#phone"), {
        blocks: [4, 7],
        numericOnly: !0,
    });

    new Cleave($("#cnic"), {
        delimiter: '-',
        numericOnly: !0,
        blocks: [5, 7, 1],
    });
</script>

<script type="text/javascript">
    $(document).ready(function() {
        e = $("#subscription");
        e.wrap('<div class="position-relative"></div>');
        e.select2({
            dropdownAutoWidth: !0,
            dropdownParent: e.parent(),
            width: "100%",
            containerCssClass: "select-lg",
            templateResult: c,
            templateSelection: c,
            escapeMarkup: function(e) {
                return e
            }
        });
    });

    function c(e) {
        return e.id ? "<i class='" + $(e.element).data("icon") + " me-2'></i>" + e.text : e.text
    }
</script>
