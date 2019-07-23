import React from "react"

const Pizza = (props) => {
  let {id,topping,size,vegetarian} = props
  return(
    <tr>
      <td>Topping: {topping}</td>
      <td>Size: {size}</td>
      <td>{vegetarian ? "Vegetarian" : "Not Vegetarian"}</td>
      <td><button type="button" className="btn btn-primary" onClick={()=>props.editButton(id)} >Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
