// ==UserScript==
// @name        Bsodergren Library
// @version     1.10.4
// @grant       GM_xmlhttpRequest
// @grant       nsafeWindow
// @license     MIT
// @namespace   https://greasyfork.org/users/984905
// ==/UserScript==

function showToast(message, duration = 3000, cmdElement = null)
{
  // Create toast container if it doesn't exist
  let container = document.getElementById('tm-toast-container')
  if (!container)
  {
    container = document.createElement('div')
    container.id = 'tm-toast-container'
    container.style.position = 'fixed'
    container.style.top = '20px'
    container.style.left = '20px'
    container.style.zIndex = '999999'
    container.style.display = 'flex'
    container.style.flexDirection = 'column'
    container.style.gap = '10px'
    document.body.appendChild(container)
  }

  // Create toast element
  const toast = document.createElement('div')
  toast.textContent = message
  toast.style.background = 'rgb(0, 0, 0)'
  toast.style.color = '#fff'
  toast.style.padding = '10px 16px'
  toast.style.borderRadius = '6px'
  toast.style.borderColor = 'white'
  toast.style.borderWidth = '3px'
  toast.style.borderStyle = 'double'
  toast.style.fontSize = '18px'
  toast.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)'
  toast.style.opacity = '0.5'
  toast.style.transition = 'opacity 0.3s ease'

  container.appendChild(toast)

  // Fade in
  requestAnimationFrame(() =>
  {
    toast.style.opacity = '1'
  })

  // Remove after duration
  setTimeout(() =>
  {
    toast.style.opacity = '0'
    toast.addEventListener('transitionend', () =>
    {
      toast.remove()
      if (cmdElement !== null)
      {
        cmdElement()
      }
    })
  }, duration)
}
// end function showToast

function waitForElement(selector, callback)
{
  const observer = new MutationObserver(() =>
  {
    const element = document.querySelector(selector)
    if (element)
    {
      observer.disconnect() // Stop observing
      callback(element)
    }
  })

  // Observe changes in the entire document
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}

// end function WaitForElement


function jsonToUrlEncoded(jsonObj)
{
  if (typeof jsonObj !== 'object' || jsonObj === null)
  {
    throw new Error('Input must be a non-null object')
  }
  return Object.keys(jsonObj)
    .map(
      key => encodeURIComponent(key) + '=' + encodeURIComponent(jsonObj[key])
    )
    .join('&')
}

// end function jsonToUrlEncoded


function saveToLocalServer(postUrl, data, toast, command = null)
{
  postUrl = 'http://media.lan/plex/' + postUrl
  const encoded = jsonToUrlEncoded(data)

  GM_xmlhttpRequest({
    method: 'POST',
    url: postUrl,
    data: encoded,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'document',
    onload: function (response)
    {
      var responseXML = response.responseXML
      if (!responseXML)
      {
        try
        {
          responseXML = new DOMParser().parseFromString(
            response.responseText,
            'text/html'
          )
        } catch (err) { }
      }
      showToast(response.responseText, 3000, command)
      sentback(response.responseText)
    }
  })
}
// end saveToLocalServer


function sentback(str)
{
  newstr = str.replace('Saved as ', '')
  if (newstr.startsWith('x'))
  {
    favBtn = document.getElementById('favorites_del')
    if (favBtn !== null)
    {
      favBtn.click()
    }
    console.log(str)
  }
}
// end function sendback

