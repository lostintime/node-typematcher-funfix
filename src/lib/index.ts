import {MatchCase, matchWith as matchStrictWith} from "typematcher";
import {IO} from "funfix-effect";

/**
 * matchWith is same as match() only with inverse arguments order,
 * this can be used to pre-build matchers and save some CPU cycles
 */
export function matchWith<R>(...cases: MatchCase<R>[]): (val: any) => IO<R> {
  return function value(val: any): IO<R> {
    return IO.once(() => {
      return matchStrictWith(...cases)(val);
    });
  }
}

/**
 * Match value against all given matchers, return IO on match or failure
 */
export function match(val: any): <R>(...cases: MatchCase<R>[]) => IO<R> {
  return function cases<R>(...cases: MatchCase<R>[]): IO<R> {
    return matchWith(...cases)(val);
  };
}
