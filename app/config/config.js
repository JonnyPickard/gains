var config = {
	port: process.env.PORT || 2000,
	db: process.env.MONGOLAB_URI || "mongodb://localhost/gains",
	test_port: 2001,
	test_db: "mongodb://localhost/gains_test"
}
module.exports = config;
