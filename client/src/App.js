import React from "react";
import axios from "axios";
import moment from "moment";

let somethingFun = {
  accessToken:
    "eyJraWQiOiJxcnN0d08xOUt3RkNuV0llMFFwdlNIc0MxVG1mOHJEVW5ZeXVCT2hDNU9FIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwMHUybGhpZ3RiOE40N0ppaTVkNiIsIm5hbWUiOiJBcnRodXIgU2hlbGJ5IiwiZW1haWwiOiJzdXBlcnZpc29yQGdtYWlsLmNvbSIsInZlciI6MSwiaXNzIjoiaHR0cHM6Ly9kZXYtMjI0MDA0MC5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6IjBvYTJsYTdqYmRldFZwVjd5NWQ2IiwiaWF0IjoxNjEzNjc5NTc4LCJleHAiOjE2MTM2ODMxNzgsImp0aSI6IklELnlsRExYRzhNelhlLW1zNUg1UndRYTdpRFFZMFBPcnQtMFlZTjZ1RTRIYXciLCJhbXIiOlsicHdkIl0sImlkcCI6IjAwbzJsYWd1aFo0N0E3RVV5NWQ2Iiwibm9uY2UiOiJTQTBYUFdCaHA4YUkyOU1JdHpvV0FUTGE1NmlpWnNDTEhIRGJ5UFN2UlpwMjNWQzVWcEpwTU1PUHhQQ3c4WXhyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic3VwZXJ2aXNvckBnbWFpbC5jb20iLCJhdXRoX3RpbWUiOjE2MTM2Nzk1NzYsImF0X2hhc2giOiJXQXZhR19wZF9Fb2dfQ3pJTlJwWlJRIn0.XoqdjckH7cAVQtFG1in0AgAMy3vFKLm9DkAmOXM_uYTXSUw1Ew2UcOI3wUiktjML13Vc8A4zwGEPFZF08GCPMmdm7nTJ-FfXeMO9jdNd8920KSwLpARb_lavUfyaFf6DNkseRVE-qrS12ULFJgoKwRBkri1sARI22eDIh1sGEzWGceW7QBL4EUc50BuhcOKFe3UsAueLx8Awr1VkGaFmgJ0j2CvV0lzA8m4dQ_XW6nCnxMS7Yk8AIdar6s8Q2qiVhFvVbIfQEKRHpQmaCOUA05rs13LUP0pLQWMul8UNl-8rfXzCRjk5yaJ7IBM5P-qhI96b5q8-d_uwqzMpCuYGyg",
  accountId: "d9ae37f1-949c-4649-87f1-bba5125c0159",
  accountName: "6193c946-ca9e-4413-8fc7-e96e2e9e5776",
  basePath: "https://demo.docusign.net/restapi/v2/accounts/12754672",
  signerEmail: "djviodes26@gmail.com",
  signerName: "David Viodes",
  tokenExpirationTimestamp: moment().add(3600, "s"),
};

function App() {
  function callBE() {
    axios.post("http://localhost:8000/callDS", somethingFun).then();
  }
  return (
    <div className="App">
      <button onClick={callBE}>Sign your life away</button>
    </div>
  );
}

export default App;
