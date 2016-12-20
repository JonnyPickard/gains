var config = {
	port: process.env.PORT || 3000,
	db: ("mongodb://localhost/gains_" + (process.env.NODE_ENV || 'development')),
	test_db: "mongodb://localhost/gains_test",
	production_db: "mongodb://localhost/gains_test"
}

module.exports = config;
