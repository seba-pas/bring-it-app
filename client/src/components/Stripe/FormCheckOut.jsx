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
        console.log(id);
        const datos = await axios.post('http://localhost:3001/api/checkout/payment', {
          id: id,
          amount: (20 * 100) // son 20 dólares
      });
      
      console.log(datos)
      
      elements.getElement(CardElement).clear();
      
      
    } else {
      console.log("Hay un error en el handleSubmit")
    }
  }

  return(
    <form onSubmit={(e) => handleSubmit(e)} style={{width: "20em", border: "1px solid black"}} >
      <h4 style={{display: "flex", justifyContent: "center"}}>Price: $20</h4>
      <CardElement />
      <button >
        Buy
      </button>
    </form>
  );
}

export default FormCheckOut;