var DataBackUpModel = Backbone.Model.extend({

	defaults: {
		url : {
				download : '/api/data_back_up/download',
				backup : '/api/data_back_up/backup'
				}
	},

	vars : {
		backup_data:""
		/*
		PREFERENCES_CYCLE_AVG					:"",//	平均月経周期
		PREFERENCES_ALARM_SET					:"",//	※リズムめざまし
		PREFERENCES_PROVINCE					:"",//	地域設定（県）
		PREFERENCES_REGION						:"",//	地域設定（地域）
		PREFERENCES_TEMPERATURE_FLAG			:"",//	※体温計毎朝入力フラグ
		PREFERENCES_BIRTHDAY					:"",//	誕生日
		PREFERENCES_SEASON_POINT_REFRESH		:"",//	シーズンポイント(リフレッシュ)
		PREFERENCES_SEASON_POINT_HAPPY			:"",//	シーズンポイント(ハッピー)
		PREFERENCES_SEASON_POINT_RELAX			:"",//	シーズンポイント(リラックス)
		PREFERENCES_SEASON_POINT_SLOW			:"",//	シーズンポイント(スロー)
		PREFERENCES_FUNCTION_POINT_TEMPERATURE	:"",//	ファンクションポイント（基礎体温）
		PREFERENCES_FUNCTION_POINT_ALARM		:"",//	※ファンクションポイント（リズム目覚まし）
		PREFERENCES_FUNCTION_POINT_VOICE		:"",//	ファンクションポイント（バルーンボイス）
		PREFERENCES_FUNCTION_POINT_SEAL			:"",//	ファンクションポイント（シールダイアリー）
		PREFERENCES_FUNCTION_POINT_MIMAMORI		:"",//	ファンクションポイント（みまもり）
		PREFERENCES_TUNDERE_POINT				:"",//	ツンデレポイント
		PREFERENCES_NOTIFICATION_PHYSIOLOGY_FLAG:"",//	生理日予定日通知設定
		PREFERENCES_NOTIFICATION_OVULATION_FLAG	:"",//	排卵予定日通知設定
		PREFERENCES_NOTIFICATION_SELFCHECK_FLAG	:"",//	乳がんセルフチェック通知
		PREFERENCES_NOTIFICATION_JUDGE_OK_FLAG	:"",//	※審査結果OK通知
		PREFERENCES_NOTIFICATION_JUDGE_NG_FLAG	:"",//	※審査結果NG通知
		PREFERENCES_VOLUME_BGM					:"",//	※サウンド（BGM)
		PREFERENCES_VOLUME_SE					:"",//	※サウンド（SE）
		PREFERENCES_VIB_ON						:"",//	※バイブ
		PREFERENCES_SELFCHECK_RESULT_HISTORY	:"",//	乳がんセルフチェック結果履歴
		PREFERENCES_NAME_GANA					:"",//	ユーザ名（ひらがな）
		PREFERENCES_NAME_KANA					:"",//	ユーザ名（カタカナ）
		PREFERENCES_SEASON_LEVEL_REFRESH		:"",//	シーズンレベル(リフレッシュ)
		PREFERENCES_SEASON_LEVEL_HAPPY			:"",//	シーズンレベル(ハッピー)
		PREFERENCES_SEASON_LEVEL_RELAX			:"",//	シーズンレベル(リラックス)
		PREFERENCES_SEASON_LEVEL_SLOW			:"",//	シーズンレベル(スロー)
		PREFERENCES_FUNCTION_LEVEL_TEMPERATURE	:"",//	ファンクションレベル（基礎体温）
		PREFERENCES_FUNCTION_LEVEL_ALARM		:"",//	※ファンクションレベル（リズム目覚まし）
		PREFERENCES_FUNCTION_LEVEL_VOICE		:"",//	ファンクションレベル（バルーンボイス）
		PREFERENCES_FUNCTION_LEVEL_SEAL			:"",//	ファンクションレベル（シールダイアリー）
		PREFERENCES_FUNCTION_LEVEL_MIMAMORI		:"",//	ファンクションレベル（みまもり）
		PREFERENCES_TUNDERE_LEVEL				:"",//	ツンデレレベル
		PREFERENCES_SEAL_LAST_FUNCTION_LEVEL	:"",//	前回のファンクションレベル（シール）
		PREFERENCES_ACCESS_KEY					:"",//	※機器連携アクセスキー
		PREFERENCES_TEMPERATURE_INPUT_TYPE		:"",//	※体温入力の方法
		AAA										:""	//	各日にち別シール情報
		*/
	},

	sync : {
		contract_no								:"13102500004",
		PREFERENCES_CYCLE_AVG					:"28",//	平均月経周期
		PREFERENCES_ALARM_SET					:"",//	※リズムめざまし
		PREFERENCES_PROVINCE					:"13",//	地域設定（県）
		PREFERENCES_REGION						:"JP.TOK",//	地域設定（地域）
		PREFERENCES_TEMPERATURE_FLAG			:"",//	※体温計毎朝入力フラグ
		PREFERENCES_BIRTHDAY					:"1978/07/13",//	誕生日
		PREFERENCES_SEASON_POINT_REFRESH		:"3",//	シーズンポイント(リフレッシュ)
		PREFERENCES_SEASON_POINT_HAPPY			:"3",//	シーズンポイント(ハッピー)
		PREFERENCES_SEASON_POINT_RELAX			:"3",//	シーズンポイント(リラックス)
		PREFERENCES_SEASON_POINT_SLOW			:"3",//	シーズンポイント(スロー)
		PREFERENCES_FUNCTION_POINT_TEMPERATURE	:"3",//	ファンクションポイント（基礎体温）
		PREFERENCES_FUNCTION_POINT_ALARM		:"",//	※ファンクションポイント（リズム目覚まし）
		PREFERENCES_FUNCTION_POINT_VOICE		:"5",//	ファンクションポイント（バルーンボイス）
		PREFERENCES_FUNCTION_POINT_SEAL			:"5",//	ファンクションポイント（シールダイアリー）
		PREFERENCES_FUNCTION_POINT_MIMAMORI		:"5",//	ファンクションポイント（みまもり）
		PREFERENCES_TUNDERE_POINT				:"5",//	ツンデレポイント
		PREFERENCES_NOTIFICATION_PHYSIOLOGY_FLAG:"1",//	生理日予定日通知設定
		PREFERENCES_NOTIFICATION_OVULATION_FLAG	:"1",//	排卵予定日通知設定
		PREFERENCES_NOTIFICATION_SELFCHECK_FLAG	:"1",//	乳がんセルフチェック通知
		PREFERENCES_NOTIFICATION_JUDGE_OK_FLAG	:"",//	※審査結果OK通知
		PREFERENCES_NOTIFICATION_JUDGE_NG_FLAG	:"",//	※審査結果NG通知
		PREFERENCES_VOLUME_BGM					:"",//	※サウンド（BGM)
		PREFERENCES_VOLUME_SE					:"",//	※サウンド（SE）
		PREFERENCES_VIB_ON						:"",//	※バイブ
		PREFERENCES_SELFCHECK_RESULT_HISTORY	:"1",//	乳がんセルフチェック結果履歴
		PREFERENCES_NAME_GANA					:"さかもと",//	ユーザ名（ひらがな）
		PREFERENCES_NAME_KANA					:"サカモト",//	ユーザ名（カタカナ）
		PREFERENCES_SEASON_LEVEL_REFRESH		:"1",//	シーズンレベル(リフレッシュ)
		PREFERENCES_SEASON_LEVEL_HAPPY			:"1",//	シーズンレベル(ハッピー)
		PREFERENCES_SEASON_LEVEL_RELAX			:"1",//	シーズンレベル(リラックス)
		PREFERENCES_SEASON_LEVEL_SLOW			:"1",//	シーズンレベル(スロー)
		PREFERENCES_FUNCTION_LEVEL_TEMPERATURE	:"1",//	ファンクションレベル（基礎体温）
		PREFERENCES_FUNCTION_LEVEL_ALARM		:"",//	※ファンクションレベル（リズム目覚まし）
		PREFERENCES_FUNCTION_LEVEL_VOICE		:"1",//	ファンクションレベル（バルーンボイス）
		PREFERENCES_FUNCTION_LEVEL_SEAL			:"1",//	ファンクションレベル（シールダイアリー）
		PREFERENCES_FUNCTION_LEVEL_MIMAMORI		:"1",//	ファンクションレベル（みまもり）
		PREFERENCES_TUNDERE_LEVEL				:"1",//	ツンデレレベル
		PREFERENCES_SEAL_LAST_FUNCTION_LEVEL	:"1",//	前回のファンクションレベル（シール）
		PREFERENCES_ACCESS_KEY					:"",//	※機器連携アクセスキー
		PREFERENCES_TEMPERATURE_INPUT_TYPE		:"",//	※体温入力の方法
		sealdiary								:""	//	各日にち別シール情報　配列で設定
	},

	func		:"",

	flag		:{
		last_access_date	:"20131120"
	},

	loadServer : function(){

		console.log( "DataBackUpModel..." );
		var that = this;

		if(that.func=='download'){
			that.loadServer_download();
		}else if(that.func=='backup'){
			that.loadServer_backup();
		}
	},

	loadServer_download :function(){
		var that = this;
		var now = new Date();
		var today =getYYYYMMDD(now);

		console.log( today , that.flag.last_access_date );

		if(today > that.flag.last_access_date){
			$.ajax({
				cache : false,
				type : 'POST',
				data : {"contract_no":that.sync.contract_no
						},
				dataType: 'json',
				url   : that.defaults.url.download,
				success: function(res){
					console.log( res );
					if(res.result == 'OK'){
						that.vars.backup_data = res.data.datas[0].file.Backup;
						that.vars.last_access_date		= today;
						console.log( that.vars )
						that.trigger( 'completeServer' );
					}else{
						alert('入力エラー');
						that.trigger( 'error' );
					}
				}
			});
		}
	},

	loadServer_backup :function(){
		var that = this;
		var now = new Date();
		var today =getYYYYMMDD(now);

		console.log( today , that.flag.last_access_date );

		if(today > that.flag.last_access_date){
			$.ajax({
				cache : false,
				type : 'POST',
				contentType : 'application/json',
				data : JSON.stringify(that.sync),
				dataType: 'json',
				url   : that.defaults.url.backup,
				success: function(res){
					console.log( res );
					if(res.result == 'OK'){
						that.vars.last_access_date		= today;
						console.log( that.vars )
						that.trigger( 'completeServer' );
					}else{
						alert('入力エラー');
						that.trigger( 'error' );
					}
				}
			});
		}
	}
});
/*
(function(){
	var model = new UserInfoModel();
	window.model["UserInfoModel"] = model;
}());
*/