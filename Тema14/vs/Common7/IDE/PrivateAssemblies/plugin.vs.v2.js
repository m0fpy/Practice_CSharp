require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
class EventImpl {
    stopImmediatePropagationCalled;
    get defaultPrevented() { return !!this.preventDefaultsCalled; }
    static CAPTURING_PHASE = 1;
    static AT_TARGET = 2;
    static BUBBLING_PHASE = 3;
    NONE;
    preventDefaultsCalled;
    target;
    timeStamp;
    type;
    eventPhase;
    cancelBubble;
    srcElement;
    get bubbles() { return false; }
    get cancelable() { return false; }
    get currentTarget() { return this.target; }
    get trusted() { return false; }
    get isTrusted() { return false; }
    get returnValue() { return false; }
    get CAPTURING_PHASE() { return EventImpl.CAPTURING_PHASE; }
    get AT_TARGET() { return EventImpl.AT_TARGET; }
    get BUBBLING_PHASE() { return EventImpl.BUBBLING_PHASE; }
    detail;
    constructor(type, additionalProperties, target) {
        this.type = type;
        this.timeStamp = Date.now();
        this.target = target;
        const eventObject = this;
        if (additionalProperties && typeof additionalProperties === "object") {
            Object.getOwnPropertyNames(additionalProperties).forEach(function (name) {
                const pd = Object.getOwnPropertyDescriptor(additionalProperties, name);
                Object.defineProperty(eventObject, name, pd);
            });
        }
        this.eventPhase = 0;
        this.detail = null;
    }
    composed;
    composedPath() {
        throw new Error("Method not implemented.");
    }
    preventDefault() {
        this.preventDefaultsCalled = true;
    }
    stopImmediatePropagation() {
        this.stopImmediatePropagationCalled = true;
    }
    stopPropagation() { }
    initEvent(eventTypeArg, canBubbleArg, cancelableArg) { }
}
class EventManager {
    target;
    listeners;
    constructor(target) {
        this.target = target;
    }
    addEventListener(type, listener) {
        this.listeners = this.listeners || {};
        const eventListeners = (this.listeners[type] = this.listeners[type] || []);
        for (let i = 0, len = eventListeners.length; i < len; i++) {
            const l = eventListeners[i];
            if (l.listener === listener) {
                return;
            }
        }
        eventListeners.push({ listener: listener });
    }
    dispatchEvent(type, eventArg) {
        let listeners = this.listeners && this.listeners[type];
        const oneventAttribute = this.target && this.target["on" + type];
        if (listeners || typeof oneventAttribute === "function") {
            const eventValue = new EventImpl(type, eventArg, this.target);
            if (listeners) {
                listeners = listeners.slice(0, listeners.length);
                for (let i = 0, len = listeners.length; i < len && !eventValue.stopImmediatePropagationCalled; i++) {
                    listeners[i].listener(eventValue);
                }
            }
            if (typeof oneventAttribute === "function") {
                oneventAttribute(eventValue);
            }
            return eventValue.defaultPrevented || false;
        }
        return false;
    }
    removeEventListener(type, listener) {
        const listeners = this.listeners && this.listeners[type];
        if (listeners) {
            for (let i = 0, len = listeners.length; i < len; i++) {
                const l = listeners[i];
                if (l.listener === listener) {
                    listeners.splice(i, 1);
                    if (listeners.length === 0) {
                        delete this.listeners[type];
                    }
                    break;
                }
            }
        }
    }
}
exports.EventManager = EventManager;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const core_1 = require("../core");
class Logger {
    messages = [];
    domInitialized = false;
    constructor() {
        if (document.body) {
            this.domInitialized = true;
        }
        else {
            core_1.GlobalPluginEventManager.addEventListener("load", () => {
                this.domInitialized = true;
                if (this.messages) {
                    for (let i = 0; i < this.messages.length; i++) {
                        this.logMessageLocally(this.messages[i]);
                    }
                    this.messages = null;
                }
                ;
            });
        }
    }
    logMessageLocally(message) {
        if (!this.domInitialized) {
            this.messages.push(message);
            return;
        }
        else {
            const messagesDiv = document.getElementById("pluginMessages");
            if (messagesDiv) {
                messagesDiv.innerHTML += "</br>" + message;
            }
        }
    }
    log(message) {
        this.logMessageLocally(message);
    }
    logError(message) {
        this.log("Error: " + message);
    }
}
exports.Logger = Logger;

},{"../core":5}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortState = exports.ControlCommands = void 0;
var ControlCommands;
(function (ControlCommands) {
    ControlCommands[ControlCommands["none"] = 0] = "none";
    ControlCommands[ControlCommands["portCreated"] = 1] = "portCreated";
    ControlCommands[ControlCommands["portClosed"] = 2] = "portClosed";
    ControlCommands[ControlCommands["portConnected"] = 3] = "portConnected";
    ControlCommands[ControlCommands["controlInitialized"] = 4] = "controlInitialized";
    ControlCommands[ControlCommands["hostReady"] = 5] = "hostReady";
    ControlCommands[ControlCommands["event"] = 6] = "event";
    ControlCommands[ControlCommands["error"] = 7] = "error";
    ControlCommands[ControlCommands["initiateShutdown"] = 8] = "initiateShutdown";
    ControlCommands[ControlCommands["shutdownComplete"] = 9] = "shutdownComplete";
})(ControlCommands = exports.ControlCommands || (exports.ControlCommands = {}));
;
var PortState;
(function (PortState) {
    PortState[PortState["connected"] = 0] = "connected";
    PortState[PortState["disconnected"] = 1] = "disconnected";
    PortState[PortState["closed"] = 2] = "closed";
})(PortState = exports.PortState || (exports.PortState = {}));

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenu = void 0;
const EventManager_1 = require("./Contracts/EventManager");
const disposableEventListener_1 = require("./disposableEventListener");
const theme_1 = require("./theme");
const core_1 = require("./core");
var ContextMenu;
(function (ContextMenu) {
    let host;
    let themeHost;
    let isContextMenuShowing = 0;
    let contextMenuStorage = {};
    let contextMenuContainer = document.createElement("div");
    let shouldShowInline = false;
    let __n;
    Object.defineProperty(ContextMenu, "isShowing", {
        get: function () {
            return isContextMenuShowing !== 0;
        },
        enumerable: true
    });
    function initialize(contextMenuHost, hostTheme, n) {
        host = contextMenuHost;
        themeHost = hostTheme;
        __n = n;
        contextMenuContainer.id = "plugin-contextmenu-container";
        core_1.GlobalPluginEventManager.addEventListener("load", () => {
            document.body.appendChild(contextMenuContainer);
        });
        document.addEventListener("keydown", onKeyDown, false);
        document.addEventListener("contextmenu", onContextMenu, false);
        document.addEventListener("click", onClick, true);
        window.addEventListener("wheel", onWheel, true);
        window.addEventListener("resize", onResize, false);
        host.addEventListener("contextmenufocused", () => {
            focusActiveMenuItem("contextmenu");
        });
        host.addEventListener("contextmenuinitialized", (event) => {
            const contextmenu = document.getElementById("contextmenu");
            if (isNullOrEmpty(event.id)) {
                contextmenu.innerHTML = "";
                contextmenu.removeAttribute("aria-label");
                contextMenuContainer.innerHTML = "";
            }
            else {
                contextMenuContainer.innerHTML = event.contextMenus;
                contextmenu.innerHTML = document.getElementById(event.id).innerHTML;
                if (event.ariaLabel && event.ariaLabel.length !== 0) {
                    contextmenu.setAttribute("aria-label", event.ariaLabel);
                }
                contextmenu.addEventListener("click", stopPropagation, false);
                contextmenu.addEventListener("contextmenu", stopPropagation, false);
                contextmenu.addEventListener("keydown", onContextMenuKeyDown, false);
                const menuItems = contextmenu.getElementsByClassName("menuitem");
                for (let i = 0; i < menuItems.length; i++) {
                    menuItems[i].addEventListener("mouseenter", (e) => handlePopupMenuItemMouseEnter(e, event.id), false);
                    menuItems[i].addEventListener("mouseleave", handleContextMenuItemMouseLeave, false);
                    menuItems[i].addEventListener("focus", (e) => handlePopupMenuItemFocus(e, event.id), false);
                    menuItems[i].addEventListener("click", (e) => handlePopupMenuItemClick(e, event.id), false);
                    menuItems[i].addEventListener("contextmenu", handlePopupMenuItemClick, false);
                    menuItems[i].addEventListener("keydown", onMenuItemKeyDown, false);
                    menuItems[i].addEventListener("DOMAttrModified", onAttrModified, false);
                }
                contextmenu.style.display = "block";
                contextmenu.setAttribute("tabindex", "0");
                host.disableZoom();
                host.fireContentReady();
            }
        });
        host.addEventListener("contextmenuclicked", (event) => {
            const contextmenuItem = document.getElementById(event.id);
            if (contextmenuItem) {
                contextmenuItem.click();
            }
        });
        host.addEventListener("contextmenuopened", (event) => {
            __n("ContextMenuShow", event.x, event.y, event.width, event.height);
        });
    }
    ContextMenu.initialize = initialize;
    function create(menuItems, id, ariaLabel, cssClass, callback) {
        return new HostContextMenu(menuItems, host, themeHost, __n, id, ariaLabel, cssClass, callback);
    }
    ContextMenu.create = create;
    function canCreatePopup() {
        return host.canCreatePopup() && !shouldShowInline;
    }
    ContextMenu.canCreatePopup = canCreatePopup;
    function show(element, ariaLabel, xPosition, yPosition, elementOffsetTop, widthOffset, displayType, tryAdjustCoordinates, showOutsideOfAirspace) {
        const nodeList = element.querySelectorAll("[data-plugin-contextmenu]");
        shouldShowInline = shouldShowInline || (nodeList.length > 0 && !host.canCreatePopup(true));
        theme_1.Theme.initialize(themeHost);
        theme_1.Theme.processImages(element);
        const display = displayType || "block";
        element.style.display = display;
        const height = element.offsetHeight;
        const width = element.offsetWidth;
        element.style.display = "none";
        const scrollOffsetTop = window.pageYOffset;
        const scrollOffsetLeft = window.pageXOffset;
        const viewPortHeight = document.documentElement.clientHeight;
        const viewPortWidth = document.documentElement.clientWidth;
        const positionInfo = {
            clientCoordinates: { X: xPosition, Y: yPosition },
            width: width,
            height: height,
            viewPortWidth: viewPortWidth,
            viewPortHeight: viewPortHeight,
            scrollOffsetLeft: scrollOffsetLeft,
            scrollOffsetTop: scrollOffsetTop,
            elementOffsetTop: elementOffsetTop,
            widthOffset: widthOffset
        };
        isContextMenuShowing++;
        if (canCreatePopup()) {
            showOutsideOfAirspace(element.id, ariaLabel, contextMenuContainer, positionInfo);
            return;
        }
        let adjustedPositionInfo = positionInfo;
        if (yPosition + height > viewPortHeight || xPosition + width > viewPortWidth) {
            if (typeof (tryAdjustCoordinates) === "function") {
                adjustedPositionInfo = tryAdjustCoordinates(positionInfo);
            }
        }
        element.style.left = adjustedPositionInfo.clientCoordinates.X + scrollOffsetLeft + "px";
        element.style.top = adjustedPositionInfo.clientCoordinates.Y + scrollOffsetTop + "px";
        element.style.display = display;
        element.setAttribute("tabindex", "0");
        element.focus();
        __n("ContextMenuShow", adjustedPositionInfo.clientCoordinates.X + scrollOffsetLeft, adjustedPositionInfo.clientCoordinates.Y + scrollOffsetTop, adjustedPositionInfo.width, adjustedPositionInfo.height);
    }
    ContextMenu.show = show;
    async function dismissAll() {
        let promise;
        if (!canCreatePopup()) {
            const promises = [];
            for (let key in contextMenuStorage) {
                if (contextMenuStorage.hasOwnProperty(key)) {
                    promises.push(contextMenuStorage[key].dismiss());
                }
            }
            promise = Promise.all(promises);
        }
        else {
            promise = host.dismiss();
        }
        shouldShowInline = false;
        await promise;
    }
    ContextMenu.dismissAll = dismissAll;
    function shouldFocusMenuItem(element) {
        const allowDisabledItemNavigation = element.parentElement.classList.contains("allowDisabledItemNavigation");
        const isDisabled = element.classList.contains("disabled");
        const isHidden = element.classList.contains("hidden");
        return ((allowDisabledItemNavigation || !isDisabled) && !isHidden && element.hasAttribute("tabindex"));
    }
    ContextMenu.shouldFocusMenuItem = shouldFocusMenuItem;
    ;
    function showSubmenu(currentTarget) {
        if (!currentTarget.classList.contains("active")) {
            const submenuId = currentTarget.getAttribute("data-plugin-contextmenu");
            if (submenuId !== null && typeof (submenuId) !== "undefined") {
                currentTarget.classList.add("active");
                const submenu = document.getElementById(submenuId);
                submenu.style.zIndex = (parseInt(getComputedStyle(currentTarget.parentElement).getPropertyValue("z-index")) + 1).toString();
                const parentWidth = parseInt(getComputedStyle(currentTarget.parentElement).getPropertyValue("width"));
                const xPosition = parentWidth + parseInt(getComputedStyle(currentTarget.parentElement).getPropertyValue("left")) - window.pageXOffset;
                const yPosition = currentTarget.offsetTop + parseInt(getComputedStyle(currentTarget.parentElement).getPropertyValue("top")) - window.pageYOffset;
                const parentWidthOffset = parentWidth - 3;
                show(submenu, null, xPosition, yPosition, currentTarget.offsetTop, parentWidthOffset, null, positionContextMenuInsideAirspace, host.show.bind(host));
            }
        }
    }
    ContextMenu.showSubmenu = showSubmenu;
    ;
    function onContextMenuKeyDown(event) {
        let elementToFocus;
        const target = event.target;
        const currentTarget = event.currentTarget;
        const menuItems = currentTarget.getElementsByClassName("menuitem");
        const startIndex = getMenuItemStartIndex(target, currentTarget, menuItems);
        switch (event.keyCode) {
            case 9:
                if (!event.shiftKey) {
                    elementToFocus = getNextMenuItem(startIndex, menuItems);
                }
                else {
                    elementToFocus = getPreviousMenuItem(startIndex, menuItems);
                }
                event.preventDefault();
                break;
            case 18:
                dismissAll();
                break;
            case 27:
                handleDismissCurrent(currentTarget, false);
                event.preventDefault();
                break;
            case 35:
                elementToFocus = getPreviousMenuItem(0, menuItems);
                event.preventDefault();
                break;
            case 36:
                elementToFocus = getNextMenuItem(0, menuItems);
                event.preventDefault();
                break;
            case 37:
                handleDismissCurrent(currentTarget, true);
                event.preventDefault();
                break;
            case 38:
                elementToFocus = getPreviousMenuItem(startIndex, menuItems);
                event.preventDefault();
                break;
            case 40:
                elementToFocus = getNextMenuItem(startIndex, menuItems);
                event.preventDefault();
                break;
            case 93:
                dismissAll();
                event.preventDefault();
                break;
        }
        if (elementToFocus) {
            elementToFocus.focus();
        }
    }
    ContextMenu.onContextMenuKeyDown = onContextMenuKeyDown;
    ;
    function getAbsoluteOffset(target) {
        let aggregateOffsetTop = target.offsetTop;
        let aggregateOffsetLeft = target.offsetLeft;
        while (target = target.offsetParent) {
            aggregateOffsetTop += target.offsetTop;
            aggregateOffsetLeft += target.offsetLeft;
        }
        return { left: aggregateOffsetLeft, top: aggregateOffsetTop };
    }
    function coordinatesAreOutsideOfVisibleClientArea(x, y) {
        return (x < 0 ||
            y < 0 ||
            x > document.documentElement.clientWidth ||
            y > document.documentElement.clientHeight);
    }
    function determineVisibleTargetWidth(target, absoluteCoordinates) {
        const targetRight = absoluteCoordinates.left + target.offsetWidth;
        const visibleWindowAbsolute = {
            left: window.pageXOffset,
            top: window.pageYOffset,
            right: window.pageXOffset + window.document.documentElement.clientWidth,
            bottom: window.pageYOffset + window.document.documentElement.clientHeight
        };
        const isEntirelyOnScreen = ((absoluteCoordinates.left >= visibleWindowAbsolute.left) && (targetRight <= visibleWindowAbsolute.right));
        if (isEntirelyOnScreen) {
            return target.offsetWidth;
        }
        if ((targetRight < visibleWindowAbsolute.left) || (absoluteCoordinates.left > visibleWindowAbsolute.right)) {
            return 0;
        }
        if ((absoluteCoordinates.left < visibleWindowAbsolute.left) && (targetRight <= visibleWindowAbsolute.right)) {
            return (target.offsetWidth - (visibleWindowAbsolute.left - absoluteCoordinates.left));
        }
        if ((targetRight > visibleWindowAbsolute.right) && (absoluteCoordinates.left >= visibleWindowAbsolute.left)) {
            return (target.offsetWidth - (targetRight - visibleWindowAbsolute.right));
        }
        return window.document.documentElement.clientWidth;
    }
    function determineVisibleTargetHeight(target, absoluteCoordinates) {
        const targetBottom = absoluteCoordinates.top + target.offsetHeight;
        const visibleWindowAbsolute = {
            left: window.pageXOffset,
            top: window.pageYOffset,
            right: window.pageXOffset + window.document.documentElement.clientWidth,
            bottom: window.pageYOffset + window.document.documentElement.clientHeight
        };
        const isEntirelyOnScreen = ((absoluteCoordinates.top >= visibleWindowAbsolute.top) && (targetBottom <= visibleWindowAbsolute.bottom));
        if (isEntirelyOnScreen) {
            return target.offsetHeight;
        }
        if ((targetBottom < visibleWindowAbsolute.top) || (absoluteCoordinates.top > visibleWindowAbsolute.bottom)) {
            return 0;
        }
        if ((absoluteCoordinates.top < visibleWindowAbsolute.top) && (targetBottom <= visibleWindowAbsolute.bottom)) {
            return (target.offsetHeight - (visibleWindowAbsolute.top - absoluteCoordinates.top));
        }
        if ((targetBottom > visibleWindowAbsolute.bottom) && (absoluteCoordinates.top >= visibleWindowAbsolute.top)) {
            return (target.offsetHeight - (targetBottom - visibleWindowAbsolute.bottom));
        }
        return window.document.documentElement.clientHeight;
    }
    function handleContextMenuShow(target, clientX, clientY) {
        let id;
        if (!target) {
            return false;
        }
        const originalTarget = target;
        while (target.parentElement) {
            id = target.getAttribute("data-plugin-contextmenu");
            if (id !== null) {
                const contextMenu = contextMenuStorage[id];
                let coordinates = { X: clientX, Y: clientY };
                if (typeof (host.adjustShowCoordinates) === "function") {
                    coordinates = host.adjustShowCoordinates(coordinates);
                }
                if (coordinates.X === 0 && coordinates.Y === 0) {
                    const absoluteOffset = getAbsoluteOffset(originalTarget);
                    const onscreenWidth = determineVisibleTargetWidth(originalTarget, absoluteOffset);
                    const onscreenHeight = determineVisibleTargetHeight(originalTarget, absoluteOffset);
                    if (onscreenWidth === 0 || onscreenHeight === 0) {
                        coordinates.X = coordinates.Y = 0;
                    }
                    else {
                        const midPointX = onscreenWidth / 2;
                        const midPointY = onscreenHeight / 2;
                        if (absoluteOffset.left < window.pageXOffset ||
                            originalTarget.offsetWidth > window.document.documentElement.clientWidth) {
                            coordinates.X = midPointX;
                        }
                        else {
                            coordinates.X = ((absoluteOffset.left - window.pageXOffset) + midPointX);
                        }
                        if (absoluteOffset.top < window.pageYOffset ||
                            originalTarget.offsetHeight > window.document.documentElement.clientHeight) {
                            coordinates.Y = midPointY;
                        }
                        else {
                            coordinates.Y = ((absoluteOffset.top - window.pageYOffset) + midPointY);
                        }
                    }
                }
                if (coordinatesAreOutsideOfVisibleClientArea(coordinates.X, coordinates.Y)) {
                    coordinates.X = coordinates.Y = 0;
                }
                contextMenu.show(coordinates.X, coordinates.Y, 0, target.id);
                return true;
            }
            target = target.parentElement;
            if (!target) {
                return false;
            }
        }
        return false;
    }
    function stopPropagation(event) {
        event.stopPropagation();
        event.preventDefault();
    }
    ;
    function onKeyDown(event) {
        if (event.key === "F10" && event.shiftKey && !event.altKey && !event.ctrlKey) {
            const element = document.activeElement;
            if (handleContextMenuShow(element, 0, 0)) {
                event.preventDefault();
            }
        }
    }
    function onResize(event) {
        if (!canCreatePopup()) {
            dismissAll();
        }
    }
    function onClick(event) {
        handleDismissingEvent(event);
    }
    function onWheel(event) {
        handleDismissingEvent(event);
    }
    function handleDismissingEvent(event) {
        let currentElement = event.target;
        while (currentElement) {
            if (currentElement.hasAttribute("data-plugin-is-contextmenu")) {
                return;
            }
            currentElement = currentElement.parentElement;
        }
        dismissAll();
    }
    function onContextMenu(event) {
        handleContextMenuShow(event.target, event.clientX, event.clientY);
        event.preventDefault();
    }
    function handlePopupMenuItemClick(event, contextMenuId) {
        const target = event.currentTarget;
        if (!target.classList.contains("disabled") && isNullOrEmpty(target.getAttribute("data-plugin-contextmenu"))) {
            host.callback(target.id, contextMenuId);
        }
        else if (target.classList.contains("disabled")) {
            target.focus();
        }
        stopPropagation(event);
    }
    function popupDeactivateSiblingSubmenus(currentTarget, contextMenuId) {
        if (!currentTarget.classList.contains("active")) {
            const coordinates = { X: 1, Y: currentTarget.offsetTop + 1 };
            host.dismissSubmenus(coordinates, contextMenuId);
            const siblings = currentTarget.parentNode.querySelectorAll("[data-plugin-contextmenu]");
            for (let i = 0; i < siblings.length; i++) {
                const sibling = siblings[i];
                sibling.classList.remove("active");
            }
        }
    }
    function popupShowSubmenu(currentTarget) {
        if (!currentTarget.classList.contains("active")) {
            const submenuId = currentTarget.getAttribute("data-plugin-contextmenu");
            if (submenuId !== null && typeof (submenuId) !== "undefined") {
                const submenu = document.getElementById(submenuId);
                currentTarget.classList.add("active");
                show(submenu, null, 0, 0, currentTarget.offsetTop, 0, null, null, host.show.bind(host));
            }
        }
    }
    function handlePopupMenuItemMouseEnter(event, contextMenuId) {
        const currentTarget = event.currentTarget;
        if (shouldFocusMenuItem(currentTarget)) {
            currentTarget.focus();
        }
        popupDeactivateSiblingSubmenus(event.currentTarget, contextMenuId);
        popupShowSubmenu(currentTarget);
    }
    function handleContextMenuItemMouseLeave(event) {
        const currentTarget = event.currentTarget;
        currentTarget.classList.remove("active");
        currentTarget.blur();
    }
    function handlePopupMenuItemFocus(event, contextMenuId) {
        popupDeactivateSiblingSubmenus(event.currentTarget, contextMenuId);
    }
    function getMenuItemStartIndex(target, currentTarget, menuItems) {
        let startIndex = 0;
        if (target !== currentTarget) {
            for (let i = 0; i < menuItems.length; i++) {
                const element = menuItems[i];
                if (element === target) {
                    startIndex = i + 1;
                    break;
                }
            }
        }
        return startIndex;
    }
    function getPreviousMenuItem(startIndex, menuItems) {
        let elementToFocus;
        for (let i = startIndex - 2; i >= 0; i--) {
            const element = menuItems[i];
            if (shouldFocusMenuItem(element)) {
                elementToFocus = element;
                break;
            }
        }
        if (!elementToFocus) {
            for (let i = menuItems.length - 1; i > startIndex - 1; i--) {
                const element = menuItems[i];
                if (shouldFocusMenuItem(element)) {
                    elementToFocus = element;
                    break;
                }
            }
        }
        return elementToFocus;
    }
    ;
    function getNextMenuItem(startIndex, menuItems) {
        let elementToFocus;
        for (let i = startIndex; i < menuItems.length; i++) {
            const element = menuItems[i];
            if (shouldFocusMenuItem(element)) {
                elementToFocus = element;
                break;
            }
        }
        if (!elementToFocus) {
            for (let i = 0; i < startIndex - 1; i++) {
                const element = menuItems[i];
                if (shouldFocusMenuItem(element)) {
                    elementToFocus = element;
                    break;
                }
            }
        }
        return elementToFocus;
    }
    ;
    function handleDismissCurrent(currentTarget, ignoreDismissForRoot) {
        if (canCreatePopup()) {
            host.dismissCurrent(ignoreDismissForRoot);
            return;
        }
        const isRoot = !currentTarget.hasAttribute("plugin-contextmenu-parent");
        if (ignoreDismissForRoot && isRoot) {
            return;
        }
        contextMenuStorage[currentTarget.id].dismiss();
        if (!isRoot) {
            focusActiveMenuItem(currentTarget.getAttribute("plugin-contextmenu-parent"));
        }
    }
    ;
    function focusActiveMenuItem(menuId) {
        const menu = document.getElementById(menuId);
        menu.focus();
        const menuItems = menu.getElementsByClassName("menuitem");
        for (let i = 0; i < menuItems.length; i++) {
            const element = menuItems[i];
            if (element.classList.contains("active")) {
                element.classList.remove("active");
                element.focus();
            }
        }
    }
    ;
    function onMenuItemKeyDown(event) {
        const target = event.target;
        switch (event.keyCode) {
            case 13:
                showSubmenu(target);
                target.click();
                event.preventDefault();
                event.stopImmediatePropagation();
                break;
            case 39:
                showSubmenu(target);
                event.preventDefault();
                event.stopImmediatePropagation();
                break;
        }
    }
    ;
    function onAttrModified(event) {
        if (event.attrName === "aria-checked" && event.attrChange === 1) {
            handlePopupMenuItemClick(event);
        }
    }
    ;
    function positionContextMenuInsideAirspace(positionInfo) {
        let y = positionInfo.clientCoordinates.Y;
        const yMirror = positionInfo.clientCoordinates.Y - positionInfo.height;
        if (positionInfo.clientCoordinates.Y + positionInfo.height > positionInfo.viewPortHeight && yMirror >= 0) {
            y = yMirror;
        }
        let x = positionInfo.clientCoordinates.X;
        const xMirror = positionInfo.clientCoordinates.X - (positionInfo.width + positionInfo.widthOffset);
        if (positionInfo.clientCoordinates.X + positionInfo.width > positionInfo.viewPortWidth && xMirror >= 0) {
            x = xMirror;
        }
        positionInfo.clientCoordinates.Y = y;
        positionInfo.clientCoordinates.X = x;
        return positionInfo;
    }
    function isNullOrEmpty(value) {
        return (value === null || typeof (value) === "undefined" || value === "");
    }
    class HostContextMenu {
        id;
        ariaLabel;
        callback;
        eventManager;
        disposableEventListeners = [];
        host;
        currentTargetId;
        activeElement;
        urlRegEx = /url\(['"]?([^'"]*)['"]?\)/gm;
        iconIsTokenRegEx = /^[^\:\.]*$/;
        constructor(menuItems, contextMenuHost, themeHost, __n, id, ariaLabel, cssClass, callback, parentMenu, parentMenuId) {
            this.host = contextMenuHost;
            if (menuItems === null || typeof (menuItems) === "undefined" || menuItems.length === 0) {
                throw new Error("Must provide a non-empty list of menu items to display.");
            }
            if (typeof (id) !== "string" && !isNullOrEmpty(id)) {
                throw new Error("'id' input must be a non-empty string.");
            }
            this.id = !isNullOrEmpty(id) ? id : this.generateId("plugin-contextmenu");
            this.ariaLabel = ariaLabel;
            if (!isNullOrEmpty(contextMenuStorage[this.id])) {
                throw new Error("Non-unique id provided. Please select another id for this context menu.");
            }
            if (typeof (cssClass) !== "string" && !isNullOrEmpty(cssClass)) {
                throw new Error("Invalid CSS provided for the context menu.");
            }
            this.callback = callback;
            this.eventManager = new EventManager_1.EventManager(this);
            const contextMenu = document.createElement("ul");
            contextMenu.id = this.id;
            if (!isNullOrEmpty(parentMenu)) {
                const fireShowEvent = (eventManager) => {
                    return (event) => {
                        eventManager.dispatchEvent("show");
                    };
                };
                this.addDisposableEventListener(parentMenu, "show", fireShowEvent(this.eventManager));
                contextMenu.setAttribute("plugin-contextmenu-parent", parentMenuId);
            }
            contextMenu.className = "plugin-contextmenu";
            if (!isNullOrEmpty(cssClass)) {
                contextMenu.classList.add(cssClass);
            }
            contextMenu.setAttribute("data-plugin-is-contextmenu", "true");
            let tabIndex = 1;
            for (let item in menuItems) {
                if (!menuItems.hasOwnProperty(item)) {
                    continue;
                }
                const contextMenuItem = document.createElement("li");
                contextMenuItem.className = "menuitem";
                if (menuItems[item].type !== MenuItemType.separator) {
                    contextMenuItem.setAttribute("tabIndex", tabIndex.toString());
                    tabIndex++;
                }
                let role = "";
                switch (menuItems[item].type) {
                    case MenuItemType.checkbox:
                        role = "menuitemcheckbox";
                        break;
                    case MenuItemType.command:
                        role = "menuitem";
                        break;
                    case MenuItemType.separator:
                        role = "separator";
                        break;
                    case MenuItemType.radio:
                        role = "menuitemradio";
                        break;
                }
                contextMenuItem.setAttribute("role", role);
                const itemId = menuItems[item].id;
                contextMenuItem.id = !isNullOrEmpty(itemId) ? itemId : this.generateId("plugin-contextmenuitem");
                const enabledIcon = menuItems[item].iconEnabled;
                if (!isNullOrEmpty(enabledIcon) && typeof (enabledIcon) !== "string") {
                    throw new Error("The enabled icon is invalid.");
                }
                const disabledIcon = menuItems[item].iconDisabled;
                if (!isNullOrEmpty(disabledIcon) && typeof (disabledIcon) !== "string") {
                    throw new Error("The disabled icon is invalid.");
                }
                const iconImg = document.createElement("img");
                iconImg.className = "icon";
                iconImg.style.visibility = "hidden";
                contextMenuItem.appendChild(iconImg);
                const mainDiv = document.createElement("div");
                mainDiv.className = "main";
                const label = menuItems[item].label;
                const isEmpty = isNullOrEmpty(label);
                if ((isEmpty && (menuItems[item].type !== MenuItemType.separator)) || ((typeof (label) !== "string") && !isEmpty)) {
                    throw new Error("Unable to provide the proper label.");
                }
                if (!isEmpty) {
                    mainDiv.innerText = label;
                }
                contextMenuItem.appendChild(mainDiv);
                const shortcut = menuItems[item].accessKey;
                if (!isNullOrEmpty(shortcut) && typeof (shortcut) !== "string") {
                    throw new Error("Unable to set the access key shortcut.");
                }
                if (!isNullOrEmpty(shortcut)) {
                    const shortcutDiv = document.createElement("div");
                    shortcutDiv.className = "shortcut";
                    shortcutDiv.innerText = shortcut;
                    contextMenuItem.appendChild(shortcutDiv);
                }
                let menuItemCallback = menuItems[item].callback;
                if (isNullOrEmpty(menuItemCallback)) {
                    menuItemCallback = this.callback;
                }
                if ((typeof (menuItemCallback) !== "function") && (menuItems[item].type !== MenuItemType.separator)) {
                    throw new Error("The menu item callback is invalid.");
                }
                const passCallbackToClickEvent = (callback) => {
                    return async (event) => {
                        const item = event.currentTarget;
                        if (callback && !item.classList.contains("disabled") && isNullOrEmpty(item.getAttribute("data-plugin-contextmenu"))) {
                            let type;
                            switch (item.getAttribute("data-plugin-contextmenu-item-type")) {
                                case "checkbox":
                                    type = MenuItemType.checkbox;
                                    break;
                                case "command":
                                    type = MenuItemType.command;
                                    break;
                                case "separator":
                                    type = MenuItemType.separator;
                                    break;
                                case "radio":
                                    type = MenuItemType.radio;
                                    break;
                                default:
                                    throw new Error(`Unknown menu item type: ${item.getAttribute("data-plugin-contextmenu-item-type")}.`);
                            }
                            const contextMenuItem = {
                                id: item.id,
                                callback: callback,
                                label: item.getElementsByClassName("main")[0].innerText,
                                type: type,
                                iconEnabled: item.getElementsByClassName("icon")[0].src,
                                iconDisabled: "",
                                accessKey: item.getElementsByClassName("shortcut")[0]?.innerText,
                                hidden: () => { return false; },
                                disabled: () => { return false; },
                                checked: () => { return item.getAttribute("aria-checked") === "true"; },
                                cssClass: item.className,
                                submenu: null
                            };
                            await ContextMenu.dismissAll();
                            callback(item.parentNode.id, contextMenuItem, this.currentTargetId);
                        }
                        else {
                            this.stopPropagation(event);
                        }
                    };
                };
                this.addDisposableEventListener(contextMenuItem, "click", passCallbackToClickEvent(menuItemCallback), false);
                this.addDisposableEventListener(contextMenuItem, "contextmenu", passCallbackToClickEvent(menuItemCallback), false);
                const passMenuItemCallbacksToShowEvent = (isHidden, isDisabled, isChecked, iconEnabled, iconDisabled, type, item) => {
                    return (event) => {
                        if (typeof (isHidden) === "function" && isHidden()) {
                            item.classList.add("hidden");
                        }
                        else {
                            item.classList.remove("hidden");
                        }
                        let icon;
                        if (typeof (isDisabled) === "function" && isDisabled()) {
                            item.classList.add("disabled");
                            item.setAttribute("aria-disabled", "true");
                            icon = iconDisabled;
                        }
                        else {
                            item.classList.remove("disabled");
                            item.removeAttribute("aria-disabled");
                            icon = iconEnabled;
                        }
                        const iconImg = item.getElementsByClassName("icon")[0];
                        switch (type) {
                            case MenuItemType.checkbox:
                                item.removeAttribute("aria-checked");
                                if (typeof (isChecked) === "function" && isChecked()) {
                                    let backgroundSrc = getComputedStyle(iconImg).getPropertyValue("background-image");
                                    backgroundSrc = backgroundSrc.replace(this.urlRegEx, (urlMatch, src) => {
                                        return src;
                                    });
                                    iconImg.src = backgroundSrc;
                                    item.setAttribute("aria-checked", "true");
                                    iconImg.style.visibility = "visible";
                                }
                                else {
                                    item.setAttribute("aria-checked", "false");
                                    iconImg.style.visibility = "hidden";
                                }
                                break;
                            case MenuItemType.command:
                                if (!isNullOrEmpty(icon)) {
                                    if (this.iconIsTokenRegEx.test(icon)) {
                                        iconImg.setAttribute("data-plugin-theme-src", icon);
                                    }
                                    else {
                                        iconImg.src = icon;
                                        iconImg.removeAttribute("data-plugin-theme-src");
                                    }
                                    iconImg.style.visibility = "visible";
                                }
                                else {
                                    iconImg.style.visibility = "hidden";
                                }
                                break;
                        }
                    };
                };
                const isHidden = menuItems[item].hidden;
                if (!isNullOrEmpty(isHidden) && typeof (isHidden) !== "function") {
                    throw new Error("'isHidden' menu item is invalid: it should be a null or a function.");
                }
                const isDisabled = menuItems[item].disabled;
                if (!isNullOrEmpty(isDisabled) && typeof (isDisabled) !== "function") {
                    throw new Error("'isDisabled' menu item is invalid: it should be a null or a function.");
                }
                const isChecked = menuItems[item].checked;
                if (!isNullOrEmpty(isChecked) && typeof (isChecked) !== "function") {
                    throw new Error("'isChecked' menu item is invalid: it should be a null or a function.");
                }
                this.addDisposableEventListener(this, "show", passMenuItemCallbacksToShowEvent(isHidden, isDisabled, isChecked, menuItems[item].iconEnabled, menuItems[item].iconDisabled, menuItems[item].type, contextMenuItem));
                const itemCssClass = menuItems[item].cssClass;
                if (!isNullOrEmpty(itemCssClass) && typeof (itemCssClass) !== "string") {
                    throw new Error("Invalid item css: should be null or a string.");
                }
                if (!isNullOrEmpty(itemCssClass)) {
                    contextMenuItem.classList.add(itemCssClass);
                }
                let submenu = menuItems[item].submenu;
                const isSubmenuNullOrUndefined = (typeof (submenu) === "undefined" || submenu === null);
                if (!isSubmenuNullOrUndefined && !Array.isArray(submenu)) {
                    throw new Error("Submenu is invalid: it should be null or an array.");
                }
                let submenuId;
                if (!isSubmenuNullOrUndefined) {
                    submenuId = this.generateId("plugin-contextsubmenu");
                    new HostContextMenu(submenu, host, themeHost, __n, submenuId, null, cssClass, menuItemCallback, this, this.id);
                    const arrowDiv = document.createElement("div");
                    arrowDiv.className = "arrow";
                    contextMenuItem.setAttribute("data-plugin-contextmenu", submenuId);
                    contextMenuItem.appendChild(arrowDiv);
                }
                const deactivateSiblingSubmenus = (currentTarget) => {
                    if (getComputedStyle(currentTarget.parentElement).getPropertyValue("display") !== "none") {
                        const siblings = currentTarget.parentElement.querySelectorAll("[data-plugin-contextmenu]");
                        for (let i = 0; i < siblings.length; i++) {
                            let sibling = siblings[i];
                            if (sibling !== currentTarget) {
                                if (typeof (sibling.className) !== "undefined") {
                                    sibling.classList.remove("active");
                                    submenuId = sibling.getAttribute("data-plugin-contextmenu");
                                    document.getElementById(submenuId).style.display = "none";
                                }
                            }
                        }
                    }
                };
                this.addDisposableEventListener(contextMenuItem, "mouseover", (event) => {
                    const currentTarget = event.currentTarget;
                    if (ContextMenu.shouldFocusMenuItem(currentTarget)) {
                        currentTarget.focus();
                    }
                    else {
                        deactivateSiblingSubmenus(event.currentTarget);
                    }
                    ContextMenu.showSubmenu(currentTarget);
                }, false);
                this.addDisposableEventListener(contextMenuItem, "mouseout", this.handleContextMenuItemMouseOut, false);
                this.addDisposableEventListener(contextMenuItem, "focus", (event) => {
                    deactivateSiblingSubmenus(event.currentTarget);
                }, false);
                this.addDisposableEventListener(contextMenuItem, "keydown", this.onMenuItemKeyDown, false);
                switch (menuItems[item].type) {
                    case MenuItemType.checkbox:
                        iconImg.classList.add("checkbox");
                        contextMenuItem.setAttribute("data-plugin-contextmenu-item-type", "checkbox");
                        break;
                    case MenuItemType.command:
                        contextMenuItem.setAttribute("data-plugin-contextmenu-item-type", "command");
                        break;
                    case MenuItemType.radio:
                        throw new Error("Not implemented");
                    case MenuItemType.separator:
                        mainDiv.classList.add("hr");
                        contextMenuItem.setAttribute("data-plugin-contextmenu-item-type", "separator");
                        break;
                    default:
                        throw new Error(`Unknown menu item type ${menuItems[item].type}.`);
                }
                contextMenu.appendChild(contextMenuItem);
            }
            this.addDisposableEventListener(contextMenu, "click", this.stopPropagation, false);
            this.addDisposableEventListener(contextMenu, "contextmenu", this.stopPropagation, false);
            const fireDismiss = (contextMenu, id) => {
                return (event) => {
                    if (id === event.id) {
                        if (this.activeElement) {
                            if (typeof (this.activeElement.focus) === "function") {
                                this.activeElement.focus();
                            }
                            this.activeElement = null;
                        }
                        contextMenu.eventManager.dispatchEvent("dismiss");
                        isContextMenuShowing = Math.max(0, isContextMenuShowing - 1);
                    }
                };
            };
            this.host.addEventListener("contextmenudismissed", fireDismiss(this, this.id));
            contextMenuContainer.appendChild(contextMenu);
            contextMenuStorage[contextMenu.id] = this;
            this.addDisposableEventListener(contextMenu, "keydown", ContextMenu.onContextMenuKeyDown, false);
        }
        attach(element) {
            if (isNullOrEmpty(this.id)) {
                throw new Error("Must have a non-empty id to attach.");
            }
            if (isNullOrEmpty(element)) {
                throw new Error('Must have a non-empty element to attach to.');
            }
            element.setAttribute("data-plugin-contextmenu", this.id);
        }
        detach(element) {
            if (isNullOrEmpty(this.id)) {
                throw new Error("Must have a non-empty id to detach.");
            }
            if (isNullOrEmpty(element)) {
                throw new Error('Must have a non-empty HTML element to detach from.');
            }
            if (element.getAttribute("data-plugin-contextmenu") === this.id) {
                element.removeAttribute("data-plugin-contextmenu");
            }
        }
        dismiss() {
            if (isNullOrEmpty(this.id)) {
                throw new Error("Must have a non-empty id to dismiss.");
            }
            isContextMenuShowing = Math.max(0, isContextMenuShowing - 1);
            if (!ContextMenu.canCreatePopup()) {
                const contextMenu = document.getElementById(this.id);
                if (contextMenu?.style?.display !== "none") {
                    document.getElementById(this.id).style.display = "none";
                    if (this.activeElement) {
                        if (typeof (this.activeElement.focus) === "function") {
                            this.activeElement.focus();
                        }
                        this.activeElement = null;
                    }
                    this.eventManager.dispatchEvent("dismiss");
                }
            }
            else {
                this.host.dismiss();
            }
        }
        dispose() {
            if (isNullOrEmpty(this.id)) {
                throw new Error("Must have a non-empty id to dispose.");
            }
            this.disposableEventListeners.forEach((listener) => {
                listener.uninstall();
            });
            this.disposableEventListeners = [];
            const nodeList = (document.querySelectorAll("[data-plugin-contextmenu=" + this.id + "]"));
            for (let i = 0; i < nodeList.length; i++) {
                nodeList[i].removeAttribute("data-plugin-contextmenu");
            }
            this.removeContextMenuFromStorage(this.id);
            this.id = null;
            this.callback = null;
        }
        show(xPosition, yPosition, widthOffset, targetId) {
            if (isNullOrEmpty(this.id)) {
                throw new Error("Must have a non-empty id to show.");
            }
            if (!this.isFiniteNumber(xPosition) || !this.isFiniteNumber(yPosition)) {
                throw new Error("X and Y positions must be finite numbers.");
            }
            if (!this.isFiniteNumber(widthOffset) && !isNullOrEmpty(widthOffset)) {
                throw new Error("If width offset is defined, it must be a finite number.");
            }
            if (typeof (targetId) !== "string" && !isNullOrEmpty(targetId)) {
                throw new Error("'targetId' input must be empty or a string.");
            }
            ContextMenu.dismissAll();
            this.currentTargetId = targetId;
            this.activeElement = document.activeElement;
            const offset = widthOffset || 0;
            const element = document.getElementById(this.id);
            for (let i = 0; i < element.children.length; i++) {
                element.children[i].classList.remove("active");
            }
            this.eventManager.dispatchEvent("show");
            ContextMenu.show(element, this.ariaLabel, xPosition, yPosition, 0, offset, null, positionContextMenuInsideAirspace, this.host.show.bind(this.host));
        }
        addEventListener(type, listener) {
            if (isNullOrEmpty(this.id)) {
                throw new Error("Must have a non-empty id to add an event listener.");
            }
            this.eventManager.addEventListener(type, listener);
        }
        removeEventListener(type, listener) {
            if (isNullOrEmpty(this.id)) {
                throw new Error("Must have a non-empty id to remove an event listener.");
            }
            this.eventManager.removeEventListener(type, listener);
        }
        dispatchEvent(evt) {
            if (isNullOrEmpty(this.id)) {
                throw new Error("Must have a non-empty id to dispatch an event.");
            }
            return this.eventManager.dispatchEvent(evt.type);
        }
        onMenuItemKeyDown = (event) => {
            const target = event.target;
            switch (event.keyCode) {
                case 13:
                    ContextMenu.showSubmenu(target);
                    target.click();
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    break;
                case 39:
                    ContextMenu.showSubmenu(target);
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    break;
            }
        };
        handleContextMenuItemMouseOut = (event) => {
            const currentTarget = event.currentTarget;
            currentTarget.classList.remove("active");
            currentTarget.blur();
        };
        stopPropagation = (event) => {
            event.stopPropagation();
            event.preventDefault();
        };
        removeContextMenuFromStorage(id) {
            const menu = document.getElementById(id);
            if (menu) {
                contextMenuContainer.removeChild(menu);
                delete contextMenuStorage[id];
                const submenuItems = menu.querySelectorAll("[data-plugin-contextmenu]");
                for (let i = 0; i < submenuItems.length; i++) {
                    this.removeContextMenuFromStorage(submenuItems[i].getAttribute("data-plugin-contextmenu"));
                }
            }
        }
        isFiniteNumber(value) {
            return typeof (value) === "number" && isFinite(value);
        }
        generateId(prefix) {
            if (isNullOrEmpty(prefix)) {
                throw new Error("'prefix' input must be non-null and non-empty.");
            }
            const getHexDigits = (count) => {
                let random = "";
                while (random.length < count) {
                    random += Math.floor(Math.random() * 65536).toString(16);
                }
                return random.substr(0, count);
            };
            return prefix + "-" + getHexDigits(8) + "-" + getHexDigits(4) + "-" + getHexDigits(4) + "-" + getHexDigits(4) + "-" + getHexDigits(12);
        }
        addDisposableEventListener(target, type, listener, useCapture) {
            const disposableListener = new disposableEventListener_1.DisposableEventListener(target, type, listener, useCapture);
            disposableListener.install();
            this.disposableEventListeners.push(disposableListener);
        }
    }
    ContextMenu.HostContextMenu = HostContextMenu;
    ;
    let MenuItemType;
    (function (MenuItemType) {
        MenuItemType[MenuItemType["checkbox"] = 0] = "checkbox";
        MenuItemType[MenuItemType["command"] = 1] = "command";
        MenuItemType[MenuItemType["radio"] = 2] = "radio";
        MenuItemType[MenuItemType["separator"] = 3] = "separator";
    })(MenuItemType = ContextMenu.MenuItemType || (ContextMenu.MenuItemType = {}));
})(ContextMenu = exports.ContextMenu || (exports.ContextMenu = {}));

},{"./Contracts/EventManager":1,"./core":5,"./disposableEventListener":8,"./theme":16}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalPluginEventManager = exports.formatString = void 0;
const EventManager_1 = require("./Contracts/EventManager");
function formatString(message, optionalParams) {
    let currentParameterIndex = 0;
    let currentSubstringIndex = 0;
    let result = "";
    message = "" + message;
    while (currentSubstringIndex < message.length) {
        const replacementIndex = message.indexOf("%", currentSubstringIndex);
        if (replacementIndex === -1 || replacementIndex === message.length - 1) {
            result += message.substring(currentSubstringIndex);
            currentSubstringIndex = message.length;
        }
        else {
            result += message.substring(currentSubstringIndex, replacementIndex);
            currentSubstringIndex = replacementIndex + 1;
            let argumentValue = optionalParams[currentParameterIndex];
            switch (message[currentSubstringIndex]) {
                case "d":
                case "i":
                    if (typeof argumentValue !== "undefined") {
                        if (typeof argumentValue === "number") {
                            argumentValue = argumentValue >= 0 ? Math.floor(argumentValue) : Math.ceil(argumentValue);
                        }
                        else {
                            argumentValue = parseInt(argumentValue);
                        }
                        if (argumentValue !== ~~argumentValue) {
                            argumentValue = 0;
                        }
                    }
                    result += argumentValue;
                    currentParameterIndex++;
                    currentSubstringIndex++;
                    break;
                case "f":
                    if (argumentValue === null) {
                        argumentValue = 0;
                    }
                    else if (typeof argumentValue !== "undefined") {
                        argumentValue = parseFloat(argumentValue);
                    }
                    result += argumentValue;
                    currentParameterIndex++;
                    currentSubstringIndex++;
                    break;
                case "s":
                case "o":
                    if (typeof argumentValue !== "undefined") {
                        argumentValue = "" + argumentValue;
                    }
                    result += argumentValue;
                    currentParameterIndex++;
                    currentSubstringIndex++;
                    break;
                case "%":
                    result += "%";
                    currentSubstringIndex++;
                    break;
                default:
                    result += "%";
                    break;
            }
        }
    }
    for (let i = currentParameterIndex; i < optionalParams.length; i++) {
        result += optionalParams[i];
    }
    return result;
}
exports.formatString = formatString;
exports.GlobalPluginEventManager = new EventManager_1.EventManager('Plugin');

},{"./Contracts/EventManager":1}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Culture = void 0;
const EventManager_1 = require("./Contracts/EventManager");
const core_1 = require("./core");
var Culture;
(function (Culture) {
    let host;
    let domInitialized = false;
    let eventManager = new EventManager_1.EventManager({});
    Culture.dir = '';
    Culture.lang = '';
    Culture.formatRegion = '';
    Culture.numberFormat = null;
    Culture.dateTimeFormat = null;
    function initialize(cultureHost) {
        host = cultureHost;
        host.addEventListener("cultureinitialize", (eventArgs) => {
            if (!setCultureInfoAndAttributes(eventArgs.language, eventArgs.direction, eventArgs.formatRegion, eventArgs.dateTimeFormat, eventArgs.numberFormat)) {
                core_1.GlobalPluginEventManager.addEventListener("load", () => setCultureInfoAndAttributes(eventArgs.language, eventArgs.direction, eventArgs.formatRegion, eventArgs.dateTimeFormat, eventArgs.numberFormat));
            }
        });
        host.addEventListener("culturechanged", (eventArgs) => {
            setCultureInfoAndAttributes(eventArgs.language, eventArgs.direction, eventArgs.formatRegion, eventArgs.dateTimeFormat, eventArgs.numberFormat);
            eventManager.dispatchEvent("culturechanged");
        });
    }
    Culture.initialize = initialize;
    function addEventListener(type, listener) {
        eventManager.addEventListener(type, listener);
    }
    Culture.addEventListener = addEventListener;
    function removeEventListener(type, listener) {
        eventManager.removeEventListener(type, listener);
    }
    Culture.removeEventListener = removeEventListener;
    function setCultureInfoAndAttributes(language, direction, _formatRegion, _dateTimeFormat, _numberFormat) {
        Culture.lang = language;
        Culture.dir = direction;
        Culture.formatRegion = _formatRegion;
        Culture.numberFormat = _numberFormat;
        Culture.dateTimeFormat = _dateTimeFormat;
        if (!domInitialized) {
            const htmlTags = document.getElementsByTagName("html");
            if (htmlTags.length > 0) {
                domInitialized = true;
                htmlTags[0].dir = direction;
                htmlTags[0].lang = language;
                eventManager.dispatchEvent("cultureinitialize");
            }
            else {
                return false;
            }
        }
        return true;
    }
    let DayOfWeek;
    (function (DayOfWeek) {
        DayOfWeek[DayOfWeek["Sunday"] = 0] = "Sunday";
        DayOfWeek[DayOfWeek["Monday"] = 1] = "Monday";
        DayOfWeek[DayOfWeek["Tuesday"] = 2] = "Tuesday";
        DayOfWeek[DayOfWeek["Wednesday"] = 3] = "Wednesday";
        DayOfWeek[DayOfWeek["Thursday"] = 4] = "Thursday";
        DayOfWeek[DayOfWeek["Friday"] = 5] = "Friday";
        DayOfWeek[DayOfWeek["Saturday"] = 6] = "Saturday";
    })(DayOfWeek = Culture.DayOfWeek || (Culture.DayOfWeek = {}));
})(Culture = exports.Culture || (exports.Culture = {}));

},{"./Contracts/EventManager":1,"./core":5}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diagnostics = void 0;
var Diagnostics;
(function (Diagnostics) {
    let host;
    function initialize(diagnosticsHost) {
        window.onerror = onerror;
        host = diagnosticsHost;
    }
    Diagnostics.initialize = initialize;
    function onerror(message, uri, lineNumber, columnNumber, error) {
        if (error) {
            message = error;
        }
        reportError(message, uri, lineNumber, [], columnNumber);
        terminate();
        return true;
    }
    Diagnostics.onerror = onerror;
    function reportError(error, uri, lineNumber, additionalInfo, columnNumber) {
        let message;
        let lineNumberText;
        let columnNumberText;
        if (error instanceof Error) {
            message = error.message ? error.message.toString() : null;
            const originalAdditionalInfo = additionalInfo;
            if (error && "number" in error && error["number"] !== undefined && (typeof error["number"] === "number")) {
                additionalInfo = "Error number: 0x" + (error["number"] >>> 0).toString(16) + "\r\n";
            }
            additionalInfo += "Stack: " + error.stack;
            if (originalAdditionalInfo) {
                const additionalInfoString = originalAdditionalInfo.toString();
                if (additionalInfoString && additionalInfoString.length > 0) {
                    additionalInfo += "\r\n\r\nAdditional Info: " + additionalInfoString;
                }
            }
        }
        else {
            message = error ? error.toString() : null;
            additionalInfo = additionalInfo ? additionalInfo.toString() : null;
        }
        uri = uri ? uri.toString() : null;
        lineNumberText = lineNumber || lineNumber === 0 ? lineNumber.toString() : null;
        columnNumberText = columnNumber || columnNumber === 0 ? columnNumber.toString() : null;
        return host.reportError(message, uri, lineNumberText, additionalInfo, columnNumberText);
    }
    Diagnostics.reportError = reportError;
    function terminate() {
        host.terminate();
    }
    Diagnostics.terminate = terminate;
})(Diagnostics = exports.Diagnostics || (exports.Diagnostics = {}));

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisposableEventListener = void 0;
class DisposableEventListener {
    target;
    type;
    listener;
    useCapture;
    constructor(target, type, listener, useCapture) {
        this.target = target;
        this.type = type;
        this.listener = listener;
        this.useCapture = useCapture;
    }
    install() {
        this.target.addEventListener(this.type, this.listener, this.useCapture);
    }
    uninstall() {
        this.target.removeEventListener(this.type, this.listener, this.useCapture);
    }
}
exports.DisposableEventListener = DisposableEventListener;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Host = void 0;
var Host;
(function (Host) {
    let host;
    Object.defineProperty(Host, "version", {
        get: function () {
            return host.version;
        }
    });
    function initialize(pluginHost) {
        host = pluginHost;
    }
    Host.initialize = initialize;
    function showDocument(documentPath, line, col) {
        return host.showDocument("" + documentPath, +line, +col);
    }
    Host.showDocument = showDocument;
    ;
    function getDocumentLocation(documentPath) {
        return host.getDocumentLocation("" + documentPath);
    }
    Host.getDocumentLocation = getDocumentLocation;
    ;
    function supportsAllowSetForeground() {
        return host.supportsAllowSetForeground();
    }
    Host.supportsAllowSetForeground = supportsAllowSetForeground;
    function allowSetForeground(processId) {
        return host.allowSetForeground(processId);
    }
    Host.allowSetForeground = allowSetForeground;
    ;
    function showMessage(message, options) {
        return host.showMessage(message, options);
    }
    Host.showMessage = showMessage;
    let ShowMessageIcon;
    (function (ShowMessageIcon) {
        ShowMessageIcon[ShowMessageIcon["none"] = 0] = "none";
        ShowMessageIcon[ShowMessageIcon["error"] = 1] = "error";
        ShowMessageIcon[ShowMessageIcon["query"] = 2] = "query";
        ShowMessageIcon[ShowMessageIcon["warning"] = 3] = "warning";
        ShowMessageIcon[ShowMessageIcon["info"] = 4] = "info";
    })(ShowMessageIcon = Host.ShowMessageIcon || (Host.ShowMessageIcon = {}));
    let ShowMessageButtons;
    (function (ShowMessageButtons) {
        ShowMessageButtons[ShowMessageButtons["ok"] = 0] = "ok";
        ShowMessageButtons[ShowMessageButtons["okCancel"] = 1] = "okCancel";
        ShowMessageButtons[ShowMessageButtons["abortRetryIgnore"] = 2] = "abortRetryIgnore";
        ShowMessageButtons[ShowMessageButtons["yesNoCancel"] = 3] = "yesNoCancel";
        ShowMessageButtons[ShowMessageButtons["yesNo"] = 4] = "yesNo";
        ShowMessageButtons[ShowMessageButtons["retryCancel"] = 5] = "retryCancel";
    })(ShowMessageButtons = Host.ShowMessageButtons || (Host.ShowMessageButtons = {}));
    let ShowMessageResult;
    (function (ShowMessageResult) {
        ShowMessageResult[ShowMessageResult["ok"] = 1] = "ok";
        ShowMessageResult[ShowMessageResult["cancel"] = 2] = "cancel";
        ShowMessageResult[ShowMessageResult["abort"] = 3] = "abort";
        ShowMessageResult[ShowMessageResult["retry"] = 4] = "retry";
        ShowMessageResult[ShowMessageResult["ignore"] = 5] = "ignore";
        ShowMessageResult[ShowMessageResult["yes"] = 6] = "yes";
        ShowMessageResult[ShowMessageResult["no"] = 7] = "no";
        ShowMessageResult[ShowMessageResult["close"] = 8] = "close";
    })(ShowMessageResult = Host.ShowMessageResult || (Host.ShowMessageResult = {}));
})(Host = exports.Host || (exports.Host = {}));

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotKeys = void 0;
var HotKeys;
(function (HotKeys) {
    let host;
    let zoomState = true;
    function disableMouseWheelZoom(e) {
        if (e.ctrlKey) {
            e.preventDefault();
        }
    }
    function initialize(hotKeysHost) {
        host = hotKeysHost;
    }
    HotKeys.initialize = initialize;
    function setClipboardState(state) {
        host.setHotKeyState(Group.Clipboard, !!state);
    }
    HotKeys.setClipboardState = setClipboardState;
    function setZoomState(state) {
        state = !!state;
        if (zoomState !== state) {
            host.setHotKeyState(Group.Zoom, state);
            if (!state) {
                window.addEventListener("mousewheel", disableMouseWheelZoom, { passive: false });
                window.addEventListener("wheel", disableMouseWheelZoom, { passive: false });
            }
            else {
                window.removeEventListener("mousewheel", disableMouseWheelZoom);
                window.removeEventListener("wheel", disableMouseWheelZoom);
            }
            zoomState = state;
        }
    }
    HotKeys.setZoomState = setZoomState;
    function setFindKeyState(state) {
        host.setHotKeyState(Group.Find, !!state);
    }
    HotKeys.setFindKeyState = setFindKeyState;
    let Group;
    (function (Group) {
        Group[Group["Clipboard"] = 0] = "Clipboard";
        Group[Group["Zoom"] = 1] = "Zoom";
        Group[Group["Find"] = 2] = "Find";
    })(Group = HotKeys.Group || (HotKeys.Group = {}));
})(HotKeys = exports.HotKeys || (exports.HotKeys = {}));

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = exports.Theme = exports.Storage = exports.Settings = exports.Resources = exports.Output = exports.HotKeys = exports.Host = exports.Diagnostics = exports.Culture = exports.GlobalPluginEventManager = exports.ContextMenu = exports.Logger = exports.EventManager = exports.PortState = exports.ControlCommands = void 0;
var coreContracts_1 = require("./Contracts/coreContracts");
Object.defineProperty(exports, "ControlCommands", { enumerable: true, get: function () { return coreContracts_1.ControlCommands; } });
Object.defineProperty(exports, "PortState", { enumerable: true, get: function () { return coreContracts_1.PortState; } });
var EventManager_1 = require("./Contracts/EventManager");
Object.defineProperty(exports, "EventManager", { enumerable: true, get: function () { return EventManager_1.EventManager; } });
var Logger_1 = require("./Contracts/Logger");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return Logger_1.Logger; } });
var contextMenu_1 = require("./contextMenu");
Object.defineProperty(exports, "ContextMenu", { enumerable: true, get: function () { return contextMenu_1.ContextMenu; } });
var core_1 = require("./core");
Object.defineProperty(exports, "GlobalPluginEventManager", { enumerable: true, get: function () { return core_1.GlobalPluginEventManager; } });
var culture_1 = require("./culture");
Object.defineProperty(exports, "Culture", { enumerable: true, get: function () { return culture_1.Culture; } });
var diagnostics_1 = require("./diagnostics");
Object.defineProperty(exports, "Diagnostics", { enumerable: true, get: function () { return diagnostics_1.Diagnostics; } });
var host_1 = require("./host");
Object.defineProperty(exports, "Host", { enumerable: true, get: function () { return host_1.Host; } });
var hotKeys_1 = require("./hotKeys");
Object.defineProperty(exports, "HotKeys", { enumerable: true, get: function () { return hotKeys_1.HotKeys; } });
var output_1 = require("./output");
Object.defineProperty(exports, "Output", { enumerable: true, get: function () { return output_1.Output; } });
var resources_1 = require("./resources");
Object.defineProperty(exports, "Resources", { enumerable: true, get: function () { return resources_1.Resources; } });
var settings_1 = require("./settings");
Object.defineProperty(exports, "Settings", { enumerable: true, get: function () { return settings_1.Settings; } });
var storage_1 = require("./storage");
Object.defineProperty(exports, "Storage", { enumerable: true, get: function () { return storage_1.Storage; } });
var theme_1 = require("./theme");
Object.defineProperty(exports, "Theme", { enumerable: true, get: function () { return theme_1.Theme; } });
var tooltip_1 = require("./tooltip");
Object.defineProperty(exports, "Tooltip", { enumerable: true, get: function () { return tooltip_1.Tooltip; } });

},{"./Contracts/EventManager":1,"./Contracts/Logger":2,"./Contracts/coreContracts":3,"./contextMenu":4,"./core":5,"./culture":6,"./diagnostics":7,"./host":9,"./hotKeys":10,"./output":12,"./resources":13,"./settings":14,"./storage":15,"./theme":16,"./tooltip":17}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = void 0;
const core_1 = require("./core");
var Output;
(function (Output) {
    let host;
    function initialize(outputHost) {
        host = outputHost;
    }
    Output.initialize = initialize;
    function log(message, ...optionalParams) {
        host.log((0, core_1.formatString)(message, optionalParams));
    }
    Output.log = log;
})(Output = exports.Output || (exports.Output = {}));

},{"./core":5}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resources = void 0;
const Logger_1 = require("./Contracts/Logger");
var Resources;
(function (Resources) {
    let host;
    let defaultAlias = "Resources";
    let error = "An error has occurred.  Please try the operation again.  You can search for the error online: ";
    let resourceMap = {};
    const formatRegEx = /\{{2}|\{(\d+)\}|\}{2}|\{|\}/g;
    function initialize(resourcesHost) {
        host = resourcesHost;
        host.addEventListener("resourcesinitialized", processResourceChangeEvent);
        host.addEventListener("resourceschanged", processResourceChangeEvent);
    }
    Resources.initialize = initialize;
    function getString(resourceId, ...args) {
        if (typeof resourceId !== "string" || resourceId === "") {
            throw new Error(getErrorString("JSPlugin.3004"));
        }
        let fileName = defaultAlias;
        let key = "";
        let value = "";
        const idParts = resourceId.split("/");
        switch (idParts.length) {
            case 1:
                key = idParts[0];
                break;
            case 3:
                fileName = idParts[1];
                key = idParts[2];
                break;
            default:
                throw new Error(getErrorString("JSPlugin.3004"));
        }
        if (!resourceMap[fileName] || !resourceMap[fileName][key]) {
            throw new Error(getErrorString("JSPlugin.3005") + " (" + resourceId + ")");
        }
        value = resourceMap[fileName][key];
        if (args.length > 0) {
            value = format(resourceId, value, args);
        }
        return value;
    }
    Resources.getString = getString;
    function getErrorString(errorId) {
        if (typeof errorId !== "string" || errorId === "") {
            throw new Error(error + "JSPlugin.3006");
        }
        return error + errorId;
    }
    Resources.getErrorString = getErrorString;
    async function loadResourceFile(resourceAlias) {
        if (resourceAlias && typeof resourceAlias.isRelative === "undefined") {
            resourceAlias.isRelative = true;
        }
        const newResources = await host.loadResources(resourceAlias);
        let alias;
        if (newResources) {
            alias = resourceAlias.alias;
            const existingValues = resourceMap[alias];
            if (existingValues) {
                const keys = Object.keys(newResources);
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    existingValues[key] = newResources[key];
                }
            }
            else {
                resourceMap[alias] = newResources;
            }
        }
        if (resourceAlias.isDefault) {
            defaultAlias = alias;
        }
    }
    Resources.loadResourceFile = loadResourceFile;
    function addEventListener(name, callback) {
        host.addEventListener(name, callback);
    }
    Resources.addEventListener = addEventListener;
    function removeEventListener(name, callback) {
        host.removeEventListener(name, callback);
    }
    Resources.removeEventListener = removeEventListener;
    function processResourceChangeEvent(eventArgs) {
        if (typeof eventArgs.GenericError !== "string" || eventArgs.GenericError === "") {
            throw new Error(getErrorString("JSPlugin.3000"));
        }
        error = eventArgs.GenericError;
        const resources = eventArgs.ResourceMap;
        if (!resources) {
            const logger = new Logger_1.Logger();
            logger.logError("JSPlugin.3001");
            return;
        }
        resourceMap = resources;
        const defaultResource = eventArgs.DefaultAlias;
        if (defaultResource) {
            defaultAlias = defaultResource;
        }
    }
    function format(resourceId, format, args) {
        return format.replace(formatRegEx, (match, index) => {
            let replacer;
            switch (match) {
                case "{{":
                    replacer = "{";
                    break;
                case "}}":
                    replacer = "}";
                    break;
                case "{":
                case "}":
                    throw new Error(getErrorString("JSPlugin.3002"));
                default:
                    const argsIndex = parseInt(index);
                    if (args && args.length - 1 >= argsIndex) {
                        replacer = args[argsIndex];
                    }
                    else {
                        throw new Error(getErrorString("JSPlugin.3003") + " (" + resourceId + ")");
                    }
                    break;
            }
            if (typeof replacer === "undefined" || replacer === null) {
                replacer = "";
            }
            if (typeof replacer !== "string") {
                replacer = replacer.toString();
            }
            return replacer;
        });
    }
    let ResourceType;
    (function (ResourceType) {
        ResourceType[ResourceType["resx"] = 0] = "resx";
        ResourceType[ResourceType["resjson"] = 1] = "resjson";
        ResourceType[ResourceType["embedded"] = 2] = "embedded";
    })(ResourceType = Resources.ResourceType || (Resources.ResourceType = {}));
})(Resources = exports.Resources || (exports.Resources = {}));

},{"./Contracts/Logger":2}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
var Settings;
(function (Settings) {
    let host;
    function initialize(settingsHost) {
        host = settingsHost;
    }
    Settings.initialize = initialize;
    function get(collection, requestedProperties) {
        return host.get(collection, requestedProperties);
    }
    Settings.get = get;
    ;
    function set(collection, toSet) {
        return host.set(collection, toSet);
    }
    Settings.set = set;
})(Settings = exports.Settings || (exports.Settings = {}));

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
function isInteger(value) {
    return ((parseFloat(value) === parseInt(value)) && !isNaN(value));
}
function isNullOrUndefined(value) {
    return (value === null || typeof value === "undefined");
}
class HostFile {
    id;
    maxBuffer = 32 * 1024;
    options;
    host;
    constructor(streamId, options, pluginHostStorage) {
        this.id = streamId;
        this.options = options;
        this.host = pluginHostStorage;
    }
    get streamId() { return this.id; }
    close() {
        return this.host.closeFile(this.id);
    }
    read(count) {
        if (!isNullOrUndefined(count) && !isInteger(count)) {
            throw new Error("'count' input may either be undefined or an interger.");
        }
        if (isNullOrUndefined(count)) {
            let concatStart;
            if (this.options.type === Storage.FileType.binary) {
                concatStart = [];
            }
            else {
                concatStart = "";
            }
            return this.readAllHelper(concatStart);
        }
        else {
            return this.host.read(this.id, count, this.options.type);
        }
    }
    seek(offset, origin) {
        if (!isInteger(offset)) {
            throw new Error("'offset' input may only be off type 'number'.");
        }
        if (isNullOrUndefined(origin)) {
            throw new Error("'origin' input must be non-null.");
        }
        return this.host.seek(this.id, offset, origin);
    }
    write(data, offset, count) {
        if (typeof data !== "string" && !(data instanceof Array)) {
            throw new Error("'data' must be of type string or Array.");
        }
        if (!isNullOrUndefined(offset) && !isInteger(offset)) {
            throw new Error("'offset' input may either be undefined or a number.");
        }
        offset = offset || 0;
        if (!isNullOrUndefined(count) && !isInteger(count)) {
            throw new Error("'count' input may either be undefined or a number.");
        }
        count = count || data.length;
        return this.host.write(this.id, data, offset, count, this.options.type);
    }
    async readAllHelper(content) {
        const result = await this.host.read(this.id, this.maxBuffer, this.options.type);
        if (result === null || result.length === 0) {
            return content;
        }
        else {
            return this.readAllHelper(content.concat(result));
        }
    }
}
var Storage;
(function (Storage) {
    let host;
    function initialize(storageHost) {
        host = storageHost;
    }
    Storage.initialize = initialize;
    function getFileList(path, persistence, index, count) {
        if (!isNullOrUndefined(path) && typeof path !== "string") {
            throw new Error("'path' input may be undefined or a string.");
        }
        if (!isNullOrUndefined(index) && !isInteger(index)) {
            throw new Error("'index' input may either be undefined or a number.");
        }
        if (!isNullOrUndefined(count) && !isInteger(count)) {
            throw new Error("'count' input may either be undefined or a number.");
        }
        return host.getFileList(path, persistence, index, count);
    }
    Storage.getFileList = getFileList;
    async function createFile(path, options) {
        if (!isNullOrUndefined(path) && typeof path !== "string") {
            throw new Error("'path' input may either be undefined or a string.");
        }
        const fileOptions = getDefaultFileOptions(options);
        fileOptions.mode = FileMode.createNew;
        const streamId = await host.openFile(path, fileOptions);
        return new HostFile(streamId, fileOptions, host);
    }
    Storage.createFile = createFile;
    async function openFile(path, options) {
        if (typeof path !== "string" || path === "") {
            throw new Error("'path' input must be a non-empty string.");
        }
        const fileOptions = getDefaultFileOptions(options);
        const streamId = await host.openFile(path, fileOptions);
        return new HostFile(streamId, fileOptions, host);
    }
    Storage.openFile = openFile;
    async function openFileDialog(dialogOptions, fileOptions) {
        const openDialogOptions = getDefaultFileDialogOptions(dialogOptions);
        const openFileOptions = getDefaultFileOptions(fileOptions);
        const streamId = await host.fileDialog(FileDialogMode.open, openDialogOptions, openFileOptions);
        if (streamId !== null && streamId !== "") {
            return new HostFile(streamId, openFileOptions, host);
        }
    }
    Storage.openFileDialog = openFileDialog;
    async function saveFileDialog(dialogOptions, fileOptions) {
        const saveDialogOptions = getDefaultFileDialogOptions(dialogOptions);
        const saveFileOptions = getDefaultFileOptions(fileOptions);
        saveFileOptions.mode = FileMode.openOrCreate;
        const streamId = await host.fileDialog(FileDialogMode.save, saveDialogOptions, saveFileOptions);
        if (streamId !== null && streamId !== "") {
            return new HostFile(streamId, saveFileOptions, host);
        }
    }
    Storage.saveFileDialog = saveFileDialog;
    function getDefaultFileOptions(options) {
        const fileOptions = {
            access: FileAccess.readWrite,
            encoding: "UTF-8",
            mode: FileMode.open,
            persistence: FilePersistence.temporary,
            share: FileShare.none,
            type: FileType.text
        };
        if (options) {
            fileOptions.access = isNullOrUndefined(options.access) ? fileOptions.access : options.access;
            fileOptions.encoding = options.encoding || fileOptions.encoding;
            fileOptions.mode = isNullOrUndefined(options.mode) ? fileOptions.mode : options.mode;
            fileOptions.persistence = isNullOrUndefined(options.persistence) ? fileOptions.persistence : options.persistence;
            fileOptions.share = isNullOrUndefined(options.share) ? fileOptions.share : options.share;
            fileOptions.type = isNullOrUndefined(options.type) ? fileOptions.type : options.type;
        }
        return fileOptions;
    }
    function getDefaultFileDialogOptions(options) {
        const dialogOptions = {
            name: "",
            extensions: [],
            extensionsIndex: 0,
            initialDirectory: "",
            title: ""
        };
        if (options) {
            dialogOptions.name = options.name || dialogOptions.name;
            dialogOptions.extensions = options.extensions || dialogOptions.extensions;
            dialogOptions.extensionsIndex = options.extensionsIndex || dialogOptions.extensionsIndex;
            dialogOptions.initialDirectory = options.initialDirectory || dialogOptions.initialDirectory;
            dialogOptions.title = options.title || dialogOptions.title;
        }
        return dialogOptions;
    }
    let FileAccess;
    (function (FileAccess) {
        FileAccess[FileAccess["read"] = 1] = "read";
        FileAccess[FileAccess["write"] = 2] = "write";
        FileAccess[FileAccess["readWrite"] = 3] = "readWrite";
    })(FileAccess = Storage.FileAccess || (Storage.FileAccess = {}));
    let FileDialogMode;
    (function (FileDialogMode) {
        FileDialogMode[FileDialogMode["open"] = 0] = "open";
        FileDialogMode[FileDialogMode["save"] = 1] = "save";
    })(FileDialogMode = Storage.FileDialogMode || (Storage.FileDialogMode = {}));
    let FileMode;
    (function (FileMode) {
        FileMode[FileMode["createNew"] = 1] = "createNew";
        FileMode[FileMode["create"] = 2] = "create";
        FileMode[FileMode["open"] = 3] = "open";
        FileMode[FileMode["openOrCreate"] = 4] = "openOrCreate";
        FileMode[FileMode["truncate"] = 5] = "truncate";
        FileMode[FileMode["append"] = 6] = "append";
    })(FileMode = Storage.FileMode || (Storage.FileMode = {}));
    let FileShare;
    (function (FileShare) {
        FileShare[FileShare["none"] = 0] = "none";
        FileShare[FileShare["read"] = 1] = "read";
        FileShare[FileShare["write"] = 2] = "write";
        FileShare[FileShare["readWrite"] = 3] = "readWrite";
        FileShare[FileShare["delete"] = 4] = "delete";
    })(FileShare = Storage.FileShare || (Storage.FileShare = {}));
    let FileType;
    (function (FileType) {
        FileType[FileType["binary"] = 0] = "binary";
        FileType[FileType["text"] = 1] = "text";
    })(FileType = Storage.FileType || (Storage.FileType = {}));
    let FilePersistence;
    (function (FilePersistence) {
        FilePersistence[FilePersistence["permanent"] = 0] = "permanent";
        FilePersistence[FilePersistence["temporary"] = 1] = "temporary";
    })(FilePersistence = Storage.FilePersistence || (Storage.FilePersistence = {}));
    let SeekOrigin;
    (function (SeekOrigin) {
        SeekOrigin[SeekOrigin["begin"] = 0] = "begin";
        SeekOrigin[SeekOrigin["current"] = 1] = "current";
        SeekOrigin[SeekOrigin["end"] = 2] = "end";
    })(SeekOrigin = Storage.SeekOrigin || (Storage.SeekOrigin = {}));
})(Storage = exports.Storage || (exports.Storage = {}));

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Theme = void 0;
const EventManager_1 = require("./Contracts/EventManager");
const Logger_1 = require("./Contracts/Logger");
var Theme;
(function (Theme) {
    let host;
    let isCurrentThemeHighContrast = false;
    let isInitial = false;
    let tokenMap = {};
    let pluginCss;
    let useCssVariables;
    const scrollbarArrowColorToken = "plugin-scrollbar-arrow-color";
    const scrollbarArrowColorRegEx = /\/\*\[\{plugin-scrollbar-arrow-color\}\]\*\//g;
    const scrollbarArrowActiveColorToken = "plugin-scrollbar-arrow-active-color";
    const scrollbarArrowActiveColorRegEx = /\/\*\[\{plugin-scrollbar-arrow-active-color\}\]\*\//g;
    const scrollbarArrowHoverColorToken = "plugin-scrollbar-arrow-hover-color";
    const scrollbarArrowHoverColorRegEx = /\/\*\[\{plugin-scrollbar-arrow-hover-color\}\]\*\//g;
    const defaultScrollbarArrowColor = "#868999";
    const defaultScrollbarArrowActiveColor = "#1E4F97";
    const defaultScrollbarArrowHoverColor = "#4971B9";
    const declarationRegEx = /^(\s*)([\w\-]+)\s*:\s*([^;^\{\*]+|url\([^\)]+\));\s*\/\*\s*\[([^\[\]]+)\]\s*\*\/(.*)$/gm;
    let eventManager;
    let tempElement;
    let rgbaRegEx = /[^0-9]+/g;
    const rgbaValueRegex = /\(([^\)]+)\)/;
    const tokenNameRegex = /\s*([\{\}\w\-]*)/;
    const rgbaOrHCOnlyFragmentRegex = /(?:\s+((?:rgba\s*\([^\)]+\))|(?:\!HCOnly)))?/;
    const tokenRegEx = new RegExp("\\{" + tokenNameRegex.source + rgbaOrHCOnlyFragmentRegex.source + rgbaOrHCOnlyFragmentRegex.source + "\\s*\\}", "igm");
    const undefinedRegEx = /undefined|null/;
    function initialize(themeHost) {
        host = themeHost;
        eventManager = new EventManager_1.EventManager(host);
        host.addEventListener("themeinitialize", async (eventArgs) => {
            pluginCss = eventArgs.PluginCss;
            if (!pluginCss) {
                const logger = new Logger_1.Logger();
                logger.logError("JSPlugin.4000");
                return;
            }
            useCssVariables = eventArgs.useCssVariables;
            isCurrentThemeHighContrast = eventArgs.isHighContrastTheme;
            await updateTheme(eventArgs.themeMap, true, isCurrentThemeHighContrast);
            eventManager.dispatchEvent("themeinitialize");
        });
        host.addEventListener("themechanged", async (eventArgs) => {
            isCurrentThemeHighContrast = eventArgs.isHighContrastTheme;
            await updateTheme(eventArgs.themeMap, false, isCurrentThemeHighContrast);
            eventManager.dispatchEvent("themechanged");
        });
    }
    Theme.initialize = initialize;
    function getValue(key) {
        if (!key) {
            throw new Error('Key must be non-null and non-empty.');
        }
        if (!tokenMap[key]) {
            throw new Error(`Unable to find a value for key ${key}.`);
        }
        return tokenMap[key];
    }
    Theme.getValue = getValue;
    function processInjectedSvg(target) {
        if (!target) {
            target = document;
        }
        const divs = target.querySelectorAll("[data-plugin-svg]");
        for (let i = 0; i < divs.length; i++) {
            const svgContentEncoded = getValue(divs[i].getAttribute("data-plugin-svg"));
            const svgContent = decodeHtml(svgContentEncoded);
            divs[i].innerHTML = svgContent;
            if (!divs[i].firstChild) {
                throw new Error("Could not find the child element.");
            }
            const svgDOM = divs[i].firstChild;
            const parent = divs[i].parentNode;
            parent.replaceChild(svgDOM, divs[i]);
        }
    }
    Theme.processInjectedSvg = processInjectedSvg;
    async function processCSSFileForThemeing(path) {
        const contents = await host.getCssFile(path, false);
        return tokenReplaceContents(contents, isCurrentThemeHighContrast);
    }
    Theme.processCSSFileForThemeing = processCSSFileForThemeing;
    function addEventListener(type, listener) {
        return eventManager.addEventListener(type, listener);
    }
    Theme.addEventListener = addEventListener;
    function removeEventListener(type, listener) {
        return eventManager.removeEventListener(type, listener);
    }
    Theme.removeEventListener = removeEventListener;
    async function processImages(targetDoc) {
        const images = targetDoc.querySelectorAll("[data-plugin-theme-src]");
        for (let i = 0; i < images.length; i++) {
            images[i].src = getValue(images[i].getAttribute("data-plugin-theme-src"));
        }
    }
    Theme.processImages = processImages;
    async function updateTheme(themeMap, isFirst, isHighContrast) {
        tokenMap = themeMap;
        if (!tokenMap) {
            const logger = new Logger_1.Logger();
            logger.logError("JSPlugin.4001");
            return createEmptyCompletedPromise();
        }
        isInitial = isInitial || isFirst;
        if (document.readyState !== "complete") {
            await new Promise((c, e) => {
                document.onreadystatechange = () => {
                    if (document.readyState === "complete") {
                        c();
                    }
                };
            });
            await updateTheme(themeMap, isFirst, isHighContrast);
            return;
        }
        if (useCssVariables) {
            processCssVariables(isHighContrast);
        }
        else {
            processCssFiles(isHighContrast);
        }
        processImages(document);
        return createEmptyCompletedPromise();
    }
    function createEmptyCompletedPromise() {
        return Promise.resolve();
    }
    function decodeHtml(htmlString) {
        const map = {
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&apos;': '\'',
            '&amp;': '&'
        };
        return htmlString.replace(/(&lt;|&gt;|&quot;|&apos;|&amp;)/g, (str, item) => {
            return map[item];
        });
    }
    function processCssVariables(isHighContrast) {
        var htmlElement = document.documentElement;
        for (const tokenName in tokenMap) {
            let tokenValue = tokenMap[tokenName];
            if (tokenValue.startsWith("data:image/")) {
                tokenValue = `url(${tokenValue})`;
            }
            htmlElement.style.setProperty("--" + tokenName, tokenValue);
        }
        if (isInitial) {
            const pluginStyle = document.createElement("style");
            pluginStyle.type = "text/css";
            pluginStyle.innerHTML = pluginCss;
            const firstNode = document.head.firstChild;
            if (firstNode) {
                document.head.insertBefore(pluginStyle, firstNode);
            }
            else {
                document.head.appendChild(pluginStyle);
            }
            pluginStyle.id = "pluginCss";
            host.fireThemeReady();
            isInitial = false;
        }
    }
    function processCssFiles(isHighContrast) {
        if (!pluginCss)
            return;
        const pluginStyle = document.createElement("style");
        pluginStyle.type = "text/css";
        var colorValue = encodeURIComponent(tokenMap[scrollbarArrowColorToken] ?? defaultScrollbarArrowColor);
        var activeColorValue = encodeURIComponent(tokenMap[scrollbarArrowActiveColorToken] ?? defaultScrollbarArrowActiveColor);
        var hoverColorValue = encodeURIComponent(tokenMap[scrollbarArrowHoverColorToken] ?? defaultScrollbarArrowHoverColor);
        pluginStyle.innerHTML = tokenReplaceContents(pluginCss, isHighContrast)
            .replace(scrollbarArrowColorRegEx, colorValue)
            .replace(scrollbarArrowActiveColorRegEx, activeColorValue)
            .replace(scrollbarArrowHoverColorRegEx, hoverColorValue);
        const firstNode = document.head.firstChild;
        if (firstNode) {
            document.head.insertBefore(pluginStyle, firstNode);
            if (firstNode.id === "pluginCss") {
                document.head.removeChild(firstNode);
            }
        }
        else {
            document.head.appendChild(pluginStyle);
        }
        pluginStyle.id = "pluginCss";
        const cssThemeFiles = (document.querySelectorAll("[data-plugin-theme='true']"));
        if (isInitial && cssThemeFiles.length === 0) {
            host.fireThemeReady();
            isInitial = false;
            return;
        }
        for (let i = 0; i < cssThemeFiles.length; i++) {
            const styleNode = cssThemeFiles[i];
            let href = styleNode.href;
            if (styleNode.hasAttribute("data-plugin-theme-href") && styleNode.getAttribute("data-plugin-theme-href")) {
                href = styleNode.getAttribute("data-plugin-theme-href");
            }
            const remote = styleNode.hasAttribute("data-plugin-theme-remote");
            const fireThemeReady = (isInitial && (i === cssThemeFiles.length - 1));
            const dataAttributes = {};
            for (let attributeIndex = 0; attributeIndex < styleNode.attributes.length; attributeIndex++) {
                const attribute = styleNode.attributes[attributeIndex];
                const isDataAttribute = (attribute.nodeName.indexOf('data-') === 0);
                if (isDataAttribute) {
                    dataAttributes[attribute.nodeName] = attribute.nodeValue;
                }
            }
            processCssFileContents(href, document, styleNode, fireThemeReady, isHighContrast, dataAttributes, remote);
        }
    }
    function getRGBACandidate(candidate1, candidate2) {
        if (candidate1 && (candidate1.match(/rgba/i) !== null)) {
            return candidate1;
        }
        else if (candidate2 && (candidate2.match(/rgba/i) !== null)) {
            return candidate2;
        }
        return null;
    }
    function tokenReplaceContents(contents, isHighContrast) {
        return contents.replace(declarationRegEx, (declaration, indent, property, defaultValue, replacer, suffix) => {
            let replaceCount = 0;
            let newValue = replacer.replace(tokenRegEx, (tokenMatch, token, rgbaOrHCOnlyMatch1, rgbaOrHCOnlyMatch2) => {
                let isHCOnly = false;
                if (rgbaOrHCOnlyMatch1 && (rgbaOrHCOnlyMatch1.toUpperCase() === "!HCONLY")) {
                    isHCOnly = true;
                }
                else if (rgbaOrHCOnlyMatch2 && (rgbaOrHCOnlyMatch2.toUpperCase() === "!HCONLY")) {
                    isHCOnly = true;
                }
                if (isHCOnly && ((typeof isHighContrast !== "undefined") && !isHighContrast)) {
                    return null;
                }
                replaceCount++;
                let colorValue = tokenMap[token];
                const rgbaMatch = getRGBACandidate(rgbaOrHCOnlyMatch1, rgbaOrHCOnlyMatch2);
                if (rgbaMatch) {
                    const rgbaValArr = rgbaMatch.match(rgbaValueRegex);
                    let rgba = "1.0";
                    if (rgbaValArr && rgbaValArr.length >= 1) {
                        rgba = rgbaValArr[0].replace(/\(|\)|\s/g, "");
                    }
                    tempElement = tempElement || document.createElement("div");
                    tempElement.style.backgroundColor = colorValue;
                    const parts = tempElement.style.backgroundColor.split(",");
                    if (parts.length === 3) {
                        const rgbParts = [];
                        for (let i = 0; i < 3; i++) {
                            rgbParts.push(parseInt(parts[i].replace(rgbaRegEx, ''), 10));
                        }
                        tempElement.style.backgroundColor = "rgba(" + rgbParts.join(", ") + ", " + rgba + ")";
                        colorValue = tempElement.style.backgroundColor;
                    }
                }
                return colorValue;
            });
            if (replaceCount === 0 || newValue.match(undefinedRegEx)) {
                newValue = defaultValue;
            }
            return indent + property + ": " + newValue + ";" + suffix;
        });
    }
    async function processCssFileContents(href, targetDoc, refNode, fireThemeReady, isHighContrast, additionalAttributes, remoteContent) {
        try {
            let contents;
            if (remoteContent) {
                let response = await fetch(href);
                contents = await response.text();
            }
            else {
                contents = await host.getCssFile(href, true);
            }
            if (contents) {
                contents = tokenReplaceContents(contents, isHighContrast);
                const newStyle = targetDoc.createElement("style");
                newStyle.setAttribute("data-plugin-theme", "true");
                newStyle.setAttribute("data-plugin-theme-href", href);
                if (additionalAttributes) {
                    for (let key in additionalAttributes) {
                        newStyle.setAttribute(key, additionalAttributes[key]);
                    }
                }
                newStyle.type = "text/css";
                newStyle.innerHTML = contents;
                if (refNode) {
                    if (!refNode.parentNode) {
                        return;
                    }
                    targetDoc.head.insertBefore(newStyle, refNode);
                    targetDoc.head.removeChild(refNode);
                    newStyle.id = refNode.id;
                }
                else {
                    targetDoc.head.appendChild(newStyle);
                }
            }
            if (fireThemeReady) {
                host.fireThemeReady();
                isInitial = false;
            }
        }
        catch (e) {
            if (fireThemeReady) {
                host.fireThemeReady();
                isInitial = false;
            }
            const logger = new Logger_1.Logger();
            logger.logError("JSPlugin.4003\r\n" + e.message + "\r\n" + e.stack);
        }
    }
})(Theme = exports.Theme || (exports.Theme = {}));

},{"./Contracts/EventManager":1,"./Contracts/Logger":2}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = void 0;
const Logger_1 = require("./Contracts/Logger");
const culture_1 = require("./culture");
const resources_1 = require("./resources");
const theme_1 = require("./theme");
var Tooltip;
(function (Tooltip) {
    Tooltip.defaultTooltipContentToHTML = true;
    let host;
    let themeHost;
    let resourcesHost;
    let htmlEncodingDiv = null;
    let __n;
    let tooltipOffsetY = 15;
    let defaultDelay;
    let hasShownTooltipPopup = false;
    let tooltipObject = null;
    let tooltipReset = true;
    let scheduledShow;
    let scheduledDismiss;
    let mousePosition;
    let popupMeasureContainer;
    let isKeyboardFocus = true;
    function initialize(tooltipHost, hostTheme, hostResources, n) {
        host = tooltipHost;
        themeHost = hostTheme;
        resourcesHost = hostResources;
        __n = n;
        mousePosition = { clientX: 0, clientY: 0, screenX: 0, screenY: 0 };
        themeHost.addEventListener("themechanged", (eventArgs) => {
            invalidatePopupTooltipDocumentCache();
        });
        document.addEventListener("DOMContentLoaded", () => {
            const withTooltipData = document.querySelectorAll("[data-plugin-vs-tooltip]");
            for (let i = 0; i < withTooltipData.length; i++) {
                initializeElementTooltip(withTooltipData[i]);
            }
        }, false);
        document.addEventListener("mouseout", onMouseOut, false);
        document.addEventListener("mouseover", onMouseOver, true);
        document.addEventListener("mousemove", onMouseMove, false);
        document.addEventListener("mousedown", onMouseDown, true);
        document.addEventListener("keydown", onKeyDown, true);
        document.addEventListener("focusin", onFocusIn, true);
        window.addEventListener("wheel", onWheel, true);
    }
    Tooltip.initialize = initialize;
    function invalidatePopupTooltipDocumentCache() {
        hasShownTooltipPopup = false;
    }
    Tooltip.invalidatePopupTooltipDocumentCache = invalidatePopupTooltipDocumentCache;
    function initializeElementTooltip(element) {
        if (!element || !element.addEventListener) {
            const logger = new Logger_1.Logger();
            logger.logError("JSPlugin.4007");
            return;
        }
        if (element.__plugin_tooltip_initialized || !element.hasAttribute("data-plugin-vs-tooltip")) {
            return;
        }
        const hasChild = (element, childCandidate) => {
            let currentParent = childCandidate ? childCandidate.parentNode : null;
            while (currentParent && currentParent !== document.body) {
                if (currentParent === element) {
                    return true;
                }
                currentParent = currentParent.parentNode;
            }
            return false;
        };
        const handleTooltipEvent = (e, currentTarget) => {
            if (!currentTarget.hasAttribute("data-plugin-vs-tooltip")) {
                currentTarget.removeEventListener("mouseover", onMouseOver);
                currentTarget.removeEventListener("mouseout", onMouseOut);
                currentTarget.removeEventListener("mousedown", onMouseDown);
                currentTarget.removeEventListener("focusin", onFocusIn);
                currentTarget.removeEventListener("focusout", onFocusOut);
                currentTarget.__plugin_tooltip_initialized = false;
                return;
            }
            if (tooltipObject && !tooltipReset && tooltipObject.parent &&
                ((tooltipObject.parent === e.currentTarget) || (tooltipObject.parent === e.target) ||
                    (hasChild(tooltipObject.parent, e.target) && hasChild(e.currentTarget, tooltipObject.parent)))) {
                return;
            }
            let config = currentTarget.getAttribute("data-plugin-vs-tooltip");
            if ((typeof config === "string") && (config.length > 0) && (config[0] === "{")) {
                try {
                    config = JSON.parse(config);
                }
                catch (error) {
                    if (!(error instanceof SyntaxError)) {
                        throw error;
                    }
                }
            }
            if (e.type === "focusin") {
                if (typeof config !== "object") {
                    config = { "content": config };
                }
                if (!config) {
                    config = {};
                }
                config.positioningElement = currentTarget;
            }
            showTooltip(config, currentTarget);
        };
        const onMouseOver = (e) => {
            handleTooltipEvent(e, e.currentTarget);
        };
        element.addEventListener("mouseover", onMouseOver, true);
        const onMouseOut = (e) => {
            if (!tooltipObject?.usingObjectPositioning && e.relatedTarget && (e.currentTarget !== e.relatedTarget) && !hasChild(e.currentTarget, e.relatedTarget)) {
                dismissTooltipOfParent(e.currentTarget);
            }
        };
        element.addEventListener("mouseout", onMouseOut);
        const onMouseDown = (e) => {
            dismissTooltipOfParent(e.currentTarget, false);
        };
        element.addEventListener("mousedown", onMouseDown);
        const onFocusIn = async (e) => {
            if (isKeyboardFocus) {
                e.stopPropagation();
                var shouldShowTooltipsOnFocus = await host.getShouldShowTooltipsOnFocus();
                if (shouldShowTooltipsOnFocus) {
                    handleTooltipEvent(e, e.target);
                }
            }
        };
        element.addEventListener("focusin", onFocusIn);
        const onFocusOut = (e) => {
            if (tooltipObject?.usingObjectPositioning) {
                dismissTooltipOfParent(e.currentTarget);
            }
        };
        element.addEventListener("focusout", onFocusOut);
        element.__plugin_tooltip_initialized = true;
    }
    Tooltip.initializeElementTooltip = initializeElementTooltip;
    function show(config) {
        showTooltip(config, null);
    }
    Tooltip.show = show;
    function dismiss(reset) {
        dismissTooltip(reset);
    }
    Tooltip.dismiss = dismiss;
    function canCreatePopup() {
        return host.canCreatePopup();
    }
    Tooltip.canCreatePopup = canCreatePopup;
    function showTooltip(config, parent) {
        dismissTooltip();
        let useCachedDocument = hasShownTooltipPopup;
        let tooltip = null;
        let options = {};
        let usingObjectPositioning = false;
        resources_1.Resources.initialize(resourcesHost);
        if (config && typeof config === "object") {
            if (useCachedDocument && (typeof config.useCachedDocument === 'boolean')) {
                useCachedDocument = config.useCachedDocument;
            }
            if (config.resource) {
                if (config.content || config.content === "") {
                    try {
                        tooltip = createNewTooltipFromString(resources_1.Resources.getString(config.resource));
                    }
                    catch (e) { }
                }
                else {
                    tooltip = createNewTooltipFromString(resources_1.Resources.getString(config.resource));
                }
            }
            if (!tooltip && (config.content || config.content === "")) {
                tooltip = createNewTooltipFromContent(config);
            }
            if (!tooltip) {
                throw new Error(resources_1.Resources.getErrorString("JSPlugin.4005"));
            }
            options = config;
            if (config.positioningElement) {
                usingObjectPositioning = true;
                var clientRect = config.positioningElement.getBoundingClientRect();
                options.x = Math.round(clientRect.x);
                options.y = Math.round(clientRect.y);
                options.width = Math.round(clientRect.width);
                options.height = Math.round(clientRect.height);
            }
        }
        else {
            tooltip = createNewTooltipFromString(config);
        }
        if (!tooltip) {
            throw new Error(resources_1.Resources.getErrorString("JSPlugin.4006"));
        }
        tooltip.parent = parent;
        tooltip.usingObjectPositioning = usingObjectPositioning;
        tooltipObject = tooltip;
        tooltipReset = false;
        const tooltipRect = { X: options.x, Y: options.y, Width: options.width, Height: options.height };
        scheduledShow = scheduleShowTooltip(tooltip, options.delay, options.duration, tooltipRect, useCachedDocument);
    }
    function onMouseOut(e) {
        if (!e.relatedTarget || e.relatedTarget.nodeName === "HTML") {
            dismissTooltip(true);
        }
    }
    function onMouseOver(e) {
        if (!e.target.__plugin_tooltip_initialized && e.target.hasAttribute("data-plugin-vs-tooltip")) {
            initializeElementTooltip(e.target);
        }
    }
    function onMouseMove(e) {
        mousePosition.screenX = e.screenX;
        mousePosition.screenY = e.screenY;
        mousePosition.clientX = e.clientX;
        mousePosition.clientY = e.clientY;
    }
    function onMouseDown(e) {
        isKeyboardFocus = false;
    }
    function onKeyDown(e) {
        isKeyboardFocus = true;
    }
    function onFocusIn(e) {
        if (isKeyboardFocus) {
            if (!e.target.__plugin_tooltip_initialized && e.target.hasAttribute("data-plugin-vs-tooltip")) {
                initializeElementTooltip(e.target);
            }
        }
    }
    function onWheel(e) {
        dismissTooltip(true);
    }
    function isFiniteNumber(value) {
        return (typeof value === 'number' && isFinite(value));
    }
    function areValidScreenBounds(bounds) {
        return bounds != null &&
            isFiniteNumber(bounds.Width) &&
            isFiniteNumber(bounds.Height);
    }
    function hostContentInPopup(displayParameters) {
        const useCachedDocument = (hasShownTooltipPopup && ((typeof displayParameters.useCachedDocument === 'undefined') || (typeof displayParameters.useCachedDocument === 'boolean' && displayParameters.useCachedDocument)));
        if (!useCachedDocument) {
            const dir = culture_1.Culture.dir;
            const lang = culture_1.Culture.lang;
            const docTypeTag = "<!DOCTYPE html>";
            const htmlAttributes = "xmlns=\"http://www.w3.org/1999/xhtml\" lang=\"" + lang + "\" dir=\"" + dir + "\" style=\"overflow: hidden\"";
            const htmlOpenTag = "<html " + htmlAttributes + ">";
            const headOpenTag = "<head>";
            const modeTag = "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge\"/>";
            const charSetTag = "<meta charset=\"UTF-16\">";
            const headCloseTag = "</head>";
            let preContentHTML = docTypeTag + htmlOpenTag + headOpenTag + modeTag + charSetTag;
            const styles = document.head.querySelectorAll("style, link[type='text/css']");
            for (let i = 0; i < styles.length; i++) {
                const styleElement = styles[i];
                const node = document.createElement(styleElement.nodeName);
                const attributes = styleElement.attributes;
                for (let j = 0; j < attributes.length; j++) {
                    if (attributes[j].specified) {
                        node.setAttribute(attributes[j].nodeName, attributes[j].nodeValue);
                    }
                }
                node.innerHTML = styleElement.innerHTML;
                preContentHTML += node.outerHTML;
            }
            const bodyOpenTag = "<body style=\"margin: 0px\">";
            preContentHTML += headCloseTag + bodyOpenTag;
            const bodyCloseTag = "</body>";
            const finalHTML = preContentHTML + displayParameters.content + bodyCloseTag;
            displayParameters.content = finalHTML;
        }
        if (!hasShownTooltipPopup) {
            hasShownTooltipPopup = true;
        }
        host.hostContentInPopup(displayParameters);
    }
    ;
    function dismissPopup() {
        host.dismissPopup();
    }
    ;
    function resetTooltip(tooltip) {
        if (tooltip) {
            const contentDiv = tooltip["contentDiv"];
            contentDiv.innerHTML = "";
            tooltip["parent"] = null;
            tooltipReset = true;
        }
    }
    function dismissTooltip(reset) {
        let parent = null;
        if (scheduledShow) {
            clearTimeout(scheduledShow);
            scheduledShow = null;
        }
        if (scheduledDismiss) {
            clearTimeout(scheduledDismiss);
            scheduledDismiss = null;
        }
        if (tooltipObject) {
            parent = tooltipObject.parent;
            const usingPopup = canCreatePopup();
            if (usingPopup) {
                dismissPopup();
            }
            else {
                if (document.body.contains(tooltipObject)) {
                    document.body.removeChild(tooltipObject);
                }
                tooltipObject.style.display = "none";
            }
            if (typeof reset === "undefined" || reset) {
                resetTooltip(tooltipObject);
            }
        }
        __n("TooltipDismiss", tooltipObject, parent, (typeof reset === "undefined" || reset));
    }
    function dismissTooltipOfParent(element, reset) {
        if (tooltipObject && tooltipObject.parent === element) {
            dismissTooltip(reset);
        }
    }
    function createOuterTooltipDiv() {
        const tooltip = document.createElement("div");
        tooltip.setAttribute("id", "plugin-vs-tooltip");
        return tooltip;
    }
    function createNestedCellDiv() {
        const nestedCellDiv = document.createElement("div");
        nestedCellDiv.setAttribute("id", "plugin-vs-tooltip-nested-cell");
        return nestedCellDiv;
    }
    function createContentDiv() {
        const contentDiv = document.createElement("div");
        contentDiv.setAttribute("id", "plugin-vs-tooltip-content");
        return contentDiv;
    }
    function createPopupMeasureContainer() {
        const measureContainer = document.createElement("div");
        measureContainer.id = "plugin-vs-tooltip-measure-container";
        measureContainer["style"]["position"] = "absolute";
        measureContainer["style"]["display"] = "none";
        document.body.appendChild(measureContainer);
        return measureContainer;
    }
    function createTooltip() {
        const outerMostDiv = createOuterTooltipDiv();
        const nestedCellDiv = createNestedCellDiv();
        outerMostDiv.appendChild(nestedCellDiv);
        const contentDiv = createContentDiv();
        nestedCellDiv.appendChild(contentDiv);
        outerMostDiv["contentDiv"] = contentDiv;
        return outerMostDiv;
    }
    function createBlankTooltip() {
        if (!tooltipReset) {
            throw new Error("Cannot create a new tooltip if the current element's tool tip is already active.");
        }
        let tooltip = tooltipObject;
        if (tooltip === null) {
            tooltip = tooltipObject = createTooltip();
            tooltip.contentDiv.addEventListener("mouseover", () => {
                tooltip.style.display = "none";
                __n("TooltipDismiss", tooltip, tooltip.parent, false);
            });
        }
        return tooltip;
    }
    function htmlEncode(content) {
        if (!htmlEncodingDiv) {
            htmlEncodingDiv = document.createElement("div");
        }
        htmlEncodingDiv.innerText = content;
        return htmlEncodingDiv.innerHTML;
    }
    function createNewTooltipFromContent(config) {
        const tooltip = createBlankTooltip();
        const pContent = tooltip["contentDiv"];
        if (pContent) {
            const hasValidContainsHTMLProperty = typeof config.contentContainsHTML === 'boolean';
            const containsHTML = hasValidContainsHTMLProperty ? config.contentContainsHTML : Tooltip.defaultTooltipContentToHTML;
            if (typeof config.content === "string") {
                pContent.innerHTML = containsHTML ? config.content : htmlEncode(config.content);
                theme_1.Theme.initialize(themeHost);
                theme_1.Theme.processImages(pContent);
            }
            else if (config.content) {
                pContent.innerText = config.content;
            }
        }
        return tooltip;
    }
    function createNewTooltipFromString(contentString) {
        const tooltip = createBlankTooltip();
        if (tooltip && contentString) {
            const pContent = tooltip["contentDiv"];
            if (pContent) {
                pContent.innerText = contentString;
            }
        }
        return tooltip;
    }
    function adjustXPosForClientRight(x, width) {
        const distToClientRight = document.documentElement.clientWidth - (x + width);
        if (distToClientRight < 0) {
            x = document.documentElement.clientWidth - (width + 1);
        }
        return x;
    }
    function adjustYPosForClientBottom(y, height, yOffset) {
        const distToClientBottom = document.documentElement.clientHeight - (y + height);
        if (distToClientBottom < 0) {
            y -= (height + yOffset + 1);
            if (y < 0) {
                y = 0;
            }
        }
        return y;
    }
    function styleBoxSizingIsBorderBox(style) {
        const boxSizingMode = style["box-sizing"];
        return ((typeof boxSizingMode === "string") && (boxSizingMode.toLowerCase() === "border-box"));
    }
    function convertOffsetHeightToHeight(offsetHeight, style) {
        if (styleBoxSizingIsBorderBox(style)) {
            return offsetHeight;
        }
        const topBorderWidth = parseInt(style["border-top-width"], 10);
        const bottomBorderWidth = parseInt(style["border-bottom-width"], 10);
        const topPadding = parseInt(style["padding-top"], 10);
        const bottomPadding = parseInt(style["padding-bottom"], 10);
        return (offsetHeight - (topBorderWidth + bottomBorderWidth + topPadding + bottomPadding));
    }
    function convertOffsetWidthToWidth(offsetWidth, style) {
        if (styleBoxSizingIsBorderBox(style)) {
            return offsetWidth;
        }
        const leftBorderWidth = parseInt(style["border-right-width"], 10);
        const rightBorderWidth = parseInt(style["border-left-width"], 10);
        const leftPadding = parseInt(style["padding-left"], 10);
        const rightPadding = parseInt(style["padding-right"], 10);
        return (offsetWidth - (leftBorderWidth + rightBorderWidth + leftPadding + rightPadding));
    }
    function setLeftTopWidthHeight(element, settings) {
        if (settings.width) {
            element.style.width = settings.width;
        }
        if (settings.height) {
            element.style.height = settings.height;
        }
        if (settings.left) {
            element.style.left = settings.left;
        }
        if (settings.top) {
            element.style.top = settings.top;
        }
    }
    function showTooltipImmediate(args) {
        const usingPopup = canCreatePopup();
        let width = 0;
        let height = 0;
        const useMousePosX = typeof args?.tooltipPlacementClientRect?.X !== 'number';
        let clientX = useMousePosX ? mousePosition.clientX : args.tooltipPlacementClientRect.X;
        const useMousePosY = typeof args?.tooltipPlacementClientRect?.Y !== 'number';
        let clientY = useMousePosY ? mousePosition.clientY : args.tooltipPlacementClientRect.Y;
        let clientWidth;
        let clientHeight;
        let useClientRect = false;
        if (!useMousePosX && !useMousePosY) {
            clientWidth = args?.tooltipPlacementClientRect?.Width;
            clientHeight = args?.tooltipPlacementClientRect?.Height;
            useClientRect = typeof clientWidth === 'number' && typeof clientHeight === 'number';
        }
        if (args.tooltip) {
            args.duration = (typeof args.duration === "number") ? args.duration : ((defaultDelay || (defaultDelay = host.getDoubleClickTime())) * 10);
            let layoutScreenX = -500;
            let layoutScreenY = -500;
            if (usingPopup) {
                if (!popupMeasureContainer) {
                    popupMeasureContainer = createPopupMeasureContainer();
                }
                const centerX = useClientRect ? clientX + clientWidth / 2 : clientX;
                const centerY = useClientRect ? clientY + clientHeight / 2 : clientY;
                const currentScreenBounds = host.getScreenSizeForXY(window.screenX + centerX, window.screenY + centerY);
                if (areValidScreenBounds(currentScreenBounds)) {
                    layoutScreenX = -currentScreenBounds.Width;
                    layoutScreenY = -currentScreenBounds.Height;
                    popupMeasureContainer.style.display = "inline";
                    popupMeasureContainer.style.top = layoutScreenY + "px";
                    popupMeasureContainer.style.left = layoutScreenX + "px";
                    popupMeasureContainer.style["min-width"] = currentScreenBounds.Width + "px";
                    popupMeasureContainer.style["min-height"] = currentScreenBounds.Height + "px";
                }
            }
            setLeftTopWidthHeight(args.tooltip, { left: layoutScreenX + "px", top: layoutScreenY + "px", width: "auto", height: "auto" });
            if (usingPopup) {
                popupMeasureContainer.appendChild(args.tooltip);
            }
            else {
                document.body.appendChild(args.tooltip);
            }
            args.tooltip.style.display = "table";
            width = args.tooltip.offsetWidth;
            height = args.tooltip.offsetHeight;
            if (usingPopup) {
                popupMeasureContainer.style.display = "none";
            }
            const style = window.getComputedStyle(args.tooltip);
            if (usingPopup) {
                setLeftTopWidthHeight(args.tooltip, {
                    left: "0px",
                    top: "0px",
                    width: (convertOffsetWidthToWidth(width, style) + 1) + "px",
                    height: (convertOffsetHeightToHeight(height, style) + 1) + "px"
                });
                width += 1;
                height += 1;
                const popupArgs = {
                    content: args.tooltip.outerHTML,
                    contentSize: { Width: width, Height: height },
                    tooltipPlacementClientRect: { X: clientX, Y: clientY, Width: clientWidth, Height: clientHeight },
                    ensureNotUnderMouseCursor: true,
                    placementMode: useClientRect ? PlacementMode.bottom : useMousePosY ? PlacementMode.mouse : PlacementMode.relativePoint,
                    useCachedDocument: args.useCachedDocument
                };
                hostContentInPopup(popupArgs);
                args.tooltip.style.display = "none";
                popupMeasureContainer.removeChild(args.tooltip);
            }
            else {
                if (!useClientRect) {
                    clientHeight = tooltipOffsetY * (useMousePosY ? 1 : 0);
                }
                clientY += clientHeight;
                clientX = adjustXPosForClientRight(clientX, width);
                clientY = adjustYPosForClientBottom(clientY, height, clientHeight);
                clientX += window.pageXOffset;
                clientY += window.pageYOffset;
                setLeftTopWidthHeight(args.tooltip, {
                    left: clientX + "px",
                    top: clientY + "px",
                    width: (convertOffsetWidthToWidth(width, style) + 1) + "px",
                    height: (convertOffsetHeightToHeight(height, style) + 1) + "px"
                });
            }
        }
        scheduledShow = null;
        if (args.duration > 0) {
            scheduledDismiss = setTimeout(() => {
                dismissTooltip(false);
                scheduledDismiss = null;
            }, args.duration);
        }
        if (!usingPopup) {
            __n("TooltipShow", args.tooltip, clientX, clientY, width, height, args.duration, scheduledDismiss);
        }
    }
    function scheduleShowTooltip(tooltip, delay, duration, tooltipPlacementClientRect, useCachedDocument) {
        if (!tooltip) {
            return null;
        }
        delay = (typeof delay === "number") ? delay : (defaultDelay || (defaultDelay = host.getDoubleClickTime()));
        useCachedDocument = (typeof useCachedDocument !== 'undefined' ? useCachedDocument : hasShownTooltipPopup);
        if (delay <= 0) {
            showTooltipImmediate({ tooltip: tooltip, duration: duration, tooltipPlacementClientRect: tooltipPlacementClientRect, useCachedDocument: useCachedDocument });
            return null;
        }
        const timeout = setTimeout(() => {
            showTooltipImmediate({ tooltip: tooltip, duration: duration, tooltipPlacementClientRect: tooltipPlacementClientRect, useCachedDocument: useCachedDocument });
        }, delay);
        __n("TooltipShowScheduled", tooltip, delay);
        return timeout;
    }
    let PlacementMode;
    (function (PlacementMode) {
        PlacementMode[PlacementMode["bottom"] = 2] = "bottom";
        PlacementMode[PlacementMode["absolutePoint"] = 5] = "absolutePoint";
        PlacementMode[PlacementMode["relativePoint"] = 6] = "relativePoint";
        PlacementMode[PlacementMode["mouse"] = 7] = "mouse";
    })(PlacementMode || (PlacementMode = {}));
    ;
    ;
    ;
})(Tooltip = exports.Tooltip || (exports.Tooltip = {}));

},{"./Contracts/Logger":2,"./culture":6,"./resources":13,"./theme":16}],18:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebviewMessenger = exports.createExtensionHostMessenger = exports.initialize = exports.PortState = exports.ControlCommands = exports.Tooltip = exports.Theme = exports.Storage = exports.Settings = exports.Resources = exports.Output = exports.Logger = exports.HotKeys = exports.Host = exports.EventManager = exports.Diagnostics = exports.Culture = exports.ContextMenu = exports.tooltipHost = exports.contextMenuHost = exports.Messaging = exports.JSONMarshaler = void 0;
const plugin = __importStar(require("plugin-v2"));
const plugin_host_contextmenu_1 = require("./plugin.host.contextmenu");
Object.defineProperty(exports, "contextMenuHost", { enumerable: true, get: function () { return plugin_host_contextmenu_1.contextMenuHost; } });
const plugin_host_core_1 = require("./plugin.host.core");
const plugin_host_culture_1 = require("./plugin.host.culture");
const plugin_host_diagnostics_1 = require("./plugin.host.diagnostics");
const plugin_host_hotkeys_1 = require("./plugin.host.hotkeys");
const plugin_host_messaging_1 = require("./plugin.host.messaging");
const plugin_host_output_1 = require("./plugin.host.output");
const plugin_host_resources_1 = require("./plugin.host.resources");
const plugin_host_settings_1 = require("./plugin.host.settings");
const plugin_host_storage_1 = require("./plugin.host.storage");
const plugin_host_theme_1 = require("./plugin.host.theme");
const plugin_host_tooltip_1 = require("./plugin.host.tooltip");
Object.defineProperty(exports, "tooltipHost", { enumerable: true, get: function () { return plugin_host_tooltip_1.tooltipHost; } });
const plugin_host_1 = require("./plugin.host");
const plugin_vs_prefix_1 = require("./plugin.vs.prefix");
plugin.ContextMenu.initialize(plugin_host_contextmenu_1.contextMenuHost, plugin_host_theme_1.themeHost, plugin_vs_prefix_1.__n);
plugin.Culture.initialize(plugin_host_culture_1.cultureHost);
plugin.Diagnostics.initialize(plugin_host_diagnostics_1.diagnosticsHost);
plugin.Host.initialize(plugin_host_1.pluginHost);
plugin_host_messaging_1.Messaging.initialize(plugin_host_core_1.coreHost);
plugin.Output.initialize(plugin_host_output_1.outputHost);
plugin.Resources.initialize(plugin_host_resources_1.resourcesHost);
plugin.Settings.initialize(plugin_host_settings_1.settingsHost);
plugin.Storage.initialize(plugin_host_storage_1.storageHost);
plugin.Theme.initialize(plugin_host_theme_1.themeHost);
plugin.Tooltip.initialize(plugin_host_tooltip_1.tooltipHost, plugin_host_theme_1.themeHost, plugin_host_resources_1.resourcesHost, plugin_vs_prefix_1.__n);
plugin.HotKeys.initialize(plugin_host_hotkeys_1.hotKeysHost);
exports.JSONMarshaler = __importStar(require("./plugin.host.jsonMarshaler"));
var plugin_host_messaging_2 = require("./plugin.host.messaging");
Object.defineProperty(exports, "Messaging", { enumerable: true, get: function () { return plugin_host_messaging_2.Messaging; } });
var plugin_v2_1 = require("plugin-v2");
Object.defineProperty(exports, "ContextMenu", { enumerable: true, get: function () { return plugin_v2_1.ContextMenu; } });
Object.defineProperty(exports, "Culture", { enumerable: true, get: function () { return plugin_v2_1.Culture; } });
Object.defineProperty(exports, "Diagnostics", { enumerable: true, get: function () { return plugin_v2_1.Diagnostics; } });
Object.defineProperty(exports, "EventManager", { enumerable: true, get: function () { return plugin_v2_1.EventManager; } });
Object.defineProperty(exports, "Host", { enumerable: true, get: function () { return plugin_v2_1.Host; } });
Object.defineProperty(exports, "HotKeys", { enumerable: true, get: function () { return plugin_v2_1.HotKeys; } });
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return plugin_v2_1.Logger; } });
Object.defineProperty(exports, "Output", { enumerable: true, get: function () { return plugin_v2_1.Output; } });
Object.defineProperty(exports, "Resources", { enumerable: true, get: function () { return plugin_v2_1.Resources; } });
Object.defineProperty(exports, "Settings", { enumerable: true, get: function () { return plugin_v2_1.Settings; } });
Object.defineProperty(exports, "Storage", { enumerable: true, get: function () { return plugin_v2_1.Storage; } });
Object.defineProperty(exports, "Theme", { enumerable: true, get: function () { return plugin_v2_1.Theme; } });
Object.defineProperty(exports, "Tooltip", { enumerable: true, get: function () { return plugin_v2_1.Tooltip; } });
Object.defineProperty(exports, "ControlCommands", { enumerable: true, get: function () { return plugin_v2_1.ControlCommands; } });
Object.defineProperty(exports, "PortState", { enumerable: true, get: function () { return plugin_v2_1.PortState; } });
function initialize() {
    let onPluginReady;
    const promise = new Promise((resolve) => (onPluginReady = resolve));
    plugin_host_messaging_1.Messaging.addEventListener('pluginready', onPluginReady);
    return promise;
}
exports.initialize = initialize;
function createExtensionHostMessenger() {
    return null;
}
exports.createExtensionHostMessenger = createExtensionHostMessenger;
function createWebviewMessenger(_name) {
    return null;
}
exports.createWebviewMessenger = createWebviewMessenger;

},{"./plugin.host":25,"./plugin.host.contextmenu":19,"./plugin.host.core":20,"./plugin.host.culture":21,"./plugin.host.diagnostics":22,"./plugin.host.hotkeys":23,"./plugin.host.jsonMarshaler":24,"./plugin.host.messaging":26,"./plugin.host.output":27,"./plugin.host.resources":28,"./plugin.host.settings":29,"./plugin.host.storage":30,"./plugin.host.theme":31,"./plugin.host.tooltip":32,"./plugin.vs.prefix":33,"plugin-v2":11}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contextMenuHost = void 0;
const plugin_host_jsonMarshaler_1 = require("./plugin.host.jsonMarshaler");
const plugin_host_hotkeys_1 = require("./plugin.host.hotkeys");
class ContextMenuImpl {
    contextMenuObject;
    constructor() {
        this.contextMenuObject = (0, plugin_host_jsonMarshaler_1.attachToMarshaledObject)("Plugin.ContextMenu");
    }
    addEventListener(name, callback) {
        this.contextMenuObject.addEventListener(name, callback);
    }
    adjustShowCoordinates(coordinates) {
        const selection = document.selection;
        if (selection && selection.createRange !== undefined && coordinates.X === 0 && coordinates.Y === 0) {
            if (selection) {
                const xScaleFactor = screen.deviceXDPI / screen.logicalXDPI;
                const yScaleFactor = screen.deviceYDPI / screen.logicalYDPI;
                const range = selection.createRange();
                const height = range.boundingHeight;
                range.collapse(true);
                coordinates.X = range.boundingLeft / xScaleFactor;
                coordinates.Y = (range.boundingTop + height) / yScaleFactor;
            }
        }
        return coordinates;
    }
    callback(id, contextMenuId) {
        if (contextMenuId)
            return this.contextMenuObject._call("callback", id, contextMenuId);
        return this.contextMenuObject._call("callback", id);
    }
    canCreatePopup() {
        return true;
    }
    disableZoom() {
        plugin_host_hotkeys_1.hotKeysHost.setHotKeyState(1, false);
    }
    dismiss() {
        return this.contextMenuObject._call("dismissAll");
    }
    dismissCurrent(ignoreDismissForRoot) {
        return this.contextMenuObject._call("dismissCurrent", ignoreDismissForRoot);
    }
    dismissSubmenus(currentCoordinates, contextMenuId) {
        if (contextMenuId)
            return this.contextMenuObject._call("dismissSubmenus", currentCoordinates, contextMenuId);
        return this.contextMenuObject._call("dismissSubmenus", currentCoordinates);
    }
    fireContentReady() {
        return this.contextMenuObject._call("contentready");
    }
    show(menuId, ariaLabel, contextMenus, positionInfo) {
        return this.contextMenuObject._call("show", menuId, ariaLabel, contextMenus.innerHTML, positionInfo);
    }
}
exports.contextMenuHost = new ContextMenuImpl();

},{"./plugin.host.hotkeys":23,"./plugin.host.jsonMarshaler":24}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreHost = void 0;
const plugin_vs_prefix_1 = require("./plugin.vs.prefix");
class CoreImpl {
    hostDescription() {
        return (0, plugin_vs_prefix_1.getExternalObject)().getHostDescription();
    }
    postMessage(message) {
        (0, plugin_vs_prefix_1.getExternalObject)().postMessage(message);
    }
    messageReceived = (_message) => { };
    constructor() {
        window.__hostMessageReceived = (message) => {
            if (this.messageReceived)
                this.messageReceived(message);
        };
    }
}
exports.coreHost = new CoreImpl();

},{"./plugin.vs.prefix":33}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cultureHost = void 0;
const plugin_host_jsonMarshaler_1 = require("./plugin.host.jsonMarshaler");
class CultureImpl {
    cultureObject;
    constructor() {
        this.cultureObject = (0, plugin_host_jsonMarshaler_1.attachToMarshaledObject)("Plugin.Culture");
    }
    addEventListener(eventType, listener) {
        this.cultureObject.addEventListener(eventType, listener);
    }
}
exports.cultureHost = new CultureImpl();

},{"./plugin.host.jsonMarshaler":24}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnosticsHost = void 0;
const plugin_vs_prefix_1 = require("./plugin.vs.prefix");
class DiagnosticsImpl {
    reportError(message, url, lineNumber, additionalInfo, columnNumber) {
        return (0, plugin_vs_prefix_1.getExternalObject)().reportError(message, url, lineNumber, additionalInfo, columnNumber);
    }
    terminate() {
        (0, plugin_vs_prefix_1.getExternalObject)().terminate();
    }
}
exports.diagnosticsHost = new DiagnosticsImpl();

},{"./plugin.vs.prefix":33}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotKeysHost = void 0;
const plugin_vs_prefix_1 = require("./plugin.vs.prefix");
class HotKeysImpl {
    setHotKeyState(itemGroup, state) {
        (0, plugin_vs_prefix_1.getExternalObject)().setHotKeyState(itemGroup, state);
    }
}
exports.hotKeysHost = new HotKeysImpl();

},{"./plugin.vs.prefix":33}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachToPublishedObject = exports.attachToMarshaledObject = void 0;
const plugin_v2_1 = require("plugin-v2");
const plugin_host_messaging_1 = require("./plugin.host.messaging");
function attachToMarshaledObject(name, objectDefinition, createOnFirstUse) {
    const eventManager = new plugin_v2_1.EventManager(objectDefinition);
    const interfaceObject = attachToPublishedObject(name, objectDefinition, (serializedMessage) => {
        const logger = new plugin_v2_1.Logger();
        if (typeof serializedMessage === "string") {
            const message = JSON.parse(serializedMessage);
            if (typeof message.eventName === "string") {
                eventManager.dispatchEvent(message.eventName, message.arg);
            }
            else {
                logger.logError("JSPlugin.2000");
            }
        }
        else {
            logger.logError("JSPlugin.2001");
        }
    }, (_error) => {
        const logger = new plugin_v2_1.Logger();
        logger.logError("JSPlugin.2002\r\n" + name);
    }, createOnFirstUse);
    interfaceObject._post = function (name, ...args) {
        const message = {
            method: name,
            args: args.length ? args : undefined
        };
        this._postMessage(JSON.stringify(message));
    };
    interfaceObject._call = async function (name) {
        const message = {
            method: name,
            args: arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined
        };
        const result = this._sendMessage(JSON.stringify(message));
        if (!result) {
            const logger = new plugin_v2_1.Logger();
            logger.logError("JSPlugin.1000");
        }
        const responseText = await result;
        const response = JSON.parse(responseText);
        return response.result;
    };
    if (createOnFirstUse) {
        interfaceObject.addEventListener = (type, listener) => {
            interfaceObject._forceConnect();
            if (listener.handleEvent !== undefined) {
                eventManager.addEventListener(type, (e) => listener.handleEvent(e));
            }
            else {
                eventManager.addEventListener(type, (e) => listener(e));
            }
            interfaceObject.addEventListener = eventManager.addEventListener.bind(eventManager);
        };
    }
    else {
        interfaceObject.addEventListener = eventManager.addEventListener.bind(eventManager);
    }
    interfaceObject.removeEventListener = eventManager.removeEventListener.bind(eventManager);
    return interfaceObject;
}
exports.attachToMarshaledObject = attachToMarshaledObject;
function attachToPublishedObject(name, objectDefinition, messageHandler, closeHandler, createOnFirstUse) {
    if (typeof name !== "string") {
        throw new Error("An error has occurred");
    }
    if (typeof messageHandler !== "function") {
        throw new Error("An error has occurred");
    }
    const interfacePortName = name;
    const interfaceObject = (objectDefinition || {});
    let pendingMessages = [];
    let portConnectInitiated = false;
    const port = plugin_host_messaging_1.PortManager.createPort(interfacePortName);
    interfaceObject._forceConnect = () => {
        if (!portConnectInitiated) {
            port.connect();
            portConnectInitiated = true;
        }
    };
    interfaceObject._postMessage = (message) => {
        pendingMessages?.push({
            message: message,
        });
        interfaceObject._forceConnect();
    };
    interfaceObject._sendMessage = (message) => {
        const result = new Promise((complete, error) => {
            pendingMessages?.push({
                message: message,
                onComplete: complete,
                onError: error
            });
        });
        interfaceObject._forceConnect();
        return result;
    };
    const onConnect = () => {
        port.removeEventListener("connect", onConnect);
        port.addEventListener("message", (eventArg) => {
            const serializedMessage = eventArg.data;
            messageHandler(serializedMessage);
        });
        if (typeof closeHandler === "function") {
            port.addEventListener("close", closeHandler);
        }
        interfaceObject._postMessage = (message) => port.postMessage(message);
        interfaceObject._sendMessage = (message) => port.sendMessage(message);
        pendingMessages?.forEach(async (m) => {
            if (m.onComplete) {
                try {
                    const callbackMessage = await port.sendMessage(m.message);
                    m.onComplete(callbackMessage);
                }
                catch (error) {
                    if (m.onError) {
                        m.onError(error);
                    }
                }
            }
            else {
                port.postMessage(m.message);
            }
        });
        pendingMessages = null;
    };
    port.addEventListener("connect", onConnect);
    if (!createOnFirstUse) {
        interfaceObject._forceConnect();
    }
    return interfaceObject;
}
exports.attachToPublishedObject = attachToPublishedObject;

},{"./plugin.host.messaging":26,"plugin-v2":11}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginHost = void 0;
const plugin_v2_1 = require("plugin-v2");
const plugin_host_jsonMarshaler_1 = require("./plugin.host.jsonMarshaler");
const plugin_vs_prefix_1 = require("./plugin.vs.prefix");
class HostImpl {
    hostObject;
    external;
    version;
    constructor(external) {
        this.external = external;
        this.hostObject = (0, plugin_host_jsonMarshaler_1.attachToMarshaledObject)("Plugin.Host", {}, true);
        this.version = this.getVersion();
    }
    showDocument(documentPath, line, col) {
        return this.hostObject._call("showDocument", documentPath, line, col);
    }
    getDocumentLocation(documentPath) {
        return this.hostObject._call("getDocumentLocation", documentPath);
    }
    supportsAllowSetForeground() {
        return true;
    }
    allowSetForeground(processId) {
        if (this.external) {
            return this.external.allowSetForeground(processId);
        }
        return false;
    }
    showMessage(message, options) {
        return this.hostObject._call("showMessage", message, options?.title ?? "", options?.icon ?? plugin_v2_1.Host.ShowMessageIcon.none, options?.buttons ?? plugin_v2_1.Host.ShowMessageButtons.ok);
    }
    getVersion() {
        if (typeof this.external === "undefined" || typeof this.external.getVersion === "undefined") {
            return {
                major: 0,
                minor: 0,
                build: 0,
                revision: 0
            };
        }
        const versionInfo = this.external.getVersion();
        const versionInfoArr = versionInfo.split(" ", 1);
        const versionStr = versionInfoArr[0] ?? Throw(new Error('versionstr is not defined'));
        const versionStrArr = versionStr.split(".");
        return {
            major: parseInt(versionStrArr[0] ?? Throw(new Error('major in version is not defined'))),
            minor: parseInt(versionStrArr[1] ?? Throw(new Error('minor in version is not defined'))),
            build: parseInt(versionStrArr[2] ?? Throw(new Error('build in version is not defined'))),
            revision: parseInt(versionStrArr[3] ?? Throw(new Error('revision in version is not defined')))
        };
    }
}
exports.pluginHost = new HostImpl((0, plugin_vs_prefix_1.getExternalObject)());
function Throw(error) {
    throw error;
}

},{"./plugin.host.jsonMarshaler":24,"./plugin.vs.prefix":33,"plugin-v2":11}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortManager = exports.Messaging = void 0;
const plugin_v2_1 = require("plugin-v2");
const plugin_host_core_1 = require("./plugin.host.core");
const logger = new plugin_v2_1.Logger();
var Messaging;
(function (Messaging) {
    let host;
    let isControlInitialized = false;
    let defaultPort = 0;
    const headerDelimiter = "$";
    let lastMessageId = 0;
    const awaitingResultList = [];
    function initialize(coreHost) {
        host = coreHost;
        host.messageReceived = onMessageReceived;
        window.addEventListener("load", onLoad);
        plugin_v2_1.GlobalPluginEventManager.addEventListener("load", () => {
            const elements = document.getElementsByTagName("*");
            for (let i = 0; i < elements.length; i++) {
                const node = elements[i];
                if (node && (node.nodeName === "INPUT" || node.nodeName === "TEXTAREA")) {
                    node.classList.add("selectElement");
                }
                else {
                    node.classList.add("selectNone");
                }
            }
        });
        document.oncontextmenu = () => {
            return false;
        };
        document.ondragstart = () => {
            return false;
        };
        if (!isControlInitialized) {
            postMessageInternal(defaultPort, plugin_v2_1.ControlCommands.controlInitialized);
            isControlInitialized = true;
        }
    }
    Messaging.initialize = initialize;
    function marshalHostError(hostErrorObject) {
        const error = new Error(hostErrorObject.message + "\r\n" + hostErrorObject.stack);
        error.innerError = hostErrorObject.innerError;
        error.source = hostErrorObject.source;
        error.helpLink = hostErrorObject.helpLink;
        return error;
    }
    Messaging.marshalHostError = marshalHostError;
    function addEventListener(type, listener) {
        plugin_v2_1.GlobalPluginEventManager.addEventListener(type, listener);
    }
    Messaging.addEventListener = addEventListener;
    function removeEventListener(type, listener) {
        plugin_v2_1.GlobalPluginEventManager.removeEventListener(type, listener);
    }
    Messaging.removeEventListener = removeEventListener;
    function createPort(name) {
        return PortManager.createPort(name);
    }
    Messaging.createPort = createPort;
    function postMessageInternal(portId, command, args, payload, expectResult) {
        if (lastMessageId >= Infinity) {
            lastMessageId = 0;
        }
        const header = {
            msgId: ++lastMessageId,
            portId: portId,
        };
        if (command) {
            header.command = command;
        }
        if (args) {
            header.args = args;
        }
        if (expectResult) {
            header.replyRequested = true;
        }
        let message = JSON.stringify(header);
        if (payload) {
            message += headerDelimiter + payload;
        }
        let result;
        if (expectResult) {
            result = new Promise((complete, error) => {
                awaitingResultList[header.msgId] = {
                    onComplete: complete,
                    onError: error
                };
            });
        }
        host.postMessage(message);
        return result;
    }
    Messaging.postMessageInternal = postMessageInternal;
    function sendMessageInternal(portId, command, args, payload) {
        return postMessageInternal(portId, command, args, payload, true);
    }
    Messaging.sendMessageInternal = sendMessageInternal;
    function onLoad() {
        plugin_v2_1.GlobalPluginEventManager.dispatchEvent("load", {});
    }
    function onMessageReceived(message) {
        if (typeof message === "string") {
            let separatorIndex = message.indexOf(headerDelimiter);
            if (separatorIndex === -1) {
                separatorIndex = message.length;
            }
            const headerText = message.substr(0, separatorIndex);
            let header;
            try {
                header = JSON.parse(headerText);
                if (typeof header.replyId !== 'number') {
                    throw new Error("Reply id should be a number");
                }
                if (typeof header.portId !== 'number') {
                    throw new Error("Port id should be a number");
                }
            }
            catch (e) {
                logger.logError("JSPlugin.1013");
                return;
            }
            const payload = message.substr(separatorIndex + 1);
            let eventArgs;
            if (header.replyId > 0) {
                const entry = awaitingResultList[header.replyId];
                if (entry) {
                    delete awaitingResultList[header.replyId];
                    switch (header.command) {
                        case plugin_v2_1.ControlCommands.none:
                            entry.onComplete(payload);
                            break;
                        case plugin_v2_1.ControlCommands.error:
                            if (Array.isArray(header.args) && header.args.length > 0) {
                                entry.onError(header.args[0]);
                            }
                            else {
                                logger.logError("JSPlugin.1014");
                            }
                            break;
                        default:
                            logger.logError("JSPlugin.1015");
                            entry.onError(new Error(plugin_v2_1.Resources.getErrorString("JSPlugin.1015")));
                            break;
                    }
                }
                else if (header.command === plugin_v2_1.ControlCommands.error) {
                    if (header.args && header.args[0]) {
                        throw marshalHostError(header.args[0]);
                    }
                    else {
                        throw new Error(plugin_v2_1.Resources.getErrorString("JSPlugin.1007"));
                    }
                }
            }
            else if (header.portId > defaultPort && header.command === plugin_v2_1.ControlCommands.none) {
                PortManager.processMessage(header.portId, payload);
            }
            else {
                switch (header.command) {
                    case plugin_v2_1.ControlCommands.hostReady:
                        InitializationState.setHostReady();
                        break;
                    case plugin_v2_1.ControlCommands.portClosed: {
                        let shouldLogError = true;
                        if (Array.isArray(header.args) && header.args.length > 0) {
                            const closedPortId = header.args[0];
                            if (typeof closedPortId === "number") {
                                PortManager.processPortClosedMessage(closedPortId);
                                shouldLogError = false;
                            }
                        }
                        if (shouldLogError) {
                            logger.logError("JSPlugin.1016");
                        }
                        break;
                    }
                    case plugin_v2_1.ControlCommands.portConnected: {
                        let shouldLogError = true;
                        if (Array.isArray(header.args) && header.args.length > 1) {
                            const connectedPortId = header.args[0];
                            const connectedPortName = header.args[1];
                            if (typeof connectedPortId === "number" && typeof connectedPortName === "string") {
                                PortManager.processPortConnectedMessage(connectedPortId, connectedPortName);
                                shouldLogError = false;
                            }
                        }
                        if (shouldLogError) {
                            logger.logError("JSPlugin.1017");
                        }
                        break;
                    }
                    case plugin_v2_1.ControlCommands.event: {
                        let shouldLogError = true;
                        if (Array.isArray(header.args) && header.args.length > 1) {
                            const eventName = header.args[0];
                            const eventArgs = header.args[1];
                            if (typeof eventName === "string") {
                                plugin_v2_1.GlobalPluginEventManager.dispatchEvent(eventName, eventArgs);
                                shouldLogError = false;
                            }
                        }
                        if (shouldLogError) {
                            logger.logError("JSPlugin.1018");
                        }
                        break;
                    }
                    case plugin_v2_1.ControlCommands.initiateShutdown:
                        plugin_v2_1.GlobalPluginEventManager.dispatchEvent("close", eventArgs);
                        postMessageInternal(defaultPort, plugin_v2_1.ControlCommands.shutdownComplete);
                        break;
                    default:
                        let error;
                        if (header.args && header.args.length) {
                            error = marshalHostError(header.args[0]);
                        }
                        else {
                            error = new Error(plugin_v2_1.Resources.getErrorString("JSPlugin.1007"));
                        }
                        throw error;
                }
            }
        }
        else if (isServiceHubCommunication(message)) {
            switch (message.type) {
                case "ServiceHubMessage":
                    const messageReceivedFromServiceHubService = window.__messageReceivedFromServiceHubService;
                    if (messageReceivedFromServiceHubService) {
                        messageReceivedFromServiceHubService(message.pipeHandle, message.message);
                    }
                    break;
                case "ServiceHubDisconnect":
                    const serviceHubServiceDisconnected = window.__serviceHubServiceDisconnected;
                    if (serviceHubServiceDisconnected) {
                        serviceHubServiceDisconnected(message.pipeHandle, message.errorCode);
                    }
                    break;
                default:
            }
        }
    }
    ;
    function isServiceHubCommunication(message) {
        return !!message && message.hasOwnProperty("type");
    }
})(Messaging = exports.Messaging || (exports.Messaging = {}));
class PortImpl {
    eventManager;
    _state;
    _cookie;
    name;
    get state() { return this._state; }
    constructor(name) {
        this.name = name;
        this.eventManager = new plugin_v2_1.EventManager(this);
        this._state = plugin_v2_1.PortState.disconnected;
    }
    removeEventListener(type, listener, _useCapture) {
        this.eventManager.removeEventListener(type, listener);
    }
    addEventListener(type, listener, _useCapture) {
        this.eventManager.addEventListener(type, listener);
    }
    dispatchEvent(evt) {
        return this.eventManager.dispatchEvent(evt);
    }
    connect() {
        if (this._state !== plugin_v2_1.PortState.disconnected) {
            return false;
        }
        const port = this;
        const cookie = PortManager.registerPort(this.name, () => {
            if (port._state !== plugin_v2_1.PortState.disconnected) {
                return;
            }
            port._state = plugin_v2_1.PortState.connected;
            const eventArgs = { port: port };
            port.eventManager.dispatchEvent("connect", eventArgs);
        }, () => {
            if (port._state !== plugin_v2_1.PortState.connected) {
                return;
            }
            port._state = plugin_v2_1.PortState.disconnected;
        }, (message) => {
            if (port._state !== plugin_v2_1.PortState.connected) {
                return;
            }
            const eventArgs = { data: message };
            port.eventManager.dispatchEvent("message", eventArgs);
        });
        this._cookie = cookie;
        return true;
    }
    postMessage(message) {
        if (this._state !== plugin_v2_1.PortState.connected) {
            return;
        }
        PortManager.postMessage(this._cookie, message);
    }
    sendMessage(message) {
        if (this._state !== plugin_v2_1.PortState.connected) {
            return;
        }
        return PortManager.sendMessage(this._cookie, message);
    }
    close() {
        if (this._state === plugin_v2_1.PortState.closed) {
            return;
        }
        this._state = plugin_v2_1.PortState.closed;
        PortManager.unregisterPort(this._cookie);
        const eventArgs = {};
        this.eventManager.dispatchEvent("close", eventArgs);
    }
}
class PortManager {
    static registeredPorts = {};
    static portNameLookupList = {};
    static portIdLookupList = {};
    static lastPortIndex = 1;
    static defaultPort = 0;
    static createPort(name) {
        if (typeof name !== "string" || name.length <= 0) {
            throw new Error(plugin_v2_1.Resources.getErrorString("JSPlugin.1001"));
        }
        if (this.portNameLookupList[name]) {
            throw new Error(plugin_v2_1.Resources.getErrorString("JSPlugin.1002") + "\r\n" + name);
        }
        return new PortImpl(name);
    }
    static registerPort(name, onConnect, onDisconnect, onMessage) {
        if (typeof name !== "string" || name.length <= 0) {
            throw new Error(plugin_v2_1.Resources.getErrorString("JSPlugin.1001"));
        }
        if (this.portNameLookupList[name]) {
            throw new Error(plugin_v2_1.Resources.getErrorString("JSPlugin.1002") + "\r\n" + name);
        }
        if (typeof onConnect !== "function") {
            throw new Error(plugin_v2_1.Resources.getErrorString("JSPlugin.1003"));
        }
        if (typeof onDisconnect !== "function") {
            throw new Error(plugin_v2_1.Resources.getErrorString("JSPlugin.1004"));
        }
        if (typeof onMessage !== "function") {
            throw new Error(plugin_v2_1.Resources.getErrorString("JSPlugin.1005"));
        }
        const cookie = ++this.lastPortIndex;
        this.registeredPorts[cookie] = this.portNameLookupList[name] = {
            id: null,
            name: name,
            onConnect: onConnect,
            onDisconnect: onDisconnect,
            onMessage: onMessage
        };
        Messaging.initialize(plugin_host_core_1.coreHost);
        Messaging.postMessageInternal(this.defaultPort, plugin_v2_1.ControlCommands.portCreated, [name]);
        return cookie;
    }
    static unregisterPort(cookie) {
        const entry = this.registeredPorts[cookie];
        if (entry) {
            delete this.registeredPorts[cookie];
            if (entry.name) {
                delete this.portNameLookupList[entry.name];
            }
            if (entry.id) {
                delete this.portIdLookupList[entry.id];
            }
            Messaging.initialize(plugin_host_core_1.coreHost);
            Messaging.postMessageInternal(this.defaultPort, plugin_v2_1.ControlCommands.portClosed, [entry.name]);
        }
    }
    static postMessage(cookie, message) {
        const entry = this.registeredPorts[cookie];
        if (!entry || entry.id == null) {
            throw new Error(plugin_v2_1.Resources.getErrorString("JSPlugin.1006"));
        }
        Messaging.initialize(plugin_host_core_1.coreHost);
        Messaging.postMessageInternal(entry.id, plugin_v2_1.ControlCommands.none, null, message);
    }
    static sendMessage(cookie, message) {
        const entry = this.registeredPorts[cookie];
        if (!entry || entry.id == null) {
            throw new Error(plugin_v2_1.Resources.getErrorString("JSPlugin.1006"));
        }
        Messaging.initialize(plugin_host_core_1.coreHost);
        return Messaging.sendMessageInternal(entry.id, plugin_v2_1.ControlCommands.none, null, message);
    }
    static processPortConnectedMessage(id, name) {
        const entry = this.portNameLookupList[name];
        if (entry) {
            entry.id = id;
            this.portIdLookupList[id] = entry;
            entry.onConnect();
        }
        else {
            logger.logError("JSPlugin.1010\r\n" + name);
        }
    }
    static processPortClosedMessage(id) {
        const entry = this.portIdLookupList[id];
        if (entry) {
            entry.onDisconnect();
        }
        else {
            logger.logError("JSPlugin.1011\r\n" + id);
        }
    }
    static processMessage(id, message) {
        const entry = this.portIdLookupList[id];
        if (entry) {
            entry.onMessage(message);
        }
        else {
            logger.logError("JSPlugin.1012\r\n" + id);
        }
    }
}
exports.PortManager = PortManager;
window.addEventListener("DOMContentLoaded", () => {
    InitializationState.isDOMLoaded = true;
    InitializationState.checkAndFirePluginReady();
});
class InitializationState {
    static isHostReady = false;
    static isDOMLoaded = false;
    static checkAndFirePluginReady() {
        const isDocumentReady = this.isDOMLoaded || document.readyState === "complete";
        if (this.isHostReady && isDocumentReady) {
            plugin_v2_1.GlobalPluginEventManager.dispatchEvent("pluginready", {});
        }
    }
    static setHostReady() {
        plugin_v2_1.GlobalPluginEventManager.dispatchEvent("hostready", {});
        this.isHostReady = true;
        this.checkAndFirePluginReady();
    }
}

},{"./plugin.host.core":20,"plugin-v2":11}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputHost = void 0;
const plugin_host_jsonMarshaler_1 = require("./plugin.host.jsonMarshaler");
class OutputImpl {
    outputObject;
    log(message) {
        this.outputObject._post("log", message);
    }
    constructor() {
        this.outputObject = (0, plugin_host_jsonMarshaler_1.attachToMarshaledObject)("Plugin.Output");
    }
}
exports.outputHost = new OutputImpl();

},{"./plugin.host.jsonMarshaler":24}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourcesHost = void 0;
const plugin_host_jsonMarshaler_1 = require("./plugin.host.jsonMarshaler");
class ResourcesImpl {
    resourcesObject;
    addEventListener;
    removeEventListener;
    constructor() {
        this.resourcesObject = (0, plugin_host_jsonMarshaler_1.attachToMarshaledObject)("Plugin.Resources");
        this.addEventListener = this.resourcesObject.addEventListener.bind(this.resourcesObject);
        this.removeEventListener = this.resourcesObject.removeEventListener.bind(this.resourcesObject);
    }
    loadResources(resourceAlias) {
        return this.resourcesObject._call("loadResources", resourceAlias);
    }
}
exports.resourcesHost = new ResourcesImpl();

},{"./plugin.host.jsonMarshaler":24}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsHost = void 0;
const plugin_host_jsonMarshaler_1 = require("./plugin.host.jsonMarshaler");
class SettingsImpl {
    settingsObject;
    constructor() {
        this.settingsObject = (0, plugin_host_jsonMarshaler_1.attachToMarshaledObject)("Plugin.Settings");
    }
    get(collection, requestedProperties) {
        return this.settingsObject._call("get", collection, requestedProperties);
    }
    set(collection, toSet) {
        this.settingsObject._post("set", collection, toSet);
    }
}
exports.settingsHost = new SettingsImpl();

},{"./plugin.host.jsonMarshaler":24}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageHost = void 0;
const plugin_host_jsonMarshaler_1 = require("./plugin.host.jsonMarshaler");
const plugin_v2_1 = require("plugin-v2");
class StorageImpl {
    storageObject;
    constructor() {
        this.storageObject = (0, plugin_host_jsonMarshaler_1.attachToMarshaledObject)("Plugin.Storage");
    }
    closeFile(streamId) {
        return this.storageObject._call("close", streamId);
    }
    fileDialog(mode, dialogOptions, fileOptions) {
        return this.storageObject._call("fileDialog", mode, dialogOptions, fileOptions);
    }
    getFileList(path, persistence, index, count) {
        persistence = (persistence === null || typeof persistence === "undefined") ? plugin_v2_1.Storage.FilePersistence.temporary : persistence;
        index = index || 0;
        count = count || 0;
        return this.storageObject._call("getFileList", path, persistence, index, count);
    }
    openFile(path, options) {
        return this.storageObject._call("openFile", path, options);
    }
    read(streamId, count, type) {
        switch (type) {
            case plugin_v2_1.Storage.FileType.binary:
                return this.storageObject._call("readBinary", streamId, count);
            case plugin_v2_1.Storage.FileType.text:
                return this.storageObject._call("readText", streamId, count);
            default:
                throw new Error("Error JSPlugin.7004");
        }
    }
    seek(streamId, offset, origin) {
        return this.storageObject._call("seek", streamId, offset, origin);
    }
    write(streamId, data, offset, count, type) {
        switch (type) {
            case plugin_v2_1.Storage.FileType.binary:
                return this.storageObject._call("writeBinary", streamId, data, offset, count);
            case plugin_v2_1.Storage.FileType.text:
                return this.storageObject._call("writeText", streamId, data, offset, count);
            default:
                throw new Error("Error JSPlugin.7004");
        }
    }
}
exports.storageHost = new StorageImpl();

},{"./plugin.host.jsonMarshaler":24,"plugin-v2":11}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeHost = void 0;
const plugin_host_jsonMarshaler_1 = require("./plugin.host.jsonMarshaler");
class ThemeImpl {
    themeObject;
    constructor() {
        this.themeObject = (0, plugin_host_jsonMarshaler_1.attachToMarshaledObject)("Plugin.Theme");
    }
    addEventListener(name, callback) {
        this.themeObject.addEventListener(name, callback);
    }
    fireThemeReady() {
        this.themeObject._post("fireThemeReady");
    }
    getCssFile(name, requirePluginRelativeLocation) {
        return this.themeObject._call("getCssFile", name, requirePluginRelativeLocation);
    }
}
exports.themeHost = new ThemeImpl();

},{"./plugin.host.jsonMarshaler":24}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tooltipHost = exports.TooltipImpl = void 0;
const plugin_host_jsonMarshaler_1 = require("./plugin.host.jsonMarshaler");
const plugin_vs_prefix_1 = require("./plugin.vs.prefix");
class TooltipImpl {
    tooltipObject;
    shouldShowTooltipsOnFocus = null;
    constructor() {
        this.tooltipObject = (0, plugin_host_jsonMarshaler_1.attachToMarshaledObject)("Plugin.Tooltip");
        this.tooltipObject.addEventListener("enableenhancedtooltipschanged", ((eventArgs) => {
            this.shouldShowTooltipsOnFocus = eventArgs.enhancedTooltipsEnabled;
        }));
    }
    canCreatePopup() {
        return true;
    }
    getScreenSizeForXY(screenX, screenY) {
        const JSONBounds = (0, plugin_vs_prefix_1.getExternalObject)().getMonitorBounds(screenX, screenY);
        if (typeof JSONBounds != 'undefined') {
            return JSON.parse(JSONBounds);
        }
        else {
            return null;
        }
    }
    async getShouldShowTooltipsOnFocus() {
        if (this.shouldShowTooltipsOnFocus === null) {
            this.shouldShowTooltipsOnFocus = await this.tooltipObject._call("getShouldShowTooltipsOnFocus");
        }
        return !!this.shouldShowTooltipsOnFocus;
    }
    hostContentInPopup(popupDisplayParameters) {
        if (window.devicePixelRatio > 1) {
            popupDisplayParameters.contentSize = {
                Width: popupDisplayParameters.contentSize.Width * window.devicePixelRatio,
                Height: popupDisplayParameters.contentSize.Height * window.devicePixelRatio
            };
        }
        this.tooltipObject._post("hostContentInPopup", popupDisplayParameters);
    }
    dismissPopup() {
        this.tooltipObject._post("dismissPopup");
    }
    getDoubleClickTime() {
        return (0, plugin_vs_prefix_1.getExternalObject)().getDoubleClickTime();
    }
}
exports.TooltipImpl = TooltipImpl;
exports.tooltipHost = new TooltipImpl();

},{"./plugin.host.jsonMarshaler":24,"./plugin.vs.prefix":33}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExternalObject = exports.__n = void 0;
const plugin_host_core_1 = require("./plugin.host.core");
exports.__n = window.__n || function (...args) { };
var $$modules = $$modules || {};
window.chrome.webview.addEventListener('message', event => {
    var host = plugin_host_core_1.coreHost;
    host.messageReceived(event.data);
});
function getExternalObject() {
    return window.chrome.webview.hostObjects.sync.external;
}
exports.getExternalObject = getExternalObject;

},{"./plugin.host.core":20}],"plugin-vs-v2":[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const api = __importStar(require("./api"));
api;
__exportStar(require("./api"), exports);

},{"./api":18}]},{},[]);
(function() { require("plugin-vs-v2");})();

// SIG // Begin signature block
// SIG // MIIoKwYJKoZIhvcNAQcCoIIoHDCCKBgCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // GrlBYhiNgRqmmJwni2iyFtLEvfOOlA8//9HKUsQjrQug
// SIG // gg12MIIF9DCCA9ygAwIBAgITMwAAA68wQA5Mo00FQQAA
// SIG // AAADrzANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTIzMTExNjE5MDkwMFoX
// SIG // DTI0MTExNDE5MDkwMFowdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // zkvLNa2un9GBrYNDoRGkGv7d0PqtTBB4ViYakFbjuWpm
// SIG // F0KcvDAzzaCWJPhVgIXjz+S8cHEoHuWnp/n+UOljT3eh
// SIG // A8Rs6Lb1aTYub3tB/e0txewv2sQ3yscjYdtTBtFvEm9L
// SIG // 8Yv76K3Cxzi/Yvrdg+sr7w8y5RHn1Am0Ff8xggY1xpWC
// SIG // XFI+kQM18njQDcUqSlwBnexYfqHBhzz6YXA/S0EziYBu
// SIG // 2O2mM7R6gSyYkEOHgIGTVOGnOvvC5xBgC4KNcnQuQSRL
// SIG // iUI2CmzU8vefR6ykruyzt1rNMPI8OqWHQtSDKXU5JNqb
// SIG // k4GNjwzcwbSzOHrxuxWHq91l/vLdVDGDUwIDAQABo4IB
// SIG // czCCAW8wHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFEcccTTyBDxkjvJKs/m4AgEF
// SIG // hl7BMEUGA1UdEQQ+MDykOjA4MR4wHAYDVQQLExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xFjAUBgNVBAUTDTIzMDAx
// SIG // Mis1MDE4MjYwHwYDVR0jBBgwFoAUSG5k5VAF04KqFzc3
// SIG // IrVtqMp1ApUwVAYDVR0fBE0wSzBJoEegRYZDaHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraW9wcy9jcmwvTWlj
// SIG // Q29kU2lnUENBMjAxMV8yMDExLTA3LTA4LmNybDBhBggr
// SIG // BgEFBQcBAQRVMFMwUQYIKwYBBQUHMAKGRWh0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY2VydHMvTWlj
// SIG // Q29kU2lnUENBMjAxMV8yMDExLTA3LTA4LmNydDAMBgNV
// SIG // HRMBAf8EAjAAMA0GCSqGSIb3DQEBCwUAA4ICAQCEsRbf
// SIG // 80dn60xTweOWHZoWaQdpzSaDqIvqpYHE5ZzuEMJWDdcP
// SIG // 72MGw8v6BSaJQ+a+hTCXdERnIBDPKvU4ENjgu4EBJocH
// SIG // lSe8riiZUAR+z+z4OUYqoFd3EqJyfjjOJBR2z94Dy4ss
// SIG // 7LEkHUbj2NZiFqBoPYu2OGQvEk+1oaUsnNKZ7Nl7FHtV
// SIG // 7CI2lHBru83e4IPe3glIi0XVZJT5qV6Gx/QhAFmpEVBj
// SIG // SAmDdgII4UUwuI9yiX6jJFNOEek6MoeP06LMJtbqA3Bq
// SIG // +ZWmJ033F97uVpyaiS4bj3vFI/ZBgDnMqNDtZjcA2vi4
// SIG // RRMweggd9vsHyTLpn6+nXoLy03vMeebq0C3k44pgUIEu
// SIG // PQUlJIRTe6IrN3GcjaZ6zHGuQGWgu6SyO9r7qkrEpS2p
// SIG // RjnGZjx2RmCamdAWnDdu+DmfNEPAddYjaJJ7PTnd+PGz
// SIG // G+WeH4ocWgVnm5fJFhItjj70CJjgHqt57e1FiQcyWCwB
// SIG // hKX2rGgN2UICHBF3Q/rsKOspjMw2OlGphTn2KmFl5J7c
// SIG // Qxru54A9roClLnHGCiSUYos/iwFHI/dAVXEh0S0KKfTf
// SIG // M6AC6/9bCbsD61QLcRzRIElvgCgaiMWFjOBL99pemoEl
// SIG // AHsyzG6uX93fMfas09N9YzA0/rFAKAsNDOcFbQlEHKiD
// SIG // T7mI20tVoCcmSIhJATCCB3owggVioAMCAQICCmEOkNIA
// SIG // AAAAAAMwDQYJKoZIhvcNAQELBQAwgYgxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xMjAwBgNVBAMTKU1pY3Jvc29mdCBSb290
// SIG // IENlcnRpZmljYXRlIEF1dGhvcml0eSAyMDExMB4XDTEx
// SIG // MDcwODIwNTkwOVoXDTI2MDcwODIxMDkwOVowfjELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEoMCYGA1UEAxMfTWljcm9zb2Z0
// SIG // IENvZGUgU2lnbmluZyBQQ0EgMjAxMTCCAiIwDQYJKoZI
// SIG // hvcNAQEBBQADggIPADCCAgoCggIBAKvw+nIQHC6t2G6q
// SIG // ghBNNLrytlghn0IbKmvpWlCquAY4GgRJun/DDB7dN2vG
// SIG // EtgL8DjCmQawyDnVARQxQtOJDXlkh36UYCRsr55JnOlo
// SIG // XtLfm1OyCizDr9mpK656Ca/XllnKYBoF6WZ26DJSJhIv
// SIG // 56sIUM+zRLdd2MQuA3WraPPLbfM6XKEW9Ea64DhkrG5k
// SIG // NXimoGMPLdNAk/jj3gcN1Vx5pUkp5w2+oBN3vpQ97/vj
// SIG // K1oQH01WKKJ6cuASOrdJXtjt7UORg9l7snuGG9k+sYxd
// SIG // 6IlPhBryoS9Z5JA7La4zWMW3Pv4y07MDPbGyr5I4ftKd
// SIG // gCz1TlaRITUlwzluZH9TupwPrRkjhMv0ugOGjfdf8NBS
// SIG // v4yUh7zAIXQlXxgotswnKDglmDlKNs98sZKuHCOnqWbs
// SIG // YR9q4ShJnV+I4iVd0yFLPlLEtVc/JAPw0XpbL9Uj43Bd
// SIG // D1FGd7P4AOG8rAKCX9vAFbO9G9RVS+c5oQ/pI0m8GLhE
// SIG // fEXkwcNyeuBy5yTfv0aZxe/CHFfbg43sTUkwp6uO3+xb
// SIG // n6/83bBm4sGXgXvt1u1L50kppxMopqd9Z4DmimJ4X7Iv
// SIG // hNdXnFy/dygo8e1twyiPLI9AN0/B4YVEicQJTMXUpUMv
// SIG // dJX3bvh4IFgsE11glZo+TzOE2rCIF96eTvSWsLxGoGyY
// SIG // 0uDWiIwLAgMBAAGjggHtMIIB6TAQBgkrBgEEAYI3FQEE
// SIG // AwIBADAdBgNVHQ4EFgQUSG5k5VAF04KqFzc3IrVtqMp1
// SIG // ApUwGQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYD
// SIG // VR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHwYDVR0j
// SIG // BBgwFoAUci06AjGQQ7kUBU7h6qfHMdEjiTQwWgYDVR0f
// SIG // BFMwUTBPoE2gS4ZJaHR0cDovL2NybC5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jcmwvcHJvZHVjdHMvTWljUm9vQ2VyQXV0
// SIG // MjAxMV8yMDExXzAzXzIyLmNybDBeBggrBgEFBQcBAQRS
// SIG // MFAwTgYIKwYBBQUHMAKGQmh0dHA6Ly93d3cubWljcm9z
// SIG // b2Z0LmNvbS9wa2kvY2VydHMvTWljUm9vQ2VyQXV0MjAx
// SIG // MV8yMDExXzAzXzIyLmNydDCBnwYDVR0gBIGXMIGUMIGR
// SIG // BgkrBgEEAYI3LgMwgYMwPwYIKwYBBQUHAgEWM2h0dHA6
// SIG // Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvZG9jcy9w
// SIG // cmltYXJ5Y3BzLmh0bTBABggrBgEFBQcCAjA0HjIgHQBM
// SIG // AGUAZwBhAGwAXwBwAG8AbABpAGMAeQBfAHMAdABhAHQA
// SIG // ZQBtAGUAbgB0AC4gHTANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // Z/KGpZjgVHkaLtPYdGcimwuWEeFjkplCln3SeQyQwWVf
// SIG // Liw++MNy0W2D/r4/6ArKO79HqaPzadtjvyI1pZddZYSQ
// SIG // fYtGUFXYDJJ80hpLHPM8QotS0LD9a+M+By4pm+Y9G6XU
// SIG // tR13lDni6WTJRD14eiPzE32mkHSDjfTLJgJGKsKKELuk
// SIG // qQUMm+1o+mgulaAqPyprWEljHwlpblqYluSD9MCP80Yr
// SIG // 3vw70L01724lruWvJ+3Q3fMOr5kol5hNDj0L8giJ1h/D
// SIG // Mhji8MUtzluetEk5CsYKwsatruWy2dsViFFFWDgycSca
// SIG // f7H0J/jeLDogaZiyWYlobm+nt3TDQAUGpgEqKD6CPxNN
// SIG // ZgvAs0314Y9/HG8VfUWnduVAKmWjw11SYobDHWM2l4bf
// SIG // 2vP48hahmifhzaWX0O5dY0HjWwechz4GdwbRBrF1HxS+
// SIG // YWG18NzGGwS+30HHDiju3mUv7Jf2oVyW2ADWoUa9WfOX
// SIG // pQlLSBCZgB/QACnFsZulP0V3HjXG0qKin3p6IvpIlR+r
// SIG // +0cjgPWe+L9rt0uX4ut1eBrs6jeZeRhL/9azI2h15q/6
// SIG // /IvrC4DqaTuv/DDtBEyO3991bWORPdGdVk5Pv4BXIqF4
// SIG // ETIheu9BCrE/+6jMpF3BoYibV3FWTkhFwELJm3ZbCoBI
// SIG // a/15n8G9bW1qyVJzEw16UM0xghoNMIIaCQIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAD
// SIG // rzBADkyjTQVBAAAAAAOvMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCDGw0a5ZQYd08Pr214S73q7J4yrNAffwOuC
// SIG // 4uOJyAVANDBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAAW4WTr+
// SIG // SOwwMiURb7EqvoHqh9dr8zmWmVB57/mOpMQ2d1BxUXqL
// SIG // S4qDlgegW0kWl4unjxCgoTPNCUyqbwS15t9pRgOiZKGQ
// SIG // N+/gZnRsggNcrgVfw6kmrHVItKLWon5XOJE9qROksR37
// SIG // GrshWIYSZKiWOJ37Gow5go8uXt+HxaAMx37vTO7yp2hG
// SIG // USR1w1rDE06KyNvWIIIMh1S7ByKbko+5tnOKNFUN781E
// SIG // tn0+dH/K4RiViMaswIdN/o4ewF1OpeV+NY1zuNxtn/bV
// SIG // hO8m+jCCRYQwHyTO9mi6cEUscbi7jBjaOEt2Iswdtk2y
// SIG // P2g2nX6sxmdLYvR4N5N4HZttolehgheXMIIXkwYKKwYB
// SIG // BAGCNwMDATGCF4Mwghd/BgkqhkiG9w0BBwKgghdwMIIX
// SIG // bAIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgwEImXtU/GGvE9nGRQThT
// SIG // XwSphs5X4LP9pS0dLBzpVT0CBmWf8SYTVRgTMjAyNDAx
// SIG // MjYxOTA1NDcuOTAyWjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOjhEMDAtMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR7TCCByAwggUIoAMCAQICEzMAAAHNVQcq58rBmR0A
// SIG // AQAAAc0wDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwHhcNMjMwNTI1MTkxMjA1WhcN
// SIG // MjQwMjAxMTkxMjA1WjCByzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3Bl
// SIG // cmF0aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNO
// SIG // OjhEMDAtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEA0zgi1Uto5hFjqsc8
// SIG // oFu7OmC5ptvaY7wPgoelS+x5Uy/MlLd2dCiM02tjvx76
// SIG // /2ic2tahFZJauzT4jq6QQCM+uey1ccBHOAcSYr+gevGv
// SIG // A0IhelgBRTWit1h4u038UZ6i6IYDc+72T8pWUF+/ea/D
// SIG // EL1+ersI4/0eIV50ezWuC5buJlrJpf8KelSagrsWZ7vY
// SIG // 1+KmlMZ4HK3xU+/s75VwpcC2odp9Hhip2tXTozoMitNI
// SIG // 2Kub7c6+TWfqlcamsPQ5hLI/b36mJH0Ga8tiTucJoF1+
// SIG // /TsezyzFH6k+PvMOSZHUjKF99m9Q+nAylkVL+ao4mIeK
// SIG // P2vXoRPygJFFpUj22w0f2hpzySwBj8tqgPe2AgXniCY0
// SIG // SlEYHT5YROTuOpDo7vJ2CZyL8W7gtkKdo8cHOqw/TOj7
// SIG // 3PLGSHENdGCmVWCrPeGD0pZIcF8LbW0WPo2Z0Ig5tmRY
// SIG // x/Ej3tSOhEXH3mF9cwmIxM3cFnJvnxWZpSQPR0Fu2SQJ
// SIG // jhAjjbXytvBERBBOcs6vk90DFT4YhHxIYHGLIdA3qFom
// SIG // BrA4ihLkvhRJTDMk+OevlNmUWtoW0UPe0HG72gHejlUC
// SIG // 6d00KjRLtHrOWatMINggA3/kCkEf2OvnxoJPaiTSVtzL
// SIG // u+9SrYbj5TXyrLNAdc4dMWtcjeKgt86BPVKuk/K+xt/z
// SIG // rUhZrOMCAwEAAaOCAUkwggFFMB0GA1UdDgQWBBShk/mm
// SIG // NmmawQCVSGYeZInKJHzVmjAfBgNVHSMEGDAWgBSfpxVd
// SIG // AF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQ
// SIG // hk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENB
// SIG // JTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwG
// SIG // CCsGAQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUt
// SIG // U3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMB
// SIG // Af8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4G
// SIG // A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // Uqht6aSiFPovxDMMLaLaMZyn8NEl/909ehD248LACJlj
// SIG // meZywG2raKZfMxWPONYG+Xoi9Y/NYeA4hIl7fgSYByAN
// SIG // iyISoUrHHe/aDG6+t9Q4hKn/V+S2Ud1dyiGLLVNyu3+Q
// SIG // 5O7W6G7h7vun2DP4DseOLIEVO2EPmE2B77/JOJjJ7omo
// SIG // SUZVPxdr2r3B1OboV4tO/CuJ0kQD51sl+4FYuolTAQVB
// SIG // ePNt6Dxc5xHB7qe1TRkbRntcb55THdQrssXLTPHf6Ksk
// SIG // 7McJSQDORf5Q8ZxFqEswJGndZ1r5GgHjFe/t/SKV4bn/
// SIG // Rt8W33yosgZ493EHogOEsUsAnZ8dNEQZV0uq/bRg2v6P
// SIG // UUtNRTgAcypD+QgQ6ZuMKSnSFO+CrQR9rBOUGGJ+5YmF
// SIG // ma9n/1PoIU5nThDj5FxHF/NR+HUSVNvE4/4FGXcC/NcW
// SIG // ofCp/nAe7zPx7N/yfLRdd2Tz/vDbV977uDa3IRwyWIIz
// SIG // ovtSbkn/uI6Rf6RBD16fQLrIs5kppASuIlU+zcFbUZ0t
// SIG // bbPKgBhxj4Nhz2uG9rvZnrnlKKjVbTIW7piNcvnfWZE4
// SIG // TVwV89miLU9gvfQzN096mKgFJrylK8lUqTC1abHuI3uV
// SIG // jelVZQgxSlhUR9tNmMRFVrGeW2jfQmqgmwktBGu7PThS
// SIG // 2hDOXzZ/ZubOvZQ/3pHFtqkwggdxMIIFWaADAgECAhMz
// SIG // AAAAFcXna54Cm0mZAAAAAAAVMA0GCSqGSIb3DQEBCwUA
// SIG // MIGIMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMTIwMAYDVQQDEylN
// SIG // aWNyb3NvZnQgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3Jp
// SIG // dHkgMjAxMDAeFw0yMTA5MzAxODIyMjVaFw0zMDA5MzAx
// SIG // ODMyMjVaMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpX
// SIG // YXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYD
// SIG // VQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNV
// SIG // BAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEw
// SIG // MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
// SIG // 5OGmTOe0ciELeaLL1yR5vQ7VgtP97pwHB9KpbE51yMo1
// SIG // V/YBf2xK4OK9uT4XYDP/XE/HZveVU3Fa4n5KWv64NmeF
// SIG // RiMMtY0Tz3cywBAY6GB9alKDRLemjkZrBxTzxXb1hlDc
// SIG // wUTIcVxRMTegCjhuje3XD9gmU3w5YQJ6xKr9cmmvHaus
// SIG // 9ja+NSZk2pg7uhp7M62AW36MEBydUv626GIl3GoPz130
// SIG // /o5Tz9bshVZN7928jaTjkY+yOSxRnOlwaQ3KNi1wjjHI
// SIG // NSi947SHJMPgyY9+tVSP3PoFVZhtaDuaRr3tpK56KTes
// SIG // y+uDRedGbsoy1cCGMFxPLOJiss254o2I5JasAUq7vnGp
// SIG // F1tnYN74kpEeHT39IM9zfUGaRnXNxF803RKJ1v2lIH1+
// SIG // /NmeRd+2ci/bfV+AutuqfjbsNkz2K26oElHovwUDo9Fz
// SIG // pk03dJQcNIIP8BDyt0cY7afomXw/TNuvXsLz1dhzPUNO
// SIG // wTM5TI4CvEJoLhDqhFFG4tG9ahhaYQFzymeiXtcodgLi
// SIG // Mxhy16cg8ML6EgrXY28MyTZki1ugpoMhXV8wdJGUlNi5
// SIG // UPkLiWHzNgY1GIRH29wb0f2y1BzFa/ZcUlFdEtsluq9Q
// SIG // BXpsxREdcu+N+VLEhReTwDwV2xo3xwgVGD94q0W29R6H
// SIG // XtqPnhZyacaue7e3PmriLq0CAwEAAaOCAd0wggHZMBIG
// SIG // CSsGAQQBgjcVAQQFAgMBAAEwIwYJKwYBBAGCNxUCBBYE
// SIG // FCqnUv5kxJq+gpE8RjUpzxD/LwTuMB0GA1UdDgQWBBSf
// SIG // pxVdAF5iXYP05dJlpxtTNRnpcjBcBgNVHSAEVTBTMFEG
// SIG // DCsGAQQBgjdMg30BATBBMD8GCCsGAQUFBwIBFjNodHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL0RvY3Mv
// SIG // UmVwb3NpdG9yeS5odG0wEwYDVR0lBAwwCgYIKwYBBQUH
// SIG // AwgwGQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYD
// SIG // VR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHwYDVR0j
// SIG // BBgwFoAU1fZWy4/oolxiaNE9lJBb186aGMQwVgYDVR0f
// SIG // BE8wTTBLoEmgR4ZFaHR0cDovL2NybC5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jcmwvcHJvZHVjdHMvTWljUm9vQ2VyQXV0
// SIG // XzIwMTAtMDYtMjMuY3JsMFoGCCsGAQUFBwEBBE4wTDBK
// SIG // BggrBgEFBQcwAoY+aHR0cDovL3d3dy5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jZXJ0cy9NaWNSb29DZXJBdXRfMjAxMC0w
// SIG // Ni0yMy5jcnQwDQYJKoZIhvcNAQELBQADggIBAJ1Vffwq
// SIG // reEsH2cBMSRb4Z5yS/ypb+pcFLY+TkdkeLEGk5c9MTO1
// SIG // OdfCcTY/2mRsfNB1OW27DzHkwo/7bNGhlBgi7ulmZzpT
// SIG // Td2YurYeeNg2LpypglYAA7AFvonoaeC6Ce5732pvvinL
// SIG // btg/SHUB2RjebYIM9W0jVOR4U3UkV7ndn/OOPcbzaN9l
// SIG // 9qRWqveVtihVJ9AkvUCgvxm2EhIRXT0n4ECWOKz3+SmJ
// SIG // w7wXsFSFQrP8DJ6LGYnn8AtqgcKBGUIZUnWKNsIdw2Fz
// SIG // Lixre24/LAl4FOmRsqlb30mjdAy87JGA0j3mSj5mO0+7
// SIG // hvoyGtmW9I/2kQH2zsZ0/fZMcm8Qq3UwxTSwethQ/gpY
// SIG // 3UA8x1RtnWN0SCyxTkctwRQEcb9k+SS+c23Kjgm9swFX
// SIG // SVRk2XPXfx5bRAGOWhmRaw2fpCjcZxkoJLo4S5pu+yFU
// SIG // a2pFEUep8beuyOiJXk+d0tBMdrVXVAmxaQFEfnyhYWxz
// SIG // /gq77EFmPWn9y8FBSX5+k77L+DvktxW/tM4+pTFRhLy/
// SIG // AsGConsXHRWJjXD+57XQKBqJC4822rpM+Zv/Cuk0+CQ1
// SIG // ZyvgDbjmjJnW4SLq8CdCPSWU5nR0W2rRnj7tfqAxM328
// SIG // y+l7vzhwRNGQ8cirOoo6CGJ/2XBjU02N7oJtpQUQwXEG
// SIG // ahC0HVUzWLOhcGbyoYIDUDCCAjgCAQEwgfmhgdGkgc4w
// SIG // gcsxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJTAjBgNVBAsTHE1p
// SIG // Y3Jvc29mdCBBbWVyaWNhIE9wZXJhdGlvbnMxJzAlBgNV
// SIG // BAsTHm5TaGllbGQgVFNTIEVTTjo4RDAwLTA1RTAtRDk0
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaIjCgEBMAcGBSsOAwIaAxUAaKn3ptiis7kW
// SIG // YyEmInxqJVTncgSggYMwgYCkfjB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOle
// SIG // NbgwIhgPMjAyNDAxMjYxMzQ0MjRaGA8yMDI0MDEyNzEz
// SIG // NDQyNFowdzA9BgorBgEEAYRZCgQBMS8wLTAKAgUA6V41
// SIG // uAIBADAKAgEAAgIEPQIB/zAHAgEAAgITbjAKAgUA6V+H
// SIG // OAIBADA2BgorBgEEAYRZCgQCMSgwJjAMBgorBgEEAYRZ
// SIG // CgMCoAowCAIBAAIDB6EgoQowCAIBAAIDAYagMA0GCSqG
// SIG // SIb3DQEBCwUAA4IBAQDDbtzW/FEEBWr0plM9Mms9CCIy
// SIG // 5aQpjkMzT9oqTB3YPvsWurowCaNn9OP8vzbfn4drEYHr
// SIG // WVNxiC4K2CvqSkBjPb1Xr0+XG/pkxV3SYwT3luslECsZ
// SIG // 2oDWf36hOngrhlTvaq76oqzCAnUp2lx+H/kAwWPoMXOW
// SIG // S43vWhQhnD81Ee+LTb0gtbLGKnaowRQ999hQOyPgkTE4
// SIG // CmFYCs3JmCJAUcUd8jD0LLsJalkADT0vn+E8OwpcX/7H
// SIG // nOfs4aH6zgJtggshsSSdA/OuAObzx/rKGVJ+IwBAg3CO
// SIG // rMh0kd+a8K+SZTkVfliKRN03sFjawslunPFVpNT2dbvI
// SIG // uHILeSl+MYIEDTCCBAkCAQEwgZMwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTACEzMAAAHNVQcq58rBmR0AAQAA
// SIG // Ac0wDQYJYIZIAWUDBAIBBQCgggFKMBoGCSqGSIb3DQEJ
// SIG // AzENBgsqhkiG9w0BCRABBDAvBgkqhkiG9w0BCQQxIgQg
// SIG // Rbqw65QyZ8Q7XpDbcxrgl7Xw0huzI01KMsusBJD2qdww
// SIG // gfoGCyqGSIb3DQEJEAIvMYHqMIHnMIHkMIG9BCDiZqX4
// SIG // rVa9T2RoL0xHU6UrVHOhjYeyza6EASsKVEaZCjCBmDCB
// SIG // gKR+MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMT
// SIG // HU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMz
// SIG // AAABzVUHKufKwZkdAAEAAAHNMCIEIIHgq7CpA2YLZlij
// SIG // ZFOhIswvX4bc7rmDLwASB+4QOPhPMA0GCSqGSIb3DQEB
// SIG // CwUABIICAHv3NG5sy2MhJTQYq0u4wl24Rh/KEMgMgSnv
// SIG // juezfqaK/vZI1N5dGkduJuxE2VJEzVY3CNzuSuwoASNR
// SIG // gE3QWGpmoS/tAX4jVJ1bdqArcAvLV/K+I11Yvm3wZDI4
// SIG // 7EPk/KZASjw4FcbS2XFaMt7NLcMExM3K8WcS69t5SPez
// SIG // mKpjMDUaazQzuf0X1xXvGDHh/ZLVXLJ4K3FDXAJ5y+0w
// SIG // ugkP+UedgdFhy1tPMSz7LQr1RsNTPnmxEJsckGx/9sQl
// SIG // oFECj62qFsQ6IKmRGdFGI1KlW4PO/kk7ROXJJbDDgNNm
// SIG // 9VxkRrZz0rDK4AZgo/uzSh1QeKlwqyo9X8+t4CcKZbNy
// SIG // cqKTs7y/Nq+fnqcvE0Ob/o3tLWv/ElxGnHYcaMxkvsVJ
// SIG // WIs+K1d91xulXUYEAnO6BCBPXuad0RK1G1fsbkPNW6cK
// SIG // vY8heCDul7zh8AAIb16hN9S8eZfDetwydZqsSeGH6Ff9
// SIG // hswsBCPiSk91UFLLfC2P1YMfPontiaenkcBc+ugAHuye
// SIG // da8k8nF3tjP4rGyndILdI9gDKz8DbrHKH2VeU73NqkyI
// SIG // 5fRAKnx5F9BW5n9BaueHEtLncICkoOl8FOtUEJT7RXca
// SIG // gLVPU3WeJQkAK+lzfjSgvx4vBoomuKaijlQEMP5LhZqS
// SIG // Cwn89I8FRpOjFu4xuALUfOFWsI/VKjtl
// SIG // End signature block
