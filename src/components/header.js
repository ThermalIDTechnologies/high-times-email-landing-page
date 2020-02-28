import PropTypes from "prop-types"
import React from "react"

import THCLogo from "./THCLogo"
import { motion } from "framer-motion"

const easing = [0.6, -0.05, 0.01, 0.99]

const fadeInDown = {
  initial: {
    y: -60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
      delay: 0.2
    },
  },
}

const Header = () => (
  <motion.header
    exit={{ opacity: 0 }} 
    initial="initial" 
    animate="animate"
    style={{
      background: `transparent`,
      marginBottom: `1.45rem`,
      padding: `2rem 1.0875rem`,
      position: `relative`,
    }}
  >
    <motion.div
      whileHover={{ scale: 1.05, transition: {type: "spring", damping: 20, mass: 0.7} }}
      whileTap={{ scale: 0.95 }}
      variants={fadeInDown}
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
    </motion.div>
  </motion.header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
