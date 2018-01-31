const Node = require('../Node');
const PeerInfo = require('peer-info');
const PeerId = require('peer-id');
const waterfall = require('async/waterfall');

const peerId = {"id":"QmesHkBq4nEo8JEXDhEjjQTvnzCLGcSqrUgS7j2xXAWnuQ","privKey":"CAASpgkwggSiAgEAAoIBAQCsXYe7RS/CMV2bfuzMK0ig9rQ67pkZug45KPAkaboeEk0DrI68m18JF1rQYmgin+3fmNHUpEe6HnwjbjfViu/8YLE0nSfmoO19hZiMboVJoGuqkAIRb7obLQrl1fr+zW8djhsUW5VgIr0kMV9QHyw7lZHM0Cpa5KL87zuFj4EDK74eufXG6hF3o3p8WB/pVMPcRQBKuJylLts4x62dCGJGbUWE+hNKZ/cS4fL9WDibQLPyckBtBBzqo/ezOEEdi7JdLAnfWF5ssTo8rD+bVBFi8hFzpMQfWfk358DNb2RmHGWiDn4lbAT24PHCmF8ygsgUWks3VrwwqtvUK32Zv4/bAgMBAAECggEAdj6Hocn51G+HNuggzIOZBIuZ4p/SOdrwbPgPnftF6eFGIhIbrXms/ZCfBTutEqvCRNUShZzZc+373VZ8SStSLUGr71ssh0O5CJZAq34aRAMgOVcnhAywkHoa8scTs/78jjrxisq1M8lBFfYk29M2xf16kxXvKIGW6ou3uo1SxPf5qKfXwplmFlqUbczMXhmlP43pJ24Ns0OAkG/4O8f/eh3blHQx6GSyig3rVXx41uTt4M+nbDTgZnD+3Qpd7aInpo8YLV0qzkOpsl2YxPeAMYpzVm5BBKGM7y03eIgJJWrkl6ciA0b3Rf7lL3qe05M+Qrp124cKUmlTdCWbL7FPkQKBgQDbw7mFMosY4c/IfXxArhjI08Lg0PZplAMPSMyICl0/M9AIKW+8+O+zv3rpFbOcJamRHbsBEWc2xKT+jzwPkwgL8BK3faUj0kKSR4jReR1NkBY2a63vR8bWMDRKotYk1HL2MCQNgIumynQ8rdYdwGb/Rdf2RlA22zoHgt7z8xdMcwKBgQDIyRUbXX2VjLIOUTAwXeq2dspO9OLZPEqKOPEgh4Yc1kiX3+ImMEUVw2EtYeD9QyLwNklWzo65FuG0M8GkObh0kgmv94VMrfLpogUxovYOeQf09+LtlWC8P3NsHLJN2N8rl1yRfDK07zTnhGANybeajz5qS1tdCjZtDYQvG5f8+QKBgHtkGL1F1L3CxAShGGvElJvl8kyCZ2h+N32UdWqIzzRWZh6/DUMATq4Q+/T1P2ST7PJSzBXcbKReovle+O0Rs/nn8Mpf3KIRQ1mYmqRqqV5MYXxq1z07gtPuOt4RMcV6F5ZND2EZZM/gaoVLYaZQykPYNlrLvewfCSUAgShdvB4rAoGAHJl/1ykG9WFYD3ADFDCceScMhBifo1/SIkQgHIkRUlQ3fOKX/OaNQJ9W3Tb+7DQ+6sZgxeugKr8WoStqHrFWE8ylcpooM5bnbd31LW/P6pnUx1Dz0vGfGNFU6IZh43LLvxLNTa/KLTmRaJTTdcNQ0sQqmMtpFSSaQghV1rvwd0kCgYBdBWrN30g9ePrgzr71UkGEkeLhkCUNf+Xnf3xp/uJvDjeyK1Mj6whZOiRuIVRrjohkoBI8t/rfvUmIcmrtT/MXlWlsKZdmHAYn2j/tinPwYW6MpWuQZI7EGGe4juPa9pG32CvWt7wm7fahOwTyZhMkh0kUOndLbgjZIFaG9GFtlw==","pubKey":"CAASpgIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCsXYe7RS/CMV2bfuzMK0ig9rQ67pkZug45KPAkaboeEk0DrI68m18JF1rQYmgin+3fmNHUpEe6HnwjbjfViu/8YLE0nSfmoO19hZiMboVJoGuqkAIRb7obLQrl1fr+zW8djhsUW5VgIr0kMV9QHyw7lZHM0Cpa5KL87zuFj4EDK74eufXG6hF3o3p8WB/pVMPcRQBKuJylLts4x62dCGJGbUWE+hNKZ/cS4fL9WDibQLPyckBtBBzqo/ezOEEdi7JdLAnfWF5ssTo8rD+bVBFi8hFzpMQfWfk358DNb2RmHGWiDn4lbAT24PHCmF8ygsgUWks3VrwwqtvUK32Zv4/bAgMBAAE="};


waterfall([
    (cb) => {

        /**
         * @desc Create an peer id (aka private key)
         */
        PeerId.createFromJSON(peerId, function (error, id) {

            if(error){
                throw error;
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

            cb(null, new Node(peerInfo));

        })

    }
], function (error, myNode) {

    if(error){
        throw error;
    }


    myNode.start(function (error) {

        if(error){
            throw error;
        }

        myNode.peerInfo.multiaddrs.forEach((ma) => {
            console.log(ma.toString());
        })

    })

});
