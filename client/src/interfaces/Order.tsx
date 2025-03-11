interface Product {
    id: number;
    name: string;
    pricePerUnit: number;
    supply: number;
    img_url: string;
    OrderProducts: {
        quantity: number;
        ProductId: number;
        OrderId: number;
    }
}

interface Order {
    id: number;
    Products: Product[];
}

export default Order;