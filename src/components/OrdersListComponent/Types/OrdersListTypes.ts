export interface OrderItemType {
    itemName: string;
    quantity: number;
    unitPrice: number;
    totalItemPrice: number;
}

export interface DataType {
    customerName: string;
    phone: string;
    seats: number;
    date: string;
    time: string;
    comment: string;
    orderItems: OrderItemType[];
    subTotal: number;
    discount: number;
    delivery: number;
    totalPrice: number;
}

export interface FieldType {
    customerName: string;
    phone: string;
    seats: number;
    date: string;
    time: string;
    comment: string;
    orderItems: OrderItemType[];
    subTotal: number;
    discount: number;
    delivery: number;
    totalPrice: number;
}

export interface OrderCreationModalProps {
    onCancel: () => void;
}