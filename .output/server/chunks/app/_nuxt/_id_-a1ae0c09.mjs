import { g as getScrollBarWidth, E as ElRow, a as ElCol, b as ElButton, c as ElCard } from './el-col-f312c428.mjs';
import { h as buildProps, k as definePropType, m as useNamespace, a7 as PatchFlags, j as iconPropType, aa as ElFocusTrap, E as ElIcon, C as close_default, d as useDeprecated, F as useLocale, A as addUnit, w as withInstall, _ as _export_sfc, I as useZIndex, D as useId, e as useGlobalConfig, a9 as defaultNamespace, n as _export_sfc$1, c as createError, z as throwError, a4 as hasClass, g as getStyle, a5 as addClass, U as UPDATE_MODEL_EVENT, a8 as isBoolean, ab as ElAffix, a6 as removeClass } from '../server.mjs';
import { defineComponent, createVNode, renderSlot, h, computed, ref, createElementBlock, useSSRContext, getCurrentInstance, watch, nextTick, withAsyncContext, mergeProps, withCtx, createTextVNode, unref, isRef, onScopeDispose, resolveComponent, openBlock, createBlock, Teleport, Transition, withDirectives, createElementVNode, withModifiers, normalizeClass, toDisplayString, createCommentVNode, vShow } from 'vue';
import { NOOP } from '@vue/shared';
import { isClient, useTimeoutFn } from '@vueuse/core';
import { isUndefined } from 'lodash-unified';
import { computed as computed$1 } from '@vue/reactivity';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { r as request } from './requests-81cacf38.mjs';
import { MdCatalog, MdPreview } from 'md-editor-v3';
import '@ctrl/tinycolor';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@unhead/shared';
import '@popperjs/core';

const useLockscreen = (trigger, options = {}) => {
  if (!isRef(trigger)) {
    throwError("[useLockscreen]", "You need to pass a ref param to this function");
  }
  const ns = options.ns || useNamespace("popup");
  const hiddenCls = computed$1(() => ns.bm("parent", "hidden"));
  if (!isClient || hasClass(document.body, hiddenCls.value)) {
    return;
  }
  let scrollBarWidth = 0;
  let withoutHiddenClass = false;
  let bodyWidth = "0";
  const cleanup = () => {
    setTimeout(() => {
      removeClass(document == null ? void 0 : document.body, hiddenCls.value);
      if (withoutHiddenClass && document) {
        document.body.style.width = bodyWidth;
      }
    }, 200);
  };
  watch(trigger, (val) => {
    if (!val) {
      cleanup();
      return;
    }
    withoutHiddenClass = !hasClass(document.body, hiddenCls.value);
    if (withoutHiddenClass) {
      bodyWidth = document.body.style.width;
    }
    scrollBarWidth = getScrollBarWidth(ns.namespace.value);
    const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
    const bodyOverflowY = getStyle(document.body, "overflowY");
    if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === "scroll") && withoutHiddenClass) {
      document.body.style.width = `calc(100% - ${scrollBarWidth}px)`;
    }
    addClass(document.body, hiddenCls.value);
  });
  onScopeDispose(() => cleanup());
};
const useSameTarget = (handleClick) => {
  if (!handleClick) {
    return { onClick: NOOP, onMousedown: NOOP, onMouseup: NOOP };
  }
  let mousedownTarget = false;
  let mouseupTarget = false;
  const onClick = (e) => {
    if (mousedownTarget && mouseupTarget) {
      handleClick(e);
    }
    mousedownTarget = mouseupTarget = false;
  };
  const onMousedown = (e) => {
    mousedownTarget = e.target === e.currentTarget;
  };
  const onMouseup = (e) => {
    mouseupTarget = e.target === e.currentTarget;
  };
  return { onClick, onMousedown, onMouseup };
};
const overlayProps = buildProps({
  mask: {
    type: Boolean,
    default: true
  },
  customMaskEvent: {
    type: Boolean,
    default: false
  },
  overlayClass: {
    type: definePropType([
      String,
      Array,
      Object
    ])
  },
  zIndex: {
    type: definePropType([String, Number])
  }
});
const overlayEmits = {
  click: (evt) => evt instanceof MouseEvent
};
const BLOCK = "overlay";
var Overlay = defineComponent({
  name: "ElOverlay",
  props: overlayProps,
  emits: overlayEmits,
  setup(props, { slots, emit }) {
    const ns = useNamespace(BLOCK);
    const onMaskClick = (e) => {
      emit("click", e);
    };
    const { onClick, onMousedown, onMouseup } = useSameTarget(props.customMaskEvent ? void 0 : onMaskClick);
    return () => {
      return props.mask ? createVNode("div", {
        class: [ns.b(), props.overlayClass],
        style: {
          zIndex: props.zIndex
        },
        onClick,
        onMousedown,
        onMouseup
      }, [renderSlot(slots, "default")], PatchFlags.STYLE | PatchFlags.CLASS | PatchFlags.PROPS, ["onClick", "onMouseup", "onMousedown"]) : h("div", {
        class: props.overlayClass,
        style: {
          zIndex: props.zIndex,
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }
      }, [renderSlot(slots, "default")]);
    };
  }
});
const ElOverlay = Overlay;
const dialogContentProps = buildProps({
  center: Boolean,
  alignCenter: Boolean,
  closeIcon: {
    type: iconPropType
  },
  customClass: {
    type: String,
    default: ""
  },
  draggable: Boolean,
  fullscreen: Boolean,
  showClose: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ""
  },
  ariaLevel: {
    type: String,
    default: "2"
  }
});
const dialogProps = buildProps({
  ...dialogContentProps,
  appendToBody: Boolean,
  beforeClose: {
    type: definePropType(Function)
  },
  destroyOnClose: Boolean,
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  modal: {
    type: Boolean,
    default: true
  },
  openDelay: {
    type: Number,
    default: 0
  },
  closeDelay: {
    type: Number,
    default: 0
  },
  top: {
    type: String
  },
  modelValue: Boolean,
  modalClass: String,
  width: {
    type: [String, Number]
  },
  zIndex: {
    type: Number
  },
  trapFocus: {
    type: Boolean,
    default: false
  },
  headerAriaLevel: {
    type: String,
    default: "2"
  }
});
const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  [UPDATE_MODEL_EVENT]: (value) => isBoolean(value),
  openAutoFocus: () => true,
  closeAutoFocus: () => true
};
const useDialog = (props, targetRef) => {
  var _a;
  const instance = getCurrentInstance();
  const emit = instance.emit;
  const { nextZIndex } = useZIndex();
  let lastPosition = "";
  const titleId = useId();
  const bodyId = useId();
  const visible = ref(false);
  const closed = ref(false);
  const rendered = ref(false);
  const zIndex = ref((_a = props.zIndex) != null ? _a : nextZIndex());
  let openTimer = void 0;
  let closeTimer = void 0;
  const namespace = useGlobalConfig("namespace", defaultNamespace);
  const style = computed(() => {
    const style2 = {};
    const varPrefix = `--${namespace.value}-dialog`;
    if (!props.fullscreen) {
      if (props.top) {
        style2[`${varPrefix}-margin-top`] = props.top;
      }
      if (props.width) {
        style2[`${varPrefix}-width`] = addUnit(props.width);
      }
    }
    return style2;
  });
  const overlayDialogStyle = computed(() => {
    if (props.alignCenter) {
      return { display: "flex" };
    }
    return {};
  });
  function afterEnter() {
    emit("opened");
  }
  function afterLeave() {
    emit("closed");
    emit(UPDATE_MODEL_EVENT, false);
    if (props.destroyOnClose) {
      rendered.value = false;
    }
  }
  function beforeLeave() {
    emit("close");
  }
  function open() {
    closeTimer == null ? void 0 : closeTimer();
    openTimer == null ? void 0 : openTimer();
    if (props.openDelay && props.openDelay > 0) {
      ({ stop: openTimer } = useTimeoutFn(() => doOpen(), props.openDelay));
    } else {
      doOpen();
    }
  }
  function close() {
    openTimer == null ? void 0 : openTimer();
    closeTimer == null ? void 0 : closeTimer();
    if (props.closeDelay && props.closeDelay > 0) {
      ({ stop: closeTimer } = useTimeoutFn(() => doClose(), props.closeDelay));
    } else {
      doClose();
    }
  }
  function handleClose() {
    function hide(shouldCancel) {
      if (shouldCancel)
        return;
      closed.value = true;
      visible.value = false;
    }
    if (props.beforeClose) {
      props.beforeClose(hide);
    } else {
      close();
    }
  }
  function onModalClick() {
    if (props.closeOnClickModal) {
      handleClose();
    }
  }
  function doOpen() {
    if (!isClient)
      return;
    visible.value = true;
  }
  function doClose() {
    visible.value = false;
  }
  function onOpenAutoFocus() {
    emit("openAutoFocus");
  }
  function onCloseAutoFocus() {
    emit("closeAutoFocus");
  }
  function onFocusoutPrevented(event) {
    var _a2;
    if (((_a2 = event.detail) == null ? void 0 : _a2.focusReason) === "pointer") {
      event.preventDefault();
    }
  }
  if (props.lockScroll) {
    useLockscreen(visible);
  }
  function onCloseRequested() {
    if (props.closeOnPressEscape) {
      handleClose();
    }
  }
  watch(() => props.modelValue, (val) => {
    if (val) {
      closed.value = false;
      open();
      rendered.value = true;
      zIndex.value = isUndefined(props.zIndex) ? nextZIndex() : zIndex.value++;
      nextTick(() => {
        emit("open");
        if (targetRef.value) {
          targetRef.value.scrollTop = 0;
        }
      });
    } else {
      if (visible.value) {
        close();
      }
    }
  });
  watch(() => props.fullscreen, (val) => {
    if (!targetRef.value)
      return;
    if (val) {
      lastPosition = targetRef.value.style.transform;
      targetRef.value.style.transform = "";
    } else {
      targetRef.value.style.transform = lastPosition;
    }
  });
  return {
    afterEnter,
    afterLeave,
    beforeLeave,
    handleClose,
    onModalClick,
    close,
    doClose,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onCloseRequested,
    onFocusoutPrevented,
    titleId,
    bodyId,
    closed,
    style,
    overlayDialogStyle,
    rendered,
    visible,
    zIndex
  };
};
const drawerProps = buildProps({
  ...dialogProps,
  direction: {
    type: String,
    default: "rtl",
    values: ["ltr", "rtl", "ttb", "btt"]
  },
  size: {
    type: [String, Number],
    default: "30%"
  },
  withHeader: {
    type: Boolean,
    default: true
  },
  modalFade: {
    type: Boolean,
    default: true
  },
  headerAriaLevel: {
    type: String,
    default: "2"
  }
});
const drawerEmits = dialogEmits;
const _sfc_main$1 = defineComponent({
  name: "ElDrawer",
  components: {
    ElOverlay,
    ElFocusTrap,
    ElIcon,
    Close: close_default
  },
  inheritAttrs: false,
  props: drawerProps,
  emits: drawerEmits,
  setup(props, { slots }) {
    useDeprecated({
      scope: "el-drawer",
      from: "the title slot",
      replacement: "the header slot",
      version: "3.0.0",
      ref: "https://element-plus.org/en-US/component/drawer.html#slots"
    }, computed(() => !!slots.title));
    useDeprecated({
      scope: "el-drawer",
      from: "custom-class",
      replacement: "class",
      version: "2.3.0",
      ref: "https://element-plus.org/en-US/component/drawer.html#attributes",
      type: "Attribute"
    }, computed(() => !!props.customClass));
    const drawerRef = ref();
    const focusStartRef = ref();
    const ns = useNamespace("drawer");
    const { t } = useLocale();
    const isHorizontal = computed(() => props.direction === "rtl" || props.direction === "ltr");
    const drawerSize = computed(() => addUnit(props.size));
    return {
      ...useDialog(props, drawerRef),
      drawerRef,
      focusStartRef,
      isHorizontal,
      drawerSize,
      ns,
      t
    };
  }
});
const _hoisted_1 = ["aria-label", "aria-labelledby", "aria-describedby"];
const _hoisted_2 = ["id", "aria-level"];
const _hoisted_3 = ["aria-label"];
const _hoisted_4 = ["id"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_close = resolveComponent("close");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_focus_trap = resolveComponent("el-focus-trap");
  const _component_el_overlay = resolveComponent("el-overlay");
  return openBlock(), createBlock(Teleport, {
    to: "body",
    disabled: !_ctx.appendToBody
  }, [
    createVNode(Transition, {
      name: _ctx.ns.b("fade"),
      onAfterEnter: _ctx.afterEnter,
      onAfterLeave: _ctx.afterLeave,
      onBeforeLeave: _ctx.beforeLeave,
      persisted: ""
    }, {
      default: withCtx(() => [
        withDirectives(createVNode(_component_el_overlay, {
          mask: _ctx.modal,
          "overlay-class": _ctx.modalClass,
          "z-index": _ctx.zIndex,
          onClick: _ctx.onModalClick
        }, {
          default: withCtx(() => [
            createVNode(_component_el_focus_trap, {
              loop: "",
              trapped: _ctx.visible,
              "focus-trap-el": _ctx.drawerRef,
              "focus-start-el": _ctx.focusStartRef,
              onReleaseRequested: _ctx.onCloseRequested
            }, {
              default: withCtx(() => [
                createElementVNode("div", mergeProps({
                  ref: "drawerRef",
                  "aria-modal": "true",
                  "aria-label": _ctx.title || void 0,
                  "aria-labelledby": !_ctx.title ? _ctx.titleId : void 0,
                  "aria-describedby": _ctx.bodyId
                }, _ctx.$attrs, {
                  class: [_ctx.ns.b(), _ctx.direction, _ctx.visible && "open", _ctx.customClass],
                  style: _ctx.isHorizontal ? "width: " + _ctx.drawerSize : "height: " + _ctx.drawerSize,
                  role: "dialog",
                  onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                  }, ["stop"]))
                }), [
                  createElementVNode("span", {
                    ref: "focusStartRef",
                    class: normalizeClass(_ctx.ns.e("sr-focus")),
                    tabindex: "-1"
                  }, null, 2),
                  _ctx.withHeader ? (openBlock(), createElementBlock("header", {
                    key: 0,
                    class: normalizeClass(_ctx.ns.e("header"))
                  }, [
                    !_ctx.$slots.title ? renderSlot(_ctx.$slots, "header", {
                      key: 0,
                      close: _ctx.handleClose,
                      titleId: _ctx.titleId,
                      titleClass: _ctx.ns.e("title")
                    }, () => [
                      !_ctx.$slots.title ? (openBlock(), createElementBlock("span", {
                        key: 0,
                        id: _ctx.titleId,
                        role: "heading",
                        "aria-level": _ctx.headerAriaLevel,
                        class: normalizeClass(_ctx.ns.e("title"))
                      }, toDisplayString(_ctx.title), 11, _hoisted_2)) : createCommentVNode("v-if", true)
                    ]) : renderSlot(_ctx.$slots, "title", { key: 1 }, () => [
                      createCommentVNode(" DEPRECATED SLOT ")
                    ]),
                    _ctx.showClose ? (openBlock(), createElementBlock("button", {
                      key: 2,
                      "aria-label": _ctx.t("el.drawer.close"),
                      class: normalizeClass(_ctx.ns.e("close-btn")),
                      type: "button",
                      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClose && _ctx.handleClose(...args))
                    }, [
                      createVNode(_component_el_icon, {
                        class: normalizeClass(_ctx.ns.e("close"))
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_close)
                        ]),
                        _: 1
                      }, 8, ["class"])
                    ], 10, _hoisted_3)) : createCommentVNode("v-if", true)
                  ], 2)) : createCommentVNode("v-if", true),
                  _ctx.rendered ? (openBlock(), createElementBlock("div", {
                    key: 1,
                    id: _ctx.bodyId,
                    class: normalizeClass(_ctx.ns.e("body"))
                  }, [
                    renderSlot(_ctx.$slots, "default")
                  ], 10, _hoisted_4)) : createCommentVNode("v-if", true),
                  _ctx.$slots.footer ? (openBlock(), createElementBlock("div", {
                    key: 2,
                    class: normalizeClass(_ctx.ns.e("footer"))
                  }, [
                    renderSlot(_ctx.$slots, "footer")
                  ], 2)) : createCommentVNode("v-if", true)
                ], 16, _hoisted_1)
              ]),
              _: 3
            }, 8, ["trapped", "focus-trap-el", "focus-start-el", "onReleaseRequested"])
          ]),
          _: 3
        }, 8, ["mask", "overlay-class", "z-index", "onClick"]), [
          [vShow, _ctx.visible]
        ])
      ]),
      _: 3
    }, 8, ["name", "onAfterEnter", "onAfterLeave", "onBeforeLeave"])
  ], 8, ["disabled"]);
}
var Drawer = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["render", _sfc_render], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/drawer/src/drawer.vue"]]);
const ElDrawer = withInstall(Drawer);
const __nuxt_component_4 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  // eslint-disable-next-line vue/require-prop-types
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const preview_theme = "cyanosis";
const code_theme = "atom";
const md_moudle = "preview-only";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const drawer = ref(false);
    const route = useRoute();
    const id = route.params.id;
    const scrollElement = ref();
    const { data } = ([__temp, __restore] = withAsyncContext(() => request("/articles/" + id)), __temp = await __temp, __restore(), __temp);
    if (data.value === null) {
      throw createError({
        statusCode: 404
      });
    }
    const article = data.value.data;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_el_affix = ElAffix;
      const _component_el_button = ElButton;
      const _component_client_only = __nuxt_component_4;
      const _component_el_drawer = ElDrawer;
      const _component_ElCard = ElCard;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article" }, _attrs))} data-v-1a2f8de2>`);
      _push(ssrRenderComponent(_component_el_row, {
        gutter: 10,
        justify: "center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_col, {
              sm: 24,
              md: 10,
              lg: 10
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_col, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_affix, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_button, {
                                style: { "margin-top": "15%" },
                                class: "hidden-sm-and-up",
                                type: "primary",
                                onClick: ($event) => drawer.value = true,
                                round: ""
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` \u76EE\u5F55 `);
                                  } else {
                                    return [
                                      createTextVNode(" \u76EE\u5F55 ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_button, {
                                  style: { "margin-top": "15%" },
                                  class: "hidden-sm-and-up",
                                  type: "primary",
                                  onClick: ($event) => drawer.value = true,
                                  round: ""
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" \u76EE\u5F55 ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_client_only, null, {}, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_affix, null, {
                            default: withCtx(() => [
                              createVNode(_component_el_button, {
                                style: { "margin-top": "15%" },
                                class: "hidden-sm-and-up",
                                type: "primary",
                                onClick: ($event) => drawer.value = true,
                                round: ""
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" \u76EE\u5F55 ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_client_only, null, {
                            default: withCtx(() => [
                              createVNode(_component_el_drawer, {
                                size: "80%",
                                modelValue: unref(drawer),
                                "onUpdate:modelValue": ($event) => isRef(drawer) ? drawer.value = $event : null,
                                title: "\u76EE\u5F55",
                                "with-header": false
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_client_only, null, {
                                    default: withCtx(() => [
                                      createVNode(unref(MdCatalog), {
                                        editorId: md_moudle,
                                        scrollElement: unref(scrollElement)
                                      }, null, 8, ["scrollElement"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(MdPreview), {
                    "preview-theme": preview_theme,
                    "code-theme": code_theme,
                    "editor-id": md_moudle,
                    "model-value": unref(article).content,
                    style: { "border-radius": "5px 5px 8px 8px", "box-shadow": "var(--card-box-shadow) !important", "background": "rgba(255, 255, 255, 0.3)", "transition": "all 0.3s", "padding": "20px" }
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_col, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_affix, null, {
                          default: withCtx(() => [
                            createVNode(_component_el_button, {
                              style: { "margin-top": "15%" },
                              class: "hidden-sm-and-up",
                              type: "primary",
                              onClick: ($event) => drawer.value = true,
                              round: ""
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" \u76EE\u5F55 ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_client_only, null, {
                          default: withCtx(() => [
                            createVNode(_component_el_drawer, {
                              size: "80%",
                              modelValue: unref(drawer),
                              "onUpdate:modelValue": ($event) => isRef(drawer) ? drawer.value = $event : null,
                              title: "\u76EE\u5F55",
                              "with-header": false
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_client_only, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(MdCatalog), {
                                      editorId: md_moudle,
                                      scrollElement: unref(scrollElement)
                                    }, null, 8, ["scrollElement"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(MdPreview), {
                      "preview-theme": preview_theme,
                      "code-theme": code_theme,
                      "editor-id": md_moudle,
                      "model-value": unref(article).content,
                      style: { "border-radius": "5px 5px 8px 8px", "box-shadow": "var(--card-box-shadow) !important", "background": "rgba(255, 255, 255, 0.3)", "transition": "all 0.3s", "padding": "20px" }
                    }, null, 8, ["model-value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_col, {
              sm: 24,
              md: 4,
              lg: 4
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_ElCard, {
                    shadow: "never",
                    class: "hidden-sm-and-down"
                  }, {
                    header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="card-header" data-v-1a2f8de2${_scopeId3}><span style="${ssrRenderStyle({ "font-size": "18px", "font-weight": "600" })}" data-v-1a2f8de2${_scopeId3}>\u6587\u7AE0\u76EE\u5F55</span></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "card-header" }, [
                            createVNode("span", { style: { "font-size": "18px", "font-weight": "600" } }, "\u6587\u7AE0\u76EE\u5F55")
                          ])
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_client_only, { fallback: "\u76EE\u5F55\u751F\u6210\u4E2D..." }, {}, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_client_only, { fallback: "\u76EE\u5F55\u751F\u6210\u4E2D..." }, {
                            default: withCtx(() => [
                              createVNode(unref(MdCatalog), {
                                editorId: md_moudle,
                                scrollElement: unref(scrollElement)
                              }, null, 8, ["scrollElement"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_ElCard, {
                      shadow: "never",
                      class: "hidden-sm-and-down"
                    }, {
                      header: withCtx(() => [
                        createVNode("div", { class: "card-header" }, [
                          createVNode("span", { style: { "font-size": "18px", "font-weight": "600" } }, "\u6587\u7AE0\u76EE\u5F55")
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_client_only, { fallback: "\u76EE\u5F55\u751F\u6210\u4E2D..." }, {
                          default: withCtx(() => [
                            createVNode(unref(MdCatalog), {
                              editorId: md_moudle,
                              scrollElement: unref(scrollElement)
                            }, null, 8, ["scrollElement"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_col, {
                sm: 24,
                md: 10,
                lg: 10
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_col, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_affix, null, {
                        default: withCtx(() => [
                          createVNode(_component_el_button, {
                            style: { "margin-top": "15%" },
                            class: "hidden-sm-and-up",
                            type: "primary",
                            onClick: ($event) => drawer.value = true,
                            round: ""
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" \u76EE\u5F55 ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_client_only, null, {
                        default: withCtx(() => [
                          createVNode(_component_el_drawer, {
                            size: "80%",
                            modelValue: unref(drawer),
                            "onUpdate:modelValue": ($event) => isRef(drawer) ? drawer.value = $event : null,
                            title: "\u76EE\u5F55",
                            "with-header": false
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_client_only, null, {
                                default: withCtx(() => [
                                  createVNode(unref(MdCatalog), {
                                    editorId: md_moudle,
                                    scrollElement: unref(scrollElement)
                                  }, null, 8, ["scrollElement"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(MdPreview), {
                    "preview-theme": preview_theme,
                    "code-theme": code_theme,
                    "editor-id": md_moudle,
                    "model-value": unref(article).content,
                    style: { "border-radius": "5px 5px 8px 8px", "box-shadow": "var(--card-box-shadow) !important", "background": "rgba(255, 255, 255, 0.3)", "transition": "all 0.3s", "padding": "20px" }
                  }, null, 8, ["model-value"])
                ]),
                _: 1
              }),
              createVNode(_component_el_col, {
                sm: 24,
                md: 4,
                lg: 4
              }, {
                default: withCtx(() => [
                  createVNode(_component_ElCard, {
                    shadow: "never",
                    class: "hidden-sm-and-down"
                  }, {
                    header: withCtx(() => [
                      createVNode("div", { class: "card-header" }, [
                        createVNode("span", { style: { "font-size": "18px", "font-weight": "600" } }, "\u6587\u7AE0\u76EE\u5F55")
                      ])
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_client_only, { fallback: "\u76EE\u5F55\u751F\u6210\u4E2D..." }, {
                        default: withCtx(() => [
                          createVNode(unref(MdCatalog), {
                            editorId: md_moudle,
                            scrollElement: unref(scrollElement)
                          }, null, 8, ["scrollElement"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/article/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1a2f8de2"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-a1ae0c09.mjs.map
