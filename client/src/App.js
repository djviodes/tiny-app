import React from "react";
import axios from "axios";
import moment from "moment";

let somethingFun = {
  accessToken:
    "eyJraWQiOiJxcnN0d08xOUt3RkNuV0llMFFwdlNIc0MxVG1mOHJEVW5ZeXVCT2hDNU9FIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwMHUybGhpZ3RiOE40N0ppaTVkNiIsIm5hbWUiOiJBcnRodXIgU2hlbGJ5IiwiZW1haWwiOiJzdXBlcnZpc29yQGdtYWlsLmNvbSIsInZlciI6MSwiaXNzIjoiaHR0cHM6Ly9kZXYtMjI0MDA0MC5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6IjBvYTJsYTdqYmRldFZwVjd5NWQ2IiwiaWF0IjoxNjE0MDMwNDcxLCJleHAiOjE2MTQwMzQwNzEsImp0aSI6IklELjBpT2FqXzZNd212dU1BSVhCd2hrdDkyOGE4aHJSNzRqZDRtaHFtZEo4YUkiLCJhbXIiOlsicHdkIl0sImlkcCI6IjAwbzJsYWd1aFo0N0E3RVV5NWQ2Iiwibm9uY2UiOiJNSTFudGY3OXJiRWFsc1NzZzFGRzVUZWhWaWZ2cjFHSHdiUjJzOHhnUFlrekVyUGxnWGtHeUcyRXdHYzBQdUVjIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic3VwZXJ2aXNvckBnbWFpbC5jb20iLCJhdXRoX3RpbWUiOjE2MTQwMzA0NjksImF0X2hhc2giOiItbWE3aUw2eXJzUVpON0hlS09fcXNBIn0.lEmnVTkq92NDzC5zqxZvEsoQQ-i91nrPLfYkUKALkRck6l7NAU72QxPU74WS3jXv6HcGr9cVezJaRAtJJBZPZbmfk8bfG7wWaHMoGV2OzMz--1QW25qKHLObPLQYdkGnoggtJSJLSb2KvbMUCORYbHy05aWmP1EG5KaKOJ9nyRCuupz8tLKl7IQYwlLZpYsAXXte9N_0mypFH2qdYUdw8XTcqjg0lkGPrLu0KU71xR-jAwlIB2rb1Frz8D4dyHjyy9NnA452v_V_TkIIKPAxDv-DN6daYugbXZcCkV-KKYTj-vsoH7syTHnQmV-9iCbqRonnJ-G2Xrhxj6jAiVZ_iw",
  accountId: "d9ae37f1-949c-4649-87f1-bba5125c0159",
  accountName: "6193c946-ca9e-4413-8fc7-e96e2e9e5776",
  basePath: "https://demo.docusign.net/restapi",
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
