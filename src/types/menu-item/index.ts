import React from "react";

export interface IEditableCellProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    dataIndex: string;
    editing: boolean;
    index: number;
    inputType: "number" | "text";
    record: IMenuCategory;
    title: any;
}

export interface IMenuCategory {
    displayOrder: number;
    id: string;
    imageId: string;
    name: string;
    restaurantId: string;
}

export interface IMenuItem {
    availability: boolean;
    branchId: string;
    categoryId: string;
    description: string;
    displayOrder: number;
    id: string;
    imageId: string;
    ingredients: string;
    name: string;
    price: number;
}

export interface IMenuCategoryData {
    data: IMenuCategory[];
    errors: any;
    isSuccess: boolean;
    statusCode: number;
}

export interface IMenuItemData {
    data: {
        data: IMenuItem[];
        totalCount: number;
        totalPages: number;
    };
    errors: any;
    isSuccess: boolean;
    statusCode: number;
}

export interface IMenuItemProps {
    menuCategory: IMenuCategoryData,
    menuItem: IMenuItemData
}

export interface IRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key': string;
}
