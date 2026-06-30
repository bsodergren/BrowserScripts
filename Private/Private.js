// ==UserScript==
// @name       private.com
// @match       https://members.private.com/en/scene/*
// @grant        GM_xmlhttpRequest
// @grant        nsafeWindow
// @version     1.12.2
// @license     MIT
// @namespace https://greasyfork.org/users/984905
// @require http://media.lan/scripts/ScriptReq/VideoMetadata.js?322234
// @require http://media.lan/scripts/ScriptReq/Additional.js?677998
// @description 9/15/2025, 10:25:49 AM
// ==/UserScript==

class PrivateVideos extends VideoMetaData {


  setup() {
    this.videoPlaylist = document.querySelector('.title-zone')
  }


  getVideoFile () {
    var downloadList = document.querySelectorAll('.full_download_link')
    var fileNamePcs = downloadList[0].href.split('/')
    var idx = fileNamePcs.findIndex(str => str.includes('.mp4'))
    var pcs = fileNamePcs[idx].split('.mp4', 1)
    var ppcs = pcs[0].split('_')
    ppcs.pop()
    this.video_file = ppcs.join('_')
  }

  getVideoGenreList () {

    var g =  this.videoPlaylist .querySelectorAll('.tag-tags > a')
    for (var i = 0; i < g.length; i++) {
      var genre = g[i].innerText
      this.genreList.push(genre)
    }
  }

  getVideoTitle () {
    this.title =  this.videoPlaylist .firstChild.innerText
  }

  getVideoActors () {
    var d =  this.videoPlaylist .querySelectorAll('.tag-models > a')
    for (var i = 0; i < d.length; i++) {
      var actor = d[i].innerText
      actor = actor.toLowerCase().replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase()
      })
      this.actorList.push(actor)
    }
  }

}

;(function () {
  // function ucwords (str) {
  //   return str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
  //     return letter.toUpperCase()
  //   })
  // }

  var strongText = document.createElement('strong')
  strongText.innerText = 'Get Video Markers'

  var span = document.createElement('span')
  span.className = 'glyphicons glyphicons-play-button'

  var iconLink = document.createElement('a')
  iconLink.href = '#'
  iconLink.onclick = getVideoInfo

  iconLink.appendChild(span)
  iconLink.appendChild(strongText)
  var newIcon = document.createElement('li')
  newIcon.className = 'li-watch'
  newIcon.appendChild(iconLink)

  icons = document.querySelector('.nav-icos')
  icons.appendChild(newIcon)

  function getVideoInfo () {
    MetaData = new PrivateVideos;
    MetaData.setup();
    MetaData.getVideoDetails()

    // console.log(MetaData.getJsonData())

    data = {
      action: 'savePrivateJson',
      class: 'WebHelper',
      text: MetaData.getJsonData()
    }
    saveToLocalServer('process.php', data, 'Saved Markers')
  }
})()
