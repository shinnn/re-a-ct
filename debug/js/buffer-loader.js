// Fork from Chromium's 'Bufferloader' class
// http://chromium.googlecode.com/svn/trunk/samples/audio/doc/loading-sounds.html

(function(window) {
  'use strict';
  
  var _dir, _ext;
  
  window.BufferLoader = function(audioContext, dir, fileNames, ext, callback) {
    this.context = audioContext;
    this.fileList = fileNames;
    this.onload = callback;
    this.bufferList = [];
    this.loadCount = 0;
    this.getBufferFromName = function(name){
      var _index = this.fileList.indexOf(name);
      return this.bufferList[_index];
    };
    
    _dir = dir;
    _ext = ext;
  };  
  
  var is_iOS = navigator.userAgent.indexOf('like Mac OS X') !== -1;

  BufferLoader.prototype.loadBuffer = function(url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    var loader = this;

    // Asynchronously decode the audio file data in request.response
    request.onload = function(){
    
      /*
      void decodeAudioData(
        ArrayBuffer audioData,
        DecodeSuccessCallback successCallback,
        optional DecodeErrorCallback errorCallback
      );
      */
      loader.context.decodeAudioData(
        getArrayBuffer(request.response),
        function successCallback(buffer) {
          if(! buffer){
            alert('error decoding file data: '+url);
            return;
          }
          loader.bufferList[index] = buffer;
          if(++loader.loadCount === loader.fileList.length) {
            loader.onload(loader.bufferList);
          }
        },
        function errorCallback(error) {
          console.error('decodeAudioData error', error);
        }
      );
    };
  
    request.onerror = function() {
      alert('BufferLoader: XHR error');
    };
    
    request.send();
  };
  
  var getArrayBuffer;
  if (is_iOS) {
    // http://updates.html5rocks.com/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
    var ab2str = function(buf) {
      // 上述のURLの例のとおり String.fromCharCode.apply(null, new Uint8Array(buf)) とすると
      // 'Maximum call stack size exceeded' が発生するため、下記のように処理する
      
      var arr = new Uint8Array(buf);
      var str = '';
      for (var i=0, len=arr.length; i<len; i++) {
        str += String.fromCharCode(arr[i]);
      }
      return str;
    };

    var str2ab = function(str) {
      var buf = new ArrayBuffer(str.length * Uint8Array.BYTES_PER_ELEMENT); // BYTES_... = 1
      var bufView = new Uint8Array(buf);
      for (var i=0, len=str.length; i<len; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    };
    
    getArrayBuffer = function(response) {
      // iOSでは、XHRで取得した ArrayBuffer を直接デコードすることができない。
      // 一度 ArrayBuffer を String に変換し、再度 ArrayBuffer 化したものをデコードする。
      return str2ab(ab2str(response));
    };
    
  } else {
    getArrayBuffer = function(response) {
      return response;
    };
  }

  BufferLoader.prototype.load = function() {
    for (var i=0; i < this.fileList.length; ++i) {
      this.loadBuffer(
        _dir + this.fileList[i] + '.' + _ext,
        i
      );
    }
  };
  
}(window));
