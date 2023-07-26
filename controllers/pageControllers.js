const getIndexPage = (req, res) => {
console.log('request user:', req.user)
  res.render("index");
};
const getCertificatesPage = async (req, res) => {
  res.render("certificates");
};
const getRegisterPage = (req, res) => {
  res.render("register");
};
const getLoginPage = (req, res) => {
  res.render("login");
};
const getLogout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

module.exports = { getIndexPage, getCertificatesPage, getRegisterPage, getLoginPage, getLogout };
