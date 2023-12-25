import React, { useState } from "react";
import BranchCreateModal from "./BranchCreateModal";
import { Button, Modal } from "antd";
export const BranchCreation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
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
        // title="Basic Modal"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <BranchCreateModal></BranchCreateModal>
      </Modal>
    </>
  );
};
