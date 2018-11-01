const express = require("express");
const router = express.Router();

const {accounts, writeJSON} = require("../data");

router.get("/transfer", (req, res) => res.render("transfer"));
router.post("/transfer", (req, res) => {
	accounts[req.body.from].balance = parseInt(accounts[req.body.from].balance, 10) - parseInt(req.body.amount, 10);
	accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance, 10) + parseInt(req.body.amount, 10);
	writeJSON();
	res.render("transfer", {message: "Transfer Completed"});
});

router.get("/payment", (req, res) => res.render("payment", {account: accounts.credit}));
router.post("/payment", (req, res) => {
	accounts.credit.balance = parseInt(accounts.credit.balance, 10) - parseInt(req.body.amount, 10);
	accounts.credit.available = parseInt(accounts.credit.available, 10) + parseInt(req.body.amount, 10);
	writeJSON();
	res.render("payment", {message: "Payment Successful", account: accounts.credit})
});

module.exports = router;