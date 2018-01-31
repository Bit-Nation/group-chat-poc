const libp2p = require('libp2p');
const TCP = require('libp2p-tcp');
const spdy = require('libp2p-spdy');
const secio = require('libp2p-secio');
const MulticastDNS = require('libp2p-mdns');
const DHT = require('libp2p-kad-dht');
const Railing = require('libp2p-railing');

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
            DHT: DHT,
            //Add railing
            discovery: [
                new MulticastDNS(peerInfo, 2000)
            ]
        };

        if(options.railing){
            modules.discovery.push(new Railing('/ip4/172.18.0.4/tcp/34405/ipfs/QmesHkBq4nEo8JEXDhEjjQTvnzCLGcSqrUgS7j2xXAWnuQ', 2000));
        }

        super(modules, peerInfo, peerBook, options);

    }
}

module.exports = Node;