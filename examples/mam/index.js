const { FailMode, LinearWalkStrategy, Mam, SuccessMode } = require('@iota/client-load-balancer');
const { asciiToTrytes, trytesToAscii } = require('@iota/converter');

// Set the channel mode
const channelMode = 'public' // 'private' 'restricted'
const retrictedSideKeyTrytes = channelMode === 'restricted' ? 'THIS9IS9A9RESTRICTED9KEY' : undefined;
const explorer = 'https://devnet.thetangle.org';

// Publish a new message
async function publishMessage(mamState, trytesMessage) {
    console.log(`Publishing Message: ${trytesMessage}`);

    // Create MAM Payload
    const message = Mam.create(mamState, trytesMessage);

    console.log(`Root: ${message.root}`);
    console.log(`Address: ${message.address}`);

    // Attach the payload
    console.log('Attaching payload, please wait...');

    try {
        await Mam.attach(message.payload, message.address);
        return message;
    } catch (err) {
        console.error('There was an error attaching the message', err.message);
    }
}

// Fetch message beginning at the specific root.
async function fetchMessages(messageRoot) {
    console.log(`Fetching Messages from Root: ${messageRoot}`);

    try {
        const response = await Mam.fetch(messageRoot, channelMode, retrictedSideKeyTrytes);

        if (response) {
            if (!response.messages || response.messages.length === 0) {
                console.log('There are no messages.')
            } else {
                response.messages.forEach(messageTrytes => {
                    console.log(`Fetched Message: ${trytesToAscii(messageTrytes)}`);
                });
            }
            console.log(`Next Root: ${response.nextRoot}`);
        }
        return response;
    } catch (err) {
        console.error('There was an error fetching messages', err);
    }
}

(async function () {
    try {
        const nodeWalkStrategy = new LinearWalkStrategy(
            [
                {
                    'provider': 'https://thiswillfailbigly.eu',
                    'depth': 3,
                    'mwm': 9
                },
                {
                    'provider': 'https://nodes.devnet.iota.org:443',
                    'depth': 3,
                    'mwm': 9
                }
            ],
            1 // Blacklist count, will stop using the initial node once it has failed
        );

        let mamState = Mam.init({
            nodeWalkStrategy,
            successMode: SuccessMode.next,
            failMode: FailMode.all,
            timeoutMs: 5000,
            tryNodeCallback: (node) => {
                console.log(`Trying node ${node.provider}`);
            },
            failNodeCallback: (node, err) => {
                console.log(`Failed node ${node.provider}, ${err.message}`);
            }
        });

        const initialRoot = Mam.getRoot(mamState);
        console.log('Root', initialRoot);

        console.log(`Channel Mode: ${channelMode}`);
        mamState = Mam.changeMode(mamState, channelMode, retrictedSideKeyTrytes);

        const messageResponse = await fetchMessages(initialRoot);

        if (messageResponse) {
            mamState.channel.start = messageResponse.messages.length;

            const message = await publishMessage(mamState, asciiToTrytes(`This is my message ${messageResponse.messages.length + 1}`));

            if (message) {
                console.log('Message Published');
                if (channelMode === 'public') {
                    console.log(`You can view the message chain on the tangle:`);
                    console.log(`${explorer}/mam/${initialRoot}`);
                    console.log(`or just for this message at:`);
                    console.log(`${explorer}/mam/${message.address}`);
                } else {
                    console.log(`You can view the transactions for this this message at:`);
                    console.log(`${explorer}/address/${message.address}`);
                }
                await fetchMessages(message.root);
            }
        }

    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
})();