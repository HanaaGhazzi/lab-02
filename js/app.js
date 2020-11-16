'use strict';
// create gallary 

$.ajax('data/page-1.json')
    .then(data => {
        // console.log(data); 
        // renderOption();
        data.forEach((element) => {
            let newGallary = new Gallary(element);
            // console.log(newGallary);
            newGallary.render();

        })
        $('#photo-template').first().remove();
        $('#option').first().remove();
        renderOption();

    })
// 


let gallaries = [];

function Gallary(data) {
    this.image_url = data.image_url;
    this.title = data.title;
    this.description = data.description;
    this.keyword = data.keyword;
    this.horns = data.horns;
    gallaries.push(this);

}

Gallary.prototype.render = function () {

    //.. clonning ! 
    let photoCard = $('#photo-template').first().clone();
    photoCard.attr('class', this.keyword);

    photoCard.find('#imgTitle').text(this.title);
    photoCard.find('#imgUrl').attr('src', this.image_url);
    photoCard.find('#imgDesc').text(this.description);

    // console.log(source);
    $("main").append(photoCard);

}



var optionList = [];
// Gallary.renderOption();


function renderOption() {

    for (let i = 0; i < gallaries.length; i++) {
        if (optionList.includes(gallaries[i].keyword) === false) {
            optionList.push(gallaries[i].keyword);
        }

    }
    optionList.forEach(item => {
        let optionItem = $('#option').first().clone();
        $('select').append(optionItem);
        optionItem.attr('value', item)
        let optionTag = ` <option value="${item}">${item}</option>`
        $('select').append(optionTag);
        // optionItem.text(item);
        console.log(optionTag);

    })

}

console.log(optionList)


function renderDropDown() {
    console.log('hi from the function');

    optionList.forEach(item => {
        let optionItem = $('#option').first().clone();
        optionItem.attr('value', item)
        optionItem.text(item);
        console.log(optionItem);

        $('select').append(optionItem);
    })

}
renderDropDown();

$('select').on('change', function () {
    console.log(this.value);
    for (let j = 0; j < gallaries.length; j++) {
        
        if (this.value !== gallaries[j].keyword) {
            let clickRender = $(`.${gallaries[j].keyword}`)
            clickRender.hide();
        }
    }
});
