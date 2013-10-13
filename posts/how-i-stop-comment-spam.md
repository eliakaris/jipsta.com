Over the past few weeks, I've received a huge amount of comment spam.  Each time I get spammed, I have to go in an manually delete the comment.  This approach doesn't scale.

Fighting spam is not a simple matter.  Previously, I relied solely on [Django's](http://www.djangoproject.com/) built-in [spam honeypot](http://docs.djangoproject.com/en/dev/ref/contrib/comments/#notes-on-the-comment-form).  Although clever, it isn't effective enough:

>It contains a number of hidden fields that contain timestamps, information about the object the comment should be attached to, and a "security hash" used to validate this information. If someone tampers with this data -- something comment spammers will try -- the comment submission will fail.

>If you're rendering a custom comment form, you'll need to make sure to pass these values through unchanged.
>
>The timestamp is used to ensure that "reply attacks" can't continue very long. Users who wait too long between requesting the form and posting a comment will have their submissions refused.
>
>The comment form includes a "honeypot" field. It's a trap: if any data is entered in that field, the comment will be considered spam (spammers often automatically fill in all fields in an attempt to make valid submissions).
>
>The default form hides this field with a piece of CSS and further labels it with a warning field; if you use the comment form with a custom template you should be sure to do the same.

Does this mean that the spammers are manually commenting on my blog?  What losers!  Don't they realize that this site has virtually no traffic or page rank?

The next trick up my sleeve is to disable commenting after one week. Since I'm using the latest stable release of Django, I can't take advantage of the upcoming [generic comment moderation](http://docs.djangoproject.com/en/dev/ref/contrib/comments/moderation/) system to do this for me.  Thankfully, MVC makes it trivial to add this functionality.  I literally implemented comment expiration in ten minutes.  I love you Django.

If I still get comment spam, I'll have to bring out the big guns - [re-CAPTCHA](http://recaptcha.net/) or [Akismet](http://akismet.com/).  

