#!/usr/bin/env ruby
# smugmug2html.rb - Creates an html file from a SmugMug gallery.

# work in progress!

require 'optparse'
require 'ostruct'
require 'ruby-smugmug'
require 'oauth'
require 'oauth/consumer'
require 'launchy'
require 'pp'
require 'json'

options = OpenStruct.new
ARGV.options do |opts|
 opts.banner = "Usage: smugmug2html.rb [options]"

 opts.on('-o', '--out=file', String, 'Save output to a file') do |file|
   options.file = file
 end

 opts.on('-g', '--gallery=gallery', String, 'SmugMug Gallery title') do |gallery|
   options.gallery = gallery
 end

 opts.on('-u', '--user=user', String, 'SmugMug user') do |user|
   options.user = user
 end

 opts.on('-k', '--key=key', String, 'SmugMug API key') do |key|
   options.key = key
 end

 opts.on('-s', '--secret=secret', String, 'SmugMug API secret') do |secret|
   options.secret = secret
 end

 opts.parse!
end

secrets_file = File.expand_path(File.dirname(__FILE__)) + "/secrets.json"
if File.exists?(secrets_file)
  secrets = JSON.parse(IO.read(secrets_file))
  options.key = secrets["smugmug_key"]
  options.secret = secrets["smugmug_secret"]
end

consumer = OAuth::Consumer.new(
  options.key,
  options.secret,
  :request_token_url => 'http://api.smugmug.com/services/oauth/getRequestToken.mg',
  :access_token_url => 'http://api.smugmug.com/services/oauth/getAccessToken.mg',
  :authorize_url => 'http://api.smugmug.com/services/oauth/authorize.mg')

request_token = consumer.get_request_token
Launchy.open("#{request_token.authorize_url}&Access=Public&Permissions=Read")

puts "Once permission is granted, press any key to continue"
gets

access_token = request_token.get_access_token

client = SmugMug::Client.new(
  :api_key => options.key,
  :oauth_secret => options.secret,
  :user => {:token => access_token.token, :secret => access_token.secret})

albums = client.albums.get(:nickname => options.user)
album = albums.select { |a| a['Title'] == options.gallery }.first
images = client.images.get(:AlbumID => album['id'], :AlbumKey => album['Key'])

image_urls = []
images['Images'].each do |image|
  image_urls.push client.images.getURLs(
    :ImageID => image['id'],
    :ImageKey => image['Key']
  )
end

pp image_urls
puts "\n\n\n\n"
pp albums
puts "\n\n\n\n"

image_urls.each do |url|
  puts "<a href=\"#{url['URL']}\"><img src=\"#{url['ThumbURL']}\"></a>"
end

