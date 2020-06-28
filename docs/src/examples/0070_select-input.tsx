import React from "react"
import { SelectInput } from "@zecos/input-mui"

const SelectInputExample = () => {
  const {FavoriteColor, FavoriteColorDisplay} = SelectInput({
    init: "blue",
    name: "favoriteColor",
  })

  return (
    <>
    <form className="form">
      <FavoriteColor options={{
        Blue: "blue",
        Red: "red",
      }}/>
      <FavoriteColorDisplay />
    </form>
    <br />
    {/* display the data */}
    </>
  )
}
 
export default SelectInputExample
