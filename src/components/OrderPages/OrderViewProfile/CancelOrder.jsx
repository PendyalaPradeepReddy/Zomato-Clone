// src/components/CancelOrder.js
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import CancelModal from "../../common/CancelModal";

const CancelOrder = ({ orderId }) => {
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const handleModalOpen = () => {
    setOpenCancelModal(true);
  };
  const handleModalClose = () => {
    setOpenCancelModal(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        className="text-sm"
        onClick={handleModalOpen}
      >
        Cancel Order
      </Button>
      {openCancelModal && <CancelModal handleModalClose={handleModalClose} />}
    </>
  );
};

export default CancelOrder;
