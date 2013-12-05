var MeasureDataModel = Backbone.Model.extend({
	defaults: {
		url : { get : '/api/measure_data/get' ,
				add: '/api/measure_data/add'}
	},
	vars : {
		measure_data:""
	},

	sync : {
		put_data:'{"datas": [{"device": 64,"vitals":[{"measuredate": "2013-11-10T21:14:00+09:00","data_type": 2,"measuredatas":{"basal_body_temp": 37}}]}]}'
	},

	func		:"",

	flag		:{

	},

	loadServer : function(){

		console.log( "MeasureDataModel..." );
		var that = this;

		if(that.func=='get'){

			that.loadServer_get();

		}else if(that.func=='add'){

			that.loadServer_add();

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
					that.vars.measure_data		= res.data.datas[0];
					console.log( that.vars )
					that.trigger( 'completeServer' );
				}else{
					alert('入力エラー');
					that.trigger( 'error' );
				}
			}
		})
	},

	loadServer_add :function(){
		var that = this;
		$.ajax({
			cache : false,
			type : 'POST',
			contentType : 'application/json',
			data : JSON.stringify(that.sync),
			dataType: 'json',
			url   : that.defaults.url.add,
			success: function(res){
				console.log( res );
				if(res.result == 'OK'){
					that.trigger( 'completeServer' );
				}else{
					alert('入力エラー');
					that.trigger( 'error' );
				}
			}
		})
	}
});
/*
(function(){
	var model = new UserInfoModel();
	window.model["UserInfoModel"] = model;
}());
*/