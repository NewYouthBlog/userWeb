import { defineComponent, computed, unref, openBlock, createElementBlock, normalizeClass, withModifiers, createElementVNode, normalizeStyle, createBlock, Transition, withCtx, withDirectives, createVNode, vShow, createCommentVNode, renderSlot, Fragment, renderList, toDisplayString, useSSRContext, getCurrentInstance, useSlots, ref, watch, shallowRef, provide, inject, onUnmounted, withAsyncContext, isVNode } from 'vue';
import { h as buildProps, m as useNamespace, E as ElIcon, J as arrow_left_default, K as arrow_right_default, w as withInstall, o as withNoopInstall, _ as _export_sfc, q as isNumber, n as _export_sfc$1, ac as flattedChildren } from '../server.mjs';
import { throttle } from 'lodash-unified';
import { isString } from '@vue/shared';
import { E as ElRow, a as ElCol } from './el-col-f312c428.mjs';
import { _ as __nuxt_component_4, a as __nuxt_component_5 } from './RightMain-59585080.mjs';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { r as request } from './requests-81cacf38.mjs';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@unhead/shared';
import 'vue-router';
import '@vueuse/core';
import '@popperjs/core';
import '@ctrl/tinycolor';

const getOrderedChildren = (vm, childComponentName, children) => {
  const nodes = flattedChildren(vm.subTree).filter((n) => {
    var _a;
    return isVNode(n) && ((_a = n.type) == null ? void 0 : _a.name) === childComponentName && !!n.component;
  });
  const uids = nodes.map((n) => n.component.uid);
  return uids.map((uid) => children[uid]).filter((p) => !!p);
};
const useOrderedChildren = (vm, childComponentName) => {
  const children = {};
  const orderedChildren = shallowRef([]);
  const addChild = (child) => {
    children[child.uid] = child;
    orderedChildren.value = getOrderedChildren(vm, childComponentName, children);
  };
  const removeChild = (uid) => {
    delete children[uid];
    orderedChildren.value = orderedChildren.value.filter((children2) => children2.uid !== uid);
  };
  return {
    children: orderedChildren,
    addChild,
    removeChild
  };
};
const carouselProps = buildProps({
  initialIndex: {
    type: Number,
    default: 0
  },
  height: {
    type: String,
    default: ""
  },
  trigger: {
    type: String,
    values: ["hover", "click"],
    default: "hover"
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 3e3
  },
  indicatorPosition: {
    type: String,
    values: ["", "none", "outside"],
    default: ""
  },
  arrow: {
    type: String,
    values: ["always", "hover", "never"],
    default: "hover"
  },
  type: {
    type: String,
    values: ["", "card"],
    default: ""
  },
  loop: {
    type: Boolean,
    default: true
  },
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  pauseOnHover: {
    type: Boolean,
    default: true
  }
});
const carouselEmits = {
  change: (current, prev) => [current, prev].every(isNumber)
};
const carouselContextKey = Symbol("carouselContextKey");
const THROTTLE_TIME = 300;
const useCarousel = (props, emit, componentName) => {
  const {
    children: items,
    addChild: addItem,
    removeChild: removeItem
  } = useOrderedChildren(getCurrentInstance(), "ElCarouselItem");
  const slots = useSlots();
  const activeIndex = ref(-1);
  const timer = ref(null);
  const hover = ref(false);
  const root = ref();
  const containerHeight = ref(0);
  const isItemsTwoLength = ref(true);
  const arrowDisplay = computed(() => props.arrow !== "never" && !unref(isVertical));
  const hasLabel = computed(() => {
    return items.value.some((item) => item.props.label.toString().length > 0);
  });
  const isCardType = computed(() => props.type === "card");
  const isVertical = computed(() => props.direction === "vertical");
  const containerStyle = computed(() => {
    if (props.height !== "auto") {
      return {
        height: props.height
      };
    }
    return {
      height: `${containerHeight.value}px`,
      overflow: "hidden"
    };
  });
  const throttledArrowClick = throttle((index2) => {
    setActiveItem(index2);
  }, THROTTLE_TIME, { trailing: true });
  const throttledIndicatorHover = throttle((index2) => {
    handleIndicatorHover(index2);
  }, THROTTLE_TIME);
  const isTwoLengthShow = (index2) => {
    if (!isItemsTwoLength.value)
      return true;
    return activeIndex.value <= 1 ? index2 <= 1 : index2 > 1;
  };
  function pauseTimer() {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
  }
  function startTimer() {
    if (props.interval <= 0 || !props.autoplay || timer.value)
      return;
    timer.value = setInterval(() => playSlides(), props.interval);
  }
  const playSlides = () => {
    if (activeIndex.value < items.value.length - 1) {
      activeIndex.value = activeIndex.value + 1;
    } else if (props.loop) {
      activeIndex.value = 0;
    }
  };
  function setActiveItem(index2) {
    if (isString(index2)) {
      const filteredItems = items.value.filter((item) => item.props.name === index2);
      if (filteredItems.length > 0) {
        index2 = items.value.indexOf(filteredItems[0]);
      }
    }
    index2 = Number(index2);
    if (Number.isNaN(index2) || index2 !== Math.floor(index2)) {
      return;
    }
    const itemCount = items.value.length;
    const oldIndex = activeIndex.value;
    if (index2 < 0) {
      activeIndex.value = props.loop ? itemCount - 1 : 0;
    } else if (index2 >= itemCount) {
      activeIndex.value = props.loop ? 0 : itemCount - 1;
    } else {
      activeIndex.value = index2;
    }
    if (oldIndex === activeIndex.value) {
      resetItemPosition(oldIndex);
    }
    resetTimer();
  }
  function resetItemPosition(oldIndex) {
    items.value.forEach((item, index2) => {
      item.translateItem(index2, activeIndex.value, oldIndex);
    });
  }
  function itemInStage(item, index2) {
    var _a, _b, _c, _d;
    const _items = unref(items);
    const itemCount = _items.length;
    if (itemCount === 0 || !item.states.inStage)
      return false;
    const nextItemIndex = index2 + 1;
    const prevItemIndex = index2 - 1;
    const lastItemIndex = itemCount - 1;
    const isLastItemActive = _items[lastItemIndex].states.active;
    const isFirstItemActive = _items[0].states.active;
    const isNextItemActive = (_b = (_a = _items[nextItemIndex]) == null ? void 0 : _a.states) == null ? void 0 : _b.active;
    const isPrevItemActive = (_d = (_c = _items[prevItemIndex]) == null ? void 0 : _c.states) == null ? void 0 : _d.active;
    if (index2 === lastItemIndex && isFirstItemActive || isNextItemActive) {
      return "left";
    } else if (index2 === 0 && isLastItemActive || isPrevItemActive) {
      return "right";
    }
    return false;
  }
  function handleMouseEnter() {
    hover.value = true;
    if (props.pauseOnHover) {
      pauseTimer();
    }
  }
  function handleMouseLeave() {
    hover.value = false;
    startTimer();
  }
  function handleButtonEnter(arrow) {
    if (unref(isVertical))
      return;
    items.value.forEach((item, index2) => {
      if (arrow === itemInStage(item, index2)) {
        item.states.hover = true;
      }
    });
  }
  function handleButtonLeave() {
    if (unref(isVertical))
      return;
    items.value.forEach((item) => {
      item.states.hover = false;
    });
  }
  function handleIndicatorClick(index2) {
    activeIndex.value = index2;
  }
  function handleIndicatorHover(index2) {
    if (props.trigger === "hover" && index2 !== activeIndex.value) {
      activeIndex.value = index2;
    }
  }
  function prev() {
    setActiveItem(activeIndex.value - 1);
  }
  function next() {
    setActiveItem(activeIndex.value + 1);
  }
  function resetTimer() {
    pauseTimer();
    if (!props.pauseOnHover)
      startTimer();
  }
  function setContainerHeight(height) {
    if (props.height !== "auto")
      return;
    containerHeight.value = height;
  }
  function PlaceholderItem() {
    var _a;
    const defaultSlots = (_a = slots.default) == null ? void 0 : _a.call(slots);
    if (!defaultSlots)
      return null;
    const flatSlots = flattedChildren(defaultSlots);
    const carouselItemsName = "ElCarouselItem";
    const normalizeSlots = flatSlots.filter((slot) => {
      return isVNode(slot) && slot.type.name === carouselItemsName;
    });
    if ((normalizeSlots == null ? void 0 : normalizeSlots.length) === 2 && props.loop && !isCardType.value) {
      isItemsTwoLength.value = true;
      return normalizeSlots;
    }
    isItemsTwoLength.value = false;
    return null;
  }
  watch(() => activeIndex.value, (current, prev2) => {
    resetItemPosition(prev2);
    if (isItemsTwoLength.value) {
      current = current % 2;
      prev2 = prev2 % 2;
    }
    if (prev2 > -1) {
      emit("change", current, prev2);
    }
  });
  watch(() => props.autoplay, (autoplay) => {
    autoplay ? startTimer() : pauseTimer();
  });
  watch(() => props.loop, () => {
    setActiveItem(activeIndex.value);
  });
  watch(() => props.interval, () => {
    resetTimer();
  });
  shallowRef();
  provide(carouselContextKey, {
    root,
    isCardType,
    isVertical,
    items,
    loop: props.loop,
    addItem,
    removeItem,
    setActiveItem,
    setContainerHeight
  });
  return {
    root,
    activeIndex,
    arrowDisplay,
    hasLabel,
    hover,
    isCardType,
    items,
    isVertical,
    containerStyle,
    isItemsTwoLength,
    handleButtonEnter,
    handleButtonLeave,
    handleIndicatorClick,
    handleMouseEnter,
    handleMouseLeave,
    setActiveItem,
    prev,
    next,
    PlaceholderItem,
    isTwoLengthShow,
    throttledArrowClick,
    throttledIndicatorHover
  };
};
const _hoisted_1 = ["onMouseenter", "onClick"];
const _hoisted_2 = { key: 0 };
const COMPONENT_NAME$1 = "ElCarousel";
const __default__$1 = defineComponent({
  name: COMPONENT_NAME$1
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: carouselProps,
  emits: carouselEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    const {
      root,
      activeIndex,
      arrowDisplay,
      hasLabel,
      hover,
      isCardType,
      items,
      isVertical,
      containerStyle,
      handleButtonEnter,
      handleButtonLeave,
      handleIndicatorClick,
      handleMouseEnter,
      handleMouseLeave,
      setActiveItem,
      prev,
      next,
      PlaceholderItem,
      isTwoLengthShow,
      throttledArrowClick,
      throttledIndicatorHover
    } = useCarousel(props, emit);
    const ns = useNamespace("carousel");
    const carouselClasses = computed(() => {
      const classes = [ns.b(), ns.m(props.direction)];
      if (unref(isCardType)) {
        classes.push(ns.m("card"));
      }
      return classes;
    });
    const indicatorsClasses = computed(() => {
      const classes = [ns.e("indicators"), ns.em("indicators", props.direction)];
      if (unref(hasLabel)) {
        classes.push(ns.em("indicators", "labels"));
      }
      if (props.indicatorPosition === "outside") {
        classes.push(ns.em("indicators", "outside"));
      }
      if (unref(isVertical)) {
        classes.push(ns.em("indicators", "right"));
      }
      return classes;
    });
    expose({
      setActiveItem,
      prev,
      next
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "root",
        ref: root,
        class: normalizeClass(unref(carouselClasses)),
        onMouseenter: _cache[6] || (_cache[6] = withModifiers((...args) => unref(handleMouseEnter) && unref(handleMouseEnter)(...args), ["stop"])),
        onMouseleave: _cache[7] || (_cache[7] = withModifiers((...args) => unref(handleMouseLeave) && unref(handleMouseLeave)(...args), ["stop"]))
      }, [
        createElementVNode("div", {
          class: normalizeClass(unref(ns).e("container")),
          style: normalizeStyle(unref(containerStyle))
        }, [
          unref(arrowDisplay) ? (openBlock(), createBlock(Transition, {
            key: 0,
            name: "carousel-arrow-left",
            persisted: ""
          }, {
            default: withCtx(() => [
              withDirectives(createElementVNode("button", {
                type: "button",
                class: normalizeClass([unref(ns).e("arrow"), unref(ns).em("arrow", "left")]),
                onMouseenter: _cache[0] || (_cache[0] = ($event) => unref(handleButtonEnter)("left")),
                onMouseleave: _cache[1] || (_cache[1] = (...args) => unref(handleButtonLeave) && unref(handleButtonLeave)(...args)),
                onClick: _cache[2] || (_cache[2] = withModifiers(($event) => unref(throttledArrowClick)(unref(activeIndex) - 1), ["stop"]))
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(arrow_left_default))
                  ]),
                  _: 1
                })
              ], 34), [
                [
                  vShow,
                  (_ctx.arrow === "always" || unref(hover)) && (props.loop || unref(activeIndex) > 0)
                ]
              ])
            ]),
            _: 1
          })) : createCommentVNode("v-if", true),
          unref(arrowDisplay) ? (openBlock(), createBlock(Transition, {
            key: 1,
            name: "carousel-arrow-right",
            persisted: ""
          }, {
            default: withCtx(() => [
              withDirectives(createElementVNode("button", {
                type: "button",
                class: normalizeClass([unref(ns).e("arrow"), unref(ns).em("arrow", "right")]),
                onMouseenter: _cache[3] || (_cache[3] = ($event) => unref(handleButtonEnter)("right")),
                onMouseleave: _cache[4] || (_cache[4] = (...args) => unref(handleButtonLeave) && unref(handleButtonLeave)(...args)),
                onClick: _cache[5] || (_cache[5] = withModifiers(($event) => unref(throttledArrowClick)(unref(activeIndex) + 1), ["stop"]))
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(arrow_right_default))
                  ]),
                  _: 1
                })
              ], 34), [
                [
                  vShow,
                  (_ctx.arrow === "always" || unref(hover)) && (props.loop || unref(activeIndex) < unref(items).length - 1)
                ]
              ])
            ]),
            _: 1
          })) : createCommentVNode("v-if", true),
          createVNode(unref(PlaceholderItem)),
          renderSlot(_ctx.$slots, "default")
        ], 6),
        _ctx.indicatorPosition !== "none" ? (openBlock(), createElementBlock("ul", {
          key: 0,
          class: normalizeClass(unref(indicatorsClasses))
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(items), (item, index2) => {
            return withDirectives((openBlock(), createElementBlock("li", {
              key: index2,
              class: normalizeClass([
                unref(ns).e("indicator"),
                unref(ns).em("indicator", _ctx.direction),
                unref(ns).is("active", index2 === unref(activeIndex))
              ]),
              onMouseenter: ($event) => unref(throttledIndicatorHover)(index2),
              onClick: withModifiers(($event) => unref(handleIndicatorClick)(index2), ["stop"])
            }, [
              createElementVNode("button", {
                class: normalizeClass(unref(ns).e("button"))
              }, [
                unref(hasLabel) ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(item.props.label), 1)) : createCommentVNode("v-if", true)
              ], 2)
            ], 42, _hoisted_1)), [
              [vShow, unref(isTwoLengthShow)(index2)]
            ]);
          }), 128))
        ], 2)) : createCommentVNode("v-if", true)
      ], 34);
    };
  }
});
var Carousel = /* @__PURE__ */ _export_sfc$1(_sfc_main$2, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/carousel/src/carousel.vue"]]);
const carouselItemProps = buildProps({
  name: { type: String, default: "" },
  label: {
    type: [String, Number],
    default: ""
  }
});
const useCarouselItem = (props, componentName) => {
  const carouselContext = inject(carouselContextKey);
  const instance = getCurrentInstance();
  const carouselItemRef = ref();
  const hover = ref(false);
  const translate = ref(0);
  const scale = ref(1);
  const active = ref(false);
  const ready = ref(false);
  const inStage = ref(false);
  const animating = ref(false);
  const { isCardType, isVertical } = carouselContext;
  function handleItemClick() {
    if (carouselContext && unref(isCardType)) {
      const index2 = carouselContext.items.value.findIndex(({ uid }) => uid === instance.uid);
      carouselContext.setActiveItem(index2);
    }
  }
  onUnmounted(() => {
    carouselContext.removeItem(instance.uid);
  });
  return {
    carouselItemRef,
    active,
    animating,
    hover,
    inStage,
    isVertical,
    translate,
    isCardType,
    scale,
    ready,
    handleItemClick
  };
};
const __default__ = defineComponent({
  name: "ElCarouselItem"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: carouselItemProps,
  setup(__props) {
    const ns = useNamespace("carousel");
    const {
      carouselItemRef,
      active,
      animating,
      hover,
      inStage,
      isVertical,
      translate,
      isCardType,
      scale,
      ready,
      handleItemClick
    } = useCarouselItem();
    const itemStyle = computed(() => {
      const translateType = `translate${unref(isVertical) ? "Y" : "X"}`;
      const _translate = `${translateType}(${unref(translate)}px)`;
      const _scale = `scale(${unref(scale)})`;
      const transform = [_translate, _scale].join(" ");
      return {
        transform
      };
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("div", {
        ref_key: "carouselItemRef",
        ref: carouselItemRef,
        class: normalizeClass([
          unref(ns).e("item"),
          unref(ns).is("active", unref(active)),
          unref(ns).is("in-stage", unref(inStage)),
          unref(ns).is("hover", unref(hover)),
          unref(ns).is("animating", unref(animating)),
          {
            [unref(ns).em("item", "card")]: unref(isCardType),
            [unref(ns).em("item", "card-vertical")]: unref(isCardType) && unref(isVertical)
          }
        ]),
        style: normalizeStyle(unref(itemStyle)),
        onClick: _cache[0] || (_cache[0] = (...args) => unref(handleItemClick) && unref(handleItemClick)(...args))
      }, [
        unref(isCardType) ? withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(ns).e("mask"))
        }, null, 2)), [
          [vShow, !unref(active)]
        ]) : createCommentVNode("v-if", true),
        renderSlot(_ctx.$slots, "default")
      ], 6)), [
        [vShow, unref(ready)]
      ]);
    };
  }
});
var CarouselItem = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/carousel/src/carousel-item.vue"]]);
const ElCarousel = withInstall(Carousel, {
  CarouselItem
});
const ElCarouselItem = withNoopInstall(CarouselItem);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const headline = ref([]);
    const { data } = ([__temp, __restore] = withAsyncContext(() => request("/headline")), __temp = await __temp, __restore(), __temp);
    headline.value = data.value.data.articles;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_carousel = ElCarousel;
      const _component_el_carousel_item = ElCarouselItem;
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_SomeArticle = __nuxt_component_4;
      const _component_RightMain = __nuxt_component_5;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_el_carousel, {
        height: "50vh",
        interval: 8e3,
        arrow: "always"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(headline), (data2) => {
              _push2(ssrRenderComponent(_component_el_carousel_item, {
                key: data2._id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<a${ssrRenderAttr("href", `/article/${data2._id}`)} target="_blank" data-v-4932ca42${_scopeId2}><img${ssrRenderAttr("src", `https://blog-1308532731.cos.ap-guangzhou.myqcloud.com/${data2.HeadImg}`)} alt="" data-v-4932ca42${_scopeId2}><div class="vcenter" data-v-4932ca42${_scopeId2}>${ssrInterpolate(data2.title)}</div></a>`);
                  } else {
                    return [
                      createVNode("a", {
                        href: `/article/${data2._id}`,
                        target: "_blank"
                      }, [
                        createVNode("img", {
                          src: `https://blog-1308532731.cos.ap-guangzhou.myqcloud.com/${data2.HeadImg}`,
                          alt: ""
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "vcenter" }, toDisplayString(data2.title), 1)
                      ], 8, ["href"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(headline), (data2) => {
                return openBlock(), createBlock(_component_el_carousel_item, {
                  key: data2._id
                }, {
                  default: withCtx(() => [
                    createVNode("a", {
                      href: `/article/${data2._id}`,
                      target: "_blank"
                    }, [
                      createVNode("img", {
                        src: `https://blog-1308532731.cos.ap-guangzhou.myqcloud.com/${data2.HeadImg}`,
                        alt: ""
                      }, null, 8, ["src"]),
                      createVNode("div", { class: "vcenter" }, toDisplayString(data2.title), 1)
                    ], 8, ["href"])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_row, {
        gutter: 10,
        justify: "center",
        style: { "max-width": "100cw" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_col, {
              xs: 24,
              sm: 24,
              md: 24,
              lg: 8
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_SomeArticle, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_SomeArticle)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_col, {
              xs: 0,
              sm: 24,
              md: 24,
              lg: 4
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_RightMain, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_RightMain)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_col, {
                xs: 24,
                sm: 24,
                md: 24,
                lg: 8
              }, {
                default: withCtx(() => [
                  createVNode(_component_SomeArticle)
                ]),
                _: 1
              }),
              createVNode(_component_el_col, {
                xs: 0,
                sm: 24,
                md: 24,
                lg: 4
              }, {
                default: withCtx(() => [
                  createVNode(_component_RightMain)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4932ca42"]]);

export { index as default };
//# sourceMappingURL=index-95a9c3a5.mjs.map
