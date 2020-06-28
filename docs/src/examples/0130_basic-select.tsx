import React from 'react'
import { validateName } from '@zecos/validate'
import { Select } from '@zecos/input-basic'

const Example = () => {
  const { FavoriteColor, FavoriteColorDisplay } = Select({
    init: 'blue',
    name: "favoriteColor"
  })

  return (
    <div>
      <FavoriteColor
        options={{
          "Red": "red",
          "Blue": "blue",
          "Purple": "purple",
          "Black": "black",
        }}
      />
      <FavoriteColorDisplay />
    </div>
  )
}

export default Example