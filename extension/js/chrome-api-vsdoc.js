// <copyright project="http://code.google.com/p/chrome-api-vsdoc/" file="chrome-api-vsdoc.js" author="Wesley Johnson">
// This source is licensed under The GNU General Public License (GPL) Version 2
// </copyright>

// This file containts documented stubs to support Visual Studio Intellisense
//     when working with Google's chrome extension apis.
// You should not reference this file in a page at design time or runtme.
// To enable intellisense when authroing chrome extensions, place a commented
//     reference to this file in your extension's JavaScript files like so: ///<reference path="chrome-api-vsdoc.js"/>

chrome = {
    bookmarks: {
        create: function (bookmark, callback) {
            ///<summary>Creates a bookmark or folder under the specified parentId. If url is NULL or missing, it will be a folder.</summary>
            ///<param name="bookmark" type="Object">{parentId: (integer), index: (optional integer), title: (optional string), url: (optional string)}</param>
            ///<param name="callback" type="Function"> (optional) function(BookmarkTreeNode result) {...}</param>
        },
        get: function (idOrIdList, callback) {
            ///<summary>Retrieves the specified BookmarkTreeNode(s).</summary>
            ///<param name="idOrIdList" type="String">A single string-valued id, or an array of string-valued ids.</param>
            ///<param name="callback" type="Function">function(BookmarkTreeNode result) {...}</param>
        },
        getChildren: function (id, callback) {
            ///<summary>Retrieves the children of the specified BookmarkTreeNode id.</summary>
            ///<param name="id" type="String"></param>
            ///<param name="callback" type="Function">function(BookmarkTreeNode result) {...}</param>
        },
        getRecent: function (numberOfItems, callback) {
            ///<summary>Retrieves the children of the specified BookmarkTreeNode id.</summary>
            ///<param name="numberOfItems" type="int">The maximum number of items to return.</param>
            ///<param name="callback" type="Function">function(BookmarkTreeNode result) {...}</param>
        },
        getTree: function (callback) {
            ///<summary>Retrieves the entire Bookmarks hierarchy.</summary>
            ///<param name="callback" type="Function">function(BookmarkTreeNode result) {...}</param>
        },
        move: function (id, destination, callback) {
            ///<summary>Moves the specified BookmarkTreeNode to the provided location.</summary>
            ///<param name="id" type="String"></param>
            ///<param name="destination" type="Object">{parentId: (string), index: (optional integer)}</param>
            ///<param name="callback" type="Function" > (optional) function(BookmarkTreeNode result) {...}</param>
        },
        remove: function (id, callback) {
            ///<summary>Removes a bookmark or an empty bookmark folder.</summary>
            ///<param name="id" type="String"></param>
            ///<param name="callback" type="Function" > (optional) function() {...}</param>
        },
        removeTree: function (id, callback) {
            ///<summary>Recursively removes a bookmark folder.</summary>
            ///<param name="id" type="String"></param>
            ///<param name="callback" type="Function" > (optional) function() {...}</param>
        },
        search: function (query, callback) {
            ///<summary>Searches for BookmarkTreeNodes matching the given query.</summary>
            ///<param name="query" type="String"></param>
            ///<param name="callback" type="Function">function(BookmarkTreeNode result) {...}</param>
        },
        update: function (id, changes, callback) {
            ///<summary>Updates the properties of a bookmark or folder. Specify only the properties that you want to change; unspecified properties will be left unchanged. Note: Currently, only 'title' and 'url' are supported.</summary>
            ///<param name="id" type="String"></param>
            ///<param name="changes" type="Object">{title: (optional string), url: (optional string)}</param>
            ///<param name="callback" type="Function" > (optional) function(BookmarkTreeNode result) {...}</param>
        },
        onChanged: {
            addListener: function (listener) {
                ///<summary>Fired when a bookmark or folder changes. Note: Currently, only title and url changes trigger this.</summary>
                ///<param name="listener" type="Function">function(string id, object changeInfo {title: (string), url: (string)}) {...}</param>
            },
        },
        onChildrenReordered: {
            addListener: function (listener) {
                ///<summary>Fired when the children of a folder have changed their order due to the order being sorted in the UI. This is not called as a result of a move().</summary>
                ///<param name="listener" type="Function">function(string id, object reorderInfo {childIds: (array of string)}) {...}</param>
            },
        },
        onCreated: {
            addListener: function (listener) {
                ///<summary>Fired when a bookmark or folder is created.</summary>
                ///<param name="listener" type="Function">function(string id, BookmarkTreeNode bookmark) {...}</param>
            },
        },
        onMoved: {
            addListener: function (listener) {
                ///<summary>Fired when a bookmark or folder is moved to a different parent folder.</summary>
                ///<param name="listener" type="Function">function(string id, object moveInfo {parentId: (string), index: (integer), oldParentId: (string), oldIndex: (integer)}) {...}</param>
            },
        },
        onRemoved: {
            addListener: function (listener) {
                ///<summary>Fired when a bookmark or folder is removed. When a folder is removed recursively, a single notification is fired for the folder, and none for its contents.</summary>
                ///<param name="listener" type="Function">function(string id, object removeInfo {parentId: (string), index: (integer)}) {...}</param>
            },
        },
    },
    browserAction: {
        setBadgeBackgroundColor: function (details) {
            ///<summary>Sets the background color for the badge.</summary>
            ///<param name="details" type="Object">{color: (array of integer), tabId: (optional integer)}</param>
        },
        setBadgeText: function (details) {
            ///<summary>Sets the badge text for the browser action. The badge is displayed on top of the icon.</summary>
            ///<param name="details" type="Object">{text: (string), tabId: (optional integer)}</param>
        },
        setIcon: function (details) {
            ///<summary>Sets the icon for the browser action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element. Either the path or the imageData property must be specified.</summary>
            ///<param name="details" type="Object">{imageData: (optional ImageData), path: (optional string), tabId: (optional integer)}</param>
        },
        setPopup: function (details) {
            ///<summary>Sets the html document to be opened as a popup when the user clicks on the browser action's icon.</summary>
            ///<param name="details" type="Object">{popup: (string), tabId: (optional integer)}</param>
        },
        setTitle: function (details) {
            ///<summary>Sets the title of the browser action. This shows up in the tooltip.</summary>
            ///<param name="details" type="Object">{title: (string), tabId: (optional integer)}</param>
        },
        onClicked: {
            addListener: function (listener) {
                ///<summary>Fired when a browser action icon is clicked. This event will not fire if the browser action has a popup.</summary>
                ///<param name="listener" type="Function">function(Tab tab) {...}</param>
            },
        },
    },
    contextMenus: {
        create: function (createProperties, callback) {
            ///<summary>Creates a new context menu item. Note that if an error occurs during creation, you may not find out until the creation callback fires (the details will be in chrome.extension.lastError)</summary>
            ///<returns>( integer )</returns>
            ///<param name="createProperties" type="Object">{type: (optional string), title: (optional string), checked: (optional boolean), contexts: (optional array of string), onclick: (optional function(info, tab) {...}), parentId: (optional integer), documentUrlPatterns: (optional array of string), targetUrlPatterns: (optional array of string) }</param>
            ///<param name="callback" type="Function"> (optional) function() {...}</param>
        },
        remove: function (menuItemId, callback) {
            ///<summary>Removes a context menu item.</summary>
            ///<param name="menuItemId" type="int">The id of the context menu item to remove.</param>
            ///<param name="callback" type="Function"> (optional) function() {...}</param>
        },
        removeAll: function (callback) {
            ///<summary>Remove all context menu items added by this extension.</summary>
            ///<param name="callback" type="Function"> (optional) function() {...}</param>
        },
        update: function (id, updateProperties, callback) {
            ///<summary>Update a previously created context menu item.</summary>
            ///<param name="id" type="int">The id of the item to update.</param>
            ///<param name="updateProperties" type="Object">{type: (optional string), title: (optional string), checked: (optional boolean), contexts: (optional array of string), onclick: (optional function(info, tab) {...}), parentId: (optional integer), documentUrlPatterns: (optional array of string), targetUrlPatterns: (optional array of string) }</param>
            ///<param name="callback" type="Function"> (optional) function() {...}</param>
        },
    },
    extension: {
        connect: function (extensionId, connectInfo) {
            ///<summary>Attempts to connect to other listeners within the extension (such as the extension's background page). This is primarily useful for content scripts connecting to their extension processes. Extensions may connect to content scripts embedded in tabs via chrome.tabs.connect().</summary>
            ///<param name="extensionId" type="String" > (optional) The extension ID of the extension you want to connect to. If omitted, default is your own extension.</param>
            ///<param name="connectInfo" type="Object" > (optional) {name: (optional string)}</param>
            ///<returns>( Port ) Port through which messages can be sent and received with the extension.</returns>
        },
        getBackgroundPage: function () {
            ///<summary>Returns the JavaScript 'window' object for the background page running inside the current extension. Returns null if the extension has no backround page.</summary>
            ///<returns>( DOMWindow )</returns>
        },
        getExtensionTabs: function (windowId) {
            ///<summary>Returns an array of the JavaScript 'window' objects for each of the tabs running inside the current extension. If windowId is specified, returns only the 'window' objects of tabs attached to the specified window.</summary>
            ///<param name="windowId" type="int" > (optional) The window ID of the window you want to retrieve the tabs from.</param>
            ///<returns>( array of DOMWindow ) Array of global window objects</returns>
        },
        getURL: function (path) {
            ///<summary>Converts a relative path within an extension install directory to a fully-qualified URL.</summary>
            ///<param name="path" type="String">A path to a resource within an extension expressed relative to it's install directory.</param>
            ///<returns>( string ) The fully-qualified URL to the resource.</returns>
        },
        getViews: function () {
            ///<summary>Returns an array of the JavaScript 'window' objects for each of the pages running inside the current extension. This includes background pages and tabs.</summary>
            ///<returns>( array of DOMWindow ) Array of global window objects</returns>
        },
        sendRequest: function (extensionId, request, responseCallback) {
            ///<summary>Sends a single request to other listeners within the extension. Similar to chrome.extension.connect, but only sends a single request with an optional response.</summary>
            ///<param name="extensionId" type="String" > (optional) The extension ID of the extension you want to connect to. If omitted, default is your own extension.</param>
            ///<param name="request" type="any"></param>
            ///<param name="responseCallback" type="Function" > (optional) function(any response){...}</param>
        },
        onConnect: {
            addListener: function (listener) {
                ///<summary>Fired when a connection is made from either an extension process or a content script.</summary>
                ///<param name="listener" type="Function">function(Port port) {...}</param>
            },
        },
        onConnectExternal: {
            addListener: function (listener) {
                ///<summary>Fired when a connection is made from another extension.</summary>
                ///<param name="listener" type="Function">function(Port port) {...}</param>
            },
        },
        onRequest: {
            addListener: function (listener) {
                ///<summary>Fired when a request is sent from either an extension process or a content script.</summary>
                ///<param name="listener" type="Function">function(any request, MessageSender sender, function sendResponse) {...}</param>
            },
        },
        onRequestExternal: {
            addListener: function (listener) {
                ///<summary>Fired when a request is sent from another extension.</summary>
                ///<param name="listener" type="Function">function(any request, MessageSender sender, function sendResponse) {...}</param>
            },
        },
    },
    i8n: {
        getAcceptLanguages: function (callback) {
            ///<summary>Gets the accept-languages of the browser. This is different from the locale used by the browser; to get the locale, use window.navigator.language.</summary>
            ///<param name="listener" type="Function">function(array of string languages) {...}</param>
        },
        getMessage: function (messageName, substitutions) {
            ///<summary>Gets the localized string for the specified message. If the message is missing, this method returns an empty string (''). If the format of the getMessage() call is wrong — for example, messageName is not a string or the substitutions array is empty or has more than 9 elements — this method returns undefined.</summary>
            ///<param name="messageName" type="String">The name of the message, as specified in the messages.json file.</param>
            ///<param name="substitutions" type="String">1 - 9 substitution strings, if the message requires any.</param>
        },
    },
    pageAction: {
        hide: function (tabId) {
            ///<summary>Hides the page action.</summary>
            ///<param name="tabId" type="int">The id of the tab for which you want to modify the page action.</param>
        },
        setIcon: function (details) {
            ///<summary>Sets the icon for the page action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element. Either the path or the imageData property must be specified.</summary>
            ///<param name="details" type="Object">{tabId: (integer), imageData: (optional ImageData), path: (optional string), iconIndex : (optional integer - DEPRECATED)}</param>
        },
        setPopup: function (details) {
            ///<summary>Sets the html document to be opened as a popup when the user clicks on the page action's icon.</summary>
            ///<param name="details" type="Object">{popup: (string), tabId: (integer)}</param>
        },
        setTitle: function (details) {
            ///<summary>Sets the title of the page action. This is displayed in a tooltip over the page action.</summary>
            ///<param name="details" type="Object">{title: (string), tabId: (integer)}</param>
        },
        show: function (tabId) {
            ///<summary>Shows the page action. The page action is shown whenever the tab is selected.</summary>
            ///<param name="tabId" type="int">The id of the tab for which you want to modify the page action.</param>
        },
        onClicked: {
            addListener: function (listener) {
                ///<summary>Fired when a page action icon is clicked. This event will not fire if the page action has a popup.</summary>
                ///<param name="listener" type="Function">function(Tab tab) {...}</param>
            },
        },
    },
    tabs: {
        captureVisibleTab: function (windowId, callback) {
            ///<summary>Captures the visible area of the currently selected tab in the specified window.</summary>
            ///<param name="windowId" type="int" > (optional) Defaults to the current window.</param>
            ///<param name="callback" type="Function">function(string dataUrl) {...}</param>
        },
        connect: function (tabId, connectInfo) {
            ///<summary>Attempts to connect to other listeners within the extension (such as the extension's background page). This is primarily useful for content scripts connecting to their extension processes. Extensions may connect to content scripts embedded in tabs via chrome.tabs.connect().</summary>
            ///<param name="tabId" type="int">The tab ID of the tab you want to connect to.</param>
            ///<param name="connectInfo" type="Object" > (optional) {name: (optional string)}</param>
        },
        create: function (createProperties, callback) {
            ///<summary>Creates a new tab.</summary>
            ///<param name="createProperties" type="Object">{windowId: (optional integer), index: (optional interger), url: (optional string), selected: (optional boolean)}</param>
            ///<param name="callback" type="Function" > (optional) function(Tab tab) {...}</param>
        },
        detectLanguage: function (tabId, callback) {
            ///<summary>Detects the primary language of the content in a tab.</summary>
            ///<param name="tabId" type="int" > (optional) Defaults to the selected tab of current window.</param>
            ///<param name="callback" type="Function">function(string language) {...}</param>
        },
        executeScript: function (tabId, details, callback) {
            ///<summary>Executes scripts against a tab's content.</summary>
            ///<param name="tabId" type="int" > (optional) Defaults to the selected tab of current window.</param>
            ///<param name="details" type="Object">{code: (optional string), file: (optional string), allFrames: (optional boolean)} NOTE: Either the code or file property must be set, but both may not be set at the same time.</param>
            ///<param name="callback" type="Function" > (optional) function(string language) {...}</param>
        },
        get: function (tabId, callback) {
            ///<summary>Retrieves details about the specified tab.</summary>
            ///<param name="tabId" type="int"></param>
            ///<param name="callback" type="Function">function(Tab tab) {...}</param>
        },
        getAllInWindow: function (windowId, callback) {
            ///<summary>Gets details about all tabs in the specified window.</summary>
            ///<param name="windowId" type="int" > (optional) Defaults to the current window.</param>
            ///<param name="callback" type="Function">function(array of Tab tabs) {...}</param>
        },
        getSelected: function (windowId, callback) {
            ///<summary>Gets the tab that is selected in the specified window.</summary>
            ///<param name="windowId" type="int" > (optional) Defaults to the current window.</param>
            ///<param name="callback" type="Function">function(Tab tab) {...}</param>
        },
        insertCSS: function (tabId, details, callback) {
            ///<summary>Retrieves details about the specified tab.</summary>
            ///<param name="tabId" type="int" > (optional) Defaults to the selected tab of current window.</param>
            ///<param name="details" type="Object">{code: (optional string), file: (optional string), allFrame: (optional boolean)} NOTE: Either the code or file property must be set, but both may not be set at the same time.</param>
            ///<param name="callback" type="Function" > (optional) function() {...}</param>
        },
        move: function (tabId, moveProperties, callback) {
            ///<summary>Moves a tab to a new position within its window, or to a new window.</summary>
            ///<param name="tabId" type="int"></param>
            ///<param name="moveProperties" type="Object">{windowId: (optional integer), index: (integer)}</param>
            ///<param name="callback" type="Function" > (optional) function(Tab tab) {...}</param>
        },
        remove: function (tabId, callback) {
            ///<summary>Closes a tab.</summary>
            ///<param name="tabId" type="int"></param>
            ///<param name="callback" type="Function" > (optional) function() {...}</param>
        },
        sendRequest: function (tabId, request, responseCallback) {
            ///<summary>Sends a single request to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. The chrome.extension.onRequest event is fired in each content script running in the specified tab for the current extension.</summary>
            ///<param name="tabId" type="int"></param>
            ///<param name="request" type="any"></param>
            ///<param name="responseCallback" type="Function" > (optional) function(any response) {...}</param>
        },
        update: function (tabId, updateProperties, callback) {
            ///<summary>Modifies the properties of a tab. Properties that are not specified in updateProperties are not modified.</summary>
            ///<param name="tabId" type="int"></param>
            ///<param name="moveProperties" type="Object">{url: (optional string), selected: (optional boolean)}</param>
            ///<param name="callback" type="Function" > (optional) function(Tab tab) {...}</param>
        },
        onAttached: {
            addListener: function (listener) {
                ///<summary>Fired when a tab is attached to a window, for example because it was moved between windows.</summary>
                ///<param name="listener" type="Function">function(integer TabId, object attachInfo) {...}</param>
            },
        },
        onCreated: {
            addListener: function (listener) {
                ///<summary>Fires when a tab is created.</summary>
                ///<param name="listener" type="Function" > (optional) function(Tab tab) {...}</param>
            },
        },
        onDetached: {
            addListener: function (listener) {
                ///<summary>Fired when a tab is detached from a window, for example because it is being moved between windows.</summary>
                ///<param name="listener" type="Function">function(integer TabId, object detachInfo) {...}</param>
            },
        },
        onMoved: {
            addListener: function (listener) {
                ///<summary>Fires when a tab is moved within a window. Only one move event is fired, representing the tab the user directly moved. Move events are not fired for the other tabs that must move in response. This event is not fired when a tab is moved between windows. For that, see onDetached.</summary>
                ///<param name="listener" type="Function">function(integer TabId, object moveInfo) {...}</param>
            },
        },
        onRemoved: {
            addListener: function (listener) {
                ///<summary>Fires when a tab is closed.</summary>
                ///<param name="listener" type="Function">function(integer TabId) {...}</param>
            },
        },
        onSelectionChanged: {
            addListener: function (listener) {
                ///<summary>Fires when the selected tab in a window changes.</summary>
                ///<param name="listener" type="Function">function(integer TabId, object selectInfo) {...}</param>
            },
        },
        onUpdated: {
            addListener: function (listener) {
                ///<summary>Fires when a tab is updated.</summary>
                ///<param name="listener" type="Function">function(integer TabId, object changeInfo, Tab tab) {...}</param>
            },
        },
    },
    windows: {
        create: function (createData, callback) {
            ///<summary>Creates (opens) a new browser with any optional sizing, position or default URL provided.</summary>
            ///<param name="createData" type="Object" > (optional) {url: (optional string), left: (optional integer), top: (optional integer), width: (optional integer), height: (optional integer)}</param>
            ///<param name="callback" type="Function" > (optional) function(Window window) {...}</param>
        },
        get: function (windowId, callback) {
            ///<summary>Gets details about a window.</summary>
            ///<param name="windowId" type="int"></param>
            ///<param name="callback" type="Function">function(Window window) {...}</param>
        },
        getAll: function (getInfo, callback) {
            ///<summary>Gets all windows.</summary>
            ///<param name="getInfo" type="Object" > (optional) {popuplate: (optional boolean)}</param>
            ///<param name="callback" type="Function">function(array of Window windows) {...}</param>
        },
        getCurrent: function (callback) {
            ///<summary>Gets the current window.</summary>
            ///<param name="callback" type="Function">function(Window window) {...}</param>
        },
        getLastFocused: function (callback) {
            ///<summary>Gets the window that was most recently focused — typically the window 'on top'.</summary>
            ///<param name="callback" type="Function">function(Window window) {...}</param>
        },
        remove: function (windowId, callback) {
            ///<summary>Removes (closes) a window, and all the tabs inside it.</summary>
            ///<param name="windowId" type="int"></param>
            ///<param name="callback" type="Function" > (optional) function() {...}</param>
        },
        update: function (windowId, updateInfo, callback) {
            ///<summary>Updates the properties of a window. Specify only the properties that you want to change; unspecified properties will be left unchanged.</summary>
            ///<param name="windowId" type="int"></param>
            ///<param name="updateInfo" type="Object">{left: (optional integer), top: (optional integer), width: (optional integer), height: (optional integer)}</param>
            ///<param name="callback" type="Function" > (optional) function(Window window) {...}</param>
        },
        onCreated: {
            addListener: function (listener) {
                ///<summary>Fired when a window is created.</summary>
                ///<param name="listener" type="Function" > (optional) function(Window window) {...}</param>
            },
        },
        onFocusChanged: {
            addListener: function (listener) {
                ///<summary>Fired when the currently focused window changes.</summary>
                ///<param name="listener" type="Function">function(integer windowId) {...}</param>
            },
        },
        onRemoved: {
            addListener: function (listener) {
                ///<summary>Fired when a window is removed (closed).</summary>
                ///<param name="listener" type="Function">function(integer windowId) {...}</param>
            },
        },
    },
};

function BookmarkTreeNode() {
    this.id = "";
    this.parentId = "";
    this.index = 0;
    this.url = "";
    this.title = "";
    this.dateAdded = 1.0;
    this.dateGroupModified = 1.0;
    this.children = [];

    return true;
}

function ContextMenuProperties() {
    this.type = "";
    this.title = "";
    this.checked = false;
    this.contexts = [];
    this.onclick = function (info, tab) {};
    this.parentId = 0;
    this.documentUrlPatterns = [];
    this.targetUrlPatterns = [];
}

function Event() {
    this.addListener = function (listener) {};
    this.removeListener = function (listener) {};
    this.hasListener = function (listener) {};
    this.hasListeners = function (listener) {};
}

function Port() {
    this.name = "";
    this.onDissconnect = new Event();
    this.onMessage = new Event();
    this.postMessage = function () {};
    this.sender = new MessageSender();
}

function MessageSender() {
    this.tab = new Tab();
    this.id = "";
}

function Tab() {
    this.id = 0;
    this.index = 0;
    this.windowId = 0;
    this.selected = false;
    this.url = "";
    this.title = "";
    this.faviconUrl = "";
    this.status = "";
    this.icognito = false;
}

function Window() {
    this.id = 0;
    this.focused = false;
    this.top = 0;
    this.left = 0;
    this.width = 0;
    this.height = 0;
    this.tabs = [new Tab()];
    this.icognito = false;
}
