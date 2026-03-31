import { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { ADD_CAR_URL, UPDATE_CAR_URL } from "../../config/api";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

const ActionMenu = ({ id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
  const token = localStorage.getItem("token");

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleEditCar = () => {
    window.location.href = `/car/edit/${id}`;
    handleMenuClose();
  };

  const handleDeleteCar = async () => {
    handleMenuClose();
    Swal.fire({
      title: "Do you want to delete the car?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(`${ADD_CAR_URL}/${id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire("Saved!", "", "delete");
        window.location.reload();
      } else if (result.isDenied) {
      }
    });
  };

  const handleUpdateCarStatus = async () => {
    if (id) {
      const res = await axios.patch(`${UPDATE_CAR_URL}/${id}`, {
        status: "Sold",
      });
      if (res && res.status == 200) {
        toast.success("Status updated");
      }
      handleMenuClose();
    }
  };

  const handleSubMenuClose = () => setSubMenuAnchorEl(null);

  const handleNavigateToDetails = async () => {
    window.location.href = `/car/${id}`;
  };

  return (
    <div>
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleNavigateToDetails}>View</MenuItem>
        <MenuItem onClick={handleEditCar}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteCar}>Delete</MenuItem>
        <MenuItem onClick={handleUpdateCarStatus}>Mark as sold</MenuItem>
      </Menu>
      <Menu
        anchorEl={subMenuAnchorEl}
        open={Boolean(subMenuAnchorEl)}
        onClose={handleSubMenuClose}
      >
        <MenuItem onClick={handleSubMenuClose}>Sold</MenuItem>
        <MenuItem onClick={handleSubMenuClose}>Not Available</MenuItem>
      </Menu>
      <ToastContainer />
    </div>
  );
};

export default ActionMenu;
