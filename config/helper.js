import Handlebars from 'handlebars';

let priorityFI = {
    "VISA": 1,
    "MASTERCARD": 2,
    "DISCOVER": 3,
    "AMEX": 4,
    "HIPER": 5,
    "HIPERCARD": 6,
    "ELO": 7,
    "JCB": 8,
    "CUP": 9,
    "COFINOGA": 10,
    "SWITCH": 11,
    "MAESTRO": 12,
    "COFIDIS": 13,
    "CETELEM": 14,
    "CBNATIONALE": 15
};

export let sortedFI = function(allowedFI) {
    // Switch is mapped to Maestro
    allowedFI.forEach((value, index)=> {
        if (typeof priorityFI[value] !== 'number') {
            throw new Error(`Could not find priority for ${value}`);
        }
        if (allowedFI[index] === 'SWITCH') {
            allowedFI[index] = 'MAESTRO'
        }
    });

    // Remove duplicate entries if exist
    allowedFI = allowedFI.filter((item, index, arrFI) => { return arrFI.indexOf(item) === index;});

    // Sorting keys according to the priority set above
    let sortedKeys = Object.keys(allowedFI).sort((a,b) => {return priorityFI[allowedFI[a]]-priorityFI[allowedFI[b]]});

    // Max length of FI displayed
    sortedKeys.length = sortedKeys.length > 4 ? 4 : sortedKeys.length;

    return sortedKeys.map(x => { return new Handlebars.SafeString( '<div class="cardIcons '+ allowedFI[x] + '"' + '></div>'); }).join('');
};

Handlebars.registerHelper('sortFI', sortedFI);


