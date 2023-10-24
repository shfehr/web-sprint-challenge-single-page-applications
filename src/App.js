
import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import * as yup from 'yup'
import axios from "axios";



const style = { margin: '1rem', padding: '0.5rem', border: '2px solid black'}

const errorMessage = {
  usernameMin: 'name must be at least 2 characters',
}

const initialErrors = {
  username: '',
  size: '',
  specialText: '',
}

const initialFormValues = {
  username: '',
  size: '',
  pepperoni: '',
  mushrooms: '',
  onions: '',
  extracheese:'',
  specialText: '',
}

// const userSchema = yup.object().shape({
//   username : yup
//   .string()
//   .trim()
//   // .required(errorMessage.usernameRequired)
//   .min(2, errorMessage.usernameMin),
//   // 'size-dropdown': yup
//   // .oneOf(['','small', 'medium', 'large']),
//   // 'special-text': yup
//   // .string()
//   // .trim(),
//   // 'onion':yup
//   // .boolean(),
//   // 'pepperoni':yup
//   // .boolean(),
//   // 'mushrooms':yup
//   // .boolean(),
//   // 'extra-cheese':yup
//   // .boolean()
// })

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

export default function App()  {



const [values, setValues] = useState(initialFormValues)

const [formErrors, setFormErrors] = useState(initialErrors)

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

const onChange = evt => { 
  // evt.persist();
  //   validateChange(evt);
  //   setValues({
  //     ...values,
  //     [evt.target.name]:
  //       evt.target.type === "checkbox" ? evt.target.checked : evt.target.value,
  //   });
let { type, name, value, checked} = evt.target

// value = type === 'checkbox' ? checked : value
console.log(name, value)
setValues({...values, [name]: value })
// console.log(evt)

  // if (evt.target.id === 'name-input') {
  //   setValues((prevState) =>({...prevState, username: evt.target.value }))
  //   // validateChange(evt.target)
  // }
  // if (evt.target.id === 'size-dropdown') {
  //   setValues((prevState) =>({...prevState, size: evt.target.value}))
  // }

  // if (evt.target.id ==='special-text') {
  //   setValues((prevState) =>({...prevState, specialText: evt.target.value}))
  // }
  // setValues({...values, [name]: value })

  }

  function Order(props) {
    const onSubmit = evt => {
      evt.preventDefault()
      axios.post('https://reqres.in/api/orders', values)
        .then(response => {
          console.log(response.data)
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
        <p>{values.username}</p>
        <form  onSubmit={onSubmit} id="pizza-form">
          <div>
            <label>Name for order: <br />
              <input 
                value = {values.username}
                onChange = {onChange}
                id="name-input" 
                name="username" 
                type="text" 
                placeholder="Type Name" />
                <br />
            </label>
          <div>
            <label>Size of pizza: <br /></label>
              <select
                value = {values.size}
                // onChange = {onChange}
                id="size-dropdown" 
                name="size-dropdown">
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
              // onChange = {onChange}
              name = "pepperoni"
              value = "pepperoni"
              type="checkbox" />
              Pepperoni
            </label>
            <label>
              <input
              checked = {values.mushrooms}
              // onChange = {onChange}
              name = "mushrooms"
              value = "mushrooms" 
              type="checkbox" />
              Mushrooms
            </label>
            <label>
              <input
              checked = {values.onions}
              // onChange = {onChange}
              value = "onions"
              name = "onions"
              type="checkbox" />
              Onions
            </label>
            <label>
              <input
              checked = {values.extra_cheese}
              // onChange = {onChange} 
              name = "extra_cheese"
              value = "extra_cheese"
              type="checkbox" />
              Extra Cheese
            </label> 
          </div>
          <div>
            <label>Special Instructions: <br />
              <input 
                value = {values.specialText}
                // onChange = {onChange}
                id="special-text" 
                name="special-text" 
                type="text" 
                placeholder="Special requests?" 
                style={{width: '300px', height: "50px"}}/>
                <br />
            </label>
          </div>
        </div> 
          
          <input type="submit" />   
        </form>
    </div>
    </div>
    )
  }

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
