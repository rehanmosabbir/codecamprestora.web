import React, { useState } from "react";
import { Button, Modal } from "antd";
import { BranchCreateModal } from "./BranchCreateModal";
import { useBranchDetails } from "./Zustand/Zustand";
export const BranchCreation = () => {
  const {
    mainArrayOfOpeningDetails,
    setOpeningHoursDetails,
    updateIsInfoUpdate,
    updateRowSelectedArray,
  } = useBranchDetails();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    updateIsInfoUpdate(false);
    setOpeningHoursDetails(mainArrayOfOpeningDetails);
    updateRowSelectedArray(["1", "2", "3", "4", "5", "6", "7"]);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create New Branch
      </Button>
      <Modal
        width={950}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <BranchCreateModal formClose={setIsModalOpen}></BranchCreateModal>
      </Modal>
    </>
  );
};
