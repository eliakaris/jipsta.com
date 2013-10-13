Until very recently, all my projects at work were written in pure unmanaged C++.  Now that we're starting sprinkle a little C# in the mix, some interesting issues have arisen.

Today's issue revolves around the use of the `var` keyword.  It's a relatively new concept in C# and is a [topic of great debate](http://www.infoq.com/news/2008/05/CSharp-var).  Basically, `var` allows for local type inference when the compiler can determine what the variable type should be.

> Beginning in Visual C# 3.0, variables that are declared at method scope can
> have an implicit type var. An implicitly typed local variable is strongly
> typed just as if you had declared the type yourself, but the compiler
> determines the type.

[var - C# Reference](http://msdn.microsoft.com/en-us/library/bb383973.aspx)

Thus, the following two declarations of `i` are equivalent:

~~~cs
var i = 10; // implicitly typed
int i = 10; // explicitly typed
~~~

The var keyword is great because it solves one of my pet-peeves with C# and Java -- having to write type names twice:

~~~cs
MyType foo = new MyType();
~~~

This is verbose and unnecessary. `var` optimizes for the lazy by reducing the number of characters that have to be typed.  The fewer the characters, the shorter the line, the easier it is to read.  See for yourself:

~~~cs
MyCustomTypeWithAVeryLongName foo = new MyCustomTypeWithAVeryLongName();
var foo = new MyCustomTypeWithAVeryLongName();
~~~

The debate still rages on and I doubt anyone will cave in until we come up with some coding guidelines.  In the meantime, I will continue to propagate `var` throughout our codebase.
