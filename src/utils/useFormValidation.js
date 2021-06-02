import { useState, useEffect } from 'react';

function useFormValidation(validateData) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [validationInput, setValidationInput] = useState({
    name: '',
    value: ''
  });
  const [isValidated, setIsValidated] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    console.log(validationInput);
    if (isValidated) {
      setValidationErrors({
        ...validationErrors,
        ...validateData(validationInput)
      })
    }
  }, [validationInput]);

  useEffect(() => {
    console.log(validationErrors);
    const emptyValidationErrors = Object.keys(validationErrors).every(key => {
      console.log(validationErrors, key, validationErrors[key], !validationErrors[key]);
      return !validationErrors[key];
    });
    emptyValidationErrors ? setIsValidForm(true) : setIsValidForm(false);
    console.log(Object.keys(validationErrors));
    console.log(emptyValidationErrors);
  }, [validationErrors]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value
    });
    setIsValidated(true);
    setValidationInput({
      ...validationInput,
      name,
      value
    });
  }

  return {
    userData,
    validationErrors,
    handleChange,
    isValidForm
  };
}

export default useFormValidation;