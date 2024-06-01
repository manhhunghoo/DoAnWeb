# WEB HỌC TẬP TRỰC TUYẾN DÀNH CHO SINH VIÊN UIT - UITeCo

UITeCo là một trang web học tập trực tuyến dành cho sinh viên và giảng viên UIT.

## Mô tả

-UITeCo là một trang web học tập trực tuyến dành riêng cho sinh viên và giảng UIT với các khóa học, tài liệu, video bài giảng được các thầy cô, sinh viên của trường chia sẻ lên hoàn toàn miễn phí. UITeCo lấy ý tưởng từ UIT courses và Microsoft Teams, giúp sinh viên có thể vào học các môn học cảu các khoa khsc nhau và vừa có thể tạo phòng học, nhóm học với nhau như trên Teams. Điểm đặc biệt của UITeCo là trang web chia sẻ tài liệu của tất cả các môn học của từng khoa từ môn cơ sở ngành đến các môn chuyên ngành (tài liệu này sẽ do giảng viên môn học chia sẻ lên nên sẽ đảm bảo về chất lượng và nguồn gốc) nhằm phụ vụ mong muốn học hỏi thêm kiến thức của sinh viên. Trang web tích hợp các chức năng cơ bản, cần thiết của UIT Courses và Microsoft Teams như: tạo phòng học, tạo group học, đăng tải hình ảnh, xem video bài học, nhắn tin,...
-Đối với giảng viên: Website có các chức năng giúp giảng viên có thể đăng tải video, giao bài tập, deadline, chấm điểm sinh viên, tạo lớp học, tạo phòng học trực tuyến, quản lý sinh viên giống như UIT courses.

## PHẦN 1: CÁC CHỨC NĂNG (Mô tải sơ lược)
 (Mô tả chi tiết ở phần 2)

**Chức năng 1: Đăng nhập/ Đăng xuất**
- Phân luồng người dùng: Admin, Teacher, Student
- Cho phép đăng kí tài khoản admin
- Cho phép Admin tạo tài khoản cho Teacher và Student
- Ghi nhớ tài khoản 

**Chức năng 2: Trang chủ**
- Đề xuất danh sách các khóa học, nhóm học 
- Hiển thị danh sách thành viên đang hoạt động
- Hiển thị lịch 

**Chức năng 3: Khóa học**
- Tạo khóa học 
- Cho phép học sinh tham gia khóa học
- Cho phép Admin, giáo viên thêm/ xóa sinh viên vào khóa học 
- Cho phép giáo viên đăng tải **Video, Bài tập, Thông báo**
- Cho phép Admin xóa khóa học 
- Cho phép học sinh comment ở từng video bài giảng 
- Admin có thể xóa comment trên bài giảng 
- Lấy thông tin khóa học, lấy danh sách học sinh khóa học, lấy danh sách khóa học của học sinh và giáo viên 
- Cho phép giáo viên chấm điểm khóa học từng học sinh 
- Lấy danh sách khóa học học sinh đã hoàn thành 
- Cho phép học sinh xem điểm khóa học
- Cho phép người tạo khóa học cập nhật thông tin khóa học 

**Chức năng 4: Học nhóm**
- Tạo nhóm
- Xóa nhóm
- Cho phép cập nhật thông tin nhóm
- Lấy danh sách tất cả nhóm học 
- Cho phép học sinh tahm gia nhóm học, rời nhóm học 
- Cho phép các thành viên trong nhóm chat với nhau

**Chức năng 5: Học tập**
- Cho phép Admin và giáo viên đăng video bài giảng theo các môn 
- Cho phép tất cả học sinh xem video bài giảng ở tất cả các môn 

**Chức năng 6: Diễn đàn**
- Đăng tải trạng thái, trao đổi học tập 
- Cho phép Admin xóa bài đăng 
- Cho phép comment trên các bài đăng 

**Chức năng 7: To do list**
- Cho phép học sinh tạo bảng học tập 
- Cho phép tạo các column và card
- Cho phép di chuyển giữa các column và card 
- Cho phép xóa column và card 

**Chức năng 8: Thống kê**
- Cho phép thống kê số lượng sinh viên, giáo viên, số lượng khóa học
- Cho phép quản lý danh sách các sinh viên (thêm, xóa sinh viên)
- Cho phép quản lý danh sách các giáo viên (thêm, xóa giáo viên)
- Cho phép xem danh sách các nhóm học 
- Cho phép xem danh sách các khóa học 

**Chức năng 9: Thông báo**
- **Thông báo bài tập:** Khi giáo viên đăng bài tập thì chỉ những học sinh có trong khóa học mới nhận được thông báo 
- **Thông báo diễn đàn:** Khi Admin đăng bài thì tất cả học sinh đều nhìn thấy thông báo 

**Chức năng 10: Tìm kiếm**
- Cho phép tìm kiếm khóa học, đưa ra đề xuất khóa học tồn tại

**Chức năng 11: Profile**
- Cho phép update thông tin người dùng 

## PHẦN 2: GIAO DIỆN VÀ CÁC CHỨC NĂNG CHÍNH (Mô tả chi tiết)

### Chức năng 1: Đăng nhập/ Đăng xuất
**Đăng nhập**
![Dang nhap](https://github.com/manhhunghoo/DoAnWeb/assets/87658807/5ab58edc-a38d-4790-b299-aa196493539a)

- **Mô tả:** Dành riêng cho uit nên sẽ cố định định dạng email đk tài khoản (.uit.edu.vn). 
- **Chức năng:**
   + Tạo tài khoản
   + Đăng nhập	
   + Reset mật khẩu	
   + Ghi nhớ đăng nhập	
   + Ghi nhớ phiên hoạt động	

### Chức năng 2. Trang chủ
![trang chu](https://github.com/manhhunghoo/DoAnWeb/assets/87658807/5ae81114-610a-42c8-b6c7-91ed21b7b478)

![Trang chu](https://github.com/manhhunghoo/DoAnWeb/assets/87658807/fde2e32e-2bb2-45d1-86f6-6dc5ef054aa7)

- **Mô tả:** 
  Bao gồm các module chính:
  - Trang chủ
  - Khóa học
  - Học tập
  - Học nhóm
  - Diễn đàn
  - To do list
  - Tìm kiếm
  - Thông báo
  - Tài khoản
  - Các mục đề xuất
  - Lịch
  - Thành viên đang hoạt động

### Chức năng 3. Khóa học

![Khóa học](https://github.com/manhhunghoo/DoAnWeb/assets/87658807/f2de6985-4c31-4ea0-8a66-25082b3ff222)


- **Mô tả:**

  -Gồm các khóa học do Admin tạo (có thể là các khóa training của các khoa hoặc trường tổ chức)

  -Admin có quyền thêm giáo viên và sinh viên vào khóa học 

  -Giáo viên có quyền chấm điểm sinh viên, khi sinh viên được chấm điểm thì sẽ được xác nhận là hoàn thành khóa học.


- **Chức năng:**
  - *Sinh viên:* Xem video bài giảng, comment từng video bài giảng 
  - *Giảng viên:* Đăng các khóa traing, tài liệu, video bài giảng.

### Chức năng 4. Học tập

![Học tập](https://github.com/manhhunghoo/DoAnWeb/assets/87658807/8ce9a545-b6b8-468b-ae79-e67c30fb1b60)

- **Mô tả:**
  Bao gồm các môn học đại cương, các môn cơ sở ngành và chuyên ngành của từng khoa.

- **Chức năng:**
  - *Sinh viên:* Xem video, tải tài liệu từ các môn học của các khoa khác nhau, xem tiếp tục các môn học đang học dở, đánh giá phản hồi tài liệu, video bài giảng (nếu có sai sót, thắc mắc).

  - *Giảng viên:* Đăng tải tài liệu, video bài giảng, phản hồi thắc mắc của sinh viên.


### Chức năng 5. Học nhóm
![Học nhóm](https://github.com/manhhunghoo/DoAnWeb/assets/87658807/8d030e73-384b-4018-9abb-4781b666b739)


- **Mô tả:**
  Bao gồm các lớp học do giảng viên bộ môn tạo vào các group học tập cá nhân, có thể tạo các cuộc họp trực tuyến để trò chuyện, học tập giống như Microsoft Teams.

- **Chức năng:**
  - *Sinh viên:* 
  -Tạo group học.

  -Tạo phòng học riêng tư (có liên kết mời, mã phòng). Chủ phòng được quyền kick thành viên.

  -Nộp bài tập giảng viên giao. 



  - *Giảng viên:* 
  -Tạo phòng học đơn lẻ (có liên kết mời, mã phòng, quyền cho sinh viên vào phòng, kick sv, chặn mic).

  -Tạo lớp học (có liên kết mời vào lớp)

  -Quản lý sinh viên trong group lớp học.

  -Giao dl (chỉnh sửa dl), bài tập.

### Chức năng 6. Diễn đàn
![Diễn đàn](https://github.com/manhhunghoo/DoAnWeb/assets/87658807/7aa38982-84bd-4a1b-8975-e03d7aa20de3)

- **Mô tả:**

### Chức năng 7. Todolist 
![image](https://github.com/manhhunghoo/DoAnWeb/assets/87658807/0c84143e-60e8-4fc6-848d-a2c250f1ae4d)

- **Mô tả:**

### Chức năng 8: Thống kê

**Mô tả:**
- Cho phép thống kê số lượng sinh viên, giáo viên, số lượng khóa học
- Cho phép quản lý danh sách các sinh viên (thêm, xóa sinh viên)
- Cho phép quản lý danh sách các giáo viên (thêm, xóa giáo viên)
- Cho phép xem danh sách các nhóm học 
- Cho phép xem danh sách các khóa học 

### Chức năng 9: Thông báo

- **Mô tả:**
- **Thông báo bài tập:** Khi giáo viên đăng bài tập thì chỉ những học sinh có trong khóa học mới nhận được thông báo 
- **Thông báo diễn đàn:** Khi Admin đăng bài thì tất cả học sinh đều nhìn thấy thông báo 

### Chức năng 10: Tìm kiếm

- **Mô tả:**
- Cho phép tìm kiếm khóa học, đưa ra đề xuất khóa học tồn tại

### Chức năng 11: Profile

- **Mô tả:**
- Cho phép update thông tin người dùng 


## PHẦN 3: SƠ ĐỒ DATABASE, CÁC BẢNG TRONG MONGODB

**1. AdminModel**

![AdminModel](https://github.com/WalterDrake/NT208/assets/87658807/be78e9b4-2faf-4a63-aadd-43c028560e86)


**2. BaitapModel**

![BaitapModel](https://github.com/WalterDrake/NT208/assets/87658807/a24a1097-870c-444d-aa7e-8a61e80b7e8e)


**3. BoardModel**

![BoardModel](https://github.com/WalterDrake/NT208/assets/87658807/7345a49e-1f55-4eb7-9e94-a038dcf4c058)


**4. CardModel**

![CardModel](https://github.com/WalterDrake/NT208/assets/87658807/e49066df-4a20-4e4f-8fcf-97bdf583f6de)


**5. ChatrealtimeModel**

![ChatrealtimeModel](https://github.com/WalterDrake/NT208/assets/87658807/9ff0f967-4b3b-41ec-b267-092b5f671c01)


**6. ColumnModel**

![ColumnModel](https://github.com/WalterDrake/NT208/assets/87658807/90c5cd53-aef1-4a5d-8c5c-a698fec565be)


**7. CommentModel**

![CommentModel](https://github.com/WalterDrake/NT208/assets/87658807/5252d8e3-c930-42cc-a0b0-665746e2a988)


**8. CommentBoxModel**

![CommentBoxModel](https://github.com/WalterDrake/NT208/assets/87658807/9a3a484b-56ae-4ace-a70d-5c6036707dc8)


**9. ComplainModel**

![ComplainModel](https://github.com/WalterDrake/NT208/assets/87658807/f9a2eeda-61f8-4b20-9ed3-7256d1c1332e)


**10. CoursesModel**

![CoursesModel](https://github.com/WalterDrake/NT208/assets/87658807/e9e59dc1-4e90-470e-a568-9740273e1c64)


**11. EventModel**

![EventModel](https://github.com/WalterDrake/NT208/assets/87658807/2006333a-0c27-469f-93b7-b5e4219c96f5)


**12. GroupModel**

![GroupModel](https://github.com/WalterDrake/NT208/assets/87658807/ded1f960-5eb3-411d-9161-8e8c3b567e0a)


**13. ItemModel**

![ItemModel](https://github.com/WalterDrake/NT208/assets/87658807/2681a492-3f83-48c4-8c8f-d2204c0f87ca)


**14. MessageModel**

![MessageModel](https://github.com/WalterDrake/NT208/assets/87658807/0d121872-8c36-483f-876c-bc499d476e41)


**15. NotificationModel**

![NotificationModel](https://github.com/WalterDrake/NT208/assets/87658807/ed0e7862-57a0-4019-8797-f3e3f4012d0c)


**16. PostModel**

Post diễn đàn

![PostForum](https://github.com/WalterDrake/NT208/assets/87658807/294e914d-3c09-4a29-83eb-41f7344a3434)

Post khóa học

![PostCourses](https://github.com/WalterDrake/NT208/assets/87658807/f0d4417f-d485-44c3-ac50-7ee60365b30c)


**17. StudiesModel**

![StudyModel](https://github.com/WalterDrake/NT208/assets/87658807/0d89c91b-dfb9-47c5-8aaa-4e63226e4ab2)


**18. TeacherModel**

![TeacherModel](https://github.com/WalterDrake/NT208/assets/87658807/8211e52f-fe2e-4a9c-bd2d-11f0f99c6b6f)


**19. TeamBoxModel**

![TeamBox](https://github.com/WalterDrake/NT208/assets/87658807/cc36fdc3-762a-4440-bb12-0103c9d54d27)


**20. TodolistModel**

![Todolist](https://github.com/WalterDrake/NT208/assets/87658807/ab21b2e5-c263-4bfb-a177-dc16c9a9477e)


**21. UsersModel**

![User](https://github.com/WalterDrake/NT208/assets/87658807/abf2b909-0cd6-4ff7-91cb-4d777c4d0f4f)


**22. VideoModel**

![VideoModel](https://github.com/WalterDrake/NT208/assets/87658807/53b66f0b-7606-45b5-ae05-d30a90f87704)


## PHẦN 4: CÁC API TRONG POSTMAN



## Tham khảo sơ đồ chức năng của web ở link dưới
[Sơ đồ chức năng](https://drive.google.com/file/d/154R6ONFJVh0bGFez0gV-TwrMxyg9wFdx/view)
