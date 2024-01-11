import { Card } from "antd";
import Title from "antd/es/typography/Title";
import { BranchInformationForm } from "./BranchInformationForm";

export const BranchInfoEdit = ({
  formClose,
}: {
  formClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  console.log({ formClose });
  return (
    <div>
      <Card
        title={<Title level={4}>Branch Information</Title>}
        className="grid col-span-2 justify-center"
        style={{ width: 900 }}
      >
        <BranchInformationForm formClose={formClose}></BranchInformationForm>
      </Card>
    </div>
  );
};
