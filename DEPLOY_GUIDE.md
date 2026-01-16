# 🚀 Hướng Dẫn Host Lên GitHub Pages

## Bước 1: Chuẩn Bị Repository

### 1.1. Tạo Repository trên GitHub
1. Truy cập: https://github.com/new
2. Đặt tên repository (ví dụ: `my-memory-room`)
3. Chọn **Public** (bắt buộc cho GitHub Pages miễn phí)
4. **KHÔNG** chọn "Add a README file"
5. Click **"Create repository"**

### 1.2. Khởi tạo Git trong project (nếu chưa có)
```bash
cd C:\Users\PhamT\Python\QuaSN\isometric
git init
git add .
git commit -m "Initial commit: Memory Room Gallery"
```

### 1.3. Kết nối với GitHub Repository
```bash
# Thay YOUR_USERNAME và YOUR_REPO bằng thông tin của bạn
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

## Bước 2: Cấu Hình Vite Cho GitHub Pages

### 2.1. Cập nhật file `vite.config.ts`
Mở file `vite.config.ts` và thêm `base`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/YOUR_REPO/',  // ⚠️ Thay YOUR_REPO bằng tên repository của bạn
})
```

**Ví dụ:** Nếu repository tên là `my-memory-room`, thì `base: '/my-memory-room/'`

### 2.2. Thêm ảnh vào thư mục `public/photos/`
Đảm bảo rằng bạn đã có các file ảnh:
```
public/
  photos/
    photo1.jpg
    photo2.jpg
    photo3.jpg
    ... (tổng cộng 8 ảnh)
```

---

## Bước 3: Build và Deploy

### 3.1. Cài đặt package để deploy
```bash
npm install --save-dev gh-pages
```

### 3.2. Thêm script deploy vào `package.json`
Mở `package.json` và thêm vào phần `"scripts"`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 3.3. Build và Deploy lên GitHub Pages
```bash
npm run deploy
```

Lệnh này sẽ:
- Build project ra thư mục `dist/`
- Tự động push lên nhánh `gh-pages`
- Công khai website của bạn

---

## Bước 4: Kích Hoạt GitHub Pages

1. Truy cập: `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/pages`
2. Tại mục **"Source"**, chọn:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. Click **"Save"**
4. Đợi 2-3 phút để GitHub xử lý

---

## Bước 5: Truy Cập Website

Website của bạn sẽ có địa chỉ:
```
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

**Ví dụ:**
- Username: `phamthuan`
- Repository: `my-memory-room`
- → Website: `https://phamthuan.github.io/my-memory-room/`

---

## 🔄 Cập Nhật Sau Này

Mỗi khi thay đổi code, chạy lại:

```bash
git add .
git commit -m "Mô tả thay đổi"
git push origin main
npm run deploy
```

---

## ⚠️ Lưu Ý Quan Trọng

### 1. Model 3D (low_poly_isometric_room.glb)
Đảm bảo file model nằm trong:
```
public/
  models/
    low_poly_isometric_room.glb
```

### 2. Ảnh trong `/photos/`
- Đặt 8 ảnh của bạn vào `public/photos/`
- Đặt tên theo thứ tự: `photo1.jpg`, `photo2.jpg`, ..., `photo8.jpg`
- Hoặc sửa URL trong file `src/components/Room.tsx`

### 3. Base URL
Kiểm tra lại `base` trong `vite.config.ts` phải khớp với tên repository

### 4. Repository Public
GitHub Pages miễn phí chỉ hỗ trợ repository **Public**

---

## 🎉 Hoàn Thành!

Bây giờ bạn có thể chia sẻ link website cho bạn bè!

**Tính năng:**
- ✅ Tự động vào Walk Mode khi mở trang
- ✅ WASD để di chuyển tự do trong khu vườn
- ✅ Click vào ảnh để xem toàn màn hình
- ✅ Nhấn ESC để đóng ảnh
- ✅ Khám phá khu vườn hoa cỏ rộng lớn

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra Console trong trình duyệt (F12)
2. Xem log build: `npm run build`
3. Test local trước: `npm run preview`
