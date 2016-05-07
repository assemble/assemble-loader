'use strict';

require('mocha');
require('should');
var path = require('path');
var assert = require('assert');
var App = require('templates');
var Views = App.Views;
var loader = require('./');
var app, collection;

function res(fp) {
  return path.resolve(fp);
}

describe('loader', function() {
  describe('app plugin', function() {
    beforeEach(function() {
      app = new App();
    });

    it('should return a function:', function() {
      assert(typeof loader() === 'function');
    });

    it('should decorate `.load` onto the app instance', function() {
      app.use(loader());
      var collection = app.load('*.js');
      assert(collection.hasOwnProperty(path.resolve('index.js')));
    });

    it('should take options on loader', function() {
      app.use(loader({cwd: 'fixtures'}));
      var collection = app.load('*.txt');
      assert(collection.hasOwnProperty(path.resolve('fixtures/a.txt')));
    });

    it('should take options on load', function() {
      app.use(loader());
      var collection = app.load('*.txt', {cwd: 'fixtures'});
      assert(collection.hasOwnProperty(path.resolve('fixtures/a.txt')));
    });

    it('should decorate `loadViews` onto collections', function() {
      app.use(loader());
      app.create('pages');

      app.pages.loadViews('*.js');
      assert(app.views.pages.hasOwnProperty(res('index.js')));
    });

    it('should use a cwd defined on the collection options:', function() {
      app.use(loader());
      app.create('pages')
        .option('cwd', 'fixtures')
        .loadViews('*.tmpl');

      assert(app.views.pages.hasOwnProperty(res('fixtures/a.tmpl')));
    });

    it('should use a cwd defined on create:', function() {
      app.use(loader());
      app.create('pages', {cwd: 'fixtures'})
        .loadViews('*.tmpl');

      assert(app.views.pages.hasOwnProperty(res('fixtures/a.tmpl')));
    });

    it('should use a cwd defined on create with collection loader', function() {
      app.use(loader());
      app.create('pages', {cwd: 'fixtures'});
      app.pages('*.tmpl');

      assert(app.views.pages.hasOwnProperty(res('fixtures/a.tmpl')));
    });
  });

  describe('collection plugin', function() {
    beforeEach(function() {
      app = new App();
    });

    it('should work as a collection plugin:', function() {
      app.create('pages')
        .use(loader('*.json'));
      assert(app.views.pages.hasOwnProperty(res('package.json')));
    });

    it('should decorate `load` on the collection:', function() {
      app.create('files')
        .use(loader());

      app.files.load('*.json');
      assert(app.views.files.hasOwnProperty(res('package.json')));
    });

    it('should be chainable:', function() {
      app.create('pages')
        .use(loader())
        .load('*.json')
        .load('*.js');

      assert(app.views.pages.hasOwnProperty(res('index.js')));
      assert(app.views.pages.hasOwnProperty(res('package.json')));
    });

    it('should decorate a loadViews method onto the collection:', function() {
      app.create('pages')
        .use(loader())
        .loadViews('*.json')
        .loadViews('*.js');

      assert(app.views.pages.hasOwnProperty(res('index.js')));
      assert(app.views.pages.hasOwnProperty(res('package.json')));
    });

    it('should add the `loadViews` method to a collection:', function() {
      app.create('pages')
        .use(loader());

      app.pages.loadViews('fixtures/*.txt');
      assert(app.views.pages.hasOwnProperty(res('fixtures/a.txt')));
    });

    it('should update `addViews` to load globs:', function() {
      app.create('pages')
        .use(loader());

      app.pages.addViews('fixtures/*.txt');
      assert(app.views.pages.hasOwnProperty(res('fixtures/a.txt')));
    });

    it('should load globs with app collection methods:', function() {
      app.create('pages')
        .use(loader());

      app.pages('fixtures/*.txt');
      assert(app.views.pages.hasOwnProperty(res('fixtures/a.txt')));
    });

    it('should load glob arrays with app collection methods:', function() {
      app.create('pages')
        .use(loader());

      app.pages(['fixtures/*.txt']);
      assert(app.views.pages.hasOwnProperty(res('fixtures/a.txt')));
    });

    it('should not change native behavior with addView:', function() {
      app.create('pages')
        .use(loader());

      app.page('a', {content: '...'});
      app.page('b', {content: '...'});
      app.page('c', {content: '...'});

      assert(app.views.pages.hasOwnProperty('a'));
      assert(app.views.pages.hasOwnProperty('b'));
      assert(app.views.pages.hasOwnProperty('c'));
    });

    it('should not change native behavior with addViews:', function() {
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

    it('should get the contents for a view:', function() {
      app.create('pages')
        .use(loader());

      app.pages(['fixtures/*.txt']);
      var page = app.pages.getView('fixtures/a.txt');
      assert(page.contents.toString() === 'This is AAA');
    });

    it('should support passing renameKey on the options:', function() {
      app.create('pages')
        .use(loader());

      app.pages.option('renameKey', function(key, file) {
        return path.basename(key);
      });

      app.pages.loadViews('fixtures/*.txt');

      assert(app.views.pages.hasOwnProperty('a.txt'));
    });

    it('should keep collection options separate:', function() {
      app.use(loader());
      app.create('pages');
      app.create('partials', {viewType: 'partial'});
      app.create('layouts', {viewType: 'layout'});

      app.on('page', function(view, type) {
        assert(view.options.viewType.length === 1);
        assert(view.options.viewType[0] === 'renderable');
      });
      app.on('layout', function(view, type) {
        assert(view.options.viewType.length === 1);
        assert(view.options.viewType[0] === 'layout');
      });
      app.on('partial', function(view, type) {
        assert(view.options.viewType.length === 1);
        assert(view.options.viewType[0] === 'partial');
      });

      app.pages.option('renameKey', function(key, file) {
        return path.basename(key);
      });
      app.layouts.option('renameKey', function(key, file) {
        return path.basename(key);
      });
      app.partials.option('renameKey', function(key, file) {
        return path.basename(key);
      });

      app.pages('fixtures/*.txt');
      app.layouts('fixtures/*.hbs');
      app.partials('fixtures/*.tmpl');

      assert(app.views.pages.hasOwnProperty('a.txt'));
    });
  });

  describe('loadView', function() {
    beforeEach(function() {
      collection = new Views({
        renameKey: function(key) {
          return path.basename(key);
        }
      });
      collection.use(loader());
    });

    it('should load a file and add it to `views`:', function() {
      collection.loadView('fixtures/a.tmpl');
      collection.views.should.have.property('a.tmpl');
    });

    it('should use a cwd defined on the collection:', function() {
      collection.option('cwd', 'fixtures');
      collection.loadView('a.tmpl');
      collection.views.should.have.property('a.tmpl');
    });

    it('should handle files with no extension:', function() {
      collection.loadView('LICENSE');
      collection.views.should.have.property('LICENSE');
    });
  });

  describe('loadViews', function() {
    beforeEach(function() {
      collection = new Views({
        renameKey: function(key) {
          return path.basename(key);
        }
      });

      collection.use(loader());
    });

    it('should load a view from a filepath:', function() {
      collection.loadViews('fixtures/a.tmpl');
      collection.views.should.have.property('a.tmpl');
    });

    it('should load views from a glob:', function() {
      collection.loadViews('fixtures/*.tmpl');
      collection.views.should.have.property('a.tmpl');
    });

    it('should load views an array globs:', function() {
      collection.loadViews(['fixtures/*.tmpl']);
      collection.views.should.have.property('a.tmpl');
    });

    it('should use a cwd defined on the collection:', function() {
      collection.option('cwd', 'fixtures');
      collection.loadViews('*.tmpl');
      collection.views.should.have.property('a.tmpl');
    });

    it('should handle files with no extension:', function() {
      collection.loadViews('LICENSE');
      collection.views.should.have.property('LICENSE');
    });
  });
});
