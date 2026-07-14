// db.js - SmartRent Database v9 (Strict Relational DBML Architecture)
const DB_KEY = 'smartrent_db_v9';

// 1. KHỞI TẠO CSDL THEO SCHEMA THỰC THỂ KHÁCH HÀNG & PHÒNG CHUẨN
function initDB() {
    let raw = localStorage.getItem(DB_KEY);
    let db = null;
    try {
        db = JSON.parse(raw);
    } catch(e) {
        db = null;
    }

    if (!db || typeof db !== 'object' || !db.khachHang) {
        const defaultData = {
            project: "SmartRentSystem",
            // Tài khoản Chủ Trọ (Đại diện quản lý toàn bộ hệ thống)
            chuTro: [
                {
                    MaChuTro: "chutro1",
                    TenChuTro: "Nguyễn Văn An",
                    SoDienThoai: "0901234567",
                    Email: "an@smartrent.com",
                    TenDangNhap: "chutro1",
                    MatKhau: "chutro1"
                }
            ],
            // Table KhachHang
            khachHang: [
                {
                    MaKhachHang: "khach1",
                    TenKhachHang: "Nguyễn Văn Hoành",
                    SoDienThoai: "0987654321",
                    Email: "hoanh@gmail.com",
                    TenDangNhap: "khach1",
                    MatKhau: "khach1"
                },
                {
                    MaKhachHang: "khach2",
                    TenKhachHang: "Trần Thị Mai",
                    SoDienThoai: "0912345678",
                    Email: "mai@gmail.com",
                    TenDangNhap: "khach2",
                    MatKhau: "khach2"
                }
            ],
            // Table DanhMuc
            danhMuc: [
                { MaDanhMuc: 1, TenDanhMuc: "Phòng Master", MoTa: "Phòng ngủ lớn tiện nghi khép kín cao cấp" },
                { MaDanhMuc: 2, TenDanhMuc: "Căn hộ Studio", MoTa: "Căn hộ mini thiết kế tối giản thông minh" },
                { MaDanhMuc: 3, TenDanhMuc: "Căn hộ Mini", MoTa: "Không gian tối ưu có gác lửng" },
                { MaDanhMuc: 4, TenDanhMuc: "Phòng Gác lửng", MoTa: "Phòng trọ gác đúc sạch sẽ tiện lợi" }
            ],
            // Table Phong
            phong: [
                {
                    MaPhong: "P101",
                    MaDanhMuc: 1,
                    TenPhong: "Phòng 101 Master",
                    ToaNha: "Tòa nhà Hoàng Diệu",
                    DiaChi: "Số 45 Đường Hoàng Diệu 2, Linh Trung, Thủ Đức, TP.HCM",
                    KhuVuc: "Thủ Đức",
                    GiaThue: 3500000,
                    DienTich: 35.0,
                    SoNguoiToiDa: 2,
                    TinhTrangNoiThat: "Đầy đủ nội thất",
                    TrangThai: "Đang thuê",
                    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500"
                },
                {
                    MaPhong: "P102",
                    MaDanhMuc: 2,
                    TenPhong: "Phòng 102 Studio",
                    ToaNha: "Tòa nhà Xa Lộ",
                    DiaChi: "120 Xa Lộ Hà Nội, Thảo Điền, Quận 2, TP.HCM",
                    KhuVuc: "Quận 2",
                    GiaThue: 4200000,
                    DienTich: 28.0,
                    SoNguoiToiDa: 1,
                    TinhTrangNoiThat: "Nội thất cơ bản",
                    TrangThai: "Đang thuê",
                    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500"
                },
                {
                    MaPhong: "P103",
                    MaDanhMuc: 3,
                    TenPhong: "Căn hộ Mini Q9",
                    ToaNha: "Chung cư mini Đường 8",
                    DiaChi: "Số 12 Đường 8, Tăng Nhơn Phú A, Quận 9, TP.HCM",
                    KhuVuc: "Quận 9",
                    GiaThue: 2500000,
                    DienTich: 22.0,
                    SoNguoiToiDa: 2,
                    TinhTrangNoiThat: "Có gác lửng",
                    TrangThai: "Trống",
                    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500"
                },
                {
                    MaPhong: "P104",
                    MaDanhMuc: 4,
                    TenPhong: "Phòng Gác lửng Thủ Đức",
                    ToaNha: "Nhà trọ Lê Văn Chí",
                    DiaChi: "Số 89 Đường Lê Văn Chí, Linh Trung, Thủ Đức, TP.HCM",
                    KhuVuc: "Thủ Đức",
                    GiaThue: 3000000,
                    DienTich: 25.0,
                    SoNguoiToiDa: 3,
                    TinhTrangNoiThat: "Trống",
                    TrangThai: "Trống",
                    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500"
                }
            ],
            // Table GiamGia
            giamGia: [
                { MaGiamGia: "KM10", TenGiamGia: "Khuyến mãi chào mừng", SoTienGiam: 200000 },
                { MaGiamGia: "NONE", TenGiamGia: "Không áp dụng", SoTienGiam: 0 }
            ],
            // Table HopDong
            hopDong: [
                {
                    MaHopDong: "HD101",
                    MaKhachHang: "khach1",
                    MaPhong: "P101",
                    MaGiamGia: "NONE",
                    NgayTaoHopDong: "2026-01-01T00:00:00",
                    NgayBatDau: "2026-01-01T00:00:00",
                    ThoiHanThue: 12,
                    TienCoc: 5000000,
                    PhiDichVu: 150000,
                    TongTien: 3650000, // GiaThue + PhiDichVu - SoTienGiam
                    TrangThaiThanhToan: "Đã cọc",
                    TrangThaiHopDong: "Đang hiệu lực",
                    GhiChu: "Hợp đồng ký kết trực tuyến"
                },
                {
                    MaHopDong: "HD102",
                    MaKhachHang: "khach2",
                    MaPhong: "P102",
                    MaGiamGia: "NONE",
                    NgayTaoHopDong: "2026-03-15T00:00:00",
                    NgayBatDau: "2026-03-15T00:00:00",
                    ThoiHanThue: 6,
                    TienCoc: 4200000,
                    PhiDichVu: 200000,
                    TongTien: 4400000,
                    TrangThaiThanhToan: "Đã cọc",
                    TrangThaiHopDong: "Đang hiệu lực",
                    GhiChu: "Hợp đồng Studio 102"
                }
            ],
            // Table HoaDon
            hoaDon: [
                { MaHoaDon: "HDON1", MaHopDong: "HD101", NgayLap: "05/2026", TongTien: 4130000, TrangThai: "Đã thanh toán", paidAt: "04/05/2026" },
                { MaHoaDon: "HDON2", MaHopDong: "HD101", NgayLap: "06/2026", TongTien: 4160000, TrangThai: "Đã thanh toán", paidAt: "03/06/2026" },
                { MaHoaDon: "HDON3", MaHopDong: "HD101", NgayLap: "07/2026", TongTien: 4220000, TrangThai: "Đã thanh toán", paidAt: "04/07/2026" },
                { MaHoaDon: "HDON4", MaHopDong: "HD101", NgayLap: "08/2026", TongTien: 4240000, TrangThai: "Chưa thanh toán", paidAt: "-" },
                { MaHoaDon: "HDON5", MaHopDong: "HD102", NgayLap: "06/2026", TongTien: 5120000, TrangThai: "Đã thanh toán", paidAt: "18/06/2026" },
                { MaHoaDon: "HDON6", MaHopDong: "HD102", NgayLap: "07/2026", TongTien: 5200000, TrangThai: "Chưa thanh toán", paidAt: "-" }
            ],
            // Table ThanhToan
            thanhToan: [
                { MaThanhToan: "TT1", MaHoaDon: "HDON1", PhuongThuc: "VNPAY", NgayThanhToan: "2026-05-04T10:30:00", SoTien: 4130000 },
                { MaThanhToan: "TT2", MaHoaDon: "HDON2", PhuongThuc: "VNPAY", NgayThanhToan: "2026-06-03T11:15:00", SoTien: 4160000 },
                { MaThanhToan: "TT3", MaHoaDon: "HDON3", PhuongThuc: "VNPAY", NgayThanhToan: "2026-07-04T09:00:00", SoTien: 4220000 },
                { MaThanhToan: "TT5", MaHoaDon: "HDON5", PhuongThuc: "Chuyển khoản", NgayThanhToan: "2026-06-18T14:20:00", SoTien: 5120000 }
            ],
            // Table DichVu
            dichVu: [
                { MaDichVu: "DV_DIEN", TenDichVu: "Điện", Gia: 3500 },
                { MaDichVu: "DV_NUOC", TenDichVu: "Nước", Gia: 15000 },
                { MaDichVu: "DV_NET", TenDichVu: "Internet", Gia: 100000 },
                { MaDichVu: "DV_RAC", TenDichVu: "Rác & Vệ sinh", Gia: 50000 }
            ],
            // Table ChiTietDichVu
            chiTietDichVu: [
                { MaHopDong: "HD101", MaDichVu: "DV_DIEN", SoLuong: 111 },
                { MaHopDong: "HD101", MaDichVu: "DV_NUOC", SoLuong: 6 },
                { MaHopDong: "HD101", MaDichVu: "DV_NET", SoLuong: 1 },
                { MaHopDong: "HD101", MaDichVu: "DV_RAC", SoLuong: 1 },
                { MaHopDong: "HD102", MaDichVu: "DV_DIEN", SoLuong: 147 },
                { MaHopDong: "HD102", MaDichVu: "DV_NUOC", SoLuong: 7 },
                { MaHopDong: "HD102", MaDichVu: "DV_NET", SoLuong: 1 },
                { MaHopDong: "HD102", MaDichVu: "DV_RAC", SoLuong: 1 }
            ],
            // Thực thể phụ để bổ trợ tính năng (Sự cố & Thông báo)
            tickets: [
                { id: "t1", MaPhong: "P101", category: "Nước", description: "Rò rỉ vòi sen trong nhà tắm và bồn rửa bị chảy nước, cần sửa gấp.", date: "2026-07-10", status: "pending" },
                { id: "t2", MaPhong: "P102", category: "Điện", description: "Hỏng ổ cắm sạc tủ lạnh trong góc bếp, ổ cắm bị cháy đen.", date: "2026-07-08", status: "processing" }
            ],
            notifications: [
                {
                    id: "n0",
                    MaKhachHang: "khach1",
                    type: "contract",
                    title: "Chào mừng đến với SmartRent OS!",
                    message: "Hệ thống quản lý phòng trọ thông minh. Bạn đang đăng nhập bằng tài khoản Nguyễn Văn Hoành.",
                    date: "2026-01-01",
                    read: false
                }
            ],
            currentUser: null
        };
        localStorage.setItem(DB_KEY, JSON.stringify(defaultData));
    } else {
        // Migration kiểm tra tính nguyên vẹn dữ liệu
        let needsSave = false;
        if (!db.khachHang) { db.khachHang = []; needsSave = true; }
        if (!db.danhMuc) { db.danhMuc = []; needsSave = true; }
        if (!db.phong) { db.phong = []; needsSave = true; }
        if (!db.giamGia) { db.giamGia = []; needsSave = true; }
        if (!db.hopDong) { db.hopDong = []; needsSave = true; }
        if (!db.hoaDon) { db.hoaDon = []; needsSave = true; }
        if (!db.thanhToan) { db.thanhToan = []; needsSave = true; }
        if (!db.dichVu) { db.dichVu = []; needsSave = true; }
        if (!db.chiTietDichVu) { db.chiTietDichVu = []; needsSave = true; }
        if (!db.tickets) { db.tickets = []; needsSave = true; }
        if (!db.notifications) { db.notifications = []; needsSave = true; }
        if (needsSave) localStorage.setItem(DB_KEY, JSON.stringify(db));
    }
}

// 2. CÁC HÀM CRUD & UTILS CƠ BẢN
function getData() { return JSON.parse(localStorage.getItem(DB_KEY)); }
function saveData(data) { localStorage.setItem(DB_KEY, JSON.stringify(data)); }

function redirectWithTransition(url) {
    document.body.classList.add('page-exit');
    setTimeout(() => {
        window.location.href = url;
    }, 400);
}

function loginUser(username, password, role) {
    let db = getData();
    if (role === 'landlord') {
        let user = db.chuTro.find(u => u.TenDangNhap === username && u.MatKhau === password);
        if (user) {
            db.currentUser = { role: 'landlord', id: user.MaChuTro, name: user.TenChuTro, phone: user.SoDienThoai, email: user.Email };
            saveData(db);
            redirectWithTransition('landlord.html');
            return { success: true };
        }
    } else {
        let user = db.khachHang.find(u => u.TenDangNhap === username && u.MatKhau === password);
        if (user) {
            db.currentUser = { role: 'tenant', id: user.MaKhachHang, name: user.TenKhachHang, phone: user.SoDienThoai, email: user.Email };
            saveData(db);
            redirectWithTransition('tenant.html');
            return { success: true };
        }
    }
    return { success: false, message: 'Tên đăng nhập hoặc mật khẩu không chính xác!' };
}

function registerUser(name, phone, email, username, password, role) {
    let db = getData();
    
    // Check trùng tên đăng nhập
    let isDuplicate = false;
    if (role === 'landlord') {
        isDuplicate = db.chuTro.some(u => u.TenDangNhap === username);
    } else {
        isDuplicate = db.khachHang.some(u => u.TenDangNhap === username);
    }
    
    if (isDuplicate) {
        return { success: false, message: 'Tên đăng nhập này đã tồn tại trên hệ thống!' };
    }

    let newId = 'user_' + Date.now();
    if (role === 'landlord') {
        db.chuTro.push({
            MaChuTro: newId,
            TenChuTro: name,
            SoDienThoai: phone,
            Email: email,
            TenDangNhap: username,
            MatKhau: password
        });
    } else {
        db.khachHang.push({
            MaKhachHang: newId,
            TenKhachHang: name,
            SoDienThoai: phone,
            Email: email,
            TenDangNhap: username,
            MatKhau: password
        });
    }
    
    saveData(db);
    return { success: true, message: 'Đăng ký tài khoản thành công!' };
}

function logout() {
    let db = getData();
    db.currentUser = null;
    saveData(db);
    redirectWithTransition('index.html');
}

function checkAuth(requiredRole) {
    let db = getData();
    if (!db || !db.currentUser || db.currentUser.role !== requiredRole) {
        window.location.href = 'index.html';
    }
}

function resetDB() {
    localStorage.removeItem(DB_KEY);
    initDB();
    alert('CSDL đã được đặt lại thành công!');
    window.location.reload();
}

// Khởi chạy tự động
initDB();