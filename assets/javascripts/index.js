import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"
import $ from 'jquery';
import 'popper.js'
import 'bootstrap'

const application = Application.start()
const context = require.context("./controllers", true, /.js$/)
application.load(definitionsFromContext(context))

$(function() {
  $('[data-toggle="tooltip"]').tooltip()
})

// show download origins country

$(function() {
   $("#map-countries").on("click",function(){
      $('#map-countries').hide();
      $('#map-states').show();
   })
})

