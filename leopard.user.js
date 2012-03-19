// ==UserScript==
// @name s/keyboard/leopard/g
// @version 2.0b
// @description Replaces the word "keyboard" with "leopard".
// @match *://*/*
// @updateURL http://userscripts.org/scripts/source/128626.meta.js
// @downloadURL https://userscripts.org/scripts/source/128626.user.js
// ==/UserScript==

function leopardize(str) {
  return str.replace(/keyboard/g,"leopard")
    .replace(/Keyboard/g,"Leopard")
    .replace(/KEYBOARD/g,"LEOPARD")
    .replace(/k[Ee][Yy][Bb][Oo][Aa][Rr][Dd]/g,"leopard")
    .replace(/K[Ee][Yy][Bb][Oo][Aa][Rr][Dd]/g,"Leopard")
}

function replaceTextContent(node) {
  var length, childNodes
  //If this is a text node, leopardize it
  if (node.nodeType == Node.TEXT_NODE) {
    node.textContent = leopardize(node.textContent)
  //If this is anything other than a text node, recurse any children
  } else {
    childNodes = node.childNodes
    length = childNodes.length
    for(var i=0; i<length; ++i){
      replaceTextContent(childNodes[i])
    }
  }
}

var scheduled_timeout, replacement_running

function replaceBodyText() {
  //set the flag so we won't spawn replacements ad infinitum
  replacement_running = true
  //Run the replacement
  replaceTextContent(document.body)
  //Unset the flag so future changes will trigger another replacement
  replacement_running = false
  //Clear the scheduled timeout, since it just ran
  scheduled_timeout = null;
}

function listener(event) {
  if(!replacement_running) {
    //Cancel any currently pending timeout
    if(scheduled_timeout) clearTimeout (scheduled_timeout)
    //Start a new one
    scheduled_timeout = setTimeout (replaceBodyText, 50)
  }
}

replaceBodyText()
document.body.addEventListener ("DOMSubtreeModified", listener, false)
document.title = leopardize(document.title)
