import { Product } from '../models/product.js';

export const seedProducts = async () => {
  await Product.bulkCreate([
    { 
        name: 'Pop Corn', 
        pricePerUnit: 3,
        supply: 30, 
        img_url: "https://recipeforperfection.com/wp-content/uploads/2017/11/Movie-Theater-Popcorn-in-a-popcorn-bucket.jpg"
    },
    { 
        name: 'Hot Dogs', 
        pricePerUnit: 5,
        supply: 20, 
        img_url: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Hot_dog_with_mustard.png"
    },
    { 
        name: 'Pretzel', 
        pricePerUnit: 4,
        supply: 25, 
        img_url: "https://m.media-amazon.com/images/I/71s5aMcXjyL.jpg"
    },
    { 
        name: 'Nachos', 
        pricePerUnit: 7,
        supply: 25, 
        img_url: "https://cdn.vox-cdn.com/thumbor/r6uxXo4Vxr46VZ6ESHYGnEObQCU=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/9628895/23244095_1492653917490169_5545534232193971697_n.jpg"
    },
    { 
        name: 'Coca-Cola (20 oz.)', 
        pricePerUnit: 3,
        supply: 500, 
        img_url: "https://m.media-amazon.com/images/S/aplus-media/vc/af9d0af3-2772-4f7b-ac9d-0e7fc3d7fe83.__CR0,0,300,300_PT0_SX300_V1___.jpg"
    },
    { 
        name: 'Sprite (20 oz.)', 
        pricePerUnit: 3,
        supply: 500, 
        img_url: "https://a.mktgcdn.com/p/WmvDNcQhYPRzbNIZDT75DiK0Zgo8SzxH7ToDm3H2f90/800x600.jpg"
    },
    { 
        name: 'Skittles', 
        pricePerUnit: 3,
        supply: 20, 
        img_url: "https://cdn.shopify.com/s/files/1/0257/8038/7925/products/skittles-candy-skittles-126335.jpg"
    },
    { 
        name: 'Peanuts', 
        pricePerUnit: 5,
        supply: 30, 
        img_url: "https://images.albertsons-media.com/is/image/ABS/184730230-ECOM?$ng-ecom-pdp-desktop$&defaultImage=Not_Available"
    },
    { 
        name: 'Cracker Jacks', 
        pricePerUnit: 6,
        supply: 30, 
        img_url: "https://cdn11.bigcommerce.com/s-omwfd2x16c/images/stencil/1280x1280/products/6182/6949/cracker-jack-1oz-box-67__57538.1623944920.jpg?c=1"
    },
    { 
        name: 'Lemonade (20 oz.)', 
        pricePerUnit: 3,
        supply: 200, 
        img_url: "https://cdnimg.webstaurantstore.com/images/products/large/470638/1812806.jpg"
    },
  ], { individualHooks: true });
};
