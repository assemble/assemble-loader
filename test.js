require('mocha');
require('should');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var App = require('templates');
var Views = App.Views;
var loader = require('./');
var app;

describe('loader', function () {
  describe('app plugin', function () {
    beforeEach(function () {
      app = new App();
    });

    it('should return a function:', function () {
      assert(typeof loader() === 'function');
    });

    it('should decorate `.load` to the app instance', function () {
      app.use(loader());
      var collection = app.load('*.js');
      assert(collection.hasOwnProperty('index.js'));
    });

    it('should take options', function () {
      app.use(loader({cwd: 'fixtures'}));
      var collection = app.load('*.txt');
      assert(collection.hasOwnProperty('fixtures/a.txt'));
    });

    it('should decorate `loadViews` onto collections', function () {
      app.use(loader());
      app.create('pages');

      app.pages.loadViews('*.js');
      assert(app.views.pages.hasOwnProperty('index.js'));
    });

    it('should use a cwd defined on the collection:', function () {
      app.use(loader());
      app.create('pages')
        .option('cwd', 'fixtures')
        .loadViews('*.tmpl');

      assert(app.views.pages.hasOwnProperty('fixtures/a.tmpl'));
    });
  });

  describe('collection plugin', function () {
    beforeEach(function () {
      app = new App();
    });

    it('should work as a collection plugin:', function () {
      app.create('pages')
        .use(loader('*.json'));
      assert(app.views.pages.hasOwnProperty('package.json'));
    });

    it('should decorate `load` on the collection:', function () {
      app.create('files')
        .use(loader());

      var files = app.files.load('*.json');
      assert(files.hasOwnProperty('package.json'));
    });

    it('should be chainable:', function () {
      app.create('pages')
        .use(loader('*.json'))
        .use(loader('*.js'));
      assert(app.views.pages.hasOwnProperty('index.js'));
      assert(app.views.pages.hasOwnProperty('package.json'));
    });

    it('should decorate a loadViews method onto the collection:', function () {
      app.create('pages')
        .use(loader())
        .loadViews('*.json')
        .loadViews('*.js');

      assert(app.views.pages.hasOwnProperty('index.js'));
      assert(app.views.pages.hasOwnProperty('package.json'));
    });

    it('should add the `load` method to a collection:', function () {
      app.create('pages')
        .use(loader());

      app.pages.loadViews('fixtures/*.txt');
      assert(app.views.pages.hasOwnProperty('fixtures/a.txt'));
    });

    it('should update `addViews` to load globs:', function () {
      app.create('pages')
        .use(loader());

      app.pages.addViews('fixtures/*.txt');
      assert(app.views.pages.hasOwnProperty('fixtures/a.txt'));
    });

    it('should load globs with app collection methods:', function () {
      app.create('pages')
        .use(loader());

      app.pages('fixtures/*.txt');
      assert(app.views.pages.hasOwnProperty('fixtures/a.txt'));
    });

    it('should load glob arrays with app collection methods:', function () {
      app.create('pages')
        .use(loader());

      app.pages(['fixtures/*.txt']);
      assert(app.views.pages.hasOwnProperty('fixtures/a.txt'));
    });

    it('should not change native behavior with addViews:', function () {
      app.create('pages')
        .use(loader());

      app.pages({
        a: {contents: '...'},
        b: {contents: '...'},
        c: {contents: '...'}
      });

      assert(app.views.pages.hasOwnProperty('a'));
      assert(app.views.pages.hasOwnProperty('b'));
      assert(app.views.pages.hasOwnProperty('c'));
    });

    it('should get the contents for a view:', function () {
      app.create('pages')
        .use(loader());

      app.pages(['fixtures/*.txt']);
      var page = app.pages.getView('fixtures/a.txt');
      assert(page.contents.toString() === 'This is AAA');
    });

    it('should support passing renameKey on the options:', function () {
      app.create('pages')
        .use(loader());

      app.pages.loadViews('fixtures/*.txt', {
        renameKey: function(dest) {
          return path.basename(dest);
        }
      });

      assert(app.views.pages.hasOwnProperty('a.txt'));
    });
  });

  describe('loadView', function() {
    beforeEach(function() {
      collection = new Views({
        renameKey: function (key) {
          return path.basename(key);
        }
      });
      collection.use(loader());
    });

    it('should load a file and add it to `views`:', function () {
      collection.loadView('fixtures/a.tmpl');
      collection.views.should.have.property('a.tmpl');
    });

    it('should use a cwd defined on the collection:', function () {
      collection.option('cwd', 'fixtures');
      collection.loadView('a.tmpl');
      collection.views.should.have.property('a.tmpl');
    });

    it('should handle files with no extension:', function () {
      collection.loadView('LICENSE');
      collection.views.should.have.property('LICENSE');
    });
  });

  describe('loadViews', function() {
    beforeEach(function() {
      collection = new Views({
        renameKey: function (key) {
          return path.basename(key);
        }
      });

      collection.use(loader())
    });

    it('should load a view from a filepath:', function () {
      collection.loadViews('fixtures/a.tmpl');
      collection.views.should.have.property('a.tmpl');
    });

    it('should load views from a glob:', function () {
      collection.loadViews('fixtures/*.tmpl');
      collection.views.should.have.property('a.tmpl');
    });

    it('should load views an array globs:', function () {
      collection.loadViews(['fixtures/*.tmpl']);
      collection.views.should.have.property('a.tmpl');
    });

    it('should use a cwd defined on the collection:', function () {
      collection.option('cwd', 'fixtures');
      collection.loadViews('*.tmpl');
      collection.views.should.have.property('a.tmpl');
    });

    it('should handle files with no extension:', function () {
      collection.loadViews('LICENSE');
      collection.views.should.have.property('LICENSE');
    });
  });
});
