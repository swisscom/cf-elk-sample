# Cloud Foundry ELK Example App

This app is an example of how you can use ELK within your Node.js Cloud Foundry App.

It allows you to log entries in json format on different loglevels to ELK.

## Getting Started

Start the app by pushing it to Cloud Foundry and binding an ELK service to it.

Example:

```shell
$ git clone https://github.com/swisscom/cf-elk-sample.git
$ cd cf-elk-sample
$ cf create-service elk small testelk
$ cf push
```

[Link](http://docs.developer.swisscom.com/services/offerings/elk.html) to ELK service documentation.
