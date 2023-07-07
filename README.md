# Safe Singleton Factory

Singleton factory used by Safe related contracts based on https://github.com/Arachnid/deterministic-deployment-proxy

The original library used a presigned transaction without a chain id to allow deployment on different chains. Some chains do not allow such transactions to be submitted (e.g. Celo and Avalanche) therefore this repository will provide the same factory that can be deployed via a presigned transaction that includes the chain id. The key that is used to sign is controlled by the Safe team.

# Adding new networks

To add support for new networks the same key used for the existing networks should be used to generate a presigned transaction for a new network. To request support for a new network please open a [new issue](https://github.com/safe-global/safe-singleton-factory/issues/new/choose).

To generate the deployment data for a new network the following steps are necessary:

- Set `RPC` in the `.env` file for the new network
- Estimate transaction params via `yarn estimate`

- Set `MNEMONIC` in the `.env` file
- Run `yarn compile <chain_id> [--gasPrice <overwrite_gas_price>] [--gasLimit <overwrite_gas_limit>]`

To do `estimate` and `compile` steps together:

- Run `yarn estimate-compile ["$RPC"]`

# For zkSync

- Set `MNEMONIC` or `PK` in the `.env` file
- Run `yarn compile:zk`

# Expected Addresses

For all networks the same deployer key is used. The address for this key is `0xE1CB04A0fA36DdD16a06ea828007E35e1a3cBC37`.

This results in the address for the factory to be `0x914d7Fec6aaC8cd542e72Bca78B30650d45643d7` for all bytecode compatible EVM networks.

For zkSync based networks the same deployer is used and expected factory address is `0xaECDbB0a3B1C6D1Fe1755866e330D82eC81fD4FD`.

Note: For zkSync the factory is deployed using the `create2` method of the system deployer using the zero hash (`0x0000000000000000000000000000000000000000000000000000000000000000`).
