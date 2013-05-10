// http://chromium.googlecode.com/svn/trunk/samples/audio/doc/loading-sounds.html
function BufferLoader(context,urlList,callback){
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = [];
  this.loadCount = 0;
}

(function(){
  var loader;
  
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
  
    request.onerror = function(){
      alert('BufferLoader: XHR error');
    };
  
    request.send();
  };

  BufferLoader.prototype.loadBufferBase64 = function(url, index){
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'text';
    var loader = this;

    request.onload = function(){
      // Asynchronously decode the audio file data in request.response
      sessionStorage.setItem(index, request.responseText);
      
      webAudioDecode.call(this, Base64Binary.decodeArrayBuffer(sessionStorage.getItem(index)), index);
    };
  
    request.onerror = function(){
      alert('BufferLoader: XHR error');
    };
  
    request.send();
  };

  // Use FileReader (Unavailable in Safari)
  BufferLoader.prototype.loadBufferFR = function(url, index){
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'blob';
    loader = this;
    var filereader = new FileReader();

    request.onload = function(){
      // Asynchronously decode the audio file data in request.response
      filereader.readAsDataURL(request.response);
      filereader.onload = function(evt){
        var data = evt.target.result;
        data = data.substring(data.indexOf('base64,')+7);
        data = Base64Binary.decodeArrayBuffer(data);
      
        webAudioDecode.call(this, data, index);
      };
    };
  
    request.onerror = function(){
      alert('BufferLoader: XHR error');
    };
  
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
    


  BufferLoader.prototype.load = function(){
    loader = this;
    for(var i=0; i < this.urlList.length; ++i){
      this.loadBuffer(this.urlList[i], i);
    }
  };

  BufferLoader.prototype.loadDataURL = function(){
    loader = this;
    for(var i=0; i < this.urlList.length; ++i){
      this.loadBufferBase64(this.urlList[i], i);
    }
  };  
}());
