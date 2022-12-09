## ~~Auto stringify DOM attribute `data-*`(mainly) or other dom attributes~~

### **Deprecated**

It does not seem to be a good idea.

## ~~Installation~~

```bash
~~npm i -D vite-plugin-unstringify~~
```

```ts
import unstringify from 'vite-plugin-unstringify';

export default defineConfig({
  plugins: [unstringify(/data-.+/)],
});
```

### ~~**Behavior**~~

![preview img](https://raw.githubusercontent.com/zoeyzhao19/vite-plugin-unstringify/master/playground/public/preview.jpg)
