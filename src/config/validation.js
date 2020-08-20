// 手机号验证
var validateMobilePhoneNo = (rule, value, callback) => {
  if (value) {
      // var reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
      var reg = /^((0\d{2,3}-\d{7,8})|(1[345678]\d{9}))$/;
      if (!reg.test(value)) {
        callback(new Error('请输入有效的手机号'));
      }else{
        callback();
      }
    } else {
      callback()
    }
}

//
var validateMobilePhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('手机号不能为空'));
  } else {
    const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error('请输入有效的手机号'));
    }
  }
}

// 年龄验证
var checkAge = (rule, value, callback) => {
  if(value){
    if (!Number.isInteger(value)) {
      callback(new Error('请输入有效的年龄'));
    }else{
      callback();
    }
  }else{
    callback()
  }
};

//证件编号
var validatenum = (rule, value, callback) =>
{
  if (value === '') {
    callback(new Error('证件编号不能为空'));
  } else {
    var reg = /^[a-zA-Z0-9]{18}$/;
    if (value &&(!reg.test(value))){
      callback(new Error('请输入有效的证件编号18位'))
    }
    callback()
  }
}

//省份证号的验证
var validateCardId = (rule, value, callback) =>
{
  if (value === '') {
    callback(new Error('身份证号码不能为空'));
  } else {
    if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
      callback(new Error('请输入有效的身份证号码'))
    }
    callback()
  }
}

//为空省份证
var validateCardIdNo = (rule, value, callback) =>
{
  if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
    callback(new Error('请输入有效的身份证号码'))
  }else{
    callback()
  }
}
//    座机号码
var validatePhone = (rule, value, callback) => {
  if (value) {
    var reg = /^((0\d{2,3}-\d{7,8})|(1[345678]\d{9}))$/;
    if (!reg.test(value)) {
      callback(new Error('请输入手机或座机号为：0000-0000000'));
    }else{
      callback();
    }
  }else{
    callback();
  }
}

//邮箱验证
var validateEmail = (rule, value, callback) => {
  if (value) {
    var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!reg.test(value)) {
      callback(new Error('请输入有效的邮箱'));
    }else{
      callback();
    }
  }else{
    callback();
  }
};

/* 手机号码和固定电话 */
var validatePhTelNumber = (rule, value, callback) => {
  if (value) {
    var reg = /^(((\d{3,4})|\d{3,4}-|\s)?\d{7,14})|([1][3,4,5,6,7,8,9][0-9]{9})$/;
    // var reg = /^(((\d{3,4})|\d{3,4}-|\s)?\d{7,14})|((13[0-9])|(15[0-3,5-9])|(18[0-3,5-9])|(17[0-3,5-9]))\d{8}$/;
    if (!reg.test(value)) {
      callback(new Error('请手机号码和固定电话'));
    }else{
      callback();
    }
  }else{
    callback();
  }
};

//邮编
var validateZipCode = (rule, value, callback) => {
  if (value) {
    var reg = /[0-9]{5}$/;
    if (!reg.test(value)) {
      callback(new Error('请输入邮编'));
    }else{
      callback();
    }
  }else{
    callback();
  }
};

//传真号
var validateFax = (rule, value, callback) => {
  if (value) {
    var reg = /^(\d{3,4}-)?\d{7,8}$/;
    if (!reg.test(value)) {
      callback(new Error('请输入有效传真号'));
    }else{
      callback();
    }
  }else{
    callback();
  }
};

//比例
var validatePerct = (rule, value, callback) => {
  if (value) {
    var reg = /^(\d?\d(\.\d{0,2})?|100)$/;
    if (!reg.test(value)) {
      callback(new Error('请输入正确格式0.00%'));
    }else{
      callback();
    }
  }else{
    callback();
  }
};
//金钱正整数最多2位小数
var validateMoney = (rule, value, callback) => {
  if (value) {
    var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    if (!reg.test(value)) {
      callback(new Error('请输入正确格式0.00'));
    }else{
      callback();
    }
  }else{
    callback();
  }
};

//正整数的验证
var validateInteger = (rule, value, callback) => {
  if (value) {
    var reg = /^[+]{0,1}(\d+)$/;
    if (!reg.test(value)) {
      callback(new Error('请输入正整数'));
    }else{
      callback();
    }
  }else{
    callback();
  }
};

//密码验证
var validatePass = (rule, value, callback) => {
  if (value) {
    var reg = /^\d{6}$/;
    if (!reg.test(value)) {
      callback(new Error('请输入6位密码'));
    }else{
      callback();
    }
  }else{
    callback();
  }
};


var validateInp = (rule, value, callback) => {
  if (value) {
    var reg = /^((0.\d{1,2})+|1)$/;
    if (!reg.test(value)) {
      callback(new Error('请输入0-1这个数,2位小数'));
    }else{
      callback();
    }
  }else{
    callback();
  }
};

export default {
  validateMobilePhoneNo,
  validateMobilePhone,
  checkAge,
  validateEmail,
  validatePhone,
  validatePhTelNumber,
  validateZipCode,
  validateFax,
  validateMoney,
  validateCardId,
  validateCardIdNo,
  validatePass,
  validateInteger,
  validatePerct,
  validatenum,
  validateInp
}




