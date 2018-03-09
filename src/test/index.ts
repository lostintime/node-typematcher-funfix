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
import { match, caseWhen, caseDefault } from "../lib"
import { isNumber, isString, refined, isAny } from "typematcher"
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
      expect(toString(match(10,
        caseWhen(refined(isNumber)(_ => _ === 10, "Ten"), (_): number => _).
        caseDefault(() => 20)
      ).run().value()))
        .equals(toString(Some(Success(10))), "caseId returns input value if matched")
    })

    it("will throw if no case matched", () => {
      expect(toString(match(10, caseWhen(isAny, _ => { throw new Error("a custom error message") }))
        .run().recover(e => e.toString()).value()))
        .equals(toString(Some(Success("Error: a custom error message"))), "failure message matches")

      expect(toString(match(10, caseDefault(() => { throw new Error("a custom error message") })).run().recover(e => e.toString()).value()))
        .not.equals(toString(Some(Success("Error: other error message"))), "failure message matches")
    })
  })
})
