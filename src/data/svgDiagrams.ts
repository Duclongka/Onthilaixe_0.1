// Accurate SVG traffic signs and road scenario diagrams matching Vietnam National Standard QCVN 41:2019/BGTVT and official 600 questions
export interface VisualItem {
  id: string;
  type: 'signs' | 'scenario' | 'dashboard';
  title: string;
  renderSvg: () => string;
}

// Generate SVG traffic sign
export function getTrafficSignSvg(signType: string, label?: string): string {
  switch (signType) {
    // Biển P.101: Đường cấm (vòng tròn viền đỏ nền trắng)
    case 'p101_duong_cam':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke="#DC2626" stroke-width="10"/>
      </svg>`;

    // Biển P.102: Cấm đi ngược chiều (vòng tròn đỏ vạch trắng ngang)
    case 'p102_cam_nguoc_chieu':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <circle cx="50" cy="50" r="46" fill="#DC2626" stroke="#B91C1C" stroke-width="2"/>
        <rect x="18" y="42" width="64" height="16" rx="2" fill="#FFFFFF"/>
      </svg>`;

    // Biển P.122: Biển STOP
    case 'p122_stop':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <polygon points="30,6 70,6 94,30 94,70 70,94 30,94 6,70 6,30" fill="#DC2626" stroke="#991B1B" stroke-width="2"/>
        <polygon points="31,9 69,9 91,31 91,69 69,91 31,91 9,69 9,31" fill="#DC2626" stroke="#FFFFFF" stroke-width="2.5"/>
        <text x="50" y="58" font-family="Arial, sans-serif" font-weight="900" font-size="22" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">STOP</text>
      </svg>`;

    // Biển P.103a: Cấm ô tô
    case 'p103a_cam_oto':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke="#DC2626" stroke-width="9"/>
        <g fill="#1E293B">
          <path d="M28 56 L33 42 C34 39 37 37 40 37 L60 37 C63 37 66 39 67 42 L72 56 C74 56 76 58 76 61 L76 67 C76 68 75 69 74 69 L72 69 C71 69 70 68 70 67 L70 65 L30 65 L30 67 C30 68 29 69 28 69 L26 69 C25 69 24 68 24 67 L24 61 C24 58 26 56 28 56 Z"/>
          <path d="M35 44 L37 53 L63 53 L65 44 C65 42 63 41 61 41 L39 41 C37 41 35 42 35 44 Z" fill="#FFFFFF"/>
          <circle cx="34" cy="62" r="3.5" fill="#FEF08A"/>
          <circle cx="66" cy="62" r="3.5" fill="#FEF08A"/>
        </g>
        <line x1="22" y1="22" x2="78" y2="78" stroke="#DC2626" stroke-width="8" stroke-linecap="round"/>
      </svg>`;

    // Biển P.107: Cấm ô tô khách và ô tô tải
    case 'p107_cam_tai_khach':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke="#DC2626" stroke-width="9"/>
        <g fill="#1E293B">
          <!-- Small bus top -->
          <rect x="36" y="32" width="28" height="13" rx="1.5"/>
          <rect x="39" y="35" width="22" height="4" fill="#FFFFFF"/>
          <circle cx="42" cy="45" r="2.5" fill="#0F172A"/>
          <circle cx="58" cy="45" r="2.5" fill="#0F172A"/>
          <!-- Small truck bottom -->
          <rect x="30" y="52" width="24" height="12" rx="1"/>
          <path d="M54 55 L61 55 L65 60 L65 64 L54 64 Z"/>
          <circle cx="37" cy="65" r="3" fill="#0F172A"/>
          <circle cx="59" cy="65" r="3" fill="#0F172A"/>
        </g>
        <line x1="22" y1="22" x2="78" y2="78" stroke="#DC2626" stroke-width="8" stroke-linecap="round"/>
      </svg>`;

    // Biển P.106a/b: Cấm ô tô tải
    case 'p106a_cam_tai':
    case 'p106b_cam_tai':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke="#DC2626" stroke-width="9"/>
        <g fill="#1E293B">
          <rect x="25" y="40" width="30" height="20" rx="1"/>
          <path d="M57 44 L66 44 L72 52 L72 60 L57 60 Z"/>
          <circle cx="34" cy="63" r="5" fill="#0F172A"/>
          <circle cx="34" cy="63" r="2" fill="#E2E8F0"/>
          <circle cx="65" cy="63" r="5" fill="#0F172A"/>
          <circle cx="65" cy="63" r="2" fill="#E2E8F0"/>
          <path d="M59 47 L65 47 L69 52 L59 52 Z" fill="#FFFFFF"/>
        </g>
        <line x1="22" y1="22" x2="78" y2="78" stroke="#DC2626" stroke-width="8" stroke-linecap="round"/>
      </svg>`;

    // Biển P.105: Cấm xe mô tô
    case 'p105_cam_moto':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke="#DC2626" stroke-width="9"/>
        <g fill="#1E293B">
          <circle cx="33" cy="58" r="8" fill="none" stroke="#1E293B" stroke-width="4"/>
          <circle cx="67" cy="58" r="8" fill="none" stroke="#1E293B" stroke-width="4"/>
          <path d="M33 58 L45 48 L56 48 L67 58 M45 48 L48 38 L54 38 M54 44 L44 58" stroke="#1E293B" stroke-width="3" stroke-linecap="round"/>
          <circle cx="50" cy="33" r="3.5" fill="#1E293B"/>
        </g>
        <line x1="22" y1="22" x2="78" y2="78" stroke="#DC2626" stroke-width="8" stroke-linecap="round"/>
      </svg>`;

    // Biển P.106: Cấm máy kéo
    case 'p106_cam_may_keo':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke="#DC2626" stroke-width="9"/>
        <g fill="#1E293B">
          <!-- Big rear wheel -->
          <circle cx="35" cy="56" r="10" fill="none" stroke="#1E293B" stroke-width="5"/>
          <!-- Small front wheel -->
          <circle cx="68" cy="60" r="6" fill="none" stroke="#1E293B" stroke-width="4"/>
          <!-- Tractor body & cabin -->
          <rect x="38" y="38" width="16" height="18" fill="#1E293B"/>
          <rect x="54" y="47" width="16" height="9" fill="#1E293B"/>
          <line x1="65" y1="42" x2="65" y2="47" stroke="#1E293B" stroke-width="3"/>
        </g>
        <line x1="22" y1="22" x2="78" y2="78" stroke="#DC2626" stroke-width="8" stroke-linecap="round"/>
      </svg>`;

    // Biển P.125: Cấm vượt (ô tô con đỏ vượt ô tô đen)
    case 'p125_cam_vuot':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke="#DC2626" stroke-width="9"/>
        <!-- Red car (left) overtaking Black car (right) -->
        <g fill="#DC2626" transform="translate(24, 42) scale(0.65)">
          <path d="M8 32 L15 14 C17 10 20 8 26 8 L44 8 C50 8 53 10 55 14 L62 32 C65 32 68 35 68 40 L68 48 L4 48 L4 40 C4 35 7 32 8 32 Z"/>
        </g>
        <g fill="#1E293B" transform="translate(48, 42) scale(0.65)">
          <path d="M8 32 L15 14 C17 10 20 8 26 8 L44 8 C50 8 53 10 55 14 L62 32 C65 32 68 35 68 40 L68 48 L4 48 L4 40 C4 35 7 32 8 32 Z"/>
        </g>
      </svg>`;

    // Biển P.126: Cấm xe tải vượt (xe tải đỏ vượt xe con đen)
    case 'p126_cam_tai_vuot':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke="#DC2626" stroke-width="9"/>
        <!-- Red truck (left) overtaking Black car (right) -->
        <g fill="#DC2626" transform="translate(22, 38) scale(0.6)">
          <rect x="0" y="6" width="32" height="24" rx="2"/>
          <path d="M34 12 L44 12 L50 20 L50 30 L34 30 Z"/>
          <circle cx="12" cy="33" r="5"/>
          <circle cx="42" cy="33" r="5"/>
        </g>
        <g fill="#1E293B" transform="translate(54, 46) scale(0.55)">
          <path d="M8 32 L15 14 C17 10 20 8 26 8 L44 8 C50 8 53 10 55 14 L62 32 C65 32 68 35 68 40 L68 48 L4 48 L4 40 C4 35 7 32 8 32 Z"/>
        </g>
      </svg>`;

    // Biển DP.133: Hết cấm vượt (vòng tròn viền xanh gạch đen chéo)
    case 'dp133_het_cam_vuot':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke="#0284C7" stroke-width="8"/>
        <!-- Two gray cars -->
        <g fill="#94A3B8" transform="translate(24, 42) scale(0.65)">
          <path d="M8 32 L15 14 C17 10 20 8 26 8 L44 8 C50 8 53 10 55 14 L62 32 C65 32 68 35 68 40 L68 48 L4 48 L4 40 C4 35 7 32 8 32 Z"/>
        </g>
        <g fill="#94A3B8" transform="translate(48, 42) scale(0.65)">
          <path d="M8 32 L15 14 C17 10 20 8 26 8 L44 8 C50 8 53 10 55 14 L62 32 C65 32 68 35 68 40 L68 48 L4 48 L4 40 C4 35 7 32 8 32 Z"/>
        </g>
        <line x1="22" y1="22" x2="78" y2="78" stroke="#1E293B" stroke-width="7" stroke-linecap="round"/>
      </svg>`;

    // Biển P.123a: Cấm rẽ trái
    case 'p123a_cam_re_trai':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke="#DC2626" stroke-width="9"/>
        <g fill="#1E293B">
          <path d="M58 68 L58 48 C58 42 54 38 48 38 L36 38 L36 44 L24 35 L36 26 L36 32 L48 32 C58 32 64 38 64 48 L64 68 Z"/>
        </g>
        <line x1="22" y1="22" x2="78" y2="78" stroke="#DC2626" stroke-width="8" stroke-linecap="round"/>
      </svg>`;

    // Biển P.124a: Cấm quay đầu
    case 'p124a_cam_quay_dau':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke="#DC2626" stroke-width="9"/>
        <g fill="#1E293B">
          <path d="M58 66 L58 44 C58 36 52 30 44 30 C36 30 30 36 30 44 L30 54 L24 54 L33 66 L42 54 L36 54 L36 44 C36 40 40 36 44 36 C48 36 52 40 52 44 L52 66 Z"/>
        </g>
        <line x1="22" y1="22" x2="78" y2="78" stroke="#DC2626" stroke-width="8" stroke-linecap="round"/>
      </svg>`;

    // Biển I.410: Khu vực quay xe (vuông xanh mũi tên vòng trắng)
    case 'i410_khu_vuc_quay_xe':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <rect x="6" y="6" width="88" height="88" rx="8" fill="#0284C7" stroke="#0369A1" stroke-width="2"/>
        <g fill="#FFFFFF">
          <path d="M62 70 L62 44 C62 34 54 26 44 26 C34 26 26 34 26 44 L26 56 L18 56 L29 70 L40 56 L33 56 L33 44 C33 38 38 33 44 33 C50 33 55 38 55 44 L55 70 Z"/>
        </g>
      </svg>`;

    // Biển P.131a: Cấm đỗ xe (tròn đỏ nền xanh 1 vạch đỏ chéo)
    case 'p131a_cam_do_xe':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <circle cx="50" cy="50" r="46" fill="#0284C7" stroke="#DC2626" stroke-width="9"/>
        <line x1="22" y1="22" x2="78" y2="78" stroke="#DC2626" stroke-width="8" stroke-linecap="round"/>
      </svg>`;

    // Biển P.131b: Cấm đỗ xe ngày lẻ (có 1 vạch trắng)
    case 'p131b_cam_do_xe_ngay_le':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <circle cx="50" cy="50" r="46" fill="#0284C7" stroke="#DC2626" stroke-width="9"/>
        <rect x="46" y="30" width="8" height="40" fill="#FFFFFF"/>
        <line x1="22" y1="22" x2="78" y2="78" stroke="#DC2626" stroke-width="8" stroke-linecap="round"/>
      </svg>`;

    // Biển P.131c: Cấm đỗ xe ngày chẵn (có 2 vạch trắng)
    case 'p131c_cam_do_xe_ngay_chan':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <circle cx="50" cy="50" r="46" fill="#0284C7" stroke="#DC2626" stroke-width="9"/>
        <rect x="38" y="30" width="7" height="40" fill="#FFFFFF"/>
        <rect x="55" y="30" width="7" height="40" fill="#FFFFFF"/>
        <line x1="22" y1="22" x2="78" y2="78" stroke="#DC2626" stroke-width="8" stroke-linecap="round"/>
      </svg>`;

    // Biển W.203: Đường đôi (chướng ngại vật ở đỉnh trên)
    case 'w203_duong_doi':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <polygon points="50,8 92,84 8,84" fill="#FACC15" stroke="#DC2626" stroke-width="7" stroke-linejoin="round"/>
        <g fill="#1E293B">
          <path d="M46 36 L54 36 L52 46 L48 46 Z"/>
          <path d="M42 66 L42 48 L37 53 L37 45 L45 37 L47 37 L47 66 Z"/>
          <path d="M58 38 L58 56 L63 51 L63 59 L55 67 L53 67 L53 38 Z"/>
        </g>
      </svg>`;

    // Biển W.204: Hết đường đôi (chướng ngại vật ở chân dưới)
    case 'w204_het_duong_doi':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <polygon points="50,8 92,84 8,84" fill="#FACC15" stroke="#DC2626" stroke-width="7" stroke-linejoin="round"/>
        <g fill="#1E293B">
          <!-- Central island bottom -->
          <path d="M46 58 L54 58 L52 68 L48 68 Z"/>
          <!-- Arrows converging -->
          <path d="M42 40 L42 58 L37 53 L37 61 L45 69 L47 69 L47 40 Z"/>
          <path d="M58 68 L58 50 L63 55 L63 47 L55 39 L53 39 L53 68 Z"/>
        </g>
      </svg>`;

    // Biển W.207: Giao nhau với đường không ưu tiên
    case 'w207_giao_khong_uu_tien':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <polygon points="50,8 92,84 8,84" fill="#FACC15" stroke="#DC2626" stroke-width="7" stroke-linejoin="round"/>
        <g fill="#1E293B">
          <path d="M44 72 L44 42 L38 42 L50 26 L62 42 L56 42 L56 72 Z"/>
          <rect x="30" y="52" width="40" height="4"/>
        </g>
      </svg>`;

    // Biển W.208: Giao nhau với đường ưu tiên (tam giác lộn ngược)
    case 'w208_giao_uu_tien':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <polygon points="50,92 92,16 8,16" fill="#FACC15" stroke="#DC2626" stroke-width="7" stroke-linejoin="round"/>
      </svg>`;

    // Biển I.401: Bắt đầu đường ưu tiên (hình thoi vàng)
    case 'i401_bat_dau_duong_uu_tien':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <polygon points="50,10 90,50 50,90 10,50" fill="#FACC15" stroke="#FFFFFF" stroke-width="5"/>
        <polygon points="50,14 86,50 50,86 14,50" fill="#FACC15" stroke="#1E293B" stroke-width="2"/>
      </svg>`;

    // Biển W.212: Cầu hẹp (hai bên thắt lại)
    case 'w212_cau_hep':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <polygon points="50,8 92,84 8,84" fill="#FACC15" stroke="#DC2626" stroke-width="7" stroke-linejoin="round"/>
        <g fill="#1E293B">
          <!-- Left bank -->
          <path d="M35 70 L35 56 C35 50 42 46 42 38 L35 38 L35 34 L46 34 C46 44 39 48 39 56 L39 70 Z"/>
          <!-- Right bank -->
          <path d="M65 70 L65 56 C65 50 58 46 58 38 L65 38 L65 34 L54 34 C54 44 61 48 61 56 L61 70 Z"/>
        </g>
      </svg>`;

    // Biển W.213: Cầu quay - cầu cất
    case 'w213_cau_quay_cat':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <polygon points="50,8 92,84 8,84" fill="#FACC15" stroke="#DC2626" stroke-width="7" stroke-linejoin="round"/>
        <g fill="#1E293B">
          <!-- Left fixed section -->
          <rect x="25" y="58" width="16" height="5"/>
          <!-- Right opening bridge deck -->
          <line x1="42" y1="58" x2="68" y2="44" stroke="#1E293B" stroke-width="4" stroke-linecap="round"/>
          <!-- Water waves -->
          <path d="M26 68 Q34 65 42 68 T58 68 T74 68" stroke="#0284C7" stroke-width="2" fill="none"/>
        </g>
      </svg>`;

    // Biển R.403a: Đường dành cho ô tô
    case 'r403a_duong_oto':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <rect x="14" y="6" width="72" height="88" rx="4" fill="#0284C7" stroke="#0369A1" stroke-width="2"/>
        <g fill="#FFFFFF" transform="translate(18, 22) scale(0.9)">
          <path d="M12 40 L18 20 C19 16 23 14 28 14 L44 14 C49 14 53 16 54 20 L60 40 C63 40 66 43 66 48 L66 58 L6 58 L6 48 C6 43 9 40 12 40 Z"/>
          <circle cx="18" cy="52" r="4" fill="#0284C7"/>
          <circle cx="54" cy="52" r="4" fill="#0284C7"/>
        </g>
      </svg>`;

    // Biển R.404a: Hết đoạn đường dành cho ô tô
    case 'r404a_het_duong_oto':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <rect x="14" y="6" width="72" height="88" rx="4" fill="#0284C7" stroke="#0369A1" stroke-width="2"/>
        <g fill="#FFFFFF" transform="translate(18, 22) scale(0.9)">
          <path d="M12 40 L18 20 C19 16 23 14 28 14 L44 14 C49 14 53 16 54 20 L60 40 C63 40 66 43 66 48 L66 58 L6 58 L6 48 C6 43 9 40 12 40 Z"/>
          <circle cx="18" cy="52" r="4" fill="#0284C7"/>
          <circle cx="54" cy="52" r="4" fill="#0284C7"/>
        </g>
        <line x1="16" y1="8" x2="84" y2="92" stroke="#DC2626" stroke-width="7" stroke-linecap="round"/>
      </svg>`;

    // Speed limits
    case 'speed_limit_50':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke="#DC2626" stroke-width="9"/>
        <text x="50" y="61" font-family="Arial, sans-serif" font-weight="900" font-size="34" fill="#1E293B" text-anchor="middle">50</text>
      </svg>`;

    case 'speed_limit_60':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 drop-shadow-sm">
        <circle cx="50" cy="50" r="46" fill="#0284C7" stroke="#0369A1" stroke-width="2"/>
        <text x="50" y="61" font-family="Arial, sans-serif" font-weight="900" font-size="34" fill="#FFFFFF" text-anchor="middle">60</text>
      </svg>`;

    // Road markings
    case 'vach_1_1_net_dut_vang':
      return `<svg viewBox="0 0 140 70" class="w-32 h-18 rounded border border-slate-400 bg-slate-700">
        <line x1="0" y1="35" x2="140" y2="35" stroke="#FACC15" stroke-dasharray="14 10" stroke-width="4"/>
      </svg>`;

    case 'vach_1_2_net_lien_trang':
      return `<svg viewBox="0 0 140 70" class="w-32 h-18 rounded border border-slate-400 bg-slate-700">
        <line x1="0" y1="35" x2="140" y2="35" stroke="#FFFFFF" stroke-width="4"/>
      </svg>`;

    case 'vach_1_3_net_lien_doi_vang':
      return `<svg viewBox="0 0 140 70" class="w-32 h-18 rounded border border-slate-400 bg-slate-700">
        <line x1="0" y1="31" x2="140" y2="31" stroke="#FACC15" stroke-width="3"/>
        <line x1="0" y1="39" x2="140" y2="39" stroke="#FACC15" stroke-width="3"/>
      </svg>`;

    // Dashboard indicators
    case 'dashboard_brake':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 bg-slate-900 rounded-lg p-2">
        <circle cx="50" cy="50" r="26" fill="none" stroke="#DC2626" stroke-width="4"/>
        <path d="M18 36 C13 44 13 56 18 64 M82 36 C87 44 87 56 82 64" fill="none" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/>
        <text x="50" y="58" font-family="Arial, sans-serif" font-weight="900" font-size="22" fill="#DC2626" text-anchor="middle">!</text>
        <text x="50" y="86" font-family="Arial, sans-serif" font-weight="700" font-size="9" fill="#DC2626" text-anchor="middle">BRAKE</text>
      </svg>`;

    case 'dashboard_oil':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 bg-slate-900 rounded-lg p-2">
        <g fill="#DC2626">
          <path d="M25 55 L34 42 L64 42 L72 55 L72 64 L25 64 Z"/>
          <path d="M72 46 L82 38 L82 44 L74 52 Z"/>
          <circle cx="86" cy="54" r="3"/>
          <path d="M30 42 L30 32 L38 32" stroke="#DC2626" stroke-width="3" fill="none"/>
        </g>
        <text x="50" y="84" font-family="Arial, sans-serif" font-weight="600" font-size="9" fill="#DC2626" text-anchor="middle">ÁP SUẤT DẦU</text>
      </svg>`;

    case 'dashboard_temp':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 bg-slate-900 rounded-lg p-2">
        <g fill="#DC2626" stroke="#DC2626">
          <rect x="46" y="24" width="8" height="32" rx="4"/>
          <circle cx="50" cy="62" r="12"/>
          <line x1="58" y1="30" x2="68" y2="30" stroke-width="3"/>
          <line x1="58" y1="40" x2="65" y2="40" stroke-width="3"/>
          <line x1="58" y1="50" x2="68" y2="50" stroke-width="3"/>
        </g>
        <text x="50" y="88" font-family="Arial, sans-serif" font-weight="600" font-size="9" fill="#DC2626" text-anchor="middle">NHIỆT ĐỘ NƯỚC</text>
      </svg>`;

    case 'dashboard_seatbelt':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 bg-slate-900 rounded-lg p-2">
        <circle cx="50" cy="34" r="9" fill="#DC2626"/>
        <path d="M36 74 C36 56 43 48 50 48 C57 48 64 56 64 74 Z" fill="#DC2626"/>
        <line x1="35" y1="45" x2="65" y2="72" stroke="#0F172A" stroke-width="4"/>
        <line x1="35" y1="45" x2="65" y2="72" stroke="#DC2626" stroke-width="1.5"/>
        <text x="50" y="90" font-family="Arial, sans-serif" font-weight="600" font-size="8" fill="#DC2626" text-anchor="middle">DÂY AN TOÀN</text>
      </svg>`;

    case 'dashboard_abs':
      return `<svg viewBox="0 0 100 100" class="w-24 h-24 bg-slate-900 rounded-lg p-2">
        <circle cx="50" cy="50" r="26" fill="none" stroke="#F59E0B" stroke-width="3.5"/>
        <path d="M18 36 C13 44 13 56 18 64 M82 36 C87 44 87 56 82 64" fill="none" stroke="#F59E0B" stroke-width="3.5" stroke-linecap="round"/>
        <text x="50" y="56" font-family="Arial, sans-serif" font-weight="900" font-size="16" fill="#F59E0B" text-anchor="middle">ABS</text>
      </svg>`;

    default:
      return `<div class="p-2 text-center text-slate-400 text-xs">${label || 'Biển báo'}</div>`;
  }
}

// Generate Sa hình / Road Scenario SVG Diagram
export function getScenarioSvg(scenarioKey: string): string {
  switch (scenarioKey) {
    case 'sahinh_uu_tien_cuu_hoa':
      return `<svg viewBox="0 0 340 220" class="w-full h-auto bg-slate-800 rounded-xl overflow-hidden shadow-xs">
        <rect width="340" height="220" fill="#334155"/>
        <rect x="0" y="0" width="115" height="70" fill="#15803D"/>
        <rect x="225" y="0" width="115" height="70" fill="#15803D"/>
        <rect x="0" y="150" width="115" height="70" fill="#15803D"/>
        <rect x="225" y="150" width="115" height="70" fill="#15803D"/>
        <line x1="170" y1="0" x2="170" y2="70" stroke="#FACC15" stroke-dasharray="8 6" stroke-width="3"/>
        <line x1="170" y1="150" x2="170" y2="220" stroke="#FACC15" stroke-dasharray="8 6" stroke-width="3"/>
        <line x1="0" y1="110" x2="115" y2="110" stroke="#FACC15" stroke-dasharray="8 6" stroke-width="3"/>
        <line x1="225" y1="110" x2="340" y2="110" stroke="#FACC15" stroke-dasharray="8 6" stroke-width="3"/>
        <!-- Right side: Xe Chữa Cháy -->
        <g transform="translate(240, 85)">
          <rect width="65" height="26" rx="4" fill="#DC2626" stroke="#FEE2E2" stroke-width="1.5"/>
          <text x="32" y="17" fill="#FFFFFF" font-size="10" font-weight="bold" text-anchor="middle">CỨU HỎA</text>
          <path d="M-8 13 L-22 13 M-16 7 L-23 13 L-16 19" stroke="#EF4444" stroke-width="3" fill="none"/>
        </g>
        <!-- Bottom side: Xe Cứu Thương / Công An -->
        <g transform="translate(140, 165)">
          <rect width="28" height="42" rx="4" fill="#1E40AF" stroke="#DBEAFE" stroke-width="1.5"/>
          <text x="14" y="26" fill="#FFFFFF" font-size="8" font-weight="bold" text-anchor="middle">C.AN</text>
          <path d="M14 -6 L14 -22 M8 -16 L14 -23 L20 -16" stroke="#3B82F6" stroke-width="3" fill="none"/>
        </g>
        <!-- Left: Xe con -->
        <g transform="translate(30, 115)">
          <rect width="42" height="22" rx="3" fill="#2563EB"/>
          <text x="21" y="15" fill="#FFFFFF" font-size="9" text-anchor="middle">Xe con</text>
        </g>
        <rect x="10" y="10" width="170" height="24" rx="4" fill="#0F172A" opacity="0.9"/>
        <text x="95" y="26" fill="#F8FAFC" font-size="10" font-weight="600" text-anchor="middle">Thứ tự ưu tiên: Hỏa - Sự - An - Thương</text>
      </svg>`;

    case 'sahinh_nga_tu_vong_xuyen':
      return `<svg viewBox="0 0 340 220" class="w-full h-auto bg-slate-800 rounded-xl overflow-hidden shadow-xs">
        <rect width="340" height="220" fill="#334155"/>
        <circle cx="170" cy="110" r="46" fill="#16A34A" stroke="#FFFFFF" stroke-width="3"/>
        <circle cx="170" cy="110" r="18" fill="#22C55E"/>
        <path d="M170 52 A58 58 0 1 1 169 52" fill="none" stroke="#FEF08A" stroke-width="3" stroke-dasharray="16 10"/>
        <!-- Xe tải in roundabout -->
        <g transform="translate(150, 75)">
          <rect width="38" height="22" rx="3" fill="#F97316"/>
          <text x="19" y="15" fill="#FFFFFF" font-size="9" font-weight="bold" text-anchor="middle">Xe tải</text>
        </g>
        <!-- Xe con approaching outside -->
        <g transform="translate(245, 140)">
          <rect width="36" height="20" rx="3" fill="#3B82F6"/>
          <text x="18" y="14" fill="#FFFFFF" font-size="9" font-weight="bold" text-anchor="middle">Xe con</text>
        </g>
        <rect x="10" y="185" width="230" height="26" rx="4" fill="#0F172A" opacity="0.9"/>
        <text x="125" y="202" fill="#E2E8F0" font-size="10" text-anchor="middle">Có biển vòng xuyến: Nhường xe bên trái</text>
      </svg>`;

    case 'sahinh_xe_re_phai_thang_trai':
      return `<svg viewBox="0 0 340 220" class="w-full h-auto bg-slate-800 rounded-xl overflow-hidden shadow-xs">
        <rect width="340" height="220" fill="#334155"/>
        <rect x="0" y="0" width="105" height="70" fill="#15803D"/>
        <rect x="235" y="0" width="105" height="70" fill="#15803D"/>
        <rect x="0" y="150" width="105" height="70" fill="#15803D"/>
        <rect x="235" y="150" width="105" height="70" fill="#15803D"/>
        <g transform="translate(195, 20)">
          <rect width="26" height="42" rx="3" fill="#EA580C"/>
          <text x="13" y="24" fill="#FFFFFF" font-size="8" font-weight="bold" text-anchor="middle">TẢI</text>
          <path d="M13 46 L13 85" stroke="#F97316" stroke-width="3" stroke-dasharray="4 2"/>
        </g>
        <g transform="translate(260, 115)">
          <rect width="34" height="20" rx="2" fill="#DC2626"/>
          <text x="17" y="14" fill="#FFFFFF" font-size="8" font-weight="bold" text-anchor="middle">MÔ TÔ</text>
          <path d="M-6 10 Q-24 10 -24 35" stroke="#EF4444" stroke-width="3" fill="none"/>
        </g>
        <g transform="translate(45, 85)">
          <rect width="42" height="22" rx="3" fill="#2563EB"/>
          <text x="21" y="15" fill="#FFFFFF" font-size="8" font-weight="bold" text-anchor="middle">XE CON</text>
          <path d="M46 11 Q110 11 110 -25" stroke="#3B82F6" stroke-width="3" fill="none"/>
        </g>
        <rect x="10" y="185" width="310" height="26" rx="4" fill="#0F172A" opacity="0.9"/>
        <text x="165" y="202" fill="#E2E8F0" font-size="10" text-anchor="middle">Quy tắc cùng cấp: Rẽ phải đi trước → Đi thẳng → Rẽ trái</text>
      </svg>`;

    default:
      return `<svg viewBox="0 0 200 120" class="w-full h-auto bg-slate-100 rounded-lg">
        <text x="100" y="60" text-anchor="middle" fill="#64748B" font-size="12">Sơ đồ tình huống sát hạch</text>
      </svg>`;
  }
}
