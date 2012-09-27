$(document).on('ready pjax:success', ->
  #swap light for dark icons on hover...
  sidebar = $('.admin-content-box .sidebar')

  sidebar.find('li.active a i').addClass('icon-white')

  sidebar.find('li a').hover( ->
    if !$(this).parents('li').eq(0).hasClass('active')
      $(this).find('i').addClass('icon-white')
  , ->
    if !$(this).parents('li').eq(0).hasClass('active')
      $(this).find('i').removeClass('icon-white')
  )

  sidebar.find('li a').bind('click touchstart', (event) ->
    if !$(this).parents('li').eq(0).hasClass('active')
      sidebar.find('li.active a i').removeClass('icon-white')
      sidebar.find('li.active').removeClass('active')
      $(this).parents('li').eq(0).addClass('active')
  )
)

$(document).ready( ->
  if $('body').hasClass('layout-dashboard')
    $('.sidebar .nav-list li a').pjax('.admin-content-box .content',{
      fragment: '.admin-content-box .content'
    })
)