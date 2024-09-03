// ChangeStatus
const buttonChangeStatus = document.querySelectorAll('[button-change-status]');
if (buttonChangeStatus.length > 0) {
    let form = document.querySelector('#form-change-status');
    let path = form.getAttribute('data-path');
    buttonChangeStatus.forEach(btn => {
        btn.addEventListener('click', () => {
            let status = btn.getAttribute('data-status');
            let id = btn.getAttribute('data-id');
            let changeStatus = status == "active" ? "inactive" : "active";
            const action = `${path}/${changeStatus}/${id}?_method=PATCH`;
            form.action = action;

            form.submit();
        })
    })
}
// End ChangeStatus

// Checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    const checkAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputIds = checkboxMulti.querySelectorAll("input[name='id']");

    checkAll.addEventListener('click', () => {
        if (checkAll.checked) {
            inputIds.forEach(check => {
                check.checked = true;
            })
        } else {
            inputIds.forEach(check => {
                check.checked = false;
            })
        }
    })
    inputIds.forEach(input => {
        input.addEventListener('click', () => {
            const countCheck = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if (countCheck == inputIds.length) {
                checkAll.checked = true;
            } else {
                checkAll.checked = false;
            }
        })

    })

}
//End Checkbox multi

// Form checkmulti
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {

    formChangeMulti.addEventListener('submit', (e) => {
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputCheck = checkboxMulti.querySelectorAll("input[name='id']:checked")

        const typeChange = e.target.elements.type.value;
        if (typeChange == "delete-all") {
            if (!confirm("Do You Want Delete Products")) {
                return;
            }
        }

        if (inputCheck.length > 0) {
            let ids = [];
            let inputIds = formChangeMulti.querySelector("input[name='ids']");
            inputCheck.forEach(ipCheck => {
                if (typeChange == "change-position") {
                    const position = ipCheck.closest("tr")
                        .querySelector("input[name='position']")
                        .value;
                    ids.push(`${ipCheck.value}-${position}`)
                } else {
                    ids.push(ipCheck.value)
                }
            })
            inputIds.value = ids.join(", ")
            formChangeMulti.submit();
        } else {
            alert('Please Choose Checkbox')
        }
    })
}
// End Formcheck multi

// Delete Products
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
    const formDelete = document.querySelector("#form-delete");
    const path = formDelete.getAttribute("data-path")
    buttonDelete.forEach(btn => {
        btn.addEventListener('click', () => {
            if (confirm('Do You Want Delete This Product')) {
                const id = btn.getAttribute("data-delete");
                formDelete.action = `${path}/${id}?_method=DELETE`;
                formDelete.submit();
            }
        })
    })
}
// End Delete Products