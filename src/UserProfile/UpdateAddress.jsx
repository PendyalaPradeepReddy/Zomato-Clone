import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dbServices from "../appwrite/DBconfig";
import Input from "../components/common/Input";
import Loading from "../components/common/Loading";
import Container from "../components/container/Container";

function UpdateAddress() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [userProfileData, setUserProfileData] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  //When User Adreess Some Information not updated to run this methods
  const submitUserdata = async (data) => {
    //dynamically data{} object under set email name get for userData Store slice auth
    data.email = userData.email;
    data.name = userData.name;
    data.userId = userData.$id;
    setLoading(true);
    if (!userData) {
      toast.warn("Please Login to Continue");
      setLoading(false);
      return;
    }

    try {
      const updateData = await dbServices.updateUserData(data);
      if (updateData) {
        toast.success("Profile Update Successfully");
        setUserProfileData((prevData) => [...prevData, updateData])
        reset();
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating the profile");
    } finally {
      setLoading(false);
    }
  };

  //get user all adreess data if data are exsits
  useEffect(() => {
    if (!userData) {
      toast.warn("Please Login to Continue");
      return;
    }
    const userId = userData.$id; //user data under unique of is to get store authSlice under userData
    setLoading(true);
    //call appwrite db services
    dbServices
      .getUserData(userId)
      .then((data) => {
        if (data) {
          setUserProfileData(data.documents); //is the array set all profile information this array
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoading(false));
  }, [userData]);

  //
  const handleNavigatePay = () => {
    navigate("/payment");
  };

  return (
    <div className="w-full bg-white">
      <Container>
        <div className="md:max-w-md w-full mx-auto px-5 py-2">
          {loading ? (
            <div>
              {" "}
              <Loading />
            </div>
          ) : userProfileData && userProfileData.length > 0 ? (
            <div className="p-4 ">
              <p className="text-lg font-semibold mb-4">Existing Addresses:</p>
              {userProfileData.map((data, index) => (
                <div
                  key={index}
                  className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm"
                >
                  <ul className="space-y-1">
                    <li className="text-gray-700">
                      <strong>Name:</strong> {data.name}
                    </li>
                    <li className="text-gray-700">
                      <strong>Address:</strong> {data.address}
                    </li>
                    <li className="text-gray-700">
                      <strong>District:</strong> {data.district}
                    </li>
                    <li className="text-gray-700">
                      <strong>State:</strong> {data.state}
                    </li>
                    <li className="text-gray-700">
                      <strong>Pincode:</strong> {data.pincode}
                    </li>
                    <li className="text-gray-700">
                      <strong>Phone:</strong> {data.phone}
                    </li>
                  </ul>

                  <Button
                    variant="contained"
                    onClick={() => handleNavigatePay()}
                  >
                    {" "}
                    Use This Address
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h3 className="text-xl text-gray-700 mb-3 font-semibold">
                Add Shopping Address
              </h3>
              <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(submitUserdata)}
              >
                <Input
                  placeholder="Address (Area and street)"
                  {...register("address", { required: true })}
                />
                <Input
                  placeholder="City/District/Town"
                  {...register("district", { required: true })}
                />
                <Input
                  placeholder="State"
                  {...register("state", { required: true })}
                />
                <Input
                  placeholder="Pincode"
                  {...register("pincode", { required: true })}
                />
                <Input
                  placeholder="Phone Number"
                  {...register("phone", { required: true })}
                />
                <Button variant="outlined" type="submit">Save and Deliver here</Button>
              </form>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default UpdateAddress;




