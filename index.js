const Benchmark = require("benchmark");
const benchmarksLogger = require("beautify-benchmark");

const mapStrings = new Map();
const objStrings = {};

const mapObjects = new Map();
const objObjects = {};

const numberOfItems = 100000;

const generateRandomString = () => {
	let text = "";
	const possible = "ABCDEFGHiJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
};

const arrayOfRandomObjects = (() => {
	const objects = [];
	for (let i = 0; i < numberOfItems; i++) {
		objects[i] = {};
		for (let ii = 0; ii < 5; ii++) {
			objects[i][generateRandomString()] = generateRandomString();
		}
	}
	return objects;
})();

const arrayOfRandomIndexes = (() => {
	const indexes = [];
	for (let i = 0; i < numberOfItems; i++) {
		indexes.push("key" + i + generateRandomString());
	}
	return indexes;
})();

const objTestSetString = {
	name: "Object value set benchmark, string keys only",
	method: () => {
		arrayOfRandomIndexes.forEach(el => {
			objStrings[el] = "val" + generateRandomString();
		});
	}
};

const mapTestSetString = {
	name: "Map value set benchmark, string keys only",
	method: () => {
		arrayOfRandomIndexes.forEach(el => {
			mapStrings.set(el, "val" + generateRandomString());
		});
	}
};

const objTestGetString = {
	name: "Object value get benchmark, string keys only",
	method: () => {
		arrayOfRandomIndexes.forEach(el => {
			let a = objStrings[el];
		});
	}
};

const mapTestGetString = {
	name: "Map value get benchmark, string keys only",
	method: () => {
		arrayOfRandomIndexes.forEach(el => {
			let a = mapStrings.get(el);
		});
	}
};

const objTestHasString = {
	name: "Object value has property benchmark, string keys only",
	method: () => {
		arrayOfRandomIndexes.forEach(el => {
			let a = objStrings.hasOwnProperty(el);
		});
	}
};

const mapTestHasString = {
	name: "Map value has property, string keys only",
	method: () => {
		arrayOfRandomIndexes.forEach(el => {
			let a = mapStrings.has(el);
		});
	}
};

const objTestSetObject = {
	name: "Object value set benchmark, object keys only",
	method: () => {
		arrayOfRandomObjects.forEach(el => {
			objObjects[JSON.stringify(el)] = generateRandomString();
		});
	}
};

const mapTestSetObject = {
	name: "Map value set benchmark, object keys only",
	method: () => {
		arrayOfRandomObjects.forEach(el => {
			mapObjects.set(el, generateRandomString());
		});
	}
};

const objTestGetObject = {
	name: "Object value get benchmark, object keys only",
	method: () => {
		arrayOfRandomObjects.forEach(el => {
			let a = objObjects[JSON.stringify(el)];
		});
	}
};

const mapTestGetObject = {
	name: "Map value get benchmark, object keys only",
	method: () => {
		mapObjects.forEach((value, key) => {
			let a = value;
		});
	}
};

const objTestIteration = {
	name: "Object iterate benchmark",
	method: () => {
		Object.keys(objStrings).forEach(key => {
			let a = objStrings[key];
		});
	}
};

const mapTestIteration = {
	name: "Map iterate benchmark",
	method: () => {
		mapStrings.forEach(val => {
			let a = val;
		});
	}
};

const createSuite = (firstTest, secondTest) => {
	const suite = new Benchmark.Suite();
	return suite
		.add(firstTest.name, firstTest.method)
		.add(secondTest.name, secondTest.method)
		.on("cycle", event => benchmarksLogger.add(event.target))
		.on("complete", () => benchmarksLogger.log());
};

createSuite(objTestSetString, mapTestSetString).run({
	async: false
});
createSuite(objTestGetString, mapTestGetString).run({
	async: false
});

createSuite(objTestHasString, mapTestHasString).run({
	async: false
});


createSuite(objTestSetObject, mapTestSetObject).run({
	async: false
});

createSuite(objTestGetObject, mapTestGetObject).run({
	async: false
});

createSuite(objTestIteration, mapTestIteration).run({
	async: false
});