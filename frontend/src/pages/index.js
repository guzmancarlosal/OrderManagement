import React from 'react';
import * as S from './styles';
import Header from 'components/Header';
import OrderForm from 'components/OrderForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => (
  <S.Layout>
    <Header />
    <S.Container>
      <OrderForm toast={toast} />
    </S.Container>
    <ToastContainer />
  </S.Layout>
);

export default Home;
