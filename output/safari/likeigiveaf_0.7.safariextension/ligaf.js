// ==UserScript==
// @name Like I Give A Fuck
// @include http://*.facebook.*
// @include https://*.facebook.*
// @require jquery.min.js
// ==/UserScript==

console.log("LIKE I GIVE A F***!");
changeLinks( $('#substream_0 .UFILikeLink') );
changeLinks( $('#substream_1 .UFILikeLink') );
changeSentence( $( '#substream_0 .UFILikeSentenceText > span > *') );
changeSentence( $( '#substream_1 .UFILikeSentenceText > span > *') );

var target = document.querySelector('body');
var config = { childList: true, attributes: true, characterData: true, subtree: true };
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {

    if( mutation.attributeName === 'data-ft' ) {
      changeLinks( $(mutation.target) ); 
    }


    $(mutation.addedNodes).each(function() {
      var UFILikeLinks  = $( '.UFILikeLink', this );

      if( UFILikeLinks.length ) {
      	changeLinks( $( '.UFILikeLink', this ) );
      }

      changeSentence( $( '.UFILikeSentenceText > span > *', this));

    });

  });    
});

observer.observe(target, config);

function changeLinks(likeLinks) {
    likeLinks.each(function() {
    if( $( this ).attr('data-ft') == '{"tn":">"}' ) {
      $( this ).text('I give a Fuck');
    }
    else if( $( this ).attr('data-ft') == '{"tn":"?"}' ) {
      $( this ).text('I don’t give a Fuck');
    }
  });
}

function changeSentence(likeSentence) {
  if( likeSentence.length > 1 ) {
    if( likeSentence.length == 2 && likeSentence.hasClass('profileLink') ) {
      likeSentence.last().text(' gives a fuck.');
    } else {
      likeSentence.last().text(' give a fuck.');
    }
  } else {
    likeSentence.last().text('You give a fuck.');
  }
}