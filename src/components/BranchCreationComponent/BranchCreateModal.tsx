import Title from "antd/es/typography/Title";
import { BranchInformationForm } from "./BranchInformationForm";

export const BranchCreateModal = ({
  formClose,
}: {
  formClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const branchID=null;
  return (
    <div>
      <Title className="text-center" level={3}>
        Branch Information
      </Title>
<<<<<<< HEAD
      <div className="mt-10 ">
        <BranchInformationForm formClose={formClose}></BranchInformationForm>
=======
      <div className="mt-10 ml-7">
        <BranchInformationForm formClose={formClose}  branchID={branchID}></BranchInformationForm>
>>>>>>> 629370281cc4d7d659533772bc0d729b417344d3
      </div>
    </div>
  );
};
