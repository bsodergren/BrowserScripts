// ==UserScript==
// @name      Pornhub -  Save Playlist to File
// @description This adds a button to pornhub playlists to grab links to all videos of this playlist
// @version  1.5.6
// @license MIT
// @match    https://*.pornhub.com/playlist/*
// @match    https://*.pornhubpremium.com/playlist/*
// // @match    https://www.pornhub.com/users/*/videos/favorites*
// @run-at       document-end
// @grant        GM_xmlhttpRequest
// @grant        nsafeWindow
// @namespace https://greasyfork.org/users/984905
// @require http://media.lan/scripts/ScriptReq/Additional.js?663049
// @require http://media.lan/scripts/ScriptReq/PhFuncs.js?732070
// ==/UserScript==

(function () {

 const playlistId = window.location.pathname.split('/').pop();
  var VideoListCmd = grabVideoList
  btnContainerId = '#userPlaylistActions #js-playlistTabsNav'

  if(playlistId == 'favorites'){
    btnContainerId = '.profileSubNav'
    VideoListCmd = grabFavList

  }



  var btnContainer = document.querySelector(btnContainerId)
  var linkGrabberBtn = document.createElement('button')
  linkGrabberBtn.onclick = VideoListCmd
  linkGrabberBtn.classList.add('playlistButtons') //playlistButtons tooltipTrig js-pop
  span = document.createElement('span')
  span.className = 'text'
  span.innerText = 'Save Playlist'
  linkGrabberBtn.appendChild(span)
  btnContainer.appendChild(linkGrabberBtn)



  function grabFavList() {
    var videoPlaylist = document.getElementById('moreData')
    var linkList = videoPlaylist.querySelectorAll('li > div > div > a')
    showLinks(linkList)
  }

  function grabVideoList() {
    var videoPlaylist = document.getElementById('videoPlaylist')
    var linkList = videoPlaylist.querySelectorAll('div > a')
    showLinks(linkList)
  }

  // function _showLinks(linkList) {
  //   var outerModalDiv = document.createElement('div')
  //   var innerModalDiv = document.createElement('div')
  //   outerModalDiv.id = 'playlistVidsLinkContainingModalPanel' //use a long id to avoid name conflicts
  //   outerModalDiv.style.display = 'block'
  //   outerModalDiv.style.position = 'fixed'
  //   outerModalDiv.style.zIndex = '100'
  //   outerModalDiv.style.paddingTop = '100px'
  //   outerModalDiv.style.left = '0'
  //   outerModalDiv.style.top = '0'
  //   outerModalDiv.style.width = '100%'
  //   outerModalDiv.style.height = '100%'
  //   outerModalDiv.style.backgroundColor = 'rgb(0,0,0)'
  //   outerModalDiv.style.backgroundColor = 'rgb(0,0,0,0.4)'

  //   //add close btn
  //   var buttonContainer = document.createElement('div')
  //   buttonContainer.className = 'userButtons'
  //   var closeBtn = document.createElement('div')
  //   var innerCloseBtn = document.createElement('button')
  //   closeBtn.style.cssFloat = 'right'
  //   closeBtn.classList.add('mainButton')
  //   closeBtn.classList.add('addFriendButton')
  //   closeBtn.classList.add('add')

  //   innerCloseBtn.innerText = 'X'
  //   innerCloseBtn.className = 'buttonBase'

  //   closeBtn.onclick = RemoveOuterModalPanel
  //   closeBtn.appendChild(innerCloseBtn)
  //   buttonContainer.appendChild(closeBtn)
  //   innerModalDiv.appendChild(buttonContainer)

  //   innerModalDiv.style.backgroundColor = '#1b1b1b'
  //   innerModalDiv.style.margin = 'auto'
  //   innerModalDiv.style.padding = '20px'
  //   innerModalDiv.style.border = '1px solid #888'
  //   innerModalDiv.style.width = '80%'
  //   innerModalDiv.style.color = '#ababab'
  //   innerModalDiv.style.overflowY = 'auto'
  //   innerModalDiv.style.height = '80%'

  //   var CopyTexBtn = document.createElement('button')
  //   CopyTexBtn.onclick = SaveToPlaylist
  //   CopyTexBtn.classList.add('playlistButtons') //playlistButtons tooltipTrig js-pop
  //   var CopyTexrspan = document.createElement('span')
  //   CopyTexrspan.innerText = 'Get all video links'
  //   CopyTexrspan.className = 'text'
  //   CopyTexBtn.appendChild(CopyTexrspan)

  //   var instructions1 = document.createElement('p')
  //   var instructions2 = document.createElement('p')
  //   var instructions3 = document.createElement('p')
  //   instructions1.innerHTML =
  //     'Save the links to a local textfile (e.g. &quotC:\\Temp\\dl\\linklist.txt)&quot and run youtube-dl whith the -a argument and the path to the linklist.'
  //   instructions2.innerHTML =
  //     'youtube-dl -a &quotC:\\Temp\\dl\\linklist.txt&quot'
  //   instructions3.innerHTML = 'Or just use jDownloader with the linklist'
  //   innerModalDiv.appendChild(instructions1)
  //   innerModalDiv.appendChild(instructions2)
  //   innerModalDiv.appendChild(instructions3)
  //   innerModalDiv.appendChild(CopyTexBtn)

  //   var linkListDiv = document.createElement('div')
  //   var linkListLi = document.createElement('ol')
  //   linkListDiv.id = 'linkListDivID'
  //   for (var i = 0; i < linkList.length; i++) {
  //     // innerHTML = linkList[i].href;
  //     // console.log(linkList[i].href,linkList[i].href.match(/view_video/) )
  //     if (linkList[i].href.match(/view_video/) !== null) {
  //       var OrderedList = document.createElement('li')
  //       var a = document.createElement('a')
  //       a.innerHTML = linkList[i].href
  //       a.href = linkList[i].href
  //       OrderedList.appendChild(a)
  //       linkListLi.appendChild(OrderedList)
  //     }
  //   }
  //   linkListDiv.appendChild(linkListLi)
  //   innerModalDiv.appendChild(linkListDiv)

  //   outerModalDiv.appendChild(innerModalDiv)
  //   document.body.appendChild(outerModalDiv)
  // }

  // function _RemoveOuterModalPanel() {
  //   var toRemove = document.getElementById(
  //     'playlistVidsLinkContainingModalPanel'
  //   )
  //   toRemove.parentNode.removeChild(toRemove)
  // }

}());
