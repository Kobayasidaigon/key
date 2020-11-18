//鍵貸出
document .querySelector(".register_button").addEventListener("click", function () {
    var name = document.querySelector(".register_name").value;
    var rtime = document.querySelector(".return_time").value;
    console.log(rtime);
    add(name,rtime);
    //登録したら空白にする
    document.querySelector(".register_name").value="";
  });

//鍵返却
document.querySelector(".return_button").addEventListener("click", function () {
  var name = document.querySelector(".register_name").value;
  remove(name);
});

var key_list = [
  { no: 1, name: "ポチ",  rental: true ,select:true,user:0 },
  { no: 2, name: "タマ",  rental: true ,select:true,user:0 },
  { no: 3, name: "モモ",  rental: true ,select:true,user:0 },
  { no: 4, name: "クロ",  rental: true ,select:true,user:0 },
  { no: 5, name: "モモ",  rental: true ,select:true,user:0 },
  { no: 6, name: "クロ",  rental: true ,select:true,user:0 },
];
//rental　true：返却済み　false：貸出中
//select  true:選択中    false:選択解除

//リストに値を追加する
function add(name,rtime) {
  var date = new Date();
  var time = `${date.getFullYear()}年${date.getMonth()}月${date.getDay()}日${date.getHours()}時${date.getMinutes()}分`;
  
  key_list.forEach((e) => {
    if (!e.select) {
      //貸出リストを作成
      var newElement = document.createElement("div");
      newElement.className = `rent_key${e.no}`;
      var newContent = document.createTextNode(`${name}さんが${e.no}の鍵使用中 返却日時${rtime}`);
      newElement.appendChild(newContent);

      var list = document.querySelector(".list");
      var list_item = document.querySelector(".list-item");
      list.insertBefore(newElement, list_item.nextSibling);
      
    //返却後に選択中の項目消します
    if(!e.select){
      var key_status = document.querySelector(`.key_${e.no}_status`);
      key_status.remove();
    }
    //貸出中
    e.rental=false;
    //選択中を解除
    e.select=true;
    //貸し出し者登録
    e.user=name;
    
  　//貸出状況の変化
    document.querySelector(`.key_number_${e.no}`).style.backgroundColor = "red";
    console.log(key_list);
    }
  });
}

//リストの値を削除
function remove(name) {
  key_list.forEach((e) => {
    var list_item = document.querySelector(`.rent_key${e.no}`);
    //貸し出し状況を返却により削除
    if (!e.rental&&!e.select) {
      list_item.remove();
      key_list[e.no-1].rental = true;
      
      var newElement = document.createElement("div");
      newElement.className = `rent_key${e.no}`;
      var newContent = document.createTextNode(`${name}さんが${e.no}の鍵返却しました。`);
      newElement.appendChild(newContent);

      var list = document.querySelector(".list");
      var list_item = document.querySelector(".return-list");
      list.insertBefore(newElement, list_item.nextSibling);
      
        
    }
    
    //返却後に選択中の項目消します
    if(!e.select){
      document.querySelector(`.key_number_${e.no}`).style.backgroundColor = " #ffa300";
      var key_status = document.querySelector(`.key_${e.no}_status`);
      key_status.remove();    
    }
  });
}
//boxが選択中であることを示す

//オブジェクトの数値は-1で指定しています。
//htmlの作成とは数値がずれています。
const btns = document.querySelectorAll(".key");
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    //debugger;
    var box = e.target.innerHTML;
    //選択状況を変更
    if(key_list[box-1].select){
      var newElement = document.createElement("div");
      newElement.className = `key_${box}_status`;
      var newContent = document.createTextNode(`選択中`);
      newElement.appendChild(newContent);
  
      var key = document.querySelector(`.key_${box}`);
      var key_number = document.querySelector(`.key_number_${box}`);
      key.insertBefore(newElement, key_number.nextSibling);
      key_list[`${box-1}`].select=false;
    }else{
      //登録、返却を実行することにより「選択中」の項目が消えるため表示があるときのみ対処
      if(document.querySelector(`.key_${box}_status`)!=null){
        var key_status = document.querySelector(`.key_${box}_status`);
        key_status.remove();
      }
      key_list[`${box-1}`].select=true;
    }
    //選択状態の変換
    key_list[box-1].select =  key_list[box-1].select ? true : false;
  });
});

var date = new Date();; //翌日の日付を取得
var yyyy = date.getFullYear();
var mm = ("0"+date.getMonth()).slice(-2);
var dd = ("0"+date.getDate()).slice(-2);
var hh = ("0"+date.getHours()).slice(-2);
var m =("0"+date.getMinutes()).slice(-2);
document.querySelector(".return_time").value=`${yyyy}-${mm}-${dd}T${hh}:${mm}`

//借りているものがあるかチェック
var register_name = document.querySelector('.register_name');
register_name.addEventListener('keyup',search_Name);
function search_Name(){
  var name = this.value;
  key_list.forEach((e)=>{
    if(e.user===name){
      //借りているものがあれば変化
      document.querySelector(`.key_number_${e.no}`).style.backgroundColor = "green";
    }
    if(e.user!==name){
      //借りているものがなければそのまま
      document.querySelector(`.key_number_${e.no}`).style.backgroundColor = " #ffa300";
      //貸出中であれば検索に引っかかった後に戻す必要あり
      if(e.user!==0){
        //借りているものがなければそのまま
        document.querySelector(`.key_number_${e.no}`).style.backgroundColor = " red";
      }
    }
    
  });
}

