const request = require("supertest");
const baseURL = "https://api.practicesoftwaretesting.com";

let branchId = "";
let categoryId = "";
let imageId = "";
let productId = "";
let a = "asd"

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

beforeEach(async () => {
  const brandResponse = await request(baseURL)
    .post("/brands")
    .send({
      name: `Brand-${generateRandomString(4)}`,
      slug: `Brand-slug${generateRandomString(4)}`,
    })
    .set("Content-Type", "application/json");
  branchId = brandResponse.body.id;

  const categoryResponse = await request(baseURL)
    .post("/categories")
    .send({
      name: `Category-${generateRandomString(4)}`,
      slug: `Category-slug${generateRandomString(4)}`,
    })
    .set("Content-Type", "application/json");
  categoryId = categoryResponse.body.id;

  const imageResponse = await request(baseURL).get("/images");
  if (Array.isArray(imageResponse.body) && imageResponse.body.length > 0) {
    imageId = imageResponse.body[0].id;
  } else {
    throw new Error("No images found in response.");
  }

  const productResponse = await request(baseURL)
    .post("/products")
    .send({
      name: "Produk-Test",
      desc: "Deskripsi Produk",
      price: 100,
      category_id: categoryId,
      brand_id: branchId,
      product_image_id: imageId,
      is_location_offer: 1,
      is_rental: 0,
    })
    .set("Content-Type", "application/json");

  productId = productResponse.body.id;
});

describe("Get Product by Id", () => {
  test("Scenario: Verify success get product", async () => {
    const response = await request(baseURL).get(`/products/${productId}`);

    console.log("Response Body:", response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", productId);
  });

  test("Scenario: Verify invalid inputs products id", async () => {
    const response = await request(baseURL).get(`/products/${productId}-${a}`);

    expect(response.body).toHaveProperty("message")
    console.log("Response Body:", response.body);
    expect(response.status).toBe(404);
    console.log("Response status:", response.status)
  });
});