import React, { useState } from "react";
import { Button, Modal } from "antd";
import { BranchCreateModal } from "./BranchCreateModal";
export const BranchCreation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
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
