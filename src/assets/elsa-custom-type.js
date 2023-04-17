const elsaStudioRoot = document.querySelector('elsa-studio-root');
elsaStudioRoot.addEventListener('initializing', e => {
    const elsaStudio = e.detail;
    DateInputPlugin(elsaStudio);
    NumberInputPlugin(elsaStudio);
    elsaStudio.activityIconProvider.register(
        'AutocallIVR',
        `<span class="elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-blue-50 elsa-text-blue-700 elsa-ring-4 elsa-ring-white">
            <svg class="elsa-h-6 elsa-w-6" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
        </span>`);
    elsaStudio.activityIconProvider.register(
        'AutoChat',
        `<span class="elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-blue-50 elsa-text-blue-700 elsa-ring-4 elsa-ring-white">
            <svg class="elsa-h-6 elsa-w-6" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
        </span>`);
    elsaStudio.activityIconProvider.register(
        'AutoEmail',
        `<span class="elsa-rounded-lg elsa-inline-flex elsa-p-3 elsa-bg-blue-50 elsa-text-blue-700 elsa-ring-4 elsa-ring-white">
            <svg class="elsa-h-6 elsa-w-6" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />  <polyline points="22,6 12,13 2,6" />
            </svg>
        </span>`);
});








function DateInputDriver(elsaStudio) {

    // Get convenience methods.
    const { getOrCreateProperty, htmlToElement } = elsaStudio;

    // Implement the display method, which receives the activity model and the property for which the editor must be rendered.
    this.display = (activity, propertyDescriptor) => {
        // Get the property model.
        const propertyModel = getOrCreateProperty(activity, propertyDescriptor.name);
        // Get the configured default syntax name.
        const defaultValue = propertyDescriptor.defaultValue;

        // Get the current property value for the default syntax.
        //const currentValue = propertyModel.expressions[defaultSyntax] || '';

        // Create a property editor element (for displaying label, hint and syntax toggle).
        // This will wrap our custom control.
        const propertyEditor = document.createElement('elsa-property-editor');

        // Our custom input element control. Can be anything you want.
        // Using HTML string to easily construct an actual element object.
        // Better yet would be to implement a component with Stencil, Angular or React if you;re using any of these frameworks.
        const inputHtml =
            `<input type="date"
                    class="disabled:elsa-opacity-50 disabled:elsa-cursor-not-allowed focus:elsa-ring-blue-500 focus:elsa-border-blue-500 elsa-block elsa-w-full elsa-min-w-0 elsa-rounded-md sm:elsa-text-sm elsa-border-gray-300"
                                    value="${defaultValue}"
                />`;

        // Create an actual input element from the HTML string.
        const inputElement = htmlToElement(inputHtml);

        // Add the custom input control element to the property editor as a child.
        propertyEditor.append(inputElement);

        // Initialize the property editor.
        propertyEditor.propertyDescriptor = propertyDescriptor;
        propertyEditor.propertyModel = propertyModel;
        propertyEditor.activityModel = activity;

        // Setup change handler for custom control that updates the property model.
        inputElement.addEventListener('change', (e) => {
            const input = e.currentTarget;
            propertyModel.expressions[defaultSyntax] = input.value;
        });

        // return the created custom control.
        return propertyEditor;
    };
}

function DateInputPlugin(elsaStudio) {
    // Register custom driver.
    elsaStudio.propertyDisplayManager.addDriver('date-input', () => new DateInputDriver(elsaStudio));
}


function NumberInputDriver(elsaStudio) {

    // Get convenience methods.
    const { getOrCreateProperty, htmlToElement } = elsaStudio;

    // Implement the display method, which receives the activity model and the property for which the editor must be rendered.
    this.display = (activity, propertyDescriptor) => {
        // Get the property model.
        const propertyModel = getOrCreateProperty(activity, propertyDescriptor.name);
        // Get the configured default syntax name.
        const defaultValue = propertyDescriptor.defaultValue;

        // Get the current property value for the default syntax.
        //const currentValue = propertyModel.expressions[defaultSyntax] || '';

        // Create a property editor element (for displaying label, hint and syntax toggle).
        // This will wrap our custom control.
        const propertyEditor = document.createElement('elsa-property-editor');

        // Our custom input element control. Can be anything you want.
        // Using HTML string to easily construct an actual element object.
        // Better yet would be to implement a component with Stencil, Angular or React if you;re using any of these frameworks.
        const inputHtml =
            `<input type="number"
                            class="disabled:elsa-opacity-50 disabled:elsa-cursor-not-allowed focus:elsa-ring-blue-500 focus:elsa-border-blue-500 elsa-block elsa-w-full elsa-min-w-0 elsa-rounded-md sm:elsa-text-sm elsa-border-gray-300"
                                            value="${defaultValue}"
                        />`;

        // Create an actual input element from the HTML string.
        const inputElement = htmlToElement(inputHtml);

        // Add the custom input control element to the property editor as a child.
        propertyEditor.append(inputElement);

        // Initialize the property editor.
        propertyEditor.propertyDescriptor = propertyDescriptor;
        propertyEditor.propertyModel = propertyModel;
        propertyEditor.activityModel = activity;

        // Setup change handler for custom control that updates the property model.
        inputElement.addEventListener('change', (e) => {
            const input = e.currentTarget;
            propertyModel.expressions[defaultSyntax] = input.value;
        });

        // return the created custom control.
        return propertyEditor;
    };
}

function NumberInputPlugin(elsaStudio) {
    // Register custom driver.
    elsaStudio.propertyDisplayManager.addDriver('number-input', () => new NumberInputDriver(elsaStudio));
}