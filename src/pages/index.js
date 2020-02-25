import React from "react"


import Layout from "../components/layout"
import SEO from "../components/seo"
import MondayForm from "./../components/MondayForm"



const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <MondayForm />
    </Layout>
  )
}

export default IndexPage

// {
//   boards(ids: 258582817) {
//     items {
//       id
//       name
//       group {
//         id
//       }
//       column_values {
//         id
//         title
//         text
//         value
//       }
//     }
//   }
// }

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "SET_EMAIL": {
//       return {
//         ...state,
//         email: action.email,
//       }
//     }
//     case "SET_PHONE": {
//       return {
//         ...state,
//         phone: action.phone,
//       }
//     }
//     case "SET_TEXT": {
//       return {
//         ...state,
//         text: action.text,
//       }
//     }
//     case "SET_NAME": {
//       return {
//         ...state,
//         name: action.name,
//       }
//     }
//   }
// }
