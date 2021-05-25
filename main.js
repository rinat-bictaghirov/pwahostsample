(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Rinat\Trash\pwahost\pwahost\src\main.ts */"zUnb");


/***/ }),

/***/ "9sn9":
/*!***********************************************!*\
  !*** ./src/app/scanner-listener.component.ts ***!
  \***********************************************/
/*! exports provided: ScannerListenerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScannerListenerComponent", function() { return ScannerListenerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class ScannerListenerComponent {
    constructor() {
        this.onScanned = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onScanFailed = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.mode = 'test-mode';
        this.lastKeyDownStamp = 0;
    }
    keyInput(event) {
        const t0 = this.lastKeyDownStamp;
        this.lastKeyDownStamp = performance.now();
        const time = this.lastKeyDownStamp - t0;
        console.log(`ScannerListener[${this.mode}]::keyInput > got event`, event);
        console.log(`ScannerListener[${this.mode}]::keyInput > time is`, time);
        if (time > 1000) {
            this.keyboardInputStreak = undefined;
            console.log(`ScannerListener[${this.mode}]::keyInput > key time out`);
        }
        if (event.key === 'Enter') {
            console.log(`ScannerListener[${this.mode}]::keyInput > found streak end key`);
            if (!this.keyboardInputStreak) {
                return;
            }
            console.log(`ScannerListener[${this.mode}]::keyInput > current streak is ${this.keyboardInputStreak}`);
            let convertedInput = undefined;
            const inputIsValid = this.modeMatchesScannedInputFormat(this.keyboardInputStreak);
            console.log(`ScannerListener[${this.mode}]::keyInput > input was ${inputIsValid ? 'valid' : 'invalid'}`);
            if (inputIsValid) {
                convertedInput = this.convertRawInput(this.keyboardInputStreak);
            }
            if (convertedInput) {
                this.onScanned.emit(convertedInput);
            }
            else {
                this.onScanFailed.emit(this.mode);
            }
            this.keyboardInputStreak = undefined;
            return;
        }
        if (!isNaN(+event.key)) {
            if (!this.keyboardInputStreak) {
                this.keyboardInputStreak = event.key;
            }
            else {
                this.keyboardInputStreak += event.key;
            }
        }
    }
    ngOnInit() {
        // this.events.subscribe(hardwareEvents.barcodeScanned, (data) => {
        //   let result = this.convertRawInput(data);
        //   if (!!result) {
        //     this.onScanned.emit(result);
        //   }
        // });
    }
    modeMatchesScannedInputFormat(rawInput) {
        return true;
    }
    convertRawInput(rawInput) {
        if (rawInput === '111000000003') {
            return 'DE11100000000';
        }
        return undefined;
    }
}
ScannerListenerComponent.ɵfac = function ScannerListenerComponent_Factory(t) { return new (t || ScannerListenerComponent)(); };
ScannerListenerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ScannerListenerComponent, selectors: [["my-scanner-listener"]], hostBindings: function ScannerListenerComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keydown", function ScannerListenerComponent_keydown_HostBindingHandler($event) { return ctx.keyInput($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"]);
    } }, outputs: { onScanned: "onScanned", onScanFailed: "onScanFailed" }, decls: 0, vars: 0, template: function ScannerListenerComponent_Template(rf, ctx) { }, encapsulation: 2 });


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _scanner_listener_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scanner-listener.component */ "9sn9");


class AppComponent {
    constructor() {
        this.title = 'pwahost';
    }
    success($event) {
        console.log('success ' + $event);
    }
    fail($event) {
        console.log('fail ' + $event);
    }
    ngOnInit() {
        const my = window;
        my.fireStreak = (s) => {
            let asArray = s.split('');
            let event = (x) => {
                const aa = new KeyboardEvent('keydown', {
                    bubbles: true,
                    cancelable: true,
                    key: x,
                    shiftKey: true,
                });
                aa['char'] = x;
                // aa['keyCode'] =81;
                return aa;
            };
            asArray.forEach(x => {
                window.dispatchEvent(event(x));
            });
            window.dispatchEvent(event('Enter'));
        };
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 3, vars: 0, consts: [[3, "onScanned", "onScanFailed"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " hi there\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "my-scanner-listener", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onScanned", function AppComponent_Template_my_scanner_listener_onScanned_2_listener($event) { return ctx.success($event); })("onScanFailed", function AppComponent_Template_my_scanner_listener_onScanFailed_2_listener($event) { return ctx.fail($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_scanner_listener_component__WEBPACK_IMPORTED_MODULE_1__["ScannerListenerComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _scanner_listener_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scanner-listener.component */ "9sn9");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"],
        _scanner_listener_component__WEBPACK_IMPORTED_MODULE_2__["ScannerListenerComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map