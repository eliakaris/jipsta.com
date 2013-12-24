var fs = require('fs'),
    moment = require('moment'),
    marked = require('marked'),
    hljs = require('highlight.js'),
    path = require('path'),
    S = require('string');

var entriesFilename = path.resolve(__dirname, './entries.json');
var postsDirectory = path.resolve(__dirname, './posts');

var loadBlogEntries = function() {
  var entries_json = fs.readFileSync(entriesFilename);
  var entries = JSON.parse(entries_json);

  for (var entry in entries) {
    var entry = entries[entry];
    entry.pub_date = new Date(entry.pub_date);
    entry.pub_date_rfc822 = moment(entry.pub_date).format('ddd, DD MMM YYYY HH:mm:ss ZZ');
    entry.pretty_pub_date = entry.pretty_pub_date || moment(entry.pub_date).format("MMMM Do, YYYY");

    var data = fs.readFileSync(path.resolve(postsDirectory, entry.slug + '.' + entry.format), 'utf8');

    if (entry.format == 'md')
      entry.html = marked(data);
    else
      entry.html = data;

    entry.summary = S(entry.html).stripTags().truncate(200);
  }

  global.entries = entries.sort(function (a, b) {
    if (a.pub_date > b.pub_date)
      return -1;
    if (a.pub_date < b.pub_date)
      return 1;
    return 0;
  });
};

exports.init = function() {
  marked.setOptions({
    highlight: function (code, lang) {
      return hljs.highlight(lang, code).value;
    }
  });

  fs.watch(entriesFilename, loadBlogEntries);
  fs.watch(postsDirectory, loadBlogEntries);
  loadBlogEntries();
};
