// Change Status
const buttonStatus = document.querySelectorAll('[button-status]');
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    buttonStatus.forEach((btn) =>
        btn.addEventListener('click', () => {
            const status = btn.getAttribute('button-status')
            if (status) {
                url.searchParams.set('status', status)
            } else {
                url.searchParams.delete('status')
            }

            window.location.href = url.href;
        })

    )
}


// Search
const formSearch = document.querySelector('#form-search');
if (formSearch) {
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const valueSearch = e.target.title.value;
        let url = new URL(window.location.href);
        if (valueSearch) {
            url.searchParams.set('search', valueSearch)
        } else {
            url.searchParams.delete('search')
        }
        window.location.href = url.href;
    })
}

// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination.length > 0) {
    let url = new URL(window.location.href);
    buttonPagination.forEach(item =>
        item.addEventListener('click', () => {
            const page = item.getAttribute('button-pagination')
            if (page) {
                url.searchParams.set('page', page)
            } else {
                url.searchParams.delete('page')
            }
            window.location.href = url.href;
        })
    )
}

// Alert
const alertSuccess = document.querySelector('[alert-success]')
if (alertSuccess) {
    console.log(alertSuccess)
    const time = alertSuccess.getAttribute('data-time');
    setTimeout(() => {
        alertSuccess.classList.add('alert-hidden');
    }, parseInt(time))

    const closeAlert = alertSuccess.querySelector("[close-alert]");
    closeAlert.addEventListener('click', () => {
        alertSuccess.classList.add('alert-hidden');
    })
}

// Preview Image
const imageUpload = document.querySelector("[image-upload]");
if (imageUpload) {
    const imageUploadInput = document.querySelector("[image-upload-input]");
    const imagePreview = document.querySelector("[image-preview]");
    const closePreview = document.querySelector("[close-preview]")

    imageUploadInput.addEventListener('change', (e) => {
        let file = e.target.files[0];
        if (closePreview) {
            closePreview.addEventListener('click', () => {
                imageUploadInput.value = "";
                file = "";
                imagePreview.src = "";
                closePreview.classList.remove("show");
            })
        }
        if (file) {
            imagePreview.src = URL.createObjectURL(file);
            closePreview.classList.add("show");
        }

    })


}
// End Preview Image