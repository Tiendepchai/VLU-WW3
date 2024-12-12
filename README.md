# Emergency Alert and Shelter Finder App

## 📌 **Giới thiệu**

Ứng dụng Cảnh Báo Khẩn Cấp và Tìm Kiếm Trú Ẩn An Toàn là một nền tảng mã nguồn mở hỗ trợ cộng đồng và chính quyền trong các tình huống khẩn cấp, bao gồm thiên tai, lũ lụt, và đại dịch. Ứng dụng này cung cấp các tính năng như gửi cảnh báo nhanh, tìm kiếm nơi trú ẩn gần nhất, và dẫn đường từ vị trí người dùng đến nơi an toàn.

Được phát triển trên nền tảng **Appsmith** và sử dụng **MongoDB** để lưu trữ dữ liệu, ứng dụng tích hợp các API bên thứ ba như **OpenStreetMap**, **Nominatim API**, và **OSRM** để cung cấp chức năng bản đồ và dẫn đường.

## 🚀 **Cài đặt và Triển khai**

### 1. **Yêu cầu hệ thống**
- **Appsmith** (Dành cho phát triển giao diện)
- **MongoDB** (Dùng để lưu trữ dữ liệu người dùng, cảnh báo, và nơi trú ẩn)
- **Node.js** và **npm** (Dành cho môi trường phát triển và triển khai)
- **OpenStreetMap (OSM)**, **Nominatim API**, và **OSRM API** (Dùng cho bản đồ và dẫn đường)

### 2. **Hướng dẫn cài đặt**

#### **Bước 1: Cài đặt môi trường**
- Cài đặt Node.js và npm:  
  [Node.js Download](https://nodejs.org/)

- Cài đặt Appsmith và MongoDB:
  - Truy cập [Appsmith Documentation](https://www.appsmith.com/docs) để thiết lập và chạy Appsmith.
  - Tạo tài khoản MongoDB Atlas và thiết lập cơ sở dữ liệu.

#### **Bước 2: Cấu hình ứng dụng**
- Kết nối Appsmith với MongoDB thông qua URL kết nối MongoDB Atlas.
- Cấu hình các API bên thứ ba:
  - Đăng ký API **OpenStreetMap (OSM)** và **Nominatim API**.
  - Kết nối **OSRM** để dẫn đường.

#### **Bước 3: Chạy ứng dụng**
- Triển khai ứng dụng trên **Heroku**, **AWS**, hoặc **DigitalOcean** (hoặc bất kỳ VPS nào).
- Cấu hình các môi trường và biến API cho ứng dụng.

#### **Bước 4: Kiểm tra**
- Đảm bảo ứng dụng hoạt động như mong đợi:
  - Gửi cảnh báo khẩn cấp từ giao diện Admin.
  - Tìm kiếm và dẫn đường đến nơi trú ẩn từ giao diện người dùng.

### 3. **Đóng gói và phát hành**
- Đóng gói mã nguồn và cập nhật **README.md** với hướng dẫn chi tiết.
- Phát hành mã nguồn trên **GitHub Release** để người dùng dễ dàng tải về và triển khai lại.

## 🛠 **Công nghệ sử dụng**
- **Appsmith**: Nền tảng phát triển giao diện LCDP.
- **MongoDB**: Cơ sở dữ liệu lưu trữ thông tin người dùng, cảnh báo, và nơi trú ẩn.
- **OpenStreetMap (OSM)**: Cung cấp bản đồ và địa điểm trú ẩn.
- **Nominatim API**: Tìm kiếm địa điểm trên bản đồ.
- **OSRM API**: Dẫn đường từ vị trí người dùng đến nơi trú ẩn.
- **Twilio API**: Gửi SMS cảnh báo (tùy chọn).


## 📄 **Giấy phép**
Dự án này được phát hành dưới giấy phép **MIT**. Bạn có thể tự do sử dụng, sao chép, sửa đổi, phân phối và phát hành lại mã nguồn theo các điều khoản của giấy phép MIT.

## 📢 **Liên hệ**
Nếu bạn có bất kỳ câu hỏi nào, xin vui lòng liên hệ với chúng tôi qua email: [narutomuonnam@gmail.com](mailto:narutomuonnam@gmail.com).

