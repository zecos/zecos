import React from 'react'
import { Radio } from '@zecos/input-basic'

const Example = () => {
  const { FavoriteFlavorOfIceCream, FavoriteFlavorOfIceCreamDisplay } = Radio({
    init: 'chocolate',
    name: "favoriteFlavorOfIceCream"
  })

  return (
    <div>
      <FavoriteFlavorOfIceCream
        options={{
          "Rocky Road": "rockyroad",
          "Chocolate": "chocolate",
          "Vanilla": "vanilla",
        }}
      />
      <FavoriteFlavorOfIceCreamDisplay />
    </div>
  )
}

export default Example