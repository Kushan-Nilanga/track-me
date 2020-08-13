define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./public/generated-docs/main.js",
    "group": "/home/kushan/Desktop/programming/SIT209/track-me/mqtt/public/generated-docs/main.js",
    "groupTitle": "/home/kushan/Desktop/programming/SIT209/track-me/mqtt/public/generated-docs/main.js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/send-command",
    "title": "",
    "description": "<p>This route sends a command to the targeted device</p>",
    "group": "SensorData",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deviceId",
            "description": "<p>Id of of the Device.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "command",
            "description": "<p>to the Device.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"published new message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./mqtt.js",
    "groupTitle": "SensorData",
    "name": "PostSendCommand"
  },
  {
    "type": "put",
    "url": "/sensor-data",
    "title": "Post a device sensor data to database",
    "description": "<p>This route adds a sensor data with relavent details to the database.</p>",
    "group": "SensorData",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deviceId",
            "description": "<p>Id of the Device.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"published new message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./mqtt.js",
    "groupTitle": "SensorData",
    "name": "PutSensorData"
  }
] });
