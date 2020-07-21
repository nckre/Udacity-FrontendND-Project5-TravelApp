require("@babel/polyfill");
const addTrip = require('../src/client/js/addTrip');

// test if handleSubmit function is defined
test('Test if function that handles Submit is defined', async () => {
	expect(addTrip.addTrip)
	.toBeDefined();
});