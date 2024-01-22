import Title from "antd/es/typography/Title";
import { BranchInformationForm } from "./BranchInformationForm";

export const BranchCreateModal = ({
  formClose,
}: {
  formClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const branchID='';
  return (
    <div>
      <Title className="text-center" level={3}>
        Branch Information
      </Title>
      <div className="mt-10 ml-7">
        <BranchInformationForm formClose={formClose}  branchID={branchID}></BranchInformationForm>
      </div>
    </div>
  );
};
