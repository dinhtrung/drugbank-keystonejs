var keystone = require('keystone');
var Types = keystone.Field.Types;

var Thuoc = new keystone.List('Thuoc', {
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
	hinhAnh: { type: Types.CloudinaryImage, label: 'Hình Ảnh Sản Phẩm', note: 'Theo Tờ nhãn đăng ký thuốc' },
	soDangKy: { type: String, required: true, initial: true, label: 'Số đăng ký', note: 'Trong nước: VD – Số được cấp – năm (2 số cuối) (e.g: VD-11971-10) Nhập khẩu: VN – Số được cấp – năm (2 số cuối) (e.g: VN-20532-17) Dược liệu: Vsố được cấp – H số - năm (2 số cuối) (e.g: V46-H12-16) Gia công: GC – Số được cấp – năm (2 số cuối) (e.g: GC-243-16) Ung thư, virus, tránh thai: QLĐB – số được cấp – năm (2 số cuối) (e.g: QLĐB-531-16) '},
	tinhTrang: { type: Types.Select, label: 'Tình Trạng Lưu Hành', options: [{ value: 201, label: 'Đang lưu hành' }, { value: 403, label: 'Bị đình chỉ' }, { value: 504, label: 'Ngừng Lưu Hành' }]},
	fileHuongDan: { type: Types.File, label: 'File Hướng Dẫn Sử Dụng Gốc', storage: s3storage },
	huongDan: {  type: Types.Html, wysiwyg: true, label: 'Hướng Dẫn Sử Dụng' }
});

Thuoc.add('Hướng dẫn sử dụng', {
	tpHoatChatChinh:  { type: Types.TextArray, label: 'Thành Phần', note: 'Hoạt / Dược chất', required: true, initial: true, note: 'Là phần Công thức hoặc Thành phần bao gồm' },
	tpTaDuoc:  { type: Types.TextArray, label: 'Thành Phần', note: 'Hoạt chất, dược chất, tá dược' },
	dbcDangBaoChe: { type: String, label: 'Dạng Bào Chế', note: 'Phần Dạng bào chế hoặc được ghi cạnh tên thuốc, hoặc được ghi dưới tên thuốc.'},
	dbcMoTa: { type: Types.Textarea, label: 'Mô Tả Dạng Bào Chế', note: 'mô tả đặc điểm bên ngoài của thuốc về màu sắc, kích thước, thể chất, hình dạng hoặc dấu hiệu bên ngoài của thuốc'},
});

Thuoc.add('Đặc tính lâm sàng', {
	dtlsChiDinh: { type: Types.Textarea, label: 'Chỉ Định', note: 'Phần Chỉ định hoặc Nên dùng thuốc này cho bệnh gì? ' },
	dtlsChongChiDinh: { type: Types.Textarea, label: 'Chống chỉ định', note: 'Phần Chống chỉ định hoặc Khi nào không nên dùng thuốc này?' },
	dtlsLieuDung: { type: Types.Html, wysiwyg: true, label: 'Liều Dùng - Cách Dùng', note: 'Phần Liều dùng/ Liều lượng và cách dung/ Hướng dẫn dùng và thao tác' },
	dtlsThanTrong: { type: Types.Html, wysiwyg: true, label: 'Thận Trọng', note: 'Phần Thận trọng hoặc Những điều cần thận trọng khi dùng thuốc này' },
	dtlsPhuNuMangThai: { type: Types.Textarea, label: 'Phụ nữ mang thai và cho con bú', note: 'Phần Phụ nữ mang thai và cho con bú ' },
	dtlsVanHanhTauXe: { type: Types.Textarea, label: 'Tác động của thuốc đối với người vận hành tàu xe, máy móc', note: 'Phần Sử dụng cho người lái xe và vận hành máy móc' },
	dtlsTuongTacThuoc: { type: Types.Html, wysiwyg: true, label: 'Tương tác thuốc', note: 'Phần Tương tác/Tương kỵ với các thuốc khác hoặc Nên tránh những dùng những thuốc hoặc thực phẩm gì khi đang sử dụng thuốc này?' },
	dtlsTacDungPhu: { type: Types.Html, wysiwyg: true, label: 'Tác dụng không mong muốn', note: 'Phần Tác dụng không mong muốn hoặc Tác dụng phụ hoặc phản ứng ngoại ý Hoặc Phản ứng bất lợi' },
	dtlsQuaLieu: { type: Types.Html, wysiwyg: true, label: 'Quá liều – Xử trí', note: 'Phần Quá liều và Xử trí hoặc Những dấu hiệu và triệu chứng khi dùng thuốc quá liều + Cần phải làm gì khi dùng thuốc quá liều khuyến cáo' }
});

Thuoc.add('Đặc điểm Dược lý- Dược lâm sàng', {
	dlsAtc: { type: String, label: 'Mã ATC', note: 'Là mã chuẩn quốc tế giúp phân loại nhóm thuốc'},
	dlsNhomThuoc: { type: String, label: 'Nhóm thuốc', note: 'Phần Dươc lí/Dược động học Sau chữ nhóm thuốc dược lý/ Nhóm thuốc điều trị,… '},
	dlsDuocLucHoc: { type: Types.Html, wysiwyg: true, label: 'Dược lực học', note: 'Phần Dược lực học Hoặc cơ chế tác dụng '},
	dlsDuocDongHoc: { type: Types.Html, wysiwyg: true, label: 'Dược động học', note: 'Phần Dược động học'},
	dlsTienLamSang: { label: 'Dữ liệu thử nghiệm tiền lâm sàng', type: Types.Html, wysiwyg: true, note: 'Phần an toàn tiền lâm sàng/cận lâm sang'},
	dlsNghienCuuLamSang: { label: 'Dữ liệu thử nghiệm lâm sàng', type: Types.Html, wysiwyg: true, note: 'Phần nghiên cứu lâm sàng Hoặc Phần thử nghiệm lâm sàng '},
	dlsDuocDongHoc: { type: Types.Html, wysiwyg: true, label: 'Lưu ý – Khuyến cáo', note: 'Phần Lưu ý hoặc Khuyến cáo. Khuyến cáo theo phân loại thuốc sẽ có yêu cầu về định dạng. Tham khảo chi tiết tại Thông tư 01/2018/BYT '}
});

Thuoc.defaultColumns = 'tenThuoc, soDangKy, tinhTrang';
Thuoc.register();
