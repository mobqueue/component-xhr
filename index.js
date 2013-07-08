
/**
 * Dependencies
 */

var $ = require('jquery')
  , BASE_URL = window.API_URL
  , VERSION = window.API_VERSION;

/**
 * Headers
 */

var headers = {
  'X-Perfect-API-Version': VERSION
, 'Cache-Control': 'no-cache'
};

/**
 * Expose `getHeaders`
 */

module.exports.getHeaders = getHeaders;

/**
 * Expose `setHeader`
 */

module.exports.setHeader = function(key, value) {
  headers[key] = value;
};

/**
 * Custom POST method
 *
 * @param {String} url
 * @param {Object} data
 * @param {Function} callback
 * @param {Object} context
 */

module.exports.post = function(url, data, callback, context) {
  callback = callback || function(){};
  
  if (context) {
    callback = callback.bind(context);
  }
  
  $.ajax({
    url: BASE_URL + url
  , type: 'POST'
  , headers: getHeaders()
  , xhrFields: {
      withCredentials: window.device === undefined
    }
  , data: data
  , success: function(data, text, xhr) {
      callback(null, xhr, data);
    }
  , error: function(xhr, text, error) {
      callback(xhr.responseText, xhr);
    }
  });
};

/**
 * Custom GET method
 *
 * @param {String} url
 * @param {Function} callback
 * @param {Object} context
 */

module.exports.get = function(url, callback, context) {
  callback = callback || function(){};
  
  if (context) {
    callback = callback.bind(context);
  }

  $.ajax({
    url: BASE_URL + url
  , type: 'GET'
  , headers: getHeaders()
  , xhrFields: {
      withCredentials: window.device === undefined
    }
  , success: function(data, text, xhr) {
      callback(null, xhr, data);
    }
  , error: function(xhr, text, error) {
      callback(xhr.responseText, xhr);
    }
  });
};

/**
 * Custom post file
 * 
 * @param {String} url
 * @param {Object} data
 * @param {Function} callback
 * @param {Object} context
 */

module.exports.postFile = function(url, data, callback, context) {
  callback = callback || function(){};
  
  if (context) {
    callback = callback.bind(context);
  }
  
  $.ajax({
    url: BASE_URL + url
  , type: 'POST'
  , cache: false
  , contentType: false
  , processData: false
  , headers: getHeaders()
  , xhrFields: {
      withCredentials: window.device === undefined
    }
  , data: data
  , success: function(data, text, xhr) {
      callback(null, xhr, data);
    }
  , error: function(xhr, text, error) {
      callback(xhr.responseText, xhr);
    }
  });
};

/**
 * Get the custom headers
 */

function getHeaders() {
  if (window.device) {
    headers['X-Perfect-Device-ID'] = window.device.uuid;
    headers['X-Perfect-Token'] = localStorage.getItem('token');
  }

  return headers;
}
