/* eslint-disable jest/no-mocks-import */
// @ts-check
import { toMatchImageSnapshot } from "jest-image-snapshot";

import "@testing-library/jest-dom";

import "./__mocks__/window-mock";

expect.extend({ toMatchImageSnapshot });
