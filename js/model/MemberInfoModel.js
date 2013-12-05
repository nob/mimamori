var MemberInfoModel = Backbone.Model.extend({
	defaults: {
		url : { get : '/api/member_info/get' ,
				add: '/api/member_info/add'}
	},
	vars : {
		family_name		: "",
        name			: "",
        family_name_kana: "",
        name_kana		: "",
        address			: "",
        postalcode		: "",
        tel				: ""
	},

	sync : {
		contract_no 	: "13102500004",
		family_name		: "坂下",
	    name			: "竜馬",
	    family_name_kana: "サカモト",
	    name_kana		: "リョウマ"
	},

	func		:"",

	flag		:{

	},

	loadServer : function(){

		console.log( "MemberInfoModel..." );
		var that = this;

		if(that.func=='get'){

			that.loadServer_get();

		}else if(that.func=='add'){

			that.loadServer_add();

		}

	},

	loadServer_get :function(){
		var that = this;
		$.ajax({
			cache : false,
			type : 'POST',
			data : {"contract_no":that.sync.contract_no
					},
			dataType: 'json',
			url   : that.defaults.url.get,
			success: function(res){
				//console.log( res );
				if(res.result == 'OK'){
					that.vars.family_name		= res.data.datas[0].family_name;
					that.vars.name				= res.data.datas[0].name;
					that.vars.family_name_kana	= res.data.datas[0].family_name_kana;
					that.vars.name_kana			= res.data.datas[0].name_kana;
					that.vars.address			= res.data.datas[0].address;
					that.vars.postalcode		= res.data.datas[0].postalcode;
					that.vars.tel				= res.data.datas[0].tel;
					//console.log( that.vars )
					that.trigger( 'completeServer' );
				}else{
					alert('入力エラー');
					that.trigger( 'error' , res );
				}
			}
		})
	},

	loadServer_add :function(){
		var that = this;
		$.ajax({
			cache : false,
			type : 'POST',
			contentType : 'application/json',
			data : JSON.stringify(that.sync),
			dataType: 'json',
			url   : that.defaults.url.add,
			success: function(res){
				//console.log( res );
				if(res.result == 'OK'){
					that.trigger( 'completeServer' , res );
				}else{
					alert('入力エラー');
					that.trigger( 'error' , res );
				}
			}
		})
	}
});
(function(){
	var model = new MemberInfoModel();
	window.model["MemberInfoModel"] = model;
}());