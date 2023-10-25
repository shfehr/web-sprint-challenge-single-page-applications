
import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import * as yup from 'yup'
import axios from "axios";



const style = { margin: '1rem', padding: '0.5rem', border: '2px solid black'}

const errorMessage = {
  orderNameMin: 'name must be at least 2 characters',
}

const initialErrors = {
  orderName: '',
  // size: '',
  // specialText: '',
}



const initialFormValues = {
  orderName: '',
  size: '',
  pepperoni: '',
  mushrooms: '',
  onions: '',
  extraCheese: '',
  specialText: '',
  glutenFree: '',
}

const userSchema = yup.object().shape({
  orderName : yup
  .string()
  //.required(errorMessage.usernameRequired)
  .min(2, errorMessage.orderNameMin),
 })

function Home(props) {
  return <h2 style={{ ...style, borderColor: 'red'}}>The Home Screen</h2>
}
function Checklist() {
  const [checklistItems, setChecklistItems] = useState([
    {id: 1, label: 'Pepperoni', isChecked: false },
    {id: 2, label: 'Onion', isChecked: false }, 
    {id: 3, label: 'Mushrooms', isChecked: false }, 
    {id: 4, label: 'Extra Cheese', isChecked: false },  
  ]);

  const handleCheckboxChange = (itemId) => {
    setChecklistItems((prevItems) => 
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isChecked: !item.isChecked } : item 
      )
    )
  }
}

function Order(props) {
  const [formErrors, setFormErrors] = useState(initialErrors)
  const [values, setValues] = useState(initialFormValues)

  // console.log(initialErrors)
  
  const onChange = evt => { 
    // let { type, name, value, checked} = evt.target

    if (evt.target.type === "checkbox") {
      setValues({...values, [evt.target.name]: !values[evt.target.name]})
    } else {
      setValues({...values, [evt.target.name]: evt.target.value})
    }

    if (evt.target.name === "name") {
      yup
      .reach(userSchema, evt.target.name)
      .validate(evt.target.value)
      .then(() => setFormErrors({ ...formErrors, [evt.target.name]: ''}))
      .catch((err) => setFormErrors({ ...formErrors, [evt.target.name]: err.errors[0]}))

    }
  }

  //   value = type === 'checkbox' ? checked : value
  //   setValues({...values, [name]: value })

  // }

  const onSubmit = evt => {
    evt.preventDefault()
    // console.log(values)
    yup
      .reach(userSchema, evt.target.name)
      .validate(evt.target.value)
      .then(() => setFormErrors({ ...formErrors, [evt.target.name]: ''}))
      .catch((err) => setFormErrors({ ...formErrors, [evt.target.name]: err.errors[0]}))
    console.log(formErrors)
    axios.post('https://reqres.in/api/orders', values)
      .then(response => {
        setValues(initialFormValues)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
   <div> 
    <h2 style={{ ...style, borderColor: 'red'}}>Get yourself a pie.</h2>
    
    <div>
      <h2>Build your own pizza here!</h2>
      {/* <p>{values.username}</p> */}
      <form  onSubmit={onSubmit} id="pizza-form">
        <div>
          <label>Name for order: <br />
            <input 
              value = {values.orderName}
              onChange = {onChange}
              id="name-input" 
              name="orderName" 
              type="text" 
              placeholder="Type Name" />
              {formErrors.orderName && (<p>{formErrors.orderName}</p>)}
              <br />
          </label>
        <div>
          <label>Size of pizza: <br /></label>
            <select
              value = {values.size}
              onChange = {onChange}
              id="size-dropdown" 
              name="size">
              <option value="">-- Select Size --</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>  
            </select>
        </div>
        <div>
          <label>
            <input 
            checked = {values.pepperoni}
            onChange = {onChange}
            name = "pepperoni"
            value = "pepperoni"
            type="checkbox" />
            Pepperoni
          </label>
          <label>
            <input
            checked = {values.mushrooms}
            onChange = {onChange}
            name = "mushrooms"
            value = "mushrooms" 
            type="checkbox" />
            Mushrooms
          </label>
          <label>
            <input
            checked = {values.onions}
            onChange = {onChange}
            value = "onions"
            name = "onions"
            type="checkbox" />
            Onions
          </label>
          <label>
            <input
            checked = {values.extraCheese}
            onChange = {onChange} 
            name = "extraCheese"
            value = "extraCheese"
            type="checkbox" />
            Extra Cheese
          </label> 
        </div>
        <div>
          <label>Special Instructions: <br />
            <input 
              value = {values.specialText}
              onChange = {onChange}
              id="special-text" 
              name="specialText" 
              type="text" 
              placeholder="Special requests?" 
              style={{width: '300px', height: "50px"}}/>
              <br />
          </label>
        </div>
        <div>
          <fieldset>
            <legend>Would you like a gluten-free crust:</legend>
            <label>
              <input 
                checked = {values.glutenFree == 'GF YES'}
                onChange = {onChange}
                type="radio" 
                name="glutenFree" 
                value="GF YES" />
                Yes
            </label>
            <label>
              <input 
                checked = {values.glutenFree == 'GF NO'}
                onChange = {onChange}
                type="radio" 
                name="glutenFree" 
                value="GF NO" />
                No
            </label>
          </fieldset>
        </div>
      </div> 
        
        <input name="order-button"
               id="order-button" 
               type="submit" 
              //  disabled='disabled' 
               />   
      </form>
  </div>
  </div>
  )
}
export default function App()  {

// const validateChange = (evt) => {
//   yup
//     .reach(userSchema, evt.target.name)
//     .validate(
//       evt.target.value
//     )
//     .then(() => {
//       setFormErrors({ ...formErrors, [evt.target.name]: "" });
//     })
//     .catch((error) => {
//       setFormErrors({ ...formErrors, [evt.target.name]: error.errors[0] });
//     });
// };
// function validate (evt) {
// yup.reach(userSchema, evt.target.name).validate(values)
//       .then(() => setFormErrors({ ...formErrors, [evt.target.name]: ''}))
//       .catch(() => setFormErrors({ ...formErrors, [evt.target.name]: errorMessage.errors[0]}))
// }
 

  return (
    <>
      <h1>It. Is. Always. Pizza. Time.</h1>
      <nav>
        <Link to="/">Home Screen</Link>&nbsp;
        <Link to="/pizza" id="order-pizza" >Order Now</Link>&nbsp;
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pizza" element={<Order />} />
      </Routes>
      <p>Oliver & Flower's Pizza Dreams</p>
    </>
  );
}
