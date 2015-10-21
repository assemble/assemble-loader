'use strict';

var fs = require('fs');

/**
 * Lazily required module dependencies
 */

var utils = require('lazy-cache')(require);

/**
 * Trick browserify into recognizing lazy-cached modules
 */

var fn = require;
require = utils;
require('file-contents', 'contents');
require('mixin-deep', 'merge');
require('load-templates', 'loader');
require('isobject', 'isObject');
require('is-valid-glob');
require('has-glob');
require = fn;

utils.isGlob = function(key, val) {
  if (typeof val === 'undefined' || utils.isObject(val)) {
    return utils.hasGlob(key);
  }
  return false;
};

/**
 * Expose utils
 */

module.exports = utils;
