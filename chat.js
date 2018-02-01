const PeerId = require('peer-id');
const CID = require('cids');
const nodeFactory = require('./nodeFactory');
const query = require('libp2p-kad-dht/src/query');

nodeFactory(function (error, myNode) {

    console.log("My id: "+myNode.peerInfo.id.toB58String());

    if(error){
        throw error;
    }

    myNode.start(function (err) {

        if (err){
            throw err;
        }

        /**
         * @desc Just an Id. (for the nation group chat this can be the id of the nation)
         * @type {CID}
         */
        const cid = new CID('QmTp9VkYvnHyrqKQuFPiuZkiX9gPcqj6x5LJ1rmWuSySLL');

        /**
         * @desc Discover other peer's that hold the same id
         */
        myNode.on('peer:discovery', (peer) => {

            myNode.dial(peer, () => {});

        });

        /**
         * @desc Connect to peer
         */
        myNode.on('peer:connect', peer => console.log('connected: '+peer.id.toB58String()));

        myNode.contentRouting.findProviders(cid, 600*1000, function (error, peers) {

            if(error){
                throw error;
            }

            console.log(`Found ${peers.length} providers for content`);

        })

    })

});
