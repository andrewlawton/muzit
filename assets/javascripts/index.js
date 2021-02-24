import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

import 'jquery-ui'
import 'jquery-tageditor'
import 'popper.js'
import 'bootstrap'


const application = Application.start()
const context = require.context("./controllers", true, /.js$/)
application.load(definitionsFromContext(context))

$(function() {
  $('[data-toggle="tooltip"]').tooltip()
})

$(function () {
  $('[data-toggle="popover"]').popover({
    html: true
  })
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

$(function() {
  $('#reset-password').click(function() {
    $('#alert-reset-password').fadeIn("fast");
  });

  $('#sign-out').click(function() {
    setTimeout(function () {
      window.location = '../sign-in/index.html';
    }, 3000);
  });

  $('#send-invite').click(function () {
    $('#alert-user-invite-success').fadeIn("fast");
  });

  $('#add-org').click(function () {
    $('#alert-organization-added').fadeIn("fast");
  });

  $('#copy-title').click(function () {
    $('#alert-title-copied').fadeIn("fast");
    $('#copied-title').show();
  });

});

// artist details hero follow and unfollow artists button

$(function() {
  $('#follow').click(function () {
    $('#following-artist').show();
    $('#follow-artist').hide();
    $('#alert-following-artist').fadeIn("fast");
  });

  $('#unfollow').click(function () {
    $('#following-artist').hide();
    $('#follow-artist').show();
  });
});

// edit ip address list hide action steps buttons

$(function() {
  var url = window.location.href;
  if(url.indexOf('?edit-list') != -1) {
    //$('.action.steps').css("display", "none");
    //$('.action.steps.edit').css("display", "block");
    $("h1").html("Edit List");
  }
});

// save list and show alert

$('#save-list').click(function () {
  $(window).scrollTop(0); // scroll to alert at top of page
  $('#alert-list-saved').css("display", "block");
  setTimeout(function () {
    window.location = '../../organization/ip-address-reports/edit-list.html';
  }, 2000);
});


$(function() {
  $('#sign-up').click(function() {
    $('#alert-sign-up').fadeIn("fast").delay(2000).fadeOut("fast");
    setTimeout(function () {
      window.location = '../index.html/?default';
    }, 3000);
  });
});

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

// unmapped torrents bulk edit checkbox

$("#map-torrents").click(function () {
  $('input:checkbox').not(this).prop('checked', this.checked);
});

$(function() {
    $('#categories').change(function(){
        $('.category').fadeOut('fast');
        $('#' + $(this).val()).fadeIn('fast');
    });
});

// admin lists add list

$("#add-list-item").click(function () {
  $('#list-none').hide();
  $('#list').show();
});

// display cancel subscription alert based on url

$(function() {
  var url = window.location.href;
  if(url.indexOf('?cancel') != -1) {
    $('#alert-cancel-subscription').css("display", "block");
  }
});

// display dashboard follow titles section default view based on url

$(function() {
  var url = window.location.href;
  if(url.indexOf('/index.html?default') != -1) {
      $('#follow-titles').css("display", "block");
      $('#following').css("display", "none");
      $('#downloads').css("display", "none");
      $('#alert-welcome').css("display", "block");
    } else {
      $('#alert-welcome').css("display", "none");
      $('#follow-titles').css("display", "none");
      $('#following').css("display", "block");
      $('#downloads').css("display", "block");
    }
});

// Add IP Address List Step 2 Add Title Search results click handler

$('#add-titles div > li > a').click(function () {
  $('#list-title').show();
  $('#no-titles').hide();
});

// disable sign up button until agree to terms checkbox is clicked

$(function() {
  $('#agreeToTerms').click(function() {
    if ($(this).is(':checked')) {
      $('#sign-up').removeAttr('disabled');
    } else {
      $('#sign-up').attr('disabled', 'disabled');
    }
  });
});

// pricing plan additonal options click events

$(function() {
  $("#option-audience-lists").click(function(){
    $('#audience-lists').prop('checked',true);
    $("label span.plan-option").addClass('checked');
  });

  $("#option-global-piracy").click(function(){
    $('#global-piracy').prop('checked',true);
    $("label span.plan-option").addClass('checked');
  });

  $("#option-music-genre").click(function(){
    $('#music-genre').prop('checked',true);
    $("label span.plan-option").addClass('checked');
  });
});

// display pricing options on sign-up based on url

$(function() {
  var url = window.location.href;
  if(url.indexOf('global-piracy-report=on') != -1) {
    $('#global-piracy-reports').css("display", "block");
  }
  if(url.indexOf('music-genre-data-report=on') != -1) {
    $('#music-genre-report').css("display", "block");
  }
});

// populate dropdown button text based on selected value

// $(function() {
//   $(".dropdown-menu a").click(function(){
//     var selText = $(this).text();
//     $(this).parents('.dropdown').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
//   });
// });

// show viewport height and width

// function showViewPortSize(display) {
//   if(display) {
//     var height = window.innerHeight;
//     var width = window.innerWidth;
//     jQuery('body').prepend('<div id="viewportsize" style="z-index:9999;position:fixed;bottom:0px;left:0px;color:#fff;background:#000;padding:10px">Height: '+height+'<br>Width: '+width+'</div>');
//     jQuery(window).resize(function() {
//             height = window.innerHeight;
//             width = window.innerWidth;
//             jQuery('#viewportsize').html('Height: '+height+'<br>Width: '+width);
//     });
//   }
// }

// $(document).ready(function(){
//    showViewPortSize(true);
// });