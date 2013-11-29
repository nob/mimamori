/* ----------------------------------------
 *
 * Router.js
 * URLから切り替えを制御する関数
 *
 ------------------------------------------*/

var SyncManagerModel = Backbone.Model.extend({

	vars : {
		menstrual_cycle : "",
		weather : ""
	},
	queue : null,

	checkCount : 0,

	//初期動作
	initialize : function( opts ){
		//console.log('SyncManager initialize');
		//this.parentModel = opts.parentModel;
		this.queue = [];
	},

	//サーバーから情報を取得するためのModelをQueueに追加
	addQueue : function( model ){
		this.queue.push(model);
	},

	//Queueの先頭から順番にサーバーに情報を取りに行かせる。1つが終わったら次はnextで同様の処理をループさせる
	start : function(){
		// console.log( "SyncManager start" );
		var model = this.queue.pop();
		var that = this;

		model.once('completeServer',function(){
			// console.log( 'SyncManager completeServer' );
			that.next();
		});
		model.once('error',function(res){
			that.queue = [];
			that.trigger('error',res);
		});
		model.loadServer();
	},

	//2回目以降のQueueの処理
	next : function(){
		var model = this.queue.pop();
		var that = this;

		//まだQueueがある場合
		if(model){
			model.once('completeServer',function(){
				// console.log( 'SyncManager completeServer' );
				that.next();
			});
			// console.log( 'SyncManagerModel next' );
			model.loadServer();
		}
		//Queueが空になったら完了処理
		else{
			console.log( "SyncManager Queu end" );
			this.trigger('sync_complete');
		}
	}

});
