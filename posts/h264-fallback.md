<script src="/js/h264Fallback-0.1.min.js"></script>

<style>
video {
  border: 1px solid #aaa;
  margin: 1em 0;
  -moz-box-shadow: 3px 3px 14px #666;
  -webkit-box-shadow: 3px 3px 14px #666;
  box-shadow: 3px 3px 14px #666;
}
table {
  width: 100%;
  text-align:left;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-collapse: collapse;
  font-family: 'Helvetica', 'Arial';
  background-color: white;
  margin: 1.5em 0;
}
th,
td {
  font-weight:normal;
  border-bottom: 1px solid #ddd;
  padding: .4em .4em;
}
td {
  font-size: small;
}
</style>

<p><a href="http://bitbucket.org/jcummins/h264fallback/src/tip/h264Fallback-0.1.js">h264Fallback.js</a> is a small (1616 bytes <a href="http://bitbucket.org/jcummins/h264fallback/src/tip/h264Fallback-0.1.min.js">compressed</a>) JavaScript library that embeds an <a href="http://en.wikipedia.org/wiki/H.264/MPEG-4_AVC">H.264</a> encoded video into a website using the HTML5 <code>&lt;video&gt;</code> element, falling back to Flash automatically.  If Flash is not supported, a download link is provided.</p>

<h2>Code</h2>

<p>Check out the <a href="http://bitbucket.org/jcummins/h264fallback/overview">BitBucket code repository</a> or <a href="{{ MEDIA_URL }}js/h264Fallback-0.1.min.js">download the JavaScript file</a> (right-click, Save As).</p>

<p>Include each video on your page like so:</p>

```xml
<div class="h264Fallback" data-height="{height}" data-width="{width}">
  <p>Video download:
    <a href="{url}" class="videoLink">{title}</a>
  </p>
</div>
```

<p>Be sure to replace <code>{height}</code>, <code>{width}</code>, <code>{url}</code>, and <code>{title}</code> with the video's height, width, url, and title. You can even provide different CSS class names if you wish. Don't worry about the strange <code>data-</code> attributes, they're perfectly <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/elements.html#custom-data-attribute">valid in HTML5</a>.</p>

<p>Finally, initialize <code>h264Fallback</code> by invoking <code>init()</code> with the url to your Flash player.</p>

```javascript
h264Fallback.init({
  player: 'videos/player.swf'
});
```

<p>I use <a href="http://www.longtailvideo.com/players/jw-flv-player/">JW Player</a> (download and place <code>player.swf</code> in the right place), but this could be any Flash resource including YouTube.</p>

<h2>Example</h2>

<div class="h264Fallback" data-height="144" data-width="478">
  <p>Video download: <a href="{{ MEDIA_URL }}videos/Hover-YouTube.mov" class="videoLink">Hover-YouTube.mov</a></p>
</div>

```xml
<div class="h264Fallback" data-height="144" data-width="478">
  <p>Video download:
    <a href="videos/Hover-YouTube.mov" class="videoLink">Hover-YouTube.mov</a>
  </p>
</div>

<script>
h264Fallback.init({
  player: 'videos/player.swf'
});
</script>
```

<h2>Options</h2>
<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Example</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>controls</code></td>
    <td><code>boolean</code></td>
    <td><code>true</code></td>
    <td>No</td>
    <td>Toggles the browser video controls</td>
  </tr>
  <tr>
    <td><code>player</code></td>
    <td><code>string</code></td>
    <td><code>videos/player.swf</code></td>
    <td>Yes</td>
    <td>URL to the flash video player</td>
  </tr>
  <tr>
    <td><code>videoDivClass</code></td>
    <td><code>string</code></td>
    <td><code>h264Fallback</code></td>
    <td>No</td>
    <td>CSS class name for each video</td>
  </tr>
  <tr>
    <td><code>videoLinkClass</code></td>
    <td><code>string</code></td>
    <td><code>videoLink</code></td>
    <td>No</td>
    <td>CSS class name for each video</td>
  </tr>
</table>
<h2>Further Reading</h2>
<ul>
  <li><a href="http://camendesign.com/code/video_for_everybody">Video for Everybody!</a></li>
  <li><a href="http://www.longtailvideo.com/players/jw-flv-player/">JW Player: Flash Video Player</a></li>
  <li><a href="http://speckyboy.com/2010/04/23/html5-video-libraries-toolkits-and-players/">HTML5 video Libraries, Toolkits and Players</a></li>
  <li><a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/elements.html#custom-data-attributes/">HTML5 Custom Data Attributes</a></li>
</ul>

<script>
h264Fallback.init({
  player: '{{ MEDIA_URL }}videos/player.swf'
});
</script>
