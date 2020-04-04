function printResults(resultFirstSixMonths,resultNextMonths){
    $('#result_first_six_months').html(resultFirstSixMonths.toFixed(2) + ' €');
    $('#result_following_months').html(resultNextMonths.toFixed(2) + ' €');
    $('#result').show();
}

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

        const noChildrenAndBaseBetweenLimits = childNumber === 0 && (maximumWithNoChildren > baseFirstSixMonths && baseFirstSixMonths > minimumWithNoChildren);
        const oneChildAndBaseBetweenLimits = childNumber === 1 && (maximumWithOneChildren > baseFirstSixMonths && baseFirstSixMonths > minimumWithOneOrMoreChildren);
        const moreThanOneChildAndBaseBetweenLimits = childNumber > 1 && (maximumWithTwoOrMoreChildren > baseFirstSixMonths && baseFirstSixMonths > minimumWithOneOrMoreChildren);
        if (noChildrenAndBaseBetweenLimits || oneChildAndBaseBetweenLimits || moreThanOneChildAndBaseBetweenLimits){
            printResults(baseFirstSixMonths,baseNextMonths);
            return;
        }

        if (childNumber === 0 && baseFirstSixMonths > maximumWithNoChildren){
            printResults(maximumWithNoChildren,maximumWithNoChildren);
            return;
        }
        if (childNumber === 1 && baseFirstSixMonths > maximumWithOneChildren){
            printResults(maximumWithOneChildren,maximumWithOneChildren);
            return;
        }

        if (childNumber > 1 && baseFirstSixMonths > maximumWithTwoOrMoreChildren){
            printResults(maximumWithTwoOrMoreChildren,maximumWithTwoOrMoreChildren);
            return;
        }
    });

    $('#reset').on('click', function () {
        $('#result').hide();
        $('#result_first_six_months').empty();
        $('#result_following_months').empty();
    });
});
