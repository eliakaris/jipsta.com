Some people claim that Git's [killer feature](http://codemac.net/blog/18/) is its index.  What's the index you ask?  You can think of it like a staging area before you actually commit a change.  If you change a file, you must "git add" the changes to the index, _then_ commit the change.  This makes committing a three stage process:

1.  Modify files
2.  Add the modifications to the index  (`git add [files]`)
3.  Commit the modified index (`git commit`)

Having to do this three stage process on each checkin seems silly (yes, I know about `git commit -a`, and the [benefits of the index](http://tomayko.com/writings/the-thing-about-git)).  But all I want to do is commit a change.  I don't want to have to think about the index, staging, and all the other little things.  Call me lazy.

Git then pissed me off when I tried to check in a file with extra whitespace.  It flat out refused to let this happen.

```bash
# git commit
* You have some suspicious patch lines:
*
* In test.py
* trailing whitespace (line 20)
```

Why is the VCS inspecting the contents of my code?  Shouldn't it be totally agnostic to the contents of the file?  This is just a standard out-of-the-box installation of Git on Windows.  I haven't customized a thing.  Frustrating.

