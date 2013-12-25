var home = require('./controllers/home'),
    about = require('./controllers/about'),
    blog = require('./controllers/blog');

exports.init = function(app) {
  app.get('/', home.index);
  app.get('/about', about.index);
  app.get('/blog', blog.index);
  app.get('/blog/:year/:month/:day/:slug', blog.redirectOr404);
  app.get('/projects/:slug', blog.redirectOr404);
  app.get('/rss', blog.renderRss);
  app.get('/sitemap.xml', home.sitemap);

  // catch all
  app.get('/:slug', blog.renderEntry);
};
