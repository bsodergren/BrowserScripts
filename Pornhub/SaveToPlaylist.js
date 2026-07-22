// ==UserScript==
// @name       Pornhub - Save file URL to local playlist
// @namespace https://greasyfork.org/users/984905
// @match        https://*.pornhub.com/*
// @match        https://*.pornhub.org/*
// @match        https://*.pornhubpremium.com/*
// @match        https://*.pornhubpremium.org/*
// @grant       GM_xmlhttpRequest
// @version     1.4.3
// @author      Bjorn
// @run-at       document-end
// @description 4/28/2026, 6:34:22 AM
// @require http://media.lan/scripts/ScriptReq/Additional.js?107180
// ==/UserScript==

; (function () {
  waitForElement('.playlist-menu-addTo', el => {
    plWindow = document.getElementById('addToPlaylist')

    console.log(plWindow)
  })

  let savedLinks = []
  document.addEventListener('contextmenu', function (e) {
    if (e.ctrlKey && e.shiftKey) {
      const link = e.target.closest('a')
      if (link && link.href) {
        e.preventDefault() // prevent default context menu

        saveLink(link.href)
      }
    }
  })
  // waitForElement ('.ratingInfo', el => {
  waitForElement('.tab-menu-wrapper-row', el => {
    createPlaylistButton(el)
  })

  function createoldPlaylistButton(element) {
    var DivEl = document.createElement('div')
    DivEl.classList.add('videoInfo')
    DivEl.style.borderLeftWidth = '1px'
    DivEl.style.borderLeftStyle = 'solid'
    DivEl.style.borderLeftColor = '#848484'
    DivEl.style.margin = '10px'
    DivEl.innerText = 'Save to Playlist'
    DivEl.onclick = saveLinktoPlaylist
    element.appendChild(DivEl)
  }

  function createPlaylistButton(element) {
    var menuWrapper = document.createElement('div')
    menuWrapper.classList.add('tab-menu-wrapper-cell')
    menuWrapper.classList.add('videoCtaPill')

    var menuItem = document.createElement('div')
    menuItem.classList.add('gtm-event-video-underplayer')
    menuItem.classList.add('flag-btn')
    menuItem.classList.add('tab-menu-item')
    menuItem.classList.add('tooltipTrig')

    var menuLabel = document.createElement('span')
    menuLabel.innerText = 'save to playlist'
    menuLabel.onclick = saveLinktoPlaylist
    menuItem.appendChild(menuLabel)
    menuWrapper.appendChild(menuItem)
    element.appendChild(menuWrapper)
  }

  function saveLinktoPlaylist() {
    saveLink(window.location.href)
  }
  function saveLink(url) {
    playlistFile = 'PhClicked.txxt'

    if (window.location.hostname == 'www.pornhubpremium.com') {
      playlistFile = 'PhPremium.txxt'
    }

    data = {
      file: playlistFile,
      action: 'addToPlaylist',
      text: url
    }
    saveToLocalServer('pledit.php', data, 'Saved to playlist')
  }
})()
