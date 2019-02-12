/**
 * To be used as middleware in ORM for database
 * Use to transform an attribute value fetched from db
 */

'use strict'

const setterMap = {}

/**
 * replace html characters in input with escaped sequence
 * @param {*} val
 */
setterMap['html_encode'] = (val) => {
  return String(val).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/**
 * sets wrong cased names correct - eg: "eveLyN lOVe" to "Evelyn Love"
 * @param {string} value
 */
setterMap['name_format'] = (value) => {
  if (value.length > 1) {
    value = value.toLowerCase()
    // value = value.replace(/([.\s][a-z])/g, "$1");
    let innerArr = []
    let flag = true
    let currChar
    for (let i = 0; i < value.length; i++) {
      currChar = value[i]
      if (flag) {
        innerArr.push(currChar.toUpperCase())
        flag = false
      } else {
        innerArr.push(currChar)
      }
      if (currChar === ' ' || currChar === '.' || currChar === ',') {
        flag = true
      }
    }
    value = innerArr.join('')
  } else if (value.length === 1) {
    value = value.toUpperCase()
  }

  return value
}

module.exports = {
  setters: (value, setterArr) => {
    for (let setterKey of setterArr) {
      value = setterMap[setterKey](value)
    }
    return value
  },
  asyncSetters: async (value, setterArr) => {
    for (let setterKey of setterArr) {
      value = await setterMap[setterKey](value)
    }
    return value
  }
}
