#include <ESP8266HTTPClient.h>
#include <Servo.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>


Servo myservo;  
HTTPClient http;
DynamicJsonBuffer jsonBuffer;

#define servoPin D3
#define motorPin D6
#define WIFI_SSID ""
#define WIFI_PASSWORD ""

const char url[] = "http://phant.labben.org:8090/output/WXVMZNDj2jCX86J039D6f6a1ek4.json"; 

                
int buttonPins[3]={D1,D2,D5};
bool buttonState[3] = {0,0,0};

bool motor = false;
int pos;


void setup()
{
  Serial.begin(9600);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  
  myservo.attach(servoPin);

  pinMode(servoPin,OUTPUT);
  digitalWrite(servoPin,0);
  for(int i=0;i<3;i++)
  {
    pinMode(buttonPins[i],INPUT);
  }
  
}

void loop()    {
  for(int i=0;i<3;i++)
  {
    int state = digitalRead(buttonPins[i]);
    buttonState[i] = state;
  }

  /*
  Serial.print("[");
  Serial.print(buttonState[0]);
  Serial.print(",");
  Serial.print(buttonState[1]);
  Serial.print(",");
  Serial.print(buttonState[2]);
  Serial.print("]");
  Serial.println();
  */
  
  http.begin(url);
  Serial.print("fetching data...");
  int httpCode = http.GET();
  if (httpCode > 0){
    String raw = http.getString();
    if(raw[13] == 'F' and !motor){
      toggleMotor();
    }
    http.end();  
  }else{
    Serial.print("Did not fetch any data....");
  }
  delay(1000);
    
  if (buttonState[0] == HIGH){
    while (buttonState[0] == HIGH){
      buttonState[0] = digitalRead(buttonPins[0]);
      delay(10);
    }
    toggleMotor();
    delay(50);
  }
  
  if(buttonState[1] == HIGH){
    Serial.println("Right");
    while(buttonState[1] == HIGH){
       pos = pos-1;
       myservo.write(pos);
       delay(5);
       buttonState[1] = digitalRead(buttonPins[1]);
    }
  }

  if(buttonState[2] == HIGH){
    Serial.print("Left");
    while(buttonState[2] == HIGH){
       pos = pos+1;
       myservo.write(pos);
       delay(5);
       buttonState[2] = digitalRead(buttonPins[2]);
    }
  }                          
}


void toggleMotor() {
  if(motor){
    Serial.println("Motor off");
    motor = false;
    pinMode(motorPin,INPUT);   
      digitalWrite(motorPin,0); 
  }else {
    Serial.println("Motor on");
    motor = true;
    pinMode(motorPin,OUTPUT);   
      digitalWrite(motorPin,1); 
  }
}