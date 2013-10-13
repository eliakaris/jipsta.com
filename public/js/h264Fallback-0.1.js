var h264Fallback = {
  version: '0.1',
  supportsVideo: function() { return !!document.createElement('video').canPlayType; },
  supportsH264: function() {
    var v = document.createElement('video');
    return !!(v.canPlayType && v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/, ''));
  },
  supportsFlash: function() {
      return navigator.mimeTypes["application/x-shockwave-flash"] && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin;
  },
  getVideoSrc: function(videoDiv) {
    return videoDiv.getElementsByClassName(h264Fallback.options.videoLinkClass)[0].getAttribute('href');
  },
  createVideo: function(videoDiv) {
    var video = document.createElement('video');
    video.src = h264Fallback.getVideoSrc(videoDiv);
    
    if (h264Fallback.options.controls)
      video.controls = 'controls';
    
    return video;
  },
  createPlayer: function(videoDiv) {
    var video    = document.createElement('object');
    video.width  = videoDiv.getAttribute('data-width');
    video.height = videoDiv.getAttribute('data-height');
    video.data   = h264Fallback.options.player;
    video.type   = "application/x-shockwave-flash";
    
    var paramMovie   = document.createElement('param');
    paramMovie.name  = 'movie';
    paramMovie.value = h264Fallback.options.player;
    video.appendChild(paramMovie);
    
    var videoSrc = h264Fallback.getVideoSrc(videoDiv);
    
    var paramFlashvars   = document.createElement('param');
    paramFlashvars.name  = "flashvars";
    paramFlashvars.value = "autostart=false&file=" + videoSrc;
    video.appendChild(paramFlashvars);

    return video;
  },
  init: function(options) {
    
    this.options = {
      controls: options.controls ? options.controls : true,
      videoDivClass: options.videoDivClass ? options.videoDivClass : 'h264Fallback',
      videoLinkClass: options.videoLinkClass ? options.videoLinkClass : 'videoLink',
      player: options.player || ''
    };
    
    var videoDivs = document.getElementsByClassName(this.options.videoDivClass);
    while (videoDivs.length > 0) {
      var videoDiv = videoDivs[0];
      if (this.supportsH264())
        videoDiv.parentNode.replaceChild(this.createVideo(videoDiv), videoDiv);
      else if (this.supportsFlash() && this.supportsVideo())
        videoDiv.parentNode.replaceChild(this.createPlayer(videoDiv), videoDiv);
      else
        return;
    }
  }
}