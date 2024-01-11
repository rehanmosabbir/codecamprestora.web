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
    <div className="w-full">
      <Card title={<Title level={4}>Branch Information</Title>}>
        <BranchInformationForm formClose={formClose}></BranchInformationForm>
      </Card>
    </div>
  );
};
