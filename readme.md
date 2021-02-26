**Send HibouAir data to firebase using BleuIO**
First connect the dongle to your pc.
clone this repo `git clone https://github.com/smart-sensor-devices-ab/hbiouAirToFirebase.git`
Create a firebase account . https://firebase.google.com/
Create an app and get put the information on firebaseconfig.js found in root folder.
Also make sure your firebase database read write rules are true.

`{
  "rules": {
    ".read": true,
    ".write": true
  }
}`

To run this script you need to have a web application bundler. You can use parceljs https://parceljs.org/getting_started.html

Run the app using `parcel index.html`
Click on connect button to connect to the device.

Your device need to be on central mode to get advertised data from HibouAir
First do a scan and get the device id.
**Set the device id into your index.js file. line 95**

Click on **send data to the cloud**. If the firebase is well configured , you will see your data on the cloud.

Click on **stop sending data** to stop the process.

Follow the video for better understanding.
Enjoy :)
