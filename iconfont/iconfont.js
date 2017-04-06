;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-sousuo" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M991.418182 972.8L791.272727 772.654545c79.127273-83.781818 130.327273-195.490909 130.327273-316.50909 0-251.345455-200.145455-451.490909-446.836364-451.49091C232.727273 0 32.581818 204.8 32.581818 451.490909s200.145455 451.490909 446.836364 451.490909c97.745455 0 190.836364-32.581818 265.309091-88.436363l200.145454 204.8 46.545455-46.545455zM102.4 451.490909c0-209.454545 167.563636-381.672727 377.018182-381.672727s377.018182 172.218182 377.018182 381.672727-172.218182 386.327273-381.672728 386.327273c-204.8 0-372.363636-172.218182-372.363636-386.327273z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-gouwuche" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M269.963636 893.672727m-60.509091 0a60.509091 60.509091 0 1 0 121.018182 0 60.509091 60.509091 0 1 0-121.018182 0Z"  ></path>' +
    '' +
    '<path d="M805.236364 893.672727m-60.509091 0a60.509091 60.509091 0 1 0 121.018182 0 60.509091 60.509091 0 1 0-121.018182 0Z"  ></path>' +
    '' +
    '<path d="M968.145455 237.381818c-4.654545-9.309091-13.963636-13.963636-27.927273-13.963636H204.8l-13.963636-144.290909C186.181818 60.509091 172.218182 46.545455 158.254545 46.545455H46.545455v69.818181h79.127272l69.818182 637.672728c0 18.618182 18.618182 32.581818 32.581818 32.581818h642.327273c18.618182 0 32.581818-13.963636 32.581818-27.927273L977.454545 265.309091c0-9.309091 0-18.618182-9.30909-27.927273zM837.818182 716.8H256l-46.545455-423.563636h693.527273L837.818182 716.8z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)