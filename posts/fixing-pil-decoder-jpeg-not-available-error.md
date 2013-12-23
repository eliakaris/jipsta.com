If you're using the [Python Imaging Library](http://www.pythonware.com/products/pil/) (PIL) on Mac OS X, you may get the following error:

```bash
File "/Library/Python/2.6/site-packages/PIL/Image.py", line 1483, in show
  _show(self, title=title, command=command)
File "/Library/Python/2.6/site-packages/PIL/Image.py", line 2123, in _show
  apply(_showxv, (image,), options)
File "/Library/Python/2.6/site-packages/PIL/Image.py", line 2127, in _showxv
  apply(ImageShow.show, (image, title), options)
File "/Library/Python/2.6/site-packages/PIL/ImageShow.py", line 41, in show
  if viewer.show(image, title=title, **options):
File "/Library/Python/2.6/site-packages/PIL/ImageShow.py", line 66, in show
  self.show_image(image, **options)
File "/Library/Python/2.6/site-packages/PIL/ImageShow.py", line 85, in show_image
  return self.show_file(self.save_image(image), **options)
File "/Library/Python/2.6/site-packages/PIL/ImageShow.py", line 81, in save_image
  return image._dump(format=self.get_format(image))
File "/Library/Python/2.6/site-packages/PIL/Image.py", line 488, in _dump
  self.load()
File "/Library/Python/2.6/site-packages/PIL/ImageFile.py", line 189, in load
  d = Image._getdecoder(self.mode, d, a, self.decoderconfig)
File "/Library/Python/2.6/site-packages/PIL/Image.py", line 385, in _getdecoder
  raise IOError("decoder %s not available" % decoder_name)
IOError: decoder jpeg not available
```

This message appears because PIL was unable to find jpeg library when it was installed. Here's how to fix the error:

Download and install [zlib](http://www.zlib.net/):

```bash
curl -O http://www.zlib.net/zlib-1.2.3.tar.bz2
tar -zxvf zlib-1.2.3.tar.bz2
cd zlib-1.2.3
./configure
make
sudo make install
```

Download and install [libjpeg](http://www.ijg.org/) version 6a or 6b.  As of January 2010, the only version available on [Independent JPEG Group](http://www.ijg.org/)'s website is version 8.  As I found out, version 8 is not compatible with PIL 1.1.7.  Luckily, I was able to find a copy of the library on [Google Code](http://code.google.com/p/google-desktop-for-linux-mirror/downloads/list).

```bash
curl -O http://google-desktop-for-linux-mirror.googlecode.com/files/jpeg-6b.tar.gz
tar -zxvf jpeg-6b.tar.gz
cd jpeg/src
./configure
make
sudo make install
```

Finally, reinstall the [Python Imaging Library](http://www.pythonware.com/products/pil/), making sure to update the library pointers.

```bash
cd Imaging-1.1.7
sed -i -e 's/JPEG_ROOT = None/JPEG_ROOT = \"\/usr\/local\/bin\"/g' setup.py
sed -i -e 's/ZLIB_ROOT = None/ZLIB_ROOT = \"\/usr\/local\/include\"/g' setup.py
python setup.py install
```
