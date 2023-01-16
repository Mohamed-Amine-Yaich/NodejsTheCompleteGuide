//script for run the code npx ts-node app
//script with nodemon npx nodemon ts-node app
import http from "http";

//return a new instance of a server
//take a request listener as params

const server = http.createServer((req, res) => {
  console.log(
    "headers : ",
    req.headers,
    "url",
    req.url,
    "statusCode",
    req.statusCode,
    "statusMessage",
    req.statusMessage
  );
  const url = req.url;
  console.log(url);
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      "<html><head><title>my node server</title></head><body><form action='/message' method='POST'><input type='text' name text  required /><button type='button'>send</button></form></body></html>"
    );
    return res.end();
  }

  if (url === "/message") {
    console.log(req);
    res.setHeader("Content-Type", "text/html");
    //set the header content-type with text/html (the content that we send is a html document with some text)
    res.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]); //this header have two values
    res.write(
      "<html><head><title>my node server</title></head><body><h1>Hello from node server</h1></body></html>"
    );
    res.end(console.log("response.end last chunck of data")); //mean no more data is to send you can send a final data on is
  }
});

server.listen(3000);
