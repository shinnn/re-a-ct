module.exports = (grunt) ->
  devDeps = grunt.file.readJSON('package.json').devDependencies
  
  for taskName, version of devDeps
    if 'grunt-' is taskName.substring 0, 6
      grunt.loadNpmTasks taskName
  
  cfg = grunt.config
  
  # 出力するトラック解析結果を格納するオブジェクト
  analysis =
    cwd: 'audio/raw/tracks'
    tracks: {}
  
  _aubiotrackCallback = (err, stdout, stderr, cb) ->
    beatArray = stdout.split '\n'
    beatArray.pop()
    
    for beat, i in beatArray
      beatArray[i] = parseFloat beat, 10
    
    # aubio が最初の方のビートを検知しない不具合への対処
    preBeat = beatArray[1] - beatArray[0]
    beatPoint = beatArray[1]
    
    while beatPoint >= 0
      beatArray.unshift beatPoint
      beatPoint -= preBeat
    
    analysis.tracks[cfg 'trackPath'] = { beat_times: beatArray }
    cb()

  grunt.task.registerTask '_writeAnalysis', ->
    json = JSON.stringify analysis, null, 2
    grunt.file.write 'audio/data-json/_analysis.json', json
    console.log "All Tracks Analysed."
    
  grunt.task.registerTask 'analysis', 'Analysing audio', ->
    opt = { cwd: analysis.cwd }
    tracks = grunt.file.expand opt, '**/*.wav'
    
    for track in tracks
      grunt.task.run 'aubiotrack:' + track
    grunt.task.run '_writeAnalysis'
  
  grunt.task.registerTask 'aubiotrack', (path) ->
    cfg 'trackPath', path.replace '.wav', ''
    console.log "Analysing" + cfg('trackPath') + ".wav..."
    grunt.task.run 'shell:aubiotrack'
  
  grunt.task.registerTask 'playlist', ->
    #tmp
  
  grunt.task.registerTask 'encode', ->
    grunt.task.run 'copy'
    opt = { cwd: 'audio/raw/' }
    tracks = grunt.file.expand opt, '**/*.wav'
    for track in tracks
      grunt.task.run 'ffmpeg:' + track

  grunt.task.registerTask 'ffmpeg', (path) ->
    cfg 'ffmpegPath', path.replace '.wav', ''
    console.log "Encoding" + cfg('ffmpegPath') + ".wav..."
    grunt.task.run 'shell:ffmpeg'
  
  copyOpt = (destType) ->
      expand: true
      cwd: 'audio/raw/'
      src: ['**']
      dest: "audio/compressed/#{ destType }/"
      filter: 'isDirectory'
  
  grunt.initConfig
    # オーディオ解析のためのファイルパスの設定
    rawAudioCwd: 'audio/raw/'
    trackPath: ''
    ffmpegPath: ''
    
    # オーディオ関連の処理
    shell:
      aubiotrack:
        command: "aubiotrack -i <%= rawAudioCwd + 'tracks/' + trackPath %>.wav -O complexdomain"
        options:
          callback: _aubiotrackCallback
      ffmpeg:
        # -y: Overwrite output files.
        command: "ffmpeg -y -i <%= rawAudioCwd + ffmpegPath %>.wav
        -vn -codec:a libvorbis -aq 1M audio/compressed/webm/<%= ffmpegPath %>.webm"
        options:
          callback: (err, stdout, stderr, cb) ->
            if stderr
              console.log stderr
            if stdout
              console.log stdout
            cb()
      
      coffeelint:
        command:
          'coffeelint Gruntfile.coffee'
        options:
          stdout: true
    
    copy:
      compressed:
        files: [
          copyOpt 'webm'
          copyOpt 'ogg'
          copyOpt 'm4a'
          copyOpt 'mp3'
        ]
        
    compass:
      dist:
        options:
          sassDir: 'scss'
          cssDir: 'css'
          environment: 'production'
          outputStyle: 'compressed'
      dev:
        options:
          sassDir: 'scss'
          cssDir: 'scss/build-dev/'
          environment: 'development'
          outputStyle: 'expand'
      
    concat:
      main:
        src: ['jsdev/main/*.js']
        dest: 'js/re-a-ct.js'
        
      contrib:
        src: ['jsdev/contrib/*.js']
        dest: 'js/contrib.js'
        
    coffeelint:
      grunt:
        src: ['Gruntfile.coffee']

    watch:
      options:
        livereload: true
      compass:
        files: ['scss/*.scss']
        tasks: ['compass']
      js_main:
        files: ['jsdev/main/*.js']
        tasks: ['concat:main']
      js_contrib:
        files: ['jsdev/contrib/*.js']
        tasks: ['concat:contrib']
      coffeelint:
        files: ['Gruntfile.coffee']
        tasks: ['shell:coffeelint']
      html:
        files: ['*.html']
    
  grunt.task.registerTask 'default', [
    'analysis', 'compass', 'concat', 'shell:coffeelint', 'watch'
  ]
