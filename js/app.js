'use strict'
var imgArray=[];   // to avoid duplecate the option on the list
var page1Arr = []; // array of page 1 opject affter use constructor
var page2Arr = []; // array of page 2 opject affter use constructor
var pageName = "page1Arr" //to change the name of the t  when we render the page

//get json for page 1
$.get('../data/page-1.json').then(data => {
    data.forEach(element => {
       var NewImage = new Image(element); 
       page1Arr.push(NewImage);
    });
    renderItems(page1Arr) // To render the page1 after refresh the page
});

//get json for page2 
$.get('../data/page-2.json').then(data=>{
    data.forEach(element => {
       var NewImage = new Image(element); 
       page2Arr.push(NewImage);
    });
})
///////////////////////////////////////////////

//constractor function to add a prototype to the opject that we get it from the page.json
function Image(img){
    this.title = img.title,
    this.description = img.description,
    this.url=img.image_url,
    this.key=img.keyword,
    this.horns=img.horns    
}

Image.prototype.renderImg = function(){     // Attach the html to our js code
    let imgclone=$('#photo-mustache').html();
    let html = Mustache.render(imgclone,this); // render the optects"this" on the html 
    $('main').append(html);               // Append the div to the main 
}

Image.prototype.renderSelct = function(){   // to add the options to the select
    if(imgArray.includes(this.key) == false){ // to check if the keyword is in the imgarray "already in the select" dont add it again
        $('#Filter').append(`<option value =${this.key}>${this.key}</option>`);
        imgArray.push(this.key);
    }
}
/////////////////////////////////////////////////

//functions
function renderItems(arr){
    $("div").remove(); // to remove the img div
    $('#Filter').children().remove().end(); // to remove all option of the filter selector
    imgArray=[]; // array for not repeating the filter selecotor options
    $('#Filter').append(`<option value>Select Keyword</option>`); // To add the "select keyword" each time we change the page or add change the sort
    arr.forEach(element => {
        element.renderImg();
        element.renderSelct();
    })
}
/////////////////////////////////////////////////

//events:P
$('#Filter').change(function(){ 
    var value = $(this).val();
    $("div").hide();  // hide all divs
    $(`.${value}`).show(); // show the div that have a class of value that been selected  
});

$('#page1').click(function(){ 
    pageName = "page1Arr"
    renderItems(page1Arr)
});

$('#page2').click(function(){ 
    pageName = "page2Arr"
    renderItems(page2Arr)
});

$('#Sort').change(function(){ 
    var value = $(this).val();
    var arr = page1Arr
    if (pageName == "page2Arr"){ // to change the array by the name
        arr = page2Arr;
    }
    arr.sort((a,b) =>{
        if(b[value] > a[value]){
          return -1 
        }
        else{
          return b[value] < a[value]
        }
      });
      renderItems(arr);
});