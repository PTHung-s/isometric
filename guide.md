# Isometric Memory Room - Hướng dẫn hoàn tất

Project đã được cài đặt thành công với React và Three.js. Để ứng dụng hoạt động, bạn cần thực hiện 2 bước cuối cùng sau:

## 1. Tải Model 3D
1. Truy cập: [Sketchfab - Low Poly Isometric Room](https://sketchfab.com/3d-models/low-poly-isometric-room-56cf7d5811304608b5e6d724195c6ccd)
2. Nhấn **Download 3D Model**.
3. Chọn định dạng **GLB**.
4. Giải nén (nếu cần) và copy file vào thư mục: `isometric/public/models/`
5. Giữ nguyên tên file là `low_poly_isometric_room.glb` (hoặc đổi tên nếu code yêu cầu khác).

## 2. Thêm Hình Ảnh
1. Chuẩn bị 3 tấm ảnh kỷ niệm của bạn (nên dùng tỉ lệ 4:3 hoặc 3:2).
2. Copy vào thư mục: `isometric/public/photos/`
3. Đổi tên thành:
   - `photo1.jpg`
   - `photo2.jpg`
   - `photo3.jpg`
*(Nếu không có ảnh, ứng dụng sẽ tự động dùng ảnh demo từ Internet)*

## 4. Hosting lên GitHub Pages
Project này hoàn toàn có thể host free trên GitHub Pages. Cách làm nhanh nhất:

1. Tạo một repository mới trên GitHub (ví dụ: `my-memory-room`).
2. Trong terminal tại folder `isometric`, chạy lệnh:
   ```bash
   npm install gh-pages --save-dev
   ```
3. Mở file `package.json`, thêm dòng này vào trước "dependencies":
   `"homepage": "https://<USER_NAME>.github.io/<REPO_NAME>",`
4. Thêm 2 script vào phần "scripts":
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
5. Chạy lệnh: `npm run deploy`.

---
*Chúc bạn có một trải nghiệm tuyệt vời với món quà 3D này!*
