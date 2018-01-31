const libp2p = require('libp2p');
const TCP = require('libp2p-tcp');
const spdy = require('libp2p-spdy');
const secio = require('libp2p-secio');
const MulticastDNS = require('libp2p-mdns');
const DHT = require('libp2p-kad-dht');

class Node extends libp2p {
    constructor (peerInfo, peerBook, options) {
        options = options || {};

        const modules = {
            //Add more transports
            transport: [
                new TCP()
            ],
            connection: {
                muxer: [
                    spdy
                ],
                crypto: [
                    secio
                ]
            },
            //Add railing
            discovery: [
                new MulticastDNS(peerInfo)
            ],
            dht: DHT
        };

        super(modules, peerInfo, peerBook, options)
    }
}