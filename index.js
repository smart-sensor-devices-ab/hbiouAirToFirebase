import * as my_dongle from 'bleuio'
document.getElementById('connect').addEventListener('click', function(){
  my_dongle.at_connect()
})
document.getElementById('deviceinfo').addEventListener('click', function(){
  my_dongle.ati().then((data)=>console.log(data))
})
document.getElementById('central').addEventListener('click', function(){
    my_dongle.at_central().then((data)=>console.log(data))
})
document.getElementById('scan').addEventListener('click', function(){
my_dongle.at_gapscan(2).then((data)=>console.log(data))
})
const parseSensorData = ((input) =>{
    let counter = 13;
    if (input.includes("5B070503")) {
      counter = 17;
    }
    let sensorData = {
      sensorid:
        input[counter + 1] +
        input[counter + 2] +
        input[counter + 3] +
        input[counter + 4] +
        input[counter + 5] +
        input[counter + 6],
      pressure:
        parseInt(
          input[counter + 13] +
            input[counter + 14] +
            input[counter + 11] +
            input[counter + 12],
          16
        ) / 10,
      temperature:
        parseInt(
          input[counter + 17] +
            input[counter + 18] +
            input[counter + 15] +
            input[counter + 16],
          16
        ) / 10,
      humidity:
        parseInt(
          input[counter + 21] +
            input[counter + 22] +
            input[counter + 19] +
            input[counter + 20],
          16
        ) / 10,
        voc:
        parseInt(
          input[counter + 25] +
            input[counter + 26] +
            input[counter + 23] +
            input[counter + 24],
          16
        ) / 10,
      als: parseInt(
        input[counter + 9] +
          input[counter + 10] +
          input[counter + 7] +
          input[counter + 8],
        16
      ),
      pm1:
        parseInt(
          input[counter + 29] +
            input[counter + 30] +
            input[counter + 27] +
            input[counter + 28],
          16
        ) / 10,
      pm25:
        parseInt(
          input[counter + 33] +
            input[counter + 34] +
            input[counter + 31] +
            input[counter + 32],
          16
        ) / 10,
      pm10:
        parseInt(
          input[counter + 37] +
            input[counter + 38] +
            input[counter + 35] +
            input[counter + 36],
          16
        ) / 10}
    return sensorData
  })

const sendDataToCloud = (()=>{
    //get the scan target device id by scanning for device.
    my_dongle.at_scantarget('[1]F9:0D:35:E7:72:65',2).then((data)=>{
        let theAdvData = data.filter(element => element.includes("ADV"));
        if(theAdvData && theAdvData.length>0){
            console.log(theAdvData)
            let advData = theAdvData[0].split("[ADV]: ")
            // converting advertising string to meaningfull numbers 
            //and pass it to an array of objects
            let airQualityData = parseSensorData(advData[1])
            console.log(airQualityData)
            // save the data to database 
            let database = firebase.database(); // which gets the database 
            let ref = database.ref("records");
            //pushing the object to the reference
            ref.push(airQualityData)
        }
    })
})
var intervalId
document.getElementById('sendDataTCloudBtn').addEventListener('click', function(){
    sendDataToCloud()
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(sendDataToCloud ,5000);
    document.getElementById("log").innerHTML="Sending data to cloud. Click stop sending data to stop the process.";

})
document.getElementById('stopSendingData').addEventListener('click', function(){
    clearInterval(intervalId)
    document.getElementById("log").innerHTML="Sending data stopped.";
 })
document.getElementById('stopProcess').addEventListener('click', function(){
   console.log(my_dongle.stop()) 
})

