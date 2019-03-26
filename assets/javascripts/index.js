import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

import 'jquery-ui'
import 'jquery-tageditor'
import 'popper.js'
import 'bootstrap'

import img from './assets/images';

const application = Application.start()
const context = require.context("./controllers", true, /.js$/)
application.load(definitionsFromContext(context))

$(function() {
  $('[data-toggle="tooltip"]').tooltip()
})

// admin artist torrent mapping jquery-tageditor

$(function() {
  $('#torrent-mapping').tagEditor({
      autocomplete: { delay: 0, position: { collision: 'flip' }, source: ['The Allman Brothers Band', 'The Beatles', 'Captain Beefheart', 'David Bowie', 'Miles Davis', 'Brian Eno', 'Genesis', 'Gong', 'Grateful Dead', 'The Jimi Hendrix Experience', 'Elton John', 'King Crimson', 'Little Feat', 'Mahavishnu Orchestra', 'Max Creek', 'Pat Metheny', 'The Meters', 'Bill Monroe', 'Premiata Forneria Marconi', 'Prince', 'The Rolling Stones', 'Santana', 'Talking Heads', 'The Velvet Underground', 'Frank Zappa'] },
      forceLowercase: false,
      placeholder: 'Artist mapping...'
  });
})

// http://code.accursoft.com/caret - 1.3.3

!function(e) {
    e.fn.caret = function(e) {
        var t = this[0],
            n = "true" === t.contentEditable;
        if (0 == arguments.length) {
            if (window.getSelection) {
                if (n) {
                    t.focus();
                    var o = window.getSelection().getRangeAt(0),
                        r = o.cloneRange();
                    return r.selectNodeContents(t), r.setEnd(o.endContainer, o.endOffset), r.toString().length
                }
                return t.selectionStart
            }
            if (document.selection) {
                if (t.focus(), n) {
                    var o = document.selection.createRange(),
                        r = document.body.createTextRange();
                    return r.moveToElementText(t), r.setEndPoint("EndToEnd", o), r.text.length
                }
                var e = 0,
                    c = t.createTextRange(),
                    r = document.selection.createRange().duplicate(),
                    a = r.getBookmark();
                for (c.moveToBookmark(a); 0 !== c.moveStart("character", -1);)
                    e++;
                return e
            }
            return t.selectionStart ? t.selectionStart : 0
        }
        if (-1 == e && (e = this[n ? "text" : "val"]().length), window.getSelection)
            n ? (t.focus(), window.getSelection().collapse(t.firstChild, e)) : t.setSelectionRange(e, e);
        else if (document.body.createTextRange)
            if (n) {
                var c = document.body.createTextRange();
                c.moveToElementText(t), c.moveStart("character", e), c.collapse(!0), c.select()
            } else {
                var c = t.createTextRange();
                c.move("character", e), c.select()
            }
        return n || t.focus(), e
    }
}(jQuery);


// signin floating label

$(function(){
  var onClass = "on";
  var showClass = "show";
  $("input").bind("checkval",function(){
    var label = $(this).prev("label");
    if(this.value !== ""){
      label.addClass(showClass);
    } else {
      label.removeClass(showClass);
    }
  }).on("keyup",function(){
    $(this).trigger("checkval");
  }).on("focus",function(){
    $(this).prev("label").addClass(onClass);
  }).on("blur",function(){
      $(this).prev("label").removeClass(onClass);
  }).trigger("checkval");
});

// reports countries autocomplete js

$(function() {
    var availableTags = [
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan"
    ];
    $( "#countries" ).autocomplete({
      source: availableTags
    });
});

// reports states autocomplete js

$(function() {
    var availableTags = [
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana"
    ];
    $( "#states" ).autocomplete({
      source: availableTags
    });
});

// alerts

// $(function() {
//   $('#reset-password').click(function() {
//     $('#alert-reset-password').fadeIn("fast").delay(2000).fadeOut("fast");
//   });
// });

$(function() {
  $('#sign-out').click(function() {
    $('#alert-sign-out').fadeIn("fast").delay(2000).fadeOut("fast");
    setTimeout(function () {
      window.location = '../signin/index.html';
    }, 3000);

  });
});

$('#send-invite').click(function () {
  $('#alert-user-invite-success').fadeIn("fast").delay(2000).fadeOut("fast");
});


// artist details hero follow and unfollow artists button

$('#follow').click(function () {
  $('#following-artist').show();
  $('#follow-artist').hide();
  //$('#alert-following-artist').fadeIn("fast").delay(2000).fadeOut("fast");
  $('#alert-following-artist').fadeIn("fast");
});

$('#unfollow').click(function () {
  $('#following-artist').hide();
  $('#follow-artist').show();
});

// sign-up show alert and go to browse artists url

// $(function() {
//   $('#sign-up').click(function() {
//     $('#alert-sign-up').fadeIn("fast").delay(2000).fadeOut("fast");
//     setTimeout(function () {
//       window.location = '../browse-artists/no-artists.html';
//     }, 3000);
//   });
// });

// apply active class to button group

$(".btn-group > .btn").click(function(){
    $(".btn-group > .btn").removeClass("active");
    $(this).addClass("active");
});

// pricing show/hide artist/corporate plans

$('#artist-pricing').click(function () {
  $('#artist-plans').fadeIn();
  $('#corporate-plans').fadeOut();
});

$('#corporate-pricing').click(function () {
  $('#artist-plans').fadeOut();
  $('#corporate-plans').fadeIn();
});

// populate dropdown button text based on slected value

// $(function() {
//   $(".dropdown-menu a").click(function(){
//     var selText = $(this).text();
//     $(this).parents('.dropdown').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
//   });
// });