var fs = require('fs');
var path = require('path');
var matter = require('parser-front-matter');
var templates = require('templates');
var loader = require('..');

var app = templates()
  .use(loader())

app.engine('tmpl', require('engine-base'));
app.engine('hbs', require('engine-handlebars'));

app.renameKey(function(key) {
  return path.basename(key);
});

app.onLoad(/\.(hbs|tmpl)$/, function(view, next) {
  matter.parse(view, next);
});


var posts = app
  .create('posts')
  .load(path.join(__dirname, '../fixtures/*.hbs'));


var pages = app
  .create('pages')
  .load(path.join(__dirname, '../fixtures/*.tmpl'));

app.posts.getView('a.hbs')
  .set('data.title', 'A')
  .set('data.name', 'Halle')
  .render(function(err, res) {
    if (err) return console.log(err.stack);
    console.log(res.content)
  });

app.posts.getView('b.hbs')
  .set('data.name', 'Brooke')
  .render(function(err, res) {
    if (err) return console.log(err.stack);
    console.log(res.content)
  });

app.pages.getView('a.tmpl')
  .set('data.name', 'Brian')
  .render(function(err, res) {
    if (err) return console.log(err.stack);
    console.log(res.content)
  });
