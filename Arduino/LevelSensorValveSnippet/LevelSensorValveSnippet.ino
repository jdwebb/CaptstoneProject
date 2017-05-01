// output of 520 from level sensor = ~1 inch of water
// output of 200 from level sensor = ~8 inches of water

/* LevelSensorValveSnippet
 * Begins integration with two mechanical system components

 * created 7 Mar 2016
 * by Wes Breisch
 * http://www..com
 */

 #include <Servo.h>

int levelSensorAnalogInputPin = A0;
int servoMotorAnalogInputPin = 9;
boolean pumpingDown = false;
boolean pumpingUp = false;
Servo servoMotor;

void setup() {
  // sets the data transfer rate in bits per second for serial data transmission
  Serial.begin(9600);

  // set pin modes for each I/O pin to be used in this program
  pinMode(levelSensorAnalogInputPin, INPUT);
  pinMode(servoMotorAnalogInputPin, INPUT);
  
  // attach the servo motor to its specific input pin
  servoMotor.attach(servoMotorAnalogInputPin);

  // perform initial read of the level sensor to see if some pumping needs to be done
  int initLevelSensorValue = analogRead(levelSensorAnalogInputPin);

  if (initLevelSensorValue < 500) {
    // leave the valve open in order to remove excess water at start up
    int initServoValue = servoMotor.read();
    Serial.print("Initial Servo Reading (0-180 degrees): ");
    Serial.print(initServoValue);
    Serial.print("\n");
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  // read the input on analog pin 0:
  int levelSensorValue = analogRead(levelSensorAnalogInputPin);
  // print out the value you read:
  
  if (levelSensorValue < 200) {
    Serial.println("(water too high)... time to turn the pump on! sensor value: ");
    Serial.println(levelSensorValue);
  } else if (levelSensorValue > 520) {
    Serial.println("(water too low)... sensor value: ");
    Serial.println(levelSensorValue);
  } else {
    Serial.println("We're good!");
    Serial.println(levelSensorValue);
  }
  
  delay(1000);
}
