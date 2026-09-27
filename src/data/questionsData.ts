import { Question, ChapterSummary, LicenseConfig, LicenseRank } from '../types';

export const LICENSE_CONFIGS: Record<LicenseRank, LicenseConfig> = {
  A1: {
    rank: 'A1',
    name: 'Mô tô hai bánh đến 125 cm³ (hoặc điện đến 11 kW)',
    totalQuestions: 25,
    passScore: 21,
    durationMinutes: 19,
    description: 'Áp dụng cho xe mô tô 2 bánh dung tích xi-lanh đến 125 cm³ theo Luật Trật tự, ATGTĐB 2024.'
  },
  A: {
    rank: 'A',
    name: 'Mô tô hai bánh trên 125 cm³ (hoặc điện trên 11 kW)',
    totalQuestions: 25,
    passScore: 23,
    durationMinutes: 19,
    description: 'Áp dụng cho xe mô tô 2 bánh dung tích xi-lanh trên 125 cm³.'
  },
  B1: {
    rank: 'B1',
    name: 'Xe mô tô 3 bánh và các loại xe quy định cho GPLX hạng A1',
    totalQuestions: 30,
    passScore: 26,
    durationMinutes: 20,
    description: 'Hạng B1 mới theo luật 2024 cấp cho xe mô tô 3 bánh.'
  },
  B: {
    rank: 'B',
    name: 'Ô tô chở người đến 8 chỗ, ô tô tải đến 3.500 kg',
    totalQuestions: 30,
    passScore: 27,
    durationMinutes: 20,
    description: 'Chuẩn sát hạch ô tô thông dụng nhất hiện nay (thời gian làm bài 20 phút, 30 câu).'
  },
  C1: {
    rank: 'C1',
    name: 'Ô tô tải trên 3.500 kg đến 7.500 kg',
    totalQuestions: 30,
    passScore: 28,
    durationMinutes: 20,
    description: 'Hạng C1 ô tô tải tầm trung theo luật mới.'
  },
  C: {
    rank: 'C',
    name: 'Ô tô tải trên 7.500 kg, ô tô chuyên dùng',
    totalQuestions: 35,
    passScore: 32,
    durationMinutes: 24,
    description: 'Hạng C xe tải nặng, rơ moóc đến 750 kg.'
  },
  D1: {
    rank: 'D1',
    name: 'Ô tô chở người từ trên 8 chỗ đến 16 chỗ',
    totalQuestions: 35,
    passScore: 32,
    durationMinutes: 24,
    description: 'Xe chở người 9 - 16 chỗ ngồi.'
  },
  D2: {
    rank: 'D2',
    name: 'Ô tô chở người từ trên 16 chỗ đến 29 chỗ (kể cả xe buýt)',
    totalQuestions: 35,
    passScore: 32,
    durationMinutes: 24,
    description: 'Xe chở khách từ 17 đến 29 chỗ ngồi.'
  },
  D: {
    rank: 'D',
    name: 'Ô tô chở người trên 29 chỗ, xe giường nằm',
    totalQuestions: 40,
    passScore: 36,
    durationMinutes: 26,
    description: 'Xe khách lớn trên 29 chỗ và xe giường nằm.'
  },
  BE: {
    rank: 'BE',
    name: 'Ô tô hạng B kéo rơ moóc trên 750 kg',
    totalQuestions: 35,
    passScore: 32,
    durationMinutes: 24,
    description: 'Xe ô tô hạng B kéo rơ moóc nặng.'
  },
  CE: {
    rank: 'CE',
    name: 'Ô tô hạng C kéo sơ mi rơ moóc, đầu kéo',
    totalQuestions: 40,
    passScore: 36,
    durationMinutes: 26,
    description: 'Xe container, ô tô đầu kéo kéo sơ mi rơ moóc.'
  }
};

export const CHAPTER_LIST: ChapterSummary[] = [
  {
    id: 1,
    title: 'Chương I: Quy định chung và quy tắc giao thông đường bộ',
    description: 'Bao gồm các khái niệm, quy tắc nhường đường, vượt xe, tốc độ, cấm nồng độ cồn và các hành vi bị nghiêm cấm.',
    rangeText: 'Từ câu 1 đến câu 180 (180 câu)',
    count: 180,
    seriousCount: 45
  },
  {
    id: 2,
    title: 'Chương II: Văn hóa giao thông, đạo đức, PCCC & CNCH',
    description: 'Nâng cao ý thức văn hóa, đạo đức nghề nghiệp lái xe, kỹ năng sơ cứu tai nạn và phòng cháy chữa cháy.',
    rangeText: 'Từ câu 181 đến câu 205 (25 câu)',
    count: 25,
    seriousCount: 4
  },
  {
    id: 3,
    title: 'Chương III: Kỹ thuật lái xe',
    description: 'Kỹ năng khởi hành, lên dốc, xuống dốc an toàn, xử lý đường trơn trượt, ban đêm, mưa to, xe số tự động và xe điện.',
    rangeText: 'Từ câu 206 đến câu 263 (58 câu)',
    count: 58,
    seriousCount: 11
  },
  {
    id: 4,
    title: 'Chương IV: Cấu tạo và sửa chữa',
    description: 'Cấu tạo động cơ 4 kỳ, hệ thống phanh, bôi trơn, làm mát, truyền lực, trang thiết bị an toàn và bảo dưỡng.',
    rangeText: 'Từ câu 264 đến câu 300 (37 câu)',
    count: 37,
    seriousCount: 0
  },
  {
    id: 5,
    title: 'Chương V: Báo hiệu đường bộ',
    description: 'Hệ thống 5 nhóm biển báo đường bộ: biển cấm, biển nguy hiểm, biển hiệu lệnh, biển chỉ dẫn, biển phụ và vạch kẻ đường.',
    rangeText: 'Từ câu 301 đến câu 485 (185 câu)',
    count: 185,
    seriousCount: 0
  },
  {
    id: 6,
    title: 'Chương VI: Giải thế sa hình và kỹ năng xử lý tình huống',
    description: 'Quy tắc thứ tự ưu tiên giao lộ: Nhất chớm, nhì ưu (Hỏa-Sự-An-Thương), tam đường, tứ hướng (phải-thẳng-trái).',
    rangeText: 'Từ câu 486 đến câu 600 (115 câu)',
    count: 115,
    seriousCount: 0
  }
];

export const RAW_QUESTIONS_DATA: Question[] = [
  // ================= CHAPTER 1: QUY ĐỊNH CHUNG VÀ QUY TẮC =================
  {
    id: 1,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Phần của đường bộ được sử dụng cho phương tiện giao thông đường bộ đi lại là gì?',
    options: [
      'Phần mặt đường và lề đường.',
      'Phần đường xe chạy.',
      'Phần đường xe cơ giới.'
    ],
    correct_answer: 2,
    is_serious_violation: false,
    explanation: 'Khái niệm theo Luật Trật tự, ATGTĐB: Phần đường xe chạy là phần của đường bộ được sử dụng cho phương tiện giao thông đi lại.'
  },
  {
    id: 2,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Làn đường là gì?',
    options: [
      'Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, sử dụng cho xe chạy.',
      'Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, có đủ chiều rộng cho xe chạy an toàn.',
      'Là đường cho xe ô tô chạy, dừng, đỗ an toàn.'
    ],
    correct_answer: 2,
    is_serious_violation: false,
    explanation: 'Làn đường phải có bề rộng "có đủ chiều rộng cho xe chạy an toàn" và được chia theo chiều dọc của đường.'
  },
  {
    id: 3,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Khổ giới hạn của đường bộ được hiểu như thế nào là đúng?',
    options: [
      'Khổ giới hạn của đường bộ là khoảng trống có kích thước giới hạn về chiều rộng, chiều cao của đường bộ để các xe, bao gồm cả hàng hoá xếp trên xe đi qua được an toàn và được xác định theo quy chuẩn, tiêu chuẩn kỹ thuật của đường bộ.',
      'Là khoảng trống có kích thước giới hạn về chiều rộng của đường, cầu, bến phà, hầm trên đường bộ để các xe kể cả hàng hóa xếp trên xe đi qua được an toàn.',
      'Là khoảng trống có kích thước giới hạn về chiều cao của cầu, bến phà, hầm trên đường bộ để các xe đi qua được an toàn.'
    ],
    correct_answer: 1,
    is_serious_violation: false,
    explanation: 'Khổ giới hạn bao gồm cả chiều rộng lẫn chiều cao của đường bộ để xe và hàng hóa xếp trên xe đi qua an toàn.'
  },
  {
    id: 4,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Dải phân cách được lắp đặt để làm gì?',
    options: [
      'Để phân chia các làn đường dành cho xe cơ giới và xe thô sơ trên đường cao tốc.',
      'Để phân chia phần đường xe chạy thành hai chiều riêng biệt hoặc để phân chia phần đường dành cho xe cơ giới và xe thô sơ hoặc của nhiều loại xe khác nhau trên cùng một chiều đường.',
      'Để phân tách phần đường xe chạy và hành lang an toàn giao thông.'
    ],
    correct_answer: 2,
    is_serious_violation: false,
    explanation: 'Dải phân cách dùng để chia phần đường thành 2 chiều riêng biệt hoặc chia làn cơ giới và thô sơ.'
  },
  {
    id: 5,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Vạch kẻ đường là gì?',
    options: [
      'Là báo hiệu đường bộ để hỗ trợ cảnh báo nguy hiểm cho người tham gia giao thông đường bộ.',
      'Là vạch chỉ sự phân chia làn đường, vị trí hoặc hướng đi, vị trí dừng lại.',
      'Là báo hiệu cho người tham gia giao thông đường bộ về các thông tin của đường bộ.',
      'Cả ba ý trên.'
    ],
    correct_answer: 2,
    is_serious_violation: false,
    explanation: 'Vạch kẻ đường là dạng báo hiệu chỉ sự phân chia làn đường, vị trí hướng đi hoặc vị trí dừng lại.'
  },
  {
    id: 6,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Người điều khiển phương tiện tham gia giao thông đường bộ được hiểu như thế nào là đúng?',
    options: [
      'Là người điều khiển xe cơ giới, người điều khiển xe thô sơ, người điều khiển xe máy chuyên dùng.',
      'Là người được giao nhiệm vụ hướng dẫn giao thông trên đường bộ.',
      'Cả hai ý trên.'
    ],
    correct_answer: 1,
    is_serious_violation: false,
    explanation: 'Người điều khiển phương tiện gồm người lái xe cơ giới, xe thô sơ và xe máy chuyên dùng (người hướng dẫn là người điều khiển giao thông).'
  },
  {
    id: 7,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Người lái xe được hiểu như thế nào là đúng?',
    options: [
      'Là người điều khiển xe cơ giới.',
      'Là người điều khiển xe thô sơ.',
      'Là người điều khiển xe máy chuyên dùng.'
    ],
    correct_answer: 1,
    is_serious_violation: false,
    explanation: 'Theo quy định pháp luật: Người lái xe là người điều khiển xe cơ giới.'
  },
  {
    id: 14,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Dừng xe được hiểu như thế nào là đúng?',
    options: [
      'Là trạng thái đứng yên của xe không giới hạn thời gian để cho người lên, xuống xe, xếp dỡ hàng hóa hoặc thực hiện công việc khác.',
      'Là trạng thái đứng yên tạm thời của xe trong một khoảng thời gian cần thiết đủ để cho người lên xe, xuống xe, xếp dỡ hàng hóa, kiểm tra kỹ thuật xe hoặc hoạt động khác. Khi dừng xe không được tắt máy và không được rời khỏi vị trí lái, trừ trường hợp rời khỏi vị trí lái để đóng, mở cửa xe, xếp dỡ hàng hóa, kiểm tra kỹ thuật xe nhưng phải sử dụng phanh đỗ xe hoặc thực hiện biện pháp an toàn khác.',
      'Là trạng thái đứng yên của xe không giới hạn thời gian giữa 02 lần vận chuyển hàng hóa hoặc hành khách.'
    ],
    correct_answer: 2,
    is_serious_violation: false,
    explanation: 'Dừng xe là trạng thái đứng yên TẠM THỜI trong thời gian cần thiết, không được tắt máy và không rời vị trí lái (hoặc phải dùng phanh đỗ).'
  },
  {
    id: 15,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Đỗ xe được hiểu như thế nào là đúng?',
    options: [
      'Là trạng thái đứng yên của xe có giới hạn thời gian trong một khoảng thời gian cần thiết đủ để cho người lên, xuống xe đó, xếp dỡ hàng hóa hoặc thực hiện công việc khác.',
      'Là trạng thái đứng yên của xe không giới hạn thời gian. Khi đỗ xe, người điều khiển phương tiện tham gia giao thông đường bộ chỉ được rời khỏi xe khi đã sử dụng phanh đỗ xe hoặc thực hiện biện pháp an toàn khác. Xe đỗ trên đoạn đường dốc phải đánh lái về phía lề đường, chèn bánh.'
    ],
    correct_answer: 2,
    is_serious_violation: false,
    explanation: 'Đỗ xe là trạng thái đứng yên KHÔNG GIỚI HẠN THỜI GIAN. Khi đỗ dốc phải đánh lái vào lề và chèn bánh.'
  },
  {
    id: 19,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Hành vi nào dưới đây bị nghiêm cấm?',
    options: [
      'Sử dụng xe đạp đi trên các tuyến quốc lộ.',
      'Rải vật sắc nhọn, đổ chất gây trơn trượt trên đường bộ.',
      'Cả hai ý trên.'
    ],
    correct_answer: 2,
    is_serious_violation: true,
    explanation: 'ĐIỂM LIỆT: Hành vi rải đinh, vật sắc nhọn, đổ dầu nhớt gây trơn trượt đe dọa trực tiếp tính mạng người đi đường và bị nghiêm cấm tuyệt đối.'
  },
  {
    id: 20,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Hành vi đưa xe cơ giới, xe máy chuyên dùng tham gia giao thông đường bộ nào dưới đây bị cấm?',
    options: [
      'Không có chứng nhận kiểm định an toàn kỹ thuật và bảo vệ môi trường.',
      'Hết niên hạn sử dụng.',
      'Cả hai ý trên.'
    ],
    correct_answer: 3,
    is_serious_violation: true,
    explanation: 'ĐIỂM LIỆT: Cấm tuyệt đối đưa xe hết niên hạn sử dụng hoặc không có chứng nhận kiểm định tham gia giao thông.'
  },
  {
    id: 21,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Tổ chức đua xe được phép thực hiện khi nào?',
    options: [
      'Trên đường phố không có người qua lại.',
      'Được người dân ủng hộ.',
      'Được cơ quan có thẩm quyền cấp phép.'
    ],
    correct_answer: 3,
    is_serious_violation: true,
    explanation: 'ĐIỂM LIỆT: Tổ chức đua xe trái phép bị nghiêm cấm, chỉ được phép khi có văn bản cấp phép của cơ quan nhà nước có thẩm quyền.'
  },
  {
    id: 24,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Người điều khiển phương tiện tham gia giao thông đường bộ mà trong máu hoặc hơi thở có nồng độ cồn có bị nghiêm cấm không?',
    options: [
      'Bị nghiêm cấm.',
      'Không bị nghiêm cấm.',
      'Không bị nghiêm cấm, nếu nồng độ cồn trong máu ở mức nhẹ, có thể điều khiển phương tiện tham gia giao thông.'
    ],
    correct_answer: 1,
    is_serious_violation: true,
    explanation: 'ĐIỂM LIỆT: Luật Trật tự, an toàn giao thông đường bộ quy định cấm tuyệt đối điều khiển phương tiện khi trong máu hoặc hơi thở có nồng độ cồn.'
  },
  {
    id: 27,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Hành vi giao xe ô tô, mô tô cho người nào sau đây tham gia giao thông đường bộ bị nghiêm cấm?',
    options: [
      'Người chưa đủ tuổi theo quy định.',
      'Người không có giấy phép lái xe.',
      'Người có giấy phép lái xe nhưng đã bị trừ hết 12 điểm.',
      'Cả ba ý trên.'
    ],
    correct_answer: 4,
    is_serious_violation: true,
    explanation: 'ĐIỂM LIỆT: Cấm giao xe cho người chưa đủ tuổi, không có bằng lái hoặc GPLX đã bị trừ hết 12 điểm.'
  },
  {
    id: 28,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Hành vi nào sau đây bị nghiêm cấm?',
    options: [
      'Điều khiển xe cơ giới lạng lách, đánh võng, rú ga liên tục khi tham gia giao thông trên đường.',
      'Xúc phạm, đe dọa, cản trở, chống đối hoặc không chấp hành hiệu lệnh, hướng dẫn, yêu cầu kiểm tra, kiểm soát của người thi hành công vụ về bảo đảm trật tự, an toàn giao thông đường bộ.',
      'Cả hai ý trên.'
    ],
    correct_answer: 3,
    is_serious_violation: true,
    explanation: 'ĐIỂM LIỆT: Cả hành vi lạng lách đánh võng lẫn chống đối người thi hành công vụ đều bị nghiêm cấm nghiêm khắc.'
  },
  {
    id: 31,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Việc sản xuất, sử dụng, mua, bán trái phép biển số xe có bị nghiêm cấm hay không?',
    options: [
      'Không bị nghiêm cấm.',
      'Bị nghiêm cấm.',
      'Bị nghiêm cấm tuỳ trường hợp.'
    ],
    correct_answer: 2,
    is_serious_violation: true,
    explanation: 'ĐIỂM LIỆT: Việc sản xuất, mua bán, sử dụng biển số giả/trái phép bị nghiêm cấm tuyệt đối.'
  },
  {
    id: 36,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Khi gặp hiệu lệnh điều khiển của Cảnh sát giao thông giang hai tay hoặc một tay sang ngang thì người tham gia giao thông phải đi như thế nào?',
    options: [
      'Người tham gia giao thông đường bộ ở các hướng phải dừng lại.',
      'Người tham gia giao thông đường bộ ở các hướng được đi theo chiều gậy chỉ của Cảnh sát giao thông.',
      'Người tham gia giao thông đường bộ ở phía trước và phía sau người điều khiển được đi tất cả các hướng; người bên phải và bên trái phải dừng lại.',
      'Người tham gia giao thông đường bộ ở phía trước và phía sau người điều khiển phải dừng lại; người tham gia giao thông đường bộ ở phía bên phải và phía bên trái người điều khiển được đi tất cả các hướng.'
    ],
    correct_answer: 4,
    is_serious_violation: false,
    explanation: 'Mẹo nhớ: CSGT dang hai tay (hoặc 1 tay ngang) thì trước/sau DỪNG LẠI, trái/phải ĐƯỢC ĐI tất cả các hướng.'
  },
  {
    id: 37,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Khi gặp hiệu lệnh điều khiển của Cảnh sát giao thông tay giơ thẳng đứng thì người tham gia giao thông phải đi như thế nào?',
    options: [
      'Người tham gia giao thông đường bộ ở phía sau Cảnh sát giao thông được đi, các hướng khác phải dừng lại.',
      'Người tham gia giao thông đường bộ được rẽ phải theo chiều mũi tên màu xanh ở bục Cảnh sát giao thông.',
      'Người tham gia giao thông đường bộ ở tất cả các hướng phải dừng lại, trừ các xe đã ở trong khu vực giao nhau.',
      'Người tham gia giao thông đường bộ ở phía trước Cảnh sát giao thông phải dừng lại, các hướng khác được đi.'
    ],
    correct_answer: 3,
    is_serious_violation: false,
    explanation: 'Mẹo nhớ: CSGT giơ tay thẳng đứng thì TẤT CẢ các hướng phải dừng lại (trừ xe đã ở trong ngã tư).'
  },
  {
    id: 42,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Khi chở trẻ em dưới 10 tuổi và chiều cao dưới 1,35 mét trên xe ô tô, người lái xe phải thực hiện quy tắc nào dưới đây để bảo đảm an toàn?',
    options: [
      'Không được cho trẻ em ngồi cùng hàng ghế với người lái xe, trừ loại xe ô tô chỉ có một hàng ghế; người lái xe phải sử dụng, hướng dẫn sử dụng thiết bị an toàn phù hợp cho trẻ em.',
      'Cho trẻ em ngồi cùng hàng ghế với người lái xe, người lái xe phải sử dụng, hướng dẫn sử dụng thiết bị an toàn phù hợp cho trẻ em.'
    ],
    correct_answer: 1,
    is_serious_violation: true,
    explanation: 'ĐIỂM LIỆT (Quy định mới Luật 2024): Trẻ dưới 10 tuổi và cao dưới 1,35m KHÔNG được ngồi hàng ghế trước cùng người lái xe, phải dùng thiết bị an toàn.'
  },
  {
    id: 47,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Người lái xe có được phép vượt xe trên cầu hẹp có một làn đường, đường cong có tầm nhìn bị hạn chế hay không?',
    options: [
      'Được phép vượt khi đường vắng.',
      'Không được phép vượt.',
      'Được phép vượt khi có việc gấp.'
    ],
    correct_answer: 2,
    is_serious_violation: true,
    explanation: 'ĐIỂM LIỆT: Cấm vượt xe trên cầu hẹp có 1 làn đường, nơi đường cong tầm nhìn bị che khuất vì nguy cơ đối đầu trực diện.'
  },
  {
    id: 52,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Khi điều khiển phương tiện tham gia giao thông, hành vi nào sau đây bị cấm?',
    options: [
      'Dùng tay cầm và sử dụng điện thoại hoặc thiết bị điện tử khác.',
      'Chỉ được chở người trên thùng xe ô tô chở hàng trong trường hợp chở người đi làm nhiệm vụ cứu nạn, cứu hộ, phòng, chống thiên tai, dịch bệnh hoặc thực hiện nhiệm vụ khẩn cấp.'
    ],
    correct_answer: 1,
    is_serious_violation: true,
    explanation: 'ĐIỂM LIỆT: Cấm dùng tay cầm và sử dụng điện thoại khi đang điều khiển phương tiện giao thông.'
  },
  {
    id: 60,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Trên đường phố, bánh xe gần nhất khi dừng, đỗ xe không được cách xa lề đường, vỉa hè quá bao nhiêu mét?',
    options: [
      '0,25 mét.',
      '0,3 mét.',
      '0,4 mét.',
      '0,5 mét.'
    ],
    correct_answer: 1,
    is_serious_violation: false,
    explanation: 'Theo quy định, bánh xe gần nhất không được cách mép lề đường quá 0,25 mét (25 cm).'
  },
  {
    id: 63,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Người điều khiển xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy có được phép sử dụng xe để kéo hoặc đẩy các phương tiện khác khi tham gia giao thông không?',
    options: [
      'Được phép.',
      'Nếu phương tiện được kéo, đẩy có khối lượng nhỏ hơn phương tiện của mình.',
      'Tùy trường hợp.',
      'Không được phép.'
    ],
    correct_answer: 4,
    is_serious_violation: true,
    explanation: 'ĐIỂM LIỆT: Xe mô tô, xe gắn máy KHÔNG ĐƯỢC PHÉP kéo hoặc đẩy xe khác trên đường.'
  },
  {
    id: 116,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Khi xảy ra ùn tắc trên đường cao tốc có làn dừng xe khẩn cấp, người lái xe có được cho xe chạy ở làn dừng xe khẩn cấp để nhanh chóng thoát khỏi khu vực ùn tắc không (trừ xe ưu tiên)?',
    options: [
      'Có.',
      'Không.'
    ],
    correct_answer: 2,
    is_serious_violation: true,
    explanation: 'ĐIỂM LIỆT: Làn dừng xe khẩn cấp trên đường cao tốc chỉ dành cho xe hỏng khẩn cấp hoặc xe ưu tiên; cấm lưu thông trên làn này khi ùn tắc.'
  },
  {
    id: 119,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Theo quy định về độ tuổi, người đủ bao nhiêu tuổi trở lên thì được cấp giấy phép lái xe mô tô hai bánh đến 125 cm³ và ô tô chở người đến 8 chỗ ngồi?',
    options: [
      '16 tuổi.',
      '17 tuổi.',
      '18 tuổi.'
    ],
    correct_answer: 3,
    is_serious_violation: false,
    explanation: 'Người đủ 18 tuổi trở lên được cấp GPLX hạng A1, A, B (xe ô tô chở người đến 8 chỗ ngồi).'
  },
  {
    id: 144,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Tốc độ khai thác tối đa cho phép đối với xe máy chuyên dùng, xe gắn máy (kể cả xe máy điện) tham gia giao thông trên đường bộ (trừ đường cao tốc) là bao nhiêu km/h?',
    options: [
      '50 km/h.',
      '40 km/h.',
      '60 km/h.'
    ],
    correct_answer: 2,
    is_serious_violation: false,
    explanation: 'Xe gắn máy và xe máy chuyên dùng chỉ được chạy tối đa 40 km/h trên đường bộ.'
  },
  {
    id: 145,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Trong khu vực đông dân cư, đường đôi hoặc đường một chiều có từ 2 làn xe cơ giới trở lên, tốc độ tối đa cho phép của xe ô tô, mô tô là bao nhiêu?',
    options: [
      '60 km/h.',
      '50 km/h.',
      '40 km/h.'
    ],
    correct_answer: 1,
    is_serious_violation: false,
    explanation: 'Khu đông dân cư: Đường đôi (có dải phân cách giữa) hoặc 1 chiều có từ 2 làn xe cơ giới -> Tốc độ tối đa 60 km/h.'
  },
  {
    id: 146,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Trong khu vực đông dân cư, đường hai chiều không có dải phân cách giữa hoặc đường một chiều có 1 làn xe cơ giới, tốc độ tối đa cho phép là bao nhiêu?',
    options: [
      '60 km/h.',
      '50 km/h.',
      '40 km/h.'
    ],
    correct_answer: 2,
    is_serious_violation: false,
    explanation: 'Khu đông dân cư: Đường 2 chiều không có dải phân cách hoặc đường 1 làn cơ giới -> Tốc độ tối đa 50 km/h.'
  },
  {
    id: 171,
    chapter: 1,
    chapter_name: 'Quy định chung và quy tắc giao thông đường bộ',
    question_text: 'Thời gian lái xe liên tục của người lái xe ô tô kinh doanh vận tải được quy định như thế nào để bảo đảm an toàn giao thông?',
    options: [
      'Không quá 4 giờ.',
      'Không quá 6 giờ.',
      'Không quá 8 giờ.',
      'Liên tục tùy thuộc vào sức khỏe và khả năng của người lái xe.'
    ],
    correct_answer: 1,
    is_serious_violation: false,
    explanation: 'Thời gian lái xe liên tục của lái xe kinh doanh vận tải không được quá 4 giờ (tổng trong ngày không quá 10 giờ).'
  },

  // ================= CHAPTER 2: VĂN HÓA GIAO THÔNG, ĐẠO ĐỨC & PCCC =================
  {
    id: 182,
    chapter: 2,
    chapter_name: 'Văn hóa giao thông, đạo đức người lái xe, PCCC & CNCH',
    question_text: 'Những hành vi nào sau đây thể hiện là người có văn hóa giao thông?',
    options: [
      'Luôn tuân thủ pháp luật về trật tự, an toàn giao thông đường bộ, nhường nhịn và giúp đỡ người khác.',
      'Đi nhanh, vượt đèn đỏ nếu không có lực lượng Công an.',
      'Bấm còi và nháy đèn liên tục để cảnh báo xe khác.',
      'Tránh nhường đường để đi nhanh hơn.'
    ],
    correct_answer: 1,
    is_serious_violation: false,
    explanation: 'Văn hóa giao thông là sự tự giác chấp hành pháp luật, nhường nhịn và hỗ trợ người khác.'
  },
  {
    id: 188,
    chapter: 2,
    chapter_name: 'Văn hóa giao thông, đạo đức người lái xe, PCCC & CNCH',
    question_text: 'Khi sơ cứu người bị tai nạn giao thông đường bộ, có vết thương chảy máu ngoài, phun thành tia và phun mạnh khi mạch đập, bạn phải làm gì dưới đây?',
    options: [
      'Thực hiện cầm máu trực tiếp.',
      'Thực hiện cầm máu không trực tiếp (chặn động mạch).'
    ],
    correct_answer: 2,
    is_serious_violation: true,
    explanation: 'ĐIỂM LIỆT: Máu phun thành tia theo nhịp mạch đập là tổn thương động mạch lớn, bắt buộc phải chặn động mạch (cầm máu không trực tiếp) ngay lập tức.'
  },
  {
    id: 197,
    chapter: 2,
    chapter_name: 'Văn hóa giao thông, đạo đức người lái xe, PCCC & CNCH',
    question_text: 'Hành vi bỏ trốn sau khi gây tai nạn để trốn tránh trách nhiệm hoặc khi có điều kiện mà cố ý không cứu giúp người bị tai nạn giao thông có bị nghiêm cấm hay không?',
    options: [
      'Không bị nghiêm cấm.',
      'Nghiêm cấm tuỳ từng trường hợp cụ thể.',
      'Bị nghiêm cấm.'
    ],
    correct_answer: 3,
    is_serious_violation: true,
    explanation: 'ĐIỂM LIỆT: Cấm tuyệt đối hành vi bỏ trốn sau khi gây tai nạn giao thông hoặc không cứu giúp người gặp nguy hiểm.'
  },
  {
    id: 204,
    chapter: 2,
    chapter_name: 'Văn hóa giao thông, đạo đức người lái xe, PCCC & CNCH',
    question_text: 'Khi phát hiện thấy có ngọn lửa, khói hoặc nhiệt độ cao bất thường từ phương tiện giao thông do mình điều khiển người lái xe phải làm gì trước tiên?',
    options: [
      'Bình tĩnh, đưa xe sát vào lề đường, tránh xa nơi có nhiều người, nhiều chất dễ cháy và tắt khóa điện, thực hiện các bước chữa cháy.',
      'Hô hoán để mọi người đến trợ giúp chữa cháy, gọi Cảnh sát giao thông, Cảnh sát phòng cháy, chữa cháy và cứu nạn, cứu hộ, lực lượng y tế để sẵn sàng hỗ trợ cứu người.',
      'Nếu nhiên liệu trào ra ngoài, ngọn lửa chưa cháy dữ dội thì tiếp tục sử dụng nước, hoặc bất kỳ chất, phương tiện chữa cháy có được để dập lửa.',
      'Cả ba ý trên.'
    ],
    correct_answer: 1,
    is_serious_violation: false,
    explanation: 'Hành động ĐẦU TIÊN là phải bình tĩnh, tấp xe vào lề an toàn, tắt khóa điện để cắt nguồn phát nhiệt, sau đó chữa cháy.'
  },
  {
    id: 205,
    chapter: 2,
    chapter_name: 'Văn hóa giao thông, đạo đức người lái xe, PCCC & CNCH',
    question_text: 'Khi gặp nạn nhân bị bỏng trong vụ tai nạn giao thông, người lái xe cần làm gì?',
    options: [
      'Gọi số 115 để thông báo về tình trạng tai nạn và yêu cầu hỗ trợ y tế ngay lập tức. Quan sát hiện trường để giúp nạn nhân, đồng thời tránh gây tổn thương cho mình.',
      'Nhanh chóng loại bỏ nguyên nhân gây bỏng bằng cách tách nạn nhân khỏi vật gây cháy, cởi bỏ quần áo nếu bén lửa, ngâm vùng da bị bỏng vào nước sạch hoặc đắp khăn mát, lưu ý không dùng khăn hoặc nước quá lạnh.',
      'Nếu nạn nhân còn tỉnh, cần cho uống bù nước. Trong thời tiết lạnh, cần giữ ấm cho cơ thể nạn nhân, sau đó nhanh chóng đưa đến cơ sở y tế gần nhất.',
      'Cả ba ý trên.'
    ],
    correct_answer: 4,
    is_serious_violation: false,
    explanation: 'Thực hiện đồng bộ các biện pháp: gọi 115, dập lửa ngâm nước mát sạch, giữ ấm và bù nước đưa đến cơ sở y tế.'
  },

  // ================= CHAPTER 3: KỸ THUẬT LÁI XE =================
  {
    id: 206,
    chapter: 3,
    chapter_name: 'Kỹ thuật lái xe',
    question_text: 'Khi điều khiển xe mô tô tay ga xuống đường dốc dài, độ dốc cao, người lái xe cần thực hiện các thao tác nào dưới đây để bảo đảm an toàn?',
    options: [
      'Giữ tay ga ở mức độ phù hợp, sử dụng phanh trước và phanh sau để giảm tốc độ.',
      'Nhả hết tay ga, tắt động cơ, sử dụng phanh trước và phanh sau để giảm tốc độ.',
      'Sử dụng phanh trước để giảm tốc độ kết hợp với tắt chìa khóa điện của xe.'
    ],
    correct_answer: 1,
    is_serious_violation: true,
    explanation: 'ĐIỂM LIỆT: Tuyệt đối không được tắt động cơ hoặc nhả hết ga trôi tự do vì sẽ mất lực hãm động cơ dẫn đến mất phanh.'
  },
  {
    id: 207,
    chapter: 3,
    chapter_name: 'Kỹ thuật lái xe',
    question_text: 'Khi vào số để khởi hành xe ô tô có số tự động, người lái xe phải thực hiện các thao tác nào để bảo đảm an toàn?',
    options: [
      'Đạp bàn đạp phanh chân hết hành trình, vào số và nhả phanh đỗ, kiểm tra lại xem có bị nhầm số không rồi mới cho xe lăn bánh.',
      'Đạp bàn đạp để tăng ga với mức độ phù hợp, vào số và kiểm tra lại xem có bị nhầm số không rồi mới cho xe lăn bánh.'
    ],
    correct_answer: 1,
    is_serious_violation: false,
    explanation: 'Với xe số tự động, luôn luôn phải ĐẠP HẾT PHANH CHÂN trước khi gạt cần số để tránh xe bị chồm ga bất ngờ.'
  },
  {
    id: 213,
    chapter: 3,
    chapter_name: 'Kỹ thuật lái xe',
    question_text: 'Khi điều khiển ô tô xuống dốc dài, người lái xe cần thực hiện các thao tác nào dưới đây để bảo đảm an toàn?',
    options: [
      'Tăng lên số cao, nhả bàn đạp ga ở mức độ phù hợp, kết hợp với phanh chân để khống chế tốc độ.',
      'Về số thấp, nhả bàn đạp ga ở mức độ phù hợp, kết hợp với phanh chân để khống chế tốc độ.',
      'Về số không (0), nhả bàn đạp ga ở mức độ phù hợp, kết hợp với phanh chân để khống chế tốc độ.'
    ],
    correct_answer: 2,
    is_serious_violation: true,
    explanation: 'ĐIỂM LIỆT: Xuống dốc dài bắt buộc phải VỀ SỐ THẤP để hãm động cơ; cấm về số 0 hoặc tắt máy vì sẽ làm cháy má phanh gây mất phanh hoàn toàn.'
  },
  {
    id: 225,
    chapter: 3,
    chapter_name: 'Kỹ thuật lái xe',
    question_text: 'Khi điều khiển xe ô tô tới gần xe chạy ngược chiều vào ban đêm, người lái xe cần thực hiện các thao tác nào để bảo đảm an toàn?',
    options: [
      'Chuyển từ đèn chiếu xa sang đèn chiếu gần; không nhìn thẳng vào đèn của xe chạy ngược chiều mà nhìn chếch sang phía phải theo chiều chuyển động của xe mình.',
      'Chuyển từ đèn chiếu gần sang đèn chiếu xa; không nhìn thẳng vào đèn của xe chạy ngược chiều mà nhìn chếch sang phía phải theo chiều chuyển động của xe mình.',
      'Chuyển từ đèn chiếu xa sang đèn chiếu gần; nhìn thẳng vào đèn của xe chạy ngược chiều để tránh xe bảo đảm an toàn.'
    ],
    correct_answer: 1,
    is_serious_violation: false,
    explanation: 'Chuyển đèn chiếu xa sang chiếu gần để tránh làm chói mắt tài xế đối diện, nhìn chếch về phía lề đường bên phải để định hướng an toàn.'
  },
  {
    id: 227,
    chapter: 3,
    chapter_name: 'Kỹ thuật lái xe',
    question_text: 'Khi động cơ xe ô tô đã khởi động, bảng đồng hồ xuất hiện ký hiệu chấm than trong vòng tròn kèm chữ BRAKE (hoặc chữ P) là báo hiệu tình trạng gì?',
    options: [
      'Đang sử dụng phanh đỗ (hoặc thiếu dầu phanh).',
      'Nhiệt độ nước làm mát quá mức cho phép.',
      'Cửa xe đang mở.'
    ],
    correct_answer: 1,
    image_url: 'dashboard_brake',
    is_serious_violation: false,
    explanation: 'Biểu tượng phanh đỏ: phanh đỗ (phanh tay) đang hãm hoặc hệ thống thiếu dầu phanh an toàn.'
  },
  {
    id: 228,
    chapter: 3,
    chapter_name: 'Kỹ thuật lái xe',
    question_text: 'Khi động cơ xe ô tô đã khởi động, bảng đồng hồ xuất hiện ký hiệu bình dầu có giọt dầu màu đỏ là báo hiệu gì?',
    options: [
      'Đang sử dụng phanh đỗ.',
      'Thiếu dầu phanh.',
      'Nhiệt độ nước làm mát tăng quá mức cho phép.',
      'Áp suất dầu bôi trơn ở mức thấp.'
    ],
    correct_answer: 4,
    image_url: 'dashboard_oil',
    is_serious_violation: false,
    explanation: 'Biểu tượng bình dầu nhỏ giọt: Cảnh báo áp suất dầu bôi trơn động cơ quá thấp, cần dừng xe kiểm tra ngay để tránh bó máy.'
  },
  {
    id: 230,
    chapter: 3,
    chapter_name: 'Kỹ thuật lái xe',
    question_text: 'Khi động cơ xe ô tô đã khởi động, bảng đồng hồ xuất hiện ký hiệu người ngồi cài dây chéo màu đỏ là báo hiệu gì?',
    options: [
      'Thiếu dầu phanh, phanh tay đang hãm.',
      'Hệ thống túi khí an toàn gặp sự cố.',
      'Lái xe và người ngồi ghế trước chưa cài dây đai an toàn.',
      'Cửa đóng chưa chặt, có cửa chưa đóng.'
    ],
    correct_answer: 3,
    image_url: 'dashboard_seatbelt',
    is_serious_violation: false,
    explanation: 'Biểu tượng dây an toàn: Nhắc nhở người lái và hành khách phía trước chưa thắt dây đai an toàn.'
  },
  {
    id: 239,
    chapter: 3,
    chapter_name: 'Kỹ thuật lái xe',
    question_text: 'Khi điều khiển xe ô tô có hộp số tự động, người lái xe sử dụng chân như thế nào là đúng để bảo đảm an toàn?',
    options: [
      'Không sử dụng chân trái; chân phải điều khiển bàn đạp phanh và bàn đạp ga.',
      'Chân trái điều khiển bàn đạp phanh, chân phải điều khiển bàn đạp ga.',
      'Không sử dụng chân phải; chân trái điều khiển bàn đạp phanh và bàn đạp ga.'
    ],
    correct_answer: 1,
    is_serious_violation: true,
    explanation: 'ĐIỂM LIỆT: Xe số tự động chỉ dùng duy nhất CHÂN PHẢI để điều khiển cả phanh và ga. Tuyệt đối không dùng chân trái để đạp phanh.'
  },
  {
    id: 262,
    chapter: 3,
    chapter_name: 'Kỹ thuật lái xe',
    question_text: 'Khi lái xe ô tô điện xuống dốc dài, đổ đèo, người lái xe cần chú ý những vấn đề gì để bảo đảm an toàn?',
    options: [
      'Kiểm tra hệ thống an toàn, pin của xe trước khi xuất phát.',
      'Nhả chân ga để phanh tái sinh hoạt động.',
      'Rà phanh chân để kịp thời xử lý tình huống khẩn cấp.',
      'Cả ba ý trên.'
    ],
    correct_answer: 4,
    is_serious_violation: false,
    explanation: 'Xe điện khi xuống dốc tận dụng phanh tái sinh (regenerative braking) để hãm tốc độ và nạp lại điện cho pin, kết hợp phanh chân an toàn.'
  },

  // ================= CHAPTER 4: CẤU TẠO VÀ SỬA CHỮA =================
  {
    id: 264,
    chapter: 4,
    chapter_name: 'Cấu tạo và sửa chữa',
    question_text: 'Phương pháp kiểm tra mức dầu bôi trơn động cơ nào dưới đây là đúng?',
    options: [
      'Kiểm tra que thăm dầu trên các-te. Quan sát vệt dầu trên que thăm, mức dầu này phải nằm ở mức tối đa được thể hiện trên que thăm.',
      'Rút que thăm dầu trên các-te. Quan sát vệt dầu trên que thăm, mức dầu này phải nằm ở mức tối thiểu được thể hiện trên que thăm.',
      'Rút que thăm dầu trên các-te, lau sạch que thăm sau đó cắm vào các-te và rút ra quan sát vệt dầu trên que thăm, mức dầu phải nằm trong khoảng vạch mức tối thiểu và tối đa được thể hiện trên que thăm.'
    ],
    correct_answer: 3,
    is_serious_violation: false,
    explanation: 'Rút que ra lau sạch trước, cắm lại rồi rút ra quan sát: mức dầu chuẩn nằm giữa hai vạch Min và Max.'
  },
  {
    id: 275,
    chapter: 4,
    chapter_name: 'Cấu tạo và sửa chữa',
    question_text: 'Thế nào là động cơ 4 kỳ?',
    options: [
      'Là loại động cơ: để hoàn thành một chu trình công tác của động cơ, pít tông thực hiện 2 (hai) hành trình, trong đó có một lần sinh công.',
      'Là loại động cơ: để hoàn thành một chu trình công tác của động cơ, pít tông thực hiện 4 (bốn) hành trình, trong đó có một lần sinh công.'
    ],
    correct_answer: 2,
    is_serious_violation: false,
    explanation: 'Động cơ 4 kỳ gồm 4 hành trình của pít tông: Hút - Nén - Nổ (sinh công) - Xả.'
  },
  {
    id: 284,
    chapter: 4,
    chapter_name: 'Cấu tạo và sửa chữa',
    question_text: 'Hãy nêu công dụng của hệ thống phanh của xe ô tô?',
    options: [
      'Dùng để giảm tốc độ, dừng chuyển động của xe ô tô và giữ cho xe ô tô đứng yên trên dốc.',
      'Dùng để thay đổi hướng chuyển động hoặc giữ cho xe ô tô chuyển động ổn định theo hướng xác định.',
      'Dùng để truyền hoặc ngắt truyền động từ động cơ đến bánh xe chủ động của xe ô tô.'
    ],
    correct_answer: 1,
    is_serious_violation: false,
    explanation: 'Hệ thống phanh có tác dụng giảm tốc độ, dừng xe và đỗ xe đứng yên trên dốc.'
  },
  {
    id: 289,
    chapter: 4,
    chapter_name: 'Cấu tạo và sửa chữa',
    question_text: 'Khi động cơ ô tô đã khởi động, bảng đồng hồ xuất hiện ký hiệu chữ ABS trong vòng tròn báo hiệu tình trạng gì?',
    options: [
      'Báo hiệu hệ thống chống bó cứng phanh bị lỗi.',
      'Áp suất lốp không đủ.',
      'Đang hãm phanh tay.',
      'Sắp hết nhiên liệu.'
    ],
    correct_answer: 1,
    image_url: 'dashboard_abs',
    is_serious_violation: false,
    explanation: 'Ký hiệu ABS báo hiệu hệ thống chống bó cứng phanh (Anti-lock Braking System) đang gặp trục trặc.'
  },
  {
    id: 294,
    chapter: 4,
    chapter_name: 'Cấu tạo và sửa chữa',
    question_text: 'Túi khí được trang bị trên xe ô tô có tác dụng gì dưới đây?',
    options: [
      'Giữ chặt người lái và hành khách trên ghế ngồi khi xe ô tô đột ngột dừng lại.',
      'Giảm khả năng va đập của một số bộ phận cơ thể quan trọng với các vật thể trong xe.',
      'Hấp thụ một phần lực va đập lên người lái và hành khách.',
      'Ý 2 và ý 3.'
    ],
    correct_answer: 4,
    is_serious_violation: false,
    explanation: 'Túi khí kết hợp với dây an toàn giúp hấp thụ xung lực và giảm chấn thương khi va chạm (ý 2 và 3).'
  },

  // ================= CHAPTER 5: BÁO HIỆU ĐƯỜNG BỘ =================
  {
    id: 301,
    chapter: 5,
    chapter_name: 'Báo hiệu đường bộ',
    question_text: 'Biển nào cấm các loại xe cơ giới đi vào, trừ xe máy hai bánh, xe gắn máy và các loại xe ưu tiên theo quy định?',
    options: [
      'Biển 1.',
      'Biển 2.',
      'Biển 1 và biển 3.',
      'Cả ba biển.'
    ],
    correct_answer: 1,
    images: [
      { key: 'p103a_cam_oto', label: 'Biển 1' },
      { key: 'p107_cam_tai_khach', label: 'Biển 2' },
      { key: 'p106b_cam_tai', label: 'Biển 3' }
    ],
    is_serious_violation: false,
    explanation: 'Biển 1 (P.103a) cấm các loại xe cơ giới đi vào, trừ xe mô tô hai bánh, xe gắn máy và xe ưu tiên theo quy định.'
  },
  {
    id: 302,
    chapter: 5,
    chapter_name: 'Báo hiệu đường bộ',
    question_text: 'Biển nào cấm xe ô tô tải?',
    options: [
      'Cả ba biển.',
      'Biển 2 và biển 3.',
      'Biển 1 và biển 3.',
      'Biển 1 và biển 2.'
    ],
    correct_answer: 4,
    images: [
      { key: 'p103a_cam_oto', label: 'Biển 1' },
      { key: 'p107_cam_tai_khach', label: 'Biển 2' },
      { key: 'p126_cam_tai_vuot', label: 'Biển 3' }
    ],
    is_serious_violation: false,
    explanation: 'Nguyên tắc biển cấm: Cấm xe nhỏ thì cấm luôn xe lớn. Biển 1 cấm ô tô con nên cấm luôn tải. Biển 2 cấm trực tiếp tải và khách. Vậy Biển 1 và Biển 2 cấm ô tô tải.'
  },
  {
    id: 303,
    chapter: 5,
    chapter_name: 'Báo hiệu đường bộ',
    question_text: 'Biển nào cấm máy kéo?',
    options: [
      'Biển 1.',
      'Biển 2 và biển 3.',
      'Biển 1 và biển 3.',
      'Cả ba biển.'
    ],
    correct_answer: 2,
    images: [
      { key: 'p105_cam_moto', label: 'Biển 1' },
      { key: 'p106b_cam_tai', label: 'Biển 2' },
      { key: 'p106_cam_may_keo', label: 'Biển 3' }
    ],
    is_serious_violation: false,
    explanation: 'Biển 2 cấm tải nên cấm luôn máy kéo. Biển 3 cấm trực tiếp máy kéo. Vậy Biển 2 và Biển 3 cấm máy kéo.'
  },
  {
    id: 306,
    chapter: 5,
    chapter_name: 'Báo hiệu đường bộ',
    question_text: 'Biển nào báo hiệu cấm xe mô tô hai bánh đi vào?',
    options: [
      'Biển 1.',
      'Biển 2.',
      'Biển 3.'
    ],
    correct_answer: 1,
    images: [
      { key: 'p105_cam_moto', label: 'Biển 1' },
      { key: 'p103a_cam_oto', label: 'Biển 2' },
      { key: 'p106b_cam_tai', label: 'Biển 3' }
    ],
    is_serious_violation: false,
    explanation: 'Biển 1 (P.105) cấm xe mô tô hai bánh đi vào. Biển 2 và 3 chỉ cấm ô tô và xe tải, không cấm mô tô 2 bánh.'
  },
  {
    id: 308,
    chapter: 5,
    chapter_name: 'Báo hiệu đường bộ',
    question_text: 'Biển nào cho phép xe ô tô con được vượt?',
    options: [
      'Biển 1 và biển 2.',
      'Biển 2.',
      'Biển 1 và biển 3.',
      'Biển 2 và biển 3.'
    ],
    correct_answer: 3,
    images: [
      { key: 'dp133_het_cam_vuot', label: 'Biển 1' },
      { key: 'p125_cam_vuot', label: 'Biển 2' },
      { key: 'p126_cam_tai_vuot', label: 'Biển 3' }
    ],
    is_serious_violation: false,
    explanation: 'Biển 1: Hết cấm vượt (được vượt). Biển 2: Cấm ô tô con vượt. Biển 3: Chỉ cấm xe tải vượt (ô tô con vẫn được vượt). Vậy Biển 1 và Biển 3 cho phép ô tô con vượt.'
  },
  {
    id: 314,
    chapter: 5,
    chapter_name: 'Báo hiệu đường bộ',
    question_text: 'Biển nào cấm xe rẽ trái?',
    options: [
      'Biển 1.',
      'Biển 2.',
      'Cả hai biển.'
    ],
    correct_answer: 1,
    images: [
      { key: 'p123a_cam_re_trai', label: 'Biển 1' },
      { key: 'p124a_cam_quay_dau', label: 'Biển 2' }
    ],
    is_serious_violation: false,
    explanation: 'Theo quy chuẩn mới QCVN 41:2019: Cấm quay đầu KHÔNG cấm rẽ trái. Chỉ biển 1 (P.123a) cấm rẽ trái.'
  },
  {
    id: 323,
    chapter: 5,
    chapter_name: 'Báo hiệu đường bộ',
    question_text: 'Biển nào xe quay đầu không bị cấm?',
    options: [
      'Biển 1.',
      'Biển 2.',
      'Cả hai biển.'
    ],
    correct_answer: 3,
    images: [
      { key: 'p123a_cam_re_trai', label: 'Biển 1' },
      { key: 'i410_khu_vuc_quay_xe', label: 'Biển 2' }
    ],
    is_serious_violation: false,
    explanation: 'Biển 1 cấm rẽ trái nhưng KHÔNG cấm quay đầu (theo QCVN 41:2019). Biển 2 là biển chỉ dẫn khu vực quay xe. Cả 2 biển đều không cấm quay đầu.'
  },
  {
    id: 325,
    chapter: 5,
    chapter_name: 'Báo hiệu đường bộ',
    question_text: 'Biển nào là biển "Cấm đi ngược chiều"?',
    options: [
      'Biển 1.',
      'Biển 2.',
      'Cả ba biển.'
    ],
    correct_answer: 2,
    images: [
      { key: 'p101_duong_cam', label: 'Biển 1' },
      { key: 'p102_cam_nguoc_chieu', label: 'Biển 2' },
      { key: 'p131a_cam_do_xe', label: 'Biển 3' }
    ],
    is_serious_violation: false,
    explanation: 'Biển 1: Đường cấm. Biển 2: Cấm đi ngược chiều (vạch ngang trắng nền đỏ). Biển 3: Cấm đỗ xe.'
  },
  {
    id: 327,
    chapter: 5,
    chapter_name: 'Báo hiệu đường bộ',
    question_text: 'Gặp biển nào người lái xe không được đỗ xe vào ngày chẵn?',
    options: [
      'Biển 1.',
      'Biển 1 và biển 3.',
      'Biển 2 và biển 3.',
      'Biển 3.'
    ],
    correct_answer: 2,
    images: [
      { key: 'p131a_cam_do_xe', label: 'Biển 1' },
      { key: 'p131b_cam_do_xe_ngay_le', label: 'Biển 2' },
      { key: 'p131c_cam_do_xe_ngay_chan', label: 'Biển 3' }
    ],
    is_serious_violation: false,
    explanation: 'Biển 1 cấm đỗ xe tất cả các ngày (gồm cả ngày chẵn). Biển 3 cấm đỗ xe ngày chẵn (2 vạch trắng). Vậy Biển 1 và Biển 3 không được đỗ xe vào ngày chẵn.'
  },
  {
    id: 329,
    chapter: 5,
    chapter_name: 'Báo hiệu đường bộ',
    question_text: 'Khi gặp biển nào xe ưu tiên theo luật định vẫn phải dừng lại?',
    options: [
      'Biển 1.',
      'Biển 2.',
      'Cả ba biển.'
    ],
    correct_answer: 2,
    images: [
      { key: 'p101_duong_cam', label: 'Biển 1' },
      { key: 'p122_stop', label: 'Biển 2' },
      { key: 'p102_cam_nguoc_chieu', label: 'Biển 3' }
    ],
    is_serious_violation: false,
    explanation: 'Biển STOP (P.122) là biển duy nhất buộc tất cả các loại xe, kể cả xe ưu tiên theo luật định, đều phải dừng lại.'
  },
  {
    id: 362,
    chapter: 5,
    chapter_name: 'Báo hiệu đường bộ',
    question_text: 'Biển nào báo hiệu hạn chế tốc độ tối đa của phương tiện không vượt quá trị số ghi trên biển?',
    options: [
      'Biển 1.',
      'Biển 2.'
    ],
    correct_answer: 2,
    images: [
      { key: 'speed_limit_60', label: 'Biển 1' },
      { key: 'speed_limit_50', label: 'Biển 2' }
    ],
    is_serious_violation: false,
    explanation: 'Biển 2 viền đỏ nền trắng số 50 là biển hạn chế tốc độ TỐI ĐA (P.127). Biển 1 tròn xanh là tốc độ TỐI THIỂU (R.306).'
  },
  {
    id: 382,
    chapter: 5,
    chapter_name: 'Báo hiệu đường bộ',
    question_text: 'Biển nào báo hiệu "Giao nhau với đường không ưu tiên"?',
    options: [
      'Biển 1.',
      'Biển 2.',
      'Biển 3.',
      'Biển 2 và biển 3.'
    ],
    correct_answer: 1,
    images: [
      { key: 'w207_giao_khong_uu_tien', label: 'Biển 1' },
      { key: 'w208_giao_uu_tien', label: 'Biển 2' },
      { key: 'i401_bat_dau_duong_uu_tien', label: 'Biển 3' }
    ],
    is_serious_violation: false,
    explanation: 'Biển 1 (W.207): Giao nhau với đường không ưu tiên (xe đi trên đường này được quyền ưu tiên qua nơi giao nhau).'
  },
  {
    id: 383,
    chapter: 5,
    chapter_name: 'Báo hiệu đường bộ',
    question_text: 'Biển nào báo hiệu "Giao nhau với đường ưu tiên"?',
    options: [
      'Biển 1 và biển 3.',
      'Biển 2.',
      'Biển 3.'
    ],
    correct_answer: 2,
    images: [
      { key: 'w207_giao_khong_uu_tien', label: 'Biển 1' },
      { key: 'w208_giao_uu_tien', label: 'Biển 2' },
      { key: 'i401_bat_dau_duong_uu_tien', label: 'Biển 3' }
    ],
    is_serious_violation: false,
    explanation: 'Biển 2 (W.208) hình tam giác ngược: Báo hiệu chuẩn bị giao nhau với đường ưu tiên (phải giảm tốc độ nhường đường).'
  },
  {
    id: 393,
    chapter: 5,
    chapter_name: 'Báo hiệu đường bộ',
    question_text: 'Biển nào báo hiệu "Đường đôi"?',
    options: [
      'Biển 1.',
      'Biển 2.',
      'Biển 3.'
    ],
    correct_answer: 3,
    images: [
      { key: 'w204_het_duong_doi', label: 'Biển 1' },
      { key: 'w205_giao_nhau_cung_cap', label: 'Biển 2' },
      { key: 'w203_duong_doi', label: 'Biển 3' }
    ],
    is_serious_violation: false,
    explanation: 'Biển 3 (W.203) báo hiệu bắt đầu vào đoạn đường đôi có dải phân cách ở giữa (chướng ngại vật ở đỉnh trên).'
  },
  {
    id: 401,
    chapter: 5,
    chapter_name: 'Báo hiệu đường bộ',
    question_text: 'Biển nào dưới đây là biển "Cầu hẹp"?',
    options: [
      'Biển 1.',
      'Biển 2.',
      'Biển 3.'
    ],
    correct_answer: 2,
    images: [
      { key: 'w203_duong_doi', label: 'Biển 1' },
      { key: 'w212_cau_hep', label: 'Biển 2' },
      { key: 'w213_cau_quay_cat', label: 'Biển 3' }
    ],
    is_serious_violation: false,
    explanation: 'Biển 2 (W.212) là biển Cầu hẹp (hai vệt đường thắt lại ở giữa). Biển 3 là Cầu quay - cầu cất.'
  },
  {
    id: 428,
    chapter: 5,
    chapter_name: 'Báo hiệu đường bộ',
    question_text: 'Biển nào báo hiệu "Đường dành cho xe ô tô"?',
    options: [
      'Biển 1.',
      'Biển 2.'
    ],
    correct_answer: 1,
    images: [
      { key: 'r403a_duong_oto', label: 'Biển 1' },
      { key: 'r404a_het_duong_oto', label: 'Biển 2' }
    ],
    is_serious_violation: false,
    explanation: 'Biển 1 (R.403a) báo hiệu đường dành riêng cho xe ô tô. Biển 2 là hết đường dành cho ô tô.'
  },
  {
    id: 478,
    chapter: 5,
    chapter_name: 'Báo hiệu đường bộ',
    question_text: 'Vạch kẻ đường nào dưới đây là vạch phân chia hai chiều xe chạy (vạch tim đường), xe không được lấn làn, không được đè lên vạch?',
    options: [
      'Vạch 1.',
      'Vạch 2.',
      'Vạch 3.',
      'Cả ba vạch.'
    ],
    correct_answer: 3,
    images: [
      { key: 'vach_1_1_net_dut_vang', label: 'Vạch 1' },
      { key: 'vach_1_2_net_lien_trang', label: 'Vạch 2' },
      { key: 'vach_1_3_net_lien_doi_vang', label: 'Vạch 3' }
    ],
    is_serious_violation: false,
    explanation: 'Vạch màu vàng là vạch tim đường phân chia 2 chiều xe chạy ngược chiều; Vạch 3 là vạch nét liền đôi màu vàng cấm tuyệt đối lấn làn, đè vạch.'
  },

  // ================= CHAPTER 6: GIẢI THẾ SA HÌNH =================
  {
    id: 486,
    chapter: 6,
    chapter_name: 'Giải thế sa hình và kỹ năng xử lý tình huống',
    question_text: 'Theo hướng mũi tên tại ngã tư có đèn tín hiệu, xe nào chấp hành đúng quy tắc giao thông?',
    options: [
      'Xe khách, xe tải, xe mô tô.',
      'Xe tải, xe mô tô.',
      'Chỉ xe con.'
    ],
    correct_answer: 3,
    image_url: 'sahinh_xe_re_phai_thang_trai',
    is_serious_violation: false,
    explanation: 'Quan sát đèn tín hiệu và mũi tên chỉ hướng: Xe con gặp đèn xanh rẽ phải, đi đúng làn -> Chấp hành đúng quy tắc giao thông.'
  },
  {
    id: 494,
    chapter: 6,
    chapter_name: 'Giải thế sa hình và kỹ năng xử lý tình huống',
    question_text: 'Tại ngã tư giao nhau, có xe chữa cháy và xe cứu thương cùng đi làm nhiệm vụ, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?',
    options: [
      'Xe cứu thương đi làm nhiệm vụ cấp cứu, xe chữa cháy đi làm nhiệm vụ chữa cháy, xe con.',
      'Xe chữa cháy đi làm nhiệm vụ chữa cháy, xe cứu thương đi làm nhiệm vụ cấp cứu, xe con.',
      'Xe cứu thương đi làm nhiệm vụ cấp cứu, xe con, xe chữa cháy đi làm nhiệm vụ chữa cháy.'
    ],
    correct_answer: 2,
    image_url: 'sahinh_uu_tien_cuu_hoa',
    is_serious_violation: false,
    explanation: 'Quy tắc thứ tự các xe ưu tiên theo Luật Giao thông: HỎA (chữa cháy) -> SỰ (quân sự) -> AN (công an) -> THƯƠNG (cứu thương). Xe chữa cháy được quyền đi trước xe cứu thương.'
  },
  {
    id: 495,
    chapter: 6,
    chapter_name: 'Giải thế sa hình và kỹ năng xử lý tình huống',
    question_text: 'Tại nơi đường giao nhau, xe nào được quyền đi trước giữa xe mô tô và xe cứu thương đang phát tín hiệu ưu tiên?',
    options: [
      'Xe mô tô.',
      'Xe cứu thương đi làm nhiệm vụ cấp cứu.'
    ],
    correct_answer: 2,
    image_url: 'sahinh_uu_tien_cuu_hoa',
    is_serious_violation: false,
    explanation: 'Xe cứu thương đang phát tín hiệu ưu tiên đi làm nhiệm vụ cấp cứu thuộc nhóm xe ưu tiên, được quyền đi trước qua nơi giao nhau.'
  },
  {
    id: 498,
    chapter: 6,
    chapter_name: 'Giải thế sa hình và kỹ năng xử lý tình huống',
    question_text: 'Xe nào được quyền đi trước trong trường hợp có xe Công an và xe Chữa cháy cùng đi làm nhiệm vụ khẩn cấp?',
    options: [
      'Xe công an đi làm nhiệm vụ khẩn cấp.',
      'Xe chữa cháy đi làm nhiệm vụ chữa cháy.'
    ],
    correct_answer: 2,
    image_url: 'sahinh_uu_tien_cuu_hoa',
    is_serious_violation: false,
    explanation: 'Thứ tự ưu tiên: Cứu hỏa (xe chữa cháy) được quyền đi trước xe Công an.'
  },
  {
    id: 501,
    chapter: 6,
    chapter_name: 'Giải thế sa hình và kỹ năng xử lý tình huống',
    question_text: 'Trong trường hợp có Xe Quân sự và Xe Công an cùng đi làm nhiệm vụ khẩn cấp, xe nào được quyền đi trước?',
    options: [
      'Xe công an đi làm nhiệm vụ khẩn cấp.',
      'Xe quân sự đi làm nhiệm vụ khẩn cấp.'
    ],
    correct_answer: 2,
    image_url: 'sahinh_uu_tien_cuu_hoa',
    is_serious_violation: false,
    explanation: 'Theo quy định thứ tự ưu tiên: Xe Quân sự được quyền đi trước xe Công an.'
  },
  {
    id: 520,
    chapter: 6,
    chapter_name: 'Giải thế sa hình và kỹ năng xử lý tình huống',
    question_text: 'Tại ngã tư không có biển báo ưu tiên, các xe cùng cấp, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?',
    options: [
      'Xe con (A), xe mô tô, xe con (B), xe đạp.',
      'Xe con (B), xe đạp, xe mô tô, xe con (A).',
      'Xe con (A), xe con (B), xe mô tô + xe đạp.',
      'Xe mô tô + xe đạp, xe con (A), xe con (B).'
    ],
    correct_answer: 4,
    image_url: 'sahinh_xe_re_phai_thang_trai',
    is_serious_violation: false,
    explanation: 'Tại ngã tư cùng cấp: Xe có hướng bên phải không vướng (hoặc xe rẽ phải) được đi trước -> Xe mô tô + xe đạp rẽ phải đi trước, tiếp theo xe đi thẳng (Xe con A), cuối cùng xe rẽ trái (Xe con B).'
  },
  {
    id: 533,
    chapter: 6,
    chapter_name: 'Giải thế sa hình và kỹ năng xử lý tình huống',
    question_text: 'Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?',
    options: [
      'Xe khách, xe tải, xe con.',
      'Xe con, xe tải, xe khách.',
      'Xe tải, xe khách, xe con.'
    ],
    correct_answer: 3,
    image_url: 'sahinh_xe_re_phai_thang_trai',
    is_serious_violation: false,
    explanation: 'Xe tải nằm trên đường ưu tiên đi trước, tiếp đến xe khách đi thẳng, cuối cùng xe con rẽ trái.'
  },
  {
    id: 541,
    chapter: 6,
    chapter_name: 'Giải thế sa hình và kỹ năng xử lý tình huống',
    question_text: 'Trên đoạn đường đèo dốc hẹp, một xe đang lên dốc và một xe đang xuống dốc, xe nào phải nhường đường?',
    options: [
      'Xe A (đang lên dốc).',
      'Xe B (đang xuống dốc).'
    ],
    correct_answer: 2,
    image_url: 'sahinh_xe_re_phai_thang_trai',
    is_serious_violation: false,
    explanation: 'Quy tắc nhường đường trên dốc: Xe xuống dốc (Xe B) PHẢI nhường đường cho xe lên dốc (Xe A).'
  },
  {
    id: 592,
    chapter: 6,
    chapter_name: 'Giải thế sa hình và kỹ năng xử lý tình huống',
    question_text: 'Khi có đoàn tàu hỏa chạy qua đường ngang không có rào chắn, xe ô tô con dừng cách đường ray 5 mét, xe mô tô dừng cách 3 mét. Xe nào dừng đúng theo quy tắc giao thông?',
    options: [
      'Xe con.',
      'Xe mô tô.',
      'Cả 2 xe đều đúng.'
    ],
    correct_answer: 1,
    image_url: 'sahinh_uu_tien_cuu_hoa',
    is_serious_violation: false,
    explanation: 'Luật quy định: Khoảng cách dừng xe an toàn tối thiểu tính từ mép ray ngoài cùng của đường sắt là 5 MÉT. Xe con cách 5m là đúng, xe máy cách 3m là sai.'
  }
];
