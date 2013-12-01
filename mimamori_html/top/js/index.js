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
	var syncManager = new SyncManagerModel();
	var CompensationEntry = ModelManager.get("MammaryEncouragementJudgeModel"); //中間API
	var EncouragementJudgeList = ModelManager.get("EncouragementJudgeListModel"); //中間API
	var relayModel_t03 = new RelayModel_tokyo03(); //保存データ

	// CompensationEntry.sync.female.contract_no = "13102500004";	//カラダノキモチサービス契約番号。
	CompensationEntry.func = "confirm";	//固定
	syncManager.addQueue( CompensationEntry );
	syncManager.on("completeServer",function(){
		console.log("complete!");
	});
	syncManager.on("error",function( res ){
		console.log("error" , res );
	});
	syncManager.start();
	syncManager.on("sync_complete",function() {
		var date_local;
		var date_api;
		if (CompensationEntry.vars.female.encouragement_no) {
			date_local = relayModel_t03.get_MIMAMORI_UPDATE_HOSYOSTATUS_JOSEI();
			date_api = CompensationEntry.vars.female.date;
			if (conv_to_time(date_api) > conv_to_time(date_local)) {
				date_local = date_api;
				relayModel_t03.set_SHOW_SHINSA(true);
			}
			//P5
			if (CompensationEntry.vars.precision.encouragement_no) {
				date_local = relayModel_t03.get_MIMAMORI_UPDATE_HOSYOSTATUS_SEIMITU();
				date_api = CompensationEntry.vars.precision.date;
				if (conv_to_time(date_api) > conv_to_time(date_local)) {
					relayModel_t03.set_MIMAMORI_UPDATE_HOSYOSTATUS_SEIMITU(date_api);
					relayModel_t03.set_SHOW_SHINSA(true);
				}
			}
			if ( CompensationEntry.vars.female.encouragement_no !== CompensationEntry.vars.precision.encouragement_no )
			{
				//P5
			}
		}
	});

	EncouragementJudgeList.sync.purchase_day = "2013-10-25";	//起算日。なければサービス購入日。ローカルストレージから取得
	EncouragementJudgeList.sync.contract_no = "13102500004";	//カラダノキモチサービス契約番号。ローカルストレージから取得
	EncouragementJudgeList.func = "get";	//固定
	syncManager.addQueue( EncouragementJudgeList );
	syncManager.on("completeServer",function(){
		console.log("get_encouragement_judge_list complete!");
	});
	syncManager.on("error",function( res ){
		console.log("get_encouragement_judge_list error" , res );
	});
	syncManager.start();
	syncManager.on("sync_complete",function() {
		var judge_list = EncouragementJudgeList.vars.judge_list.slice(0, 100);
		var judge_list_10 = EncouragementJudgeList.vars.judge_list.slice(0, 10);
		var judge;
		var date_local;
		var date_api;
		var i;
		relayModel_t03.set_EJLIST_FLAG = false;
		if (judge_list.reckoned !== relayModel_t03.get_RECKONED()) {
			relayModel_t03.set_RECKONED(judge_list.reckond);
		}
		for (i = 0; i < judge_list.length; i++) {
			judge = judge_list[i];
			if (conv_to_time(judge.female.encouragement_date) > conv_to_time(judge.precision.encouragement_date))
			{
				date_api = judge.female.encouragement_date;
			} else {
				date_api = judge.precision.encouragement_date;
			}
			date_local = relayModel_t03.get_EJLIST_TOP();
			if (conv_to_time(date_api) > conv_to_time(date_local)) {
				relayModel_t03.set_EJLIST_TOP(date_api);
				relayModel_t03.set_SHOW_SUSUME(true);
				relayModel_t03.set_EJLIST_TOP_CHARGE(judge.depratment);
			}
			if (judge.propriety === 1) {
				date_local = relayModel_t03.get_EJLIST_TOP_PROPRIETY1();
				if (conv_to_time(date_api) > conv_to_time(date_local)) {
					relayModel_t03.set_EJLIST_TOP_PROPRIETY1(date_api);
					relayModel_t03.set_SHOW_SHINSEI(true);
					relayModel_t03.set_EJLIST_TOP_CHARGE_PROPRIETY1(judge.depratment);
				}
			}
		}

		for (i = 0; i < judge_list_10.length; i++) {
			date_api = judge_list_10.female.encouragement_date;
			date_local = relayModel_t03.get_LAST_CHECK_JUSHIN();
			if (conv_to_time(date_api) > conv_to_time(date_local)) {
				relayModel_t03.set_SHOW_MEDICALLIMIT_FLAG(true);
			}
			date_api = judge_list_10.precision.encouragement_date;
			date_local = relayModel_t03.get_LAST_CHECK_JUSHIN();
			if (conv_to_time(date_api) > conv_to_time(date_local)) {
				relayModel_t03.set_SHOW_TRUSTLIMIT_FLAG(true);
			}
		}
		relayModel_t03.set_EJLIST_LIMITLIST_JUSHIN = judge_list_10;

	});

	//show dialogs.
	var dd = new Date();
	if (relayModel_t03.getSHOW_DIAGNOSIS_FLAG() === true) {
		showDialog("k002");
	} else if (relayModel_t03.getSHOW_MEDICALLMIIT_FLAG() === true) {
		showDialog("k003");
		relayModel_t03.set_LAST_CHECK_JUSHIN(GMTDateString(getYYYYMMDD()));
	} else if (relayModel_t03.getSHOW_TRUSTLIMIT_FLAG() === true) {
		showDialog("k004");
		relayModel_t03.set_LAST_CHECK_SHINSEI(GMTDateString(getYYYYMMDD()));
	} else if (relayModel_t03.getSHOW_SELFCHECK_FLAG() === true) {
		showDialog("k005");
	}
});
function conv_to_time (date) {
	date.match(/(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)\+09:00/);
	return Date.UTC(RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6);
}
