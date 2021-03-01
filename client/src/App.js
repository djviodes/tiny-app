import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import {useHistory, Route} from "react-router-dom";
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
let envelopeArgs = {
  accessToken: "",
  accountId: "d9ae37f1-949c-4649-87f1-bba5125c0159",
  accountName: "6193c946-ca9e-4413-8fc7-e96e2e9e5776",
  basePath: "https://demo.docusign.net/restapi",
  signer1Email: "djviodes@ymail.com",
  signer1Name: "David Viodes",
  tokenExpirationTimestamp: moment().add(3600, "s"),
};

function App() {
  const [link, setLink] = useState("")
  const history = useHistory()
  useEffect(() => {
    if (link) {
      history.push("/redirect")
    }
  }, [link])
  function accessedBE() {
    console.log("This is our envelope arguments: ", envelopeArgs);
    axios.post("http://localhost:8000/callDS", envelopeArgs)
    .then(res => {
      console.log(res.data)
      setLink(res.data)
    })
  }

  return (
    <div className="App">
      <button onClick={accessedBE}>Call BE With Access Token</button>
      <Route	
        path="/redirect"	
        component={() => {	
          window.location.href = link;	
          return null;	
        }}	
      />
    </div>
  );
}

export default App;
