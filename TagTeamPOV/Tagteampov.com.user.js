// ==UserScript==
// @name        tagteampov.com
// @match      https://www.tagteampov.com/members/*
// @grant        GM_xmlhttpRequest
// @grant        nsafeWindow
// @license     MIT
// @namespace https://greasyfork.org/users/984905
// @require http://media.lan/scripts/ScriptReq/VideoMetadata.js?740567
// @require http://media.lan/scripts/ScriptReq/Additional.js?826456
// @version     1.0.10
// @author      -
// @description 5/14/2026, 8:26:35 AM
// ==/UserScript==



class tagteampov extends VideoMetaData
{

  setup()
  {
    this.videoPlaylist = document.querySelector('.title-zone')
  }

  getVideoFile()
  {
    var downloadList = document.querySelector("#information-video > div > div > div > div.buttons > div.download.dropdown > div > a:nth-child(1)")
    var fileNamePcs = downloadList.href.split('/')
    var idx = fileNamePcs.findIndex(str => str.includes('.mp4'))
    var pcs = fileNamePcs[idx].split('.mp4', 1)
    this.video_file = pcs[0]
  }

  getVideoGenreList()
  {
    var cat = document.querySelectorAll("div.categories-wrapper > a ")
    cat.forEach(g =>
    {
      this.genreList.push(g.title)
    })
  }

  getVideoTitle()
  {
    var el = document.querySelector("#title-video > div > div.col-12.col-xl-8.p-0 > div > div > h1")
    this.title = el.innerHTML
  }

  getVideoActors()
  {
    var Models = document.querySelectorAll(".model-name")
    Models.forEach(m =>
    {
      this.actorList.push(m.title)
    })
  }

}





; (function ()
{

var ButtonContainer = document.querySelector("#title-video > div > div.col-12.col-xl-4.p-0 > div")


  // var MarkerGrabberBtn = document.createElement('button')
  // var spanm = document.createElement('span')
  // spanm.innerText = 'Get Video Markers'
  // spanm.className = 'media-option'

  // MarkerGrabberBtn.appendChild(spanm)
  // MarkerGrabberBtn.onclick = getVideoInfo

btns = ButtonContainer.children
idx = btns.length
btn = btns[idx-1].cloneNode(true)
btn.removeAttribute("href")
btn.innerHTML="Get Data"
btn.onclick = getVideoInfo
ButtonContainer.appendChild(btn)


  // var strongText = document.createElement('strong')
  // strongText.innerText = 'Get Video Markers'

  // var span = document.createElement('span')
  // span.className = 'glyphicons glyphicons-play-button'

  // var iconLink = document.createElement('a')
  // iconLink.href = '#'
  // iconLink.onclick = getVideoInfo

  // iconLink.appendChild(span)
  // iconLink.appendChild(strongText)
  // var newIcon = document.createElement('li')
  // newIcon.className = 'li-watch'
  // newIcon.appendChild(iconLink)

  // icons = document.querySelector('.nav-icos')
  // icons.appendChild(newIcon)

  function getVideoInfo()
  {
    MetaData = new tagteampov;
    MetaData.getVideoDetails()

    data = {
      action: 'saveTagTeam',
      class: 'WebHelper',
      text: MetaData.getJsonData()
    }
    saveToLocalServer('process.php', data, 'Saved Markers')
  }
})()


