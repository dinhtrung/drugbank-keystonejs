var tr = require('transliteration');
var keystone = require('keystone');
var Types = keystone.Field.Types;

// db.doanhnghiep.findOne()
// {
// 	"_id" : ObjectId("5c6f9efb1bcaf136427de47d"),
// 	"variant_titles" : [
// 		"công ty cổ phần dược phẩm cửu long.",
// 		"công ty cổ phần dược phẩm cửu llong."
// 	],
// 	"_type" : "doanhnghiep",
// 	"display_name" : "Dược phẩm Cửu Long.",
// 	"title" : "Công ty cổ phần dược phẩm Cửu Long.",
// 	"title_wo_accent" : "Cong ty co phan duoc pham Cuu Long.",
// 	"alt_titles" : [ ],
// 	"pub_status" : "L",
// 	"searchable_address" : [
// 		"Nhà máy Vicancap:  Số 21 B, đường Phan Đình Phùng, Tp. Vĩnh Long, tỉnh Vĩnh Long",
// 		"Nha may Vicancap:  So 21 B, duong Phan inh Phung, Tp. Vinh Long, tinh Vinh Long"
// 	],
// 	"dia_chi" : "Nhà máy Vicancap:  Số 21 B, đường Phan Đình Phùng, Tp. Vĩnh Long, tỉnh Vĩnh Long",
// 	"boost" : 2,
// 	"id" : "VNC00120A"
// }


var doanhNghiep = new keystone.List('doanhNghiep', {
	schema: { collection: 'doanhnghiep' },
	label: 'Doanh Nghiệp',
	path: 'doanhnghiep',
	singular: 'Doanh Nghiệp',
	plural: 'Doanh Nghiệp',
	track: true,
	map: { name: 'display_name' }
});

doanhNghiep.add('Thông tin trên Chứng chỉ Hành nghề', {
	display_name: { type: String, label: 'Tên doanh nghiệp', required: true, initial: true, note: 'Theo Đăng ký Kinh doanh' },
	hinhAnh: { type: Types.CloudinaryImage, label: 'Hình Ảnh', note: 'Theo Đăng ký Kinh doanh' },
	maSo: { type: String, label: 'Tên viết tắt', note: 'Theo Đăng ký Kinh doanh' }, // required: true, initial: true,
	mst: { type: String, label: 'Mã Số Thuế', note: 'Theo Đăng Ký kinh doanh' },
	dienThoai: { type: String, label: 'Điện thoại', note: 'Theo Đăng Ký kinh doanh' },
	daiDienPhapLuat: { type: String, label: 'Đại diện pháp luật', note: 'Theo Đăng ký kinh doanh'},
	// From the net
	title:  { type: String, label: 'Tên doanh nghiệp', note: 'Theo Đăng ký Kinh doanh', hidden: true },
	title_wo_accent:  { type: String, label: 'Tên doanh nghiệp', note: 'Theo Đăng ký Kinh doanh', hidden: true },
	alt_titles: { type: Types.TextArray, label: 'Tên khác'},
	truSo: { type: Types.Location, label: 'Trụ sở chính', note: 'Theo Đăng Ký kinh doanh' },
	dia_chi: { type: String, label: 'Địa chỉ', note: 'Địa chỉ ghi trên tờ Hướng dẫn Sử dụng'},
	searchable_address: { type: Types.TextArray, label: 'Địa chỉ Cơ sở Sản xuất'},
	pub_status: { type: String, hidden: true }
});

doanhNghiep.schema.pre('save', function(next) {
  this._type = 'doanhnghiep';
	this.slug=tr.slugify(this.display_name);
	this.title = tr.transliterate(this.display_name);
	this.title_wo_accent = tr.transliterate(this.display_name);
  next();
});

doanhNghiep.defaultColumns = 'display_name, dia_chi';
doanhNghiep.register();
