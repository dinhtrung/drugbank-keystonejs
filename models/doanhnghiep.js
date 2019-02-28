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
	schema: { collection: 'doanh_nghiep' },
	label: 'Doanh Nghiệp',
	path: 'doanh-nghiep',
	singular: 'Doanh Nghiệp',
	plural: 'Doanh Nghiệp',
	track: true,
	map: { name: 'ten' }
});

doanhNghiep.add('Thông tin trên Chứng chỉ Hành nghề', {
	ten: { type: String, label: 'Tên doanh nghiệp', required: true, initial: true, note: 'Theo Đăng ký Kinh doanh' },
	maSo: { type: String, label: 'Tên viết tắt', required: true, initial: true, note: 'Theo Đăng ký Kinh doanh' },
	hinhAnh: { type: Types.TextArray, label: 'Hình Ảnh', note: 'Theo Đăng ký Kinh doanh' },
	mst: { type: String, label: 'Mã Số Thuế', note: 'Theo Đăng Ký kinh doanh' },
	truSo: { type: Types.Location, label: 'Trụ sở chính', note: 'Theo Đăng Ký kinh doanh' },
	dienThoai: { type: String, label: 'Điện thoại', note: 'Theo Đăng Ký kinh doanh' },
	daiDienPhapLuat: { type: String, label: 'Đại diện pháp luật', note: 'Theo Đăng ký kinh doanh'},
});
// Extra metadata
doanhNghiep.add({
	thuoc_cnt: { type: Types.Number, label: 'Số lượng thuốc SX', note: 'Số lượng thuốc sản xuất', noedit: true },
	extId: { type: String, hidden: true }
});

doanhNghiep.schema.pre('save', function(next) {
  this._type = 'doanhnghiep';
	this.slug=tr.slugify(this.display_name);
	this.title = tr.transliterate(this.display_name);
	this.title_wo_accent = tr.transliterate(this.display_name);
  next();
});

doanhNghiep.defaultColumns = 'ten, maSo, truSo';
doanhNghiep.register();
