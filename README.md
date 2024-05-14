# QuanLyGiaoHang_App
# Setup server
1. Chuẩn bị môi trường:
Clone dự án:
git clone https://github.com/nin205ou/QuanLyGiaoHang_App.git

Di chuyển vào thư mục server:
cd ./server/delivery

2. Cài đặt Dependencies:
Cài đặt thư viện Python:
py -m pip install -r requirements.txt

3. Cấu hình Database:
*Tạo database MySQL:

Tạo một database mới với tên delivery_app_db sử dụng công cụ quản lý MySQL.
Chỉnh sửa file settings.py:
Mở file server/delivery/delivery/settings.py.
Trong phần DATABASES, thay đổi USER và PASSWORD sao cho phù hợp với thông tin đăng nhập MySQL.

4. Migrate Database:
Tạo các bảng trong database:
py manage.py makemigrations
py manage.py migrate

5. Import Dữ liệu mẫu:
Sử dụng công cụ quản lý database: Sử dụng công cụ để import các file SQL trong thư mục env vào database delivery_app_db.

6. Chạy Server Django:
py manage.py runserver

7. Thiết lập ngrok (Expo):
Tải ngrok:
Truy cập https://ngrok.com/download để tải và cài đặt ngrok.
Mở file ngrok.exe và chạy ngrok với lệnh:
ngrok http 8000

Copy URL ngrok:
Sao chép URL ngrok được cung cấp (ví dụ: https://3c08-115-73-132-68.ngrok-free.app).

8. Cấu hình Django:
Thêm vào ALLOWED_HOSTS:
Trong file settings.py, thêm URL ngrok và địa chỉ IP của máy ảo (nếu có) vào danh sách ALLOWED_HOSTS.

9. Cấu hình ứng dụng React Native:
Sửa file apis.js:
Mở file app/GiaoHangApp/apis.js.
Thay thế giá trị của root_api bằng URL ngrok.

10. Tạo OAuth2 Credentials (Chỉ lần đầu):
Truy cập trang admin Django:
Mở trình duyệt và truy cập http://localhost:8000/admin/.
Đăng nhập:
Sử dụng tài khoản username=admin2 và password=123456.

Tạo OAuth2 application:
Truy cập http://localhost:8000/o/applications/.
Nhấp vào "Click here" để tạo ứng dụng mới.
Client type chọn Confidential
Authorization grant type chọn Resource owner assword-based
Điền thông tin và lưu lại client_id và client_secret.
Lưu ý client_secret copy trước khi nhấn save khi tạo app, vì nó sẽ bị băm sau khi save

11. Cấu hình ứng dụng React Native:
Sửa file authContext.js:
Mở file app/GiaoHangApp/context/authContext.js.
Thay thế client_id và client_secret bằng giá trị bạn vừa tạo.
formData.append('client_id', 'AENcdHOHsUoIgOSKLSNtH5pIZbbJzWhLodGkgCRt');
formData.append('client_secret', 'GxDX99jOIbBwIeS0YmsSlKV0ltFrO1ZrxUIcV8nhUffz8qA7jd6ouLH1lCkBWU8aSU08qlB2dDhpndKdg6Rb2e9NyQER4MimQyndabuJNGVToplN9jMLh8Rq9bFTOlrm');

--> Hoàn tất

# Setup client
1. Cd đến thư mục dự án:
cd app/GiaoHangApp

2. Cài đặt các package cần thiết:
npm install

3. Khởi động Metro Bundler:
npm start

Sau khi bundler khởi động, nhấn phím s để mở trình duyệt web với Metro Bundler.

4. Kết nối với ứng dụng Expo Go:

Mở trình duyệt trên máy ảo và truy cập để tải app expo tại https://expo.dev/go
Nhập địa chỉ thủ công (nếu không quét được mã QR):
Mở ứng dụng Expo Go và chọn "Enter URL manually".
Nhập địa chỉ có dạng exp://<ip_address của wifi>:8081 (ví dụ: exp://192.168.1.46:8081).

--> Hoàn tất setup client