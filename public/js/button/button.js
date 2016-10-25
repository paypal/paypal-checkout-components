
export function renderButton(onClick) {

    let button = document.getElementById('buttonContainer').querySelector('button');

    if (onClick) {
        button.addEventListener('click', onClick);
    }

    return button;
}
