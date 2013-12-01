var MammaryEncouragementJudgeModel = Backbone.Model.extend({
	defaults: {
		url : { get : '/api/encouragement_judge/mammary' ,
				post: '/api/encouragement_judge/postmammary'
				}
	},
	vars : {
		judge_data:""
	},

	sync : {
		get:{
			purchase_day	:"2013-10-25",
			contract_no		:"13102500004",
			encouragement_no:""
		},
		post:{
			 purchase_day			:"2013-10-25"
			,contract_no			:"13102500004"
			,result					:"1"
			,detail					:"症状1：【右胸①】の位置に【ひきつれ】がありました。"
			,message_no				:"M123456"
			,encouragement_time		:"2013-11-22T10:00:00+00:00"
			,encouragement_message	:"今回の乳がんチェックで症状が見つかっています。決して自分で判断せず、早いタイミングで乳腺外科または外科に相談し、まずはしっかり検査をしてもらいましょう。受診の際にはチェックの結果を医師にお伝えください。"
		}
	},

	func		:"",

	flag		:{

	},

	loadServer : function(){

		console.log( "MammaryEncouragementJudgeModel..." );
		var that = this;

		if(that.func=='get'){

			that.loadServer_get();

		}else if(that.func=='post'){

			that.loadServer_post();

		}
	},

	loadServer_get :function(){
		var that = this;
		$.ajax({
			cache : false,
			type : 'POST',
			contentType : 'application/json',
			data : JSON.stringify(that.sync.get),
			dataType: 'json',
			url   : that.defaults.url.get,
			success: function(res){
				console.log( res );
				if(res.result == 'OK'){
					that.vars.judge_data		= res.data.datas;
					console.log( that.vars )
					that.trigger( 'completeServer' );
				}else{
					alert('入力エラー');
					that.trigger( 'error' );
				}
			}
		})
	},

	loadServer_post :function(){
		var that = this;
		$.ajax({
			cache : false,
			type : 'POST',
			contentType : 'application/json',
			data : JSON.stringify(that.sync.post),
			dataType: 'json',
			url   : that.defaults.url.post,
			success: function(res){
				console.log( res );
				if(res.result == 'OK'){
					that.vars.judge_data		= res.data.datas;
					console.log( that.vars )
					that.trigger( 'completeServer' );
				}else{
					alert('入力エラー');
					that.trigger( 'error' );
				}
			}
		})
	}
});
(function(){
	var model = new MammaryEncouragementJudgeModel();
	window.model["MammaryEncouragementJudgeModel"] = model;
}());