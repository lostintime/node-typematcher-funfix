/*
 * Copyright 2017 by TypeMatcher developers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { expect } from "chai"
import { match, matchWith } from "../lib"
import {
  caseAny, caseDefault, caseId, caseThrow, caseWhen, isNumber, isString,
  isValue
} from "typematcher"
import { Failure, Some, Success } from "funfix-core"

describe("Match DSL", function () {
  const toString = (obj: Object) => {
    try {
      return JSON.stringify(obj)
    } catch (e) {
      return obj.toString()
    }
  }

  describe("match", () => {
    it("will return first matched case value", () => {
      expect(toString(match(10)(caseId(isValue(10))).run().value()))
        .equals(toString(Some(Success(10))), "caseId returns input value if matched")

      expect(toString(match(10)(caseWhen(isString)(s => `got string ${s}`), caseWhen(isNumber)(n => `got number ${n}`)).run().value()))
        .equals(toString(Some(Success("got number 10"))), "returned first matched")

      expect(toString(match("hello")(caseWhen(isNumber)(n => ""), caseAny(v => `got value "${v}"`)).run().value()))
        .equals(toString(Some(Success('got value "hello"'))), "caseAny matches any value")

      expect(toString(match(333)(caseDefault(() => 20), caseId(isNumber)).run().value()))
        .equals(toString(Some(Success(20))), "caseDefault returns first")
    })

    it("will throw if no case matched", () => {
      expect(toString(match(10)().run().value()))
        .equals(toString(Some(Failure(new Error("message ignored as not JSON.stringified")))), "mismatch returns a failure")

      expect(toString(match(10)().run().recover(e => e.toString()).value()))
        .equals(toString(Some(Success("Error: No match"))), "failure contains exact error")

      expect(toString(match(10)(caseThrow(new Error("a custom error message"))).run().recover(e => e.toString()).value()))
        .equals(toString(Some(Success("Error: a custom error message"))), "failure message matches")

      expect(toString(match(10)(caseThrow(new Error("a custom error message"))).run().recover(e => e.toString()).value()))
        .not.equals(toString(Some(Success("Error: other error message"))), "failure message matches")
    })
  })

  describe("matchWith", () => {
    it("will return first matched case value", () => {
      expect(toString(match(15)(caseId(isValue(15))).run().value()))
        .equals(toString(Some(Success(15))), "caseId returns input value if matched")

      expect(toString(match(15)(caseId(isValue(15))).run().value()))
        .not.equals(toString(Some(Success(51))), "caseId returns input value if matched")
    })

    it("will throw if no case matched", () => {
      expect(toString(matchWith()(10).run().recover(e => e.toString()).value())) // recovering to get message
        .equals(toString(Some(Success("Error: No match"))), 'mismatch returns a failure, with "No match" message')
    })
  })
})
