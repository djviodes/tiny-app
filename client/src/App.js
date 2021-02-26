import React from "react";
import axios from "axios";
import moment from "moment";
import { useHistory, Route } from "react-router-dom";

// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";

let envelopeArgs = {
  accessToken: "",
  accountId: "d9ae37f1-949c-4649-87f1-bba5125c0159",
  accountName: "6193c946-ca9e-4413-8fc7-e96e2e9e5776",
  basePath: "https://demo.docusign.net/restapi",
  signer1Email: "djviodes@ymail.com",
  signer1Name: "David Viodes",
  tokenExpirationTimestamp: moment().add(3600, "s"),
};

let JWTToken =
  "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI0NDRjZDY2YS0wMTMwLTQ3MWYtODY2OS05YWNkMjkxNzA3MTMiLCJzdWIiOiI2MTkzYzk0Ni1jYTllLTQ0MTMtOGZjNy1lOTZlMmU5ZTU3NzYiLCJpYXQiOjE2MTQzNjcwODAsImV4cCI6MTYxNTAxNzU5OSwiYXVkIjoiYWNjb3VudC1kLmRvY3VzaWduLmNvbSIsInNjb3BlIjoic2lnbmF0dXJlIGltcGVyc29uYXRpb24ifQ.xdHAa5_UA79L9POdpnCt-o8B7hHA__PvesciU6Th2QJJnOfvnVsJAFW6wkiicvxTc3wN6nQmfBh7z85SwQECp3CQtBnloNqc8lkrEZy_bPTJLE-5nFr3C4YEsgt3Zi8KRYjfe5uSSADqXRvTiYJrhb2ko7Y6kmtQ47ETVGG_EhPwoZmNTrLtlAn9_3SNDKD5YYt7fPrPZS5_1G0Wss_7LMbuqL4nwDIlnYY1t1DmRMCHs3M-PNSWLPQwjD9O_YCbOvz42bkc5WfVH16WzGO5vg3jIwBzTtcGaMfKPUoDS9v_NWhc_q1f1R4J4iyyGT9XBDHzbEysioo8b8azy_wkZg";

function App() {
  const history = useHistory();

  function getJWT() {
    history.push("/test");
  }

  function getAccessToken() {
    axios
      .post(`https://account-d.docusign.com/oauth/token`, JWTToken)
      .then((res) => {
        // console.log("This is the RES: ", res);
        envelopeArgs.accessToken = res.data.access_token;
        console.log("This is our envelope arguments: ", envelopeArgs);
      })
      .catch((error) => console.log("This is the ERROR: ", error));
  }

  function accessedBE() {
    console.log("This is our envelope arguments: ", envelopeArgs);
    axios.post("http://localhost:8000/callDS", envelopeArgs);
  }

  return (
    <div className="App">
      <button onClick={getJWT}>Get JWT Token</button>
      <Route
        path="/test"
        component={() => {
          window.location.href =
            "https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&account_id=d9ae37f1-949c-4649-87f1-bba5125c0159&client_id=444cd66a-0130-471f-8669-9acd29170713&redirect_uri=http://localhost:3000/";
          return null;
        }}
      />
      <button onClick={getAccessToken}>Get Access Token</button>
      <button onClick={accessedBE}>Call BE With Access Token</button>
    </div>
  );
}

export default App;
