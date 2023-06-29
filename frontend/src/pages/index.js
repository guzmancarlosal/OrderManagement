import React from 'react';
import * as S from './styles';
import Header from 'components/Header';
import OrderForm from 'components/OrderForm';

const Home = () => (
  <S.Layout>
    <Header />
    <S.Container>
      <OrderForm />
    </S.Container>
  </S.Layout>
);

export default Home;
