import React, { useState } from "react";
import { Button, Modal } from "antd";
import { BranchCreateModal } from "./BranchCreateModal";
import { useBranchDetails } from "./Zustand/Zustand";
export const BranchCreation = () => {
  const { updateIsInfoUpdate } = useBranchDetails();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    updateIsInfoUpdate(false);
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
