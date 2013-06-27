module.exports = (grunt) ->
  devDeps = grunt.file.readJSON('package.json').devDependencies
  
  for taskName, version of devDeps
    if 'grunt-' is taskName.substring 0, 6
      grunt.loadNpmTasks(taskName)
  
  # 出力する音響解析結果を格納するオブジェクト
  analysis =
    tracks: {}
  
  writeBeatTimes = (err, stdout, stderr, cb) ->  
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
    
    analysis.tracks[grunt.config 'trackPath'] =
      beat_times: beatArray

    console.log grunt.config 'trackPath'
    cb()
  
  grunt.task.registerTask 'aubiotrack', (track) ->
    grunt.config 'trackPath', track.replace '.wav', ''
    grunt.task.run 'shell:aubiotrack'
    
  grunt.task.registerTask 'writeAnalysis', ->
    analysis.cwd = grunt.config 'trackPathCwd'
    json = JSON.stringify analysis, null, 2;
    grunt.file.write 'audio/data-json/_analysis.json', json
    console.log 'Tracks Analysed.'
    
  grunt.task.registerTask 'analysis', ->
    opt = { cwd: grunt.config 'trackPathCwd' }
    tracks = grunt.file.expand opt, '**/*.wav'

    for track, i in tracks
      grunt.task.run 'aubiotrack:' + track
    grunt.task.run 'writeAnalysis'
  
  grunt.task.registerTask 'playlist', ->
    #tmp
  
  grunt.task.registerTask 'encode', ->
    
  
  grunt.initConfig  
    # トラック解析のためのファイルパスの設定
    trackPath: ''
    trackPathCwd: 'audio/raw/tracks/'
  
    compass:
      dist:
        options:
          sassDir: 'scss'
          cssDir: 'css'
          environment: 'production'
          outputStyle: 'compressed'
        
    concat:
      main:
        src: ['jsdev/main/*.js']
        dest: 'js/re-a-ct.js'
          
      contrib:
        src: ['jsdev/contrib/*.js']
        dest: 'js/contrib.js'
    
    shell:
      aubiotrack:
        command: 'aubiotrack -i <%= trackPathCwd + trackPath %>.wav -O complexdomain'
        options:
          callback: writeBeatTimes
      webm:
        command: 'ffmpeg -i piano.wav -vn -codec:a libvorbis -aq 1M output.webm'
    
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
      html:
        files: ['*.html']
    
  grunt.task.registerTask 'default', ['compass', 'concat', 'shell', 'watch']
