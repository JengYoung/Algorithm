// 간단하고 정석
// const table = {};
// table["key"] = 100;
// table["key2"] = "Hello";
// console.log(table["key"]);
// table["key"] = 349;
// console.log(table["key"]);
// delete table["key"];
// console.log(table["key"])


// Map()을 이용
// const table = new Map()
// table.set("key", 100);
// table.set("key2", "Hello");
// console.log(table["key"]);
// console.log(table.get("key"));
// const object = { a: 1 };
// table.set(object, "A1");
// console.log(table.get(object)); // A1;
// table.delete(object);
// console.log(table.get(object));
// console.log(table.keys())
// console.log(table.values())
// table.clear();
// console.log(table.values());

// 여러 편한 메소드를 제공, 순회를 편하게 해줌.

const table = new Set();
table.add("key");
table.add("key2");
console.log(table.has("key"));
console.log(table.has("key3"))
table.delete("key2");
console.log(table.has("key2"));
table.add("key3");
console.log(table.size);
table.clear();
console.log(table.size);