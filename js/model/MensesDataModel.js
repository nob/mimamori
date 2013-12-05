var MensesDataModel = Backbone.Model.extend({
	defaults: {
		url : { get : '/api/menses_data/get' ,
				add: '/api/menses_data/add',
				edit: '/api/menses_data/edit',
				delete: '/api/menses_data/delete'
				}
	},
	vars : {
		/*
		menses_data:""
		*/
	},

	sync : {
		add_date	:"2011-12-08T00:00:00+09:00",
		delete_date	:"2011-12-07T00:00:00+09:00"
	},

	func		:"",

	flag		:{

	},

	loadServer : function(){

		//console.log( "MensesDataModel..." );
		var that = this;

		if(that.func=='get'){

			that.loadServer_get();

		}else if(that.func=='add'){

			that.loadServer_add();

		}else if(that.func=='edit'){

			that.loadServer_edit();

		}else if(that.func=='delete'){

			that.loadServer_delete();
		}
	},

	loadServer_get :function(){
		var that = this;
		$.ajax({
			cache : false,
			type : 'GET',
			dataType: 'json',
			url   : that.defaults.url.get,
			success: function(res){
				//console.log( res );
				if(res.result == 'OK'){
					that.vars.menses_data		= res.data.datas;
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
					that.trigger( 'completeServer' );
				}else{
					alert('入力エラー');
					that.trigger( 'error' , res );
				}
			}
		})
	},

	loadServer_edit :function(){
		var that = this;
		$.ajax({
			cache : false,
			type : 'POST',
			contentType : 'application/json',
			data : JSON.stringify(that.sync),
			dataType: 'json',
			url   : that.defaults.url.edit,
			success: function(res){
				console.log( res );
				if(res.result == 'OK'){
					that.trigger( 'completeServer' );
				}else{
					alert('入力エラー');
					that.trigger( 'error' , res );
				}
			}
		})
	},

	loadServer_delete :function(){
		console.log( this.sync.delete_date )
		var that = this;
		$.ajax({
			cache : false,
			type : 'POST',
			contentType : 'application/json',
			data : JSON.stringify(that.sync),
			dataType: 'json',
			url   : that.defaults.url.delete,
			success: function(res){
				console.log( res );
				if(res.result == 'OK'){
					that.trigger( 'completeServer' );
				}else{
					alert('入力エラー');
					that.trigger( 'error' , res );
				}
			}
		})
	}
});
(function(){
	var model = new MensesDataModel();
	window.model["MensesDataModel"] = model;
}());