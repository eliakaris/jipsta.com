exports.index = function(req, res) {
  res.render('home.html', { section: "home", entry: global.entries[0] });
};
