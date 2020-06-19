import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
    username: '',
    password: ''    
  }
  const onSubmit = value => {
      console.log("Form data", value)
  }
 

const validationSchema = Yup.object({
  username: Yup.string()
  .required('Required'),
  password: Yup.string()
  .required('Required')
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
})

//Styling
const loginFormStyle = {
  display: 'flex',
  justifyContent: 'center',
};
const labelStyle = {
  fontWeight: 'bold',
  display: 'flex',
  marginBottom: '5px',
  
};
const inputStyle = {
  display: 'block',
  width: '400px',
  padding: '6 px 12px',
  fontSize: '14px',
  lineHeight: '1.5',
  
};
const formControl = {
  marginBottom: '20px'
}
const error = {
  color: 'red'
}
export default function LoginForm() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
    // validate
  })
  // console.log('form touched', formik.touched)
  // console.log('form errors', formik.errors)
  // console.log('Form values', formik.values);
  return (
    <div style={loginFormStyle}>
      <form onSubmit={formik.handleSubmit}>
        <div className={formControl}>
        <label style={labelStyle} htmlFor="username">
          Username:
        </label>
        <input
          style={inputStyle}
          type="text"
          id="username"
          maxLength="25"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? <div className='error'>{formik.errors.username}</div> : null}
        </div>

        <div className={formControl}>
        <label style={labelStyle} htmlFor="password">
          Password:
        </label>
        <input
          style={inputStyle}
          type="text"
          id="password"
          minLength="8"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? <div className='error'>{formik.errors.username}</div> : null}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
