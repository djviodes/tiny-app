import React from "react";
import axios from "axios";
import moment from "moment";
import { useHistory, Route } from "react-router-dom";

// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";

let somethingFun = {
  accessToken:
    "eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwAA1tOq29nYSAgAAD6YDOTZ2EgCAEbJk2GeyhNEj8fpbi6eV3YVAAEAAAAYAAIAAAAFAAAAHQAAAA0AJAAAADQ0NGNkNjZhLTAxMzAtNDcxZi04NjY5LTlhY2QyOTE3MDcxMyIAJAAAADQ0NGNkNjZhLTAxMzAtNDcxZi04NjY5LTlhY2QyOTE3MDcxMxIAAQAAAAYAAABqd3RfYnIjACQAAAA0NDRjZDY2YS0wMTMwLTQ3MWYtODY2OS05YWNkMjkxNzA3MTM.YLwVvM7JbhJHlM05T9036NaQBmWXxrJBmkc25L6cdD6HuVuOpIrwsYoXZiOOGb0smnyWs6TzuY3E9zyrceBj555oeqHTwTY6AvHje-4PwSeh6CaPyRlqq-O8zuergyW4eFAAPOVD1cPSLcgn-RtcznzcfRQHEN9iICpTwfUm4cR93WdOJXd1JdOG5F5Euq_s8dtkIAlSeyxJnpZVw7kGOfvEGu84HPvb4-ss8f0Phlqzul0T-dDBip3hWG-Kgrh7PiTULPKQZsOTT9KyB2tMNIFvgePRlmDhuzm2rvq5iahV9ePtaA_VP08mzMPO-m5aE3VNRLk6Kyr3ZjAPvCY92g",
  accountId: "d9ae37f1-949c-4649-87f1-bba5125c0159",
  accountName: "6193c946-ca9e-4413-8fc7-e96e2e9e5776",
  basePath: "https://demo.docusign.net/restapi",
  signerEmail: "djviodes26@gmail.com",
  signerName: "David Viodes",
  tokenExpirationTimestamp: moment().add(3600, "s"),
};

let JWTTokenMaybe =
  "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiI0NDRjZDY2YS0wMTMwLTQ3MWYtODY2OS05YWNkMjkxNzA3MTMiLCJzdWIiOiI2MTkzYzk0Ni1jYTllLTQ0MTMtOGZjNy1lOTZlMmU5ZTU3NzYiLCJpYXQiOjE2MTQyMDU1OTAsImV4cCI6MTYxNDMyMDcxNSwiYXVkIjoiYWNjb3VudC1kLmRvY3VzaWduLmNvbSIsInNjb3BlIjoic2lnbmF0dXJlIGltcGVyc29uYXRpb24ifQ.mzG4apg-GAMQQf1C4iNmvfo2GoJz0t5-DRu9IXvr5XGPfkzSkyvyWSx8L2F6-j4pfRRd170caBov2y0CJKCsHafGu-RutYhuGECbVWccGgHM9A70a_hwglc5kHDSI5Vlj6prga_i_aA2xQv-vTwIC_onsDOvGGp-MoAApmWeBDDBg2y3MYYJa3vHzVcaWOyX8_T9wJ65pP1BT_ZoaX1CrEb-yexIrh8iAc95PEfbrUTGGZcCRTPRhNwvJTXG_oK9hxpVK1Ak_zESzUbHmdDqmSIxTZ_i0EYIg9zGcgnhki9yDc2tg03hw4ZvJKQw5iI6Fh54L9Le_DdxE-2_xBfjCQ";

function App() {
  const history = useHistory();

  function callBE() {
    history.push("/test");
  }

  function afterCallBE() {
    axios
      .post(`https://account-d.docusign.com/oauth/token`, JWTTokenMaybe)
      .then((res) => console.log("This is the RES: ", res))
      .catch((error) => console.log("This is the ERROR: ", error));
  }

  function accessedBE() {
    axios.post("http://localhost:8000/callDS", somethingFun);
  }

  return (
    <div className="App">
      <button onClick={callBE}>Sign your life away</button>
      <Route
        path="/test"
        component={() => {
          window.location.href =
            "https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&account_id=d9ae37f1-949c-4649-87f1-bba5125c0159&client_id=444cd66a-0130-471f-8669-9acd29170713&redirect_uri=http://localhost:3000/";
          return null;
        }}
      />
      <button onClick={afterCallBE}>Work Please</button>
      <button onClick={accessedBE}>Call BE With Access Token!!!</button>
    </div>
  );
}

export default App;
