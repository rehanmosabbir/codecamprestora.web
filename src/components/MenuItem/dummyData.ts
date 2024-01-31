import { IMenuItem } from "@/types/menu-item";

export const dummyData: IMenuItem[] = [
    {
        id: "1",
        displayOrder: 1,
        imageId: "1",
        name: "Name 1",
        description: "Description 1",
        ingredients: "Ingredients 1",
        price: 100,
        categoryId: "1",
        availability: true,
        branchId: "1"
    },
    {
        id: "2",
        displayOrder: 2,
        imageId: "2",
        name: "Name 2",
        description: "Description 2",
        ingredients: "Ingredinents 2",
        price: 200,
        categoryId: "2",
        availability: false,
        branchId: "2"
    },
    {
        id: "3",
        displayOrder: 3,
        imageId: "3",
        name: "Name 3",
        description: "Description 3",
        ingredients: "Ingredinents 3",
        price: 250,
        categoryId: "3",
        availability: true,
        branchId: "3"
    },
]

export const dummyNewData: IMenuItem = {
    id: "100",
    displayOrder: 1,
    imageId: "100",
    name: "Name",
    description: "Description",
    ingredients: "Ingredients ",
    price: 0,
    categoryId: "100",
    availability: true,
    branchId: "100"
}
