// Định nghĩa kiểu cho các micro-frontends (remotes)
// Ví dụ, nếu MFE 'hrm' expose một component tên là 'HRMPage'
// declare module 'hrm/HRMPage';

// Ví dụ, nếu MFE 'event' expose một component tên là 'EventCalendar'
// declare module 'event/EventCalendar';

// Bạn sẽ cần cập nhật file này khi các MFE của bạn expose modules.
// Tên module sẽ là 'REMOTE_NAME/EXPOSED_MODULE_NAME'
// Ví dụ: 'hrm/Button' hoặc 'event/UserInfo'

declare module 'hrm/HrmInfo';
declare module 'event/EventInfo'; 