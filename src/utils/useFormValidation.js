import { useState, useEffect } from 'react';

function useFormValidation(inputs, validateData) {
  const [userData, setUserData] = useState({                                                                                // Стейт со значениями инпутов для валидации
    ...inputs
  });
  const [validationInput, setValidationInput] = useState({                                                                  // Стейт валидируемый инпут
    name: '',
    value: ''
  });
  const [enableValidation, setEnableValidation] = useState({ ...inputs });                                                  // Стейт состояния валидации инпутов выполнялась/не выполнялась
  const [isValidForm, setIsValidForm] = useState(false);                                                                    // Стейт состояния форма валидна
  const [validationErrors, setValidationErrors] = useState({});                                                             // Стейт ошибок валидации

  useEffect(() => {
    const enableFormValidation = Object.keys(enableValidation).every(key => {
      return enableValidation[key];
    });

    if (enableValidation[validationInput.name]) {
      setValidationErrors({
        ...validationErrors,
        ...validateData(validationInput)
      })
    }

    if (enableFormValidation) {
      setEnableValidation({
        ...enableValidation,
        form: true
      });
    }
  }, [validationInput]);

  useEffect(() => {
    const emptyValidationErrors = Object.keys(validationErrors).every(key => {
      return !validationErrors[key];
    });
    enableValidation.form && emptyValidationErrors ? setIsValidForm(true) : setIsValidForm(false);
  }, [validationErrors]);

  // useEffect(() => {
  //   Object.keys(enableValidation).forEach(key => {
  //     setEnableValidation({
  //       ...enableValidation,
  //       [key]: false
  //     });
  //   });
  // }, []);

  useEffect(() => {
    setIsValidForm(false);
  }, []);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value
    });
    setEnableValidation({
      ...enableValidation,
      [name]: true
    });
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