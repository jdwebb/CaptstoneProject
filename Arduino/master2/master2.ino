#include <YunServer.h>
#include <YunClient.h>
#include <Servo.h>

// Measures flow meter pulses
volatile int flowFrequencyInlet;  
volatile int flowFrequencyExit; 

// define liter per minute variables
double lpmInlet;
double lpmExit;
double lpmSequester;

unsigned char flowmeterInlet = 2;  // Flow Meter Pin number 2 and 3 are interupt pins
unsigned char flowmeterExit = 3;  // Flow Meter Pin number

unsigned long currentTime; // these longs are used to keep track of time with no delays
unsigned long flowTime;
unsigned long heightTime;
unsigned long openTime;
unsigned long closedTime;
unsigned long servoDelay;
unsigned long servoCurrentTime;

double height;

int sensorValue;
int relayPin = 4; // relay pin is a simple on/off and does not need a pwm pin
int resPercentOpen; // this will eventually be read from the client who will be able to give
//a flow rate sequestering decision

// Listen on default port 5555, the webserver on the Yun
// will forward there all the HTTP requests for us.
YunServer server;

// Define servo variables
Servo servo9; // pin 9
Servo servo11; // pin 11

void flowInlet () { // Interrupt function for inlet flow sensor
  flowFrequencyInlet++; // every time a pulse is sensed, add 1
}

void flowExit () { // Interrupt function for outlet flow sensor
  flowFrequencyExit++; // every time a pulse is sensed, add 1
}

void setup() {
  Serial.begin(9600);

  pinMode(flowmeterInlet, INPUT); // declare inlet flow pin
  pinMode(flowmeterExit, INPUT);  // declare exit flow pin

  servo9.attach(9);
  servo11.attach(11);

  attachInterrupt(0, flowInlet, RISING); // Setup Interrupt for inlet
  attachInterrupt(1, flowExit, RISING); // see http://arduino.cc/en/Reference/attachInterrupt

  sei(); // Enable interrupts

  currentTime = millis();
  flowTime = currentTime; // keeps track of flow sensors in regular intervals (1000 milliseconds right now)
  heightTime = currentTime; // keeps track of height sensor in regular intervals (100 milliseconds right now)

  // Set up all necessary pins on the Arduino board
  pinMode(4, OUTPUT);
  pinMode(7, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(13, OUTPUT);

  // Ensure ability to perform digital writes to the built-in LED
  digitalWrite(13, LOW);
  Bridge.begin();
  digitalWrite(13, HIGH);
  server.begin();

}

void analogCommand(YunClient client) {
  int pin, value;

  // Read pin number
  pin = client.parseInt();

  // If the next character is a '/' it means we have an URL
  // with a value like: "/analog/5/120"
  if (client.read() == '/') {
    // Read value and execute command
    value = client.parseInt();
    analogWrite(pin, value);
  }
  // Send feedback to client
  client.print(value);
}

void servoCommand(YunClient client) {
  int pin, value;

  // Read pin number
  pin = client.parseInt();

  if (client.read() == '/') {
    value = client.parseInt();

    servo9.write(.85*value+35);
    servo11.write(.80*value+85);

    client.print(value);
  }
}
void process(YunClient client) {
  // read the command
  String command = client.readStringUntil('/');
  command.trim();

  // Request headers to allow clients outside of the Arduino to perform HTTP requests on the Arduino
  client.println("Status: 200");
  client.println("Access-Control-Allow-Origin: *");
  client.println("Access-Control-Allow-Methods: GET");
  client.println("Content-Type: text/html");
  client.println("Connection: close");
  client.println();

  // Decide which type of command the Arduino is reading
  if (command == "digital") {
    digitalCommand(client);
  } else if (command == "analog") {
    analogCommand(client);
  } else if (command == "servo") {
    servoCommand(client);
  } else {
    client.print(F("Error"));
  }
}

void digitalCommand(YunClient client) {
  int pin, value;

  // Read pin number
  pin = client.parseInt();

  // If the next character is a '/' it means we have an URL
  // with a value like: "/digital/13/1"
  if (client.read() == '/') {
    value = client.parseInt();
    digitalWrite(pin, value);
  }

  // Send feedback to client
  client.print(value);
}

void loop() {
  // This section should be put into functions later
  currentTime = millis();

  if (currentTime >= (heightTime + 1000)) { // collect height sensor data every 1000 milliseconds
    heightTime = currentTime; //reset heightTime
    sensorValue = analogRead(A0); // read height sensor
    height = -0.03186 * sensorValue + 17.8; // converts height to inches (for ipad reporting, etc.)

    if (sensorValue > 475) { // if height is about 1 inch
      //Serial.println("Water too low, divert water into reservoir, sensor value: ");
      //Serial.println(sensorValue);
      
      digitalWrite(relayPin, LOW); // turn off relay which turns off pump
      Serial.println("Water too low, turn pump off");

    } else { // the level in the reservoir is okay, so we accept a new YunClient

      YunClient client = server.accept();
      // Check: is there a new client?
      if (client) {
        // Process request
        process(client);

        // Close connection and free resources.
        client.stop();
      }
    }
  }

  // Every second, calculate and print litres/hour
  if (currentTime >= (flowTime + 1000)) { // checks every 1000 milliseconds... if we change this then the values may change...
    // this is because the flow frequency needs to come out in hertz (cycles/second)... So tell jon if you want to change it
    flowTime = currentTime;              // Updates flowTime
    // Pulse frequency (Hz) = 7.5Q, Q is flow rate in L/min. (Results in +/- 3% range)
    if (flowFrequencyInlet < 3) {
      lpmInlet = (flowFrequencyInlet  / 2.5); // These are various cases that convert pulse frequency into liters per minute
      // these were found using a combination of experimentation and the sensor datasheet. The first section is for
      // the inlet flow meter.
    } else if (flowFrequencyInlet < 8) {
      lpmInlet =  .15 + (flowFrequencyInlet / 7.5)  ;
    } else {
      lpmInlet =   flowFrequencyInlet / 7.5;
    }

    // begin cases for outlet flow meter
    if (flowFrequencyExit < 3) { // if flow rate < about 1 liter minute use this equation
      lpmExit = (flowFrequencyExit  / 2.5); // (Pulse frequency)/ 7.5Q = flow rate in L/min
    } else if (flowFrequencyExit < 8) {
      lpmExit =  .15 + (flowFrequencyExit / 7.5)  ;
    } else {
      lpmExit = flowFrequencyExit / 7.5;
    }

    // Reset Counter
    Serial.print(lpmInlet);
    Serial.print("\t");
    Serial.print(flowFrequencyInlet);
    Serial.print("\t");
    Serial.print(lpmExit);
    Serial.print("\t");
    Serial.print(flowFrequencyExit);

    Serial.print(" L/min");
    Serial.print("\t");
    Serial.print(sensorValue);
    Serial.print("\t");
    Serial.println(height);
    
    flowFrequencyExit = 0;
    flowFrequencyInlet = 0; // resets pulse frequency for next interupt function

    lpmSequester = (lpmInlet - lpmExit);

  }
}
