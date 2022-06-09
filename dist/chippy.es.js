import { getCurrentInstance, onBeforeMount, nextTick, getCurrentScope, onScopeDispose, ref, reactive, onMounted, computed, watch, openBlock, createElementBlock, createElementVNode, normalizeStyle, unref, toDisplayString, Fragment, renderList, createBlock, TransitionGroup, withCtx, normalizeClass, renderSlot, createVNode, withModifiers } from "vue";
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
var _a;
const isClient = typeof window !== "undefined";
isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function increaseWithUnit(target, delta) {
  var _a2;
  if (typeof target === "number")
    return target + delta;
  const value = ((_a2 = target.match(/^-?[0-9]+\.?[0-9]*/)) == null ? void 0 : _a2[0]) || "";
  const unit = target.slice(value.length);
  const result = parseFloat(value) + delta;
  if (Number.isNaN(result))
    return target;
  return result + unit;
}
function tryOnBeforeMount(fn, sync = true) {
  if (getCurrentInstance())
    onBeforeMount(fn);
  else if (sync)
    fn();
  else
    nextTick(fn);
}
const defaultWindow = isClient ? window : void 0;
isClient ? window.document : void 0;
isClient ? window.navigator : void 0;
isClient ? window.location : void 0;
function useMediaQuery(query, options = {}) {
  const { window: window2 = defaultWindow } = options;
  const isSupported = Boolean(window2 && "matchMedia" in window2);
  let mediaQuery;
  const matches = ref(false);
  const update = () => {
    if (!isSupported)
      return;
    if (!mediaQuery)
      mediaQuery = window2.matchMedia(query);
    matches.value = mediaQuery.matches;
  };
  tryOnBeforeMount(() => {
    update();
    if (!mediaQuery)
      return;
    if ("addEventListener" in mediaQuery)
      mediaQuery.addEventListener("change", update);
    else
      mediaQuery.addListener(update);
    tryOnScopeDispose(() => {
      if ("removeEventListener" in mediaQuery)
        mediaQuery.removeEventListener("change", update);
      else
        mediaQuery.removeListener(update);
    });
  });
  return matches;
}
const breakpointsTailwind = {
  "sm": 640,
  "md": 768,
  "lg": 1024,
  "xl": 1280,
  "2xl": 1536
};
var __defProp$g = Object.defineProperty;
var __getOwnPropSymbols$i = Object.getOwnPropertySymbols;
var __hasOwnProp$i = Object.prototype.hasOwnProperty;
var __propIsEnum$i = Object.prototype.propertyIsEnumerable;
var __defNormalProp$g = (obj, key, value) => key in obj ? __defProp$g(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$g = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$i.call(b, prop))
      __defNormalProp$g(a, prop, b[prop]);
  if (__getOwnPropSymbols$i)
    for (var prop of __getOwnPropSymbols$i(b)) {
      if (__propIsEnum$i.call(b, prop))
        __defNormalProp$g(a, prop, b[prop]);
    }
  return a;
};
function useBreakpoints(breakpoints, options = {}) {
  function getValue(k, delta) {
    let v = breakpoints[k];
    if (delta != null)
      v = increaseWithUnit(v, delta);
    if (typeof v === "number")
      v = `${v}px`;
    return v;
  }
  const { window: window2 = defaultWindow } = options;
  function match(query) {
    if (!window2)
      return false;
    return window2.matchMedia(query).matches;
  }
  const greater = (k) => {
    return useMediaQuery(`(min-width: ${getValue(k)})`, options);
  };
  const shortcutMethods = Object.keys(breakpoints).reduce((shortcuts, k) => {
    Object.defineProperty(shortcuts, k, {
      get: () => greater(k),
      enumerable: true,
      configurable: true
    });
    return shortcuts;
  }, {});
  return __spreadValues$g({
    greater,
    smaller(k) {
      return useMediaQuery(`(max-width: ${getValue(k, -0.1)})`, options);
    },
    between(a, b) {
      return useMediaQuery(`(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`, options);
    },
    isGreater(k) {
      return match(`(min-width: ${getValue(k)})`);
    },
    isSmaller(k) {
      return match(`(max-width: ${getValue(k, -0.1)})`);
    },
    isInBetween(a, b) {
      return match(`(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`);
    }
  }, shortcutMethods);
}
const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
_global[globalKey];
var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
function toConsistentCase(str) {
  if (str.length) {
    const source = str.slice(-1);
    return convertToCase(str, source);
  } else {
    return "";
  }
}
function convertToCase(value, source) {
  const isLower = source.length ? isLowerCase(source.slice(-1)) : false;
  return isLower ? value.toLowerCase() : value.toUpperCase();
}
function isLowerCase(str) {
  return str === str.toLowerCase();
}
const _hoisted_1$2 = { class: "relative overflow-hidden w-full h-full" };
const _hoisted_2$2 = ["id", "placeholder", "list", "value"];
const _hoisted_3$1 = { class: "opacity-0" };
const _hoisted_4 = { id: "autocomplete-list" };
const _hoisted_5 = ["value"];
const _sfc_main$3 = {
  __name: "ChipInputArea",
  props: {
    id: {
      type: String,
      default: ""
    },
    autocomplete: {
      type: Array,
      default: []
    },
    color: {
      type: String,
      default: "#fff"
    },
    placeholder: {
      type: String,
      default: ""
    },
    modelValue: {
      type: String
    }
  },
  emits: {
    submit: {
      value: String
    },
    "last-backspace": {
      value: null
    },
    "update:modelValue": {
      value: String
    }
  },
  setup(__props, { expose, emit }) {
    const props = __props;
    const input = ref(null);
    const state = reactive({
      autocompletePossibilities: [],
      toAutocomplete: "",
      userInput: ""
    });
    const overflow = reactive({
      isOverflow: false
    });
    const backspaceToDelete = reactive({
      keyupHappened: false
    });
    const breakpoints = useBreakpoints(breakpointsTailwind);
    const smAndLarger = breakpoints.greater("sm");
    onMounted(() => {
      state.autocompletePossibilities = props.autocomplete;
      overflow.widthPriorToOverflow = input.value.offsetWidth;
    });
    const whitespaceKeys = ["Enter", " "];
    const visibleKeys = [",", ";"];
    const submitKeys = [...whitespaceKeys, ...visibleKeys];
    function onKeyup(event) {
      const lastChar = event.target.value.slice(-1);
      const key = event.key;
      if (submitKeys.includes(lastChar) || submitKeys.includes(key)) {
        if (submitKeys.includes(lastChar)) {
          state.userInput = state.userInput.slice(0, -1);
        }
        if (state.userInput.length) {
          submit();
        } else {
          state.userInput = "";
        }
      }
      backspaceToDelete.keyupHappened = true;
    }
    const autocompleteKeys = [...submitKeys];
    function onKeydown(event) {
      const lastChar = event.target.value.slice(-1);
      const key = event.key;
      if (autocompleteKeys.includes(lastChar) || autocompleteKeys.includes(key)) {
        event.preventDefault();
        if (state.toAutocomplete) {
          submit();
        }
      }
      if (key === "Backspace" && state.userInput.length === 0 && backspaceToDelete.keyupHappened) {
        emit("last-backspace");
      }
      backspaceToDelete.keyupHappened = false;
    }
    function onInput(event) {
      let value = event.target.value.trimLeft();
      const pressedBackspace = value === state.userInput.slice(0, -1);
      if (!pressedBackspace) {
        updateAutocomplete(value.trimRight());
      } else {
        const caretPosition = event.target.selectionStart;
        if (caretPosition === value.length) {
          if (state.toAutocomplete) {
            value = state.userInput;
            clearAutocomplete();
          }
        } else {
          updateAutocomplete(value);
        }
      }
      state.userInput = value;
      input.value.value = state.userInput;
      if (!state.userInput.length) {
        overflow.isOverflow = false;
      }
      emit("update:modelValue", state.userInput);
    }
    function focus() {
      input.value.focus();
    }
    function clear() {
      input.value.value = "";
      state.userInput = "";
      emit("update:modelValue", state.userInput);
      focus();
    }
    function autocompleteInput() {
      state.userInput = state.userInput.trimRight() + state.toAutocomplete;
      clearAutocomplete();
    }
    function clearAutocomplete() {
      state.toAutocomplete = "";
    }
    function updateAutocomplete(value) {
      const getValue = () => {
        if (!props.autocomplete)
          return "";
        if (!value.length)
          return "";
        for (const candidate of props.autocomplete) {
          if (candidate.toLowerCase().startsWith(value.toLowerCase())) {
            return candidate.slice(value.length);
          }
        }
        return "";
      };
      state.toAutocomplete = convertToCase(getValue(), value);
    }
    function submit(autocomplete) {
      autocompleteInput();
      emit("submit", toConsistentCase(state.userInput));
      overflow.isOverflow = false;
    }
    const datalist = computed(() => {
      return props.autocomplete.filter((a) => a.toLowerCase().startsWith(state.userInput.toLowerCase()));
    });
    watch(() => state.userInput, updateOverflow);
    function updateOverflow() {
      const fullText = state.userInput.trimRight() + state.toAutocomplete;
      const fontSize = input.value.computedStyleMap().get("font-size").value;
      const width = input.value.offsetWidth;
      if (input.value && width / fullText.length < fontSize) {
        overflow.isOverflow = true;
      }
    }
    expose({
      clear,
      focus,
      getIsOverflow: () => overflow.isOverflow
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createElementVNode("input", {
          class: "bg-transparent w-full h-full text-stone-50 px-2 py-1 focus:outline-0 focus:filter focus:brightness-110",
          ref_key: "input",
          ref: input,
          id: props.id,
          onKeyup,
          onKeydown,
          onInput,
          style: normalizeStyle({ color: props.color }),
          placeholder: props.placeholder,
          autocomplete: "off",
          list: unref(smAndLarger) && "autocomplete-list",
          value: props.modelValue
        }, null, 44, _hoisted_2$2),
        createElementVNode("div", {
          class: "absolute top-[2px] left-2 filter brightness-50 pointer-events-none",
          style: normalizeStyle({ color: props.color })
        }, [
          createElementVNode("span", _hoisted_3$1, toDisplayString(state.userInput), 1),
          createElementVNode("span", null, toDisplayString(state.toAutocomplete), 1)
        ], 4),
        createElementVNode("datalist", _hoisted_4, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(datalist), (item) => {
            return openBlock(), createElementBlock("option", { value: item }, null, 8, _hoisted_5);
          }), 256))
        ])
      ]);
    };
  }
};
const _hoisted_1$1 = ["title"];
const _hoisted_2$1 = { class: "block relative group-focus:-translate-x-1.5 group-hover:-translate-x-1.5 transition-transform" };
const _hoisted_3 = /* @__PURE__ */ createElementVNode("svg", {
  class: "w-4 h-4 fill-black absolute top-1/2 right-1.5 transform translate-y-32 group-focus:-translate-y-1/2 group-hover:-translate-y-1/2 transition-transform",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" })
], -1);
const _sfc_main$2 = {
  __name: "ChipInputItem",
  props: {
    color: {
      type: String,
      default: "#fff"
    },
    value: {
      type: String,
      required: true
    }
  },
  emits: ["delete"],
  setup(__props, { emit }) {
    const props = __props;
    function onKeyDown(event) {
      const key = event.key;
      if (key === "Backspace") {
        emit("delete");
      }
    }
    const buttonTitle = computed(() => {
      return `Remove ${props.value}`;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        class: "block relative rounded-full py-0.5 pl-4 px-4 hover:filter hover:brightness-110 active:brightness-90 overflow-hidden group",
        style: normalizeStyle({ backgroundColor: props.color }),
        onClick: _cache[0] || (_cache[0] = ($event) => emit("delete")),
        onKeydown: onKeyDown,
        title: unref(buttonTitle)
      }, [
        createElementVNode("span", _hoisted_2$1, toDisplayString(props.value), 1),
        _hoisted_3
      ], 44, _hoisted_1$1);
    };
  }
};
var ChipInputList_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".list-enter-active[data-v-6b0c21cb],.list-leave-active[data-v-6b0c21cb],.list-move[data-v-6b0c21cb]{transition:all .2s ease}#input[data-v-6b0c21cb]{transition:none}.list-enter-from[data-v-6b0c21cb],.list-leave-to[data-v-6b0c21cb]{opacity:0;transform:translate(-10px)}.list-leave-active[data-v-6b0c21cb]{left:var(--x);position:absolute;top:var(--y)}\n")();
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$1 = {
  __name: "ChipInputList",
  props: {
    chips: {
      type: Array,
      required: true
    },
    inputIsOverflow: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    delete: {
      index: Number
    }
  },
  setup(__props, { expose, emit }) {
    const props = __props;
    const list = ref(null);
    function focusLast() {
      const container = list.value.$el;
      const children = container.children;
      if (children.length < 2)
        return;
      const elem = list.value.$el.children[1];
      setTimeout(() => elem.querySelector("button").focus(), 0);
    }
    function onBeforeLeave(el) {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--x", `${Math.round(rect.x)}px`);
      el.style.setProperty("--y", `${Math.round(rect.y)}px`);
    }
    expose({
      focusLast
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(TransitionGroup, {
        name: "list",
        ref_key: "list",
        ref: list,
        tag: "ul",
        onBeforeLeave,
        role: "listbox",
        "aria-label": "chips",
        "aria-orientation": "horizontal",
        "aria-multiselectable": "false",
        "aria-live": "polite",
        class: "flex flex-wrap gap-1"
      }, {
        default: withCtx(() => [
          (openBlock(), createElementBlock("li", {
            id: "input",
            class: normalizeClass(["basis-20 grow order-2", { "basis-full": props.inputIsOverflow }]),
            style: normalizeStyle({ order: props.chips.length + 1 }),
            key: `USERINPUT`
          }, [
            renderSlot(_ctx.$slots, "input", {}, void 0, true)
          ], 6)),
          (openBlock(true), createElementBlock(Fragment, null, renderList(props.chips, ({ color, value }, index) => {
            return openBlock(), createElementBlock("li", {
              role: "listitem",
              class: "order-1",
              style: normalizeStyle({ order: props.chips.length - (index + 1) }),
              key: value
            }, [
              createVNode(_sfc_main$2, {
                value,
                color,
                onDelete: ($event) => emit("delete", index)
              }, null, 8, ["value", "color", "onDelete"])
            ], 4);
          }), 128))
        ]),
        _: 3
      }, 512);
    };
  }
};
var ChipList = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-6b0c21cb"]]);
function generateRandomColor() {
  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const h = randomInt(0, 360);
  const s = randomInt(42, 98);
  const l = randomInt(40, 90);
  return `hsl(${h},${s}%,${l}%)`;
}
var ChipInput_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".warning[data-v-0ba06708]{outline-color:#ef4444;outline-style:solid;outline-width:2px}\n")();
const _hoisted_1 = {
  key: 0,
  for: "chips-input",
  class: "text-stone-50 text-sm ml-2 mb-2 block"
};
const _hoisted_2 = {
  key: 1,
  for: "chips-input",
  class: "sr-only"
};
const _sfc_main = {
  __name: "ChipInput",
  props: {
    autocomplete: {
      type: Array,
      default: []
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    maxChips: {
      type: Number,
      default: -1
    }
  },
  emits: ["delete:chip"],
  setup(__props, { expose, emit }) {
    const props = __props;
    const state = reactive({
      chips: [],
      color: "#fff",
      userInput: ""
    });
    const input = ref(null);
    const chipList = ref(null);
    const isWarning = computed(() => {
      return props.maxChips > 0 && state.chips.length >= props.maxChips && state.userInput.length > 0;
    });
    const isOverflow = computed(() => {
      return input.value && input.value.getIsOverflow();
    });
    function onSubmit(value) {
      if (props.maxChips > 0 && state.chips.length >= props.maxChips)
        return;
      state.chips.unshift({ value, color: state.color });
      state.color = generateRandomColor();
      clear();
    }
    function onDeleteChip(index) {
      state.chips.splice(index, 1);
      emit("delete:chip");
    }
    const breakpoints = useBreakpoints(breakpointsTailwind);
    const smAndLarger = breakpoints.greater("sm");
    function onLastBackspace() {
      if (smAndLarger.value) {
        chipList.value.focusLast();
      } else {
        deleteLastChip();
      }
      emit("delete:chip");
    }
    function deleteLastChip() {
      state.chips.shift();
    }
    function clearAll() {
      state.chips = [];
    }
    const focus = () => input.value.focus();
    const clear = () => input.value.clear();
    expose({
      focus,
      clear,
      getChips: () => state.chips,
      clearChips: clearAll
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("form", {
        class: normalizeClass(["bg-stone-800 px-2 py-2 rounded overflow-hidden", { "warning": unref(isWarning) }]),
        onSubmit: _cache[1] || (_cache[1] = withModifiers(() => {
        }, ["prevent"]))
      }, [
        props.label.length ? (openBlock(), createElementBlock("label", _hoisted_1, toDisplayString(props.label), 1)) : (openBlock(), createElementBlock("label", _hoisted_2, "Enter your tags:")),
        createVNode(ChipList, {
          chips: state.chips,
          "input-is-overflow": unref(isOverflow),
          ref_key: "chipList",
          ref: chipList,
          onDelete: onDeleteChip
        }, {
          input: withCtx(() => [
            createVNode(_sfc_main$3, {
              ref_key: "input",
              ref: input,
              id: "chips-input",
              onSubmit,
              onLastBackspace,
              color: state.color,
              placeholder: props.placeholder,
              autocomplete: props.autocomplete,
              modelValue: state.userInput,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.userInput = $event)
            }, null, 8, ["color", "placeholder", "autocomplete", "modelValue"])
          ]),
          _: 1
        }, 8, ["chips", "input-is-overflow"])
      ], 34);
    };
  }
};
var Chippy = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0ba06708"]]);
export { Chippy as default };
