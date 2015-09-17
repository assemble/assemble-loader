require('mocha');
require('should');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var templates = require('templates');
var loader = require('./');
var app;

describe('loader', function () {
  beforeEach(function () {
    app = templates();
  });

  describe('app', function () {
    it('should return a function:', function () {
      assert(typeof loader() === 'function');
    });

    it('should decorate load to the collection instance:', function () {
      app.use(loader());

      app.create('pages');
      app.pages.load('*.js');
      assert(app.views.pages.hasOwnProperty('index.js'));
    });
  });

  describe('collection', function () {
    it('should work as a collection plugin:', function () {
      app.create('pages')
        .use(loader('*.json'));
      assert(app.views.pages.hasOwnProperty('package.json'));
    });

    it('should be chainable:', function () {
      app.create('pages')
        .use(loader('*.json'))
        .use(loader('*.js'));
      assert(app.views.pages.hasOwnProperty('index.js'));
      assert(app.views.pages.hasOwnProperty('package.json'));
    });

    it('should decorate a load method onto the collection:', function () {
      app.create('pages')
        .use(loader())
        .load('*.json')
        .load('*.js');

      assert(app.views.pages.hasOwnProperty('index.js'));
      assert(app.views.pages.hasOwnProperty('package.json'));
    });

    it('should add the `load` method to a collection:', function () {
      app.create('pages')
        .use(loader());

      app.pages.load('fixtures/*.txt');
      assert(app.views.pages.hasOwnProperty('fixtures/a.txt'));
    });

    it('should support passing renameKey on the options:', function () {
      app.create('pages')
        .use(loader());

      app.pages.load('fixtures/*.txt', {
        renameKey: function (dest) {
          return path.basename(dest);
        }
      });

      assert(app.views.pages.hasOwnProperty('a.txt'));
    });
  });
});
