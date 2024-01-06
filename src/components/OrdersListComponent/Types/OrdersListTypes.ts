export interface DataType {
    food: {
        foodName: string;
        quantity: string;
    };
    customerName: string;
    phone: string;
    seats: string;
    date: string;
    time: string;
    comment: string;
    price: {
        foodPrice: string;
        discount: string;
        totalPrice: string;
    };
    status: string;
}