# DataProcessor

DataProcessor is a utility class for processing and buffering data before sending it to a database or performing other actions based on certain thresholds.

<br>

# My YouTube: [Fedevcoding](https://www.youtube.com/@fedevcoding/videos) 🫂

<br>

# Installation

You can install the DataProcessor library using npm:

```bash
npm install data-processor
```

# Usage

To use the DataProcessor library in your project, import the `DataProcessor` class and create an instance:

```javascript
import { DataProcessor } from "data-processor";

// Create a data processor instance
const processor = new DataProcessor({
  dataCallback: (data) => {
    // Perform actions with the processed data
    console.log("Processed data:", data);
  },
  dataThreshold: 1000, // Optional: number of data items to accumulate before sending to the database (default: 1000)
  timeThreshold: 1000, // Optional: time interval (in milliseconds) after which data is sent to the database regardless of the data threshold (default: 1000)
});
```

To add data to the processor, call the `addData()` function.

```js
const dataToAdd = { name: "fedev", age: 16 };
processor.addData(dataToAdd);
```

To use types, you can pass a generic to the DataProcessor class and it will return an array of that type in `dataCallback`

```ts
new DataProcessor<string>({
  dataCallback: (data) => {
    // data will be an array of strings
  },
});
```

### Options

- `dataCallback` (required): A callback function that will be called with the data as soon as the data reaches the limit of length or time.
- `dataThreshold` (default 1000): Length of array where the data will be processed if the time is not expired yet.
- `timeThreshold` (default 1000): Time (in milliseconds) during which the data can be added before it will be processed (if it doesn't reach the dataThreshold before).

## Authors

- [@fedev](https://github.com/GitFede100)
