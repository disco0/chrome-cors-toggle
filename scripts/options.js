(() => {
    const save = document.querySelector('.options-save');
    const resume = document.querySelector('.options-resume');
    const tips = document.querySelector('.options-tips');

    const allowedOrigins = document.getElementById('allow-origin');
    const allowedDomains = document.getElementById('allow-domains');

    allowedOrigins.value = localStorage.getItem('allowOrigin') || '';
    allowedDomains.value = localStorage.getItem('allowDomains') || '';

    save.addEventListener('click', (ev) => {
        ev.preventDefault();

        save.disabled = true;
        tips.innerHTML = '';

        localStorage.setItem(
            'allowOrigin',
            allowedOrigins.value
        );

        localStorage.setItem(
            'allowDomains',
            allowedDomains.value
        );

        setTimeout(() => {
            save.disabled = false,
            tips.innerHTML = 'Saved';
        }, 100);
    });

    resume.addEventListener('click', (ev) => {
        ev.preventDefault();

        resume.disabled = true;
        tips.innerHTML = '';

        allowedOrigins.value = '';
        localStorage.setItem(
            'allowOrigin',
            ''
        );

        allowedDomains.value = '';
        localStorage.setItem(
            'allowDomains',
            ''
        );

        setTimeout(() => {
            resume.disabled = false;
        }, 100);
    })
})();
