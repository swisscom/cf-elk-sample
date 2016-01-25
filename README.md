# Cloud Foundry ELK Example App

This app is an example of how you can use ELK within your Node.js Cloud Foundry App.

It allows you to log entries in json format on different loglevels to ELK. 

### Getting Started

Start the app by push it to Cloud Foundry and bind an ELK service to it. 

Example:

     $ git clone https://github.com/swisscom/cf-elk-sample.git
     $ cd cf-elk-sample
     $ cf create-service elk small testelk
     $ cf push
  
[Link](http://docs.developer.swisscom.com/services/offerings/elk.html) to ELK service documentation.
