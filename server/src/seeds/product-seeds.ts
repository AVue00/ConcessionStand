import { Product } from '../models/product.js';

export const seedProducts = async () => {
  await Product.bulkCreate([
    { 
        name: 'Pop Corn', 
        pricePerUnit: 5,
        supply: 10, 
        img_url: "https://recipeforperfection.com/wp-content/uploads/2017/11/Movie-Theater-Popcorn-in-a-popcorn-bucket.jpg"
    },
    { 
        name: 'Hot Dogs', 
        pricePerUnit: 5,
        supply: 10, 
        img_url: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Hot_dog_with_mustard.png"
    },
    { 
        name: 'Pretzel', 
        pricePerUnit: 5,
        supply: 10, 
        img_url: "https://m.media-amazon.com/images/I/71s5aMcXjyL.jpg"
    },
    { 
        name: 'Nachos', 
        pricePerUnit: 5,
        supply: 10, 
        img_url: "https://cdn.vox-cdn.com/thumbor/r6uxXo4Vxr46VZ6ESHYGnEObQCU=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/9628895/23244095_1492653917490169_5545534232193971697_n.jpg"
    },
    { 
        name: 'Soda', 
        pricePerUnit: 5,
        supply: 10, 
        img_url: "https://m.media-amazon.com/images/S/aplus-media/vc/af9d0af3-2772-4f7b-ac9d-0e7fc3d7fe83.__CR0,0,300,300_PT0_SX300_V1___.jpg"
    },
  ], { individualHooks: true });
};
