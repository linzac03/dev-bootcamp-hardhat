task("test-send-payment", "Sends a payment over the simple payment channel")
    .addParam("contract", "The address of the payment channel contract")
    .setAction(async taskArgs => {

        const contractAddr = taskArgs.contract
        const networkId = network.name
        console.log("Sending a payment on channel ", contractAddr, " on network ", networkId)
        const SimplePaymentChannel = await ethers.getContractFactory("SimplePaymentChannel")

        //Get signer information
        const accounts = await hre.ethers.getSigners()
        const signer = accounts[0]

        //Create connection to VRF Contract and call the getRandomNumber function
        const paymentChannelContract = new ethers.Contract(contractAddr, SimplePaymentChannel.interface, signer)
        var result = await paymentChannelContract.close()
        console.log('Contract ', contractAddr, ' payment sent successfully. Transaction Hash: ', result.hash)
    })

module.exports = {}
