var oInit = document.getElementsByClassName('init');

var timer = setTimeout(function () {
	$('.wrapper').removeClass('init');
	clearTimeout(timer);
},200);
$('.item').on('click',function () {
	$(this).addClass('active');
	$('.wrapper').addClass('wrapper-active');
	console.log('a');
})
$('.discription').on('click',function (e) {
	e.stopPropagation();
	$('.active').removeClass('active');
	$('.wrapper').removeClass('wrapper-active');
});