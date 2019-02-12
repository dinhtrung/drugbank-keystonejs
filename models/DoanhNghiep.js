var keystone = require('keystone');
var Types = keystone.Field.Types;

var DoanhNghiep = new keystone.List('DoanhNghiep', {
	label: 'Doanh Nghiệp',
	path: 'doanh-nghiep',
	singular: 'Doanh Nghiệp',
	plural: 'Doanh Nghiệp',
	track: true,
	map: { name: 'maSo' }
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

DoanhNghiep.add('Thông tin trên Chứng chỉ Hành nghề', {
	ten: { type: String, label: 'Tên doanh nghiệp', required: true, initial: true, note: 'Theo Đăng ký Kinh doanh' },
	maSo: { type: String, label: 'Tên viết tắt', required: true, initial: true, note: 'Theo Đăng ký Kinh doanh' },
	hinhAnh: { type: Types.CloudinaryImage, label: 'Hình Ảnh', note: 'Theo Đăng ký Kinh doanh' },
	mst: { type: String, label: 'Mã Số Thuế', note: 'Theo Đăng Ký kinh doanh' },
	truSo: { type: Types.Location, label: 'Trụ sở chính', note: 'Theo Đăng Ký kinh doanh' },
	dienThoai: { type: String, label: 'Điện thoại', note: 'Theo Đăng Ký kinh doanh' },
	daiDienPhapLuat: { type: String, label: 'Đại diện pháp luật', note: 'Theo Đăng ký kinh doanh'}

});

DoanhNghiep.defaultColumns = 'maSo, ten';
DoanhNghiep.register();
