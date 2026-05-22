// ==UserScript==
// @name        New script pornbox.com
// @namespace https://greasyfork.org/users/984905
// @match       https://pornbox.com/application/*
// @version     1.1.9
// @author      Bjorn
// @license     MIT
// @grant        GM_xmlhttpRequest
// @grant        nsafeWindow
// @require http://media.lan/scripts/ScriptReq/Additional.js?268735
// @description 9/15/2025, 11:01:57 AM
// ==/UserScript==

(function () {
  function convertTimeCodeToSeconds (timeString) {
    var timeArray = timeString.split (':');
    var hours = parseInt (timeArray[0]) * 60 * 60;
    var minutes = parseInt (timeArray[1]) * 60;
    var seconds = parseInt (timeArray[2]);
    var str = 'h:' + hours + '\nm:' + minutes + '\ns:' + seconds;
    var totalTime = hours + minutes + seconds;
    return totalTime;
  }

  waitForElement ('.scene-data__props', el => {
    var linkGrabberBtn = document.createElement ('button');
    linkGrabberBtn.onclick = getVideoInfo;
    linkGrabberBtn.classList.add ('action-btn');
    var BtnSpan = document.createElement ('span');
    BtnSpan.className = 'text';
    BtnSpan.innerText = 'Save Video Info';
    linkGrabberBtn.appendChild (BtnSpan);
    el.appendChild (linkGrabberBtn);
  });

  function getVideoInfo () {
    let actorList = [];
    let genreList = [];
    let markers = [];

    var VideoElement = document.querySelector ('video > source');
    videoFile = VideoElement.src;
    vv = videoFile.split ('?');
    vvv = vv[0].split ('/');
    ln = vvv.length;
    videoName = vvv[ln - 1].split ('_', 2);
    fileName = videoName.join ('_');
    var StudioEl = document.querySelector ('.video-page__studio-row> div> a');
    studioName = StudioEl.innerText;
    var genreEl = document.querySelectorAll ('.js-scene-niches > a.tag-link');
    genreEl.forEach (tagEl => {
      genreList.push (tagEl.innerText);
    });

    var titleEl = document.querySelector ('.scene-title');
    title = titleEl.innerText;

    var fm = document.querySelectorAll (
      '.scene-data__models-female > span > a.model-link'
    );
    fm.forEach (fmEl => {
      actorList.push (fmEl.innerText);
    });

    var mm = document.querySelectorAll (
      '.scene-data__models-male > span > a.model-link'
    );
    mm.forEach (mmEl => {
      actorList.push (mmEl.innerText);
    });

    tagCode = document.querySelectorAll ('.timeline-preview__item> span');
    tagCode.forEach ((ActionEl, index) => {
      markers.push ({
        Marker: 'Marker ' + index,
        timeCode: convertTimeCodeToSeconds (ActionEl.innerText),
      });
    });

    var durationEl = document.querySelector ('.scene-data__duration');
    Videolength = convertTimeCodeToSeconds (durationEl.innerText);

    people = {
      VideoLen: Videolength,
      video_file: fileName,
      VideoName: title,
      Studio: studioName,
      // Markers: markers,
      Genre: genreList,
      Actors: actorList,
    };
    console.log (people);

    data = {
      action: 'savePornboxJson',
      class: 'WebHelper',
      text: JSON.stringify (people),
    };
    saveToLocalServer ('process.php', data, 'Saved Markers');
  }

  // Select the target node to observe (e.g., the body of the document)
  const targetNode = document.getElementById ('pane-video');

  // Define the callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        if (mutation.target.classList.contains ('video-page__offers--active')) {
          mutation.target.style.height = 'auto';
        }
      }
    }
  };

  // Create an instance of MutationObserver
  const observer = new MutationObserver (callback);

  // Define the configuration object for the observer
  const config = {
    childList: true, // Observe addition/removal of child nodes
    attributes: true, // Observe attribute changes
    subtree: true, // Observe the entire subtree of the target node
  };

  // Start observing the target node
  observer.observe (targetNode, config);
}) ();
