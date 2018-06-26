# Stencil scoped web component tag names

Idea behind this plugin: simplify component name scoping.

**Without `stencil-scoped-tag-names`**

```tsx
// card.tsx
@Component({ tag: 'ion-card' })
// jumbotron.tsx
@Component({ tag: 'ion-jumbotron' })
// otherComponent.tsx
@Component({ tag: 'ion-other-component' })
class IonOtherComponent {
  render() {
    return (
      <ion-jumboron>
        <ion-card>{/* Some content here*/}</ion-card>
      </ion-jumboron>
    )
  }
}
```

**With `stencil-scoped-tag-names`**

```tsx
// card.tsx
@Component({ tag: 'card' })
// jumbotron.tsx
@Component({ tag: 'jumbotron' })
// otherComponent.tsx
@Component({ tag: 'other-component' })
class OtherComponent {
  render() {
    return (
      <jumboron>
        <card>{/* Some content here*/}</card>
      </jumboron>
    )
  }
}
```

### How to use `stencil-scoped-tag-names`

```js
// stencil.config.js
const scopedComponents = require('stencil-scoped-tag-names')

exports.config = {
  namespace: 'my-awesome-scoped-component',
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: false
    }
  ],
  customTrasformers: {
    preprendBefore: [scopedComponents()] // <-- the magic happen here
  }
}

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
```
