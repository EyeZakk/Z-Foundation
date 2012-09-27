class CalendarUtil
  @q_tip_default_opts: (title, content, on_show, on_hide) ->
    {
        content: {
          title: {
            text: title
            button: true
          },
          text: content
        },
        show: {
          event: false
          ready: true
        },
        hide: false,
        position: {
          at: 'bottom center'
          my: 'top center'
        },
        style: {
          classes: 'ui-tooltip-shadow ui-tooltip-light'
        },
        events: {
          show: on_show
          hide: on_hide
        }
      }

  @popover_default_opts: (title, content) ->
    {
      title: title
      content: content
      trigger: 'manual'
      placement: 'bottom'
    }

window.CalendarUtil = CalendarUtil