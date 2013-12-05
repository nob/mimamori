var RelayModel_tokyo03 = Backbone.Model.extend({

	vars : {
		MIMAMORI_UPDATE_HOSYOSTATUS_JOSEI : "2012-10-25T00:00:00+09:00",	//女性疾病更新日
		MIMAMORI_CHARGE_HOSYOSTATUS_JOSEI : 5000,	//女性疾病受診科
		MIMAMORI_UPDATE_HOSYOSTATUS_SEIMITU : "2012-10-25T00:00:00+09:00",	//精密検査更新日
		MIMAMORI_CHARGE_HOSYOSTATUS_SEIMITU : 10000,	//精密検査受診科
		SHOW_SHINSA : false,	//補償ステータス更新フラグ
		EJLIST_FLAG	: false,	//受診勧奨取得フラグ
		RECKONED : "2013-07-31T00:00:00+09:00",	//起算日（契約日２）
		EJLIST_TOP : "2013-07-31T00:00:00+09:00",	//最新の受診勧奨発生日
		SHOW_SUSUME : false,	//最新受診勧奨フラグ
		EJLIST_TOP_CHARGE : 15000,	//最新の勧奨受診科
		EJLIST_TOP_PROPRIETY1 : "2013-07-31T00:00:00+09:00",//最新の受診勧奨（申請可能なもの）発生日
		SHOW_SHINSEI : false,	//申請可能勧奨フラグ
		EJLIST_TOP_CHARGE_PROPRIETY1 : 20000,	//最新の申請可能勧奨受診科
		EJLIST_LIMITLIST_JUSHIN : [{
			"0": {
				"department": "1",
				"which_propriety": null,
				"female": {
					"encouragement_no": "PF20131101000000011",
					"message_no": "MSG_3",
					"encouragement_date": "2013-11-01T00: 00: 00+09: 00",
					"encouragement_message": "今回の周期は12日未満でした。※以下略・・・※",
					"subscription_date": null,
					"propriety": 2,
					"propriety_reason": "待機期間中の受診勧奨のため申請対象外です。"
				},
				"precision": {
					"encouragement_no": "PF20131101000000011",
					"message_no": "MSG_3",
					"encouragement_date": "2013-11-01T00: 00: 00+09: 00",
					"encouragement_message": "今回の周期は12日※以下略・・・※",
					"subscription_date": null,
					"propriety": 2,
					"propriety_reason": "待機期間中の受診勧奨のため申請対象外です。"
				}
			},
			"1": {
				"department": "1",
				"which_propriety": null,
				"female": {
					"encouragement_no": "PF20131101000000010",
					"message_no": "MSG_3",
					"encouragement_date": "2013-11-01T00: 00: 00+09: 00",
					"encouragement_message": "今回の周期は12日未※以下略・・・※",
					"subscription_date": null,
					"propriety": 2,
					"propriety_reason": "待機期間中の受診勧奨のため申請対象外です。"
				},
				"precision": {
					"encouragement_no": "PF20131101000000010",
					"message_no": "MSG_3",
					"encouragement_date": "2013-11-01T00: 00: 00+09: 00",
					"encouragement_message": "今回の周期は12日※以下略・・・※",
					"subscription_date": null,
					"propriety": 2,
					"propriety_reason": "待機期間中の受診勧奨のため申請対象外です。"
				}
			},
			"reckoned": "2013-10-25"
			}],	//最新の受診勧奨-発生日10件
		LAST_CHECK_JUSHIN : "2013-07-31T00:00:00+09:00",	//最後に受診期限をチェックした日
		SHOW_MEDICALLIMIT_FLAG : false,	//受診期限時期表示フラグ
		LAST_CHECK_SHINSEI : "2013-07-31T00:00:00+09:00",	//最後に申請期限をチェックした日
		SHOW_TRUSTLIMIT_FLAG : false, //申請期限時期表示フラグ
		SHOW_DIAGNOSIS_FLAG : false,	//受診勧奨表示フラグ
		SHOW_SELFCHECK_FLAG : false,	//乳がんチェック時期フラグ
		MENSES_DATE_LIST : [
			{
				"menses_date": "2012-10-25T00:00:00+09:00"
			},
			{
				"menses_date": "2012-11-25T00:00:00+09:00"
			},
			{
				"menses_date": "2012-12-25T00:00:00+09:00"
			},
			{
				"menses_date": "2013-01-25T00:00:00+09:00"
			},
			{
				"menses_date": "2013-02-25T00:00:00+09:00"
			},
			{
				"menses_date": "2013-03-25T00:00:00+09:00"
			},
			{
				"menses_date": "2013-04-25T00:00:00+09:00"
			},
			{
				"menses_date": "2013-05-25T00:00:00+09:00"
			},
			{
				"menses_date": "2013-06-25T00:00:00+09:00"
			},
			{
				"menses_date": "2013-07-25T00:00:00+09:00"
			},
			{
				"menses_date": "2013-08-25T00:00:00+09:00"
			},
			{
				"menses_date": "2013-09-25T00:00:00+09:00"
			}],	//生理日リスト
			SELFCHECK_RESULT_HISTORY : "「20120101/Step1症状内容/Step2症状内容/Step3症状内容|20120101/Step1症状内容/Step2症状内容/Step3症状内容」",	//乳がんセルフチェック結果履歴
			SELFCHECK_RESULT1 : "（Step1選択内容）",	//乳がんチェックStep1選択内容
			SELFCHECK_RESULT2 : "（Step2選択内容）",	//乳がんチェックStep2選択内容
			SELFCHECK_RESULT3 : "（Step3選択内容）",	//乳がんチェックStep3選択内容
			SELFCHECK_STEP1_RETRY_FLAG : false,	//Step1再試行フラグ
			SELFCHECK_STEP2_RETRY_FLAG : false,	//Step2再試行フラグ
			SELFCHECK_STEP3_RETRY_FLAG : false,	//Step3再試行フラグ
			ACCESS_FLAG : false,	//アクセスフラグ
			MEMBER_INFO : {
				"family_name": "柿",
				"name": "九毛子",
				"family_name_kana": "カキ",
				"name_kana": "クケコ",
				"address": "東京都渋谷区東1-26-30　渋谷イーストビル3階",
				"postalcode": "1500011",
				"tel": "0357780200"
				}

	},

	initialize: function(opts){
		var that = this;
		//console.log( 'relayModel initialize');
	},











	/* みまもり */



	/*----------------------------------------------------------
	 * MIMAMORI_UPDATE_HOSYOSTATUS_JOSEI　（女性疾病更新日）
	 */

	/*
	 * get_MIMAMORI_UPDATE_HOSYOSTATUS_JOSEI
	 *
	 * 女性疾病更新日を返す
	 * 引数：なし
	 *　戻り値：string（date形式。"2013-07-31T00:00:00+09:00"）
	 */

	get_MIMAMORI_UPDATE_HOSYOSTATUS_JOSEI : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.MIMAMORI_UPDATE_HOSYOSTATUS_JOSEI;
	},

	/*
	 * set_MIMAMORI_UPDATE_HOSYOSTATUS_JOSEI
	 *
	 * 女性疾病更新日をセットする
	 * 引数：string（date形式。"2013-07-31T00:00:00+09:00"）
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_MIMAMORI_UPDATE_HOSYOSTATUS_JOSEI : function( string ){
		//※最終的にローカルストレージへ保存
		this.vars.MIMAMORI_UPDATE_HOSYOSTATUS_JOSEI = string;
		return;
	},


	/*----------------------------------------------------------
	 * MIMAMORI_CHARGE_HOSYOSTATUS_JOSEI　（女性疾病受診科）
	 */

	/*
	 * get_MIMAMORI_CHARGE_HOSYOSTATUS_JOSEI
	 *
	 * 女性疾病受診科を返す
	 * 引数：なし
	 *　戻り値：int
	 */

	get_MIMAMORI_CHARGE_HOSYOSTATUS_JOSEI : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.MIMAMORI_CHARGE_HOSYOSTATUS_JOSEI;
	},

	/*
	 * set_MIMAMORI_CHARGE_HOSYOSTATUS_JOSEI
	 *
	 * 女性疾病受診科をセットする
	 * 引数：int
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_MIMAMORI_CHARGE_HOSYOSTATUS_JOSEI : function( num ){
		//※最終的にローカルストレージへ保存
		this.vars.MIMAMORI_CHARGE_HOSYOSTATUS_JOSEI = num;
		return;
	},


	/*----------------------------------------------------------
	 * MIMAMORI_UPDATE_HOSYOSTATUS_SEIMITU　（精密検査更新日）
	 */

	/*
	 * get_MIMAMORI_UPDATE_HOSYOSTATUS_SEIMITU
	 *
	 * 精密検査更新日を返す
	 * 引数：なし
	 *　戻り値：string（date形式。"2013-07-31T00:00:00+09:00"）
	 */

	get_MIMAMORI_UPDATE_HOSYOSTATUS_SEIMITU : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.MIMAMORI_UPDATE_HOSYOSTATUS_SEIMITU;
	},

	/*
	 * set_MIMAMORI_UPDATE_HOSYOSTATUS_SEIMITU
	 *
	 * 精密検査更新日をセットする
	 * 引数：string（date形式。"2013-07-31T00:00:00+09:00"）
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_MIMAMORI_UPDATE_HOSYOSTATUS_SEIMITU : function( string ){
		//※最終的にローカルストレージへ保存
		this.vars.MIMAMORI_UPDATE_HOSYOSTATUS_SEIMITU = string;
		return;
	},


	/*----------------------------------------------------------
	 * MIMAMORI_CHARGE_HOSYOSTATUS_SEIMITU　（精密検査受診科）
	 */

	/*
	 * get_MIMAMORI_CHARGE_HOSYOSTATUS_SEIMITU
	 *
	 * 精密検査受診科を返す
	 * 引数：なし
	 *　戻り値：int
	 */

	get_MIMAMORI_CHARGE_HOSYOSTATUS_SEIMITU : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.MIMAMORI_CHARGE_HOSYOSTATUS_SEIMITU;
	},

	/*
	 * set_MIMAMORI_CHARGE_HOSYOSTATUS_SEIMITU
	 *
	 * 精密検査受診科をセットする
	 * 引数：int
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_MIMAMORI_CHARGE_HOSYOSTATUS_SEIMITU : function( num ){
		//※最終的にローカルストレージへ保存
		this.vars.MIMAMORI_CHARGE_HOSYOSTATUS_SEIMITU = num;
		return;
	},


	/*----------------------------------------------------------
	 * SHOW_SHINSA　（補償ステータス更新フラグ）
	 */

	/*
	 * get_SHOW_SHINSA
	 *
	 * 補償ステータス更新フラグを返す
	 * 引数：なし
	 *　戻り値：boolean
	 */

	get_SHOW_SHINSA : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.SHOW_SHINSA;
	},

	/*
	 * set_SHOW_SHINSA
	 *
	 * 補償ステータス更新フラグをセットする
	 * 引数：boolean
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_SHOW_SHINSA : function( bool ){

		//※最終的にローカルストレージへ保存
		this.vars.SHOW_SHINSA = bool;
		return;
	},


	/*----------------------------------------------------------
	 * EJLIST_FLAG　（受診勧奨取得フラグ）
	 */

	/*
	 * get_EJLIST_FLAG
	 *
	 * 受診勧奨取得フラグを返す
	 * 引数：なし
	 *　戻り値：boolean
	 */

	get_EJLIST_FLAG : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.EJLIST_FLAG;
	},

	/*
	 * set_EJLIST_FLAG
	 *
	 * 受診勧奨取得フラグをセットする
	 * 引数：boolean
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_EJLIST_FLAG : function( bool ){

		//※最終的にローカルストレージへ保存
		this.vars.EJLIST_FLAG = bool;
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
	},


	/*----------------------------------------------------------
	 * EJLIST_TOP　（最新の受診勧奨発生日）
	 */

	/*
	 * get_EJLIST_TOP
	 *
	 * 最新の受診勧奨発生日を返す
	 * 引数：なし
	 *　戻り値：string（date形式。"2013-07-31T00:00:00+09:00"）
	 */

	get_EJLIST_TOP : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.EJLIST_TOP;
	},

	/*
	 * set_EJLIST_TOP
	 *
	 * 最新の受診勧奨発生日をセットする
	 * 引数：string（date形式。"2013-07-31T00:00:00+09:00"）
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_EJLIST_TOP : function( string ){
		//※最終的にローカルストレージへ保存
		this.vars.EJLIST_TOP = string;
		return;
	},


	/*----------------------------------------------------------
	 * SHOW_SUSUME　（最新受診勧奨フラグ）
	 */

	/*
	 * get_SHOW_SUSUME
	 *
	 * 最新受診勧奨フラグを返す
	 * 引数：なし
	 *　戻り値：boolean
	 */

	get_SHOW_SUSUME : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.SHOW_SUSUME;
	},

	/*
	 * set_SHOW_SUSUME
	 *
	 * 最新受診勧奨フラグをセットする
	 * 引数：boolean
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_SHOW_SUSUME : function( bool ){

		//※最終的にローカルストレージへ保存
		this.vars.SHOW_SUSUME = bool;
		return;
	},


	/*----------------------------------------------------------
	 * EJLIST_TOP_CHARGE　（最新の勧奨受診科）
	 */

	/*
	 * get_EJLIST_TOP_CHARGE
	 *
	 * 最新の勧奨受診科を返す
	 * 引数：なし
	 *　戻り値：int
	 */

	get_EJLIST_TOP_CHARGE : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.EJLIST_TOP_CHARGE;
	},

	/*
	 * set_EJLIST_TOP_CHARGE
	 *
	 * 最新の勧奨受診科をセットする
	 * 引数：int
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_EJLIST_TOP_CHARGE : function( num ){
		//※最終的にローカルストレージへ保存
		this.vars.EJLIST_TOP_CHARGE = num;
		return;
	},


	/*----------------------------------------------------------
	 * EJLIST_TOP_PROPRIETY1　（最新の受診勧奨（申請可能なもの）発生日）
	 */

	/*
	 * get_EJLIST_TOP_PROPRIETY1
	 *
	 * 最新の受診勧奨（申請可能なもの）発生日を返す
	 * 引数：なし
	 *　戻り値：string（date形式。"2013-07-31T00:00:00+09:00"）
	 */

	get_EJLIST_TOP_PROPRIETY1 : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.EJLIST_TOP_PROPRIETY1;
	},

	/*
	 * set_EJLIST_TOP_PROPRIETY1
	 *
	 * 最新の受診勧奨（申請可能なもの）発生日をセットする
	 * 引数：string（date形式。"2013-07-31T00:00:00+09:00"）
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_EJLIST_TOP_PROPRIETY1 : function( string ){
		//※最終的にローカルストレージへ保存
		this.vars.EJLIST_TOP_PROPRIETY1 = string;
		return;
	},


	/*----------------------------------------------------------
	 * SHOW_SHINSEI　（申請可能勧奨フラグ）
	 */

	/*
	 * get_SHOW_SHINSEI
	 *
	 * 申請可能勧奨フラグを返す
	 * 引数：なし
	 *　戻り値：boolean
	 */

	get_SHOW_SHINSEI : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.SHOW_SHINSEI;
	},

	/*
	 * set_SHOW_SHINSEI
	 *
	 * 申請可能勧奨フラグをセットする
	 * 引数：boolean
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_SHOW_SHINSEI : function( bool ){

		//※最終的にローカルストレージへ保存
		this.vars.SHOW_SHINSEI = bool;
		return;
	},


	/*----------------------------------------------------------
	 * EJLIST_TOP_CHARGE_PROPRIETY1　（最新の申請可能勧奨受診科）
	 */

	/*
	 * get_EJLIST_TOP_CHARGE_PROPRIETY1
	 *
	 * 最新の申請可能勧奨受診科を返す
	 * 引数：なし
	 *　戻り値：int
	 */

	get_EJLIST_TOP_CHARGE_PROPRIETY1 : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.EJLIST_TOP_CHARGE_PROPRIETY1;
	},

	/*
	 * set_EJLIST_TOP_CHARGE_PROPRIETY1
	 *
	 * 最新の申請可能勧奨受診科をセットする
	 * 引数：int
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_EJLIST_TOP_CHARGE_PROPRIETY1 : function( num ){
		//※最終的にローカルストレージへ保存
		this.vars.EJLIST_TOP_CHARGE_PROPRIETY1 = num;
		return;
	},


	/*----------------------------------------------------------
	 * EJLIST_LIMITLIST_JUSHIN　（最新の受診勧奨-発生日10件）
	 */

	/*
	 * get_EJLIST_LIMITLIST_JUSHIN
	 *
	 * 最新の受診勧奨-発生日10件を返す
	 * 引数：なし
	 *　戻り値：string（date形式。"2013-07-31T00:00:00+09:00"）
	 */

	get_EJLIST_LIMITLIST_JUSHIN : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.EJLIST_LIMITLIST_JUSHIN;
	},


	/*
	 * get_EJLIST_LIMITLIST_JUSHIN_RECKONED
	 *
	 * 受診鑑賞可否API一覧に含まれていたRECKONEDを返す
	 * 引数：なし
	 *　戻り値：string（"2013-07-31"）
	 */

	get_EJLIST_LIMITLIST_JUSHIN_RECKONED : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.EJLIST_LIMITLIST_JUSHIN[ this.vars.EJLIST_LIMITLIST_JUSHIN.length - 1 ];
	},


	/*
	 * set_EJLIST_LIMITLIST_JUSHIN
	 *
	 * 最新の受診勧奨-発生日10件をセットする
	 * 引数：array（中身はJSON、最後にRECKONEDを入れる）
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_EJLIST_LIMITLIST_JUSHIN : function( array ){
		//※最終的にローカルストレージへ保存
		this.vars.EJLIST_LIMITLIST_JUSHIN = array;
		return;
	},


	/*----------------------------------------------------------
	 * LAST_CHECK_JUSHIN　（最後に受診期限をチェックした日）
	 */

	/*
	 * get_LAST_CHECK_JUSHIN
	 *
	 * 最後に受診期限をチェックした日を返す
	 * 引数：なし
	 *　戻り値：string（date形式。"2013-07-31T00:00:00+09:00"）
	 */

	get_LAST_CHECK_JUSHIN : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.LAST_CHECK_JUSHIN;
	},

	/*
	 * set_LAST_CHECK_JUSHIN
	 *
	 * 最後に受診期限をチェックした日をセットする
	 * 引数：string（date形式。"2013-07-31T00:00:00+09:00"）
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_LAST_CHECK_JUSHIN : function( string ){
		//※最終的にローカルストレージへ保存
		this.vars.LAST_CHECK_JUSHIN = string;
		return;
	},


	/*----------------------------------------------------------
	 * SHOW_MEDICALLIMIT_FLAG　（受診期限時期表示フラグ）
	 */

	/*
	 * get_SHOW_MEDICALLIMIT_FLAG
	 *
	 * 受診期限時期表示フラグを返す
	 * 引数：なし
	 *　戻り値：boolean
	 */

	get_SHOW_MEDICALLIMIT_FLAG : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.SHOW_MEDICALLIMIT_FLAG;
	},

	/*
	 * set_SHOW_MEDICALLIMIT_FLAG
	 *
	 * 受診期限時期表示フラグをセットする
	 * 引数：boolean
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_SHOW_MEDICALLIMIT_FLAG : function( bool ){

		//※最終的にローカルストレージへ保存
		this.vars.SHOW_MEDICALLIMIT_FLAG = bool;
		return;
	},


	/*----------------------------------------------------------
	 * LAST_CHECK_SHINSEI　（最後に申請期限をチェックした日）
	 */

	/*
	 * get_LAST_CHECK_SHINSEI
	 *
	 * 最後に申請期限をチェックした日を返す
	 * 引数：なし
	 *　戻り値：string（date形式。"2013-07-31T00:00:00+09:00"）
	 */

	get_LAST_CHECK_SHINSEI : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.LAST_CHECK_SHINSEI;
	},

	/*
	 * set_LAST_CHECK_SHINSEI
	 *
	 * 最後に申請期限をチェックした日をセットする
	 * 引数：string（date形式。"2013-07-31T00:00:00+09:00"）
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_LAST_CHECK_SHINSEI : function( string ){
		//※最終的にローカルストレージへ保存
		this.vars.LAST_CHECK_SHINSEI = string;
		return;
	},


	/*----------------------------------------------------------
	 * SHOW_TRUSTLIMIT_FLAG　（申請期限時期表示フラグ）
	 */

	/*
	 * get_SHOW_TRUSTLIMIT_FLAG
	 *
	 * 申請期限時期表示フラグを返す
	 * 引数：なし
	 *　戻り値：boolean
	 */

	get_SHOW_TRUSTLIMIT_FLAG : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.SHOW_TRUSTLIMIT_FLAG;
	},

	/*
	 * set_SHOW_TRUSTLIMIT_FLAG
	 *
	 * 申請期限時期表示フラグをセットする
	 * 引数：boolean
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_SHOW_TRUSTLIMIT_FLAG : function( bool ){

		//※最終的にローカルストレージへ保存
		this.vars.SHOW_TRUSTLIMIT_FLAG = bool;
		return;
	},


	/*----------------------------------------------------------
	 * SHOW_DIAGNOSIS_FLAG　（受診勧奨表示フラグ）
	 */

	/*
	 * get_SHOW_DIAGNOSIS_FLAG
	 *
	 * 受診勧奨表示フラグを返す
	 * 引数：なし
	 *　戻り値：boolean
	 */

	get_SHOW_DIAGNOSIS_FLAG : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.SHOW_DIAGNOSIS_FLAG;
	},

	/*
	 * set_SHOW_DIAGNOSIS_FLAG
	 *
	 * 受診勧奨表示フラグをセットする
	 * 引数：boolean
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_SHOW_DIAGNOSIS_FLAG : function( bool ){

		//※最終的にローカルストレージへ保存
		this.vars.SHOW_DIAGNOSIS_FLAG = bool;
		return;
	},


	/*----------------------------------------------------------
	 * SHOW_SELFCHECK_FLAG　（乳がんチェック時期フラグ）
	 */

	/*
	 * get_SHOW_SELFCHECK_FLAG
	 *
	 * 乳がんチェック時期フラグを返す
	 * 引数：なし
	 *　戻り値：boolean
	 */

	get_SHOW_SELFCHECK_FLAG : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.SHOW_SELFCHECK_FLAG;
	},

	/*
	 * set_SHOW_SELFCHECK_FLAG
	 *
	 * 乳がんチェック時期フラグをセットする
	 * 引数：boolean
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_SHOW_SELFCHECK_FLAG : function( bool ){

		//※最終的にローカルストレージへ保存
		this.vars.SHOW_SELFCHECK_FLAG = bool;
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
	 * 月経予定日をセットする
	 * 引数：string（date形式。"2013-07-31T00:00:00+09:00"）
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_MENSES_DATE : function( string ){

		//ツンデレポイントを加算

		//ツンデレポイント制限回数を加算

		//ポイント最終変更日を現在の日時に変更

		//ツンデレポイントログを出力

		//寄り添いポイント（ファンクション、シーズン）を加算

		//以下を初期化
		//乳がんセルフチェック実施フラグ
		//注意喚起ダイアログ（1）表示日
		//注意喚起ダイアログ（2）フラグ
		//注意喚起ダイアログ（3）フラグ
		//注意喚起ダイアログ（4）フラグ


		//※最終的にローカルストレージへ保存
		this.vars.MENSES_DATE_LIST.push(
			{
				"menses_date": string
			}
		);
		return;
	},










	/* 乳がんチェック */




	/*----------------------------------------------------------
	 * SELFCHECK_RESULT_HISTORY　（乳がんセルフチェック結果履歴）
	 */

	/*
	 * get_SELFCHECK_RESULT_HISTORY
	 *
	 * 乳がんセルフチェック結果履歴を返す
	 * 引数：なし
	 *　戻り値：string(「20120101/Step1症状内容/Step2症状内容/Step3症状内容|20120101/Step1症状内容/Step2症状内容/Step3症状内容」)
	 */

	get_SELFCHECK_RESULT_HISTORY : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.SELFCHECK_RESULT_HISTORY;
	},

	/*
	 * set_SELFCHECK_RESULT_HISTORY
	 *
	 * 乳がんセルフチェック結果履歴をセットする
	 * 引数：string(「20120101/Step1症状内容/Step2症状内容/Step3症状内容|20120101/Step1症状内容/Step2症状内容/Step3症状内容」)
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_SELFCHECK_RESULT_HISTORY : function( string ){
		//※最終的にローカルストレージへ保存
		this.vars.SELFCHECK_RESULT_HISTORY = string;
		return;
	},


	/*----------------------------------------------------------
	 * SELFCHECK_RESULT1　（乳がんチェックStep1選択内容）
	 */

	/*
	 * get_SELFCHECK_RESULT1
	 *
	 * 乳がんチェックStep1選択内容を返す
	 * 引数：なし
	 *　戻り値：string
	 */

	get_SELFCHECK_RESULT1 : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.SELFCHECK_RESULT1;
	},

	/*
	 * set_SELFCHECK_RESULT1
	 *
	 * 乳がんチェックStep1選択内容をセットする
	 * 引数：string
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_SELFCHECK_RESULT1 : function( string ){
		//※最終的にローカルストレージへ保存
		this.vars.SELFCHECK_RESULT1 = string;
		return;
	},


	/*----------------------------------------------------------
	 * SELFCHECK_RESULT2　（乳がんチェックStep2選択内容）
	 */

	/*
	 * get_SELFCHECK_RESULT2
	 *
	 * 乳がんチェックStep2選択内容を返す
	 * 引数：なし
	 *　戻り値：string
	 */

	get_SELFCHECK_RESULT2 : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.SELFCHECK_RESULT2;
	},

	/*
	 * set_SELFCHECK_RESULT2
	 *
	 * 乳がんチェックStep2選択内容をセットする
	 * 引数：string
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_SELFCHECK_RESULT2 : function( string ){
		//※最終的にローカルストレージへ保存
		this.vars.SELFCHECK_RESULT2 = string;
		return;
	},


	/*----------------------------------------------------------
	 * SELFCHECK_RESULT3　（乳がんチェックStep3選択内容）
	 */

	/*
	 * get_SELFCHECK_RESULT3
	 *
	 * 乳がんチェックStep3選択内容を返す
	 * 引数：なし
	 *　戻り値：string
	 */

	get_SELFCHECK_RESULT3 : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.SELFCHECK_RESULT3;
	},

	/*
	 * set_SELFCHECK_RESULT3
	 *
	 * 乳がんチェックStep3選択内容をセットする
	 * 引数：string
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_SELFCHECK_RESULT3 : function( string ){
		//※最終的にローカルストレージへ保存
		this.vars.SELFCHECK_RESULT3 = string;
		return;
	},


	/*----------------------------------------------------------
	 * SELFCHECK_STEP1_RETRY_FLAG　（Step1再試行フラグ）
	 */

	/*
	 * get_SELFCHECK_STEP1_RETRY_FLAG
	 *
	 * Step1再試行フラグを返す
	 * 引数：なし
	 *　戻り値：boolean
	 */

	get_SELFCHECK_STEP1_RETRY_FLAG : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.SELFCHECK_STEP1_RETRY_FLAG;
	},

	/*
	 * set_SELFCHECK_STEP1_RETRY_FLAG
	 *
	 * Step1再試行フラグをセットする
	 * 引数：boolean
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_SELFCHECK_STEP1_RETRY_FLAG : function( bool ){

		//※最終的にローカルストレージへ保存
		this.vars.SELFCHECK_STEP1_RETRY_FLAG = bool;
		return;
	},


	/*----------------------------------------------------------
	 * SELFCHECK_STEP2_RETRY_FLAG　（Step2再試行フラグ）
	 */

	/*
	 * get_SELFCHECK_STEP2_RETRY_FLAG
	 *
	 * Step2再試行フラグを返す
	 * 引数：なし
	 *　戻り値：boolean
	 */

	get_SELFCHECK_STEP2_RETRY_FLAG : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.SELFCHECK_STEP2_RETRY_FLAG;
	},

	/*
	 * set_SELFCHECK_STEP2_RETRY_FLAG
	 *
	 * Step2再試行フラグをセットする
	 * 引数：boolean
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_SELFCHECK_STEP2_RETRY_FLAG : function( bool ){

		//※最終的にローカルストレージへ保存
		this.vars.SELFCHECK_STEP2_RETRY_FLAG = bool;
		return;
	},


	/*----------------------------------------------------------
	 * SELFCHECK_STEP3_RETRY_FLAG　（Step3再試行フラグ）
	 */

	/*
	 * get_SELFCHECK_STEP3_RETRY_FLAG
	 *
	 * Step3再試行フラグを返す
	 * 引数：なし
	 *　戻り値：boolean
	 */

	get_SELFCHECK_STEP3_RETRY_FLAG : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.SELFCHECK_STEP3_RETRY_FLAG;
	},

	/*
	 * set_SELFCHECK_STEP3_RETRY_FLAG
	 *
	 * Step3再試行フラグをセットする
	 * 引数：boolean
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_SELFCHECK_STEP3_RETRY_FLAG : function( bool ){

		//※最終的にローカルストレージへ保存
		this.vars.SELFCHECK_STEP3_RETRY_FLAG = bool;
		return;
	},


	/*----------------------------------------------------------
	 * ACCESS_FLAG　（アクセスフラグ）
	 */

	/*
	 * get_ACCESS_FLAG
	 *
	 * アクセスフラグを返す
	 * 引数：なし
	 *　戻り値：boolean
	 */

	get_ACCESS_FLAG : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.ACCESS_FLAG;
	},

	/*
	 * set_ACCESS_FLAG
	 *
	 * アクセスフラグをセットする
	 * 引数：boolean
	 *　戻り値：通信エラー時のみ'error'
	 */

	set_ACCESS_FLAG : function( bool ){

		//※最終的にローカルストレージへ保存
		this.vars.ACCESS_FLAG = bool;
		return;
	},









	/* 見舞金申請 */




	/*----------------------------------------------------------
	 * MEMBER_INFO　（利用者情報）
	 */

	/*
	 * get_MEMBER_INFO
	 *
	 * 利用者情報を返す
	 * 引数：なし
	 *　戻り値：json形式
	 */

	get_MEMBER_INFO : function(){
		//※最終的にローカルストレージから読み込み
		return this.vars.MEMBER_INFO;
	},


	/*----------------------------------------------------------
	 * COMPENSATION_ENTRY_FEMALE　（女性疾病診断時見舞金申請）
	 */

	/*
	 * post_COMPENSATION_ENTRY_FEMALE
	 *
	 * 女性疾病診断時見舞金申請をPOSTする
	 * 引数：JSON形式　※入力項目以外はNewphoriaで補足して送信
	 		"purchase_day":"2013-10-25"	購入日（端末内保存データ　形式：YYYY-MM-DD）
			"contract_no":"13102500004"	契約番号（端末内保存データ）
			"type":"1"	女性疾病診断時見舞金申請(=1)　固定
			"encouragement_no":"PF20131101000000011"	受診勧奨番号（補償対象とする受診勧奨番号）
			"address":"東京都千代田区１－１－１"	住所
			"postalcode":"1000001"	郵便番号（ハイフンなし）
			"tel":"09011111111"	電話番号（ハイフン無し）
			"visit_day":"2013-10-26"	受診日　形式：YYYY-MM-DD
			"visit_family":"1"	・婦人科(=1)、乳腺外科(=2)
			"hospital":"東大分院"		病院名
			"reason":"理由"	受診理由
			"public_insurance":"1"	公的保険の対象か否か	・対象(=1)・対象外(=2)
			"first_visit":"1"	初診かどうか・初診(=1)・初診以外(=2)
			"prescription":"iVBORw0KGg・・・以下略”	レセプト写真	ユーザーの指定した画像。
				フォーマットは(.ipeg/.png)のみ。Base64で変換しシリアライズ化した文字列を設定してください。
	 *　戻り値：OK（成功）、BAD_REQUEST（失敗）のJSON形式
	 */

	post_COMPENSATION_ENTRY_FEMALE : function( json ){
		//※中間APIへ接続後、結果を返す

		return {
				"result": "OK",
			};

		// 失敗の場合
		/*
		{
			"result": "BAD_REQUEST",
			"data": {
				"errinfo": [
					{
						"column": "propriety",
						"code": "E003S9990055",
						"message": "補償可否判断のサービス購入後チェックでエラーです。"
					}
				]
			}
		}
		*/
	},


	/*----------------------------------------------------------
	 * COMPENSATION_ENTRY_PRECISION　（精密検査診断時見舞金申請）
	 */

	/*
	 * post_COMPENSATION_ENTRY_PRECISION
	 *
	 * 精密検査診断時見舞金申請をPOSTする
	 * 引数：JSON形式　※入力項目以外はNewphoriaで補足して送信
	 		"purchase_day":"2013-10-25"	購入日（端末内保存データ　形式：YYYY-MM-DD）
			"contract_no":"13102500004"	契約番号（端末内保存データ）
			"type":"2"	精密検査診断時見舞金申請(=1)　固定
			"encouragement_no":"PF20131101000000011"	受診勧奨番号（補償対象とする受診勧奨番号）
			"address":"東京都千代田区１－１－１"	住所
			"postalcode":"1000001"	郵便番号（ハイフンなし）
			"tel":"09011111111"	電話番号（ハイフン無し）
			"visit_day":"2013-10-26"	受診日　形式：YYYY-MM-DD
			"visit_family":"1"	・婦人科(=1)、乳腺外科(=2)
			"hospital":"東大分院"		病院名
			"doubt_symptom":"1"	疑いのあるとされた症状	子宮頸がんの疑い(=1)子宮体がんの疑い(=2)
				卵巣腫瘍の疑い(=3)・乳がんの疑い(=4)
			"public_insurance":"1"	公的保険の対象か否か・対象(=1)・対象外(=2)
			"precision_kind":"1"	精密検査種類・コルポスコープ(=1)・内膜組織診(=2)
				・子宮鏡検査（ヒステロスコピー）(=3)・MRI(=4)・CT(=5)・腫瘍マーカー(=6)・穿刺吸引細胞診(=7)
				・針生検(=8)
			"specification_practice":"iVBORw0K・・・以下略 レセプト写真	ユーザーの指定した画像。
				フォーマットは(.ipeg/.png)のみ。Base64で変換しシリアライズ化した文字列を設定してください。
	 *　戻り値：OK（成功）、BAD_REQUEST（失敗）のJSON形式
	 */

	post_COMPENSATION_ENTRY_PRECISION : function( json ){
		//※中間APIへ接続後、結果を返す

		return {
				"result": "OK",
			};

		// 失敗の場合
		/*
		{
			"result": "BAD_REQUEST",
			"data": {
				"errinfo": [
					{
						"column": "propriety",
						"code": "E003S9990060",
						"message": "補償可否判断のサービス購入後チェックでエラーです。"
					},
					{
						"column": "propriety",
						"code": "E003S9990062",
						"message": "補償可否判断の前提条件チェックでエラーです。"
					}
				]
			}
		}

		*/

	},


	/*----------------------------------------------------------
	 * COMPENSATION_ENTRY_GCM　（GCMRegistrationID通知）
	 */

	/*
	 * post_COMPENSATION_ENTRY_PRECISION
	 *
	 * GCMRegistrationIDをPOSTする
	 * 引数：　なし
	 *　戻り値：OK（成功）、BAD_REQUEST（失敗）のJSON形式
	 */

	post_COMPENSATION_ENTRY_PRECISION : function(){
		//※中間APIへ接続後、結果を返す

		//contract_noを付けてPOST

		return {
				"result": "OK",
				"data": {
					"add_count": 0,
					"update_count": 1
				}
			};
	},


});