"use strict";

// shortcut for easier console logging
const log = console.log.bind(console);

// global helper method to log diagnostic information on screen,
// since it's not easy to check console messages on devices
function logScreen(message) {
  // var d = new Date();
  // var ul = document.getElementById("screen_log");
  // var li = document.createElement("li");
  // li.appendChild(document.createTextNode(d.toLocaleString() + ' : ' + message));
  // ul.appendChild(li);
  log(message)
}

// helper function to dynamically load a JS script in the
// current document. Not using promises here to keep it
// simple and robust across browsers.
function loadScript(url, callback) {
  // Adding the script tag to the head as suggested before
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onload = callback;

  logScreen('Adding Custom Elements polyfill script');

  // Fire the loading
  head.appendChild(script);
}

// Let's do this...
logScreen('Start.');
logScreen('Checking native support for custom elements V1....');

const supportsCustomElementsV1 = 'customElements' in window;

if (!supportsCustomElementsV1) {
  // no native support, load polyfill
  logScreen('Native support not available, loading polyfil...');
  loadScript('polyfill/custom-elements.min.js', function () {
    logScreen('Polyfill loaded.');
    upgrade();
  });
} else {
  // native support, carry on
  logScreen('Native support detected.');
  upgrade();
}

function upgrade() {

  // Example of a custom element class, containing
  // "reactions" (lifecycle methods) as well as custom
  // properties and event handlers
  class HelloWorld extends HTMLElement {

    constructor(element) {

      // Always call super first in constructor
      super();


      console.log('created hello-world:', arguments)
      // we can't do much in the constructor, really:
      // - Don’t add, remove, mutate, or access any attribute inside a constructor
      // - Don’t insert, remove, mutate, or access a child
      // source: https://webkit.org/blog/7027/introducing-custom-elements/
    }

    connectedCallback() {

      // Called when the custom element is inserted into a document
      // this is a safe place to do instance-specific things like
      // setting component-level variables or event handlers

      this._logMessage('ConnectedCallback called.');

      // example of setting an inner style via JS
      // will be visible in DOM as inline style
      // in a way, this is "scoped styles", a term used in
      // several frameworks
      this.style.cursor = 'pointer';
    }

    disconnectedCallback() {

      // Called when the custom element is removed from the document
      // clean up any event handlers added in connectedCallback here...

      this._logMessage('DisconnectedCallback called.');
    }

    adoptedCallback(oldDocument, newDocument) {

      // Called when the custom element is adopted from an old document to a new document.
      // I have no idea what this means

      this._logMessage('AdoptedCallback called.');
    }

    static get observedAttributes() {

      // The million dollar feature of the custom elements V1 API
      // in this API method, you declare the attributes to watch
      // in case any change happens to that attribute,
      // attributeChangedCallback will be called.
      // effectively, this allows for super easy synchronization
      // between the DOM and the API

      // let's watch our name attribute
      // this means that when it changed in markup or via the API,
      // the change will be detected

      return ['name'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {

      // Called anytime any of our watched attributes changes
      // We'll call our own custom method Render in case this happens

      this._logMessage('AttributeChangedCallback called.');
    }

    get name() {

      // a getter for an attribute, [name] in this case
      // accessing this via element.name will always return the
      // most up-to-date value

      this._logMessage('Name getter called');
      return this.getAttribute('name');
    }

    set name(val) {

      // a setter for an attribute, [name] in this case
      // setting this via element.name will trigger
      // attributeChangedCallback, which will update
      // both the internal value and the DOM

      if (val) {
        this.setAttribute('name', val);
      }
      this._logMessage('Name setter called: ' + val);
    }

    _logMessage(message) {

      // Not part of API. Just a custom internal helper method to log component-instance specific
      // messages for the sake of diagnostics. the _methodname suggests
      // that this is a private method, but this is only a convention
      // private methods do not exist in JS classes.

      logScreen('hello-world:' + message)
    }
  }


  var cePlaceholderId = 'ce'

  // custom element class defined, let's upgrade it...
  logScreen('Starting upgrade...');

  customElements.define('hello-world', HelloWorld);

  // do stuff with some custom elements, but only when they are
  // succesfully defined...
  customElements.whenDefined('hello-world').then(function (value) {

    logScreen('Upgrade successful!');
    // get handle to existing instance of hello-world in DOM and change its name
    let hw1 = document.querySelector('#' + cePlaceholderId);

    // check out how powerful this is. the consuming code only has to set a property
    // and has no knowledge at all how to render such a change, we encapsulated
    // all of that in the custom elements code
    hw1.name = "Upgraded world (JS)!";


    logScreen('Creating Custom Element instance from JS...');

    // Next, we're going to create an instance of our custom elements completely from
    // JS and insert it into the DOM. This can be done from a handlebars template,
    // HTML5 template elements, or just a multiline string like below...
    let domStr = `
      <p>Hello, <span class="name">World!</span></p>
      <form class="frm" action="" method="post" accept-charset="UTF-8">
        <input type="text" class="nameField" value="" />
        <input type="submit" value="submit" />
      </form>
      <ul class="log">
        <li>DOM init</li>
      </ul>
    `;
    //

    // // create it
    // let hw2 = new HelloWorld();
    // hw2.innerHTML = domStr;
    // hw2.setAttribute('id', 'hw3');
    // hw2.setAttribute('name', 'DOM created world!');
    // document.querySelector("#instances").appendChild(hw2);
    // // change a property after DOM creation to see if it reflects.
    // hw2.name = "DOM created world (JS)!";

    logScreen('End.');


  }, function (reason) {
    logScreen('Upgrade failed: ' + reason);
    logScreen('End.');
  });
}