var ContentsModel = Backbone.Model.extend({
	defaults: {
		url : { get : '/api/contents/checkcontents' }
	},

	vars : {
		/*
		 app_voice_version_100	:""
		,app_voice_version_101	:""
		,app_voice_version_102	:""
		,app_voice_version_103	:""
		,app_voice_version_104	:""
		,app_voice_version_105	:""
		,app_voice_version_106	:""
		,app_voice_version_107	:""
		,app_voice_version_108	:""
		,app_voice_version_109	:""
		,last_access_date		:""	//カラダボイスデータダウンロード日
		*/
	},

	sync : {
			 contract_no			:"13102500004"
			,app_voice_version_100	:"1"
			,app_voice_version_101	:"2"
			,app_voice_version_102	:"2"
			,app_voice_version_103	:"2"
			,app_voice_version_104	:"2"
			,app_voice_version_105	:"2"
			,app_voice_version_106	:"2"
			,app_voice_version_107	:"2"
			,app_voice_version_108	:"2"
			,app_voice_version_109	:"2"
	},

	sql :	"",

	func		:"",

	flag		:{
		last_access_date	:"20131125"
	},

	loadServer : function(){

		console.log( "ContentsModel..." );
		var that = this;

		if(that.func=='get'){

			that.loadServer_get();

		}
	},

	loadServer_get :function(){
		var that = this;
		var now = new Date();
		var today =getYYYYMMDD(now);

		if(today > that.flag.last_access_date){
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
						that.sql						= res.data.sql;
						that.vars.app_voice_version_100	= res.data.version[100];
						that.vars.app_voice_version_101	= res.data.version[101];
						that.vars.app_voice_version_102	= res.data.version[102];
						that.vars.app_voice_version_103	= res.data.version[103];
						that.vars.app_voice_version_104	= res.data.version[104];
						that.vars.app_voice_version_105	= res.data.version[105];
						that.vars.app_voice_version_106	= res.data.version[106];
						that.vars.app_voice_version_107	= res.data.version[107];
						that.vars.app_voice_version_108	= res.data.version[108];
						that.vars.app_voice_version_109	= res.data.version[109];
						that.vars.last_access_date		= today;
						//console.log( that.flag.last_access_date );
						//console.log( that.vars );
						//console.log( that.sql );
						that.trigger( 'completeServer' );

					}else{
						alert('入力エラー');
						that.trigger( 'error' );
					}
				}
			});
		}else{
			that.trigger( 'completeServer' );
		}
	}

});
(function(){
	var model = new ContentsModel();
	window.model["ContentsModel"] = model;
}());