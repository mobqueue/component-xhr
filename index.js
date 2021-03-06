
/**
 * Dependencies
 */

var $ = require('jquery');
var BASE_URL = window.API_URL;
var VERSION = window.API_VERSION;

/**
 * Headers
 */

var headers = {
  'X-Perfect-API-Version': VERSION,
  'Cache-Control': 'no-cache'
};

/**
 * Expose `getHeaders`
 */

module.exports.getHeaders = getHeaders;

/**
 * Expose `get`
 */

module.exports.get = get;

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
    url: BASE_URL + url,
    dataType: 'json',
    type: 'POST',
    headers: getHeaders(),
    xhrFields: {
      withCredentials: window.device === undefined && url.indexOf('private') !== -1
    },
    data: data,
    success: function(data, text, xhr) {
      callback(null, xhr, data);
    },
    error: function(xhr, text, error) {
      var response;
      try {
        response = JSON.parse(xhr.responseText);
      } catch(e) {}

      callback(response || xhr.responseText || xhr.statusText || text, xhr);
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

function get(url, callback, context, attemptsLeft) {
  callback = callback || function(){};

  if (context) {
    callback = callback.bind(context);
  }

  if (attemptsLeft === undefined) {
    attemptsLeft = 3;
  }

  $.ajax({
    url: BASE_URL + url,
    dataType: 'json',
    type: 'GET',
    headers: getHeaders(),
    timeout: 4000,
    xhrFields: {
      withCredentials: window.device === undefined && url.indexOf('private') !== -1
    },
    success: function(data, text, xhr) {
      callback(null, xhr, data);
    },
    error: function(xhr, text, error) {
      if (attemptsLeft > 0 && text === 'timeout') {
        get(url, callback, context, --attemptsLeft);
      } else {
        var response;
        try {
          response = JSON.parse(xhr.responseText);
        } catch(e) {}

        callback(response || xhr.responseText || xhr.statusText || text, xhr);
      }
    }
  });
}

/**
 * Custom delete method
 *
 * @param {String} url
 * @param {Function} callback
 * @param {Object} context
 */

module.exports.del = function (url, callback, context) {
  callback = callback || function(){};

  if (context) {
    callback = callback.bind(context);
  }

  $.ajax({
    url: BASE_URL + url,
    dataType: 'json',
    type: 'DELETE',
    headers: getHeaders(),
    xhrFields: {
      withCredentials: window.device === undefined && url.indexOf('private') !== -1
    },
    success: function (data, text, xhr) {
      callback(null, xhr, data);
    },
    error: function (xhr, text, error) {
      var response;
      try {
        response = JSON.parse(xhr.responseText);
      } catch(e) {}

      callback(response || xhr.responseText || xhr.statusText || text, xhr);
    }
  });
};

/**
 * Custom put
 *
 * @param {String} url
 * @param {Object} data
 * @param {Function} callback
 * @param {Object} context
 */

module.exports.put = function(url, data, callback, context) {
  callback = callback || function(){};

  if (context) {
    callback = callback.bind(context);
  }

  $.ajax({
    url: BASE_URL + url,
    dataType: 'json',
    type: 'PUT',
    headers: getHeaders(),
    xhrFields: {
      withCredentials: window.device === undefined && url.indexOf('private') !== -1
    },
    data: data,
    success: function(data, text, xhr) {
      callback(null, xhr, data);
    },
    error: function(xhr, text, error) {
      var response;
      try {
        response = JSON.parse(xhr.responseText);
      } catch(e) {}

      callback(response || xhr.responseText || xhr.statusText || text, xhr);
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
    url: BASE_URL + url,
    dataType: 'json',
    type: 'POST',
    cache: false,
    contentType: false,
    processData: false,
    headers: getHeaders(),
    xhrFields: {
      withCredentials: window.device === undefined && url.indexOf('private') !== -1
    },
    data: data,
    success: function(data, text, xhr) {
      callback(null, xhr, data);
    },
    error: function(xhr, text, error) {
      var response;
      try {
        response = JSON.parse(xhr.responseText);
      } catch(e) {}

      callback(response || xhr.responseText || xhr.statusText || text, xhr);
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
