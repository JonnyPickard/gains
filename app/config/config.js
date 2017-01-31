module.exports = {
	port: process.env.PORT || 3000,
	db: process.env.MONGODB_URI || ("mongodb://localhost/gains_" + (process.env.NODE_ENV || 'development')),
	test_db: "mongodb://localhost/gains_test"
};
