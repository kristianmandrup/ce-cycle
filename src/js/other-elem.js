// var HTMLElement = typeof HTMLElement === 'undefined' ? function () {} : HTMLElement;

class OtherElem extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    console.log('created other-elem:', arguments)
  }
}