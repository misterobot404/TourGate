(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tours"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Tours.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--10-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Tours.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _components_BreadcrumbsNavigation_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/BreadcrumbsNavigation.vue */ "./resources/js/components/BreadcrumbsNavigation.vue");
/* harmony import */ var _components_TourManagement_CreateDialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/TourManagement/CreateDialog */ "./resources/js/components/TourManagement/CreateDialog.vue");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Tours",
  components: {
    BreadcrumbsNavigation: _components_BreadcrumbsNavigation_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    CreateTourDialog: _components_TourManagement_CreateDialog__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      firstLoading: true,
      createDialog: false
    };
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])('tours', ['tours'])), {}, {
    last_section: function last_section() {
      return this.tours.find(function (element) {
        return element.isSection === true;
      }) === undefined;
    }
  }),
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])('tours', {
    getToursAction: 'getTours'
  })), {}, {
    // If the pressed card is a section, open children section, else open source_url on new tab
    cardClickBehavior: function cardClickBehavior(tour) {
      tour.isSection ? this.$router.push({
        name: 'Tours',
        params: {
          id: tour.id
        }
      }) : window.open(tour.source_url, '_blank').focus();
    }
  }),
  // get tours via API
  created: function created() {
    var _this = this;

    this.getToursAction({
      parent_id: this.$route.params.id
    }).then(function () {
      _this.firstLoading = false;
    });
  },
  // get tours via API after route.param changes
  beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
    this.getToursAction({
      parent_id: to.params.id
    }).then(function () {
      next();
    });
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Tours.vue?vue&type=template&id=5c70b83c&":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--10-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Tours.vue?vue&type=template&id=5c70b83c& ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      !_vm.firstLoading ? _c("BreadcrumbsNavigation") : _vm._e(),
      _vm._v(" "),
      _c(
        "v-row",
        { staticClass: "mb-6", attrs: { dense: "" } },
        [
          _vm._l(_vm.tours, function(tour, index) {
            return _c(
              "v-col",
              {
                key: tour.title,
                attrs: {
                  cols: _vm.$vuetify.breakpoint.xs ? 12 : index % 3 ? 6 : 12
                }
              },
              [
                _c("v-hover", {
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "default",
                        fn: function(ref) {
                          var hover = ref.hover
                          return [
                            _c(
                              "v-card",
                              {
                                staticClass: "overflow-hidden",
                                staticStyle: { cursor: "pointer" },
                                on: {
                                  click: function($event) {
                                    return _vm.cardClickBehavior(tour)
                                  }
                                }
                              },
                              [
                                _c(
                                  "v-img",
                                  {
                                    staticClass: "white--text align-end",
                                    attrs: {
                                      transition: "scale-transition",
                                      origin: "center center",
                                      height: "320px",
                                      src: tour.image_url,
                                      alt: tour.title,
                                      gradient:
                                        "to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    }
                                  },
                                  [
                                    _c(
                                      "v-fade-transition",
                                      [
                                        !hover
                                          ? _c("v-card-title", {
                                              staticClass: "display-1",
                                              staticStyle: {
                                                "word-break": "break-word"
                                              },
                                              domProps: {
                                                textContent: _vm._s(tour.title)
                                              }
                                            })
                                          : _vm._e()
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-fade-transition",
                                  [
                                    hover
                                      ? _c(
                                          "v-overlay",
                                          {
                                            staticClass: "px-8 text-center",
                                            attrs: {
                                              absolute: "",
                                              color: "#036358"
                                            }
                                          },
                                          [
                                            _c("div", {
                                              staticClass: "title",
                                              staticStyle: {
                                                "white-space": "pre-wrap"
                                              },
                                              domProps: {
                                                textContent: _vm._s(
                                                  tour.description
                                                )
                                              },
                                              on: {
                                                click: function($event) {
                                                  $event.stopPropagation()
                                                }
                                              }
                                            }),
                                            _vm._v(" "),
                                            tour.organization_name
                                              ? _c("div", {
                                                  staticClass: "title",
                                                  domProps: {
                                                    textContent: _vm._s(
                                                      tour.organization_name
                                                    )
                                                  },
                                                  on: {
                                                    click: function($event) {
                                                      $event.stopPropagation()
                                                    }
                                                  }
                                                })
                                              : _vm._e(),
                                            _vm._v(" "),
                                            tour.organization_address
                                              ? _c("div", {
                                                  staticClass: "title",
                                                  domProps: {
                                                    textContent: _vm._s(
                                                      tour.organization_address
                                                    )
                                                  },
                                                  on: {
                                                    click: function($event) {
                                                      $event.stopPropagation()
                                                    }
                                                  }
                                                })
                                              : _vm._e(),
                                            _vm._v(" "),
                                            tour.organization_phone
                                              ? _c("div", {
                                                  staticClass: "title",
                                                  domProps: {
                                                    textContent: _vm._s(
                                                      tour.organization_phone
                                                    )
                                                  },
                                                  on: {
                                                    click: function($event) {
                                                      $event.stopPropagation()
                                                    }
                                                  }
                                                })
                                              : _vm._e(),
                                            _vm._v(" "),
                                            tour.organization_email
                                              ? _c("div", {
                                                  staticClass: "title",
                                                  domProps: {
                                                    textContent: _vm._s(
                                                      tour.organization_email
                                                    )
                                                  },
                                                  on: {
                                                    click: function($event) {
                                                      $event.stopPropagation()
                                                    }
                                                  }
                                                })
                                              : _vm._e(),
                                            _vm._v(" "),
                                            tour.source_url
                                              ? _c("div", {
                                                  staticClass: "title",
                                                  domProps: {
                                                    textContent: _vm._s(
                                                      tour.source_url
                                                    )
                                                  },
                                                  on: {
                                                    click: function($event) {
                                                      $event.stopPropagation()
                                                    }
                                                  }
                                                })
                                              : _vm._e()
                                          ]
                                        )
                                      : _vm._e()
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ]
                        }
                      }
                    ],
                    null,
                    true
                  )
                })
              ],
              1
            )
          }),
          _vm._v(" "),
          _vm.last_section && !_vm.firstLoading
            ? _c(
                "v-col",
                {
                  staticClass: "text-center",
                  attrs: {
                    cols: _vm.$vuetify.breakpoint.xs
                      ? 12
                      : (_vm.tours.length + 1) % 3
                      ? 12
                      : 6
                  }
                },
                [
                  _c("v-hover", {
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "default",
                          fn: function(ref) {
                            var hover = ref.hover
                            return [
                              _c(
                                "v-card",
                                {
                                  staticClass: "overflow-hidden",
                                  staticStyle: { background: "none" },
                                  attrs: { flat: "" }
                                },
                                [
                                  _c("div", {
                                    staticStyle: {
                                      height: "320px",
                                      background:
                                        "linear-gradient(to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3))"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "v-overlay",
                                    {
                                      attrs: {
                                        absolute: "",
                                        opacity: "0.2",
                                        color: "#036358"
                                      }
                                    },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass: "title mx-auto",
                                          staticStyle: { "max-width": "70%" }
                                        },
                                        [
                                          _vm._v(
                                            "\n                            Поделитесь интересным местом с другими!\n                        "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "v-btn",
                                        {
                                          staticClass: "mt-2 v-btn--active",
                                          attrs: {
                                            large: "",
                                            rounded: "",
                                            text: ""
                                          },
                                          on: {
                                            click: function($event) {
                                              _vm.createDialog = true
                                            }
                                          }
                                        },
                                        [
                                          _vm._v(
                                            "\n                            Добавить\n                        "
                                          )
                                        ]
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ]
                          }
                        }
                      ],
                      null,
                      false,
                      1236261734
                    )
                  })
                ],
                1
              )
            : _vm._e()
        ],
        2
      ),
      _vm._v(" "),
      _c("CreateTourDialog", {
        attrs: { showCreateDialog: _vm.createDialog, dialogType: "Tour" },
        on: {
          "update:showCreateDialog": function($event) {
            _vm.createDialog = $event
          },
          "update:show-create-dialog": function($event) {
            _vm.createDialog = $event
          }
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/Tours.vue":
/*!**************************************!*\
  !*** ./resources/js/pages/Tours.vue ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tours_vue_vue_type_template_id_5c70b83c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tours.vue?vue&type=template&id=5c70b83c& */ "./resources/js/pages/Tours.vue?vue&type=template&id=5c70b83c&");
/* harmony import */ var _Tours_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tours.vue?vue&type=script&lang=js& */ "./resources/js/pages/Tours.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_transitions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/transitions */ "./node_modules/vuetify/lib/components/transitions/index.js");
/* harmony import */ var vuetify_lib_components_VHover__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VHover */ "./node_modules/vuetify/lib/components/VHover/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");
/* harmony import */ var vuetify_lib_components_VOverlay__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VOverlay */ "./node_modules/vuetify/lib/components/VOverlay/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Tours_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Tours_vue_vue_type_template_id_5c70b83c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Tours_vue_vue_type_template_id_5c70b83c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */










_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCard"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardTitle"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VCol"],VFadeTransition: vuetify_lib_components_transitions__WEBPACK_IMPORTED_MODULE_7__["VFadeTransition"],VHover: vuetify_lib_components_VHover__WEBPACK_IMPORTED_MODULE_8__["VHover"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__["VImg"],VOverlay: vuetify_lib_components_VOverlay__WEBPACK_IMPORTED_MODULE_10__["VOverlay"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VRow"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Tours.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Tours.vue?vue&type=script&lang=js&":
/*!***************************************************************!*\
  !*** ./resources/js/pages/Tours.vue?vue&type=script&lang=js& ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tours_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vuetify-loader/lib/loader.js??ref--10-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Tours.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Tours.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tours_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Tours.vue?vue&type=template&id=5c70b83c&":
/*!*********************************************************************!*\
  !*** ./resources/js/pages/Tours.vue?vue&type=template&id=5c70b83c& ***!
  \*********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tours_vue_vue_type_template_id_5c70b83c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vuetify-loader/lib/loader.js??ref--10-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Tours.vue?vue&type=template&id=5c70b83c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Tours.vue?vue&type=template&id=5c70b83c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tours_vue_vue_type_template_id_5c70b83c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tours_vue_vue_type_template_id_5c70b83c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);