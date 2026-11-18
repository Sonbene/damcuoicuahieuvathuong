# Thiết Kế Chi Tiết Website Đám Cưới Trung Hiếu & Hoài Thương

**Ngày tạo:** 16-11-2026  
**Chủ đề:** Website Tiệc Cưới Phong Cách Hoàng Gia & Cổ Phục Truyền Thống (Royal Emerald & Heritage Gold)  
**Cặp đôi:** Chú Rể **Trung Hiếu** & Cô Dâu **Hoài Thương**  

---

## 1. Mục Tiêu & Bối Cảnh (Context & Goals)
Xây dựng một website đám cưới sang trọng, đậm chất văn hóa Việt Nam hiện đại dựa trên thông tin chính xác từ thiệp cưới thực tế của cặp đôi Hoài Thương & Trung Hiếu.
Website đóng vai trò như một bức thiệp điện tử cao cấp, cung cấp đầy đủ thông tin lịch trình, bản đồ chỉ đường, album ảnh cưới mẫu (để sau này cặp đôi tự thay ảnh thật), sổ lưu bút online và form xác nhận tham dự (RSVP).

---

## 2. Thông Tin Chi Tiết Trích Xuất Từ Thiệp Cưới
- **Cô Dâu & Chú Rể:** Hoài Thương & Trung Hiếu
- **Logo biểu trưng (Monogram):** Hai chữ cái **TH** lồng nhau dát vàng với vòng nguyệt quế và hoa văn triện.
- **Đại diện gia đình:**
  - Nhà Gái: Ông **Trần Ngọc Thuyết** & Bà **Đào Thị Tám**
  - Nhà Trai: Bà **Nguyễn Thị Cúc**
- **Lịch trình sự kiện:**
  1. **Bữa cơm thân mật (Tiệc cưới):**
     - Thời gian: 16:00, Thứ Bảy ngày 28/11/2026 (Tức ngày 20 tháng 10 năm Bính Ngọ).
     - Địa điểm: Gia đình Nhà Gái - Lý Nhân, Đông Anh, Hà Nội.
  2. **Lễ Vu Quy (Lễ đón dâu):**
     - Thời gian: 08:30, Chủ Nhật ngày 29/11/2026 (Tức ngày 21 tháng 10 năm Bính Ngọ).
     - Địa điểm: Gia đình Nhà Gái - Lý Nhân, Đông Anh, Hà Nội.

---

## 3. Hệ Thống Nhận Diện Thị Giác & Thẩm Mỹ (Visual Identity)
- **Bảng màu chủ đạo:**
  - `Primary Emerald Green` (`#123324` / `#1a4331`): Tông xanh lục bảo quý phái truyền thống.
  - `Heritage Gold Foil` (`#c5a059` / `#dfbe7a` / `#ffd782`): Sắc vàng kim loại hoàng gia sang trọng.
  - `Warm Ivory Cream` (`#fbf9f5` / `#f3efe6`): Nền giấy mỹ thuật thanh nhã, ấm áp.
  - `Deep Charcoal Text` (`#1f2421`): Chữ hiển thị độ tương phản cao, dễ đọc trên mọi thiết bị.
- **Họa tiết & Đồ họa:**
  - Họa tiết góc triện cổ (Corner ornaments) phong cách cung đình / Á Đông bao quanh các khung card.
  - Monogram vector SVG chữ lồng **TH** viền hoa văn lá vàng.
  - Hiệu ứng hạt bụi vàng (Gold dust shimmer) và cánh hoa rơi trang nhã bay lượn ở Hero section.
- **Typography:**
  - Heading Display: `Playfair Display`, `Cormorant Garamond` (Serif quý phái, thanh lịch).
  - Script Accent: `Great Vibes` / `Dancing Script` (Thư pháp uyển chuyển cho lời chúc và tên viết tay).
  - Body Text: `Inter` / `Montserrat` (Không chân hiện đại, hiển thị sắc nét trên mobile).

---

## 4. Kiến Trúc & Cấu Trúc Các Phân Đoạn (Website Architecture)

### 4.1. Thanh Điều Hướng (Navigation Bar) & Nhạc Nền (Background Audio)
- Cố định khi cuộn trang, tự động thu nhỏ hiệu ứng kính mờ (frosted glass) sang trọng.
- Monogram TH dát vàng dẫn về đầu trang.
- Menu điều hướng mượt mà: Câu Chuyện, Gia Đình, Sự Kiện, Album Ảnh, Sổ Lưu Bút, Xác Nhận Tham Dự, Chỉ Đường.
- Trình phát nhạc nền đĩa than/sóng âm góc màn hình với nút Bật/Tắt tiện lợi.

### 4.2. Màn Hình Chính (Hero Section)
- Khung viền triện dát vàng bao bọc toàn bộ Hero.
- Monogram TH tỏa sáng lấp lánh.
- Tiêu đề: "LỄ VU QUY & TIỆC CƯỚI" - "TRUNG HIẾU & HOÀI THƯƠNG".
- Ngày tháng: 28 · 29 Tháng 11 Năm 2026.
- Đồng hồ đếm ngược trực tiếp (Countdown Timer) đến 16:00 ngày 28/11/2026: Ngày · Giờ · Phút · Giây.
- Canvas hiệu ứng hạt vàng lấp lánh (Gold sparkles) và cánh hoa sen / lá xanh rơi mềm mại.

### 4.3. Lời Chúc Mừng & Giới Thiệu Gia Đình (Welcome & Families)
- Lời ngỏ trang trọng: *"Trân trọng kính mời tới dự bữa cơm thân mật chung vui cùng gia đình chúng tôi"*.
- Card thông tin hai họ:
  - Đại diện Nhà Trai: Mẹ chú rể - Bà Nguyễn Thị Cúc.
  - Đại diện Nhà Gái: Bố mẹ cô dâu - Ông Trần Ngọc Thuyết & Bà Đào Thị Tám.
- Chân dung Cô dâu Hoài Thương & Chú rể Trung Hiếu với ảnh mẫu cổ phục truyền thống Việt Nam.

### 4.4. Lịch Trình Sự Kiện (Wedding Events Timeline)
- Thiết kế 2 thẻ sự kiện lớn phong cách thiệp cưới cao cấp:
  1. **Tiệc Cưới Thân Mật (Bữa cơm chung vui):** 16:00 Thứ Bảy, 28/11/2026 tại Lý Nhân, Đông Anh, Hà Nội.
  2. **Lễ Vu Quy (Lễ đón dâu):** 08:30 Chủ Nhật, 29/11/2026 tại Lý Nhân, Đông Anh, Hà Nội.
- Mỗi sự kiện đều có:
  - Nút **"Thêm vào Lịch" (Add to Google Calendar)** tạo sự kiện trực tiếp vào điện thoại.
  - Nút **"Chỉ đường (Google Maps)"**.

### 4.5. Hành Trình Tình Yêu (Love Story Timeline)
- Thiết kế trục thời gian so-le mềm mại với 4 dấu mốc ý nghĩa:
  1. *Chạm ánh mắt đầu tiên* (Khởi đầu duyên lành).
  2. *Hẹn hò ngọt ngào* (Những buổi chiều dạo bước bên nhau).
  3. *Hành trình gắn kết* (Cùng nhau trải qua những chuyến đi thanh xuân).
  4. *Khoảnh khắc cầu hôn* (Lời đồng ý trọn đời).

### 4.6. Album Ảnh Cưới Mẫu (Curated Gallery & Lightbox)
- Lưới ảnh bố cục so-le hiện đại (Staggered Grid) hiển thị ảnh mẫu chất lượng cao trang phục truyền thống Việt Nam và đồ cưới hiện đại.
- Bộ lọc thể loại: Tất Cả, Cổ Phục Truyền Thống, Trang Phục Cưới Hoàng Gia, Khoảnh Khắc Hạnh Phúc.
- Trình xem ảnh Lightbox toàn màn hình: phóng to ảnh, nút chuyển tới/lui, hỗ trợ vuốt trên điện thoại và phím bấm trên bàn phím.
- Ghi chú rõ ràng trong mã nguồn HTML để bạn dễ dàng thay thế đường dẫn ảnh sau này.

### 4.7. Sổ Lưu Bút Online (Guestbook)
- Form gửi lời chúc mừng: Tên khách mời, mối quan hệ (Bạn cô dâu, Bạn chú rể, Gia đình...), nội dung lời chúc, kèm chọn icon cảm xúc.
- Dữ liệu lời chúc được lưu trữ trên `localStorage` trình duyệt và cập nhật ngay lập tức vào danh sách hiển thị không cần reload trang.
- Có sẵn 4 lời chúc mẫu ấm áp, chân thành cho Trung Hiếu & Hoài Thương.

### 4.8. Xác Nhận Tham Dự (RSVP Interactive)
- Form phản hồi: Tên khách, số điện thoại, chọn sự kiện tham dự (Bữa cơm 28/11, Lễ Vu Quy 29/11, hoặc Cả hai), số lượng người đi cùng, lời nhắn gửi.
- Xử lý xác nhận với hiệu ứng thông báo thành công và pháo hoa rực rỡ.

### 4.9. Địa Điểm & Bản Đồ (Venue & Directions)
- Địa chỉ chi tiết: Gia đình Nhà Gái - Thôn Lý Nhân, Xã Dục Tú / Huyện Đông Anh, TP. Hà Nội.
- Tích hợp Google Maps iframe tương tác mượt mà.
- Gợi ý trang phục (Dresscode): Tone Xanh lá hoàng gia, Vàng đồng, Trắng kem thanh lịch.

### 4.10. Chân Trang (Footer)
- Lời tri ân sâu sắc từ Hoài Thương & Trung Hiếu.
- Monogram TH dát vàng, bản quyền và các liên kết mạng xã hội.

---

## 5. Ngăn Xếp Kỹ Thuật (Tech Stack & Performance)
- **HTML5 Ngữ nghĩa (Semantic HTML5):** Đạt chuẩn SEO, hỗ trợ các thẻ OpenGraph chia sẻ Zalo, Facebook tuyệt đẹp.
- **CSS3 Hiện đại (Modern CSS):** CSS Grid, Flexbox, Custom Properties (Variables), Responsive 100% không vỡ layout trên bất kỳ thiết bị nào.
- **JavaScript ES6+ thuần (No heavy dependencies):**
  - Đồng hồ đếm ngược chính xác theo múi giờ Việt Nam (UTC+7).
  - IntersectionObserver cho hiệu ứng cuộn trang mềm mại (Scroll Reveal).
  - Canvas hiệu ứng hạt vàng lấp lánh & cánh hoa bay nhẹ nhàng, tối ưu hiệu năng 60 FPS.
  - Xử lý Audio phát nhạc thông minh (tự động phát khi tương tác hoặc toggle theo ý muốn người dùng).

