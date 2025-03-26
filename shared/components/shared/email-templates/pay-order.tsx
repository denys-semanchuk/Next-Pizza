import React from 'react';

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate = ({ orderId, totalAmount, paymentUrl }: Props) => (
  <div>
    <h1>Order #{orderId}</h1>

    <p>
      Please pay for your order of <b>{totalAmount} ₽</b>. Go to{' '}
      <a href={paymentUrl}>this link</a> to make your payment.
    </p>
  </div>
);