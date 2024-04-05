(function ($) {


    const SELECTOR_FORM_SIDEBAR = '.form-sidebar'
    const SELECTOR_FORM_SIDEBAR_CONTENT = '.form-sidebar-content'
    const SELECTOR_DATA_TOGGLE = '[data-widget="form-sidebar"]'
    const SELECTOR_HEADER = '.main-header'
    const SELECTOR_FOOTER = '.main-footer'

    const CLASS_NAME_FORM_SIDEBAR_ANIMATE = 'form-sidebar-animate'
    const CLASS_NAME_FORM_SIDEBAR_OPEN = 'form-sidebar-open'
    const CLASS_NAME_FORM_SIDEBAR_SLIDE = 'form-sidebar-slide-open'
    const CLASS_NAME_LAYOUT_FIXED = 'layout-fixed'
    const CLASS_NAME_NAVBAR_FIXED = 'layout-navbar-fixed'
    const CLASS_NAME_NAVBAR_SM_FIXED = 'layout-sm-navbar-fixed'
    const CLASS_NAME_NAVBAR_MD_FIXED = 'layout-md-navbar-fixed'
    const CLASS_NAME_NAVBAR_LG_FIXED = 'layout-lg-navbar-fixed'
    const CLASS_NAME_NAVBAR_XL_FIXED = 'layout-xl-navbar-fixed'
    const CLASS_NAME_FOOTER_FIXED = 'layout-footer-fixed'
    const CLASS_NAME_FOOTER_SM_FIXED = 'layout-sm-footer-fixed'
    const CLASS_NAME_FOOTER_MD_FIXED = 'layout-md-footer-fixed'
    const CLASS_NAME_FOOTER_LG_FIXED = 'layout-lg-footer-fixed'
    const CLASS_NAME_FOOTER_XL_FIXED = 'layout-xl-footer-fixed'

    var defaults = {
        formsidebarSlide: true,
        scrollbarTheme: 'os-theme-light',
        scrollbarAutoHide: 'l'
    };



    function _fixScrollHeight(context) {

        var settings = context.data("settings");
        const $body = $('body')
        const $formSidebar = context;

        if (!$body.hasClass(CLASS_NAME_LAYOUT_FIXED)) {
            return
        }

        const heights = {
            scroll: $(document).height(),
            window: $(window).height(),
            header: $(SELECTOR_HEADER).outerHeight(),
            footer: $(SELECTOR_FOOTER).outerHeight()
        }
        const positions = {
            bottom: Math.abs((heights.window + $(window).scrollTop()) - heights.scroll),
            top: $(window).scrollTop()
        }

        const navbarFixed = _isNavbarFixed() && $(SELECTOR_HEADER).css('position') === 'fixed'

        const footerFixed = _isFooterFixed() && $(SELECTOR_FOOTER).css('position') === 'fixed'

        const $formsidebarContent = $.fn.add.call(context, context.find(SELECTOR_FORM_SIDEBAR_CONTENT));
        /*const $formsidebarContent = $(`${settings.target}, ${settings.target} ${SELECTOR_FORM_SIDEBAR_CONTENT}`)*/

        if (positions.top === 0 && positions.bottom === 0) {
            $formSidebar.css({
                bottom: heights.footer,
                top: heights.header
            })
            $formsidebarContent.css('height', heights.window - (heights.header + heights.footer))
        } else if (positions.bottom <= heights.footer) {
            if (footerFixed === false) {
                const top = heights.header - positions.top
                $formSidebar.css('bottom', heights.footer - positions.bottom).css('top', top >= 0 ? top : 0)
                $formsidebarContent.css('height', heights.window - (heights.footer - positions.bottom))
            } else {
                $formSidebar.css('bottom', heights.footer)
            }
        } else if (positions.top <= heights.header) {
            if (navbarFixed === false) {
                $formSidebar.css('top', heights.header - positions.top)
                $formsidebarContent.css('height', heights.window - (heights.header - positions.top))
            } else {
                $formSidebar.css('top', heights.header)
            }
        } else if (navbarFixed === false) {
            $formSidebar.css('top', 0)
            $formsidebarContent.css('height', heights.window)
        } else {
            $formSidebar.css('top', heights.header)
        }

        if (footerFixed && navbarFixed) {
            $formsidebarContent.css('height', '100%')
            $formSidebar.css('height', '')
        } else if (footerFixed || navbarFixed) {
            $formsidebarContent.css('height', '100%')
            $formsidebarContent.css('height', '')
        }
    }

    function _fixHeight(context) {

        var settings = context.data("settings");

        const $body = $('body')
        const $formSidebar = context;

        //if (!$body.hasClass(CLASS_NAME_LAYOUT_FIXED)) {
        //    $formSidebar.attr('style', '')
        //    return
        //}

        

        const heights = {
            window: $(window).height(),
            header: $(SELECTOR_HEADER).outerHeight(),
            footer: $(SELECTOR_FOOTER).outerHeight()
        }

        let sidebarHeight = heights.window - heights.header

        //if (_isFooterFixed() && $(SELECTOR_FOOTER).css('position') === 'fixed') {
        //    sidebarHeight = heights.window - heights.header - heights.footer
        //}

        //console.log($formSidebar);
        $formSidebar.css('height', sidebarHeight)

        if (typeof $.fn.overlayScrollbars !== 'undefined') {
            $formSidebar.overlayScrollbars({
                className: settings.scrollbarTheme,
                sizeAutoCapable: true,
                scrollbars: {
                    autoHide: settings.scrollbarAutoHide,
                    clickScrolling: true
                }
            })
        }
    }

    function _isNavbarFixed() {
        const $body = $('body')
        return (
            $body.hasClass(CLASS_NAME_NAVBAR_FIXED) ||
                $body.hasClass(CLASS_NAME_NAVBAR_SM_FIXED) ||
                $body.hasClass(CLASS_NAME_NAVBAR_MD_FIXED) ||
                $body.hasClass(CLASS_NAME_NAVBAR_LG_FIXED) ||
                $body.hasClass(CLASS_NAME_NAVBAR_XL_FIXED)
        )
    }

    function _isFooterFixed() {
        const $body = $('body')
        return (
            $body.hasClass(CLASS_NAME_FOOTER_FIXED) ||
                $body.hasClass(CLASS_NAME_FOOTER_SM_FIXED) ||
                $body.hasClass(CLASS_NAME_FOOTER_MD_FIXED) ||
                $body.hasClass(CLASS_NAME_FOOTER_LG_FIXED) ||
                $body.hasClass(CLASS_NAME_FOOTER_XL_FIXED)
        )
    }


    var methods = {
        init: function (args) {

            var settings = $.extend(true, {}, defaults, args);
            this.data("settings", settings);

          ////////////////////////////////////////////////////

          const $body = $('body')
          const shouldNotHideAll = $body.hasClass(CLASS_NAME_FORM_SIDEBAR_OPEN) ||
              $body.hasClass(CLASS_NAME_FORM_SIDEBAR_SLIDE);

          if (shouldNotHideAll) {
              $(SELECTOR_FORM_SIDEBAR).not(this).hide();
              $(this).css('display', 'block');
          } else {
              $(SELECTOR_FORM_SIDEBAR).hide();
          }


            //console.log("    _fixHeight(that);");
            var that = this;
            _fixHeight(that);
            _fixScrollHeight(that);

          $(window).resize(() => {
              _fixHeight(that);
              _fixScrollHeight(that);
          })

          $(window).scroll(() => {
              const $body = $('body');
              const shouldFixHeight = $body.hasClass(CLASS_NAME_FORM_SIDEBAR_OPEN) ||
                  $body.hasClass(CLASS_NAME_FORM_SIDEBAR_SLIDE);

              if (shouldFixHeight) {
                  _fixScrollHeight(that);
              }
          })


           //////////////////////////////////////////////////////////
            return this;
        },
        options: function (args) {
            var settings = this.data("settings");
            return settings;
        },
        show: function (args) {


            var that = this;
            var settings = this.data("settings");
            const $body = $('body');
            const $html = $('html');

       
            if (settings.formsidebarSlide) {
                $html.addClass(CLASS_NAME_FORM_SIDEBAR_ANIMATE)
                this.show().delay(10).queue(function () {
                    $body.addClass(CLASS_NAME_FORM_SIDEBAR_SLIDE).delay(300).queue(function () {

                        $html.removeClass(CLASS_NAME_FORM_SIDEBAR_ANIMATE);
                        that.dequeue();
                    })
                    that.dequeue();

                    if (args && args.callback) {
                        args.callback();
                    }
                });

            } else {
                $body.addClass(CLASS_NAME_FORM_SIDEBAR_OPEN);
            }


            //console.log("    _fixHeight(that);");
            _fixHeight(this);
            _fixScrollHeight(this);


            return that;
        },
        hide: function (args) {

            var that = this;
            var settings = this.data("settings");
            var $body = $('body');
            var $html = $('html');

            if (settings.formsidebarSlide) {

                $html.addClass(CLASS_NAME_FORM_SIDEBAR_ANIMATE);
                if ($body.hasClass(CLASS_NAME_FORM_SIDEBAR_SLIDE)) {
                    console.log("hide 2");

                    $body.removeClass(CLASS_NAME_FORM_SIDEBAR_SLIDE).delay(300).queue(function () {

                        console.log("hide 3");
                        that.hide();
                        $html.removeClass(CLASS_NAME_FORM_SIDEBAR_ANIMATE);
                        that.dequeue();
                     
                        
                    });


                    setTimeout(function () {
                        if (args && args.callback) {
                            args.callback();
                        }

                    }, 300);

                    

                    
                }
                else {

                    console.log("hide 3b");
                    if (args && args.callback) {
                        args.callback();
                    }
                }
            } else {
                $body.removeClass(CLASS_NAME_FORM_SIDEBAR_OPEN);
                if (args && args.callback) {
                    args.callback();
                }
            }

           
            return that;
        } 
    };


    $.fn.FormSidebar = function (methodOrOptions) {

        if (methods[methodOrOptions]) {

            var newArgs = Array.prototype.slice.call(arguments, 1);
            return methods[methodOrOptions].apply(this, newArgs);

        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {

            // Default to "init"
            var newArgs = Array.prototype.slice.call(arguments)
            return methods.init.apply(this, newArgs);

        } else {
            $.error('Method ' + methodOrOptions + ' does not exist on jQuery.FormSidebar');
        }
    };

}(jQuery));