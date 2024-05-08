import { apiClient } from "../Interceptors/axios";

class AuthService {
  createAccount({ fullName, email, password, phoneNumber, avatar }) {
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber);
      formData.append("password", password);
      formData.append("avatar", avatar[0]);

      return apiClient.post("users/register", formData);
    } catch (error) {
      console.log("Error while registering user: ", error);
    }
  }

  login({ email, password }) {
    try {
      return apiClient.post("users/login", { email, password });
    } catch (error) {
      console.log("Error while login user: ", error);
    }
  }

  logout() {
    try {
      return apiClient.post("users/logout");
    } catch (error) {
      console.log("Error while logout usr: ", error);
    }
  }

  getCurrentUser() {
    try {
      return apiClient.get("users/current-user");
    } catch (error) {
      console.log("Error while getting user: ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
