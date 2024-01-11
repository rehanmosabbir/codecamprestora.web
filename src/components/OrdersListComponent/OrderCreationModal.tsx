import React, { useEffect, useState, useRef } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import Image from "next/image";
import logo from "@/assets/logo.png";
import {
  DataType,
  FieldType,
  OrderCreationModalProps,
} from "./Types/OrdersListTypes";
import { ValidateErrorEntity } from "rc-field-form/es/interface";
import { IoMdCheckmark } from "react-icons/io";
import { AppLogo } from "@/assets/Logo";

const OrderCreationModal: React.FC<OrderCreationModalProps> = ({
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [selectedFoodsWithQuantity, setSelectedFoodsWithQuantity] = useState<
    { food: string; quantity: number; price: number }[]
  >([]);

  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [options, setOptions] = useState<
    { img: string; label: string; value: string; price: number }[]
  >([]);

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const onFinish = (values: DataType) => {
    const { customerName, phone, seats } = values;
    const numericSeats = Number(seats);
    const totalPricePerFood = calculateTotalPrice();
    const quantities = selectedFoodsWithQuantity.reduce(
      (quantities, { food, quantity }) => {
        quantities[food] = quantity;
        return quantities;
      },
      {} as { [food: string]: number }
    );
    const overallTotalPrice = Object.values(totalPricePerFood).reduce(
      (total: number, price: number) => total + price,
      0
    );
    console.log("Success:", {
      totalPricePerFood,
      quantities,
      customerName,
      phone,
      seats: numericSeats,
      overallTotalPrice,
    });
    form.resetFields();
    onCancel();
  };

  const handleChange = (value: string[]) => {
    const alreadySelectedItems = selectedFoodsWithQuantity.filter((item) =>
      value.includes(item.food)
    );
    const newSelectedItems = value
      .filter((food) => !selectedFoods.includes(food))
      .map((food) => {
        const selectedOption = options.find((option) => option.value === food);
        return {
          food,
          quantity: 1,
          price: selectedOption ? Number(selectedOption.price) : 0,
        };
      });
    const updatedSelectedFoods = [...alreadySelectedItems, ...newSelectedItems];
    setSelectedFoodsWithQuantity(updatedSelectedFoods);
    setSelectedFoods(value);
  };

  const handleQuantityChange = (food: string, quantity: number) => {
    const updatedSelectedFoods = selectedFoodsWithQuantity.map((item) =>
      item.food === food ? { ...item, quantity } : item
    );
    setSelectedFoodsWithQuantity(updatedSelectedFoods);
  };

  const calculateTotalPrice = () => {
    const totalPricePerFood: { [key: string]: number } = {};
    selectedFoodsWithQuantity.forEach((item) => {
      const { food, quantity } = item;
      const selectedOption = options.find((option) => option.value === food);

      if (selectedOption && typeof selectedOption.price === "number") {
        totalPricePerFood[food] = selectedOption.price * quantity;
      }
    });
    return totalPricePerFood;
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<FieldType>) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const fetchedOptions = [
      {
        img: "https://www.shakentogetherlife.com/wp-content/uploads/2022/10/hamburger-baked-in-oven-1024x1024.jpg",
        label: "Hamburger",
        value: "Hamburger",
        price: 50,
      },
      {
        img: "https://blog.wisconsincheeseman.com/wp-content/uploads/sites/10/2022/10/sharp-cheddar-baby-swiss-1-edited-768x697.jpg.webp",
        label: "Cheese",
        value: "Cheese",
        price: 15,
      },
      {
        img: "https://hips.hearstapps.com/hmg-prod/images/delish-200511-seo-club-sandwich-pin-14363-eb-1590780714.jpg",
        label: "Sandwich",
        value: "Sandwich",
        price: 30,
      },
      {
        img: "https://www.orchidsandsweettea.com/wp-content/uploads/2022/07/Oreo-Milkshake-3-of-5-e1657521028832.jpg",
        label: "Milkshake",
        value: "Milkshake",
        price: 20,
      },
      {
        img: "https://kickassbaker.com/wp-content/uploads/2023/05/best-blueberry-muffin-recipe-with-sour-cream.jpg",
        label: "Muffin",
        value: "Muffin",
        price: 10,
      },
      {
        img: "https://cdn.britannica.com/13/234013-050-73781543/rice-and-chorizo-burrito.jpg",
        label: "Burrito",
        value: "Burrito",
        price: 80,
      },
      {
        img: "https://danosseasoning.com/wp-content/uploads/2022/03/Beef-Tacos-1024x767.jpg",
        label: "Taco",
        value: "Taco",
        price: 60,
      },
      {
        img: "https://www.licious.in/blog/wp-content/uploads/2016/07/Hot-Dogs-768x512.jpg",
        label: "Hot dog",
        value: "Hot dog",
        price: 20,
      },
    ];
    setOptions(fetchedOptions);
  }, []);

  return (
    <div>
      <Form
        form={form}
        requiredMark={true}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="bg-white"
      >
        <div className="flex justify-center mb-3">
          <AppLogo />
        </div>
        <h1 className="p-3 text-[16px] font-semibold text-center mb-3">
          Create New Order
        </h1>
        <Form.Item<FieldType>
          label="Customer's Name"
          labelCol={{ span: 24 }}
          name="customerName"
          rules={[{ required: true, message: "Enter Customer's Name!" }]}
        >
          <Input style={{ padding: "10px" }} placeholder="Customer's Name" />
        </Form.Item>
        <div className="flex gap-5">
          <Form.Item<FieldType>
            label="Phone Number"
            labelCol={{ span: 24 }}
            name="phone"
            rules={[
              {
                required: true,
                message: "Enter Phone Number!",
              },
              {
                pattern: /^[0-9]*$/,
                message: "Enter a valid Phone Number",
              },
            ]}
          >
            <Input style={{ padding: "10px" }} placeholder="Phone Number" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Number of Seats"
            labelCol={{ span: 24 }}
            name="seats"
            rules={[
              { required: true, message: "Enter Number of Seats!" },
              {
                pattern: /^[1-9][0-9]*$/,
                message: "Please enter valid Number",
              },
            ]}
          >
            <Input
              style={{ padding: "10px", width: "100%" }}
              min={1}
              max={99}
              placeholder="Number of Seats"
            />
          </Form.Item>
        </div>

        <Form.Item<FieldType>
          label="Select Food"
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: "Please select Food!" }]}
        >
          <div className="flex gap-3">
            <Select
              mode="multiple"
              value={selectedFoods}
              onChange={handleChange}
              options={options}
              placeholder={"Select Food"}
              size="large"
            />
            <Button size="large" className="text-gray-600">
              <IoMdCheckmark />
            </Button>
          </div>
        </Form.Item>
        {selectedFoodsWithQuantity.length === 0 && (
          <div className="text-center my-10">Please select food items</div>
        )}
        {selectedFoodsWithQuantity.map((foodItem) => {
          const { food, quantity, price } = foodItem;
          const selectedOption = options.find(
            (option) => option.value === food
          );
          const totalPrice = price * quantity;

          return (
            <div
              key={food}
              className="grid grid-cols-5 py-5 px-0 sm:px-5 items-center border-t-[1px] border-gray-300 "
            >
              <img
                src={selectedOption?.img}
                alt={selectedOption?.label}
                className="w-12 sm:w-16 h-12 sm:h-16 object-cover rounded-lg"
              />
              <span className="px-2 col-span-2">{food}</span>
              <InputNumber
                style={{ textAlign: "center" }}
                className="flex justify-start w-10 sm:w-16"
                min={1}
                max={99}
                value={quantity}
                onChange={(value) =>
                  handleQuantityChange(food, value as number)
                }
              />
              <span className="flex justify-end">{totalPrice} Tk</span>
            </div>
          );
        })}

        <Form.Item>
          <div className="flex gap-5 mt-5">
            <Button
              onClick={handleCancel}
              style={{ height: "40px" }}
              type="default"
              block
            >
              Cancel
            </Button>
            <Button
              style={{ height: "40px" }}
              type="primary"
              htmlType="submit"
              block
            >
              Create Order
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderCreationModal;
