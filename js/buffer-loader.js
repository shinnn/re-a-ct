// http://chromium.googlecode.com/svn/trunk/samples/audio/doc/loading-sounds.html
function BufferLoader(context,urlList,callback){
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = [];
  this.loadCount = 0;
}

(function(){
  var is_iOS = navigator.userAgent.indexOf('like Mac OS X') !== -1;
  
  var loader;
  
  // http://updates.html5rocks.com/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
  function ab2str(buf){
    // String.fromCharCode.apply(null, new Uint8Array(buf)) だと
    // 'Maximum call stack size exceeded' が発生するため、下記のように処理する
        
    var arr = new Uint8Array(buf);
    var str = '';
    for(var i=0, len=arr.length; i<len; i++){
      str += String.fromCharCode(arr[i]);
    }
    return str;
  }

  function str2ab(str){
    var buf = new ArrayBuffer(str.length * Uint8Array.BYTES_PER_ELEMENT); // BYTES_... = 1
    var bufView = new Uint8Array(buf);
    for (var i=0, len=str.length; i<len; i++){
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
  
  BufferLoader.prototype.loadBuffer = function(url, index){
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    loader = this;
    request.onload = function(){
      // Asynchronously decode the audio file data in request.response
      
      webAudioDecode.call(this, request.response, index);
    };
  
    request.onerror = xhrError;
  
    request.send();
  };

  BufferLoader.prototype.loadBuffer = function(url, index){
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    loader = this;
    request.onload = function(){
      // Asynchronously decode the audio file data in request.response
      webAudioDecode(
        is_iOS? str2ab(ab2str(request.response)): request.response,
        index
      );
    };
  
    request.onerror = xhrError;
  
    request.send();
  };
  
  function webAudioDecode(arrayBuffer, index){
    /*
    Web IDL:
    void decodeAudioData(ArrayBuffer audioData,
      DecodeSuccessCallback successCallback,
      optional DecodeErrorCallback errorCallback);
    */
    
    loader.context.decodeAudioData(
      arrayBuffer,
      function successCallback(buffer){
        if(! buffer){
          alert('error decoding file data: '+url);
          return;
        }
        loader.bufferList[index] = buffer;
        if(++loader.loadCount == loader.urlList.length){
          loader.onload(loader.bufferList);
        }
      },
      function errorCallback(error){
        console.error('decodeAudioData error', error);
      }
    );    
  }
  
  function xhrError(){
    alert('BufferLoader: XHR error');
  }


  BufferLoader.prototype.load = function(){
    loader = this;
    for(var i=0; i < this.urlList.length; ++i){
      this.loadBuffer(this.urlList[i], i);
    }
  };
}());
