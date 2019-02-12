'use strict'

const assert = require('chai').assert

const genericSetter = require('./setters').setters

describe('Healthera => setter', () => {
  var inputArr = []; var setterArr = []

  beforeEach(() => {
    inputArr.length = 0
  })

  describe('name format', () => {
    before(() => {
      setterArr.push('name_format')
    })

    after(() => {
      setterArr.length = 0
    })

    it('name transformed should have first cahracter Upper and rest lower', () => {
      inputArr.push('kOlp', 'KOLP', 'kolp', 'k')
      let regexObj = /^[A-Z][a-z]*$/
      inputArr.forEach((elem) => {
        assert.match(genericSetter(elem, setterArr), regexObj, 'failed to match for input => ' + elem)
      })
    })
  })
})
