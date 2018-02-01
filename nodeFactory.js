const Node = require('./Node');
const PeerId = require('peer-id');
const PeerInfo = require('peer-info');
const waterfall = require('async/waterfall');

module.exports = function (cb) {

    waterfall([
        (cb) => {

            /**
             * @desc Create an peer id (aka private key)
             */
            PeerId.create(function (err, id) {
                if(err){
                    return cb(err);
                }

                cb(null, id);
            })

        },
        (peerId, cb) => {

            /**
             * @desc create peer info which is the public id on the network
             */
            PeerInfo.create(peerId, function (error, peerInfo) {

                if(error){
                    return cb(error);
                }

                peerInfo.multiaddrs.add('/ip4/0.0.0.0/tcp/0');

                cb(null, new Node(peerInfo, {railing: true}));

            })

        }
    ], cb);

};
