## Adding New Screenshots

Our screenshot test suite reads from a JSON array ([buttonConfigs.json](./files/buttonConfigs.json)) and captures one snapshot using each entry. Each entry should be a configuration object describing which options Playwright should use when rendering the PayPal buttons.

[buttonConfigs.json](./files/buttonConfigs.json) is created programmatically at test-time by running [config.js](./config.js).

To add screenshot test coverage for a new funding source, simply extend the [SUPPORTED_FUNDING_SOURCES](./config.js#L10) array:

```
const SUPPORTED_FUNDING_SOURCES : $ReadOnlyArray<$Values<typeof FUNDING>> = [
    ...,
    FUNDING.BOLETOBANCARIO,
    FUNDING.SATISPAY,
    FUNDING.CARD,
    // add a new entry here
    FUNDING.YOUR_NEW_FUNDING_SOURCE,
];
```

Otherwise, you can add new screenshots to our test suite by simply extending the `buttonConfigs` array with the configuration you'd like to capture:

```
buttonConfigs.push({
    button: {
        // your buttons config
    },
    container: {
        // your container config
    },
    fundingEligibility: {
        // your FE config
    }
});
```
