var FemaleEncouragementJudgeModel = Backbone.Model.extend({
	defaults: {
		url : { get : '/api/encouragement_judge/female'
				}
	},
	vars : {
		judge_data:""
	},

	sync : {
		"purchase_day":"2013-10-25"
		,"contract_no":"13102500004"
		,"encouragement_no":"PF20131101000000011"
	},

	func		:"",

	flag		:{

	},

	loadServer : function(){

		console.log( "FemaleEncouragementJudgeModel..." );
		var that = this;

		if(that.func=='get'){

			that.loadServer_get();

		}
	},

	loadServer_get :function(){
		var that = this;
		$.ajax({
			cache : false,
			type : 'POST',
			contentType : 'application/json',
			data : JSON.stringify(that.sync),
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
	}
});
/*
(function(){
	var model = new FemaleEncouragementJudgeModel();
	window.model["FemaleEncouragementJudgeModel"] = model;
}());
*/