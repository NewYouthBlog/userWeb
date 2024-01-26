import { _ as __nuxt_component_0 } from './PageHeaders-e1004e23.mjs';
import { E as ElRow, a as ElCol } from './el-col-f312c428.mjs';
import { _ as __nuxt_component_4, a as __nuxt_component_5 } from './RightMain-59585080.mjs';
import { _ as _export_sfc, u as useRoute } from '../server.mjs';
import { useSSRContext, defineComponent, withCtx, unref, createVNode, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import '@vueuse/core';
import '@ctrl/tinycolor';
import '@vue/shared';
import 'lodash-unified';
import '@popperjs/core';
import './requests-81cacf38.mjs';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@unhead/shared';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[tag]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const name = route.params.tag;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeaders = __nuxt_component_0;
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_SomeArticle = __nuxt_component_4;
      const _component_RightMain = __nuxt_component_5;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_PageHeaders, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-00d2d019${_scopeId}>\u548C${ssrInterpolate(unref(name))}\u76F8\u5173\u7684\u6587\u7AE0</span>`);
          } else {
            return [
              createVNode("span", null, "\u548C" + toDisplayString(unref(name)) + "\u76F8\u5173\u7684\u6587\u7AE0", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_row, {
        gutter: 10,
        justify: "center",
        style: { "margin": "0", "padding": "0" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_col, {
              xs: 24,
              sm: 18,
              md: 12,
              lg: 9
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
              sm: 18,
              md: 24,
              lg: 5
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
                sm: 18,
                md: 12,
                lg: 9
              }, {
                default: withCtx(() => [
                  createVNode(_component_SomeArticle)
                ]),
                _: 1
              }),
              createVNode(_component_el_col, {
                xs: 0,
                sm: 18,
                md: 24,
                lg: 5
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tag].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _tag_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-00d2d019"]]);

export { _tag_ as default };
//# sourceMappingURL=_tag_-b9d31bc8.mjs.map
