# 1 Config the project
npm install

# 2 Attach an android device
following with the link https://reactnative.dev/docs/running-on-device for first connectivity on android device.

# 3 Compile and Run on device
react-native run-android

# 4 Producing Release APK
react-native run-android --variant=release

# 5 File structure
## 5.1 src/models
Locating the infrastructures for Redux, Saga and Network requesting.

## 5.2 src/pages
Locating the App pages which contain a number of page-wise functionalities.

## 5.3 src/components
Locating the commonly or iteratively used components.
