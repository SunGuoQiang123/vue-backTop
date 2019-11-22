<template>
<transition name="fade">
  <div
    class="back-to-top"
    @click="handleBack"
    v-show="visible"
    :style="backStyle"
  >
    <slot>
      <img src="../assets/back-to-top.svg" class="back-top-btn" />
    </slot>
  </div>
</transition>
</template>
<script>
export default {
  name: 'BackToTop',
  props: {
    bottom: {
      type: Number,
      default: 80
    },
    right: {
      type: Number,
      default: 80
    },
    duration: {
      type: Number,
      default: 300
    },
    target: {
      type: [HTMLElement, String, null],
      default: null
    },
    height: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      visible: false,
      el: null,
      container: null
    }
  },
  computed: {
    backStyle() {
      return {
        bottom: this.bottom + 'px',
        right: this.right + 'px',
      }
    }
  },
  mounted() {
    this.initEl();
    this.handleScroll();
    this.throttleScroll = this.throttle(this.handleScroll.bind(this), 300);

    this.container.addEventListener('scroll', this.throttleScroll);
  },
  beforeDestroy() {
    this.container.removeEventListener('scroll', this.throttleScroll);
  },
  methods: {
    initEl() {
      this.container = document;
      if (this.target) {
        this.el = typeof this.target === 'string' ? document.querySelector(this.target) : this.target;
        if (!this.el) {
          throw('target not existed!!!')
        }
        this.container = this.el;
      }
    },
    handleBack(e) {
      this.$emit('click', e);
      const top = this.getScrollTop();
      const rate = (top / this.duration) * 16;
      const rAF = window.requestAnimationFrame || (fn => setTimeout(fn, 16));
      const fn = () => {
        if (this.getScrollTop() > 0) {
          this.minusScrollTop(rate);
          this.getScrollTop() > 0 && rAF(fn);
        }
      };
      rAF(fn);
    },
    getScrollTop() {
      if (this.el) {
        return this.el.scrollTop;
      }
      return document.documentElement.scrollTop || document.body.scrollTop;
    },
    handleScroll() {
      const top = this.getScrollTop();
      this.visible = top > this.height;
    },
    minusScrollTop(len) {
      if (this.el) {
        this.el.scrollTop -= len;
      }
      document.documentElement.scrollTop > 0
        ? document.documentElement.scrollTop -= len
        : document.body.scrollTop -= len;
    },
    throttle(fn, wait) {
      let timeout;
      let last = 0;
      return function(...args) {
        const now = Date.now();
        if (timeout) {
          timeout = null;
        }

        function exec () {
          last = now;
          return fn.apply(null, args);
        }

        if (now - last >= wait) {
          exec();
        } else {
          timeout = setTimeout(exec, wait - now + last);
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.back-to-top {
  cursor: pointer;
  z-index: 1000;
  font-size: 0;
  position: fixed;
  max-width: 200px;
  max-height: 200px;

  .back-top-btn {
    width: 50px;
    height: 50px;
    transition: all .3s;

    &:hover {
      filter: brightness(90%);
      -webkit-filter: brightness(90%);
    }
  }
}

.fade-enter-active, .face-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
