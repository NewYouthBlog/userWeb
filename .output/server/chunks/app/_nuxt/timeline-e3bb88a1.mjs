import { _ as __nuxt_component_0 } from './PageHeaders-e1004e23.mjs';
import { defineComponent, provide, h, renderSlot, computed, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, normalizeStyle, createBlock, withCtx, resolveDynamicComponent, createCommentVNode, toDisplayString, useSSRContext, ref, withAsyncContext, createVNode, Fragment, renderList } from 'vue';
import { m as useNamespace, h as buildProps, j as iconPropType, E as ElIcon, w as withInstall, o as withNoopInstall, _ as _export_sfc, n as _export_sfc$1 } from '../server.mjs';
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
import '@vue/shared';
import 'lodash-unified';
import '@popperjs/core';
import '@ctrl/tinycolor';

const Timeline = defineComponent({
  name: "ElTimeline",
  setup(_, { slots }) {
    const ns = useNamespace("timeline");
    provide("timeline", slots);
    return () => {
      return h("ul", { class: [ns.b()] }, [renderSlot(slots, "default")]);
    };
  }
});
const timelineItemProps = buildProps({
  timestamp: {
    type: String,
    default: ""
  },
  hideTimestamp: {
    type: Boolean,
    default: false
  },
  center: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String,
    values: ["top", "bottom"],
    default: "bottom"
  },
  type: {
    type: String,
    values: ["primary", "success", "warning", "danger", "info"],
    default: ""
  },
  color: {
    type: String,
    default: ""
  },
  size: {
    type: String,
    values: ["normal", "large"],
    default: "normal"
  },
  icon: {
    type: iconPropType
  },
  hollow: {
    type: Boolean,
    default: false
  }
});
const __default__ = defineComponent({
  name: "ElTimelineItem"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: timelineItemProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("timeline-item");
    const defaultNodeKls = computed(() => [
      ns.e("node"),
      ns.em("node", props.size || ""),
      ns.em("node", props.type || ""),
      ns.is("hollow", props.hollow)
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("li", {
        class: normalizeClass([unref(ns).b(), { [unref(ns).e("center")]: _ctx.center }])
      }, [
        createElementVNode("div", {
          class: normalizeClass(unref(ns).e("tail"))
        }, null, 2),
        !_ctx.$slots.dot ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(defaultNodeKls)),
          style: normalizeStyle({
            backgroundColor: _ctx.color
          })
        }, [
          _ctx.icon ? (openBlock(), createBlock(unref(ElIcon), {
            key: 0,
            class: normalizeClass(unref(ns).e("icon"))
          }, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon)))
            ]),
            _: 1
          }, 8, ["class"])) : createCommentVNode("v-if", true)
        ], 6)) : createCommentVNode("v-if", true),
        _ctx.$slots.dot ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(unref(ns).e("dot"))
        }, [
          renderSlot(_ctx.$slots, "dot")
        ], 2)) : createCommentVNode("v-if", true),
        createElementVNode("div", {
          class: normalizeClass(unref(ns).e("wrapper"))
        }, [
          !_ctx.hideTimestamp && _ctx.placement === "top" ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass([unref(ns).e("timestamp"), unref(ns).is("top")])
          }, toDisplayString(_ctx.timestamp), 3)) : createCommentVNode("v-if", true),
          createElementVNode("div", {
            class: normalizeClass(unref(ns).e("content"))
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2),
          !_ctx.hideTimestamp && _ctx.placement === "bottom" ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass([unref(ns).e("timestamp"), unref(ns).is("bottom")])
          }, toDisplayString(_ctx.timestamp), 3)) : createCommentVNode("v-if", true)
        ], 2)
      ], 2);
    };
  }
});
var TimelineItem = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/timeline/src/timeline-item.vue"]]);
const ElTimeline = withInstall(Timeline, {
  TimelineItem
});
const ElTimelineItem = withNoopInstall(TimelineItem);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "timeline",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const groups = ref([]);
    const { data } = ([__temp, __restore] = withAsyncContext(() => request("/archive")), __temp = await __temp, __restore(), __temp);
    groups.value = data.value.data;
    groups.value.forEach((item) => {
      if (item._id.year === 2022) {
        item.color = "#0bbd87";
      } else if (item._id.year === 2023) {
        item.color = "#5cbfef";
      } else if (item._id.year === 2024) {
        item.color = "#f0ad4e";
      } else if (item._id.year === 2025) {
        item.color = "#d9534f";
      } else if (item._id.year === 2026) {
        item.color = "#5cbfef";
      } else if (item._id.year === 2027) {
        item.color = "#f0ad4e";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeaders = __nuxt_component_0;
      const _component_el_timeline = ElTimeline;
      const _component_el_timeline_item = ElTimelineItem;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_PageHeaders, { style: { "background-image": "url('https://blog-1308532731.cos.ap-guangzhou.myqcloud.com/416969.jpg')" } }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-fc13b86d${_scopeId}>\u535A\u5BA2\u65F6\u95F4\u7EBF</span>`);
          } else {
            return [
              createVNode("span", null, "\u535A\u5BA2\u65F6\u95F4\u7EBF")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<main class="main" data-v-fc13b86d><div class="container" data-v-fc13b86d>`);
      _push(ssrRenderComponent(_component_el_timeline, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(groups), (activity, index) => {
              _push2(ssrRenderComponent(_component_el_timeline_item, {
                key: index,
                color: activity.color,
                placement: "top",
                timestamp: activity._id.year + "-" + activity._id.month + "-" + activity._id.day,
                hollow: true
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(activity.articles, (content) => {
                      _push3(`<a${ssrRenderAttr("href", `/article/${content._id}`)} target="_blank" data-v-fc13b86d${_scopeId2}><p data-v-fc13b86d${_scopeId2}>${ssrInterpolate(content.title)}</p></a>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(activity.articles, (content) => {
                        return openBlock(), createBlock("a", {
                          href: `/article/${content._id}`,
                          target: "_blank"
                        }, [
                          createVNode("p", null, toDisplayString(content.title), 1)
                        ], 8, ["href"]);
                      }), 256))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(groups), (activity, index) => {
                return openBlock(), createBlock(_component_el_timeline_item, {
                  key: index,
                  color: activity.color,
                  placement: "top",
                  timestamp: activity._id.year + "-" + activity._id.month + "-" + activity._id.day,
                  hollow: true
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(activity.articles, (content) => {
                      return openBlock(), createBlock("a", {
                        href: `/article/${content._id}`,
                        target: "_blank"
                      }, [
                        createVNode("p", null, toDisplayString(content.title), 1)
                      ], 8, ["href"]);
                    }), 256))
                  ]),
                  _: 2
                }, 1032, ["color", "timestamp"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></main><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/timeline.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const timeline = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fc13b86d"]]);

export { timeline as default };
//# sourceMappingURL=timeline-e3bb88a1.mjs.map
