(() => {
    const save = document.querySelector('.options-save');
    const resume = document.querySelector('.options-resume');
    const tips = document.querySelector('.options-tips');
    const field = document.getElementById('allow-origin');

    field.value = localStorage.getItem('allowOrigin') || '';

    save.addEventListener('click', (ev) => {
        ev.preventDefault();

        save.disabled = true;
        tips.innerHTML = '';

        localStorage.setItem(
            'allowOrigin',
            field.value
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
        field.value = field.placeholder;

        localStorage.setItem(
            'allowOrigin',
            field.value
        );

        setTimeout(() => {
            resume.disabled = false;
        }, 100);
    })
})();
