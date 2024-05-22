export const LanguageSupport = {
  vi: 'vi',
  en: 'en',
  kor: 'kor',
  jap: 'jap',
};

export interface AppStrings {
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
