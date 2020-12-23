const uiNameKey = Symbol();

/**
 * Class to store the Promise for the script loading.
 */
class Defer {
    resolve = {};
    reject = {};
    promise = {};

    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

export class Registry {
    // Stores the component Registered
    componentMap = {};
    bundleMap = {};
    deferMap = {};

    /**
     * Function that will be hoisted to the Global scope and called by the independent UI,
     * that needs to be render in App shell
     *
     * @param {React.Component} Component
     * @param {string} componentName
     */
    register(Component, componentName) {
        if (!this.componentMap.hasOwnProperty(componentName)) {
            this.componentMap[componentName] = Component;
        }
    }

    /**
     * This function can be used if the UI was exported as ESM
     *
     * @param {string} bundlePath
     * @param {string} componentName
     * @returns {Promise<*>}
     */
    async loadBundle(bundlePath, componentName) {
        await import(bundlePath);
        return this.componentMap[componentName];
    }

    /**
     * Function adds the register function to global scope
     */
    addGlobalRegisterUIFunction() {
        // window.registerUI = this.register.bind(this);
        window.registerUI = this.resolveScript.bind(this);
    }

    /**
     * Resolve the bundle path being loaded
     *
     * @param {string} bundleKey
     * @param {React.Component} Component
     */
    resolve(bundleKey, Component) {
        const defer = this.deferMap[bundleKey];
        defer.resolve(Component);
    }

    /**
     * This is called by the UI to indicate that it was loaded successfully
     *
     * @param {React.Component}   Component
     */
    resolveScript(Component) {
        const script = document.currentScript;
        const bundleKey = script[uiNameKey];

        if (!bundleKey) {
            throw new Error('Bundle was not loaded');
        }

        this.resolve(bundleKey, Component);
    }

    loadScript(bundlePath, bundleKey) {
        let defer = this.deferMap[bundleKey];
        if (defer) {
            return defer.promise;
        }
        defer = new Defer();
        this.deferMap[bundleKey] = defer;

        const script = document.createElement('script');
        script.src = bundlePath;
        script.async = true;
        script.onerror = defer.reject.bind(defer);
        script[uiNameKey] = bundleKey;
        document.head.append(script);

        return defer.promise;
    }
}
