// ==UserScript==
// @name Like I Give A Fuck
// @include http://*.facebook.*
// @include https://*.facebook.*
// ==/UserScript==

function hasClass (el, className) {
  if (el.classList)
    return el.classList.contains(className);
  else
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

function forEach(array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(i, array[i]);
  }
}

changeLikeLinks( document.getElementsByClassName('UFILikeLink') );
changeLikeSentences( document.getElementsByClassName('UFILikeSentenceText') );
changeBlingBoxes( document.querySelectorAll('.UFIBlingBoxText[data-reactid*=".$like"]') );


function changeLikeLinks(links) {
  forEach(links, function(link) {
    link.children[1].textContent = 'I give a Fuck';
  });
}

function changeLikeSentences(likeSentences) {
  forEach(likeSentences, function(likeSentence) {
    var likeSentenceSpan = likeSentence.children[0];

    if( likeSentenceSpan.children.length > 1 ) {
      if( likeSentenceSpan.children.length == 2 && hasClass(likeSentenceSpan, 'profileLink') ) {
        likeSentenceSpan.children[likeSentenceSpan.children.length-1].textContent = ' gives a fuck.';
      } else {
        likeSentenceSpan.children[likeSentenceSpan.children.length-1].textContent = ' give a fuck.';
      }
    } else if( likeSentenceSpan.children.length === 1 ){
      likeSentenceSpan.children[0].textContent = 'You give a fuck.';
    }
  });
}

function changeBlingBoxes(blingBoxes) {
  forEach(blingBoxes, function(blingBox) {
    blingBox.innerHTML = blingBox.innerHTML.match(/\d*/)[0] + ' Fucks Given';
  });
}

var observer = new MutationObserver(function(mutations) {
  forEach(mutations, function(mutation) {
    if(mutation.attributeName === 'data-ft') {
      changeLikeLinks([mutation.target]);
    } else if(mutation.addedNodes.length > 0) {
      forEach(mutation.addedNodes, function(addedNode) {
        if(addedNode && hasClass(addedNode, 'UFILikeLink')) {
          changeLikeLinks([addedNode]);
        } else if(addedNode && (hasClass(addedNode, 'UFILikeSentence') || hasClass(addedNode, 'UFIList'))) {
          changeLikeSentences( addedNode.getElementsByClassName('UFILikeSentenceText') );
        } else if (addedNode && hasClass(addedNode, 'UFIBlingBox')) {
          changeBlingBoxes(addedNode.querySelectorAll('.UFIBlingBoxText[data-reactid*=".$like"]'));
        }
      });
    }
  });
});

var target = document.querySelector('body');
var config = { childList: true, attributes: true, characterData: true, subtree: true };
observer.observe(target, config);
