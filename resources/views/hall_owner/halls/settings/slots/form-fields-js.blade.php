<script>
    $("#date_range").daterangepicker({

        ranges: {
            "Next 7 Days": [moment(), moment().add(6, "days")],
            "Next 30 Days": [moment(), moment().add(29, "days")],
        },
        showISOWeekNumbers: true,
        opens: "center",
        autoApply: true,
    }, function(start, end, label) {
        // console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format(
        //     'YYYY-MM-DD') + ' (predefined range: ' + label + ')');
    });

    $('#start_time').timeDropper({
        autoswitch: true,
        meridians: true,
        mousewheel: true,
        minutesSteps: 5,
        init_animation: 'fadeIn',
        format: 'HH:mm'
    });

    $('#end_time').timeDropper({
        autoswitch: true,
        meridians: true,
        mousewheel: true,
        minutesSteps: 5,
        init_animation: 'fadeIn',
        format: 'HH:mm'
    });
</script>
