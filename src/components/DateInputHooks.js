import React, { useState, useEffect, useRef } from "react";
import { Box, Calendar, Drop, Keyboard, TextInput } from "grommet";

// Yes, these are for the odd but conventional U.S. way of representing dates.
const MONTHS = ["[2-9]", "0[1-9]", "1[0-2]"];
const DAYS = ["[4-9]", "0[1-9]", "[1-2][0-9]", "3[0-1]"];
const MONTH_REGEXP = new RegExp(MONTHS.map(m => `^${m}$`).join("|"));
const MONTH_DAY_REGEXP = new RegExp(
  DAYS.map(d => MONTHS.map(m => `^${m}/${d}$`).join("|")).join("|")
);
const MONTH_DAY_YEAR_REGEXP = new RegExp("^(\\d{1,2})/(\\d{1,2})/(\\d{4})$");

const DateInputHooks = ({ text, setText }) => {
  const [focusInput, setFocusInput] = useState(null)
  const [active, setActive] = useState(null)
  const [date, setDate] = useState("")

  const textInputRef = useRef()

  useEffect(() => {
    if (focusInput) {
      const element = document.getElementById("date-input");
      element.focus();
    }
  }, [focusInput])

  const onFocus = () => {
    if (!focusInput) {
       setActive(true) 
    } else {
      setFocusInput(false);
    }
  };

  const onInput = event => {
    let {
      target: { value }
    } = event;
    let date;
    const match = value.match(MONTH_DAY_YEAR_REGEXP);
    if (match) {
      date = new Date(
        match[3],
        parseInt(match[1], 10) - 1,
        match[2]
      ).toISOString();
    } else if (value.length > text.length) {
      // never add characters if the user is backspacing
      // add trailing '/' when it looks appropriate
      if (value.match(MONTH_REGEXP)) {
        value = `${value}/`;
      } else if (value.match(MONTH_DAY_REGEXP)) {
        value = `${value}/`;
      }
    }
    setText(value)
    setDate(date)
    setActive(true)
  };

  const onSelect = isoDate => {
    const date = new Date(isoDate);
    const month = date.getMonth() + 1
    const day = date.getDate()
    const text = `${date.getFullYear()}-${ ('0' + month).slice(-2) }-${ ('0' + day).slice(-2) }`;
    setText(text)
    setDate(date)
    setActive(false)
    setFocusInput(true);
  };

    return (
      <Box margin={{ top: "xsmall", bottom: "xsmall"}}>
        <Keyboard onDown={() => setActive(true)}>
          <TextInput
            ref={textInputRef}
            id="date-input"
            placeholder="YYYY/MM/DD"
            value={text}
            onInput={onInput}
            onFocus={onFocus}
            // onBlur={onBlur}
          />
        </Keyboard>
        {active ? (
          <Drop
            target={textInputRef.current}
            align={{ top: "bottom", left: "left" }}
            onClose={() => setActive(false)}
          >
            <Box pad="small">
              <Calendar size="small" date={date} onSelect={onSelect} />
            </Box>
          </Drop>
        ) : null}
      </Box>
    );
  }

export default DateInputHooks
