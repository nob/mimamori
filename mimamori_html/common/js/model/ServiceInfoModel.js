var ServiceInfoModel = Backbone.Model.extend({
	defaults: {
		url : {
				get : '/api/check/serviceinfo'
				}
	},
	vars : {
		serviceinfo 		:""
	},

	sync : {

	},

	func		:"",

	flag		:{

	},

	loadServer : function(){

		console.log( "ServiceInfoModel..." );
		var that = this;

		if(that.func=='get'){
			that.loadServer_get();
		}
	},

	loadServer_get :function(){
		var that = this;
		$.ajax({
			cache : false,
			type : 'GET',
			dataType: 'json',
			url   : that.defaults.url.get,
			success: function(res){
				console.log( res );
				if(res.result == 'OK'){
					that.vars.serviceinfo=res.data.serviceinfo;
					console.log( that.vars )
					that.trigger( 'completeServer' );
				}else{
					alert('入力エラー');
					that.trigger( 'error' );
				}
			}
		});
	}
});
/*
(function(){
	var model = new UserInfoModel();
	window.model["UserInfoModel"] = model;
}());
*/