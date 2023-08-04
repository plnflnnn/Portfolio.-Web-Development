const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.border = "5px solid yellow";
        item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .7)";
    }

    function unhighlight(item) {
        item.closest('.file_upload').style.border = "none";
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = "#fff";
        } else {
            item.closest('.file_upload').style.backgroundColor = "#ededed";
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    function addedFile(item) {
        let dots;
        const arr = item.files[0].name.split('.');

        arr[0].length > 6 ? dots = "..." : dots = '.';
        const name = arr[0].substring(0, 6) + dots + arr[1];
        item.previousElementSibling.textContent = name;
        item.closest('.file_upload').style.backgroundColor = 'rgba(197,26,191, 0.5)';
        item.closest('.file_upload').style.borderRadius = '50px';
        item.closest('.file_upload').style.border = '1px solid rgba(197,26,191, 0.5)';
    }

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            addedFile(input);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('change', () => {
            addedFile(input);
        });
    });
};

export default drop;