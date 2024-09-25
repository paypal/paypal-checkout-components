# Testing

Testing is important to the health of an application but it can be confusing to understand when and what type of test to write. Hopefully the following explanations are helpful in your test-writing journey.

## Functional

These are end to end tests. There should be no mocking of internal dependencies or external endpoints. These should be run with test accounts and test data that simulate real user flows. These should be able to run in our staging, sandbox, and production environments.

There should be few of these tests. Simple success and error cases should be covered. This is usually not the place to test detailed internal app logic.

Example tests:

-

## Integration

These are like end to end tests with one difference. There should be no mocking of internal dependencies unless its not relevant to the test at hand. There should be full or close to full mocking of external dependencies.

There should be more integration tests than functional tests. These are great to test different return types of external services and edge cases from business logic

Example tests:

-

## Unit

These are small, fast tests that should mock most if not all dependencies. These tests should live alongside the code they test. For example, a file called `/src/service.ts` should have a unit test file `/src/service.test.ts` in the same parent folder.

Unit tests are not just for verifying business logic. They work well as guides to designing the code being written. Code that is easy to unit test is usually easier to maintain and understand.

Not everything needs unit tests. Some functionality makes more sense to be tested with integration tests. An example in this repository would be controller files. These are the brains of the routes for this app. While there would be design benefits from unit testing these files, the confidence we'd gain from using integration tests would be much greater. Hopefully, the controller files are made up of smaller functions that have unit tests and all the logic is tested together at the integration and functional level.

## Legacy test folder

This folder contains tests written before we solidified our best practices. Our hope is to migrate these tests to functional, integration, and/or unit tests and remove the `test` singular folder in favor of the `tests` plural folder.
