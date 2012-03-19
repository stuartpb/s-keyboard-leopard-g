// ==UserScript==
// @name s/keyboard/leopard/g
// @version 1.0
// @description Replaces the word "keyboard" with "leopard".
// @match *://*/*
// ==/UserScript==

function replaceTextContent(node) {
  var length, childNodes
  if (node.nodeType == Node.TEXT_NODE) {
    node.textContent = node.textContent.replace("keyboard","leopard")
    node.textContent = node.textContent.replace("Keyboard","Leopard")
    node.textContent = node.textContent.replace("KEYBOARD","LEOPARD")
    node.textContent = node.textContent.replace(/keyboard/i,"leopard")
  } else {
    childNodes = node.childNodes
    length = childNodes.length
    for(var i=0; i<length; ++i){
      replaceTextContent(childNodes[i])
    }
  }
}

replaceTextContent(document.body)
//replaceTextContent(document.head.title)
