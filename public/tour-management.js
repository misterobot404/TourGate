(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tour-management"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/TourManagement/EditDialog.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--10-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/TourManagement/EditDialog.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
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
  name: "EditDialog",
  props: {
    showEditDialog: Boolean
  },
  data: function data() {
    return {
      valid: null,
      loading: false,
      editableTour: null,
      snackbar: false
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])('tours', ['tours', 'editableTourId'])),
  watch: {
    editableTourId: {
      immediate: true,
      handler: 'getEditableTourClone'
    }
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])('tours', {
    updateTourAction: 'updateTour',
    getFilesActions: 'getFiles'
  })), {}, {
    getEditableTourClone: function getEditableTourClone() {
      var _this = this;

      this.editableTour = Object.assign({}, this.tours.find(function (obj) {
        return obj.id === _this.editableTourId;
      }));

      if (this.editableTour.author_doc) {
        this.editableTour.author_doc.forEach(function (part, index) {
          this[index] = this[index].replace(/^.*[\\\/]/, '');
        }, this.editableTour.author_doc); // use arr as this
      }
    },
    updateTour: function updateTour() {
      var _this2 = this;

      var formData = new FormData();
      formData.append('title', this.editableTour.title);
      formData.append('description', this.editableTour.description);
      formData.append('image', this.editableTour.image);

      if (!this.editableTour.isSection) {
        formData.append('source_url', this.editableTour.source_url);
        formData.append('address', this.editableTour.address);
        formData.append('organization_name', this.editableTour.organization_name);
        formData.append('organization_phone', this.editableTour.organization_phone);
        formData.append('organization_email', this.editableTour.organization_email);
        formData.append('organization_address', this.editableTour.organization_address);
      }

      var payload = {
        tourId: this.editableTour.id,
        tour: formData
      };
      this.loading = true;
      this.updateTourAction(payload).then(function () {
        _this2.$emit('update:showEditDialog', false);

        _this2.snackbar = true;
      })["finally"](function () {
        _this2.loading = false;
      });
    },
    getFiles: function getFiles() {
      this.getFilesActions();
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/TourManagement.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--10-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/TourManagement.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _components_BreadcrumbsNavigation_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/BreadcrumbsNavigation.vue */ "./resources/js/components/BreadcrumbsNavigation.vue");
/* harmony import */ var _components_TourManagement_CreateDialog_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/TourManagement/CreateDialog.vue */ "./resources/js/components/TourManagement/CreateDialog.vue");
/* harmony import */ var _components_TourManagement_EditDialog_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/TourManagement/EditDialog.vue */ "./resources/js/components/TourManagement/EditDialog.vue");
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
  name: "TourManagement",
  components: {
    BreadcrumbsNavigation: _components_BreadcrumbsNavigation_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    CreateDialog: _components_TourManagement_CreateDialog_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    EditDialog: _components_TourManagement_EditDialog_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  data: function data() {
    return {
      firstLoading: true,
      editDialog: false,
      createDialog: false,
      createDialogType: "Tour",
      publishTourLoading: false,
      restoreTourLoading: false,
      destroyTourLoading: false
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])('tours', ['tours', 'editableTourId'])),
  methods: _objectSpread(_objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])('tours', {
    getTours: 'getTours',
    publishTourAction: 'publishTour',
    restoreTourAction: 'restoreTour',
    destroyTourAction: 'destroyTour'
  })), Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapMutations"])('tours', ['SET_EDITABLE_TOUR_ID'])), {}, {
    // If the pressed card is a section, open children section, else open source_url on new tab
    cardClickBehavior: function cardClickBehavior(tour) {
      if (this.$route.params.status === 'published') {
        if (tour.isSection) {
          this.$router.push({
            name: 'TourManagement',
            params: {
              status: this.$route.params.status,
              id: tour.id
            }
          });
        } else window.open(tour.source_url);
      }
    },
    // card actions
    publishTour: function publishTour(tourId) {
      var _this = this;

      this.publishTourLoading = true;
      this.publishTourAction(tourId)["finally"](function () {
        _this.publishTourLoading = false;
      });
    },
    restoreTour: function restoreTour(tourId) {
      var _this2 = this;

      this.restoreTourLoading = true;
      this.restoreTourAction(tourId)["finally"](function () {
        _this2.restoreTourLoading = false;
      });
    },
    destroyTour: function destroyTour(tourId) {
      var _this3 = this;

      if (this.$route.params.status === 'published') {
        this.destroyTourLoading = true;
        this.destroyTourAction(tourId)["finally"](function () {
          _this3.destroyTourLoading = false;
        });
      } else if (confirm("Вы действительно хотите безвозвратно удалить туристический объект? Вложенные тур. объекты так же будут удалены.")) {
        this.destroyTourLoading = true;
        this.destroyTourAction(tourId)["finally"](function () {
          _this3.destroyTourLoading = false;
        });
      }
    },
    // dialogs
    showEditDialog: function showEditDialog(editableTourId) {
      this.SET_EDITABLE_TOUR_ID(editableTourId);
      this.editDialog = true;
    },
    showCreateDialog: function showCreateDialog(dialogType) {
      this.createDialogType = dialogType;
      this.createDialog = true;
    }
  }),
  // get tours via API
  created: function created() {
    var _this4 = this;

    this.getTours({
      status: this.$route.params.status,
      parent_id: this.$route.params.id
    }).then(function () {
      _this4.firstLoading = false;
    });
  },
  // get tours via API after route.param changes
  beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
    this.getTours({
      status: to.params.status,
      parent_id: to.params.id
    }).then(function () {
      next();
    });
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/TourManagement/EditDialog.vue?vue&type=template&id=e65901ea&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--10-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/TourManagement/EditDialog.vue?vue&type=template&id=e65901ea& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
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
      _c(
        "v-dialog",
        {
          attrs: {
            value: _vm.showEditDialog,
            "max-width": !_vm.editableTour.isSection ? 1140 : 540,
            "overlay-opacity": "0.2"
          },
          on: {
            input: function(v) {
              return _vm.$emit("update:showEditDialog", v)
            }
          }
        },
        [
          _c(
            "v-card",
            [
              _c(
                "v-toolbar",
                { staticClass: "pr-1", attrs: { height: "68", flat: "" } },
                [
                  _c(
                    "v-icon",
                    { staticClass: "mr-3", attrs: { "x-large": "" } },
                    [_vm._v("\n                    edit\n                ")]
                  ),
                  _vm._v(" "),
                  _c("v-toolbar-title", [
                    _vm._v(" Редактирование "),
                    _vm.editableTour.isSection
                      ? _c("span", [_vm._v("категории")])
                      : _c("span", [_vm._v("тура")])
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c("v-divider"),
              _vm._v(" "),
              _c(
                "v-card-text",
                { staticClass: "pb-0" },
                [
                  _c(
                    "v-form",
                    {
                      ref: "form",
                      model: {
                        value: _vm.valid,
                        callback: function($$v) {
                          _vm.valid = $$v
                        },
                        expression: "valid"
                      }
                    },
                    [
                      _c(
                        "v-container",
                        { staticClass: "pb-0" },
                        [
                          _c(
                            "v-row",
                            { attrs: { "no-gutters": "" } },
                            [
                              _c(
                                "v-col",
                                [
                                  _c(
                                    "v-row",
                                    [
                                      _c(
                                        "v-card-subtitle",
                                        { staticClass: "pb-1 pt-3" },
                                        [
                                          _vm._v(
                                            "Информация о " +
                                              _vm._s(
                                                !_vm.editableTour.isSection
                                                  ? "туре"
                                                  : "категории"
                                              ) +
                                              "*"
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "v-col",
                                        {
                                          staticClass: "pb-0 pt-3",
                                          attrs: { cols: "12" }
                                        },
                                        [
                                          _c("v-text-field", {
                                            attrs: {
                                              label: "Название*",
                                              filled: "",
                                              rules: [
                                                function(v) {
                                                  return (
                                                    !!v || "Введите название"
                                                  )
                                                }
                                              ],
                                              required: ""
                                            },
                                            model: {
                                              value: _vm.editableTour.title,
                                              callback: function($$v) {
                                                _vm.$set(
                                                  _vm.editableTour,
                                                  "title",
                                                  typeof $$v === "string"
                                                    ? $$v.trim()
                                                    : $$v
                                                )
                                              },
                                              expression: "editableTour.title"
                                            }
                                          })
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "v-col",
                                        {
                                          staticClass: "pb-0 pt-1",
                                          attrs: { cols: "12" }
                                        },
                                        [
                                          _vm.editableTour.image_url
                                            ? _c(
                                                "div",
                                                { staticClass: "d-flex mb-8" },
                                                [
                                                  _c("v-text-field", {
                                                    attrs: {
                                                      value:
                                                        _vm.editableTour
                                                          .image_url,
                                                      "prepend-icon":
                                                        "add_a_photo",
                                                      readonly: "",
                                                      "hide-details": "",
                                                      label: "Медиа",
                                                      filled: ""
                                                    }
                                                  }),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-icon",
                                                    {
                                                      staticClass: "ml-2",
                                                      on: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          _vm.editableTour.image_url = null
                                                        }
                                                      }
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                                close\n                                            "
                                                      )
                                                    ]
                                                  )
                                                ],
                                                1
                                              )
                                            : _c("v-file-input", {
                                                attrs: {
                                                  label: "Медиа",
                                                  filled: "",
                                                  rules: [
                                                    function(v) {
                                                      return (
                                                        !!v ||
                                                        "Выберите картинку"
                                                      )
                                                    },
                                                    function(v) {
                                                      return (
                                                        (!!v && v.size < 4e6) ||
                                                        "Выберите картинку меньше 4 Mб"
                                                      )
                                                    }
                                                  ],
                                                  accept: "image/*",
                                                  "prepend-icon": "add_a_photo",
                                                  required: ""
                                                },
                                                model: {
                                                  value: _vm.editableTour.image,
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.editableTour,
                                                      "image",
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "editableTour.image"
                                                }
                                              })
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "v-col",
                                        {
                                          staticClass: "pb-0 pt-1",
                                          attrs: { cols: "12" }
                                        },
                                        [
                                          _c("v-textarea", {
                                            attrs: {
                                              filled: "",
                                              label: "Описание*",
                                              "auto-grow": "",
                                              rules: [
                                                function(v) {
                                                  return (
                                                    !!v || "Введите описание"
                                                  )
                                                }
                                              ],
                                              required: ""
                                            },
                                            model: {
                                              value:
                                                _vm.editableTour.description,
                                              callback: function($$v) {
                                                _vm.$set(
                                                  _vm.editableTour,
                                                  "description",
                                                  typeof $$v === "string"
                                                    ? $$v.trim()
                                                    : $$v
                                                )
                                              },
                                              expression:
                                                "editableTour.description"
                                            }
                                          })
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      !_vm.editableTour.isSection
                                        ? _c(
                                            "v-col",
                                            {
                                              staticClass: "pb-0 pt-1",
                                              attrs: { cols: "12" }
                                            },
                                            [
                                              _c("v-text-field", {
                                                attrs: {
                                                  label:
                                                    "Месторасположение тур. объекта*",
                                                  filled: "",
                                                  rules: [
                                                    function(v) {
                                                      return (
                                                        !!v ||
                                                        "Введите месторасположение тур. объекта"
                                                      )
                                                    }
                                                  ],
                                                  required: ""
                                                },
                                                model: {
                                                  value:
                                                    _vm.editableTour.address,
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.editableTour,
                                                      "address",
                                                      typeof $$v === "string"
                                                        ? $$v.trim()
                                                        : $$v
                                                    )
                                                  },
                                                  expression:
                                                    "editableTour.address"
                                                }
                                              })
                                            ],
                                            1
                                          )
                                        : _vm._e()
                                    ],
                                    1
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              !_vm.editableTour.isSection
                                ? [
                                    _c("v-divider", {
                                      staticClass: "mx-3",
                                      attrs: { vertical: "" }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "v-col",
                                      [
                                        _c(
                                          "v-row",
                                          [
                                            _c(
                                              "v-card-subtitle",
                                              { staticClass: "pb-1 pt-3" },
                                              [
                                                _vm._v(
                                                  "Информация об организации"
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-col",
                                              {
                                                staticClass: "pb-0 pt-3",
                                                attrs: { cols: "12" }
                                              },
                                              [
                                                _c("v-text-field", {
                                                  attrs: {
                                                    label:
                                                      "Название организации",
                                                    filled: "",
                                                    required: ""
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.editableTour
                                                        .organization_name,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editableTour,
                                                        "organization_name",
                                                        typeof $$v === "string"
                                                          ? $$v.trim()
                                                          : $$v
                                                      )
                                                    },
                                                    expression:
                                                      "editableTour.organization_name"
                                                  }
                                                })
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-col",
                                              {
                                                staticClass: "pb-0 pt-1",
                                                attrs: { cols: "12" }
                                              },
                                              [
                                                _c("v-text-field", {
                                                  attrs: {
                                                    label:
                                                      "Телефон организации",
                                                    filled: "",
                                                    required: ""
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.editableTour
                                                        .organization_phone,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editableTour,
                                                        "organization_phone",
                                                        typeof $$v === "string"
                                                          ? $$v.trim()
                                                          : $$v
                                                      )
                                                    },
                                                    expression:
                                                      "editableTour.organization_phone"
                                                  }
                                                })
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-col",
                                              {
                                                staticClass: "pb-0 pt-1",
                                                attrs: { cols: "12" }
                                              },
                                              [
                                                _c("v-text-field", {
                                                  attrs: {
                                                    label:
                                                      "Эл. почта организации",
                                                    filled: "",
                                                    required: ""
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.editableTour
                                                        .organization_email,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editableTour,
                                                        "organization_email",
                                                        typeof $$v === "string"
                                                          ? $$v.trim()
                                                          : $$v
                                                      )
                                                    },
                                                    expression:
                                                      "editableTour.organization_email"
                                                  }
                                                })
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-col",
                                              {
                                                staticClass: "pb-0 pt-1",
                                                attrs: { cols: "12" }
                                              },
                                              [
                                                _c("v-text-field", {
                                                  attrs: {
                                                    label: "Адрес организации",
                                                    filled: "",
                                                    required: ""
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.editableTour
                                                        .organization_address,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editableTour,
                                                        "organization_address",
                                                        typeof $$v === "string"
                                                          ? $$v.trim()
                                                          : $$v
                                                      )
                                                    },
                                                    expression:
                                                      "editableTour.organization_address"
                                                  }
                                                })
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-col",
                                              {
                                                staticClass: "pb-0 pt-1",
                                                attrs: { cols: "12" }
                                              },
                                              [
                                                _c("v-text-field", {
                                                  attrs: {
                                                    label: "Ссылка на источник",
                                                    filled: "",
                                                    required: ""
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.editableTour
                                                        .source_url,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editableTour,
                                                        "source_url",
                                                        typeof $$v === "string"
                                                          ? $$v.trim()
                                                          : $$v
                                                      )
                                                    },
                                                    expression:
                                                      "editableTour.source_url"
                                                  }
                                                })
                                              ],
                                              1
                                            )
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c("v-divider", {
                                      staticClass: "mx-3",
                                      attrs: { vertical: "" }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "v-col",
                                      { attrs: { cols: "4" } },
                                      [
                                        _c(
                                          "v-row",
                                          [
                                            _c(
                                              "v-card-subtitle",
                                              { staticClass: "pb-1 pt-3" },
                                              [_vm._v("Информация о заявителе")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-col",
                                              {
                                                staticClass: "pb-0 pt-3",
                                                attrs: { cols: "12" }
                                              },
                                              [
                                                _c("v-text-field", {
                                                  attrs: {
                                                    disabled: "",
                                                    label: "Автор",
                                                    filled: "",
                                                    required: ""
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.editableTour.author,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editableTour,
                                                        "author",
                                                        typeof $$v === "string"
                                                          ? $$v.trim()
                                                          : $$v
                                                      )
                                                    },
                                                    expression:
                                                      "editableTour.author"
                                                  }
                                                })
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-col",
                                              {
                                                staticClass: "pb-0 pt-3",
                                                attrs: { cols: "12" }
                                              },
                                              [
                                                _c("v-text-field", {
                                                  attrs: {
                                                    disabled: "",
                                                    label: "Телефон заявителя",
                                                    filled: "",
                                                    required: ""
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.editableTour
                                                        .author_phone,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editableTour,
                                                        "author_phone",
                                                        typeof $$v === "string"
                                                          ? $$v.trim()
                                                          : $$v
                                                      )
                                                    },
                                                    expression:
                                                      "editableTour.author_phone"
                                                  }
                                                })
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-col",
                                              {
                                                staticClass: "pb-0 pt-1",
                                                attrs: { cols: "12" }
                                              },
                                              [
                                                _c("v-text-field", {
                                                  attrs: {
                                                    disabled: "",
                                                    label:
                                                      "Эл. почта заявителя",
                                                    filled: "",
                                                    required: ""
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.editableTour
                                                        .author_email,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editableTour,
                                                        "author_email",
                                                        typeof $$v === "string"
                                                          ? $$v.trim()
                                                          : $$v
                                                      )
                                                    },
                                                    expression:
                                                      "editableTour.author_email"
                                                  }
                                                })
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-col",
                                              {
                                                staticClass: "pb-0 pt-1",
                                                attrs: { cols: "12" },
                                                on: { click: _vm.getFiles }
                                              },
                                              [
                                                _c("v-select", {
                                                  attrs: {
                                                    items:
                                                      _vm.editableTour
                                                        .author_doc,
                                                    value:
                                                      _vm.editableTour
                                                        .author_doc,
                                                    chips: "",
                                                    "prepend-icon": "post_add",
                                                    multiple: "",
                                                    readonly: "",
                                                    label: "Документы"
                                                  }
                                                })
                                              ],
                                              1
                                            )
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    )
                                  ]
                                : _vm._e()
                            ],
                            2
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-card-actions",
                { staticClass: "px-9 pb-4" },
                [
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "px-7",
                      attrs: { rounded: "", depressed: "" },
                      on: {
                        click: function($event) {
                          _vm.$emit("update:showEditDialog", false)
                          _vm.getEditableTourClone()
                        }
                      }
                    },
                    [_vm._v("\n                    Отмена\n                ")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "px-7",
                      attrs: {
                        rounded: "",
                        depressed: "",
                        loading: _vm.loading,
                        disabled: !_vm.valid
                      },
                      on: { click: _vm.updateTour }
                    },
                    [
                      _vm._v(
                        "\n                    Подтвердить\n                "
                      )
                    ]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-snackbar",
        {
          attrs: { timeout: 3000 },
          model: {
            value: _vm.snackbar,
            callback: function($$v) {
              _vm.snackbar = $$v
            },
            expression: "snackbar"
          }
        },
        [_vm._v("\n        Туристический объект изменён.\n    ")]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/TourManagement.vue?vue&type=template&id=0b2f6d04&":
/*!*******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--10-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/TourManagement.vue?vue&type=template&id=0b2f6d04& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************/
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
      _vm.$route.params.status === "published"
        ? _c(
            "div",
            { staticClass: "mb-6 mt-4" },
            [
              _c(
                "v-btn",
                {
                  staticClass: "mr-2",
                  attrs: { rounded: "" },
                  on: {
                    click: function($event) {
                      return _vm.showCreateDialog("Section")
                    }
                  }
                },
                [_vm._v("\n            Добавить категорию\n        ")]
              ),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  attrs: { rounded: "" },
                  on: {
                    click: function($event) {
                      return _vm.showCreateDialog("Tour")
                    }
                  }
                },
                [_vm._v("\n            Добавить тур\n        ")]
              )
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      !_vm.firstLoading ? _c("BreadcrumbsNavigation") : _vm._e(),
      _vm._v(" "),
      _c(
        "v-row",
        { staticClass: "mb-6", attrs: { dense: "" } },
        _vm._l(_vm.tours, function(tour, index) {
          return _c(
            "v-col",
            {
              key: tour.id,
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
                                    { attrs: { group: "" } },
                                    [
                                      !hover &&
                                      _vm.$route.params.status !== "published"
                                        ? _c("v-card-subtitle", {
                                            key: "parent_name",
                                            staticClass: "py-0 pl-5",
                                            staticStyle: {
                                              "text-align": "left",
                                              color: "white"
                                            },
                                            domProps: {
                                              textContent: _vm._s(
                                                tour.parent_name
                                              )
                                            }
                                          })
                                        : _vm._e(),
                                      _vm._v(" "),
                                      !hover
                                        ? _c("v-card-title", {
                                            key: "title",
                                            staticClass: "display-1 pt-0 pl-5",
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
                                { attrs: { group: "" } },
                                [
                                  hover && _vm.$route.params.status === "new"
                                    ? _c(
                                        "v-btn",
                                        {
                                          key: "publish",
                                          staticStyle: {
                                            top: "10px",
                                            right: "130px",
                                            "z-index": "6"
                                          },
                                          attrs: {
                                            loading: _vm.publishTourLoading,
                                            fab: "",
                                            absolute: "",
                                            dark: "",
                                            top: "",
                                            right: ""
                                          },
                                          on: {
                                            click: function($event) {
                                              $event.stopPropagation()
                                              return _vm.publishTour(tour.id)
                                            }
                                          }
                                        },
                                        [_c("v-icon", [_vm._v("check")])],
                                        1
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  hover &&
                                  _vm.$route.params.status === "deleted"
                                    ? _c(
                                        "v-btn",
                                        {
                                          key: "restore",
                                          staticStyle: {
                                            top: "10px",
                                            right: "130px",
                                            "z-index": "6"
                                          },
                                          attrs: {
                                            loading: _vm.restoreTourLoading,
                                            fab: "",
                                            absolute: "",
                                            dark: "",
                                            top: "",
                                            right: ""
                                          },
                                          on: {
                                            click: function($event) {
                                              $event.stopPropagation()
                                              return _vm.restoreTour(tour.id)
                                            }
                                          }
                                        },
                                        [_c("v-icon", [_vm._v("undo")])],
                                        1
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  hover
                                    ? _c(
                                        "v-btn",
                                        {
                                          key: "delete",
                                          staticStyle: {
                                            top: "10px",
                                            right: "10px",
                                            "z-index": "6"
                                          },
                                          attrs: {
                                            loading: _vm.destroyTourLoading,
                                            fab: "",
                                            absolute: "",
                                            dark: "",
                                            top: "",
                                            right: ""
                                          },
                                          on: {
                                            click: function($event) {
                                              $event.stopPropagation()
                                              return _vm.destroyTour(tour.id)
                                            }
                                          }
                                        },
                                        [_c("v-icon", [_vm._v("delete")])],
                                        1
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  hover
                                    ? _c(
                                        "v-btn",
                                        {
                                          key: "edit",
                                          staticStyle: {
                                            top: "10px",
                                            right: "70px",
                                            "z-index": "6"
                                          },
                                          attrs: {
                                            fab: "",
                                            absolute: "",
                                            dark: "",
                                            top: "",
                                            right: ""
                                          },
                                          on: {
                                            click: function($event) {
                                              $event.stopPropagation()
                                              return _vm.showEditDialog(tour.id)
                                            }
                                          }
                                        },
                                        [_c("v-icon", [_vm._v("edit")])],
                                        1
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  hover
                                    ? _c(
                                        "v-overlay",
                                        {
                                          key: "overlay",
                                          staticClass: "px-8 text-center",
                                          attrs: {
                                            absolute: "",
                                            color: "#036358"
                                          }
                                        },
                                        [
                                          _c("div", {
                                            staticClass: "title mx-auto",
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
                                                staticClass: "title mx-auto",
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
                                                staticClass: "title mx-auto",
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
                                                staticClass: "title mx-auto",
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
                                                staticClass: "title mx-auto",
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
                                                staticClass: "title mx-auto",
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
        1
      ),
      _vm._v(" "),
      _c("CreateDialog", {
        attrs: {
          showCreateDialog: _vm.createDialog,
          dialogType: _vm.createDialogType
        },
        on: {
          "update:showCreateDialog": function($event) {
            _vm.createDialog = $event
          },
          "update:show-create-dialog": function($event) {
            _vm.createDialog = $event
          }
        }
      }),
      _vm._v(" "),
      _vm.editableTourId !== null
        ? _c("EditDialog", {
            attrs: { showEditDialog: _vm.editDialog },
            on: {
              "update:showEditDialog": function($event) {
                _vm.editDialog = $event
              },
              "update:show-edit-dialog": function($event) {
                _vm.editDialog = $event
              }
            }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/TourManagement/EditDialog.vue":
/*!***************************************************************!*\
  !*** ./resources/js/components/TourManagement/EditDialog.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditDialog_vue_vue_type_template_id_e65901ea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditDialog.vue?vue&type=template&id=e65901ea& */ "./resources/js/components/TourManagement/EditDialog.vue?vue&type=template&id=e65901ea&");
/* harmony import */ var _EditDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditDialog.vue?vue&type=script&lang=js& */ "./resources/js/components/TourManagement/EditDialog.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VDialog */ "./node_modules/vuetify/lib/components/VDialog/index.js");
/* harmony import */ var vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VDivider */ "./node_modules/vuetify/lib/components/VDivider/index.js");
/* harmony import */ var vuetify_lib_components_VFileInput__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VFileInput */ "./node_modules/vuetify/lib/components/VFileInput/index.js");
/* harmony import */ var vuetify_lib_components_VForm__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VForm */ "./node_modules/vuetify/lib/components/VForm/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VSelect__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vuetify/lib/components/VSelect */ "./node_modules/vuetify/lib/components/VSelect/index.js");
/* harmony import */ var vuetify_lib_components_VSnackbar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vuetify/lib/components/VSnackbar */ "./node_modules/vuetify/lib/components/VSnackbar/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");
/* harmony import */ var vuetify_lib_components_VTextarea__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! vuetify/lib/components/VTextarea */ "./node_modules/vuetify/lib/components/VTextarea/index.js");
/* harmony import */ var vuetify_lib_components_VToolbar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! vuetify/lib/components/VToolbar */ "./node_modules/vuetify/lib/components/VToolbar/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EditDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditDialog_vue_vue_type_template_id_e65901ea___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EditDialog_vue_vue_type_template_id_e65901ea___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */





















_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCard"],VCardActions: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardActions"],VCardSubtitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardSubtitle"],VCardText: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardText"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VCol"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VContainer"],VDialog: vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_7__["VDialog"],VDivider: vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_8__["VDivider"],VFileInput: vuetify_lib_components_VFileInput__WEBPACK_IMPORTED_MODULE_9__["VFileInput"],VForm: vuetify_lib_components_VForm__WEBPACK_IMPORTED_MODULE_10__["VForm"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_11__["VIcon"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VRow"],VSelect: vuetify_lib_components_VSelect__WEBPACK_IMPORTED_MODULE_12__["VSelect"],VSnackbar: vuetify_lib_components_VSnackbar__WEBPACK_IMPORTED_MODULE_13__["VSnackbar"],VSpacer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VSpacer"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_14__["VTextField"],VTextarea: vuetify_lib_components_VTextarea__WEBPACK_IMPORTED_MODULE_15__["VTextarea"],VToolbar: vuetify_lib_components_VToolbar__WEBPACK_IMPORTED_MODULE_16__["VToolbar"],VToolbarTitle: vuetify_lib_components_VToolbar__WEBPACK_IMPORTED_MODULE_16__["VToolbarTitle"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/TourManagement/EditDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/TourManagement/EditDialog.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/TourManagement/EditDialog.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vuetify-loader/lib/loader.js??ref--10-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditDialog.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/TourManagement/EditDialog.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/TourManagement/EditDialog.vue?vue&type=template&id=e65901ea&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/TourManagement/EditDialog.vue?vue&type=template&id=e65901ea& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditDialog_vue_vue_type_template_id_e65901ea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vuetify-loader/lib/loader.js??ref--10-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditDialog.vue?vue&type=template&id=e65901ea& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/TourManagement/EditDialog.vue?vue&type=template&id=e65901ea&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditDialog_vue_vue_type_template_id_e65901ea___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditDialog_vue_vue_type_template_id_e65901ea___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/TourManagement.vue":
/*!***********************************************!*\
  !*** ./resources/js/pages/TourManagement.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TourManagement_vue_vue_type_template_id_0b2f6d04___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TourManagement.vue?vue&type=template&id=0b2f6d04& */ "./resources/js/pages/TourManagement.vue?vue&type=template&id=0b2f6d04&");
/* harmony import */ var _TourManagement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TourManagement.vue?vue&type=script&lang=js& */ "./resources/js/pages/TourManagement.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_transitions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/transitions */ "./node_modules/vuetify/lib/components/transitions/index.js");
/* harmony import */ var vuetify_lib_components_VHover__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VHover */ "./node_modules/vuetify/lib/components/VHover/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VImg */ "./node_modules/vuetify/lib/components/VImg/index.js");
/* harmony import */ var vuetify_lib_components_VOverlay__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VOverlay */ "./node_modules/vuetify/lib/components/VOverlay/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TourManagement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TourManagement_vue_vue_type_template_id_0b2f6d04___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TourManagement_vue_vue_type_template_id_0b2f6d04___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */












_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCard"],VCardSubtitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardSubtitle"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardTitle"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VCol"],VFadeTransition: vuetify_lib_components_transitions__WEBPACK_IMPORTED_MODULE_7__["VFadeTransition"],VHover: vuetify_lib_components_VHover__WEBPACK_IMPORTED_MODULE_8__["VHover"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_9__["VIcon"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_10__["VImg"],VOverlay: vuetify_lib_components_VOverlay__WEBPACK_IMPORTED_MODULE_11__["VOverlay"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__["VRow"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/TourManagement.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/TourManagement.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/pages/TourManagement.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TourManagement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vuetify-loader/lib/loader.js??ref--10-0!../../../node_modules/vue-loader/lib??vue-loader-options!./TourManagement.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/TourManagement.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TourManagement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/TourManagement.vue?vue&type=template&id=0b2f6d04&":
/*!******************************************************************************!*\
  !*** ./resources/js/pages/TourManagement.vue?vue&type=template&id=0b2f6d04& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TourManagement_vue_vue_type_template_id_0b2f6d04___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vuetify-loader/lib/loader.js??ref--10-0!../../../node_modules/vue-loader/lib??vue-loader-options!./TourManagement.vue?vue&type=template&id=0b2f6d04& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/TourManagement.vue?vue&type=template&id=0b2f6d04&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TourManagement_vue_vue_type_template_id_0b2f6d04___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TourManagement_vue_vue_type_template_id_0b2f6d04___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);