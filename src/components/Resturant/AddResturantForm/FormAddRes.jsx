import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import dbServices from "../../../appwrite/DBconfig";
import Button from "../../common/Button";
import Input from "../../common/Input";

function FormAddRes() {
  const [isCoordinates, setIsCoordinates] = useState(false);
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);
  const [locality, setLocality] = useState("");

  const addToSubmitData = async (data) => {
    setLoading(true);
    if (!userData) {
      toast.warn("Please Login to continue");
      setLoading(false);
      return;
    }

    if (!data.foodName || !data.description || !data.price) {
      toast.error("Please fill out all required fields");
      setLoading(false);
      return;
    }

    try {
      const file = data.image[0]
        ? await dbServices.uploadFoodImg(data.image[0])
        : null;

      if (file) {
        const newFoodData = { ...data, userId: userData.$id, featuredImageId: file.$id };
        const AddNewFood = await dbServices.createResturant(newFoodData);

        if (AddNewFood) {
          toast.success(`"${data.foodName}" added successfully`);
          reset();
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const slugTransform = useCallback((value) => {
    return value ? value.trim().toLowerCase().replace(/ /g, "-") : "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "foodName") {
        setValue("slug", slugTransform(value.foodName), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Restaurant & Product Details</h2>

      <form onSubmit={handleSubmit(addToSubmitData)} className="space-y-6">
        {/* Restaurant Information Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Restaurant Name"
            placeholder="Enter restaurant name"
            {...register("resturantName", { required: true })}
          />
          <Input
            label="Complete Address"
            placeholder="Enter full address"
            {...register("resturantAddress", { required: true })}
          />
          <Input
            label="Locality"
            placeholder="e.g., sector 43"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            {...register("resturantLocality", { required: true })}
          />
          <iframe
            width="100%"
            height="200"
            className="rounded-lg"
            src={`https://maps.google.com/maps?q=${locality}&output=embed`}
            style={{ filter: "grayscale(0) contrast(1.2) opacity(100%)" }}
          ></iframe>
        </div>

        {/* Optional Coordinates Section */}
        <p
          className="text-right text-blue-500 cursor-pointer hover:underline"
          onClick={() => setIsCoordinates(!isCoordinates)}
        >
          {isCoordinates ? "Hide Coordinates" : "Enter Coordinates"}
        </p>
        {isCoordinates && (
          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Latitude"
              placeholder="Enter latitude"
              {...register("latitude")}
            />
            <Input
              label="Longitude"
              placeholder="Enter longitude"
              {...register("longitude")}
            />
          </div>
        )}

        {/* Address Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <select
            className="border rounded-lg px-4 py-2"
            {...register("country", { required: true })}
          >
            <option value="India">India</option>
          </select>
          <Input
            label="Pincode"
            placeholder="Enter pincode"
            {...register("resturantPincode", { required: true })}
          />
        </div>

        {/* Contact Number */}
        <Input
          label="Restaurant Contact Number"
          placeholder="Enter contact number"
          {...register("resturantPhone", { required: true })}
        />

        {/* Product Information Section */}
        <h3 className="text-xl font-semibold text-green-600 text-center underline">Add Product</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Food Name"
            placeholder="Enter food name"
            {...register("foodName", { required: true })}
          />
          <Input
            label="Slug"
            placeholder="Slug"
            readOnly
            className="cursor-not-allowed"
            {...register("slug", { required: true })}
          />
          <Input
            label="Price"
            placeholder="Enter price"
            {...register("price", { required: true })}
          />
          <Input
            label="Description"
            placeholder="Enter description"
            {...register("description", { required: true })}
          />
          <Input
            label="Delivery Time"
            placeholder="Enter delivery time"
            {...register("deliveryTime", { required: true })}
          />
          <Input
            type="file"
            label="Upload Image"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: true })}
          />
          <select
            className="border rounded-lg px-4 py-2"
            {...register("status", { required: true })}
          >
            <option value="available">Available Stock</option>
            <option value="unavailable">Out of Stock</option>
          </select>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mt-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Please wait..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default FormAddRes;
