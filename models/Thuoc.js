var keystone = require('keystone');
var Types = keystone.Field.Types;


// Đợt phê duyệt
// Số thứ tự phê duyệt
// Ngày phê duyệt
// Hình ảnh sản phẩm bao bì
// Tên thuốc
// Phân loại nhóm  thuốc
// Hoạt chất
// Nồng độ/Hàm lượng
// Tá dược
// Mã ATC
// Dạng bào chế
//
//
// Quy cách đóng gói
// Tuổi thọ
// Tiêu chuẩn chất lượng
// Công ty Sản xuất
// Địa chỉ SX
// Nước SX
// Hướng dẫn sử dụng thuốc
// Hướng dẫn sử dụng thuốc cho bệnh nhân
// File_huong_dan_su_dung


var Thuoc = new keystone.List('Thuoc', {
	schema: {
		collection: 'thuoc',
	},
	label: 'Thuốc',
	path: 'thuoc',
	singular: 'Thuốc',
	plural: 'Thuốc',
	track: true,
	map: { name: 'tenThuoc' }
});

var s3storage = new keystone.Storage({
	adapter: require('keystone-storage-adapter-s3'),
	s3: {
		headers: {
			'x-amz-acl': 'public-read', // files should be publicly accessible
		},
		// other options set in .env
	},
	schema: {
		originalname: true,
		bucket: true,
		etag: true,
		path: true,
		url: true,
	},
});

Thuoc.add('Thông tin Chung', {
	tenThuoc: { type: String, label: 'Tên Thuốc', required: true, initial: true, note: 'Theo Tờ Hướng dẫn sử dụng. Tên thuốc không được giống nhau nếu thuốc có thành phần hoạt chất khác nhau.' },
	hinhAnh: { type: Types.TextArray, label: 'Hình ảnh sản phẩm bao bì', note: 'Theo Tờ nhãn đăng ký thuốc' },
	soDangKy: { type: String, required: true, initial: true, label: 'Số đăng ký', note: 'Trong nước: VD - Số được cấp - năm (2 số cuối) (e.g: VD-11971-10) Nhập khẩu: VN – Số được cấp – năm (2 số cuối) (e.g: VN-20532-17) Dược liệu: Vsố được cấp – H số - năm (2 số cuối) (e.g: V46-H12-16) Gia công: GC – Số được cấp – năm (2 số cuối) (e.g: GC-243-16) Ung thư, virus, tránh thai: QLĐB – số được cấp – năm (2 số cuối) (e.g: QLĐB-531-16) '},
	tinhTrang: { type: Types.Select, label: 'Tình Trạng Lưu Hành', options: [{ value: 201, label: 'Đang lưu hành' }, { value: 403, label: 'Bị đình chỉ' }, { value: 504, label: 'Ngừng Lưu Hành' }]},
	phanLoai: { type: Types.Select, label: 'Phân loại nhóm  thuốc', options: [{ value: 2, label: 'Thuốc không kê đơn'}, { value: 1, label: 'Thuốc kê đơn'}]}
});

Thuoc.add('Thông tin Phê Duyệt', {
	dotPheDuyet: { type: String, label: 'Đợt phê duyệt' },
	soPheDuyet: {type: String, label: 'Số thứ tự phê duyệt'},
	ngayPheDuyet: {type: Types.Date, label: 'Ngày phê duyệt' }
});

Thuoc.add('Hướng dẫn sử dụng', {
	fileHuongDan: { type: Types.File, label: 'File Hướng dẫn sử dụng thuốc', storage: s3storage },
	fileHuongDanAlt: { type: Types.File, label: 'File Hướng dẫn sử dụng thuốc cho bệnh nhân', storage: s3storage },
	huongDan: {  type: Types.Html, wysiwyg: true, label: 'Hướng dẫn sử dụng thuốc' },
	huongDanAlt: {  type: Types.Html, wysiwyg: true, label: 'Hướng dẫn sử dụng thuốc cho bệnh nhân' }
});

Thuoc.add('Thành Phần', {
	hoatChat: { type: Types.TextArray, label: 'Hoạt Chất', note: 'Là phần Công thức hoặc Thành phần' },
	hamLuong: { type: Types.TextArray, label: 'Nồng Độ / Hàm Lượng', note: 'Là số và đơn vị định lượng đi kèm tên hoạt chất' },
	taDuoc: { type: String, label: 'Tá dược', note: 'Phần Tá dược hoặc nội dung nhiều chất hóa học chữ nghiêng hoặc trong ngoặc dưới phần Hoạt chất' },
	maAtc: { type: String, label: 'Mã ATC', note: 'Là mã chuẩn quốc tế giúp phân loại nhóm thuốc'},
	dangBaoChe: { type: String, label: 'Dạng bào chế', note: 'Phần Dạng bào chế hoặc được ghi cạnh tên thuốc, hoặc được ghi dưới tên thuốc.'}
});

Thuoc.add('Khác', {
	dongGoi: { type: String, label: 'Quy cách đóng gói'},
	tuoiTho: { type: String, label: 'Tuổi thọ'},
	tieuChuan: { type: String, label: 'Tiêu chuẩn chất lượng'}
});

Thuoc.add('Công ty Sản xuất', {
	ctySx: { type: Types.Relationship, ref: 'doanhNghiep', many: false, createInline: true },
});
Thuoc.defaultColumns = 'tenThuoc, soDangKy, hoatChat, hamLuong';
Thuoc.register();
