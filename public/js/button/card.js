export function renderCardExperience({ token, ...otherProps } = {}) {
    const {
        onAuth,
        onAuthorize,
        onCancel
    } = window.xprops;
    const promiseRender = window.paypal.Card.render({
        tag: 'zombo',
        payment: window.xprops.payment,
        locale: window.xprops.locale,
        commit: window.xprops.commit,
        onError: window.xprops.onError,
        onAuthorize,
        onCancel,
        onAuth,
        style: {
            overlayColor: window.xprops.style.overlayColor
        },

        ...otherProps
    }, document.getElementById('cardExp'));

    // animate zombo
    const zomboEl = document.getElementById('cardExp');
    zomboEl.className = 'cardExpOpened';

    // resize the button iframe for the animation
    // TODO: make the size dynamic
    // width = BUTTON's width
    // height = BUTTON's height + zombo height
    window.xchild.resize(250, 360);
    return promiseRender;
}
