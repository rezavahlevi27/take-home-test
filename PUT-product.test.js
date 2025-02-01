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

  test("Create Product - Invalid endpoint (404)", async () => {
    const response = await request(baseURL)
      .put(`/productss/${productId}`)
      .send({
        name: "invalid endpoint",
        description: "invalid endpoint",
        price: 1.99,
        category_id: categoryId,
        brand_id: brandId,
        product_image_id: imageId,
        is_location_offer: 1,
        is_rental: 0,
      })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(404);
    console.log("actual status: " + response.status + ", expected status 404");
    console.log("response body:", response.body)
  });

  test("Create Product - Invalid method (405)", async () => {
    const response = await request(baseURL)
      .post(`/products/${productId}`)
      .send({
        name: "invalid method",
        description: "invalid method",
        price: 1.99,
        category_id: categoryId,
        brand_id: brandId,
        product_image_id: imageId,
        is_location_offer: 1,
        is_rental: 0,
      })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(405);
    console.log("actual status: " + response.status + ", expected status 405");
    console.log("response body:", response.body)
  });

  test("Create Product - invalid server was not able to process (422)", async () => {
    const response = await request(baseURL)
      .put(`/products/${productId}`)
      .send({
        name: "invalid server",
        description: "invalid server",
        price: 1.99,
        category_id: categoryId,
        brand_id: brandId,
        product_image_id: imageId,
        is_location_offer: 5,
        is_rental: 6,
      })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(422);
    console.log("actual status: " + response.status + ", expected status 422");
    console.log("response body:", response.body)
  });
});