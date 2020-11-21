'use strict'

gallaries = [];

function Gallary(data) {
    this.image_url = data.image_url;
    this.title = data.title;
    this.description = data.description;
    this.keyword = data.keyword;
    this.horns = data.horns;
    gallaries.push(this);

}

$.ajax('data/page-1.json')
    .then(data => {
            data.forEach(element => {

                let newGallary = new Gallary(element);

            })
    })

    