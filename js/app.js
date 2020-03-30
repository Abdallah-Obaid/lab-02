'use strict'
var imgArray=[];

$.get('../data/page-1.json').then(data=>{
    data.forEach(element => {
       var NewImage = new Image(element); 
       NewImage.renderImg();
       NewImage.renderSelct();
    });
})
function Image(img){
    this.title = img.title,
    this.description = img.description,
    this.url=img.image_url,
    this.key=img.keyword,
    this.horns=img.horns    
}

Image.prototype.renderImg=function(){
let imgclone=$('#photo-template').clone();
imgclone.attr("class",this.key);
imgclone.find('h2').text(this.title);
imgclone.find('img').attr("src",this.url);
imgclone.find('img').attr("alt",this.title);
imgclone.find('p').text(this.description);
$('main').append(imgclone);

}
Image.prototype.renderSelct=function(){
if(imgArray.includes(this.key) == false){
$('select').append(`<option value =${this.key}>${this.key}</option>`);
imgArray.push(this.key);
}
}

$('select').change(function(){ 
    var value = $(this).val();
    $("section").hide();
    $(`.${value}`).show();
});