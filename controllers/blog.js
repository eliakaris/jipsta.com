function getEntry(slug) {
  var entries = global.entries;

  var found = false;
  for (var i in entries) {
    var entry = entries[i];
    if (slug == entry.slug) {
      return entry;
    }
  }

  return null;
}

exports.index = function(req, res) {
  var entries = global.entries;

  // Sort blog entries by year
  var years = []
  for (var i in entries) {
    var entry = entries[i];
    var year = entry.pub_date.getFullYear();

    var match = false;
    for (var j in years) {
      if (year == years[j].year) {
        match = true;
        years[j].entries.push(entry);
        break;
      }
    }

    if (!match) { years.push({ year: year, entries: [ entry ]}); }
  }

  res.render('blog.html', { years: years, section: "blog" });
};

exports.redirectOr404 = function(req, res) {
  var slug = req.params.slug;
  getEntry(slug) ? res.redirect(301, '/' + slug) : res.send(404);
}

exports.renderEntry = function(req, res) {
  var entry = getEntry(req.params.slug);

  if (!entry) {
    res.send(404);
    return;
  }

  res.render('entry.html', { entry: entry, section: "blog" });
}
