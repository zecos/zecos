import React from 'react'
import { Checkbox, SimpleFormLayout, GroupLayout, Text, TextArea,
  Select, Slider, Radio } from '@zecos/input-basic'
import { validateName } from '@zecos/validate'

const Example = () => {
  const bands = GroupLayout({
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
  
  const { MyForm, MyFormDisplay } = SimpleFormLayout({
    name: "myForm",
    items: [
      Text({
        name: "firstName",
        init: "Fred",
      }),
      TextArea({
        validate: validateName,
        init: 'I am a pretty cool dude...',
        name: "describeYourself"
      }),
      Select({
        init: 'blue',
        name: "favoriteColor",
        props: {
          options: {
            "Red": "red",
            "Blue": "blue",
            "Purple": "purple",
            "Black": "black",
          }
        }
      }),
      Slider({
        init: 0,
        name: "angle"
      }),
      Checkbox({
        init: false,
        name: "pottyTrained"
      },
      Radio({
        init: 'chocolate',
        name: "favoriteFlavorOfIceCream",
        props: {
          options: {
            "Rocky Road": "rockyroad",
            "Chocolate": "chocolate",
            "Vanilla": "vanilla",
          }
        }
      })),
      bands,
    ]
  })
  
  return (
    <div>
      <MyForm
        onSubmit={e => {
          e.preventDefault()
          window.alert("submitted!")
        }}
      />
      <br />
      <MyFormDisplay />
    </div>
  )
}

export default Example