import React, { useState } from "react";
import { Container, FormGroup, Input, Label } from "reactstrap";
function PruebaCloudinary() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Bringit");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/bringitapp/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(res);
    setImage(file.secure_url);
    console.log(file.secure_url);
    setLoading(false);
  };
  return (
    <div>
      <FormGroup>
        <Label for="exampleFile">Logo</Label>
        <Input name="file" type="file" onChange={uploadImage} />
        {loading ? (
          <h3>Cargando imagenes ....</h3>
        ) : (
          <img src={image} style={{ width: "300px" }} />
        )}
      </FormGroup>
    </div>
  );
}

export default PruebaCloudinary;
