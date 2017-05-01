void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  // read the input on analog pin 0:
  int sensorValue = analogRead(A0);
  // print out the value you read:
  
  if (sensorValue < 200) {
    Serial.println("You have fucked up, time to turn the pump on! sensor value: ");
    Serial.println(sensorValue);
  } else if (sensorValue > 520) {
    Serial.println("You have fucked up (too low)... sensor value: ");
    Serial.println(sensorValue);
  } else {
    Serial.println("We good");
    Serial.println(sensorValue);
  }
  
  delay(1000);
}

// 520 - ~1 inch
// 200 - ~8 inches
