import apiClient from "./apiClient";

export interface OrderItem {
	id: number;
	order_id: number;
	product_id: number;
	product_title: string;
	unit_price: number;
	total: number;
}

export interface Order {
	id: number;
	user_id: number;
	order_number: string;
	subtotal: number;
	tax: number;
	total: number;
	status: string;
	created_at: string;
	items?: OrderItem[];
}

export interface PaymentIntentResponse {
	success: boolean;
	paymentIntent: string;
	publishableKey: string;
	order: Order;
}

export const createPaymentIntent = async (): Promise<PaymentIntentResponse | null> => {
	try {
		const response = await apiClient.post("/checkout/intent");
		return response.data.success ? response.data : null;
	} catch (error) {
		console.error("Failed to initiate payment intent via API:", error);
		return null;
	}
};

export const finalizeOrder = async (orderId: number, status: "succeeded" | "failed"): Promise<Order | null> => {
	try {
		const response = await apiClient.post("/checkout/finalize", {
			order_id: orderId,
			payment_status: status,
		});
		return response.data.success ? response.data.order : null;
	} catch (error) {
		console.error(`Failed to finalize order ${orderId}:`, error);
		return null;
	}
};

export const fetchOrders = async (): Promise<Order[]> => {
	try {
		const response = await apiClient.get("/orders");
		return response.data.success ? response.data.data : [];
	} catch (error) {
		console.error("Failed to fetch order history from API:", error);
		return [];
	}
};
