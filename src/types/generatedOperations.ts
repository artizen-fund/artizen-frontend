type ISidebarDonatorsQueryVariables = Exact<{ [key: string]: never }>

type ISidebarDonatorsQuery = {
  __typename?: 'query_root'
  Donations: Array<{
    __typename?: 'Donations'
    amount: any
    User: { __typename?: 'User'; firstName?: string | null; lastName?: string | null; profileImage?: string | null }
  }>
}

type ICreateTopUpWalletMutationVariables = Exact<{
  data: ITopUpWallet_Insert_Input
}>

type ICreateTopUpWalletMutation = {
  __typename?: 'mutation_root'
  insert_TopUpWallet_one?: {
    __typename?: 'TopUpWallet'
    id: any
    amount: any
    originFund: string
    state: string
    userId: any
    timestamp?: any | null
  } | null
}
