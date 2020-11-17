'use strict';
// create gallary 

var optionList = [];

let data = $.ajax('data/page-1.json')
    .then(data => {

        data.forEach((element) => {
            let newGallary = new Gallary(element);
            // if (!optionList.includes(element.keyword)) {
            //     optionList.push(element.keyword)
            // }

            newGallary.render();

        })
        $('#photo-template').first().remove();
        $('#option').first().remove();
        renderOption();


    })

let gallaries = [];

function Gallary(data) {
    this.image_url = data.image_url;
    this.title = data.title;
    this.description = data.description;
    this.keyword = data.keyword;
    this.horns = data.horns;
    gallaries.push(this);

}
$('button').on('click', function () {


    // let onClick2 = $('#page2').on('click', onClick);

    if (this.id === 'page2') {

        optionList = [];
        gallaries = [];
        $("main").empty();
        $('#keywordList').empty();
        $.ajax('data/page-2.json')
            .then(data2 => {
                // console.log(data2)
                data2.forEach((element2) => {
                    let page2Gallary = new Gallary(element2);
                    page2Gallary.page2Render();

                })

                $('#photo-template').first().remove();
                $('#option').first().remove();
                renderOption();
                console.log(optionList);


            })
    } else if (this.id === 'page1') {
        
        // $(".page2Empty").hide();
        // $('main').empty();
        gallaries = [];
        optionList = [];
        // }         
        $('main').empty();
        $('#keywordList').empty();
        $.ajax('data/page-1.json')
            .then(data3 => {

                data3.forEach((element3) => {
                    let newGallary3 = new Gallary(element3);
                    // if (!optionList.includes(element.keyword)) {
                    //     optionList.push(element.keyword)

                    newGallary3.renderPage1();

                })
                // $('#photo-template').first().remove();
                // $('#option').first().remove();
                renderOption();
                
                console.log(gallaries);

            })
    }
});


Gallary.prototype.render = function () {

    //.. clonning ! 
    let photoCard = $('#photo-template').first().clone();
    photoCard.attr('class', this.keyword);

    photoCard.find('#imgTitle').text(this.title);
    photoCard.find('#imgUrl').attr('src', this.image_url);
    photoCard.find('#imgDesc').text(this.description);
    $("main").append(photoCard);

    // console.log(source);

}
Gallary.prototype.renderPage1 = function () {

    //.. clonning ! 
    let photoCard = $('#photo-template').first().clone();
    photoCard.attr('class', this.keyword);

    photoCard.find('#imgTitle').text(this.title);
    photoCard.find('#imgUrl').attr('src', this.image_url);
    photoCard.find('#imgDesc').text(this.description);
    $("main").append(photoCard);

    // console.log(source);

}

// Gallary.renderOption();


function renderOption() {

    for (let i = 0; i < gallaries.length; i++) {
        if (optionList.includes(gallaries[i].keyword) === false) {
            optionList.push(gallaries[i].keyword);
        }

    }
    optionList.forEach(item => {

        let optionTag = ` <option value="${item}" id="option">${item}</option>`;
        $('#keywordList').append(optionTag);

        console.log(optionTag);

    })

}

console.log(optionList);


function renderDropDown() {
    console.log('hi from the function');

    optionList.forEach(item => {
        let optionItem = $('#option').first().clone();
        optionItem.attr('value', item)
        optionItem.text(item);
        console.log(optionItem);

        $('#keywordList').append(optionItem);
    })

}
renderDropDown();

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
}

