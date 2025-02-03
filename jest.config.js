/** @type {import('jest').Config} */
module.exports = {
    clearMocks: true,  // Membersihkan mock antar pengujian
   
    reporters: [
      "default", // Reporter default untuk terminal
      // Laporan dalam format XML (untuk CI/CD seperti Jenkins)
      [
        "jest-junit",
        {
          outputDirectory: "./test-reports",  // Direktori untuk menyimpan hasil tes
          outputName: "test-report.xml",      // Nama file XML
        }
      ],
   
      // Laporan dalam format HTML
      [
        "jest-html-reporters",
        {
          publicPath: "./test-reports",  // Direktori penyimpanan laporan HTML
          filename: "test-report.html",  // Nama file laporan HTML
          expand: true                   // Menampilkan detail hasil tes
        }
      ]
    ],
   
    testEnvironment: "node", // Menggunakan environment Node.js
    verbose: true,  // Menampilkan detail hasil tes di terminal
  };