Tonight I created a [Geolocation in HTML 5](http://jipsta.com/projects/geolocation) project.

> One of the really cool features of HTML 5 is the [Geolocation API](http://www.w3.org/TR/geolocation-API/). Geolocation lets users to share their location with trusted websites. When the user allows the website to gather their location, the browser submits latitude and longitude to the website through a JavaScript callback. The website can then use the information to do fancy location-aware things like finding a nearby theater or mapping houses for sale in your neighborhood.

Things I learned in the process:

* Geolocation is not supported by Internet Explorer.
* Browsers must ask for permission before providing location information.
* `watchPosition()` continually tracks users as their location changes.
* With `enableHighAccuracy`, one can get very precise location information (if supported by the browser).

Overall, I think the Geolocation API is a great addition to the HTML 5 spec.  It allows anyone to obtain location information without depending on third-party JavaScript APIs or costly location detection services.  My only complaint is that the specification is too loose on privacy.  It does not require browsers to display the location information before it is sent.  Nor does the spec require browsers to fine tune location information.  I would love to see a simple addition to the permission popup that would allow users to send only their region, city, or exact address.
