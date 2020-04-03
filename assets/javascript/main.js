$(function() {
    $('#calculator').on('submit', function (event) {
        event.preventDefault();
        const regulatoryBase = $('#regulatory_base').val();
        const childNumber = parseInt($('#child_number').val());

        const minimumWithNoChildren = 501.98;
        const minimumWithOneOrMoreChildren = 671.40;
        const maximumWithNoChildren = 1089.09;
        const maximumWithOneChildren = 1254.96;
        const maximumWithTwoOrMoreChildren = 1411.83;

        const baseFirstSixMonths = regulatoryBase * 0.7;
        const baseNextMonths = regulatoryBase * 0.5;

        if (childNumber === 0 && (maximumWithNoChildren > baseFirstSixMonths && baseFirstSixMonths > minimumWithNoChildren)){
            $('#result_first_six_months').html(baseFirstSixMonths + ' €');
            $('#result_following_months').html(baseNextMonths + ' €');
            $('#result').show();
            return;
        }
        if (childNumber === 1 && (maximumWithOneChildren > baseFirstSixMonths && baseFirstSixMonths > minimumWithOneOrMoreChildren)){
            $('#result_first_six_months').html(baseFirstSixMonths + ' €');
            $('#result_following_months').html(baseNextMonths + ' €');
            $('#result').show();
            return;
        }
        if (childNumber === 0 && baseFirstSixMonths > maximumWithNoChildren){
            $('#result_first_six_months').html(maximumWithNoChildren + ' €');
            $('#result_following_months').html(maximumWithNoChildren + ' €');
            $('#result').show();
            return;
        }
        if (childNumber === 1 && baseFirstSixMonths > maximumWithOneChildren){
            $('#result_first_six_months').html(maximumWithOneChildren + ' €');
            $('#result_following_months').html(maximumWithOneChildren + ' €');
            $('#result').show();
            return;
        }
    });

    $('#reset').on('click', function () {
        $('#result').hide();
        $('#result_first_six_months').empty();
        $('#result_following_months').empty();
    });
});
