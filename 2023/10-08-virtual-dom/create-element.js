/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
/**
* create element
* 2023-09-30 18:13:27
*/

function Element(tagName, props, children) {
  if (!(this instanceof Element)) {
    return new Element(tagName, props, children);
  }

  this.tagName = tagName;
  this.props = props || {};
  this.children = children || [];
  this.key = props ? props.key : undefined;

  let count = 0;
  this.children.forEach((child) => {
    if (child instanceof Element) {
      count += child.count;
    }
    count += 1;
  });
  this.count = count;
}

Element.prototype.render = function () {
  const el = document.createElement(this.tagName);
  const { props } = this;
  // eslint-disable-next-line guard-for-in
  for (const key in props) {
    el.setAttribute(key, props[key]);
  }

  this.children.forEach((child) => {
    const childEl = child instanceof Element ? child.render() : document.createTextNode(child);
    el.appendChild(childEl);
  });

  return el;
};

const newTree = Element('div', { id: 'virtual-container' }, [
  Element('h3', {}, ['Virtual DOM']), // REPLACE
  Element('div', {}, ['after update']), // TEXT
  Element('ul', { class: 'marginLeft10' }, [ // PROPS
    Element('li', { class: 'item' }, ['Item 1']),
    // Element('li', { class: 'item' }, ['Item 2']),    // REORDER remove
    Element('li', { class: 'item' }, ['Item 3']),
  ]),
]);

const el = newTree.render();
console.log(el);
