
function printResult(id, value){
    value = parseFloat(value);
    $('#' + id).html(value.toFixed(2) + ' €');
}

function calc(childNumber,base,id,companySalary,percentageToApply){
    const minimumWithNoChildren = 501.98 * percentageToApply / 100;
    const minimumWithOneOrMoreChildren = 671.40 * percentageToApply / 100;
    const maximumWithNoChildren = 1089.09 * percentageToApply / 100;
    const maximumWithOneChildren = 1254.96 * percentageToApply / 100;
    const maximumWithTwoOrMoreChildren = 1411.83 * percentageToApply / 100;

    const noChildrenAndBaseBetweenLimits = childNumber === 0 && (maximumWithNoChildren > base && base > minimumWithNoChildren);
    const oneChildAndBaseBetweenLimits = childNumber === 1 && (maximumWithOneChildren > base && base > minimumWithOneOrMoreChildren);
    const moreThanOneChildAndBaseBetweenLimits = childNumber > 1 && (maximumWithTwoOrMoreChildren > base && base > minimumWithOneOrMoreChildren);

    if (noChildrenAndBaseBetweenLimits || oneChildAndBaseBetweenLimits || moreThanOneChildAndBaseBetweenLimits){
        printResult(id,base + companySalary);
        return;
    }

    if (childNumber === 0 && base > maximumWithNoChildren){
        printResult(id,maximumWithNoChildren + companySalary);
        return;
    }
    if (childNumber === 1 && base > maximumWithOneChildren){
        printResult(id,maximumWithOneChildren + companySalary);
        return;
    }

    if (childNumber > 1 && base > maximumWithTwoOrMoreChildren){
        printResult(id,maximumWithTwoOrMoreChildren + companySalary);
        return;
    }

    if (childNumber === 0 && base < minimumWithNoChildren){
        printResult(id,minimumWithNoChildren + companySalary);
        return;
    }

    if (childNumber >= 1 && base < minimumWithOneOrMoreChildren){
        printResult(id,minimumWithOneOrMoreChildren + companySalary);
    }
}

$(function() {
    $('#calculator').on('submit', function (event) {
        event.preventDefault();
        let regulatoryBase = parseFloat($('#regulatory_base').val());
        const childNumber = parseInt($('#child_number').val());
        const erteType = $("#erte_type").val();
        let companySalary = 0;
        let percentageToApply = 100;
        if (erteType === 'reduction'){
            const hoursBefore = $('#hours_worked_before_erte').val();
            const hoursAfter = $('#hours_work_after_erte').val();
            const hourSalary = regulatoryBase / hoursBefore;
            companySalary = hourSalary * hoursAfter;
            regulatoryBase = hourSalary * (hoursBefore - hoursAfter);
            percentageToApply = hoursAfter / hoursBefore  * 100;

        }

        calc(childNumber,regulatoryBase * 0.7,'result_first_six_months',companySalary,percentageToApply);
        calc(childNumber,regulatoryBase * 0.5,'result_following_months',companySalary,percentageToApply);
        $('#result').show();
    });

    $('#reset').on('click', function () {
        $('#result').hide();
        $('#result_first_six_months').empty();
        $('#result_following_months').empty();
    });

    $('#erte_type').on('change', function () {
        const erteType = $(this).val();
        if (erteType === 'reduction'){
            $('#hours_work').show();
        } else {
            $('#hours_work').hide();
        }
    });
});
