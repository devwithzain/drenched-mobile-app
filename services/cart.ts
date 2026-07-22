import apiClient from "./apiClient";
import { Product } from "./shop";

export interface CartItem {
	id: number;
	cart_id: number;
	product_id: number;
	quantity: number;
	product: Product;
}

export const fetchCartItems = async (): Promise<CartItem[]> => {
	try {
		const response = await apiClient.get("/cart");
		return response.data.success ? response.data.data : [];
	} catch (error) {
		console.error("Failed to fetch cart items from API:", error);
		return [];
	}
};

export const addCartItem = async (productId: number, quantity: number): Promise<CartItem | null> => {
	try {
		const response = await apiClient.post("/cart/add", {
			product_id: productId,
			quantity,
		});
		return response.data.success ? response.data.data : null;
	} catch (error) {
		console.error(`Failed to add product ${productId} to cart:`, error);
		return null;
	}
};

export const removeCartItem = async (cartItemId: number): Promise<boolean> => {
	try {
		const response = await apiClient.delete(`/cart/remove/${cartItemId}`);
		return response.data.success;
	} catch (error) {
		console.error(`Failed to remove cart item ${cartItemId} from API:`, error);
		return false;
	}
};

export const clearCart = async (): Promise<boolean> => {
	try {
		const response = await apiClient.post("/cart/clear");
		return response.data.success;
	} catch (error) {
		console.error("Failed to clear cart via API:", error);
		return false;
	}
};
