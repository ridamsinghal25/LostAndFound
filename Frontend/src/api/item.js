import { apiClient } from "../Interceptors/axios";

class ItemService {
  registerLostItem({ itemName, placeAtItemLost, itemPhoto, description }) {
    try {
      const formData = new FormData();
      formData.append("itemName", itemName);
      formData.append("placeAtItemLost", placeAtItemLost);
      formData.append("description", description);
      formData.append("itemPhoto", itemPhoto[0]);
      console.log("In item.js: ", {
        itemName,
        placeAtItemLost,
        description,
        itemPhoto,
      });

      return apiClient.post("items/register-lost-item", formData);
    } catch (error) {
      console.log("Error while registering item: ", error);
    }
  }

  getLostItems() {
    try {
      return apiClient.get(`items/lost-item`);
    } catch (error) {
      console.log("Error while updating item: ", error);
    }
  }

  getFoundItems() {
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

  getItemById({ itemId }) {
    try {
      return apiClient.get(`items/get-item/${itemId}`);
    } catch (error) {
      console.log("Error while getting item: ", error);
    }
  }

  updateItemDetails({ itemId, itemName, placeAtItemLost, description }) {
    try {
      return apiClient.patch(`items/update-item/${itemId}`, {
        itemName,
        placeAtItemLost,
        description,
      });
    } catch (error) {
      console.log("Error while updating item details: ", error);
    }
  }

  updateItemPhoto({ itemId, itemPhoto }) {
    try {
      const formData = new FormData();
      formData.append("itemPhoto", itemPhoto[0]);
      return apiClient.patch(`items/update-itemphoto/${itemId}`, formData);
    } catch (error) {
      console.log("Error while updating item photo: ", error);
    }
  }

  getUserLostItems() {
    try {
      return apiClient.get(`items/user-lost-items`);
    } catch (error) {
      console.log("Error while getting user lost items: ", error);
    }
  }

  getUserFoundItems() {
    try {
      return apiClient.get(`items/user-found-items`);
    } catch (error) {
      console.log("Error while getting user found items: ", error);
    }
  }
}

const itemService = new ItemService();

export default itemService;
