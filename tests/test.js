var Test = {};

Test.assertEquals = function( expected,  actual) {
	if(expected !== actual) {
		throw 'Assertion failed, expected ' + expected + ', actual ' + actual;
	}
}