# Raspberry Pi finder

Where are my pies ?

based on Apple Bonjour protocol and [MDNS npm module](https://www.npmjs.com/package/mdns), find every Raspberry pi on your network !

## Before installation

Based on the [MDNS npm module](https://www.npmjs.com/package/mdns) dependencies :

On Linux and other systems using the avahi daemon the avahi dns_sd compat library and its header files are required. On debianesque systems the package name is libavahi-compat-libdnssd-dev. On other platforms Apple's mDNSResponder is recommended. Care should be taken not to install more than one mDNS stack on a system.

On Windows you are going to need Apples "Bonjour SDK for Windows". You can download it either from Apple (registration required) or various unofficial sources. Take your pick. After installing the SDK restart your shell or command prompt and make sure the BONJOUR_SDK_HOME environment variable is set. You'll also need a compiler. Microsoft Visual Studio Express will do. On Windows node >=0.7.9 is required.

