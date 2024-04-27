import { apiClient } from "../Interceptors/axios";

class ItemService {
  registerLostItem({
    itemName,
    placeAtItemLost,
    username,
    phoneNumber,
    description,
    itemPhoto,
  }) {
    try {
      const formData = new FormData();
      formData.append("itemName", itemName);
      formData.append("placeAtItemLost", placeAtItemLost);
      formData.append("username", username);
      formData.append("phoneNumber", phoneNumber);
      formData.append("description", description);
      formData.append("itemPhoto", itemPhoto[0]);

      return apiClient.post("items/register-lost-item", formData);
    } catch (error) {
      console.log("Error while registering item: ", error);
    }
  }

  getLostItem() {
    try {
      return apiClient.get(`items/lost-item`);
    } catch (error) {
      console.log("Error while updating item: ", error);
    }
  }

  getFoundItem() {
    try {
      return apiClient.get(`items/found-item`);
    } catch (error) {
      console.log("Error while found item: ", error);
    }
  }

  deleteLostItem({ itemId }) {
    try {
      return apiClient.delete(`items/delete-item/${itemId}`);
    } catch (error) {
      console.log("Error while deleting item: ", error);
    }
  }

  itemFound({ itemId }) {
    try {
      return apiClient.patch(`items/item-found/${itemId}`);
    } catch (error) {
      console.log("Error while founding: ", error);
    }
  }
}

const itemService = new ItemService();

export default itemService;
