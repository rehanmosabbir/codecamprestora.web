import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  DatePickerProps,
  DatePicker,
  Space,
  TimePicker,
  Select,
} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/de";
import "dayjs/plugin/timezone";
import {
  DataType,
  FieldType,
  OrderCreationModalProps,
} from "./Types/OrdersListTypes";
import { ValidateErrorEntity } from "rc-field-form/es/interface";
import { IoMdCheckmark } from "react-icons/io";
import { AppLogo } from "@/assets/Logo";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useQueryClient } from "react-query";
import { branchId } from "@/services/ordersListService";

const OrderCreationModal: React.FC<OrderCreationModalProps> = ({
  onCancel,
}) => {
  const branchIds = branchId;
  const { data: session } = useSession();
  const userId = session?.user?.restaurantId;
  const queryClient = useQueryClient();
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

  const onFinish = async (values: DataType) => {
    const { customerName, phone, seats, date, time, comment } = values;
    const formattedDate = dayjs(date).format("DD MMM YYYY");
    const formattedTime = dayjs(time).format("hh:mm A");
    const numericSeats = Number(seats);
    const totalPricePerFood = calculateTotalPrice();
    const itemDetails = selectedFoodsWithQuantity.map(
      ({ food, quantity, price }) => {
        const selectedOption = options.find((option) => option.value === food);
        const unitPrice = selectedOption ? Number(selectedOption.price) : 0;

        return {
          itemName: food,
          quantity,
          unitPrice,
          totalItemPrice: unitPrice * quantity,
        };
      }
    );

    const subTotal = itemDetails.reduce(
      (total, item) => total + item.totalItemPrice,
      0
    );

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/Orders`,
      {
        branchId: branchIds,
        userId: userId,
        orderItems: itemDetails,
        customerName,
        phone,
        seats: numericSeats,
        date: formattedDate,
        time: formattedTime,
        subTotal,
        comment,
      }
    );

    queryClient.invalidateQueries("orders-list");

    console.log("Success:", response.data);
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

  const format = "HH:mm";

  useEffect(() => {
    const fetchedOptions = [
      {
        img: "https://www.shakentogetherlife.com/wp-content/uploads/2022/10/hamburger-baked-in-oven-1024x1024.jpg",
        label: "Hamburger",
        value: "Hamburger",
        price: 50,
      },
      {
        img: "https://media.istockphoto.com/id/1434778198/photo/different-types-of-sarah-on-a-wooden-background-assortment-of-cheeses.jpg?s=612x612&w=0&k=20&c=Cju_uyrxUheQPZcp55V7hStTTbR_xZJqwLUuYsqDGQg=",
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
        <div className="grid grid-cols-2 gap-5">
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

        <div className="grid grid-cols-2 gap-5">
          <Form.Item<FieldType>
            label="Date"
            labelCol={{ span: 24 }}
            name="date"
            rules={[
              {
                required: true,
                message: "Enter Date!",
              },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format={"DD MMM YYYY"}
              size="large"
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Time"
            labelCol={{ span: 24 }}
            name="time"
            rules={[
              {
                required: true,
                message: "Enter Time!",
              },
            ]}
          >
            <TimePicker
              style={{ width: "100%" }}
              format="hh:mm A"
              size="large"
            />
          </Form.Item>
        </div>

        <Form.Item<FieldType>
          label="Comment"
          labelCol={{ span: 24 }}
          name="comment"
        >
          <Input
            style={{ padding: "10px", width: "100%" }}
            placeholder="Comment"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Select Food"
          labelCol={{ span: 24 }}
          name="orderItems"
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
