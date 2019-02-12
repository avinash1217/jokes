/**
 * To be used as middleware in ORM for database
 * Use to validate an attribute value before saving to db
 * To be used for form field validation as well
 */

'use strict'

const validatorMap = {}

/**
 * validates string provided contains only alphabetical characters
 * @param {string} val
 */
validatorMap['aplhabetical'] = (val) => {
  return typeof val === 'string' && /^[a-zA-Z]+$/.test(val)
}

/**
 * validates string provided conforms to the pattern January 09, 2009
 * @param {string} val
 */
validatorMap['dateOfBirth'] = (val) => {
  return /^[A-Za-z]+\s[0-9]{1,2},\s[0-9]{4}$/.test(val)
}

/**
 * validates string provided contains only aplhanumeric characters
 * @param {string} val
 */
validatorMap['alphaNumeric'] = (val) => {
  return typeof val === 'string' && /^[a-zA-Z0-9]+$/.test(val)
}

/**
 * ensures valid people names are allowed
 * @param {string} val
 */
validatorMap['name_only'] = (val) => {
  if (typeof val !== 'string' || !val) {
    return false
  }
  if (val.length === 1) {
    return validatorMap['aplhabetical'](val)
  }
  return /^[a-zA-Z][a-zA-Z. ,]*[a-zA-Z.]$/.test(val)
}

/**
 * validates string provided conforms to email pattern
 * @param {string} val
 */
validatorMap['email_id'] = (val) => {
  return /^\w+([!#$%&‘*+–/=?^`.{|}~-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val)
}

/**
 * validates only positive integers are allowed
 * @param {*} val
 */
validatorMap['natural_number'] = (val) => {
  return /^[1-9][0-9]*$/.test(val)
}

/**
 * validates only integers are allowed
 * @param {*} val
 */
validatorMap['integer'] = (val) => {
  return /^-?[1-9][0-9]*$/.test(val)
}

/**
 * validates descimal numbers or their subset is allowed
 * @param {*} val
 */
validatorMap['floating_number'] = (val) => {
  return /^-?[0-9]+\.?[0-9]*$/.test(val)
}

/**
 * validates postive decimals is allowed
 * @param {*} val
 */
validatorMap['positive_floating_number'] = (val) => {
  return validatorMap['floating_number'](val) && parseFloat(val) > 0
}

/**
 * validates only non-negative decimals is allowed
 * @param {*} val
 */
validatorMap['non_negative_floating_number'] = (val) => {
  return validatorMap['floating_number'](val) && parseFloat(val) >= 0
}

/**
 * ensures valid address is provided
 * @param {string} val
 */
validatorMap['address'] = (val) => {
  return /^[-0-9a-zA-Z./&`~@#()_"'., ]+$/.test(val)
}

/**
 * ensures valid pin code is provided
 * @param {*} val
 */
validatorMap['pin_code'] = (val) => {
  return /^[-0-9a-zA-Z ]+$/.test(val)
}

/**
 * validatesintegers greater than or equal to 0 are allowed
 * @param {*} val
 */
validatorMap['whole_number'] = (val) => {
  return /^[0-9]+$/.test(val)
}

/**
 * validates phone number has no unexpected characters
 * @param {string} val
 */
validatorMap['phone_number'] = (val) => {
  return /^\+?[-()0-9]+$/.test(val)
}

module.exports = (value, validatorArr) => {
  for (let validatorKey of validatorArr) {
    if (!validatorMap[validatorKey](value)) {
      return false
    }
  }
  return true
}
