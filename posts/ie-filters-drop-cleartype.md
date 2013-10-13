Today I discovered that Internet Explorer drops [ClearType](http://en.wikipedia.org/wiki/ClearType) whenever a [CSS Filter](http://msdn.microsoft.com/en-us/library/ms532853(v=VS.85).aspx) is applied.  The image below is a close-up of two `<div>`'s.  The first doesn't have a Filter,  the other does.  As you can see, ClearType's subpixel rendering is dropped.

![ClearType is dropped when a CSS filter is applied](/img/NoClearType.png)

[Several](http://stackoverflow.com/questions/411058/ie-is-losing-cleartype) [people](http://tanny.ica.com/ica/tko/tkoblog.nsf/dx/has-ie7-broken-css-filters) have noticed the same behavior.


One possible [solution](http://cookbooks.adobe.com/post_IE8_clearType_fix_when_using_filters-16676.html) is to enclose the text within a wrapping `<div>` with `position:relative`.  I haven't tried this myself and I have no idea if it actually works.
