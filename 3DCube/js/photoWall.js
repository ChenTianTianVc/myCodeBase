var oLi = Array.prototype.slice.call(document.getElementsByTagName('li'));
oLi.forEach(function (ele,index) {
	ele.addEventListener('mouseenter',function (e) {
		addClass(this,e,'in');
	});
	ele.addEventListener('mouseleave',function (e) {
		addClass(this,e,'out');
	});
});

function addClass (ele,e,state) {
	var d = getDirection(ele,e),
		direction;
	switch(d) {
		case 0:
			direction = '-bottom';
			break;
		case 1:
			direction = '-left';
			break;
		case 2:
			direction = '-top';
			break;
		case 3:
			direction = '-right';
	}
	ele.className = state + direction;
}
function getDirection (ele,e) {
	var x = e.offsetX - ele.offsetWidth/2;
	var y = e.offsetY - ele.offsetHeight/2;
	/* 判断方向的值 */
	return d = ((Math.round(Math.atan2(y,x) * (180/Math.PI)/90) + 3) % 4);
}