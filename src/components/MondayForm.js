import React, { useState } from "react"
import { CheckBox, Form, Select, TextInput, TextArea } from "grommet"
import styled from "styled-components"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { ReCaptcha } from "react-recaptcha-v3"

import DateInputHooks from "./DateInputHooks"
import useForm from "./../hooks/useForm"

const CREATE_ITEM = gql`
  mutation Create_item($item_name: String!, $column_values: JSON!) {
    create_item(
      board_id: 467857621
      group_id: "topics"
      item_name: $item_name
      column_values: $column_values
    ) {
      id
    }
  }
`

const StyledForm = styled(Form)`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 1.5rem 3rem;
`

const InnerFormContainer = styled.div`
  display: block;

  @media screen and (min-width: 768px) {
    display: grid;
    padding: 1rem;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3rem;
  }
`

const LeftFormSection = styled.section``

const RightFormSection = styled.section`
  button {
    width: 100%;
    margin: 0.3rem 0;

    svg {
      fill: #808285;
      stroke: #808285;
    }
  }

  textarea {
    margin: 0.3rem 0;
    height: 50px;
  }
`

const StyledButton = styled.div`
  margin: 1rem 0;
  text-align: center;

  button {
    background-color: #232323;
    color: #ffffff;
    border: none;
    border-radius: 7.5px;
    padding: 0.75rem 3rem;
    box-shadow: 4px 6px 6px rgba(35, 31, 32, 0.6);
    cursor: pointer;
  }
`

const StyledInput = styled(TextInput)`
  border: 1px solid #bcbec0;
  margin: 0.3rem 0;
`

const StyledCheckBox = styled.div`
  label {
    margin: 0.4rem 0;
  }
`

const SuccessContainer = styled.div`
  display: flex;
  text-align: center;
  min-height: 400px;
  align-items: center;
  justify-content: center;

  div {
    margin: 0 auto;

    a {
      color: #497638;
    }
  }
`

const verifyCallback = recaptchaToken => {
  // Here you will get the final recaptchaToken!!!
  console.log(recaptchaToken, "<= recaptcha")
}

const MondayForm = () => {
  const {
    inputs,
    handleChange,
    handleUnitChange,
    handleChecked,
    resetForm,
  } = useForm({
    companyName: "",
    fullName: "",
    phone: "",
    email: "",
    operatingState: "",
    companyType: "",
    productInterest: {
      Labels: false,
      Packaging: false,
      Print: false,
      Design: false,
      Custom: false,
      Equipment: false,
      Other: false,
    },
    MUV: "",
    notes: "",
  })

  const [checkedID, setCheckedID] = useState([])
  const [text, setText] = useState("")
  const [success, setSuccess] = useState(false)

  const checkedToID = () => {
    const arr = []

    Object.keys(inputs.productInterest).map(key => {
      if (inputs.productInterest[key] === true) {
        arr.push(key)
      }
    })
    setCheckedID(arr)
  }

  const formatDateToISO = () => {
    let t = new Date()
    let z = t.getTimezoneOffset() * 60 * 1000
    let tLocal = t - z
    let tLocalDate = new Date(tLocal)
    let iso = tLocalDate.toISOString()
    return iso
  }

  const [createItem, { error, loading, data }] = useMutation(CREATE_ITEM, {
    variables: {
      item_name: inputs.fullName,
      column_values: JSON.stringify({
        company: inputs.companyName,
        date: {
          date: formatDateToISO().split("T")[0],
          changed_at: formatDateToISO(),
        },
        phone: inputs.phone,
        email0: {
          email: inputs.email,
          text: inputs.email,
          changed_at: formatDateToISO(),
        },
        text: inputs.operatingState,
        dropdown: {
          labels: checkedID,
        },
        dropdown7: {
          labels: [inputs.MUV],
        },
        date0: {
          date: text,
          changed_at: formatDateToISO(),
        },
        notes: {
          text: inputs.notes,
        },
      }),
    },
  })

  return (
    <StyledForm
      onSubmit={async e => {
        e.preventDefault()
        try {
          const res = await createItem()
          console.log(res)
          !error && resetForm()
          if (!error) {
            resetForm()
            setSuccess(true)
          }
        } catch (err) {
          console.error(err)
        }
      }}
    >
      <ReCaptcha
        sitekey="6LcihsAUAAAAACpTcpAas2OCVzxxG6NF-_b8nF3E"
        action="form"
        verifyCallback={verifyCallback}
      />
      {success ? (
        <SuccessContainer>
          <div>
            <h4>Thanks for filling out our form!</h4>
            <h4>A customer service representative will be in touch.</h4>
            <h4>
              Visit our site in the mean time
              <a href="https://thclabelsolutions.com"> here</a>.
            </h4>
          </div>
        </SuccessContainer>
      ) : (
        <>
          <InnerFormContainer disabled={loading} aria-busy={loading}>
            <LeftFormSection>
              <label htmlFor="company-name" name="company-name">
                Company Name
              </label>
              <StyledInput
                id="company-name"
                name="companyName"
                type="text"
                placeholder="THC Solutions"
                value={inputs.companyName}
                onChange={handleChange}
                required
              />
              <label htmlFor="full-name" name="full-name">
                Full Name
              </label>
              <StyledInput
                id="full-name"
                name="fullName"
                placeholder="Mary Jane"
                value={inputs.fullName}
                onChange={handleChange}
                required
              />
              <label htmlFor="phone" name="phone">
                Phone
              </label>
              <StyledInput
                id="phone"
                name="phone"
                type="tel"
                placeholder="800-842-4773"
                value={inputs.phone}
                onChange={handleChange}
                required
              />
              <label htmlFor="email" name="email">
                Email
              </label>
              <StyledInput
                id="email"
                name="email"
                type="email"
                placeholder="sales@thclabelsolutions.com"
                value={inputs.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="operating-state" name="operating-state">
                Operating State
              </label>
              <StyledInput
                id="operating-state"
                name="operatingState"
                type="text"
                placeholder="ex: California"
                value={inputs.operatingState}
                onChange={handleChange}
              />
              <label htmlFor="company-type" name="company-type">
                Company Type
              </label>
              <StyledInput
                id="company-type"
                name="companyType"
                type="text"
                placeholder="ex: manufacturer"
                value={inputs.companyType}
                onChange={handleChange}
              />
            </LeftFormSection>
            <RightFormSection>
              <StyledCheckBox>
                <label name="product-interest">Product Interest:</label>
                <CheckBox
                  name="Labels"
                  checked={inputs.productInterest.Labels}
                  label="Labels"
                  onChange={handleChecked}
                />
                <CheckBox
                  name="Packaging"
                  checked={inputs.productInterest.Packaging}
                  label="Packaging"
                  onChange={handleChecked}
                />
                <CheckBox
                  name="Print"
                  checked={inputs.productInterest.Print}
                  label="Print & Application"
                  onChange={handleChecked}
                />
                <CheckBox
                  name="Design"
                  checked={inputs.productInterest.Design}
                  label="Design"
                  onChange={handleChecked}
                />
                <CheckBox
                  name="Custom"
                  checked={inputs.productInterest.Custom}
                  label="Custom Solutions"
                  onChange={handleChecked}
                />
                <CheckBox
                  name="Equipment"
                  checked={inputs.productInterest.Equipment}
                  label="Capital Equipment"
                  onChange={handleChecked}
                />
                <CheckBox
                  name="Other"
                  checked={inputs.productInterest.Other}
                  label="Other"
                  onChange={handleChecked}
                />
              </StyledCheckBox>
              <label htmlFor="monthly-unit-volume" name="monthly-unit-volume">
                Monthly Unit Volume
              </label>
              <Select
                id="monthly-unit-volume"
                name="MUV"
                options={["Below 10K", "10K+", "30K+", "50K+", "75K+", "100K+"]}
                replace={false}
                value={inputs.MUV}
                onChange={handleUnitChange}
              />
              <br />
              <label htmlFor="date-input" name="monthly-unit-volume">
                Date When You Need Product
              </label>
              <DateInputHooks
                style={{ margin: `.3rem 0` }}
                text={text}
                setText={setText}
              />
              <label htmlFor="notes" name="notes">
                Additional Notes
              </label>
              <TextArea
                id="notes"
                name="notes"
                placeholder="Additional notes..."
                value={inputs.notes}
                onChange={handleChange}
              />
            </RightFormSection>
          </InnerFormContainer>
          <StyledButton>
            <button label="Contact Us!" type="submit" onClick={checkedToID}>
              Contact Us!
            </button>
          </StyledButton>
        </>
      )}
    </StyledForm>
  )
}

export default MondayForm
