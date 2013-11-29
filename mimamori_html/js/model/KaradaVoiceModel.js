var KaradaVoiceModel = Backbone.Model.extend({

	vars : {
	},

	initialize: function(opts){

		var that = this;
		this.router = opts.router;

		//karadaVoiceViewから実行される
		this.router.on('mainview_karadaVoice_pickup', function( pickupFlag ){
			that.pickup( pickupFlag );
		});
	},

	pickup : function( pickupFlag ){

		/*
		 * 抽出フロー
		 */

		console.log('karadaVoiceModel check' , pickupFlag );

		//初期化
		var priorityCount = 1;	//優先順位の条件フラグ。6は不足のため同一テーマをクリアした状態
		var data;	//抽出条件
		var selectedArray = [];	//抽出されたボイス
		var selectedGenreArray = [ 0,0,0,0,0,0,0,0,0,0 ];	//同一ジャンル監視用
		var selectedIdArray = [];	//すでに抽出されたボイスのIDを格納。監視用
		var selectedThemeArray = [];	//すでに抽出されたボイスのtheme1、theme2を格納。監視用
		var dateMMDD;

		if ( pickupFlag == "pickup_seasonality" ){
			//シーズナリティチェックのため、1日追加した日付で抽出
			var today = new Date();
			dateMMDD = getMMDD( new Date(today.getTime() + (24 * 60 * 60 * 1000)) );
		}else{
			dateMMDD = getMMDD( new Date() );
		}

		var that = this;
		var relayModel = new RelayModel();

		relayModel.set_VOICE_LASTBALLOON_DATE();

		//現在期で初めての起動か？
		if( pickupFlag == "pickup_reset" ){
			//reset
			relayModel.remove_VOICE_DO_ARRAY();
			relayModel.remove_VOICE_SKIP_ARRAY();
			relayModel.remove_VOICE_THEME_ARRAY();
		}

		//WebSQKから抽出
		data = [
			"1",	//公開フラグ（固定）
			relayModel.get_TERM(),	//月経周期
			dateMMDD,	//当日(開始日比較用)
			dateMMDD,	//当日(終了日比較用)
			dateMMDD,	//当日(終了日比較用)
			getTimeCode(),	//時間
			relayModel.get_WEATHER_3HOUR()	//天気
			/*
			'1',	//公開フラグ
			'1',	//月経周期
			"1122",	//当日(開始日比較用)
			"1122",	//当日(終了日比較用)
			"1122",	//当日(終了日比較用)
			'1',	//時間
			'1'	//天気
			*/
		];

		relayModel.get_VOICE( priorityCount , data , pickUpComplete )

		function pickUpComplete( list ){

			//console.log( 'pickUpComplete' , list )

			//ランダムに並び替え
			//list = _.shuffle( list );

			//console.log( 'shuffle' , list )

			for ( var i = 0, len = list.length; i < len; i++ ){
				//console.log( i , "genre" , list[i].genre );
				var genreID = list[i].genre;
				var checkIDFlag = _.indexOf( selectedIdArray , list[i].id );
				var checkDoFlag = relayModel.check_VOICE_DO_ARRAY( list[i].id.toString() );
				var checkSkipFlag = relayModel.check_VOICE_SKIP_ARRAY( list[i].id.toString() );
				var checkTheme1Flag = -1;
				var checkSelectedTheme1Flag = -1;
				var checkTheme2Flag = -1;
				var checkSelectedTheme2Flag = -1;

				//console.log( "" );
				//console.log( '■' + i + ' id/' + list[i].id + ' theme/★' + list[i].theme1 + ".★" + list[i].theme2 + ' genre/' + list[i].genre );

				//やる、スキップされた同一テーマ、今回選択されている同一テーマをチェック
				if( list[i].theme1 != "" ){
					var checkTheme1Flag = relayModel.check_VOICE_THEME_ARRAY( list[i].theme1.toString() );
					var checkSelectedTheme1Flag = _.indexOf( selectedThemeArray , list[i].theme1 );
				}
				if( list[i].theme2 != "" ){
					var checkTheme2Flag = relayModel.check_VOICE_THEME_ARRAY( list[i].theme2.toString() );
					var checkSelectedTheme2Flag = _.indexOf( selectedThemeArray , list[i].theme2 );
				}

				//console.log( "check" , checkIDFlag , checkDoFlag , checkSkipFlag , checkTheme1Flag , checkSelectedTheme1Flag , checkTheme2Flag , checkSelectedTheme2Flag )

				//すでに追加されているIDではない、かつ同一ジャンルがすでに2つ登録されていない、かつ「やる」、「スキップ」に登録されていなければ追加
				if( checkIDFlag == -1 && selectedGenreArray[ genreID ] < 2 && checkDoFlag == -1 && checkSkipFlag == -1 && checkTheme1Flag == -1 && checkTheme1Flag == -1 ){
					//優先順位6なら同一テーマでも追加
					if ( priorityCount == 6 ){
						//console.log( '＋＋＋＋＋ボイスを追加（優先順位6）' );
						selectedArray.push( list[i] );
						selectedIdArray.push( list[i].id );
						selectedGenreArray[ genreID ] = selectedGenreArray[ genreID ] + 1;
						//console.log( 'selectedIdArray' , selectedIdArray , 'selectedThemeArray' , selectedThemeArray , 'selectedGenreArray' , selectedGenreArray );
					//優先順位5以下で「同一テーマ」になければ追加
					}else if ( checkSelectedTheme1Flag == -1 && checkSelectedTheme2Flag == -1 ){
						//console.log( '＋＋＋＋＋ボイスを追加' );
						selectedArray.push( list[i] );
						selectedIdArray.push( list[i].id );
						selectedGenreArray[ genreID ] = selectedGenreArray[ genreID ] + 1;
						if( list[i].theme1 != "" ){
							selectedThemeArray.push( list[i].theme1 );
						}
						if( list[i].theme2 != "" ){
							selectedThemeArray.push( list[i].theme2 );
						}
						//console.log( 'selectedIdArray' , selectedIdArray , 'selectedThemeArray' , selectedThemeArray , 'selectedGenreArray' , selectedGenreArray );
					}
				}

				//チェック用（同一ジャンル）
				/*
				if( checkIDFlag != -1 ){
					console.log( '既に抽出されたIDです' );
				}
				if( selectedGenreArray[ genreID ] == 2 ){
					console.log( '同一ジャンルがすでに2つあります' );
				}
				if( checkDoFlag != -1 ){
					console.log( '一度DOをしたボイスです' );
				}
				if( checkSkipFlag != -1 ){
					console.log( '一度SKIPをしたボイスです' );
				}
				if( checkTheme1Flag != -1　|| checkTheme2Flag != -1 ){
					console.log( '同一のテーマが過去に実行されています' + ' theme/★' + list[i].theme1 + ".★" + list[i].theme2 + ' / ' + relayModel.get_VOICE_THEME_ARRAY() + ' / ' );
				}
				if( checkSelectedTheme1Flag != -1　|| checkSelectedTheme2Flag != -1 ){
					console.log( '同一のテーマがすでに表示されています' + ' theme/★' + list[i].theme1 + ".★" + list[i].theme2 + ' / ' + selectedThemeArray );
				}
				*/

				if ( selectedArray.length == 6 ){
					break;
				}
			}
			console.log( 'この条件で抽出終了' , selectedArray );

			//抽出されたボイスが6個になったら、もしくは同一テーマをクリアしても6個未満の場合は終了
			if ( selectedArray.length == 6 || priorityCount == 6 ){
				console.log( 'ボイスが6個抽出、もしくは同一テーマをクリアしたので終了' );
				//that.vars.displayFlg = false;
				$('#karadaVoiceContainer').removeClass('disabled');
				//viewに描画指示
				that.router.trigger('mainview_karadaVoice_start', selectedArray );

			//優先順位5まで探しても無かったら同一テーマをクリア
			} else if ( priorityCount == 5 ){
				console.log( '優先順位5まで検索したが、6個未満なので同一テーマとスキップしたボイスをクリア' );
				relayModel.remove_VOICE_SKIP_ARRAY();
				relayModel.remove_VOICE_THEME_ARRAY();
				selectedThemeArray = [];
				priorityCount = 6;
				relayModel.get_VOICE( priorityCount , data , pickUpComplete );

			//抽出ボイスが6個未満、かつ優先順位5未満の場合は優先順位を変えて抽出
			} else {
				console.log( '抽出ボイスが6個未満、かつ優先順位5未満の場合は優先順位を変えて抽出' );
				priorityCount++;
				relayModel.get_VOICE( priorityCount , data , pickUpComplete );
			}

		}

	}



});