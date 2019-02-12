var keystone = require('keystone');
var Types = keystone.Field.Types;

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

/**
 * GiayPhep Model
 * ==================
 */

var GiayPhep = new keystone.List('GiayPhep', {
	autokey: { from: 'name', path: 'key', unique: true },
  label: 'Giấy Phép',
	path: 'giay-phep',
	singular: 'Giấy Phép',
	plural: 'Giấy Phép',
	map: { name: 'maSo' }
});

GiayPhep.add('Thông tin Giấy Phép', {
	doiTuong: { type: String, label: 'Đối Tượng Cấp', required: true, initial: true, note: 'Họ Tên cá nhân hoặc doanh nghiệp được cấp phép' },
	maSo: { type: String, label: 'Mã Số', required: true, initial: true, note: 'Mã Số trên giấy phép' },
  loai: { type: Types.Select, label: 'Loại Giấy Phép', required: true, initial: true, note: 'Loại Văn Bằng', options: [
    { value: 'chungChiHanhNghe', label: 'Chứng Chỉ Hành Nghề' },
    { value: 'chungNhanKinhDoanh', label: 'Chứng Nhận Kinh Doanh Dược' },
    { value: 'chungChiGMP', label: 'Chứng chỉ GMP' },
		{ value: 'chungChiGSP', label: 'Chứng chỉ GSP' },
		{ value: 'chungChiGDP', label: 'Chứng chỉ GDP' },
		{ value: 'chungChiGPP', label: 'Chứng chỉ GPP' },
		{ value: 'vanBang', label: 'Văn Bằng của Dược Sĩ' }]
  },
	ngayCap: { type: Types.Date, label: 'Ngày Cấp', note: 'Ngày cấp giấy phép' },
  ngayHetHan: { type: Types.Date, label: 'Ngày Hết Hạn', note: 'Ngày giấy phép hết hạn' },
	noiCap: { type: String, label: 'Nơi cấp', note: 'Đơn vị cấp giấy phép' },
	hinhAnh: { type: Types.CloudinaryImage, label: 'Hình Ảnh Giấy Phép', note: 'Bản scan 2 mặt của giấy phép' },
  phamVi: {  type: Types.Html, wysiwyg: true, label: 'Hướng Dẫn Sử Dụng' }
});

// TODO: Add relationships
// GiayPhep.relationship({ ref: 'Post', path: 'posts', refPath: 'categories' });

GiayPhep.defaultColumns = 'maSo, loai|20%, doiTuong|20%, ngayCap|20%';
GiayPhep.register();
