const test = require("ava");
const {default: ABCQ} = require("../lib/src");

test("can have multiple instances", t => {
	const a1 = new ABCQ();
	const a2 = new ABCQ();
	t.is(a1.generate(), a2.generate());
});

test("generate should start with 'a' followed by a 'b'", t => {
	const abc = new ABCQ();
	t.is(abc.generate(), "a");
	t.is(abc.generate(), "b");
});

test("encode should encode 0 to 'a'", t => {
	const abc = new ABCQ();
	t.is(abc.encode(0), "a");
});

test("encode should encode 1 to 'b'", t => {
	const abc = new ABCQ();
	t.is(abc.encode(1), "b");
});

test("encode should encode 51 to 'Z'", t => {
	const abc = new ABCQ();
	t.is(abc.encode(51), "Z");
});

test("encode should encode 52 to 'aa'", t => {
	const abc = new ABCQ();
	t.is( abc.encode(52), "aa");
});


test("encode should encode 19854 to 'gqQ'", t => {
	const abc = new ABCQ();
	t.is(abc.encode(19854), "gqQ");
});

test("encode should return null for -1", t => {
	const abc = new ABCQ();
	t.is(abc.encode(-1), null);
});

test("decode should encode 'a' to 0", t => {
	const abc = new ABCQ();
	t.is(abc.decode("a"), 0);
});

test("decode should encode 'b' to 1", t => {
	const abc = new ABCQ();
	t.is(abc.decode("b"), 1);
});

test("decode should encode 'Z' to 51", t => {
	const abc = new ABCQ();
	t.is(abc.decode("Z"), 51);
});

test("decode should encode 'aa' to 52", t => {
	const abc = new ABCQ();
	t.is(abc.decode("aa"), 52);
});


test("decode should decode 'gqQ' to 19854", t => {
	const abc = new ABCQ();
	t.is(abc.decode("gqQ"), 19854);
});

test("decode should return null for '-'", t => {
	const abc = new ABCQ();
	t.is(abc.decode("-"), null);
});

test("decode should return null for '_'", t => {
	const abc = new ABCQ();
	t.is(abc.decode("_"), null);
});


test("should allow to set chars", t => {
	const abc = new ABCQ({
		chars: "ab"
	});
	t.is(abc.decode("b"), 1);
	t.is(abc.decode("babab"), 51);
	t.is(abc.decode("babba"), 52);
	t.is(abc.decode("aabbabbaabaaaa"), 19854);
});


test("should allow to set the counter", t => {
	const abc = new ABCQ({
		counter: 1
	});
	t.is(abc.generate(), "c")
	t.is(abc.generate(), "d")
	t.is(abc.encode(19854), "gqQ")
	t.is(abc.decode("gqQ"), 19854)

});
