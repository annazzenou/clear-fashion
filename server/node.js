const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://<annaz>:<cqi8pAiKOXx3hZkB>@<cluster-url>?retryWrites=true&writeConcern=majority';
const MONGODB_DB_NAME = 'clearfashion';

const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
const db =  client.db(MONGODB_DB_NAME)



const products = [
        {
          "name": "T-shirt Stockholm Butterfly Oat White",
          "price": 39,
          "category": "Dedicated"
        },
        {
          "name": "Shirt Marstrand Butterfly Oat White",
          "price": 89,
          "category": "Dedicated"
        },
        {
          "name": "Swim Shorts Sandhamn Irregular Stripe Multi Color",
          "price": 69,
          "category": "Dedicated"
        },
        {
          "name": "Shirt Marstrand Ocean Ink Multi Color",
          "price": 89,
          "category": "Dedicated"
        },
        {
          "name": "Shirt Marstrand Zebra Blue",
          "price": 89,
          "category": "Dedicated"
        },
        {
          "name": "Shirt Marstrand Palm Leaves Green",
          "price": 89,
          "category": "Dedicated"
        },
        {
          "name": "Shirt Marstrand Black",
          "price": 79,
          "category": "Dedicated"
        },
        {
          "name": "T-shirt Stockholm Seinfeld Family White",
          "price": 39,
          "category": "Dedicated"
        },
        {
          "name": "T-shirt Stockholm No Soup White",
          "price": 39,
          "category": "Dedicated"
        },
        {
          "name": "T-shirt Stockholm Newman White",
          "price": 39,
          "category": "Dedicated"
        },
        {
          "name": "T-shirt Stockholm Kramer Black",
          "price": 39,
          "category": "Dedicated"
        },
        {
          "name": "T-shirt Stockholm Jerry Black",
          "price": 39,
          "category": "Dedicated"
        },
        {
          "name": "T-shirt Stockholm George Black",
          "price": 39,
          "category": "Dedicated"
        },
        {
          "name": "Windbreaker Skara Black",
          "price": 99,
          "category": "Dedicated"
        },
        {
          "name": "Board Shorts Toroe Black",
          "price": 79,
          "category": "Dedicated"
        },
        {
          "name": "Swim Shorts Sandhamn Black",
          "price": 59,
          "category": "Dedicated"
        },
        {
          "name": "Board Shorts Toroe Big Leaf Duck Green",
          "price": 79,
          "category": "Dedicated"
        },
        {
          "name": "Swim Shorts Sandhamn Big Leaf Duck Green",
          "price": 69,
          "category": "Dedicated"
        },
        {
          "name": "Swim Shorts Sandhamn Dusty Yellow",
          "price": 59,
          "category": "Dedicated"
        },
        {
          "name": "Board Shorts Toroe Painted Palmtrees Black",
          "price": 79,
          "category": "Dedicated"
        },
        {
          "name": "Board Shorts Toroe Ditsy Sun Copper Brown",
          "price": 79,
          "category": "Dedicated"
        },
        {
          "name": "Swim Shorts Sandhamn Zebra Blue",
          "price": 69,
          "category": "Dedicated"
        },
        {
          "name": "Swim Shorts Sandhamn Brushed Waves Navy",
          "price": 69,
          "category": "Dedicated"
        },
        {
          "name": "Swim Shorts Sandhamn Coral Gems Black",
          "price": 69,
          "category": "Dedicated"
        },
        {
          "name": "Swim Shorts Sandhamn Coral Gems Dusty Yellow",
          "price": 69,
          "category": "Dedicated"
        },
        {
          "name": "Swim Shorts Sandhamn Ditsy Sun Copper Brown",
          "price": 69,
          "category": "Dedicated"
        },
        {
          "name": "Swim Shorts Sandhamn Painted Palmtrees Black",
          "price": 69,
          "category": "Dedicated"
        },
        {
          "name": "Swim Shorts Sandhamn Sea Green",
          "price": 59,
          "category": "Dedicated"
        },
        {
          "name": "Swim Shorts Sandhamn Seabirds Sunset Multi Color",
          "price": 69,
          "category": "Dedicated"
        },
        {
          "name": "Swim Shorts Sandhamn Sodalite Blue",
          "price": 59,
          "category": "Dedicated"
        },
        {
          "name": "T-shirt Stockholm Camp Fires Off-White",
          "price": 39,
          "category": "Dedicated"
        },
        {
          "name": "T-shirt Stockholm All Out Boat Off-White",
          "price": 39,
          "category": "Dedicated"
        },
        {
          "name": "T-shirt Stockholm Base Dusty Yellow",
          "price": 29,
          "category": "Dedicated"
        },
        {
          "name": "Sweatshirt Malmoe Base Dusty Yellow",
          "price": 69,
          "category": "Dedicated"
        },
        {
          "name": "T-shirt Stockholm Base Cashmere Pink",
          "price": 29,
          "category": "Dedicated"
        },
        {
          "name": "Sweatshirt Malmoe Base Cashmere Pink",
          "price": 69,
          "category": "Dedicated"
        },
        {
          "name": "T-shirt Stockholm Shrigley Weed Off White",
          "price": 39,
          "category": "Dedicated"
        },
        {
          "name": "T-shirt Stockholm Shrigley Microwave Off White",
          "price": 39,
          "category": "Dedicated"
        },
        {
          "name": "T-shirt Stockholm Shrigley Dodo Off White",
          "price": 39,
          "category": "Dedicated"
        },
        {
          "name": "T-shirt Stockholm Shrigley Bee Off White",
          "price": 39,
          "category": "Dedicated"
        }
      ];



const collection = db.collection('products');
const result = collection.insertMany(products);

console.log(result);