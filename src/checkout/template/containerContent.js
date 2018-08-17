/* @flow */
/* eslint max-lines: 0 */

const CONTAINER_CONTENT = {
    AT: {
        de: {
            windowMessage:   'Sie sehen das sichere Browserfenster von PayPal nicht? Hier können Sie es wieder öffnen und Ihren Einkauf abschließen.',
            continueMessage: 'Weiter'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    ZW: {
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    ZM: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    ZA: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    YT: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    YE: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        ar: {
            windowMessage:   'لا ترى متصفح PayPal الآمن؟ سنساعدك في إعادة فتح النافذة لاستكمال مشترياتك.   ',
            continueMessage: 'متابعة'
        }
    },
    WS: {
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    WF: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    VU: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat. ',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    VG: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    VE: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        }
    },
    VC: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    VA: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    UY: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        }
    },
    UG: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    TZ: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    TV: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat. ',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    TT: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    TO: {
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    TN: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        ar: {
            windowMessage:   'لا ترى متصفح PayPal الآمن؟ سنساعدك في إعادة فتح النافذة لاستكمال مشترياتك.   ',
            continueMessage: 'متابعة'
        }
    },
    TM: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    TJ: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    TG: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        }
    },
    TD: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        }
    },
    TC: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    SZ: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    SV: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        }
    },
    ST: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    SR: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    SO: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    SN: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        }
    },
    SM: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    SL: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    SJ: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    SH: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    SC: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        }
    },
    SB: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat. ',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    SA: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        ar: {
            windowMessage:   'لا ترى متصفح PayPal الآمن؟ سنساعدك في إعادة فتح النافذة لاستكمال مشترياتك.   ',
            continueMessage: 'متابعة'
        }
    },
    RW: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        }
    },
    RS: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    RE: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    QA: {
        ar: {
            windowMessage:   'لا ترى متصفح PayPal الآمن؟ سنساعدك في إعادة فتح النافذة لاستكمال مشترياتك.   ',
            continueMessage: 'متابعة'
        },
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    PY: {
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        }
    },
    PW: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat. ',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    PN: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat. ',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    PM: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    PG: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat. ',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    PF: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    PE: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        }
    },
    PA: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        }
    },
    OM: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        ar: {
            windowMessage:   'لا ترى متصفح PayPal الآمن؟ سنساعدك في إعادة فتح النافذة لاستكمال مشترياتك.   ',
            continueMessage: 'متابعة'
        }
    },
    NU: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat. ',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    NR: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat. ',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    NP: {
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    NI: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        }
    },
    NG: {
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    NF: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat. ',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    NE: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        }
    },
    NC: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    NA: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    MZ: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    MW: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    MV: {
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    MU: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    MT: {
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    MS: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    MR: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    MQ: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    MN: {
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    ML: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        }
    },
    MK: {
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    MH: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat. ',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    MG: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    ME: {
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    MD: {
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    MC: {
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        }
    },
    MA: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        ar: {
            windowMessage:   'لا ترى متصفح PayPal الآمن؟ سنساعدك في إعادة فتح النافذة لاستكمال مشترياتك.   ',
            continueMessage: 'متابعة'
        }
    },
    LS: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    LK: {
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    LI: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    LC: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    LA: {
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    KZ: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    KY: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    KW: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        ar: {
            windowMessage:   'لا ترى متصفح PayPal الآمن؟ سنساعدك في إعادة فتح النافذة لاستكمال مشترياتك.   ',
            continueMessage: 'متابعة'
        }
    },
    KN: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    KM: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        }
    },
    KI: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat. ',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    KH: {
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    KG: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    KE: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    JO: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        ar: {
            windowMessage:   'لا ترى متصفح PayPal الآمن؟ سنساعدك في إعادة فتح النافذة لاستكمال مشترياتك.   ',
            continueMessage: 'متابعة'
        }
    },
    JM: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        }
    },
    IS: {
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    HR: {
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    HN: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        }
    },
    GY: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    GW: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    GT: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        }
    },
    GP: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    GN: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        }
    },
    GM: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    GL: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        da: {
            windowMessage:   'Kan du ikke se PayPals sikre browser? Vi hjælper dig med at genstarte vinduet, så du kan betale.',
            continueMessage: 'Fortsæt'
        }
    },
    GI: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    GF: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    GE: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    GD: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    GA: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        }
    },
    FO: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        da: {
            windowMessage:   'Kan du ikke se PayPals sikre browser? Vi hjælper dig med at genstarte vinduet, så du kan betale.',
            continueMessage: 'Fortsæt'
        }
    },
    FM: {
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    FK: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    FJ: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat. ',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    ET: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    ER: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    EG: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        ar: {
            windowMessage:   'لا ترى متصفح PayPal الآمن؟ سنساعدك في إعادة فتح النافذة لاستكمال مشترياتك.   ',
            continueMessage: 'متابعة'
        }
    },
    EC: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        }
    },
    DZ: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        ar: {
            windowMessage:   'لا ترى متصفح PayPal الآمن؟ سنساعدك في إعادة فتح النافذة لاستكمال مشترياتك.   ',
            continueMessage: 'متابعة'
        }
    },
    DO: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        }
    },
    DM: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    DJ: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        }
    },
    CY: {
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    CV: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    CR: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        }
    },
    CO: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        }
    },
    CM: {
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        }
    },
    CL: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        }
    },
    CK: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    CI: {
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        }
    },
    CG: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    CD: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        }
    },
    BZ: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        }
    },
    BY: {
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    BW: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    BT: {
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    BS: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    BO: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        }
    },
    BN: {
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    BM: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    BJ: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        }
    },
    BI: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        }
    },
    BH: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        ar: {
            windowMessage:   'لا ترى متصفح PayPal الآمن؟ سنساعدك في إعادة فتح النافذة لاستكمال مشترياتك.   ',
            continueMessage: 'متابعة'
        }
    },
    BG: {
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    BF: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        }
    },
    BB: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    BA: {
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    AZ: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    AW: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    AO: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    AN: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    AM: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    AL: {
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    AI: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    AG: {
        zh: {
            windowMessage:   '没看到PayPal付款页面？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas la page de Paiement PayPal ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    AE: {
        ar: {
            windowMessage:   'لا ترى متصفح PayPal الآمن؟ سنساعدك في إعادة فتح النافذة لاستكمال مشترياتك.   ',
            continueMessage: 'متابعة'
        },
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    AD: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    CN: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成付款。  ',
            continueMessage: '继续'
        }
    },
    GB: {
        fr: {
            windowMessage:   'Vous ne voyez pas le navigateur sécurisé PayPal ? Nous allons vous aider à relancer la fenêtre pour effectuer votre achat.  ',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We\'ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    AR: {
        en: {
            windowMessage:   'Don’t see the PayPal payment page? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        },
        es: {
            windowMessage:   '¿No puede ver la página de pago de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.',
            continueMessage: 'Continuar'
        }
    },
    US: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat. ',
            continueMessage: 'Continuer'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Click to Continue'
        }
    },
    VN: {
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your payment.  ',
            continueMessage: 'Continue'
        }
    },
    UA: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        ru: {
            windowMessage:   'Не отображается безопасная страница PayPal в браузере? Мы поможем вам повторно загрузить окно, чтобы завершить покупку.  ',
            continueMessage: 'Продолжить'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    TW: {
        zh: {
            windowMessage:   '看不到安全連線的 PayPal 瀏覽器？我們將會重新啟動視窗以完成付款。  ',
            continueMessage: '繼續'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your payment.  ',
            continueMessage: 'Continue'
        }
    },
    TR: {
        tr: {
            windowMessage:   'Güvenli PayPal tarayıcısını görmüyor musunuz? Alışverişinizi tamamlamak için pencereyi yeniden başlatmanıza yardımcı olacağız.  ',
            continueMessage: 'Devam'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    TH: {
        th: {
            windowMessage:   'ถ้าคุณไม่เห็นเบราว์เซอร์ที่มีระบบความปลอดภัยของ PayPal เราจะช่วยคุณเปิดหน้าต่างอีกครั้งเพื่อชำระเงินให้เรียบร้อย ',
            continueMessage: 'ดำเนินการต่อ'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your payment.  ',
            continueMessage: 'Continue'
        }
    },
    SK: {
        sk: {
            windowMessage:   'Nezobrazuje sa vám zabezpečený prehliadač PayPal? Pomôžeme vám znova otvoriť okno, aby ste mohli nákup dokončiť.  ',
            continueMessage: 'Pokračovať'
        },
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    SI: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    SG: {
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your payment.  ',
            continueMessage: 'Continue'
        }
    },
    SE: {
        sv: {
            windowMessage:   'Ser du inte den säkra PayPal-webbläsaren? Vi hjälper dig att starta om fönstret för att slutföra ditt köp. ',
            continueMessage: 'Fortsätt'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    RU: {
        ru: {
            windowMessage:   'Не отображается безопасная страница PayPal в браузере? Мы поможем вам повторно загрузить окно, чтобы завершить покупку.',
            continueMessage: 'Продолжить'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.',
            continueMessage: 'Continue'
        }
    },
    RO: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    PT: {
        pt: {
            windowMessage:   'Não vê a indicação de sessão segura PayPal no browser? Vamos ajudar a reabrir a janela para que possa concluir a sua compra.',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    PL: {
        pl: {
            windowMessage:   'Nie widzisz bezpiecznej przeglądarki PayPal? Pomożemy Ci ponownie uruchomić to okno w celu dokonania zakupu.  ',
            continueMessage: 'Kontynuuj'
        },
        en: {
            windowMessage:   'You don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    PH: {
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your payment.  ',
            continueMessage: 'Continue'
        }
    },
    NZ: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成付款。  ',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à relancer la fenêtre pour effectuer votre paiement.',
            continueMessage: 'Continuer'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Le ayudaremos a abrir de nuevo la ventana para completar su pago.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your payment.  ',
            continueMessage: 'Continue'
        }
    },
    NO: {
        no: {
            windowMessage:   'Ser du ikke den sikre PayPal-nettleseren? Vi hjelper deg med å starte vinduet på nytt så du kan fullføre kjøpet.  ',
            continueMessage: 'Fortsett'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    NL: {
        nl: {
            windowMessage:   'Ziet u geen beveiligde PayPal-browser? We helpen u het venster opnieuw te openen om uw aankoop te voltooien.  ',
            continueMessage: 'Doorgaan'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    MY: {
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your payment.  ',
            continueMessage: 'Continue'
        }
    },
    MX: {
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda completar su compra. ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    LV: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        ru: {
            windowMessage:   'Не отображается безопасная страница PayPal в браузере? Мы поможем вам повторно загрузить окно, чтобы завершить покупку.  ',
            continueMessage: 'Продолжить'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    LU: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        de: {
            windowMessage:   'Das PayPal-Fenster wird nicht angezeigt? Hier können Sie es wieder öffnen und Ihren Einkauf abschließen.',
            continueMessage: 'Weiter'
        }
    },
    LT: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        ru: {
            windowMessage:   'Не отображается безопасная страница PayPal в браузере? Мы поможем вам повторно загрузить окно, чтобы завершить покупку.  ',
            continueMessage: 'Продолжить'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    KR: {
        ko: {
            windowMessage:   '보안 PayPal 브라우저가 보이지 않으신가요? 창을 다시 실행하여 결제를 완료할 수 있도록 도와드리겠습니다.  ',
            continueMessage: '계속'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your payment.  ',
            continueMessage: 'Continue'
        }
    },
    JP: {
        ja: {
            windowMessage:   'セキュアなブラウザが表示されない場合は、ウィンドウを再起動して、支払いを完了できるようお手伝いいたします。',
            continueMessage: '続行'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your payment.  ',
            continueMessage: 'Continue'
        }
    },
    IT: {
        it: {
            windowMessage:   'Non vedi la pagina sicura di PayPal? Ti aiuteremo a riaprire la finestra per completare l\'acquisto.',
            continueMessage: 'Continua'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    IN: {
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    IL: {
        he: {
            windowMessage:   'לא רואה את דפדפן PayPal המאובטח? נעזור לך לפתוח מחדש את החלון כדי להשלים את הקנייה שלך.  ',
            continueMessage: 'המשך'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    IE: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    HU: {
        hu: {
            windowMessage:   'Nem látja a biztonságos PayPal-böngészőt? Segítünk újra betölteni az ablakot, hogy befejezhesse a vásárlást.  ',
            continueMessage: 'Folytatás'
        },
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    ID: {
        id: {
            windowMessage:   'Browser PayPal yang aman tidak terlihat? Kami akan membantu menampilkan ulang jendela untuk menyelesaikan pembayaran Anda.  ',
            continueMessage: 'Lanjutkan'
        },
        en: {
            windowMessage:   'Don’t see the secure PayPal browser? We’ll help you re-launch the window to complete your payment.  ',
            continueMessage: 'Continue'
        }
    },
    HK: {
        zh: {
            windowMessage:   '看不到安全的 PayPal 瀏覽器視窗？我們會助你重新開啟視窗，以完成付款。',
            continueMessage: '繼續'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your payment.  ',
            continueMessage: 'Continue'
        }
    },
    GR: {
        el: {
            windowMessage:   'Δεν βλέπετε το ασφαλές πρόγραμμα περιήγησης PayPal; Θα σας βοηθήσουμε να επανεκκινήσετε το παράθυρο για να ολοκληρώσετε την αγορά σας.  ',
            continueMessage: 'Συνέχεια'
        },
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    FR: {
        fr: {
            windowMessage:   'Vous ne voyez pas le navigateur sécurisé PayPal ? Nous allons vous aider à relancer la fenêtre pour effectuer votre achat.  ',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    ES: {
        es: {
            windowMessage:   '¿No ve el símbolo de navegación segura de PayPal? Le ayudaremos a abrir de nuevo la ventana para completar la compra. ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    FI: {
        fi: {
            windowMessage:   'Eikö suojattua PayPal-selainta näy? Autamme avaamaan ikkunan uudelleen oston viimeistelyä varten.  ',
            continueMessage: 'Jatka'
        },
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    EE: {
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        ru: {
            windowMessage:   'Не отображается безопасная страница PayPal в браузере? Мы поможем вам повторно загрузить окно, чтобы завершить покупку.  ',
            continueMessage: 'Продолжить'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    DK: {
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        da: {
            windowMessage:   'Kan du ikke se PayPals sikre browser? Vi hjælper dig med at genstarte vinduet, så du kan betale.',
            continueMessage: 'Fortsæt'
        }
    },
    CZ: {
        cs: {
            windowMessage:   'Nezobrazuje se vám bezpečný prohlížeč PayPal? Pomůžeme vám okno znovu otevřít, abyste mohli nákup dokončit.',
            continueMessage: 'Pokračovat'
        },
        zh: {
            windowMessage:   '没有找到安全的PayPal浏览器？我们将帮助您重启窗口以完成购物。  ',
            continueMessage: '继续'
        },
        fr: {
            windowMessage:   'Le navigateur sécurisé de PayPal n\'apparaît pas ? Nous allons vous aider à rouvrir la fenêtre pour finaliser votre achat.',
            continueMessage: 'Continuer'
        },
        es: {
            windowMessage:   '¿No ve el navegador seguro de PayPal? Abriremos la ventana nuevamente para que pueda concluir su compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    DE: {
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        de: {
            windowMessage:   'Sie sehen das sichere Browserfenster von PayPal nicht? Hier können Sie es wieder öffnen und Ihren Einkauf abschließen.',
            continueMessage: 'Weiter'
        }
    },
    CH: {
        fr: {
            windowMessage:   'Vous ne voyez pas le navigateur sécurisé PayPal ? Nous allons vous aider à relancer la fenêtre pour effectuer votre achat.  ',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        },
        de: {
            windowMessage:   'Sie sehen das sichere Browserfenster von PayPal nicht? Hier können Sie es wieder öffnen und Ihren Einkauf abschließen.',
            continueMessage: 'Weiter'
        }
    },
    CA: {
        fr: {
            windowMessage:   'Vous ne voyez pas le navigateur sécurisé de PayPal ? Nous vous aiderons à relancer la fenêtre afin d\'effectuer votre achat.  ',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you relaunch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    BE: {
        nl: {
            windowMessage:   'Ziet u de beveiligde PayPal-browser niet? We helpen u het venster opnieuw te openen om uw aankoop te voltooien.  ',
            continueMessage: 'Doorgaan'
        },
        fr: {
            windowMessage:   'Vous ne voyez pas le navigateur sécurisé PayPal ? Nous allons vous aider à relancer la fenêtre pour effectuer votre achat.  ',
            continueMessage: 'Continuer'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    BR: {
        pt: {
            windowMessage:   'Não está vendo o navegador seguro do PayPal? Ajudaremos você a reabrir a janela para concluir a compra.  ',
            continueMessage: 'Continuar'
        },
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We’ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    },
    AU: {
        en: {
            windowMessage:   'Don\'t see the secure PayPal browser? We\'ll help you re-launch the window to complete your purchase.  ',
            continueMessage: 'Continue'
        }
    }
};

export let containerContent = __TREE_SHAKE__

    ? {
        [__LOCALE__.__COUNTRY__]: {
            [__LOCALE__.__LANG__]: CONTAINER_CONTENT[__LOCALE__.__COUNTRY__][__LOCALE__.__LANG__]
        }
    }

    : CONTAINER_CONTENT;
