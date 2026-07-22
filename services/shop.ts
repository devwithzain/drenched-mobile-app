import apiClient from "./apiClient";

export interface Product {
	id: number;
	title: string;
	image: string;
	file_path?: string;
	short_description: string;
	description: string;
	quantity: number;
	price: number;
	slug: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
	try {
		const response = await apiClient.get("/products");
		return response.data.success ? response.data.data : [];
	} catch (error) {
		console.error("Failed to fetch shop products from API:", error);
		return [];
	}
};

export const fetchProductDetail = async (slug: string): Promise<Product | null> => {
	try {
		const response = await apiClient.get(`/products/${slug}`);
		return response.data.success ? response.data.data : null;
	} catch (error) {
		console.error(`Failed to fetch product details for slug: ${slug}`, error);
		return null;
	}
};
