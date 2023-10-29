<script>
    FilePond.create(document.getElementById('owner_cnic_attachments'), {
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

    FilePond.create(document.getElementById('owner_ntn_attachment'), {
        styleButtonRemoveItemPosition: 'right',
        imageCropAspectRatio: '1:1',
        acceptedFileTypes: ['image/png', 'image/jpeg', 'image/jpg'],
        maxFileSize: '536KB',
        ignoredFiles: ['.ds_store', 'thumbs.db', 'desktop.ini'],
        storeAsFile: true,
        // allowMultiple: true,
        maxFiles: 1,
        checkValidity: true,
        credits: {
            label: '',
            url: ''
        }
    });

    // let phone = $("#phone");
    // phone.length && new Cleave(phone, {
    //     prefix: "+92",
    //     blocks: [3, 3, 3, 4],
    //     numericOnly: !0,
    // });

    // let phone = $("#phone");
    // phone.length && new Cleave(phone, {
    //     phone: !0,
    //     phoneRegionCode: "PK"
    // });

    // let cnic = $("#cnic");
    // cnic.length && new Cleave(cnic, {
    //     delimiter: '-',
    //     numericOnly: !0,
    //     blocks: [5, 7, 1],
    // });

    $('#subdomain').on('keyup blur', function() {
        let permalink = $(this).val().toLowerCase()
            .trim().replace(/[\/\\]/g, '').replace(/\s+/g, ' ').replace(/[^a-z0-9- ]/gi, '').replace(/-+/g, '-')
            .replace(/\s/g, '-');
        $('#subdomain').val(permalink);
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
