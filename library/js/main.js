// tOut = false;
screenHeight = window.innerHeight;	
screenWidth = window.innerWidth;	

var layoutDimensions = function(){
	document.querySelector('.left-nav').style.minHeight = screenHeight + "px";
	document.querySelector('.content').style.minHeight = (screenHeight - 308 ) + "px";
};

var triggerMobileButton = function(){
	$('.mobile-trigger').on('click', function(){
	
		$(this).toggleClass('active');
		$('.cart-trigger').removeClass('active');

		if( $(this).hasClass('active') ){
			// $(this).find('i').removeClass('fa-bars').addClass('fa-times');
			$('.mask').css('display','block');
			$('.left-nav').addClass('left-nav-active');
			$('.sidebar-cart').removeClass('cart-active');			
		}else{
			$(this).find('i').removeClass('fa-times').addClass('fa-bars');
			$('.mask').css('display','none');
			$('.left-nav').removeClass('left-nav-active');
			$('.sidebar-cart').removeClass('cart-active');			
		}
	});

	$('.cart-trigger').on('click', function(){		

		$(this).toggleClass('active');
		$('.mobile-trigger').removeClass('active');

		if( $(this).hasClass('active') ){
			$('.mask').css('display','block');
			$('.left-nav').removeClass('left-nav-active');
			$('.sidebar-cart').addClass('cart-active');
		}else{
			$('.mask').css('display','none');
			$('.left-nav').removeClass('left-nav-active');
			$('.sidebar-cart').removeClass('cart-active');
		}
	});	
	cartFixed();
}

var cartFixed = function(){
	if( screenWidth > 600 ){
	    $(window).scroll(function(){
		    var y = $(window).scrollTop();

		    if(y >= 180){
		            $('.sidebar-cart').css({'position':'fixed','top':'70px'});
		        }else{
		            $('.sidebar-cart').css({'position':'absolute','top':'250px'});
		        }
	    });
	}else{
		 $('.sidebar-cart').css({'position':'fixed','top':'55px'});
		 $('.cart-active ul,.sidebar-cart ul').css('height',( screenHeight - 170) +"px" );
		 $('.left-nav ul').css('height',( screenHeight - 170) +"px" );
	}
}

var addToCart = function(){

    $("a#adicionar").click(function(e) {
    	e.preventDefault();
		 var div = document.createElement('div');
				 div.className = 'resultsa';

          $.ajax({
            type: "GET",
            url: "visualizarProduto.html",
            data: { categoria: "categoria", produto: "produto"},               
            success: function (c){
                div.innerHTML = c;
        		alertify.alert(div).setting('label', 'Voltar'); ; 
            }
          })
    });
	removeItemFromCart();
}

var removeItemFromCart = function(){
	itens = $('#listaCarrinho').find('li').length;

	emptyMessage();

	function emptyMessage(){
		console.log(itens);
		if( itens < 1){
			$('<small class="empty-cart"/>').appendTo('#listaCarrinho').html('Seu carrinho está vazio.');
		}else if( itens >= 1 && $('.empty-cart').length ){
			$('.empty-cart').remove();
		}
	}

	$('.rm-cart').each(function(){
		$(this).on('click', function(){
			$(this).parent().parent().remove();
			itens--;
			emptyMessage();
		})
	})
	showTooltipOnCloseButtonOnCart();
}

var showTooltipOnCloseButtonOnCart = function(){
	$('.rm-cart').each(function(){
		 var close = document.createElement('span');
		 	 close.innerHTML = 'Remover Item';
		 	 $(this).append(close);

		$(this).on('mouseenter', function(){
			$(this).find('span').stop( true, true ).delay(1000).fadeIn(200);
		})
		$(this).on('mouseleave', function(){
			$(this).find('span').stop( true, true ).fadeOut(200);
		})
	})
	addActiveClassOnSidebarItem();
}

var addActiveClassOnSidebarItem = function(){
	var titleContent = $('.content h1').eq(0).text();

	$('.left-nav li').each(function(){
		var li = $(this).text();

		if( titleContent.indexOf( li ) != -1 ){
			console.log(li +" === "+ titleContent);
			$('.left-nav li').removeClass('active');
			$(this).addClass('active');
		}
	})
}

var rsizeItems = function(){
	if(screenWidth > 500){
		$('.mask').hide();
		$('.left-nav').removeClass('left-nav-active');
		$('.sidebar-cart').removeClass('cart-active');
	}
	layoutDimensions();
	triggerMobileButton();
}

$(function(){
	layoutDimensions();
	addToCart();	
	triggerMobileButton();
})

window.onresize = function(){
 // if(tOut !== false)
 //    clearTimeout(tOut);
 // 	tOut = setTimeout(rsizeItems, 1000);
};