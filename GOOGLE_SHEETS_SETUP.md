# 📋 HƯỚNG DẪN KẾT NỐI GOOGLE SHEETS TỰ ĐỘNG (CHUẨN FORM 100%)
### Nhận Riêng 2 Bảng: "Xác Nhận RSVP" & "Lời Chúc" — Đám Cưới Trung Hiếu & Hoài Thương

Đoạn mã Google Apps Script thông minh dưới đây sẽ **TỰ ĐỘNG TẠO 2 TAB RIÊNG BIỆT** trong file Google Sheets của bạn:
1. Tab **`Xác Nhận RSVP`**: Quản lý danh sách khách dự tiệc, số điện thoại, số lượng khách, sự kiện tham gia.
2. Tab **`Lời Chúc`**: Lưu giữ những lời chúc mừng và lời nhắn nhủ từ bạn bè, người thân.

---

## 📌 BƯỚC 1: TẠO FILE GOOGLE SHEETS MỚI
1. Truy cập: [https://sheets.new](https://sheets.new) để mở một bảng tính Google Sheets mới.
2. Đặt tên file ở góc trên bên trái: **"Khách Mời Đám Cưới - Trung Hiếu & Hoài Thương"**.
3. *(Lưu ý: Bạn **không cần phải gõ tiêu đề cột thủ công** — đoạn mã ở Bước 2 sẽ tự động tạo bảng, in đậm tiêu đề và tô màu cho bạn!)*

Nếu bạn muốn tạo thủ công trước thì cấu trúc 2 Tab chuẩn như sau:

#### Tab 1: `Xác Nhận RSVP`
| Cột A | Cột B | Cột C | Cột D | Cột E | Cột F |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Thời Gian** | **Họ Và Tên** | **Số Điện Thoại / Zalo** | **Sự Kiện Tham Dự** | **Số Lượng Khách** | **Lời Nhắn Gửi** |

#### Tab 2: `Lời Chúc`
| Cột A | Cột B | Cột C |
| :--- | :--- | :--- |
| **Thời Gian** | **Họ Và Tên** | **Lời Chúc Phúc** |

---

## 📌 BƯỚC 2: DÁN ĐOẠN MÃ XỬ LÝ (APPS SCRIPT TỰ ĐỘNG)
1. Trên thanh menu trên cùng của Google Sheets, chọn:  
   👉 **Tiện ích mở rộng (Extensions)** ➔ **Apps Script**.
2. Xóa sạch mọi dòng code mặc định trong ô soạn thảo, sau đó **copy toàn bộ đoạn mã dưới đây và dán vào**:

```javascript
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data = {};
    
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }
    
    var time = data.time || new Date().toLocaleString('vi-VN');
    var type = data.type || '';
    var name = data.name || '';
    
    // 1. XỬ LÝ XÁC NHẬN THAM DỰ (RSVP)
    if (type === 'Xác nhận RSVP') {
      var rsvpSheet = ss.getSheetByName('Xác Nhận RSVP');
      if (!rsvpSheet) {
        rsvpSheet = ss.insertSheet('Xác Nhận RSVP');
      }
      
      // Nếu sheet mới tinh, tự động tạo dòng tiêu đề chuẩn
      if (rsvpSheet.getLastRow() === 0) {
        var header = ['Thời Gian', 'Họ Và Tên', 'Số Điện Thoại / Zalo', 'Sự Kiện Tham Dự', 'Số Lượng Khách', 'Lời Nhắn Gửi'];
        rsvpSheet.appendRow(header);
        rsvpSheet.getRange(1, 1, 1, header.length)
          .setFontWeight('bold')
          .setBackground('#D4EDDA')
          .setFontColor('#155724');
      }
      
      rsvpSheet.appendRow([
        time,
        name,
        "'" + (data.phone || ''), // Thêm dấu ' để giữ nguyên số 0 ở đầu số điện thoại
        data.event || '',
        data.guests || '1',
        data.note || ''
      ]);
      
    // 2. XỬ LÝ SỔ LƯU BÚT (LỜI CHÚC)
    } else if (type === 'Lời chúc') {
      var wishSheet = ss.getSheetByName('Lời Chúc');
      if (!wishSheet) {
        wishSheet = ss.insertSheet('Lời Chúc');
      }
      
      // Nếu sheet mới tinh, tự động tạo dòng tiêu đề chuẩn
      if (wishSheet.getLastRow() === 0) {
        var header = ['Thời Gian', 'Họ Và Tên', 'Lời Chúc Phúc'];
        wishSheet.appendRow(header);
        wishSheet.getRange(1, 1, 1, header.length)
          .setFontWeight('bold')
          .setBackground('#FFF3CD')
          .setFontColor('#856404');
      }
      
      wishSheet.appendRow([
        time,
        name,
        data.message || ''
      ]);
      
    } else {
      var defaultSheet = ss.getActiveSheet();
      defaultSheet.appendRow([time, type, name, JSON.stringify(data)]);
    }

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var wishSheet = ss.getSheetByName('Lời Chúc');
    if (!wishSheet) {
      return ContentService.createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var rows = wishSheet.getDataRange().getValues();
    var wishes = [];
    
    // Đọc từ hàng thứ 2 (bỏ qua dòng tiêu đề)
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      var time = row[0];
      var name = row[1];
      var message = row[2];
      
      if (name && message) {
        wishes.push({
          id: i,
          name: name.toString(),
          message: message.toString(),
          date: time ? time.toString() : ''
        });
      }
    }
    
    // Đảo ngược mảng để lời chúc mới nhất hiển thị lên đầu tiên
    wishes.reverse();
    
    return ContentService.createTextOutput(JSON.stringify(wishes))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Bấm nút chiếc đĩa mềm **Lưu (Save 💾)** hoặc nhấn phím `Ctrl + S`.

---

## 📌 BƯỚC 3: TRIỂN KHAI (DEPLOY) LẤY LINK WEB APP
1. Ở góc trên cùng bên phải giao diện Apps Script, bấm nút **Triển khai (Deploy)** ➔ chọn **Tùy chọn triển khai mới (New deployment)**.
2. Bấm vào biểu tượng bánh răng ⚙️ (bên cạnh dòng "Chọn loại"), chọn **Ứng dụng web (Web app)**.
3. Điền các trường thông số:
   * **Mô tả (Description):** `Nhận RSVP và Lời chúc đám cưới`
   * **Thực thi dưới dạng (Execute as):** `Tôi (Email của bạn)`
   * **Người có quyền truy cập (Who has access):** **Bất kỳ ai (Anyone)**  
     *(⚠️ Bắt buộc chọn "Bất kỳ ai" để khách mời không cần đăng nhập tài khoản Google vẫn gửi được)*.
4. Bấm nút màu xanh **Triển khai (Deploy)**.
   * *Nếu Google hiển thị bảng cảnh báo: Bấm "Ủy quyền truy cập" ➔ Chọn tài khoản Google của bạn ➔ Bấm vào dòng chữ nhỏ "Nâng cao (Advanced)" ➔ Bấm "Đi tới... (không an toàn)" ➔ Bấm "Cho phép (Allow)"*.
5. Google sẽ hiện hộp thoại thông báo thành công và cấp cho bạn một **URL ứng dụng web** dạng:  
   `https://script.google.com/macros/s/AKfycbx.../exec`
6. Bấm nút **Sao chép (Copy)** đường link này.

---

## 📌 BƯỚC 4: DÁN ĐƯỜNG LINK VÀO FILE SCRIPT.JS
1. Mở file [script.js](file:///d:/Project/forfun/webwedding/script.js).
2. Tại dòng 14, dán link vừa sao chép vào biến `GOOGLE_SHEET_URL`:
   ```javascript
   const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
   ```
3. Lưu file `script.js` lại.

---

## 🎉 HOÀN TẤT & KIỂM TRA
* Mở trang web [index.html](file:///d:/Project/forfun/webwedding/index.html).
* Gửi thử 1 lời chúc ở mục **Sổ Lưu Bút** và gửi 1 xác nhận ở mục **RSVP**.
* Quay lại Google Sheets: Bạn sẽ thấy ngay lập tức xuất hiện 2 Tab **`Xác Nhận RSVP`** và **`Lời Chúc`** với đầy đủ thông tin được phân loại gọn gàng, sạch đẹp!
