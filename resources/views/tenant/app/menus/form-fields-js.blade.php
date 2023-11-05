<script>
    var e = null;

    var files = [];

    @forelse ($images as $image)
        files.push({
                source: '{{ $image->getFullUrl() }}'
            }),
    @empty
    @endforelse

    console.log(files)

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

    $('#has_sub_menu').on('change', function() {
        if ($(this).is(':checked')) {
            // $('#menu_price_and_cuisines').collapse('hide');
            $('#menu_price_and_cuisines').hide('fast', 'linear');
            $('#price').val(0);
        } else {
            // $('#menu_price_and_cuisines').collapse('show');
            $('#menu_price_and_cuisines').show('fast', 'linear');
        }
    });

    var MenuPrice = 0;

    e = $("#parent_hall_type");
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


    e = $("#cuisines");
    e.wrap('<div class="position-relative"></div>');
    e.select2({
        dropdownAutoWidth: !0,
        dropdownParent: e.parent(),
        width: "100%",
        containerCssClass: "select-lg",
        multiple: true,
        templateResult: c,
        templateSelection: c,
        escapeMarkup: function(e) {
            return e
        }
    }).on('change', function() {
        MenuPrice = 0;
        $("#cuisines :selected").each(function(i, el) {
            MenuPrice += parseInt($(el).data('price'));
        });
        $('#price').val(MenuPrice);
    });

    function c(e) {
        return e.id ? "<i class='" + $(e.element).data("icon") + " me-2'></i>" + e.text : e.text
    }

    $('#has_sub_menu').trigger('change');
</script>
