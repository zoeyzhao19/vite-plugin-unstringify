## Auto stringify DOM attribute `data-*`(mainly) or other dom attributes

### **Features**

Since it does not seem to be elegant to always wrap `JSON.stringify` on your [dom data attributes](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Howto/Use_data_attributes), especially when it's a common scene that you always require many attributes to bind on the dom for a statistics usage and etc.

- [x] Support direct variables assignment in SFC/JSX
- [ ] Support variables reference in SFC/JSX
- [ ] Support glob pattern

### **Behavior**

![preview img](https://raw.githubusercontent.com/zoeyzhao19/vite-plugin-unstringify/master/playground/public/preview.jpg)
