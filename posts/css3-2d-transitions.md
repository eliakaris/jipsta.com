<style>
#test {
  border: 1px solid #ddd;
  background-color: #ffe;
  padding: 1em;
}

#status-message {
  margin: 0;
  text-align: center;
}

.transition-test {
  background-color: white;
  border: 1px solid #ddd;
  margin: 1em;
  width: 6em;
  text-align:center;
}

#ease {
	-webkit-transition: all 1s ease;
	-moz-transition: all 1s ease;
	-o-transition: all 1s ease;
	transition: all 1s ease;
}

#linear {
	-webkit-transition: all 1s linear;
	-moz-transition: all 1s linear;
	-o-transition: all 1s linear;
	transition: all 1s linear;
}

#ease-in {
	-webkit-transition: all 1s ease-in;
	-moz-transition: all 1s ease-in;
	-o-transition: all 1s ease-in;
	transition: all 1s ease-in;
}

#ease-out {
	-webkit-transition: all 1s ease-out;
	-moz-transition: all 1s ease-out;
	-o-transition: all 1s ease-out;
	transition: all 1s ease-out;
}

#ease-in-out {
	-webkit-transition: all 1s ease-in-out;
	-moz-transition: all 1s ease-in-out;
	-o-transition: all 1s ease-in-out;
	transition: all 1s ease-in-out;
}

#transitions:hover .transition-test {
	margin-left:480px;
	-webkit-transform: rotate(360deg);
	background-color:#fef;
}

</style>

Hover over the box below to see each transition.

<div id="test">
  <p id="status-message"></p>

  <div id="transitions">
      <div id="ease" class="transition-test"><p>ease</p></div>
      <div id="linear" class="transition-test"><p>linear</p></div>
      <div id="ease-in" class="transition-test"><p>ease-in</p></div>
      <div id="ease-out" class="transition-test"><p>ease-out</p></div>
      <div id="ease-in-out" class="transition-test"><p>ease-in-out</p></div>
  </div>
</div>

<h2>HTML</h2>

```xml
<div id="transitions">
    <div id="ease" class="transition-test"><p>ease</p></div>
    <div id="linear" class="transition-test"><p>linear</p></div>
    <div id="ease-in" class="transition-test"><p>ease-in</p></div>
    <div id="ease-out" class="transition-test"><p>ease-out</p></div>
    <div id="ease-in-out" class="transition-test"><p>ease-in-out</p></div>
</div>
```

<h2>CSS</h2>

```css
#ease {
	-webkit-transition: all 1s ease;
	-moz-transition: all 1s ease;
	-o-transition: all 1s ease;
	transition: all 1s ease;
}

#linear {
	-webkit-transition: all 1s linear;
	-moz-transition: all 1s linear;
	-o-transition: all 1s linear;
	transition: all 1s linear;
}

#ease-in {
	-webkit-transition: all 1s ease-in;
	-moz-transition: all 1s ease-in;
	-o-transition: all 1s ease-in;
	transition: all 1s ease-in;
}

#ease-out {
	-webkit-transition: all 1s ease-out;
	-moz-transition: all 1s ease-out;
	-o-transition: all 1s ease-out;
	transition: all 1s ease-out;
}

#ease-in-out {
	-webkit-transition: all 1s ease-in-out;
	-moz-transition: all 1s ease-in-out;
	-o-transition: all 1s ease-in-out;
	transition: all 1s ease-in-out;
}

#transitions:hover .transition-test {
	margin-left:480px;
	-webkit-transform: rotate(360deg);
	background-color:#fef;
}
```

<h2>Further Reading</h2>

<ul>
  <li><a href="http://www.w3.org/TR/css3-transitions/">W3C Spec - CSS Transitions Module Level 3</a></li>
  <li><a href="http://webkit.org/blog/138/css-animation/">Surfin' Sufari - CSS Animation</a></li>
  <li><a href="https://developer.mozilla.org/en/CSS/-moz-transition">-moz-transition</a></li>
</ul>
