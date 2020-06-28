import React from "react"
import { RadioInput} from "@zecos/input-mui"

const Example = () => {
  const {FavoriteFlavor, FavoriteFlavorDisplay} = RadioInput({
    init: "rockyroad",
    name: "favoriteFlavor",
    label: "Favorite Flavor of Ice Cream",
  })

  return (
    <>
    <form className="form">
      <FavoriteFlavor
        options={{
          "Rocky Road": "rockyroad",
          Chocolate: "chocolate",
          Vanilla: "vanilla",
        }}
      />
      <FavoriteFlavorDisplay />
    </form>
    <br />
    {/* display the data */}
    </>
  )
}
 
export default Example