# CipherNestFE - Frontend (ReactJS)

**CipherNestFE** là phần frontend của ứng dụng **CipherNest**, được phát triển bằng ReactJS. Phần frontend này cung cấp giao diện người dùng trực quan để tương tác với các tính năng mã hóa và giải mã thông tin trong file âm thanh (Audio Steganography). Ứng dụng kết nối với backend Django để xử lý logic nghiệp vụ.

## Tính năng chính

- **Mã hóa thông tin vào file âm thanh**: Người dùng có thể tải lên một file âm thanh và nhập thông tin bí mật để ẩn vào file đó.
- **Giải mã thông tin từ file âm thanh**: Người dùng có thể tải lên file âm thanh đã được mã hóa để trích xuất thông tin bí mật.
- **Hỗ trợ nhiều định dạng âm thanh**: Ứng dụng hỗ trợ các định dạng âm thanh phổ biến như WAV, MP3, v.v.
- **Giao diện trực quan**: Dễ dàng sử dụng với giao diện web thân thiện, được xây dựng bằng ReactJS và các thư viện UI như Material-UI hoặc Bootstrap.

## Công nghệ sử dụng

- **Frontend**: ReactJS, React Router, Axios
- **Styling**: CSS, SCSS, hoặc CSS-in-JS (Styled Components, Emotion)
- **State Management**: Redux hoặc Context API (tùy chọn)
- **API**: Kết nối với backend Django thông qua RESTful API
- **Build Tool**: Webpack (được cấu hình sẵn bởi Create React App)

## Cài đặt và chạy dự án

### Yêu cầu hệ thống

- Node.js (phiên bản 14.x trở lên)
- npm hoặc yarn

### Các bước cài đặt

1. **Clone dự án**:
   ```bash
   git clone https://github.com/tranlequocthong313/CipherNestFE.git
   cd CipherNestFE
   ```

2. **Cài đặt các dependencies**:
   ```bash
   npm install
   # hoặc
   yarn install
   ```

3. **Chạy dự án**:
   ```bash
   npm start
   # hoặc
   yarn start
   ```

4. **Truy cập ứng dụng**:
   - Mở trình duyệt và truy cập vào địa chỉ: `http://localhost:3000`

### Cấu hình môi trường

Tạo file `.env` trong thư mục gốc của dự án và thêm các biến môi trường cần thiết (nếu có):

```env
REACT_APP_API_URL=http://localhost:8000/api
```

## Cấu trúc thư mục

```
CipherNestFE/
├── public/                  # Thư mục chứa các file tĩnh (index.html, favicon, v.v.)
├── src/                     # Source code chính
│   ├── assets/              # Hình ảnh, font, và các file tĩnh khác
│   ├── components/          # Các component ReactJS
│   ├── pages/               # Các trang chính của ứng dụng
│   ├── services/            # Các service để gọi API
│   ├── styles/              # File CSS/SCSS hoặc CSS-in-JS
│   ├── utils/               # Các hàm tiện ích
│   ├── App.js               # Component chính
│   ├── index.js             # File entry point
│   └── routes.js            # Cấu hình React Router (nếu có)
├── .env                     # File cấu hình môi trường
├── package.json             # Danh sách dependencies và scripts
└── README.md                # Tài liệu hướng dẫn
```

## Các trang chính

- **Trang chủ**: Giới thiệu về ứng dụng và hướng dẫn sử dụng.
- **Trang mã hóa**: Cho phép người dùng tải lên file âm thanh và nhập thông tin bí mật để mã hóa.
- **Trang giải mã**: Cho phép người dùng tải lên file âm thanh đã được mã hóa để trích xuất thông tin bí mật.

## Kết nối với Backend

Frontend kết nối với backend Django thông qua các API endpoints sau:

- **Mã hóa thông tin**:
  - `POST /api/encode/` - Gửi file âm thanh và thông tin bí mật để mã hóa.
- **Giải mã thông tin**:
  - `POST /api/decode/` - Gửi file âm thanh đã được mã hóa để giải mã.

## Đóng góp

Nếu bạn muốn đóng góp vào dự án, vui lòng làm theo các bước sau:

1. Fork dự án
2. Tạo branch mới (`git checkout -b feature/YourFeatureName`)
3. Commit các thay đổi (`git commit -m 'Add some feature'`)
4. Push lên branch (`git push origin feature/YourFeatureName`)
5. Mở một Pull Request

## Liên hệ

Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào, vui lòng liên hệ:

- **Tên**: Trần Lê Quốc Thông
- **Email**: tranlequocthong313@gmail.com
- **GitHub**: [tranlequocthong313](https://github.com/tranlequocthong313)
