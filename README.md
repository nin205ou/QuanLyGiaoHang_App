# QuanLyGiaoHang_App
## Setup server
### 1. Chuẩn bị môi trường:
Clone dự án:
```
git clone https://github.com/nin205ou/QuanLyGiaoHang_App.git
```

Di chuyển vào thư mục server:
```
cd ./server/delivery
```

### 2. Cài đặt Dependencies:
Cài đặt thư viện Python:
```
py -m pip install -r requirements.txt
```
### 3. Cấu hình Database

- **Tạo database MySQL:**
   - Sử dụng công cụ quản lý MySQL để tạo một database mới với tên `delivery_app_db`.

- **Chỉnh sửa file `settings.py`:**
   - Mở file: `server/delivery/delivery/settings.py`
   - Trong phần `DATABASES`, tìm và thay đổi các giá trị `USER` và `PASSWORD` đúng với thông tin đăng nhập MySQL.

   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.mysql',
           'NAME': 'delivery_app_db',  # Tên database 
           'USER': '<your_mysql_user>', 
           'PASSWORD': '<your_mysql_password>',
           'HOST': '127.0.0.1', 
           'PORT': '3306',  # Cổng MySQL mặc định
       }
   }
   ```

### 4. Migrate Database:
Tạo các bảng trong database:
```
py manage.py makemigrations
py manage.py migrate
```
### 5. Import Dữ liệu mẫu:
Sử dụng công cụ quản lý database: Sử dụng công cụ để import các file SQL trong thư mục env vào database `delivery_app_db`.

### 6. Chạy Server Django:
```
py manage.py runserver
```

### 7. Thiết lập ngrok (Expo)

- **Tải và cài đặt ngrok:**
   - Truy cập trang web: [https://ngrok.com/download](https://ngrok.com/download)
   - Để tải xuống và cài đặt ngrok.

- **Chạy ngrok:**
   - Mở terminal hoặc command prompt.
   - Chạy lệnh sau để tạo một địa chỉ trỏ tới cổng `localhost:8000`:

     ```bash
     ngrok http 8000
     ```

- **Sao chép URL ngrok:**
   - Sau khi chạy lệnh trên, ngrok sẽ cung cấp cho bạn một URL công khai. URL này sẽ có dạng như sau:

     ```
     https://<random_string>.ngrok-free.app
     ```

   - Sao chép URL này, bạn sẽ sử dụng nó trong bước cấu hình tiếp theo.


### 8. Cấu hình Django:
Thêm vào `ALLOWED_HOSTS`:
Trong file `settings.py`, sửa URL ngrok và địa chỉ IP vào danh sách `ALLOWED_HOSTS`.<br/>
<strong>Chú ý là sửa URL ngrok cũ và đặt nó ở phần tử đầu tiên của ALLOWED_HOSTS</strong><br/>
Ví dụ như: `https://858b-2402-800-6314-c783-ec6d-c21b-6ff3-3dbf.ngrok-free.app` thì sửa thành `858b-2402-800-6314-c783-ec6d-c21b-6ff3-3dbf.ngrok-free.app`

### 9. Cấu hình ứng dụng React Native:
**Chỉnh sửa file `apis.js`:**
   - Mở file: `app/GiaoHangApp/apis.js`
   - Tìm và thay thế giá trị của biến `root_api` bằng URL ngrok đã sao chép ở bước trước.

   ```javascript
   const root_api = '<your_ngrok_url>';
  ```

### 10. Tạo OAuth2 Credentials (Chỉ lần đầu):
- **Truy cập trang admin Django:**
   - Mở trình duyệt và truy cập: `http://localhost:8000/admin/`
   - **Đăng nhập:** Sử dụng tài khoản:
      - `username`: admin2
      - `password`: 123456

- **Tạo OAuth2 application:**
   - Truy cập: `http://localhost:8000/o/applications/`
   - Nhấp vào "Click here" để tạo ứng dụng mới.
   - **Điền thông tin:**
      - `Client type`: Confidential
      - `Authorization grant type`: Resource owner password-based
   - Lưu lại `client_id` và `client_secret`.
   - **Lưu ý:** Sao chép `client_secret` **trước khi nhấn Save**, vì nó sẽ bị băm sau khi lưu.

### 11. Cấu hình ứng dụng React Native:

**Chỉnh sửa file `authContext.js`:**
   - Mở file: `app/GiaoHangApp/context/authContext.js`
   - Thay thế `client_id` và `client_secret` bằng giá trị bạn vừa tạo ở bước trước (trong phần tạo OAuth2 application).

   ```javascript
   formData.append('client_id', '<your_client_id>');
   formData.append('client_secret', '<your_client_secret>');
  ```

--> Hoàn tất

## Setup client
### 1. Di chuyển đến thư mục dự án:

   ```bash
   cd app/GiaoHangApp
   ```

### 2. Cài đặt các package cần thiết:
```
npm install
```

### 3. Khởi động Metro Bundler:

```
npm start
```
Sau khi bundler khởi động, `nhấn phím s` để mở expo với Metro Bundler.

### 4. Kết nối với ứng dụng Expo Go:

 - **Trên máy ảo hoặc điện thoại thật:**
     - Mở trình duyệt web và truy cập: [https://expo.dev/go](https://expo.dev/go) để tải và cài đặt ứng dụng Expo Go.
     - Cài đặt ứng dụng Expo Go.

 - **Nhập địa chỉ thủ công (nếu không quét được mã QR):**
   - Mở ứng dụng Expo Go trên thiết bị.
   - Chọn "Enter URL manually".
   - Nhập địa chỉ có dạng:

     ```
     exp://<địa_chỉ_IP_của_máy_tính>:8081
     ```
     
     Ví dụ: `exp://192.168.1.46:8081` (thay `192.168.1.46` bằng địa chỉ IP của máy tính đang chạy Metro Bundler).

--> Hoàn tất setup client
