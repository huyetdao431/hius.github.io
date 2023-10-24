function Validator (options) { 

    function Validate (inputElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector('.form-message');

            if (errorMessage) {
                errorElement.innerText = errorMessage;
                inputElement.parentElement.classList.add('invalid');
            } else {
                errorElement.innerText = '';
                inputElement.parentElement.classList.remove('invalid');
            }

    }

    var formElement = document.querySelector(options.form);

    if(formElement) {

        formElement.onsubmit = function (e) {
            e.preventDefault();

            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                Validate(inputElement, rule);
            });
        }

        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);  

            if (inputElement) {
                inputElement.onblur = function () {
                    Validate(inputElement, rule);
                }
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector('.form-message');  
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
    }
}

Validator.isRequiredUsername = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            if (value) return undefined;
            else return 'Vui lòng nhập tên đăng nhập!';
        }
    };
}

Validator.isRequiredPass = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            if (value) return undefined;
            else return 'Vui lòng nhập mật khẩu!';
        }
    };
}
Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            if (value.length >= min) return undefined;
            else return `Vui lòng nhập mật khẩu có ít nhất ${min} ký tự!`;
        }
    };
}

Validator.isComfirm = function (selector, getComfirmValue) {
    return {
        selector: selector,
        test: function (value) {
            if (value === getComfirmValue()) return undefined
            else return 'Mật khẩu nhập lại không chính xác!';
        }
    }
}