export interface DataType {
    food: {
        foodName: string;
        quantity: number;
    };
    customerName: string;
    phone: string;
    seats: number;
    date: string;
    time: string;
    comment: string;
    price: {
        foodPrice: number;
        discount: number;
        totalPrice: number;
    };
    status: string;
}