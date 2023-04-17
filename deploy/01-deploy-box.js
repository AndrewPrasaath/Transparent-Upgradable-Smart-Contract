const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
const { network, ethers } = require("hardhat")
const { verify } = require("../helper-functions")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("----------------------------------------------------")

    const box = await deploy("Box", {
        from: deployer,
        log: true,
        args: [],
        waitConfirmations: waitBlockConfirmations,
        proxy: {
            proxyContract: "OpenZeppelinTransparentProxy",
            viaAdminContract: {
                name: "BoxProxyAdmin",
                artifact: "BoxProxyAdmin",
            },
        },
    })

    // Verification
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        const boxAddress = (await ethers.getContract("Box_Implementation")).address
        await verify(boxAddress, [])
    }

    log("----------------------------------------------------")
}

module.exports.tags = ["all", "box"]
