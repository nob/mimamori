$(document).ready(function() {
/*
	$("#watchTabBt1 a").click(function () {
		$('#watchTab1').css("display",'block');
		$('#watchTab2').css("display",'none');
		return false;
	});
	$("#watchTabBt2 a").click(function () {
		$('#watchTab2').css("display",'block');
		$('#watchTab1').css("display",'none');
		return false;
	});
*/
	/* ------------------------------------------------------------
	 * 補償申込みステータス確認
	 */

	$('#get_encouragement_status').on('click',function(){

		//SyncManagerを同期用確認に設定
		var syncManager = new SyncManagerModel();
		var that = this;

		// ------- 情報をセットしてsyncManagerのQueueに追加 ------
		var CompensationEntry = ModelManager.get("CompensationEntryModel");
		CompensationEntry.sync.contract_no = "13102500004";	//カラダノキモチサービス契約番号。ローカルストレージから取得
		CompensationEntry.func = "confirm";	//固定
		syncManager.addQueue( CompensationEntry );

		//個別の完了（個別Modelから実行される）
		syncManager.on('completeServer',function(){
			console.log( 'get_encouragement_status complete!' );
		});

		//個別のエラー（個別Modelから実行される）
		syncManager.on('error',function( res ){
			console.log( 'get_encouragement_status error' , res );
		});

		//Queueを開始
		syncManager.start();

		//全てのQueueが完了したらイベント発生
		syncManager.on('sync_complete',function(){
			console.log( "■get_encouragement_status completed. confirm_data:" , CompensationEntry.vars.confirm_data );
		});
	});



});
