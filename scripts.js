document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    const contents = document.querySelectorAll('.content');
    const customSelects = document.querySelectorAll('.custom-select-wrapper');
    const heroSection = document.getElementById('hero');
    const animatedElements = document.querySelectorAll('.button-link, nav a, .custom-select-trigger');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = link.getAttribute('href');
        });
    });

    customSelects.forEach(wrapper => {
        const select = wrapper.querySelector('select');
        const trigger = document.createElement('div');
        trigger.className = 'custom-select-trigger';
        trigger.textContent = select.options[select.selectedIndex].text;
        wrapper.appendChild(trigger);

        const optionsWrapper = document.createElement('div');
        optionsWrapper.className = 'custom-options';

        Array.from(select.options).forEach(option => {
            const customOption = document.createElement('div');
            customOption.className = 'custom-option';
            customOption.textContent = option.text;
            customOption.addEventListener('click', () => {
                select.value = option.value;
                trigger.textContent = option.text;
                wrapper.classList.remove('open');
                select.dispatchEvent(new Event('change'));
            });
            optionsWrapper.appendChild(customOption);
        });

        wrapper.appendChild(optionsWrapper);

        trigger.addEventListener('click', () => {
            wrapper.classList.toggle('open');
        });

        document.addEventListener('click', (event) => {
            if (!wrapper.contains(event.target)) {
                wrapper.classList.remove('open');
            }
        });

        select.addEventListener('change', () => {
            trigger.textContent = select.options[select.selectedIndex].text;
        });
    });

    document.body.classList.add('fade-in');

    animatedElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('hover-animation');
        });

        element.addEventListener('mouseleave', () => {
            element.classList.remove('hover-animation');
        });
    });
});

const rainbowText = document.getElementById('rainbow-text');
if (rainbowText) {
    setInterval(() => {
        rainbowText.style.backgroundPosition = `${Math.random() * 100}% ${Math.random() * 100}%`;
    }, 300);
}