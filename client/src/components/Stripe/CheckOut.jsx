import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// import FormCheckOut from './FormCheckOut';
import FormPurchase from '../FormPurchase';
const stripePromise = loadStripe('pk_test_51LPy6xFKxxhhwn5aXODvS3zdy44zruD9o4bULQXSTXCrTU0mNbBSEhcrKpslaIM7RboUws9fmz15A6ioBKFRxr1w006XWbpi7A');


function CheckOut() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <FormPurchase/>
      </Elements>
    </div>
  );
}

export default CheckOut;