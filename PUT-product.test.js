const request = require("supertest");
const baseURL = "https://api.practicesoftwaretesting.com";

let brandId = "";
let categoryId = "";
let imageId;
let productId = "";

beforeEach(async () => {
  const getProducts = await request(baseURL)
    .get(`/products`)
    .send({
      page: 1
    });

  console.log("Response Body:", getProducts.body);

  if (getProducts.body.data && getProducts.body.data.length > 0) {
    productId = getProducts.body.data[0].id;
    brandId = getProducts.body.data[0].brand.id;
    categoryId = getProducts.body.data[0].category.id;
    imageId = getProducts.body.data[0].product_image.id;

    console.log("productId:", productId);
    console.log("brandId:", brandId);
    console.log("categoryId:", categoryId);
    console.log("imageId:", imageId);
  } else {
    throw new Error("No products found with the specified brand and category.");
  }
});

describe("Update Products By Id", () => {
  test("Scenario: Verify success update product id", async () => {
    const response = await request(baseURL)
      .put(`/products/${productId}`)
      .send({
        name: "Updated Produk-Test",
        description: "Updated Deskripsi Produk",
        price: 1.99,
        category_id: categoryId,
        brand_id: brandId,
        product_image_id: imageId,
        is_location_offer: 1,
        is_rental: 0,
      })
      .set("Content-Type", "application/json");

    console.log("Response Body:", response.body);
    console.log("Response Status:", response.status)

    expect(response.status).toBe(200);
    console.log(response.status)
    expect(response.body).toHaveProperty("success");
    console.log(response.body)
  });
});