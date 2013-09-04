function testGolomb() {
	var data = new Uint8Array([
		parseInt('00011010', 2), parseInt('00011100', 2), parseInt('11001101', 2),
		parseInt('01010101', 2), parseInt('11101001', 2), parseInt('00101110', 2),
		parseInt('00000111', 2), parseInt('00011101', 2), parseInt('10100100', 2),
		parseInt('01101110', 2), parseInt('10000101', 2), parseInt('00001100', 2),
		parseInt('01010111', 2), parseInt('01000000', 2)
	]);
	var reader = new BitReader(data.buffer);
	
	Test.assertEquals(12, GolombReader.readU(reader));
	Test.assertEquals(27, GolombReader.readU(reader));
	Test.assertEquals(0, GolombReader.readU(reader));
	Test.assertEquals(0, GolombReader.readU(reader));
	Test.assertEquals(5, GolombReader.readU(reader));
}

function testGolombSigned() {
	var data = new Uint8Array([
		parseInt('10100110', 2), parseInt('01000010', 2), parseInt('10011000', 2),
		parseInt('11100000', 2)
	]);
	var reader = new BitReader(data.buffer);
	
	Test.assertEquals(0, GolombReader.readS(reader));
	Test.assertEquals(1, GolombReader.readS(reader));
	Test.assertEquals(-1, GolombReader.readS(reader));
	Test.assertEquals(2, GolombReader.readS(reader));
	Test.assertEquals(-2, GolombReader.readS(reader));
	Test.assertEquals(3, GolombReader.readS(reader));
	Test.assertEquals(-3, GolombReader.readS(reader));
}

Test.add(testGolomb);
Test.add(testGolombSigned);