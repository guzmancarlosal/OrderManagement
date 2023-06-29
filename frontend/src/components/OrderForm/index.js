import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import * as S from './styles';

const Schema = Yup.object().shape({
  date: Yup.date().required('Date is required'),
  vender: Yup.string()
    .min(3, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Vender name is required'),
  csv: Yup.mixed().required('CSV is required'),
});

const INITIAL_VALUES = {
  date: new Date(),
  vender: '',
  csv: null,
};

const OrderForm = ({ toast }) => {
  const [uploading, setUploading] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);

  const onSubmit = async (e) => {
    if (uploading) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('date', e.date);
    formData.append('vender', e.vender);
    formData.append('csv', e.csv);

    try {
      const {
        data: { success, errors },
      } = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (!success && errors && errors.length > 0) {
        setServerErrors(errors);
        toast.warn('Upload failed! please check errors.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      } else {
        setServerErrors(null);
        toast.success('Uploaded successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
    } catch (e) {
      toast.error('Server error!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
    setUploading(false);
  };
  return (
    <S.Container>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={Schema}
        onSubmit={onSubmit}
        validateOnChange
      >
        {({
          handleSubmit,
          setFieldValue,
          setFieldError,
          setFieldTouched,
          validateForm,
          values,
          errors,
        }) => (
          <S.Form onSubmit={handleSubmit}>
            <S.FormField>
              <S.Label>Date:</S.Label>
              <DatePicker
                selected={values.date}
                onChange={(date) => setFieldValue('date', date)}
              />
            </S.FormField>
            {errors.date && <S.Error>{errors.date}</S.Error>}
            <S.FormField>
              <S.Label>Vender:</S.Label>
              <S.Input
                value={values.vender}
                onChange={(e) => setFieldValue('vender', e.target.value)}
              />
            </S.FormField>
            {errors.vender && <S.Error>{errors.vender}</S.Error>}
            <S.FormField>
              <S.Label>CSV:</S.Label>
              <S.Input
                type='file'
                onChange={(e) => {
                  const file = e.currentTarget.files[0];
                  if (file && file.type !== 'text/csv') {
                    setFieldError('csv', 'wrong format');
                    return;
                  }
                  setFieldValue('csv', e.currentTarget.files[0]);
                }}
              />
            </S.FormField>
            {errors.csv && <S.Error>{errors.csv}</S.Error>}
            <S.Button type='submit'>
              {uploading ? 'Uploading...' : 'Upload'}
            </S.Button>
          </S.Form>
        )}
      </Formik>
      <S.ServerErrorWrapper>
        {serverErrors &&
          serverErrors.length > 0 &&
          serverErrors.map((err, index) => (
            <S.ServerError key={`error-${index}`}>
              * Error {index + 1}: {err}
            </S.ServerError>
          ))}
      </S.ServerErrorWrapper>
    </S.Container>
  );
};

export default OrderForm;
