import BackToTop from './BackToTop.vue';

const obj = {
  install(Vue) {
    Vue.component(BackToTop.name, BackToTop);
  }
};

// Auto-install
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default obj;
