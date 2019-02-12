
'use strict'

const assert = require('chai').assert

const genericValidator = require('./validators')

describe('Healthera => Validators', () => {
  var currValidator = []
  var inputArr = []

  beforeEach(() => {
    inputArr.length = 0
  })

  describe('alphabetical', () => {
    before(() => {
      currValidator.push('aplhabetical')
    })

    after(() => {
      currValidator.length = 0
    })

    it('returned value is true if the input is pure string, irrespective of case sensitivity', () => {
      inputArr.push('testword', 'testWord', 'TESTWORD')
      inputArr.forEach((elem) => {
        assert.strictEqual(genericValidator(elem, currValidator), true, 'failed for input => ' + elem)
      })
    })

    it('returned value is false if input is type other than string or is string containing non alphabetical characters', () => {
      inputArr.push(false, 123, {}, [], undefined, null, '', 'sds0', "sd<script src=''></script>")
      inputArr.forEach((elem) => {
        assert.strictEqual(genericValidator(elem, currValidator), false, 'failed for input => ' + elem)
      })
    })
  })

  describe('natural-number', () => {
    before(() => {
      currValidator.push('natural_number')
    })

    after(() => {
      currValidator.length = 0
    })

    it('returned value is true if the input is natural number or string containing natural numbers only', () => {
      inputArr.push(12, '12', 2 * 3, 20 / 4, 3 + 4, 5 - 2, Math.pow(2, 3))
      inputArr.forEach((elem) => {
        assert.strictEqual(genericValidator(elem, currValidator), true, 'failed for input => ' + elem)
      })
    })

    it('returned value is false if input is of type number but not natural, not of type number or string containing non-numeric characters', () => {
      inputArr.push(12.4, -1, 0, false, {}, [], undefined, null, '', 'sds0', "sd<script src=''></script>", '12.4', '2^3', '4/5', '2*3')
      inputArr.forEach((elem) => {
        assert.strictEqual(genericValidator(elem, currValidator), false, 'failed for input => ' + elem)
      })
    })
  })

  describe('email-id', () => {
    before(() => {
      currValidator.push('email_id')
    })

    after(() => {
      currValidator.length = 0
    })

    // allowed formats referred from wiki
    it('returned value is true if the input is valid email format', () => {
      inputArr.push(
        'prettyandsimple@example.com', // variations taken from wiki
        'very.common@example.com.in',
        'disposable.style.email.with+symbol@example.com',
        'other.email-with-dash@example.com',
        'fully-qualified-domain@example.com',
        'user.name+tag+sorting@example.com', // will go to user.name@example.com inbox
        'x@example.com', // one-letter local-part
        // '"very.(),:;<>[]\".VERY.\"very@\\ \"very\".unusual"@strange.example.com',
        'example-indeed@strange-example.com',
        '1234567890123456789012345678901234567890123456789012345678901234+x@example.com' // **************(too long)
        // "admin@mailserver1",
        // "#!$%&'*+-/=?^_`{}|~@example.org",
        // '"' + '()<>[]:,;@\\\"!#$%&' + "'-/=?^_`{}| ~.a" + '"@example.org',
        // "example@s.solutions", //currently we are not allowing domain
        // "user@localserver",
        // "user@[2001:DB8::1]"
      )
      inputArr.forEach((elem) => {
        assert.strictEqual(genericValidator(elem, currValidator), true, 'failed for input => ' + elem)
      })
    })

    // disallowed format referred from wiki
    it('returned value is false if input is a valid email format', () => {
      inputArr.push(
        'Abc.example.com', // (no @ character)
        'A@b@c@example.com', // (only one @ is allowed outside quotation marks)
        'a"b(c)d,e:f;g<h>i[j\\k]l@example.com', // (none of the special characters in this local-part are allowed outside quotation marks)
        'just"not"right@example.com', // (quoted strings must be dot separated or the only element making up the local-part)
        'this is"not\\allowed@example.com', // (spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash)
        'this\\ still\\"not\\allowed@example.com', // (even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes)
        'john..doe@example.com', // (double dot before @)
        'example@localhost', // (sent from localhost) with caveat: Gmail lets this through, Email address#Local-part the dots altogether
        'john.doe@example..com', // (double dot after @)
        '" "@example.org', // (space between the quotes)
        '"very.unusual.@.unusual.com"@example.com', //* *******************RFC allows this by the way */
        'Duy', //
        ' very.common@example.com.in',
        'very.common@example.com.in ',
        ''
      )
      inputArr.forEach((elem) => {
        assert.strictEqual(genericValidator(elem, currValidator), false, 'failed for input => ' + elem)
      })
    })
  })
})
