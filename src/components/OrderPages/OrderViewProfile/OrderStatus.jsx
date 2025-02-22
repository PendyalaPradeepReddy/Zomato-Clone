import React from "react";

function OrderStatus({ status }) {
  let statusColor;
  switch (status) {
    case "Order Placed":
      statusColor = "text-yellow-500";
    case "Shipped":
      statusColor = "text-blue-500";
      break;
    case "Delivered":
      statusColor = "text-green-500";
      break;
    case "Canceled":
      statusColor = "text-red-500";
      break;
    default:
      statusColor = "text-gray-500"; // Default color for unknown statuses
  }
  return (
    <>
      <div className={`font-semibold ${statusColor}`}>{status}</div>
    </>
  );
}

export default OrderStatus;
