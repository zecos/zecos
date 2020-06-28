import React from 'react'
import { Checkbox, GroupLayout } from '@zecos/input-basic'

const Example = () => {
  const { BandsILike, BandsILikeDisplay } = GroupLayout({
    name: "bandsILike",
    items: [
      Checkbox({
        name: "blink182",
        init: false,
      }),
      Checkbox({
        name: "sum41",
        init: false,
      }),
      Checkbox({
        name: "redHotChiliPeppers",
        init: false,
      }),
    ],
    validate: (items) => {
      const totalLiked = items.reduce((acc, item) => acc + Number(item.state.value))
      if (totalLiked > 2) {
        return [new Error("Pick no more than 2.")]
      }
      return []
    }
  })
  
  return (
    <div>
      <BandsILike />
      <br />
      <BandsILikeDisplay />
    </div>
  )
}

export default Example