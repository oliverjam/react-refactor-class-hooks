# Refactor React classes to hooks

Hooks are a relatively new (~5 month old) React feature. Before that stateful components had to be created using JavaScript classes. It's important to be able to read class-based code since you'll probably encounter it out in the world.

## Classes

### Syntax

React class components are created by _extending_ the `React.Component` base class:

```jsx
class Counter extends React.Component {
  render() {
    return <button>Count is 0</button>;
  }
}
```

The `render()` method is the equivalent of a function component body. You return React elements from here to render them to the DOM.

### Updating state

We can set a class property named `state` to tell React to keep track of some values. This property is always an object.

```jsx
class Counter extends React.Component {
  state = {
    count: 0,
  };
  render() {
    return <button>Count is {this.state.count}</button>;
  }
}
```

We can access the state object via `this.state`.

If we want to update state we call `this.setState()` and pass in a new object. React will merge this object with the existing state:

```jsx
class Counter extends React.Component {
  state = {
    count: 0,
  };
  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        Count is {this.state.count}
      </button>
    );
  }
}
```

We can also store methods as properties on the class so they're reusable:

```jsx
class Counter extends React.Component {
  state = {
    count: 0,
  };
  increment = () => this.setState({ count: this.state.count + 1 });
  render() {
    return (
      <button onClick={this.increment}>Count is {this.state.count}</button>
    );
  }
}
```

`this.setState()` can take a function instead of an object if you need to access the previous state value (the same as with `React.useState()`).

```jsx
class Counter extends React.Component {
  state = {
    count: 0,
  };
  increment = () =>
    this.setState(oldState => {
      return { count: oldState.count + 1 };
    });
  render() {
    return (
      <button onClick={this.increment}>Count is {this.state.count}</button>
    );
  }
}
```

### Effects

Classes don't have a built-in way to deal with side-effects. Instead you have to hook into their "lifecycle" using specially named methods. These function are called at various points by React as it creates your component, puts it into the DOM, updates it or removes it.

For example to run some code when React is ready to render your component to the page we use `componentDidMount`:

```jsx
class Pokemon extends React.Component {
  state = {
    data: null,
  };
  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
      .then(res => res.json())
      .then(data => this.setState({ data }));
  }
  render() {
    if (!data) return <div>Loading...</div>;
    return <div>{data.name}</div>;
  }
}
```

To run some code when your component updates (i.e. is passed new props or `setState` is called) you can use `componentDidUpdate()`. To clean up after your component (i.e. cancelling timers or removing global event listeners) you can use `componentDidUnmount()`. There are [quite a lot of these](https://reactjs.org/docs/react-component.html#the-component-lifecycle) and you probably won't need them all.

## Modules

ES Modules are similar to Node's `require` syntax, but are a standardised part of the JS language.

The [newest browsers](https://caniuse.com/#search=modules) now have support, but generally we need to use a tool called a bundler to parse all our imports and "bundle" them into a single file that all browsers will understand.

### Exports

Files can have two types of exports: default and named. Generally you use default exports if there's only one thing in a file that needs to be accessible outside of it. You'd use named exports to export multiple things (e.g. from a collection of utility functions). This is similar to how you might do `module.exports = a` for a single Node export, or `module.exports = { a, b }` to export an object with multiple properties.

This is how you default export something:

```js
const a = 1;
export default a;
```

And this is how you named export something:

```js
const a = 1;
export { a };
```

You can only default export a single thing, but you can have as many named exports as you like:

```js
const a = 1;
const b = 2;
export { a, b };
```

You'll also see this briefer version of named exports:

```js
export const a = 1;
export const b = 2;
```

### Imports

There are also two kinds of imports: default and named. This is how you import something that was default-exported:

```js
import a from "./a";
console.log(a); // 1;
```

This is how you import named-exports:

```js
import { a } from "./a";
console.log(a); // 1;
```

You can import as many named-exports as you like on the same line:

```js
import { a, b } from "./a";
console.log(a, b); // 1 2
```

**Important**: when you import a default-export you can call it whatever you want. You're effectively creating a new variable and assigning the default-export to it. In contrast named-exports have to imported with the correct name—otherwise JS would have no idea which export you wanted.

**Also important**: unlike Node's `require` ES Modules are not dynamic. This means you cannot put them inside your code and import things conditionally. You also cannot use a variable in an import path.

## Exercise

1. Clone the project and run `npm i`
1. `npm t` to run the test watcher
1. Rewrite the class components in `src/components` to use hooks and ES Modules
1. Keep all the tests passing!

(You may need to change `index.js` too!)
