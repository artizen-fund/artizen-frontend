const raffleAbi = [
  {
    inputs: [
      { internalType: 'address', name: '_usdc', type: 'address' },
      { internalType: 'address', name: '_forwarder', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { inputs: [], name: 'AmountsNotEqual', type: 'error' },
  { inputs: [], name: 'CannotClaimRewards', type: 'error' },
  { inputs: [], name: 'DonationTooLow', type: 'error' },
  { inputs: [], name: 'IncorrectTimesGiven', type: 'error' },
  { inputs: [], name: 'InsufficientAmount', type: 'error' },
  { inputs: [], name: 'NoMoreTokensToClaim', type: 'error' },
  { inputs: [], name: 'NoRewardsForRaffle', type: 'error' },
  { inputs: [], name: 'RaffleCancelled', type: 'error' },
  { inputs: [], name: 'RaffleHasEnded', type: 'error' },
  { inputs: [], name: 'RaffleHasNotEnded', type: 'error' },
  { inputs: [], name: 'ZeroAddressNotAllowed', type: 'error' },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'walletAddress', type: 'address' }],
    name: 'DAOWalletAddressSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'from', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'raffleId', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'DonationPlaced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'raffleID', type: 'uint256' },
      { indexed: false, internalType: 'address', name: 'winner', type: 'address' },
    ],
    name: 'NFTsentToWinner',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'nftOwner', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'tokenID', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'startTime', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'endTime', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'minimumDonationAmount', type: 'uint256' },
    ],
    name: 'RaffleCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'tokenAddress', type: 'address' }],
    name: 'RewardTokenAddressSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'RewardTokenBalanceToppedUp',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'donor', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'raffleID', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'RewardsClaimedPerCycle',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'raffleID', type: 'uint256' },
      { indexed: false, internalType: 'address', name: 'donor', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amountToPay', type: 'uint256' },
    ],
    name: 'RewardsTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { indexed: true, internalType: 'bytes32', name: 'previousAdminRole', type: 'bytes32' },
      { indexed: true, internalType: 'bytes32', name: 'newAdminRole', type: 'bytes32' },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { indexed: true, internalType: 'address', name: 'account', type: 'address' },
      { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { indexed: true, internalType: 'address', name: 'account', type: 'address' },
      { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'tokenRewardsModuleAddress', type: 'address' }],
    name: 'TokenRewardsModuleAddressSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'nftAuthorWallet', type: 'address' }],
    name: 'nftAuthorWalletAddressSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'account', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'tokensWithdrawnFromContract',
    type: 'event',
  },
  {
    inputs: [],
    name: 'CURATOR_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DAOWallet',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'REWARD_TOKEN',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'USDC',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'raffleID', type: 'uint256' }],
    name: 'cancelRaffle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'nftContract', type: 'address' },
          { internalType: 'address', name: 'nftOwner', type: 'address' },
          { internalType: 'uint256', name: 'raffleID', type: 'uint256' },
          { internalType: 'uint256', name: 'tokenID', type: 'uint256' },
          { internalType: 'uint256', name: 'startTime', type: 'uint256' },
          { internalType: 'uint256', name: 'endTime', type: 'uint256' },
          { internalType: 'uint256', name: 'minimumDonationAmount', type: 'uint256' },
          { internalType: 'address', name: 'topDonor', type: 'address' },
          { internalType: 'uint256', name: 'topDonatedAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'tokenAllocation', type: 'uint256' },
          { internalType: 'uint256', name: 'buffer', type: 'uint256' },
          { internalType: 'bool', name: 'cancelled', type: 'bool' },
        ],
        internalType: 'struct RaffleV2.Raffle',
        name: '_raffle',
        type: 'tuple',
      },
    ],
    name: 'createRaffle',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'donor', type: 'address' },
          { internalType: 'uint256', name: 'raffleID', type: 'uint256' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
        ],
        internalType: 'struct RaffleV2.Donation',
        name: '_donation',
        type: 'tuple',
      },
    ],
    name: 'donate',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'donationCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'donations',
    outputs: [
      { internalType: 'address', name: 'donor', type: 'address' },
      { internalType: 'uint256', name: 'raffleID', type: 'uint256' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'donorExistsInArray',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'donorsArrayPerCycle',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'donationID', type: 'uint256' }],
    name: 'getDonation',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'donor', type: 'address' },
          { internalType: 'uint256', name: 'raffleID', type: 'uint256' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
        ],
        internalType: 'struct RaffleV2.Donation',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'raffleID', type: 'uint256' }],
    name: 'getDonorsPerCycle',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'raffleID', type: 'uint256' }],
    name: 'getHighestDonationPerCycle',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'raffleID', type: 'uint256' }],
    name: 'getRaffle',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'nftContract', type: 'address' },
          { internalType: 'address', name: 'nftOwner', type: 'address' },
          { internalType: 'uint256', name: 'raffleID', type: 'uint256' },
          { internalType: 'uint256', name: 'tokenID', type: 'uint256' },
          { internalType: 'uint256', name: 'startTime', type: 'uint256' },
          { internalType: 'uint256', name: 'endTime', type: 'uint256' },
          { internalType: 'uint256', name: 'minimumDonationAmount', type: 'uint256' },
          { internalType: 'address', name: 'topDonor', type: 'address' },
          { internalType: 'uint256', name: 'topDonatedAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'tokenAllocation', type: 'uint256' },
          { internalType: 'uint256', name: 'buffer', type: 'uint256' },
          { internalType: 'bool', name: 'cancelled', type: 'bool' },
        ],
        internalType: 'struct RaffleV2.Raffle',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'raffleID', type: 'uint256' }],
    name: 'getTokenBuffer',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'raffleID', type: 'uint256' }],
    name: 'getTokensInTheBufferEndOfCycle',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'raffleID', type: 'uint256' }],
    name: 'getTopDonor',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'raffleID', type: 'uint256' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'getTotalDonationPerAddressPerCycle',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'raffleID', type: 'uint256' }],
    name: 'getTotalDonationsPerCycle',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'forwarder', type: 'address' }],
    name: 'isTrustedForwarder',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nftAuthorWallet',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ internalType: 'bytes4', name: '', type: 'bytes4' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'raffleCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'raffles',
    outputs: [
      { internalType: 'address', name: 'nftContract', type: 'address' },
      { internalType: 'address', name: 'nftOwner', type: 'address' },
      { internalType: 'uint256', name: 'raffleID', type: 'uint256' },
      { internalType: 'uint256', name: 'tokenID', type: 'uint256' },
      { internalType: 'uint256', name: 'startTime', type: 'uint256' },
      { internalType: 'uint256', name: 'endTime', type: 'uint256' },
      { internalType: 'uint256', name: 'minimumDonationAmount', type: 'uint256' },
      { internalType: 'address', name: 'topDonor', type: 'address' },
      { internalType: 'uint256', name: 'topDonatedAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'tokenAllocation', type: 'uint256' },
      { internalType: 'uint256', name: 'buffer', type: 'uint256' },
      { internalType: 'bool', name: 'cancelled', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'curator', type: 'address' }],
    name: 'revokeCuratorRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'raffleID', type: 'uint256' }],
    name: 'sendRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'curator', type: 'address' }],
    name: 'setCuratorRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_DAOWallet', type: 'address' }],
    name: 'setDAOWalletAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_nftAuthorWallet', type: 'address' }],
    name: 'setNftAuthorWalletAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_forwarder', type: 'address' }],
    name: 'setTrustedForwarder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'tokenRewardsActivated',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tokenRewardsModuleAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'totalDonationPerAddressPerCycle',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'trustedForwarder',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_tokenRewardsModuleAddress', type: 'address' },
      { internalType: 'address', name: '_rewardTokenAddress', type: 'address' },
      { internalType: 'uint256', name: '_raffleID', type: 'uint256' },
    ],
    name: 'turnOnTokenRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'versionRecipient',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export default raffleAbi
