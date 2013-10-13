Today Valve released [Steam for Mac OS X](http://store.steampowered.com/news/3818/).  Unfortunately, most people will run in to a small problem:

![Steam error message](http://media.jipsta.com/img/steam_error.png)

What?!?  Steam requires a case-insensitive filesystem?!  Really?

Don't worry.  With a little command line voodoo, you can work around this problem without reformatting.  All you need to do is create an image that is case insensitive, copy the Steam files to the image, then symlink two folders to the new image.

Here's a really useful script that I found on [pastebin](http://pastebin.com/pj7gh5Q5):

~~~bash
#!/bin/sh
# For people who like case-sensitive filesystems and games.
# It should still work for people who don't care what case their filesystem is.

# Create a sparse bundle disk image to house an insensitive filesystem.
# This creates a 10GiB disk image that will please Steam. Don't worry -- those
# 10GiB will only be allocated when you actually start getting games.
echo ">>> Creating disk image."
VOLUME=`hdiutil create -size 10g -type SPARSEBUNDLE -fs HFS+J \
                -volname Steam -layout NONE -attach Steam \
      | egrep -o '/Volume.+'`

# Change to the disk image's directory and begin working in there.
cd ${VOLUME}

# Download the latest Steam binary for Mac OS X.
echo ">>> Discovering Steam's location."
LOCATION="http://store.steampowered.com/public/client/"
# Discover the latest binary's filename.
FILE=`curl -# ${LOCATION}steam_client_osx \
    | grep -A 3 \"steam_osx\" \
    | egrep -o 'steam_osx.zip.[^"]+'`
echo ">>> Downloading Steam."
curl -# -L ${LOCATION}${FILE} -o steam_osx.zip

# Extract and sort out the file permissions.
unzip -d Steam.app steam_osx.zip > /dev/null
rm -fv steam_osx.zip
chmod -vv 0755 Steam.app/osx32/steam Steam.app/steam.sh

# Check to see if Steam has been run before and move directories to new
# location. If not, create the various directories required.
APPSUPPORT="${HOME}/Library/Application Support/Steam"
VOLAPPSUPPORT="${VOLUME}/Application Support"
if [ -d "${APPSUPPORT}" ]; then
    echo ">>> Moving ${APPSUPPORT} to ${VOLUME}/Application Support."
    cp -avX "${APPSUPPORT}" "${VOLAPPSUPPORT}"
    echo ">>> Sending ${APPSUPPORT} to the Trash."
    osascript -e "tell application \"Finder\"
                      delete POSIX file \"${APPSUPPORT}\"
                  end tell"
fi
if [ ! -d "${VOLAPPSUPPORT}" ]; then
    echo ">>> Creating ${VOLAPPSUPPORT}."
    mkdir -pv "${VOLAPPSUPPORT}"
fi

STEAMCONTENT="${HOME}/Documents/Steam Content"
VOLSTEAMCONTENT="${VOLUME}/Steam Content"
if [ -d "$STEAMCONTENT" ]; then
    echo ">>> Copying ${STEAMCONTENT} to ${VOLUME}/Steam Content."
    cp -avX "${STEAMCONTENT}" "${VOLSTEAMCONTENT}"
    echo ">>> Sending ${STEAMCONTENT} to the Trash."
    osascript -e "tell application \"Finder\"
                      delete POSIX file \"${STEAMCONTENT}\"
                  end tell"
fi
if [ ! -d "${VOLSTEAMCONTENT}" ]; then
    echo ">>> Creating ${VOLSTEAMCONTENT}."
    mkdir -pv "${VOLSTEAMCONTENT}"
fi

# Link to the disk image.
ln -fnsv "${VOLAPPSUPPORT}" "${APPSUPPORT}"
ln -fnsv "${VOLSTEAMCONTENT}" "${STEAMCONTENT}"
~~~

Save this as `steam.sh`, execute it with root permissions `sudo bash steam.sh`, then you can launch Steam.app from /Volumes/Steam.
