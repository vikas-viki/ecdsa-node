import React from "react";

const Instructions = () => {
  return (
    <div class="container instructions">
      <h1>Instructions</h1>
      <div className="note">
        <i>
          <b>
            Note: All the security measure are being considered & we don't store
            even single word of your data.
          </b>
        </i>
        <br />
        <i>Tip: Signature will be automatically copied once you click it.</i>
      </div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Instructions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1.</td>
            <td>
              First Paste your private key & a simple message in
              <b>
                <i> Sign a message </i>
              </b>{" "}
              box.
            </td>
          </tr>
          <tr>
            <td>2.</td>
            <td>
              Copy the signature & the recovery bit in respective places in
              <b>
                <i> Send Transaction </i>
              </b>{" "}
              box.
            </td>
          </tr>
          <tr>
            <td>3.</td>
            <td>
              Fill the remaining required details in
              <b>
                <i> Send Transaction </i>
              </b>{" "}
              box.
            </td>
          </tr>
          <tr>
            <td>4.</td>
            <td>
              Click on{" "}
              <b>
                <i> Transfer </i>
              </b>
              , amount will be automatically transferred.
            </td>
          </tr>
          <tr>
            <td>5.</td>
            <td>
              Paste your private key in
              <b>
                <i> Check your balance box </i>
              </b>{" "}
              to check the balance.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Instructions;
