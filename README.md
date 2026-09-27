# ỨNG DỤNG SÁT HẠCH LÝ THUYẾT LÁI XE CƠ GIỚI ĐƯỜNG BỘ (CHUẨN 600 CÂU)

Ứng dụng web Full-stack hoàn chỉnh phục vụ tự ôn luyện và thi thử lý thuyết sát hạch lái xe cơ giới đường bộ theo chuẩn **600 câu hỏi mới nhất của Cục Cảnh sát Giao thông - Bộ Công An** (áp dụng theo Luật Trật tự, an toàn giao thông đường bộ).

---

## 1. CÔNG NGHỆ & KIẾN TRÚC HỆ THỐNG

- **Backend**: Node.js + Express (kèm tùy chọn Python script tương thích CSDL SQLite).
- **Cơ sở dữ liệu**: SQLite (`driving_exam.sqlite`) với bảng `questions` chuẩn hóa.
- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, đồ họa vector SVG chất lượng cao cho biển báo và sa hình.
- **Tính năng nổi bật**:
  - Mô phỏng phòng thi thật với phiếu báo danh thí sinh có ảnh đại diện và thông tin trích xuất tự động.
  - Bộ đề thi chuẩn 30 câu ngẫu nhiên phân bổ đúng tỷ lệ 6 chương.
  - **Quy tắc câu hỏi điểm liệt**: Trong đề thi bắt buộc có câu hỏi tình huống mất an toàn giao thông nghiêm trọng; nếu làm sai câu này, bài thi bị đánh giá là **KHÔNG ĐẠT (TRƯỢT)** dù tổng điểm đạt.
  - Đồng hồ đếm ngược 20 phút (hoặc theo cấu hình từng hạng GPLX: A1, A, B1, B, C1, C, D1, D2, D, BE, CE...).
  - Màn hình xem lại bài thi chi tiết kèm giải thích căn cứ luật và mẹo ghi nhớ nhanh.
  - Chuyên đề ôn luyện 60 câu điểm liệt và ôn tập toàn diện 6 chương.

---

## 2. CẤU TRÚC CƠ SỞ DỮ LIỆU SQLITE (Bảng `questions`)

File cơ sở dữ liệu: `driving_exam.sqlite`

```sql
CREATE TABLE questions (
    id INTEGER PRIMARY KEY,                      -- Số thứ tự câu hỏi (1 - 600)
    chapter INTEGER NOT NULL,                   -- Số thứ tự chương (1 - 6)
    chapter_name TEXT NOT NULL,                 -- Tên chương
    question_text TEXT NOT NULL,                -- Nội dung câu hỏi
    options TEXT NOT NULL,                      -- Mảng JSON chứa các đáp án (2 đến 4 lựa chọn)
    correct_answer INTEGER NOT NULL,            -- Đáp án đúng (1-based index: 1, 2, 3 hoặc 4)
    image_url TEXT,                             -- Mã định danh hình ảnh minh họa (biển báo, sa hình)
    is_serious_violation INTEGER DEFAULT 0,     -- 1 nếu thuộc nhóm 60 câu mất ATGT nghiêm trọng (điểm liệt), 0 nếu câu thường
    explanation TEXT                            -- Mẹo ghi nhớ và căn cứ pháp lý
);

CREATE INDEX idx_chapter ON questions(chapter);
CREATE INDEX idx_serious ON questions(is_serious_violation);
```

### Phân bổ 6 chương trong chuẩn 600 câu:
1. **Chương I**: Quy định chung và quy tắc giao thông đường bộ (180 câu, gồm 45 câu điểm liệt).
2. **Chương II**: Văn hóa giao thông, đạo đức người lái xe, PCCC & CNCH (25 câu, gồm 4 câu điểm liệt).
3. **Chương III**: Kỹ thuật lái xe (58 câu, gồm 11 câu điểm liệt).
4. **Chương IV**: Cấu tạo và sửa chữa (37 câu).
5. **Chương V**: Báo hiệu đường bộ (185 câu).
6. **Chương VI**: Giải thế sa hình và kỹ năng xử lý tình huống (115 câu).

---

## 3. CẤU TRÚC THƯ MỤC NGUỒN (SOURCE CODE)

```
├── driving_exam.sqlite      # Cơ sở dữ liệu SQLite lưu trữ câu hỏi
├── init_db.py              # Script Python khởi tạo CSDL SQLite độc lập
├── server.ts               # Backend Express Server & REST API endpoints
├── index.html              # HTML entry point giao diện web
├── package.json            # Cấu hình dự án và dependencies
├── tsconfig.json           # Cấu hình TypeScript
├── vite.config.ts          # Cấu hình Vite & Tailwind CSS
├── src/
│   ├── main.tsx            # React DOM Mount
│   ├── App.tsx             # Điều hướng màn hình chính và trạng thái kỳ thi
│   ├── types/
│   │   └── index.ts        # TypeScript interfaces (Question, Candidate, ExamResult, License)
│   ├── db/
│   │   └── sqlite.ts       # Module kết nối, tạo bảng, nạp dữ liệu và bốc đề SQLite
│   ├── data/
│   │   ├── questionsData.ts # Tập dữ liệu 600 câu chuẩn Cục CSGT và cấu hình GPLX
│   │   └── svgDiagrams.ts   # Đồ họa vector SVG chuẩn QCVN 41:2019 biển báo & sa hình
│   └── components/
│       ├── Navbar.tsx           # Thanh điều hướng chuẩn Top Bar Contract
│       ├── CandidateLogin.tsx   # Màn hình 1: Đăng nhập & Kiểm tra thông tin thí sinh
│       ├── ExamScreen.tsx       # Màn hình 2: Giao diện thi thử (30 câu, 20 phút)
│       ├── ReviewScreen.tsx     # Màn hình 3: Xem lại bài thi chi tiết & phân tích điểm
│       ├── StudyModeModal.tsx   # Chế độ học chuyên đề 60 câu điểm liệt & 6 chương
│       ├── AboutRegulations.tsx # Bảng quy chế, thời gian thi và điểm chuẩn các hạng
│       └── SvgVisual.tsx        # Trình kết xuất hình ảnh biển báo & sa hình
```

---

## 4. HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY ỨNG DỤNG CỤC BỘ

### Yêu cầu môi trường
- **Node.js**: Phiên bản 18.0 trở lên (khuyên dùng Node.js 20 LTS).
- **Trình quản lý gói**: `npm` hoặc `bun` hoặc `yarn`.
- **Python** (tùy chọn): Python 3.8+ nếu muốn chạy script CSDL bằng Python.

### Các bước cài đặt và khởi chạy:

#### Bước 1: Tải mã nguồn về máy
Mở Terminal hoặc Command Prompt, di chuyển đến thư mục dự án:
```bash
cd du-an-sat-hach-600-cau
```

#### Bước 2: Cài đặt các gói phụ thuộc (Dependencies)
```bash
npm install
```

#### Bước 3: Khởi động hệ thống (Full-stack Server + Client)
```bash
npm run dev
```

Hệ thống sẽ tự động khởi động:
- Khởi tạo và kết nối cơ sở dữ liệu SQLite `driving_exam.sqlite`.
- Chạy Backend Express API và Frontend Vite tại địa chỉ:
  👉 **http://localhost:3000**

Mở trình duyệt web và truy cập `http://localhost:3000` để bắt đầu trải nghiệm ôn luyện và thi thử!

#### Bước 4 (Tùy chọn): Kiểm tra cơ sở dữ liệu SQLite bằng Python
Bạn có thể chạy script Python để kiểm tra hoặc xuất CSDL:
```bash
python3 init_db.py
```
Hoặc mở file `driving_exam.sqlite` bằng các phần mềm trực quan như **DB Browser for SQLite** hoặc **DBeaver**.

---

## 5. HƯỚNG DẪN SỬ DỤNG CÁC TÍNH NĂNG CHÍNH

### Màn hình 1: Đăng nhập & Thông tin thí sinh
1. Chọn hoặc nhập **Đơn vị**, **Khóa thi**, **Số báo danh** và **Hạng GPLX** mong muốn (A1, A, B1, B, C1, C...).
2. Bấm nút **"Kiểm tra thông tin thí sinh"** để hệ thống tạo hồ sơ thí sinh mô phỏng phòng thi thật (Họ tên, Ngày sinh, CCCD, Địa chỉ thường trú, ảnh đại diện).
3. Chọn chế độ thi:
   - *Thi thử chuẩn quy chế*: 30 câu hỏi ngẫu nhiên phân bổ 6 chương, có câu điểm liệt, thời gian 20 phút.
   - *Chuyên đề 60 điểm liệt*: Tập trung rèn luyện các câu hỏi mất ATGT nghiêm trọng.
4. Bấm **"Ôn luyện / Vào thi ngay"** để chuyển sang phòng thi.

### Màn hình 2: Giao diện thi thử (Cockpit)
- Đồng hồ đếm ngược 20:00 hiển thị ở góc trên bên phải (cảnh báo nhấp nháy đỏ khi dưới 2 phút).
- Bấm chọn trực tiếp đáp án bằng chuột hoặc dùng phím tắt trên bàn phím:
  - Phím `1`, `2`, `3`, `4`: Chọn đáp án tương ứng.
  - Phím mũi tên `←` / `→`: Chuyển câu hỏi trước/sau.
- Bấm nút **"Đánh dấu"** để gắn cờ các câu hỏi cần xem lại.
- Bảng danh sách câu hỏi bên phải cho phép nhảy nhanh đến bất kỳ câu hỏi nào.
- Khi làm xong, bấm **"Kết thúc"** để nộp bài (có hộp thoại xác nhận số câu đã làm và cảnh báo nếu còn câu chưa chọn). Hết giờ hệ thống tự động nộp bài.

### Màn hình 3: Xem lại bài thi (Review)
- Hiển thị ngay điểm số và kết quả **ĐẠT** hoặc **KHÔNG ĐẠT**.
- Nếu bạn trả lời sai câu điểm liệt, hệ thống sẽ cảnh báo bằng khung đỏ nổi bật: *"Thí sinh đã trả lời sai câu hỏi điểm liệt! Toàn bộ bài thi bị đánh giá Không đạt"*.
- Bộ lọc tiện lợi: Xem *Tất cả*, chỉ xem *Câu đúng*, chỉ xem *Câu sai*, hoặc chỉ xem *Câu điểm liệt*.
- Mỗi câu hỏi hiển thị rõ đáp án bạn chọn, đáp án đúng theo quy chuẩn và phần **Giải thích & Mẹo làm bài** để ghi nhớ kiến thức pháp luật.

---

## 6. HƯỚNG DẪN XUẤT BẢN LÊN VERCEL / GITHUB (GIẢI PHÁP LỖI KHÔNG TẢI ĐƯỢC DỮ LIỆU)

### Nguyên nhân xảy ra lỗi trên Vercel:
Khi bạn kết nối kho mã nguồn GitHub với Vercel theo mặc định:
- Vercel chỉ chạy lệnh `npm run build` để xuất ra trang tĩnh HTML/JS/CSS (`dist/`).
- Quá trình máy chủ nền Node.js (`server.ts` - Express) **không tự động chạy như trên máy tính cá nhân**.
- Vì vậy, khi bấm "Ôn luyện", trình duyệt gửi yêu cầu `POST /api/exam/generate` đến máy chủ Vercel và bị trả về lỗi `404 Not Found` (hoặc trả về file `index.html`), dẫn đến lỗi không tải được dữ liệu.

### Giải pháp đã được tích hợp sẵn (Hybrid Fallback Engine):
Ứng dụng hiện tại đã được nâng cấp lên **Cơ chế lai (Hybrid Engine)**:
1. **Ưu tiên Backend API**: Nếu ứng dụng phát hiện có Backend Node/Express (chạy cục bộ hoặc máy chủ riêng), nó sẽ truy vấn trực tiếp qua API và CSDL SQLite.
2. **Tự động chuyển sang Client-Side Engine**: Nếu triển khai trên các nền tảng tĩnh như **Vercel**, **GitHub Pages**, **Netlify**, **Cloudflare Pages** (nơi không có Node.js Express chạy ngầm), ứng dụng sẽ **tự động bốc đề, chấm điểm và trích xuất câu hỏi trực tiếp trên trình duyệt** với 100% dữ liệu gốc chuẩn xác, không gặp bất kỳ lỗi mạng nào!

### Các bước xuất bản lên Vercel:
1. Đẩy (push) mã nguồn đã cập nhật lên GitHub repository của bạn:
   ```bash
   git add .
   git commit -m "Fix Vercel deployment with client fallback engine and vercel.json"
   git push origin main
   ```
2. Trên Vercel Dashboard:
   - Import repository GitHub của bạn.
   - **Framework Preset**: Chọn `Vite` (file `vercel.json` đã cấu hình sẵn).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - Bấm **Deploy**.
3. Sau khi Deploy thành công, bạn mở đường dẫn Vercel (ví dụ: `https://your-project.vercel.app`), bấm **"Kiểm tra thông tin thí sinh"** và **"Ôn luyện / Vào thi ngay"**, dữ liệu sẽ tải ngay tức thì!

