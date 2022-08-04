import swal from 'sweetalert'
export default function ChangeRating(props) {
    return (
      <input
        type="number"
        step="0.1"
        min="0"
        max="5"
        value={props.rating}
        onChange={(e) => {
          if (e.target.value > 5)
            return swal("Por favor solo escriba numeros del 0 al 5", "Se aceptan numeros decimales", "error");
          return props.handleRating(e.target.value);
        }}
      />
    );
  }
  
