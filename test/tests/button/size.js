/* @flow */

import { createTestContainer, destroyTestContainer, getElement, createElement } from '../common';

describe(`paypal button component sizes`, () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    it('should render a tiny button', (done) => {

        let expectedWidth = 148;
        let expectedHeight = 42;

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'tiny'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    let frame = getElement('#testContainer iframe');
                    let width = frame.offsetWidth;
                    let height = frame.offsetHeight;

                    if (width !== expectedWidth) {
                        return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                    }

                    if (height !== expectedHeight) {
                        return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                    }

                    return done();
                }, 100);
            }

        }, '#testContainer');
    });

    it('should render a small button', (done) => {

        let expectedWidth = 148;
        let expectedHeight = 42;

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'small'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    let frame = getElement('#testContainer iframe');
                    let width = frame.offsetWidth;
                    let height = frame.offsetHeight;

                    if (width !== expectedWidth) {
                        return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                    }

                    if (height !== expectedHeight) {
                        return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                    }

                    return done();
                }, 100);
            }

        }, '#testContainer');
    });

    it('should render a medium button', (done) => {

        let expectedWidth = 230;
        let expectedHeight = 48;

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'medium'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    let frame = getElement('#testContainer iframe');
                    let width = frame.offsetWidth;
                    let height = frame.offsetHeight;

                    if (width !== expectedWidth) {
                        return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                    }

                    if (height !== expectedHeight) {
                        return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                    }

                    return done();
                }, 100);
            }

        }, '#testContainer');
    });

    it('should render a large button', (done) => {

        let expectedWidth = 380;
        let expectedHeight = 60;

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'large'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    let frame = getElement('#testContainer iframe');
                    let width = frame.offsetWidth;
                    let height = frame.offsetHeight;

                    if (width !== expectedWidth) {
                        return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                    }

                    if (height !== expectedHeight) {
                        return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                    }

                    return done();
                }, 100);
            }

        }, '#testContainer');
    });

    it('should render a responsive button in the small spectrum', (done) => {

        let container = createElement({
            style: {
                width: '162px',
                height: '100px'
            },
            container: '#testContainer'
        });

        let expectedWidth = 162;
        let expectedHeight = 42;

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'responsive'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    let frame = getElement('#testContainer iframe');
                    let width = frame.offsetWidth;
                    let height = frame.offsetHeight;

                    if (width !== expectedWidth) {
                        return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                    }

                    if (height !== expectedHeight) {
                        return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                    }

                    return done();
                }, 100);
            }

        }, container);
    });

    it('should render a responsive button in the medium spectrum', (done) => {

        let container = createElement({
            style: {
                width: '250px',
                height: '100px'
            },
            container: '#testContainer'
        });

        let expectedWidth = 250;
        let expectedHeight = 48;

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'responsive'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    let frame = getElement('#testContainer iframe');
                    let width = frame.offsetWidth;
                    let height = frame.offsetHeight;

                    if (width !== expectedWidth) {
                        return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                    }

                    if (height !== expectedHeight) {
                        return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                    }

                    return done();
                }, 100);
            }

        }, container);
    });

    it('should render a responsive button in the large spectrum', (done) => {

        let container = createElement({
            style: {
                width: '350px',
                height: '100px'
            },
            container: '#testContainer'
        });

        let expectedWidth = 350;
        let expectedHeight = 60;

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'responsive'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    let frame = getElement('#testContainer iframe');
                    let width = frame.offsetWidth;
                    let height = frame.offsetHeight;

                    if (width !== expectedWidth) {
                        return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                    }

                    if (height !== expectedHeight) {
                        return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                    }

                    return done();
                }, 100);
            }

        }, container);
    });

    it('should render a responsive button below the tiny spectrum', (done) => {

        let container = createElement({
            style: {
                width: '30px',
                height: '100px'
            },
            container: '#testContainer'
        });

        let expectedWidth = 148;
        let expectedHeight = 42;

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'responsive'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    let frame = getElement('#testContainer iframe');
                    let width = frame.offsetWidth;
                    let height = frame.offsetHeight;

                    if (width !== expectedWidth) {
                        return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                    }

                    if (height !== expectedHeight) {
                        return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                    }

                    return done();
                }, 100);
            }

        }, container);
    });

    it('should render a responsive button above the large spectrum', (done) => {

        let container = createElement({
            style: {
                width: '700px',
                height: '100px'
            },
            container: '#testContainer'
        });

        let expectedWidth = 500;
        let expectedHeight = 60;

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'responsive'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    let frame = getElement('#testContainer iframe');
                    let width = frame.offsetWidth;
                    let height = frame.offsetHeight;

                    if (width !== expectedWidth) {
                        return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                    }

                    if (height !== expectedHeight) {
                        return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                    }

                    return done();
                }, 100);
            }

        }, container);
    });

    it('should render a tiny button into an element below the minimum height', (done) => {

        let expectedWidth = 148;
        let expectedHeight = 42;

        let container = createElement({
            style: {
                width: '100px',
                height: '15px'
            },
            container: '#testContainer'
        });

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'tiny'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    let frame = getElement('#testContainer iframe');
                    let width = frame.offsetWidth;
                    let height = frame.offsetHeight;

                    if (width !== expectedWidth) {
                        return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                    }

                    if (height !== expectedHeight) {
                        return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                    }

                    return done();
                }, 100);
            }

        }, container);
    });

    it('should render a small button into an element below the minimum height', (done) => {

        let expectedWidth = 148;
        let expectedHeight = 42;

        let container = createElement({
            style: {
                width: '160px',
                height: '20px'
            },
            container: '#testContainer'
        });

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'small'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    let frame = getElement('#testContainer iframe');
                    let width = frame.offsetWidth;
                    let height = frame.offsetHeight;

                    if (width !== expectedWidth) {
                        return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                    }

                    if (height !== expectedHeight) {
                        return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                    }

                    return done();
                }, 100);
            }

        }, container);
    });

    it('should render a medium button into an element below the minimum height', (done) => {

        let expectedWidth = 230;
        let expectedHeight = 48;

        let container = createElement({
            style: {
                width: '260px',
                height: '40px'
            },
            container: '#testContainer'
        });

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'medium'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    let frame = getElement('#testContainer iframe');
                    let width = frame.offsetWidth;
                    let height = frame.offsetHeight;

                    if (width !== expectedWidth) {
                        return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                    }

                    if (height !== expectedHeight) {
                        return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                    }

                    return done();
                }, 100);
            }

        }, container);
    });

    it('should render a large button into an element below the minimum height', (done) => {

        let expectedWidth = 380;
        let expectedHeight = 60;

        let container = createElement({
            style: {
                width: '450px',
                height: '45px'
            },
            container: '#testContainer'
        });

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'large'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    let frame = getElement('#testContainer iframe');
                    let width = frame.offsetWidth;
                    let height = frame.offsetHeight;

                    if (width !== expectedWidth) {
                        return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                    }

                    if (height !== expectedHeight) {
                        return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                    }

                    return done();
                }, 100);
            }

        }, container);
    });

    it('should render a responsive button in the tiny spectrum into an element below the minimum height', (done) => {

        let container = createElement({
            style: {
                width: '98px',
                height: '5px'
            },
            container: '#testContainer'
        });

        let expectedWidth = 148;
        let expectedHeight = 42;

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'responsive'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    let frame = getElement('#testContainer iframe');
                    let width = frame.offsetWidth;
                    let height = frame.offsetHeight;

                    if (width !== expectedWidth) {
                        return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                    }

                    if (height !== expectedHeight) {
                        return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                    }

                    return done();
                }, 100);
            }

        }, container);
    });

    it('should render a responsive button in the small spectrum into an element below the minimum height', (done) => {

        let container = createElement({
            style: {
                width: '155px',
                height: '22px'
            },
            container: '#testContainer'
        });

        let expectedWidth = 155;
        let expectedHeight = 42;

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'responsive'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    let frame = getElement('#testContainer iframe');
                    let width = frame.offsetWidth;
                    let height = frame.offsetHeight;

                    if (width !== expectedWidth) {
                        return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                    }

                    if (height !== expectedHeight) {
                        return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                    }

                    return done();
                }, 100);
            }

        }, container);
    });

    it('should render a responsive button in the medium spectrum into an element below the minimum height', (done) => {

        let container = createElement({
            style: {
                width: '235px',
                height: '27px'
            },
            container: '#testContainer'
        });

        let expectedWidth = 235;
        let expectedHeight = 48;

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'responsive'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    let frame = getElement('#testContainer iframe');
                    let width = frame.offsetWidth;
                    let height = frame.offsetHeight;

                    if (width !== expectedWidth) {
                        return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                    }

                    if (height !== expectedHeight) {
                        return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                    }

                    return done();
                }, 100);
            }

        }, container);
    });

    it('should render a responsive button in the large spectrum into an element below the minimum height', (done) => {

        let container = createElement({
            style: {
                width: '370px',
                height: '40px'
            },
            container: '#testContainer'
        });

        let expectedWidth = 370;
        let expectedHeight = 60;

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'responsive'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    let frame = getElement('#testContainer iframe');
                    let width = frame.offsetWidth;
                    let height = frame.offsetHeight;

                    if (width !== expectedWidth) {
                        return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                    }

                    if (height !== expectedHeight) {
                        return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                    }

                    return done();
                }, 100);
            }

        }, container);
    });

    it('should render a responsive credit button below the small spectrum', (done) => {

        let container = createElement({
            style: {
                width: '100px',
                height: '100px'
            },
            container: '#testContainer'
        });

        let expectedWidth = 148;
        let expectedHeight = 42;

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'responsive',
                label: 'credit'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    let frame = getElement('#testContainer iframe');
                    let width = frame.offsetWidth;
                    let height = frame.offsetHeight;

                    if (width !== expectedWidth) {
                        return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                    }

                    if (height !== expectedHeight) {
                        return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                    }

                    return done();
                }, 100);
            }

        }, container);
    });

    it('should render a responsive pay button below the small spectrum', (done) => {

        let container = createElement({
            style: {
                width: '100px',
                height: '100px'
            },
            container: '#testContainer'
        });

        let expectedWidth = 148;
        let expectedHeight = 42;

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'responsive',
                label: 'pay'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    let frame = getElement('#testContainer iframe');
                    let width = frame.offsetWidth;
                    let height = frame.offsetHeight;

                    if (width !== expectedWidth) {
                        return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                    }

                    if (height !== expectedHeight) {
                        return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                    }

                    return done();
                }, 100);
            }

        }, container);
    });

    it('should render a responsive button and resize it', (done) => {

        let container = createElement({
            style: {
                width: '162px',
                height: '100px'
            },
            container: '#testContainer'
        });

        let expectedWidth = 255;
        let expectedHeight = 42;

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'responsive'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    container.style.width = '255px';

                    setTimeout(() => {
                        let frame = getElement('#testContainer iframe');
                        let width = frame.offsetWidth;
                        let height = frame.offsetHeight;

                        if (width !== expectedWidth) {
                            return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                        }

                        if (height !== expectedHeight) {
                            return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                        }

                        return done();
                    }, 100);
                }, 100);
            }

        }, container);
    });

    it('should render a responsive button in a hidden element then display it', (done) => {

        let container = createElement({
            style: {
                width: '172px',
                height: '100px',
                display: 'none'
            },
            container: '#testContainer'
        });

        let expectedWidth = 172;
        let expectedHeight = 42;

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'responsive'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    container.style.display = 'block';

                    setTimeout(() => {
                        let frame = getElement('#testContainer iframe');
                        let width = frame.offsetWidth;
                        let height = frame.offsetHeight;

                        if (width !== expectedWidth) {
                            return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                        }

                        if (height !== expectedHeight) {
                            return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                        }

                        return done();
                    }, 100);
                }, 100);
            }

        }, container);
    });

    it('should render a responsive button in a floated div without a width', (done) => {

        let container = createElement({
            style: {
                height: '100px',
                float: 'right'
            },
            container: '#testContainer'
        });

        let expectedWidth = 148;
        let expectedHeight = 42;

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'responsive'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {
                    let frame = getElement('#testContainer iframe');
                    let width = frame.offsetWidth;
                    let height = frame.offsetHeight;

                    if (width !== expectedWidth) {
                        return done(new Error(`Expected button to have width of ${expectedWidth}px, got ${width}px`));
                    }

                    if (height !== expectedHeight) {
                        return done(new Error(`Expected button to have height of ${expectedHeight}px, got ${height}px`));
                    }

                    return done();
                }, 100);
            }

        }, container);
    });

    it('should render a small button centered', (done) => {

        let container = createElement({
            style: {
                height: '100px',
                width: '500px',
                textAlign: 'center'
            },
            container: '#testContainer'
        });

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'small'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {

                    let c = container.getBoundingClientRect();
                    let e = getElement('#testContainer iframe').getBoundingClientRect();

                    let expectedPosition = c.left + Math.floor(c.width / 2) - Math.floor(e.width / 2);
                    let actualPosition = e.left;

                    if (expectedPosition !== actualPosition) {
                        return done(new Error(`Expected button to have left position of ${expectedPosition}, found ${actualPosition}`));
                    }

                    return done();
                }, 100);
            }

        }, container);
    });

    it('should render a medium button centered', (done) => {

        let container = createElement({
            style: {
                height: '100px',
                width: '500px',
                textAlign: 'center'
            },
            container: '#testContainer'
        });

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'medium'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {

                    let c = container.getBoundingClientRect();
                    let e = getElement('#testContainer iframe').getBoundingClientRect();

                    let expectedPosition = c.left + Math.floor(c.width / 2) - Math.floor(e.width / 2);
                    let actualPosition = e.left;

                    if (expectedPosition !== actualPosition) {
                        return done(new Error(`Expected button to have left position of ${expectedPosition}, found ${actualPosition}`));
                    }

                    return done();
                }, 100);
            }

        }, container);
    });

    it('should render a large button centered', (done) => {

        let container = createElement({
            style: {
                height: '100px',
                width: '500px',
                textAlign: 'center'
            },
            container: '#testContainer'
        });

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'large'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {

                    let c = container.getBoundingClientRect();
                    let e = getElement('#testContainer iframe').getBoundingClientRect();

                    let expectedPosition = c.left + Math.floor(c.width / 2) - Math.floor(e.width / 2);
                    let actualPosition = e.left;

                    if (expectedPosition !== actualPosition) {
                        return done(new Error(`Expected button to have left position of ${expectedPosition}, found ${actualPosition}`));
                    }

                    return done();
                }, 100);
            }

        }, container);
    });

    it('should render a responsive button centered', (done) => {

        let container = createElement({
            style: {
                height: '100px',
                width: '800px',
                textAlign: 'center'
            },
            container: '#testContainer'
        });

        window.paypal.Button.render({

            test: {},

            style: {
                size: 'responsive'
            },

            payment() {
                done(new Error('Expected payment() to not be called'));
            },

            onAuthorize() {
                done(new Error('Expected onAuthorize() to not be called'));
            },

            onEnter() {
                setTimeout(() => {

                    let c = container.getBoundingClientRect();
                    let e = getElement('#testContainer iframe').getBoundingClientRect();

                    let expectedPosition = c.left + Math.floor(c.width / 2) - Math.floor(e.width / 2);
                    let actualPosition = e.left;

                    if (expectedPosition !== actualPosition) {
                        return done(new Error(`Expected button to have left position of ${expectedPosition}, found ${actualPosition}`));
                    }

                    return done();
                }, 100);
            }

        }, container);
    });
});
