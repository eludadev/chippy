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
          (openBlock(true), createElementBlock(Fragment, null, renderList(props.chips, ({ color, value }, index2) => {
            return openBlock(), createElementBlock("li", {
              role: "listitem",
              class: "order-1",
              style: normalizeStyle({ order: props.chips.length - (index2 + 1) }),
              key: value
            }, [
              createVNode(_sfc_main$2, {
                value,
                color,
                onDelete: ($event) => emit("delete", index2)
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
    function onDeleteChip(index2) {
      state.chips.splice(index2, 1);
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
var index = /* @__PURE__ */ (() => `/*! tailwindcss v3.0.24 | MIT License | https://tailwindcss.com*/*,:after,:before{border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:""}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4}body{line-height:inherit;margin:0}hr{border-top-width:1px;color:inherit;height:0}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{color:inherit;font-family:inherit;font-size:100%;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{color:#9ca3af;opacity:1}input:-ms-input-placeholder,textarea:-ms-input-placeholder{color:#9ca3af;opacity:1}input::placeholder,textarea::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}[hidden]{display:none}[multiple],[type=date],[type=datetime-local],[type=email],[type=month],[type=number],[type=password],[type=search],[type=tel],[type=text],[type=time],[type=url],[type=week],select,textarea{--tw-shadow:0 0 #0000;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;border-color:#6b7280;border-radius:0;border-width:1px;font-size:1rem;line-height:1.5rem;padding:.5rem .75rem}[multiple]:focus,[type=date]:focus,[type=datetime-local]:focus,[type=email]:focus,[type=month]:focus,[type=number]:focus,[type=password]:focus,[type=search]:focus,[type=tel]:focus,[type=text]:focus,[type=time]:focus,[type=url]:focus,[type=week]:focus,select:focus,textarea:focus{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#2563eb;--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);border-color:#2563eb;box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);outline:2px solid transparent;outline-offset:2px}input::-moz-placeholder,textarea::-moz-placeholder{color:#6b7280;opacity:1}input:-ms-input-placeholder,textarea:-ms-input-placeholder{color:#6b7280;opacity:1}input::placeholder,textarea::placeholder{color:#6b7280;opacity:1}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-date-and-time-value{min-height:1.5em}::-webkit-datetime-edit,::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-meridiem-field,::-webkit-datetime-edit-millisecond-field,::-webkit-datetime-edit-minute-field,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-second-field,::-webkit-datetime-edit-year-field{padding-bottom:0;padding-top:0}select{color-adjust:exact;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E");background-position:right .5rem center;background-repeat:no-repeat;background-size:1.5em 1.5em;padding-right:2.5rem;-webkit-print-color-adjust:exact;print-color-adjust:exact}[multiple]{color-adjust:unset;background-image:none;background-position:0 0;background-repeat:unset;background-size:initial;padding-right:.75rem;-webkit-print-color-adjust:unset;print-color-adjust:unset}[type=checkbox],[type=radio]{color-adjust:exact;--tw-shadow:0 0 #0000;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;background-origin:border-box;border-color:#6b7280;border-width:1px;color:#2563eb;display:inline-block;flex-shrink:0;height:1rem;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle;width:1rem}[type=checkbox]{border-radius:0}[type=radio]{border-radius:100%}[type=checkbox]:focus,[type=radio]:focus{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:2px;--tw-ring-offset-color:#fff;--tw-ring-color:#2563eb;--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);outline:2px solid transparent;outline-offset:2px}[type=checkbox]:checked,[type=radio]:checked{background-color:currentColor;background-position:50%;background-repeat:no-repeat;background-size:100% 100%;border-color:transparent}[type=checkbox]:checked{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 16 16' fill='%23fff' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.207 4.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L6.5 9.086l4.293-4.293a1 1 0 0 1 1.414 0z'/%3E%3C/svg%3E")}[type=radio]:checked{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 16 16' fill='%23fff' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='3'/%3E%3C/svg%3E")}[type=checkbox]:checked:focus,[type=checkbox]:checked:hover,[type=radio]:checked:focus,[type=radio]:checked:hover{background-color:currentColor;border-color:transparent}[type=checkbox]:indeterminate{background-color:currentColor;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3E%3C/svg%3E");background-position:50%;background-repeat:no-repeat;background-size:100% 100%;border-color:transparent}[type=checkbox]:indeterminate:focus,[type=checkbox]:indeterminate:hover{background-color:currentColor;border-color:transparent}[type=file]{background:unset;border-color:inherit;border-radius:0;border-width:0;font-size:unset;line-height:inherit;padding:0}[type=file]:focus{outline:1px solid ButtonText;outline:1px auto -webkit-focus-ring-color}*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.sr-only{clip:rect(0,0,0,0);border-width:0;height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.pointer-events-none{pointer-events:none}.visible{visibility:visible}.absolute{position:absolute}.relative{position:relative}.top-\\[2px\\]{top:2px}.left-2{left:.5rem}.top-1\\/2{top:50%}.right-1\\.5{right:.375rem}.right-1{right:.25rem}.order-2{order:2}.order-1{order:1}.ml-2{margin-left:.5rem}.mb-2{margin-bottom:.5rem}.block{display:block}.flex{display:flex}.hidden{display:none}.h-full{height:100%}.h-4{height:1rem}.w-full{width:100%}.w-4{width:1rem}.grow{flex-grow:1}.basis-20{flex-basis:5rem}.basis-full{flex-basis:100%}.translate-y-32{--tw-translate-y:8rem}.transform,.translate-y-32{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.flex-wrap{flex-wrap:wrap}.gap-1{gap:.25rem}.overflow-hidden{overflow:hidden}.rounded{border-radius:.25rem}.rounded-full{border-radius:9999px}.bg-stone-800{--tw-bg-opacity:1;background-color:rgb(41 37 36/var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.fill-black{fill:#000}.px-2{padding-left:.5rem;padding-right:.5rem}.py-2{padding-bottom:.5rem;padding-top:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.py-0\\.5{padding-bottom:.125rem;padding-top:.125rem}.px-4{padding-left:1rem;padding-right:1rem}.py-0{padding-bottom:0;padding-top:0}.pl-4{padding-left:1rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-stone-50{--tw-text-opacity:1;color:rgb(250 250 249/var(--tw-text-opacity))}.opacity-0{opacity:0}.outline{outline-style:solid}.outline-2{outline-width:2px}.brightness-50{--tw-brightness:brightness(.5)}.brightness-50,.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition-transform{transition-duration:.15s;transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-text-decoration-color,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-text-decoration-color,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.container{width:100%}@media (min-width:640px){.container{max-width:640px}}@media (min-width:768px){.container{max-width:768px}}@media (min-width:1024px){.container{max-width:1024px}}@media (min-width:1280px){.container{max-width:1280px}}@media (min-width:1536px){.container{max-width:1536px}}.hover\\:brightness-110:hover{--tw-brightness:brightness(1.1)}.hover\\:brightness-110:hover,.hover\\:filter:hover{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.focus\\:outline-0:focus{outline-width:0}.focus\\:brightness-110:focus{--tw-brightness:brightness(1.1)}.active\\:brightness-90:active,.focus\\:brightness-110:focus,.focus\\:filter:focus{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.active\\:brightness-90:active{--tw-brightness:brightness(.9)}.group:hover .group-hover\\:-translate-x-1\\.5{--tw-translate-x:-.375rem}.group:hover .group-hover\\:-translate-x-1,.group:hover .group-hover\\:-translate-x-1\\.5{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:-translate-x-1{--tw-translate-x:-.25rem}.group:hover .group-hover\\:-translate-y-1\\/2{--tw-translate-y:-50%}.group:focus .group-focus\\:-translate-x-1\\.5,.group:hover .group-hover\\:-translate-y-1\\/2{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:focus .group-focus\\:-translate-x-1\\.5{--tw-translate-x:-.375rem}.group:focus .group-focus\\:-translate-x-1{--tw-translate-x:-.25rem}.group:focus .group-focus\\:-translate-x-1,.group:focus .group-focus\\:-translate-y-1\\/2{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:focus .group-focus\\:-translate-y-1\\/2{--tw-translate-y:-50%}
`)();
export { Chippy as default };
