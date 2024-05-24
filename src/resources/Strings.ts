export const LanguageSupport = {
  vi: 'vi',
  en: 'en',
  kor: 'kor',
  jap: 'jap',
};

interface Auth {
  username_title: string;
  password_title: string;
  change_password_title: string;
  phone: string;
  default_password: string;
  password: string;
  re_password: string;
  welcome_title: string;
  phone_error_help_text: string;
  password_error_help_text: string;
}

export interface AppStrings {
  auth: Auth;
  network_not_available: string;
  try_check_network: string;
  erorrs: string;
  success: string;
  fullname: string;
  phone: string;
  date_of_birth: string;
  email: string;
  address: string;
  schedule: string;
  news: string;
  startDate: string;
  endDate: string;
  numberPractices: string;
  numberRemained: string;
}

const vi = <AppStrings>{
  auth: {
    username_title: 'Số Điện Thoại',
    password_title: 'Mật Khẩu',
    change_password_title: 'Đổi Mật Khẩu',
    default_password: 'Mật khẩu hiện tại',
    re_password: 'Nhập lại mật khẩu',
    phone: 'Nhập số điện thoại',
    password: 'Nhập mật khẩu',
    phone_error_help_text: 'Số điện thoại không tồn tại. Vui lòng nhập lại',
    password_error_help_text: 'Mật khẩu không đúng. Vui lòng nhập lại',
  },
  network_not_available: 'Mạng internet gặp sự cố, vui lòng kết nối lại',
  try_check_network: 'Kết nối lại',
  erorrs: 'Úi, đã gặp lỗi vui lòng thực hiện lại',
  success: 'Tác vụ thành Công',
  fullname: 'Họ và Tên',
  phone: 'Số điện thoại',
  date_of_birth: 'Ngày sinh',
  address: 'Địa chỉ',
  schedule: 'Lịch học',
  news: 'Bảng tin',
  startDate: 'Ngày bắt đầu',
  endDate: 'Ngày kết thúc',
  numberPractices: 'Số buổi tập',
  numberRemained: 'Số buổi tập còn lại',
};

// const en = <AppStrings>{};

// const kor = <AppStrings>{};

// const jap = <AppStrings>{};

export {vi};
