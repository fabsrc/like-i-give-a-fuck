'use strict';

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
changeBlingLinks( document.querySelectorAll('[data-comment-prelude-ref="action_link_bling"]') );
changeLikeSentences( document.getElementsByClassName('UFILikeSentenceText') );


function changeLikeLinks(links) {
  forEach(links, (link) => {
    link.textContent = 'Give a fuck';
  });
}

function changeBlingLinks(links) {
  forEach(links, (link) => {
    if (link.children.length > 0) {
      link.children[0].textContent = link.children[0].textContent.match(/\d*/)[0] + ' Fucks given';
    }
  });
}

function changeLikeSentences(likeSentences) {
  forEach(likeSentences, (likeSentence) => {
    var likeSentenceSpan = likeSentence.children[0];

    if( likeSentenceSpan.children.length > 1 ) {
      if( likeSentenceSpan.children.length == 2 && hasClass(likeSentenceSpan.children[0], 'profileLink') ) {
        likeSentenceSpan.children[likeSentenceSpan.children.length-1].textContent = ' gives a fuck.';
      } else {
        likeSentenceSpan.children[likeSentenceSpan.children.length-1].textContent = ' give a fuck.';
      }
    } else if( likeSentenceSpan.children.length === 1 ){
      likeSentenceSpan.children[0].textContent = 'You give a fuck.';
    }
  });
}


var observer = new MutationObserver((mutations) => {
  forEach(mutations, (mutation) => {
    if(mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      forEach(mutation.addedNodes, (addedNode) => {
        if (addedNode.hasAttribute && addedNode.hasAttribute('data-reactroot')) {
          if (hasClass(addedNode, 'UFIList')) {
            changeLikeSentences( addedNode.getElementsByClassName('UFILikeSentenceText') );
          } else {
            changeLikeLinks(addedNode.getElementsByClassName('UFILikeLink'));
            changeBlingLinks(addedNode.querySelectorAll('[data-comment-prelude-ref="action_link_bling"]'));
          }
        }
      });
    }
  });
});


var target = document.querySelector('body');
var config = { childList: true, attributes: true, characterData: true, subtree: true };
observer.observe(target, config);
