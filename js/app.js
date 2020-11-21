'use strict';
// create gallary 

var optionList = [];
//..  load default page 
$(document).ready(function(){
    getPage(1);
})

// $(() =>{
//     getPage(1);
// });

let gallaries = [];

function Gallary(data) {
    this.image_url = data.image_url;
    this.title = data.title;
    this.description = data.description;
    this.keyword = data.keyword;
    this.horns = data.horns;
    gallaries.push(this);

}


$('#1').on('click', function () {
        let idNo = this.id;
    getPage(idNo);

});

$('#2').on('click', function () {
    getPage(2);

});

function getPage (page){

        optionList = [];
        gallaries = [];
        $("main").empty();
        $('#keywordList').empty();
        $.ajax(`data/page-${page}.json`)
            .then(data2 => {
                data2.forEach((element2) => {
                    let page2Gallary = new Gallary(element2);
                    page2Gallary.page2Render();

                })
                $('#option').first().remove();
                renderOption();
                console.log(optionList);


            })
    }

Gallary.prototype.render = function () {


    let photoCard = $('#photo-template').first().clone();
    photoCard.attr('class', this.keyword);

    photoCard.find('#imgTitle').text(this.title);
    photoCard.find('#imgUrl').attr('src', this.image_url);
    photoCard.find('#imgDesc').text(this.description);
    $("main").append(photoCard);
    photoCard.remove('photo-template');
    $('#photo-template').first().remove();
}

function renderOption() {

    for (let i = 0; i < gallaries.length; i++) {
        if (optionList.includes(gallaries[i].keyword) === false) {
            optionList.push(gallaries[i].keyword);
        }

    }
    optionList.forEach(item => {

        let optionTag = ` <option value="${item}" id="option">${item}</option>`;
        $('#keywordList').append(optionTag);

    })

}

$('#keywordList').on('change', function () {
    console.log(this.value);
    for (let j = 0; j < gallaries.length; j++) {

        let clickRender = $(`.${gallaries[j].keyword}`)
        if (this.value !== gallaries[j].keyword) {
            clickRender.hide();

        } else {
            clickRender.show();
        }
    }
});


Gallary.prototype.page2Render = function () {


    let page2 = $('#page2-template').html();

    let pageHtml = Mustache.render(page2, this);
    $('main').append(pageHtml)
    console.log(pageHtml);

    return pageHtml;
};


$('#sortHorn').click(function () {

    sortAlgorithm(gallaries , 'horns');
    gallaries.forEach(element => {
        element.render();
    });
});

$('#sortTitle').click(function () {
    sortAlgorithm(gallaries , 'title');

    gallaries.forEach(element => {
        element.render();
    });
});

function sortAlgorithm(array , proparty){

    array.sort((a, b) =>{
            let partA = a[proparty];
            let partB = b[proparty];
            if(partA > partB){return 1}
            else if(partA < partB){return -1}
            else return 0;

    });
};