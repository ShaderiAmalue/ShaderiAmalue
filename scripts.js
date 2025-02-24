document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    const contents = document.querySelectorAll('.content');
    const customSelects = document.querySelectorAll('.custom-select-wrapper');
    const heroSection = document.getElementById('hero');
    const animatedElements = document.querySelectorAll('.button-link, nav a, .custom-select-trigger');

    // Handle navigation clicks
    document.querySelector('nav').addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const targetId = event.target.dataset.target;
            contents.forEach(content => content.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
            heroSection.classList.toggle('hidden', targetId !== 'home');
        }
    });

    // Set the initial active section
    document.getElementById('home').classList.add('active');
    heroSection.classList.remove('hidden');

    // Handle custom select elements
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

    // Add fade-in animation to the body
    document.body.classList.add('fade-in');

    // Handle animations for buttons and links
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