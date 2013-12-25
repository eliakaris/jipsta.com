exports.index = function(req, res) {
  res.render('home.html', { section: "home", entry: global.entries[0] });
};

exports.sitemap = function(req, res) {
  res.set('Content-Type', 'application/xml');
  res.render('sitemap.html', { entries: global.entries });
};
