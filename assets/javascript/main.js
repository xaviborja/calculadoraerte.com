$(function() {
    $('#calculator').on('submit', function (event) {
        event.preventDefault();
        const regulatoryBase = $('#regulatory_base').val();
        const childNumber = parseInt($('#child_number').val());

        const minimumWithNoChildren = 501.98;
        const maximumWithNoChildren = 1089.09;

        const baseFirstSixMonths = regulatoryBase * 0.7;
        const baseNextMonths = regulatoryBase * 0.5;
        console.log(childNumber,baseFirstSixMonths);
        if (childNumber === 0 && (maximumWithNoChildren > baseFirstSixMonths && baseFirstSixMonths > minimumWithNoChildren)){
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
    });
});
