var config = {
	port: process.env.PORT || 2000,
	db: ("mongodb://localhost/gains_" + process.env.NODE_ENV), 
	test_port: 2001,
	test_db: "mongodb://localhost/gains_test"
}

module.exports = config;
