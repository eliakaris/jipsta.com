<script src="http://maps.google.com/maps?file=api&v=2&key=ABQIAAAAcb9d50Qj2wlKVBlPDTLU5xTLoD_AsyfXX9Fvy3MbLPKNxigEOhS6QfteW9ppcVM-p4_qVdCV1xQm3A&sensor=false"></script>

<style>
#test {
  border: 1px solid #ddd;
  background-color: #ffe;
  padding: 1em;
}

#test form {
  text-align: center;
}

#test h2 {
  margin: 2em 0 1em 0;
}

#status-message {
  margin: 0;
  text-align: center;
}

#geolocation {
  margin: 0 auto;
}

table {
  text-align: left;
  border: 1px solid #ddd;
  width: 100%;
}

th {
  font-weight: normal;
}

td, th {
  padding: 0 .5em;
}

tr {
  background-color: #fff;
}

.table-tr-odd {
  background-color: #eee;
}
</style>

One of the really cool features of HTML 5 is the [Geolocation API](http://www.w3.org/TR/geolocation-API/). Geolocation lets users to share their location with trusted websites. When the user allows the website to gather their location, the browser submits latitude and longitude to the website through a JavaScript callback. The website can then use the information to do fancy location-aware things like finding a nearby theater or mapping houses for sale in your neighborhood.

Things I learned in the process:

* Geolocation is not supported by Internet Explorer.
* Browsers must ask for permission before providing location information.
* `watchPosition()` continually tracks users as their location changes.
* With `enableHighAccuracy`, one can get very precise location information (if supported by the browser).

Overall, I think the Geolocation API is a great addition to the HTML 5 spec.  It allows anyone to obtain location information without depending on third-party JavaScript APIs or costly location detection services.  My only complaint is that the specification is too loose on privacy.  It does not require browsers to display the location information before it is sent.  Nor does the spec require browsers to fine tune location information.  I would love to see a simple addition to the permission popup that would allow users to send only their region, city, or exact address.


<h2>How does it work?</h2>

<p>The Geolocation API consists of a single JavaScript object,  <code>navigator.geolocation</code>.  If the <code>navigator</code> object doesn't exist, the browser simply doesn't support geolocation.</p>

<p>If the <code>navigator</code> object exists, the next step in detecting location is to call <code>geolocation.getCurrentPosition</code>:</p>

```javascript
navigator.geolocation.getCurrentPosition(callback)
```

<p>When called, the browser asks the user for permission to submit their location.</p>

<img src="/img/geolocation.png" />

<p>Thankfully, the <a href="http://www.w3.org/TR/geolocation-API/#security">geolocation API states</a> that browsers “must not send location information to Web sites without the express permission of the user.” </p>

<p>Once permission is granted, the JavaScript callback is invoked with a location object.  The object is populated with all sorts of goodies such as latitude, longitude, altitude, heading, and speed.</p>

```javascript
function callback(location) {
  var latitude = location.coords.latitude;
  var longitude = location.coords.longitude;
}
```

<h2>Further Reading</h2>

<p>I've only scratched the surface of the Geolocation API.  If you're interested in learning more, I recommend reading the following sites:</p>

<ul>
  <li><a href="http://diveintohtml5.org/geolocation.html">Dive Into HTML 5 - You are here (and so is everybody else)</a></li>
  <li><a href="http://www.w3.org/TR/geolocation-API/">Geolocation API Specification</a></li>
  <li><a href="https://developer.mozilla.org/en/using_geolocation">Geolocation in Gecko 1.9.1</a></li>
</ul>

<h2>Geolocation in Action</h2>

<p>Below is a demo I created for the Geolocation API. It asks for location information, displays a Google map, and inspects the location object returned by the browser.</p>

<div id="test">
  <p id="status-message"></p>
  <form action="" method="get" id="start">
    <input type="button"
           value="Begin Test"
           onclick="begin_test(); return false;" />
  </form>

  <div id="geolocation">
  </div>
</div>

<p>Note: I don't store or share any location information.</p>


<script>

function codify(object) {
  return "<code>" + object + "</code>";
}

function message(text) {
  $('status-message').empty();
  $('status-message').appendText(text);
}

function get_loc_table(coords) {
  // Convert coords to an array
  var rows = [];
  for (property in coords) {
    var value = $defined(coords[property]) ? coords[property] : "";
    var type  = $type(coords[property]) ? $type(coords[property]) : "";
    rows.push([codify(property), codify(type), codify(value)])
  }

  // Create a table from the array
  return table = new HtmlTable({
    headers: ['Property', 'Type', 'Value'],
    rows: rows,
  });
}

function begin_test() {
  $('start').dispose();
  navigator.geolocation.getCurrentPosition(show_map, handle_error);
}

function show_map(loc) {
  message("Location information received.");

  var mapHeader = new Element('h2', {
    html: "Map"
  });
  mapHeader.inject($('geolocation'));

  var mapDiv = new Element('div', {
    'styles': {
      'height': '350px',
      'width': '100%'
    }
  });
  mapDiv.inject($('geolocation'));

  var map = new GMap2(mapDiv);
  var center = new GLatLng(loc.coords.latitude, loc.coords.longitude);
  map.setCenter(center, 14);
  map.addControl(new GSmallMapControl());
  map.addControl(new GMapTypeControl());
  map.addOverlay(new GMarker(center, {draggable: false, title: "You are here (more or less)"}));

  var coordsHeader = new Element('h2', {
    html: "location.coords"
  });
  coordsHeader.inject($('geolocation'));

  get_loc_table(loc.coords).inject($('geolocation'));
}

function handle_error(err) {
  switch (err.code) {
    case 1: message("Location information denied."); break;
    case 2: message("Location could not be found."); break;
    case 3: message("Timed out."); break;
    default: message("An unknown error occurred."); break;
  }
}

</script>
