import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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

const OrderForm = () => (
  <S.Container>
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={Schema}
      onSubmit={(e) => console.log(e)}
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
        <S.Form autoComplete onSubmit={handleSubmit}>
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
              onChange={(e) => setFieldValue('file', e.currentTarget.files[0])}
            />
          </S.FormField>
          {errors.csv && <S.Error>{errors.csv}</S.Error>}
          <S.Button>Upload</S.Button>
        </S.Form>
      )}
    </Formik>
  </S.Container>
);

export default OrderForm;
