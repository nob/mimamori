var WeatherModel = Backbone.Model.extend({
	defaults: {
		url : '/api/Weather'
	},
	vars : {
		/*
		enable 			: true,		//  APIの結果が不明な場合にfalse
		loc_code  		: '',		//	場所コード ex) JP.TOK
		point_value 	: '',		//	3時間天気の値 : ex) 晴れ,
		point_id		: '',		//	3時間天気のグループID : ex) 1,
		oneday_value 	: '',		//	一日天気の値 : ex) 晴れ,
		oneday_id 		: ''		//	一日天気のグループID : ex) 1,
		*/
	},
	sync : {
		loc_code : ""//'JP.TOK'
	},
	loadServer : function(){ //loc_code){

		//新しく所在地IDを設定する場合
		if( this.sync.loc_code != "" ){
			loc_code = this.sync.loc_code;
			var that = this;
			$.ajax({
				cache : false,
				type : 'GET',
				dataType: 'json',
				url   : that.defaults.url + "?loc_code=" + loc_code ,
				success: function(res){
					if(res.result == 'OK'||res.result == 'NG.SUNNY'){
						that.vars.loc_code = loc_code;
						that.sync = {};
						that.vars.point_value=res.data.point_value;
						that.vars.point_id=res.data.point_id;
						that.vars.oneday_value=res.data.oneday_value;
						that.vars.oneday_id=res.data.oneday_id;
						that.trigger( 'completeServer' );
					}
					else{
						alert('入力エラー');
						that.trigger( 'error' );
					}
				},
			});
		} else {
			this.trigger( 'completeServer' );
		}
	}
});
(function(){
	var model = new WeatherModel();
	window.model["WeatherModel"] = model;
}());