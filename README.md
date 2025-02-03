Pengujian API Otomatis dengan Supertest

Pengaturan dan Menjalankan Pengujian
Prasyarat:
-Node.js (versi 16 atau lebih baru)
-npm (Node Package Manager)
-Supertest dan Jest terinstal

Langkah Instalasi
1.Clone repositori ini:
git clone https://github.com/rezavahlevi27/take-home-test.git
cd take-home-test

2.Instal dependensi:
npm install

3.Jalankan pengujian:
npm test

Pendekatan Pengujian
-Pengujian Fungsional: Menggunakan Supertest untuk menguji setiap endpoint API secara langsung.
-Pengujian Negatif: Menguji skenario input tidak valid untuk memastikan API menangani kesalahan dengan benar.
-Validasi Respons: Memeriksa apakah respons API sesuai dengan ekspektasi, baik dari segi status kode maupun struktur data.
-Automasi Pengujian: Menggunakan Jest sebagai test runner untuk menjalankan pengujian secara otomatis.

Integrasi CI/CD
-Continuous Integration (CI):
Menggunakan GitHub Actions untuk menjalankan pengujian otomatis setiap kali ada perubahan kode.
Memastikan tidak ada perubahan yang merusak fungsionalitas sebelum dideploy.
-Continuous Deployment (CD):
Setelah pengujian lulus, kode dapat langsung dideploy.

Asumsi & Keputusan:
-Endpoint API yang digunakan diasumsikan dapat diakses dan berfungsi dengan baik.
-Kasus uji dibuat berdasarkan respons API yang diharapkan (kode status dan format body).
-Pengujian mencakup skenario input valid dan tidak valid untuk memastikan cakupan yang menyeluruh.
-Library Supertest digunakan untuk pengujian permintaan HTTP, dan Jest digunakan sebagai test runner.

Hasil Pengujian & Temuan

Pengujian Berhasil:
-Pembuatan merek, kategori, dan produk dengan input valid mengembalikan 201 Created.
-Pengambilan gambar produk mengembalikan 200 OK.
-Pengambilan data produk dengan GET mengembalikan 200 OK.
-Pembaruan produk dengan PUT dan PATCH mengembalikan 200 OK jika input valid.

Kasus Uji Negatif:

-ID kategori yang tidak valid mengembalikan 404 Not Found.
-Field wajib yang hilang dalam pembuatan produk mengembalikan 422 Unprocessable Entity.
-Metode HTTP yang salah mengembalikan 405 Method Not Allowed.
-Format harga yang tidak benar mengembalikan 422 Unprocessable Entity.
-ID produk yang tidak ditemukan untuk GET, PUT, atau PATCH mengembalikan 404 Not Found.
-Hasil Pengujian yang Dijalankan:

Create Brand:
Request: { "name": "Brand-reza-001", "slug": "Slug-reza-001" }
Response: 201 Created
ID Brand: 12345

Create Category:
Request: { "name": "Category-reza-002", "slug": "Slug-reza-002" }
Response: 201 Created
ID Kategori: 67890

Get Product Image:
Response: 200 OK
ID Gambar: 11111

Create Product (Valid):
Request: { "name": "reza", "desc": "barang reza", "price": 4, "category_id": "67890", "brand_id": "12345", "product_image_id": "11111", "is_location_offer": 1, "is_rental": 0 }
Response: 201 Created

Create Product (Invalid - Missing Name):
Request: { "desc": "barang reza", "price": 4, "category_id": "67890", "brand_id": "12345", "product_image_id": "11111", "is_location_offer": 1, "is_rental": 0 }

Response: 422 Unprocessable Entity
Error: "name" is required

Create Product (Invalid - Invalid Price Format):
Request: { "name": "reza", "desc": "barang reza", "price": "invalid_price", "category_id": "67890", "brand_id": "12345", "product_image_id": "11111", "is_location_offer": 1, "is_rental": 0 }
Response: 422 Unprocessable Entity
Error: "price" must be a number

Get Product (Valid):
Request: GET /products/{product_id}
Response: 200 OK
Get Product (Invalid - Product Not Found):
Request: GET /products/invalid_id
Response: 404 Not Found
Update Product (Valid - PUT):
Request: PUT /products/{product_id} dengan data yang diperbarui
Response: 200 OK

Update Product (Invalid - PUT with Missing Field):
Request: PUT /products/{product_id} tanpa field wajib
Response: 422 Unprocessable Entity
Update Product (Invalid - Product Not Found - PUT):
Request: PUT /products/invalid_id
Response: 404 Not Found

Partial Update Product (Valid - PATCH):
Request: PATCH /products/{product_id} hanya dengan beberapa field diperbarui
Response: 200 OK
Partial Update Product (Invalid - PATCH with Wrong Data Format):
Request: PATCH /products/{product_id} dengan format data salah
Response: 422 Unprocessable Entity
Partial Update Product (Invalid - Product Not Found - PATCH):
Request: PATCH /products/invalid_id
Response: 404 Not Found