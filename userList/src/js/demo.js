var personArr = [
	{name : '小芳', src : 'xf.jpg', des : '132****6994',sex : 'female'},
	{name : '六六', src : 'liuliu.jpg', des : '135****6859',sex : 'male'},
	{name : '李菲',src : 'lifei.jpg', des : '159****9454',sex : 'female'},
	{name : '陈一轩',src : 'xuanxuan.jpg', des : '134****9363',sex : 'male'},
	{name : '刘乐',src : 'liuhua.jpg', des : '134****3128',sex : 'male'},
	{name : '小明',src : 'xiaoming.jpg', des : '134****3124',sex : 'male'},
	{name : '刘飞翔',src : 'liuyifei.jpg', des : '134****3145',sex : 'female'},
	{name : '杰森',src : 'jiesen.jpg', des : '134****3165',sex : 'male'},
];

var oUl = document.getElementsByTagName('ul')[0];
var oInput = document.getElementsByClassName('search_box')[0];
var oP = document.getElementsByTagName('p')[0];

// 渲染数据
function renderPage (list) {
	var str = '';
	list.forEach(function (ele,index) {
		str += '<li>\
					<img src="./src/img/'+ ele.src +'" alt="">\
					<p>'+ ele.name +'</p>\
					<p>iphone: '+ ele.des +'</p>\
				</li>'
	});
	oUl.innerHTML = str;
}
renderPage(personArr);

var state = {
	text: '',
	sex: 'a'
}
// 绑定input事件
oInput.oninput = function () {
	state.text = this.value;
	// renderPage(filterText(state.text,personArr));
	renderPage(lastFilter());
}
// 根据input框中输入的值进行筛选新数组
function filterText (text,arr) {
	return arr.filter(function (ele,index) {
		if (ele.name.indexOf(text) != -1 || ele.des.indexOf(text) != -1) {
			return true;
		}
	});
}
// span点击事件
oP.addEventListener('click',function (e) {
	if (e.target.tagName == 'SPAN') {
		state.sex = e.target.getAttribute('sex');
		document.getElementsByClassName('active')[0].classList.remove('active');
		e.target.classList.add('active');
		// renderPage(filterSex(state.sex,personArr));
		renderPage(lastFilter());
	}
});
// 根据性别进行筛选新数组
function filterSex (sex,arr) {
	if (sex == 'a') {
		return arr;
	}else {
		return arr.filter(function (ele,index) {
			if (sex == ele.sex) {
				return true;
			}
		});
	}
}
// 合并筛选条件
function combineFilterFunc (obj,arr) {
	return function () {
		var lastArr = arr;
		for (var prop in obj) {
			lastArr = obj[prop](state[prop],lastArr);
		}
		return lastArr;
	}
}

// 添加筛选条件
var lastFilter = combineFilterFunc({text: filterText,sex: filterSex},personArr);