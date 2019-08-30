/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var registredEvents = {};

/**
 * Mediator is an event handler service, it can subscribe and publish event
 *
 * @module core/mediator
 * @author Florian Kroockmann <florian.kroockmann@lp-digital.fr>
 */
module.exports = {
  /**
   * Subscribe to an event
   *
   * @example mediator.subscribe('my-event', (data) => {console.log('hello world') });
   * @param  {String}   eventName
   * @param  {Function} callback
   * @param  {Boolean}  once
   */
  subscribe: function subscribe(eventName, callback) {
    var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    registredEvents[eventName] = registredEvents[eventName] || [];

    registredEvents[eventName].push({ 'callback': callback, 'once': once });
  },

  /**
   * Publish an event
   *
   * @example mediator.publish('my-event', {country: 'France'});
   * @param  {String} eventName
   * @param  {Object} params
   * @param  {String} context
   */
  publish: function publish(eventName, params, context) {
    var events = registredEvents[eventName] || [];

    events.forEach(function (event) {
      if (event) {
        event.callback.call(context, params);
        if (event.once) {
          registredEvents[eventName] = events.find(function (element) {
            return element !== event;
          });
        }
      }
    });
  },

  /**
   * Remove events from the mediator
   * @example mediator.clear('my-event');
   * @example mediator.clear(['my-event', 'my-event2']);
   * @example mediator.clear();
   * @param  {Object|String} events
   */
  clear: function clear() {
    var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    if (typeof events === 'string') {
      events = [events];
    }

    if (events.length) {
      for (var key in events) {
        if (events.hasOwnProperty(key)) {
          delete registredEvents[events[key]];
        }
      }
    } else {
      registredEvents = {};
    }
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 *
 * Request class allow to post easily the request to the api
 *
 * @example var request = new Request();
 *
 * @module core/request
 * @author Florian Kroockmann <florian.kroockmann@lp-digital.fr>
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  /**
   * Constructor initialize the data of the request
   */
  function Request() {
    _classCallCheck(this, Request);

    this.url = '';
    this.method = 'GET';
    this.data = null;
    this.headers = {
      'Content-Type': 'application/x-www-form-uriencoded'
    };
  }

  /**
   * Set url of request
   *
   * @method setUrl
   * @memberof module:core/request
   * @example request.setUrl('localhost');
   * @param {String} url
   * @return {Request} this
   */


  _createClass(Request, [{
    key: 'setUrl',
    value: function setUrl(url) {
      this.url = url;

      return this;
    }

    /**
     * Set the method of request and force uppercase
     *
     * @method setMethod
     * @memberof module:core/request
     * @example request.setMethod('POST');
     * @param {String} method
     * @return {Request} this
     */

  }, {
    key: 'setMethod',
    value: function setMethod(method) {
      this.method = method.toUpperCase();

      return this;
    }

    /**
     * Set the data of the request
     *
     * @method setData
     * @memberof module:core/request
     * @example request.setData({
     *    country: 'France,
     * });
     * @param {Mixed} data
     * @return {Request} this
     */

  }, {
    key: 'setData',
    value: function setData(data) {
      this.data = data;

      return this;
    }

    /**
     * Set all headers in request
     *
     * @method setHeaders
     * @memberof module:core/request
     * @example request.setHeaders({
     *    'Content-Type': 'application/x-www-form-uriencoded',
     * })
     * @param {Object} headers
     * @return {Request} this
     */

  }, {
    key: 'setHeaders',
    value: function setHeaders(headers) {
      this.headers = headers;

      return this;
    }

    /**
     * Set one header with name and value
     *
     * @method addHeader
     * @memberof module:core/request
     * @example request.addHeader('Accept', 'application/json');
     * @param {String} name
     * @param {String} value
     * @return {Request} this
     */

  }, {
    key: 'addHeader',
    value: function addHeader(name, value) {
      this.headers[name] = value;

      return this;
    }

    /**
     * Set content type of request
     * Shortcut of addHeader('Content-Type', '')
     *
     * @method setContentType
     * @memberof module:core/request
     * @example request.setContentType('application/json');
     * @param {String} contentType
     * @return {Request} this
     */

  }, {
    key: 'setContentType',
    value: function setContentType(contentType) {
      this.addHeader('Content-Type', contentType);

      return this;
    }

    /**
     * Get the url with query params
     *
     * @method getUrl
     * @memberof module:core/request
     * @example request.getUrl()
     * @return {String} url builded
     */

  }, {
    key: 'getUrl',
    value: function getUrl() {
      return this.url;
    }

    /**
     * Get the content type of request
     *
     * @method getContentType
     * @memberof module:core/request
     * @example request.getContentType()
     * @return {String} content type
     */

  }, {
    key: 'getContentType',
    value: function getContentType() {
      return this.headers['Content-Type'];
    }

    /**
     * Get the method of request
     *
     * @method getMethod
     * @memberof module:core/request
     * @example request.getMethod()
     * @return {String} method
     */

  }, {
    key: 'getMethod',
    value: function getMethod() {
      return this.method;
    }

    /**
     * Get the data of request
     *
     * @method getData
     * @memberof module:core/request
     * @example request.getData()
     * @return {Mixed} data
     */

  }, {
    key: 'getData',
    value: function getData() {
      return this.data;
    }

    /**
     * Get header by key
     *
     * @method getHeader
     * @memberof module:core/request
     * @param {String} key
     * @example request.getHeader('Content-Type')
     * @return {Object|null} header
     */

  }, {
    key: 'getHeader',
    value: function getHeader(key) {
      return this.headers[key] || null;
    }

    /**
     * Get the headers of request
     *
     * @method getHeaders
     * @memberof module:core/request
     * @example request.getHeaders()
     * @return {Object} headers
     */

  }, {
    key: 'getHeaders',
    value: function getHeaders() {
      return this.headers;
    }
  }]);

  return Request;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 *
 * Response class allow to retrieve easily the response from the api
 *
 * @example var response = new Response();
 * @module core/response
 * @author Florian Kroockmann <florian.kroockmann@lp-digital.fr>
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  /**
   * Constructor initialize the data of the request
   */
  function Response() {
    _classCallCheck(this, Response);

    this.headers = {};
    this.data = {};
    this.rawData = '';
    this.status = 200;
    this.statusText = '';
    this.errorText = '';
  }

  /**
   * return all headers of Response
   *
   * @method getHeaders
   * @memberof module:core/response
   * @example response.getHeaders();
   * @return {Object} Headers
   */


  _createClass(Response, [{
    key: 'getHeaders',
    value: function getHeaders() {
      return this.headers;
    }

    /**
     * Return one header by key
     *
     * @method getHeader
     * @memberof module:core/response
     * @example response.getHeader('Content-Type');
     * @param {String} key
     * @return {String|null} header
     */

  }, {
    key: 'getHeader',
    value: function getHeader(key) {
      return this.headers[key] || this.headers[key.toLowerCase()] || null;
    }

    /**
     * Return data, if data not set it
     * will return data raw
     *
     * @method getData
     * @example response.getData();
     * @memberof module:core/response
     * @return {Mixed} data
     */

  }, {
    key: 'getData',
    value: function getData() {
      return '' === this.data ? this.rawData : this.data;
    }

    /**
     * Return raw datas
     *
     * @method getRawData
     * @example response.getRawData();
     * @memberof module:core/response
     * @return {String} raw data
     */

  }, {
    key: 'getRawData',
    value: function getRawData() {
      return this.rawData;
    }

    /**
     * Return status code
     *
     * @method getStatus
     * @example response.getStatus();
     * @memberof module:core/response
     * @return {Number} status
     */

  }, {
    key: 'getStatus',
    value: function getStatus() {
      return this.status;
    }

    /**
     * Return status text
     *
     * @method getStatusText
     * @example response.getStatusText();
     * @memberof module:core/response
     * @return {String} status text
     */

  }, {
    key: 'getStatusText',
    value: function getStatusText() {
      return this.statusText;
    }

    /**
     * Return error text
     *
     * @method getErrorText
     * @example response.getErrorText();
     * @memberof module:core/response
     * @return {String} error text
     */

  }, {
    key: 'getErrorText',
    value: function getErrorText() {
      return this.errorText;
    }

    /**
     * Return the uid from the location header
     *
     * @method getUidFromLocation
     * @example response.getUidFromLocation();
     * @memberof module:core/response
     * @example http://backbee.net/rest/2/classcontent/Text/Paragraph/c9bf609ccdf0f3d5c63a542fd26632f3
     * @return {null|String} uid
     */

  }, {
    key: 'getUidFromLocation',
    value: function getUidFromLocation() {
      var locationHeader = this.getHeader('Location') || this.getHeader('location');
      var res = void 0;
      var regex = void 0;

      if (null === locationHeader) {
        return null;
      }

      regex = new RegExp('[\/]([a-f0-9]{32}$)');

      res = regex.exec(locationHeader);

      return null !== res ? res[1] : res;
    }

    /**
     * Get range from
     *
     * @method getRangeFrom
     * @example response.getRangeFrom();
     * @memberof module:core/response
     * @example Content-Range: 0-8/9
     * @return {Numeric} range from
     */

  }, {
    key: 'getRangeFrom',
    value: function getRangeFrom() {
      var rangeHeader = this.getHeader('Content-Range') || this.getHeader('content-range');
      var res = void 0;

      if (null === rangeHeader) {
        return null;
      }

      res = rangeHeader.split('-');
      if (res[0] === undefined) {
        return null;
      }

      return parseInt(res[0], 10);
    }

    /**
     * Get range to
     *
     * @method getRangeTo
     * @memberof module:core/response
     * @example response.getRangeTo();
     * @example Content-Range: 0-8/9
     * @return {Numeric} range to
     */

  }, {
    key: 'getRangeTo',
    value: function getRangeTo() {
      var rangeHeader = this.getHeader('Content-Range') || this.getHeader('content-range');
      var res = void 0;
      var res2 = void 0;

      if (null === rangeHeader) {
        return null;
      }

      res = rangeHeader.split('/');
      if (res[0] === undefined) {
        return null;
      }

      res2 = res[0].split('-');
      if (res2[1] === undefined) {
        return null;
      }

      return parseInt(res2[1], 10);
    }

    /**
     * Get range total
     *
     * @method getRangeTotal
     * @example response.getRangeTotal();
     * @memberof module:core/response
     * @example Content-Range: 0-8/9
     * @return {Numeric} range total
     */

  }, {
    key: 'getRangeTotal',
    value: function getRangeTotal() {
      var rangeHeader = this.getHeader('Content-Range') || this.getHeader('content-range');
      var res = void 0;

      if (null === rangeHeader) {
        return null;
      }

      res = rangeHeader.split('/');
      if (res[1] === undefined) {
        return null;
      }

      return parseInt(res[1], 10);
    }

    /**
     * Set all headers as object
     *
     * @method setHeaders
     * @example response.setHeaders({
     *    'Content-Type': 'application/x-www-form-uriencoded',
     * })
     * @memberof module:core/response
     * @param {Object} headers
     * @return {Response} this
     */

  }, {
    key: 'setHeaders',
    value: function setHeaders(headers) {
      this.headers = headers;

      return this;
    }

    /**
     * Add one header by name and value
     *
     * @method addHeader
     * @memberof module:core/response
     * @example request.addHeader('Accept', 'application/json');
     * @param {String} name
     * @param {String} value
     * @return {Response} this
     */

  }, {
    key: 'addHeader',
    value: function addHeader(name, value) {
      this.headers[name] = value;

      return this;
    }

    /**
     * Set the data
     *
     * @method setData
     * @memberof module:core/response
     * @example request.setData({
     *    country: 'France,
     * });
     * @param {String} data
     * @return {Response} this
     */

  }, {
    key: 'setData',
    value: function setData(data) {
      this.data = data;

      return this;
    }

    /**
     * Set the raw data
     *
     * @method setRawData
     * @memberof module:core/response
     * @example response.setRawData('{"country": "France"}');
     * @param {String} rawData
     * @return {Response} this
     */

  }, {
    key: 'setRawData',
    value: function setRawData(rawData) {
      this.rawData = rawData;

      return this;
    }

    /**
     * Set the status code
     *
     * @method setStatus
     * @memberof module:core/response
     * @example response.setStatus(200);
     * @param {Number} status
     * @return {Response} this
     */

  }, {
    key: 'setStatus',
    value: function setStatus(status) {
      this.status = status;

      return this;
    }

    /**
     * Set the status text
     *
     * @method setStatusText
     * @memberof module:core/response
     * @example response.setStatusText('200 No Content');
     * @param {String} statusText
     * @return {Response} this
     */

  }, {
    key: 'setStatusText',
    value: function setStatusText(statusText) {
      this.statusText = statusText;

      return this;
    }

    /**
     * Set the error text
     *
     * @method setErrorText
     * @memberof module:core/response
     * @example response.setErrorText('500 Fatal error');
     * @param {String} errorText
     * @return {Response} this
     */

  }, {
    key: 'setErrorText',
    value: function setErrorText(errorText) {
      this.errorText = errorText;

      return this;
    }
  }]);

  return Response;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(5);

global.navigator = { 'userAgent': 'node.js' };

var context = __webpack_require__(6);

context.keys().forEach(context);

module.exports = context;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("localstorage-polyfill");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./core/configHandler.test.js": 7,
	"./core/container.test.js": 9,
	"./core/mediator.test.js": 11,
	"./core/request.test.js": 12,
	"./core/requestHandler.test.js": 13,
	"./core/response.test.js": 16,
	"./core/translator.test.js": 17
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 6;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assert = __webpack_require__(0);

var configHandler = __webpack_require__(8);
var mediator = __webpack_require__(1);

var cb = {
  isReadyFunc: function isReadyFunc(data) {
    data.count = data.count + 1;
  },
  otherEventFunc: function otherEventFunc(data) {
    data.eventsList.push("otherEvent:start");
  }
};

var mockConfig = {
  events: {
    'event:fake1': [{ 'callback': cb.isReadyFunc }]
  },
  bundles: {
    'pages': {
      'events': {
        'application:ready': [{ 'callback': cb.isReadyFunc }, { 'callback': cb.isReadyFunc }],
        'otherEvent:start': [{ 'callback': cb.otherEventFunc }]
      }
    }
  }
};

describe('Config handler', function () {
  it('should throw error if it is initialize with no object parameters', function () {
    assert.throws(configHandler.init);
  });

  it('should throw error if handleEvents is used without parameters', function () {
    assert.throws(configHandler.handleEvents);
  });

  it('should dispatch "config:ready" event when ready', function (done) {
    mediator.subscribe('config:ready', done, true);
    configHandler.init({});
  });

  it('should handle bundle event configuration', function () {
    var data = { count: 0, eventsList: [] };

    configHandler.init(mockConfig);
    mediator.publish('application:ready', data);
    assert.equal(data.count, 2);
    mediator.publish('application:fakeevent', data);
    assert.equal(data.count, 2);

    /* before event */
    assert.deepEqual(data.eventsList, [], "EventsList is empty");
    mediator.publish('otherEvent:start', data);
    assert.deepEqual(data.eventsList, ['otherEvent:start']);
  });

  it('should handle events', function () {
    var eventTest = { count: 0 };

    configHandler.init(mockConfig);

    mediator.publish('event:fake1', eventTest);
    assert.notEqual(eventTest.count, 0);
  });
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Config handler allow to bind events and load the bundles from the config
 *
 * @module core/configHandler
 * @requires core/container
 * @author Florian Kroockmann <florian.kroockmann@lp-digital.fr>
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var mediator = __webpack_require__(1);

/**
 * Put events to the mediator
 *
 * @example configHandler.handleEvents({
 *   events: {
 *     'my-event': [
 *        {'callback': (data) => {console.log('hello world')} }
 *     ]
 *   },
 * });
 * @param  {Object} config
 */
var handleEvents = function handleEvents(config) {
  if (!((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object')) {
    throw new Error('ConfigHandler.handleEvents: expects an object');
  }

  var _loop = function _loop(key) {
    if (config.hasOwnProperty(key)) {
      config[key].forEach(function (event) {
        if (typeof event.callback === 'function') {
          mediator.subscribe(key, event.callback);
        }
      });
    }
  };

  for (var key in config) {
    _loop(key);
  }
};

/**
 * Put events of bundles to the mediator
 *
 * @example configHandler.handleBundles({
 *   events: {
 *     'my-event': [
 *        {'callback': (data) => {console.log('hello world')} }
 *     ]
 *   },
 *   bundles: {
 *     'pages' : {
 *        'events': {
 *           'application:ready': [
 *              {'callback': {console.log('application ready')}},
 *              {'callback': {console.log('hello world')}}
 *           ],
 *           'otherEvent:start': [
 *              {'callback': {console.log('hello world')} }
 *           ]
 *        }
 *     }
 *   }
 * });
 * @param {Object} config
 */
var handleBundles = function handleBundles(config) {
  if (!((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object')) {
    throw new Error('ConfigHandler.handleBundles expects an object');
  }

  for (var key in config) {
    if (config.hasOwnProperty(key)) {
      var bundle = config[key];
      if (bundle.events) {
        handleEvents(bundle.events);
      }
    }
  }
};

/**
 * Initialize events and bundles
 *
 * @example configHandler.init({
 *   bundles: {
 *     'pages' : {
 *        'events': {
 *           'application:ready': [
 *              {'callback': {console.log('application ready')}},
 *              {'callback': {console.log('hello world')}}
 *           ],
 *           'otherEvent:start': [
 *              {'callback': {console.log('hello world')} }
 *           ]
 *        }
 *     }
 *   }
 * });
 * @method init
 * @fires config:ready
 * @param  {Object} config
 */
module.exports.init = function (config) {
  if (!((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object')) {
    throw new Error('ConfigHandler.init : expects an object');
  }

  if (config.bundles) {
    handleBundles(config.bundles);
  }

  if (config.events) {
    handleEvents(config.events);
  }

  mediator.publish('config:ready');
};

module.exports.handleEvents = handleEvents;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var assert = __webpack_require__(0);

var container = __webpack_require__(10);

describe('Container', function () {
  afterEach(function () {
    container.clear();
  });

  it('should function toto return 12', function () {
    assert.deepEqual(12, container.toto());
  });

  it('should have get function', function () {
    assert.deepEqual(_typeof(container.get), 'function');
  });

  it('should have set function', function () {
    assert.deepEqual(_typeof(container.set), 'function');
  });

  it('should have unset function', function () {
    assert.deepEqual(_typeof(container.unset), 'function');
  });

  it('should have clear function', function () {
    assert.deepEqual(_typeof(container.clear), 'function');
  });

  it('should get, set, unset and clear function work', function () {
    assert.deepEqual(container.get('test'), undefined);
    container.set('test', 0);
    assert.deepEqual(container.get('test'), 0);
    container.set('test', 1);
    assert.deepEqual(container.get('test'), 1);
    container.unset('test');
    assert.deepEqual(container.get('test'), undefined);
    container.set('test', 1);
    container.set('test2', 1);
    assert.deepEqual(container.get('test'), 1);
    assert.deepEqual(container.get('test2'), 1);
    container.clear();
    assert.deepEqual(container.get('test'), undefined);
    assert.deepEqual(container.get('test2'), undefined);
  });
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var data = {};

/**
 * Container save all data in a object, you can retrieve them easily
 *
 * @module core/container
 * @author Julien Trollé <julien.trolle@lp-digital.fr>
 * @author Florian Kroockmann <florian.kroockmann@lp-digital.fr>
 */
module.exports = {
  data: data,
  /**
   * Get data with key
   *
   * @example container.get('my-data') // {country: 'France'}
   * @param  {String} key
   * @return {Mixed} data
   */
  get: function get(key) {
    return data[key];
  },

  toto: function toto() {
    return 12;
  },

  /**
   * Set data with key, value
   *
   * @example container.set('my-data', {country: 'France'})
   * @param {String} key
   * @param {Mixed} value
   */
  set: function set(key, value) {
    data[key] = value;
  },

  /**
   * Unset data from container
   *
   * @example container.unset('my-data');
   * @param {String} key
   */
  unset: function unset(key) {
    delete data[key];
  },

  /**
   * Clear container
   * @example container.clear();
   */
  clear: function clear() {
    data = {};
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var assert = __webpack_require__(0);

var mediator = __webpack_require__(1);

describe('Mediator', function () {
  it('should have subscribe function', function () {
    assert.deepEqual(_typeof(mediator.subscribe), 'function');
  });

  it('should have publish function', function () {
    assert.deepEqual(_typeof(mediator.publish), 'function');
  });

  it('should subscribe and publish work', function (done) {
    mediator.subscribe('test-subscribe-publish', done);
    mediator.publish('test-subscribe-publish');
  });

  it('should once subscribe work', function () {
    var count = 0;
    var cb = function cb() {
      count = count + 1;
    };

    assert.deepEqual(count, 0);
    mediator.subscribe('test:subscribe-once', cb, true);
    mediator.publish('test:subscribe-once');
    assert.deepEqual(count, 1);
    mediator.publish('test:subscribe-once');
    assert.deepEqual(count, 1);
  });

  it('should retrieve parameters', function () {
    var data = { 'foo': 'Foo', 'bar': {} };
    var paramData = null;
    var cb = function cb(params) {
      paramData = params;
    };

    assert.notDeepEqual(data, paramData);
    mediator.subscribe('test:param', cb);
    mediator.publish('test:param', data);
    assert.deepEqual(data, paramData);
  });

  it('should clear one event', function () {
    var count = 0;
    var count2 = 0;
    var cb = {
      first: function first() {
        count = count + 1;
      },
      second: function second() {
        count2 = count2 + 1;
      }
    };

    mediator.subscribe('test:clear', cb.first);
    mediator.subscribe('test:clear2', cb.second);

    assert.deepEqual(count, 0);
    mediator.publish('test:clear');
    assert.deepEqual(count, 1);
    mediator.publish('test:clear');
    assert.deepEqual(count, 2);
    mediator.clear('test:clear');
    mediator.publish('test:clear');
    assert.deepEqual(count, 2);

    mediator.publish('test:clear2');
    assert.deepEqual(count2, 1);
  });

  it('should clear several events', function () {
    var count = 0;
    var count2 = 0;
    var cb = {
      first: function first() {
        count = count + 1;
      },
      second: function second() {
        count2 = count2 + 1;
      }
    };

    mediator.subscribe('test:clear', cb.first);
    mediator.subscribe('test:clear2', cb.second);

    assert.deepEqual(count, 0);
    mediator.publish('test:clear');
    assert.deepEqual(count, 1);
    mediator.publish('test:clear');
    assert.deepEqual(count, 2);

    mediator.clear(['test:clear', 'test:clear2']);

    mediator.publish('test:clear');
    assert.deepEqual(count, 2);
    mediator.publish('test:clear2');
    assert.deepEqual(count2, 0);
  });

  it('should clear all events', function () {
    var count = 0;
    var count2 = 0;
    var cb = {
      first: function first() {
        count = count + 1;
      },
      second: function second() {
        count2 = count2 + 1;
      }
    };

    mediator.subscribe('test:clear', cb.first);
    mediator.subscribe('test:clear2', cb.second);

    mediator.publish('test:clear');
    assert.deepEqual(count, 1);
    mediator.publish('test:clear2');
    assert.deepEqual(count2, 1);

    mediator.clear();

    mediator.publish('test:clear');
    mediator.publish('test:clear2');
    assert.deepEqual(count, 1);
    assert.deepEqual(count2, 1);
  });
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var assert = __webpack_require__(0);

var Request = __webpack_require__(2);

describe('Request class', function () {
  it('should have addHeader function', function () {
    var request = new Request();

    assert.deepEqual(_typeof(request.addHeader), 'function');
  });

  it('should have null data as default', function () {
    var request = new Request();

    assert.deepEqual(request.data, null);
  });

  it('should have getContentType function', function () {
    var request = new Request();

    assert.deepEqual(_typeof(request.getContentType), 'function');
  });

  it('should have getData function', function () {
    var request = new Request();

    assert.deepEqual(_typeof(request.getData), 'function');
  });

  it('should have getHeader function', function () {
    var request = new Request();

    assert.deepEqual(_typeof(request.getHeader), 'function');
  });

  it('should have getMethod function', function () {
    var request = new Request();

    assert.deepEqual(_typeof(request.getMethod), 'function');
  });

  it('should have getUrl function', function () {
    var request = new Request();

    assert.deepEqual(_typeof(request.getUrl), 'function');
  });

  it('should have application/x-www-form-uriencoded header by default', function () {
    var request = new Request();

    assert.deepEqual(request.headers, { 'Content-Type': 'application/x-www-form-uriencoded' });
  });

  it('should have "GET" method by default', function () {
    var request = new Request();

    assert.deepEqual(request.method, 'GET');
  });

  it('should have setContentType function', function () {
    var request = new Request();

    assert.deepEqual(_typeof(request.setContentType), 'function');
  });

  it('should have setData function', function () {
    var request = new Request();

    assert.deepEqual(_typeof(request.setData), 'function');
  });

  it('should have setHeaders function', function () {
    var request = new Request();

    assert.deepEqual(_typeof(request.setHeaders), 'function');
  });

  it('should have setMethod function', function () {
    var request = new Request();

    assert.deepEqual(_typeof(request.setMethod), 'function');
  });

  it('should have empty url by default', function () {
    var request = new Request();

    assert.deepEqual(request.url, '');
  });

  it('should get/set url functions work', function () {
    var request = new Request();
    var url = 'localhost';

    request.setUrl(url);
    assert.deepEqual(request.getUrl(), url);
  });

  it('should set/get method functions work', function () {
    var request = new Request();
    var method = 'delete';

    request.setMethod(method);
    assert.deepEqual(request.getMethod(), method.toUpperCase());
  });

  it('should set/get data functions work', function () {
    var request = new Request();
    var data = { 'foo': 'Foo' };

    request.setData(data);
    assert.deepEqual(request.getData(), data);
  });

  it('should set/get headers functions work', function () {
    var request = new Request();
    var headers = { 'Content-Type': 'application/json' };

    request.setHeaders(headers);
    assert.deepEqual(request.getHeaders(), headers);
  });

  it('should set/get header functions work', function () {
    var request = new Request();
    var contentType = 'application/json';
    var secondHeader = 'Foo';

    request.addHeader('Content-Type', contentType);
    assert.deepEqual(request.getHeader('Content-Type'), contentType);

    request.addHeader('foo', secondHeader);
    assert.deepEqual(request.getHeader('Content-Type'), contentType);
    assert.deepEqual(request.getHeader('foo'), secondHeader);
  });

  it('should set/get contentType functions work', function () {
    var request = new Request();
    var contentType = 'application/json';

    request.setContentType(contentType);
    assert.deepEqual(request.getContentType(), contentType, 'Set/Get contentType works');
  });
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var assert = __webpack_require__(0);

var requestHandler = __webpack_require__(14);
var Request = __webpack_require__(2);
var Response = __webpack_require__(3);
var mediator = __webpack_require__(1);

describe('Request handler', function () {
  it('should have create function', function () {
    assert.deepEqual(_typeof(requestHandler.create), 'function');
  });

  it('should have del function', function () {
    assert.deepEqual(_typeof(requestHandler.del), 'function');
  });

  it('should have link function', function () {
    assert.deepEqual(_typeof(requestHandler.link), 'function');
  });

  it('should have patch function', function () {
    assert.deepEqual(_typeof(requestHandler.patch), 'function');
  });

  it('should have read function', function () {
    assert.deepEqual(_typeof(requestHandler.read), 'function');
  });

  it('should have update function', function () {
    assert.deepEqual(_typeof(requestHandler.update), 'function');
  });

  it('should have send function', function () {
    assert.deepEqual(_typeof(requestHandler.send), 'function');
  });

  it('should have setBaseUrl function', function () {
    assert.deepEqual(_typeof(requestHandler.setBaseUrl), 'function');
  });

  it('should have getBaseUrl function', function () {
    assert.deepEqual(_typeof(requestHandler.getBaseUrl), 'function');
  });

  it('should have addSearch function', function () {
    assert.deepEqual(_typeof(requestHandler.addSearch), 'function');
  });

  it('should setBaseUrl/getBaseUrl function work', function () {
    requestHandler.setBaseUrl('backbee');

    assert.deepEqual(requestHandler.getBaseUrl(), 'backbee');
  });

  it('should throw error if no paramaters is given to send function', function () {
    assert.throws(requestHandler.send);
  });
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var jQuery = __webpack_require__(15);

var mediator = __webpack_require__(1);
var Request = __webpack_require__(2);
var Response = __webpack_require__(3);
var requestHandler = void 0;

var baseUrl = '';

/**
 * Request handler create a call to the api with several functions:
 *
 * That build a response and request object for retrieve data
 *
 * @module core/requestHandler
 * @requires jquery
 * @requires core/mediator
 * @requires core/request
 * @requires core/response
 * @author Florian Kroockmann <florian.kroockmann@lp-digital.fr>
 */
module.exports = requestHandler = {
  /**
   * Create a POST request
   *
   * @method create
   * @example RequestHandler.create('classcontent/Text/Paragraph/c9bf609ccdf0f3d5c63a542fd26632f3', data);
   * @param  {String} type
   * @param  {Object} data
   * @param  {Object} criteria
   * @param  {Object} orderBy
   * @param  {Integer} start
   * @param  {Integer} limit
   * @return {Promise} data
   */
  create: function create(type, data, criteria, orderBy, start, limit) {
    return handle('post', type, formatData(data, criteria, orderBy, start, limit));
  },

  /**
   * Create DELETE request
   *
   * @method del
   * @example RequestHandler.del('classcontent/Text/Paragraph/c9bf609ccdf0f3d5c63a542fd26632f3', data);
   * @param  {String} type
   * @param  {Object} criteria
   * @param  {Object} orderBy
   * @param  {Integer} start
   * @param  {Integer} limit
   * @return {Promise} data
   */
  del: function del(type, criteria, orderBy, start, limit) {
    return handle('delete', type, formatData({}, criteria, orderBy, start, limit));
  },

  /**
   * Create GET request
   *
   * @method read
   * @example RequestHandler.read('pages', {'title': 'preview'});
   * @param  {String} type
   * @param  {Object} criteria
   * @param  {Object} orderBy
   * @param  {Integer} start
   * @param  {Integer} limit
   * @return {Promise} data
   */
  read: function read(type, criteria, orderBy, start, limit) {
    return handle('get', type, formatData({}, criteria, orderBy, start, limit));
  },

  /**
   * Create PUT request
   *
   * @method update
   * @example RequestHandler.update('classcontent/Text/Paragraph/c9bf609ccdf0f3d5c63a542fd26632f3', data);
   * @param  {String} type
   * @param  {Object} data
   * @param  {Object} criteria
   * @param  {Object} orderBy
   * @param  {Integer} start
   * @param  {Integer} limit
   * @return {Promise} data
   */
  update: function update(type, data, criteria, orderBy, start, limit) {
    return handle('put', type, formatData(data, criteria, orderBy, start, limit));
  },

  /**
   * Create LINK request
   *
   * @method link
   * @example RequestHandler.link('classcontent/Text/Paragraph/c9bf609ccdf0f3d5c63a542fd26632f3', data);
   * @param  {String} type
   * @param  {Object} data
   * @param  {Object} criteria
   * @param  {Object} orderBy
   * @param  {Integer} start
   * @param  {Integer} limit
   * @return {Promise} data
   */
  link: function link(type, data, criteria, orderBy, start, limit) {
    return handle('link', type, formatData(data, criteria, orderBy, start, limit));
  },

  /**
   * Create PATCH request
   *
   * @method patch
   * @example RequestHandler.patch('classcontent/Text/Paragraph/c9bf609ccdf0f3d5c63a542fd26632f3', data);
   * @param  {String} type
   * @param  {Object} data
   * @param  {Object} criteria
   * @param  {Object} orderBy
   * @param  {Integer} start
   * @param  {Integer} limit
   * @return {Promise} data
   */
  patch: function patch(type, data, criteria, orderBy, start, limit) {
    return handle('patch', type, formatData(data, criteria, orderBy, start, limit));
  },

  /**
   * Set the base url of the api
   *
   * @method setBaseUrl
   * @example request.setBaseUrl('localhost');
   * @param {String} url
   * @return {requestHandler} this
   */
  setBaseUrl: function setBaseUrl(url) {
    baseUrl = url;

    return this;
  },

  /**
   * Return the current base url
   *
   * @method getBaseUrl
   * @example request.getBaseUrl();
   * @return {String} base url
   */
  getBaseUrl: function getBaseUrl() {
    return baseUrl;
  },

  /**
   * Send the request to the api
   *
   * @method send
   * @example request.send(request);
   * @param  {request} request
   * @return {Promise} response
   */
  send: function send(request) {
    var dfd = jQuery.Deferred();
    var config = {};

    if (request instanceof Request) {
      mediator.publish('request:send:before', request);

      config = {
        url: encodeURI(request.getUrl()),
        type: request.getMethod(),
        data: request.getData(),
        headers: request.getHeaders()
      };

      jQuery.ajax(config).done(function (data, statusText, xhr) {
        var response = buildResponse(xhr, statusText, data);

        mediator.publish('request:send:done', response);

        dfd.resolve(response.getData(), response, request);
      }).fail(function (xhr, statusText, errorThrown) {
        var response = buildResponse(xhr, statusText, '', errorThrown);

        mediator.publish('request:send:fail', {
          request: request,
          response: response
        });

        dfd.reject(response, request);
      });
    } else {
      throw new Error('The parameter must be an instance of Request');
    }

    return dfd.promise();
  },

  /**
   * Add search to the url
   *
   * @method addSearch
   * @example request.addSearch('/api', 'country', 'france')
   * @param {String} url
   * @param {String} key
   * @param {String} value
   * @return {String} url
   */
  addSearch: function addSearch(url, key, value) {
    return url + (url.indexOf('?') !== -1 ? '&' : '?') + (key + '=' + value);
  }
};

/**
 * Build reponse from the xfr object
 *
 * @ignore
 * @param  {Object} xhr
 * @param  {String} statusText
 * @param  {Object} data
 * @param  {String} errorThrown
 * @return {response} response
 */
var buildResponse = function buildResponse(xhr, statusText, data, errorThrown) {
  var response = new Response();

  buildHeaders(xhr.getAllResponseHeaders(), response);

  if (data) {
    response.setData(data);
  }

  response.setRawData(xhr.responseText);
  response.setStatus(xhr.status);
  response.setStatusText(statusText);

  if (errorThrown) {
    response.setErrorText(errorThrown);
  }

  return response;
};

/**
 * Build the data from request
 *
 * @ignore
 * @param  {Object} data
 * @param  {Object} criteria
 * @param  {Object} orderBy
 * @param  {Integer} start
 * @param  {Integer} limit
 * @return {Object} data
 */
var formatData = function formatData(data, criteria, orderBy, start, limit) {
  return {
    data: data,
    criteria: criteria || null,
    orderBy: orderBy || {},
    start: start || 0,
    limit: limit || null
  };
};

/**
 * Builds headers to the response
 *
 * @ignore
 * @param  {String} headers
 * @param  {response} response
 */
var buildHeaders = function buildHeaders(headers, response) {
  headers.split('\r').forEach(function (header) {
    var identifierPos = header.indexOf(':');

    if (-1 !== identifierPos) {
      var name = header.substring(0, identifierPos).trim();
      var value = header.substring(identifierPos + 1).trim();

      response.addHeader(name, value);
    }
  });
};

/**
 * Handle the request
 *
 * @ignore
 * @param  {String} method
 * @param  {String} type
 * @param  {Object} data
 * @return {Promise} data
 */
var handle = function handle(method, type, data) {
  var url = baseUrl;
  var range = void 0;
  var request = new Request();

  request.headers = {};
  request.setContentType('application/json');
  request.addHeader('Accept', 'application/json');

  url = url + '/' + type;

  if ('get' === method) {
    request.setMethod('GET');
    url = computeCriteria(url, data);
  } else if ('put' === method || 'patch' === method || 'link' === method || 'delete' === method) {
    request.setMethod('update' === method ? 'put' : method);
    url = computeCriteria(url, data);

    if (data.hasOwnProperty('data')) {
      if ('patch' === method) {
        request.setData(computePatchOperations(data.data));
      } else {
        request.setData(data.data);
      }
    }
  } else if ('post' === method) {
    request.setMethod('POST');
    url = computeCriteria(url, data);

    if (data.hasOwnProperty('data')) {
      request.setData(data.data);
    }
  }

  if (data.hasOwnProperty('limit') && null !== data.limit) {
    range = (data.hasOwnProperty('start') ? data.start : '0') + ',' + data.limit;
    request.addHeader('Range', range);
  }

  url = computeOrderBy(url, data);

  request.setUrl(url);

  if (null !== request.getData()) {
    request.setData(JSON.stringify(request.getData()));
  }

  mediator.publish('rest:send:before', request);

  return requestHandler.send(request);
};

/**
 * Compute order by
 *
 * @ignore
 * @param  {String} url
 * @param  {Object} data
 * @return {String} url
 */
var computeOrderBy = function computeOrderBy(url, data) {
  if (_typeof(data.orderBy) === 'object') {
    for (var key in data.orderBy) {
      if (data.orderBy.hasOwnProperty(key)) {
        var order = data.orderBy[key];

        url = requestHandler.addSearch(url, 'order_by[' + key + ']', order);
      }
    }
  }

  return url;
};

/**
 * Compute criteria
 *
 * @ignore
 * @param  {String} url
 * @param  {Object} data
 * @return {String} url
 */
var computeCriteria = function computeCriteria(url, data) {
  var criteria = data.criteria || null;

  if (null === criteria) {
    return url;
  }

  for (var key in criteria) {
    if (criteria.hasOwnProperty(key)) {
      var criterion = criteria[key];

      if ('uid' === key || 'id' === key) {
        url = url + (url[url.length - 1] === '/' ? '' : '/') + criterion.toString();
      } else {
        url = requestHandler.addSearch(url, key, criterion);
      }
    }
  }

  return url;
};

/**
 * Compute patch operations
 *
 * @ignore
 * @param  {Object} data
 * @return {Array} operations
 */
var computePatchOperations = function computePatchOperations(data) {
  var operations = [];

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var value = data[key];

      operations.push({
        op: 'replace',
        path: '/' + key,
        value: value
      });
    }
  }

  return operations;
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("jquery");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var assert = __webpack_require__(0);

var Response = __webpack_require__(3);

describe('Response class', function () {
  it('should have an empty object for data', function () {
    var response = new Response();

    assert.deepEqual(response.data, {});
  });

  it('should have an empty error text', function () {
    var response = new Response();

    assert.deepEqual(response.errorText, '');
  });

  it('should have an empty object for headers', function () {
    var response = new Response();

    assert.deepEqual(response.headers, {});
  });

  it('should have a 200 status code by default', function () {
    var response = new Response();

    assert.deepEqual(response.status, 200);
  });

  it('should have an empty status text', function () {
    var response = new Response();

    assert.deepEqual(response.statusText, '');
  });

  it('should have addHeader function', function () {
    var response = new Response();

    assert.deepEqual(_typeof(response.addHeader), 'function');
  });

  it('should have getData function', function () {
    var response = new Response();

    assert.deepEqual(_typeof(response.getData), 'function');
  });

  it('should have getErrorText function', function () {
    var response = new Response();

    assert.deepEqual(_typeof(response.getErrorText), 'function');
  });

  it('should have getHeader function', function () {
    var response = new Response();

    assert.deepEqual(_typeof(response.getHeader), 'function');
  });

  it('should have getHeaders function', function () {
    var response = new Response();

    assert.deepEqual(_typeof(response.getHeaders), 'function');
  });

  it('should have getRangeFrom function', function () {
    var response = new Response();

    assert.deepEqual(_typeof(response.getRangeFrom), 'function');
  });

  it('should have getRangeTo function', function () {
    var response = new Response();

    assert.deepEqual(_typeof(response.getRangeTo), 'function');
  });

  it('should have getRangeTotal function', function () {
    var response = new Response();

    assert.deepEqual(_typeof(response.getRangeTotal), 'function');
  });

  it('should have getRawData function', function () {
    var response = new Response();

    assert.deepEqual(_typeof(response.getRawData), 'function');
  });

  it('should have getStatus function', function () {
    var response = new Response();

    assert.deepEqual(_typeof(response.getStatus), 'function');
  });

  it('should have getStatusText function', function () {
    var response = new Response();

    assert.deepEqual(_typeof(response.getStatusText), 'function');
  });

  it('should have getUidFromLocation function', function () {
    var response = new Response();

    assert.deepEqual(_typeof(response.getUidFromLocation), 'function');
  });

  it('should have setData function', function () {
    var response = new Response();

    assert.deepEqual(_typeof(response.setData), 'function');
  });

  it('should have setErrorText function', function () {
    var response = new Response();

    assert.deepEqual(_typeof(response.setErrorText), 'function');
  });

  it('should have setHeaders function', function () {
    var response = new Response();

    assert.deepEqual(_typeof(response.setHeaders), 'function');
  });

  it('should have setRawData function', function () {
    var response = new Response();

    assert.deepEqual(_typeof(response.setRawData), 'function');
  });

  it('should have setStatus function', function () {
    var response = new Response();

    assert.deepEqual(_typeof(response.setStatus), 'function');
  });

  it('should have setStatusText function', function () {
    var response = new Response();

    assert.deepEqual(_typeof(response.setStatusText), 'function');
  });

  it('should add/get header function work', function () {
    var response = new Response();
    var contentType = 'application/json';

    assert.deepEqual(response.headers, {});

    response.addHeader('Content-Type', contentType);
    assert.deepEqual(response.getHeader('Content-Type'), contentType);
  });

  it('should set/get headers function work', function () {
    var response = new Response();
    var headers = { 'Content-Type': 'application/json' };

    response.setHeaders(headers);

    assert.deepEqual(response.getHeaders(), headers);
  });

  it('should set/get data function work', function () {
    var response = new Response();
    var data = { 'foo': 'Foo' };

    response.setData(data);
    assert.deepEqual(response.getData(), data);
  });

  it('should set/get errorText function work', function () {
    var response = new Response();
    var error = 'An error occured';

    response.setErrorText(error);
    assert.deepEqual(response.getErrorText(), error);
  });

  it('should set/get rawData function work', function () {
    var response = new Response();
    var rawData = '{"Foo": "foo"}';

    response.setRawData(rawData);
    assert.deepEqual(response.getRawData(), rawData);
  });

  it('should set/get status function work', function () {
    var response = new Response();
    var status = 500;

    response.setStatus(status);
    assert.deepEqual(response.getStatus(), status);
  });

  it('should set/get statusText function work', function () {
    var response = new Response();
    var statusText = '500 Internal error';

    response.setStatusText(statusText);
    assert.deepEqual(response.getStatusText(), statusText);
  });

  it('should rangeFrom function without Content-Range work', function () {
    var response = new Response();

    assert.deepEqual(response.getRangeFrom(), null);
  });

  it('should rangeFrom function work', function () {
    var response = new Response();

    response.addHeader('Content-Range', '0-31/32');
    assert.deepEqual(response.getRangeFrom(), 0);
  });

  it('should rangeTo without Content-Range work', function () {
    var response = new Response();

    assert.deepEqual(response.getRangeTo(), null);
  });

  it('should rangeTo function work', function () {
    var response = new Response();

    response.addHeader('Content-Range', '0-31/32');
    assert.deepEqual(response.getRangeTo(), 31);
  });

  it('should rangeTotal without Content-Range work', function () {
    var response = new Response();

    assert.deepEqual(response.getRangeTotal(), null);
  });

  it('should rangeTotal function work', function () {
    var response = new Response();

    response.addHeader('Content-Range', '0-31/32');
    assert.deepEqual(response.getRangeTotal(), 32);
  });

  it('should getUidFromLocation function without Location header return null', function () {
    var response = new Response();

    assert.deepEqual(response.getUidFromLocation(), null);
  });

  it('should getUidFromLocation function with bad location return null', function () {
    var response = new Response();

    response.addHeader('Location', 'foo');
    assert.deepEqual(response.getUidFromLocation(), null);
  });

  it('should getUidFromLocation work', function () {
    var response = new Response();
    var uid = 'cdf458ccda03d0b61a33aaa921c4d376';

    response.addHeader('Location', 'http://foo/' + uid);

    assert.deepEqual(response.getUidFromLocation(), uid);
  });
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var assert = __webpack_require__(0);

var translator = __webpack_require__(18);
var mediator = __webpack_require__(1);

translator.setCatalog('en', __webpack_require__(21));
translator.setCatalog('fr', __webpack_require__(22));

describe('Translator', function () {
  it('should have setLocale function', function () {
    assert.deepEqual(_typeof(translator.setLocale), 'function');
  });

  it('should have setCatalog function', function () {
    assert.deepEqual(_typeof(translator.setCatalog), 'function');
  });

  it('should have init function', function () {
    assert.deepEqual(_typeof(translator.init), 'function');
  });

  it('should have translate function', function () {
    assert.deepEqual(_typeof(translator.translate), 'function');
  });

  it('should not translate if locale is not define', function () {
    translator.setLocale('xx');
    translator.init();
    assert.deepEqual(translator.translate('not_defined'), 'not_defined');
    assert.deepEqual(translator.getLocale(), 'xx');
  });

  it('should translate if locale is define', function () {
    translator.setLocale('en');
    assert.deepEqual(translator.getLocale(), 'en', 'Define locale "en"');
    assert.deepEqual(translator.translate('yes'), 'Yes', 'Translate return correct value "Yes" for key "yes"');
    assert.deepEqual(translator.translate('not_defined'), 'not_defined', 'Translate return the key when it is not defined');
  });

  it('should translate with data', function () {
    translator.setLocale('en');
    assert.deepEqual(translator.translate('results', { n: 4 }), 'There are 4 results');
    assert.deepEqual(translator.translate('pagination', { current: 4, total: 10 }), '4/10');
  });
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var catalogs = {};
var localeFallback = 'en';
var locale = localeFallback;

catalogs.en = __webpack_require__(19);
catalogs.fr = __webpack_require__(20);

var availableLangs = ['fr', 'en'];

/**
 * Translator allow to change locale, translate sentence
 *
 * @module core/translator
 * @author Julien Trollé <julien.trolle@lp-digital.fr>
 * @author Florian Kroockmann <florian.kroockmann@lp-digital.fr>
 */
module.exports = {
  /**
   * Initialize the user lang and define the locale
   *
   * @example translator.init();
   */
  init: function init() {
    var userLang = navigator.language || navigator.userLanguage;
    var storage = localStorage.getItem('locale');

    if (!storage) {
      if (userLang) {
        var lang = userLang.substring(0, 2);
        this.setLocale(availableLangs.indexOf(lang) !== -1 ? lang : localeFallback);
      } else {
        this.setLocale(localeFallback);
      }
    } else {
      this.setLocale(storage);
    }
  },

  /**
   * Return the current locale
   *
   * @example translator.getLocale();
   * @return {String} locale
   */
  getLocale: function getLocale() {
    return locale;
  },

  /**
   * Set the locale and put in the local storage
   *
   * @example translator.setLocale('fr');
   * @param {String} l
   */
  setLocale: function setLocale(l) {
    locale = l;
    localStorage.setItem('locale', locale);
  },

  /**
   * Set the catalog
   *
   * @example translator.setCatalog('fr', {'name': 'Nom'});
   * @param {String} lang
   * @param {Object} data
   */
  setCatalog: function setCatalog(lang, data) {
    catalogs[lang] = data;
  },

  /**
   * Translate the sentence by a key and replace parameters
   *
   * @example translator.translate('name');
   * @example translate.translate('my name is {name}', {'name': 'Florian'});
   * @param  {String} key
   * @param  {Object} parameters
   * @return {String} value
   */
  translate: function translate(key, parameters) {
    var value = key;

    if (catalogs[locale] !== undefined && catalogs[locale][key] !== undefined) {
      value = catalogs[locale][key];
    }

    if (parameters !== undefined) {
      value = this.replace(value, parameters);
    }

    return value;
  },

  /**
   * Add keys/values in the catalag
   *
   * @example translator.translate({'firstname': 'Prénom'}, 'fr');
   * @param {Object} data
   * @param {String} lang
   */
  addTransKeys: function addTransKeys(data, lang) {
    if (catalogs[lang]) {
      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
        Object.assign(catalogs[lang], data);
      }
    }
  },

  /**
   * Replace parameters from the sentence
   *
   * @example translate.replace('my name is {name}', {'name': 'Florian'});
   * @param  {String} sentence
   * @param  {Object} parameters
   * @return {String} sentence
   */
  replace: function replace(sentence, parameters) {
    if (typeof parameters === 'string') {
      parameters = JSON.parse(parameters);
    }

    for (var key in parameters) {
      if (parameters.hasOwnProperty(key)) {
        var parameter = parameters[key];
        sentence = sentence.replace('{' + key + '}', parameter);
      }
    }

    return sentence;
  }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = { "add_content": "Add content", "add_content_plus": "Click to add content", "adsense_connected_message": "Bloc Adsense (will be displayed online)", "adblock_detect_title": "Ad blocker detected", "adblock_detect_description": "To use Adsense block, you have to disable your ad blocker and refresh the page.", "an_error_occured": "An error occured", "auth_instagram": "Authenticate to instagram", "auth_instagram_successfull": "Authentication successful", "add_link_button": "Add link button", "add_link_lightbox": "Enlarge image", "add_link_on_image": "Add link on image", "add_item": "Add item", "add_user": "Add user", "administrator": "Administrator", "administrator_permissions": "has all rights on the website", "all": "All", "all_lang": "All languages", "all_page": "All pages", "back": "Back", "bad_login": "Invalid authentication informations", "background_blur": "Background blur", "background_color": "Background color", "background_image": "Background image", "background_options": "Background options", "background_overlay": "Background overlay", "background_parallax": "Parallax effect", "background_video": "Background video", "background_video_thumbnail": "Choose a thumbnail for video", "background_video_url": "Video URL", "bad_credentials": "Bad credentials", "button_to_set_up_your": "button to set up your", "block": "Block", "block_category_basics": "Basics", "block_category_pages": "Pages", "block_category_social": "Social", "block_category_more": "More", "browse": "Browse", "bundle_activate": "Activate bundle", "bundle_management": "Extensions", "cancel": "Cancel", "cancel-auth": "Cancel", "cancel_publish_message": "Do you want to discard your changes? <br /> You will get back to the online version.", "cancel_publish_title": "Cancel modifications", "change_password": "Change password", "check_video_url": "Check", "choose_content_location": "Choose content location", "choose_list": "Select a mailing list", "choose_picture": "Choose an image", "clear_filters": "Clear all filters", "close": "Close", "click_on_the": "Click on the", "code_format_error": "Incorrect format", "color": "Color", "column_height": "Column height", "column_width": "Column width", "configure": "Settings", "confirm": "Confirm", "confirm_new_password": "Confirm new password", "confirm_password": "Confirm password", "connect_mailchimp": "Use MailChimp", "connected": "connected", "connection": "Sign in", "connection_problem": "Check your internet speed!", "content_added": "Content added!", "content_deleted": "Content deleted!", "content_edited": "Content set!", "contents_list": "Contents list", "contributor": "Contributor", "contributor_permissions": "can edit website but can't publish modifications. He can't access website's general settings", "create_new_user": "Create a user", "default_empty_text_message": "Write your story down, be the first to publish, it is Live Blogging!", "default_lang": "Default language", "default_lang_confirmation_message": "You chose <strong>_LANG_</strong> as default language.<br>Please note that your choice is definitive.<br>Activate multilanguage ?<br>It can take a few minutes.", "default_lang_finish_message": "Multilanguage was activated successfully. You can now create pages in several languages", "default_lang_finish_title": "Multilanguage", "default_lang_popin_title": "Multilanguage activation", "default_language_error": "Please select your website default language", "delete": "Delete", "delete_page": "Delete page", "delete_user": "Delete", "delete_user_confirmation": "Are you sure to delete this user ?", "drop_image_label": "Click to upload image", "drop_image_file": "Click to upload file", "duplicate_done": "Page duplicated", "discard": "Discard", "edit": "Edit", "edit_user": "Edit user", "email": "Email", "email_error": "Email is not correct", "empty_error": "This field must not be empty", "email_exist_error": "An account already exist with this email", "enter_new_password": "Enter new password", "enter_password": "Enter password", "error": "Oops! An Error Occurred", "error_current_password": "Your password is incorrect", "error_password_format": "Please respect password requirements", "error_password_format_description": "Password must contains", "error_password_format1": "A minimum of 8 caracters", "error_password_format2": "A minimum of 1 capital letter", "error_password_format3": "A minimum of 1 regular letter", "error_password_format4": "A minimum of 1 symbol (!,@,?,&...)", "error_password_length": "Passwords must be at least 6 characters", "error_password_same": "Passwords do not match", "error_permissions": "Please assign new user to one of the 3 groups available", "favicon": "Favicon", "favicon_advice": "Please upload a 152px*152px PNG image", "favicon_change": "Change favicon", "favicon_upload": "Upload favicon", "favicon_infos": "A favicon is the icon associated with your website. It is displayed in the address bar of the browser viewing the site.", "focus_image": "Image focus", "forgot_password": "Forgot your password?", "firstname": "Firstname", "full_color": "Full color", "fullwidth": "Fullwidth", "ga_tag_management": "Taggage Analytics", "hauth_signin": "Sign in with:", "height": "Height", "image": "Image", "layer_options": "Layer options", "layout": "Layout", "large": "Large", "lastname": "Lastname", "lang_management": "Multilanguage", "latest_pages_modified": "Latest pages modified", "link_target": "Open in a new tab", "list_of_selected_lang": "List of selected langs", "login": "Login", "logout": "Logout", "logout_button_publish": "Publish & Log out", "logout_message": "Do you want to logout ?", "logout_message_publish": "You did not publish all your modifications", "line_color": "Line color", "language_fr": "FR", "language_en": "EN", "language_default_value": "Your website default language", "manage_languages": "Manage languages", "mailchimp_account_connected": "MailChimp account connected", "mailchimp_choose_list": "Choose list from mailchimp", "mailchimp_missing_list": "You must create an list into mailchimp before use this block", "marge": "Marge", "media": "Media", "medium": "Medium", "menu_disable_page": "Use as title only", "menu_form_explanation": "Find a page and add it to the navigation menu", "menu_label_placeholder": "Label of item", "menu_url_placeholder": "Tap to search or put url", "missing_login": "Enter login please", "missing_password": "Enter password please", "missing_parameter_first_part": "Click the ", "missing_parameter_second_part": "button to set your ", "missing_parameter_third_part": "content", "my_account": "My account", "mobile_display": "Mobile display", "modified_page": "Unpublished content", "modified_pages_list": "See other pages to publish", "more_options": "More options", "more_parameters": "Site parameters", "move_content_mobile": "Move content here", "multilang_parameters_saved": "Multilanguage settings saved", "my_image": "My images", "new_page": "New page", "new_page_article": "Post", "new_page_blank": "Blank page", "new_page_duplicate": "Duplicate", "new_page_custom_gallery": "Gallery", "new_page_custom_contact": "Contact", "new_page_custom_2_columns": "2 columns", "new_page_custom_3_columns": "3 columns", "new_page_custom_4_columns": "4 columns", "new_page_event": "New page event", "new_page_lang": "Language", "new_page_title_error": "Title must have 2 characters min.", "next": "Next", "no": "No", "no_link": "No link", "no_page_found": "No page found", "not_yet_published": "Not yet published", "nothing_to_cancel": "Nothing to cancel", "nothing_to_publish": "Nothing to publish", "normal": "Normal", "no_modified_pages": "No pages to publish", "no_page_message": "This page does not exist. <br/>If multilanguage is activated, <br/>please check you are on the right website", "no_tag_message": "This tag does not exist", "off": "OFF", "offline": "Offline", "on": "ON", "open_link_new_tab": "Open in new window", "page_created": "Page created", "page_delete_confirmation": "Your page has been deleted", "page_delete_modal_title": "Delete page", "page_delete_modal_message": "Do you want to delete this page?", "page_error": "Page error", "page_error_404_settings": "Error 404 settings", "page_error_500_settings": "Error 500 settings", "page_error_title": "Title", "page_error_description": "Description", "page_error_button_title": "Button title", "page_error_button_placeholder": "Back to homepage", "page_errors": "Page errors", "page_errors_management": "Custom errors pages", "page_parameters": "Page parameters", "page_parameters_form_title": "Title", "page_parameters_form_offline": "Offline", "page_parameters_form_online": "Online", "page_parameters_form_tags": "Tags", "page_parameters_form_keywords": "Keywords", "page_parameters_form_keywords_placeholder": "Separate the words with a comma", "page_filter_by_modifed_date": "Last pages modified", "page_filter_by_latest_create_date": "Last pages created", "page_filter_by_oldest_create_date": "First pages created", "page_filter_create_date_placeholder": "Sort by creation date", "page_filter_label": "Filters", "page_filter_language_placeholder": "Sort by language", "page_filter_results_label": "List of pages", "page_filter_status_placeholder": "Sort by status", "page_filter_tag_placeholder": "Sort by tag", "page_status": "Status of page", "page_parameters_form_publication_date": "Publication date", "parameters": "Settings", "parameters_saved": "Settings saved", "password": "Password", "previous": "Previous", "publish": "Publish", "publish_all_pages": "All pages", "publish_this_page": "This page", "publisher": "Publisher", "publish_all": "Publish all", "publish_all_page_done": "All pages published!", "publish_all_page_question": "This page has been published. You also modified others pages. Do you want to see these pages?", "publish_done": "The content of this page is now online!", "publish_modified_pages": "Publish all modified pages?", "publish_other_pages_question": "Nothing to publish on this page. Do you want to see modifications made on other pages?", "publisher_permissions": "has all rights on publication but can't access website's general settings", "publishing": "Publishing", "publishing_of": "Pulishing:", "picto_explanation": "This option allows you to display a <strong>pictogram</strong> centered horizontally and vertically over your image.", "remove": "Remove", "remove_gutter": "Remove gutter", "remove_margin": "Remove margin", "remove_padding": "Remove padding", "remove_image": "Remove image", "required_fields": "This field is required", "responsive_description": "Choose how contents will be display on mobile and tablet", "responsive_mobile": "Mobile", "responsive_tablet": "Tablet", "responsive_number_of_content": "Number of content visible", "responsive_number_of_content_side_by_side": "Number of content side by side", "result": "Result", "rte-anchor": "Link", "rte-blockquote": "Quote", "rte-bold": "Bold", "rte-h1": "Title 1", "rte-h2": "Title 2", "rte-h3": "Title 3", "rte-italic": "Italic", "rte-justify-center": "Center", "rte-justify-full": "Justify", "rte-justify-left": "Align left", "rte-justify-right": "Align right", "rte-link-placeholder": "Paste or type a link", "rte-list-ordered": "Numbered list", "rte-list-unordered": "Bullet points", "rte-remove-format": "Clear style", "rte-underline": "Underline", "tag_created": "Tag created", "tag_create_btn": "Create tag \"{tag}\"", "tag_deleted": "Tag deleted", "tag_delete_confirm": "Do you want to delete this tag '{n}'?", "tag_delete_confirm_title": "Delete tag", "tag_delete_modal_title": "Delete tag", "tag_delete_on_pages_confirm": "This tag is on the following page(s)", "tag_management": "Tag management", "tag_management_description": "Search and/or create tags", "to_publish": "Modified pages", "translate_bo": "Interface language", "translate_to_english": "English", "translate_to_french": "French", "search": "Search", "search_location": "Search your location", "search_page": "Search my pages", "search_page_all_published": "No modified pages found", "search_page_type_form_explanation": "Search one or several pages to add", "search_no_result": "No result", "seo_description": "SEO for page description", "select_lang": "Select lang", "select_active_lang_description": "Choose your website languages", "select_default_lang_description": "Before you can create pages in different languages, please let us know what is the current language of your pages :", "seo_title": "SEO for page title", "session_expired": "Time out, please sign in", "sign_in": "Sign in", "small": "Small", "social_facebook": "Facebook", "social_twitter": "Twitter", "social_instagram": "Instagram", "social_googleplus": "Google plus", "social_linkedin": "Linkedin", "social_flickr": "Flickr", "style": "Style", "submit": "OK", "submit-help": "I get it", "title": "Title", "title_parameters": "Set your", "upload_image_too_large_message": "Image is too large", "upload_image": "Upload image", "url_error": "Incorrect URL", "update_finish_title": "Update done", "update_finish_message": "Your website has been updated with success.", "users": "User management", "user_management": "User management", "users_of_website": "", "validate": "Validate", "video": "Video", "video_help1": "Sign in", "video_help2": "Global presentation", "video_help3": "Add content", "video_help4": "Content options", "video_help5": "Customize layers", "video_help6": "Move content", "video_help7": "Organize menu", "video_help8": "Page settings", "video_help9": "Search page", "video_help10": "Create page", "video_help11": "Publish page", "want_delete": "Delete content?", "website_on_google": "My website on Google", "website_on_google_message": "Index my website on Google", "yaml_block_article_title": "Article title", "yaml_block_article_abstract": "Article abstract", "yaml_block_article_title_rte_placeholder": "Article title", "yaml_block_article_title_show_tags": "Show tags", "yaml_block_article_title_show_publication_date": "Show publication date", "yaml_block_article_title_position": "Position", "yaml_block_abstract_rte_placeholder": "Your abstract here", "yaml_block_title": "Title", "yaml_block_title_rte_placeholder": "Page title", "yaml_block_title_position": "Position", "yaml_block_text": "Text", "yaml_block_text_rte_placeholder": "Your text here", "yaml_block_text_bg_color": "Text background color", "yaml_block_text_transparency": "Transparency", "yaml_block_text_full_color": "Full color", "yaml_block_text_line_color": "Line color", "yaml_block_image": "Image", "yaml_block_image_seo_title": "SEO", "yaml_block_image_title": "Image title", "yaml_block_image_style": "Style", "yaml_block_image_stretch": "Stretch", "yaml_block_image_display_title": "Display title", "yaml_block_image_display_description": "Display description", "yaml_block_image_text_position": "Position", "yaml_block_image_text_position_top": "Top", "yaml_block_image_text_position_middle": "Middle", "yaml_block_image_text_position_bottom": "Bottom", "yaml_block_image_overlay": "Display overlay", "yaml_block_image_display_text_hover": "Display contents over image on hover", "yaml_block_image_link": "Link", "yaml_block_image_no_link": "No link", "yaml_block_image_add_link_button": "Add link button", "yaml_block_image_add_link_on_image": "Add link on image", "yaml_block_image_picto": "Pictogram", "yaml_block_image_browse": "Browse", "yaml_block_button": "Button", "yaml_block_button_color": "Color", "yaml_block_button_font": "Font", "yaml_block_button_full_color": "Solid", "yaml_block_button_general": "General", "yaml_block_button_large": "Large", "yaml_block_button_line_color": "Outline", "yaml_block_button_medium": "Medium", "yaml_block_button_open_in_tab": "Open in new tab", "yaml_block_button_position": "Position", "yaml_block_button_rounded": "Rounded", "yaml_block_button_size": "Size", "yaml_block_button_small": "Small", "yaml_block_button_style": "Style", "yaml_block_button_square": "Square", "yaml_block_button_title": "Title", "yaml_block_button_url": "URL", "yaml_block_video": "Video", "yaml_block_video_general": "General", "yaml_block_video_url": "Video URL", "yaml_block_video_style": "Style", "yaml_block_video_position": "Position", "yaml_block_video_size": "Video size", "yaml_block_video_auto": "Auto", "yaml_block_video_small": "Small", "yaml_block_video_medium": "Medium", "yaml_block_slider": "Slider", "yaml_block_slider_autoplay": "Autoplay", "yaml_block_slider_image": "Image", "yaml_block_slider_click_to_add_image": "Click to add image", "yaml_block_slider_style": "Style", "yaml_block_slider_display_dots": "Display navigation dots", "yaml_block_slider_display_thumbnails": "Display thumbnails", "yaml_block_slider_format": "Slider format", "yaml_block_slider_square": "Square", "yaml_block_slider_landscape": "Landscape", "yaml_block_slider_banner": "Banner", "yaml_block_slider_navigation": "Display navigation buttons", "yaml_block_slider_hidenav": "Never", "yaml_block_slider_shownav": "Always", "yaml_block_slider_shownavonhover": "On hover", "yaml_block_page_by_tag_result": "Search by tag result", "yaml_block_page_highlight": "Manual list", "yaml_block_page_highlight_select_page": "Select page", "yaml_block_page_highlight_select_page_display": "Select the page you want to display", "yaml_block_page_highlight_style": "Style", "yaml_block_page_highlight_image_text_position": "Image and text position", "yaml_block_page_highlight_show_hide_elements": "Show-hide elements", "yaml_block_page_highlight_show_abstract": "Show abstract", "yaml_block_page_highlight_show_publication_date": "Show publication date", "yaml_block_page_highlight_show_image": "Show image", "yaml_block_page_highlight_characters": "Characters", "yaml_block_page_highlight_limit_letter_title": "Limit number of letters for title to", "yaml_block_page_highlight_limit_letter_abstract": "Limit number of letters for abstract to", "yaml_block_page_list_of_pages": "Auto list", "yaml_block_page_list_of_pages_tags": "Tags", "yaml_block_page_list_of_pages_choose_tags": "Choose tags to display the corresponding tagged pages", "yaml_block_page_list_of_pages_number_item_per_line": "Number of items per line", "yaml_block_page_list_of_pages_list": "List", "yaml_block_page_list_of_pages_number_pages_display": "Number of pages to display", "yaml_block_page_list_of_pages_order_by_label": "Order pages by", "yaml_block_page_list_of_pages_order_by_published_at": "Publication date, most recent first", "yaml_block_page_list_of_pages_order_by_modified_at": "Modification date, most recent first", "yaml_block_page_list_of_pages_use_pagination": "Use pagination", "yaml_block_page_list_of_pages_ignore_x_first_pages": "Ignore the x first pages", "yaml_block_page_list_of_pages_style": "Style", "yaml_block_page_list_of_pages_image_text_position": "Image and text position", "yaml_block_page_list_of_pages_display_your_list_in": "Display your list of pages in", "yaml_block_page_list_of_pages_vertical": "Vertical", "yaml_block_page_list_of_pages_horizontal": "Horizontal", "yaml_block_page_list_of_pages_show_hide_elements": "Show-hide elements", "yaml_block_page_list_of_pages_show_abstract": "Show abstract", "yaml_block_page_list_of_pages_show_publication_date": "Show publication date", "yaml_block_page_list_of_pages_show_image": "Show image", "yaml_block_page_list_of_pages_characters": "Characters", "yaml_block_page_list_of_pages_limit_letter_title": "Limit number of letters for title to", "yaml_block_page_list_of_pages_limit_letter_abstract": "Limit number of letters for abstract to", "yaml_block_disqus": "Disqus", "yaml_block_disqus_id": "Disqus ID", "yaml_block_disqus_comment": "<p>To use comments feature, you must have a Disqus account. Once you are logged, follow <a href='https://disqus.com/profile/signup/intent/' target='_blank'>this link</a> and click on `I want to install Disqus on my site` to create your Disqus short name. When you are done, just type your short name in the input above.<p>", "yaml_block_socials": "Socials", "yaml_block_socials_position": "Position", "yaml_block_share": "Share", "yaml_block_share_enable_facebook": "Enable facebook share", "yaml_block_share_enable_tweet": "Enable tweet", "yaml_block_share_position": "Position", "yaml_block_tweet": "Tweet", "yaml_block_tweet_general": "General", "yaml_block_tweet_url": "Tweet URL", "yaml_block_tweet_style": "Style", "yaml_block_tweet_position": "Position", "yaml_block_tweet_number_of_items_display": "Number of items to display", "yaml_block_contact": "Contact", "yaml_block_contact_email": "Email", "yaml_block_contact_destination": "Destination email", "yaml_block_contact_fields": "Fields", "yaml_block_contact_name_placeholder": "Name placeholder", "yaml_block_contact_your_name": "Your name", "yaml_block_contact_email_placeholder": "Email address placeholder", "yaml_block_contact_your_email": "Your email address", "yaml_block_contact_message_placeholder": "Message placeholder", "yaml_block_contact_message": "Message", "yaml_block_contact_error_message": "Error message", "yaml_block_contact_infos_missing": "Infos are missing", "yaml_block_contact_confirmation_message": "Confirmation message", "yaml_block_contact_confirmation_message_placeholder": "Your message has been sent. Thank you for your time", "yaml_block_contact_button": "Button", "yaml_block_contact_title": "Title", "yaml_block_contact_position": "Position", "yaml_block_contact_font": "Font", "yaml_block_contact_color": "Color", "yaml_block_contact_full_color": "Full color", "yaml_block_contact_line_color": "Line color", "yaml_block_contact_size": "Size", "yaml_block_contact_medium": "Medium", "yaml_block_contact_small": "Small", "yaml_block_contact_large": "Large", "yaml_block_liner": "Liner", "yaml_block_liner_height": "Height", "yaml_block_spacer": "Spacer", "yaml_block_adsens": "Adsense", "yaml_block_adsens_client_id": "Client id", "yaml_block_adsens_ad_slot": "Ad slot", "yaml_block_adsens_size": "Size", "yaml_block_adsens_small": "Small", "yaml_block_adsens_medium": "Medium", "yaml_block_adsens_large": "Large", "yaml_block_bandsintown": "Bandsintown", "yaml_block_bandsintown_artist_name": "Artist name", "yaml_block_map": "Map", "yaml_block_map_search_location": "Search a location", "yaml_block_map_choose_skin": "Choose a skin", "yaml_block_map_position": "Position", "yaml_block_map_size": "Map size", "yaml_block_map_auto": "Auto", "yaml_block_map_small": "Small", "yaml_block_map_medium": "Medium", "yaml_block_menu_burger": "Activate the burger menu", "yaml_block_menu_button": "Button", "yaml_block_menu_button_hide_on_mobile": "Hide button on mobile", "yaml_block_menu_page": "Page", "yaml_block_soundcloud": "Soundcloud", "yaml_block_soundcloud_url": "Soundcloud URL", "yaml_block_soundcloud_player_size": "Player size", "yaml_block_soundcloud_small": "Small", "yaml_block_soundcloud_medium": "Medium", "yaml_block_soundcloud_large": "Large", "yaml_block_spotify": "Spotify", "yaml_block_spotify_url": "Spotify URI", "yaml_block_spotify_player_size": "Player size", "yaml_block_spotify_theme": "Theme", "yaml_block_spotify_theme_black": "Black", "yaml_block_spotify_theme_white": "White", "yaml_block_spotify_view": "View", "yaml_block_spotify_view_simple": "Simple", "yaml_block_spotify_view_list": "List", "yaml_block_searchbar": "Search engine", "yaml_block_searchbar_input_placeholder": "Search input placeholder", "yaml_block_search_result": "Search result", "yaml_block_search_result_input_placeholder": "Search input placeholder", "yaml_block_search_result_result_label": "Result label", "yaml_block_search_result_no_result": "No results message", "yaml_block_general_tab": "General", "yaml_block_newsletter": "Newsletter", "yaml_block_newsletter_login": "Login", "yaml_block_newsletter_placeholder": "Placeholder", "yaml_block_newsletter_placeholder_value": "Recevoir la newsletter", "yaml_block_newsletter_confirmation_message": "Confirmation message", "yaml_block_newsletter_confirmation_message_value": "Thanks for the subscription!", "yaml_block_newsletter_title": "Title", "yaml_block_newsletter_description": "Description", "yaml_block_newsletter_button": "Button", "yaml_block_newsletter_button_title": "Title", "yaml_block_newsletter_button_title_value": "Sign up", "yaml_block_newsletter_position": "Position", "yaml_block_newsletter_color": "Color", "yaml_block_newsletter_size": "Size", "yaml_block_newsletter_medium": "Medium", "yaml_block_newsletter_small": "Small", "yaml_block_newsletter_large": "Large", "yes": "Yes", "youtube_video_url": "URL of your YouTube video" };

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = { "add_content": "Ajouter un contenu", "add_content_plus": "Ajouter du contenu", "adsense_connected_message": "Bloc Adsense (s'affichera en ligne)", "adblock_detect_title": "Bloqueur de publicité détecté", "adblock_detect_description": "Pour pouvoir utiliser le bloc Adsense, vous devez désactiver votre bloqueur de publicité et rafraîchir la page.", "an_error_occured": "Une erreur est apparue", "auth_instagram": "Se connecter à instagram", "auth_instagram_successfull": "Connexion réussie", "add_link_button": "Ajouter un bouton", "add_link_lightbox": "Ouvrir en grand au clic", "add_link_on_image": "Ajouter un lien sur l'image", "add_item": "Ajouter un element", "add_user": "Ajouter un utilisateur", "administrator": "Administrateur", "administrator_permissions": "a tous les droits sur le site", "all": "Toutes", "all_lang": "Toutes les langues", "all_page": "Toutes les pages", "back": "Retour", "bad_login": "Identifiant incorrect", "background_blur": "Appliquer un effet de flou sur le fond", "background_color": "Couleur de fond", "background_image": "Image de fond", "background_options": "Options d'arrière plan", "background_overlay": "Appliquer une trame de fond", "background_parallax": "Effet de parallaxe", "background_video": "Vidéo de fond", "background_video_thumbnail": "Choisir l'illustration de la vidéo", "background_video_url": "URL de la vidéo", "bad_credentials": "Mauvais identifiants", "button_to_set_up_your": "bouton pour parametrer votre", "block": "contenu", "block_category_basics": "Elements de base", "block_category_pages": "Pages", "block_category_social": "Réseaux sociaux", "block_category_more": "Autres contenus", "browse": "Parcourir", "bundle_activate": "Activer l'extension", "bundle_management": "Extensions", "cancel": "Annuler", "cancel-auth": "Annuler", "cancel_publish_message": "Vous êtes sur le point d'annuler toutes les modifications de la page courante et revenir à son état en ligne. <br /> Voulez-vous continuer ?", "cancel_publish_title": "Annulation des modifications", "change_password": "Changer de mot de passe", "check_video_url": "Vérifier", "choose_content_location": "Choisir l'emplacement du contenu", "choose_list": "Choisir une mailing liste", "choose_picture": "Choisir une image", "clear_filters": "Supprimer les filtres", "close": "Fermer", "click_on_the": "Clique sur le", "code_format_error": "Format incorrect", "color": "Couleur", "column_height": "Hauteur de la colonne", "column_width": "Largeur de la colonne", "configure": "Configurer", "confirm": "Confirmer", "confirm_new_password": "Confirmer le nouveau mot de passe", "confirm_password": "Confirmer le mot de passe", "connect_mailchimp": "Utiliser MailChimp", "connected": "connecté", "connection": "Connexion", "connection_problem": "Vérifier la connexion internet !", "content_added": "Contenu ajouté !", "content_deleted": "Contenu supprimé !", "content_edited": "Contenu paramétré !", "contents_list": "Liste des contenus", "contributor": "Contributeur", "contributor_permissions": "peut modifier les pages du site mais ne peut pas les publier. Il n'a pas accès aux paramètres du site", "create_new_user": "Créer un utilisateur", "default_empty_text_message": "Your text here", "default_lang": "Langue principale", "default_lang_confirmation_message": "Vous avez choisi <strong>_LANG_</strong> comme première langue de votre site multiangue.<br>Notez que cette langue ne pourra pas être changée.<br>Activer le multilangue ?<br>Cela peut prendre plusieurs minutes.", "default_lang_finish_message": "Mise en place du multilangue réussie. Vous pouvez maintenant créer des pages en plusieurs langues", "default_lang_finish_title": "Multilangue", "default_lang_popin_title": "Activation du multilangue", "default_language_error": "Merci de sélectionner la langue d'origine du site", "delete": "Supprimer", "delete_page": "Supprimer la page", "delete_user": "Supprimer", "delete_user_confirmation": "Supprimer cet utilisateur ?", "drop_image_label": "Cliquer pour charger une image", "drop_image_file": "Cliquer pour charger un fichier", "duplicate_done": "Page dupliquée", "discard": "Annuler", "edit": "Editer", "edit_user": "Editer l'utilisateur", "email": "Email", "email_error": "Email inccorect", "empty_error": "Ce champs doit être rempli", "email_exist_error": "Un compte est déjà associé à cet email", "enter_new_password": "Saisir le nouveau mot de passe", "enter_password": "Saisir le mot de passe", "error": "Oops! Une erreur est survenue", "error_current_password": "Mauvais mot de passe", "error_password_format": "Merci de respecter les contraintes pour le mot de passe", "error_password_format_description": "Le mot de passe doit contenir", "error_password_format1": "Un minimum de 8 caractères", "error_password_format2": "Un minimum d'une lettre en majuscule", "error_password_format3": "Un minimum d'une lettre en minuscule", "error_password_format4": "Un minimum d'un symbole (!,@,?,&...)", "error_password_length": "Le mot de passe doit faire 6 caractères minimum", "error_password_same": "Le mot de passe et sa confirmation ne sont pas identiques", "error_permissions": "Merci de donner des droits à l'utilisateur en sélectionnant un des 3 groupes", "favicon": "Favicon", "favicon_advice": "Format du favicon à uploader : PNG - 152px*152px ", "favicon_change": "Changer de favicon", "favicon_upload": "Uploader un favicon", "favicon_infos": "Le favicon est l'icone associée à votre site web. Il s'affiche dans l'onglet correspondant de votre navigateur. ", "focus_image": "Cadrage de l'image", "forgot_password": "Mot de passe oublié ?", "firstname": "Prénom", "full_color": "Aplat de couleur", "fullwidth": "Pleine largeur", "ga_tag_management": "Taggage Analytics", "hauth_signin": "Se connecter avec :", "height": "Hauteur", "image": "Image", "layer_options": " Options de la section", "layout": "Colonnes", "large": "Grand", "lastname": "Nom", "lang_management": "Multilangue", "latest_pages_modified": "Dernières pages modifiées", "link_target": "Ouvrir dans un nouvel onglet", "list_of_selected_lang": "Liste des langues séléctionnées", "login": "Identifiant", "logout": "Déconnexion", "logout_button_publish": "Publier & se déconnecter", "logout_message": "Souhaitez-vous vous déconnecter ?", "logout_message_publish": "Vous n'avez pas publié toutes vos modifications", "line_color": "Contour de couleur", "language_fr": "FR", "language_en": "EN", "language_default_value": "Langue d'origine de votre site", "manage_languages": "Gérer les langues", "mailchimp_account_connected": "Compte MailChimp connecté", "mailchimp_choose_list": "Choisir une liste depuis Mailchimp", "mailchimp_missing_list": "Vous devez créer une liste dans mailchimp avant d'utiliser ce contenu", "marge": "Marge", "media": "Média", "medium": "Moyen", "menu_disable_page": "Utiliser comme titre uniquement", "menu_form_explanation": "Chercher une page pour l'ajouter au menu", "menu_label_placeholder": "Libellé de l'élément", "menu_url_placeholder": "Utiliser l'autocomplétion ou entrer une url", "missing_login": "Renseigner un identifiant", "missing_password": "Renseigner un mot de passe", "my_account": "Mon compte", "missing_parameter_first_part": "Cliquez sur ", "missing_parameter_second_part": "pour paramétrer votre bloc ", "missing_parameter_third_part": "", "mobile_display": "Affichage mobile", "modified_page": "Contenu à publier", "modified_pages_list": "Voir les autres pages à publier", "more_options": "Plus d'options", "more_parameters": "Paramètres du site", "move_content_mobile": "Déplacer le contenu ici", "multilang_parameters_saved": "Paramètres de multilangue enregistrés", "my_image": "Mes images", "new_page": "Nouvelle page", "new_page_article": "Post", "new_page_blank": "Page blanche", "new_page_duplicate": "Dupliquer", "new_page_custom_gallery": "Galerie", "new_page_custom_contact": "Formulaire", "new_page_custom_2_columns": "2 colonnes", "new_page_custom_3_columns": "3 colonnes", "new_page_custom_4_columns": "4 colonnes", "new_page_event": "Nouvelle page évènement", "new_page_lang": "Langue", "new_page_title_error": "Le titre doit avoir 2 caractères minimum", "next": "Suivant", "no": "Non", "no_link": "Pas de lien", "no_page_found": "Aucune page trouvée", "not_yet_published": "En attente de publication", "nothing_to_cancel": "Aucune modification à annuler", "nothing_to_publish": "Aucune modification à publier", "normal": "Normale", "no_modified_pages": "Pas de page à publier", "no_page_message": "Aucune page ne correspond à votre recherche. <br/>Si l'option multilangue est activée, vérifiez la langue du site", "no_tag_message": "Aucune catégorie ne correspond à votre recherche", "off": "OFF", "offline": "Hors ligne", "on": "ON", "open_link_new_tab": "Nouvelle fenêtre", "page_created": "Page créée", "page_delete_confirmation": "Page supprimée", "page_delete_modal_title": "Suppression de page", "page_delete_modal_message": "Supprimer cette page ?", "page_error": "Page d'erreur", "page_error_404_settings": "Erreur 404", "page_error_500_settings": "Erreur 500", "page_error_title": "Titre", "page_error_description": "Description", "page_error_button_title": "Titre du bouton", "page_error_button_placeholder": "Retour à la page d'accueil", "page_errors": "Erreurs sur la page", "page_errors_management": "Personnaliser les pages d'erreur", "page_parameters": "Paramètres de la page", "page_parameters_form_title": "Titre", "page_parameters_form_offline": "Hors ligne", "page_parameters_form_online": "En ligne", "page_parameters_form_tags": "Tags", "page_parameters_form_keywords": "Mot-clés", "page_parameters_form_keywords_placeholder": "Séparer les mots par une virgule", "page_filter_by_modifed_date": "Dernières pages modifiées", "page_filter_by_latest_create_date": "Dernières pages créées", "page_filter_by_oldest_create_date": "Premières pages créées", "page_filter_create_date_placeholder": "Trier par date", "page_filter_label": "Filtres", "page_filter_language_placeholder": "Trier par langue", "page_filter_results_label": "Liste des pages", "page_filter_status_placeholder": "Trier par statut", "page_filter_tag_placeholder": "Trier par tag", "page_status": "Etat de la page", "page_parameters_form_publication_date": "Date de publication", "parameters": "Paramètres", "parameters_saved": "Paramètres enregistrés", "password": "Mot de passe", "previous": "Précédent", "publish": "Publier", "publish_all_pages": "Toutes les pages", "publish_this_page": "Cette page", "publisher": "Validateur", "publish_all": "Tout publier", "publish_all_page_done": "Toutes les pages ont été publiées!", "publish_all_page_question": "Cette page a été publiée. D'autres pages ont également été modifiées. Voulez-vous afficher la liste ?", "publish_done": "Vos contenus sont en ligne !", "publish_modified_pages": "Publier toutes les pages modifiées ?", "publish_other_pages_question": "Aucune modification à publier sur cette page. D'autres pages ont été modifiées. Voulez-vous afficher la liste ?", "publisher_permissions": "a tous les droits sur le site mais n'a pas accès aux paramètres du site", "publishing": "Publication en cours", "publishing_of": "Publication :", "picto_explanation": "Cette option vous permet d'afficher un <strong>pictogramme</strong> centré horizontalement et verticalement par dessus votre image.", "remove": "Retirer", "remove_gutter": "Retirer les goutières", "remove_margin": "Retirer les marges", "remove_padding": "Retirer les marges internes", "remove_image": "Retirer l'image", "required_fields": "Ce champs est obligatoire", "responsive_description": "Choisir comment les contenus doivent être affichés sur téléphone et tablette", "responsive_mobile": "Téléphone", "responsive_tablet": "Tablette", "responsive_number_of_content": "Nombre de contenu(s) visible(s) (max4)", "responsive_number_of_content_side_by_side": "Nombre de contenu(s) par ligne (max4)", "result": "Résultat", "rte-anchor": "Lien", "rte-blockquote": "Citation", "rte-bold": "Gras", "rte-h1": "Titre 1", "rte-h2": "Titre 2", "rte-h3": "Titre 3", "rte-italic": "Italique", "rte-justify-center": "Centrer", "rte-justify-full": "Justifier", "rte-justify-left": "Aligner à gauche", "rte-justify-right": "Aligner à droite", "rte-link-placeholder": "Tapez votre lien", "rte-list-ordered": "Liste numérotée", "rte-list-unordered": "Liste à puces", "rte-remove-format": "Supprimer la mise en forme", "rte-underline": "Souligner", "search": "Rechercher", "search_location": "Rechercher une adresse", "search_page": "Rechercher une page", "search_page_all_published": "Aucune page modifiée trouvée", "search_page_type_form_explanation": "Rechercher une ou plusieurs pages à ajouter", "search_no_result": "Aucun résulat", "seo_description": "Description SEO de la page", "seo_title": "Titre SEO de la page", "select_lang": "Selectionnez une langue", "select_active_lang_description": "Choisir les langues disponibles sur votre site", "select_default_lang_description": "Avant de pouvoir créer des pages dans différentes langues, vous devez d'abord préciser dans quelle langue sont vos pages actuellement :", "session_expired": "Session expirée, merci de vous reconnecter", "sign_in": "Se connecter", "small": "Petit", "social_facebook": "Facebook", "social_twitter": "Twitter", "social_instagram": "Instagram", "social_googleplus": "Google plus", "social_linkedin": "Linkedin", "social_flickr": "Flickr", "style": "Style", "submit": "OK", "submit-help": "J'ai compris", "title": "Titre", "title_parameters": "Paramètrer votre", "tag_created": "Catégorie créée !", "tag_create_btn": "Créer le tag \"{tag}\"", "tag_deleted": "Catégorie supprimée !", "tag_delete_confirm": "Etes vous sûr de vouloir supprimer '{n}' ?", "tag_delete_confirm_title": "Supprimer une catégorie", "tag_delete_modal_title": "Supprimer la catégorie", "tag_delete_on_pages_confirm": "Cette catégorie est sur les pages suivante(s)", "tag_management": "Gérer les tags", "tag_management_description": " Rechercher et/ou créer des tags", "to_publish": "Pages modifiées", "translate_bo": "Langue de l'interface", "translate_to_english": "Anglais", "translate_to_french": "Français", "upload_image_too_large_message": "Image trop volumineuse", "upload_image": "Ajouter une image", "url_error": "URL incorrect", "update_finish_title": "Mise à jour terminée", "update_finish_message": "La mise à jour de votre site a été effectuée avec succès.", "users": "Gérer les utilisateurs", "user_management": "Gérer les utilisateurs", "users_of_website": "", "validate": "Valider", "video": "Vidéo", "video_help1": "Se connecter", "video_help2": "Présentation globale", "video_help3": "Ajouter un contenu", "video_help4": "Options de contenu", "video_help5": "Personnaliser les gabarits", "video_help6": "Déplacer un contenu", "video_help7": "Organiser le menu", "video_help8": "Paramètres de page", "video_help9": "Recherche de page", "video_help10": "Créer une page", "video_help11": "Publier une page", "want_delete": "Voulez-vous supprimer ?", "website_on_google": "Mon site sur google", "website_on_google_message": "Indexer mon site sur Google", "yaml_block_article_title": "Titre d'article", "yaml_block_article_abstract": "Chapô d'article", "yaml_block_article_title_rte_placeholder": "Titre de l'article", "yaml_block_article_title_show_tags": "Afficher les catégories", "yaml_block_article_title_show_publication_date": "Afficher la date de publication", "yaml_block_article_title_position": "Position", "yaml_block_abstract_rte_placeholder": "Votre chapo ici", "yaml_block_title": "Titre", "yaml_block_title_rte_placeholder": "Titre de la page", "yaml_block_title_position": "Position", "yaml_block_text": "Texte", "yaml_block_text_rte_placeholder": "Votre texte ici", "yaml_block_text_bg_color": "Couleur d'arrière plan", "yaml_block_text_transparency": "Transparence", "yaml_block_text_full_color": "Aplat de couleur", "yaml_block_text_line_color": "Contour de couleur", "yaml_block_image": "Image", "yaml_block_image_seo_title": "SEO", "yaml_block_image_title": "Titre de l'image", "yaml_block_image_style": "Style", "yaml_block_image_stretch": "Etirer", "yaml_block_image_display_title": "Afficher un titre", "yaml_block_image_display_description": "Afficher une description", "yaml_block_image_text_position": "Position", "yaml_block_image_text_position_top": "Haut", "yaml_block_image_text_position_middle": "Milieu", "yaml_block_image_text_position_bottom": "Bas", "yaml_block_image_overlay": "Appliquer une trame de fond", "yaml_block_image_display_text_hover": "Afficher les contenus sur image au survol", "yaml_block_image_link": "Lien", "yaml_block_image_no_link": "Pas de lien", "yaml_block_image_add_link_button": "Ajouter un bouton", "yaml_block_image_add_link_on_image": "Ajouter un lien sur l'image", "yaml_block_image_picto": "Pictogramme", "yaml_block_image_browse": "Rechercher", "yaml_block_button": "Bouton", "yaml_block_button_color": "Couleur", "yaml_block_button_font": "Police", "yaml_block_button_full_color": "Plein", "yaml_block_button_general": "Général", "yaml_block_button_large": "Grand", "yaml_block_button_line_color": "Contour", "yaml_block_button_medium": "Moyen", "yaml_block_button_open_in_tab": "Ouvrir dans un nouvel onglet", "yaml_block_button_position": "Position", "yaml_block_button_rounded": "Arrondi", "yaml_block_button_size": "Taille", "yaml_block_button_small": "Petit", "yaml_block_button_style": "Style", "yaml_block_button_square": "Carré", "yaml_block_button_title": "Titre", "yaml_block_button_url": "URL", "yaml_block_video": "Vidéo", "yaml_block_video_general": "Général", "yaml_block_video_url": "URL de la vidéo", "yaml_block_video_style": "Style", "yaml_block_video_position": "Position", "yaml_block_video_size": "Taille de la vidéo", "yaml_block_video_auto": "Auto", "yaml_block_video_small": "Petit", "yaml_block_video_medium": "Moyen", "yaml_block_slider": "Slider", "yaml_block_slider_autoplay": "Défilement automatique", "yaml_block_slider_image": "Image", "yaml_block_slider_click_to_add_image": "Ajouter une image", "yaml_block_slider_style": "Style", "yaml_block_slider_display_dots": "Afficher les point de navigation", "yaml_block_slider_display_thumbnails": "Afficher les miniatures", "yaml_block_slider_format": "Format du slider", "yaml_block_slider_square": "Carré", "yaml_block_slider_landscape": "Paysage", "yaml_block_slider_banner": "Bannière", "yaml_block_slider_navigation": "Afficher les boutons de navigation", "yaml_block_slider_hidenav": "Jamais", "yaml_block_slider_shownav": "Toujours", "yaml_block_slider_shownavonhover": "Au survol", "yaml_block_page_by_tag_result": "Résultat par tag", "yaml_block_page_highlight": "Liste manuelle", "yaml_block_page_highlight_select_page": "Sélectionner une page", "yaml_block_page_highlight_select_page_display": "Choisir la page à afficher", "yaml_block_page_highlight_style": "Style", "yaml_block_page_highlight_image_text_position": "Postion texte-image", "yaml_block_page_highlight_show_hide_elements": "Afficher-masquer des éléments", "yaml_block_page_highlight_show_abstract": "Afficher le chapo", "yaml_block_page_highlight_show_publication_date": "Afficher la date de publication", "yaml_block_page_highlight_show_image": "Afficher l'image", "yaml_block_page_highlight_characters": "Caractères", "yaml_block_page_highlight_limit_letter_title": "Nombre de caractères pour le titre", "yaml_block_page_highlight_limit_letter_abstract": "Nombre de caractères pour le chapo", "yaml_block_page_list_of_pages": "Liste automatisée", "yaml_block_page_list_of_pages_tags": "Catégorie", "yaml_block_page_list_of_pages_number_item_per_line": "Nombre d'éléments par ligne", "yaml_block_page_list_of_pages_choose_tags": "Choisir une catégorie pour afficher les pages correspondantes", "yaml_block_page_list_of_pages_list": "Liste", "yaml_block_page_list_of_pages_number_pages_display": "Nombre de pages à afficher", "yaml_block_page_list_of_pages_use_pagination": "Utiliser la pagination", "yaml_block_page_list_of_pages_ignore_x_first_pages": "Ne pas afficher les `x` premiers éléments", "yaml_block_page_list_of_pages_order_by_label": "Trier les pages par", "yaml_block_page_list_of_pages_order_by_published_at": "Date de publication, les plus récents d'abord", "yaml_block_page_list_of_pages_order_by_modified_at": "Date de modification, les plus récent d'abord", "yaml_block_page_list_of_pages_style": "Style", "yaml_block_page_list_of_pages_image_text_position": "Position texte-image", "yaml_block_page_list_of_pages_display_your_list_in": "Afficher vos pages", "yaml_block_page_list_of_pages_vertical": "Verticalement", "yaml_block_page_list_of_pages_horizontal": "Horizontalement", "yaml_block_page_list_of_pages_show_hide_elements": "Afficher-masquer des éléments", "yaml_block_page_list_of_pages_show_abstract": "Afficher le chapo", "yaml_block_page_list_of_pages_show_publication_date": "Afficher la date de publication", "yaml_block_page_list_of_pages_show_image": "Afficher l'image", "yaml_block_page_list_of_pages_characters": "Caractères", "yaml_block_page_list_of_pages_limit_letter_title": "Nombre de caractères pour le titre", "yaml_block_page_list_of_pages_limit_letter_abstract": "Nombre de caractères pour le chapo", "yaml_block_disqus": "Disqus", "yaml_block_disqus_id": "ID Disqus", "yaml_block_disqus_comment": "<p>Pour utiliser la solution de commentaires Disqus, vous devez créer un compte Disqus. Une fois connecté, cliquez sur ce <a target='_blank' href='https://disqus.com/profile/signup/intent/'>lien</a> puis cliquez sur `je veux installer Disqus sur mon site`. Votre ID Disqus sera crée. Une fois cette action réalisée, tapez votre ID dans le champ ci-dessous.<p>", "yaml_block_socials": "Réseaux sociaux", "yaml_block_socials_position": "Position", "yaml_block_share": "Partage", "yaml_block_share_enable_facebook": "Permettre le partage sur Facebook", "yaml_block_share_enable_tweet": "Permettre le partage sur twitter", "yaml_block_share_position": "Position", "yaml_block_tweet": "Tweet", "yaml_block_tweet_general": "General", "yaml_block_tweet_url": "URL du Tweet", "yaml_block_tweet_style": "Style", "yaml_block_tweet_position": "Position", "yaml_block_tweet_number_of_items_display": "Nombre de Tweets à afficher", "yaml_block_contact": "Formulaire de contact", "yaml_block_contact_email": "Email", "yaml_block_contact_destination": "Email de destination", "yaml_block_contact_fields": "Champs", "yaml_block_contact_name_placeholder": "Champ nom", "yaml_block_contact_your_name": "Votre nom", "yaml_block_contact_email_placeholder": "Champ adresse email", "yaml_block_contact_your_email": "Votre adresse email", "yaml_block_contact_message_placeholder": "Champ message", "yaml_block_contact_message": "Message", "yaml_block_contact_error_message": "Message d'erreur", "yaml_block_contact_infos_missing": "Des informations sont manquantes", "yaml_block_contact_confirmation_message": "Message de confirmation", "yaml_block_contact_confirmation_message_placeholder": "Votre message a bien été envoyé. Merci pour votre temps.", "yaml_block_contact_button": "Bouton", "yaml_block_contact_title": "Titre", "yaml_block_contact_position": "Position", "yaml_block_contact_font": "Police", "yaml_block_contact_color": "Couleur", "yaml_block_contact_full_color": "Aplat de  couleur", "yaml_block_contact_line_color": "Contour de couleur", "yaml_block_contact_size": "Taille", "yaml_block_contact_medium": "Moyen", "yaml_block_contact_small": "Petit", "yaml_block_contact_large": "Grand", "yaml_block_liner": "Filet", "yaml_block_liner_height": "Hauteur", "yaml_block_spacer": "Espace", "yaml_block_adsens": "Adsense", "yaml_block_adsens_client_id": "ID Client", "yaml_block_adsens_ad_slot": "Numéro de publicité", "yaml_block_adsens_size": "Taille", "yaml_block_adsens_small": "Petit", "yaml_block_adsens_medium": "Moyen", "yaml_block_adsens_large": "Grand", "yaml_block_bandsintown": "Bandsintown", "yaml_block_bandsintown_artist_name": "Nom de l'artiste", "yaml_block_map": "Carte", "yaml_block_map_search_location": "Taper une adresse", "yaml_block_map_choose_skin": "Choisir le style de carte", "yaml_block_map_position": "Position", "yaml_block_map_size": "Taille de la carte", "yaml_block_map_auto": "Auto", "yaml_block_map_small": "Petit", "yaml_block_map_medium": "Moyen", "yaml_block_menu_burger": "Activer le menu burger", "yaml_block_menu_button": "Bouton", "yaml_block_menu_button_hide_on_mobile": "Ne pas afficher sur mobile", "yaml_block_menu_page": "Page", "yaml_block_soundcloud": "Soundcloud", "yaml_block_soundcloud_url": "URL Soundcloud", "yaml_block_soundcloud_player_size": "Taille du player", "yaml_block_soundcloud_small": "Petit", "yaml_block_soundcloud_medium": "Moyen", "yaml_block_soundcloud_large": "Grand", "yaml_block_spotify": "Spotify", "yaml_block_spotify_url": "Spotify URI", "yaml_block_spotify_player_size": "Taille du player", "yaml_block_spotify_theme": "Thème", "yaml_block_spotify_theme_black": "Noir", "yaml_block_spotify_theme_white": "Blanc", "yaml_block_spotify_view": "Vue", "yaml_block_spotify_view_simple": "Simple", "yaml_block_spotify_view_list": "Liste", "yaml_block_searchbar": "Moteur de recherche", "yaml_block_searchbar_input_placeholder": "Texte de recherche par defaut", "yaml_block_search_result": "Résultat de recherche", "yaml_block_search_result_input_placeholder": "Texte de recherche par défaut", "yaml_block_search_result_result_label": "Texte du résultat de recherche par défaut", "yaml_block_search_result_no_result": "Message lorsqu'il n'y a pas de résultat", "yaml_block_general_tab": "Général", "yaml_block_newsletter": "Newsletter", "yaml_block_newsletter_login": "Connexion", "yaml_block_newsletter_placeholder": "Champs message", "yaml_block_newsletter_placeholder_value": "Souscrire à la newsletter", "yaml_block_newsletter_confirmation_message": "Message de confirmation", "yaml_block_newsletter_confirmation_message_value": "Merci pour la souscription à la newsletter !", "yaml_block_newsletter_title": "Titre", "yaml_block_newsletter_description": "Description", "yaml_block_newsletter_button": "Bouton", "yaml_block_newsletter_button_title": "Titre", "yaml_block_newsletter_button_title_value": "Je m'inscris", "yaml_block_newsletter_position": "Position", "yaml_block_newsletter_color": "Couleur", "yaml_block_newsletter_size": "Taille", "yaml_block_newsletter_small": "Petit", "yaml_block_newsletter_medium": "Moyen", "yaml_block_newsletter_large": "Grand", "yes": "Oui", "youtube_video_url": "URL de votre vidéo Youtube" };

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = { "no": "No", "pagination": "{current}/{total}", "results": "There are {n} results", "yes": "Yes" };

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = { "no": "Non", "yes": "Oui" };

/***/ })
/******/ ]);