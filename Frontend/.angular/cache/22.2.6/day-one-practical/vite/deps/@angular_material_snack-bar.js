import { $a as ɵɵdomElementEnd, Ai as setClassMetadata, Bo as ɵɵnextContext, Fs as ɵɵtextInterpolate1, Ga as ɵɵdefineNgModule, Gn as RendererFactory2, Gt as ChangeDetectionStrategy, Ji as ɵɵInheritDefinitionFeature, Jo as ɵɵprojectionDef, Jt as Component, Ln as NgModuleRef$1, M as createComponent, Nn as NgModule, Ns as ɵɵtext, O as booleanAttribute, Ro as ɵɵlistener, S as ViewChild, Sn as Input, Ua as ɵɵdefineComponent, Vt as ApplicationRef, Wa as ɵɵdefineDirective, Wn as Renderer2, X as input, Xs as ɵɵviewQuery, Ya as ɵɵdomElement, Yi as ɵɵNgOnChangesFeature, Zi as ɵɵadvance, Zn as Service, _o as ɵɵgetInheritedFactory, aa as ɵɵattribute, ca as ɵɵclassMap, co as ɵɵelementEnd, da as ɵɵconditional, eo as ɵɵdomElementStart, fn as ElementRef, fr as ViewContainerRef, go as ɵɵgetCurrentView, io as ɵɵelement, ir as TemplateRef, js as ɵɵtemplate, la as ɵɵclassProp, lo as ɵɵelementStart, pa as ɵɵconditionalCreate, pr as ViewEncapsulation, qa as ɵɵdefineService, qo as ɵɵprojection, r as ChangeDetectorRef, rt as numberAttribute, ss as ɵɵqueryRefresh, un as Directive, vr as afterNextRender, zn as Output, zo as ɵɵloadQuery } from "./core-CP38VavK.js";
import { I as EventEmitter, P as EnvironmentInjector, T as DOCUMENT, U as InjectionToken, Ui as signal, W as Injector, _ as untracked, dt as SecurityContext, et as NgZone, ua as ɵɵdefineInjector, v as ANIMATION_MODULE_TYPE, va as ɵɵresetView, wr as inject, y as APP_ID, ya as ɵɵrestoreView } from "./_resource-chunk-SRLM8pPW.js";
import { Qn as Subject, T as skip, Tt as debounceTime, Xt as filter, Zn as BehaviorSubject, g as takeUntil, gt as distinctUntilChanged, h as takeWhile, jn as of, rr as Observable, ur as Subscription, vn as map } from "./esm5-Doa4YBQt.js";
import { t as Platform } from "./_platform-chunk-C8DdCjs3.js";
import { C as coerceElement, S as Directionality, _ as ViewportRuler, m as ScrollingModule, p as ScrollDispatcher, w as coerceNumberProperty, x as supportsScrollBehavior, y as BidiModule } from "./scrolling-D7suhw0i.js";
import { a as coerceArray, i as MediaMatcher, r as BreakpointObserver, t as Breakpoints } from "./layout-CDMIdrQ0.js";
import { r as DomSanitizer } from "./platform-browser-DihMvTi0.js";
import { jt as Location } from "./common-DBkpuG9k.js";
// node_modules/@angular/cdk/fesm2022/_fake-event-detection-chunk.mjs
function isFakeMousedownFromScreenReader(event) {
	return event.buttons === 0 || event.detail === 0;
}
function isFakeTouchstartFromScreenReader(event) {
	const touch = event.touches && event.touches[0] || event.changedTouches && event.changedTouches[0];
	return !!touch && touch.identifier === -1 && (touch.radiusX == null || touch.radiusX === 1) && (touch.radiusY == null || touch.radiusY === 1);
}
// node_modules/@angular/cdk/fesm2022/_shadow-dom-chunk.mjs
var shadowDomIsSupported;
function _supportsShadowDom() {
	if (shadowDomIsSupported == null) {
		const head = typeof document !== "undefined" ? document.head : null;
		shadowDomIsSupported = !!(head && (head.createShadowRoot || head.attachShadow));
	}
	return shadowDomIsSupported;
}
function _getShadowRoot(element) {
	if (_supportsShadowDom()) {
		const rootNode = element.getRootNode ? element.getRootNode() : null;
		if (typeof ShadowRoot !== "undefined" && ShadowRoot && rootNode instanceof ShadowRoot) return rootNode;
	}
	return null;
}
function _getFocusedElementPierceShadowDom() {
	let activeElement = typeof document !== "undefined" && document ? document.activeElement : null;
	while (activeElement && activeElement.shadowRoot) {
		const newActiveElement = activeElement.shadowRoot.activeElement;
		if (newActiveElement === activeElement) break;
		else activeElement = newActiveElement;
	}
	return activeElement;
}
function _getEventTarget(event) {
	if (event.composedPath) try {
		return event.composedPath()[0];
	} catch {}
	return event.target;
}
// node_modules/@angular/cdk/fesm2022/_passive-listeners-chunk.mjs
var supportsPassiveEvents;
function supportsPassiveEventListeners() {
	if (supportsPassiveEvents == null && typeof window !== "undefined") try {
		window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: () => supportsPassiveEvents = true }));
	} finally {
		supportsPassiveEvents = supportsPassiveEvents || false;
	}
	return supportsPassiveEvents;
}
function normalizePassiveListenerOptions(options) {
	return supportsPassiveEventListeners() ? options : !!options.capture;
}
// node_modules/@angular/cdk/fesm2022/_focus-monitor-chunk.mjs
var INPUT_MODALITY_DETECTOR_OPTIONS = new InjectionToken("cdk-input-modality-detector-options");
var INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS = { ignoreKeys: [
	18,
	17,
	224,
	91,
	16
] };
var TOUCH_BUFFER_MS = 650;
var modalityEventListenerOptions = {
	passive: true,
	capture: true
};
var InputModalityDetector = class InputModalityDetector {
	_platform = inject(Platform);
	_listenerCleanups;
	modalityDetected;
	modalityChanged;
	get mostRecentModality() {
		return this._modality.value;
	}
	_mostRecentTarget = null;
	_modality = new BehaviorSubject(null);
	_options;
	_lastTouchMs = 0;
	_onKeydown = (event) => {
		if (this._options?.ignoreKeys?.some((keyCode) => keyCode === event.keyCode)) return;
		this._modality.next("keyboard");
		this._mostRecentTarget = _getEventTarget(event);
	};
	_onMousedown = (event) => {
		if (Date.now() - this._lastTouchMs < TOUCH_BUFFER_MS) return;
		this._modality.next(isFakeMousedownFromScreenReader(event) ? "keyboard" : "mouse");
		this._mostRecentTarget = _getEventTarget(event);
	};
	_onTouchstart = (event) => {
		if (isFakeTouchstartFromScreenReader(event)) {
			this._modality.next("keyboard");
			return;
		}
		this._lastTouchMs = Date.now();
		this._modality.next("touch");
		this._mostRecentTarget = _getEventTarget(event);
	};
	constructor() {
		const ngZone = inject(NgZone);
		const document = inject(DOCUMENT);
		const options = inject(INPUT_MODALITY_DETECTOR_OPTIONS, { optional: true });
		this._options = {
			...INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS,
			...options
		};
		this.modalityDetected = this._modality.pipe(skip(1));
		this.modalityChanged = this.modalityDetected.pipe(distinctUntilChanged());
		if (this._platform.isBrowser) {
			const renderer = inject(RendererFactory2).createRenderer(null, null);
			this._listenerCleanups = ngZone.runOutsideAngular(() => {
				return [
					renderer.listen(document, "keydown", this._onKeydown, modalityEventListenerOptions),
					renderer.listen(document, "mousedown", this._onMousedown, modalityEventListenerOptions),
					renderer.listen(document, "touchstart", this._onTouchstart, modalityEventListenerOptions)
				];
			});
		}
	}
	ngOnDestroy() {
		this._modality.complete();
		this._listenerCleanups?.forEach((cleanup) => cleanup());
	}
	static ɵfac = function InputModalityDetector_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || InputModalityDetector)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: InputModalityDetector,
		factory: InputModalityDetector.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputModalityDetector, [{ type: Service }], () => [], null);
})();
var FocusMonitorDetectionMode;
(function(FocusMonitorDetectionMode) {
	FocusMonitorDetectionMode[FocusMonitorDetectionMode["IMMEDIATE"] = 0] = "IMMEDIATE";
	FocusMonitorDetectionMode[FocusMonitorDetectionMode["EVENTUAL"] = 1] = "EVENTUAL";
})(FocusMonitorDetectionMode || (FocusMonitorDetectionMode = {}));
var FOCUS_MONITOR_DEFAULT_OPTIONS = new InjectionToken("cdk-focus-monitor-default-options");
var captureEventListenerOptions = normalizePassiveListenerOptions({
	passive: true,
	capture: true
});
var FocusMonitor = class FocusMonitor {
	_ngZone = inject(NgZone);
	_platform = inject(Platform);
	_inputModalityDetector = inject(InputModalityDetector);
	_origin = null;
	_lastFocusOrigin = null;
	_windowFocused = false;
	_windowFocusTimeoutId;
	_originTimeoutId;
	_originFromTouchInteraction = false;
	_elementInfo = /* @__PURE__ */ new Map();
	_monitoredElementCount = 0;
	_rootNodeFocusListenerCount = /* @__PURE__ */ new Map();
	_detectionMode;
	_windowFocusListener = () => {
		this._windowFocused = true;
		this._windowFocusTimeoutId = setTimeout(() => this._windowFocused = false);
	};
	_document = inject(DOCUMENT);
	_stopInputModalityDetector = new Subject();
	constructor() {
		const options = inject(FOCUS_MONITOR_DEFAULT_OPTIONS, { optional: true });
		this._detectionMode = options?.detectionMode || FocusMonitorDetectionMode.IMMEDIATE;
	}
	_rootNodeFocusAndBlurListener = (event) => {
		const target = _getEventTarget(event);
		for (let element = target; element; element = element.parentElement) if (event.type === "focus") this._onFocus(event, element);
		else this._onBlur(event, element);
	};
	monitor(element, checkChildren = false) {
		const nativeElement = coerceElement(element);
		if (!this._platform.isBrowser || nativeElement.nodeType !== 1) return of();
		const rootNode = _getShadowRoot(nativeElement) || this._document;
		const cachedInfo = this._elementInfo.get(nativeElement);
		if (cachedInfo) {
			if (checkChildren) cachedInfo.checkChildren = true;
			return cachedInfo.subject;
		}
		const info = {
			checkChildren,
			subject: new Subject(),
			rootNode
		};
		this._elementInfo.set(nativeElement, info);
		this._registerGlobalListeners(info);
		return info.subject;
	}
	stopMonitoring(element) {
		const nativeElement = coerceElement(element);
		const elementInfo = this._elementInfo.get(nativeElement);
		if (elementInfo) {
			elementInfo.subject.complete();
			this._setClasses(nativeElement);
			this._elementInfo.delete(nativeElement);
			this._removeGlobalListeners(elementInfo);
		}
	}
	focusVia(element, origin, options) {
		const nativeElement = coerceElement(element);
		if (nativeElement === this._document.activeElement) this._getClosestElementsInfo(nativeElement).forEach(([currentElement, info]) => this._originChanged(currentElement, origin, info));
		else {
			this._setOrigin(origin);
			if (typeof nativeElement.focus === "function") nativeElement.focus(options);
		}
	}
	ngOnDestroy() {
		this._elementInfo.forEach((_info, element) => this.stopMonitoring(element));
	}
	_getWindow() {
		return this._document.defaultView || window;
	}
	_getFocusOrigin(focusEventTarget) {
		if (this._origin) {
			if (this._originFromTouchInteraction) return this._shouldBeAttributedToTouch(focusEventTarget) ? "touch" : "program";
			else return this._origin;
		}
		if (this._windowFocused && this._lastFocusOrigin) return this._lastFocusOrigin;
		if (focusEventTarget && this._isLastInteractionFromInputLabel(focusEventTarget)) return "mouse";
		return "program";
	}
	_shouldBeAttributedToTouch(focusEventTarget) {
		return this._detectionMode === FocusMonitorDetectionMode.EVENTUAL || !!focusEventTarget?.contains(this._inputModalityDetector._mostRecentTarget);
	}
	_setClasses(element, origin) {
		element.classList.toggle("cdk-focused", !!origin);
		element.classList.toggle("cdk-touch-focused", origin === "touch");
		element.classList.toggle("cdk-keyboard-focused", origin === "keyboard");
		element.classList.toggle("cdk-mouse-focused", origin === "mouse");
		element.classList.toggle("cdk-program-focused", origin === "program");
	}
	_setOrigin(origin, isFromInteraction = false) {
		this._ngZone.runOutsideAngular(() => {
			this._origin = origin;
			this._originFromTouchInteraction = origin === "touch" && isFromInteraction;
			if (this._detectionMode === FocusMonitorDetectionMode.IMMEDIATE) {
				clearTimeout(this._originTimeoutId);
				const ms = this._originFromTouchInteraction ? TOUCH_BUFFER_MS : 1;
				this._originTimeoutId = setTimeout(() => this._origin = null, ms);
			}
		});
	}
	_onFocus(event, element) {
		const elementInfo = this._elementInfo.get(element);
		const focusEventTarget = _getEventTarget(event);
		if (!elementInfo || !elementInfo.checkChildren && element !== focusEventTarget) return;
		this._originChanged(element, this._getFocusOrigin(focusEventTarget), elementInfo);
	}
	_onBlur(event, element) {
		const elementInfo = this._elementInfo.get(element);
		if (!elementInfo || elementInfo.checkChildren && event.relatedTarget instanceof Node && element.contains(event.relatedTarget)) return;
		this._setClasses(element);
		this._emitOrigin(elementInfo, null);
	}
	_emitOrigin(info, origin) {
		if (info.subject.observers.length) this._ngZone.run(() => info.subject.next(origin));
	}
	_registerGlobalListeners(elementInfo) {
		if (!this._platform.isBrowser) return;
		const rootNode = elementInfo.rootNode;
		const rootNodeFocusListeners = this._rootNodeFocusListenerCount.get(rootNode) || 0;
		if (!rootNodeFocusListeners) this._ngZone.runOutsideAngular(() => {
			rootNode.addEventListener("focus", this._rootNodeFocusAndBlurListener, captureEventListenerOptions);
			rootNode.addEventListener("blur", this._rootNodeFocusAndBlurListener, captureEventListenerOptions);
		});
		this._rootNodeFocusListenerCount.set(rootNode, rootNodeFocusListeners + 1);
		if (++this._monitoredElementCount === 1) {
			this._ngZone.runOutsideAngular(() => {
				this._getWindow().addEventListener("focus", this._windowFocusListener);
			});
			this._inputModalityDetector.modalityDetected.pipe(takeUntil(this._stopInputModalityDetector)).subscribe((modality) => {
				this._setOrigin(modality, true);
			});
		}
	}
	_removeGlobalListeners(elementInfo) {
		const rootNode = elementInfo.rootNode;
		if (this._rootNodeFocusListenerCount.has(rootNode)) {
			const rootNodeFocusListeners = this._rootNodeFocusListenerCount.get(rootNode);
			if (rootNodeFocusListeners > 1) this._rootNodeFocusListenerCount.set(rootNode, rootNodeFocusListeners - 1);
			else {
				rootNode.removeEventListener("focus", this._rootNodeFocusAndBlurListener, captureEventListenerOptions);
				rootNode.removeEventListener("blur", this._rootNodeFocusAndBlurListener, captureEventListenerOptions);
				this._rootNodeFocusListenerCount.delete(rootNode);
			}
		}
		if (!--this._monitoredElementCount) {
			this._getWindow().removeEventListener("focus", this._windowFocusListener);
			this._stopInputModalityDetector.next();
			clearTimeout(this._windowFocusTimeoutId);
			clearTimeout(this._originTimeoutId);
		}
	}
	_originChanged(element, origin, elementInfo) {
		this._setClasses(element, origin);
		this._emitOrigin(elementInfo, origin);
		this._lastFocusOrigin = origin;
	}
	_getClosestElementsInfo(element) {
		const results = [];
		this._elementInfo.forEach((info, currentElement) => {
			if (currentElement === element || info.checkChildren && currentElement.contains(element)) results.push([currentElement, info]);
		});
		return results;
	}
	_isLastInteractionFromInputLabel(focusEventTarget) {
		const { _mostRecentTarget: mostRecentTarget, mostRecentModality } = this._inputModalityDetector;
		if (mostRecentModality !== "mouse" || !mostRecentTarget || mostRecentTarget === focusEventTarget || focusEventTarget.nodeName !== "INPUT" && focusEventTarget.nodeName !== "TEXTAREA" || focusEventTarget.disabled) return false;
		const labels = focusEventTarget.labels;
		if (labels) {
			for (let i = 0; i < labels.length; i++) if (labels[i].contains(mostRecentTarget)) return true;
		}
		return false;
	}
	static ɵfac = function FocusMonitor_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || FocusMonitor)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: FocusMonitor,
		factory: FocusMonitor.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusMonitor, [{ type: Service }], () => [], null);
})();
var CdkMonitorFocus = class CdkMonitorFocus {
	_elementRef = inject(ElementRef);
	_focusMonitor = inject(FocusMonitor);
	_monitorSubscription;
	_focusOrigin = null;
	cdkFocusChange = new EventEmitter();
	get focusOrigin() {
		return this._focusOrigin;
	}
	ngAfterViewInit() {
		const element = this._elementRef.nativeElement;
		this._monitorSubscription = this._focusMonitor.monitor(element, element.nodeType === 1 && element.hasAttribute("cdkMonitorSubtreeFocus")).subscribe((origin) => {
			this._focusOrigin = origin;
			this.cdkFocusChange.emit(origin);
		});
	}
	ngOnDestroy() {
		this._focusMonitor.stopMonitoring(this._elementRef);
		this._monitorSubscription?.unsubscribe();
	}
	static ɵfac = function CdkMonitorFocus_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || CdkMonitorFocus)();
	};
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: CdkMonitorFocus,
		selectors: [[
			"",
			"cdkMonitorElementFocus",
			""
		], [
			"",
			"cdkMonitorSubtreeFocus",
			""
		]],
		outputs: { cdkFocusChange: "cdkFocusChange" },
		exportAs: ["cdkMonitorFocus"]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkMonitorFocus, [{
		type: Directive,
		args: [{
			selector: "[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]",
			exportAs: "cdkMonitorFocus"
		}]
	}], null, { cdkFocusChange: [{ type: Output }] });
})();
// node_modules/@angular/cdk/fesm2022/_style-loader-chunk.mjs
var appsWithLoaders = /* @__PURE__ */ new WeakMap();
var _CdkPrivateStyleLoader = class _CdkPrivateStyleLoader {
	_appRef;
	_injector = inject(Injector);
	_environmentInjector = inject(EnvironmentInjector);
	load(loader) {
		const appRef = this._appRef = this._appRef || this._injector.get(ApplicationRef);
		let data = appsWithLoaders.get(appRef);
		if (!data) {
			data = {
				loaders: /* @__PURE__ */ new Set(),
				refs: []
			};
			appsWithLoaders.set(appRef, data);
			appRef.onDestroy(() => {
				appsWithLoaders.get(appRef)?.refs.forEach((ref) => ref.destroy());
				appsWithLoaders.delete(appRef);
			});
		}
		if (!data.loaders.has(loader)) {
			data.loaders.add(loader);
			data.refs.push(createComponent(loader, { environmentInjector: this._environmentInjector }));
		}
	}
	static ɵfac = function _CdkPrivateStyleLoader_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || _CdkPrivateStyleLoader)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: _CdkPrivateStyleLoader,
		factory: _CdkPrivateStyleLoader.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_CdkPrivateStyleLoader, [{ type: Service }], null, null);
})();
// node_modules/@angular/cdk/fesm2022/private.mjs
var _VisuallyHiddenLoader = class _VisuallyHiddenLoader {
	static ɵfac = function _VisuallyHiddenLoader_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || _VisuallyHiddenLoader)();
	};
	static ɵcmp = /*@__PURE__*/ ɵɵdefineComponent({
		type: _VisuallyHiddenLoader,
		selectors: [["ng-component"]],
		exportAs: ["cdkVisuallyHidden"],
		decls: 0,
		vars: 0,
		template: function _VisuallyHiddenLoader_Template(rf, ctx) {},
		styles: [".cdk-visually-hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n  white-space: nowrap;\n  outline: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  left: 0;\n}\n[dir=rtl] .cdk-visually-hidden {\n  left: auto;\n  right: 0;\n}\n"],
		encapsulation: 2
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_VisuallyHiddenLoader, [{
		type: Component,
		args: [{
			exportAs: "cdkVisuallyHidden",
			encapsulation: ViewEncapsulation.None,
			template: "",
			styles: [".cdk-visually-hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n  white-space: nowrap;\n  outline: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  left: 0;\n}\n[dir=rtl] .cdk-visually-hidden {\n  left: auto;\n  right: 0;\n}\n"]
		}]
	}], null, null);
})();
var policy;
function getPolicy() {
	if (policy === void 0) {
		policy = null;
		if (typeof window !== "undefined") {
			const ttWindow = window;
			if (ttWindow.trustedTypes !== void 0) try {
				policy = ttWindow.trustedTypes.createPolicy("angular#components", { createHTML: (s) => s });
			} catch (error) {
				console.error(error);
			}
		}
	}
	return policy;
}
function trustedHTMLFromString(html) {
	return getPolicy()?.createHTML(html) || html;
}
function _setInnerHtml(element, html, sanitizer) {
	const cleanHtml = sanitizer.sanitize(SecurityContext.HTML, html);
	if (cleanHtml === null && (typeof ngDevMode === "undefined" || ngDevMode)) throw new Error(`Could not sanitize HTML: ${html}`);
	element.innerHTML = trustedHTMLFromString(cleanHtml || "");
}
// node_modules/@angular/cdk/fesm2022/observers.mjs
function shouldIgnoreRecord(record) {
	if (record.type === "characterData" && record.target instanceof Comment) return true;
	if (record.type === "childList") {
		for (let i = 0; i < record.addedNodes.length; i++) if (!(record.addedNodes[i] instanceof Comment)) return false;
		for (let i = 0; i < record.removedNodes.length; i++) if (!(record.removedNodes[i] instanceof Comment)) return false;
		return true;
	}
	return false;
}
var MutationObserverFactory = class MutationObserverFactory {
	create(callback) {
		return typeof MutationObserver === "undefined" ? null : new MutationObserver(callback);
	}
	static ɵfac = function MutationObserverFactory_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MutationObserverFactory)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: MutationObserverFactory,
		factory: MutationObserverFactory.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MutationObserverFactory, [{ type: Service }], null, null);
})();
var ContentObserver = class ContentObserver {
	_mutationObserverFactory = inject(MutationObserverFactory);
	_observedElements = /* @__PURE__ */ new Map();
	_ngZone = inject(NgZone);
	ngOnDestroy() {
		this._observedElements.forEach((_, element) => this._cleanupObserver(element));
	}
	observe(elementOrRef) {
		const element = coerceElement(elementOrRef);
		return new Observable((observer) => {
			const subscription = this._observeElement(element).pipe(map((records) => records.filter((record) => !shouldIgnoreRecord(record))), filter((records) => !!records.length)).subscribe((records) => {
				this._ngZone.run(() => {
					observer.next(records);
				});
			});
			return () => {
				subscription.unsubscribe();
				this._unobserveElement(element);
			};
		});
	}
	_observeElement(element) {
		return this._ngZone.runOutsideAngular(() => {
			if (!this._observedElements.has(element)) {
				const stream = new Subject();
				const observer = this._mutationObserverFactory.create((mutations) => stream.next(mutations));
				if (observer) observer.observe(element, {
					characterData: true,
					childList: true,
					subtree: true
				});
				this._observedElements.set(element, {
					observer,
					stream,
					count: 1
				});
			} else this._observedElements.get(element).count++;
			return this._observedElements.get(element).stream;
		});
	}
	_unobserveElement(element) {
		if (this._observedElements.has(element)) {
			this._observedElements.get(element).count--;
			if (!this._observedElements.get(element).count) this._cleanupObserver(element);
		}
	}
	_cleanupObserver(element) {
		if (this._observedElements.has(element)) {
			const { observer, stream } = this._observedElements.get(element);
			if (observer) observer.disconnect();
			stream.complete();
			this._observedElements.delete(element);
		}
	}
	static ɵfac = function ContentObserver_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ContentObserver)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: ContentObserver,
		factory: ContentObserver.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContentObserver, [{ type: Service }], null, null);
})();
var CdkObserveContent = class CdkObserveContent {
	_contentObserver = inject(ContentObserver);
	_elementRef = inject(ElementRef);
	event = new EventEmitter();
	get disabled() {
		return this._disabled;
	}
	set disabled(value) {
		this._disabled = value;
		this._disabled ? this._unsubscribe() : this._subscribe();
	}
	_disabled = false;
	get debounce() {
		return this._debounce;
	}
	set debounce(value) {
		this._debounce = coerceNumberProperty(value);
		this._subscribe();
	}
	_debounce;
	_currentSubscription = null;
	ngAfterContentInit() {
		if (!this._currentSubscription && !this.disabled) this._subscribe();
	}
	ngOnDestroy() {
		this._unsubscribe();
	}
	_subscribe() {
		this._unsubscribe();
		const stream = this._contentObserver.observe(this._elementRef);
		this._currentSubscription = (this.debounce ? stream.pipe(debounceTime(this.debounce)) : stream).subscribe(this.event);
	}
	_unsubscribe() {
		this._currentSubscription?.unsubscribe();
	}
	static ɵfac = function CdkObserveContent_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || CdkObserveContent)();
	};
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: CdkObserveContent,
		selectors: [[
			"",
			"cdkObserveContent",
			""
		]],
		inputs: {
			disabled: [
				2,
				"cdkObserveContentDisabled",
				"disabled",
				booleanAttribute
			],
			debounce: "debounce"
		},
		outputs: { event: "cdkObserveContent" },
		exportAs: ["cdkObserveContent"]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkObserveContent, [{
		type: Directive,
		args: [{
			selector: "[cdkObserveContent]",
			exportAs: "cdkObserveContent"
		}]
	}], null, {
		event: [{
			type: Output,
			args: ["cdkObserveContent"]
		}],
		disabled: [{
			type: Input,
			args: [{
				alias: "cdkObserveContentDisabled",
				transform: booleanAttribute
			}]
		}],
		debounce: [{ type: Input }]
	});
})();
var ObserversModule = class ObserversModule {
	static ɵfac = function ObserversModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ObserversModule)();
	};
	static ɵmod = /*@__PURE__*/ ɵɵdefineNgModule({
		type: ObserversModule,
		imports: [CdkObserveContent],
		exports: [CdkObserveContent]
	});
	static ɵinj = /*@__PURE__*/ ɵɵdefineInjector({ providers: [MutationObserverFactory] });
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ObserversModule, [{
		type: NgModule,
		args: [{
			imports: [CdkObserveContent],
			exports: [CdkObserveContent],
			providers: [MutationObserverFactory]
		}]
	}], null, null);
})();
// node_modules/@angular/cdk/fesm2022/_a11y-module-chunk.mjs
var InteractivityChecker = class InteractivityChecker {
	_platform = inject(Platform);
	isDisabled(element) {
		return element.hasAttribute("disabled");
	}
	isVisible(element) {
		return hasGeometry(element) && getComputedStyle(element).visibility === "visible";
	}
	isTabbable(element) {
		if (!this._platform.isBrowser) return false;
		const frameElement = getFrameElement(getWindow(element));
		if (frameElement) {
			if (getTabIndexValue(frameElement) === -1) return false;
			if (!this.isVisible(frameElement)) return false;
		}
		let nodeName = element.nodeName.toLowerCase();
		let tabIndexValue = getTabIndexValue(element);
		if (element.hasAttribute("contenteditable")) return tabIndexValue !== -1;
		if (nodeName === "iframe" || nodeName === "object") return false;
		if (this._platform.WEBKIT && this._platform.IOS && !isPotentiallyTabbableIOS(element)) return false;
		if (nodeName === "audio") {
			if (!element.hasAttribute("controls")) return false;
			return tabIndexValue !== -1;
		}
		if (nodeName === "video") {
			if (tabIndexValue === -1) return false;
			if (tabIndexValue !== null) return true;
			return this._platform.FIREFOX || element.hasAttribute("controls");
		}
		return element.tabIndex >= 0;
	}
	isFocusable(element, config) {
		return isPotentiallyFocusable(element) && !this.isDisabled(element) && (config?.ignoreInert || !element.closest?.("[inert]")) && (config?.ignoreVisibility || this.isVisible(element));
	}
	static ɵfac = function InteractivityChecker_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || InteractivityChecker)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: InteractivityChecker,
		factory: InteractivityChecker.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InteractivityChecker, [{ type: Service }], null, null);
})();
function getFrameElement(window) {
	try {
		return window.frameElement;
	} catch {
		return null;
	}
}
function hasGeometry(element) {
	return !!(element.offsetWidth || element.offsetHeight || typeof element.getClientRects === "function" && element.getClientRects().length);
}
function isNativeFormElement(element) {
	let nodeName = element.nodeName.toLowerCase();
	return nodeName === "input" || nodeName === "select" || nodeName === "button" || nodeName === "textarea";
}
function isHiddenInput(element) {
	return isInputElement(element) && element.type == "hidden";
}
function isAnchorWithHref(element) {
	return isAnchorElement(element) && element.hasAttribute("href");
}
function isInputElement(element) {
	return element.nodeName.toLowerCase() == "input";
}
function isAnchorElement(element) {
	return element.nodeName.toLowerCase() == "a";
}
function hasValidTabIndex(element) {
	if (!element.hasAttribute("tabindex") || element.tabIndex === void 0) return false;
	let tabIndex = element.getAttribute("tabindex");
	return !!(tabIndex && !isNaN(parseInt(tabIndex, 10)));
}
function getTabIndexValue(element) {
	if (!hasValidTabIndex(element)) return null;
	const tabIndex = parseInt(element.getAttribute("tabindex") || "", 10);
	return isNaN(tabIndex) ? -1 : tabIndex;
}
function isPotentiallyTabbableIOS(element) {
	let nodeName = element.nodeName.toLowerCase();
	let inputType = nodeName === "input" && element.type;
	return inputType === "text" || inputType === "password" || nodeName === "select" || nodeName === "textarea";
}
function isPotentiallyFocusable(element) {
	if (isHiddenInput(element)) return false;
	return isNativeFormElement(element) || isAnchorWithHref(element) || element.hasAttribute("contenteditable") || hasValidTabIndex(element);
}
function getWindow(node) {
	return node.ownerDocument && node.ownerDocument.defaultView || window;
}
var FocusTrap = class {
	_element;
	_checker;
	_ngZone;
	_document;
	_injector;
	_startAnchor = null;
	_endAnchor = null;
	_hasAttached = false;
	startAnchorListener = () => {
		if (!this.focusLastTabbableElement() && this._checker.isFocusable(this._element)) this._element.focus();
	};
	endAnchorListener = () => {
		if (!this.focusFirstTabbableElement() && this._checker.isFocusable(this._element)) this._element.focus();
	};
	get enabled() {
		return this._enabled;
	}
	set enabled(value) {
		this._enabled = value;
		if (this._startAnchor && this._endAnchor) {
			this._toggleAnchorTabIndex(value, this._startAnchor);
			this._toggleAnchorTabIndex(value, this._endAnchor);
		}
	}
	_enabled = true;
	constructor(_element, _checker, _ngZone, _document, deferAnchors = false, _injector) {
		this._element = _element;
		this._checker = _checker;
		this._ngZone = _ngZone;
		this._document = _document;
		this._injector = _injector;
		if (!deferAnchors) this.attachAnchors();
	}
	destroy() {
		const startAnchor = this._startAnchor;
		const endAnchor = this._endAnchor;
		if (startAnchor) {
			startAnchor.removeEventListener("focus", this.startAnchorListener);
			startAnchor.remove();
		}
		if (endAnchor) {
			endAnchor.removeEventListener("focus", this.endAnchorListener);
			endAnchor.remove();
		}
		this._startAnchor = this._endAnchor = null;
		this._hasAttached = false;
	}
	attachAnchors() {
		if (this._hasAttached) return true;
		this._ngZone.runOutsideAngular(() => {
			if (!this._startAnchor) {
				this._startAnchor = this._createAnchor();
				this._startAnchor.addEventListener("focus", this.startAnchorListener);
			}
			if (!this._endAnchor) {
				this._endAnchor = this._createAnchor();
				this._endAnchor.addEventListener("focus", this.endAnchorListener);
			}
		});
		if (this._element.parentNode) {
			this._element.parentNode.insertBefore(this._startAnchor, this._element);
			this._element.parentNode.insertBefore(this._endAnchor, this._element.nextSibling);
			this._hasAttached = true;
		}
		return this._hasAttached;
	}
	focusInitialElementWhenReady(options) {
		return new Promise((resolve) => {
			this._executeOnStable(() => resolve(this.focusInitialElement(options)));
		});
	}
	focusFirstTabbableElementWhenReady(options) {
		return new Promise((resolve) => {
			this._executeOnStable(() => resolve(this.focusFirstTabbableElement(options)));
		});
	}
	focusLastTabbableElementWhenReady(options) {
		return new Promise((resolve) => {
			this._executeOnStable(() => resolve(this.focusLastTabbableElement(options)));
		});
	}
	_getRegionBoundary(bound) {
		const markers = this._element.querySelectorAll(`[cdk-focus-region-${bound}], [cdkFocusRegion${bound}], [cdk-focus-${bound}]`);
		if (typeof ngDevMode === "undefined" || ngDevMode) {
			for (let i = 0; i < markers.length; i++) if (markers[i].hasAttribute(`cdk-focus-${bound}`)) console.warn(`Found use of deprecated attribute 'cdk-focus-${bound}', use 'cdkFocusRegion${bound}' instead. The deprecated attribute will be removed in 8.0.0.`, markers[i]);
			else if (markers[i].hasAttribute(`cdk-focus-region-${bound}`)) console.warn(`Found use of deprecated attribute 'cdk-focus-region-${bound}', use 'cdkFocusRegion${bound}' instead. The deprecated attribute will be removed in 8.0.0.`, markers[i]);
		}
		if (bound == "start") return markers.length ? markers[0] : this._getFirstTabbableElement(this._element);
		return markers.length ? markers[markers.length - 1] : this._getLastTabbableElement(this._element);
	}
	focusInitialElement(options) {
		const redirectToElement = this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");
		if (redirectToElement) {
			if ((typeof ngDevMode === "undefined" || ngDevMode) && redirectToElement.hasAttribute(`cdk-focus-initial`)) console.warn("Found use of deprecated attribute 'cdk-focus-initial', use 'cdkFocusInitial' instead. The deprecated attribute will be removed in 8.0.0", redirectToElement);
			if ((typeof ngDevMode === "undefined" || ngDevMode) && !this._checker.isFocusable(redirectToElement)) console.warn(`Element matching '[cdkFocusInitial]' is not focusable.`, redirectToElement);
			if (!this._checker.isFocusable(redirectToElement)) {
				const focusableChild = this._getFirstTabbableElement(redirectToElement);
				focusableChild?.focus(options);
				return !!focusableChild;
			}
			redirectToElement.focus(options);
			return true;
		}
		return this.focusFirstTabbableElement(options);
	}
	focusFirstTabbableElement(options) {
		const redirectToElement = this._getRegionBoundary("start");
		if (redirectToElement) redirectToElement.focus(options);
		return !!redirectToElement;
	}
	focusLastTabbableElement(options) {
		const redirectToElement = this._getRegionBoundary("end");
		if (redirectToElement) redirectToElement.focus(options);
		return !!redirectToElement;
	}
	hasAttached() {
		return this._hasAttached;
	}
	_getFirstTabbableElement(root) {
		if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) return root;
		const children = root.children;
		for (let i = 0; i < children.length; i++) {
			const tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ? this._getFirstTabbableElement(children[i]) : null;
			if (tabbableChild) return tabbableChild;
		}
		return null;
	}
	_getLastTabbableElement(root) {
		if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) return root;
		const children = root.children;
		for (let i = children.length - 1; i >= 0; i--) {
			const tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ? this._getLastTabbableElement(children[i]) : null;
			if (tabbableChild) return tabbableChild;
		}
		return null;
	}
	_createAnchor() {
		const anchor = this._document.createElement("div");
		this._toggleAnchorTabIndex(this._enabled, anchor);
		anchor.classList.add("cdk-visually-hidden");
		anchor.classList.add("cdk-focus-trap-anchor");
		anchor.setAttribute("aria-hidden", "true");
		return anchor;
	}
	_toggleAnchorTabIndex(isEnabled, anchor) {
		isEnabled ? anchor.setAttribute("tabindex", "0") : anchor.removeAttribute("tabindex");
	}
	toggleAnchors(enabled) {
		if (this._startAnchor && this._endAnchor) {
			this._toggleAnchorTabIndex(enabled, this._startAnchor);
			this._toggleAnchorTabIndex(enabled, this._endAnchor);
		}
	}
	_executeOnStable(fn) {
		afterNextRender(fn, { injector: this._injector });
	}
};
var FocusTrapFactory = class FocusTrapFactory {
	_checker = inject(InteractivityChecker);
	_ngZone = inject(NgZone);
	_document = inject(DOCUMENT);
	_injector = inject(Injector);
	constructor() {
		inject(_CdkPrivateStyleLoader).load(_VisuallyHiddenLoader);
	}
	create(element, deferCaptureElements = false) {
		return new FocusTrap(element, this._checker, this._ngZone, this._document, deferCaptureElements, this._injector);
	}
	static ɵfac = function FocusTrapFactory_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || FocusTrapFactory)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: FocusTrapFactory,
		factory: FocusTrapFactory.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusTrapFactory, [{ type: Service }], () => [], null);
})();
var CdkTrapFocus = class CdkTrapFocus {
	_elementRef = inject(ElementRef);
	_focusTrapFactory = inject(FocusTrapFactory);
	focusTrap = void 0;
	_previouslyFocusedElement = null;
	get enabled() {
		return this.focusTrap?.enabled || false;
	}
	set enabled(value) {
		if (this.focusTrap) this.focusTrap.enabled = value;
	}
	autoCapture = false;
	constructor() {
		if (inject(Platform).isBrowser) this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
	}
	ngOnDestroy() {
		this.focusTrap?.destroy();
		if (this._previouslyFocusedElement) {
			this._previouslyFocusedElement.focus();
			this._previouslyFocusedElement = null;
		}
	}
	ngAfterContentInit() {
		this.focusTrap?.attachAnchors();
		if (this.autoCapture) this._captureFocus();
	}
	ngDoCheck() {
		if (this.focusTrap && !this.focusTrap.hasAttached()) this.focusTrap.attachAnchors();
	}
	ngOnChanges(changes) {
		const autoCaptureChange = changes["autoCapture"];
		if (autoCaptureChange && !autoCaptureChange.firstChange && this.autoCapture && this.focusTrap?.hasAttached()) this._captureFocus();
	}
	_captureFocus() {
		this._previouslyFocusedElement = _getFocusedElementPierceShadowDom();
		this.focusTrap?.focusInitialElementWhenReady();
	}
	static ɵfac = function CdkTrapFocus_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || CdkTrapFocus)();
	};
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: CdkTrapFocus,
		selectors: [[
			"",
			"cdkTrapFocus",
			""
		]],
		inputs: {
			enabled: [
				2,
				"cdkTrapFocus",
				"enabled",
				booleanAttribute
			],
			autoCapture: [
				2,
				"cdkTrapFocusAutoCapture",
				"autoCapture",
				booleanAttribute
			]
		},
		exportAs: ["cdkTrapFocus"],
		features: [ɵɵNgOnChangesFeature]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkTrapFocus, [{
		type: Directive,
		args: [{
			selector: "[cdkTrapFocus]",
			exportAs: "cdkTrapFocus"
		}]
	}], () => [], {
		enabled: [{
			type: Input,
			args: [{
				alias: "cdkTrapFocus",
				transform: booleanAttribute
			}]
		}],
		autoCapture: [{
			type: Input,
			args: [{
				alias: "cdkTrapFocusAutoCapture",
				transform: booleanAttribute
			}]
		}]
	});
})();
var LIVE_ANNOUNCER_ELEMENT_TOKEN = new InjectionToken("liveAnnouncerElement", {
	providedIn: "root",
	factory: () => null
});
var LIVE_ANNOUNCER_DEFAULT_OPTIONS = new InjectionToken("LIVE_ANNOUNCER_DEFAULT_OPTIONS");
var uniqueIds = 0;
var LiveAnnouncer = class LiveAnnouncer {
	_ngZone = inject(NgZone);
	_defaultOptions = inject(LIVE_ANNOUNCER_DEFAULT_OPTIONS, { optional: true });
	_liveElement;
	_document = inject(DOCUMENT);
	_sanitizer = inject(DomSanitizer);
	_previousTimeout;
	_currentPromise;
	_currentResolve;
	constructor() {
		const elementToken = inject(LIVE_ANNOUNCER_ELEMENT_TOKEN, { optional: true });
		this._liveElement = elementToken || this._createLiveElement();
	}
	announce(message, ...args) {
		const defaultOptions = this._defaultOptions;
		let politeness;
		let duration;
		if (args.length === 1 && typeof args[0] === "number") duration = args[0];
		else [politeness, duration] = args;
		this.clear();
		clearTimeout(this._previousTimeout);
		if (!politeness) politeness = defaultOptions && defaultOptions.politeness ? defaultOptions.politeness : "polite";
		if (duration == null && defaultOptions) duration = defaultOptions.duration;
		this._liveElement.setAttribute("aria-live", politeness);
		if (this._liveElement.id) this._exposeAnnouncerToModals(this._liveElement.id);
		return this._ngZone.runOutsideAngular(() => {
			if (!this._currentPromise) this._currentPromise = new Promise((resolve) => this._currentResolve = resolve);
			clearTimeout(this._previousTimeout);
			this._previousTimeout = setTimeout(() => {
				if (!message || typeof message === "string") this._liveElement.textContent = message;
				else _setInnerHtml(this._liveElement, message, this._sanitizer);
				if (typeof duration === "number") this._previousTimeout = setTimeout(() => this.clear(), duration);
				this._currentResolve?.();
				this._currentPromise = this._currentResolve = void 0;
			}, 100);
			return this._currentPromise;
		});
	}
	clear() {
		if (this._liveElement) this._liveElement.textContent = "";
	}
	ngOnDestroy() {
		clearTimeout(this._previousTimeout);
		this._liveElement?.remove();
		this._liveElement = null;
		this._currentResolve?.();
		this._currentPromise = this._currentResolve = void 0;
	}
	_createLiveElement() {
		const elementClass = "cdk-live-announcer-element";
		const previousElements = this._document.getElementsByClassName(elementClass);
		const liveEl = this._document.createElement("div");
		for (let i = 0; i < previousElements.length; i++) previousElements[i].remove();
		liveEl.classList.add(elementClass);
		liveEl.classList.add("cdk-visually-hidden");
		liveEl.setAttribute("aria-atomic", "true");
		liveEl.setAttribute("aria-live", "polite");
		liveEl.id = `cdk-live-announcer-${uniqueIds++}`;
		this._document.body.appendChild(liveEl);
		return liveEl;
	}
	_exposeAnnouncerToModals(id) {
		const modals = this._document.querySelectorAll("body > .cdk-overlay-container [aria-modal=\"true\"]");
		for (let i = 0; i < modals.length; i++) {
			const modal = modals[i];
			const ariaOwns = modal.getAttribute("aria-owns");
			if (!ariaOwns) modal.setAttribute("aria-owns", id);
			else if (ariaOwns.indexOf(id) === -1) modal.setAttribute("aria-owns", ariaOwns + " " + id);
		}
	}
	static ɵfac = function LiveAnnouncer_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || LiveAnnouncer)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: LiveAnnouncer,
		factory: LiveAnnouncer.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LiveAnnouncer, [{ type: Service }], () => [], null);
})();
var CdkAriaLive = class CdkAriaLive {
	_elementRef = inject(ElementRef);
	_liveAnnouncer = inject(LiveAnnouncer);
	_contentObserver = inject(ContentObserver);
	_ngZone = inject(NgZone);
	get politeness() {
		return this._politeness;
	}
	set politeness(value) {
		this._politeness = value === "off" || value === "assertive" ? value : "polite";
		if (this._politeness === "off") {
			if (this._subscription) {
				this._subscription.unsubscribe();
				this._subscription = void 0;
			}
		} else if (!this._subscription) this._subscription = this._ngZone.runOutsideAngular(() => {
			return this._contentObserver.observe(this._elementRef).subscribe(() => {
				const elementText = this._elementRef.nativeElement.textContent;
				if (elementText !== this._previousAnnouncedText) {
					this._liveAnnouncer.announce(elementText, this._politeness, this.duration);
					this._previousAnnouncedText = elementText;
				}
			});
		});
	}
	_politeness = "polite";
	duration;
	_previousAnnouncedText;
	_subscription;
	constructor() {
		inject(_CdkPrivateStyleLoader).load(_VisuallyHiddenLoader);
	}
	ngOnDestroy() {
		this._subscription?.unsubscribe();
	}
	static ɵfac = function CdkAriaLive_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || CdkAriaLive)();
	};
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: CdkAriaLive,
		selectors: [[
			"",
			"cdkAriaLive",
			""
		]],
		inputs: {
			politeness: [
				0,
				"cdkAriaLive",
				"politeness"
			],
			duration: [
				0,
				"cdkAriaLiveDuration",
				"duration"
			]
		},
		exportAs: ["cdkAriaLive"]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkAriaLive, [{
		type: Directive,
		args: [{
			selector: "[cdkAriaLive]",
			exportAs: "cdkAriaLive"
		}]
	}], () => [], {
		politeness: [{
			type: Input,
			args: ["cdkAriaLive"]
		}],
		duration: [{
			type: Input,
			args: ["cdkAriaLiveDuration"]
		}]
	});
})();
var HighContrastMode;
(function(HighContrastMode) {
	HighContrastMode[HighContrastMode["NONE"] = 0] = "NONE";
	HighContrastMode[HighContrastMode["BLACK_ON_WHITE"] = 1] = "BLACK_ON_WHITE";
	HighContrastMode[HighContrastMode["WHITE_ON_BLACK"] = 2] = "WHITE_ON_BLACK";
})(HighContrastMode || (HighContrastMode = {}));
var BLACK_ON_WHITE_CSS_CLASS = "cdk-high-contrast-black-on-white";
var WHITE_ON_BLACK_CSS_CLASS = "cdk-high-contrast-white-on-black";
var HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS = "cdk-high-contrast-active";
var HighContrastModeDetector = class HighContrastModeDetector {
	_platform = inject(Platform);
	_hasCheckedHighContrastMode = false;
	_document = inject(DOCUMENT);
	_breakpointSubscription;
	constructor() {
		this._breakpointSubscription = inject(BreakpointObserver).observe("(forced-colors: active)").subscribe(() => {
			if (this._hasCheckedHighContrastMode) {
				this._hasCheckedHighContrastMode = false;
				this._applyBodyHighContrastModeCssClasses();
			}
		});
	}
	getHighContrastMode() {
		if (!this._platform.isBrowser) return HighContrastMode.NONE;
		const testElement = this._document.createElement("div");
		testElement.style.backgroundColor = "rgb(1,2,3)";
		testElement.style.position = "absolute";
		this._document.body.appendChild(testElement);
		const documentWindow = this._document.defaultView || window;
		const computedStyle = documentWindow && documentWindow.getComputedStyle ? documentWindow.getComputedStyle(testElement) : null;
		const computedColor = (computedStyle && computedStyle.backgroundColor || "").replace(/ /g, "");
		testElement.remove();
		switch (computedColor) {
			case "rgb(0,0,0)":
			case "rgb(45,50,54)":
			case "rgb(32,32,32)": return HighContrastMode.WHITE_ON_BLACK;
			case "rgb(255,255,255)":
			case "rgb(255,250,239)": return HighContrastMode.BLACK_ON_WHITE;
		}
		return HighContrastMode.NONE;
	}
	ngOnDestroy() {
		this._breakpointSubscription.unsubscribe();
	}
	_applyBodyHighContrastModeCssClasses() {
		if (!this._hasCheckedHighContrastMode && this._platform.isBrowser && this._document.body) {
			const bodyClasses = this._document.body.classList;
			bodyClasses.remove(HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS, BLACK_ON_WHITE_CSS_CLASS, WHITE_ON_BLACK_CSS_CLASS);
			this._hasCheckedHighContrastMode = true;
			const mode = this.getHighContrastMode();
			if (mode === HighContrastMode.BLACK_ON_WHITE) bodyClasses.add(HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS, BLACK_ON_WHITE_CSS_CLASS);
			else if (mode === HighContrastMode.WHITE_ON_BLACK) bodyClasses.add(HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS, WHITE_ON_BLACK_CSS_CLASS);
		}
	}
	static ɵfac = function HighContrastModeDetector_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || HighContrastModeDetector)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: HighContrastModeDetector,
		factory: HighContrastModeDetector.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HighContrastModeDetector, [{ type: Service }], () => [], null);
})();
var A11yModule = class A11yModule {
	constructor() {
		inject(HighContrastModeDetector)._applyBodyHighContrastModeCssClasses();
	}
	static ɵfac = function A11yModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || A11yModule)();
	};
	static ɵmod = /*@__PURE__*/ ɵɵdefineNgModule({
		type: A11yModule,
		imports: [
			ObserversModule,
			CdkAriaLive,
			CdkTrapFocus,
			CdkMonitorFocus
		],
		exports: [
			CdkAriaLive,
			CdkTrapFocus,
			CdkMonitorFocus
		]
	});
	static ɵinj = /*@__PURE__*/ ɵɵdefineInjector({ imports: [ObserversModule] });
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(A11yModule, [{
		type: NgModule,
		args: [{
			imports: [
				ObserversModule,
				CdkAriaLive,
				CdkTrapFocus,
				CdkMonitorFocus
			],
			exports: [
				CdkAriaLive,
				CdkTrapFocus,
				CdkMonitorFocus
			]
		}]
	}], () => [], null);
})();
// node_modules/@angular/cdk/fesm2022/keycodes.mjs
function hasModifierKey(event, ...modifiers) {
	if (modifiers.length) return modifiers.some((modifier) => event[modifier]);
	return event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
}
// node_modules/@angular/cdk/fesm2022/_id-generator-chunk.mjs
var counters = /* @__PURE__ */ new Map();
var _IdGenerator = class _IdGenerator {
	_appId = inject(APP_ID);
	static _infix = `a${Math.floor(Math.random() * 1e5).toString()}`;
	getId(prefix, randomize = false) {
		if (this._appId !== "ng") prefix += this._appId;
		let count = counters.get(prefix);
		if (count === void 0) count = 0;
		else count++;
		counters.set(prefix, count);
		return `${prefix}${randomize ? _IdGenerator._infix + "-" : ""}${count}`;
	}
	static ɵfac = function _IdGenerator_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || _IdGenerator)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: _IdGenerator,
		factory: _IdGenerator.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_IdGenerator, [{ type: Service }], null, null);
})();
// node_modules/@angular/cdk/fesm2022/a11y.mjs
var ID_DELIMITER = " ";
function addAriaReferencedId(el, attr, id) {
	const ids = getAriaReferenceIds(el, attr);
	id = id.trim();
	if (ids.some((existingId) => existingId.trim() === id)) return;
	ids.push(id);
	el.setAttribute(attr, ids.join(ID_DELIMITER));
}
function removeAriaReferencedId(el, attr, id) {
	const ids = getAriaReferenceIds(el, attr);
	id = id.trim();
	const filteredIds = ids.filter((val) => val !== id);
	if (filteredIds.length) el.setAttribute(attr, filteredIds.join(ID_DELIMITER));
	else el.removeAttribute(attr);
}
function getAriaReferenceIds(el, attr) {
	return el.getAttribute(attr)?.match(/\S+/g) ?? [];
}
var CDK_DESCRIBEDBY_ID_PREFIX = "cdk-describedby-message";
var CDK_DESCRIBEDBY_HOST_ATTRIBUTE = "cdk-describedby-host";
var nextId = 0;
var AriaDescriber = class AriaDescriber {
	_platform = inject(Platform);
	_document = inject(DOCUMENT);
	_messageRegistry = /* @__PURE__ */ new Map();
	_messagesContainer = null;
	_id = `${nextId++}`;
	constructor() {
		inject(_CdkPrivateStyleLoader).load(_VisuallyHiddenLoader);
		this._id = inject(APP_ID) + "-" + nextId++;
	}
	describe(hostElement, message, role) {
		if (!this._canBeDescribed(hostElement, message)) return;
		const key = getKey(message, role);
		if (typeof message !== "string") {
			setMessageId(message, this._id);
			this._messageRegistry.set(key, {
				messageElement: message,
				referenceCount: 0
			});
		} else if (!this._messageRegistry.has(key)) this._createMessageElement(message, role);
		if (!this._isElementDescribedByMessage(hostElement, key)) this._addMessageReference(hostElement, key);
	}
	removeDescription(hostElement, message, role) {
		if (!message || !this._isElementNode(hostElement)) return;
		const key = getKey(message, role);
		if (this._isElementDescribedByMessage(hostElement, key)) this._removeMessageReference(hostElement, key);
		if (typeof message === "string") {
			const registeredMessage = this._messageRegistry.get(key);
			if (registeredMessage && registeredMessage.referenceCount === 0) this._deleteMessageElement(key);
		}
		if (this._messagesContainer?.childNodes.length === 0) {
			this._messagesContainer.remove();
			this._messagesContainer = null;
		}
	}
	ngOnDestroy() {
		const describedElements = this._document.querySelectorAll(`[${CDK_DESCRIBEDBY_HOST_ATTRIBUTE}="${this._id}"]`);
		for (let i = 0; i < describedElements.length; i++) {
			this._removeCdkDescribedByReferenceIds(describedElements[i]);
			describedElements[i].removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
		}
		this._messagesContainer?.remove();
		this._messagesContainer = null;
		this._messageRegistry.clear();
	}
	_createMessageElement(message, role) {
		const messageElement = this._document.createElement("div");
		setMessageId(messageElement, this._id);
		messageElement.textContent = message;
		if (role) messageElement.setAttribute("role", role);
		this._createMessagesContainer();
		this._messagesContainer.appendChild(messageElement);
		this._messageRegistry.set(getKey(message, role), {
			messageElement,
			referenceCount: 0
		});
	}
	_deleteMessageElement(key) {
		this._messageRegistry.get(key)?.messageElement?.remove();
		this._messageRegistry.delete(key);
	}
	_createMessagesContainer() {
		if (this._messagesContainer) return;
		const containerClassName = "cdk-describedby-message-container";
		const serverContainers = this._document.querySelectorAll(`.${containerClassName}[platform="server"]`);
		for (let i = 0; i < serverContainers.length; i++) serverContainers[i].remove();
		const messagesContainer = this._document.createElement("div");
		messagesContainer.style.visibility = "hidden";
		messagesContainer.classList.add(containerClassName);
		messagesContainer.classList.add("cdk-visually-hidden");
		if (!this._platform.isBrowser) messagesContainer.setAttribute("platform", "server");
		this._document.body.appendChild(messagesContainer);
		this._messagesContainer = messagesContainer;
	}
	_removeCdkDescribedByReferenceIds(element) {
		const originalReferenceIds = getAriaReferenceIds(element, "aria-describedby").filter((id) => id.indexOf(CDK_DESCRIBEDBY_ID_PREFIX) != 0);
		element.setAttribute("aria-describedby", originalReferenceIds.join(" "));
	}
	_addMessageReference(element, key) {
		const registeredMessage = this._messageRegistry.get(key);
		addAriaReferencedId(element, "aria-describedby", registeredMessage.messageElement.id);
		element.setAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE, this._id);
		registeredMessage.referenceCount++;
	}
	_removeMessageReference(element, key) {
		const registeredMessage = this._messageRegistry.get(key);
		registeredMessage.referenceCount--;
		removeAriaReferencedId(element, "aria-describedby", registeredMessage.messageElement.id);
		element.removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
	}
	_isElementDescribedByMessage(element, key) {
		const referenceIds = getAriaReferenceIds(element, "aria-describedby");
		const registeredMessage = this._messageRegistry.get(key);
		const messageId = registeredMessage && registeredMessage.messageElement.id;
		return !!messageId && referenceIds.indexOf(messageId) != -1;
	}
	_canBeDescribed(element, message) {
		if (!this._isElementNode(element)) return false;
		if (message && typeof message === "object") return true;
		const trimmedMessage = message == null ? "" : `${message}`.trim();
		const ariaLabel = element.getAttribute("aria-label");
		return trimmedMessage ? !ariaLabel || ariaLabel.trim() !== trimmedMessage : false;
	}
	_isElementNode(element) {
		return element.nodeType === this._document.ELEMENT_NODE;
	}
	static ɵfac = function AriaDescriber_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || AriaDescriber)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: AriaDescriber,
		factory: AriaDescriber.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AriaDescriber, [{ type: Service }], () => [], null);
})();
function getKey(message, role) {
	return typeof message === "string" ? `${role || ""}/${message}` : message;
}
function setMessageId(element, serviceId) {
	if (!element.id) element.id = `${CDK_DESCRIBEDBY_ID_PREFIX}-${serviceId}-${nextId++}`;
}
var ConfigurableFocusTrap = class extends FocusTrap {
	_focusTrapManager;
	_inertStrategy;
	get enabled() {
		return this._enabled;
	}
	set enabled(value) {
		this._enabled = value;
		if (this._enabled) this._focusTrapManager.register(this);
		else this._focusTrapManager.deregister(this);
	}
	constructor(_element, _checker, _ngZone, _document, _focusTrapManager, _inertStrategy, config, injector) {
		super(_element, _checker, _ngZone, _document, config.defer, injector);
		this._focusTrapManager = _focusTrapManager;
		this._inertStrategy = _inertStrategy;
		this._focusTrapManager.register(this);
	}
	destroy() {
		this._focusTrapManager.deregister(this);
		super.destroy();
	}
	_enable() {
		this._inertStrategy.preventFocus(this);
		this.toggleAnchors(true);
	}
	_disable() {
		this._inertStrategy.allowFocus(this);
		this.toggleAnchors(false);
	}
};
var EventListenerFocusTrapInertStrategy = class {
	_listener = null;
	preventFocus(focusTrap) {
		if (this._listener) focusTrap._document.removeEventListener("focus", this._listener, true);
		this._listener = (e) => this._trapFocus(focusTrap, e);
		focusTrap._ngZone.runOutsideAngular(() => {
			focusTrap._document.addEventListener("focus", this._listener, true);
		});
	}
	allowFocus(focusTrap) {
		if (!this._listener) return;
		focusTrap._document.removeEventListener("focus", this._listener, true);
		this._listener = null;
	}
	_trapFocus(focusTrap, event) {
		const target = event.target;
		const focusTrapRoot = focusTrap._element;
		if (target && !focusTrapRoot.contains(target) && !target.closest?.("div.cdk-overlay-pane")) setTimeout(() => {
			if (focusTrap.enabled && !focusTrapRoot.contains(focusTrap._document.activeElement)) focusTrap.focusFirstTabbableElement();
		});
	}
};
var FOCUS_TRAP_INERT_STRATEGY = new InjectionToken("FOCUS_TRAP_INERT_STRATEGY");
var FocusTrapManager = class FocusTrapManager {
	_focusTrapStack = [];
	register(focusTrap) {
		this._focusTrapStack = this._focusTrapStack.filter((ft) => ft !== focusTrap);
		let stack = this._focusTrapStack;
		if (stack.length) stack[stack.length - 1]._disable();
		stack.push(focusTrap);
		focusTrap._enable();
	}
	deregister(focusTrap) {
		focusTrap._disable();
		const stack = this._focusTrapStack;
		const i = stack.indexOf(focusTrap);
		if (i !== -1) {
			stack.splice(i, 1);
			if (stack.length) stack[stack.length - 1]._enable();
		}
	}
	static ɵfac = function FocusTrapManager_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || FocusTrapManager)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: FocusTrapManager,
		factory: FocusTrapManager.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusTrapManager, [{ type: Service }], null, null);
})();
var ConfigurableFocusTrapFactory = class ConfigurableFocusTrapFactory {
	_checker = inject(InteractivityChecker);
	_ngZone = inject(NgZone);
	_focusTrapManager = inject(FocusTrapManager);
	_document = inject(DOCUMENT);
	_inertStrategy;
	_injector = inject(Injector);
	constructor() {
		const inertStrategy = inject(FOCUS_TRAP_INERT_STRATEGY, { optional: true });
		this._inertStrategy = inertStrategy || new EventListenerFocusTrapInertStrategy();
	}
	create(element, config = { defer: false }) {
		return new ConfigurableFocusTrap(element, this._checker, this._ngZone, this._document, this._focusTrapManager, this._inertStrategy, config, this._injector);
	}
	static ɵfac = function ConfigurableFocusTrapFactory_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ConfigurableFocusTrapFactory)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: ConfigurableFocusTrapFactory,
		factory: ConfigurableFocusTrapFactory.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfigurableFocusTrapFactory, [{ type: Service }], () => [], null);
})();
// node_modules/@angular/cdk/fesm2022/_test-environment-chunk.mjs
function _isTestEnvironment() {
	return typeof __karma__ !== "undefined" && !!__karma__ || typeof jasmine !== "undefined" && !!jasmine || typeof jest !== "undefined" && !!jest || typeof Mocha !== "undefined" && !!Mocha;
}
// node_modules/@angular/cdk/fesm2022/_css-pixel-value-chunk.mjs
function coerceCssPixelValue(value) {
	if (value == null) return "";
	return typeof value === "string" ? value : `${value}px`;
}
// node_modules/@angular/cdk/fesm2022/portal.mjs
function throwNullPortalError() {
	throw Error("Must provide a portal to attach");
}
function throwPortalAlreadyAttachedError() {
	throw Error("Host already has a portal attached");
}
function throwPortalOutletAlreadyDisposedError() {
	throw Error("This PortalOutlet has already been disposed");
}
function throwUnknownPortalTypeError() {
	throw Error("Attempting to attach an unknown Portal type. BasePortalOutlet accepts either a ComponentPortal or a TemplatePortal.");
}
function throwNullPortalOutletError() {
	throw Error("Attempting to attach a portal to a null PortalOutlet");
}
function throwNoPortalAttachedError() {
	throw Error("Attempting to detach a portal that is not attached to a host");
}
var Portal = class {
	_attachedHost = null;
	attach(host) {
		if (typeof ngDevMode === "undefined" || ngDevMode) {
			if (host == null) throwNullPortalOutletError();
			if (host.hasAttached()) throwPortalAlreadyAttachedError();
		}
		this._attachedHost = host;
		return host.attach(this);
	}
	detach() {
		let host = this._attachedHost;
		if (host != null) {
			this._attachedHost = null;
			host.detach();
		} else if (typeof ngDevMode === "undefined" || ngDevMode) throwNoPortalAttachedError();
	}
	get isAttached() {
		return this._attachedHost != null;
	}
	setAttachedHost(host) {
		this._attachedHost = host;
	}
};
var ComponentPortal = class extends Portal {
	component;
	viewContainerRef;
	injector;
	projectableNodes;
	bindings;
	directives;
	constructor(component, viewContainerRef, injector, projectableNodes, bindings, directives) {
		super();
		this.component = component;
		this.viewContainerRef = viewContainerRef;
		this.injector = injector;
		this.projectableNodes = projectableNodes;
		this.bindings = bindings || null;
		this.directives = directives || null;
	}
};
var TemplatePortal = class extends Portal {
	templateRef;
	viewContainerRef;
	context;
	injector;
	constructor(templateRef, viewContainerRef, context, injector) {
		super();
		this.templateRef = templateRef;
		this.viewContainerRef = viewContainerRef;
		this.context = context;
		this.injector = injector;
	}
	get origin() {
		return this.templateRef.elementRef;
	}
	attach(host, context = this.context) {
		this.context = context;
		return super.attach(host);
	}
	detach() {
		this.context = void 0;
		return super.detach();
	}
};
var DomPortal = class extends Portal {
	element;
	constructor(element) {
		super();
		this.element = element instanceof ElementRef ? element.nativeElement : element;
	}
};
var BasePortalOutlet = class {
	_attachedPortal = null;
	_disposeFn = null;
	_isDisposed = false;
	hasAttached() {
		return !!this._attachedPortal;
	}
	attach(portal) {
		if (typeof ngDevMode === "undefined" || ngDevMode) {
			if (!portal) throwNullPortalError();
			if (this.hasAttached()) throwPortalAlreadyAttachedError();
			if (this._isDisposed) throwPortalOutletAlreadyDisposedError();
		}
		if (portal instanceof ComponentPortal) {
			this._attachedPortal = portal;
			return this.attachComponentPortal(portal);
		} else if (portal instanceof TemplatePortal) {
			this._attachedPortal = portal;
			return this.attachTemplatePortal(portal);
		} else if (this.attachDomPortal && portal instanceof DomPortal) {
			this._attachedPortal = portal;
			return this.attachDomPortal(portal);
		}
		if (typeof ngDevMode === "undefined" || ngDevMode) throwUnknownPortalTypeError();
	}
	attachDomPortal = null;
	detach() {
		if (this._attachedPortal) {
			this._attachedPortal.setAttachedHost(null);
			this._attachedPortal = null;
		}
		this._invokeDisposeFn();
	}
	dispose() {
		if (this.hasAttached()) this.detach();
		this._invokeDisposeFn();
		this._isDisposed = true;
	}
	setDisposeFn(fn) {
		this._disposeFn = fn;
	}
	_invokeDisposeFn() {
		if (this._disposeFn) {
			this._disposeFn();
			this._disposeFn = null;
		}
	}
};
var DomPortalOutlet = class extends BasePortalOutlet {
	outletElement;
	_appRef;
	_defaultInjector;
	constructor(outletElement, _appRef, _defaultInjector) {
		super();
		this.outletElement = outletElement;
		this._appRef = _appRef;
		this._defaultInjector = _defaultInjector;
	}
	attachComponentPortal(portal) {
		let componentRef;
		if (portal.viewContainerRef) {
			const injector = portal.injector || portal.viewContainerRef.injector;
			const ngModuleRef = injector.get(NgModuleRef$1, null, { optional: true }) || void 0;
			componentRef = portal.viewContainerRef.createComponent(portal.component, {
				index: portal.viewContainerRef.length,
				injector,
				ngModuleRef,
				projectableNodes: portal.projectableNodes || void 0,
				bindings: portal.bindings || void 0,
				directives: portal.directives || void 0
			});
			this.setDisposeFn(() => componentRef.destroy());
		} else {
			if ((typeof ngDevMode === "undefined" || ngDevMode) && !this._appRef) throw Error("Cannot attach component portal to outlet without an ApplicationRef.");
			const appRef = this._appRef;
			const elementInjector = portal.injector || this._defaultInjector || Injector.NULL;
			const environmentInjector = elementInjector.get(EnvironmentInjector, appRef.injector);
			componentRef = createComponent(portal.component, {
				elementInjector,
				environmentInjector,
				projectableNodes: portal.projectableNodes || void 0,
				bindings: portal.bindings || void 0,
				directives: portal.directives || void 0
			});
			appRef.attachView(componentRef.hostView);
			this.setDisposeFn(() => {
				if (appRef.viewCount > 0) appRef.detachView(componentRef.hostView);
				componentRef.destroy();
			});
		}
		this.outletElement.appendChild(this._getComponentRootNode(componentRef));
		this._attachedPortal = portal;
		return componentRef;
	}
	attachTemplatePortal(portal) {
		let viewContainer = portal.viewContainerRef;
		let viewRef = viewContainer.createEmbeddedView(portal.templateRef, portal.context, { injector: portal.injector });
		viewRef.rootNodes.forEach((rootNode) => this.outletElement.appendChild(rootNode));
		viewRef.detectChanges();
		this.setDisposeFn(() => {
			let index = viewContainer.indexOf(viewRef);
			if (index !== -1) viewContainer.remove(index);
		});
		this._attachedPortal = portal;
		return viewRef;
	}
	attachDomPortal = (portal) => {
		const element = portal.element;
		if (!element.parentNode && (typeof ngDevMode === "undefined" || ngDevMode)) throw Error("DOM portal content must be attached to a parent node.");
		const anchorNode = this.outletElement.ownerDocument.createComment("dom-portal");
		element.parentNode.insertBefore(anchorNode, element);
		this.outletElement.appendChild(element);
		this._attachedPortal = portal;
		super.setDisposeFn(() => {
			if (anchorNode.parentNode) anchorNode.parentNode.replaceChild(element, anchorNode);
		});
	};
	dispose() {
		super.dispose();
		this.outletElement.remove();
	}
	_getComponentRootNode(componentRef) {
		return componentRef.hostView.rootNodes[0];
	}
};
var CdkPortal = class CdkPortal extends TemplatePortal {
	constructor() {
		const templateRef = inject(TemplateRef);
		const viewContainerRef = inject(ViewContainerRef);
		super(templateRef, viewContainerRef);
	}
	static ɵfac = function CdkPortal_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || CdkPortal)();
	};
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: CdkPortal,
		selectors: [[
			"",
			"cdkPortal",
			""
		]],
		exportAs: ["cdkPortal"],
		features: [ɵɵInheritDefinitionFeature]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkPortal, [{
		type: Directive,
		args: [{
			selector: "[cdkPortal]",
			exportAs: "cdkPortal"
		}]
	}], () => [], null);
})();
var CdkPortalOutlet = class CdkPortalOutlet extends BasePortalOutlet {
	_moduleRef = inject(NgModuleRef$1, { optional: true });
	_document = inject(DOCUMENT);
	_viewContainerRef = inject(ViewContainerRef);
	_isInitialized = false;
	_attachedRef = null;
	get portal() {
		return this._attachedPortal;
	}
	set portal(portal) {
		if (this.hasAttached() && !portal && !this._isInitialized) return;
		if (this.hasAttached()) super.detach();
		if (portal) super.attach(portal);
		this._attachedPortal = portal || null;
	}
	attached = new EventEmitter();
	get attachedRef() {
		return this._attachedRef;
	}
	ngOnInit() {
		this._isInitialized = true;
	}
	ngOnDestroy() {
		super.dispose();
		this._attachedRef = this._attachedPortal = null;
	}
	attachComponentPortal(portal) {
		portal.setAttachedHost(this);
		const viewContainerRef = portal.viewContainerRef != null ? portal.viewContainerRef : this._viewContainerRef;
		const ref = viewContainerRef.createComponent(portal.component, {
			index: viewContainerRef.length,
			injector: portal.injector || viewContainerRef.injector,
			projectableNodes: portal.projectableNodes || void 0,
			ngModuleRef: this._moduleRef || void 0,
			bindings: portal.bindings || void 0,
			directives: portal.directives || void 0
		});
		if (viewContainerRef !== this._viewContainerRef) this._insertContent(ref.hostView.rootNodes[0]);
		super.setDisposeFn(() => ref.destroy());
		this._attachedPortal = portal;
		this._attachedRef = ref;
		this.attached.emit(ref);
		return ref;
	}
	attachTemplatePortal(portal) {
		portal.setAttachedHost(this);
		const viewRef = this._viewContainerRef.createEmbeddedView(portal.templateRef, portal.context, { injector: portal.injector });
		super.setDisposeFn(() => this._viewContainerRef.clear());
		this._attachedPortal = portal;
		this._attachedRef = viewRef;
		this.attached.emit(viewRef);
		return viewRef;
	}
	attachDomPortal = (portal) => {
		const element = portal.element;
		if (!element.parentNode && (typeof ngDevMode === "undefined" || ngDevMode)) throw Error("DOM portal content must be attached to a parent node.");
		const anchorNode = this._document.createComment("dom-portal");
		portal.setAttachedHost(this);
		element.parentNode.insertBefore(anchorNode, element);
		this._insertContent(element);
		this._attachedPortal = portal;
		super.setDisposeFn(() => anchorNode.parentNode?.replaceChild(element, anchorNode));
	};
	_insertContent(content) {
		const nativeElement = this._viewContainerRef.element.nativeElement;
		if (nativeElement.nodeType === nativeElement.ELEMENT_NODE) nativeElement.appendChild(content);
		else nativeElement.parentNode?.insertBefore(content, nativeElement);
	}
	static ɵfac = /*@__PURE__*/ (() => {
		let ɵCdkPortalOutlet_BaseFactory = void 0;
		return function CdkPortalOutlet_Factory(__ngFactoryType__) {
			return (ɵCdkPortalOutlet_BaseFactory || (ɵCdkPortalOutlet_BaseFactory = ɵɵgetInheritedFactory(CdkPortalOutlet)))(__ngFactoryType__ || CdkPortalOutlet);
		};
	})();
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: CdkPortalOutlet,
		selectors: [[
			"",
			"cdkPortalOutlet",
			""
		]],
		inputs: { portal: [
			0,
			"cdkPortalOutlet",
			"portal"
		] },
		outputs: { attached: "attached" },
		exportAs: ["cdkPortalOutlet"],
		features: [ɵɵInheritDefinitionFeature]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkPortalOutlet, [{
		type: Directive,
		args: [{
			selector: "[cdkPortalOutlet]",
			exportAs: "cdkPortalOutlet"
		}]
	}], null, {
		portal: [{
			type: Input,
			args: ["cdkPortalOutlet"]
		}],
		attached: [{ type: Output }]
	});
})();
var PortalModule = class PortalModule {
	static ɵfac = function PortalModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || PortalModule)();
	};
	static ɵmod = /*@__PURE__*/ ɵɵdefineNgModule({
		type: PortalModule,
		imports: [CdkPortal, CdkPortalOutlet],
		exports: [CdkPortal, CdkPortalOutlet]
	});
	static ɵinj = /*@__PURE__*/ ɵɵdefineInjector({});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PortalModule, [{
		type: NgModule,
		args: [{
			imports: [CdkPortal, CdkPortalOutlet],
			exports: [CdkPortal, CdkPortalOutlet]
		}]
	}], null, null);
})();
// node_modules/@angular/cdk/fesm2022/_overlay-module-chunk.mjs
var scrollBehaviorSupported = supportsScrollBehavior();
function createBlockScrollStrategy(injector) {
	return new BlockScrollStrategy(injector.get(ViewportRuler), injector.get(DOCUMENT));
}
var BlockScrollStrategy = class {
	_viewportRuler;
	_previousHTMLStyles = {
		top: "",
		left: ""
	};
	_previousScrollPosition;
	_isEnabled = false;
	_document;
	constructor(_viewportRuler, document) {
		this._viewportRuler = _viewportRuler;
		this._document = document;
	}
	attach() {}
	enable() {
		if (this._canBeEnabled()) {
			const root = this._document.documentElement;
			this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition();
			this._previousHTMLStyles.left = root.style.left || "";
			this._previousHTMLStyles.top = root.style.top || "";
			root.style.left = coerceCssPixelValue(-this._previousScrollPosition.left);
			root.style.top = coerceCssPixelValue(-this._previousScrollPosition.top);
			root.classList.add("cdk-global-scrollblock");
			this._isEnabled = true;
		}
	}
	disable() {
		if (this._isEnabled) {
			const html = this._document.documentElement;
			const body = this._document.body;
			const htmlStyle = html.style;
			const bodyStyle = body.style;
			const previousHtmlScrollBehavior = htmlStyle.scrollBehavior || "";
			const previousBodyScrollBehavior = bodyStyle.scrollBehavior || "";
			this._isEnabled = false;
			htmlStyle.left = this._previousHTMLStyles.left;
			htmlStyle.top = this._previousHTMLStyles.top;
			html.classList.remove("cdk-global-scrollblock");
			if (scrollBehaviorSupported) htmlStyle.scrollBehavior = bodyStyle.scrollBehavior = "auto";
			window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top);
			if (scrollBehaviorSupported) {
				htmlStyle.scrollBehavior = previousHtmlScrollBehavior;
				bodyStyle.scrollBehavior = previousBodyScrollBehavior;
			}
		}
	}
	_canBeEnabled() {
		if (this._document.documentElement.classList.contains("cdk-global-scrollblock") || this._isEnabled) return false;
		const rootElement = this._document.documentElement;
		const viewport = this._viewportRuler.getViewportSize();
		return rootElement.scrollHeight > viewport.height || rootElement.scrollWidth > viewport.width;
	}
};
function getMatScrollStrategyAlreadyAttachedError() {
	return Error(`Scroll strategy has already been attached.`);
}
function createCloseScrollStrategy(injector, config) {
	return new CloseScrollStrategy(injector.get(ScrollDispatcher), injector.get(NgZone), injector.get(ViewportRuler), config);
}
var CloseScrollStrategy = class {
	_scrollDispatcher;
	_ngZone;
	_viewportRuler;
	_config;
	_scrollSubscription = null;
	_overlayRef;
	_initialScrollPosition;
	constructor(_scrollDispatcher, _ngZone, _viewportRuler, _config) {
		this._scrollDispatcher = _scrollDispatcher;
		this._ngZone = _ngZone;
		this._viewportRuler = _viewportRuler;
		this._config = _config;
	}
	attach(overlayRef) {
		if (this._overlayRef && (typeof ngDevMode === "undefined" || ngDevMode)) throw getMatScrollStrategyAlreadyAttachedError();
		this._overlayRef = overlayRef;
	}
	enable() {
		if (this._scrollSubscription) return;
		const stream = this._scrollDispatcher.scrolled(0).pipe(filter((scrollable) => {
			return !scrollable || !this._overlayRef.overlayElement.contains(scrollable.getElementRef().nativeElement);
		}));
		if (this._config && this._config.threshold && this._config.threshold > 1) {
			this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top;
			this._scrollSubscription = stream.subscribe(() => {
				const scrollPosition = this._viewportRuler.getViewportScrollPosition().top;
				if (Math.abs(scrollPosition - this._initialScrollPosition) > this._config.threshold) this._detach();
				else this._overlayRef.updatePosition();
			});
		} else this._scrollSubscription = stream.subscribe(this._detach);
	}
	disable() {
		if (this._scrollSubscription) {
			this._scrollSubscription.unsubscribe();
			this._scrollSubscription = null;
		}
	}
	detach() {
		this.disable();
		this._overlayRef = null;
	}
	_detach = () => {
		this.disable();
		if (this._overlayRef.hasAttached()) this._ngZone.run(() => this._overlayRef.detach());
	};
};
var NoopScrollStrategy = class {
	enable() {}
	disable() {}
	attach() {}
};
function isElementScrolledOutsideView(element, scrollContainers) {
	return scrollContainers.some((containerBounds) => {
		const outsideAbove = element.bottom < containerBounds.top;
		const outsideBelow = element.top > containerBounds.bottom;
		const outsideLeft = element.right < containerBounds.left;
		const outsideRight = element.left > containerBounds.right;
		return outsideAbove || outsideBelow || outsideLeft || outsideRight;
	});
}
function isElementClippedByScrolling(element, scrollContainers) {
	return scrollContainers.some((scrollContainerRect) => {
		const clippedAbove = element.top < scrollContainerRect.top;
		const clippedBelow = element.bottom > scrollContainerRect.bottom;
		const clippedLeft = element.left < scrollContainerRect.left;
		const clippedRight = element.right > scrollContainerRect.right;
		return clippedAbove || clippedBelow || clippedLeft || clippedRight;
	});
}
function createRepositionScrollStrategy(injector, config) {
	return new RepositionScrollStrategy(injector.get(ScrollDispatcher), injector.get(ViewportRuler), injector.get(NgZone), config);
}
var RepositionScrollStrategy = class {
	_scrollDispatcher;
	_viewportRuler;
	_ngZone;
	_config;
	_scrollSubscription = null;
	_overlayRef;
	constructor(_scrollDispatcher, _viewportRuler, _ngZone, _config) {
		this._scrollDispatcher = _scrollDispatcher;
		this._viewportRuler = _viewportRuler;
		this._ngZone = _ngZone;
		this._config = _config;
	}
	attach(overlayRef) {
		if (this._overlayRef && (typeof ngDevMode === "undefined" || ngDevMode)) throw getMatScrollStrategyAlreadyAttachedError();
		this._overlayRef = overlayRef;
	}
	enable() {
		if (!this._scrollSubscription) {
			const throttle = this._config ? this._config.scrollThrottle : 0;
			this._scrollSubscription = this._scrollDispatcher.scrolled(throttle).subscribe(() => {
				this._overlayRef.updatePosition();
				if (this._config && this._config.autoClose) {
					const overlayRect = this._overlayRef.overlayElement.getBoundingClientRect();
					const { width, height } = this._viewportRuler.getViewportSize();
					if (isElementScrolledOutsideView(overlayRect, [{
						width,
						height,
						bottom: height,
						right: width,
						top: 0,
						left: 0
					}])) {
						this.disable();
						this._ngZone.run(() => this._overlayRef.detach());
					}
				}
			});
		}
	}
	disable() {
		if (this._scrollSubscription) {
			this._scrollSubscription.unsubscribe();
			this._scrollSubscription = null;
		}
	}
	detach() {
		this.disable();
		this._overlayRef = null;
	}
};
var ScrollStrategyOptions = class ScrollStrategyOptions {
	_injector = inject(Injector);
	noop = () => new NoopScrollStrategy();
	close = (config) => createCloseScrollStrategy(this._injector, config);
	block = () => createBlockScrollStrategy(this._injector);
	reposition = (config) => createRepositionScrollStrategy(this._injector, config);
	static ɵfac = function ScrollStrategyOptions_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ScrollStrategyOptions)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: ScrollStrategyOptions,
		factory: ScrollStrategyOptions.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollStrategyOptions, [{ type: Service }], null, null);
})();
var OverlayConfig = class {
	positionStrategy;
	scrollStrategy = new NoopScrollStrategy();
	panelClass = "";
	hasBackdrop = false;
	backdropClass = "cdk-overlay-dark-backdrop";
	disableAnimations;
	width;
	height;
	minWidth;
	minHeight;
	maxWidth;
	maxHeight;
	direction;
	disposeOnNavigation = false;
	usePopover;
	eventPredicate;
	constructor(config) {
		if (config) {
			const configKeys = Object.keys(config);
			for (const key of configKeys) if (config[key] !== void 0) this[key] = config[key];
		}
	}
};
var ConnectedOverlayPositionChange = class {
	connectionPair;
	scrollableViewProperties;
	constructor(connectionPair, scrollableViewProperties) {
		this.connectionPair = connectionPair;
		this.scrollableViewProperties = scrollableViewProperties;
	}
};
function validateVerticalPosition(property, value) {
	if (value !== "top" && value !== "bottom" && value !== "center") throw Error(`ConnectedPosition: Invalid ${property} "${value}". Expected "top", "bottom" or "center".`);
}
function validateHorizontalPosition(property, value) {
	if (value !== "start" && value !== "end" && value !== "center") throw Error(`ConnectedPosition: Invalid ${property} "${value}". Expected "start", "end" or "center".`);
}
var BaseOverlayDispatcher = class BaseOverlayDispatcher {
	_attachedOverlays = [];
	_document = inject(DOCUMENT);
	_isAttached = false;
	ngOnDestroy() {
		this.detach();
	}
	add(overlayRef) {
		this.remove(overlayRef);
		this._attachedOverlays.push(overlayRef);
	}
	remove(overlayRef) {
		const index = this._attachedOverlays.indexOf(overlayRef);
		if (index > -1) this._attachedOverlays.splice(index, 1);
		if (this._attachedOverlays.length === 0) this.detach();
	}
	canReceiveEvent(overlayRef, event, stream) {
		if (stream.observers.length < 1) return false;
		if (overlayRef.eventPredicate) return overlayRef.eventPredicate(event);
		return true;
	}
	static ɵfac = function BaseOverlayDispatcher_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || BaseOverlayDispatcher)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: BaseOverlayDispatcher,
		factory: BaseOverlayDispatcher.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseOverlayDispatcher, [{ type: Service }], null, null);
})();
var OverlayKeyboardDispatcher = class OverlayKeyboardDispatcher extends BaseOverlayDispatcher {
	_ngZone = inject(NgZone);
	_renderer = inject(RendererFactory2).createRenderer(null, null);
	_cleanupKeydown;
	add(overlayRef) {
		super.add(overlayRef);
		if (!this._isAttached) {
			this._ngZone.runOutsideAngular(() => {
				this._cleanupKeydown = this._renderer.listen("body", "keydown", this._keydownListener);
			});
			this._isAttached = true;
		}
	}
	detach() {
		if (this._isAttached) {
			this._cleanupKeydown?.();
			this._isAttached = false;
		}
	}
	_keydownListener = (event) => {
		const overlays = this._attachedOverlays;
		for (let i = overlays.length - 1; i > -1; i--) {
			const overlayRef = overlays[i];
			if (this.canReceiveEvent(overlayRef, event, overlayRef._keydownEvents)) {
				this._ngZone.run(() => overlayRef._keydownEvents.next(event));
				break;
			}
		}
	};
	static ɵfac = function OverlayKeyboardDispatcher_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || OverlayKeyboardDispatcher)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: OverlayKeyboardDispatcher,
		factory: OverlayKeyboardDispatcher.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayKeyboardDispatcher, [{ type: Service }], null, null);
})();
var OverlayOutsideClickDispatcher = class OverlayOutsideClickDispatcher extends BaseOverlayDispatcher {
	_platform = inject(Platform);
	_ngZone = inject(NgZone);
	_renderer = inject(RendererFactory2).createRenderer(null, null);
	_cursorOriginalValue;
	_cursorStyleIsSet = false;
	_pointerDownEventTarget = null;
	_cleanups;
	add(overlayRef) {
		super.add(overlayRef);
		if (!this._isAttached) {
			const body = this._document.body;
			const eventOptions = { capture: true };
			const renderer = this._renderer;
			this._cleanups = this._ngZone.runOutsideAngular(() => [
				renderer.listen(body, "pointerdown", this._pointerDownListener, eventOptions),
				renderer.listen(body, "click", this._clickListener, eventOptions),
				renderer.listen(body, "auxclick", this._clickListener, eventOptions),
				renderer.listen(body, "contextmenu", this._clickListener, eventOptions)
			]);
			if (this._platform.IOS && !this._cursorStyleIsSet) {
				this._cursorOriginalValue = body.style.cursor;
				body.style.cursor = "pointer";
				this._cursorStyleIsSet = true;
			}
			this._isAttached = true;
		}
	}
	detach() {
		if (this._isAttached) {
			this._cleanups?.forEach((cleanup) => cleanup());
			this._cleanups = void 0;
			if (this._platform.IOS && this._cursorStyleIsSet) {
				this._document.body.style.cursor = this._cursorOriginalValue;
				this._cursorStyleIsSet = false;
			}
			this._isAttached = false;
		}
	}
	_pointerDownListener = (event) => {
		this._pointerDownEventTarget = _getEventTarget(event);
	};
	_clickListener = (event) => {
		const target = _getEventTarget(event);
		const origin = event.type === "click" && this._pointerDownEventTarget ? this._pointerDownEventTarget : target;
		this._pointerDownEventTarget = null;
		const overlays = this._attachedOverlays.slice();
		for (let i = overlays.length - 1; i > -1; i--) {
			const overlayRef = overlays[i];
			const outsidePointerEvents = overlayRef._outsidePointerEvents;
			if (!overlayRef.hasAttached() || !this.canReceiveEvent(overlayRef, event, outsidePointerEvents)) continue;
			if (containsPierceShadowDom(overlayRef.overlayElement, target) || containsPierceShadowDom(overlayRef.overlayElement, origin)) break;
			if (this._ngZone) this._ngZone.run(() => outsidePointerEvents.next(event));
			else outsidePointerEvents.next(event);
		}
	};
	static ɵfac = function OverlayOutsideClickDispatcher_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || OverlayOutsideClickDispatcher)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: OverlayOutsideClickDispatcher,
		factory: OverlayOutsideClickDispatcher.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayOutsideClickDispatcher, [{ type: Service }], null, null);
})();
function containsPierceShadowDom(parent, child) {
	const supportsShadowRoot = typeof ShadowRoot !== "undefined" && ShadowRoot;
	let current = child;
	while (current) {
		if (current === parent) return true;
		current = supportsShadowRoot && current instanceof ShadowRoot ? current.host : current.parentNode;
	}
	return false;
}
var _CdkOverlayStyleLoader = class _CdkOverlayStyleLoader {
	static ɵfac = function _CdkOverlayStyleLoader_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || _CdkOverlayStyleLoader)();
	};
	static ɵcmp = /*@__PURE__*/ ɵɵdefineComponent({
		type: _CdkOverlayStyleLoader,
		selectors: [["ng-component"]],
		hostAttrs: ["cdk-overlay-style-loader", ""],
		decls: 0,
		vars: 0,
		template: function _CdkOverlayStyleLoader_Template(rf, ctx) {},
		styles: [".cdk-overlay-container, .cdk-global-overlay-wrapper {\n  pointer-events: none;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n}\n\n.cdk-overlay-container {\n  position: fixed;\n}\n@layer cdk-overlay {\n  .cdk-overlay-container {\n    z-index: 1000;\n  }\n}\n.cdk-overlay-container:empty {\n  display: none;\n}\n\n.cdk-global-overlay-wrapper {\n  display: flex;\n  position: absolute;\n}\n@layer cdk-overlay {\n  .cdk-global-overlay-wrapper {\n    z-index: 1000;\n  }\n}\n\n.cdk-overlay-pane {\n  position: absolute;\n  pointer-events: auto;\n  box-sizing: border-box;\n  display: flex;\n  max-width: 100%;\n  max-height: 100%;\n}\n@layer cdk-overlay {\n  .cdk-overlay-pane {\n    z-index: 1000;\n  }\n}\n\n.cdk-overlay-backdrop {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  pointer-events: auto;\n  -webkit-tap-highlight-color: transparent;\n  opacity: 0;\n  touch-action: manipulation;\n}\n@layer cdk-overlay {\n  .cdk-overlay-backdrop {\n    z-index: 1000;\n    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n  }\n}\n@media (prefers-reduced-motion) {\n  .cdk-overlay-backdrop {\n    transition-duration: 1ms;\n  }\n}\n\n.cdk-overlay-backdrop-showing {\n  opacity: 1;\n}\n@media (forced-colors: active) {\n  .cdk-overlay-backdrop-showing {\n    opacity: 0.6;\n  }\n}\n\n@layer cdk-overlay {\n  .cdk-overlay-dark-backdrop {\n    background: rgba(0, 0, 0, 0.32);\n  }\n}\n\n.cdk-overlay-transparent-backdrop {\n  transition: visibility 1ms linear, opacity 1ms linear;\n  visibility: hidden;\n  opacity: 1;\n}\n.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing, .cdk-high-contrast-active .cdk-overlay-transparent-backdrop {\n  opacity: 0;\n  visibility: visible;\n}\n\n.cdk-overlay-backdrop-noop-animation {\n  transition: none;\n}\n\n.cdk-overlay-connected-position-bounding-box {\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  min-width: 1px;\n  min-height: 1px;\n}\n@layer cdk-overlay {\n  .cdk-overlay-connected-position-bounding-box {\n    z-index: 1000;\n  }\n}\n\n.cdk-global-scrollblock {\n  position: fixed;\n  width: 100%;\n  overflow-y: scroll;\n}\n\n.cdk-overlay-popover {\n  background: none;\n  border: none;\n  padding: 0;\n  outline: 0;\n  overflow: visible;\n  position: fixed;\n  pointer-events: none;\n  white-space: normal;\n  color: inherit;\n  text-decoration: none;\n  width: 100%;\n  height: 100%;\n  inset: auto;\n  top: 0;\n  left: 0;\n}\n.cdk-overlay-popover::backdrop {\n  display: none;\n}\n.cdk-overlay-popover .cdk-overlay-backdrop {\n  position: fixed;\n  z-index: auto;\n}\n"],
		encapsulation: 2
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_CdkOverlayStyleLoader, [{
		type: Component,
		args: [{
			template: "",
			encapsulation: ViewEncapsulation.None,
			host: { "cdk-overlay-style-loader": "" },
			styles: [".cdk-overlay-container, .cdk-global-overlay-wrapper {\n  pointer-events: none;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n}\n\n.cdk-overlay-container {\n  position: fixed;\n}\n@layer cdk-overlay {\n  .cdk-overlay-container {\n    z-index: 1000;\n  }\n}\n.cdk-overlay-container:empty {\n  display: none;\n}\n\n.cdk-global-overlay-wrapper {\n  display: flex;\n  position: absolute;\n}\n@layer cdk-overlay {\n  .cdk-global-overlay-wrapper {\n    z-index: 1000;\n  }\n}\n\n.cdk-overlay-pane {\n  position: absolute;\n  pointer-events: auto;\n  box-sizing: border-box;\n  display: flex;\n  max-width: 100%;\n  max-height: 100%;\n}\n@layer cdk-overlay {\n  .cdk-overlay-pane {\n    z-index: 1000;\n  }\n}\n\n.cdk-overlay-backdrop {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  pointer-events: auto;\n  -webkit-tap-highlight-color: transparent;\n  opacity: 0;\n  touch-action: manipulation;\n}\n@layer cdk-overlay {\n  .cdk-overlay-backdrop {\n    z-index: 1000;\n    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n  }\n}\n@media (prefers-reduced-motion) {\n  .cdk-overlay-backdrop {\n    transition-duration: 1ms;\n  }\n}\n\n.cdk-overlay-backdrop-showing {\n  opacity: 1;\n}\n@media (forced-colors: active) {\n  .cdk-overlay-backdrop-showing {\n    opacity: 0.6;\n  }\n}\n\n@layer cdk-overlay {\n  .cdk-overlay-dark-backdrop {\n    background: rgba(0, 0, 0, 0.32);\n  }\n}\n\n.cdk-overlay-transparent-backdrop {\n  transition: visibility 1ms linear, opacity 1ms linear;\n  visibility: hidden;\n  opacity: 1;\n}\n.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing, .cdk-high-contrast-active .cdk-overlay-transparent-backdrop {\n  opacity: 0;\n  visibility: visible;\n}\n\n.cdk-overlay-backdrop-noop-animation {\n  transition: none;\n}\n\n.cdk-overlay-connected-position-bounding-box {\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  min-width: 1px;\n  min-height: 1px;\n}\n@layer cdk-overlay {\n  .cdk-overlay-connected-position-bounding-box {\n    z-index: 1000;\n  }\n}\n\n.cdk-global-scrollblock {\n  position: fixed;\n  width: 100%;\n  overflow-y: scroll;\n}\n\n.cdk-overlay-popover {\n  background: none;\n  border: none;\n  padding: 0;\n  outline: 0;\n  overflow: visible;\n  position: fixed;\n  pointer-events: none;\n  white-space: normal;\n  color: inherit;\n  text-decoration: none;\n  width: 100%;\n  height: 100%;\n  inset: auto;\n  top: 0;\n  left: 0;\n}\n.cdk-overlay-popover::backdrop {\n  display: none;\n}\n.cdk-overlay-popover .cdk-overlay-backdrop {\n  position: fixed;\n  z-index: auto;\n}\n"]
		}]
	}], null, null);
})();
var OverlayContainer = class OverlayContainer {
	_platform = inject(Platform);
	_containerElement;
	_document = inject(DOCUMENT);
	_styleLoader = inject(_CdkPrivateStyleLoader);
	ngOnDestroy() {
		this._containerElement?.remove();
	}
	getContainerElement() {
		this._loadStyles();
		if (!this._containerElement) this._createContainer();
		return this._containerElement;
	}
	_createContainer() {
		const containerClass = "cdk-overlay-container";
		if (this._platform.isBrowser || _isTestEnvironment()) {
			const oppositePlatformContainers = this._document.querySelectorAll(`.${containerClass}[platform="server"], .${containerClass}[platform="test"]`);
			for (let i = 0; i < oppositePlatformContainers.length; i++) oppositePlatformContainers[i].remove();
		}
		const container = this._document.createElement("div");
		container.classList.add(containerClass);
		if (_isTestEnvironment()) container.setAttribute("platform", "test");
		else if (!this._platform.isBrowser) container.setAttribute("platform", "server");
		this._document.body.appendChild(container);
		this._containerElement = container;
	}
	_loadStyles() {
		this._styleLoader.load(_CdkOverlayStyleLoader);
	}
	static ɵfac = function OverlayContainer_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || OverlayContainer)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: OverlayContainer,
		factory: OverlayContainer.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayContainer, [{ type: Service }], null, null);
})();
var BackdropRef = class {
	_renderer;
	_ngZone;
	element;
	_cleanupClick;
	_cleanupTransitionEnd;
	_fallbackTimeout;
	constructor(document, _renderer, _ngZone, onClick) {
		this._renderer = _renderer;
		this._ngZone = _ngZone;
		this.element = document.createElement("div");
		this.element.classList.add("cdk-overlay-backdrop");
		this._cleanupClick = _renderer.listen(this.element, "click", onClick);
	}
	detach() {
		this._ngZone.runOutsideAngular(() => {
			const element = this.element;
			clearTimeout(this._fallbackTimeout);
			this._cleanupTransitionEnd?.();
			this._cleanupTransitionEnd = this._renderer.listen(element, "transitionend", this.dispose);
			this._fallbackTimeout = setTimeout(this.dispose, 500);
			element.style.pointerEvents = "none";
			element.classList.remove("cdk-overlay-backdrop-showing");
		});
	}
	dispose = () => {
		clearTimeout(this._fallbackTimeout);
		this._cleanupClick?.();
		this._cleanupTransitionEnd?.();
		this._cleanupClick = this._cleanupTransitionEnd = this._fallbackTimeout = void 0;
		this.element.remove();
	};
};
function isElement(value) {
	return value && value.nodeType === 1;
}
var attachedOverlaysInternal = signal([], ...ngDevMode ? [{ debugName: "attachedOverlaysInternal" }] : []);
attachedOverlaysInternal.asReadonly();
var OverlayRef = class {
	_portalOutlet;
	_host;
	_pane;
	_config;
	_ngZone;
	_keyboardDispatcher;
	_document;
	_location;
	_outsideClickDispatcher;
	_animationsDisabled;
	_injector;
	_renderer;
	_backdropClick = new Subject();
	_attachments = new Subject();
	_detachments = new Subject();
	_positionStrategy;
	_scrollStrategy;
	_locationChanges;
	_backdropRef = null;
	_detachContentMutationObserver;
	_detachContentAfterRenderRef;
	_disposed = false;
	_previousHostParent;
	_keydownEvents = new Subject();
	_outsidePointerEvents = new Subject();
	_afterNextRenderRef;
	constructor(_portalOutlet, _host, _pane, _config, _ngZone, _keyboardDispatcher, _document, _location, _outsideClickDispatcher, _animationsDisabled = false, _injector, _renderer) {
		this._portalOutlet = _portalOutlet;
		this._host = _host;
		this._pane = _pane;
		this._config = _config;
		this._ngZone = _ngZone;
		this._keyboardDispatcher = _keyboardDispatcher;
		this._document = _document;
		this._location = _location;
		this._outsideClickDispatcher = _outsideClickDispatcher;
		this._animationsDisabled = _animationsDisabled;
		this._injector = _injector;
		this._renderer = _renderer;
		if (_config.scrollStrategy) {
			this._scrollStrategy = _config.scrollStrategy;
			this._scrollStrategy.attach(this);
		}
		this._positionStrategy = _config.positionStrategy;
	}
	get overlayElement() {
		return this._pane;
	}
	get backdropElement() {
		return this._backdropRef?.element || null;
	}
	get hostElement() {
		return this._host;
	}
	get eventPredicate() {
		return this._config?.eventPredicate || null;
	}
	attach(portal) {
		if (this._disposed) return null;
		this._attachHost();
		const attachResult = this._portalOutlet.attach(portal);
		this._positionStrategy?.attach(this);
		this._updateStackingOrder();
		this._updateElementSize();
		this._updateElementDirection();
		untracked(() => {
			attachedOverlaysInternal.update((prev) => prev.includes(this) ? prev : [...prev, this]);
		});
		if (this._scrollStrategy) this._scrollStrategy.enable();
		this._afterNextRenderRef?.destroy();
		this._afterNextRenderRef = afterNextRender(() => {
			if (this.hasAttached()) this.updatePosition();
		}, { injector: this._injector });
		this._togglePointerEvents(true);
		if (this._config.hasBackdrop) this._attachBackdrop();
		if (this._config.panelClass) this._toggleClasses(this._pane, this._config.panelClass, true);
		this._attachments.next();
		this._completeDetachContent();
		this._keyboardDispatcher.add(this);
		if (this._config.disposeOnNavigation === true || this._config.disposeOnNavigation === "pop-state") {
			const subscription = this._location.subscribe(() => this.dispose());
			this._locationChanges = () => subscription.unsubscribe();
		} else if (this._config.disposeOnNavigation === "url-change") this._locationChanges = this._location.onUrlChange(() => this.dispose());
		this._outsideClickDispatcher.add(this);
		if (typeof attachResult?.onDestroy === "function") attachResult.onDestroy(() => {
			if (this.hasAttached()) this._ngZone.runOutsideAngular(() => Promise.resolve().then(() => this.detach()));
		});
		return attachResult;
	}
	detach() {
		if (!this.hasAttached()) return;
		this.detachBackdrop();
		this._togglePointerEvents(false);
		if (this._positionStrategy && this._positionStrategy.detach) this._positionStrategy.detach();
		if (this._scrollStrategy) this._scrollStrategy.disable();
		const detachmentResult = this._portalOutlet.detach();
		this._detachments.next();
		this._completeDetachContent();
		this._keyboardDispatcher.remove(this);
		this._detachContentWhenEmpty();
		this._locationChanges?.();
		this._outsideClickDispatcher.remove(this);
		untracked(() => {
			attachedOverlaysInternal.update((prev) => prev.filter((o) => o !== this));
		});
		return detachmentResult;
	}
	dispose() {
		if (this._disposed) return;
		const isAttached = this.hasAttached();
		if (this._positionStrategy) this._positionStrategy.dispose();
		this._disposeScrollStrategy();
		this._backdropRef?.dispose();
		this._locationChanges?.();
		this._keyboardDispatcher.remove(this);
		this._portalOutlet.dispose();
		this._attachments.complete();
		this._backdropClick.complete();
		this._keydownEvents.complete();
		this._outsidePointerEvents.complete();
		this._outsideClickDispatcher.remove(this);
		this._host?.remove();
		this._afterNextRenderRef?.destroy();
		this._previousHostParent = this._pane = this._host = this._backdropRef = null;
		if (isAttached) this._detachments.next();
		this._detachments.complete();
		this._completeDetachContent();
		this._disposed = true;
		untracked(() => {
			attachedOverlaysInternal.update((prev) => prev.filter((o) => o !== this));
		});
	}
	hasAttached() {
		return this._portalOutlet.hasAttached();
	}
	backdropClick() {
		return this._backdropClick;
	}
	attachments() {
		return this._attachments;
	}
	detachments() {
		return this._detachments;
	}
	keydownEvents() {
		return this._keydownEvents;
	}
	outsidePointerEvents() {
		return this._outsidePointerEvents;
	}
	getConfig() {
		return this._config;
	}
	updatePosition() {
		if (this._positionStrategy) this._positionStrategy.apply();
	}
	updatePositionStrategy(strategy) {
		if (strategy === this._positionStrategy) return;
		if (this._positionStrategy) this._positionStrategy.dispose();
		this._positionStrategy = strategy;
		if (this.hasAttached()) {
			strategy.attach(this);
			this.updatePosition();
		}
	}
	updateSize(sizeConfig) {
		this._config = {
			...this._config,
			...sizeConfig
		};
		this._updateElementSize();
	}
	setDirection(dir) {
		this._config = {
			...this._config,
			direction: dir
		};
		this._updateElementDirection();
	}
	addPanelClass(classes) {
		if (this._pane) this._toggleClasses(this._pane, classes, true);
	}
	removePanelClass(classes) {
		if (this._pane) this._toggleClasses(this._pane, classes, false);
	}
	getDirection() {
		const direction = this._config.direction;
		if (!direction) return "ltr";
		return typeof direction === "string" ? direction : direction.value;
	}
	updateScrollStrategy(strategy) {
		if (strategy === this._scrollStrategy) return;
		this._disposeScrollStrategy();
		this._scrollStrategy = strategy;
		if (this.hasAttached()) {
			strategy.attach(this);
			strategy.enable();
		}
	}
	_updateElementDirection() {
		this._host.setAttribute("dir", this.getDirection());
	}
	_updateElementSize() {
		if (!this._pane) return;
		const style = this._pane.style;
		style.width = coerceCssPixelValue(this._config.width);
		style.height = coerceCssPixelValue(this._config.height);
		style.minWidth = coerceCssPixelValue(this._config.minWidth);
		style.minHeight = coerceCssPixelValue(this._config.minHeight);
		style.maxWidth = coerceCssPixelValue(this._config.maxWidth);
		style.maxHeight = coerceCssPixelValue(this._config.maxHeight);
	}
	_togglePointerEvents(enablePointer) {
		this._pane.style.pointerEvents = enablePointer ? "" : "none";
	}
	_attachHost() {
		if (!this._host.parentElement) {
			const customInsertionPoint = this._config.usePopover ? this._positionStrategy?.getPopoverInsertionPoint?.() : null;
			if (isElement(customInsertionPoint)) customInsertionPoint.after(this._host);
			else if (customInsertionPoint?.type === "parent") customInsertionPoint.element.appendChild(this._host);
			else this._previousHostParent?.appendChild(this._host);
		}
		if (this._config.usePopover) try {
			this._host["showPopover"]();
		} catch {}
	}
	_attachBackdrop() {
		const showingClass = "cdk-overlay-backdrop-showing";
		this._backdropRef?.dispose();
		this._backdropRef = new BackdropRef(this._document, this._renderer, this._ngZone, (event) => {
			this._backdropClick.next(event);
		});
		if (this._animationsDisabled) this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation");
		if (this._config.backdropClass) this._toggleClasses(this._backdropRef.element, this._config.backdropClass, true);
		if (this._config.usePopover) this._host.prepend(this._backdropRef.element);
		else this._host.parentElement.insertBefore(this._backdropRef.element, this._host);
		if (!this._animationsDisabled && typeof requestAnimationFrame !== "undefined") this._ngZone.runOutsideAngular(() => {
			requestAnimationFrame(() => this._backdropRef?.element.classList.add(showingClass));
		});
		else this._backdropRef.element.classList.add(showingClass);
	}
	_updateStackingOrder() {
		if (!this._config.usePopover && this._host.nextSibling) this._host.parentNode.appendChild(this._host);
	}
	detachBackdrop() {
		if (this._animationsDisabled) {
			this._backdropRef?.dispose();
			this._backdropRef = null;
		} else this._backdropRef?.detach();
	}
	_toggleClasses(element, cssClasses, isAdd) {
		const classes = coerceArray(cssClasses || []).filter((c) => !!c);
		if (classes.length) isAdd ? element.classList.add(...classes) : element.classList.remove(...classes);
	}
	_detachContentWhenEmpty() {
		let rethrow = false;
		try {
			this._detachContentAfterRenderRef = afterNextRender(() => {
				rethrow = true;
				this._detachContent();
			}, { injector: this._injector });
		} catch (e) {
			if (rethrow) throw e;
			this._detachContent();
		}
		if (globalThis.MutationObserver && this._pane) {
			this._detachContentMutationObserver ||= new globalThis.MutationObserver(() => {
				this._detachContent();
			});
			this._detachContentMutationObserver.observe(this._pane, { childList: true });
		}
	}
	_detachContent() {
		if (!this._pane || !this._host || this._pane.children.length === 0) {
			if (this._pane && this._config.panelClass) this._toggleClasses(this._pane, this._config.panelClass, false);
			if (this._host && this._host.parentElement) {
				this._previousHostParent = this._host.parentElement;
				this._host.remove();
			}
			this._completeDetachContent();
		}
	}
	_completeDetachContent() {
		this._detachContentAfterRenderRef?.destroy();
		this._detachContentAfterRenderRef = void 0;
		this._detachContentMutationObserver?.disconnect();
	}
	_disposeScrollStrategy() {
		const scrollStrategy = this._scrollStrategy;
		scrollStrategy?.disable();
		scrollStrategy?.detach?.();
	}
};
var boundingBoxClass = "cdk-overlay-connected-position-bounding-box";
var cssUnitPattern = /([A-Za-z%]+)$/;
function createFlexibleConnectedPositionStrategy(injector, origin) {
	return new FlexibleConnectedPositionStrategy(origin, injector.get(ViewportRuler), injector.get(DOCUMENT), injector.get(Platform), injector.get(OverlayContainer));
}
var FlexibleConnectedPositionStrategy = class {
	_viewportRuler;
	_document;
	_platform;
	_overlayContainer;
	_overlayRef;
	_isInitialRender = false;
	_lastBoundingBoxSize = {
		width: 0,
		height: 0
	};
	_isPushed = false;
	_canPush = true;
	_growAfterOpen = false;
	_hasFlexibleDimensions = true;
	_positionLocked = false;
	_originRect;
	_overlayRect;
	_viewportRect;
	_containerRect;
	_viewportMargin = 0;
	_scrollables = [];
	_preferredPositions = [];
	_origin;
	_pane;
	_isDisposed = false;
	_boundingBox = null;
	_lastPosition = null;
	_lastScrollVisibility = null;
	_positionChanges = new Subject();
	_resizeSubscription = Subscription.EMPTY;
	_offsetX = 0;
	_offsetY = 0;
	_transformOriginSelector;
	_appliedPanelClasses = [];
	_previousPushAmount = null;
	_popoverLocation = "global";
	positionChanges = this._positionChanges;
	get positions() {
		return this._preferredPositions;
	}
	constructor(connectedTo, _viewportRuler, _document, _platform, _overlayContainer) {
		this._viewportRuler = _viewportRuler;
		this._document = _document;
		this._platform = _platform;
		this._overlayContainer = _overlayContainer;
		this.setOrigin(connectedTo);
	}
	attach(overlayRef) {
		if (this._overlayRef && overlayRef !== this._overlayRef && (typeof ngDevMode === "undefined" || ngDevMode)) throw Error("This position strategy is already attached to an overlay");
		this._validatePositions();
		overlayRef.hostElement.classList.add(boundingBoxClass);
		this._overlayRef = overlayRef;
		this._boundingBox = overlayRef.hostElement;
		this._pane = overlayRef.overlayElement;
		this._isDisposed = false;
		this._isInitialRender = true;
		this._lastPosition = null;
		this._resizeSubscription.unsubscribe();
		this._resizeSubscription = this._viewportRuler.change().subscribe(() => {
			this._isInitialRender = true;
			this.apply();
		});
	}
	apply() {
		if (this._isDisposed || !this._platform.isBrowser) return;
		if (!this._isInitialRender && this._positionLocked && this._lastPosition) {
			this.reapplyLastPosition();
			return;
		}
		this._clearPanelClasses();
		this._resetOverlayElementStyles();
		this._resetBoundingBoxStyles();
		this._viewportRect = this._getNarrowedViewportRect();
		this._originRect = this._getOriginRect();
		this._overlayRect = this._pane.getBoundingClientRect();
		this._containerRect = this._getContainerRect();
		const originRect = this._originRect;
		const overlayRect = this._overlayRect;
		const viewportRect = this._viewportRect;
		const containerRect = this._containerRect;
		const flexibleFits = [];
		let fallback;
		for (let pos of this._preferredPositions) {
			let originPoint = this._getOriginPoint(originRect, containerRect, pos);
			let overlayPoint = this._getOverlayPoint(originPoint, overlayRect, pos);
			let overlayFit = this._getOverlayFit(overlayPoint, overlayRect, viewportRect, pos);
			if (overlayFit.isCompletelyWithinViewport) {
				this._isPushed = false;
				this._applyPosition(pos, originPoint);
				return;
			}
			if (this._canFitWithFlexibleDimensions(overlayFit, overlayPoint, viewportRect)) {
				flexibleFits.push({
					position: pos,
					origin: originPoint,
					overlayRect,
					boundingBoxRect: this._calculateBoundingBoxRect(originPoint, pos)
				});
				continue;
			}
			if (!fallback || fallback.overlayFit.visibleArea < overlayFit.visibleArea) fallback = {
				overlayFit,
				overlayPoint,
				originPoint,
				position: pos,
				overlayRect
			};
		}
		if (flexibleFits.length) {
			let bestFit = null;
			let bestScore = -1;
			for (const fit of flexibleFits) {
				const score = fit.boundingBoxRect.width * fit.boundingBoxRect.height * (fit.position.weight || 1);
				if (score > bestScore) {
					bestScore = score;
					bestFit = fit;
				}
			}
			this._isPushed = false;
			this._applyPosition(bestFit.position, bestFit.origin);
			return;
		}
		if (this._canPush) {
			this._isPushed = true;
			this._applyPosition(fallback.position, fallback.originPoint);
			return;
		}
		this._applyPosition(fallback.position, fallback.originPoint);
	}
	detach() {
		this._clearPanelClasses();
		this._lastPosition = null;
		this._previousPushAmount = null;
		this._resizeSubscription.unsubscribe();
	}
	dispose() {
		if (this._isDisposed) return;
		if (this._boundingBox) extendStyles(this._boundingBox.style, {
			top: "",
			left: "",
			right: "",
			bottom: "",
			height: "",
			width: "",
			alignItems: "",
			justifyContent: ""
		});
		if (this._pane) this._resetOverlayElementStyles();
		if (this._overlayRef) this._overlayRef.hostElement.classList.remove(boundingBoxClass);
		this.detach();
		this._positionChanges.complete();
		this._overlayRef = this._boundingBox = null;
		this._isDisposed = true;
	}
	reapplyLastPosition() {
		if (this._isDisposed || !this._platform.isBrowser) return;
		const lastPosition = this._lastPosition;
		if (lastPosition) {
			this._originRect = this._getOriginRect();
			this._overlayRect = this._pane.getBoundingClientRect();
			this._viewportRect = this._getNarrowedViewportRect();
			this._containerRect = this._getContainerRect();
			this._applyPosition(lastPosition, this._getOriginPoint(this._originRect, this._containerRect, lastPosition));
		} else this.apply();
	}
	withScrollableContainers(scrollables) {
		this._scrollables = scrollables;
		return this;
	}
	withPositions(positions) {
		this._preferredPositions = positions;
		if (positions.indexOf(this._lastPosition) === -1) this._lastPosition = null;
		this._validatePositions();
		return this;
	}
	withViewportMargin(margin) {
		this._viewportMargin = margin;
		return this;
	}
	withFlexibleDimensions(flexibleDimensions = true) {
		this._hasFlexibleDimensions = flexibleDimensions;
		return this;
	}
	withGrowAfterOpen(growAfterOpen = true) {
		this._growAfterOpen = growAfterOpen;
		return this;
	}
	withPush(canPush = true) {
		this._canPush = canPush;
		return this;
	}
	withLockedPosition(isLocked = true) {
		this._positionLocked = isLocked;
		return this;
	}
	setOrigin(origin) {
		this._origin = origin;
		return this;
	}
	withDefaultOffsetX(offset) {
		this._offsetX = offset;
		return this;
	}
	withDefaultOffsetY(offset) {
		this._offsetY = offset;
		return this;
	}
	withTransformOriginOn(selector) {
		this._transformOriginSelector = selector;
		return this;
	}
	withPopoverLocation(location) {
		this._popoverLocation = location;
		return this;
	}
	getPopoverInsertionPoint() {
		if (this._popoverLocation === "global") return null;
		else if (this._popoverLocation !== "inline") return this._popoverLocation;
		if (this._origin instanceof ElementRef) return this._origin.nativeElement;
		else if (isElement(this._origin)) return this._origin;
		else return null;
	}
	_getOriginPoint(originRect, containerRect, pos) {
		let x;
		if (pos.originX == "center") x = originRect.left + originRect.width / 2;
		else {
			const startX = this._isRtl() ? originRect.right : originRect.left;
			const endX = this._isRtl() ? originRect.left : originRect.right;
			x = pos.originX == "start" ? startX : endX;
		}
		if (containerRect.left < 0) x -= containerRect.left;
		let y;
		if (pos.originY == "center") y = originRect.top + originRect.height / 2;
		else y = pos.originY == "top" ? originRect.top : originRect.bottom;
		if (containerRect.top < 0) y -= containerRect.top;
		return {
			x,
			y
		};
	}
	_getOverlayPoint(originPoint, overlayRect, pos) {
		let overlayStartX;
		if (pos.overlayX == "center") overlayStartX = -overlayRect.width / 2;
		else if (pos.overlayX === "start") overlayStartX = this._isRtl() ? -overlayRect.width : 0;
		else overlayStartX = this._isRtl() ? 0 : -overlayRect.width;
		let overlayStartY;
		if (pos.overlayY == "center") overlayStartY = -overlayRect.height / 2;
		else overlayStartY = pos.overlayY == "top" ? 0 : -overlayRect.height;
		return {
			x: originPoint.x + overlayStartX,
			y: originPoint.y + overlayStartY
		};
	}
	_getOverlayFit(point, rawOverlayRect, viewport, position) {
		const overlay = getRoundedBoundingClientRect(rawOverlayRect);
		let { x, y } = point;
		let offsetX = this._getOffset(position, "x");
		let offsetY = this._getOffset(position, "y");
		if (offsetX) x += offsetX;
		if (offsetY) y += offsetY;
		let leftOverflow = 0 - x;
		let rightOverflow = x + overlay.width - viewport.width;
		let topOverflow = 0 - y;
		let bottomOverflow = y + overlay.height - viewport.height;
		let visibleWidth = this._subtractOverflows(overlay.width, leftOverflow, rightOverflow);
		let visibleHeight = this._subtractOverflows(overlay.height, topOverflow, bottomOverflow);
		let visibleArea = visibleWidth * visibleHeight;
		return {
			visibleArea,
			isCompletelyWithinViewport: overlay.width * overlay.height === visibleArea,
			fitsInViewportVertically: visibleHeight === overlay.height,
			fitsInViewportHorizontally: visibleWidth == overlay.width
		};
	}
	_canFitWithFlexibleDimensions(fit, point, viewport) {
		if (this._hasFlexibleDimensions) {
			const availableHeight = viewport.bottom - point.y;
			const availableWidth = viewport.right - point.x;
			const minHeight = getPixelValue(this._overlayRef.getConfig().minHeight);
			const minWidth = getPixelValue(this._overlayRef.getConfig().minWidth);
			const verticalFit = fit.fitsInViewportVertically || minHeight != null && minHeight <= availableHeight;
			const horizontalFit = fit.fitsInViewportHorizontally || minWidth != null && minWidth <= availableWidth;
			return verticalFit && horizontalFit;
		}
		return false;
	}
	_pushOverlayOnScreen(start, rawOverlayRect, scrollPosition) {
		if (this._previousPushAmount && this._positionLocked) return {
			x: start.x + this._previousPushAmount.x,
			y: start.y + this._previousPushAmount.y
		};
		const overlay = getRoundedBoundingClientRect(rawOverlayRect);
		const viewport = this._viewportRect;
		const overflowRight = Math.max(start.x + overlay.width - viewport.width, 0);
		const overflowBottom = Math.max(start.y + overlay.height - viewport.height, 0);
		const overflowTop = Math.max(viewport.top - scrollPosition.top - start.y, 0);
		const overflowLeft = Math.max(viewport.left - scrollPosition.left - start.x, 0);
		let pushX = 0;
		let pushY = 0;
		if (overlay.width <= viewport.width) pushX = overflowLeft || -overflowRight;
		else pushX = start.x < this._getViewportMarginStart() ? viewport.left - scrollPosition.left - start.x : 0;
		if (overlay.height <= viewport.height) pushY = overflowTop || -overflowBottom;
		else pushY = start.y < this._getViewportMarginTop() ? viewport.top - scrollPosition.top - start.y : 0;
		this._previousPushAmount = {
			x: pushX,
			y: pushY
		};
		return {
			x: start.x + pushX,
			y: start.y + pushY
		};
	}
	_applyPosition(position, originPoint) {
		this._setTransformOrigin(position);
		this._setOverlayElementStyles(originPoint, position);
		this._setBoundingBoxStyles(originPoint, position);
		if (position.panelClass) this._addPanelClasses(position.panelClass);
		if (this._positionChanges.observers.length) {
			const scrollVisibility = this._getScrollVisibility();
			if (position !== this._lastPosition || !this._lastScrollVisibility || !compareScrollVisibility(this._lastScrollVisibility, scrollVisibility)) {
				const changeEvent = new ConnectedOverlayPositionChange(position, scrollVisibility);
				this._positionChanges.next(changeEvent);
			}
			this._lastScrollVisibility = scrollVisibility;
		}
		this._lastPosition = position;
		this._isInitialRender = false;
	}
	_setTransformOrigin(position) {
		if (!this._transformOriginSelector) return;
		const elements = this._boundingBox.querySelectorAll(this._transformOriginSelector);
		let xOrigin;
		let yOrigin = position.overlayY;
		if (position.overlayX === "center") xOrigin = "center";
		else if (this._isRtl()) xOrigin = position.overlayX === "start" ? "right" : "left";
		else xOrigin = position.overlayX === "start" ? "left" : "right";
		for (let i = 0; i < elements.length; i++) elements[i].style.transformOrigin = `${xOrigin} ${yOrigin}`;
	}
	_calculateBoundingBoxRect(origin, position) {
		const viewport = this._viewportRect;
		const isRtl = this._isRtl();
		let height, top, bottom;
		if (position.overlayY === "top") {
			top = origin.y;
			height = viewport.height - top + this._getViewportMarginBottom();
		} else if (position.overlayY === "bottom") {
			bottom = viewport.height - origin.y + this._getViewportMarginTop() + this._getViewportMarginBottom();
			height = viewport.height - bottom + this._getViewportMarginTop();
		} else {
			const smallestDistanceToViewportEdge = Math.min(viewport.bottom - origin.y + viewport.top, origin.y);
			const previousHeight = this._lastBoundingBoxSize.height;
			height = smallestDistanceToViewportEdge * 2;
			top = origin.y - smallestDistanceToViewportEdge;
			if (height > previousHeight && !this._isInitialRender && !this._growAfterOpen) top = origin.y - previousHeight / 2;
		}
		const isBoundedByRightViewportEdge = position.overlayX === "start" && !isRtl || position.overlayX === "end" && isRtl;
		const isBoundedByLeftViewportEdge = position.overlayX === "end" && !isRtl || position.overlayX === "start" && isRtl;
		let width, left, right;
		if (isBoundedByLeftViewportEdge) {
			right = viewport.width - origin.x + this._getViewportMarginStart() + this._getViewportMarginEnd();
			width = origin.x - this._getViewportMarginStart();
		} else if (isBoundedByRightViewportEdge) {
			left = origin.x;
			width = viewport.right - origin.x - this._getViewportMarginEnd();
		} else {
			const smallestDistanceToViewportEdge = Math.min(viewport.right - origin.x + viewport.left, origin.x);
			const previousWidth = this._lastBoundingBoxSize.width;
			width = smallestDistanceToViewportEdge * 2;
			left = origin.x - smallestDistanceToViewportEdge;
			if (width > previousWidth && !this._isInitialRender && !this._growAfterOpen) left = origin.x - previousWidth / 2;
		}
		return {
			top,
			left,
			bottom,
			right,
			width,
			height
		};
	}
	_setBoundingBoxStyles(origin, position) {
		const boundingBoxRect = this._calculateBoundingBoxRect(origin, position);
		if (!this._isInitialRender && !this._growAfterOpen) {
			boundingBoxRect.height = Math.min(boundingBoxRect.height, this._lastBoundingBoxSize.height);
			boundingBoxRect.width = Math.min(boundingBoxRect.width, this._lastBoundingBoxSize.width);
		}
		const styles = {};
		if (this._hasExactPosition()) {
			styles.top = styles.left = "0";
			styles.bottom = styles.right = "auto";
			styles.maxHeight = styles.maxWidth = "";
			styles.width = styles.height = "100%";
		} else {
			const maxHeight = this._overlayRef.getConfig().maxHeight;
			const maxWidth = this._overlayRef.getConfig().maxWidth;
			styles.width = coerceCssPixelValue(boundingBoxRect.width);
			styles.height = coerceCssPixelValue(boundingBoxRect.height);
			styles.top = coerceCssPixelValue(boundingBoxRect.top) || "auto";
			styles.bottom = coerceCssPixelValue(boundingBoxRect.bottom) || "auto";
			styles.left = coerceCssPixelValue(boundingBoxRect.left) || "auto";
			styles.right = coerceCssPixelValue(boundingBoxRect.right) || "auto";
			if (position.overlayX === "center") styles.alignItems = "center";
			else styles.alignItems = position.overlayX === "end" ? "flex-end" : "flex-start";
			if (position.overlayY === "center") styles.justifyContent = "center";
			else styles.justifyContent = position.overlayY === "bottom" ? "flex-end" : "flex-start";
			if (maxHeight) styles.maxHeight = coerceCssPixelValue(maxHeight);
			if (maxWidth) styles.maxWidth = coerceCssPixelValue(maxWidth);
		}
		this._lastBoundingBoxSize = boundingBoxRect;
		extendStyles(this._boundingBox.style, styles);
	}
	_resetBoundingBoxStyles() {
		extendStyles(this._boundingBox.style, {
			top: "0",
			left: "0",
			right: "0",
			bottom: "0",
			height: "",
			width: "",
			alignItems: "",
			justifyContent: ""
		});
	}
	_resetOverlayElementStyles() {
		extendStyles(this._pane.style, {
			top: "",
			left: "",
			bottom: "",
			right: "",
			position: "",
			transform: ""
		});
	}
	_setOverlayElementStyles(originPoint, position) {
		const styles = {};
		const hasExactPosition = this._hasExactPosition();
		const hasFlexibleDimensions = this._hasFlexibleDimensions;
		const config = this._overlayRef.getConfig();
		if (hasExactPosition) {
			const scrollPosition = this._viewportRuler.getViewportScrollPosition();
			extendStyles(styles, this._getExactOverlayY(position, originPoint, scrollPosition));
			extendStyles(styles, this._getExactOverlayX(position, originPoint, scrollPosition));
		} else styles.position = "static";
		let transformString = "";
		let offsetX = this._getOffset(position, "x");
		let offsetY = this._getOffset(position, "y");
		if (offsetX) transformString += `translateX(${offsetX}px) `;
		if (offsetY) transformString += `translateY(${offsetY}px)`;
		styles.transform = transformString.trim();
		if (config.maxHeight) {
			if (hasExactPosition) styles.maxHeight = coerceCssPixelValue(config.maxHeight);
			else if (hasFlexibleDimensions) styles.maxHeight = "";
		}
		if (config.maxWidth) {
			if (hasExactPosition) styles.maxWidth = coerceCssPixelValue(config.maxWidth);
			else if (hasFlexibleDimensions) styles.maxWidth = "";
		}
		extendStyles(this._pane.style, styles);
	}
	_getExactOverlayY(position, originPoint, scrollPosition) {
		let styles = {
			top: "",
			bottom: ""
		};
		let overlayPoint = this._getOverlayPoint(originPoint, this._overlayRect, position);
		if (this._isPushed) overlayPoint = this._pushOverlayOnScreen(overlayPoint, this._overlayRect, scrollPosition);
		if (position.overlayY === "bottom") styles.bottom = `${this._document.documentElement.clientHeight - (overlayPoint.y + this._overlayRect.height)}px`;
		else styles.top = coerceCssPixelValue(overlayPoint.y);
		return styles;
	}
	_getExactOverlayX(position, originPoint, scrollPosition) {
		let styles = {
			left: "",
			right: ""
		};
		let overlayPoint = this._getOverlayPoint(originPoint, this._overlayRect, position);
		if (this._isPushed) overlayPoint = this._pushOverlayOnScreen(overlayPoint, this._overlayRect, scrollPosition);
		let horizontalStyleProperty;
		if (this._isRtl()) horizontalStyleProperty = position.overlayX === "end" ? "left" : "right";
		else horizontalStyleProperty = position.overlayX === "end" ? "right" : "left";
		if (horizontalStyleProperty === "right") styles.right = `${this._document.documentElement.clientWidth - (overlayPoint.x + this._overlayRect.width)}px`;
		else styles.left = coerceCssPixelValue(overlayPoint.x);
		return styles;
	}
	_getScrollVisibility() {
		const originBounds = this._getOriginRect();
		const overlayBounds = this._pane.getBoundingClientRect();
		const scrollContainerBounds = this._scrollables.map((scrollable) => {
			return scrollable.getElementRef().nativeElement.getBoundingClientRect();
		});
		return {
			isOriginClipped: isElementClippedByScrolling(originBounds, scrollContainerBounds),
			isOriginOutsideView: isElementScrolledOutsideView(originBounds, scrollContainerBounds),
			isOverlayClipped: isElementClippedByScrolling(overlayBounds, scrollContainerBounds),
			isOverlayOutsideView: isElementScrolledOutsideView(overlayBounds, scrollContainerBounds)
		};
	}
	_subtractOverflows(length, ...overflows) {
		return overflows.reduce((currentValue, currentOverflow) => {
			return currentValue - Math.max(currentOverflow, 0);
		}, length);
	}
	_getNarrowedViewportRect() {
		const width = this._document.documentElement.clientWidth;
		const height = this._document.documentElement.clientHeight;
		const scrollPosition = this._viewportRuler.getViewportScrollPosition();
		return {
			top: scrollPosition.top + this._getViewportMarginTop(),
			left: scrollPosition.left + this._getViewportMarginStart(),
			right: scrollPosition.left + width - this._getViewportMarginEnd(),
			bottom: scrollPosition.top + height - this._getViewportMarginBottom(),
			width: width - this._getViewportMarginStart() - this._getViewportMarginEnd(),
			height: height - this._getViewportMarginTop() - this._getViewportMarginBottom()
		};
	}
	_isRtl() {
		return this._overlayRef.getDirection() === "rtl";
	}
	_hasExactPosition() {
		return !this._hasFlexibleDimensions || this._isPushed;
	}
	_getOffset(position, axis) {
		if (axis === "x") return position.offsetX == null ? this._offsetX : position.offsetX;
		return position.offsetY == null ? this._offsetY : position.offsetY;
	}
	_validatePositions() {
		if (typeof ngDevMode === "undefined" || ngDevMode) {
			if (!this._preferredPositions.length) throw Error("FlexibleConnectedPositionStrategy: At least one position is required.");
			this._preferredPositions.forEach((pair) => {
				validateHorizontalPosition("originX", pair.originX);
				validateVerticalPosition("originY", pair.originY);
				validateHorizontalPosition("overlayX", pair.overlayX);
				validateVerticalPosition("overlayY", pair.overlayY);
			});
		}
	}
	_addPanelClasses(cssClasses) {
		if (this._pane) coerceArray(cssClasses).forEach((cssClass) => {
			if (cssClass !== "" && this._appliedPanelClasses.indexOf(cssClass) === -1) {
				this._appliedPanelClasses.push(cssClass);
				this._pane.classList.add(cssClass);
			}
		});
	}
	_clearPanelClasses() {
		if (this._pane) {
			this._appliedPanelClasses.forEach((cssClass) => {
				this._pane.classList.remove(cssClass);
			});
			this._appliedPanelClasses = [];
		}
	}
	_getViewportMarginStart() {
		if (typeof this._viewportMargin === "number") return this._viewportMargin;
		return this._viewportMargin?.start ?? 0;
	}
	_getViewportMarginEnd() {
		if (typeof this._viewportMargin === "number") return this._viewportMargin;
		return this._viewportMargin?.end ?? 0;
	}
	_getViewportMarginTop() {
		if (typeof this._viewportMargin === "number") return this._viewportMargin;
		return this._viewportMargin?.top ?? 0;
	}
	_getViewportMarginBottom() {
		if (typeof this._viewportMargin === "number") return this._viewportMargin;
		return this._viewportMargin?.bottom ?? 0;
	}
	_getOriginRect() {
		const origin = this._origin;
		if (origin instanceof ElementRef) return origin.nativeElement.getBoundingClientRect();
		if (origin instanceof Element) return origin.getBoundingClientRect();
		const width = origin.width || 0;
		const height = origin.height || 0;
		return {
			top: origin.y,
			bottom: origin.y + height,
			left: origin.x,
			right: origin.x + width,
			height,
			width
		};
	}
	_getContainerRect() {
		const isInlinePopover = this._overlayRef.getConfig().usePopover && this._popoverLocation !== "global";
		const element = this._overlayContainer.getContainerElement();
		if (isInlinePopover) element.style.display = "block";
		const dimensions = element.getBoundingClientRect();
		if (isInlinePopover) element.style.display = "";
		return dimensions;
	}
};
function extendStyles(destination, source) {
	for (let key in source) if (Object.hasOwn(source, key)) destination[key] = source[key];
	return destination;
}
function getPixelValue(input) {
	if (typeof input !== "number" && input != null) {
		const [value, units] = input.split(cssUnitPattern);
		return !units || units === "px" ? parseFloat(value) : null;
	}
	return input || null;
}
function getRoundedBoundingClientRect(clientRect) {
	return {
		top: Math.floor(clientRect.top),
		right: Math.floor(clientRect.right),
		bottom: Math.floor(clientRect.bottom),
		left: Math.floor(clientRect.left),
		width: Math.floor(clientRect.width),
		height: Math.floor(clientRect.height)
	};
}
function compareScrollVisibility(a, b) {
	if (a === b) return true;
	return a.isOriginClipped === b.isOriginClipped && a.isOriginOutsideView === b.isOriginOutsideView && a.isOverlayClipped === b.isOverlayClipped && a.isOverlayOutsideView === b.isOverlayOutsideView;
}
var wrapperClass = "cdk-global-overlay-wrapper";
function createGlobalPositionStrategy(_injector) {
	return new GlobalPositionStrategy();
}
var GlobalPositionStrategy = class {
	_overlayRef;
	_cssPosition = "static";
	_topOffset = "";
	_bottomOffset = "";
	_alignItems = "";
	_xPosition = "";
	_xOffset = "";
	_width = "";
	_height = "";
	_isDisposed = false;
	attach(overlayRef) {
		const config = overlayRef.getConfig();
		this._overlayRef = overlayRef;
		if (this._width && !config.width) overlayRef.updateSize({ width: this._width });
		if (this._height && !config.height) overlayRef.updateSize({ height: this._height });
		overlayRef.hostElement.classList.add(wrapperClass);
		this._isDisposed = false;
	}
	top(value = "") {
		this._bottomOffset = "";
		this._topOffset = value;
		this._alignItems = "flex-start";
		return this;
	}
	left(value = "") {
		this._xOffset = value;
		this._xPosition = "left";
		return this;
	}
	bottom(value = "") {
		this._topOffset = "";
		this._bottomOffset = value;
		this._alignItems = "flex-end";
		return this;
	}
	right(value = "") {
		this._xOffset = value;
		this._xPosition = "right";
		return this;
	}
	start(value = "") {
		this._xOffset = value;
		this._xPosition = "start";
		return this;
	}
	end(value = "") {
		this._xOffset = value;
		this._xPosition = "end";
		return this;
	}
	width(value = "") {
		if (this._overlayRef) this._overlayRef.updateSize({ width: value });
		else this._width = value;
		return this;
	}
	height(value = "") {
		if (this._overlayRef) this._overlayRef.updateSize({ height: value });
		else this._height = value;
		return this;
	}
	centerHorizontally(offset = "") {
		this.left(offset);
		this._xPosition = "center";
		return this;
	}
	centerVertically(offset = "") {
		this.top(offset);
		this._alignItems = "center";
		return this;
	}
	apply() {
		if (!this._overlayRef || !this._overlayRef.hasAttached()) return;
		const styles = this._overlayRef.overlayElement.style;
		const parentStyles = this._overlayRef.hostElement.style;
		const { width, height, maxWidth, maxHeight } = this._overlayRef.getConfig();
		const shouldBeFlushHorizontally = (width === "100%" || width === "100vw") && (!maxWidth || maxWidth === "100%" || maxWidth === "100vw");
		const shouldBeFlushVertically = (height === "100%" || height === "100vh") && (!maxHeight || maxHeight === "100%" || maxHeight === "100vh");
		const xPosition = this._xPosition;
		const xOffset = this._xOffset;
		const isRtl = this._overlayRef.getConfig().direction === "rtl";
		let marginLeft = "";
		let marginRight = "";
		let justifyContent = "";
		if (shouldBeFlushHorizontally) justifyContent = "flex-start";
		else if (xPosition === "center") {
			justifyContent = "center";
			if (isRtl) marginRight = xOffset;
			else marginLeft = xOffset;
		} else if (isRtl) {
			if (xPosition === "left" || xPosition === "end") {
				justifyContent = "flex-end";
				marginLeft = xOffset;
			} else if (xPosition === "right" || xPosition === "start") {
				justifyContent = "flex-start";
				marginRight = xOffset;
			}
		} else if (xPosition === "left" || xPosition === "start") {
			justifyContent = "flex-start";
			marginLeft = xOffset;
		} else if (xPosition === "right" || xPosition === "end") {
			justifyContent = "flex-end";
			marginRight = xOffset;
		}
		styles.position = this._cssPosition;
		styles.marginLeft = shouldBeFlushHorizontally ? "0" : marginLeft;
		styles.marginTop = shouldBeFlushVertically ? "0" : this._topOffset;
		styles.marginBottom = this._bottomOffset;
		styles.marginRight = shouldBeFlushHorizontally ? "0" : marginRight;
		parentStyles.justifyContent = justifyContent;
		parentStyles.alignItems = shouldBeFlushVertically ? "flex-start" : this._alignItems;
	}
	dispose() {
		if (this._isDisposed || !this._overlayRef) return;
		const styles = this._overlayRef.overlayElement.style;
		const parent = this._overlayRef.hostElement;
		const parentStyles = parent.style;
		parent.classList.remove(wrapperClass);
		parentStyles.justifyContent = parentStyles.alignItems = styles.marginTop = styles.marginBottom = styles.marginLeft = styles.marginRight = styles.position = "";
		this._overlayRef = null;
		this._isDisposed = true;
	}
};
var OverlayPositionBuilder = class OverlayPositionBuilder {
	_injector = inject(Injector);
	global() {
		return createGlobalPositionStrategy();
	}
	flexibleConnectedTo(origin) {
		return createFlexibleConnectedPositionStrategy(this._injector, origin);
	}
	static ɵfac = function OverlayPositionBuilder_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || OverlayPositionBuilder)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: OverlayPositionBuilder,
		factory: OverlayPositionBuilder.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayPositionBuilder, [{ type: Service }], null, null);
})();
var OVERLAY_DEFAULT_CONFIG = new InjectionToken("OVERLAY_DEFAULT_CONFIG");
function createOverlayRef(injector, config) {
	injector.get(_CdkPrivateStyleLoader).load(_CdkOverlayStyleLoader);
	const overlayContainer = injector.get(OverlayContainer);
	const doc = injector.get(DOCUMENT);
	const idGenerator = injector.get(_IdGenerator);
	const appRef = injector.get(ApplicationRef);
	const directionality = injector.get(Directionality);
	const renderer = injector.get(Renderer2, null, { optional: true }) || injector.get(RendererFactory2).createRenderer(null, null);
	const overlayConfig = new OverlayConfig(config);
	const defaultUsePopover = injector.get(OVERLAY_DEFAULT_CONFIG, null, { optional: true })?.usePopover ?? true;
	overlayConfig.direction = overlayConfig.direction || directionality.value;
	if (!doc.body || !("showPopover" in doc.body)) overlayConfig.usePopover = false;
	else overlayConfig.usePopover = config?.usePopover ?? defaultUsePopover;
	const pane = doc.createElement("div");
	const host = doc.createElement("div");
	pane.id = idGenerator.getId("cdk-overlay-");
	pane.classList.add("cdk-overlay-pane");
	host.appendChild(pane);
	if (overlayConfig.usePopover) {
		host.setAttribute("popover", "manual");
		host.classList.add("cdk-overlay-popover");
	}
	const customInsertionPoint = overlayConfig.usePopover ? overlayConfig.positionStrategy?.getPopoverInsertionPoint?.() : null;
	if (isElement(customInsertionPoint)) customInsertionPoint.after(host);
	else if (customInsertionPoint?.type === "parent") customInsertionPoint.element.appendChild(host);
	else overlayContainer.getContainerElement().appendChild(host);
	return new OverlayRef(new DomPortalOutlet(pane, appRef, injector), host, pane, overlayConfig, injector.get(NgZone), injector.get(OverlayKeyboardDispatcher), doc, injector.get(Location), injector.get(OverlayOutsideClickDispatcher), config?.disableAnimations ?? injector.get(ANIMATION_MODULE_TYPE, null, { optional: true }) === "NoopAnimations", injector.get(EnvironmentInjector), renderer);
}
var Overlay = class Overlay {
	scrollStrategies = inject(ScrollStrategyOptions);
	_positionBuilder = inject(OverlayPositionBuilder);
	_injector = inject(Injector);
	create(config) {
		return createOverlayRef(this._injector, config);
	}
	position() {
		return this._positionBuilder;
	}
	static ɵfac = function Overlay_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || Overlay)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: Overlay,
		factory: Overlay.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Overlay, [{ type: Service }], null, null);
})();
var defaultPositionList = [
	{
		originX: "start",
		originY: "bottom",
		overlayX: "start",
		overlayY: "top"
	},
	{
		originX: "start",
		originY: "top",
		overlayX: "start",
		overlayY: "bottom"
	},
	{
		originX: "end",
		originY: "top",
		overlayX: "end",
		overlayY: "bottom"
	},
	{
		originX: "end",
		originY: "bottom",
		overlayX: "end",
		overlayY: "top"
	}
];
var CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY = new InjectionToken("cdk-connected-overlay-scroll-strategy", {
	providedIn: "root",
	factory: () => {
		const injector = inject(Injector);
		return () => createRepositionScrollStrategy(injector);
	}
});
var CdkOverlayOrigin = class CdkOverlayOrigin {
	elementRef = inject(ElementRef);
	static ɵfac = function CdkOverlayOrigin_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || CdkOverlayOrigin)();
	};
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: CdkOverlayOrigin,
		selectors: [
			[
				"",
				"cdk-overlay-origin",
				""
			],
			[
				"",
				"overlay-origin",
				""
			],
			[
				"",
				"cdkOverlayOrigin",
				""
			]
		],
		exportAs: ["cdkOverlayOrigin"]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkOverlayOrigin, [{
		type: Directive,
		args: [{
			selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]",
			exportAs: "cdkOverlayOrigin"
		}]
	}], null, null);
})();
var CDK_CONNECTED_OVERLAY_DEFAULT_CONFIG = new InjectionToken("cdk-connected-overlay-default-config");
var CdkConnectedOverlay = class CdkConnectedOverlay {
	_dir = inject(Directionality, { optional: true });
	_injector = inject(Injector);
	_overlayRef;
	_templatePortal;
	_backdropSubscription = Subscription.EMPTY;
	_attachSubscription = Subscription.EMPTY;
	_detachSubscription = Subscription.EMPTY;
	_positionSubscription = Subscription.EMPTY;
	_offsetX;
	_offsetY;
	_position;
	_scrollStrategyFactory = inject(CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY);
	_ngZone = inject(NgZone);
	origin;
	positions;
	positionStrategy;
	get offsetX() {
		return this._offsetX;
	}
	set offsetX(offsetX) {
		this._offsetX = offsetX;
		if (this._position) this._updatePositionStrategy(this._position);
	}
	get offsetY() {
		return this._offsetY;
	}
	set offsetY(offsetY) {
		this._offsetY = offsetY;
		if (this._position) this._updatePositionStrategy(this._position);
	}
	width;
	height;
	minWidth;
	minHeight;
	backdropClass;
	panelClass;
	viewportMargin = 0;
	scrollStrategy;
	open = false;
	disableClose = false;
	transformOriginSelector;
	hasBackdrop = false;
	lockPosition = false;
	flexibleDimensions = false;
	growAfterOpen = false;
	push = false;
	disposeOnNavigation = false;
	usePopover;
	matchWidth = false;
	set _config(value) {
		if (typeof value !== "string") this._assignConfig(value);
	}
	backdropClick = new EventEmitter();
	positionChange = new EventEmitter();
	attach = new EventEmitter();
	detach = new EventEmitter();
	overlayKeydown = new EventEmitter();
	overlayOutsideClick = new EventEmitter();
	constructor() {
		const templateRef = inject(TemplateRef);
		const viewContainerRef = inject(ViewContainerRef);
		const defaultConfig = inject(CDK_CONNECTED_OVERLAY_DEFAULT_CONFIG, { optional: true });
		const globalConfig = inject(OVERLAY_DEFAULT_CONFIG, { optional: true });
		this.usePopover = globalConfig?.usePopover === false ? null : "global";
		this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
		this.scrollStrategy = this._scrollStrategyFactory();
		if (defaultConfig) this._assignConfig(defaultConfig);
	}
	get overlayRef() {
		return this._overlayRef;
	}
	get dir() {
		return this._dir ? this._dir.value : "ltr";
	}
	ngOnDestroy() {
		this._attachSubscription.unsubscribe();
		this._detachSubscription.unsubscribe();
		this._backdropSubscription.unsubscribe();
		this._positionSubscription.unsubscribe();
		this._overlayRef?.dispose();
	}
	ngOnChanges(changes) {
		if (this._position) {
			this._updatePositionStrategy(this._position);
			this._overlayRef?.updateSize({
				width: this._getWidth(),
				minWidth: this.minWidth,
				height: this.height,
				minHeight: this.minHeight
			});
			if (changes["origin"] && this.open) this._position.apply();
		}
		if (changes["open"]) this.open ? this.attachOverlay() : this.detachOverlay();
	}
	_createOverlay() {
		if (!this.positions || !this.positions.length) this.positions = defaultPositionList;
		const overlayRef = this._overlayRef = createOverlayRef(this._injector, this._buildConfig());
		this._attachSubscription = overlayRef.attachments().subscribe(() => this.attach.emit());
		this._detachSubscription = overlayRef.detachments().subscribe(() => this.detach.emit());
		overlayRef.keydownEvents().subscribe((event) => {
			this.overlayKeydown.next(event);
			if (event.keyCode === 27 && !this.disableClose && !hasModifierKey(event)) {
				event.preventDefault();
				this.detachOverlay();
			}
		});
		this._overlayRef.outsidePointerEvents().subscribe((event) => {
			const origin = this._getOriginElement();
			const target = _getEventTarget(event);
			if (!origin || origin !== target && !origin.contains(target)) this.overlayOutsideClick.next(event);
		});
	}
	_buildConfig() {
		const positionStrategy = this._position = this.positionStrategy || this._createPositionStrategy();
		const overlayConfig = new OverlayConfig({
			direction: this._dir || "ltr",
			positionStrategy,
			scrollStrategy: this.scrollStrategy,
			hasBackdrop: this.hasBackdrop,
			disposeOnNavigation: this.disposeOnNavigation,
			usePopover: !!this.usePopover
		});
		if (this.height || this.height === 0) overlayConfig.height = this.height;
		if (this.minWidth || this.minWidth === 0) overlayConfig.minWidth = this.minWidth;
		if (this.minHeight || this.minHeight === 0) overlayConfig.minHeight = this.minHeight;
		if (this.backdropClass) overlayConfig.backdropClass = this.backdropClass;
		if (this.panelClass) overlayConfig.panelClass = this.panelClass;
		return overlayConfig;
	}
	_updatePositionStrategy(positionStrategy) {
		const positions = this.positions.map((currentPosition) => ({
			originX: currentPosition.originX,
			originY: currentPosition.originY,
			overlayX: currentPosition.overlayX,
			overlayY: currentPosition.overlayY,
			offsetX: currentPosition.offsetX || this.offsetX,
			offsetY: currentPosition.offsetY || this.offsetY,
			panelClass: currentPosition.panelClass || void 0
		}));
		return positionStrategy.setOrigin(this._getOrigin()).withPositions(positions).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector).withPopoverLocation(this.usePopover === null ? "global" : this.usePopover);
	}
	_createPositionStrategy() {
		const strategy = createFlexibleConnectedPositionStrategy(this._injector, this._getOrigin());
		this._updatePositionStrategy(strategy);
		return strategy;
	}
	_getOrigin() {
		if (this.origin instanceof CdkOverlayOrigin) return this.origin.elementRef;
		else return this.origin;
	}
	_getOriginElement() {
		if (this.origin instanceof CdkOverlayOrigin) return this.origin.elementRef.nativeElement;
		if (this.origin instanceof ElementRef) return this.origin.nativeElement;
		if (typeof Element !== "undefined" && this.origin instanceof Element) return this.origin;
		return null;
	}
	_getWidth() {
		if (this.width) return this.width;
		return this.matchWidth ? this._getOriginElement()?.getBoundingClientRect?.().width : void 0;
	}
	attachOverlay() {
		if (!this._overlayRef) this._createOverlay();
		const ref = this._overlayRef;
		ref.getConfig().hasBackdrop = this.hasBackdrop;
		ref.updateSize({ width: this._getWidth() });
		if (!ref.hasAttached()) ref.attach(this._templatePortal);
		if (this.hasBackdrop) this._backdropSubscription = ref.backdropClick().subscribe((event) => this.backdropClick.emit(event));
		else this._backdropSubscription.unsubscribe();
		this._positionSubscription.unsubscribe();
		if (this.positionChange.observers.length > 0) this._positionSubscription = this._position.positionChanges.pipe(takeWhile(() => this.positionChange.observers.length > 0)).subscribe((position) => {
			this._ngZone.run(() => this.positionChange.emit(position));
			if (this.positionChange.observers.length === 0) this._positionSubscription.unsubscribe();
		});
		this.open = true;
	}
	detachOverlay() {
		this._overlayRef?.detach();
		this._backdropSubscription.unsubscribe();
		this._positionSubscription.unsubscribe();
		this.open = false;
	}
	_assignConfig(config) {
		this.origin = config.origin ?? this.origin;
		this.positions = config.positions ?? this.positions;
		this.positionStrategy = config.positionStrategy ?? this.positionStrategy;
		this.offsetX = config.offsetX ?? this.offsetX;
		this.offsetY = config.offsetY ?? this.offsetY;
		this.width = config.width ?? this.width;
		this.height = config.height ?? this.height;
		this.minWidth = config.minWidth ?? this.minWidth;
		this.minHeight = config.minHeight ?? this.minHeight;
		this.backdropClass = config.backdropClass ?? this.backdropClass;
		this.panelClass = config.panelClass ?? this.panelClass;
		this.viewportMargin = config.viewportMargin ?? this.viewportMargin;
		this.scrollStrategy = config.scrollStrategy ?? this.scrollStrategy;
		this.disableClose = config.disableClose ?? this.disableClose;
		this.transformOriginSelector = config.transformOriginSelector ?? this.transformOriginSelector;
		this.hasBackdrop = config.hasBackdrop ?? this.hasBackdrop;
		this.lockPosition = config.lockPosition ?? this.lockPosition;
		this.flexibleDimensions = config.flexibleDimensions ?? this.flexibleDimensions;
		this.growAfterOpen = config.growAfterOpen ?? this.growAfterOpen;
		this.push = config.push ?? this.push;
		this.disposeOnNavigation = config.disposeOnNavigation ?? this.disposeOnNavigation;
		this.usePopover = config.usePopover ?? this.usePopover;
		this.matchWidth = config.matchWidth ?? this.matchWidth;
	}
	static ɵfac = function CdkConnectedOverlay_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || CdkConnectedOverlay)();
	};
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: CdkConnectedOverlay,
		selectors: [
			[
				"",
				"cdk-connected-overlay",
				""
			],
			[
				"",
				"connected-overlay",
				""
			],
			[
				"",
				"cdkConnectedOverlay",
				""
			]
		],
		inputs: {
			origin: [
				0,
				"cdkConnectedOverlayOrigin",
				"origin"
			],
			positions: [
				0,
				"cdkConnectedOverlayPositions",
				"positions"
			],
			positionStrategy: [
				0,
				"cdkConnectedOverlayPositionStrategy",
				"positionStrategy"
			],
			offsetX: [
				0,
				"cdkConnectedOverlayOffsetX",
				"offsetX"
			],
			offsetY: [
				0,
				"cdkConnectedOverlayOffsetY",
				"offsetY"
			],
			width: [
				0,
				"cdkConnectedOverlayWidth",
				"width"
			],
			height: [
				0,
				"cdkConnectedOverlayHeight",
				"height"
			],
			minWidth: [
				0,
				"cdkConnectedOverlayMinWidth",
				"minWidth"
			],
			minHeight: [
				0,
				"cdkConnectedOverlayMinHeight",
				"minHeight"
			],
			backdropClass: [
				0,
				"cdkConnectedOverlayBackdropClass",
				"backdropClass"
			],
			panelClass: [
				0,
				"cdkConnectedOverlayPanelClass",
				"panelClass"
			],
			viewportMargin: [
				0,
				"cdkConnectedOverlayViewportMargin",
				"viewportMargin"
			],
			scrollStrategy: [
				0,
				"cdkConnectedOverlayScrollStrategy",
				"scrollStrategy"
			],
			open: [
				0,
				"cdkConnectedOverlayOpen",
				"open"
			],
			disableClose: [
				0,
				"cdkConnectedOverlayDisableClose",
				"disableClose"
			],
			transformOriginSelector: [
				0,
				"cdkConnectedOverlayTransformOriginOn",
				"transformOriginSelector"
			],
			hasBackdrop: [
				2,
				"cdkConnectedOverlayHasBackdrop",
				"hasBackdrop",
				booleanAttribute
			],
			lockPosition: [
				2,
				"cdkConnectedOverlayLockPosition",
				"lockPosition",
				booleanAttribute
			],
			flexibleDimensions: [
				2,
				"cdkConnectedOverlayFlexibleDimensions",
				"flexibleDimensions",
				booleanAttribute
			],
			growAfterOpen: [
				2,
				"cdkConnectedOverlayGrowAfterOpen",
				"growAfterOpen",
				booleanAttribute
			],
			push: [
				2,
				"cdkConnectedOverlayPush",
				"push",
				booleanAttribute
			],
			disposeOnNavigation: [
				2,
				"cdkConnectedOverlayDisposeOnNavigation",
				"disposeOnNavigation",
				(value) => value === "url-change" || value === "pop-state" ? value : booleanAttribute(value)
			],
			usePopover: [
				0,
				"cdkConnectedOverlayUsePopover",
				"usePopover"
			],
			matchWidth: [
				2,
				"cdkConnectedOverlayMatchWidth",
				"matchWidth",
				booleanAttribute
			],
			_config: [
				0,
				"cdkConnectedOverlay",
				"_config"
			]
		},
		outputs: {
			backdropClick: "backdropClick",
			positionChange: "positionChange",
			attach: "attach",
			detach: "detach",
			overlayKeydown: "overlayKeydown",
			overlayOutsideClick: "overlayOutsideClick"
		},
		exportAs: ["cdkConnectedOverlay"],
		features: [ɵɵNgOnChangesFeature]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkConnectedOverlay, [{
		type: Directive,
		args: [{
			selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]",
			exportAs: "cdkConnectedOverlay"
		}]
	}], () => [], {
		origin: [{
			type: Input,
			args: ["cdkConnectedOverlayOrigin"]
		}],
		positions: [{
			type: Input,
			args: ["cdkConnectedOverlayPositions"]
		}],
		positionStrategy: [{
			type: Input,
			args: ["cdkConnectedOverlayPositionStrategy"]
		}],
		offsetX: [{
			type: Input,
			args: ["cdkConnectedOverlayOffsetX"]
		}],
		offsetY: [{
			type: Input,
			args: ["cdkConnectedOverlayOffsetY"]
		}],
		width: [{
			type: Input,
			args: ["cdkConnectedOverlayWidth"]
		}],
		height: [{
			type: Input,
			args: ["cdkConnectedOverlayHeight"]
		}],
		minWidth: [{
			type: Input,
			args: ["cdkConnectedOverlayMinWidth"]
		}],
		minHeight: [{
			type: Input,
			args: ["cdkConnectedOverlayMinHeight"]
		}],
		backdropClass: [{
			type: Input,
			args: ["cdkConnectedOverlayBackdropClass"]
		}],
		panelClass: [{
			type: Input,
			args: ["cdkConnectedOverlayPanelClass"]
		}],
		viewportMargin: [{
			type: Input,
			args: ["cdkConnectedOverlayViewportMargin"]
		}],
		scrollStrategy: [{
			type: Input,
			args: ["cdkConnectedOverlayScrollStrategy"]
		}],
		open: [{
			type: Input,
			args: ["cdkConnectedOverlayOpen"]
		}],
		disableClose: [{
			type: Input,
			args: ["cdkConnectedOverlayDisableClose"]
		}],
		transformOriginSelector: [{
			type: Input,
			args: ["cdkConnectedOverlayTransformOriginOn"]
		}],
		hasBackdrop: [{
			type: Input,
			args: [{
				alias: "cdkConnectedOverlayHasBackdrop",
				transform: booleanAttribute
			}]
		}],
		lockPosition: [{
			type: Input,
			args: [{
				alias: "cdkConnectedOverlayLockPosition",
				transform: booleanAttribute
			}]
		}],
		flexibleDimensions: [{
			type: Input,
			args: [{
				alias: "cdkConnectedOverlayFlexibleDimensions",
				transform: booleanAttribute
			}]
		}],
		growAfterOpen: [{
			type: Input,
			args: [{
				alias: "cdkConnectedOverlayGrowAfterOpen",
				transform: booleanAttribute
			}]
		}],
		push: [{
			type: Input,
			args: [{
				alias: "cdkConnectedOverlayPush",
				transform: booleanAttribute
			}]
		}],
		disposeOnNavigation: [{
			type: Input,
			args: [{
				alias: "cdkConnectedOverlayDisposeOnNavigation",
				transform: (value) => value === "url-change" || value === "pop-state" ? value : booleanAttribute(value)
			}]
		}],
		usePopover: [{
			type: Input,
			args: [{ alias: "cdkConnectedOverlayUsePopover" }]
		}],
		matchWidth: [{
			type: Input,
			args: [{
				alias: "cdkConnectedOverlayMatchWidth",
				transform: booleanAttribute
			}]
		}],
		_config: [{
			type: Input,
			args: ["cdkConnectedOverlay"]
		}],
		backdropClick: [{ type: Output }],
		positionChange: [{ type: Output }],
		attach: [{ type: Output }],
		detach: [{ type: Output }],
		overlayKeydown: [{ type: Output }],
		overlayOutsideClick: [{ type: Output }]
	});
})();
var OverlayModule = class OverlayModule {
	static ɵfac = function OverlayModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || OverlayModule)();
	};
	static ɵmod = /*@__PURE__*/ ɵɵdefineNgModule({
		type: OverlayModule,
		imports: [
			BidiModule,
			PortalModule,
			ScrollingModule,
			CdkConnectedOverlay,
			CdkOverlayOrigin
		],
		exports: [
			CdkConnectedOverlay,
			CdkOverlayOrigin,
			ScrollingModule
		]
	});
	static ɵinj = /*@__PURE__*/ ɵɵdefineInjector({
		providers: [Overlay],
		imports: [
			BidiModule,
			PortalModule,
			ScrollingModule,
			ScrollingModule
		]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayModule, [{
		type: NgModule,
		args: [{
			imports: [
				BidiModule,
				PortalModule,
				ScrollingModule,
				CdkConnectedOverlay,
				CdkOverlayOrigin
			],
			exports: [
				CdkConnectedOverlay,
				CdkOverlayOrigin,
				ScrollingModule
			],
			providers: [Overlay]
		}]
	}], null, null);
})();
// node_modules/@angular/cdk/fesm2022/overlay.mjs
var FullscreenOverlayContainer = class FullscreenOverlayContainer extends OverlayContainer {
	_renderer = inject(RendererFactory2).createRenderer(null, null);
	_fullScreenEventName;
	_cleanupFullScreenListener;
	ngOnDestroy() {
		super.ngOnDestroy();
		this._cleanupFullScreenListener?.();
	}
	_createContainer() {
		const eventName = this._getEventName();
		super._createContainer();
		this._adjustParentForFullscreenChange();
		if (eventName) {
			this._cleanupFullScreenListener?.();
			this._cleanupFullScreenListener = this._renderer.listen("document", eventName, () => {
				this._adjustParentForFullscreenChange();
			});
		}
	}
	_adjustParentForFullscreenChange() {
		if (this._containerElement) (this.getFullscreenElement() || this._document.body).appendChild(this._containerElement);
	}
	_getEventName() {
		if (!this._fullScreenEventName) {
			const _document = this._document;
			if (_document.fullscreenEnabled) this._fullScreenEventName = "fullscreenchange";
			else if (_document.webkitFullscreenEnabled) this._fullScreenEventName = "webkitfullscreenchange";
		}
		return this._fullScreenEventName;
	}
	getFullscreenElement() {
		const _document = this._document;
		return _document.fullscreenElement || _document.webkitFullscreenElement || null;
	}
	static ɵfac = function FullscreenOverlayContainer_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || FullscreenOverlayContainer)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: FullscreenOverlayContainer,
		factory: FullscreenOverlayContainer.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FullscreenOverlayContainer, [{ type: Service }], null, null);
})();
// node_modules/@angular/cdk/fesm2022/platform.mjs
var PlatformModule = class PlatformModule {
	static ɵfac = function PlatformModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || PlatformModule)();
	};
	static ɵmod = /*@__PURE__*/ ɵɵdefineNgModule({ type: PlatformModule });
	static ɵinj = /*@__PURE__*/ ɵɵdefineInjector({});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlatformModule, [{
		type: NgModule,
		args: [{}]
	}], null, null);
})();
// node_modules/@angular/material/fesm2022/_animation-chunk.mjs
var MATERIAL_ANIMATIONS = new InjectionToken("MATERIAL_ANIMATIONS");
var reducedMotion = null;
function _getAnimationsState() {
	if (inject(MATERIAL_ANIMATIONS, { optional: true })?.animationsDisabled || inject(ANIMATION_MODULE_TYPE, { optional: true }) === "NoopAnimations") return "di-disabled";
	reducedMotion ??= inject(MediaMatcher).matchMedia("(prefers-reduced-motion)").matches;
	return reducedMotion ? "reduced-motion" : "enabled";
}
function _animationsDisabled() {
	return _getAnimationsState() !== "enabled";
}
// node_modules/@angular/material/fesm2022/_ripple-chunk.mjs
var RippleState;
(function(RippleState) {
	RippleState[RippleState["FADING_IN"] = 0] = "FADING_IN";
	RippleState[RippleState["VISIBLE"] = 1] = "VISIBLE";
	RippleState[RippleState["FADING_OUT"] = 2] = "FADING_OUT";
	RippleState[RippleState["HIDDEN"] = 3] = "HIDDEN";
})(RippleState || (RippleState = {}));
var RippleRef = class {
	_renderer;
	element;
	config;
	_animationForciblyDisabledThroughCss;
	state = RippleState.HIDDEN;
	constructor(_renderer, element, config, _animationForciblyDisabledThroughCss = false) {
		this._renderer = _renderer;
		this.element = element;
		this.config = config;
		this._animationForciblyDisabledThroughCss = _animationForciblyDisabledThroughCss;
	}
	fadeOut() {
		this._renderer.fadeOutRipple(this);
	}
};
var passiveCapturingEventOptions$1 = normalizePassiveListenerOptions({
	passive: true,
	capture: true
});
var RippleEventManager = class {
	_events = /* @__PURE__ */ new Map();
	addHandler(ngZone, name, element, handler) {
		const handlersForEvent = this._events.get(name);
		if (handlersForEvent) {
			const handlersForElement = handlersForEvent.get(element);
			if (handlersForElement) handlersForElement.add(handler);
			else handlersForEvent.set(element, /* @__PURE__ */ new Set([handler]));
		} else {
			this._events.set(name, /* @__PURE__ */ new Map([[element, /* @__PURE__ */ new Set([handler])]]));
			ngZone.runOutsideAngular(() => {
				document.addEventListener(name, this._delegateEventHandler, passiveCapturingEventOptions$1);
			});
		}
	}
	removeHandler(name, element, handler) {
		const handlersForEvent = this._events.get(name);
		if (!handlersForEvent) return;
		const handlersForElement = handlersForEvent.get(element);
		if (!handlersForElement) return;
		handlersForElement.delete(handler);
		if (handlersForElement.size === 0) handlersForEvent.delete(element);
		if (handlersForEvent.size === 0) {
			this._events.delete(name);
			document.removeEventListener(name, this._delegateEventHandler, passiveCapturingEventOptions$1);
		}
	}
	_delegateEventHandler = (event) => {
		const target = _getEventTarget(event);
		if (target) this._events.get(event.type)?.forEach((handlers, element) => {
			if (element === target || element.contains(target)) handlers.forEach((handler) => handler.handleEvent(event));
		});
	};
};
var defaultRippleAnimationConfig = {
	enterDuration: 225,
	exitDuration: 150
};
var ignoreMouseEventsTimeout = 800;
var passiveCapturingEventOptions = normalizePassiveListenerOptions({
	passive: true,
	capture: true
});
var pointerDownEvents = ["mousedown", "touchstart"];
var pointerUpEvents = [
	"mouseup",
	"mouseleave",
	"touchend",
	"touchcancel"
];
var _MatRippleStylesLoader = class _MatRippleStylesLoader {
	static ɵfac = function _MatRippleStylesLoader_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || _MatRippleStylesLoader)();
	};
	static ɵcmp = /*@__PURE__*/ ɵɵdefineComponent({
		type: _MatRippleStylesLoader,
		selectors: [["ng-component"]],
		hostAttrs: ["mat-ripple-style-loader", ""],
		decls: 0,
		vars: 0,
		template: function _MatRippleStylesLoader_Template(rf, ctx) {},
		styles: [".mat-ripple {\n  overflow: hidden;\n  position: relative;\n}\n.mat-ripple:not(:empty) {\n  transform: translateZ(0);\n}\n\n.mat-ripple.mat-ripple-unbounded {\n  overflow: visible;\n}\n\n.mat-ripple-element {\n  position: absolute;\n  border-radius: 50%;\n  pointer-events: none;\n  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);\n  transform: scale3d(0, 0, 0);\n  background-color: var(--%NS%mat-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 10%, transparent));\n}\n@media (forced-colors: active) {\n  .mat-ripple-element {\n    display: none;\n  }\n}\n.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {\n  display: none;\n}\n"],
		encapsulation: 2
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_MatRippleStylesLoader, [{
		type: Component,
		args: [{
			template: "",
			encapsulation: ViewEncapsulation.None,
			host: { "mat-ripple-style-loader": "" },
			styles: [".mat-ripple {\n  overflow: hidden;\n  position: relative;\n}\n.mat-ripple:not(:empty) {\n  transform: translateZ(0);\n}\n\n.mat-ripple.mat-ripple-unbounded {\n  overflow: visible;\n}\n\n.mat-ripple-element {\n  position: absolute;\n  border-radius: 50%;\n  pointer-events: none;\n  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);\n  transform: scale3d(0, 0, 0);\n  background-color: var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent));\n}\n@media (forced-colors: active) {\n  .mat-ripple-element {\n    display: none;\n  }\n}\n.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {\n  display: none;\n}\n"]
		}]
	}], null, null);
})();
var RippleRenderer = class RippleRenderer {
	_target;
	_ngZone;
	_platform;
	_containerElement;
	_triggerElement = null;
	_isPointerDown = false;
	_activeRipples = /* @__PURE__ */ new Map();
	_mostRecentTransientRipple = null;
	_lastTouchStartEvent;
	_pointerUpEventsRegistered = false;
	_containerRect = null;
	static _eventManager = new RippleEventManager();
	constructor(_target, _ngZone, elementOrElementRef, _platform, injector) {
		this._target = _target;
		this._ngZone = _ngZone;
		this._platform = _platform;
		if (_platform.isBrowser) this._containerElement = coerceElement(elementOrElementRef);
		if (injector) injector.get(_CdkPrivateStyleLoader).load(_MatRippleStylesLoader);
	}
	fadeInRipple(x, y, config = {}) {
		const containerRect = this._containerRect = this._containerRect || this._containerElement.getBoundingClientRect();
		const animationConfig = {
			...defaultRippleAnimationConfig,
			...config.animation
		};
		if (config.centered) {
			x = containerRect.left + containerRect.width / 2;
			y = containerRect.top + containerRect.height / 2;
		}
		const radius = config.radius || distanceToFurthestCorner(x, y, containerRect);
		const offsetX = x - containerRect.left;
		const offsetY = y - containerRect.top;
		const enterDuration = animationConfig.enterDuration;
		const ripple = document.createElement("div");
		ripple.classList.add("mat-ripple-element");
		ripple.style.left = `${offsetX - radius}px`;
		ripple.style.top = `${offsetY - radius}px`;
		ripple.style.height = `${radius * 2}px`;
		ripple.style.width = `${radius * 2}px`;
		if (config.color != null) ripple.style.backgroundColor = config.color;
		ripple.style.transitionDuration = `${enterDuration}ms`;
		this._containerElement.appendChild(ripple);
		const computedStyles = window.getComputedStyle(ripple);
		const userTransitionProperty = computedStyles.transitionProperty;
		const userTransitionDuration = computedStyles.transitionDuration;
		const animationForciblyDisabledThroughCss = userTransitionProperty === "none" || userTransitionDuration === "0s" || userTransitionDuration === "0s, 0s" || containerRect.width === 0 && containerRect.height === 0;
		const rippleRef = new RippleRef(this, ripple, config, animationForciblyDisabledThroughCss);
		ripple.style.transform = "scale3d(1, 1, 1)";
		rippleRef.state = RippleState.FADING_IN;
		if (!config.persistent) this._mostRecentTransientRipple = rippleRef;
		let eventListeners = null;
		if (!animationForciblyDisabledThroughCss && (enterDuration || animationConfig.exitDuration)) this._ngZone.runOutsideAngular(() => {
			const onTransitionEnd = () => {
				if (eventListeners) eventListeners.fallbackTimer = null;
				clearTimeout(fallbackTimer);
				this._finishRippleTransition(rippleRef);
			};
			const onTransitionCancel = () => this._destroyRipple(rippleRef);
			const fallbackTimer = setTimeout(onTransitionCancel, enterDuration + 100);
			ripple.addEventListener("transitionend", onTransitionEnd);
			ripple.addEventListener("transitioncancel", onTransitionCancel);
			eventListeners = {
				onTransitionEnd,
				onTransitionCancel,
				fallbackTimer
			};
		});
		this._activeRipples.set(rippleRef, eventListeners);
		if (animationForciblyDisabledThroughCss || !enterDuration) this._finishRippleTransition(rippleRef);
		return rippleRef;
	}
	fadeOutRipple(rippleRef) {
		if (rippleRef.state === RippleState.FADING_OUT || rippleRef.state === RippleState.HIDDEN) return;
		const rippleEl = rippleRef.element;
		const animationConfig = {
			...defaultRippleAnimationConfig,
			...rippleRef.config.animation
		};
		rippleEl.style.transitionDuration = `${animationConfig.exitDuration}ms`;
		rippleEl.style.opacity = "0";
		rippleRef.state = RippleState.FADING_OUT;
		if (rippleRef._animationForciblyDisabledThroughCss || !animationConfig.exitDuration) this._finishRippleTransition(rippleRef);
	}
	fadeOutAll() {
		this._getActiveRipples().forEach((ripple) => ripple.fadeOut());
	}
	fadeOutAllNonPersistent() {
		this._getActiveRipples().forEach((ripple) => {
			if (!ripple.config.persistent) ripple.fadeOut();
		});
	}
	setupTriggerEvents(elementOrElementRef) {
		const element = coerceElement(elementOrElementRef);
		if (!this._platform.isBrowser || !element || element === this._triggerElement) return;
		this._removeTriggerEvents();
		this._triggerElement = element;
		pointerDownEvents.forEach((type) => {
			RippleRenderer._eventManager.addHandler(this._ngZone, type, element, this);
		});
	}
	handleEvent(event) {
		if (event.type === "mousedown") this._onMousedown(event);
		else if (event.type === "touchstart") this._onTouchStart(event);
		else this._onPointerUp();
		if (!this._pointerUpEventsRegistered) {
			this._ngZone.runOutsideAngular(() => {
				pointerUpEvents.forEach((type) => {
					this._triggerElement.addEventListener(type, this, passiveCapturingEventOptions);
				});
			});
			this._pointerUpEventsRegistered = true;
		}
	}
	_finishRippleTransition(rippleRef) {
		if (rippleRef.state === RippleState.FADING_IN) this._startFadeOutTransition(rippleRef);
		else if (rippleRef.state === RippleState.FADING_OUT) this._destroyRipple(rippleRef);
	}
	_startFadeOutTransition(rippleRef) {
		const isMostRecentTransientRipple = rippleRef === this._mostRecentTransientRipple;
		const { persistent } = rippleRef.config;
		rippleRef.state = RippleState.VISIBLE;
		if (!persistent && (!isMostRecentTransientRipple || !this._isPointerDown)) rippleRef.fadeOut();
	}
	_destroyRipple(rippleRef) {
		const eventListeners = this._activeRipples.get(rippleRef) ?? null;
		this._activeRipples.delete(rippleRef);
		if (!this._activeRipples.size) this._containerRect = null;
		if (rippleRef === this._mostRecentTransientRipple) this._mostRecentTransientRipple = null;
		rippleRef.state = RippleState.HIDDEN;
		if (eventListeners !== null) {
			rippleRef.element.removeEventListener("transitionend", eventListeners.onTransitionEnd);
			rippleRef.element.removeEventListener("transitioncancel", eventListeners.onTransitionCancel);
			if (eventListeners.fallbackTimer !== null) clearTimeout(eventListeners.fallbackTimer);
		}
		rippleRef.element.remove();
	}
	_onMousedown(event) {
		const isFakeMousedown = isFakeMousedownFromScreenReader(event);
		const isSyntheticEvent = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + ignoreMouseEventsTimeout;
		if (!this._target.rippleDisabled && !isFakeMousedown && !isSyntheticEvent) {
			this._isPointerDown = true;
			this.fadeInRipple(event.clientX, event.clientY, this._target.rippleConfig);
		}
	}
	_onTouchStart(event) {
		if (!this._target.rippleDisabled && !isFakeTouchstartFromScreenReader(event)) {
			this._lastTouchStartEvent = Date.now();
			this._isPointerDown = true;
			const touches = event.changedTouches;
			if (touches) for (let i = 0; i < touches.length; i++) this.fadeInRipple(touches[i].clientX, touches[i].clientY, this._target.rippleConfig);
		}
	}
	_onPointerUp() {
		if (!this._isPointerDown) return;
		this._isPointerDown = false;
		this._getActiveRipples().forEach((ripple) => {
			const isVisible = ripple.state === RippleState.VISIBLE || ripple.config.terminateOnPointerUp && ripple.state === RippleState.FADING_IN;
			if (!ripple.config.persistent && isVisible) ripple.fadeOut();
		});
	}
	_getActiveRipples() {
		return Array.from(this._activeRipples.keys());
	}
	_removeTriggerEvents() {
		const trigger = this._triggerElement;
		if (trigger) {
			pointerDownEvents.forEach((type) => RippleRenderer._eventManager.removeHandler(type, trigger, this));
			if (this._pointerUpEventsRegistered) {
				pointerUpEvents.forEach((type) => trigger.removeEventListener(type, this, passiveCapturingEventOptions));
				this._pointerUpEventsRegistered = false;
			}
		}
	}
};
function distanceToFurthestCorner(x, y, rect) {
	const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
	const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
	return Math.sqrt(distX * distX + distY * distY);
}
var MAT_RIPPLE_GLOBAL_OPTIONS = new InjectionToken("mat-ripple-global-options");
var MatRipple = class MatRipple {
	_elementRef = inject(ElementRef);
	_animationsDisabled = _animationsDisabled();
	color;
	unbounded = false;
	centered = false;
	radius = 0;
	animation;
	get disabled() {
		return this._disabled;
	}
	set disabled(value) {
		if (value) this.fadeOutAllNonPersistent();
		this._disabled = value;
		this._setupTriggerEventsIfEnabled();
	}
	_disabled = false;
	get trigger() {
		return this._trigger || this._elementRef.nativeElement;
	}
	set trigger(trigger) {
		this._trigger = trigger;
		this._setupTriggerEventsIfEnabled();
	}
	_trigger;
	_rippleRenderer;
	_globalOptions;
	_isInitialized = false;
	constructor() {
		const ngZone = inject(NgZone);
		const platform = inject(Platform);
		const globalOptions = inject(MAT_RIPPLE_GLOBAL_OPTIONS, { optional: true });
		const injector = inject(Injector);
		this._globalOptions = globalOptions || {};
		this._rippleRenderer = new RippleRenderer(this, ngZone, this._elementRef, platform, injector);
	}
	ngOnInit() {
		this._isInitialized = true;
		this._setupTriggerEventsIfEnabled();
	}
	ngOnDestroy() {
		this._rippleRenderer._removeTriggerEvents();
	}
	fadeOutAll() {
		this._rippleRenderer.fadeOutAll();
	}
	fadeOutAllNonPersistent() {
		this._rippleRenderer.fadeOutAllNonPersistent();
	}
	get rippleConfig() {
		return {
			centered: this.centered,
			radius: this.radius,
			color: this.color,
			animation: {
				...this._globalOptions.animation,
				...this._animationsDisabled ? {
					enterDuration: 0,
					exitDuration: 0
				} : {},
				...this.animation
			},
			terminateOnPointerUp: this._globalOptions.terminateOnPointerUp
		};
	}
	get rippleDisabled() {
		return this.disabled || !!this._globalOptions.disabled;
	}
	_setupTriggerEventsIfEnabled() {
		if (!this.disabled && this._isInitialized) this._rippleRenderer.setupTriggerEvents(this.trigger);
	}
	launch(configOrX, y = 0, config) {
		if (typeof configOrX === "number") return this._rippleRenderer.fadeInRipple(configOrX, y, {
			...this.rippleConfig,
			...config
		});
		else return this._rippleRenderer.fadeInRipple(0, 0, {
			...this.rippleConfig,
			...configOrX
		});
	}
	static ɵfac = function MatRipple_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatRipple)();
	};
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: MatRipple,
		selectors: [[
			"",
			"mat-ripple",
			""
		], [
			"",
			"matRipple",
			""
		]],
		hostAttrs: [1, "mat-ripple"],
		hostVars: 2,
		hostBindings: function MatRipple_HostBindings(rf, ctx) {
			if (rf & 2) ɵɵclassProp("mat-ripple-unbounded", ctx.unbounded);
		},
		inputs: {
			color: [
				0,
				"matRippleColor",
				"color"
			],
			unbounded: [
				0,
				"matRippleUnbounded",
				"unbounded"
			],
			centered: [
				0,
				"matRippleCentered",
				"centered"
			],
			radius: [
				0,
				"matRippleRadius",
				"radius"
			],
			animation: [
				0,
				"matRippleAnimation",
				"animation"
			],
			disabled: [
				0,
				"matRippleDisabled",
				"disabled"
			],
			trigger: [
				0,
				"matRippleTrigger",
				"trigger"
			]
		},
		exportAs: ["matRipple"]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRipple, [{
		type: Directive,
		args: [{
			selector: "[mat-ripple], [matRipple]",
			exportAs: "matRipple",
			host: {
				"class": "mat-ripple",
				"[class.mat-ripple-unbounded]": "unbounded"
			}
		}]
	}], () => [], {
		color: [{
			type: Input,
			args: ["matRippleColor"]
		}],
		unbounded: [{
			type: Input,
			args: ["matRippleUnbounded"]
		}],
		centered: [{
			type: Input,
			args: ["matRippleCentered"]
		}],
		radius: [{
			type: Input,
			args: ["matRippleRadius"]
		}],
		animation: [{
			type: Input,
			args: ["matRippleAnimation"]
		}],
		disabled: [{
			type: Input,
			args: ["matRippleDisabled"]
		}],
		trigger: [{
			type: Input,
			args: ["matRippleTrigger"]
		}]
	});
})();
// node_modules/@angular/material/fesm2022/_ripple-loader-chunk.mjs
var eventListenerOptions = { capture: true };
var rippleInteractionEvents = [
	"focus",
	"mousedown",
	"mouseenter",
	"touchstart"
];
var matRippleUninitialized = "mat-ripple-loader-uninitialized";
var matRippleClassName = "mat-ripple-loader-class-name";
var matRippleCentered = "mat-ripple-loader-centered";
var matRippleDisabled = "mat-ripple-loader-disabled";
var MatRippleLoader = class MatRippleLoader {
	_document = inject(DOCUMENT);
	_animationsDisabled = _animationsDisabled();
	_globalRippleOptions = inject(MAT_RIPPLE_GLOBAL_OPTIONS, { optional: true });
	_platform = inject(Platform);
	_ngZone = inject(NgZone);
	_injector = inject(Injector);
	_eventCleanups;
	_hosts = /* @__PURE__ */ new Map();
	constructor() {
		const renderer = inject(RendererFactory2).createRenderer(null, null);
		this._eventCleanups = this._ngZone.runOutsideAngular(() => rippleInteractionEvents.map((name) => renderer.listen(this._document, name, this._onInteraction, eventListenerOptions)));
	}
	ngOnDestroy() {
		const hosts = this._hosts.keys();
		for (const host of hosts) this.destroyRipple(host);
		this._eventCleanups.forEach((cleanup) => cleanup());
	}
	configureRipple(host, config) {
		host.setAttribute(matRippleUninitialized, this._globalRippleOptions?.namespace ?? "");
		if (config.className || !host.hasAttribute(matRippleClassName)) host.setAttribute(matRippleClassName, config.className || "");
		if (config.centered) host.setAttribute(matRippleCentered, "");
		if (config.disabled) host.setAttribute(matRippleDisabled, "");
	}
	setDisabled(host, disabled) {
		const ripple = this._hosts.get(host);
		if (ripple) {
			ripple.target.rippleDisabled = disabled;
			if (!disabled && !ripple.hasSetUpEvents) {
				ripple.hasSetUpEvents = true;
				ripple.renderer.setupTriggerEvents(host);
			}
		} else if (disabled) host.setAttribute(matRippleDisabled, "");
		else host.removeAttribute(matRippleDisabled);
	}
	_onInteraction = (event) => {
		const eventTarget = _getEventTarget(event);
		if (eventTarget instanceof HTMLElement) {
			const element = eventTarget.closest(`[${matRippleUninitialized}="${this._globalRippleOptions?.namespace ?? ""}"]`);
			if (element) this._createRipple(element);
		}
	};
	_createRipple(host) {
		if (!this._document || this._hosts.has(host)) return;
		host.querySelector(".mat-ripple")?.remove();
		const rippleEl = this._document.createElement("span");
		rippleEl.classList.add("mat-ripple", host.getAttribute(matRippleClassName));
		host.append(rippleEl);
		const globalOptions = this._globalRippleOptions;
		const enterDuration = this._animationsDisabled ? 0 : globalOptions?.animation?.enterDuration ?? defaultRippleAnimationConfig.enterDuration;
		const exitDuration = this._animationsDisabled ? 0 : globalOptions?.animation?.exitDuration ?? defaultRippleAnimationConfig.exitDuration;
		const target = {
			rippleDisabled: this._animationsDisabled || globalOptions?.disabled || host.hasAttribute(matRippleDisabled),
			rippleConfig: {
				centered: host.hasAttribute(matRippleCentered),
				terminateOnPointerUp: globalOptions?.terminateOnPointerUp,
				animation: {
					enterDuration,
					exitDuration
				}
			}
		};
		const renderer = new RippleRenderer(target, this._ngZone, rippleEl, this._platform, this._injector);
		const hasSetUpEvents = !target.rippleDisabled;
		if (hasSetUpEvents) renderer.setupTriggerEvents(host);
		this._hosts.set(host, {
			target,
			renderer,
			hasSetUpEvents
		});
		host.removeAttribute(matRippleUninitialized);
	}
	destroyRipple(host) {
		const ripple = this._hosts.get(host);
		if (ripple) {
			ripple.renderer._removeTriggerEvents();
			this._hosts.delete(host);
		}
	}
	static ɵfac = function MatRippleLoader_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatRippleLoader)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: MatRippleLoader,
		factory: MatRippleLoader.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRippleLoader, [{ type: Service }], () => [], null);
})();
// node_modules/@angular/material/fesm2022/_structural-styles-chunk.mjs
var _StructuralStylesLoader = class _StructuralStylesLoader {
	static ɵfac = function _StructuralStylesLoader_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || _StructuralStylesLoader)();
	};
	static ɵcmp = /*@__PURE__*/ ɵɵdefineComponent({
		type: _StructuralStylesLoader,
		selectors: [["structural-styles"]],
		decls: 0,
		vars: 0,
		template: function _StructuralStylesLoader_Template(rf, ctx) {},
		styles: [".mat-focus-indicator {\n  position: relative;\n}\n.mat-focus-indicator::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  box-sizing: border-box;\n  pointer-events: none;\n  display: var(--%NS%mat-focus-indicator-display, none);\n  border-width: var(--%NS%mat-focus-indicator-border-width, 3px);\n  border-style: var(--%NS%mat-focus-indicator-border-style, solid);\n  border-color: var(--%NS%mat-focus-indicator-border-color, transparent);\n  border-radius: var(--%NS%mat-focus-indicator-border-radius, 4px);\n}\n.mat-focus-indicator:focus-visible::before {\n  content: \"\";\n}\n\n@media (forced-colors: active) {\n  html {\n    --%NS%mat-focus-indicator-display: block;\n    --%NS%mat-focus-indicator-fallback-border-style: none;\n  }\n}\n"],
		encapsulation: 2
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_StructuralStylesLoader, [{
		type: Component,
		args: [{
			selector: "structural-styles",
			encapsulation: ViewEncapsulation.None,
			template: "",
			styles: [".mat-focus-indicator {\n  position: relative;\n}\n.mat-focus-indicator::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  box-sizing: border-box;\n  pointer-events: none;\n  display: var(--mat-focus-indicator-display, none);\n  border-width: var(--mat-focus-indicator-border-width, 3px);\n  border-style: var(--mat-focus-indicator-border-style, solid);\n  border-color: var(--mat-focus-indicator-border-color, transparent);\n  border-radius: var(--mat-focus-indicator-border-radius, 4px);\n}\n.mat-focus-indicator:focus-visible::before {\n  content: \"\";\n}\n\n@media (forced-colors: active) {\n  html {\n    --mat-focus-indicator-display: block;\n    --mat-focus-indicator-fallback-border-style: none;\n  }\n}\n"]
		}]
	}], null, null);
})();
// node_modules/@angular/material/fesm2022/_icon-button-chunk.mjs
var MAT_BUTTON_CONFIG = new InjectionToken("MAT_BUTTON_CONFIG");
function transformTabIndex(value) {
	return value == null ? void 0 : numberAttribute(value);
}
var MatButtonBase = class MatButtonBase {
	_elementRef = inject(ElementRef);
	_ngZone = inject(NgZone);
	_animationsDisabled = _animationsDisabled();
	_config = inject(MAT_BUTTON_CONFIG, { optional: true });
	_focusMonitor = inject(FocusMonitor);
	_cleanupClick;
	_renderer = inject(Renderer2);
	_rippleLoader = inject(MatRippleLoader);
	_isAnchor;
	_isFab = false;
	color;
	get disableRipple() {
		return this._disableRipple;
	}
	set disableRipple(value) {
		this._disableRipple = value;
		this._updateRippleDisabled();
	}
	_disableRipple = false;
	get disabled() {
		return this._disabled;
	}
	set disabled(value) {
		this._disabled = value;
		this._updateRippleDisabled();
	}
	_disabled = false;
	ariaDisabled;
	disabledInteractive;
	tabIndex;
	set _tabindex(value) {
		this.tabIndex = value;
	}
	showProgress = input(false, {
		...ngDevMode ? { debugName: "showProgress" } : {},
		transform: booleanAttribute
	});
	constructor() {
		inject(_CdkPrivateStyleLoader).load(_StructuralStylesLoader);
		const element = this._elementRef.nativeElement;
		this._isAnchor = element.tagName === "A";
		this.disabledInteractive = this._config?.disabledInteractive ?? false;
		this.color = this._config?.color ?? null;
		this._rippleLoader?.configureRipple(element, { className: "mat-mdc-button-ripple" });
	}
	ngAfterViewInit() {
		this._focusMonitor.monitor(this._elementRef, true);
		if (this._isAnchor) this._setupAsAnchor();
	}
	ngOnDestroy() {
		this._cleanupClick?.();
		this._focusMonitor.stopMonitoring(this._elementRef);
		this._rippleLoader?.destroyRipple(this._elementRef.nativeElement);
	}
	focus(origin = "program", options) {
		if (origin) this._focusMonitor.focusVia(this._elementRef.nativeElement, origin, options);
		else this._elementRef.nativeElement.focus(options);
	}
	_getAriaDisabled() {
		if (this.ariaDisabled != null) return this.ariaDisabled;
		if (this._isAnchor) return this.disabled || null;
		return this.disabled && this.disabledInteractive ? true : null;
	}
	_getDisabledAttribute() {
		return this.disabledInteractive || !this.disabled ? null : true;
	}
	_updateRippleDisabled() {
		this._rippleLoader?.setDisabled(this._elementRef.nativeElement, this.disableRipple || this.disabled);
	}
	_getTabIndex() {
		if (this._isAnchor) return this.disabled && !this.disabledInteractive ? -1 : this.tabIndex;
		return this.tabIndex;
	}
	_setupAsAnchor() {
		this._cleanupClick = this._ngZone.runOutsideAngular(() => this._renderer.listen(this._elementRef.nativeElement, "click", (event) => {
			if (this.disabled) {
				event.preventDefault();
				event.stopImmediatePropagation();
			}
		}));
	}
	static ɵfac = function MatButtonBase_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatButtonBase)();
	};
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: MatButtonBase,
		hostAttrs: [1, "mat-mdc-button-base"],
		hostVars: 15,
		hostBindings: function MatButtonBase_HostBindings(rf, ctx) {
			if (rf & 2) {
				ɵɵattribute("disabled", ctx._getDisabledAttribute())("aria-disabled", ctx._getAriaDisabled())("tabindex", ctx._getTabIndex());
				ɵɵclassMap(ctx.color ? "mat-" + ctx.color : "");
				ɵɵclassProp("mat-mdc-button-progress-indicator-shown", ctx.showProgress())("mat-mdc-button-disabled", ctx.disabled)("mat-mdc-button-disabled-interactive", ctx.disabledInteractive)("mat-unthemed", !ctx.color)("_mat-animation-noopable", ctx._animationsDisabled);
			}
		},
		inputs: {
			color: "color",
			disableRipple: [
				2,
				"disableRipple",
				"disableRipple",
				booleanAttribute
			],
			disabled: [
				2,
				"disabled",
				"disabled",
				booleanAttribute
			],
			ariaDisabled: [
				2,
				"aria-disabled",
				"ariaDisabled",
				booleanAttribute
			],
			disabledInteractive: [
				2,
				"disabledInteractive",
				"disabledInteractive",
				booleanAttribute
			],
			tabIndex: [
				2,
				"tabIndex",
				"tabIndex",
				transformTabIndex
			],
			_tabindex: [
				2,
				"tabindex",
				"_tabindex",
				transformTabIndex
			],
			showProgress: [1, "showProgress"]
		}
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatButtonBase, [{
		type: Directive,
		args: [{ host: {
			"class": "mat-mdc-button-base",
			"[class]": "color ? \"mat-\" + color : \"\"",
			"[class.mat-mdc-button-progress-indicator-shown]": "showProgress()",
			"[attr.disabled]": "_getDisabledAttribute()",
			"[attr.aria-disabled]": "_getAriaDisabled()",
			"[attr.tabindex]": "_getTabIndex()",
			"[class.mat-mdc-button-disabled]": "disabled",
			"[class.mat-mdc-button-disabled-interactive]": "disabledInteractive",
			"[class.mat-unthemed]": "!color",
			"[class._mat-animation-noopable]": "_animationsDisabled"
		} }]
	}], () => [], {
		color: [{ type: Input }],
		disableRipple: [{
			type: Input,
			args: [{ transform: booleanAttribute }]
		}],
		disabled: [{
			type: Input,
			args: [{ transform: booleanAttribute }]
		}],
		ariaDisabled: [{
			type: Input,
			args: [{
				transform: booleanAttribute,
				alias: "aria-disabled"
			}]
		}],
		disabledInteractive: [{
			type: Input,
			args: [{ transform: booleanAttribute }]
		}],
		tabIndex: [{
			type: Input,
			args: [{ transform: transformTabIndex }]
		}],
		_tabindex: [{
			type: Input,
			args: [{
				alias: "tabindex",
				transform: transformTabIndex
			}]
		}],
		showProgress: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showProgress",
				required: false
			}]
		}]
	});
})();
var MatIconButton = class MatIconButton extends MatButtonBase {
	constructor() {
		super();
		this._rippleLoader.configureRipple(this._elementRef.nativeElement, { centered: true });
	}
	static ɵfac = function MatIconButton_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatIconButton)();
	};
	static ɵcmp = (function() {
		const _c0 = ["*", [[
			"",
			"progressIndicator",
			""
		]]];
		const _c1 = ["*", "[progressIndicator]"];
		function MatIconButton_Conditional_2_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵdomElementStart(0, "div", 1);
				ɵɵprojection(1, 1);
				ɵɵdomElementEnd();
			}
		}
		return /*@__PURE__*/ ɵɵdefineComponent({
			type: MatIconButton,
			selectors: [
				[
					"button",
					"mat-icon-button",
					""
				],
				[
					"a",
					"mat-icon-button",
					""
				],
				[
					"button",
					"matIconButton",
					""
				],
				[
					"a",
					"matIconButton",
					""
				]
			],
			hostAttrs: [
				1,
				"mdc-icon-button",
				"mat-mdc-icon-button"
			],
			exportAs: ["matButton", "matAnchor"],
			features: [ɵɵInheritDefinitionFeature],
			ngContentSelectors: _c1,
			decls: 5,
			vars: 1,
			consts: [
				[
					1,
					"mat-mdc-button-persistent-ripple",
					"mdc-icon-button__ripple"
				],
				[1, "mat-mdc-button-progress-indicator-container"],
				[1, "mat-focus-indicator"],
				[1, "mat-mdc-button-touch-target"]
			],
			template: function MatIconButton_Template(rf, ctx) {
				if (rf & 1) {
					ɵɵprojectionDef(_c0);
					ɵɵdomElement(0, "span", 0);
					ɵɵprojection(1);
					ɵɵconditionalCreate(2, MatIconButton_Conditional_2_Template, 2, 0, "div", 1);
					ɵɵdomElement(3, "span", 2)(4, "span", 3);
				}
				if (rf & 2) {
					ɵɵadvance(2);
					ɵɵconditional(ctx.showProgress() ? 2 : -1);
				}
			},
			styles: [".mat-mdc-icon-button {\n  -webkit-user-select: none;\n  user-select: none;\n  display: inline-block;\n  position: relative;\n  box-sizing: border-box;\n  border: none;\n  outline: none;\n  background-color: transparent;\n  fill: currentColor;\n  text-decoration: none;\n  cursor: pointer;\n  z-index: 0;\n  overflow: visible;\n  border-radius: var(--%NS%mat-icon-button-container-shape, var(--%NS%mat-sys-corner-full, 50%));\n  flex-shrink: 0;\n  text-align: center;\n  width: var(--%NS%mat-icon-button-state-layer-size, 40px);\n  height: var(--%NS%mat-icon-button-state-layer-size, 40px);\n  padding: calc(calc(var(--%NS%mat-icon-button-state-layer-size, 40px) - var(--%NS%mat-icon-button-icon-size, 24px)) / 2);\n  font-size: var(--%NS%mat-icon-button-icon-size, 24px);\n  color: var(--%NS%mat-icon-button-icon-color, var(--%NS%mat-sys-on-surface-variant));\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-icon-button .mat-mdc-button-ripple,\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-icon-button .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  content: \"\";\n  opacity: 0;\n}\n.mat-mdc-icon-button .mdc-button__label,\n.mat-mdc-icon-button .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-icon-button .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  border-radius: inherit;\n}\n.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {\n  content: \"\";\n  border-radius: inherit;\n}\n.mat-mdc-icon-button .mat-ripple-element {\n  background-color: var(--%NS%mat-icon-button-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface-variant) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-icon-button-state-layer-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-icon-button-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-icon-button-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-icon-button-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-icon-button-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-icon-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-icon-button-touch-target-size, 48px);\n  display: var(--%NS%mat-icon-button-touch-target-display, block);\n  left: 50%;\n  width: var(--%NS%mat-icon-button-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-icon-button._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-icon-button img,\n.mat-mdc-icon-button svg {\n  width: var(--%NS%mat-icon-button-icon-size, 24px);\n  height: var(--%NS%mat-icon-button-icon-size, 24px);\n  vertical-align: baseline;\n}\n.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__determinate-circle-graphic {\n  width: inherit;\n  height: inherit;\n}\n.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__indeterminate-circle-graphic {\n  height: 100%;\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {\n  border-radius: var(--%NS%mat-icon-button-container-shape, var(--%NS%mat-sys-corner-full, 50%));\n}\n.mat-mdc-icon-button[hidden] {\n  display: none;\n}\n.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {\n  background: transparent;\n  opacity: 1;\n}\n\n.mat-mdc-button-progress-indicator-container {\n  position: absolute;\n  inset-inline-start: 0;\n  inset-block-start: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n\n.mat-mdc-button-progress-indicator-shown mat-icon {\n  visibility: hidden;\n}\n", "@media (forced-colors: active) {\n  .mat-mdc-button:not(.mdc-button--outlined),\n  .mat-mdc-unelevated-button:not(.mdc-button--outlined),\n  .mat-mdc-raised-button:not(.mdc-button--outlined),\n  .mat-mdc-outlined-button:not(.mdc-button--outlined),\n  .mat-mdc-button-base.mat-tonal-button,\n  .mat-mdc-icon-button.mat-mdc-icon-button,\n  .mat-mdc-outlined-button .mdc-button__ripple {\n    outline: solid 1px;\n  }\n}\n"],
			encapsulation: 2
		});
	})();
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatIconButton, [{
		type: Component,
		args: [{
			selector: `button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]`,
			host: { "class": "mdc-icon-button mat-mdc-icon-button" },
			exportAs: "matButton, matAnchor",
			encapsulation: ViewEncapsulation.None,
			template: "<span class=\"mat-mdc-button-persistent-ripple mdc-icon-button__ripple\"></span>\n\n<ng-content></ng-content>\n\n@if (showProgress()) {\n  <div class=\"mat-mdc-button-progress-indicator-container\">\n    <ng-content select=\"[progressIndicator]\" />\n  </div>\n}\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<span class=\"mat-focus-indicator\"></span>\n\n<span class=\"mat-mdc-button-touch-target\"></span>\n",
			styles: [".mat-mdc-icon-button {\n  -webkit-user-select: none;\n  user-select: none;\n  display: inline-block;\n  position: relative;\n  box-sizing: border-box;\n  border: none;\n  outline: none;\n  background-color: transparent;\n  fill: currentColor;\n  text-decoration: none;\n  cursor: pointer;\n  z-index: 0;\n  overflow: visible;\n  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));\n  flex-shrink: 0;\n  text-align: center;\n  width: var(--mat-icon-button-state-layer-size, 40px);\n  height: var(--mat-icon-button-state-layer-size, 40px);\n  padding: calc(calc(var(--mat-icon-button-state-layer-size, 40px) - var(--mat-icon-button-icon-size, 24px)) / 2);\n  font-size: var(--mat-icon-button-icon-size, 24px);\n  color: var(--mat-icon-button-icon-color, var(--mat-sys-on-surface-variant));\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-icon-button .mat-mdc-button-ripple,\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-icon-button .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  content: \"\";\n  opacity: 0;\n}\n.mat-mdc-icon-button .mdc-button__label,\n.mat-mdc-icon-button .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-icon-button .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  border-radius: inherit;\n}\n.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {\n  content: \"\";\n  border-radius: inherit;\n}\n.mat-mdc-icon-button .mat-ripple-element {\n  background-color: var(--mat-icon-button-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface-variant) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-icon-button-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-icon-button-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-icon-button-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-icon-button-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-icon-button-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-icon-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-icon-button-touch-target-size, 48px);\n  display: var(--mat-icon-button-touch-target-display, block);\n  left: 50%;\n  width: var(--mat-icon-button-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-icon-button._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-icon-button img,\n.mat-mdc-icon-button svg {\n  width: var(--mat-icon-button-icon-size, 24px);\n  height: var(--mat-icon-button-icon-size, 24px);\n  vertical-align: baseline;\n}\n.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__determinate-circle-graphic {\n  width: inherit;\n  height: inherit;\n}\n.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__indeterminate-circle-graphic {\n  height: 100%;\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {\n  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));\n}\n.mat-mdc-icon-button[hidden] {\n  display: none;\n}\n.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {\n  background: transparent;\n  opacity: 1;\n}\n\n.mat-mdc-button-progress-indicator-container {\n  position: absolute;\n  inset-inline-start: 0;\n  inset-block-start: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n\n.mat-mdc-button-progress-indicator-shown mat-icon {\n  visibility: hidden;\n}\n", "@media (forced-colors: active) {\n  .mat-mdc-button:not(.mdc-button--outlined),\n  .mat-mdc-unelevated-button:not(.mdc-button--outlined),\n  .mat-mdc-raised-button:not(.mdc-button--outlined),\n  .mat-mdc-outlined-button:not(.mdc-button--outlined),\n  .mat-mdc-button-base.mat-tonal-button,\n  .mat-mdc-icon-button.mat-mdc-icon-button,\n  .mat-mdc-outlined-button .mdc-button__ripple {\n    outline: solid 1px;\n  }\n}\n"]
		}]
	}], () => [], null);
})();
// node_modules/@angular/material/fesm2022/_ripple-module-chunk.mjs
var MatRippleModule = class MatRippleModule {
	static ɵfac = function MatRippleModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatRippleModule)();
	};
	static ɵmod = /*@__PURE__*/ ɵɵdefineNgModule({
		type: MatRippleModule,
		imports: [MatRipple],
		exports: [MatRipple, BidiModule]
	});
	static ɵinj = /*@__PURE__*/ ɵɵdefineInjector({ imports: [BidiModule] });
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRippleModule, [{
		type: NgModule,
		args: [{
			imports: [MatRipple],
			exports: [MatRipple, BidiModule]
		}]
	}], null, null);
})();
// node_modules/@angular/material/fesm2022/button.mjs
var APPEARANCE_CLASSES = /* @__PURE__ */ new Map([
	["text", ["mat-mdc-button"]],
	["filled", ["mdc-button--unelevated", "mat-mdc-unelevated-button"]],
	["elevated", ["mdc-button--raised", "mat-mdc-raised-button"]],
	["outlined", ["mdc-button--outlined", "mat-mdc-outlined-button"]],
	["tonal", ["mat-tonal-button"]]
]);
var MatButton = class MatButton extends MatButtonBase {
	get appearance() {
		return this._appearance;
	}
	set appearance(value) {
		this.setAppearance(value || this._config?.defaultAppearance || "text");
	}
	_appearance = null;
	constructor() {
		super();
		const inferredAppearance = _inferAppearance(this._elementRef.nativeElement);
		if (inferredAppearance) this.setAppearance(inferredAppearance);
	}
	setAppearance(appearance) {
		if (appearance === this._appearance) return;
		const classList = this._elementRef.nativeElement.classList;
		const previousClasses = this._appearance ? APPEARANCE_CLASSES.get(this._appearance) : null;
		const newClasses = APPEARANCE_CLASSES.get(appearance);
		if ((typeof ngDevMode === "undefined" || ngDevMode) && !newClasses) throw new Error(`Unsupported MatButton appearance "${appearance}"`);
		if (previousClasses) classList.remove(...previousClasses);
		classList.add(...newClasses);
		this._appearance = appearance;
	}
	static ɵfac = function MatButton_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatButton)();
	};
	static ɵcmp = (function() {
		const _c0 = [
			[
				[
					"",
					8,
					"material-icons",
					3,
					"iconPositionEnd",
					""
				],
				[
					"mat-icon",
					3,
					"iconPositionEnd",
					""
				],
				[
					"",
					"matButtonIcon",
					"",
					3,
					"iconPositionEnd",
					""
				],
				[
					"",
					8,
					"material-symbols-outlined",
					3,
					"iconPositionEnd",
					""
				],
				[
					"",
					8,
					"material-symbols-rounded",
					3,
					"iconPositionEnd",
					""
				],
				[
					"",
					8,
					"material-symbols-sharp",
					3,
					"iconPositionEnd",
					""
				]
			],
			"*",
			[
				[
					"",
					"iconPositionEnd",
					"",
					8,
					"material-icons"
				],
				[
					"mat-icon",
					"iconPositionEnd",
					""
				],
				[
					"",
					"matButtonIcon",
					"",
					"iconPositionEnd",
					""
				],
				[
					"",
					"iconPositionEnd",
					"",
					8,
					"material-symbols-outlined"
				],
				[
					"",
					"iconPositionEnd",
					"",
					8,
					"material-symbols-rounded"
				],
				[
					"",
					"iconPositionEnd",
					"",
					8,
					"material-symbols-sharp"
				]
			],
			[[
				"",
				"progressIndicator",
				""
			]]
		];
		const _c1 = [
			".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd]), .material-symbols-outlined:not([iconPositionEnd]), .material-symbols-rounded:not([iconPositionEnd]), .material-symbols-sharp:not([iconPositionEnd])",
			"*",
			".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd], .material-symbols-outlined[iconPositionEnd], .material-symbols-rounded[iconPositionEnd], .material-symbols-sharp[iconPositionEnd]",
			"[progressIndicator]"
		];
		function MatButton_Conditional_5_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵdomElementStart(0, "div", 2);
				ɵɵprojection(1, 3);
				ɵɵdomElementEnd();
			}
		}
		return /*@__PURE__*/ ɵɵdefineComponent({
			type: MatButton,
			selectors: [
				[
					"button",
					"matButton",
					""
				],
				[
					"a",
					"matButton",
					""
				],
				[
					"button",
					"mat-button",
					""
				],
				[
					"button",
					"mat-raised-button",
					""
				],
				[
					"button",
					"mat-flat-button",
					""
				],
				[
					"button",
					"mat-stroked-button",
					""
				],
				[
					"a",
					"mat-button",
					""
				],
				[
					"a",
					"mat-raised-button",
					""
				],
				[
					"a",
					"mat-flat-button",
					""
				],
				[
					"a",
					"mat-stroked-button",
					""
				]
			],
			hostAttrs: [1, "mdc-button"],
			inputs: { appearance: [
				0,
				"matButton",
				"appearance"
			] },
			exportAs: ["matButton", "matAnchor"],
			features: [ɵɵInheritDefinitionFeature],
			ngContentSelectors: _c1,
			decls: 8,
			vars: 5,
			consts: [
				[1, "mat-mdc-button-persistent-ripple"],
				[1, "mdc-button__label"],
				[1, "mat-mdc-button-progress-indicator-container"],
				[1, "mat-focus-indicator"],
				[1, "mat-mdc-button-touch-target"]
			],
			template: function MatButton_Template(rf, ctx) {
				if (rf & 1) {
					ɵɵprojectionDef(_c0);
					ɵɵdomElement(0, "span", 0);
					ɵɵprojection(1);
					ɵɵdomElementStart(2, "span", 1);
					ɵɵprojection(3, 1);
					ɵɵdomElementEnd();
					ɵɵprojection(4, 2);
					ɵɵconditionalCreate(5, MatButton_Conditional_5_Template, 2, 0, "div", 2);
					ɵɵdomElement(6, "span", 3)(7, "span", 4);
				}
				if (rf & 2) {
					ɵɵclassProp("mdc-button__ripple", !ctx._isFab)("mdc-fab__ripple", ctx._isFab);
					ɵɵadvance(5);
					ɵɵconditional(ctx.showProgress() ? 5 : -1);
				}
			},
			styles: [".mat-mdc-button-base {\n  text-decoration: none;\n}\n.mat-mdc-button-base .mat-icon {\n  min-height: fit-content;\n  flex-shrink: 0;\n}\n@media (hover: none) {\n  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {\n    opacity: 0;\n  }\n}\n\n.mdc-button {\n  -webkit-user-select: none;\n  user-select: none;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  min-width: 64px;\n  border: none;\n  outline: none;\n  line-height: inherit;\n  -webkit-appearance: none;\n  overflow: visible;\n  vertical-align: middle;\n  background: transparent;\n  padding: 0 8px;\n}\n.mdc-button::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n.mdc-button:active {\n  outline: none;\n}\n.mdc-button:hover {\n  cursor: pointer;\n}\n.mdc-button:disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mdc-button[hidden] {\n  display: none;\n}\n.mdc-button .mdc-button__label {\n  position: relative;\n}\n\n.mat-mdc-button {\n  padding: 0 var(--%NS%mat-button-text-horizontal-padding, 12px);\n  height: var(--%NS%mat-button-text-container-height, 40px);\n  font-family: var(--%NS%mat-button-text-label-text-font, var(--%NS%mat-sys-label-large-font));\n  font-size: var(--%NS%mat-button-text-label-text-size, var(--%NS%mat-sys-label-large-size));\n  letter-spacing: var(--%NS%mat-button-text-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));\n  text-transform: var(--%NS%mat-button-text-label-text-transform);\n  font-weight: var(--%NS%mat-button-text-label-text-weight, var(--%NS%mat-sys-label-large-weight));\n}\n.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {\n  border-radius: var(--%NS%mat-button-text-container-shape, var(--%NS%mat-sys-corner-full));\n}\n.mat-mdc-button:not(:disabled) {\n  color: var(--%NS%mat-button-text-label-text-color, var(--%NS%mat-sys-primary));\n}\n.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n.mat-mdc-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-button:has(.material-icons, .material-symbols-outlined, .material-symbols-rounded,\n.material-symbols-sharp, mat-icon, [matButtonIcon]) {\n  padding: 0 var(--%NS%mat-button-text-with-icon-horizontal-padding, 16px);\n}\n.mat-mdc-button > .mat-icon {\n  margin-right: var(--%NS%mat-button-text-icon-spacing, 8px);\n  margin-left: var(--%NS%mat-button-text-icon-offset, -4px);\n}\n[dir=rtl] .mat-mdc-button > .mat-icon {\n  margin-right: var(--%NS%mat-button-text-icon-offset, -4px);\n  margin-left: var(--%NS%mat-button-text-icon-spacing, 8px);\n}\n.mat-mdc-button .mdc-button__label + .mat-icon {\n  margin-right: var(--%NS%mat-button-text-icon-offset, -4px);\n  margin-left: var(--%NS%mat-button-text-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {\n  margin-right: var(--%NS%mat-button-text-icon-spacing, 8px);\n  margin-left: var(--%NS%mat-button-text-icon-offset, -4px);\n}\n.mat-mdc-button .mat-ripple-element {\n  background-color: var(--%NS%mat-button-text-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-button-text-state-layer-color, var(--%NS%mat-sys-primary));\n}\n.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-button-text-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-text-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-text-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-text-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-button-text-touch-target-size, 48px);\n  display: var(--%NS%mat-button-text-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n\n.mat-mdc-unelevated-button {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  height: var(--%NS%mat-button-filled-container-height, 40px);\n  font-family: var(--%NS%mat-button-filled-label-text-font, var(--%NS%mat-sys-label-large-font));\n  font-size: var(--%NS%mat-button-filled-label-text-size, var(--%NS%mat-sys-label-large-size));\n  letter-spacing: var(--%NS%mat-button-filled-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));\n  text-transform: var(--%NS%mat-button-filled-label-text-transform);\n  font-weight: var(--%NS%mat-button-filled-label-text-weight, var(--%NS%mat-sys-label-large-weight));\n  padding: 0 var(--%NS%mat-button-filled-horizontal-padding, 24px);\n}\n.mat-mdc-unelevated-button > .mat-icon {\n  margin-right: var(--%NS%mat-button-filled-icon-spacing, 8px);\n  margin-left: var(--%NS%mat-button-filled-icon-offset, -8px);\n}\n[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {\n  margin-right: var(--%NS%mat-button-filled-icon-offset, -8px);\n  margin-left: var(--%NS%mat-button-filled-icon-spacing, 8px);\n}\n.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {\n  margin-right: var(--%NS%mat-button-filled-icon-offset, -8px);\n  margin-left: var(--%NS%mat-button-filled-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {\n  margin-right: var(--%NS%mat-button-filled-icon-spacing, 8px);\n  margin-left: var(--%NS%mat-button-filled-icon-offset, -8px);\n}\n.mat-mdc-unelevated-button .mat-ripple-element {\n  background-color: var(--%NS%mat-button-filled-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-button-filled-state-layer-color, var(--%NS%mat-sys-on-primary));\n}\n.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-button-filled-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-filled-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-filled-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-filled-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-unelevated-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-button-filled-touch-target-size, 48px);\n  display: var(--%NS%mat-button-filled-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n.mat-mdc-unelevated-button:not(:disabled) {\n  color: var(--%NS%mat-button-filled-label-text-color, var(--%NS%mat-sys-on-primary));\n  background-color: var(--%NS%mat-button-filled-container-color, var(--%NS%mat-sys-primary));\n}\n.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {\n  border-radius: var(--%NS%mat-button-filled-container-shape, var(--%NS%mat-sys-corner-full));\n}\n.mat-mdc-unelevated-button .mat-mdc-button-progress-indicator-container {\n  --%NS%mat-progress-spinner-active-indicator-color: var(--%NS%mat-button-filled-progress-active-indicator-color, var(--%NS%mat-sys-on-primary));\n}\n.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n  background-color: var(--%NS%mat-button-filled-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-raised-button {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: var(--%NS%mat-button-protected-container-elevation-shadow, var(--%NS%mat-sys-level1));\n  height: var(--%NS%mat-button-protected-container-height, 40px);\n  font-family: var(--%NS%mat-button-protected-label-text-font, var(--%NS%mat-sys-label-large-font));\n  font-size: var(--%NS%mat-button-protected-label-text-size, var(--%NS%mat-sys-label-large-size));\n  letter-spacing: var(--%NS%mat-button-protected-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));\n  text-transform: var(--%NS%mat-button-protected-label-text-transform);\n  font-weight: var(--%NS%mat-button-protected-label-text-weight, var(--%NS%mat-sys-label-large-weight));\n  padding: 0 var(--%NS%mat-button-protected-horizontal-padding, 24px);\n}\n.mat-mdc-raised-button > .mat-icon {\n  margin-right: var(--%NS%mat-button-protected-icon-spacing, 8px);\n  margin-left: var(--%NS%mat-button-protected-icon-offset, -8px);\n}\n[dir=rtl] .mat-mdc-raised-button > .mat-icon {\n  margin-right: var(--%NS%mat-button-protected-icon-offset, -8px);\n  margin-left: var(--%NS%mat-button-protected-icon-spacing, 8px);\n}\n.mat-mdc-raised-button .mdc-button__label + .mat-icon {\n  margin-right: var(--%NS%mat-button-protected-icon-offset, -8px);\n  margin-left: var(--%NS%mat-button-protected-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {\n  margin-right: var(--%NS%mat-button-protected-icon-spacing, 8px);\n  margin-left: var(--%NS%mat-button-protected-icon-offset, -8px);\n}\n.mat-mdc-raised-button .mat-ripple-element {\n  background-color: var(--%NS%mat-button-protected-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-button-protected-state-layer-color, var(--%NS%mat-sys-primary));\n}\n.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-button-protected-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-protected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-protected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-protected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-raised-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-button-protected-touch-target-size, 48px);\n  display: var(--%NS%mat-button-protected-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n.mat-mdc-raised-button:not(:disabled) {\n  color: var(--%NS%mat-button-protected-label-text-color, var(--%NS%mat-sys-primary));\n  background-color: var(--%NS%mat-button-protected-container-color, var(--%NS%mat-sys-surface));\n}\n.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {\n  border-radius: var(--%NS%mat-button-protected-container-shape, var(--%NS%mat-sys-corner-full));\n}\n@media (hover: hover) {\n  .mat-mdc-raised-button:hover {\n    box-shadow: var(--%NS%mat-button-protected-hover-container-elevation-shadow, var(--%NS%mat-sys-level2));\n  }\n}\n.mat-mdc-raised-button:focus {\n  box-shadow: var(--%NS%mat-button-protected-focus-container-elevation-shadow, var(--%NS%mat-sys-level1));\n}\n.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {\n  box-shadow: var(--%NS%mat-button-protected-pressed-container-elevation-shadow, var(--%NS%mat-sys-level1));\n}\n.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n  background-color: var(--%NS%mat-button-protected-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {\n  box-shadow: var(--%NS%mat-button-protected-disabled-container-elevation-shadow, var(--%NS%mat-sys-level0));\n}\n.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-outlined-button {\n  border-style: solid;\n  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  height: var(--%NS%mat-button-outlined-container-height, 40px);\n  font-family: var(--%NS%mat-button-outlined-label-text-font, var(--%NS%mat-sys-label-large-font));\n  font-size: var(--%NS%mat-button-outlined-label-text-size, var(--%NS%mat-sys-label-large-size));\n  letter-spacing: var(--%NS%mat-button-outlined-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));\n  text-transform: var(--%NS%mat-button-outlined-label-text-transform);\n  font-weight: var(--%NS%mat-button-outlined-label-text-weight, var(--%NS%mat-sys-label-large-weight));\n  border-radius: var(--%NS%mat-button-outlined-container-shape, var(--%NS%mat-sys-corner-full));\n  border-width: var(--%NS%mat-button-outlined-outline-width, 1px);\n  padding: 0 var(--%NS%mat-button-outlined-horizontal-padding, 24px);\n}\n.mat-mdc-outlined-button > .mat-icon {\n  margin-right: var(--%NS%mat-button-outlined-icon-spacing, 8px);\n  margin-left: var(--%NS%mat-button-outlined-icon-offset, -8px);\n}\n[dir=rtl] .mat-mdc-outlined-button > .mat-icon {\n  margin-right: var(--%NS%mat-button-outlined-icon-offset, -8px);\n  margin-left: var(--%NS%mat-button-outlined-icon-spacing, 8px);\n}\n.mat-mdc-outlined-button .mdc-button__label + .mat-icon {\n  margin-right: var(--%NS%mat-button-outlined-icon-offset, -8px);\n  margin-left: var(--%NS%mat-button-outlined-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {\n  margin-right: var(--%NS%mat-button-outlined-icon-spacing, 8px);\n  margin-left: var(--%NS%mat-button-outlined-icon-offset, -8px);\n}\n.mat-mdc-outlined-button .mat-ripple-element {\n  background-color: var(--%NS%mat-button-outlined-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-button-outlined-state-layer-color, var(--%NS%mat-sys-primary));\n}\n.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-button-outlined-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-outlined-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-outlined-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-outlined-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-outlined-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-button-outlined-touch-target-size, 48px);\n  display: var(--%NS%mat-button-outlined-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n.mat-mdc-outlined-button:not(:disabled) {\n  color: var(--%NS%mat-button-outlined-label-text-color, var(--%NS%mat-sys-primary));\n  border-color: var(--%NS%mat-button-outlined-outline-color, var(--%NS%mat-sys-outline));\n}\n.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n  border-color: var(--%NS%mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-tonal-button {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  height: var(--%NS%mat-button-tonal-container-height, 40px);\n  font-family: var(--%NS%mat-button-tonal-label-text-font, var(--%NS%mat-sys-label-large-font));\n  font-size: var(--%NS%mat-button-tonal-label-text-size, var(--%NS%mat-sys-label-large-size));\n  letter-spacing: var(--%NS%mat-button-tonal-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));\n  text-transform: var(--%NS%mat-button-tonal-label-text-transform);\n  font-weight: var(--%NS%mat-button-tonal-label-text-weight, var(--%NS%mat-sys-label-large-weight));\n  padding: 0 var(--%NS%mat-button-tonal-horizontal-padding, 24px);\n}\n.mat-tonal-button:not(:disabled) {\n  color: var(--%NS%mat-button-tonal-label-text-color, var(--%NS%mat-sys-on-secondary-container));\n  background-color: var(--%NS%mat-button-tonal-container-color, var(--%NS%mat-sys-secondary-container));\n}\n.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {\n  border-radius: var(--%NS%mat-button-tonal-container-shape, var(--%NS%mat-sys-corner-full));\n}\n.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n  background-color: var(--%NS%mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));\n}\n.mat-tonal-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-tonal-button > .mat-icon {\n  margin-right: var(--%NS%mat-button-tonal-icon-spacing, 8px);\n  margin-left: var(--%NS%mat-button-tonal-icon-offset, -8px);\n}\n[dir=rtl] .mat-tonal-button > .mat-icon {\n  margin-right: var(--%NS%mat-button-tonal-icon-offset, -8px);\n  margin-left: var(--%NS%mat-button-tonal-icon-spacing, 8px);\n}\n.mat-tonal-button .mdc-button__label + .mat-icon {\n  margin-right: var(--%NS%mat-button-tonal-icon-offset, -8px);\n  margin-left: var(--%NS%mat-button-tonal-icon-spacing, 8px);\n}\n[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {\n  margin-right: var(--%NS%mat-button-tonal-icon-spacing, 8px);\n  margin-left: var(--%NS%mat-button-tonal-icon-offset, -8px);\n}\n.mat-tonal-button .mat-ripple-element {\n  background-color: var(--%NS%mat-button-tonal-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-secondary-container) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-tonal-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-button-tonal-state-layer-color, var(--%NS%mat-sys-on-secondary-container));\n}\n.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-button-tonal-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-tonal-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-tonal-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-tonal-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n.mat-tonal-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-button-tonal-touch-target-size, 48px);\n  display: var(--%NS%mat-button-tonal-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n\n.mat-mdc-button,\n.mat-mdc-unelevated-button,\n.mat-mdc-raised-button,\n.mat-mdc-outlined-button,\n.mat-tonal-button {\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-button .mat-mdc-button-ripple,\n.mat-mdc-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-unelevated-button .mat-mdc-button-ripple,\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-raised-button .mat-mdc-button-ripple,\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-outlined-button .mat-mdc-button-ripple,\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,\n.mat-tonal-button .mat-mdc-button-ripple,\n.mat-tonal-button .mat-mdc-button-persistent-ripple,\n.mat-tonal-button .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-button .mat-mdc-button-ripple,\n.mat-mdc-unelevated-button .mat-mdc-button-ripple,\n.mat-mdc-raised-button .mat-mdc-button-ripple,\n.mat-mdc-outlined-button .mat-mdc-button-ripple,\n.mat-tonal-button .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,\n.mat-tonal-button .mat-mdc-button-persistent-ripple::before {\n  content: \"\";\n  opacity: 0;\n}\n.mat-mdc-button .mdc-button__label,\n.mat-mdc-button .mat-icon,\n.mat-mdc-unelevated-button .mdc-button__label,\n.mat-mdc-unelevated-button .mat-icon,\n.mat-mdc-raised-button .mdc-button__label,\n.mat-mdc-raised-button .mat-icon,\n.mat-mdc-outlined-button .mdc-button__label,\n.mat-mdc-outlined-button .mat-icon,\n.mat-tonal-button .mdc-button__label,\n.mat-tonal-button .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-button .mat-focus-indicator,\n.mat-mdc-unelevated-button .mat-focus-indicator,\n.mat-mdc-raised-button .mat-focus-indicator,\n.mat-mdc-outlined-button .mat-focus-indicator,\n.mat-tonal-button .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  border-radius: inherit;\n}\n.mat-mdc-button:focus-visible > .mat-focus-indicator::before,\n.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,\n.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,\n.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,\n.mat-tonal-button:focus-visible > .mat-focus-indicator::before {\n  content: \"\";\n  border-radius: inherit;\n}\n.mat-mdc-button._mat-animation-noopable,\n.mat-mdc-unelevated-button._mat-animation-noopable,\n.mat-mdc-raised-button._mat-animation-noopable,\n.mat-mdc-outlined-button._mat-animation-noopable,\n.mat-tonal-button._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-button > .mat-icon,\n.mat-mdc-unelevated-button > .mat-icon,\n.mat-mdc-raised-button > .mat-icon,\n.mat-mdc-outlined-button > .mat-icon,\n.mat-tonal-button > .mat-icon {\n  display: inline-block;\n  position: relative;\n  vertical-align: top;\n  font-size: 1.125rem;\n  height: 1.125rem;\n  width: 1.125rem;\n}\n\n.mat-mdc-outlined-button .mat-mdc-button-ripple,\n.mat-mdc-outlined-button .mdc-button__ripple {\n  top: -1px;\n  left: -1px;\n  bottom: -1px;\n  right: -1px;\n}\n\n.mat-mdc-unelevated-button .mat-focus-indicator::before,\n.mat-tonal-button .mat-focus-indicator::before,\n.mat-mdc-raised-button .mat-focus-indicator::before {\n  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px) * -1);\n}\n\n.mat-mdc-outlined-button .mat-focus-indicator::before {\n  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 3px) * -1);\n}\n\n.mat-mdc-button-progress-indicator-container {\n  position: absolute;\n  inset-inline-start: 0;\n  inset-block-start: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n\n.mat-mdc-button-progress-indicator-shown mat-icon,\n.mat-mdc-button-progress-indicator-shown [matButtonIcon],\n.mat-mdc-button-progress-indicator-shown .mdc-button__label {\n  visibility: hidden;\n}\n", "@media (forced-colors: active) {\n  .mat-mdc-button:not(.mdc-button--outlined),\n  .mat-mdc-unelevated-button:not(.mdc-button--outlined),\n  .mat-mdc-raised-button:not(.mdc-button--outlined),\n  .mat-mdc-outlined-button:not(.mdc-button--outlined),\n  .mat-mdc-button-base.mat-tonal-button,\n  .mat-mdc-icon-button.mat-mdc-icon-button,\n  .mat-mdc-outlined-button .mdc-button__ripple {\n    outline: solid 1px;\n  }\n}\n"],
			encapsulation: 2
		});
	})();
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatButton, [{
		type: Component,
		args: [{
			selector: `
    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],
    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],
    a[mat-flat-button], a[mat-stroked-button]
  `,
			host: { "class": "mdc-button" },
			exportAs: "matButton, matAnchor",
			encapsulation: ViewEncapsulation.None,
			template: "<span\n  class=\"mat-mdc-button-persistent-ripple\"\n  [class.mdc-button__ripple]=\"!_isFab\"\n  [class.mdc-fab__ripple]=\"_isFab\"\n></span>\n\n<ng-content\n  select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd]), .material-symbols-outlined:not([iconPositionEnd]), .material-symbols-rounded:not([iconPositionEnd]), .material-symbols-sharp:not([iconPositionEnd])\"\n>\n</ng-content>\n\n<span class=\"mdc-button__label\"><ng-content></ng-content></span>\n\n<ng-content\n  select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd], .material-symbols-outlined[iconPositionEnd], .material-symbols-rounded[iconPositionEnd], .material-symbols-sharp[iconPositionEnd]\"\n>\n</ng-content>\n\n@if (showProgress()) {\n  <div class=\"mat-mdc-button-progress-indicator-container\">\n    <ng-content select=\"[progressIndicator]\" />\n  </div>\n}\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<span class=\"mat-focus-indicator\"></span>\n\n<span class=\"mat-mdc-button-touch-target\"></span>\n",
			styles: [".mat-mdc-button-base {\n  text-decoration: none;\n}\n.mat-mdc-button-base .mat-icon {\n  min-height: fit-content;\n  flex-shrink: 0;\n}\n@media (hover: none) {\n  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {\n    opacity: 0;\n  }\n}\n\n.mdc-button {\n  -webkit-user-select: none;\n  user-select: none;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  min-width: 64px;\n  border: none;\n  outline: none;\n  line-height: inherit;\n  -webkit-appearance: none;\n  overflow: visible;\n  vertical-align: middle;\n  background: transparent;\n  padding: 0 8px;\n}\n.mdc-button::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n.mdc-button:active {\n  outline: none;\n}\n.mdc-button:hover {\n  cursor: pointer;\n}\n.mdc-button:disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mdc-button[hidden] {\n  display: none;\n}\n.mdc-button .mdc-button__label {\n  position: relative;\n}\n\n.mat-mdc-button {\n  padding: 0 var(--mat-button-text-horizontal-padding, 12px);\n  height: var(--mat-button-text-container-height, 40px);\n  font-family: var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));\n  letter-spacing: var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));\n  text-transform: var(--mat-button-text-label-text-transform);\n  font-weight: var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight));\n}\n.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {\n  border-radius: var(--mat-button-text-container-shape, var(--mat-sys-corner-full));\n}\n.mat-mdc-button:not(:disabled) {\n  color: var(--mat-button-text-label-text-color, var(--mat-sys-primary));\n}\n.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-mdc-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-button:has(.material-icons, .material-symbols-outlined, .material-symbols-rounded,\n.material-symbols-sharp, mat-icon, [matButtonIcon]) {\n  padding: 0 var(--mat-button-text-with-icon-horizontal-padding, 16px);\n}\n.mat-mdc-button > .mat-icon {\n  margin-right: var(--mat-button-text-icon-spacing, 8px);\n  margin-left: var(--mat-button-text-icon-offset, -4px);\n}\n[dir=rtl] .mat-mdc-button > .mat-icon {\n  margin-right: var(--mat-button-text-icon-offset, -4px);\n  margin-left: var(--mat-button-text-icon-spacing, 8px);\n}\n.mat-mdc-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-text-icon-offset, -4px);\n  margin-left: var(--mat-button-text-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-text-icon-spacing, 8px);\n  margin-left: var(--mat-button-text-icon-offset, -4px);\n}\n.mat-mdc-button .mat-ripple-element {\n  background-color: var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-text-state-layer-color, var(--mat-sys-primary));\n}\n.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-button-text-touch-target-size, 48px);\n  display: var(--mat-button-text-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n\n.mat-mdc-unelevated-button {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  height: var(--mat-button-filled-container-height, 40px);\n  font-family: var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));\n  letter-spacing: var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));\n  text-transform: var(--mat-button-filled-label-text-transform);\n  font-weight: var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));\n  padding: 0 var(--mat-button-filled-horizontal-padding, 24px);\n}\n.mat-mdc-unelevated-button > .mat-icon {\n  margin-right: var(--mat-button-filled-icon-spacing, 8px);\n  margin-left: var(--mat-button-filled-icon-offset, -8px);\n}\n[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {\n  margin-right: var(--mat-button-filled-icon-offset, -8px);\n  margin-left: var(--mat-button-filled-icon-spacing, 8px);\n}\n.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-filled-icon-offset, -8px);\n  margin-left: var(--mat-button-filled-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-filled-icon-spacing, 8px);\n  margin-left: var(--mat-button-filled-icon-offset, -8px);\n}\n.mat-mdc-unelevated-button .mat-ripple-element {\n  background-color: var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary));\n}\n.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-unelevated-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-button-filled-touch-target-size, 48px);\n  display: var(--mat-button-filled-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n.mat-mdc-unelevated-button:not(:disabled) {\n  color: var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));\n  background-color: var(--mat-button-filled-container-color, var(--mat-sys-primary));\n}\n.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {\n  border-radius: var(--mat-button-filled-container-shape, var(--mat-sys-corner-full));\n}\n.mat-mdc-unelevated-button .mat-mdc-button-progress-indicator-container {\n  --mat-progress-spinner-active-indicator-color: var(--mat-button-filled-progress-active-indicator-color, var(--mat-sys-on-primary));\n}\n.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-raised-button {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));\n  height: var(--mat-button-protected-container-height, 40px);\n  font-family: var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));\n  letter-spacing: var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));\n  text-transform: var(--mat-button-protected-label-text-transform);\n  font-weight: var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));\n  padding: 0 var(--mat-button-protected-horizontal-padding, 24px);\n}\n.mat-mdc-raised-button > .mat-icon {\n  margin-right: var(--mat-button-protected-icon-spacing, 8px);\n  margin-left: var(--mat-button-protected-icon-offset, -8px);\n}\n[dir=rtl] .mat-mdc-raised-button > .mat-icon {\n  margin-right: var(--mat-button-protected-icon-offset, -8px);\n  margin-left: var(--mat-button-protected-icon-spacing, 8px);\n}\n.mat-mdc-raised-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-protected-icon-offset, -8px);\n  margin-left: var(--mat-button-protected-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-protected-icon-spacing, 8px);\n  margin-left: var(--mat-button-protected-icon-offset, -8px);\n}\n.mat-mdc-raised-button .mat-ripple-element {\n  background-color: var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-protected-state-layer-color, var(--mat-sys-primary));\n}\n.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-raised-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-button-protected-touch-target-size, 48px);\n  display: var(--mat-button-protected-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n.mat-mdc-raised-button:not(:disabled) {\n  color: var(--mat-button-protected-label-text-color, var(--mat-sys-primary));\n  background-color: var(--mat-button-protected-container-color, var(--mat-sys-surface));\n}\n.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {\n  border-radius: var(--mat-button-protected-container-shape, var(--mat-sys-corner-full));\n}\n@media (hover: hover) {\n  .mat-mdc-raised-button:hover {\n    box-shadow: var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2));\n  }\n}\n.mat-mdc-raised-button:focus {\n  box-shadow: var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1));\n}\n.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {\n  box-shadow: var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1));\n}\n.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {\n  box-shadow: var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0));\n}\n.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-outlined-button {\n  border-style: solid;\n  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  height: var(--mat-button-outlined-container-height, 40px);\n  font-family: var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));\n  letter-spacing: var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));\n  text-transform: var(--mat-button-outlined-label-text-transform);\n  font-weight: var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));\n  border-radius: var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));\n  border-width: var(--mat-button-outlined-outline-width, 1px);\n  padding: 0 var(--mat-button-outlined-horizontal-padding, 24px);\n}\n.mat-mdc-outlined-button > .mat-icon {\n  margin-right: var(--mat-button-outlined-icon-spacing, 8px);\n  margin-left: var(--mat-button-outlined-icon-offset, -8px);\n}\n[dir=rtl] .mat-mdc-outlined-button > .mat-icon {\n  margin-right: var(--mat-button-outlined-icon-offset, -8px);\n  margin-left: var(--mat-button-outlined-icon-spacing, 8px);\n}\n.mat-mdc-outlined-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-outlined-icon-offset, -8px);\n  margin-left: var(--mat-button-outlined-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-outlined-icon-spacing, 8px);\n  margin-left: var(--mat-button-outlined-icon-offset, -8px);\n}\n.mat-mdc-outlined-button .mat-ripple-element {\n  background-color: var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary));\n}\n.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-outlined-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-button-outlined-touch-target-size, 48px);\n  display: var(--mat-button-outlined-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n.mat-mdc-outlined-button:not(:disabled) {\n  color: var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));\n  border-color: var(--mat-button-outlined-outline-color, var(--mat-sys-outline));\n}\n.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  border-color: var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-tonal-button {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  height: var(--mat-button-tonal-container-height, 40px);\n  font-family: var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));\n  letter-spacing: var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));\n  text-transform: var(--mat-button-tonal-label-text-transform);\n  font-weight: var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));\n  padding: 0 var(--mat-button-tonal-horizontal-padding, 24px);\n}\n.mat-tonal-button:not(:disabled) {\n  color: var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));\n  background-color: var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container));\n}\n.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {\n  border-radius: var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full));\n}\n.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-tonal-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-tonal-button > .mat-icon {\n  margin-right: var(--mat-button-tonal-icon-spacing, 8px);\n  margin-left: var(--mat-button-tonal-icon-offset, -8px);\n}\n[dir=rtl] .mat-tonal-button > .mat-icon {\n  margin-right: var(--mat-button-tonal-icon-offset, -8px);\n  margin-left: var(--mat-button-tonal-icon-spacing, 8px);\n}\n.mat-tonal-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-tonal-icon-offset, -8px);\n  margin-left: var(--mat-button-tonal-icon-spacing, 8px);\n}\n[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-tonal-icon-spacing, 8px);\n  margin-left: var(--mat-button-tonal-icon-offset, -8px);\n}\n.mat-tonal-button .mat-ripple-element {\n  background-color: var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-tonal-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container));\n}\n.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-tonal-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-button-tonal-touch-target-size, 48px);\n  display: var(--mat-button-tonal-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n\n.mat-mdc-button,\n.mat-mdc-unelevated-button,\n.mat-mdc-raised-button,\n.mat-mdc-outlined-button,\n.mat-tonal-button {\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-button .mat-mdc-button-ripple,\n.mat-mdc-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-unelevated-button .mat-mdc-button-ripple,\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-raised-button .mat-mdc-button-ripple,\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-outlined-button .mat-mdc-button-ripple,\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,\n.mat-tonal-button .mat-mdc-button-ripple,\n.mat-tonal-button .mat-mdc-button-persistent-ripple,\n.mat-tonal-button .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-button .mat-mdc-button-ripple,\n.mat-mdc-unelevated-button .mat-mdc-button-ripple,\n.mat-mdc-raised-button .mat-mdc-button-ripple,\n.mat-mdc-outlined-button .mat-mdc-button-ripple,\n.mat-tonal-button .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,\n.mat-tonal-button .mat-mdc-button-persistent-ripple::before {\n  content: \"\";\n  opacity: 0;\n}\n.mat-mdc-button .mdc-button__label,\n.mat-mdc-button .mat-icon,\n.mat-mdc-unelevated-button .mdc-button__label,\n.mat-mdc-unelevated-button .mat-icon,\n.mat-mdc-raised-button .mdc-button__label,\n.mat-mdc-raised-button .mat-icon,\n.mat-mdc-outlined-button .mdc-button__label,\n.mat-mdc-outlined-button .mat-icon,\n.mat-tonal-button .mdc-button__label,\n.mat-tonal-button .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-button .mat-focus-indicator,\n.mat-mdc-unelevated-button .mat-focus-indicator,\n.mat-mdc-raised-button .mat-focus-indicator,\n.mat-mdc-outlined-button .mat-focus-indicator,\n.mat-tonal-button .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  border-radius: inherit;\n}\n.mat-mdc-button:focus-visible > .mat-focus-indicator::before,\n.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,\n.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,\n.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,\n.mat-tonal-button:focus-visible > .mat-focus-indicator::before {\n  content: \"\";\n  border-radius: inherit;\n}\n.mat-mdc-button._mat-animation-noopable,\n.mat-mdc-unelevated-button._mat-animation-noopable,\n.mat-mdc-raised-button._mat-animation-noopable,\n.mat-mdc-outlined-button._mat-animation-noopable,\n.mat-tonal-button._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-button > .mat-icon,\n.mat-mdc-unelevated-button > .mat-icon,\n.mat-mdc-raised-button > .mat-icon,\n.mat-mdc-outlined-button > .mat-icon,\n.mat-tonal-button > .mat-icon {\n  display: inline-block;\n  position: relative;\n  vertical-align: top;\n  font-size: 1.125rem;\n  height: 1.125rem;\n  width: 1.125rem;\n}\n\n.mat-mdc-outlined-button .mat-mdc-button-ripple,\n.mat-mdc-outlined-button .mdc-button__ripple {\n  top: -1px;\n  left: -1px;\n  bottom: -1px;\n  right: -1px;\n}\n\n.mat-mdc-unelevated-button .mat-focus-indicator::before,\n.mat-tonal-button .mat-focus-indicator::before,\n.mat-mdc-raised-button .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);\n}\n\n.mat-mdc-outlined-button .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);\n}\n\n.mat-mdc-button-progress-indicator-container {\n  position: absolute;\n  inset-inline-start: 0;\n  inset-block-start: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n\n.mat-mdc-button-progress-indicator-shown mat-icon,\n.mat-mdc-button-progress-indicator-shown [matButtonIcon],\n.mat-mdc-button-progress-indicator-shown .mdc-button__label {\n  visibility: hidden;\n}\n", "@media (forced-colors: active) {\n  .mat-mdc-button:not(.mdc-button--outlined),\n  .mat-mdc-unelevated-button:not(.mdc-button--outlined),\n  .mat-mdc-raised-button:not(.mdc-button--outlined),\n  .mat-mdc-outlined-button:not(.mdc-button--outlined),\n  .mat-mdc-button-base.mat-tonal-button,\n  .mat-mdc-icon-button.mat-mdc-icon-button,\n  .mat-mdc-outlined-button .mdc-button__ripple {\n    outline: solid 1px;\n  }\n}\n"]
		}]
	}], () => [], { appearance: [{
		type: Input,
		args: ["matButton"]
	}] });
})();
function _inferAppearance(button) {
	if (button.hasAttribute("mat-raised-button")) return "elevated";
	if (button.hasAttribute("mat-stroked-button")) return "outlined";
	if (button.hasAttribute("mat-flat-button")) return "filled";
	if (button.hasAttribute("mat-button")) return "text";
	return null;
}
var MAT_FAB_DEFAULT_OPTIONS = new InjectionToken("mat-mdc-fab-default-options", {
	providedIn: "root",
	factory: () => defaults
});
var defaults = { color: "accent" };
var MatFabButton = class MatFabButton extends MatButtonBase {
	_options = inject(MAT_FAB_DEFAULT_OPTIONS, { optional: true });
	_isFab = true;
	extended = false;
	constructor() {
		super();
		this._options = this._options || defaults;
		this.color = this._options.color || defaults.color;
	}
	static ɵfac = function MatFabButton_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatFabButton)();
	};
	static ɵcmp = (function() {
		const _c0 = [
			[
				[
					"",
					8,
					"material-icons",
					3,
					"iconPositionEnd",
					""
				],
				[
					"mat-icon",
					3,
					"iconPositionEnd",
					""
				],
				[
					"",
					"matButtonIcon",
					"",
					3,
					"iconPositionEnd",
					""
				],
				[
					"",
					8,
					"material-symbols-outlined",
					3,
					"iconPositionEnd",
					""
				],
				[
					"",
					8,
					"material-symbols-rounded",
					3,
					"iconPositionEnd",
					""
				],
				[
					"",
					8,
					"material-symbols-sharp",
					3,
					"iconPositionEnd",
					""
				]
			],
			"*",
			[
				[
					"",
					"iconPositionEnd",
					"",
					8,
					"material-icons"
				],
				[
					"mat-icon",
					"iconPositionEnd",
					""
				],
				[
					"",
					"matButtonIcon",
					"",
					"iconPositionEnd",
					""
				],
				[
					"",
					"iconPositionEnd",
					"",
					8,
					"material-symbols-outlined"
				],
				[
					"",
					"iconPositionEnd",
					"",
					8,
					"material-symbols-rounded"
				],
				[
					"",
					"iconPositionEnd",
					"",
					8,
					"material-symbols-sharp"
				]
			],
			[[
				"",
				"progressIndicator",
				""
			]]
		];
		const _c1 = [
			".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd]), .material-symbols-outlined:not([iconPositionEnd]), .material-symbols-rounded:not([iconPositionEnd]), .material-symbols-sharp:not([iconPositionEnd])",
			"*",
			".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd], .material-symbols-outlined[iconPositionEnd], .material-symbols-rounded[iconPositionEnd], .material-symbols-sharp[iconPositionEnd]",
			"[progressIndicator]"
		];
		function MatFabButton_Conditional_5_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵdomElementStart(0, "div", 2);
				ɵɵprojection(1, 3);
				ɵɵdomElementEnd();
			}
		}
		return /*@__PURE__*/ ɵɵdefineComponent({
			type: MatFabButton,
			selectors: [
				[
					"button",
					"mat-fab",
					""
				],
				[
					"a",
					"mat-fab",
					""
				],
				[
					"button",
					"matFab",
					""
				],
				[
					"a",
					"matFab",
					""
				]
			],
			hostAttrs: [
				1,
				"mdc-fab",
				"mat-mdc-fab-base",
				"mat-mdc-fab"
			],
			hostVars: 4,
			hostBindings: function MatFabButton_HostBindings(rf, ctx) {
				if (rf & 2) ɵɵclassProp("mdc-fab--extended", ctx.extended)("mat-mdc-extended-fab", ctx.extended);
			},
			inputs: { extended: [
				2,
				"extended",
				"extended",
				booleanAttribute
			] },
			exportAs: ["matButton", "matAnchor"],
			features: [ɵɵInheritDefinitionFeature],
			ngContentSelectors: _c1,
			decls: 8,
			vars: 5,
			consts: [
				[1, "mat-mdc-button-persistent-ripple"],
				[1, "mdc-button__label"],
				[1, "mat-mdc-button-progress-indicator-container"],
				[1, "mat-focus-indicator"],
				[1, "mat-mdc-button-touch-target"]
			],
			template: function MatFabButton_Template(rf, ctx) {
				if (rf & 1) {
					ɵɵprojectionDef(_c0);
					ɵɵdomElement(0, "span", 0);
					ɵɵprojection(1);
					ɵɵdomElementStart(2, "span", 1);
					ɵɵprojection(3, 1);
					ɵɵdomElementEnd();
					ɵɵprojection(4, 2);
					ɵɵconditionalCreate(5, MatFabButton_Conditional_5_Template, 2, 0, "div", 2);
					ɵɵdomElement(6, "span", 3)(7, "span", 4);
				}
				if (rf & 2) {
					ɵɵclassProp("mdc-button__ripple", !ctx._isFab)("mdc-fab__ripple", ctx._isFab);
					ɵɵadvance(5);
					ɵɵconditional(ctx.showProgress() ? 5 : -1);
				}
			},
			styles: [".mat-mdc-fab-base {\n  -webkit-user-select: none;\n  user-select: none;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  width: 56px;\n  height: 56px;\n  padding: 0;\n  border: none;\n  fill: currentColor;\n  text-decoration: none;\n  cursor: pointer;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  overflow: visible;\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  flex-shrink: 0;\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  content: \"\";\n  opacity: 0;\n}\n.mat-mdc-fab-base .mdc-button__label,\n.mat-mdc-fab-base .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-fab-base .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n}\n.mat-mdc-fab-base:focus-visible > .mat-focus-indicator::before {\n  content: \"\";\n}\n.mat-mdc-fab-base._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-fab-base::before {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border: 1px solid transparent;\n  border-radius: inherit;\n  content: \"\";\n  pointer-events: none;\n}\n.mat-mdc-fab-base[hidden] {\n  display: none;\n}\n.mat-mdc-fab-base::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n.mat-mdc-fab-base:active, .mat-mdc-fab-base:focus {\n  outline: none;\n}\n.mat-mdc-fab-base:hover {\n  cursor: pointer;\n}\n.mat-mdc-fab-base > svg {\n  width: 100%;\n}\n.mat-mdc-fab-base .mat-icon,\n.mat-mdc-fab-base .material-icons,\n.mat-mdc-fab-base .material-symbols-outlined,\n.mat-mdc-fab-base .material-symbols-rounded,\n.mat-mdc-fab-base .material-symbols-sharp {\n  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);\n  fill: currentColor;\n  will-change: transform;\n}\n.mat-mdc-fab-base .mat-focus-indicator::before {\n  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px) * -1);\n  border-radius: calc(var(--%NS%mat-fab-container-shape, var(--%NS%mat-sys-corner-large)) + calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px));\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base[disabled]:focus, .mat-mdc-fab-base.mat-mdc-button-disabled, .mat-mdc-fab-base.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-fab-base.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-fab {\n  background-color: var(--%NS%mat-fab-container-color, var(--%NS%mat-sys-primary-container));\n  border-radius: var(--%NS%mat-fab-container-shape, var(--%NS%mat-sys-corner-large));\n  color: var(--%NS%mat-fab-foreground-color, var(--%NS%mat-sys-on-primary-container, inherit));\n  box-shadow: var(--%NS%mat-fab-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-fab:hover {\n    box-shadow: var(--%NS%mat-fab-hover-container-elevation-shadow, var(--%NS%mat-sys-level4));\n  }\n}\n.mat-mdc-fab:focus {\n  box-shadow: var(--%NS%mat-fab-focus-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-fab:active, .mat-mdc-fab:focus:active {\n  box-shadow: var(--%NS%mat-fab-pressed-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-fab[disabled], .mat-mdc-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n  background-color: var(--%NS%mat-fab-disabled-state-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-fab-touch-target-size, 48px);\n  display: var(--%NS%mat-fab-touch-target-display, block);\n  left: 50%;\n  width: var(--%NS%mat-fab-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-fab .mat-ripple-element {\n  background-color: var(--%NS%mat-fab-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-primary-container) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-fab-state-layer-color, var(--%NS%mat-sys-on-primary-container));\n}\n.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-fab-disabled-state-layer-color);\n}\n.mat-mdc-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-mini-fab {\n  width: 40px;\n  height: 40px;\n  background-color: var(--%NS%mat-fab-small-container-color, var(--%NS%mat-sys-primary-container));\n  border-radius: var(--%NS%mat-fab-small-container-shape, var(--%NS%mat-sys-corner-medium));\n  color: var(--%NS%mat-fab-small-foreground-color, var(--%NS%mat-sys-on-primary-container, inherit));\n  box-shadow: var(--%NS%mat-fab-small-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-mini-fab:hover {\n    box-shadow: var(--%NS%mat-fab-small-hover-container-elevation-shadow, var(--%NS%mat-sys-level4));\n  }\n}\n.mat-mdc-mini-fab:focus {\n  box-shadow: var(--%NS%mat-fab-small-focus-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-mini-fab:active, .mat-mdc-mini-fab:focus:active {\n  box-shadow: var(--%NS%mat-fab-small-pressed-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-mini-fab .mat-focus-indicator::before {\n  border-radius: calc(var(--%NS%mat-fab-small-container-shape, var(--%NS%mat-sys-corner-medium)) + calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px));\n}\n.mat-mdc-mini-fab[disabled], .mat-mdc-mini-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n  background-color: var(--%NS%mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-mini-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-fab-small-touch-target-size, 48px);\n  display: var(--%NS%mat-fab-small-touch-target-display);\n  left: 50%;\n  width: var(--%NS%mat-fab-small-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-mini-fab .mat-ripple-element {\n  background-color: var(--%NS%mat-fab-small-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-primary-container) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-fab-small-state-layer-color, var(--%NS%mat-sys-on-primary-container));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-fab-small-disabled-state-layer-color);\n}\n.mat-mdc-mini-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-small-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-mini-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-small-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-mini-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-small-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-extended-fab {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  padding-left: 20px;\n  padding-right: 20px;\n  width: auto;\n  max-width: 100%;\n  line-height: normal;\n  box-shadow: var(--%NS%mat-fab-extended-container-elevation-shadow, var(--%NS%mat-sys-level3));\n  height: var(--%NS%mat-fab-extended-container-height, 56px);\n  border-radius: var(--%NS%mat-fab-extended-container-shape, var(--%NS%mat-sys-corner-large));\n  font-family: var(--%NS%mat-fab-extended-label-text-font, var(--%NS%mat-sys-label-large-font));\n  font-size: var(--%NS%mat-fab-extended-label-text-size, var(--%NS%mat-sys-label-large-size));\n  font-weight: var(--%NS%mat-fab-extended-label-text-weight, var(--%NS%mat-sys-label-large-weight));\n  letter-spacing: var(--%NS%mat-fab-extended-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));\n}\n@media (hover: hover) {\n  .mat-mdc-extended-fab:hover {\n    box-shadow: var(--%NS%mat-fab-extended-hover-container-elevation-shadow, var(--%NS%mat-sys-level4));\n  }\n}\n.mat-mdc-extended-fab:focus {\n  box-shadow: var(--%NS%mat-fab-extended-focus-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-extended-fab:active, .mat-mdc-extended-fab:focus:active {\n  box-shadow: var(--%NS%mat-fab-extended-pressed-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab[disabled]:focus, .mat-mdc-extended-fab.mat-mdc-button-disabled, .mat-mdc-extended-fab.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n[dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .mat-icon, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-icons, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-outlined, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-rounded, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-sharp,\n.mat-mdc-extended-fab > .mat-icon,\n.mat-mdc-extended-fab > .material-icons,\n.mat-mdc-extended-fab > .material-symbols-outlined,\n.mat-mdc-extended-fab > .material-symbols-rounded,\n.mat-mdc-extended-fab > .material-symbols-sharp {\n  margin-left: -8px;\n  margin-right: 12px;\n}\n.mat-mdc-extended-fab .mdc-button__label + .mat-icon,\n.mat-mdc-extended-fab .mdc-button__label + .material-icons,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-outlined,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-rounded,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-sharp, [dir=rtl] .mat-mdc-extended-fab > .mat-icon, [dir=rtl] .mat-mdc-extended-fab > .material-icons, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-outlined, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-rounded, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-sharp {\n  margin-left: 12px;\n  margin-right: -8px;\n}\n.mat-mdc-extended-fab .mat-mdc-button-touch-target {\n  width: 100%;\n}\n\n.mat-mdc-button-progress-indicator-container {\n  position: absolute;\n  inset-inline-start: 0;\n  margin-block-start: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n\n.mat-mdc-button-progress-indicator-shown mat-icon,\n.mat-mdc-button-progress-indicator-shown [matButtonIcon],\n.mat-mdc-button-progress-indicator-shown .mdc-button__label {\n  visibility: hidden;\n}\n"],
			encapsulation: 2
		});
	})();
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFabButton, [{
		type: Component,
		args: [{
			selector: `button[mat-fab], a[mat-fab], button[matFab], a[matFab]`,
			host: {
				"class": "mdc-fab mat-mdc-fab-base mat-mdc-fab",
				"[class.mdc-fab--extended]": "extended",
				"[class.mat-mdc-extended-fab]": "extended"
			},
			exportAs: "matButton, matAnchor",
			encapsulation: ViewEncapsulation.None,
			template: "<span\n  class=\"mat-mdc-button-persistent-ripple\"\n  [class.mdc-button__ripple]=\"!_isFab\"\n  [class.mdc-fab__ripple]=\"_isFab\"\n></span>\n\n<ng-content\n  select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd]), .material-symbols-outlined:not([iconPositionEnd]), .material-symbols-rounded:not([iconPositionEnd]), .material-symbols-sharp:not([iconPositionEnd])\"\n>\n</ng-content>\n\n<span class=\"mdc-button__label\"><ng-content></ng-content></span>\n\n<ng-content\n  select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd], .material-symbols-outlined[iconPositionEnd], .material-symbols-rounded[iconPositionEnd], .material-symbols-sharp[iconPositionEnd]\"\n>\n</ng-content>\n\n@if (showProgress()) {\n  <div class=\"mat-mdc-button-progress-indicator-container\">\n    <ng-content select=\"[progressIndicator]\" />\n  </div>\n}\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<span class=\"mat-focus-indicator\"></span>\n\n<span class=\"mat-mdc-button-touch-target\"></span>\n",
			styles: [".mat-mdc-fab-base {\n  -webkit-user-select: none;\n  user-select: none;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  width: 56px;\n  height: 56px;\n  padding: 0;\n  border: none;\n  fill: currentColor;\n  text-decoration: none;\n  cursor: pointer;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  overflow: visible;\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  flex-shrink: 0;\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  content: \"\";\n  opacity: 0;\n}\n.mat-mdc-fab-base .mdc-button__label,\n.mat-mdc-fab-base .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-fab-base .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n}\n.mat-mdc-fab-base:focus-visible > .mat-focus-indicator::before {\n  content: \"\";\n}\n.mat-mdc-fab-base._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-fab-base::before {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border: 1px solid transparent;\n  border-radius: inherit;\n  content: \"\";\n  pointer-events: none;\n}\n.mat-mdc-fab-base[hidden] {\n  display: none;\n}\n.mat-mdc-fab-base::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n.mat-mdc-fab-base:active, .mat-mdc-fab-base:focus {\n  outline: none;\n}\n.mat-mdc-fab-base:hover {\n  cursor: pointer;\n}\n.mat-mdc-fab-base > svg {\n  width: 100%;\n}\n.mat-mdc-fab-base .mat-icon,\n.mat-mdc-fab-base .material-icons,\n.mat-mdc-fab-base .material-symbols-outlined,\n.mat-mdc-fab-base .material-symbols-rounded,\n.mat-mdc-fab-base .material-symbols-sharp {\n  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);\n  fill: currentColor;\n  will-change: transform;\n}\n.mat-mdc-fab-base .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);\n  border-radius: calc(var(--mat-fab-container-shape, var(--mat-sys-corner-large)) + calc(var(--mat-focus-indicator-border-width, 3px) + 2px));\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base[disabled]:focus, .mat-mdc-fab-base.mat-mdc-button-disabled, .mat-mdc-fab-base.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-fab-base.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-fab {\n  background-color: var(--mat-fab-container-color, var(--mat-sys-primary-container));\n  border-radius: var(--mat-fab-container-shape, var(--mat-sys-corner-large));\n  color: var(--mat-fab-foreground-color, var(--mat-sys-on-primary-container, inherit));\n  box-shadow: var(--mat-fab-container-elevation-shadow, var(--mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-fab:hover {\n    box-shadow: var(--mat-fab-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-fab:focus {\n  box-shadow: var(--mat-fab-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-fab:active, .mat-mdc-fab:focus:active {\n  box-shadow: var(--mat-fab-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-fab[disabled], .mat-mdc-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-fab-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-fab-touch-target-size, 48px);\n  display: var(--mat-fab-touch-target-display, block);\n  left: 50%;\n  width: var(--mat-fab-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-fab .mat-ripple-element {\n  background-color: var(--mat-fab-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container));\n}\n.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-disabled-state-layer-color);\n}\n.mat-mdc-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-mini-fab {\n  width: 40px;\n  height: 40px;\n  background-color: var(--mat-fab-small-container-color, var(--mat-sys-primary-container));\n  border-radius: var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium));\n  color: var(--mat-fab-small-foreground-color, var(--mat-sys-on-primary-container, inherit));\n  box-shadow: var(--mat-fab-small-container-elevation-shadow, var(--mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-mini-fab:hover {\n    box-shadow: var(--mat-fab-small-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-mini-fab:focus {\n  box-shadow: var(--mat-fab-small-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-mini-fab:active, .mat-mdc-mini-fab:focus:active {\n  box-shadow: var(--mat-fab-small-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-mini-fab .mat-focus-indicator::before {\n  border-radius: calc(var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium)) + calc(var(--mat-focus-indicator-border-width, 3px) + 2px));\n}\n.mat-mdc-mini-fab[disabled], .mat-mdc-mini-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-mini-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-fab-small-touch-target-size, 48px);\n  display: var(--mat-fab-small-touch-target-display);\n  left: 50%;\n  width: var(--mat-fab-small-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-mini-fab .mat-ripple-element {\n  background-color: var(--mat-fab-small-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-small-state-layer-color, var(--mat-sys-on-primary-container));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-small-disabled-state-layer-color);\n}\n.mat-mdc-mini-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-mini-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-mini-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-extended-fab {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  padding-left: 20px;\n  padding-right: 20px;\n  width: auto;\n  max-width: 100%;\n  line-height: normal;\n  box-shadow: var(--mat-fab-extended-container-elevation-shadow, var(--mat-sys-level3));\n  height: var(--mat-fab-extended-container-height, 56px);\n  border-radius: var(--mat-fab-extended-container-shape, var(--mat-sys-corner-large));\n  font-family: var(--mat-fab-extended-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-fab-extended-label-text-size, var(--mat-sys-label-large-size));\n  font-weight: var(--mat-fab-extended-label-text-weight, var(--mat-sys-label-large-weight));\n  letter-spacing: var(--mat-fab-extended-label-text-tracking, var(--mat-sys-label-large-tracking));\n}\n@media (hover: hover) {\n  .mat-mdc-extended-fab:hover {\n    box-shadow: var(--mat-fab-extended-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-extended-fab:focus {\n  box-shadow: var(--mat-fab-extended-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-extended-fab:active, .mat-mdc-extended-fab:focus:active {\n  box-shadow: var(--mat-fab-extended-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab[disabled]:focus, .mat-mdc-extended-fab.mat-mdc-button-disabled, .mat-mdc-extended-fab.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n[dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .mat-icon, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-icons, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-outlined, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-rounded, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-sharp,\n.mat-mdc-extended-fab > .mat-icon,\n.mat-mdc-extended-fab > .material-icons,\n.mat-mdc-extended-fab > .material-symbols-outlined,\n.mat-mdc-extended-fab > .material-symbols-rounded,\n.mat-mdc-extended-fab > .material-symbols-sharp {\n  margin-left: -8px;\n  margin-right: 12px;\n}\n.mat-mdc-extended-fab .mdc-button__label + .mat-icon,\n.mat-mdc-extended-fab .mdc-button__label + .material-icons,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-outlined,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-rounded,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-sharp, [dir=rtl] .mat-mdc-extended-fab > .mat-icon, [dir=rtl] .mat-mdc-extended-fab > .material-icons, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-outlined, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-rounded, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-sharp {\n  margin-left: 12px;\n  margin-right: -8px;\n}\n.mat-mdc-extended-fab .mat-mdc-button-touch-target {\n  width: 100%;\n}\n\n.mat-mdc-button-progress-indicator-container {\n  position: absolute;\n  inset-inline-start: 0;\n  margin-block-start: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n\n.mat-mdc-button-progress-indicator-shown mat-icon,\n.mat-mdc-button-progress-indicator-shown [matButtonIcon],\n.mat-mdc-button-progress-indicator-shown .mdc-button__label {\n  visibility: hidden;\n}\n"]
		}]
	}], () => [], { extended: [{
		type: Input,
		args: [{ transform: booleanAttribute }]
	}] });
})();
var MatMiniFabButton = class MatMiniFabButton extends MatButtonBase {
	_options = inject(MAT_FAB_DEFAULT_OPTIONS, { optional: true });
	_isFab = true;
	constructor() {
		super();
		this._options = this._options || defaults;
		this.color = this._options.color || defaults.color;
	}
	static ɵfac = function MatMiniFabButton_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatMiniFabButton)();
	};
	static ɵcmp = (function() {
		const _c0 = [
			[
				[
					"",
					8,
					"material-icons",
					3,
					"iconPositionEnd",
					""
				],
				[
					"mat-icon",
					3,
					"iconPositionEnd",
					""
				],
				[
					"",
					"matButtonIcon",
					"",
					3,
					"iconPositionEnd",
					""
				],
				[
					"",
					8,
					"material-symbols-outlined",
					3,
					"iconPositionEnd",
					""
				],
				[
					"",
					8,
					"material-symbols-rounded",
					3,
					"iconPositionEnd",
					""
				],
				[
					"",
					8,
					"material-symbols-sharp",
					3,
					"iconPositionEnd",
					""
				]
			],
			"*",
			[
				[
					"",
					"iconPositionEnd",
					"",
					8,
					"material-icons"
				],
				[
					"mat-icon",
					"iconPositionEnd",
					""
				],
				[
					"",
					"matButtonIcon",
					"",
					"iconPositionEnd",
					""
				],
				[
					"",
					"iconPositionEnd",
					"",
					8,
					"material-symbols-outlined"
				],
				[
					"",
					"iconPositionEnd",
					"",
					8,
					"material-symbols-rounded"
				],
				[
					"",
					"iconPositionEnd",
					"",
					8,
					"material-symbols-sharp"
				]
			],
			[[
				"",
				"progressIndicator",
				""
			]]
		];
		const _c1 = [
			".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd]), .material-symbols-outlined:not([iconPositionEnd]), .material-symbols-rounded:not([iconPositionEnd]), .material-symbols-sharp:not([iconPositionEnd])",
			"*",
			".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd], .material-symbols-outlined[iconPositionEnd], .material-symbols-rounded[iconPositionEnd], .material-symbols-sharp[iconPositionEnd]",
			"[progressIndicator]"
		];
		function MatMiniFabButton_Conditional_5_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵdomElementStart(0, "div", 2);
				ɵɵprojection(1, 3);
				ɵɵdomElementEnd();
			}
		}
		return /*@__PURE__*/ ɵɵdefineComponent({
			type: MatMiniFabButton,
			selectors: [
				[
					"button",
					"mat-mini-fab",
					""
				],
				[
					"a",
					"mat-mini-fab",
					""
				],
				[
					"button",
					"matMiniFab",
					""
				],
				[
					"a",
					"matMiniFab",
					""
				]
			],
			hostAttrs: [
				1,
				"mdc-fab",
				"mat-mdc-fab-base",
				"mdc-fab--mini",
				"mat-mdc-mini-fab"
			],
			exportAs: ["matButton", "matAnchor"],
			features: [ɵɵInheritDefinitionFeature],
			ngContentSelectors: _c1,
			decls: 8,
			vars: 5,
			consts: [
				[1, "mat-mdc-button-persistent-ripple"],
				[1, "mdc-button__label"],
				[1, "mat-mdc-button-progress-indicator-container"],
				[1, "mat-focus-indicator"],
				[1, "mat-mdc-button-touch-target"]
			],
			template: function MatMiniFabButton_Template(rf, ctx) {
				if (rf & 1) {
					ɵɵprojectionDef(_c0);
					ɵɵdomElement(0, "span", 0);
					ɵɵprojection(1);
					ɵɵdomElementStart(2, "span", 1);
					ɵɵprojection(3, 1);
					ɵɵdomElementEnd();
					ɵɵprojection(4, 2);
					ɵɵconditionalCreate(5, MatMiniFabButton_Conditional_5_Template, 2, 0, "div", 2);
					ɵɵdomElement(6, "span", 3)(7, "span", 4);
				}
				if (rf & 2) {
					ɵɵclassProp("mdc-button__ripple", !ctx._isFab)("mdc-fab__ripple", ctx._isFab);
					ɵɵadvance(5);
					ɵɵconditional(ctx.showProgress() ? 5 : -1);
				}
			},
			styles: [".mat-mdc-fab-base {\n  -webkit-user-select: none;\n  user-select: none;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  width: 56px;\n  height: 56px;\n  padding: 0;\n  border: none;\n  fill: currentColor;\n  text-decoration: none;\n  cursor: pointer;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  overflow: visible;\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  flex-shrink: 0;\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  content: \"\";\n  opacity: 0;\n}\n.mat-mdc-fab-base .mdc-button__label,\n.mat-mdc-fab-base .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-fab-base .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n}\n.mat-mdc-fab-base:focus-visible > .mat-focus-indicator::before {\n  content: \"\";\n}\n.mat-mdc-fab-base._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-fab-base::before {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border: 1px solid transparent;\n  border-radius: inherit;\n  content: \"\";\n  pointer-events: none;\n}\n.mat-mdc-fab-base[hidden] {\n  display: none;\n}\n.mat-mdc-fab-base::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n.mat-mdc-fab-base:active, .mat-mdc-fab-base:focus {\n  outline: none;\n}\n.mat-mdc-fab-base:hover {\n  cursor: pointer;\n}\n.mat-mdc-fab-base > svg {\n  width: 100%;\n}\n.mat-mdc-fab-base .mat-icon,\n.mat-mdc-fab-base .material-icons,\n.mat-mdc-fab-base .material-symbols-outlined,\n.mat-mdc-fab-base .material-symbols-rounded,\n.mat-mdc-fab-base .material-symbols-sharp {\n  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);\n  fill: currentColor;\n  will-change: transform;\n}\n.mat-mdc-fab-base .mat-focus-indicator::before {\n  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px) * -1);\n  border-radius: calc(var(--%NS%mat-fab-container-shape, var(--%NS%mat-sys-corner-large)) + calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px));\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base[disabled]:focus, .mat-mdc-fab-base.mat-mdc-button-disabled, .mat-mdc-fab-base.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-fab-base.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-fab {\n  background-color: var(--%NS%mat-fab-container-color, var(--%NS%mat-sys-primary-container));\n  border-radius: var(--%NS%mat-fab-container-shape, var(--%NS%mat-sys-corner-large));\n  color: var(--%NS%mat-fab-foreground-color, var(--%NS%mat-sys-on-primary-container, inherit));\n  box-shadow: var(--%NS%mat-fab-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-fab:hover {\n    box-shadow: var(--%NS%mat-fab-hover-container-elevation-shadow, var(--%NS%mat-sys-level4));\n  }\n}\n.mat-mdc-fab:focus {\n  box-shadow: var(--%NS%mat-fab-focus-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-fab:active, .mat-mdc-fab:focus:active {\n  box-shadow: var(--%NS%mat-fab-pressed-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-fab[disabled], .mat-mdc-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n  background-color: var(--%NS%mat-fab-disabled-state-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-fab-touch-target-size, 48px);\n  display: var(--%NS%mat-fab-touch-target-display, block);\n  left: 50%;\n  width: var(--%NS%mat-fab-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-fab .mat-ripple-element {\n  background-color: var(--%NS%mat-fab-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-primary-container) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-fab-state-layer-color, var(--%NS%mat-sys-on-primary-container));\n}\n.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-fab-disabled-state-layer-color);\n}\n.mat-mdc-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-mini-fab {\n  width: 40px;\n  height: 40px;\n  background-color: var(--%NS%mat-fab-small-container-color, var(--%NS%mat-sys-primary-container));\n  border-radius: var(--%NS%mat-fab-small-container-shape, var(--%NS%mat-sys-corner-medium));\n  color: var(--%NS%mat-fab-small-foreground-color, var(--%NS%mat-sys-on-primary-container, inherit));\n  box-shadow: var(--%NS%mat-fab-small-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-mini-fab:hover {\n    box-shadow: var(--%NS%mat-fab-small-hover-container-elevation-shadow, var(--%NS%mat-sys-level4));\n  }\n}\n.mat-mdc-mini-fab:focus {\n  box-shadow: var(--%NS%mat-fab-small-focus-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-mini-fab:active, .mat-mdc-mini-fab:focus:active {\n  box-shadow: var(--%NS%mat-fab-small-pressed-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-mini-fab .mat-focus-indicator::before {\n  border-radius: calc(var(--%NS%mat-fab-small-container-shape, var(--%NS%mat-sys-corner-medium)) + calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px));\n}\n.mat-mdc-mini-fab[disabled], .mat-mdc-mini-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n  background-color: var(--%NS%mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-mini-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-fab-small-touch-target-size, 48px);\n  display: var(--%NS%mat-fab-small-touch-target-display);\n  left: 50%;\n  width: var(--%NS%mat-fab-small-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-mini-fab .mat-ripple-element {\n  background-color: var(--%NS%mat-fab-small-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-primary-container) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-fab-small-state-layer-color, var(--%NS%mat-sys-on-primary-container));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-fab-small-disabled-state-layer-color);\n}\n.mat-mdc-mini-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-small-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-mini-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-small-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-mini-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-small-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-extended-fab {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  padding-left: 20px;\n  padding-right: 20px;\n  width: auto;\n  max-width: 100%;\n  line-height: normal;\n  box-shadow: var(--%NS%mat-fab-extended-container-elevation-shadow, var(--%NS%mat-sys-level3));\n  height: var(--%NS%mat-fab-extended-container-height, 56px);\n  border-radius: var(--%NS%mat-fab-extended-container-shape, var(--%NS%mat-sys-corner-large));\n  font-family: var(--%NS%mat-fab-extended-label-text-font, var(--%NS%mat-sys-label-large-font));\n  font-size: var(--%NS%mat-fab-extended-label-text-size, var(--%NS%mat-sys-label-large-size));\n  font-weight: var(--%NS%mat-fab-extended-label-text-weight, var(--%NS%mat-sys-label-large-weight));\n  letter-spacing: var(--%NS%mat-fab-extended-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));\n}\n@media (hover: hover) {\n  .mat-mdc-extended-fab:hover {\n    box-shadow: var(--%NS%mat-fab-extended-hover-container-elevation-shadow, var(--%NS%mat-sys-level4));\n  }\n}\n.mat-mdc-extended-fab:focus {\n  box-shadow: var(--%NS%mat-fab-extended-focus-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-extended-fab:active, .mat-mdc-extended-fab:focus:active {\n  box-shadow: var(--%NS%mat-fab-extended-pressed-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab[disabled]:focus, .mat-mdc-extended-fab.mat-mdc-button-disabled, .mat-mdc-extended-fab.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n[dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .mat-icon, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-icons, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-outlined, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-rounded, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-sharp,\n.mat-mdc-extended-fab > .mat-icon,\n.mat-mdc-extended-fab > .material-icons,\n.mat-mdc-extended-fab > .material-symbols-outlined,\n.mat-mdc-extended-fab > .material-symbols-rounded,\n.mat-mdc-extended-fab > .material-symbols-sharp {\n  margin-left: -8px;\n  margin-right: 12px;\n}\n.mat-mdc-extended-fab .mdc-button__label + .mat-icon,\n.mat-mdc-extended-fab .mdc-button__label + .material-icons,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-outlined,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-rounded,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-sharp, [dir=rtl] .mat-mdc-extended-fab > .mat-icon, [dir=rtl] .mat-mdc-extended-fab > .material-icons, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-outlined, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-rounded, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-sharp {\n  margin-left: 12px;\n  margin-right: -8px;\n}\n.mat-mdc-extended-fab .mat-mdc-button-touch-target {\n  width: 100%;\n}\n\n.mat-mdc-button-progress-indicator-container {\n  position: absolute;\n  inset-inline-start: 0;\n  margin-block-start: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n\n.mat-mdc-button-progress-indicator-shown mat-icon,\n.mat-mdc-button-progress-indicator-shown [matButtonIcon],\n.mat-mdc-button-progress-indicator-shown .mdc-button__label {\n  visibility: hidden;\n}\n"],
			encapsulation: 2
		});
	})();
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatMiniFabButton, [{
		type: Component,
		args: [{
			selector: `button[mat-mini-fab], a[mat-mini-fab], button[matMiniFab], a[matMiniFab]`,
			host: { "class": "mdc-fab mat-mdc-fab-base mdc-fab--mini mat-mdc-mini-fab" },
			exportAs: "matButton, matAnchor",
			encapsulation: ViewEncapsulation.None,
			template: "<span\n  class=\"mat-mdc-button-persistent-ripple\"\n  [class.mdc-button__ripple]=\"!_isFab\"\n  [class.mdc-fab__ripple]=\"_isFab\"\n></span>\n\n<ng-content\n  select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd]), .material-symbols-outlined:not([iconPositionEnd]), .material-symbols-rounded:not([iconPositionEnd]), .material-symbols-sharp:not([iconPositionEnd])\"\n>\n</ng-content>\n\n<span class=\"mdc-button__label\"><ng-content></ng-content></span>\n\n<ng-content\n  select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd], .material-symbols-outlined[iconPositionEnd], .material-symbols-rounded[iconPositionEnd], .material-symbols-sharp[iconPositionEnd]\"\n>\n</ng-content>\n\n@if (showProgress()) {\n  <div class=\"mat-mdc-button-progress-indicator-container\">\n    <ng-content select=\"[progressIndicator]\" />\n  </div>\n}\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<span class=\"mat-focus-indicator\"></span>\n\n<span class=\"mat-mdc-button-touch-target\"></span>\n",
			styles: [".mat-mdc-fab-base {\n  -webkit-user-select: none;\n  user-select: none;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  width: 56px;\n  height: 56px;\n  padding: 0;\n  border: none;\n  fill: currentColor;\n  text-decoration: none;\n  cursor: pointer;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  overflow: visible;\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  flex-shrink: 0;\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  content: \"\";\n  opacity: 0;\n}\n.mat-mdc-fab-base .mdc-button__label,\n.mat-mdc-fab-base .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-fab-base .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n}\n.mat-mdc-fab-base:focus-visible > .mat-focus-indicator::before {\n  content: \"\";\n}\n.mat-mdc-fab-base._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-fab-base::before {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border: 1px solid transparent;\n  border-radius: inherit;\n  content: \"\";\n  pointer-events: none;\n}\n.mat-mdc-fab-base[hidden] {\n  display: none;\n}\n.mat-mdc-fab-base::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n.mat-mdc-fab-base:active, .mat-mdc-fab-base:focus {\n  outline: none;\n}\n.mat-mdc-fab-base:hover {\n  cursor: pointer;\n}\n.mat-mdc-fab-base > svg {\n  width: 100%;\n}\n.mat-mdc-fab-base .mat-icon,\n.mat-mdc-fab-base .material-icons,\n.mat-mdc-fab-base .material-symbols-outlined,\n.mat-mdc-fab-base .material-symbols-rounded,\n.mat-mdc-fab-base .material-symbols-sharp {\n  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);\n  fill: currentColor;\n  will-change: transform;\n}\n.mat-mdc-fab-base .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);\n  border-radius: calc(var(--mat-fab-container-shape, var(--mat-sys-corner-large)) + calc(var(--mat-focus-indicator-border-width, 3px) + 2px));\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base[disabled]:focus, .mat-mdc-fab-base.mat-mdc-button-disabled, .mat-mdc-fab-base.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-fab-base.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-fab {\n  background-color: var(--mat-fab-container-color, var(--mat-sys-primary-container));\n  border-radius: var(--mat-fab-container-shape, var(--mat-sys-corner-large));\n  color: var(--mat-fab-foreground-color, var(--mat-sys-on-primary-container, inherit));\n  box-shadow: var(--mat-fab-container-elevation-shadow, var(--mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-fab:hover {\n    box-shadow: var(--mat-fab-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-fab:focus {\n  box-shadow: var(--mat-fab-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-fab:active, .mat-mdc-fab:focus:active {\n  box-shadow: var(--mat-fab-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-fab[disabled], .mat-mdc-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-fab-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-fab-touch-target-size, 48px);\n  display: var(--mat-fab-touch-target-display, block);\n  left: 50%;\n  width: var(--mat-fab-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-fab .mat-ripple-element {\n  background-color: var(--mat-fab-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container));\n}\n.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-disabled-state-layer-color);\n}\n.mat-mdc-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-mini-fab {\n  width: 40px;\n  height: 40px;\n  background-color: var(--mat-fab-small-container-color, var(--mat-sys-primary-container));\n  border-radius: var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium));\n  color: var(--mat-fab-small-foreground-color, var(--mat-sys-on-primary-container, inherit));\n  box-shadow: var(--mat-fab-small-container-elevation-shadow, var(--mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-mini-fab:hover {\n    box-shadow: var(--mat-fab-small-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-mini-fab:focus {\n  box-shadow: var(--mat-fab-small-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-mini-fab:active, .mat-mdc-mini-fab:focus:active {\n  box-shadow: var(--mat-fab-small-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-mini-fab .mat-focus-indicator::before {\n  border-radius: calc(var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium)) + calc(var(--mat-focus-indicator-border-width, 3px) + 2px));\n}\n.mat-mdc-mini-fab[disabled], .mat-mdc-mini-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-mini-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-fab-small-touch-target-size, 48px);\n  display: var(--mat-fab-small-touch-target-display);\n  left: 50%;\n  width: var(--mat-fab-small-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-mini-fab .mat-ripple-element {\n  background-color: var(--mat-fab-small-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-small-state-layer-color, var(--mat-sys-on-primary-container));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-small-disabled-state-layer-color);\n}\n.mat-mdc-mini-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-mini-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-mini-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-extended-fab {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  padding-left: 20px;\n  padding-right: 20px;\n  width: auto;\n  max-width: 100%;\n  line-height: normal;\n  box-shadow: var(--mat-fab-extended-container-elevation-shadow, var(--mat-sys-level3));\n  height: var(--mat-fab-extended-container-height, 56px);\n  border-radius: var(--mat-fab-extended-container-shape, var(--mat-sys-corner-large));\n  font-family: var(--mat-fab-extended-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-fab-extended-label-text-size, var(--mat-sys-label-large-size));\n  font-weight: var(--mat-fab-extended-label-text-weight, var(--mat-sys-label-large-weight));\n  letter-spacing: var(--mat-fab-extended-label-text-tracking, var(--mat-sys-label-large-tracking));\n}\n@media (hover: hover) {\n  .mat-mdc-extended-fab:hover {\n    box-shadow: var(--mat-fab-extended-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-extended-fab:focus {\n  box-shadow: var(--mat-fab-extended-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-extended-fab:active, .mat-mdc-extended-fab:focus:active {\n  box-shadow: var(--mat-fab-extended-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab[disabled]:focus, .mat-mdc-extended-fab.mat-mdc-button-disabled, .mat-mdc-extended-fab.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n[dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .mat-icon, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-icons, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-outlined, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-rounded, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-sharp,\n.mat-mdc-extended-fab > .mat-icon,\n.mat-mdc-extended-fab > .material-icons,\n.mat-mdc-extended-fab > .material-symbols-outlined,\n.mat-mdc-extended-fab > .material-symbols-rounded,\n.mat-mdc-extended-fab > .material-symbols-sharp {\n  margin-left: -8px;\n  margin-right: 12px;\n}\n.mat-mdc-extended-fab .mdc-button__label + .mat-icon,\n.mat-mdc-extended-fab .mdc-button__label + .material-icons,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-outlined,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-rounded,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-sharp, [dir=rtl] .mat-mdc-extended-fab > .mat-icon, [dir=rtl] .mat-mdc-extended-fab > .material-icons, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-outlined, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-rounded, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-sharp {\n  margin-left: 12px;\n  margin-right: -8px;\n}\n.mat-mdc-extended-fab .mat-mdc-button-touch-target {\n  width: 100%;\n}\n\n.mat-mdc-button-progress-indicator-container {\n  position: absolute;\n  inset-inline-start: 0;\n  margin-block-start: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n\n.mat-mdc-button-progress-indicator-shown mat-icon,\n.mat-mdc-button-progress-indicator-shown [matButtonIcon],\n.mat-mdc-button-progress-indicator-shown .mdc-button__label {\n  visibility: hidden;\n}\n"]
		}]
	}], () => [], null);
})();
var MatButtonModule = class MatButtonModule {
	static ɵfac = function MatButtonModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatButtonModule)();
	};
	static ɵmod = /*@__PURE__*/ ɵɵdefineNgModule({
		type: MatButtonModule,
		imports: [
			MatRippleModule,
			MatButton,
			MatMiniFabButton,
			MatIconButton,
			MatFabButton
		],
		exports: [
			BidiModule,
			MatButton,
			MatMiniFabButton,
			MatIconButton,
			MatFabButton
		]
	});
	static ɵinj = /*@__PURE__*/ ɵɵdefineInjector({ imports: [MatRippleModule, BidiModule] });
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatButtonModule, [{
		type: NgModule,
		args: [{
			imports: [
				MatRippleModule,
				MatButton,
				MatMiniFabButton,
				MatIconButton,
				MatFabButton
			],
			exports: [
				BidiModule,
				MatButton,
				MatMiniFabButton,
				MatIconButton,
				MatFabButton
			]
		}]
	}], null, null);
})();
// node_modules/@angular/material/fesm2022/snack-bar.mjs
var MAX_TIMEOUT = Math.pow(2, 31) - 1;
var MatSnackBarRef = class {
	_overlayRef;
	instance;
	containerInstance;
	_afterDismissed = new Subject();
	_afterOpened = new Subject();
	_onAction = new Subject();
	_durationTimeoutId;
	_dismissedByAction = false;
	constructor(containerInstance, _overlayRef) {
		this._overlayRef = _overlayRef;
		this.containerInstance = containerInstance;
		containerInstance._onExit.subscribe(() => this._finishDismiss());
	}
	dismiss() {
		if (!this._afterDismissed.closed) this.containerInstance.exit();
		clearTimeout(this._durationTimeoutId);
	}
	dismissWithAction() {
		if (!this._onAction.closed) {
			this._dismissedByAction = true;
			this._onAction.next();
			this._onAction.complete();
			this.dismiss();
		}
		clearTimeout(this._durationTimeoutId);
	}
	closeWithAction() {
		this.dismissWithAction();
	}
	_dismissAfter(duration) {
		this._durationTimeoutId = setTimeout(() => this.dismiss(), Math.min(duration, MAX_TIMEOUT));
	}
	_open() {
		if (!this._afterOpened.closed) {
			this._afterOpened.next();
			this._afterOpened.complete();
		}
	}
	_finishDismiss() {
		this._overlayRef.dispose();
		if (!this._onAction.closed) this._onAction.complete();
		this._afterDismissed.next({ dismissedByAction: this._dismissedByAction });
		this._afterDismissed.complete();
		this._dismissedByAction = false;
	}
	afterDismissed() {
		return this._afterDismissed;
	}
	afterOpened() {
		return this.containerInstance._onEnter;
	}
	onAction() {
		return this._onAction;
	}
};
var MAT_SNACK_BAR_DATA = new InjectionToken("MatSnackBarData");
var MatSnackBarConfig = class {
	politeness = "polite";
	announcementMessage = "";
	viewContainerRef;
	duration = 0;
	panelClass;
	direction;
	data = null;
	horizontalPosition = "center";
	verticalPosition = "bottom";
};
var MatSnackBarLabel = class MatSnackBarLabel {
	static ɵfac = function MatSnackBarLabel_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatSnackBarLabel)();
	};
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: MatSnackBarLabel,
		selectors: [[
			"",
			"matSnackBarLabel",
			""
		]],
		hostAttrs: [
			1,
			"mat-mdc-snack-bar-label",
			"mdc-snackbar__label"
		]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSnackBarLabel, [{
		type: Directive,
		args: [{
			selector: `[matSnackBarLabel]`,
			host: { "class": "mat-mdc-snack-bar-label mdc-snackbar__label" }
		}]
	}], null, null);
})();
var MatSnackBarActions = class MatSnackBarActions {
	static ɵfac = function MatSnackBarActions_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatSnackBarActions)();
	};
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: MatSnackBarActions,
		selectors: [[
			"",
			"matSnackBarActions",
			""
		]],
		hostAttrs: [
			1,
			"mat-mdc-snack-bar-actions",
			"mdc-snackbar__actions"
		]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSnackBarActions, [{
		type: Directive,
		args: [{
			selector: `[matSnackBarActions]`,
			host: { "class": "mat-mdc-snack-bar-actions mdc-snackbar__actions" }
		}]
	}], null, null);
})();
var MatSnackBarAction = class MatSnackBarAction {
	static ɵfac = function MatSnackBarAction_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatSnackBarAction)();
	};
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: MatSnackBarAction,
		selectors: [[
			"",
			"matSnackBarAction",
			""
		]],
		hostAttrs: [
			1,
			"mat-mdc-snack-bar-action",
			"mdc-snackbar__action"
		]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSnackBarAction, [{
		type: Directive,
		args: [{
			selector: `[matSnackBarAction]`,
			host: { "class": "mat-mdc-snack-bar-action mdc-snackbar__action" }
		}]
	}], null, null);
})();
var SimpleSnackBar = class SimpleSnackBar {
	snackBarRef = inject(MatSnackBarRef);
	data = inject(MAT_SNACK_BAR_DATA);
	action() {
		this.snackBarRef.dismissWithAction();
	}
	get hasAction() {
		return !!this.data.action;
	}
	static ɵfac = function SimpleSnackBar_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || SimpleSnackBar)();
	};
	static ɵcmp = (function() {
		function SimpleSnackBar_Conditional_2_Template(rf, ctx) {
			if (rf & 1) {
				const _r1 = ɵɵgetCurrentView();
				ɵɵelementStart(0, "div", 1)(1, "button", 2);
				ɵɵlistener("click", function SimpleSnackBar_Conditional_2_Template_button_click_1_listener() {
					ɵɵrestoreView(_r1);
					const ctx_r1 = ɵɵnextContext();
					return ɵɵresetView(ctx_r1.action());
				});
				ɵɵtext(2);
				ɵɵelementEnd()();
			}
			if (rf & 2) {
				const ctx_r1 = ɵɵnextContext();
				ɵɵadvance(2);
				ɵɵtextInterpolate1(" ", ctx_r1.data.action, " ");
			}
		}
		return /*@__PURE__*/ ɵɵdefineComponent({
			type: SimpleSnackBar,
			selectors: [["simple-snack-bar"]],
			hostAttrs: [1, "mat-mdc-simple-snack-bar"],
			exportAs: ["matSnackBar"],
			decls: 3,
			vars: 2,
			consts: [
				["matSnackBarLabel", ""],
				["matSnackBarActions", ""],
				[
					"matButton",
					"",
					"matSnackBarAction",
					"",
					3,
					"click"
				]
			],
			template: function SimpleSnackBar_Template(rf, ctx) {
				if (rf & 1) {
					ɵɵelementStart(0, "div", 0);
					ɵɵtext(1);
					ɵɵelementEnd();
					ɵɵconditionalCreate(2, SimpleSnackBar_Conditional_2_Template, 3, 1, "div", 1);
				}
				if (rf & 2) {
					ɵɵadvance();
					ɵɵtextInterpolate1(" ", ctx.data.message, "\n");
					ɵɵadvance();
					ɵɵconditional(ctx.hasAction ? 2 : -1);
				}
			},
			dependencies: [
				MatButton,
				MatSnackBarLabel,
				MatSnackBarActions,
				MatSnackBarAction
			],
			styles: [".mat-mdc-simple-snack-bar {\n  display: flex;\n}\n.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label {\n  max-height: 50vh;\n  overflow: auto;\n}\n"],
			encapsulation: 2
		});
	})();
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SimpleSnackBar, [{
		type: Component,
		args: [{
			selector: "simple-snack-bar",
			exportAs: "matSnackBar",
			encapsulation: ViewEncapsulation.None,
			imports: [
				MatButton,
				MatSnackBarLabel,
				MatSnackBarActions,
				MatSnackBarAction
			],
			host: { "class": "mat-mdc-simple-snack-bar" },
			template: "<div matSnackBarLabel>\n  {{data.message}}\n</div>\n\n@if (hasAction) {\n  <div matSnackBarActions>\n    <button matButton matSnackBarAction (click)=\"action()\">\n      {{data.action}}\n    </button>\n  </div>\n}\n",
			styles: [".mat-mdc-simple-snack-bar {\n  display: flex;\n}\n.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label {\n  max-height: 50vh;\n  overflow: auto;\n}\n"]
		}]
	}], null, null);
})();
var ENTER_ANIMATION = "_mat-snack-bar-enter";
var EXIT_ANIMATION = "_mat-snack-bar-exit";
var MatSnackBarContainer = class MatSnackBarContainer extends BasePortalOutlet {
	_ngZone = inject(NgZone);
	_elementRef = inject(ElementRef);
	_changeDetectorRef = inject(ChangeDetectorRef);
	_platform = inject(Platform);
	_animationsDisabled = _animationsDisabled();
	snackBarConfig = inject(MatSnackBarConfig);
	_document = inject(DOCUMENT);
	_trackedModals = /* @__PURE__ */ new Set();
	_enterFallback;
	_exitFallback;
	_injector = inject(Injector);
	_announceDelay = 150;
	_announceTimeoutId;
	_destroyed = false;
	_portalOutlet;
	_onAnnounce = new Subject();
	_onExit = new Subject();
	_onEnter = new Subject();
	_animationState = "void";
	_live;
	_label;
	_role;
	_liveElementId = inject(_IdGenerator).getId("mat-snack-bar-container-live-");
	constructor() {
		super();
		const config = this.snackBarConfig;
		if (config.politeness === "assertive" && !config.announcementMessage) this._live = "assertive";
		else if (config.politeness === "off") this._live = "off";
		else this._live = "polite";
		if (this._platform.FIREFOX) {
			if (this._live === "polite") this._role = "status";
			if (this._live === "assertive") this._role = "alert";
		}
	}
	attachComponentPortal(portal) {
		this._assertNotAttached();
		const result = this._portalOutlet.attachComponentPortal(portal);
		this._afterPortalAttached();
		return result;
	}
	attachTemplatePortal(portal) {
		this._assertNotAttached();
		const result = this._portalOutlet.attachTemplatePortal(portal);
		this._afterPortalAttached();
		return result;
	}
	attachDomPortal = (portal) => {
		this._assertNotAttached();
		const result = this._portalOutlet.attachDomPortal(portal);
		this._afterPortalAttached();
		return result;
	};
	onAnimationEnd(animationName) {
		if (animationName === EXIT_ANIMATION) this._completeExit();
		else if (animationName === ENTER_ANIMATION) {
			clearTimeout(this._enterFallback);
			this._ngZone.run(() => {
				this._onEnter.next();
				this._onEnter.complete();
			});
		}
	}
	enter() {
		if (!this._destroyed) {
			this._animationState = "visible";
			this._changeDetectorRef.markForCheck();
			this._changeDetectorRef.detectChanges();
			this._screenReaderAnnounce();
			if (this._animationsDisabled) afterNextRender(() => {
				this._ngZone.run(() => queueMicrotask(() => this.onAnimationEnd(ENTER_ANIMATION)));
			}, { injector: this._injector });
			else {
				clearTimeout(this._enterFallback);
				this._enterFallback = setTimeout(() => {
					this._elementRef.nativeElement.classList.add("mat-snack-bar-fallback-visible");
					this.onAnimationEnd(ENTER_ANIMATION);
				}, 200);
			}
		}
	}
	exit() {
		if (this._destroyed) return of(void 0);
		this._ngZone.run(() => {
			this._animationState = "hidden";
			this._changeDetectorRef.markForCheck();
			this._elementRef.nativeElement.setAttribute("mat-exit", "");
			clearTimeout(this._announceTimeoutId);
			if (this._animationsDisabled) afterNextRender(() => {
				this._ngZone.run(() => queueMicrotask(() => this.onAnimationEnd(EXIT_ANIMATION)));
			}, { injector: this._injector });
			else {
				clearTimeout(this._exitFallback);
				this._exitFallback = setTimeout(() => this.onAnimationEnd(EXIT_ANIMATION), 200);
			}
		});
		return this._onExit;
	}
	ngOnDestroy() {
		this._destroyed = true;
		this._clearFromModals();
		this._completeExit();
	}
	_completeExit() {
		clearTimeout(this._exitFallback);
		queueMicrotask(() => {
			this._onExit.next();
			this._onExit.complete();
		});
	}
	_afterPortalAttached() {
		const element = this._elementRef.nativeElement;
		const panelClasses = this.snackBarConfig.panelClass;
		if (panelClasses) {
			if (Array.isArray(panelClasses)) panelClasses.forEach((cssClass) => element.classList.add(cssClass));
			else element.classList.add(panelClasses);
		}
		this._exposeToModals();
		const label = this._label.nativeElement;
		const labelClass = "mdc-snackbar__label";
		label.classList.toggle(labelClass, !label.querySelector(`.${labelClass}`));
	}
	_exposeToModals() {
		const id = this._liveElementId;
		const modals = this._document.querySelectorAll("body > .cdk-overlay-container [aria-modal=\"true\"]");
		for (let i = 0; i < modals.length; i++) {
			const modal = modals[i];
			const ariaOwns = modal.getAttribute("aria-owns");
			this._trackedModals.add(modal);
			if (!ariaOwns) modal.setAttribute("aria-owns", id);
			else if (ariaOwns.indexOf(id) === -1) modal.setAttribute("aria-owns", ariaOwns + " " + id);
		}
	}
	_clearFromModals() {
		this._trackedModals.forEach((modal) => {
			const ariaOwns = modal.getAttribute("aria-owns");
			if (ariaOwns) {
				const newValue = ariaOwns.replace(this._liveElementId, "").trim();
				if (newValue.length > 0) modal.setAttribute("aria-owns", newValue);
				else modal.removeAttribute("aria-owns");
			}
		});
		this._trackedModals.clear();
	}
	_assertNotAttached() {
		if (this._portalOutlet.hasAttached() && (typeof ngDevMode === "undefined" || ngDevMode)) throw Error("Attempting to attach snack bar content after content is already attached");
	}
	_screenReaderAnnounce() {
		if (this._announceTimeoutId) return;
		this._ngZone.runOutsideAngular(() => {
			this._announceTimeoutId = setTimeout(() => {
				if (this._destroyed) return;
				const element = this._elementRef.nativeElement;
				const inertElement = element.querySelector("[aria-hidden]");
				const liveElement = element.querySelector("[aria-live]");
				if (inertElement && liveElement) {
					let focusedElement = null;
					if (this._platform.isBrowser && document.activeElement instanceof HTMLElement && inertElement.contains(document.activeElement)) focusedElement = document.activeElement;
					inertElement.removeAttribute("aria-hidden");
					liveElement.appendChild(inertElement);
					focusedElement?.focus();
					this._onAnnounce.next();
					this._onAnnounce.complete();
				}
			}, this._announceDelay);
		});
	}
	static ɵfac = function MatSnackBarContainer_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatSnackBarContainer)();
	};
	static ɵcmp = (function() {
		const _c0 = ["label"];
		function MatSnackBarContainer_ng_template_4_Template(rf, ctx) {}
		return /*@__PURE__*/ ɵɵdefineComponent({
			type: MatSnackBarContainer,
			selectors: [["mat-snack-bar-container"]],
			viewQuery: function MatSnackBarContainer_Query(rf, ctx) {
				if (rf & 1) ɵɵviewQuery(CdkPortalOutlet, 7)(_c0, 7);
				if (rf & 2) {
					let _t = void 0;
					ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._portalOutlet = _t.first);
					ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._label = _t.first);
				}
			},
			hostAttrs: [
				1,
				"mdc-snackbar",
				"mat-mdc-snack-bar-container"
			],
			hostVars: 6,
			hostBindings: function MatSnackBarContainer_HostBindings(rf, ctx) {
				if (rf & 1) ɵɵlistener("animationend", function MatSnackBarContainer_animationend_HostBindingHandler($event) {
					return ctx.onAnimationEnd($event.animationName);
				})("animationcancel", function MatSnackBarContainer_animationcancel_HostBindingHandler($event) {
					return ctx.onAnimationEnd($event.animationName);
				});
				if (rf & 2) ɵɵclassProp("mat-snack-bar-container-enter", ctx._animationState === "visible")("mat-snack-bar-container-exit", ctx._animationState === "hidden")("mat-snack-bar-container-animations-enabled", !ctx._animationsDisabled);
			},
			features: [ɵɵInheritDefinitionFeature],
			decls: 6,
			vars: 3,
			consts: [
				["label", ""],
				[
					1,
					"mdc-snackbar__surface",
					"mat-mdc-snackbar-surface"
				],
				[1, "mat-mdc-snack-bar-label"],
				["aria-hidden", "true"],
				["cdkPortalOutlet", ""]
			],
			template: function MatSnackBarContainer_Template(rf, ctx) {
				if (rf & 1) {
					ɵɵelementStart(0, "div", 1)(1, "div", 2, 0)(3, "div", 3);
					ɵɵtemplate(4, MatSnackBarContainer_ng_template_4_Template, 0, 0, "ng-template", 4);
					ɵɵelementEnd();
					ɵɵelement(5, "div");
					ɵɵelementEnd()();
				}
				if (rf & 2) {
					ɵɵadvance(5);
					ɵɵattribute("aria-live", ctx._live)("role", ctx._role)("id", ctx._liveElementId);
				}
			},
			dependencies: [CdkPortalOutlet],
			styles: ["@keyframes _mat-snack-bar-enter {\n  from {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n@keyframes _mat-snack-bar-exit {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n.mat-mdc-snack-bar-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  margin: 8px;\n}\n.mat-mdc-snack-bar-handset .mat-mdc-snack-bar-container {\n  width: 100vw;\n}\n\n.mat-snack-bar-container-animations-enabled {\n  opacity: 0;\n}\n.mat-snack-bar-container-animations-enabled.mat-snack-bar-fallback-visible {\n  opacity: 1;\n}\n.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-enter {\n  animation: _mat-snack-bar-enter 150ms cubic-bezier(0, 0, 0.2, 1) forwards;\n}\n.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-exit {\n  animation: _mat-snack-bar-exit 75ms cubic-bezier(0.4, 0, 1, 1) forwards;\n}\n\n.mat-mdc-snackbar-surface {\n  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  box-sizing: border-box;\n  padding-left: 0;\n  padding-right: 8px;\n}\n[dir=rtl] .mat-mdc-snackbar-surface {\n  padding-right: 0;\n  padding-left: 8px;\n}\n.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {\n  min-width: 344px;\n  max-width: 672px;\n}\n.mat-mdc-snack-bar-handset .mat-mdc-snackbar-surface {\n  width: 100%;\n  min-width: 0;\n}\n@media (forced-colors: active) {\n  .mat-mdc-snackbar-surface {\n    outline: solid 1px;\n  }\n}\n.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {\n  color: var(--%NS%mat-snack-bar-supporting-text-color, var(--%NS%mat-sys-inverse-on-surface));\n  border-radius: var(--%NS%mat-snack-bar-container-shape, var(--%NS%mat-sys-corner-extra-small));\n  background-color: var(--%NS%mat-snack-bar-container-color, var(--%NS%mat-sys-inverse-surface));\n}\n\n.mdc-snackbar__label {\n  width: 100%;\n  flex-grow: 1;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 14px 8px 14px 16px;\n}\n[dir=rtl] .mdc-snackbar__label {\n  padding-left: 8px;\n  padding-right: 16px;\n}\n.mat-mdc-snack-bar-container .mdc-snackbar__label {\n  font-family: var(--%NS%mat-snack-bar-supporting-text-font, var(--%NS%mat-sys-body-medium-font));\n  font-size: var(--%NS%mat-snack-bar-supporting-text-size, var(--%NS%mat-sys-body-medium-size));\n  font-weight: var(--%NS%mat-snack-bar-supporting-text-weight, var(--%NS%mat-sys-body-medium-weight));\n  line-height: var(--%NS%mat-snack-bar-supporting-text-line-height, var(--%NS%mat-sys-body-medium-line-height));\n}\n\n.mat-mdc-snack-bar-actions {\n  display: flex;\n  flex-shrink: 0;\n  align-items: center;\n  box-sizing: border-box;\n}\n\n.mat-mdc-snack-bar-handset,\n.mat-mdc-snack-bar-container,\n.mat-mdc-snack-bar-label {\n  flex: 1 1 auto;\n}\n\n.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled).mat-unthemed {\n  color: var(--%NS%mat-snack-bar-button-color, var(--%NS%mat-sys-inverse-primary));\n}\n.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) {\n  --%NS%mat-button-text-state-layer-color: currentColor;\n  --%NS%mat-button-text-ripple-color: currentColor;\n}\n.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element {\n  opacity: 0.1;\n}\n"],
			encapsulation: 2,
			changeDetection: 1
		});
	})();
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSnackBarContainer, [{
		type: Component,
		args: [{
			selector: "mat-snack-bar-container",
			changeDetection: ChangeDetectionStrategy.Eager,
			encapsulation: ViewEncapsulation.None,
			imports: [CdkPortalOutlet],
			host: {
				"class": "mdc-snackbar mat-mdc-snack-bar-container",
				"[class.mat-snack-bar-container-enter]": "_animationState === \"visible\"",
				"[class.mat-snack-bar-container-exit]": "_animationState === \"hidden\"",
				"[class.mat-snack-bar-container-animations-enabled]": "!_animationsDisabled",
				"(animationend)": "onAnimationEnd($event.animationName)",
				"(animationcancel)": "onAnimationEnd($event.animationName)"
			},
			template: "<div class=\"mdc-snackbar__surface mat-mdc-snackbar-surface\">\n  <!--\n    This outer label wrapper will have the class `mdc-snackbar__label` applied if\n    the attached template/component does not contain it.\n  -->\n  <div class=\"mat-mdc-snack-bar-label\" #label>\n    <!-- Initialy holds the snack bar content, will be empty after announcing to screen readers. -->\n    <div aria-hidden=\"true\">\n      <ng-template cdkPortalOutlet />\n    </div>\n\n    <!-- Will receive the snack bar content from the non-live div, move will happen a short delay after opening -->\n    <div [attr.aria-live]=\"_live\" [attr.role]=\"_role\" [attr.id]=\"_liveElementId\"></div>\n  </div>\n</div>\n",
			styles: ["@keyframes _mat-snack-bar-enter {\n  from {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n@keyframes _mat-snack-bar-exit {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n.mat-mdc-snack-bar-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  margin: 8px;\n}\n.mat-mdc-snack-bar-handset .mat-mdc-snack-bar-container {\n  width: 100vw;\n}\n\n.mat-snack-bar-container-animations-enabled {\n  opacity: 0;\n}\n.mat-snack-bar-container-animations-enabled.mat-snack-bar-fallback-visible {\n  opacity: 1;\n}\n.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-enter {\n  animation: _mat-snack-bar-enter 150ms cubic-bezier(0, 0, 0.2, 1) forwards;\n}\n.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-exit {\n  animation: _mat-snack-bar-exit 75ms cubic-bezier(0.4, 0, 1, 1) forwards;\n}\n\n.mat-mdc-snackbar-surface {\n  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  box-sizing: border-box;\n  padding-left: 0;\n  padding-right: 8px;\n}\n[dir=rtl] .mat-mdc-snackbar-surface {\n  padding-right: 0;\n  padding-left: 8px;\n}\n.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {\n  min-width: 344px;\n  max-width: 672px;\n}\n.mat-mdc-snack-bar-handset .mat-mdc-snackbar-surface {\n  width: 100%;\n  min-width: 0;\n}\n@media (forced-colors: active) {\n  .mat-mdc-snackbar-surface {\n    outline: solid 1px;\n  }\n}\n.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {\n  color: var(--mat-snack-bar-supporting-text-color, var(--mat-sys-inverse-on-surface));\n  border-radius: var(--mat-snack-bar-container-shape, var(--mat-sys-corner-extra-small));\n  background-color: var(--mat-snack-bar-container-color, var(--mat-sys-inverse-surface));\n}\n\n.mdc-snackbar__label {\n  width: 100%;\n  flex-grow: 1;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 14px 8px 14px 16px;\n}\n[dir=rtl] .mdc-snackbar__label {\n  padding-left: 8px;\n  padding-right: 16px;\n}\n.mat-mdc-snack-bar-container .mdc-snackbar__label {\n  font-family: var(--mat-snack-bar-supporting-text-font, var(--mat-sys-body-medium-font));\n  font-size: var(--mat-snack-bar-supporting-text-size, var(--mat-sys-body-medium-size));\n  font-weight: var(--mat-snack-bar-supporting-text-weight, var(--mat-sys-body-medium-weight));\n  line-height: var(--mat-snack-bar-supporting-text-line-height, var(--mat-sys-body-medium-line-height));\n}\n\n.mat-mdc-snack-bar-actions {\n  display: flex;\n  flex-shrink: 0;\n  align-items: center;\n  box-sizing: border-box;\n}\n\n.mat-mdc-snack-bar-handset,\n.mat-mdc-snack-bar-container,\n.mat-mdc-snack-bar-label {\n  flex: 1 1 auto;\n}\n\n.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled).mat-unthemed {\n  color: var(--mat-snack-bar-button-color, var(--mat-sys-inverse-primary));\n}\n.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) {\n  --mat-button-text-state-layer-color: currentColor;\n  --mat-button-text-ripple-color: currentColor;\n}\n.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element {\n  opacity: 0.1;\n}\n"]
		}]
	}], () => [], {
		_portalOutlet: [{
			type: ViewChild,
			args: [CdkPortalOutlet, { static: true }]
		}],
		_label: [{
			type: ViewChild,
			args: ["label", { static: true }]
		}]
	});
})();
var MAT_SNACK_BAR_DEFAULT_OPTIONS = new InjectionToken("mat-snack-bar-default-options", {
	providedIn: "root",
	factory: () => new MatSnackBarConfig()
});
var MatSnackBar = class MatSnackBar {
	_live = inject(LiveAnnouncer);
	_injector = inject(Injector);
	_breakpointObserver = inject(BreakpointObserver);
	_parentSnackBar = inject(MatSnackBar, {
		optional: true,
		skipSelf: true
	});
	_defaultConfig = inject(MAT_SNACK_BAR_DEFAULT_OPTIONS);
	_animationsDisabled = _animationsDisabled();
	_snackBarRefAtThisLevel = null;
	simpleSnackBarComponent = SimpleSnackBar;
	snackBarContainerComponent = MatSnackBarContainer;
	handsetCssClass = "mat-mdc-snack-bar-handset";
	get _openedSnackBarRef() {
		const parent = this._parentSnackBar;
		return parent ? parent._openedSnackBarRef : this._snackBarRefAtThisLevel;
	}
	set _openedSnackBarRef(value) {
		if (this._parentSnackBar) this._parentSnackBar._openedSnackBarRef = value;
		else this._snackBarRefAtThisLevel = value;
	}
	openFromComponent(component, config) {
		return this._attach(component, config);
	}
	openFromTemplate(template, config) {
		return this._attach(template, config);
	}
	open(message, action = "", config) {
		const _config = {
			...this._defaultConfig,
			...config
		};
		_config.data = {
			message,
			action
		};
		if (_config.announcementMessage === message) _config.announcementMessage = void 0;
		return this.openFromComponent(this.simpleSnackBarComponent, _config);
	}
	dismiss() {
		if (this._openedSnackBarRef) this._openedSnackBarRef.dismiss();
	}
	ngOnDestroy() {
		if (this._snackBarRefAtThisLevel) this._snackBarRefAtThisLevel.dismiss();
	}
	_attachSnackBarContainer(overlayRef, config) {
		const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
		const injector = Injector.create({
			parent: userInjector || this._injector,
			providers: [{
				provide: MatSnackBarConfig,
				useValue: config
			}]
		});
		const containerPortal = new ComponentPortal(this.snackBarContainerComponent, config.viewContainerRef, injector);
		const containerRef = overlayRef.attach(containerPortal);
		containerRef.instance.snackBarConfig = config;
		return containerRef.instance;
	}
	_attach(content, userConfig) {
		const config = {
			...new MatSnackBarConfig(),
			...this._defaultConfig,
			...userConfig
		};
		const overlayRef = this._createOverlay(config);
		const container = this._attachSnackBarContainer(overlayRef, config);
		const snackBarRef = new MatSnackBarRef(container, overlayRef);
		if (content instanceof TemplateRef) {
			const portal = new TemplatePortal(content, null, {
				$implicit: config.data,
				snackBarRef
			});
			snackBarRef.instance = container.attachTemplatePortal(portal);
		} else {
			const portal = new ComponentPortal(content, void 0, this._createInjector(config, snackBarRef));
			snackBarRef.instance = container.attachComponentPortal(portal).instance;
		}
		this._breakpointObserver.observe(Breakpoints.HandsetPortrait).pipe(takeUntil(overlayRef.detachments())).subscribe((state) => {
			overlayRef.overlayElement.classList.toggle(this.handsetCssClass, state.matches);
		});
		if (config.announcementMessage) container._onAnnounce.subscribe(() => {
			this._live.announce(config.announcementMessage, config.politeness);
		});
		this._animateSnackBar(snackBarRef, config);
		this._openedSnackBarRef = snackBarRef;
		return this._openedSnackBarRef;
	}
	_animateSnackBar(snackBarRef, config) {
		snackBarRef.afterDismissed().subscribe(() => {
			if (this._openedSnackBarRef == snackBarRef) this._openedSnackBarRef = null;
			if (config.announcementMessage) this._live.clear();
		});
		if (config.duration && config.duration > 0) snackBarRef.afterOpened().subscribe(() => snackBarRef._dismissAfter(config.duration));
		if (this._openedSnackBarRef) {
			this._openedSnackBarRef.afterDismissed().subscribe(() => {
				snackBarRef.containerInstance.enter();
			});
			this._openedSnackBarRef.dismiss();
		} else snackBarRef.containerInstance.enter();
	}
	_createOverlay(config) {
		const overlayConfig = new OverlayConfig();
		overlayConfig.direction = config.direction;
		const positionStrategy = createGlobalPositionStrategy(this._injector);
		const isRtl = config.direction === "rtl";
		const isLeft = config.horizontalPosition === "left" || config.horizontalPosition === "start" && !isRtl || config.horizontalPosition === "end" && isRtl;
		const isRight = !isLeft && config.horizontalPosition !== "center";
		if (isLeft) positionStrategy.left("0");
		else if (isRight) positionStrategy.right("0");
		else positionStrategy.centerHorizontally();
		if (config.verticalPosition === "top") positionStrategy.top("0");
		else positionStrategy.bottom("0");
		overlayConfig.positionStrategy = positionStrategy;
		overlayConfig.disableAnimations = this._animationsDisabled;
		return createOverlayRef(this._injector, overlayConfig);
	}
	_createInjector(config, snackBarRef) {
		const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
		return Injector.create({
			parent: userInjector || this._injector,
			providers: [{
				provide: MatSnackBarRef,
				useValue: snackBarRef
			}, {
				provide: MAT_SNACK_BAR_DATA,
				useValue: config.data
			}]
		});
	}
	static ɵfac = function MatSnackBar_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatSnackBar)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: MatSnackBar,
		factory: MatSnackBar.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSnackBar, [{ type: Service }], null, null);
})();
var DIRECTIVES = [
	MatSnackBarContainer,
	MatSnackBarLabel,
	MatSnackBarActions,
	MatSnackBarAction
];
var MatSnackBarModule = class MatSnackBarModule {
	static ɵfac = function MatSnackBarModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatSnackBarModule)();
	};
	static ɵmod = /*@__PURE__*/ ɵɵdefineNgModule({
		type: MatSnackBarModule,
		imports: [
			OverlayModule,
			PortalModule,
			MatButtonModule,
			SimpleSnackBar,
			MatSnackBarContainer,
			MatSnackBarLabel,
			MatSnackBarActions,
			MatSnackBarAction
		],
		exports: [
			BidiModule,
			MatSnackBarContainer,
			MatSnackBarLabel,
			MatSnackBarActions,
			MatSnackBarAction
		]
	});
	static ɵinj = /*@__PURE__*/ ɵɵdefineInjector({
		providers: [MatSnackBar],
		imports: [
			OverlayModule,
			PortalModule,
			MatButtonModule,
			SimpleSnackBar,
			BidiModule
		]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSnackBarModule, [{
		type: NgModule,
		args: [{
			imports: [
				OverlayModule,
				PortalModule,
				MatButtonModule,
				SimpleSnackBar,
				...DIRECTIVES
			],
			exports: [BidiModule, ...DIRECTIVES],
			providers: [MatSnackBar]
		}]
	}], null, null);
})();
export { MAT_SNACK_BAR_DATA, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar, MatSnackBarAction, MatSnackBarActions, MatSnackBarConfig, MatSnackBarContainer, MatSnackBarLabel, MatSnackBarModule, MatSnackBarRef, SimpleSnackBar };
