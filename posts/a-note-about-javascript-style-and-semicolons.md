There's a subtle design flaw in JavaScript that can lead to errors if you use the wrong indentation style.  This issue came up last week when a coworker complained that my JavaScript did not conform to our C# and C++ style guidelines.

Here's a sample of our C++ style:

```cpp
void MyClass::foo(string bar)
{
    // do something with bar
}
```

and here's the JavaScript in question:

```javascript
function foo(bar) {
    // do something with bar
}
```

Notice the difference?  The opening curly brace in JavaScript doesn't start on a new line.

Don't get me wrong, I'm not trying to be a trend setter nor am I trying to piss people off.  I don't have that strong of an opinion on style, just as long as it is consistent.

So why do I break the rules for JavaScript?  Because the above C++ style can *break JavaScript*.  The technical reason is that JavaScript [doesn't care about terminating semicolons](http://bclary.com/2004/11/07/#a-7.9).  Meaning that if you forget a semicolon, it will place one for you, even where doesn't make sense.  IMHO, it’s a flaw in the language because you can get in situations like this:

```javascript
function foo()
{
    return
    {
        bar: 'baz'
    };
}
var a = foo();
alert(a);
```

'a' is undefined!  Because this statement,

```javascript
return
{
    bar: 'baz'
};
```

is parsed as:

```javascript
return;
{
    bar: 'baz'
};
```
