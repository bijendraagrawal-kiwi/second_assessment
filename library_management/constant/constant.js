const constant = {};
const permission = {};
constant.STUDENT_PRIVATE_KEY = 'studentkey';
constant.ADMIN_PRIVATE_KEY = 'adminkey';
constant.SUB_ADMIN_KEY = 'subadminkey';
constant.STUDENT_NOT_EXIST_ERROR = 'student does not exist';
constant.PASSWORD_NOT_MATCH = 'student password does not match';
constant.LOGIN_SUCCESS = 'student login successfully';
constant.STUDENT_UPDATE_SUCCESS = 'student has been update successfully';
constant.NOTHING_FOR_DELETE = 'there is not any data for delete';
constant.DELETE_SUCCESSFULLY = 'student has been delete successfully';
constant.PERMISSION_UPDATE_SUCCESS = 'permission has been update successfully';
constant.PERMISSION_NOT_EXIST_ERROR = 'you have not required permission';
constant.SUB_ADMIN_CREATED = 'sub admin has been created';
constant.NOT_SUB_ADMIN = 'user is not a sub admin';
constant.ADMIN_NOT_FOUND = 'user not found as a admin';
constant.NOT_ADMIN = 'you are not a admin so you can not access this request';
constant.BOOK_ASIGN = 'this book has been already asign to you';
constant.BOOK_NOT_FIND = 'This book is not our library. Please choose another book';
constant.STUDENT_ALREADY_PRESENT = 'student has already an account please login';
constant.ADMIN_ALREADY_PRESENT = 'This admin id is already present';
constant.PERMISSION_ALREADY_GIVEN = 'this permission is already taken by the sub admin';
constant.BOOK_ALREADY_PRESENT = 'Book is already in library';
constant.SUB_ADMIN_ALREADY_EXIST = 'this user is already created as sub admin';
constant.NO_BOOK_ASSIGN = 'there is not any assign book to the student';
constant.LOGIN_FIRST = 'Please login first';
permission.UPDATE = 'update';
permission.DELETE = 'delete';
module.exports = {
  constant,
  permission,
};
