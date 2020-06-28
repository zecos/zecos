import React from 'react'
import { CheckboxInput, GroupLayout } from '@zecos/input-mui'

const Example = () => {
  const { BandsILike, BandsILikeDisplay } = GroupLayout({
    name: "bandsILike",
    items: [
      CheckboxInput({
        init: false,
        name: "systemOfADown",
      }),
      CheckboxInput({
        init: false,
        name: "blink182",
      }),
      CheckboxInput({
        init: false,
        name: "sum41"
      }),
    ],
    validate: (items) => {
      const totalLiked = items.reduce((acc, item) => (
        acc + Number(item.state.value)
      ), 0)
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