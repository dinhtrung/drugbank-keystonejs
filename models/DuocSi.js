var keystone = require('keystone');
var Types = keystone.Field.Types;

var DuocSi = new keystone.List('DuocSi', {
	label: 'Dược Sĩ',
	path: 'duoc-si',
	singular: 'Dược Sĩ',
	plural: 'Dược Sĩ',
	track: true,
	map: { name: 'hoTen' }
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

DuocSi.add('Thông tin trên Chứng chỉ Hành nghề', {
	hoTen: { type: String, label: 'Họ và Tên', required: true, initial: true, note: 'Chứng chỉ hành nghề Dược' },
	cmnd: { type: String, label: 'CMND/CCCD', required: true, initial: true, note: 'Chứng chỉ hành nghề Dược' },
	ngaySinh: { type: Types.Date, label: 'Ngày Sinh', note: 'Chứng chỉ hành nghề Dược' },
	hoKhau: { type: Types.Location, label: 'Nơi đăng ký hộ khẩu thường trú', note: 'Chứng chỉ hành nghề Dược' },
	hinhAnh: { type: Types.CloudinaryImage, label: 'Hình Ảnh Sản Phẩm', note: 'Theo Tờ nhãn đăng ký Dược Sĩ' }
});
// TODO: Enforce the `loai` fields
DuocSi.add('Văn Bằng Chuyên Môn', {
	vanBang: { type: Types.Relationship, ref: 'GiayPhep', many: true, createInline: true },
});
DuocSi.add('Chứng chỉ hành nghề Dược', {
	chungChiHanhNghe: { type: Types.Relationship, ref: 'GiayPhep', many: true, createInline: true },
});

DuocSi.defaultColumns = 'hoTen, cmnd';
DuocSi.register();
