var $ = require('minified').$;

$(function () {
	var auth = {
		key: '4590abffcb2a75e165d3c667a582f17f',
		secret: '3730ea30a7c49780b31bcb1d1df2fcbb5f9985df8111dec1'
	},

	baseUrl = 'http://ef95ec00-840d-11e6-bf6f-6d035d3d81fa.app.jexia.com',

	settings = {};

	if (!localStore.get("coelho")) {
		$.request('POST', baseUrl, auth).then(function(text) {
				var data = $.parseJSON(text),
				settings = { headers: { 'Authorization': 'Bearer ' + data.token, 'Access-Control-Allow-Origin': '*' } };
				return $.request('GET', baseUrl + '/quotes', null, settings);
			}
		).then(function (text) {
			var data = $.parseJSON(text).map(function (item) {
				return { quote: item.quote, from_book: item.from_book };
			});

			localStore.set("coelho", data);
		});
	}

	var store = localStore.get("coelho");

	$("button").onClick(function () {
		if (store) {
			var template = store[Math.floor(Math.random() * store.length)];
		} else {
			console.error("No se ha encontrado el almacén. Actualiza la página")
		}
		$("#quote").fill(template.quote);
		$("#from_book").fill(template.from_book);
	});
});