import axios from 'axios';
import {CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const FormCheckOut= () => {

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });


    if(!error) {

      const { id } = paymentMethod;

      try {
        const { data } = await axios.post('http://localhost:3001/api/checkout', {
          id: id,
          amount: (10 * 100) // son 10 dólares
      });
      
      console.log(data)
      
      elements.getElement(CardElement).clear();
      } catch(error) {
        console.log(error)
      }
    } else {
      console.log("Hay un error en el handleSubmit")
    }
  }

  return(
    <form onSubmit={(e) => handleSubmit(e)} style={{width: "20em", border: "1px solid black"}} >
      <h4 style={{display: "flex", justifyContent: "center"}}>Price: $10</h4>
      <CardElement />
      <button>
        Buy
      </button>
    </form>
  );
}

export default FormCheckOut;