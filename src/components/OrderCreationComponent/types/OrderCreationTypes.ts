export interface DataType {
    food: {
        foodName: string;
        quantity: number;
    };
    customerName: string;
    phone: string;
    seats: number;
    price: {
        foodPrice: number;
        discount: number;
        totalPrice: number;
    };
}

export interface FieldType {
    food: {
        foodName: string;
        quantity: number;
    };
    customerName: string;
    phone: string;
    seats: number;
    price: {
        foodPrice: number;
        discount: number;
        totalPrice: number;
    };
}

export interface OrderCreationModalProps {
    onCancel: () => void;
}