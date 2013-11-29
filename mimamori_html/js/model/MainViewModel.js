var MainViewModel = Backbone.Model.extend({

	vars : {
		//天気や生理日などの情報が入る
	},

	initialize: function(opts){

		var that = this;
		this.router = opts.router;

		this.router.on('mainview_model_check', function(){
			that.check();
		});

	},

	check : function(){

		console.log('mainViewModel check');



		this.sync();

		/*
		************* タスク *****************

		その他、描画が必要かどうかを判定する。

		・前回アクセス時から1時間経過しているか。

		・前回アクセス時から日付が変わっているか。

		・前回表示時からツンデレポイント、シーズンポイントは変わっていないか。

		*/

	},

	sync : function(){

		console.log('mainViewModel sync');

		var that = this;
		var relayModel = new RelayModel();
		var todayYYYYMMDD = getYYYYMMDD( new Date() );
		var todayMMDD = getMMDD( new Date() );

		//SyncManagerを同期用確認に設定
		var syncManager = new SyncManagerModel();


		/*
		 *	各判定で必要に応じてサーバー通信
		 */

		// ------- アクセスフラグの更新 ------

		//天気経過時間計算用にミリ秒の時間も定義
		var lastAccessDateMiri = new Date( relayModel.get_ACCESS_FLAG_DATE() ).getTime();
		relayModel.set_ACCESS_FLAG_DATE( GMTDateString( new Date() ) );
		var nowAccessDateMiri = new Date( GMTDateString( new Date() ) ).getTime();


		// ------- カラダボイス ------

		var lastVoiceDLDate = relayModel.get_VOICE_DOWLOAD_DATE();
		var nowVoiceDLDate = todayYYYYMMDD;
		//console.log( lastVoiceDLDate , nowVoiceDLDate );

		//ダウンロード日を比較し、不一致であればバージョン比較へ
		if ( lastVoiceDLDate != nowVoiceDLDate ){
			console.log( 'Contents / 取得日付不一致のためサーバーと通信する' )
			//バージョン比較
			var contents = ModelManager.get("ContentsModel");
			var contentsVersionArray = relayModel.get_VOICE_VERSION_ARRAY().split(",");
			contents.sync = {
				 contract_no : relayModel.get_CONTRACT_NO()
				,app_voice_version_100	: contentsVersionArray[0]
				,app_voice_version_101	: contentsVersionArray[1]
				,app_voice_version_102	: contentsVersionArray[2]
				,app_voice_version_103	: contentsVersionArray[3]
				,app_voice_version_104	: contentsVersionArray[4]
				,app_voice_version_105	: contentsVersionArray[5]
				,app_voice_version_106	: contentsVersionArray[6]
				,app_voice_version_107	: contentsVersionArray[7]
				,app_voice_version_108	: contentsVersionArray[8]
				,app_voice_version_109	: contentsVersionArray[9]
			}
			contents.func = 'get';
			//contents.flag.last_access_date = relayModel.get_VOICE_DOWLOAD_DATE();
			syncManager.addQueue( contents );
		}else{
			console.log( 'Contents / 取得日付一致なので通信しない' )
		}


		// ------- 周期リズム・勧奨データ取得 ------

		//API取得フラグがtrueか
		if( relayModel.get_EJLIST_FLAG() == 1 ){
			console.log( 'MainData / API取得フラグがtrueなのでサーバーと通信する')
			var mainData = ModelManager.get("MainDataModel");
			mainData.sync = {
				contract_no 		: relayModel.get_CONTRACT_NO(),
				purchase_date  		: relayModel.get_SERVICE_DATE(),
				r_recommend_flag 	: relayModel.get_CONTROL_CONNECT_RR(),
				ejlist_flag			: relayModel.get_EJLIST_FLAG(),
				cycle_avg			: relayModel.get_CYCLE_AVG()
			}
			mainData.func = 'get';
			syncManager.addQueue( mainData );
		}else{
			console.log( 'MainData / API取得フラグがfalseなので通信しない')
		}


		// ------- 天気 ------

		//条件： 前回アクセスした時間から1時間経過しているか
		if( nowAccessDateMiri - lastAccessDateMiri > 3600000 ){
			console.log( 'Weather / 1時間経過によりサーバーと通信する')
			var weather = ModelManager.get("WeatherModel");
			weather.sync.loc_code = getPointCode( relayModel.get_REGION() );
			syncManager.addQueue( weather );
		}else{
			console.log( 'Weather / 1時間経過していないので通信しない')
		}


		// ------- 会員データ ------

		//生年月日、性別、ログインIDが端末に保存されているか
		if( relayModel.get_LOGIN_ID() == null || relayModel.get_BIRTHDAY() == null || relayModel.get_USERDATA_SEX() == null ){
			console.log( 'userInfo / 生年月日、性別、ログインIDが保存されていないのでサーバーと通信する')
			var userInfo = ModelManager.get("UserInfoModel");
			userInfo.sync.contract_no = relayModel.get_CONTRACT_NO();
			userInfo.func = "get";
			syncManager.addQueue( userInfo );
		}else{
			console.log( 'userInfo / 生年月日、性別、ログインIDが保存されているので通信しない')
		}



		//個別の完了（個別Modelから実行される）
		syncManager.on('completeServer',function(){
			//console.log( 'syncManager complete!' )
		});

		//個別のエラー（個別Modelから実行される）
		syncManager.on('error',function(){
			console.log( 'syncManager error' )
		});

		//Queuを開始
		syncManager.start();

		//全てのQueuが完了したらイベント発生
		syncManager.on('sync_complete',function(){
			console.log( 'fire! sync_complete');

			// ------- カラダボイス ------

			//varsに値が入っていた（更新された）場合はローカルストレージに保存
			if( contents != undefined ){
				console.log( "contents保存処理" , contents.vars )
				relayModel.set_VOICE( contents.sql );
				var appvoiceVersionArray = [
					contents.vars.app_voice_version_100,
					contents.vars.app_voice_version_101,
					contents.vars.app_voice_version_102,
					contents.vars.app_voice_version_103,
					contents.vars.app_voice_version_104,
					contents.vars.app_voice_version_105,
					contents.vars.app_voice_version_106,
					contents.vars.app_voice_version_107,
					contents.vars.app_voice_version_108,
					contents.vars.app_voice_version_109
				]
				relayModel.set_APPVOICE_VERSION_ARRAY( appvoiceVersionArray );
				relayModel.set_VOICE_DOWLOAD_DATE( contents.last_access_date );
				//reset
				contents.vars = {};
				contents.sql = "";
				contents.func = "";
				contents.flag.last_access_date = "";
			}

			// ------- 周期リズム・勧奨データ ------
			//varsに値が入っていた（更新された）場合はローカルストレージに保存
			if( mainData != undefined ){
				console.log( "mainData保存処理" , mainData.vars );

				//生理日周期APIの戻り値
				var menstrucalCycle = mainData.vars.menstrucal_cycle.data;
				relayModel.set_ANALYSIS_STATUS ( menstrucalCycle.analysis_status );
				relayModel.set_SEASON_DAYS({
					ranhou1_zen_days: menstrucalCycle.stage_days.ranhou1_zen_days,
					ranhou1_kou_days: menstrucalCycle.stage_days.ranhou1_kou_days,
					ranhou2_zen_days: menstrucalCycle.stage_days.ranhou2_zen_days,
					ranhou2_kou_days: menstrucalCycle.stage_days.ranhou2_kou_days,
					outai1_zen_days: menstrucalCycle.stage_days.outai1_zen_days,
					outai2_zen_days: menstrucalCycle.stage_days.outai2_zen_days,
					outai2_kou_days: menstrucalCycle.stage_days.outai2_kou_days
				});
				relayModel.set_LAST_MENSES_DATE( menstrucalCycle.stage_days.latest_menses_date )
				relayModel.set_TERM();

				//reset
				mainData.vars = {};
			}

			// ------- 天気 ------
			//varsに値が入っていた（更新された）場合はローカルストレージに保存
			if ( weather != undefined ){
				console.log( "weather保存処理" , weather.vars );
				relayModel.set_WEATHER_3HOUR( weather.vars.point_value );
				relayModel.set_WEATHER_1DAY( weather.vars.oneday_value );
				//reset
				weather.vars = {};
			}

			// ------- 会員情報 ------
			//varsに値が入っていた（更新された）場合はローカルストレージに保存
			if ( userInfo != undefined ){
				console.log( "userInfo保存処理" , userInfo.vars );
				relayModel.set_LOGIN_ID( userInfo.vars.prefecture );
				relayModel.set_BIRTHDAY( userInfo.vars.birthday );
				relayModel.set_USERDATA_SEX( userInfo.vars.sex );
				//reset
				userInfo.vars = {};
			}

			// ------- 誕生日判定 ------
			if ( relayModel.get_BIRTHDAY() == todayYYYYMMDD ){
				relayModel.set_BIRTHDAY_FLAG( 1 );
			}else{
				relayModel.set_BIRTHDAY_FLAG( 0 );
			}

			// ------- イベント判定 ------
			//クリスマス
			if ( todayMMDD >= 1218 && todayMMDD <= 1225 ){
				relayModel.set_WATASHI_EVENT(1);
			//ハロウィン
			}else if( todayMMDD >= 1024 && todayMMDD <= 1031 ){
				relayModel.set_WATASHI_EVENT(2);
			//ニューイヤー
			}else if( Number(todayMMDD) >= 101 && Number(todayMMDD) <= 107 ){
				relayModel.set_WATASHI_EVENT(3);
			}else{
				relayModel.set_WATASHI_EVENT(0);
			}
			//console.log( 'WATASHI_EVENT' , relayModel.get_WATASHI_EVENT() );

			//描画開始イベントを立たせる
			that.router.trigger('mainview_rendering_setup_ok');
		})
	}
});