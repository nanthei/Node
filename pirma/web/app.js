const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  let daug;
  if (url === "/") daug = 1;
  else daug = parseInt(url.split("/")[1]);

  console.log("Event logged");
  console.log(url);
  console.log(method);

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Puslapis</title></head>");
  res.write("<body>");
  res.write('<table style="border: 1px solid black;">');
  res.write("<b>Daugyba</b>");
  //   res.write("<br><br>");

  //   for (let i = 1; i <= 10; i++) {
  //     res.write('<a href="/' + i + '">' + i + "</a>&nbsp&nbsp");
  //   }

  res.write("<br><br>");

  for (let x = 1; x <= 10; x++) {
    res.write("<tr>");
    for (let j = 1; j <= 10; j++) {
      if ( x == 1 || j ==1) res.write(
        "<td style=' background-color: red; padding: 5px; border: 1px solid black;'><b>" +
          x * j +
          "</b></td>"
      );
      else
      res.write(
        "<td style=' padding: 5px; border: 1px solid black;'><b>" +
          x * j +
          "</b></td>"
      );
    }
    res.write("</tr>");
  }

  //   for (let x = 1; x <= 10; x++) {
  //     res.write("<tr>");
  //     res.write("<td>" + daug + "</td>");
  //     res.write("<td>*</td>");
  //     res.write("<td>" + x + "</td>");
  //     res.write("<td>=</td>");
  //     res.write("<td>" + x * daug + "</td>");
  //     res.write("</tr>");
  //   }

  res.write("</table>");
  res.write("</body></html>");
  res.end();
});

server.listen(8080, "localhost");
