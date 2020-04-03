const users = require('../models/users');

let id = 1;

module.exports = {
  register: (req, res) => {
    const { session } = req;
    const { username, password } = req.body;

    users.push({ id, username, password });
    id++;

    session.user.username = username;

    res.status(200).send(session.user);
  },
  login: (req, res) => {
    const { session } = req;
    const { username, password } = req.body;

    const user = users.find(
      user => user.username === username && user.password === password
    );
    if (user) {
      session.user.username = user.username;
      res.status(200).send(seesion.user);
    } else {
      res.status(500).send('something went wrong!');
    }
  },
  singout: (req, res) => {
    req.seesion.destroy();
    res.status(200).send(req.seesion);
  },
  getuser: (req, res) => {
    const { session } = req;
    res.status(200).send(session.user);
  }
};
