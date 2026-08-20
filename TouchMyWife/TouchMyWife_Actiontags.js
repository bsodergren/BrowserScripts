// ==UserScript==
// @name        TouchMyWife Actiontag script
// @match       https://site-ma.touchmywife.com/scene/*
// @grant        GM_xmlhttpRequest
// @grant        nsafeWindow
// @version     1.0.6
// @license     MIT
// @namespace https://greasyfork.org/users/984905
// @require http://media.lan/scripts/ScriptReq/Additional.js?820666
// @description 4/28/2026, 6:34:22 AM
// @run-at       document_idle
// ==/UserScript==

function waitForElement2(selector, callback) {
  const observer = new MutationObserver(() => {
    const element = document.querySelector(selector);

    if (element) {
      observer.disconnect(); // Stop observing
      callback(element);
    }
  });

  // Observe changes in the entire document
  observer.observe(document, {
    childList: true,
    subtree: true,
  });
}

(function () {
  waitForElement2('[name="dti.url"]', (el) => {
    waitForElement2('a[href="' + el["content"] + '"]', (el2) => {
      var btn = document.createElement("span");
      btn.name = "MarkerBtn";
      var btnText = createButton();
      btnText.removeAttribute("style");

      classes = el2.classList;
      classes.forEach((className) => {
        btn.classList.add(className);
      });

      btn.appendChild(btnText);
      p = el2.parentElement;
      p.appendChild(btn);
    });
  });

  function createButton() {
    // var MarkerGrabberBtn = document.createElement ('button');
    var spanm = document.createElement("span");
    spanm.innerText = "Get Video Markers";
    spanm.className = "Button";
    spanm.style.height = "40px";
    spanm.style.fontSize = "16px";
    spanm.onclick = getVideoInfo;
    return spanm;
  }

  // Ensure script runs only after DOM is ready
  function getVideoInfo() {
    // Example: Change background color
    let people = [];
    let markers = [];
    let genreList = [];
    let actorList = [];
    let title = "";

    VideoFileEl = document.querySelector('[name="dti.url"]');
    filename = VideoFileEl["content"];
    console.log(filename);
    url = filename.split(".mp4", 1);
    file = url[0].split("/").reverse()[0];

    var titleElement = document.querySelector(".vjs-poster");
    titleV = titleElement["title"];
    title = titleV.split(" –")[0];
    // console.log(title);

    var artistList = document.querySelectorAll('span > a[href^="/model/"]');

    artistList.forEach((child) => {
      txt = child["title"];
      actorList.push(txt);
      // console.log(txt);
    });

    // console.log(actorList);

    var VideoCategories = document.querySelectorAll('a[href^="/scenes?tags"]');

    VideoCategories.forEach((child) => {
      genre = child.innerHTML;
      genreList.push(genre);
    });

    people = {
      VideoName: title,
      Genre: genreList,
      Actors: actorList,
      video_file: file.replace("_480P", ""),
    };

    data = {
      action: "saveJson",
      class: "WebHelper",
      site: "TouchMyWife",

      text: JSON.stringify(people),
    };
    console.log(data);
    saveToLocalServer("process.php", data, "Saved Markers");
  }
  // unsafeWindow.attachButton = attachButton;

  unsafeWindow.getVideoInfo = getVideoInfo;
})();
