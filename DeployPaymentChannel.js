let { networkConfig } = require('../helper-hardhat-config')

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = await getChainId()
    log("----------------------------------------------------")
    const paymentChannel = await deploy('SimplePaymentChannel', {
        from: deployer,
        args: ['0xB0444C2c9793e37BEBd947F4583724Ac3a60F641', 24 * 60 * 60],
        log: true
    })
    log("Run test payment on channel:")
    log("npx hardhat test-send-payment --contract " + paymentChannel.address + " --network " + networkConfig[chainId]['name'])
    log("----------------------------------------------------")

}

module.exports.tags = ['all', 'payment', 'main']
