/* eslint-disable no-console */
/**
* Babel test case
* 2023-10-23 17:09:05
*/

class Studen {
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log('hello, I\'m', this.name);
  }
}

const stu = new Studen('Tom');
stu.say();
