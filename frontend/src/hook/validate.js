function validator  (option)
{   
    // tạo hàm tìm parent cho element có selector được truyền vào trả về là parent của element đó hoặc null nếu không tìm thấy
    function getParent (element, selector) {   

        while (element.parentElement)
        {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            else {
                element = element.parentElement;
            }
        }
        return null;
    }
    //vì có nhiều rule đối với 1 id nên cần tạo mảng rulesSlectors đối tượng,mỗi attribute là mảng chứa rule cho id tương ứng
    let rulesSelectors = {};
    function validate (e, errorMessage) {

        let formGroup = getParent(e.target, option.formGroup);
        // let formGroup = e.target.parentElement;
        if(errorMessage) {
            formGroup.classList.add(option.styleInvalid);
            formGroup.querySelector(option.errorMessage).innerText = errorMessage;
        }
        else {
            formGroup.classList.remove(option.styleInvalid);
            formGroup.querySelector(option.errorMessage).innerText = '';
        }           
    }


    var formElenment = document.querySelector(option.form);
    if(formElenment)
    {
        // khi submit form thì không load lại trang
        formElenment.onsubmit = function (e) {
            e.preventDefault();
            let isFormValid = true; 
            option.rules.forEach (
            rule => { 
                let inputElement = formElenment.querySelector(rule.selector);
                let errorMessage ;
                for (let i = 0 ; i < rulesSelectors[rule.selector].length ; i++) 
                {
                    errorMessage = rulesSelectors[rule.selector][i](inputElement.value,formElenment);
                    if (errorMessage) 
                        break;
                }
                validate({target : inputElement}, errorMessage);
                isFormValid = isFormValid && !errorMessage; // nếu formValid = true thì không có lỗi
            })
            if (isFormValid) {
                console.log('Dữ liệu đã được submit');
                let enableInputs = formElenment.querySelectorAll('[name]');
                let formValues = Array.from(enableInputs).reduce((values, input) => {
                if(input && input.type === 'checkbox') {
                    values[input.name] = input.checked;
                }
                else 
                    values[input.name] = input.value;   
                return values;
                }, {});
                if(typeof option.onSubmit === 'function') {
                    option.onSubmit(formValues);
                }
            }
            else {
                console.log('Có lỗi');
            }
        }

        option.rules.forEach( rule => {
            if(Array.isArray(rulesSelectors[rule.selector])) {
                rulesSelectors[rule.selector].push(rule.text);
            }
            else {
                rulesSelectors[rule.selector] = [rule.text];
            }

            let inputElement = formElenment.querySelector(rule.selector);
            if(inputElement) {
                inputElement.onblur = function (e) {
                    let errorMessage ;
                    for (let i = 0 ; i < rulesSelectors[rule.selector].length ; i++) 
                    {
                        errorMessage = rulesSelectors[rule.selector][i](e.target.value,formElenment);
                        if (errorMessage) 
                            break;
                    }
                    validate(e, errorMessage);
                }
                inputElement.oninput = function (e) {
                    validate(e,undefined);
                }
            }
        });
    }
}

validator.isRequired = function (id,Message) { // id của element cần rule và thông điệp đối với rule này
    return {
        selector : id ,
        text : function (value) {
            return value.trim() === '' ? Message : undefined; }
    }
}

validator.isEmail = function (id, Message) {
    return {
        selector: id,
        text: function (value) {
            var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z.]{2,}$/;
            return regex.test(value) ? undefined : Message;
        }
    }
}
validator.minLength = function (id, length)
{
    return {
        selector : id ,
        text : function (value) {
            return value.length >= length ? undefined : `Vui lòng nhập tối thiểu ${length} ký tự`;
        } 
    }
}

validator.isConfirmed = function (id, id2,Message)
{
    return {
        selector : id ,
        text : function (value, formElement) {
            var value2 = formElement.querySelector(id2).value;
            return value === value2 ? undefined : Message;
        }
    }
}

validator.isEmail1 = function (id, Message) {
    return {
        selector: id,
        text: function (value) {
            if (value.trim() === '') {
                return undefined;
            }
            var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z.]{2,}$/;
            return regex.test(value) ? undefined : Message;
        }
    }
}

export default validator;
