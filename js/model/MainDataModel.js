var MainDataModel = Backbone.Model.extend({

	defaults: {
		url : {
				get : '/api/main_view/maindata'
				}
	},

	vars : {
		/*
		menstrucal_cycle			: {	//周期リズムAPI
			analysis_status: 1,//分析結果ステータス。予測実施不能時のステータス
			err_flag: 12011,	//エラーフラグ　7桁の整数。
			high_temp_date: null,	//高温相検出日（ISO8601フォーマット）
			menses_schedule: "2013-11-29T00:00:00+09:00",	//出力月経予定日
			menses_schedule_status: 0,	//出力月経予定日ステータス
			menses_schedule_status_group: 1,	//出力月経予定日ステータスグループ
			ovulation_date: "2013-11-14T00:00:00+09:00",	//出力排卵日
			ovulation_date_status: 0,	//出力排卵日ステータス
			ovulation_date_status_group: 1,	//出力排卵日ステータスグループ
			stage_days: {	//直近の生理日と、各期の日数が格納されているオブジェクト
				latest_menses_date: "2013-10-30T00:00:00+09:00",
				ranhou1_zen_days: 3,
				ranhou1_kou_days: 4,
				ranhou2_zen_days: 9,
				ranhou2_kou_days: 0,
				outai1_zen_days: 7,
				outai2_zen_days: 4,
				outai2_kou_days: 3,
			}
		},
		reception_recommend			:"",
		female_encouragement_judge	:"",
		encouragement_judge_list	:""
		*/
	},

	sync : {
		contract_no 		:"13102500004",
		purchase_date  		:"2013-10-25",
		r_recommend_flag 	:"1",
		ejlist_flag			:"1",
		cycle_avg			:"28"
	},

	func		:"",

	flag		:{

	},

	loadServer : function(){

		//console.log( "MainDataModel..." );
		var that = this;

		if(that.func=='get'){
			that.loadServer_get();
		}
	},

	loadServer_get :function(){
		//console.log( "MainDataModel get..." , this.sync );
		var that = this;
		$.ajax({
			cache : false,
			type : 'POST',
			contentType : 'application/json',
			data : JSON.stringify(that.sync),
			dataType: 'json',
			url   : that.defaults.url.get,
			success: function(res){
				//console.log( res );
				if(res.result == 'OK'){
					that.vars.menstrucal_cycle=res.data.menstrucal_cycle;
					that.vars.reception_recommend=res.data.reception_recommend;
					that.vars.female_encouragement_judge=res.data.female_encouragement_judge;
					that.vars.encouragement_judge_list=res.data.encouragement_judge_list;
					//console.log( that.vars )
					that.trigger( 'completeServer' );
				}else{
					alert('入力エラー');
					that.trigger( 'error' );
				}
			},
			error: function( res ){
				console.log( "error" , res );
				that.trigger( 'error' );
			}
		});
	}
});
(function(){
	var model = new MainDataModel();
	window.model["MainDataModel"] = model;
}());