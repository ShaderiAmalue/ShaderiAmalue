document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    const contents = document.querySelectorAll('.content');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.dataset.target;
            contents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');
        });
    });

    document.getElementById('downloads').classList.add('active');

    // UI Customization
    const bgImageInput = document.getElementById('bgImage');
    
    bgImageInput.addEventListener('change', changeBackground);

    function changeBackground() {
        const file = bgImageInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            document.body.style.backgroundImage = `url(${e.target.result})`;
            localStorage.setItem('bgImage', e.target.result);
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    function loadCustomization() {
        const bgImage = localStorage.getItem('bgImage');
        if (bgImage) {
            document.body.style.backgroundImage = `url(${bgImage})`;
        }
    }

    function resetCustomization() {
        localStorage.removeItem('bgImage');
        document.body.style.backgroundImage = '';
        location.reload(); // Reload page to remove custom styles
    }

    loadCustomization();
    window.resetCustomization = resetCustomization;
});