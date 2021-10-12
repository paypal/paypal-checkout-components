/* @flow */

export type SetupCardOptions = {|
    cspNonce : string,
    facilitatorAccessToken : string
|};

export type Card = {|
    number : string,
    cvv : string,
    expiry : string
|};

export type FieldStyle = {|
    height? : string,
    width? : string,
    color? : string,
    border? : string,
    borderTop? : string,
    borderLeft? : string,
    borderBottom? : string,
    borderRight? : string,
    display? : string,
    backgroundColor? : string,
    background? : string,
    appearance? : string,
    boxShadow? : string,
    direction? : string,
    font? : string,
    fontFamily? : string,
    fontSizeAdjust? : string,
    fontSize? : string,
    fontStretch? : string,
    fontStyle? : string,
    fontVariantAlternates? : string,
    fontVariantCaps? : string,
    fontVariantEastAsian? : string,
    fontVariantLigatures? : string,
    fontVariantNumeric? : string,
    fontVariant? : string,
    fontWeight? : string,
    letterSpacing? : string,
    lineHeight? : string,
    opacity? : string,
    outline? : string,
    margin? : string,
    marginTop? : string,
    marginRight? : string,
    marginBottom? : string,
    marginLeft? : string,
    padding? : string,
    paddingTop? : string,
    paddingRight? : string,
    paddingBottom? : string,
    paddingLeft? : string,
    textAlign? : string,
    textShadow? : string,
    transition? : string
|};

export type CardStyle = {| |};

export type CardPlaceholder = {|
    number? : string,
    expiry? : string,
    cvv? : string
|};

export type CardType = {|
    gaps : $ReadOnlyArray<number>,
    lengths : $ReadOnlyArray<number>,
    patterns : $ReadOnlyArray<number>,
    type : string,
    niceType : string,
    code : {|
        name : string,
        size : number
     |}
|};

export type InputEvent = {|
    key : string,
    target : HTMLInputElement,
    type? : string
|};

export type CardNumberChangeEvent = {|
    event : InputEvent,
    cardNumber : string,
    cardMaskedNumber : string,
    cardType : CardType
|};

export type CardExpiryChangeEvent = {|
    event : InputEvent,
    maskedDate : string,
    date : string
|};

export type CardCvvChangeEvent = {|
    event : InputEvent,
    cardCvv : string
|};

export type FieldValidity = {|
    isValid : boolean,
    isPossibleValid : boolean
|};

export type CardNavigation = {|
    next : () => void,
    previous : () => void
|};

export type InputState = {|
    inputValue : string,
    maskedInputValue : string,
    cursorStart : number,
    cursorEnd : number,
    keyStrokeCount : number,
    isPossibleValid : boolean,
    isValid : boolean,
    contentPasted? : boolean
|};

export type InputOptions = {|
    inputState : InputState,
    validationFn : () => mixed
|};
