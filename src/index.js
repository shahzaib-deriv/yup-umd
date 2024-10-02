import * as yup from 'yup';

window.validate = function (validationSchema, payload) {
  if (!window.yup) return console.error("Yup not found or initialized!")

  if (!yup.isSchema(validationSchema)) return console.error("First argument should be a valid Yup schema!")

  const errors = {}
  const validFields = {}


  Object.keys(validationSchema.fields).forEach(e => { validFields[e] = true; errors[e] = ""; })

  try {
    validationSchema
      .validateSync(payload, {
        abortEarly: false
      })
  } catch (e) {
    e.inner.forEach(e => {
      if (errors[e.path]) return;
      errors[e.path] = e.message;
      validFields[e.path] = false
    })
  }

  return {
    errors,
    validFields
  }
}

export default yup;
