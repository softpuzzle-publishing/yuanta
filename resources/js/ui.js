var Init = {
	defaults : function(){
		var bodyHeight = 0;
		var bodyWidth = 0;
		var breakpoint;
		this.resize();
		window.addEventListener("resize", this.resize);
	},
	resize : function(){
		Init.getBrowserSize();
		Init.drawBreakPoint();

		Init.breakpoint = window.matchMedia('(min-width:992px)').matches;
		if(!Init.breakpoint){
			$('html').removeClass('is-desktop');
			$('html').addClass('is-mobile');
		}else{
			$('html').removeClass('is-mobile');
			$('html').addClass('is-desktop');
		}
	},
	getBrowserSize : function(){
		this.bodyHeight = Math.max(
			document.body.scrollHeight,
			document.body.offsetHeight,
			document.documentElement.clientHeight,
			document.documentElement.scrollHeight,
			document.documentElement.offsetHeight
		);
		this.bodyWidth = Math.max(
			document.body.scrollWidth,
			document.body.offsetWidth,
			document.documentElement.clientWidth,
			document.documentElement.scrollWidth,
			document.documentElement.offsetWidth
		);
	},
	drawBreakPoint : function(){
		$('html').attr('data-width',this.bodyWidth);
		$('html').attr('data-height',this.bodyHeight);
	},
};

var Common = {
	init : function(){
		Common.afterLoad();
		Common.scrolling();
		Common.top();
		Common.sidebar();
		Common.tab();
		Common.event();
		window.addEventListener('mousewheel', Common.scrolling);
		window.addEventListener('touchmove', Common.scrolling);

		$(window).scroll(function(){
			Common.scrolling();
		});
	},
	afterLoad : function(){
		if($('body').hasClass('body-login')){
			$('html').addClass('html-login');
		}
		if($('body').hasClass('body-popup')){
			$('html').addClass('html-popup');
		}
	},
	resize : function(){
		Init.getBrowserSize();
		Init.drawBreakPoint();

		Init.breakpoint = window.matchMedia('(min-width:992px)').matches;
		if(!Init.breakpoint){
			$('html').removeClass('is-desktop');
			$('html').addClass('is-mobile');
		}else{
			$('html').removeClass('is-mobile');
			$('html').addClass('is-desktop');
		}
	},
	scrolling : function(e){
		var scrollTop = $(window).scrollTop();

		if(scrollTop > 0){
			$('html').addClass('is-scrolled');
		}else{
			$('html').removeClass('is-scrolled');
        }

        if($(window).scrollTop() + $(window).height() > $(document).height() - $('.main-footer').height()) {
            $('.btn-top').addClass('moveup');
        }else{
            $('.btn-top').removeClass('moveup');
        }
	},
	top : function(){
		$('.btn-top').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({scrollTop: 0}, 300);
        });
	},
	sidebar : function(){
		//mobile sidebar
		$('.sidebar .nav > .nav-item > .nav-link').on('click',function(e){
			if($('html').hasClass('is-mobile')){
				if($(this).parent().hasClass('menu-open')){
					e.preventDefault();
					return false;
				}
			}
		});
		$('.sidebar-close').on('click',function(e){
			e.preventDefault();
			$('[data-widget="pushmenu"]').click();
		});
	},
	tab : function(){
		if($('.tab-swiper').length > 0){
			const breakpoint = window.matchMedia( '(min-width:1279px)' );

			let tabSwiper;

			const breakpointChecker = function() {
				if ( breakpoint.matches === true ) {
					if ( tabSwiper !== undefined ) tabSwiper.destroy( true, true );
					return;
				} else if ( breakpoint.matches === false ) {
					return enableSwiper();
				}
			};
			const enableSwiper = function() {
				tabSwiper = new Swiper('.tab-swiper .swiper-container', {
					slidesPerView: 'auto',
					freeMode: true,
				});
			};
			breakpoint.addListener(breakpointChecker);
			breakpointChecker();
		}
	},
	event : function(){
		//datepicker
		$('[data-event="datepicker"]').datepicker({
			changeMonth: true,
            changeYear: true,
            dateFormat: 'yy-mm-dd'
		});

		//select
        $(".custom-select-md").each(function(){
            $(this).selectmenu().selectmenu("menuWidget").addClass("overflow select-sm");
		});
	},
};

Init.defaults();
Common.init();