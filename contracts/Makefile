-include .env

.PHONY: all test clean deploy fund help install snapshot format anvil 

DEFAULT_ANVIL_KEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

help:
	@echo "Usage:"
	@echo "  make deploy [ARGS=...]\n    example: make deploy ARGS=\"--network sepolia\""
	@echo ""
	@echo "  make fund [ARGS=...]\n    example: make deploy ARGS=\"--network sepolia\""

all: clean remove install update build

# Clean the repo
clean  :; forge clean

# Remove modules
remove :; rm -rf .gitmodules && rm -rf .git/modules/* && rm -rf lib && touch .gitmodules && git add . && git commit -m "modules"

install :; forge install cyfrin/foundry-devops --no-commit && forge install foundry-rs/forge-std --no-commit && forge install transmissions11/solmate --no-commit && forge install openzeppelin/openzeppelin-contracts --no-commit && npm i

# Update Dependencies
update:; forge update

build:; forge build

test :; forge test 

coverage :; forge coverage --report debug > coverage-report.txt

snapshot :; forge snapshot

format :; forge fmt

anvil :; anvil -m 'test test test test test test test test test test test junk' --steps-tracing --block-time 1

NETWORK_ARGS := --rpc-url http://localhost:8545 --private-key $(DEFAULT_ANVIL_KEY) --broadcast

ifeq ($(findstring --network flow,$(ARGS)),--network flow)
	NETWORK_ARGS := --rpc-url $(FLOW_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --legacy
endif

ifeq ($(findstring --network sapphire,$(ARGS)),--network sapphire)
	NETWORK_ARGS := --rpc-url $(OASIS_SAPPHIRE_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --legacy --verify --verifier sourcify --verifier-url https://sourcify.dev/server
endif

ifeq ($(findstring --network morph,$(ARGS)),--network morph)
	NETWORK_ARGS := --rpc-url $(MORPH_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --legacy
endif

ifeq ($(findstring --network sepolia,$(ARGS)),--network sepolia)
	NETWORK_ARGS := --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast 
endif

ifeq ($(findstring --network airdao,$(ARGS)),--network airdao)
	NETWORK_ARGS := --rpc-url $(AIRDAO_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast
endif

ifeq ($(findstring --network zkevmTestnet,$(ARGS)),--network zkevmTestnet)
	NETWORK_ARGS := --rpc-url $(POLYGON_ZKEVM_TESTNET_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(POLYGON_ZKEVM_SCAN_API_KEY)
endif

ifeq ($(findstring --network baseSepolia,$(ARGS)),--network baseSepolia)
	NETWORK_ARGS := --rpc-url $(BASE_SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --verifier blockscout --verifier-url https://base-sepolia.blockscout.com/api?
endif

ifeq ($(findstring --network linea,$(ARGS)),--network linea)
	NETWORK_ARGS := --rpc-url $(LINEA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast
endif

ifeq ($(findstring --network scrollSepolia,$(ARGS)),--network scrollSepolia)
	NETWORK_ARGS := --rpc-url $(SCROLL_SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(SCROLL_SEPOLIA_SCAN_API_KEY)
endif

ifeq ($(findstring --network xdcTestnet,$(ARGS)),--network xdcTestnet)
	NETWORK_ARGS := --rpc-url $(XDC_TESTNET_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast
endif

ifeq ($(findstring --network celoTestnet,$(ARGS)),--network celoTestnet)
	NETWORK_ARGS := --rpc-url $(CELO_TESTNET_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(CELO_SCAN_API_KEY)
endif

ifeq ($(findstring --network arbGoreli,$(ARGS)),--network arbGoreli)
	NETWORK_ARGS := --rpc-url $(ARB_GOERLI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ARB_GOERLI_SCAN_API_KEY)
endif

ifeq ($(findstring --network gnosis,$(ARGS)),--network gnosis)
	NETWORK_ARGS := --rpc-url $(GNOSIS_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(GONSIS_SCAN_API_KEY) 
endif

ifeq ($(findstring --network zircuit,$(ARGS)),--network zircuit)
	NETWORK_ARGS := --rpc-url $(ZIRCUIT_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast 
endif

# Commands for Local

deployBlackJack: 
	@forge script script/DeployBlackJack.s.sol:DeployBlackJack $(NETWORK_ARGS)

getRandomNumber: 
	@forge script script/interactions/i_RandomNumber.s.sol:GetRandomNumber $(NETWORK_ARGS)

deployChipToken:
	@forge script script/DeployChipToken.s.sol:DeployChipToken $(NETWORK_ARGS)

deployEscrow:
	@forge script script/DeployEscrow.s.sol:DeployEscrow $(NETWORK_ARGS)

sendFunds:
	@forge script script/interactions/i_ChipToken.s.sol:SendFunds $(NETWORK_ARGS)