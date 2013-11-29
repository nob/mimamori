$(document).ready( function() {
	$(".touchActive").on("touchend",function(e){});

	var aTags = $('a');
	aTags.each(function(){
		var url = $(this).attr('href');
		$(this).removeAttr('href');
		$(this).click(function(){
			location.href = url;
		});
	});


	$("label").click(function() {});

});

/*----------------------------------------------------------
 * Date関連
 */

function getYYYYMMDD(date){

	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = ('0' + m).slice(-2);
	var d = date.getDate();
	return y+m+d;
}

function getMMDD(date){

	var m = date.getMonth() + 1;
	m = ('0' + m).slice(-2);
	var d = date.getDate();
	return m+d;
}

// ISO8601形式の日時を返す（GMT時間）
function GMTDateString(d){
	function pad(n){return n<10 ? '0'+n : n}
	return d.getFullYear()+'-'
	+ pad(d.getMonth()+1)+'-'
	+ pad(d.getDate())+'T'
	+ pad(d.getHours())+':'
	+ pad(d.getMinutes())+':'
	+ pad(d.getSeconds())+'+09:00'
}

// ISO8601形式の日時を返す（UTC時間）
function UTCDateString(d){
	function pad(n){return n<10 ? '0'+n : n}
	return d.getUTCFullYear()+'-'
	+ pad(d.getUTCMonth()+1)+'-'
	+ pad(d.getUTCDate())+'T'
	+ pad(d.getUTCHours())+':'
	+ pad(d.getUTCMinutes())+':'
	+ pad(d.getUTCSeconds())+'Z'
}

// GMT ⇒ UTC
function changeGMTDateToUTCDate(gmt_date){
	function pad(n){return n<10 ? '0'+n : n}

	var datetime = gmt_date.split("T");
	var date = datetime[0].split("-");
	var time_tmp = datetime[1].split("+");
	var time = time_tmp[0].split(":");

	var year  = parseInt(date[0]);
	var month = parseInt(date[1]);
	var day   = parseInt(date[2]);
	var hour  = parseInt(time[0]);
	var min   = parseInt(time[1]);
	var sec   = parseInt(time[2]);

	var obj = new Date();
	obj.setFullYear(year);
	obj.setMonth(month - 1);
	obj.setDate(day);
	obj.setHours(hour - 9);	// UTCに戻すため9時間マイナス
	obj.setMinutes(min);
	obj.setSeconds(sec);

	var utc_date = pad(obj.getFullYear())	+ '-'
				 + pad(obj.getMonth()+1)	+ '-'
				 + pad(obj.getDate())		+ 'T'
				 + pad(obj.getHours())		+ ':'
				 + pad(obj.getMinutes())	+ ':'
				 + pad(obj.getSeconds())	+ 'Z';

	return utc_date
}


/*----------------------------------------------------------
 * 現在の時を時間コードに変換
 */

function getTimeCode(){
	var hour = new Date().getHours();
	if( hour >= 4 && hour < 10 ){
		return "1";
	}else if( hour >= 10 && hour < 16 ){
		return "2";
	}else if( hour >= 16 && hour < 18 ){
		return "3";
	}else {
		return "4";
	}
}




/*----------------------------------------------------------
 * 地域コードを天気用文字列に変換
 */

function getPointCode( num ){

	switch ( num ) {
		// 0	JP.WKK,		//稚内,
		case "1":	return "JP.ASHKW";	break;	//旭川,
		case "2":	return "JP.RMI";	break;	//留萌,
		case "3":	return "JP.SAPP";	break;	//札幌,
		case "4":	return "JP.IWMZW";	break;	//岩見沢,
		case "5":	return "JP.KUCCH";	break;	//倶知安
		case "6":	return "JP.ABI";	break;	//網走
		case "7":	return "JP.KTM";	break;	//北見
		case "8":	return "JP.MBU";	break;	//紋別
		case "9":	return "JP.NMR";	break;	//根室
		case "10":	return "JP.KUS";	break;	//釧路
		case "11":	return "JP.OBHR";	break;	//帯広
		case "12":	return "JP.MUR";	break;	//室蘭
		case "13":	return "JP.URKW";	break;	//浦河
		case "14":	return "JP.HAK";	break;	//函館
		case "15":	return "JP.ESSH";	break;	//江差
		// 1 青森県		//// 1 青森県
		case "16":	return "JP.AOM";	break;	//青森
		case "17":	return "JP.MTS";	break;	//むつ
		case "18":	return "JP.HAC";	break;	//八戸
		// 2 岩手県		//// 2 岩手県
		case "19":	return "JP.MRIOK";	break;	//盛岡
		case "20":	return "JP.MIY";	break;	//宮古
		case "21":	return "JP.OFU";	break;	//大船渡
		// 3 宮城県		//// 3 宮城県
		case "22":	return "JP.SEN";	break;	//仙台
		case "23":	return "JP.SROISH";break;	//白石
		// 4 秋田県		//// 4 秋田県
		case "24":	return "JP.AKI";	break;	//秋田
		case "25":	return "JP.YKTE";	break;	//横手
		// 5 山形県		//// 5 山形県
		case "26":	return "JP.YAMG";	break;	//山形
		case "27":	return "JP.YNZW";	break;	//米沢
		case "28":	return "JP.SKT";	break;	//酒田
		case "29":	return "JP.SHNJ";	break;	//新庄
		// 6 福島県		//// 6 福島県
		case "30":	return "JP.FKH";	break;	//福島
		case "31":	return "JP.ONA";	break;	//小名浜
		case "32":	return "JP.AIZWKM";break;	//若松
		// 7 茨城県		//// 7 茨城県
		case "33":	return "JP.MITO";	break;	//水戸
		case "34":	return "JP.TCUR";	break;	//土浦
		// 8 栃木県		//// 8 栃木県
		case "35":	return "JP.UTSNMY";break;	//宇都宮
		case "36":	return "JP.OHTWR";	break;	//大田原
		// 9 群馬県		//// 9 群馬県
		case "37":	return "JP.MAEBSH";break;	//前橋
		case "38":	return "JP.NMT";	break;	//みなかみ
		// 10 埼玉県		//// 10 埼玉県
		case "39":	return "JP.SAI";	break;	//さいたま
		case "40":	return "JP.KMGY";	break;	//熊谷
		case "41":	return "JP.CHCHB";	break;	//秩父
		// 11 千葉県		//// 11 千葉県
		case "42":	return "JP.CHI";	break;	//千葉
		case "43":	return "JP.COS";	break;	//銚子
		case "44":	return "JP.TYM";	break;	//館山
		// 12 東京都		//// 12 東京都
		case "45":	return "JP.TOK";	break;	//東京
		case "46":	return "JP.OIS";	break;	//大島
		case "47":	return "JP.HHJ";	break;	//八丈島
		case "48":	return "JP.CHIJ";	break;	//父島
		// 13 神奈川県		//// 13 神奈川県
		case "49":	return "JP.YOK";	break;	//横浜
		case "50":	return "JP.ODWR";	break;	//小田原
		// 14 新潟県		//// 14 新潟県
		case "51":	return "JP.NII";	break;	//新潟
		case "52":	return "JP.NGAOK";	break;	//長岡
		case "53":	return "JP.TKDSH";	break;	//高田
		case "54":	return "JP.AKWSN";	break;	//相川
		// 15 富山県		//// 15 富山県
		case "55":	return "JP.TYA";	break;	//富山
		case "56":	return "JP.FUS";	break;	//伏木
		// 16 石川県		//// 16 石川県
		case "57":	return "JP.KNA";	break;	//金沢
		case "58":	return "JP.WJM";	break;	//輪島
		// 17 福井県		//// 17 福井県
		case "59":	return "JP.FKI";	break;	//福井
		case "60":	return "JP.TSRG";	break;	//敦賀
		// 18 山梨県		//// 18 山梨県
		case "61":	return "JP.KOFU";	break;	//甲府
		case "62":	return "JP.FJKWK";	break;	//河口湖
		// 19 長野県		//// 19 長野県
		case "63":	return "JP.NAGA";	break;	//長野
		case "64":	return "JP.MTSMT";	break;	//松本
		case "65":	return "JP.IID";	break;	//飯田
		// 20 岐阜県		//// 20 岐阜県
		case "66":	return "JP.GIF";	break;	//岐阜
		case "67":	return "JP.TKYM";	break;	//高山
		// 21 静岡県		//// 21 静岡県
		case "68":	return "JP.SHI";	break;	//静岡
		case "69":	return "JP.AJIRO";	break;	//網代
		case "70":	return "JP.MSHM";	break;	//三島
		case "71":	return "JP.HMM";	break;	//浜松
		// 22 愛知県		//// 22 愛知県
		case "72":	return "JP.NAG";	break;	//名古屋
		case "73":	return "JP.THYSH";	break;	//豊橋
		// 23 三重県		//// 23 三重県
		case "74":	return "JP.TSU";	break;	//津
		case "75":	return "JP.OWS";	break;	//尾鷲
		// 24 滋賀県		//// 24 滋賀県
		case "76":	return "JP.OOTSU";	break;	//大津
		case "77":	return "JP.HKN";	break;	//彦根
		// 25 京都府		//// 25 京都府
		case "78":	return "JP.KYO";	break;	//京都
		case "79":	return "JP.MAI";	break;	//舞鶴
		// 26 大阪府		//// 26 大阪府
		case "80":	return "JP.OSA";	break;	//大阪
		// 27 兵庫県		//// 27 兵庫県
		case "81":	return "JP.KOB";	break;	//神戸
		case "82":	return "JP.TYOOK";	break;	//豊岡
		// 28 奈良県		//// 28 奈良県
		case "83":	return "JP.NARA";	break;	//奈良
		case "84":	return "JP.KAZEY";	break;	//風屋
		// 29 和歌山県		//// 29 和歌山県
		case "85":	return "JP.WAK";	break;	//和歌山
		case "86":	return "JP.SHIMK";	break;	//潮岬
		// 30 鳥取県		//// 30 鳥取県
		case "87":	return "JP.TOT";	break;	//鳥取
		case "88":	return "JP.YNG";	break;	//米子
		// 31 島根県		//// 31 島根県
		case "89":	return "JP.MTSUE";	break;	//松江
		case "90":	return "JP.HAMDA";	break;	//浜田
		case "91":	return "JP.SAIGOU";break;	//西郷
		// 32 岡山県		//// 32 岡山県
		case "92":	return "JP.OKAY";	break;	//岡山
		case "93":	return "JP.TSYMA";	break;	//津山
		// 33 広島県		//// 33 広島県
		case "94":	return "JP.HIR";	break;	//広島
		case "95":	return "JP.SHOBR";	break;	//庄原
		// 34 山口県		//// 34 山口県
		case "96":	return "JP.SHS";	break;	//下関
		case "97":	return "JP.YAMC";	break;	//山口
		case "98":	return "JP.YNAI";	break;	//柳井
		case "99":	return "JP.HAGI";	break;	//萩
		// 35 徳島県		//// 35 徳島県
		case "100":return 	"JP.TSM";	break;	//徳島
		case "101":return 	"JP.HWS";	break;	//日和佐
		// 36 香川県		//// 36 香川県
		case "102":return 	"JP.TKM";	break;	//高松
		// 37 愛媛県		//// 37 愛媛県
		case "103":return 	"JP.MAS";	break;	//松山
		case "104":return 	"JP.NIIHM";	break;	//新居浜
		case "105":return 	"JP.UWJ";	break;	//宇和島
		// 38 高知県		//// 38 高知県
		case "106":return 	"JP.KOC";	break;	//高知
		case "107":return 	"JP.MUO";	break;	//室戸岬
		case "108":return 	"JP.TSS";	break;	//清水
		// 39 福岡県		//// 39 福岡県
		case "109":return 	"JP.FUU";	break;	//福岡
		case "110":return 	"JP.YAHW";	break;	//八幡
		case "111":return 	"JP.IIZK";	break;	//飯塚
		case "112":return 	"JP.KRUM";	break;	//久留米
		// 40 佐賀県		//// 40 佐賀県
		case "113":return 	"JP.SAG";	break;	//佐賀
		case "114":return 	"JP.IMR";	break;	//伊万里
		// 41 長崎県		//// 41 長崎県
		case "115":return 	"JP.NAGK";	break;	//長崎
		case "116":return 	"JP.SASE";	break;	//佐世保
		case "117":return 	"JP.IZHR";	break;	//厳原
		case "118":return 	"JP.FKUE";	break;	//福江
		// 42 熊本県		//// 42 熊本県
		case "119":return 	"JP.KUM";	break;	//熊本
		case "120":return 	"JP.OTHIME";break;	//阿蘇乙姫
		case "121":return 	"JP.USHBK";	break;	//牛深
		case "122":return 	"JP.HTYSH";	break;	//人吉
		// 43 大分県		//// 43 大分県
		case "123":return 	"JP.OIT";	break;	//大分
		case "124":return 	"JP.NKTSU";	break;	//中津
		case "125":return 	"JP.HITA";	break;	//日田
		case "126":return 	"JP.SAE";	break;	//佐伯
		// 44 宮崎県		//// 44 宮崎県
		case "127":return 	"JP.MIYZ";	break;	//宮崎
		case "128":return 	"JP.MKJO";	break;	//都城
		case "129":return 	"JP.NBEOK";	break;	//延岡
		case "130":return 	"JP.TKCHH";	break;	//高千穂
		// 45 鹿児島県		//// 45 鹿児島県
		case "131":return 	"JP.KAG";	break;	//鹿児島
		case "132":return 	"JP.KNYA";	break;	//鹿屋
		case "133":return 	"JP.TNGSHM";break;	//種子島
		case "134":return 	"JP.AMM";	break;	//名瀬
		// 46 沖縄県		//// 46 沖縄県
		case "135":return 	"JP.NAH";	break;	//那覇
		case "136":return 	"JP.NAGO";	break;	//名護
		case "137":return 	"JP.KMJM";	break;	//久米島
		case "138":return 	"JP.DAITJM";break;	//南大東島
		case "139":return 	"JP.MYKJM";	break;	//宮古島
		case "140":return 	"JP.ISHI";	break;	//石垣島
		case "141":return 	"JP.YJW";	break;	//与那国島
	}
}





/*----------------------------------------------------------
 * Dialog
 */

/*
 * 引数" dialogCode ダイアログコード
 *		optsはObject形式。以下、object内で使えるキー名。
 *		title タイトル文字
 *		pattern パターンがある場合はそのIDを配列で渡す
 *		message 表示したいテキスト
 *　　　　　btn1 左側のボタンテキスト（1つの場合は中央）
 *　　　　　btn2 右側のボタンテキスト（1つの場合は空を渡す）
 *　　　　　url1 左側のボタンクリック時に遷移したい場合のURL
 *　　　　　url2 右側のボタンクリック時に遷移したい場合のURL
 *　　　　　callback1 左側のボタンを押した時にコールバックしたい場合の関数名
 *　　　　　callback2 右側のボタンを押した時にコールバックしたい場合の関数名
 */

var Dialog = function( dialogCode , opts ){

	console.log( dialogCode , opts )
	var title = "", pattern, message = "", btn1, btn2, url1, url2, callback1, callback2;

	var that = this;

	switch ( dialogCode ){

		case "WM-dialog_001" :
			message = "カラダのキモチは、わたしムーヴの会員登録後ご利用になれます。<br>※すでにわたしムーヴ会員（旧ウェルネスリンク会員を含む）の方はお持ちのIDでログインしてください。";
			btn1 = "ログイン";
			btn2 = "会員登録へ";
			url1 = opts.url1;
			url2 = opts.url2;
			break;

		case "A-dialog_001" :
			title = "ログインエラー";
			for( var i = 0, len = opts.pattern.length; i < len; i++ ){
				console.log( opts.pattern[i] )
				switch ( opts.pattern[i] ){
					case 1 :
						message += "未入力の項目があります。<br>";
						break;
					case 2 :
						message += "ログインIDは半角英数字4～16字、パスワードは半角英数字8～20字でご入力ください。<br>";
						break;
					case 3 :
						message += "入力は半角英数字のみとなります。<br>"
						break;
				}
			}
			btn1 = "OK";
			break;

		case "A-dialog_002" :
			title = "取り込み確認";
			message = "データの取り込みには時間がかかる場合があります。<br>電波状態やバッテリー残量をご確認の上、開始してください。";
			btn1 = "キャンセル";
			btn2 = "開始";
			callback2 = opts.callback2;
			break;

	}


	/*
	 * ダイアログの表示
	 */

	this.show = function(){
		var str =	'<div id="dialog">' +
						'<div class="dialogContainer">' +
							'<p class="dialogTitle">' + title + '</p>' +
							'<p class="dialogMessage">' + message + '</p>' +
							'<button class="dialogBtnL">' + btn1 + '</button>' +
							'<button class="dialogBtnR">' + btn2 + '</button>' +
						'</div>' +
					'</div>';
		$('body').append( str );

		if( btn2 == undefined ){
			$('.dialogBtnL').addClass('dialogBtnC');
			$('.dialogBtnR').css({"display":"none"});
		}

		$('button.dialogBtnL').on('click', dialogFuncL );
		$('button.dialogBtnR').on('click', dialogFuncR );
	}


	function dialogFuncL(){
		if( url1 != undefined ){
			location.href = url1;
		}else if( callback1 != undefined ){
			callback1();
		}else if( btn1 == "キャンセル" && callback1 == undefined ){
			that.close();
		}else if( btn1 == "OK" && callback1 == undefined ){
			that.close();
		}
	}

	function dialogFuncR(){
		if( url2 != undefined ){
			location.href = url2;
		}else if( callback2 != undefined ){
			callback2();
		}else if( btn2 == "OK" && callback2 == undefined ){
			that.close();
		}
	}

	/*
	 * ダイアログの削除
	 */

	this.close = function(){
		$('button.dialogBtnL').off('click', dialogFuncL );
		$('button.dialogBtnR').off('click', dialogFuncR );
		$('#dialog').remove();
	}

}