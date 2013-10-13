var fs = require('fs'),
    moment = require('moment'),
    marked = require('marked'),
    hljs = require('highlight.js');

var entriesFilename = './entries.json';
var postsDirectory = './posts/';

var loadBlogEntries = function() {
  var entries_json = fs.readFileSync(entriesFilename);
  var entries = JSON.parse(entries_json);

  for (var entry in entries) {
    var entry = entries[entry];
    entry.pub_date = new Date(entry.pub_date);
    entry.pretty_pub_date = entry.pretty_pub_date || moment(entry.pub_date).format("MMMM Do, YYYY");
    entry.html = marked(fs.readFileSync(postsDirectory + entry.slug + '.' + entry.format, 'utf8'));
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
