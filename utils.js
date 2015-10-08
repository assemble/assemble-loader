'use strict';

/**
 * Lazily required module dependencies
 */

var utils = require('lazy-cache')(require);

/**
 * Trick browserify into recognizing lazy-cached modules
 */

var fn = require;
require = utils;
require('mixin-deep', 'merge');
require('load-templates', 'loader');
require = fn;

/**
 * Expose utils
 */

module.exports = utils;
