// ==UserScript==
// @name s/keyboard/leopard/g
// @version 1.1
// @description Replaces the word "keyboard" with "leopard".
// @match *://*/*
// ==/UserScript==

function leopardize(str) {
 return str.replace("keyboard","leopard")
    .replace("Keyboard","Leopard")
    .replace("KEYBOARD","LEOPARD")
    .replace(/k[Ee][Yy][Bb][Oo][Aa][Rr][Dd]/,"leopard")
    .replace(/K[Ee][Yy][Bb][Oo][Aa][Rr][Dd]/,"Leopard")
}

function replaceTextContent(node) {
  var length, childNodes
  if (node.nodeType == Node.TEXT_NODE) {
    node.textContent = leopardize(node.textContent)
  } else {
    childNodes = node.childNodes
    length = childNodes.length
    for(var i=0; i<length; ++i){
      replaceTextContent(childNodes[i])
    }
  }
}

replaceTextContent(document.body)
document.head.title = leopardize(document.head.title)
