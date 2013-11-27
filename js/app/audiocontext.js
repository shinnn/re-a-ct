(function(){
  this.AudioContext = this.AudioContext || this.webkitAudioContext;
  if(AudioContext === undefined){
    alert('Web Audio API is not supported in this browser.\n' +
    'Please launch this site again with Google Chrome.');
  }
  var tmpctx = new AudioContext();
	
	// Support alternate names
	// start (noteOn), stop (noteOff), createGain (createGainNode), etc.
  var isStillOld = function(normative, old){
    return normative === undefined && old !== undefined; 
  };

  var bufProto = tmpctx.createBufferSource().constructor.prototype;  
  
  if(isStillOld(bufProto.start, bufProto.noteOn) || isStillOld(bufProto.stop, bufProto.noteOff)){
    var nativeCreateBufferSource = AudioContext.prototype.createBufferSource;

    AudioContext.prototype.createBufferSource = function createBufferSource(){
      var returnNode = nativeCreateBufferSource.call(this);
      returnNode.start = returnNode.start || returnNode.noteOn;
      returnNode.stop = returnNode.stop || returnNode.noteOff;
        
      return returnNode;
    };
  }
  
  // Firefox 24 doesn't support OscilatorNode
  if(typeof tmpctx.createOscillator === 'function'){
    var oscProto = tmpctx.createOscillator().constructor.prototype;
  
    if(isStillOld(oscProto.start, oscProto.noteOn) || isStillOld(oscProto.stop, oscProto.noteOff)){
      var nativeCreateOscillator = AudioContext.prototype.createOscillator;

      AudioContext.prototype.createOscillator = function createOscillator(){
        var returnNode = nativeCreateOscillator.call(this);
        returnNode.start = returnNode.start || returnNode.noteOn;
        returnNode.stop = returnNode.stop || returnNode.noteOff;
        
        return returnNode;
      };
    }
  }
  
  if(AudioContext.prototype.createGain === undefined &&
  AudioContext.prototype.createGainNode !== undefined){
    AudioContext.prototype.createGain = AudioContext.prototype.createGainNode;
  }

  if(AudioContext.prototype.createDelay === undefined &&
  AudioContext.prototype.createDelayNode !== undefined){
    AudioContext.prototype.createDelay = AudioContext.prototype.createGainNode;
  }
  
  if(AudioContext.prototype.createScriptProcessor === undefined &&
  AudioContext.prototype.createJavaScriptNode !== undefined){
    AudioContext.prototype.createScriptProcessor = AudioContext.prototype.createJavaScriptNode;
  }
	
  // Black magic for iOS 
  var is_iOS = (navigator.userAgent.indexOf('like Mac OS X') !== -1);
  if(is_iOS){
    var NativeAudioContext = AudioContext;
    this.AudioContext = function(){
      var audioContext = new NativeAudioContext();
			
      var body = document.body;
      var tmpsrc = audioContext.createBufferSource();
      var tmpProc = audioContext.createScriptProcessor(256, 1, 1);
	
      var initialEvent;
      if(body.ontouchstart !== undefined){
        initialEvent = 'touchstart';
      }else if(body.onmousedown !== undefined){
        initialEvent = 'mousedown';
      }else{
        initialEvent = 'click';
      }
	
      body.addEventListener(initialEvent, instantProcess, false);
	
      function instantProcess(){  
        tmpsrc.start(0);
        tmpsrc.connect(tmpProc);
        tmpProc.connect(audioContext.destination);				
      }
  
      // This function will be called once and for all.
      tmpProc.onaudioprocess = function(){
        tmpsrc.disconnect();
        tmpProc.disconnect();
        body.removeEventListener(initialEvent, instantProcess, false);
        tmpProc.onaudioprocess = null;
      };
			
      return audioContext;
    };
  }
	
}());
