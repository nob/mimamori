var UserInfoModel = Backbone.Model.extend({
	defaults: {
		url : {
				get : '/api/user_info'
				}
	},
	vars : {
		/*
		prefecture 		:"",
		birthday  		:"",
		sex 			:""
		*/
	},

	sync : {
		contract_no :""
	},

	func		:"",

	flag		:{

	},

	loadServer : function(){

		//console.log( "UserInfoModel..." );
		var that = this;

		if(that.func=='get'){
			that.loadServer_get();
		}
	},

	loadServer_get :function(){
		// console.log( "UserInfoModel get..." );
		var that = this;
		$.ajax({
			cache : false,
			type : 'GET',
			dataType: 'json',
			url   : that.defaults.url.get,
			success: function(res){
				//console.log( res );
				if(res.result == 'OK'){
					that.vars.prefecture=res.data.prefecture;
					that.vars.birthday=res.data.birthday;
					that.vars.sex=res.data.sex;
					//console.log( that.vars )
					that.trigger( 'completeServer' );
				}else{
					alert('入力エラー');
					that.trigger( 'error' );
				}
			},
			error: function(res){
				that.trigger( 'error' );
			}
		});
	}
});
(function(){
	var model = new UserInfoModel();
	window.model["UserInfoModel"] = model;
}());