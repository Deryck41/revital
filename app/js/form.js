document.querySelectorAll('.file-input').forEach((input) => {
    input.addEventListener('click', () => {
        const fileInput = input.querySelector('input[type="file"]');
        fileInput.addEventListener('change', function() {
            const file = this.files[0];
            input.querySelector('.input-file-desc').textContent = file.name;
        });
        fileInput.click();
    });
})