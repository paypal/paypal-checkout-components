/* @flow weak */
/* eslint max-lines: 0 */

import { ENV, COUNTRY, LANG } from '../constants';

function getDefaultEnv() : $Values<typeof ENV> {
    if (__TEST__) {
        return ENV.TEST;
    }

    if (typeof window === 'undefined' || typeof window.location === 'undefined') {
        return ENV.PRODUCTION;
    }

    if (window.location.host.indexOf('localhost.paypal.com') !== -1) {
        return ENV.LOCAL;
    }

    if (window.location.host.indexOf('qa.paypal.com') !== -1) {
        return ENV.STAGE;
    }

    if (window.location.host.indexOf('sandbox.paypal.com') !== -1) {
        return ENV.SANDBOX;
    }

    return ENV.PRODUCTION;
}

export let config = {

    scriptUrl: __TEST__
        ? `//${ window.location.host }/base/src/load.js`
        : `//www.paypalobjects.com/api/${ __FILE_NAME__ }`,

    // eslint-disable-next-line security/detect-unsafe-regex
    paypal_domain_regex: /^(https?|mock):\/\/[a-zA-Z0-9_.-]+\.paypal\.com(:\d+)?$/,

    version: __PAYPAL_CHECKOUT__.__MINOR_VERSION__,

    cors: true,

    env: getDefaultEnv(),

    state: 'checkoutjs',

    locale: {
        country: COUNTRY.US,
        lang:    LANG.EN
    },

    stage:       'msmaster',
    stageDomain: 'qa.paypal.com',

    get stageUrl() : string {
        return `${ config.stage }.${ config.stageDomain }`;
    },

    get apiStageUrl() : string {
        return `${ config.apiStage }.${ config.stageDomain }`;
    },

    get localhostUrl() : string {
        return `http://localhost.paypal.com:${ config.ports.default }`;
    },

    set localhostUrl(val) {
        delete this.localhostUrl;
        this.localhostUrl = val;
    },

    merchantID: '',

    logLevel: __PAYPAL_CHECKOUT__.__DEFAULT_LOG_LEVEL__,

    throttles: {
        v4_mobile_device: 0
    },

    domain_settings: {
        'walmart.com': {
            ie_full_page:                    false,
            allow_full_page_fallback:        true,
            memoize_payment:                 true,
            force_bridge:                    true,
            log_authorize:                   true
        },

        'ulta.com': {
            disable_venmo: true
        },

        'barnesandnoble.com': {
            disable_venmo: true
        },

        'bn.com': {
            disable_venmo: true
        },

        'agoratix.com': {
            disable_venmo: true
        },

        'tractorsupply.com': {
            disable_venmo: true
        },

        'etsy.com': {
            ie_full_page:                    false,
            allow_full_page_fallback:        true,
            memoize_payment:                 true,
            force_bridge:                    true,
            log_authorize:                   true
        },

        'ticketmaster.com': {
            disable_venmo: true
        },

        'livenation.com': {
            disable_venmo: true
        },

        'frontgatetickets.com': {
            disable_venmo: true
        },

        'williams-sonoma.com': {
            disable_venmo: true
        },

        'westelm.com': {
            disable_venmo: true
        },

        'markandgraham.com': {
            disable_venmo: true
        },

        'potterybarn.com': {
            disable_venmo: true
        },

        'potterybarnkids.com': {
            disable_venmo: true
        },

        'pbteen.com': {
            disable_venmo: true
        },

        'beallsflorida.com': {
            disable_venmo: true
        },

        'therealreal.com': {
            disable_venmo: true
        },

        'liveaquaria.com': {
            disable_venmo: true
        },

        'drsfostersmith.com': {
            disable_venmo: true
        },

        'boxed.com': {
            disable_venmo: true
        },

        'bevisible.com': {
            disable_venmo: true
        },

        'moeller.org': {
            disable_venmo: true
        },

        'searshometownstores.com': {
            disable_venmo: true
        },

        'searshardwarestores.com': {
            disable_venmo: true
        },

        'searshomeapplianceshowroom.com': {
            disable_venmo: true
        },

        'barkshop.com': {
            disable_venmo: true
        },

        'vividseats.com': {
            disable_venmo: true
        },

        'getcargo.today': {
            disable_venmo: true
        },

        'smartdestinations.com': {
            disable_venmo: true
        },

        'philadelphiapass.com': {
            disable_venmo: true
        },

        'thesydneypass.com': {
            disable_venmo: true
        },

        '3secondlash.com': {
            disable_venmo: true
        },

        'newyorkpass.com': {
            disable_venmo: true
        },

        'dndbeyond.com': {
            disable_venmo: true
        },

        'app.zapbuy.it': {
            disable_venmo: true
        },

        'gamersaloon.com': {
            disable_venmo: true
        },

        '1800contacts.com': {
            disable_venmo: true
        },

        'shopchatters.ca': {
            disable_venmo: true
        },

        'shopguyswin.ca': {
            disable_venmo: true
        },

        'jjill.com': {
            disable_venmo: true
        },

        'qvc.com': {
            disable_venmo: true
        },

        'stelladot.com': {
            disable_venmo: true
        },

        'keepcollective.com': {
            disable_venmo: true
        },

        'everskin.com': {
            disable_venmo: true
        },

        'zulily.com': {
            disable_venmo: true
        },

        'freshly.com': {
            disable_venmo: true
        },

        'buypeticare.com': {
            disable_venmo: true
        },

        'getownzone.com': {
            disable_venmo: true
        },

        'uncommongoods.com': {
            disable_venmo: true
        },

        'onegold.com': {
            disable_venmo: true
        },

        'universitytees.com': {
            disable_venmo: true
        },

        'revolve.com': {
            disable_venmo: true
        },

        'functionofbeauty.com': {
            disable_venmo: true
        },

        'givebutter.com': {
            disable_venmo: true
        },

        'hausmart.com': {
            disable_venmo: true
        },

        'derbyjackpot.com': {
            disable_venmo: true
        },

        'ancestry.com': {
            disable_venmo: true
        },

        'boats.net': {
            disable_venmo: true
        },

        'partzilla.com': {
            disable_venmo: true
        },

        'firedog.com': {
            disable_venmo: true
        },

        'chick-fil-a.com': {
            disable_venmo: true
        },

        'roku.com': {
            disable_venmo: true
        },

        'barkbox.com': {
            disable_venmo: true
        },

        'neimanmarcus.com': {
            disable_venmo: true
        },

        'lastcall.com': {
            disable_venmo: true
        },

        'horchow.com': {
            disable_venmo: true
        },

        'bergdorfgoodman.com': {
            disable_venmo: true
        },

        'fwrd.com': {
            disable_venmo: true
        },

        'plunderdesign.com': {
            disable_venmo: true
        },

        'stitchfix.com': {
            disable_venmo: true
        },

        'revzilla.com': {
            disable_venmo: true
        },

        'cyclegear.com': {
            disable_venmo: true
        },

        'chegg.com': {
            disable_venmo: true
        },

        'youniqueproducts.com': {
            disable_venmo: true
        },

        'archives.com': {
            disable_venmo: true
        },

        'hautelook.com': {
            disable_venmo: true
        },

        'nordstromrack.com': {
            disable_venmo: true
        },

        'motherhoodcanada.ca': {
            disable_venmo: true
        },

        'atomtickets.com': {
            disable_venmo: true
        },

        'trademore.com': {
            disable_venmo: true
        },

        'lasheaseoffer.com': {
            disable_venmo: true
        },

        'rookie.paypalsixthman.com': {
            disable_venmo: true
        },

        '1800Contacts.com': {
            disable_venmo: true
        },

        'hulu.com': {
            disable_venmo: true
        },

        'grubhub.com': {
            disable_venmo: true
        },

        'eat24.com': {
            disable_venmo: true
        },

        'seamless.com': {
            disable_venmo: true
        }
    },

    creditTestDomains: [ 'bluesuncorp.co.uk', 'nationsphotolab.com', 'plexusworldwide.com', 'nshss.org', 'bissell.com', 'mobstub.com', 'vuoriclothing.com', 'tape4backup.com', 'avivamiento.com', 'rhododendron.org', 'whiterabbitjapan.com', 'atsracing.net', 'thehilltopgallery.com', 'weedtraqr.com', 'worldpantry.com', 'ciraconnect.com', 'mymalls.com', 'prowinch.com', 'zodiacpoolsystems.com', 'everlywell.com', 'candlewarmers.com', 'chop.edu', 'incruises.com', 'flikn.com', 'didforsale.com', 'mcc.org', 'sygu.net', 'merchbar.com', 'eduinconline.com', 'us.livebetterwith.com', 'bakemeawish.com', 'judolaunch.com', 'eventcartel.com', 'tapatalk.com', 'telescope.com', 'covenant.edu', 'aquatruwater.com', 'spingo.com', 'usu.edu', 'getcelerity.com', 'brandless.com', 'saberigniter.com', 'euromodeltrains.com', 'gofasttrader.com', 'megamodzplanet.com', 'draftanalyzer.com', 'lovewithoutboundaries.com', 'filterpop.com', 'seekverify.com', 'photoandgo.com', 'sightseeingpass.com', 'bigoanddukes.com', 'thethirstyduck.com', 'thebrushguys.com', '907delivery.com', 'mauisails.com', 'drive.net', 'channelmax.net', 'modernrebelco.com', 'enchanteddiamonds.com', 'ibabbleon.com', 'fullgenomes.com', 'conn-comp.com', 'wingware.com', 'paradigmgoods.com', 'theneptunegroup.com', 'kidzartworks.com', 'unirealm.com', 'ncfarmsinc.com', 'oneofakindantiques.com', 'servers4less.com', 'stumpthespread.com', 'marketwagon.com', 'monsterhouseplans.com', 'canterburychoral.org', 'teacupnordic.org', 'thethirstyduck.com', 'medialoot.com', 'theartistunion.com', 'yourglamourzone.com', 'breckstables.com', 'mackephotography.com', 'dsaj.org', 'massluminosity.com', 'tespa.org', 'versatilearts.net', 'yecup.org', 'divinebusinessmanagement.com', 'captivatebeautyservices.com', 'class4me.com', 'wcsonlineuniversity.com', 'pvplive.com', 'kyneteks.com', 'rare-paper.com', 'bpg.bpgsim.biz', 'geodegallery.com', 'way.com', 'kringle.com', 'talentedmrsalas.ph', 'litcharts.com', 'purpletreephotography.com', 'apache.org', 'neopackage.com', 'globaldance.tv', 'integral.studio', 'airdoctorpro.com', 'ivoryandiron.com', 'yuengling.com', 'averysbranchfarms.com', 'amberreinink.com', 'skinnymechocolate.com', 'bmbl.net', 'ncwatercolor.net', 'astrograph.com', 'localadventures.mx', 'ripcurl.com', 'worldfootbrakechallenge.com', 'shespeakssales.com', 'obrienguitars.com', 'jadenikkolephoto.com', 'americavoice.com', 'cassiexie.com', 'aamastateconvention.org', 'rellesflorist.com', 'passionnobby.com', 'bodybyheidi.com', 'roqos.com', 'prijector.com', 'maryswanson.net', 'tsghobbies.com', 'erinlaytonphotography.com', 'darter.org', 'fountainpenhospital.com', 'myzestfullife.com', 'pcog.org', 'alisabethdesigns.com', 'katiemathisphoto.com', 'strictlybellaphotography.com', 'maptools.com', 'sites.google.com', 'gallerr.com', 'southfloridatrikke.com', 'caviar.tv', 'mintingmasters.com', 'prospectorsguild.com', 'inktale.com', 'prettygirlgoods.com', 'laceycahill.com', 'daniellenowak.com', 't212.org', 'scmsinc.com', 'babypaloozanc.com', 'tetrisonline.com', 'grdd.net', 'cdspg.info', 'airshipapparel.com', 'waft.com', 'extendpets.com', 'supplyhub.com', 'hlbsusa.com', 'jaderollerbeauty.com', 'theparentingjunkie.com', 'schagringas.com', 'yourscribemate.com', 'sportscollectibles.com', 'thedivinenoise.com', 'hometeamsonline.com', 'trademarkpress.com', 'destinationenglish.us', 'jacquesflowers.com', 'aliszhatchphotography.com', 'rusticfoundry.com', 'ahhhmassage.net', 'frezzor.com', 'mandelininc.com', 'kayleejackson.com', 'monkinstitute.org', 'eddiebsbbq.com', 'morningstarmediaservices.com', 'kinevative.com', 'orivet.com', 'digitalprinthouse.net', 'dynamicgenius.com', 'allpartsusa.com', 'flowersbydavid.net', 'nwvoices.org', 'leaptrade.com', 'tulsaschoolpics.com', 'alioth.io', 'windowflair.com', 'vitcom.net', 'simplybeautifulfashions.com', 'christinabenton.com', 'fromthedaughter.com', 'hometowngraphics.net', 'fibanalysis.com', 'creativejobscentral.com', 'sandbox.gg', 'jt-digitalmedia.com', 'kodable.com', 'birthingstone.com', 'taranicholephoto.com', 'hillyfieldsflorist.com', 'charitynoelphoto.com', 'auxdelicesfoods.com', 'terilynnphotography.com', 'folieadeuxevents.com', 'karensfloral.com', 'montgomerydiveclub.com', 'rainbowplastics.com', 'confettionthedancefloor.com', 'vomozmedia.com', 'neatmod.com', 'getnaturafled.com', 'callingpost.com', 'iamfamily.org', 'pedigreeonline.com', 'typeboost.io', 'in-n-outpetdoor.com', 'nerdstockgc.com', 'keiadmin.com', 'createdbykaui.com', 'aikophoto.com', 'lonestar.ink', 'stlfurs.com', 'treasurelistings.com', 'thecubicle.us', 'redclaypaper.com', 'blushhousemedia.com', 'documentsanddesigns.com', 'whitneyleighphotography.shootproof.com', 'amaryllisday.com', 'hermanproav.com', 'felicemedia.com', 'withloveplacenta.com', 'store.brgadgets.co', 'klowephoto.com', 'spenceraustinconsulting.com', 'sno-eagles.org', 'dsatallahassee.org', 'bakupages.com', 'neswc.com', 'josiebrooksphotography.com', 'brisksale.com', 'legalwhoosh.com', 'jasmineeaster.com', 'swatstudios.com', 'facebook.com', 'shakershell.com', 'alexiswinslow.com', 'mixeddimensions.com', 'sweetpproductions.com', 'lbeaphotography.com', 'otlseatfillers.com', 'jdtickets.com', 'catholicar.com', 'masque.com', 'smalltownstudio.net', 'goherbalife.com', 'itzyourz.com', 'magazinespeedloader.com', 'dreammachines.io', 'dallasdieteticalliance.org', 'http:', 'medair.org', 'unbridledambition.com', 'sarasprints.com', 'wiperecord.com', 'showmyrabbit.com', 'cctrendsshop.com', 'rachelalessandra.com', 'otherworld-apothecary.com', 'melissaannphoto.com', 'girlceo.co', 'seasidemexico.com', 'telosid.com', 'instin.com', 'marinecorpsmustang.org', 'lancityconnect.com', 'hps1.org', 'karenware.com', 'livecurriculum.com', 'spellingstars.com', 'vektorfootball.com', 'zaltv.com', 'nebraskamayflower.org', 'ethiopianspices.com', 'immitranslate.com', 'rafaelmagic.com.com', 'bahc1.org', 'newenamel.com', 'bhchp.org', 'buybulkamerica.com', 'sourcepoint.com', 'squarestripsports.com', 'wix.com', 'wilderootsphotography.com', 'goodsalt.com', 'systemongrid.com', 'designmil.org', 'freshtrendhq.com', 'valisimofashions.com', 'buyneatly.com', 'getbeauty.us', 'intellimidia.com' ],

    apmTestDomains: [ 'agsm.it', 'ls-felgendesign.de', 'domecgo.com', 'raffaeleinghilterra.it', 'hills4me.com', 'anastasis.it', 'liberidallavoro.org', 'lgancce.com', 'fiat.com', 'amnesty.de', 'raftingcenter.it', 'myrabona.it', 'firabarcelona.com', 'elidentsrl.it', 'sprayplanet.es', 'cutipol.pt', 'newslist.it', 'bamboomt2.eu', 'gisa.net', 'italialaser.org', 'hydeofficialstore.com', 'huber-verlag.de', 'joomlacontenteditor.net', 'kletterzentrum-innsbruck.at', 'knobmusiciandesign.com', 'shipstage.com', 'whatsmonitor.com', 'napoleonx.ai', 'activitiesbookingsystem.com', 'spider-slacklines.com', 'sononato.it', 'alpi4000.it', 'penimaster.de', 'sportbionier.com', 'bioseme.it', 'ilpaninotondo.it', 'meyer-menue.de', 'uni-heidelberg.de', 'cameo.it', 'pasteleriabuenavista.com', 'wuv.de', 'papacheck.de', 'traderlink.com', 'agcalabrese.it', 'smatchfe.club', 'sarastro-stauden.com', 'vandenberg-berlin.com', 't-shirtprinting.it', 'raftingrepublic.com', 'cityspeeddating.at', 'euroval.com', 'albero-dellavita.it', 'mediumelisa.it', 'inkmaster.it', 'run-healthy.com', 'cna.it', 'mufight2.com', 'louvardgame.be', 'pruefungsdoc.de', 'europublishing.it', 'edaiperiodici.it', 'paypal-checkout.herokuapp.com', 'day.it', 'delinero.de', 'unicocampania.it', 'blumediterraneosas.com', 'rustv.it', 'geldverstehen.de', 'skiclubfossoasd.it', 'panorama-restaurant-stuttgart.de', 'movember.com', 'ombrellibolero.it', 'devoto-oli.it', 'el-teatro.de', 'ittshop.com', 'team-f.de', 'ferien.events', 'newnailssystem.com', 'softwarevenere.com', 'stikid.com', 'evocoach.it', 'caffepiansa.com', 'epsoprep.com', 'brickowl.com', 'one28racing.com', 'chogusto.com', 'centrostudiliberale.it', 'biotech-shop.nl', 'knightonline-myko.net', 'rad-germany.de', 'damascus-store.com', 'valkhair.nl', 'tu-darmstadt.de', 'lemediatv.fr', 'mondoevacanze.it', 'golfinthesun.org', 'altinotravel.gr', 'nsk.si', 'humanhuman.com', 'conento.com', 'encuentratupsicologo.com', 'onlainez.net', 'bp-tools.de', 'bestrongforkids.de', 'cloudboxes.io', 'creatone.de', 'nethserver.com', 'kulturstiftung-koelnerdom.de', 'ixso.eu', 'modulus.gr', 'aerbrava.com', 'allgrass.net', 'artfloral.org', 'studyclix.ie', 'esthergarciaboutique.com', 'abookforthat.com', 'aurarium.ch', 'tippevent.de', 'musicspoon.io', 'h10hotels.com', 'frizzoshopping.com', 'stargift.ro', 'svojtka.sk', 'salvadori.me', 'sfmc.eu', 'parsifalpark.it', 'exilux.de', 'brothausmoberg.com', 'opificiografico.com', 'lalibertadivolare.it', 'airportfreewifi.it', 'diemagnetisten.de', 'shbook.it', 'vallandry-sports.com', 'crowdcoinage.com', 'dresscodeboutique.fr', 'talhita.it', 'corticle.com', 'anymator.de', 'legalizer.it', 'handmadefantasyworld.com', '1001-sushi-bordeaux.com', 'elarconte.com', 'sushiathome.pt', 'associazionecest.it', 'traduzioni-legalizzate.it', 'janvas.com', 'bluemeusb.nl', 'lacala.es', 'speironcompany.com', 'flam-racing.fr', '1thebrand.com', 'kidooland.com', 'beneathmysins.com', 'linelab.eu', 'afroonatural.com', 'azurewebsites.net', 'munich-ski-shuttle.com', 'euroservizi2012.it', 'radiostim.com', 'cbibikia.com', 'nadur8k.com', 'custom-hookah.de', 'imexlicensing.com', 'belts-parma.it', 'generated4u.com', 'pilarsantisteban.com', 'consulenzeagroalimentari.it', 'lavilladeipini.com', 'burgershacklennep.de', 'vmlens.com', 'xoring.com', 'moto4.it', 'parospark.com', 'commentme.com', 'antoniodalessandro.it', 'kinarecords.com', 'bybus.pt', 'parquecerdeira.com', 'cineclaqueta.com', 'saddolls.net', 'mydamart.fr', 'rfbnet.nl', 'netsons.org', 'rebrickable.com', 'portodoavesso.com', 'leobridge.net', 'mikros.co', 'bekinky.net', 'pix4u.one', 'smtperformances.fr', 'siiturista.it', 'gorrasbebe.es', 'cbd-laden.at', 'tobiaswaelde.de', 'veneziaradiotv.it', 'sopimuspohja.com', 'cristianalopes.ddns.net', 'saliyafoundation.de', 'robertocosentino.it', 'billy-white.de', 'johndixt.it', 'alexmas.cloud', 'things-to-do-in-gran-canaria.com', 'rroseselavy.it', 'paradigmpalace.com', 'chardez.be', 'online-rechnungen.de', 'vip-urlaub.de', 'lyrau.com', 'perfectiptv3006.000webhostapp.com', 'seminarsincyprus.com', 'snapandprint.com', 'le-heron.net', 'need4tech.gr', 'eurolamps.eu', 'paygety.ee', 'gestionaliprosoft.it', 'decoindustriel.fr', 'acmo.corsica', 'slovakforaday.com', 'vhlave.sk', 'hughmcgovernwriting.com', 'nowgaming.fr', 'divecentercorralejo.com', 'mobile.de', 'skebby.it' ],

    customCountry: false,

    SUPPORTED_BROWSERS: {
        msie:           '11',
        firefox:        '30',
        chrome:         '27',
        safari:         '7',
        opera:          '16',
        msedge:         '12',
        samsungBrowser: '2.1',
        silk:           '59.3',
        ucbrowser:      '10.0.0.488',
        vivaldi:        '1.91'
    },

    session_uid_lifetime: 5 * 60 * 1000,

    _apiStage: '',

    get apiStage() : string {
        return config._apiStage || config.stage;
    },

    set apiStage(value) {
        config._apiStage = value;
    },

    ports: {
        default:  8000,
        button:   8000,
        checkout: 8000,
        guest:    8001,
        altpay:   3000
    },

    get paypalUrls() : Object {
        return {
            [ ENV.LOCAL ]:      config.localhostUrl,
            [ ENV.STAGE ]:      `https://www.${ config.stageUrl }`,
            [ ENV.SANDBOX ]:    `https://www.sandbox.paypal.com`,
            [ ENV.PRODUCTION ]: `https://www.paypal.com`,
            [ ENV.TEST ]:       `${ window.location.protocol }//${ window.location.host }`,
            [ ENV.DEMO ]:       `${ window.location.protocol }//localhost.paypal.com:${ window.location.port }`
        };
    },

    get paypalDomains() : Object {
        return {
            [ ENV.LOCAL ]:      /^https?:\/\/.*\.paypal\.com:?\d*$/,
            [ ENV.STAGE ]:      `https://www.${ config.stageUrl }`,
            [ ENV.SANDBOX ]:    `https://www.sandbox.paypal.com`,
            [ ENV.PRODUCTION ]: `https://www.paypal.com`,
            [ ENV.TEST ]:       `mock://www.paypal.com`,
            [ ENV.DEMO ]:       `${ window.location.protocol }//localhost.paypal.com:${ window.location.port }`
        };
    },

    get wwwApiUrls() : Object {
        return {
            [ ENV.LOCAL ]:      `https://www.${ config.stageUrl }`,
            [ ENV.STAGE ]:      `https://www.${ config.stageUrl }`,
            [ ENV.SANDBOX ]:    `https://www.sandbox.paypal.com`,
            [ ENV.PRODUCTION ]: `https://www.paypal.com`,
            [ ENV.TEST ]:       `${ window.location.protocol }//${ window.location.host }`
        };
    },

    get corsApiUrls() : Object {
        return {
            [ ENV.LOCAL ]:      `https://${ config.apiStageUrl }:12326`,
            [ ENV.STAGE ]:      `https://${ config.apiStageUrl }:12326`,
            [ ENV.SANDBOX ]:    `https://cors.api.sandbox.paypal.com`,
            [ ENV.PRODUCTION ]: `https://cors.api.paypal.com`,
            [ ENV.TEST ]:       `${ window.location.protocol }//${ window.location.host }`
        };
    },

    get apiUrls() : Object {

        let domain      = `${ window.location.protocol }//${ window.location.host }`;
        let corsApiUrls = config.corsApiUrls;
        let wwwApiUrls  = config.wwwApiUrls;

        return {
            [ ENV.LOCAL ]:      domain === wwwApiUrls.local      ? wwwApiUrls.local      : corsApiUrls.local,
            [ ENV.STAGE ]:      domain === wwwApiUrls.stage      ? wwwApiUrls.stage      : corsApiUrls.stage,
            [ ENV.SANDBOX ]:    domain === wwwApiUrls.sandbox    ? wwwApiUrls.sandbox    : corsApiUrls.sandbox,
            [ ENV.PRODUCTION ]: domain === wwwApiUrls.production ? wwwApiUrls.production : corsApiUrls.production,
            [ ENV.TEST ]:       domain === wwwApiUrls.test       ? wwwApiUrls.test       : corsApiUrls.test
        };
    },

    get checkoutUri() : ?string {
        return null;
    },

    set checkoutUri(val) {
        delete this.checkoutUri;
        this.checkoutUri = val;
    },

    get checkoutUris() : Object {
        if (config.checkoutUri) {
            return {
                [ ENV.LOCAL ]:      config.checkoutUri,
                [ ENV.STAGE ]:      config.checkoutUri,
                [ ENV.SANDBOX ]:    config.checkoutUri,
                [ ENV.PRODUCTION ]: config.checkoutUri,
                [ ENV.TEST ]:       config.checkoutUri,
                [ ENV.DEMO ]:       config.checkoutUri
            };
        }

        return {
            [ ENV.LOCAL ]:      `/webapps/hermes`,
            [ ENV.STAGE ]:      `/webapps/hermes`,
            [ ENV.SANDBOX ]:    `/checkoutnow`,
            [ ENV.PRODUCTION ]: `/checkoutnow`,
            [ ENV.TEST ]:       `/base/test/windows/checkout/index.htm?checkouturl=true`,
            [ ENV.DEMO ]:       `/demo/dev/checkout.htm`
        };
    },

    altpayUris: {
        [ ENV.LOCAL ]:      `/latinumcheckout`,
        [ ENV.STAGE ]:      `/latinumcheckout`,
        [ ENV.SANDBOX ]:    `/latinumcheckout`,
        [ ENV.PRODUCTION ]: `/latinumcheckout`,
        [ ENV.TEST ]:       `/base/test/windows/checkout/index.htm?checkouturl=true`,
        [ ENV.DEMO ]:       `/demo/dev/checkout.htm`
    },

    guestUris: {
        [ ENV.LOCAL ]:      `/webapps/xoonboarding`,
        [ ENV.STAGE ]:      `/webapps/xoonboarding`,
        [ ENV.SANDBOX ]:    `/webapps/xoonboarding`,
        [ ENV.PRODUCTION ]: `/webapps/xoonboarding`,
        [ ENV.TEST ]:       `/base/test/windows/checkout/index.htm?guesturl=true`,
        [ ENV.DEMO ]:       `/demo/dev/guest.htm`
    },

    billingUris: {
        [ ENV.LOCAL ]:      `/webapps/hermes/agreements`,
        [ ENV.STAGE ]:      `/webapps/hermes/agreements`,
        [ ENV.SANDBOX ]:    `/agreements/approve`,
        [ ENV.PRODUCTION ]: `/agreements/approve`,
        [ ENV.TEST ]:       `/base/test/windows/checkout/index.htm?billingurl=true`,
        [ ENV.DEMO ]:       `/demo/dev/checkout.htm`
    },

    buttonUris: {
        [ ENV.LOCAL ]:      `/webapps/hermes/button`,
        [ ENV.STAGE ]:      `/webapps/hermes/button`,
        [ ENV.SANDBOX ]:    `/webapps/hermes/button`,
        [ ENV.PRODUCTION ]: `/webapps/hermes/button`,
        [ ENV.TEST ]:       `/base/test/windows/button/index.htm`,
        [ ENV.DEMO ]:       `/demo/dev/button.htm`
    },

    inlinedCardFieldUris: {
        [ ENV.LOCAL ]:      `/smart/card-fields`,
        [ ENV.STAGE ]:      `/smart/card-fields`,
        [ ENV.SANDBOX ]:    `/smart/card-fields`,
        [ ENV.PRODUCTION ]: `/smart/card-fields`,
        [ ENV.TEST ]:       `/base/test/windows/card-fields/index.htm`,
        [ ENV.DEMO ]:       `/demo/dev/card.htm`
    },

    postBridgeUris: {
        [ ENV.LOCAL ]:      `/webapps/hermes/component-meta`,
        [ ENV.STAGE ]:      `/webapps/hermes/component-meta`,
        [ ENV.SANDBOX ]:    `/webapps/hermes/component-meta`,
        [ ENV.PRODUCTION ]: `/webapps/hermes/component-meta`,
        [ ENV.TEST ]:       `/base/test/windows/component-meta/index.htm`,
        [ ENV.DEMO ]:       `/demo/dev/bridge.htm`
    },

    legacyCheckoutUris: {
        [ ENV.LOCAL ]:      `/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true`,
        [ ENV.STAGE ]:      `/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true`,
        [ ENV.SANDBOX ]:    `/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true`,
        [ ENV.PRODUCTION ]: `/cgi-bin/webscr?cmd=_express-checkout&xo_node_fallback=true`,
        [ ENV.TEST ]:       `#fallback`
    },

    buttonJSUrls: {
        [ ENV.LOCAL ]:      `https://www.paypalobjects.com/api/button.js`,
        [ ENV.STAGE ]:      `https://www.paypalobjects.com/api/button.js`,
        [ ENV.SANDBOX ]:    `https://www.paypalobjects.com/api/button.js`,
        [ ENV.PRODUCTION ]: `https://www.paypalobjects.com/api/button.js`,
        [ ENV.TEST ]:       `/base/test/lib/button.js`,
        [ ENV.DEMO ]:       `https://www.paypalobjects.com/api/button.js`
    },

    get buttonJSUrl() : string {
        return config.buttonJSUrls[config.env];
    },

    loginUri: `/signin/`,

    hermesLoggerUri: `/webapps/hermes/api/logger`,

    loggerUri: `/xoplatform/logger/api/logger`,

    loggerThrottlePercentage: 1.0, // 100%

    pptmUri: `/tagmanager/pptm.js`,

    get postBridgeUri() : string {
        return `${ config.postBridgeUris[config.env] }?xcomponent=1`;
    },

    paymentStandardUri: `/webapps/xorouter?cmd=_s-xclick`,

    authApiUri:       `/v1/oauth2/token`,
    paymentApiUri:    `/v1/payments/payment`,
    orderApiUri:      `/v2/checkout/orders`,
    billingApiUri:    `/v1/billing-agreements/agreement-tokens`,
    experienceApiUri: `/v1/payment-experience/web-profiles`,
    trackingApiUri:   `/v1/risk/transaction-contexts`,

    get checkoutUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.local }${ config.checkoutUris.local.replace(`:${ config.ports.default }`, `:${ config.ports.checkout }`) }`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.checkoutUris.stage }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.checkoutUris.sandbox }`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.checkoutUris.production }`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.checkoutUris.test }`,
            [ ENV.DEMO ]:       `${ paypalUrls.test }${ config.checkoutUris.demo }`
        };
    },

    get guestUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.local.replace(`:${ config.ports.default }`, `:${ config.ports.guest }`) }${ config.guestUris.local }`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.guestUris.stage }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.guestUris.sandbox }`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.guestUris.production }`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.guestUris.test }`,
            [ ENV.DEMO ]:       `${ paypalUrls.test }${ config.guestUris.demo }`
        };
    },

    get altpayUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.local.replace(`:${ config.ports.default }`, `:${ config.ports.altpay }`) }${ config.altpayUris.local }`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.altpayUris.stage }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.altpayUris.sandbox }`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.altpayUris.production }`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.altpayUris.test }`,
            [ ENV.DEMO ]:       `${ paypalUrls.test }${ config.altpayUris.demo }`
        };
    },

    get billingUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.local.replace(`:${ config.ports.default }`, `:${ config.ports.checkout }`) }${ config.billingUris.local }`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.billingUris.stage }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.billingUris.sandbox }`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.billingUris.production }`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.billingUris.test }`,
            [ ENV.DEMO ]:       `${ paypalUrls.test }${ config.billingUris.demo }`
        };
    },

    get buttonUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.local.replace(`:${ config.ports.default }`, `:${ config.ports.button }`) }${ config.buttonUris.local }`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.buttonUris.stage }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.buttonUris.sandbox }`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.buttonUris.production }`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.buttonUris.test }`,
            [ ENV.DEMO ]:       `${ paypalUrls.demo }${ config.buttonUris.demo }`
        };
    },

    get inlinedCardFieldUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.local.replace(`:${ config.ports.default }`, `:${ config.ports.button }`) }${ config.inlinedCardFieldUris.local }`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.inlinedCardFieldUris.stage }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.inlinedCardFieldUris.sandbox }`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.inlinedCardFieldUris.production }`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.inlinedCardFieldUris.test }`,
            [ ENV.DEMO ]:       `${ paypalUrls.demo }${ config.inlinedCardFieldUris.demo }`
        };
    },

    get loginUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.stage }${ config.loginUri }`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.loginUri }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.loginUri }`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.loginUri }`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.loginUri }`
        };
    },

    get paymentsStandardUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.local }${ config.paymentStandardUri }`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.paymentStandardUri }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.paymentStandardUri }`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.paymentStandardUri }`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.paymentStandardUri }`
        };
    },

    get metaFrameUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.local }${ config.postBridgeUri }&env=local`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.postBridgeUri }&env=stage&stage=${ config.stage }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.postBridgeUri }&env=sandbox`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.postBridgeUri }&env=production`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.postBridgeUri }&env=test`,
            [ ENV.DEMO ]:       `${ paypalUrls.demo }${ config.postBridgeUri }&env=demo`
        };
    },

    get legacyCheckoutUrls() : Object {

        let paypalUrls = config.paypalUrls;

        return {
            [ ENV.LOCAL ]:      `${ paypalUrls.stage }${ config.legacyCheckoutUris.local }`,
            [ ENV.STAGE ]:      `${ paypalUrls.stage }${ config.legacyCheckoutUris.stage }`,
            [ ENV.SANDBOX ]:    `${ paypalUrls.sandbox }${ config.legacyCheckoutUris.sandbox }`,
            [ ENV.PRODUCTION ]: `${ paypalUrls.production }${ config.legacyCheckoutUris.production }`,
            [ ENV.TEST ]:       `${ paypalUrls.test }${ config.legacyCheckoutUris.test }`
        };
    },

    get authApiUrls() : Object {

        let apiUrls    = config.apiUrls;
        let authApiUri = config.authApiUri;

        return {
            [ ENV.LOCAL ]:      `${ apiUrls.local }${ authApiUri }`,
            [ ENV.STAGE ]:      `${ apiUrls.stage }${ authApiUri }`,
            [ ENV.SANDBOX ]:    `${ apiUrls.sandbox }${ authApiUri }`,
            [ ENV.PRODUCTION ]: `${ apiUrls.production }${ authApiUri }`,
            [ ENV.TEST ]:       `${ apiUrls.test }${ authApiUri }`
        };
    },

    get paymentApiUrls() : Object {

        let apiUrls       = config.apiUrls;
        let paymentApiUri = config.paymentApiUri;

        return {
            [ ENV.LOCAL ]:      `${ apiUrls.local }${ paymentApiUri }`,
            [ ENV.STAGE ]:      `${ apiUrls.stage }${ paymentApiUri }`,
            [ ENV.SANDBOX ]:    `${ apiUrls.sandbox }${ paymentApiUri }`,
            [ ENV.PRODUCTION ]: `${ apiUrls.production }${ paymentApiUri }`,
            [ ENV.TEST ]:       `${ apiUrls.test }${ paymentApiUri }`
        };
    },

    get orderApiUrls() : Object {

        let apiUrls = config.apiUrls;
        let orderApiUri = config.orderApiUri;

        return {
            [ENV.LOCAL]:      `${ apiUrls.local }${ orderApiUri }`,
            [ENV.STAGE]:      `${ apiUrls.stage }${ orderApiUri }`,
            [ENV.SANDBOX]:    `${ apiUrls.sandbox }${ orderApiUri }`,
            [ENV.PRODUCTION]: `${ apiUrls.production }${ orderApiUri }`,
            [ENV.TEST]:       `${ apiUrls.test }${ orderApiUri }`
        };
    },

    get billingApiUrls() : Object {

        let apiUrls       = config.apiUrls;
        let billingApiUri = config.billingApiUri;

        return {
            [ ENV.LOCAL ]:      `${ apiUrls.local }${ billingApiUri }`,
            [ ENV.STAGE ]:      `${ apiUrls.stage }${ billingApiUri }`,
            [ ENV.SANDBOX ]:    `${ apiUrls.sandbox }${ billingApiUri }`,
            [ ENV.PRODUCTION ]: `${ apiUrls.production }${ billingApiUri }`,
            [ ENV.TEST ]:       `${ apiUrls.test }${ billingApiUri }`
        };
    },

    get experienceApiUrls() : Object {

        let apiUrls          = config.apiUrls;
        let experienceApiUri = config.experienceApiUri;

        return {
            [ ENV.LOCAL ]:      `${ apiUrls.local }${ experienceApiUri }`,
            [ ENV.STAGE ]:      `${ apiUrls.stage }${ experienceApiUri }`,
            [ ENV.SANDBOX ]:    `${ apiUrls.sandbox }${ experienceApiUri }`,
            [ ENV.PRODUCTION ]: `${ apiUrls.production }${ experienceApiUri }`,
            [ ENV.TEST ]:       `${ apiUrls.test }${ experienceApiUri }`
        };
    },

    get trackingApiUrls() : Object {

        let apiUrls       = config.apiUrls;
        let trackingApiUri = config.trackingApiUri;

        return {
            [ ENV.LOCAL ]:      `${ apiUrls.local }${ trackingApiUri }`,
            [ ENV.STAGE ]:      `${ apiUrls.stage }${ trackingApiUri }`,
            [ ENV.SANDBOX ]:    `${ apiUrls.sandbox }${ trackingApiUri }`,
            [ ENV.PRODUCTION ]: `${ apiUrls.production }${ trackingApiUri }`,
            [ ENV.TEST ]:       `${ apiUrls.test }${ trackingApiUri }`
        };
    },

    _paypalUrl: '',

    get paypalUrl() : string {
        return this._paypalUrl || config.paypalUrls[config.env];
    },

    set paypalUrl(value) {
        this._paypalUrl = value;
    },

    get paypalDomain() : string {
        return config.paypalDomains[config.env];
    },

    get corsApiUrl() : string {
        return config.corsApiUrls[config.env];
    },

    get wwwApiUrl() : string {
        return config.wwwApiUrls[config.env];
    },

    get apiUrl() : string {

        let domain     = `${ window.location.protocol }//${ window.location.host }`;
        let corsApiUrl = config.corsApiUrl;
        let wwwApiUrl  = config.wwwApiUrl;

        return domain === wwwApiUrl ? wwwApiUrl : corsApiUrl;
    },

    get checkoutUrl() : string {
        return `${ config.paypalUrl }${ config.checkoutUris[config.env] }`;
    },

    get billingUrl() : string {
        return `${ config.paypalUrl }${ config.billingUris[config.env] }`;
    },

    get buttonUrl() : string {
        return `${ config.paypalUrl }${ config.buttonUris[config.env] }`;
    },

    get legacyCheckoutUrl() : string {
        return config.legacyCheckoutUrls[config.env];
    },

    get postBridgeUrl() : string {
        return `${ config.paypalUrl }${ config.postBridgeUri }`;
    },

    get postBridgeDomain() : string {
        return `${ config.paypalDomain }`;
    },

    get loggerUrl() : string {
        let isTestExperiment = Math.random() < config.loggerThrottlePercentage;
        let loggerUrl = isTestExperiment ? config.loggerUri : config.hermesLoggerUri;

        return `${ config.paypalUrl }${ loggerUrl }`;
    },

    get pptmUrl() : string {
        return `${ config.paypalUrls[config.env] }${ config.pptmUri }`;
    },

    get authApiUrl() : string {
        return `${ config.apiUrl }${ config.authApiUri }`;
    },

    get paymentApiUrl() : string {
        return `${ config.apiUrl }${ config.paymentApiUri }`;
    },

    get orderApiUrl() : string {
        return `${ config.apiUrl }${ config.orderApiUri }`;
    },

    get billingApiUrl() : string {
        return `${ config.apiUrl }${ config.billingApiUri }`;
    },

    get experienceApiUrl() : string {
        return `${ config.apiUrl }${ config.experienceApiUri }`;
    },

    defaultLocale: {
        country: COUNTRY.US,
        lang:    LANG.EN
    },

    locales: {
        [COUNTRY.AD]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.AE]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH, LANG.AR ],
        [COUNTRY.AG]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.AI]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.AL]: [ LANG.EN ],
        [COUNTRY.AM]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.AN]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.AO]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.AR]: [ LANG.ES, LANG.EN ],
        [COUNTRY.AT]: [ LANG.DE, LANG.EN ],
        [COUNTRY.AU]: [ LANG.EN ],
        [COUNTRY.AW]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.AZ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.BA]: [ LANG.EN ],
        [COUNTRY.BB]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.BE]: [ LANG.EN, LANG.NL, LANG.FR ],
        [COUNTRY.BF]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.BG]: [ LANG.EN ],
        [COUNTRY.BH]: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.BI]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.BJ]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.BM]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.BN]: [ LANG.EN ],
        [COUNTRY.BO]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.BR]: [ LANG.PT, LANG.EN ],
        [COUNTRY.BS]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.BT]: [ LANG.EN ],
        [COUNTRY.BW]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.BY]: [ LANG.EN ],
        [COUNTRY.BZ]: [ LANG.EN, LANG.ES, LANG.FR, LANG.ZH ],
        [COUNTRY.C2]: [ LANG.ZH, LANG.EN ],
        [COUNTRY.CA]: [ LANG.EN, LANG.FR ],
        [COUNTRY.CD]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.CG]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.CH]: [ LANG.DE, LANG.FR, LANG.EN ],
        [COUNTRY.CI]: [ LANG.FR, LANG.EN ],
        [COUNTRY.CK]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.CL]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.CM]: [ LANG.FR, LANG.EN ],
        [COUNTRY.CN]: [ LANG.ZH ],
        [COUNTRY.CO]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.CR]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.CV]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.CY]: [ LANG.EN ],
        [COUNTRY.CZ]: [ LANG.CS, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.DE]: [ LANG.DE, LANG.EN ],
        [COUNTRY.DJ]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.DK]: [ LANG.DA, LANG.EN ],
        [COUNTRY.DM]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.DO]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.DZ]: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.EC]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.EE]: [ LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.EG]: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.ER]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.ES]: [ LANG.ES, LANG.EN ],
        [COUNTRY.ET]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.FI]: [ LANG.FI, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.FJ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.FK]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.FM]: [ LANG.EN ],
        [COUNTRY.FO]: [ LANG.DA, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.FR]: [ LANG.FR, LANG.EN ],
        [COUNTRY.GA]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.GB]: [ LANG.EN ],
        [COUNTRY.GD]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.GE]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.GF]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.GI]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.GL]: [ LANG.DA, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.GM]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.GN]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.GP]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.GR]: [ LANG.EL, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.GT]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.GW]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.GY]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.HK]: [ LANG.EN, LANG.ZH ],
        [COUNTRY.HN]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.HR]: [ LANG.EN ],
        [COUNTRY.HU]: [ LANG.HU, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.ID]: [ LANG.ID, LANG.EN ],
        [COUNTRY.IE]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.IL]: [ LANG.HE, LANG.EN ],
        [COUNTRY.IN]: [ LANG.EN ],
        [COUNTRY.IS]: [ LANG.EN ],
        [COUNTRY.IT]: [ LANG.IT, LANG.EN ],
        [COUNTRY.JM]: [ LANG.EN, LANG.ES, LANG.FR, LANG.ZH ],
        [COUNTRY.JO]: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.JP]: [ LANG.JA, LANG.EN ],
        [COUNTRY.KE]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.KG]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.KH]: [ LANG.EN ],
        [COUNTRY.KI]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.KM]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.KN]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.KR]: [ LANG.KO, LANG.EN ],
        [COUNTRY.KW]: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.KY]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.KZ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.LA]: [ LANG.EN ],
        [COUNTRY.LC]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.LI]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.LK]: [ LANG.EN ],
        [COUNTRY.LS]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.LT]: [ LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.LU]: [ LANG.EN, LANG.DE, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.LV]: [ LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.MA]: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.MC]: [ LANG.FR, LANG.EN ],
        [COUNTRY.MD]: [ LANG.EN ],
        [COUNTRY.ME]: [ LANG.EN ],
        [COUNTRY.MG]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.MH]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.MK]: [ LANG.EN ],
        [COUNTRY.ML]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.MN]: [ LANG.EN ],
        [COUNTRY.MQ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.MR]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.MS]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.MT]: [ LANG.EN ],
        [COUNTRY.MU]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.MV]: [ LANG.EN ],
        [COUNTRY.MW]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.MX]: [ LANG.ES, LANG.EN ],
        [COUNTRY.MY]: [ LANG.EN ],
        [COUNTRY.MZ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.NA]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.NC]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.NE]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.NF]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.NG]: [ LANG.EN ],
        [COUNTRY.NI]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.NL]: [ LANG.NL, LANG.EN ],
        [COUNTRY.NO]: [ LANG.NO, LANG.EN ],
        [COUNTRY.NP]: [ LANG.EN ],
        [COUNTRY.NR]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.NU]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.NZ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.OM]: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.PA]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.PE]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.PF]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.PG]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.PH]: [ LANG.EN ],
        [COUNTRY.PL]: [ LANG.PL, LANG.EN ],
        [COUNTRY.PM]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.PN]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.PT]: [ LANG.PT, LANG.EN ],
        [COUNTRY.PW]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.PY]: [ LANG.ES, LANG.EN ],
        [COUNTRY.QA]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH, LANG.AR ],
        [COUNTRY.RE]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.RO]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.RS]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.RU]: [ LANG.RU, LANG.EN ],
        [COUNTRY.RW]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.SA]: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.SB]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.SC]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.SE]: [ LANG.SV, LANG.EN ],
        [COUNTRY.SG]: [ LANG.EN ],
        [COUNTRY.SH]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.SI]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.SJ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.SK]: [ LANG.SK, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.SL]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.SM]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.SN]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.SO]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.SR]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.ST]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.SV]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.SZ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.TC]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.TD]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.TG]: [ LANG.FR, LANG.EN, LANG.ES, LANG.ZH ],
        [COUNTRY.TH]: [ LANG.TH, LANG.EN ],
        [COUNTRY.TJ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.TM]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.TN]: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.TO]: [ LANG.EN ],
        [COUNTRY.TR]: [ LANG.TR, LANG.EN ],
        [COUNTRY.TT]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.TV]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.TW]: [ LANG.ZH, LANG.EN ],
        [COUNTRY.TZ]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.UA]: [ LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.UG]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.US]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.UY]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.VA]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.VC]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.VE]: [ LANG.ES, LANG.EN, LANG.FR, LANG.ZH ],
        [COUNTRY.VG]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.VN]: [ LANG.EN ],
        [COUNTRY.VU]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.WF]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.WS]: [ LANG.EN ],
        [COUNTRY.YE]: [ LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.YT]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.ZA]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.ZM]: [ LANG.EN, LANG.FR, LANG.ES, LANG.ZH ],
        [COUNTRY.ZW]: [ LANG.EN ]
    }
};
