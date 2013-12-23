Pop quiz.  When removing an element from the DOM containing a CSS node, will the browser also reset the CSS rules?

Here's an example:

```xml
<!DOCTYPE html>
<head>
    <title>CSS DOM Removal Test</title>

    <style>

    #test {
        background-color: red;
    }

    </style>

</head>
<body>

<div id="css">
    <style>
    #test {
        background-color: green;
    }
    </style>
</div>

<div id="test">
    This is a test
</div>

<input type="button" onclick="removeCss(); return false;" value="Remove CSS" />

</body>

<script>

function removeCss() {
    var css = document.getElementById("css");
    css.parentNode.removeChild(css);
}

</script>

</html>
```

What will happen when "Remove CSS" is clicked? Click [here](/projects/css-dom-removal-test/) to find out.
