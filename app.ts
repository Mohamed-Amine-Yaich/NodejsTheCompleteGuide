//script for run the code npx ts-node app
//script with nodemon npx nodemon ts-node app
import http from "http";
import fs from "fs";
import { Buffer } from "buffer";
//return a new instance of a server
//take a request listener as params

const server = http.createServer((req, res) => {
  /* console.log(
    "headers : ",
    req.headers,
    "url",
    req.url,
    "statusCode",
    req.statusCode,
    "statusMessage",
    req.statusMessage
  ); */
  const url = req.url;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      "<html><head><title>my node server</title></head><body><form action='/message' method='POST'><input type='text' name='text' required /><input type='submit' value='Send Message' /></form></body></html>"
    );

    return res.end();
  }

  if (url === "/message" && req.method == "POST") {
    const body: any[] = [];

    req.on("data", (chunk: any) => {
      /*  console.log(chunk); */
      /*   console.log(chunk.toString());
      const text = Buffer.from(chunk).toString().split("=")[1];
      
      body.push(text);
      */
      body.push(chunk);
    });
    req.on("end", () => {
      /*  console.log("body", body); */
      const result = Buffer.concat(body).toString();
      fs.writeFile("message.txt", result, err => {
        res.setHeader("Content-Type", "text/html");
        //set the header content-type with text/html (the content that we send is a html document with some text)
        res.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]);
        const text = result.split("=")[1];
        res.write(
          `<html><head><title>my node server</title></head><body><h1>${text}</h1></body></html>`
        );
        return res.end();
      });
    });
    //mean no more data is to send you can send a final data on is
  }
  if (url === "/home" && req.method == "Get") {
    res.setHeader("Content-Type", "text/html");
    //set the header content-type with text/html (the content that we send is a html document with some text)
    res.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]); //this header have two values
    res.write(
      "<html><head><title>my node server</title></head><body><h1>Hello from node server</h1></body></html>"
    );
    res.end();
  }
});

server.listen(3000);
