var RelayModel_formes = Backbone.Model.extend({

	vars : {
		IMPORT_FLAG : false,	//インポート開始フラグ
		IMPORT_SUCCESS_FLAG : false,	//インポート初回フラグ
		PROGRESS_FLAG : 0,	//進捗フラグ（1～6）
		NAME : ["柿","九毛子","カキ","クケコ","くけこ"],	//姓（漢字）、名（漢字）、セイ（カナ）、メイ（カナ）
		PROVINCE : 13,	//県コード
		REGION : 45,	//地域コード
		CYCLE_AVG : 28,	//最新月経周期
		MENSES_DATE_LIST : [
			{
				"menses_date": "2013-07-25T00:00:00+09:00"
			},
			{
				"menses_date": "2013-08-25T00:00:00+09:00"
			},
			{
				"menses_date": "2013-09-25T00:00:00+09:00"
			}],	//生理日リスト
		MENSES_FIRST_FLAG : false,	//初回月経登録フラグ
		MENSES_FIRST_LIST : [],	//初回登録月経日リスト
		SERVICE_DATE : "",	//サービス購入日（契約日１）
		RECKONED : ""	//起算日（契約日２）
	},

	initialize: function(opts){
		var that = this;
		//console.log( 'relayModel initialize');
	},

	/*----------------------------------------------------------
	 * IMPORT_FLAG　（インポート開始フラグ）
	 */

	/*
	 * get_IMPORT_FLAG
	 *
	 * インポート開始フラグを返す
	 * 引数：なし
	 *　戻り値：boolean
	 */

	get_IMPORT_FLAG : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.IMPORT_FLAG;
	},

	/*
	 * set_IMPORT_FLAG
	 *
	 * インポート開始フラグをセットする
	 * 引数：boolean
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_IMPORT_FLAG : function( bool ){
		//※最終的にローカルストレージへ保存
		this.vars.IMPORT_FLAG = bool;
		return;
	},


	/*----------------------------------------------------------
	 * IMPORT_SUCCESS_FLAG　（インポート初回フラグ）
	 */

	/*
	 * get_IMPORT_SUCCESS_FLAG
	 *
	 * インポート初回フラグを返す
	 * 引数：なし
	 *　戻り値：boolean
	 */

	get_IMPORT_SUCCESS_FLAG : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.IMPORT_FLAG;
	},

	/*
	 * set_IMPORT_SUCCESS_FLAG
	 *
	 * インポート初回フラグをセットする
	 * 引数：boolean
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_IMPORT_SUCCESS_FLAG : function( bool ){
		//※最終的にローカルストレージへ保存
		this.vars.IMPORT_FLAG = bool;
		return;
	},


	/*----------------------------------------------------------
	 * PROGRESS_FLAG　（進捗フラグ）
	 */

	/*
	 * get_PROGRESS_FLAG
	 *
	 * 進捗フラグを返す
	 * 引数：なし
	 *　戻り値：int
	 */

	get_PROGRESS_FLAG : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.PROGRESS_FLAG;
	},

	/*
	 * set_PROGRESS_FLAG
	 *
	 * 進捗フラグをセットする
	 * 引数：boolean
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_PROGRESS_FLAG : function( num ){
		//※最終的にローカルストレージへ保存
		this.vars.PROGRESS_FLAG = num;
		return;
	},


	/*----------------------------------------------------------
	 * NAME　（姓名、セイメイ）
	 */

	/*
	 * get_NAME
	 *
	 * 姓（漢字）、名（漢字）、セイ（カナ）、メイ（カナ）を返す
	 * 引数：なし
	 *　戻り値：array
	 */

	get_NAME : function(){
		return localStorage.getItem("NAME");
	},

	/*
	 * set_NAME
	 *
	 * 名前をセットする
	 * 引数：array[姓（漢字）、名（漢字）、セイ（カナ）、メイ（カナ）]
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_NAME : function( array ){
		localStorage.setItem("NAME", array );
		return;
	},


	/*----------------------------------------------------------
	 * PROVINCE　（県コード）
	 */

	/*
	 * get_PROVINCE
	 *
	 * 県コードを返す
	 * 引数：なし
	 *　戻り値：int
	 */

	get_PROVINCE : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.PROVINCE;
	},

	/*
	 * set_PROVINCE
	 *
	 * 県コードをセットする
	 * 引数：int
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_PROVINCE : function( num ){
		//※最終的にローカルストレージへ保存
		this.vars.PROVINCE = num;
		return;
	},


	/*----------------------------------------------------------
	 * REGION　（地域コード）
	 */

	/*
	 * get_REGION
	 *
	 * 地域コードを返す
	 * 引数：なし
	 *　戻り値：string
	 */

	get_REGION : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.REGION;
	},

	/*
	 * set_REGION
	 *
	 * 地域コードをセットする
	 * 引数：int
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_REGION : function( num ){
		//※最終的にローカルストレージへ保存
		this.vars.REGION = num;
		return;
	},


	/*----------------------------------------------------------
	 * CYCLE_AVG　（最新月経周期）
	 */

	/*
	 * get_CYCLE_AVG
	 *
	 * 最新月経周期を返す
	 * 引数：なし
	 *　戻り値：int
	 */

	get_CYCLE_AVG : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.CYCLE_AVG;
	},

	/*
	 * set_CYCLE_AVG
	 *
	 * 最新月経周期をセットする
	 * 引数：int
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_CYCLE_AVG : function( num ){
		//※最終的にローカルストレージへ保存
		this.vars.CYCLE_AVG = num;
		return;
	},


	/*----------------------------------------------------------
	 * MENSES_DATE　（月経日）
	 */

	/*
	 * get_MENSES_DATE
	 *
	 * 最新月経日を返す
	 * 引数：なし
	 *　戻り値：string（date形式。"2013-07-31T00:00:00+09:00"）
	 */

	get_MENSES_DATE : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.MENSES_DATE_LIST[ this.vars.MENSES_DATE_LIST.length - 1 ].menses_date;
	},

	/*
	 * get_MENSES_DATE_LIST
	 *
	 * 過去12ヶ月分の月経日を返す
	 * 引数：なし
	 *　戻り値：array（中身はJSON）
	 */

	get_MENSES_DATE_LIST : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.MENSES_DATE_LIST;
	},

	/*
	 * set_MENSES_DATE
	 *
	 * 最新月経日をセットする
	 * 引数：string
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_MENSES_DATE : function( string ){
		//※最終的にローカルストレージへ保存
		this.vars.MENSES_DATE_LIST.push( {"menses_date" : string } );
		return;
	},

	/*
	 * edit_MENSES_DATE
	 *
	 * 指定された月経日を編集する
	 * 引数：string　変更前の日付
	 *     string2 変更後の日付
	 *　戻り値：通信エラー時のみ'error'
	 */

	edit_MENSES_DATE : function( string , string2 ){
		//※最終的にローカルストレージへ保存
		return;
	},


	/*----------------------------------------------------------
	 * MENSES_FIRST_FLAG　（初回月経登録フラグ）
	 */

	/*
	 * get_MENSES_FIRST_FLAG
	 *
	 * 初回月経登録フラグを返す
	 * 引数：なし
	 *　戻り値：boolean
	 */

	get_MENSES_FIRST_FLAG : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.MENSES_FIRST_FLAG;
	},

	/*
	 * set_MENSES_FIRST_FLAG
	 *
	 * 初回月経登録フラグをセットする
	 * 引数：boolean
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_MENSES_FIRST_FLAG : function( bool ){
		//※最終的にローカルストレージへ保存
		this.vars.MENSES_FIRST_FLAG = bool;
		return;
	},


	/*----------------------------------------------------------
	 * MENSES_FIRST_LIST　（初回登録月経日リスト）
	 */

	/*
	 * get_MENSES_FIRST_LIST
	 *
	 * 初回登録月経日リストを返す
	 * 引数：なし
	 *　戻り値：array(中身はJSON。月経日リストと同フォーマット)
	 */

	get_MENSES_FIRST_LIST : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.MENSES_FIRST_LIST;
	},

	/*
	 * set_MENSES_FIRST_LIST
	 *
	 * 初回月経登録フラグをセットする
	 * 引数：array
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_MENSES_FIRST_LIST : function( array ){
		//※最終的にローカルストレージへ保存
		this.vars.MENSES_FIRST_LIST = array;
		return;
	},


	/*----------------------------------------------------------
	 * SERVICE_DATE　（サービス購入日（契約日１））
	 */

	/*
	 * get_SERVICE_DATE
	 *
	 * サービス購入日（契約日１）を返す
	 * 引数：なし
	 *　戻り値：string（date形式。"2013-07-31T00:00:00+09:00"）
	 */

	get_SERVICE_DATE : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.SERVICE_DATE;
	},

	/*
	 * set_SERVICE_DATE
	 *
	 * サービス購入日（契約日１）をセットする
	 * 引数：string（date形式。"2013-07-31T00:00:00+09:00"）
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_SERVICE_DATE : function( string ){
		//※最終的にローカルストレージへ保存
		this.vars.SERVICE_DATE = string;
		return;
	},


	/*----------------------------------------------------------
	 * RECKONED　（起算日（契約日２））
	 */

	/*
	 * get_RECKONED
	 *
	 * 起算日（契約日２）を返す
	 * 引数：なし
	 *　戻り値：string（date形式。"2013-07-31T00:00:00+09:00"）
	 */

	get_RECKONED : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.RECKONED;
	},

	/*
	 * set_RECKONED
	 *
	 * 起算日（契約日２）をセットする
	 * 引数：string（date形式。"2013-07-31T00:00:00+09:00"）
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_RECKONED : function( string ){
		//※最終的にローカルストレージへ保存
		this.vars.RECKONED = string;
		return;
	}



});