'use strict';

var utils = require('./utils');

function loader(patterns, config) {
  if (utils.isObject(patterns)) {
    config = patterns;
    patterns = null;
  }

  config = config || {};

  return function fn(app) {
    function defaults(options) {
      config = utils.merge({cwd: ''}, this.options, config);
      return utils.merge({}, config, options || {});
    }

    app.define('load', function(patterns, options) {
      var opts = defaults.call(this, options);
      var cache = {};
      var fn = utils.loader(cache, opts);
      fn.apply(this, arguments);
      return cache;
    });

    if (!this.isViews) return fn;

    this.mixin('loadView', function(/*filename, options*/) {
      return this.loadViews.apply(this, arguments);
    });

    this.mixin('loadViews', function(patterns, options) {
      var opts = defaults.call(this, options);
      var load = utils.loader({}, opts, this.addView.bind(this));
      load.apply(this, arguments);
      return this;
    });

    var addViews = this.addViews;
    this.mixin('addViews', function(views) {
      if (utils.isValidGlob(views)) {
        return this.loadViews.apply(this, arguments);
      }
      return addViews.apply(this, arguments);
    });

    var addView = this.addView;
    this.mixin('addView', function(key) {
      if (utils.isValidGlob(key) && arguments.length === 1) {
        return this.loadView.apply(this, arguments);
      }
      return addView.apply(this, arguments);
    });

    /**
     * If a glob pattern is passed on the outer function,
     * pass it to `loadViews` for the collection
     */

    if (utils.isValidGlob(patterns)) {
      this.loadViews(patterns, defaults.call(this));
    }
    return this;
  };
}

/**
 * Expose `loader`
 */

module.exports = loader;
