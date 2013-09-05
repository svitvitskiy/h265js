function testBitstream() {
	var data = new Uint8Array([
		parseInt('10011000', 2), parseInt('00011100', 2), parseInt('11001101', 2),
		parseInt('01010101', 2), parseInt('11101001', 2), parseInt('00101110', 2),
		parseInt('00000111', 2), parseInt('00011101', 2), parseInt('10100100', 2),
		parseInt('01101110', 2), parseInt('10000101', 2), parseInt('00001100', 2),
		parseInt('01010111', 2), parseInt('01000000', 2)
	]);
	var reader = new BitReader(data.buffer);

	reader.skip(1);
	Test.assertEquals(parseInt('0011000000111001', 2), reader.check16());
	reader.skip(9);
	Test.assertEquals(parseInt('0111001100110101', 2), reader.check16());
	Test.assertEquals(parseInt('0111', 2), reader.read(4));
	reader.skip(3);
	Test.assertEquals(parseInt('100110', 2), reader.read(6));
}

Test.add(testBitstream);