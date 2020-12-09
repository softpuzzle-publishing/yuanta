var Common = {
	init : function(){
		Common.scrolling();
		Common.top();
		window.addEventListener('mousewheel', Common.scrolling);
		window.addEventListener('touchmove', Common.scrolling);

		$(window).scroll(function(){
			Common.scrolling();
		});
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
};

Common.init();