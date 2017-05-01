#include <YunServer.h>
#include <YunClient.h>
#include <Servo.h>

// Listen on default port 5555, the webserver on the Yun
// will forward there all the HTTP requests for us.
YunServer server;

// Define servo variables
Servo servo9;
Servo servo11;

void setup() {
  Serial.begin(9600);

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

void loop() {
  // Get clients coming from server
  YunClient client = server.accept();

  // Check: is there a new client?
  if (client) {
    // Process request
    process(client);

    // Close connection and free resources.
    client.stop();
  }

  delay(15); // Poll every 15ms
}

void process(YunClient client) {
  // read the command
  String command = client.readStringUntil('/');
  command.trim();

  // Allow clients outside of the Arduino to perform HTTP requests on the Arduino
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

  pin = client.parseInt();

  if (client.read() == '/') {
    value = client.parseInt();
    servo9.attach(9);
    servo11.attach(11);
    
      if (value == 0) {
        servo9.write(0);
        servo11.write(0);
        delay(2000); 
      } else if (value == 1) {
        servo9.write(180);
        servo11.write(180);
        delay(2000);
      }
      servo9.detach();
      servo11.detach();
      
      // Send feedback to client
      client.print(value); 
  }
}
