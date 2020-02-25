import PropTypes from "prop-types"
import React from "react"

import THCLogo from "./THCLogo"

const Header = () => (
  <header
    style={{
      background: `transparent`,
      marginBottom: `1.45rem`,
      padding: `2rem 1.0875rem`,
      position: `relative`,
    }}
  >
    <div
      style={{
        margin: `0`,
        position: `absolute`,
        width: `200px`,
        height: `200px`,
        left: `50%`,
        marginLeft: `-100px`,
        top: `10%`,
        zIndex: `10`,
      }}
    >
      <a
        href="https://thclabelsolutions.com"
        style={{
          color: `white`,
          textDecoration: `none`,
        }}
      >
        <THCLogo alt="The House of Custom Logo" />
      </a>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
