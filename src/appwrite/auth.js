import { Account, Client, ID } from "appwrite";
import { toast } from "react-toastify";
import conf from "../conf/conf";

class AuthService {
  client = new Client();
  account
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
    this.account = new Account(this.client)
  }

  async createAccount({ email, password, name, gender, phone }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name, { phone, gender })

      return userAccount
    } catch (error) {
      toast.error(error.message)
    }
  }


  async userVerification() {
    try {
      const user = await this.account.createVerification('http://localhost:5173/verify')
    } catch (error) {
      console.log("Error: userVerification", error.message)
    }
  }

  async createSession({ email, password }) {
    try {
      const session = await this.account.createEmailSession(email, password)

      return session
    } catch (error) {
      toast.error(error.message)

    }
  }

  async deleteSessions() {
    try {
      const session = await this.account.deleteSessions()
      return session
    } catch (error) {
      console.log("Error: deleteSessions", error.message)

    }
  }


  async getCurrentUser() {
    try {
      const currentUser = await this.account.get()
      return currentUser

    } catch (error) {
      console.log("Error: getCurrentUser", error.message)

    }
  }


  async deleteAccount(userId) {
    try {
      const result = await this.account.deleteIdentity(userId)
    } catch (error) {
      console.log("Error: deleteAccount", error.message)

    }
  }

  async jwtsession() {
    try {
      const result = await this.account.createJWT()
      return result
    } catch (error) {
      console.log("Error: jwtsession", error.message)

    }
  }
}

const authServiceAppwrite = new AuthService;
export default authServiceAppwrite