document.addEventListener('DOMContentLoaded', function () {
    const recipientRadioButtons = document.querySelectorAll('input[name="recipient"]');
    const recipientInputs = document.querySelectorAll('.form-section .form-group input, .form-section .form-group select');

    recipientRadioButtons.forEach(button => {
        button.addEventListener('change', function () {
            if (this.value === '同訂購人資訊') {
                recipientInputs.forEach(input => {
                    input.disabled = true;
                });
            } else {
                recipientInputs.forEach(input => {
                    input.disabled = false;
                });
            }
        });
    });
});