var ppt = {
	$wrapper: $('.wrapper'),
	len: $('.slider').length,
	nowIndex: 0,
	lastIndex: undefined,
	$slider: $('.slider'),
	flag: true,// true 可點擊
	timer: undefined,
	init: function () {
		if (this.len > 1) {
			this.createDom(this.len);
			this.bindEvent();
			this.slider_auto();
		}
	},
	createDom: function (len) {
		var str = '',btnStr = '';
		for (var i = 0; i < len; i ++) {
			if (i == 0) {
				str += '<li class="active">' + (i + 1) + '</li>';
			}else {
				str += '<li>'+ (i + 1) +'</li>';
			}
		}
		str = '<div class="slider_order"><ul>' + str + '</ul></div>';
		btnStr = '<div class="slider_btn">\
					<span class="left_btn"></span>\
					<span class="right_btn"></span>\
				</div>';
		this.$wrapper.append(str).append(btnStr);
	},
	bindEvent: function () {
		var _this = this;
		$('li').add($('.left_btn')).add($('.right_btn')).on('click',function () {
			if ($(this).attr('class') == 'left_btn') {
				_this.tool('left');
			}else if ($(this).attr('class') == 'right_btn') {
				_this.tool('right');
			}else {
				var index = $(this).index();
				_this.tool(index);
			}
		})
		this.$slider.on('leave',function () {
			$('img').animate({width: '20%'});
			$('.title').animate({width: '20%'}).find($('p'))
			.animate({fontSize: '16px'});
			$(this).fadeOut(300);
		})
		this.$slider.on('come',function () {
			$('img').animate({width: '40%'});
			$('.title').animate({width: '40%'});
			$('p').animate({fontSize: '20px'});
			$(this).fadeIn(300,function () {
				_this.flag = true;
				_this.slider_auto();
			});
		})
	},
	tool: function (direction) {
		if (this.flag) {
			this.getIndex(direction);
			if (this.lastIndex != this.nowIndex) {
				this.flag = false;
				this.changeActive(this.nowIndex);
				this.$slider.eq(this.lastIndex).trigger('leave');
				this.$slider.eq(this.nowIndex).delay(300).trigger('come');
			}
		}
	},
	getIndex: function (direction) {
		// 在判斷之前把索引值給lastIndex
		this.lastIndex = this.nowIndex;
		if (direction == 'left' || direction == 'right') {
			if (direction == 'left') {
				this.nowIndex = this.nowIndex == 0 ? this.len - 1 : this.nowIndex - 1;
			}else if (direction == 'right') {
				this.nowIndex = this.nowIndex == this.len - 1 ? 0 : this.nowIndex + 1;
			}		
		}else {
			this.nowIndex = direction;
		}
	},
	changeActive: function (index) {
		$('.active').removeClass('active');
		// 給指定的 元素 設置 active
		$('li').eq(index).addClass('active');
	},
	slider_auto: function () {
		var _this = this;
		clearTimeout(this.timer);
		this.timer = setTimeout(function () {
			_this.tool('right');
		},3000)
	}

}
ppt.init();

