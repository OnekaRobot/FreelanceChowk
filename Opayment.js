import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-publishable-key');  // Replace with your actual Stripe publishable key

const Payment = () => {
  const [amount, setAmount] = useState(0);

  const handlePayment = async () => {
    const stripe = await stripePromise;

    const { clientSecret } = await fetch('/api/payments/create-escrow-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, currency: 'usd', buyerEmail: 'buyer@example.com' }),  // Change email as needed
    }).then(res => res.json());

    // Implement your card element and payment confirmation here
    // Example: using stripe.confirmCardPayment(clientSecret)

    console.log('Payment held in escrow');
  };

  return (
    <div>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
};

export default Payment;
