const constant = {};
const permission = {};
constant.STUDENT_PRIVATE_KEY = 'studentkey';
constant.ADMIN_PRIVATE_KEY = 'adminkey';
constant.SUB_ADMIN_KEY = 'subadminkey';
constant.STUDENT_NOT_EXIST_ERROR = {
  status: 404,
  message: 'student does not exist',
};
constant.PASSWORD_NOT_MATCH = {
  status: 404,
  message: 'student password does not match',
};
constant.LOGIN_SUCCESS = 'student login successfully';
constant.STUDENT_UPDATE_SUCCESS = 'student has been update successfully';
constant.NOTHING_FOR_DELETE = {
  status: 404,
  message: 'there is not any student for delete',
};
constant.DELETE_SUCCESSFULLY = 'student has been delete successfully';
constant.PERMISSION_UPDATE_SUCCESS = 'permission has been update successfully';
constant.PERMISSION_NOT_EXIST_ERROR = {
  status: 401,
  message: 'you have not required permission',
};
constant.SUB_ADMIN_CREATED = 'sub admin has been created';
constant.NOT_SUB_ADMIN = {
  status: 401,
  message: 'user is not a sub admin',
};
constant.ADMIN_NOT_FOUND = {
  status: 404,
  message: 'user not found as a admin',
};
constant.NOT_ADMIN = {
  status: 401,
  message: 'you are not a admin so you can not access this request',
};
constant.BOOK_ASIGN = 'this book has been already asign to you';
constant.BOOK_NOT_FIND = {
  status: 404,
  message: 'This book is not our library. Please choose another book',
};
constant.STUDENT_ALREADY_PRESENT = 'student has already an account please login';
constant.ADMIN_ALREADY_PRESENT = 'This admin id is already present';
constant.PERMISSION_ALREADY_GIVEN = {
  status: 401,
  message: 'this permission is already taken by the sub admin',
};
constant.BOOK_ALREADY_PRESENT = {
  status: 401,
  message: 'Book is already in library',
};
constant.SUB_ADMIN_ALREADY_EXIST = {
  status: 401,
  message: 'this user is already created as sub admin',
};
constant.NO_BOOK_ASSIGN = {
  status: 404,
  message: 'there is not any assign book to the student',
};
permission.UPDATE = 'update';
permission.DELETE = 'delete';
module.exports = {
  constant,
  permission,
};
