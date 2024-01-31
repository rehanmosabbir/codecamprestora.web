import React, { useState } from "react";
import { Button, Modal } from "antd";
import { BranchCreateModal } from "./BranchCreateModal";
import { useBranchDetails } from "./Zustand/Zustand";
export const BranchCreation = () => {
  const {
    mainArrayOfOpeningDetails,
    updateIsInfoUpdate,
    updateBranchName,
    updateIsAvailable,
    updateDivisionName,
    updateDistrictName,
    updateThanaName,
    updatePriceRangeValue,
    updateCuisineTypes,
    updateAreaDetails,
    setOpeningHoursDetails,
    updateRowSelectedArray,
  } = useBranchDetails();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    updateIsInfoUpdate(false);
    setOpeningHoursDetails(mainArrayOfOpeningDetails);
    updateRowSelectedArray(["1", "2", "3", "4", "5", "6", "7"]);
    setIsModalOpen(true);
    updateBranchName("");
    // console.log("jjjj---", BranchDetailsData?.isAvailable);
    updateIsAvailable(0);
    updatePriceRangeValue(0);

    // const convertedCuisineTypes = BranchDetailsData?.cuisineTypes?.map(
    //   (value: { cuisineTag: string }) => value?.cuisineTag
    // );
    updateCuisineTypes([]);

    updateAreaDetails("");
    updateDivisionName("");
    updateDistrictName("");
    updateThanaName("");
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
