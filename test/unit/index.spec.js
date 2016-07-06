import * as index from '../../src/index';



describe('src/index.js', () => {

  it('should export a PayPalButton property', () => {
    return index.PayPalButton.should.be.an('object');
  });

  it('should export a PayPalCheckout property', () => {
    return index.PayPalCheckout.should.be.an('object');
  });

  it('should export a xcomponent property', () => {
    return index.xcomponent.should.be.an('object');
  });

  it('should export a postRobot property', () => {
    return index.postRobot.should.be.an('object');
  });

});
