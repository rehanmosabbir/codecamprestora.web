import { Form, Input, InputNumber, Select } from "antd";
import { EditableCellProps } from "./branchtype";

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  handleSelectChange,
  ...restProps
}) => {
  const items = ["Placed", "In Progress", "Served"];

  const renderInputNode = () => {
    if (inputType === "number") {
      return <InputNumber />;
    }

    if (inputType === "select") {
      return (
        <Select
          value={record[dataIndex]}
          onChange={(value: any) =>
            handleSelectChange(dataIndex, value, record)
          }
        >
          {items.map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      );
    }

    return <Input />;
  };

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex as string}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {renderInputNode()}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
