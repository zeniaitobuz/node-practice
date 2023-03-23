import * as fs from "fs";
import * as path from "path";

function read() {
  const data = fs.readFileSync(path.resolve("weatherDb.txt"), "utf8");
  console.log(path.resolve("weatherDb.txt"));
  if (data.length === 0) {
    console.log("No data present in database");
  }
  console.log("Reading data.. \n");
  const objectdata = JSON.parse(data);
  console.log(objectdata);
}

function create(location, temp) {
  fs.readFile(path.resolve("weatherDb.txt"), "utf-8", function (err, database) {
    if (err) {
      console.log(err);
      return;
    }
    if (database.length === 0) {
      fs.readFile(
        path.resolve("weatherDb.txt"),
        "utf-8",
        function (err, database) {
          if (err) {
            console.log(err);
            return;
          }
        }
      );
      const input = `[{"location":"${location}","tempC":${temp}}]`;
      fs.writeFile(
        path.resolve("weatherDb.txt"),
        input,
        "utf-8",
        function (err) {
          console.log("File created");
        }
      );
    } else {
      fs.readFile(
        path.resolve("weatherDb.txt"),
        "utf-8",
        function (err, database) {
          if (err) {
            console.log(err);
            return;
          }
        }
      );
      const input = `,{"location":"${location}","tempC":${temp}}]`;
      const replaced = database.replace("]", input);
      fs.writeFile(
        path.resolve("weatherDb.txt"),
        replaced,
        "utf-8",
        function (err) {
          console.log("File created");
        }
      );
    }
  });
}

function deletefile(location) {
  let data = fs.readFileSync(path.resolve("weatherDb.txt"), "utf-8");
  const arr = JSON.parse(data);
  arr.splice(
    arr.findIndex((a) => a.location === location),
    1
  );
  fs.writeFile("./weatherDb.txt", JSON.stringify(arr), "utf-8", function (err) {
    console.log(arr);
  });
}

function update(olddata, updateddata) {
  fs.readFile(path.resolve("weatherDb.txt"), "utf-8", function (err, database) {
    if (err) {
      console.log(err);
      return;
    }
    const tobereplaced = database.replace(`${olddata}`, `${updateddata}`);

    fs.writeFile(
      path.resolve("weatherDb.txt"),
      tobereplaced,
      "utf-8",
      function (err) {
        console.log("File updated");
      }
    );
  });
}

read()
// create('Tripuira','35')
// update('Tripuira','Tripura')
// deletefile('Paris')
