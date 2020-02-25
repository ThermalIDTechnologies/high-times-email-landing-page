import { useState } from "react"

export default function useForm(initial = {}) {
  const [inputs, updateInputs] = useState(initial)
  // const [checkedID, setCheckedID] = useState({
  //   checkedID1: null,
  //   checkedID2: null,
  //   checkedID3: null,
  //   checkedID4: null,
  //   checkedID5: null,
  //   checkedID6: null,
  //   checkedID7: null,
  // })

  function handleChange(e) {
    updateInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }

  function handleUnitChange(e) {
    updateInputs({
      ...inputs,
      [e.target.name]: e.value,
    })
  }

  function handleChecked(e) {
    updateInputs({
      ...inputs,
      productInterest : {
        ...inputs.productInterest,
        [e.target.name]: e.target.checked,
      }
    })
  }

  function resetForm() {
    updateInputs(initial)
  }

  return {
    inputs,
    handleChange,
    handleUnitChange,
    handleChecked,
    resetForm,
  }
}