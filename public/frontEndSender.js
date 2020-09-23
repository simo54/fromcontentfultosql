const path = require("path");

const htmlFile = (req, res) => {
  const indexFile = path.join(__dirname, "./homepage.html");
  res.sendFile(indexFile);
};

module.exports = htmlFile;
