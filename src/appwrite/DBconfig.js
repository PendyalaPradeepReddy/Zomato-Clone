import { Client, Databases, ID, Storage } from "appwrite";
import { toast } from "react-toastify";
import conf from "../conf/conf";

//Database Services
export class DatabaseServices {
  client = new Client()
  database
  storage
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
    this.database = new Databases(this.client)
    this.storage = new Storage(this.client)
  }


  //Create & Add Resturant Product

  async createResturant({ deliveryTime, description, foodName, price, resturantAddress, resturantLocality, resturantName, resturantPhone, resturantPincode, status, featuredImageId, slug, userId }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        //slug,//slug define appwrite DB and in this method as it is documents id as it is used
        slug,
        { deliveryTime, description, foodName, price, resturantAddress, resturantLocality, resturantName, resturantPhone, resturantPincode, status, featuredImageId, userId }
      )
    } catch (error) {
      toast.error(error.message)
    }
  }

  //userData address collection data save [NOTE: DOCUMENTS ID SET USER userID WHILE CREATING TIME GENERATE]
  async updateUserData({ name, email, address, district, state, pincode, phone, userId }) {
    try {
      return await this.database.createDocument(conf.appwriteDatabaseId, conf.appwriteUserCollectionId, userId, { name, email, address, district, state, pincode, phone, userId })
    } catch (error) {
      toast.error("An error occurred while updating the profile");
    }

  }


  async createOrder({ orderId, featuredImageId, name, price, totalPrice, userId, orderStatus = "Order Placed" }) {
    try {
      return await this.database.createDocument(conf.appwriteDatabaseId, conf.appwriteOrderCollectionId, ID.unique(), { orderId, featuredImageId, name, price, totalPrice, userId, orderStatus })

    }
    catch (error) {
      console.log(error.message)
    }
  }

  async getOrder(userId) {
    try {
      const response = await this.database.listDocuments(conf.appwriteDatabaseId, conf.appwriteOrderCollectionId, [`equal("userId","${userId}")`])
      return response
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }


  //get order on query user slug id

  async getProducts(slug) {
    try {
      const response = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteOrderCollectionId,
        [`equal("$id", "${slug}")`]
      );
      return response;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }


  async getUserData(userId) {
    try {
      const response = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteUserCollectionId,
        [`equal("userId", "${userId}")`] //ACTUAL LOGIN USER ID TO COLLECTION USER ID ARE SAME TO SHOW THIS INFORMATION TO APPWRITE QUERY WRITE
      );
      return response;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }



  //Bucket Storage for uploaded images
  async uploadFoodImg(file) {
    try {
      return await this.storage.createFile(conf.appwriteBucketId, ID.unique(), file)
    } catch (error) {
      toast.error(error.message)
      console.log(error)
      return false

    }
  }


  //get all food textual content
  async getZomatoFood() {
    try {
      return await this.database.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, [])
    } catch (error) {
      toast.error(error.message)

    }
  }

  getFoodImgPreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId)
  }

}

const dbServices = new DatabaseServices()
export default dbServices