/* @flow */

import { FUNDING } from '@paypal/sdk-constants/src';

export const LOGGER_URL = '/xoplatform/logger/api/logger';
export const AUTH_API_URL = '/v1/oauth2/token';
export const ORDERS_API_URL = '/v2/checkout/orders';
export const PAYMENTS_API_URL = '/v1/payments/payment';
export const CREATE_SUBSCRIPTIONS_API_URL = '/v1/billing/subscriptions';
export const VALIDATE_PAYMENT_METHOD_API = 'validate-payment-method';

export const BASE_SMART_API_URL = '/smart/api';
export const SMART_API_URI = {
    AUTH:           `${ BASE_SMART_API_URL }/auth`,
    CHECKOUT:       `${ BASE_SMART_API_URL }/checkout`,
    ORDER:          `${ BASE_SMART_API_URL }/order`,
    PAYMENT:        `${ BASE_SMART_API_URL }/payment`,
    SUBSCRIPTION:   `${ BASE_SMART_API_URL }/billagmt/subscriptions`
};

export const GRAPHQL_URI = '/graphql';

export const WEB_CHECKOUT_URI = '/checkoutnow';

export const NATIVE_CHECKOUT_URI : { [ $Values<typeof FUNDING> ] : string } = {
    [ FUNDING.PAYPAL ]: '/smart/checkout/native',
    [ FUNDING.VENMO ]:  '/smart/checkout/venmo'
};

export const NATIVE_CHECKOUT_POPUP_URI : { [$Values<typeof FUNDING> ] : string } = {
    [ FUNDING.PAYPAL ]: '/smart/checkout/native/popup',
    [ FUNDING.VENMO ]:  '/smart/checkout/venmo/popup'
};


export const NATIVE_DETECTION_URL = 'http://127.0.0.1:8765/hello';

export const CLIENT_ID_PAYEE_NO_MATCH = [
    'Af3YaeRfoJGtncwLeiahT93xTYT0-wldEEaiGehhGspP333r6tADvHeVCwZPR022F4d0YQquv7Lik_PT',
    'AbHo6hBEDmCHulDhRMkCVk7FDed5zE1-mNo7SQvo_yxeLvGylM5mGh5IOjx0AV9sTHhHDjD4A443Dybb',
    'AcjM7hAZjUAqIgU0Lvzneb9-_rWs7qAEl6PoPVHtQV5PNmWBihQWsu_SglKO',
    'Af_pMiA6ikCtlsNB8dJW1oG1ZI7FirXbRU43rDRfq_i_iQAPbYsojeI9Q2VzZvD1u2wKEPuaokZaNWyC',
    'AQAZZuAP5V0b8Wzs1t3KJM3opK8ueK6Txnlm7pw6kMFHrcAdFogBw3pBmeNP-234aHAZ2BlHeijkU2Tt',
    'Aef8KpflK3t-pTjstogUtqzAuk1IRGHpkdBTxyTWeARwqXyuRrX5Uj-Bs6KdMwK1g8ZhitjzfJ5jh6K7',
    'ARcLSr40hevzVXTnnNpHochqg9lsyznO2UugwjyCpt4MPnAmxgyLGC2Ia7aufLH1jS8BhOIZBnXqhOfP',
    'AYiXLQVgLszolhHbiYAm2HZERgDF5BOPXG7i4m9BNsTTSdmWhVu2Np4_GqDJLrl5VA50VDAlMMpCMArb',
    'ARbpxmp0udlm2zBPu6bqW6PAMV-UfCTktgWFtJ0cy1rKQUUtIRffwg1A-i0wRyFg9BhbfZM3M6ci6czP',
    'AeHvO7dLYAlLLnkZWxCTvHgSBMoFRn-bu1Wy9kjEXZVb8wYZPRpEykxDhLQ0WjgUPQz_MeF1e1FnH4mT',
    'Abi2EEJv7o1v6GKAE1nNVgeNqBWLYXSiDoAKi-ADKU6uRPi_41GJEMr5rjZC8fuQxAC-MVEPYSfYsfzD',
    'AW9fGl1zpjGSB474VARpj8j0hyEzrwNY7WgJCtwStaVVYkiyixnX4Z3KSe9A0jPLOcKj_2B9lHon1nAR',
    'ARBlYB7bfFnpO5IgprEW0PqtBSZOn1Q0Jly-3r_IzMEU8sPq0fdNrk1D4JgHAitxDBxfuL6wDpDvTZgU',
    'AZNQsMt_Ho-GClAUCvZVuKyz-n5rRhZyEBL2yTTetPV-lTqQE2_4quG6-ADlBMZoAgnG-yccas62Hqg2'
];

export const ORDER_VALIDATION_WHITELIST = [
    'AWU8hQWR5S8ynvUCz0T-tt2uRPzt7-wcIp_clASLr3KrXNdKcr_iPzgNsk4s3sOG2EzgOyqpeuL9Lt2Q',
    'AW2HA2wTdlPiJYixm961rEhamyefXVV4Y5CxJnRJGT_AnXVZuWnneEFnnGpDeIUZaCbpz_kwtEjFwo8x',
    'AU0KZbJCXg9J5OJXJxrUFMaCAkMvvrk-8khEB4vLyq76klYl5RSVGNrX4qh_aERn3Wsx5Vcn2eCPQ1fo',
    'AUku7YwlQ9LckQ9jBEAoDTOW_l-VyzeS2ZLNS4-kWoEI0Xh5VEFEgda7KeU3Z-bRIcZ4YzkJ6kp4CIZA',
    'ATyGfjcN1hYSg34FNM2QFpih-UgIKxiE6nC_HR4ifq2auBHxlzm7eFTToF0-GayrwDSNgwDmTYfPNvYD',
    'ARa44QaubKRAeUZRlkhqkWUAilO7IGlS6qcHJ4RmG6aaDuCAi232yOjfDwWmGJL5rdjvhaA_oHLVo3_y',
    'AZqSMr_O6WtkSWvp2GF526yJjSyjZsnaqvmp99w2gNJHtKfOdzpnNJiwjTd_yLjdf-wt2DUtJzFw16Bq',
    'AbHo6hBEDmCHulDhRMkCVk7FDed5zE1-mNo7SQvo_yxeLvGylM5mGh5IOjx0AV9sTHhHDjD4A443Dybb',
    'AZ27S6mY7iw1toHmoVzye1XwCiOJo_uIMYJIDpUwlTsG2rxTXW8Sl3tjUEwsS0TWGIkEq7CG1zXLLvvK',
    'Af8k4y06mmyTM4JxdmDUK0PJBR314Yz_nWddC13y5rHawFRREVmueGa0b-MMHl5_jvo6bMM1d7DnM2Uj',
    'AaRz5Xo5rOOW8Pq0ofvoKD5fb48gaPrKknItbEc1k79KH6z3aPsS5oUfu0uWj7BMuEru5_6jvhjSyvRs',
    'Aa5QWJGciaqznqahG4ooXiL9FNZuqEcL-vhdCMrb-jIMNAFpiG1SxW1GMcPmS5pQoxrwsOmV2KtNpk1Y',
    'AfzuuqC32z4_opOaPcCOgB0P112SCvGoJZi-79Yj5WGNoddoDQf7gG_mbGl3tZYJB_XsZ1dHDDgzhkH7',
    'AQ6b-BBBspp77ZytI3Hj0FKpACemsrXhu0Gds7ubWAoKxHCW1o7RnV76wCe4',
    'AfFU1v8QcnRtUY5xRwxW6nZlwGscc0dmMfVQP9Ce3mqKRvqddGBHnx62WhKVcAMPALE9aR1kPeJfy4xz',
    'AXjQJ2vHhgpu7DYUrE1IerCOOp9y-d8dSIMEIkc49ckjO9M04AehA8qm5jm0FIV7kO3CEtzZ8e-dp8-2',
    'AYJqlLYWc7pJ-z3rUJBdHicjlxRg-sQUPytyCpvgPcpB4X3rKZlrmJq6pQRUZ0Pb_LCV1cvi4CLGTA9d',
    'AQA6JMmn0j1yvIhc2mh0QP5HedKSpEEYQuZjHgmaIRVVlvzDWJU2twyT8OklWyz8NhVNlsKReUElO_xa',
    'AT-LIFIee2HjafB1SJxyxiX8Bnpv-bAEJKNNDFduENR8a7xGvcQRb_5QxxDq_nVF8L3hkBpqnyVue4vt',
    'AYc6HFlcGY99sz6mzMNWT10vuo6l1qwzKjlKeZ_JQuL2tkUtbKrWwNZ3pcFHZJYmFk5cXK92OodadpX2',
    'AZ8UUzGLndt7BWxjD-NobN8gFAarZV7PNN-XfBIM7_n3oU3roq610ytrpCtL2ikSOT_HtW8-2aq0HgTc',
    'AdC8njZRff48qO32BRskthX85OP6eGdW_2pwbySJl0WSa3MRPWGxddYiYf0ig9hkTu6ppWLp4uQFf7Wc',
    'AVm6hkTgp2kObqwkPrO0KZIHeREs426g_yaq1IPsoSz5ij0vOGGkBcmfIAB7ddrhdzFvDiE4S7FjGG46',
    'AdCK4t9F8PiG-Lbbpu9ot8TJmzlt6JqEjSBw0r4DuZQ-h8g6bU_RazHGajCSLfTfVtobXHH5NWq7-07H',
    'AefZb6HGDKO-Seg-Y-T7n8JMAahIQPYbQVoQdd8JKZmF-r8wV_BT8YvY1wq_6HJ3QpiGhH1x9wTI-Qer',
    'AZvPeGIweYjl7UjrBplKks_ABRUW12UVxZy4dw8bU7yVLvx5AxpP_kGy5VpnL5eiaqjeyY9bcIwp5UMs',
    'Ab1VkGmr1COkjo_6COidM4aQw32eggx3FrwdBLe_49nQjZvsN6NGFeKCiMfvgl1424JCAMWbDIB84nM9',
    'AfKPyV410xcQNtx6rx0yWBp0mmovau9eb_YyiB9uPX_lnWmXvOsdKN9HRWmEcDwcp0qzp74u_NijYth1',
    'Ab2xNfs6Tl9v49jUupCCg8Av_KDTVb1JKovfA92DPRDqjIWDDOmir3bx3cY4qLmgPxuhXNIIYm7K2Y3g',
    'AdmFNVRKWUWMj4UyEomTd0CW2hHQFcY9qB31B8PbWZYwzykfRS74Jw4vRC-5W1dScVuRwwFoeQAxFNoj',
    'AcMnb-pPPgZGWeK6bIi6sixOzjzSQnLBX875cg7XCwbhG9Fc6kRUiN7_qjlYHOX2FZMDDCXYC2Go65LF',
    'AXbYLpelIUb8i9iaFeQKXt3DlWpLyC1dc3d8WOx7fBMvPny-lHueS7DnFZnfIeOiRukpum5ejF8UdSzx',
    'AU6945tSYM7aVoRjvIEiFE4uLYn3WWXRAt_DbqbX0BCUDVfLdL_NB85NaJYRqkrRiU41pUwwom2E_47w',
    'AeLMaMHVVX61YKoNlLqoQ_1zX6MS3NBjvFZNBsrrOCgeZIeqoVwXWoVz681aMaXzSXkx2Q4CB2DzdxVV',
    'AU2UgmLki6ZfaDt27a7WM5J73IVi36nQva7oZGs5onuWbGyo1dqDf9ruVn-cgfjyNWYQvUzk54wOLgTh',
    'AaBPZpGg89TAPOa2VMaKwINvjpDh-EE7a-mZQ1vV95ZoEIz65ducH23QeIL1vPUFuuRGB2goniC9KrbB',
    'AbarfFDHDheK7p4Z-w7JZ8rXoPBWSALu91ZJXoRX-zGz3Y6eqFSzum4OyTxn7ZJXELy_tl1ZLimrzgyn',
    'AT4f7iaYeBKXSFR_e27h7F4z7h73L3-lMtH38jZh8KDQ5xp9NoTGpiz1oix4B69xiT1uFuBOI0r6_SLo',
    'ATWcvHcxfe1gfQ-znE_Ua6dVvX7fMRsdoBy1MmC_ApxPcG3rGZLDFoAkOmtJzrdRDFeu0EhXIAu17vJh',
    'AeV96uDGtI2SJMobKDHpR_IEhPD6NJG379LQHeFaCe_-GObH5rRCuP6-AWCarF2gh7dxh-si_uaWSxlu',
    'ASgMJnHCefNb23pO1tmCqWhvwT5D-opcT8W0TW2WeZXEnDw22r7epTCrSoNjKc8O4VlDLhP4oLEYyOHV',
    'AeGtpFEgJWl8EKAwx-jVRGZRy8fBYlZPG2cYL-kDJmKVv0o3tU3lOJNhzWMGjUdubmqsUtTcjyFzrsk2',
    'AUQRtcEq9z5DHLxjiSz3rwKgB1z-O-Df8nzNU2aKYxQbntIDV7rFiHGQrISElMo1JJR5N8sYpzqkq8Dg',
    'Aee7fyLlCExLFFB1Cs8eco2PsnVcNMYhj5KtFTxmmHLPGp3y2i_HyooUQtRCjKjN_445-7qjnoyR8r4w',
    'AfxJnj-1UN_l7r46FC27ufpCzt4ymiF7ctpexNeEH8hkQwJloFB5comni5SxflMYOkWnMXWTtVRzlbfZ',
    'ASCS3-SkSood0ZR2Ik8EtFZrI9MOKdEhptnQHypXbCk_z0wSICf6ElQ-ge5FACcGmtjKcV6h-xOWBqF2',
    'AdxKNW6Rvn2NyGD6r9N7C13nh9lKZnOJ_KaNAl0Nlj_csc_wmJnm3MgpyHOhugPhMChinj2Rfsr9mpDv',
    'AR5XPd0OP8aXFu_aHyBK9pP097vBH62c6afOj6sjH7KSB0CfNKZ6QIR_27rsKCZYmmCkRgjXePpTq01p',
    'AYb7yEHXW3_n24dkjn29InoA6dCPEDiKajhbrCwbIJTQfpGuzh8a5FS4MoyXyFsiK4vhgeWxtg6zuADW',
    'Afo1LVZtoaCSq5HI_naZpUMjB2C0_OiB6nNHlGaNe7jwBTunPXnbodmCr4ZTtpL3WT-4RkNG6DQFvX03',
    'AR67hODdVoxlUsOUT8BoHSYiOJ15WDQg90nkqwRP_14vVrEb1a3S4_caxBc-w51TV3AcMyACzYREtXrH',
    'AZxGGpjzsdT8yXYqFS_kp-Ai6E_7EwTJ03AoLiJj6z5TBXa6GZW5h2ZRfi5-K4Y6oLyrF8FpJpPqd5xY',
    'AUq0DPexx9Wb84WP3jKi9r2WH9xejePjH4KAsOdRj-q4f5PfwMZ_KpVhLvsJyo3lhpzqhOJEkqFspgGN',
    'AXOplj0iurFjzACM1RuuWcDRlVubsIQe7ry8SRAQg3LRVDyZbAmxOs2snzLSvNJhCtNNFANLf0cKguLe',
    'AUwoRlv3iZ3jt3o3hhcft_tZ5g6tvefEpjCf9YNGeH7q8p_WraleitkKfLnWIs8HLpzalgRA5AMT0BYO',
    'AQi-8_4bMO1BqBPldsz4FyybrZMDAeQO_uqEXfZsxgZGOrMbYl-pO7sKTnQpdsNxEgM-xa5HodTHXDQg',
    'AajSVnIsGJdD3fKO76SmA8HxLs9flPRpdLhp-KTM34I2ZZ12WqfLZ2S3zmbzwbwJOMi5AmS96jHXppPu',
    'Ady0oUeIgU24A60CEhog6THKv4rO0-58E1C6CXS3mfgBjonkj_fh6hYPP1_8qVzioVPhbX8JRbyeHV_1',
    'AW7mu9kZkNQnih14Ugvi7DmBpdouGHi8yv6DQHScKfz1pvNh7miD60WrQaf_sRQFbya9pln1JEhtx58F',
    'AejlsIlg_KjKjmLKqxJqFIAwn3ZP02emx41Z2It4IfirQ-nNgZgzWk1CU-Q1QDbYUXjWoYJZ4dq1S2pK',
    'AVfy3rhipHfrcpAARabvSbVcG8se_5Ye4Yez65UlXA2zNQAhFLwERbc7sFooSjc1pRkQDvpWM_-6UlQI',
    'AZNGPAzuZGI56_rR2d6Qt5Pg9p0EP0SlgqOLF1hJ-Jhyl7Fc4KLsW3WtUaQBsq7qEv-VcMfH3yRxckw_',
    'AdEIkRwwggl9QpNGdXzXlT6dPT5UcxS5G3pzdimct2fQlfv2e6JC-ZoR2wEaqy1VRSYN5zYATl04lQPJ',
    'AV2UhIeUzG0N23-zt7_KBQ3OhYq0ZurLSvm75NuFWl2iMtNiZr0k78AvPweLerv8DcdSENAAPy_qVHdc',
    'AX8Pb-sAgAFp_gHsk2dQX30ABfcvMabRjPRJ97IqRt9LWWGn6bsNiU1kYqMWBkRim_ONg1XnrOq9HycV',
    'AQkboqLaGeUqU-UcsupDWhGINLljqGPvy1pm6JMp1EQMcuz--sOwhOp20s0H4y1b_X6EYgUYmwl3_QbI',
    'AVxk36f8VzzEEbhmhFRdeWR0s6kjHJB88V3q1VCDDWO-vUHkpHDx5a3c5KBiSwrEnodgmIDyVrySo19W',
    'AbS9SBIomzAqKCnZgxxI922RWH4sRjcXQVkzbQoxwGh1yLU5K3NyBiIksj1qy-cgI0UTRaKEENdVA3UG',
    'Aeof7I__CpI_sDTMc0sabPC2AtcDFSWYTA-AuSX35LgSdK_nveXR1zNGPzWb5d-EkXP8EaHFvpTXOt_W',
    'AdFNiM95Vg_Xslrjr1PY-bUWGKHheQsGWo46dXPnSWfkGWhOpGqCH7SOivcQU1Bw968KwMiYIdOrC9C8',
    'AVQfN-d4gHcYcLlNAV5jcn17hiXLr5-yktBxwl_oviEHekLjF_VtiWEHzpc7qs8VBooeZ-9HNkIaZC8c',
    'AWZIhxjocZGX-AfhRrmStAUGypQjzWEQEnLV670Qui0ZdjBH2xiXlCEpnXbaHxxwV011ekhRWt6kWQzy',
    'AYJNkqXTB-LbDWY-geBeteUhFckZhmKUXoQm1EKrHFs_jT52-Xs9HrM4yZe19i65TLy-KTPSZrbQWL4d',
    'AaJdlGSlPSHCXuUsoizK7BX1gQGk-LXzvuTQuISXPz5aJf07UXhnNZBXHnZ6PBIGgPSLz_ezOW_JMWI5',
    'Ads-AIlYmzcupU4h7aNwYtZCoxFhsytxkGRc449oi4KTs8JxxM32te5WnObdQ63roSR6_ap_RX0o-TyU',
    'AezPnqbw-EqAB-3QxkcQzOTFu_BZB4p9ELEmDvBRIfNYi2MktC4OR3ls8-kfoRucnB7oQoZV_63a09RE',
    'ATqRzjL44zV0uvmI-I8UXaA7aGN5UgXaIYvPnXot4EhMOFhL02PqzVX5vFPJ3I7Q7ezYGDluKsYJbTlb',
    'AQb_uhCxkswoDV-msDRSEvBrENNqphJo-cGxMJ7nUa9hSArJhefMfdMvtVRN065kc4e2jp8rJ0X8yQrz',
    'AcxzPl0cMHMyjC5D4uMaQZ0oqjNEGNItIbUgeokdAXzFs9Tr2uYJEe4l76DUh4HnX0Bz3XSYR0Pnwn3q',
    'AbBeFZDAUYMZQ-EZMFQhx3K3_vvX2tU_45Lq6G4PrAzgP3gp6UfyaFVEg7DKo0diRDacyhcJO5Bpxij3',
    'AR337Je4oqSvRgX7HjX2Sv7M1VsK7Lme0WBssuEwW66bkphUUWw-JjjVvHNW4ttTdikGHraEBfD3pKcZ',
    'AXwYaDB1wXCQLJsQwaJhpckEFdZmuZMohfwEKH1vTm0Q5HJTw3t_Zqllc0unozCPPR19Ahlq08vNsPMw',
    'Af8uKf29kbmHdbkYF7rCs4cAwupeZQZ42HBlOTv8C1cPsQDleyL-KibrX2rI_qxUfPXgS-AmUcL2EkCn',
    'ARqhdSV3eoTacPNpD0m-xMnGuaYsbdCi8xCtAM_NKRqiZ_Kj2GcmrnpKRJOimbS4Dqg2WBlMZvM_a198',
    'ATdvBkuCmZU0bTUYpr6UZH43vK5293QKgxGkPSYgfr5zfib2PbHNeYI_NSuhsJkiGiQqCAMLkx4lSffx',
    'AZHX5-mWu26D4D6Ocw_8GxZTsvGtlFCm_clftgJLP0eixyZ0rTbVBu-T5RpTaw2JYXK1rzxIibE2wUcm',
    'AUYwY3jZaHqT-hh5Ogpy1WkNunjk_AWi9pjdm21kb5GFOyJUnquvZeUx1jPHLYSwS1l_pHvWudWZUocs',
    'AWkpAaV7rEJCfTdsnAZ11aisQ_SFD1MPCt8ZLZXRga7acQT2q3UffhOPc3ei5hoW--H3rXVTlIFnn1jM',
    'AbQ3QKqGPFeBWir6QK2na3JAFsMp9scbSOeRi0_15AA5q6XMi4hTRuO4Tmme6jmAi3SvRY4PTPDEqY7V',
    'ASD3LOuSg39EBl3Pd9PEZU6GMkA-yIJQhohSF4owo2fL2eelnrgRYQKYdbvtYI5O3IDp1Pw5iqEv5Hbe',
    'AVRFLjMTInsB9StyuRZltkDbN4Bhi-QiXcIeqPO6YPU7GSOLR3i8F9f6pVX38_EkmDhIpgXM-D4GnPdO',
    'AUoMvJA_FdhFwJEVL6Ri7YhdU2nrPQUoags0yhV22_17ZgWmfvh5Zqyyxpsba-dq-LH6w0tuIuEQJ2bp'
];

export const SANDBOX_ORDER_VALIDATION_WHITELIST = [
    'AcFUr3vhIePYLOXXuZzdvFL5th99W0Uygya9lqfjN3XCx-W2dGlr6A9mqiIZAHAMng1g0_haL2LitLAl',
    'ASmWKJfGIEy4BmvwWA3PpAX-uOdz0EYCQ89Y-oLww8LgaqqHtXEcB4dfxr88kmcp3no-efNznSFDcVjg'
];


export const FIREBASE_SCRIPTS = {
    APP:      'https://www.paypalobjects.com/checkout/js/lib/firebase-app.js',
    AUTH:     'https://www.paypalobjects.com/checkout/js/lib/firebase-auth.js',
    DATABASE: 'https://www.paypalobjects.com/checkout/js/lib/firebase-database.js'
};

export const ENABLE_PAYMENT_API = false;
