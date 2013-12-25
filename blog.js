var fs = require('fs'),
    moment = require('moment'),
    marked = require('marked'),
    hljs = require('highlight.js'),
    path = require('path'),
    S = require('string'),
    request = require('request');

var entriesFilename = path.resolve(__dirname, './entries.json');
var postsDirectory = path.resolve(__dirname, './posts');

var replaceTweetPermalinksWithEmbeds = function (entry, cb) {
  var regex = /<a href=\"https:\/\/twitter\.com\/\w+\/status\/\d+\">https:\/\/twitter\.com\/\w+\/status\/(\d+)<\/a>/g;
  var match = regex.exec(entry.html);

  function makeRequest(tweetLinkHtml, tweetId, cb) {
    request('https://api.twitter.com/1/statuses/oembed.json?align=center&omit_script=true&id=' + tweetId, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        cb(entry, tweetLinkHtml, JSON.parse(body).html);
      }
    });
  }

  while (match != null) {
    makeRequest(match[0], match[1], cb);
    match = regex.exec(entry.html);
  }
}

var loadBlogEntries = function() {
  var entries_json = fs.readFileSync(entriesFilename);
  var entries = JSON.parse(entries_json);

  for (var entry in entries) {
    var entry = entries[entry];
    entry.pub_date = new Date(entry.pub_date);
    entry.pub_date_rfc822 = moment(entry.pub_date).format('ddd, DD MMM YYYY HH:mm:ss ZZ');
    entry.pub_date_sitemap = moment(entry.pub_date).format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ [(UTC)]');
    entry.pretty_pub_date = entry.pretty_pub_date || moment(entry.pub_date).format("MMMM Do, YYYY");

    var data = fs.readFileSync(path.resolve(postsDirectory, entry.slug + '.' + entry.format), 'utf8');
    entry.html = entry.format == 'md' ? marked(data) : data
    entry.summary = S(entry.html).stripTags().truncate(200);

    replaceTweetPermalinksWithEmbeds(entry, function(entry, tweetLinkHtml, tweetEmbedHtml) {
      entry.html = entry.html.replace(tweetLinkHtml, tweetEmbedHtml);
    });
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
