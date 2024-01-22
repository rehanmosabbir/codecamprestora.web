import { Card } from "antd";
import Title from "antd/es/typography/Title";
import { BranchInformationForm } from "./BranchInformationForm";

export const BranchInfoEdit = (props: {
  formClose: React.Dispatch<React.SetStateAction<boolean>>,
  branchID:string | undefined;
}) => {
 const { formClose,branchID} = props;
  
  return (
    <div className="w-full">
      <Card title={<Title className="pt-5 pb-2" level={4}>Branch Information</Title>}>
        <BranchInformationForm formClose ={formClose} branchID={branchID} ></BranchInformationForm>
      </Card>
    </div>
  );
};
