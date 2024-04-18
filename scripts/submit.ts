import { promises as filesystem } from 'fs'
import * as path from 'path'
import { ethers } from 'ethers'
import dotenv from "dotenv";
import { runScript } from './utils';

dotenv.config()

async function submitDeploymentTransaction() {
	const rpcUrl = process.env.RPC
	const provider = new ethers.JsonRpcProvider(rpcUrl)
	const chainId = (await provider.getNetwork()).chainId
	console.log({chainId})
	const filePath = path.join(__dirname, "..", "artifacts", `${chainId}`, "deployment.json")
	const deploymentData = JSON.parse(await filesystem.readFile(filePath, { encoding: 'utf8' }))

	const submittedTx = await provider.send("eth_sendRawTransaction", [deploymentData.transaction])
	console.log("Transaction Hash", submittedTx)
}

runScript(submitDeploymentTransaction)
