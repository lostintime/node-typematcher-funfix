/*
 * Copyright 2017 by TypeMatcher developers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { MatchCase, matchWith as matchStrictWith } from "typematcher"
import { IO } from "funfix-effect"

/**
 * matchWith is same as match() only with inverse arguments order,
 * this can be used to pre-build matchers and save some CPU cycles
 */
export function matchWith<R>(...cases: MatchCase<R>[]): (val: any) => IO<R> {
  // Prepare matcher
  const matcher = matchStrictWith<R>(...cases)

  return function value(val: any): IO<R> {
    return IO.once(() => matcher(val))
  }
}

/**
 * Match value against all given matchers, return IO on match or failure
 */
export function match(val: any): <R>(...cases: MatchCase<R>[]) => IO<R> {
  return function cases<R>(...cases: MatchCase<R>[]): IO<R> {
    return matchWith(...cases)(val)
  }
}
