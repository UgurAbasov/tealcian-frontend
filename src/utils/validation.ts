const isValidate = (value: any) => {
  if (value.name !== undefined) {
    if (value.name.length < 5) {
      return {
        massage: `Username length need to be more than 5`,
        solution: ``,
      };
    } else if (!/^[a-zA-Z0-9]*$/.test(value.name)) {
      return {
        massage: 'Not valid Username',
        solution: 'Username need to consist of only letters and numbers',
      };
    }
  }

  if (Object.keys(value).length === 0) {
    return {
      massage: 'Not valid email or password, make sure that inputs are filled',
      solution: '',
    };
  } else if (
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value.email) &&
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value.password)
  ) {
    return {
      massage: 'good',
      solution: '',
    };
  } else {
    return {
      massage: `Make sure that you wrote valid email or password`,
      solution: '',
    };
  }
};

export default isValidate;
