import React from "react";

const makingUpFakeNumbers = (a, b, c) =>
  Math.round(a * (b + c)).toLocaleString("en-US");

export const Table = ({ columns }) => {
  let year = 2024;
  const arr = new Array(columns)
    .fill(null)
    .map((v, i) => year - i)
    .reverse();
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Enrollment</th>
          {arr.map((v, i) => (
            <th scope="col" key={i}>
              Fall {v}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">
            <p>
              use of <code>&lt;a&gt;</code> in cells{" "}
              <a href="#">example link</a>
            </p>
            Metropolitan campus population
          </th>
          {arr.map((v, i) => (
            <td key={i}>{makingUpFakeNumbers(v, 35, i)}</td>
          ))}
        </tr>
        <tr>
          <th scope="row" className="indent">
            Tempe
          </th>
          {arr.map((v, i) => (
            <td key={i}>{makingUpFakeNumbers(v, 25, i)}</td>
          ))}
        </tr>
        <tr>
          <th scope="row" className="indent">
            Downtown
          </th>
          {arr.map((v, i) => (
            <td key={i}>{makingUpFakeNumbers(v, 7, i)}</td>
          ))}
        </tr>
        <tr>
          <th scope="row" className="indent">
            Polytechnic
          </th>
          {arr.map((v, i) => (
            <td key={i}>{makingUpFakeNumbers(v, 1.6, i / 2)}</td>
          ))}
        </tr>
        <tr>
          <th scope="row" className="indent">
            West
          </th>
          {arr.map((v, i) => (
            <td key={i}>{makingUpFakeNumbers(v, 0.8, i / 4)}</td>
          ))}
        </tr>
        <tr>
          <th scope="row" className="indent">
            Thunderbird
          </th>
          {arr.map((v, i) => (
            <td key={i}>{makingUpFakeNumbers(v, 0.1, i / 10)}</td>
          ))}
        </tr>
        <tr>
          <th scope="row" className="normal">
            Skysong Campus
          </th>
          {arr.map((v, i) => (
            <td key={i}>{makingUpFakeNumbers(v, 5, i / 5)}</td>
          ))}
        </tr>
        <tr>
          <th scope="row">Total</th>
          {arr.map((v, i) => (
            <td key={i}>{makingUpFakeNumbers(v, 50, i)}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
