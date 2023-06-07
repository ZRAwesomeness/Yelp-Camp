const mongoose = require('mongoose')
const cities = require('./cities')
const { descriptors, places } = require('./seedHelpers')
const Campground = require('../models/campground')

main().catch(err => console.log('OH NO ERROR!!!', err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log('MONGO CONNECTION OPEN!!!');
}

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '645f075224c9d730743d5a14',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/ddj2vtrgf/image/upload/v1684808024/YelpCamp/gvpi6jyu79mtkcyhsaat.png',
                    filename: 'YelpCamp/gvpi6jyu79mtkcyhsaat'
                },
                {
                    url: 'https://res.cloudinary.com/ddj2vtrgf/image/upload/v1684552345/YelpCamp/djx94hjamfpzsezorniv.png',
                    filename: 'YelpCamp/djx94hjamfpzsezorniv',
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam rerum in adipisci dolor ipsa veritatis neque deleniti officiis, distinctio nihil. Dolore voluptas cumque ipsa consequuntur harum suscipit quo explicabo accusamus!',
            price: price
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})