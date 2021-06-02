const validationRequirements = {
  name: {
    empty: true,
    regExp: /[\wа-я\sё]{2,30}/i,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    empty: true,
    regExp: /^(([^#<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  password: {
    empty: true,
    regExp: /^[a-zA-Z0-9:%.,_+~#=@]+$/,
  }
}

const validationErrorsText = {
  name: {
    empty: 'Пожалуйста, укажите имя',
    regExp: 'Пожалуйста, используйте только буквы',
    minLength: `Допускается имя не короче ${validationRequirements.name.minLength} символов`,
    maxLength: `Допускается имя не длиннее ${validationRequirements.name.maxLength} символов`,
  },
  email: {
    empty: 'Пожалуйста, укажите Email',
    regExp: 'Некорректный Email',
  },
  password: {
    empty: 'Пожалуйста, укажите пароль',
    regExp: 'Пароль может состоять из букв кириллицы и латиницы, цифр, а также специальных символов : % . , _ + ~ # = @',
  }
}

function validateData(input) {
  let errors = {};
  console.log('validateData');

  // Проверка поля на пустоту
  if (validationRequirements[input.name].empty && !input.value.trim()) {
    errors[input.name] = validationErrorsText[input.name].empty;
    return errors;
  } else {
    errors[input.name] = '';
  }

  // Проверка поля на регулярное выражение
  if (validationRequirements[input.name].regExp && !validationRequirements[input.name].regExp.test(input.value)) {
    errors[input.name] = validationErrorsText[input.name].regExp;
    return errors;
  } else {
    errors[input.name] = '';
  }

  // Проверка поля на минимальную длину
  if (validationRequirements[input.name].minLength && input.value.length < validationRequirements[input.name].minLength) {
    errors[input.name] = validationErrorsText[input.name].minLength;
    return errors;
  } else {
    errors[input.name] = '';
  }

  // Проверка поля на максимальную длину
  if (validationRequirements[input.name].maxLength && input.value.length > validationRequirements[input.name].maxLength) {
    errors[input.name] = validationErrorsText[input.name].maxLength;
    return errors;
  } else {
    errors[input.name] = '';
  }

  // // Валидация имени
  // if (!values.name.trim()) {
  //   errors.name = validationErrorsText.name.empty;
  // } else if (!validationRequirements.name.regExp.test(values.name)) {
  //   errors.name = validationErrorsText.name.regExp;
  // } else if (values.name.length < validationRequirements.name.minLength) {
  //   errors.name = validationErrorsText.name.minLength;
  // } else if (values.name.length > validationRequirements.name.maxLength) {
  //   errors.name = validationErrorsText.name.maxLength;
  // }

  // // Валидация Email
  // if (!values.email.trim()) {
  //   errors.email = validationErrorsText.email.empty;
  // } else if (!validationRequirements.email.regExp.test(values.email)) {
  //   errors.email = validationErrorsText.email.regExp;
  // }

  // // Валидация пароля
  // if (!values.password) {
  //   errors.password = validationErrorsText.password.empty;
  // } else if (!validationRequirements.password.regExp.test(values.password)) {
  //   errors.password = validationErrorsText.password.regExp;
  // }

  return errors;
}

export default validateData;