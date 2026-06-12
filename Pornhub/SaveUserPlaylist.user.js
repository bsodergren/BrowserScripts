// ==UserScript==
// @name pornhub.com playlist link grabber for /view_video
// @description This adds a button to pornhub video player page if the video is part of a playlist to grab links to all videos in said playlist
// @version 1.0.7
// @license MIT
// @grant        GM_xmlhttpRequest
// @grant        nsafeWindow
// @author      Bjorn
// @match https://*.pornhub.com/view_video.php*
// @match https://*.pornhubpremium.com/view_video.php*
// @namespace https://greasyfork.org/users/984905/
// @require http://media.lan/scripts/ScriptReq/PhFuncs.js?851934
// @require http://media.lan/scripts/ScriptReq/Additional.js?858169

// ==/UserScript==

;(function () {

    var playlistBar = document.querySelector('.playlist-bar')
    if (playlistBar) {
        var btnContainer = playlistBar.querySelector('#prevButton').parentNode

        var linkGrabberBtn = document.createElement('div')
        linkGrabberBtn.onclick = grabVideoList
        linkGrabberBtn.classList.add('orangeButton')
        linkGrabberBtn.style.cssFloat = 'left'
        linkGrabberBtn.style.marginRight = '20px'
        var span = document.createElement('span')
        span.innerText = 'Get all video links'
        span.className = 'text'
        linkGrabberBtn.appendChild(span)
        btnContainer.prepend(linkGrabberBtn)
    }

    function grabVideoList () {
        var links = playlistBar.querySelectorAll('.video-box-playlist a')
        showLinks(links)
    }

    // function showLinks (linkList) {
    //     var outerModalDiv = document.createElement('div')
    //     var innerModalDiv = document.createElement('div')
    //     outerModalDiv.id = 'playlist213VidsLinkContainingModalPanel' //use a long id to avoid name conflicts
    //     outerModalDiv.style.display = 'block'
    //     outerModalDiv.style.position = 'fixed'
    //     outerModalDiv.style.zIndex = '100'
    //     outerModalDiv.style.paddingTop = '100px'
    //     outerModalDiv.style.left = '0'
    //     outerModalDiv.style.top = '0'
    //     outerModalDiv.style.width = '100%'
    //     outerModalDiv.style.height = '100%'
    //     outerModalDiv.style.backgroundColor = 'rgb(0,0,0)'
    //     outerModalDiv.style.backgroundColor = 'rgb(0,0,0,0.4)'

    //     //add close btn
    //     var closeButtonContainer = document.createElement('div')
    //     closeButtonContainer.className = 'userButtons'
    //     var closeButton = CreateButton('X', null, RemoveOuterModalPanel)
    //     closeButton.style.cssFloat = 'right'
    //     closeButtonContainer.appendChild(closeButton)
    //     innerModalDiv.appendChild(closeButtonContainer)

    //     innerModalDiv.style.backgroundColor = '#1b1b1b'
    //     innerModalDiv.style.margin = 'auto'
    //     innerModalDiv.style.padding = '20px'
    //     innerModalDiv.style.border = '1px solid #888'
    //     innerModalDiv.style.width = '80%'
    //     innerModalDiv.style.color = '#ababab'
    //     innerModalDiv.style.overflowY = 'auto'
    //     innerModalDiv.style.height = '80%'

    //     var instructions1 = document.createElement('p')
    //     var instructions2 = document.createElement('p')
    //     var instructions3 = document.createElement('p')

    //     instructions1.innerHTML =
    //         'Save the links to a local textfile (e.g. &quotC:\\Temp\\dl\\linklist.txt)&quot and run youtube-dl whith the -a argument and the path to the linklist.'
    //     instructions2.innerHTML =
    //         'youtube-dl -a &quotC:\\Temp\\dl\\linklist.txt&quot'
    //     instructions3.innerHTML = 'Or just use jDownloader with the linklist'

    //     innerModalDiv.appendChild(instructions1)
    //     innerModalDiv.appendChild(instructions2)
    //     innerModalDiv.appendChild(instructions3)

    //     //     var linkListDiv;

    //     //     linkListDiv = document.createElement('div');

    //     for (var i = 0; i < linkList.length; i++) {
    //         var a = document.createElement('a')
    //         a.innerHTML = linkList[i].href
    //         a.href = linkList[i].href
    //         innerModalDiv.appendChild(a)
    //         innerModalDiv.appendChild(document.createElement('br'))
    //     }
    //     outerModalDiv.appendChild(innerModalDiv)
    //     document.body.appendChild(outerModalDiv)
    // }

    function CreateButton (text, id, onClickEvent) {
        var innerbutton = document.createElement('button')
        innerbutton.innerText = text
        innerbutton.className = 'buttonBase'
        innerbutton.style.backgroundColor = '#f90'
        innerbutton.style.color = '#000'
        innerbutton.style.fontWeight = '700'
        innerbutton.display = 'inline-block'

        var button = document.createElement('div')
        if (id) button.id = id

        button.style.padding = '5px 10px'
        button.style.lineHeight = '1.2em'
        button.style.borderRadius = '4px'
        button.onclick = onClickEvent
        button.appendChild(innerbutton)
        return button
    }

    function RemoveOuterModalPanel () {
        var toRemove = document.getElementById(
            'playlist213VidsLinkContainingModalPanel'
        )
        toRemove.parentNode.removeChild(toRemove)
    }
})()
