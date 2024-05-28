"use client";
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const Register = () => {
  const { data: session, status } = useSession();
  const [accountLink, setAccountLink] = useState(null);
  const [accountStatus, setAccountStatus] = useState('loading');
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      setAccountStatus('complete'); // or whatever logic to check the account status
    } else if (status === 'unauthenticated') {
      router.push('/login'); // redirect to login if not authenticated
    }
  }, [status, router]);

  const handleSubscribe = async () => {
    if (status !== 'authenticated') {
      console.error('User is not authenticated');
      return;
    }

    // Get the priceId from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const priceId = urlParams.get('priceId');

    if (!priceId) {
      console.error('Price ID is not provided');
      return;
    }

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session.user.email, priceId }),
      });

      const { id } = await response.json();

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: id });
      if (error) {
        console.error("Stripe Checkout Error:", error);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  if (status === 'loading' || accountStatus === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Subscribe to a Plan</h1>
      <button onClick={handleSubscribe}>Subscribe to Plan</button>
    </div>
  );
};

export default Register;
