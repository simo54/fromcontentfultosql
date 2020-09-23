const path = require("path"); // Path required in order to sendFile to user on homepage

const htmlFile = (req, res) => {
  const indexFile = path.join(__dirname, "./homepage.html");
  res.sendFile(indexFile);
};

module.exports = htmlFile;
