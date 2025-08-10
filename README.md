# Simple Education Apps

Aplikasi pendidikan sederhana menggunakan _stack_ MERN (MongoDB, Express.js, React.js, Node.js)

## Prasyarat

Telah menginstal:
- Node.js (aplikasi menggunakan v22.18.0)
- npm (biasanya sudah sepaket dengan Node.js, aplikasi menggunakan v10.9.3)
- MongoDB di _local_ maupun Atlas (aplikasi menggunakan v8.0.12)
- Telah menambahkan MongoDB ke _Environment Variables_

## Penginstalan

1. **_Clone repository_ ini**
```bash
git clone https://github.com/SanGit56/edu-app-mern.git
cd edu-app-mern
```

2. **Instal dependensi _backend_**
```bash
cd backend
npm install
```

3. **Konfigurasi _environment variables_**

Buat file `.env` di folder `/backend`
```env
MONGO_URI=mongodb://127.0.0.1:27017/edu-app-mern
```

4. **Instal dependensi _frontend_**
```bash
cd ../frontend
npm install
```

5. **Jalankan proyek**

Dari _root_ proyek jalankan
```bash
npm start
```