### **Tổng kết đề thi: Phát triển ứng dụng LCDP hỗ trợ cộng đồng ứng phó khẩn cấp (OLP 2024)**

---

## 🎯 **Mục tiêu bài toán**
Phát triển một ứng dụng hỗ trợ cộng đồng trong các tình huống khẩn cấp như thiên tai, lũ lụt, đại dịch. Ứng dụng phải đảm bảo:  
- **Phát triển trên nền tảng LCDP mã nguồn mở** (sử dụng **Appsmith**).  
- **Phát hành mã nguồn mở** trên GitHub, sẵn sàng đóng gói và triển khai lại.  
- **Sử dụng cơ sở dữ liệu MongoDB** để lưu trữ thông tin người dùng, thông báo và nơi trú ẩn.  
- **Tích hợp công nghệ của bên thứ 3** (OpenStreetMap, Nominatim API, OSRM) để hỗ trợ chức năng bản đồ, tìm kiếm và dẫn đường.  

---

## 💡 **Ý tưởng ứng dụng**
**Ứng dụng cảnh báo khẩn cấp và sơ tán an toàn**  
> Một nền tảng giúp chính quyền và cộng đồng ứng phó với các tình huống khẩn cấp bằng cách gửi cảnh báo nhanh, tìm kiếm nơi trú ẩn và dẫn đường từ vị trí người dùng đến nơi an toàn.  

---

## ✨ **Chức năng chính**
| **Chức năng**            | **Mô tả**                                                        | **Công nghệ thực hiện**                      |
|-------------------------|------------------------------------------------------------------|--------------------------------------------|
| **Gửi cảnh báo khẩn cấp** | Quản trị viên (Admin) gửi thông báo khẩn cấp đến người dùng.    | **Appsmith + MongoDB**                    |
| **Bản đồ trú ẩn**         | Hiển thị bản đồ trú ẩn (dùng OSM) với các vị trí trú ẩn gần nhất.| **Leaflet.js + OSM API**                   |
| **Tìm kiếm trú ẩn**       | Tìm và hiển thị nơi trú ẩn gần nhất từ vị trí người dùng.      | **Nominatim API + MongoDB**               |
| **Chỉ đường**             | Tìm đường đi từ vị trí hiện tại của người dùng đến nơi trú ẩn. | **OSRM API + Leaflet.js**                 |
| **Quản lý trú ẩn**         | Quản trị viên quản lý thông tin các địa điểm trú ẩn.          | **Appsmith + MongoDB**                    |
| **Quản lý người dùng**    | Đăng ký tài khoản người dùng, tình nguyện viên và quản trị viên.| **MongoDB (collection: users)**         |
| **Gửi thông báo**         | Gửi thông báo trên ứng dụng hoặc thông báo SMS nếu cần.        | **Appsmith (Thông báo), Twilio (SMS)**    |

---

## 📦 **Công cụ và công nghệ**
| **Công cụ / Nền tảng**      | **Mô tả**                                                 |
|----------------------------|----------------------------------------------------------|
| **Appsmith**                | Nền tảng phát triển giao diện ứng dụng LCDP.              |
| **MongoDB**                 | Lưu trữ thông tin người dùng, trú ẩn và cảnh báo.         |
| **OpenStreetMap (OSM)**     | Bản đồ nguồn mở hiển thị địa điểm trú ẩn.                 |
| **Leaflet.js**              | Thư viện JS để hiển thị bản đồ từ OSM.                    |
| **OSRM**                    | Dẫn đường từ vị trí người dùng đến nơi trú ẩn.           |
| **Nominatim API**           | Tìm kiếm và định vị địa điểm trên bản đồ OSM.             |
| **Twilio API (tùy chọn)**   | Gửi SMS cảnh báo cho người dân trong tình huống khẩn cấp. |
| **GitHub**                  | Lưu trữ mã nguồn và đóng gói phát hành.                   |

---

## 🛠️ **Kiến trúc hệ thống**
1. **Phân cấp người dùng**  
   - **Người dân (User)**: Nhận cảnh báo khẩn cấp, tìm kiếm nơi trú ẩn, dẫn đường đến trú ẩn.  
   - **Quản trị viên (Admin)**: Gửi cảnh báo, quản lý thông tin trú ẩn và tình nguyện viên.  

2. **Các thành phần chính**  
   - **Frontend**: Appsmith (xây dựng giao diện, quản lý trạng thái ứng dụng).  
   - **Backend**: MongoDB để lưu trữ thông tin.  
   - **Bản đồ**: OpenStreetMap (hiển thị bản đồ), Nominatim API (tìm kiếm địa điểm), OSRM (chỉ đường).  

3. **Luồng dữ liệu chính**  
   - **Quản trị viên** gửi cảnh báo từ giao diện Appsmith → Thông báo được lưu trong **MongoDB** → Thông báo được đẩy đến giao diện người dùng.  
   - **Người dùng** sử dụng ứng dụng để tìm nơi trú ẩn gần nhất → Tọa độ được gửi đến **Nominatim API** và kết quả trả về là danh sách trú ẩn gần đó.  
   - **Chỉ đường** từ vị trí người dùng đến trú ẩn được thực hiện thông qua **OSRM API**, trả về lộ trình và hiển thị trên bản đồ.  

---

## 📋 **Cơ sở dữ liệu (MongoDB)**
| **Collection**     | **Trường dữ liệu**                             | **Mô tả**                                   |
|-------------------|-----------------------------------------------|--------------------------------------------|
| **users**         | id, tên, vai trò, số điện thoại, vị trí       | Lưu thông tin về người dùng, tình nguyện viên, quản trị viên. |
| **alerts**        | id, nội dung, thời gian, vị trí               | Lưu trữ các cảnh báo khẩn cấp được gửi bởi Admin. |
| **shelters**      | id, tên, tọa độ, sức chứa, tình trạng         | Thông tin về các điểm trú ẩn (sức chứa, tọa độ). |
| **admin_logs**    | hành động, ngày giờ, admin_id                 | Theo dõi các hành động của quản trị viên.  |

---

## 📍 **Giao diện người dùng (UI/UX)**
| **Trang**           | **Chức năng**                                     |
|---------------------|---------------------------------------------------|
| **Trang chính**     | Hiển thị danh sách các cảnh báo khẩn cấp.         |
| **Bản đồ trú ẩn**    | Bản đồ với các marker cho vị trí trú ẩn an toàn. |
| **Tìm kiếm trú ẩn**  | Tìm nơi trú ẩn gần nhất và dẫn đường đến đó.     |
| **Quản lý trú ẩn**   | Quản trị viên thêm, sửa, xóa thông tin trú ẩn.    |
| **Quản lý cảnh báo** | Gửi thông báo khẩn cấp từ admin đến người dùng.  |

---

## 🚀 **Triển khai và đóng gói**
1. **Phát hành mã nguồn trên GitHub**:  
   - Đóng gói mã nguồn, README.md (hướng dẫn triển khai), tập lệnh để cài đặt lại cơ sở dữ liệu.  
   - Phát hành dưới dạng **GitHub Release** để người dùng có thể tải về và triển khai lại.  

2. **Triển khai ứng dụng**:  
   - **Tạo tài khoản MongoDB Atlas** để quản lý cơ sở dữ liệu.  
   - **Kết nối Appsmith với MongoDB** thông qua URL kết nối.  
   - **Chạy ứng dụng trên server** (có thể triển khai trên **Heroku, AWS, DigitalOcean**).  

---

## ⏰ **Kế hoạch thực hiện**
| **Thời gian**  | **Công việc**                      |
|-----------------|------------------------------------|
| **Ngày 1**     | Phân tích yêu cầu, chọn ý tưởng, thiết kế mockup. |
| **Ngày 2-3**   | Phát triển giao diện bằng **Appsmith**. |
| **Ngày 4**     | Tích hợp **OSM (Leaflet), OSRM, Nominatim API**. |
| **Ngày 5**     | Kết nối cơ sở dữ liệu **MongoDB** và kiểm thử. |
| **Ngày 6**     | Đóng gói, phát hành mã nguồn lên **GitHub**.  |

---

## 📢 **Tổng kết**
- **Ý tưởng**: Ứng dụng cảnh báo khẩn cấp và hỗ trợ tìm kiếm trú ẩn an toàn.  
- **Nền tảng**: **Appsmith + MongoDB + OpenStreetMap (OSM) + OSRM + Nominatim API**.  
- **Chức năng chính**: Gửi cảnh báo, tìm nơi trú ẩn, dẫn đường, quản lý trú ẩn và người dùng.  
- **Phát hành**: Đóng gói mã nguồn trên **GitHub** và hỗ trợ triển khai lại.  

👉 **Kết quả mong đợi**: Ứng dụng hỗ trợ cộng đồng trong tình huống khẩn cấp một cách nhanh chóng và dễ triển khai lại.  

Nếu cần thêm chi tiết về **mã nguồn mẫu**, **hướng dẫn cài đặt**, hoặc **hỗ trợ chức năng cụ thể**, mình sẵn sàng hỗ trợ! 🚀