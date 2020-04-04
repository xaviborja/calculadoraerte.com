
function printResult(id,value){
    value = parseFloat(value);
    $('#' + id).html(value.toFixed(2) + ' €');
}

function calc(childNumber,base,id){
    const minimumWithNoChildren = 501.98;
    const minimumWithOneOrMoreChildren = 671.40;
    const maximumWithNoChildren = 1089.09;
    const maximumWithOneChildren = 1254.96;
    const maximumWithTwoOrMoreChildren = 1411.83;

    const noChildrenAndBaseBetweenLimits = childNumber === 0 && (maximumWithNoChildren > base && base > minimumWithNoChildren);
    const oneChildAndBaseBetweenLimits = childNumber === 1 && (maximumWithOneChildren > base && base > minimumWithOneOrMoreChildren);
    const moreThanOneChildAndBaseBetweenLimits = childNumber > 1 && (maximumWithTwoOrMoreChildren > base && base > minimumWithOneOrMoreChildren);

    if (noChildrenAndBaseBetweenLimits || oneChildAndBaseBetweenLimits || moreThanOneChildAndBaseBetweenLimits){
        printResult(id,base);
        return;
    }

    if (childNumber === 0 && base > maximumWithNoChildren){
        printResult(id,maximumWithNoChildren);
        return;
    }
    if (childNumber === 1 && base > maximumWithOneChildren){
        printResult(id,maximumWithOneChildren);
        return;
    }

    if (childNumber > 1 && base > maximumWithTwoOrMoreChildren){
        printResult(id,maximumWithTwoOrMoreChildren);
        return;
    }

    if (childNumber === 0 && base < minimumWithNoChildren){
        printResult(id,minimumWithNoChildren);
        return;
    }

    if (childNumber >= 1 && base < minimumWithOneOrMoreChildren){
        printResult(id,minimumWithOneOrMoreChildren);
        return;
    }
}

$(function() {
    $('#calculator').on('submit', function (event) {
        event.preventDefault();
        const regulatoryBase = $('#regulatory_base').val();
        const childNumber = parseInt($('#child_number').val());

        calc(childNumber,regulatoryBase * 0.7,'result_first_six_months');
        calc(childNumber,regulatoryBase * 0.5,'result_following_months');
        $('#result').show();
    });

    $('#reset').on('click', function () {
        $('#result').hide();
        $('#result_first_six_months').empty();
        $('#result_following_months').empty();
    });
});
