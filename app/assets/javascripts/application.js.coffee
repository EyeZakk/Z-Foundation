#= require jquery
#= require jquery_ujs
#= require jquery.ui.core
#= require jquery.ui.widget
#= require jquery.ui.mouse
#= require jquery.ui.resizable
#= require jquery.ui.position
#= require jquery.ui.draggable
#= require jquery.ui.dialog
#= require jquery.effects.highlight
#= require_self
#= require ./lib/lib_manifest
#= require_tree ./common
#= require ./dashboard
#= require_tree ./admin

$.ajaxSetup({
  beforeSend: (xhr) ->
    xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
})

window.hide_alerts = ->
  $('.alert').fadeOut(800)

$(document).on('pjax:end', window.hide_alerts)

jQuery.curCSS = jQuery.css