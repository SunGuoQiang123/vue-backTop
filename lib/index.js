import BackToTop from './BackToTop.vue';

const obj = {
  install(Vue) {
    Vue.component(BackToTop.name, BackToTop);
  }
};

export default obj;
