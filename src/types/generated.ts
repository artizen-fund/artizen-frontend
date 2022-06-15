import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type FieldWrapper<T> = Partial<T>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  BigInt: any
  Bytes: any
  bigint: any
  float8: any
  json: any
  numeric: any
  timestamptz: any
  uuid: any
}

export type IBlockChangedFilter = {
  number_gte: Scalars['Int']
}

export type IBlock_Height = {
  hash?: InputMaybe<Scalars['Bytes']>
  number?: InputMaybe<Scalars['Int']>
  number_gte?: InputMaybe<Scalars['Int']>
}

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type IBoolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>
  _gt?: InputMaybe<Scalars['Boolean']>
  _gte?: InputMaybe<Scalars['Boolean']>
  _in?: InputMaybe<Array<Scalars['Boolean']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['Boolean']>
  _lte?: InputMaybe<Scalars['Boolean']>
  _neq?: InputMaybe<Scalars['Boolean']>
  _nin?: InputMaybe<Array<Scalars['Boolean']>>
}

/** columns and relationships of "Donations" */
export type IDonations = {
  __typename?: 'Donations'
  /** An object relationship */
  User: FieldWrapper<IUser>
  amount: FieldWrapper<Scalars['numeric']>
  fee: FieldWrapper<Scalars['numeric']>
  id: FieldWrapper<Scalars['uuid']>
  state: FieldWrapper<Scalars['String']>
  topUpId: FieldWrapper<Scalars['uuid']>
  txHash?: Maybe<FieldWrapper<Scalars['String']>>
  type?: Maybe<FieldWrapper<Scalars['String']>>
  userId: FieldWrapper<Scalars['uuid']>
}

/** aggregated selection of "Donations" */
export type IDonations_Aggregate = {
  __typename?: 'Donations_aggregate'
  aggregate?: Maybe<FieldWrapper<IDonations_Aggregate_Fields>>
  nodes: Array<FieldWrapper<IDonations>>
}

/** aggregate fields of "Donations" */
export type IDonations_Aggregate_Fields = {
  __typename?: 'Donations_aggregate_fields'
  avg?: Maybe<FieldWrapper<IDonations_Avg_Fields>>
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<IDonations_Max_Fields>>
  min?: Maybe<FieldWrapper<IDonations_Min_Fields>>
  stddev?: Maybe<FieldWrapper<IDonations_Stddev_Fields>>
  stddev_pop?: Maybe<FieldWrapper<IDonations_Stddev_Pop_Fields>>
  stddev_samp?: Maybe<FieldWrapper<IDonations_Stddev_Samp_Fields>>
  sum?: Maybe<FieldWrapper<IDonations_Sum_Fields>>
  var_pop?: Maybe<FieldWrapper<IDonations_Var_Pop_Fields>>
  var_samp?: Maybe<FieldWrapper<IDonations_Var_Samp_Fields>>
  variance?: Maybe<FieldWrapper<IDonations_Variance_Fields>>
}

/** aggregate fields of "Donations" */
export type IDonations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Donations_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "Donations" */
export type IDonations_Aggregate_Order_By = {
  avg?: InputMaybe<IDonations_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<IDonations_Max_Order_By>
  min?: InputMaybe<IDonations_Min_Order_By>
  stddev?: InputMaybe<IDonations_Stddev_Order_By>
  stddev_pop?: InputMaybe<IDonations_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<IDonations_Stddev_Samp_Order_By>
  sum?: InputMaybe<IDonations_Sum_Order_By>
  var_pop?: InputMaybe<IDonations_Var_Pop_Order_By>
  var_samp?: InputMaybe<IDonations_Var_Samp_Order_By>
  variance?: InputMaybe<IDonations_Variance_Order_By>
}

/** input type for inserting array relation for remote table "Donations" */
export type IDonations_Arr_Rel_Insert_Input = {
  data: Array<IDonations_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<IDonations_On_Conflict>
}

/** aggregate avg on columns */
export type IDonations_Avg_Fields = {
  __typename?: 'Donations_avg_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
  fee?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by avg() on columns of table "Donations" */
export type IDonations_Avg_Order_By = {
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "Donations". All fields are combined with a logical 'AND'. */
export type IDonations_Bool_Exp = {
  User?: InputMaybe<IUser_Bool_Exp>
  _and?: InputMaybe<Array<IDonations_Bool_Exp>>
  _not?: InputMaybe<IDonations_Bool_Exp>
  _or?: InputMaybe<Array<IDonations_Bool_Exp>>
  amount?: InputMaybe<INumeric_Comparison_Exp>
  fee?: InputMaybe<INumeric_Comparison_Exp>
  id?: InputMaybe<IUuid_Comparison_Exp>
  state?: InputMaybe<IString_Comparison_Exp>
  topUpId?: InputMaybe<IUuid_Comparison_Exp>
  txHash?: InputMaybe<IString_Comparison_Exp>
  type?: InputMaybe<IString_Comparison_Exp>
  userId?: InputMaybe<IUuid_Comparison_Exp>
}

/** unique or primary key constraints on table "Donations" */
export enum Donations_Constraint {
  /** unique or primary key constraint */
  Donations_pkey = 'Donations_pkey',
}

/** input type for incrementing numeric columns in table "Donations" */
export type IDonations_Inc_Input = {
  amount?: InputMaybe<Scalars['numeric']>
  fee?: InputMaybe<Scalars['numeric']>
}

/** input type for inserting data into table "Donations" */
export type IDonations_Insert_Input = {
  User?: InputMaybe<IUser_Obj_Rel_Insert_Input>
  amount?: InputMaybe<Scalars['numeric']>
  fee?: InputMaybe<Scalars['numeric']>
  id?: InputMaybe<Scalars['uuid']>
  state?: InputMaybe<Scalars['String']>
  topUpId?: InputMaybe<Scalars['uuid']>
  txHash?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type IDonations_Max_Fields = {
  __typename?: 'Donations_max_fields'
  amount?: Maybe<FieldWrapper<Scalars['numeric']>>
  fee?: Maybe<FieldWrapper<Scalars['numeric']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  state?: Maybe<FieldWrapper<Scalars['String']>>
  topUpId?: Maybe<FieldWrapper<Scalars['uuid']>>
  txHash?: Maybe<FieldWrapper<Scalars['String']>>
  type?: Maybe<FieldWrapper<Scalars['String']>>
  userId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** order by max() on columns of table "Donations" */
export type IDonations_Max_Order_By = {
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  state?: InputMaybe<Order_By>
  topUpId?: InputMaybe<Order_By>
  txHash?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
  userId?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type IDonations_Min_Fields = {
  __typename?: 'Donations_min_fields'
  amount?: Maybe<FieldWrapper<Scalars['numeric']>>
  fee?: Maybe<FieldWrapper<Scalars['numeric']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  state?: Maybe<FieldWrapper<Scalars['String']>>
  topUpId?: Maybe<FieldWrapper<Scalars['uuid']>>
  txHash?: Maybe<FieldWrapper<Scalars['String']>>
  type?: Maybe<FieldWrapper<Scalars['String']>>
  userId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** order by min() on columns of table "Donations" */
export type IDonations_Min_Order_By = {
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  state?: InputMaybe<Order_By>
  topUpId?: InputMaybe<Order_By>
  txHash?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
  userId?: InputMaybe<Order_By>
}

/** response of any mutation on the table "Donations" */
export type IDonations_Mutation_Response = {
  __typename?: 'Donations_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<IDonations>>
}

/** on_conflict condition type for table "Donations" */
export type IDonations_On_Conflict = {
  constraint: Donations_Constraint
  update_columns?: Array<Donations_Update_Column>
  where?: InputMaybe<IDonations_Bool_Exp>
}

/** Ordering options when selecting data from "Donations". */
export type IDonations_Order_By = {
  User?: InputMaybe<IUser_Order_By>
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  state?: InputMaybe<Order_By>
  topUpId?: InputMaybe<Order_By>
  txHash?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
  userId?: InputMaybe<Order_By>
}

/** primary key columns input for table: Donations */
export type IDonations_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "Donations" */
export enum Donations_Select_Column {
  /** column name */
  amount = 'amount',
  /** column name */
  fee = 'fee',
  /** column name */
  id = 'id',
  /** column name */
  state = 'state',
  /** column name */
  topUpId = 'topUpId',
  /** column name */
  txHash = 'txHash',
  /** column name */
  type = 'type',
  /** column name */
  userId = 'userId',
}

/** input type for updating data in table "Donations" */
export type IDonations_Set_Input = {
  amount?: InputMaybe<Scalars['numeric']>
  fee?: InputMaybe<Scalars['numeric']>
  id?: InputMaybe<Scalars['uuid']>
  state?: InputMaybe<Scalars['String']>
  topUpId?: InputMaybe<Scalars['uuid']>
  txHash?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['uuid']>
}

/** aggregate stddev on columns */
export type IDonations_Stddev_Fields = {
  __typename?: 'Donations_stddev_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
  fee?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev() on columns of table "Donations" */
export type IDonations_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type IDonations_Stddev_Pop_Fields = {
  __typename?: 'Donations_stddev_pop_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
  fee?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev_pop() on columns of table "Donations" */
export type IDonations_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type IDonations_Stddev_Samp_Fields = {
  __typename?: 'Donations_stddev_samp_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
  fee?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev_samp() on columns of table "Donations" */
export type IDonations_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
}

/** aggregate sum on columns */
export type IDonations_Sum_Fields = {
  __typename?: 'Donations_sum_fields'
  amount?: Maybe<FieldWrapper<Scalars['numeric']>>
  fee?: Maybe<FieldWrapper<Scalars['numeric']>>
}

/** order by sum() on columns of table "Donations" */
export type IDonations_Sum_Order_By = {
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
}

/** update columns of table "Donations" */
export enum Donations_Update_Column {
  /** column name */
  amount = 'amount',
  /** column name */
  fee = 'fee',
  /** column name */
  id = 'id',
  /** column name */
  state = 'state',
  /** column name */
  topUpId = 'topUpId',
  /** column name */
  txHash = 'txHash',
  /** column name */
  type = 'type',
  /** column name */
  userId = 'userId',
}

/** aggregate var_pop on columns */
export type IDonations_Var_Pop_Fields = {
  __typename?: 'Donations_var_pop_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
  fee?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by var_pop() on columns of table "Donations" */
export type IDonations_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type IDonations_Var_Samp_Fields = {
  __typename?: 'Donations_var_samp_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
  fee?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by var_samp() on columns of table "Donations" */
export type IDonations_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type IDonations_Variance_Fields = {
  __typename?: 'Donations_variance_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
  fee?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by variance() on columns of table "Donations" */
export type IDonations_Variance_Order_By = {
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
}

export type IExampleEntity = {
  __typename?: 'ExampleEntity'
  OnChainUser?: Maybe<FieldWrapper<IUser>>
  count: FieldWrapper<Scalars['BigInt']>
  donation_amount: FieldWrapper<Scalars['BigInt']>
  donation_donor: FieldWrapper<Scalars['Bytes']>
  id: FieldWrapper<Scalars['ID']>
}

export type IExampleEntity_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<IBlockChangedFilter>
  count?: InputMaybe<Scalars['BigInt']>
  count_gt?: InputMaybe<Scalars['BigInt']>
  count_gte?: InputMaybe<Scalars['BigInt']>
  count_in?: InputMaybe<Array<Scalars['BigInt']>>
  count_lt?: InputMaybe<Scalars['BigInt']>
  count_lte?: InputMaybe<Scalars['BigInt']>
  count_not?: InputMaybe<Scalars['BigInt']>
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  donation_amount?: InputMaybe<Scalars['BigInt']>
  donation_amount_gt?: InputMaybe<Scalars['BigInt']>
  donation_amount_gte?: InputMaybe<Scalars['BigInt']>
  donation_amount_in?: InputMaybe<Array<Scalars['BigInt']>>
  donation_amount_lt?: InputMaybe<Scalars['BigInt']>
  donation_amount_lte?: InputMaybe<Scalars['BigInt']>
  donation_amount_not?: InputMaybe<Scalars['BigInt']>
  donation_amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  donation_donor?: InputMaybe<Scalars['Bytes']>
  donation_donor_contains?: InputMaybe<Scalars['Bytes']>
  donation_donor_in?: InputMaybe<Array<Scalars['Bytes']>>
  donation_donor_not?: InputMaybe<Scalars['Bytes']>
  donation_donor_not_contains?: InputMaybe<Scalars['Bytes']>
  donation_donor_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
}

export enum ExampleEntity_OrderBy {
  count = 'count',
  donation_amount = 'donation_amount',
  donation_donor = 'donation_donor',
  id = 'id',
}

/** columns and relationships of "Follows" */
export type IFollows = {
  __typename?: 'Follows'
  /** An object relationship */
  grant: FieldWrapper<IGrants>
  grantId: FieldWrapper<Scalars['uuid']>
  id: FieldWrapper<Scalars['uuid']>
  type: FieldWrapper<Scalars['String']>
  /** An object relationship */
  user: FieldWrapper<IUser>
  userId: FieldWrapper<Scalars['uuid']>
}

/** aggregated selection of "Follows" */
export type IFollows_Aggregate = {
  __typename?: 'Follows_aggregate'
  aggregate?: Maybe<FieldWrapper<IFollows_Aggregate_Fields>>
  nodes: Array<FieldWrapper<IFollows>>
}

/** aggregate fields of "Follows" */
export type IFollows_Aggregate_Fields = {
  __typename?: 'Follows_aggregate_fields'
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<IFollows_Max_Fields>>
  min?: Maybe<FieldWrapper<IFollows_Min_Fields>>
}

/** aggregate fields of "Follows" */
export type IFollows_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Follows_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "Follows" */
export type IFollows_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>
  max?: InputMaybe<IFollows_Max_Order_By>
  min?: InputMaybe<IFollows_Min_Order_By>
}

/** input type for inserting array relation for remote table "Follows" */
export type IFollows_Arr_Rel_Insert_Input = {
  data: Array<IFollows_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<IFollows_On_Conflict>
}

/** Boolean expression to filter rows from the table "Follows". All fields are combined with a logical 'AND'. */
export type IFollows_Bool_Exp = {
  _and?: InputMaybe<Array<IFollows_Bool_Exp>>
  _not?: InputMaybe<IFollows_Bool_Exp>
  _or?: InputMaybe<Array<IFollows_Bool_Exp>>
  grant?: InputMaybe<IGrants_Bool_Exp>
  grantId?: InputMaybe<IUuid_Comparison_Exp>
  id?: InputMaybe<IUuid_Comparison_Exp>
  type?: InputMaybe<IString_Comparison_Exp>
  user?: InputMaybe<IUser_Bool_Exp>
  userId?: InputMaybe<IUuid_Comparison_Exp>
}

/** unique or primary key constraints on table "Follows" */
export enum Follows_Constraint {
  /** unique or primary key constraint */
  Follows_pkey = 'Follows_pkey',
}

/** input type for inserting data into table "Follows" */
export type IFollows_Insert_Input = {
  grant?: InputMaybe<IGrants_Obj_Rel_Insert_Input>
  grantId?: InputMaybe<Scalars['uuid']>
  id?: InputMaybe<Scalars['uuid']>
  type?: InputMaybe<Scalars['String']>
  user?: InputMaybe<IUser_Obj_Rel_Insert_Input>
  userId?: InputMaybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type IFollows_Max_Fields = {
  __typename?: 'Follows_max_fields'
  grantId?: Maybe<FieldWrapper<Scalars['uuid']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  type?: Maybe<FieldWrapper<Scalars['String']>>
  userId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** order by max() on columns of table "Follows" */
export type IFollows_Max_Order_By = {
  grantId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
  userId?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type IFollows_Min_Fields = {
  __typename?: 'Follows_min_fields'
  grantId?: Maybe<FieldWrapper<Scalars['uuid']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  type?: Maybe<FieldWrapper<Scalars['String']>>
  userId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** order by min() on columns of table "Follows" */
export type IFollows_Min_Order_By = {
  grantId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
  userId?: InputMaybe<Order_By>
}

/** response of any mutation on the table "Follows" */
export type IFollows_Mutation_Response = {
  __typename?: 'Follows_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<IFollows>>
}

/** on_conflict condition type for table "Follows" */
export type IFollows_On_Conflict = {
  constraint: Follows_Constraint
  update_columns?: Array<Follows_Update_Column>
  where?: InputMaybe<IFollows_Bool_Exp>
}

/** Ordering options when selecting data from "Follows". */
export type IFollows_Order_By = {
  grant?: InputMaybe<IGrants_Order_By>
  grantId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
  user?: InputMaybe<IUser_Order_By>
  userId?: InputMaybe<Order_By>
}

/** primary key columns input for table: Follows */
export type IFollows_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "Follows" */
export enum Follows_Select_Column {
  /** column name */
  grantId = 'grantId',
  /** column name */
  id = 'id',
  /** column name */
  type = 'type',
  /** column name */
  userId = 'userId',
}

/** input type for updating data in table "Follows" */
export type IFollows_Set_Input = {
  grantId?: InputMaybe<Scalars['uuid']>
  id?: InputMaybe<Scalars['uuid']>
  type?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['uuid']>
}

/** update columns of table "Follows" */
export enum Follows_Update_Column {
  /** column name */
  grantId = 'grantId',
  /** column name */
  id = 'id',
  /** column name */
  type = 'type',
  /** column name */
  userId = 'userId',
}

/** columns and relationships of "GrantCategories" */
export type IGrantCategories = {
  __typename?: 'GrantCategories'
  /** An array relationship */
  bridgeWithGrant: Array<FieldWrapper<IGrantCategoriesBridge>>
  /** An aggregate relationship */
  bridgeWithGrant_aggregate: FieldWrapper<IGrantCategoriesBridge_Aggregate>
  id: FieldWrapper<Scalars['uuid']>
  label: FieldWrapper<Scalars['String']>
  value: FieldWrapper<Scalars['String']>
}

/** columns and relationships of "GrantCategories" */
export type IGrantCategoriesBridgeWithGrantArgs = {
  distinct_on?: InputMaybe<Array<GrantCategoriesBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantCategoriesBridge_Order_By>>
  where?: InputMaybe<IGrantCategoriesBridge_Bool_Exp>
}

/** columns and relationships of "GrantCategories" */
export type IGrantCategoriesBridgeWithGrant_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantCategoriesBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantCategoriesBridge_Order_By>>
  where?: InputMaybe<IGrantCategoriesBridge_Bool_Exp>
}

/** columns and relationships of "GrantCategoriesBridge" */
export type IGrantCategoriesBridge = {
  __typename?: 'GrantCategoriesBridge'
  /** An object relationship */
  category: FieldWrapper<IGrantCategories>
  categoryId: FieldWrapper<Scalars['uuid']>
  /** An object relationship */
  grant: FieldWrapper<IGrants>
  grantId: FieldWrapper<Scalars['uuid']>
  id: FieldWrapper<Scalars['uuid']>
}

/** aggregated selection of "GrantCategoriesBridge" */
export type IGrantCategoriesBridge_Aggregate = {
  __typename?: 'GrantCategoriesBridge_aggregate'
  aggregate?: Maybe<FieldWrapper<IGrantCategoriesBridge_Aggregate_Fields>>
  nodes: Array<FieldWrapper<IGrantCategoriesBridge>>
}

/** aggregate fields of "GrantCategoriesBridge" */
export type IGrantCategoriesBridge_Aggregate_Fields = {
  __typename?: 'GrantCategoriesBridge_aggregate_fields'
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<IGrantCategoriesBridge_Max_Fields>>
  min?: Maybe<FieldWrapper<IGrantCategoriesBridge_Min_Fields>>
}

/** aggregate fields of "GrantCategoriesBridge" */
export type IGrantCategoriesBridge_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GrantCategoriesBridge_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "GrantCategoriesBridge" */
export type IGrantCategoriesBridge_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>
  max?: InputMaybe<IGrantCategoriesBridge_Max_Order_By>
  min?: InputMaybe<IGrantCategoriesBridge_Min_Order_By>
}

/** input type for inserting array relation for remote table "GrantCategoriesBridge" */
export type IGrantCategoriesBridge_Arr_Rel_Insert_Input = {
  data: Array<IGrantCategoriesBridge_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<IGrantCategoriesBridge_On_Conflict>
}

/** Boolean expression to filter rows from the table "GrantCategoriesBridge". All fields are combined with a logical 'AND'. */
export type IGrantCategoriesBridge_Bool_Exp = {
  _and?: InputMaybe<Array<IGrantCategoriesBridge_Bool_Exp>>
  _not?: InputMaybe<IGrantCategoriesBridge_Bool_Exp>
  _or?: InputMaybe<Array<IGrantCategoriesBridge_Bool_Exp>>
  category?: InputMaybe<IGrantCategories_Bool_Exp>
  categoryId?: InputMaybe<IUuid_Comparison_Exp>
  grant?: InputMaybe<IGrants_Bool_Exp>
  grantId?: InputMaybe<IUuid_Comparison_Exp>
  id?: InputMaybe<IUuid_Comparison_Exp>
}

/** unique or primary key constraints on table "GrantCategoriesBridge" */
export enum GrantCategoriesBridge_Constraint {
  /** unique or primary key constraint */
  GrantCategoriesBridge_pkey = 'GrantCategoriesBridge_pkey',
}

/** input type for inserting data into table "GrantCategoriesBridge" */
export type IGrantCategoriesBridge_Insert_Input = {
  category?: InputMaybe<IGrantCategories_Obj_Rel_Insert_Input>
  categoryId?: InputMaybe<Scalars['uuid']>
  grant?: InputMaybe<IGrants_Obj_Rel_Insert_Input>
  grantId?: InputMaybe<Scalars['uuid']>
  id?: InputMaybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type IGrantCategoriesBridge_Max_Fields = {
  __typename?: 'GrantCategoriesBridge_max_fields'
  categoryId?: Maybe<FieldWrapper<Scalars['uuid']>>
  grantId?: Maybe<FieldWrapper<Scalars['uuid']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** order by max() on columns of table "GrantCategoriesBridge" */
export type IGrantCategoriesBridge_Max_Order_By = {
  categoryId?: InputMaybe<Order_By>
  grantId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type IGrantCategoriesBridge_Min_Fields = {
  __typename?: 'GrantCategoriesBridge_min_fields'
  categoryId?: Maybe<FieldWrapper<Scalars['uuid']>>
  grantId?: Maybe<FieldWrapper<Scalars['uuid']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** order by min() on columns of table "GrantCategoriesBridge" */
export type IGrantCategoriesBridge_Min_Order_By = {
  categoryId?: InputMaybe<Order_By>
  grantId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
}

/** response of any mutation on the table "GrantCategoriesBridge" */
export type IGrantCategoriesBridge_Mutation_Response = {
  __typename?: 'GrantCategoriesBridge_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<IGrantCategoriesBridge>>
}

/** on_conflict condition type for table "GrantCategoriesBridge" */
export type IGrantCategoriesBridge_On_Conflict = {
  constraint: GrantCategoriesBridge_Constraint
  update_columns?: Array<GrantCategoriesBridge_Update_Column>
  where?: InputMaybe<IGrantCategoriesBridge_Bool_Exp>
}

/** Ordering options when selecting data from "GrantCategoriesBridge". */
export type IGrantCategoriesBridge_Order_By = {
  category?: InputMaybe<IGrantCategories_Order_By>
  categoryId?: InputMaybe<Order_By>
  grant?: InputMaybe<IGrants_Order_By>
  grantId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
}

/** primary key columns input for table: GrantCategoriesBridge */
export type IGrantCategoriesBridge_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "GrantCategoriesBridge" */
export enum GrantCategoriesBridge_Select_Column {
  /** column name */
  categoryId = 'categoryId',
  /** column name */
  grantId = 'grantId',
  /** column name */
  id = 'id',
}

/** input type for updating data in table "GrantCategoriesBridge" */
export type IGrantCategoriesBridge_Set_Input = {
  categoryId?: InputMaybe<Scalars['uuid']>
  grantId?: InputMaybe<Scalars['uuid']>
  id?: InputMaybe<Scalars['uuid']>
}

/** update columns of table "GrantCategoriesBridge" */
export enum GrantCategoriesBridge_Update_Column {
  /** column name */
  categoryId = 'categoryId',
  /** column name */
  grantId = 'grantId',
  /** column name */
  id = 'id',
}

/** aggregated selection of "GrantCategories" */
export type IGrantCategories_Aggregate = {
  __typename?: 'GrantCategories_aggregate'
  aggregate?: Maybe<FieldWrapper<IGrantCategories_Aggregate_Fields>>
  nodes: Array<FieldWrapper<IGrantCategories>>
}

/** aggregate fields of "GrantCategories" */
export type IGrantCategories_Aggregate_Fields = {
  __typename?: 'GrantCategories_aggregate_fields'
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<IGrantCategories_Max_Fields>>
  min?: Maybe<FieldWrapper<IGrantCategories_Min_Fields>>
}

/** aggregate fields of "GrantCategories" */
export type IGrantCategories_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GrantCategories_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "GrantCategories". All fields are combined with a logical 'AND'. */
export type IGrantCategories_Bool_Exp = {
  _and?: InputMaybe<Array<IGrantCategories_Bool_Exp>>
  _not?: InputMaybe<IGrantCategories_Bool_Exp>
  _or?: InputMaybe<Array<IGrantCategories_Bool_Exp>>
  bridgeWithGrant?: InputMaybe<IGrantCategoriesBridge_Bool_Exp>
  id?: InputMaybe<IUuid_Comparison_Exp>
  label?: InputMaybe<IString_Comparison_Exp>
  value?: InputMaybe<IString_Comparison_Exp>
}

/** unique or primary key constraints on table "GrantCategories" */
export enum GrantCategories_Constraint {
  /** unique or primary key constraint */
  GrantCategories_pkey = 'GrantCategories_pkey',
  /** unique or primary key constraint */
  GrantCategories_value_key = 'GrantCategories_value_key',
}

/** input type for inserting data into table "GrantCategories" */
export type IGrantCategories_Insert_Input = {
  bridgeWithGrant?: InputMaybe<IGrantCategoriesBridge_Arr_Rel_Insert_Input>
  id?: InputMaybe<Scalars['uuid']>
  label?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
}

/** aggregate max on columns */
export type IGrantCategories_Max_Fields = {
  __typename?: 'GrantCategories_max_fields'
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  label?: Maybe<FieldWrapper<Scalars['String']>>
  value?: Maybe<FieldWrapper<Scalars['String']>>
}

/** aggregate min on columns */
export type IGrantCategories_Min_Fields = {
  __typename?: 'GrantCategories_min_fields'
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  label?: Maybe<FieldWrapper<Scalars['String']>>
  value?: Maybe<FieldWrapper<Scalars['String']>>
}

/** response of any mutation on the table "GrantCategories" */
export type IGrantCategories_Mutation_Response = {
  __typename?: 'GrantCategories_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<IGrantCategories>>
}

/** input type for inserting object relation for remote table "GrantCategories" */
export type IGrantCategories_Obj_Rel_Insert_Input = {
  data: IGrantCategories_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<IGrantCategories_On_Conflict>
}

/** on_conflict condition type for table "GrantCategories" */
export type IGrantCategories_On_Conflict = {
  constraint: GrantCategories_Constraint
  update_columns?: Array<GrantCategories_Update_Column>
  where?: InputMaybe<IGrantCategories_Bool_Exp>
}

/** Ordering options when selecting data from "GrantCategories". */
export type IGrantCategories_Order_By = {
  bridgeWithGrant_aggregate?: InputMaybe<IGrantCategoriesBridge_Aggregate_Order_By>
  id?: InputMaybe<Order_By>
  label?: InputMaybe<Order_By>
  value?: InputMaybe<Order_By>
}

/** primary key columns input for table: GrantCategories */
export type IGrantCategories_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "GrantCategories" */
export enum GrantCategories_Select_Column {
  /** column name */
  id = 'id',
  /** column name */
  label = 'label',
  /** column name */
  value = 'value',
}

/** input type for updating data in table "GrantCategories" */
export type IGrantCategories_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>
  label?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
}

/** update columns of table "GrantCategories" */
export enum GrantCategories_Update_Column {
  /** column name */
  id = 'id',
  /** column name */
  label = 'label',
  /** column name */
  value = 'value',
}

/** columns and relationships of "GrantCycles" */
export type IGrantCycles = {
  __typename?: 'GrantCycles'
  awardDate?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  created_at?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  currentInvested?: Maybe<FieldWrapper<Scalars['Int']>>
  finalistsDeadline?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  goalInvested?: Maybe<FieldWrapper<Scalars['Int']>>
  /** An object relationship */
  grant: FieldWrapper<IGrants>
  grantCycleId: FieldWrapper<Scalars['String']>
  grantId: FieldWrapper<Scalars['uuid']>
  id: FieldWrapper<Scalars['uuid']>
  numberOfFinalists?: Maybe<FieldWrapper<Scalars['Int']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Int']>>
  openDate?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  stage?: Maybe<FieldWrapper<Scalars['json']>>
  submissionDeadline?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  /** An array relationship */
  submissions: Array<FieldWrapper<IGrantSubmissions>>
  /** An aggregate relationship */
  submissions_aggregate: FieldWrapper<IGrantSubmissions_Aggregate>
}

/** columns and relationships of "GrantCycles" */
export type IGrantCyclesStageArgs = {
  path?: InputMaybe<Scalars['String']>
}

/** columns and relationships of "GrantCycles" */
export type IGrantCyclesSubmissionsArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantSubmissions_Order_By>>
  where?: InputMaybe<IGrantSubmissions_Bool_Exp>
}

/** columns and relationships of "GrantCycles" */
export type IGrantCyclesSubmissions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantSubmissions_Order_By>>
  where?: InputMaybe<IGrantSubmissions_Bool_Exp>
}

/** aggregated selection of "GrantCycles" */
export type IGrantCycles_Aggregate = {
  __typename?: 'GrantCycles_aggregate'
  aggregate?: Maybe<FieldWrapper<IGrantCycles_Aggregate_Fields>>
  nodes: Array<FieldWrapper<IGrantCycles>>
}

/** aggregate fields of "GrantCycles" */
export type IGrantCycles_Aggregate_Fields = {
  __typename?: 'GrantCycles_aggregate_fields'
  avg?: Maybe<FieldWrapper<IGrantCycles_Avg_Fields>>
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<IGrantCycles_Max_Fields>>
  min?: Maybe<FieldWrapper<IGrantCycles_Min_Fields>>
  stddev?: Maybe<FieldWrapper<IGrantCycles_Stddev_Fields>>
  stddev_pop?: Maybe<FieldWrapper<IGrantCycles_Stddev_Pop_Fields>>
  stddev_samp?: Maybe<FieldWrapper<IGrantCycles_Stddev_Samp_Fields>>
  sum?: Maybe<FieldWrapper<IGrantCycles_Sum_Fields>>
  var_pop?: Maybe<FieldWrapper<IGrantCycles_Var_Pop_Fields>>
  var_samp?: Maybe<FieldWrapper<IGrantCycles_Var_Samp_Fields>>
  variance?: Maybe<FieldWrapper<IGrantCycles_Variance_Fields>>
}

/** aggregate fields of "GrantCycles" */
export type IGrantCycles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GrantCycles_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "GrantCycles" */
export type IGrantCycles_Aggregate_Order_By = {
  avg?: InputMaybe<IGrantCycles_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<IGrantCycles_Max_Order_By>
  min?: InputMaybe<IGrantCycles_Min_Order_By>
  stddev?: InputMaybe<IGrantCycles_Stddev_Order_By>
  stddev_pop?: InputMaybe<IGrantCycles_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<IGrantCycles_Stddev_Samp_Order_By>
  sum?: InputMaybe<IGrantCycles_Sum_Order_By>
  var_pop?: InputMaybe<IGrantCycles_Var_Pop_Order_By>
  var_samp?: InputMaybe<IGrantCycles_Var_Samp_Order_By>
  variance?: InputMaybe<IGrantCycles_Variance_Order_By>
}

/** input type for inserting array relation for remote table "GrantCycles" */
export type IGrantCycles_Arr_Rel_Insert_Input = {
  data: Array<IGrantCycles_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<IGrantCycles_On_Conflict>
}

/** aggregate avg on columns */
export type IGrantCycles_Avg_Fields = {
  __typename?: 'GrantCycles_avg_fields'
  currentInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  goalInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  numberOfFinalists?: Maybe<FieldWrapper<Scalars['Float']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by avg() on columns of table "GrantCycles" */
export type IGrantCycles_Avg_Order_By = {
  currentInvested?: InputMaybe<Order_By>
  goalInvested?: InputMaybe<Order_By>
  numberOfFinalists?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "GrantCycles". All fields are combined with a logical 'AND'. */
export type IGrantCycles_Bool_Exp = {
  _and?: InputMaybe<Array<IGrantCycles_Bool_Exp>>
  _not?: InputMaybe<IGrantCycles_Bool_Exp>
  _or?: InputMaybe<Array<IGrantCycles_Bool_Exp>>
  awardDate?: InputMaybe<ITimestamptz_Comparison_Exp>
  created_at?: InputMaybe<ITimestamptz_Comparison_Exp>
  currentInvested?: InputMaybe<IInt_Comparison_Exp>
  finalistsDeadline?: InputMaybe<ITimestamptz_Comparison_Exp>
  goalInvested?: InputMaybe<IInt_Comparison_Exp>
  grant?: InputMaybe<IGrants_Bool_Exp>
  grantCycleId?: InputMaybe<IString_Comparison_Exp>
  grantId?: InputMaybe<IUuid_Comparison_Exp>
  id?: InputMaybe<IUuid_Comparison_Exp>
  numberOfFinalists?: InputMaybe<IInt_Comparison_Exp>
  onChainId?: InputMaybe<IInt_Comparison_Exp>
  openDate?: InputMaybe<ITimestamptz_Comparison_Exp>
  stage?: InputMaybe<IJson_Comparison_Exp>
  submissionDeadline?: InputMaybe<ITimestamptz_Comparison_Exp>
  submissions?: InputMaybe<IGrantSubmissions_Bool_Exp>
}

/** unique or primary key constraints on table "GrantCycles" */
export enum GrantCycles_Constraint {
  /** unique or primary key constraint */
  GrantCycles_pkey = 'GrantCycles_pkey',
}

/** input type for incrementing numeric columns in table "GrantCycles" */
export type IGrantCycles_Inc_Input = {
  currentInvested?: InputMaybe<Scalars['Int']>
  goalInvested?: InputMaybe<Scalars['Int']>
  numberOfFinalists?: InputMaybe<Scalars['Int']>
  onChainId?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "GrantCycles" */
export type IGrantCycles_Insert_Input = {
  awardDate?: InputMaybe<Scalars['timestamptz']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  currentInvested?: InputMaybe<Scalars['Int']>
  finalistsDeadline?: InputMaybe<Scalars['timestamptz']>
  goalInvested?: InputMaybe<Scalars['Int']>
  grant?: InputMaybe<IGrants_Obj_Rel_Insert_Input>
  grantCycleId?: InputMaybe<Scalars['String']>
  grantId?: InputMaybe<Scalars['uuid']>
  id?: InputMaybe<Scalars['uuid']>
  numberOfFinalists?: InputMaybe<Scalars['Int']>
  onChainId?: InputMaybe<Scalars['Int']>
  openDate?: InputMaybe<Scalars['timestamptz']>
  stage?: InputMaybe<Scalars['json']>
  submissionDeadline?: InputMaybe<Scalars['timestamptz']>
  submissions?: InputMaybe<IGrantSubmissions_Arr_Rel_Insert_Input>
}

/** aggregate max on columns */
export type IGrantCycles_Max_Fields = {
  __typename?: 'GrantCycles_max_fields'
  awardDate?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  created_at?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  currentInvested?: Maybe<FieldWrapper<Scalars['Int']>>
  finalistsDeadline?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  goalInvested?: Maybe<FieldWrapper<Scalars['Int']>>
  grantCycleId?: Maybe<FieldWrapper<Scalars['String']>>
  grantId?: Maybe<FieldWrapper<Scalars['uuid']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  numberOfFinalists?: Maybe<FieldWrapper<Scalars['Int']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Int']>>
  openDate?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  submissionDeadline?: Maybe<FieldWrapper<Scalars['timestamptz']>>
}

/** order by max() on columns of table "GrantCycles" */
export type IGrantCycles_Max_Order_By = {
  awardDate?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  currentInvested?: InputMaybe<Order_By>
  finalistsDeadline?: InputMaybe<Order_By>
  goalInvested?: InputMaybe<Order_By>
  grantCycleId?: InputMaybe<Order_By>
  grantId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  numberOfFinalists?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
  openDate?: InputMaybe<Order_By>
  submissionDeadline?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type IGrantCycles_Min_Fields = {
  __typename?: 'GrantCycles_min_fields'
  awardDate?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  created_at?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  currentInvested?: Maybe<FieldWrapper<Scalars['Int']>>
  finalistsDeadline?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  goalInvested?: Maybe<FieldWrapper<Scalars['Int']>>
  grantCycleId?: Maybe<FieldWrapper<Scalars['String']>>
  grantId?: Maybe<FieldWrapper<Scalars['uuid']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  numberOfFinalists?: Maybe<FieldWrapper<Scalars['Int']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Int']>>
  openDate?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  submissionDeadline?: Maybe<FieldWrapper<Scalars['timestamptz']>>
}

/** order by min() on columns of table "GrantCycles" */
export type IGrantCycles_Min_Order_By = {
  awardDate?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  currentInvested?: InputMaybe<Order_By>
  finalistsDeadline?: InputMaybe<Order_By>
  goalInvested?: InputMaybe<Order_By>
  grantCycleId?: InputMaybe<Order_By>
  grantId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  numberOfFinalists?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
  openDate?: InputMaybe<Order_By>
  submissionDeadline?: InputMaybe<Order_By>
}

/** response of any mutation on the table "GrantCycles" */
export type IGrantCycles_Mutation_Response = {
  __typename?: 'GrantCycles_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<IGrantCycles>>
}

/** input type for inserting object relation for remote table "GrantCycles" */
export type IGrantCycles_Obj_Rel_Insert_Input = {
  data: IGrantCycles_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<IGrantCycles_On_Conflict>
}

/** on_conflict condition type for table "GrantCycles" */
export type IGrantCycles_On_Conflict = {
  constraint: GrantCycles_Constraint
  update_columns?: Array<GrantCycles_Update_Column>
  where?: InputMaybe<IGrantCycles_Bool_Exp>
}

/** Ordering options when selecting data from "GrantCycles". */
export type IGrantCycles_Order_By = {
  awardDate?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  currentInvested?: InputMaybe<Order_By>
  finalistsDeadline?: InputMaybe<Order_By>
  goalInvested?: InputMaybe<Order_By>
  grant?: InputMaybe<IGrants_Order_By>
  grantCycleId?: InputMaybe<Order_By>
  grantId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  numberOfFinalists?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
  openDate?: InputMaybe<Order_By>
  stage?: InputMaybe<Order_By>
  submissionDeadline?: InputMaybe<Order_By>
  submissions_aggregate?: InputMaybe<IGrantSubmissions_Aggregate_Order_By>
}

/** primary key columns input for table: GrantCycles */
export type IGrantCycles_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "GrantCycles" */
export enum GrantCycles_Select_Column {
  /** column name */
  awardDate = 'awardDate',
  /** column name */
  created_at = 'created_at',
  /** column name */
  currentInvested = 'currentInvested',
  /** column name */
  finalistsDeadline = 'finalistsDeadline',
  /** column name */
  goalInvested = 'goalInvested',
  /** column name */
  grantCycleId = 'grantCycleId',
  /** column name */
  grantId = 'grantId',
  /** column name */
  id = 'id',
  /** column name */
  numberOfFinalists = 'numberOfFinalists',
  /** column name */
  onChainId = 'onChainId',
  /** column name */
  openDate = 'openDate',
  /** column name */
  stage = 'stage',
  /** column name */
  submissionDeadline = 'submissionDeadline',
}

/** input type for updating data in table "GrantCycles" */
export type IGrantCycles_Set_Input = {
  awardDate?: InputMaybe<Scalars['timestamptz']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  currentInvested?: InputMaybe<Scalars['Int']>
  finalistsDeadline?: InputMaybe<Scalars['timestamptz']>
  goalInvested?: InputMaybe<Scalars['Int']>
  grantCycleId?: InputMaybe<Scalars['String']>
  grantId?: InputMaybe<Scalars['uuid']>
  id?: InputMaybe<Scalars['uuid']>
  numberOfFinalists?: InputMaybe<Scalars['Int']>
  onChainId?: InputMaybe<Scalars['Int']>
  openDate?: InputMaybe<Scalars['timestamptz']>
  stage?: InputMaybe<Scalars['json']>
  submissionDeadline?: InputMaybe<Scalars['timestamptz']>
}

/** aggregate stddev on columns */
export type IGrantCycles_Stddev_Fields = {
  __typename?: 'GrantCycles_stddev_fields'
  currentInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  goalInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  numberOfFinalists?: Maybe<FieldWrapper<Scalars['Float']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev() on columns of table "GrantCycles" */
export type IGrantCycles_Stddev_Order_By = {
  currentInvested?: InputMaybe<Order_By>
  goalInvested?: InputMaybe<Order_By>
  numberOfFinalists?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type IGrantCycles_Stddev_Pop_Fields = {
  __typename?: 'GrantCycles_stddev_pop_fields'
  currentInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  goalInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  numberOfFinalists?: Maybe<FieldWrapper<Scalars['Float']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev_pop() on columns of table "GrantCycles" */
export type IGrantCycles_Stddev_Pop_Order_By = {
  currentInvested?: InputMaybe<Order_By>
  goalInvested?: InputMaybe<Order_By>
  numberOfFinalists?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type IGrantCycles_Stddev_Samp_Fields = {
  __typename?: 'GrantCycles_stddev_samp_fields'
  currentInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  goalInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  numberOfFinalists?: Maybe<FieldWrapper<Scalars['Float']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev_samp() on columns of table "GrantCycles" */
export type IGrantCycles_Stddev_Samp_Order_By = {
  currentInvested?: InputMaybe<Order_By>
  goalInvested?: InputMaybe<Order_By>
  numberOfFinalists?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
}

/** aggregate sum on columns */
export type IGrantCycles_Sum_Fields = {
  __typename?: 'GrantCycles_sum_fields'
  currentInvested?: Maybe<FieldWrapper<Scalars['Int']>>
  goalInvested?: Maybe<FieldWrapper<Scalars['Int']>>
  numberOfFinalists?: Maybe<FieldWrapper<Scalars['Int']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Int']>>
}

/** order by sum() on columns of table "GrantCycles" */
export type IGrantCycles_Sum_Order_By = {
  currentInvested?: InputMaybe<Order_By>
  goalInvested?: InputMaybe<Order_By>
  numberOfFinalists?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
}

/** update columns of table "GrantCycles" */
export enum GrantCycles_Update_Column {
  /** column name */
  awardDate = 'awardDate',
  /** column name */
  created_at = 'created_at',
  /** column name */
  currentInvested = 'currentInvested',
  /** column name */
  finalistsDeadline = 'finalistsDeadline',
  /** column name */
  goalInvested = 'goalInvested',
  /** column name */
  grantCycleId = 'grantCycleId',
  /** column name */
  grantId = 'grantId',
  /** column name */
  id = 'id',
  /** column name */
  numberOfFinalists = 'numberOfFinalists',
  /** column name */
  onChainId = 'onChainId',
  /** column name */
  openDate = 'openDate',
  /** column name */
  stage = 'stage',
  /** column name */
  submissionDeadline = 'submissionDeadline',
}

/** aggregate var_pop on columns */
export type IGrantCycles_Var_Pop_Fields = {
  __typename?: 'GrantCycles_var_pop_fields'
  currentInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  goalInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  numberOfFinalists?: Maybe<FieldWrapper<Scalars['Float']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by var_pop() on columns of table "GrantCycles" */
export type IGrantCycles_Var_Pop_Order_By = {
  currentInvested?: InputMaybe<Order_By>
  goalInvested?: InputMaybe<Order_By>
  numberOfFinalists?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type IGrantCycles_Var_Samp_Fields = {
  __typename?: 'GrantCycles_var_samp_fields'
  currentInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  goalInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  numberOfFinalists?: Maybe<FieldWrapper<Scalars['Float']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by var_samp() on columns of table "GrantCycles" */
export type IGrantCycles_Var_Samp_Order_By = {
  currentInvested?: InputMaybe<Order_By>
  goalInvested?: InputMaybe<Order_By>
  numberOfFinalists?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type IGrantCycles_Variance_Fields = {
  __typename?: 'GrantCycles_variance_fields'
  currentInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  goalInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  numberOfFinalists?: Maybe<FieldWrapper<Scalars['Float']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by variance() on columns of table "GrantCycles" */
export type IGrantCycles_Variance_Order_By = {
  currentInvested?: InputMaybe<Order_By>
  goalInvested?: InputMaybe<Order_By>
  numberOfFinalists?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
}

/** columns and relationships of "GrantOwners" */
export type IGrantOwners = {
  __typename?: 'GrantOwners'
  availableVotes: FieldWrapper<Scalars['numeric']>
  id: FieldWrapper<Scalars['uuid']>
  /** An object relationship */
  tier?: Maybe<FieldWrapper<IGrantOwnersTiers>>
  tierId?: Maybe<FieldWrapper<Scalars['uuid']>>
  /** An object relationship */
  user: FieldWrapper<IUser>
  userId: FieldWrapper<Scalars['uuid']>
}

/** columns and relationships of "GrantOwnersTiers" */
export type IGrantOwnersTiers = {
  __typename?: 'GrantOwnersTiers'
  administrationRights?: Maybe<FieldWrapper<Scalars['Boolean']>>
  curationVotes: FieldWrapper<Scalars['numeric']>
  description?: Maybe<FieldWrapper<Scalars['String']>>
  extraFeatures?: Maybe<FieldWrapper<Scalars['json']>>
  /** An object relationship */
  grant: FieldWrapper<IGrants>
  grantId: FieldWrapper<Scalars['uuid']>
  id: FieldWrapper<Scalars['uuid']>
  name: FieldWrapper<Scalars['String']>
  /** An array relationship */
  owners: Array<FieldWrapper<IGrantOwners>>
  /** An aggregate relationship */
  owners_aggregate: FieldWrapper<IGrantOwners_Aggregate>
}

/** columns and relationships of "GrantOwnersTiers" */
export type IGrantOwnersTiersExtraFeaturesArgs = {
  path?: InputMaybe<Scalars['String']>
}

/** columns and relationships of "GrantOwnersTiers" */
export type IGrantOwnersTiersOwnersArgs = {
  distinct_on?: InputMaybe<Array<GrantOwners_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantOwners_Order_By>>
  where?: InputMaybe<IGrantOwners_Bool_Exp>
}

/** columns and relationships of "GrantOwnersTiers" */
export type IGrantOwnersTiersOwners_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantOwners_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantOwners_Order_By>>
  where?: InputMaybe<IGrantOwners_Bool_Exp>
}

/** aggregated selection of "GrantOwnersTiers" */
export type IGrantOwnersTiers_Aggregate = {
  __typename?: 'GrantOwnersTiers_aggregate'
  aggregate?: Maybe<FieldWrapper<IGrantOwnersTiers_Aggregate_Fields>>
  nodes: Array<FieldWrapper<IGrantOwnersTiers>>
}

/** aggregate fields of "GrantOwnersTiers" */
export type IGrantOwnersTiers_Aggregate_Fields = {
  __typename?: 'GrantOwnersTiers_aggregate_fields'
  avg?: Maybe<FieldWrapper<IGrantOwnersTiers_Avg_Fields>>
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<IGrantOwnersTiers_Max_Fields>>
  min?: Maybe<FieldWrapper<IGrantOwnersTiers_Min_Fields>>
  stddev?: Maybe<FieldWrapper<IGrantOwnersTiers_Stddev_Fields>>
  stddev_pop?: Maybe<FieldWrapper<IGrantOwnersTiers_Stddev_Pop_Fields>>
  stddev_samp?: Maybe<FieldWrapper<IGrantOwnersTiers_Stddev_Samp_Fields>>
  sum?: Maybe<FieldWrapper<IGrantOwnersTiers_Sum_Fields>>
  var_pop?: Maybe<FieldWrapper<IGrantOwnersTiers_Var_Pop_Fields>>
  var_samp?: Maybe<FieldWrapper<IGrantOwnersTiers_Var_Samp_Fields>>
  variance?: Maybe<FieldWrapper<IGrantOwnersTiers_Variance_Fields>>
}

/** aggregate fields of "GrantOwnersTiers" */
export type IGrantOwnersTiers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GrantOwnersTiers_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "GrantOwnersTiers" */
export type IGrantOwnersTiers_Aggregate_Order_By = {
  avg?: InputMaybe<IGrantOwnersTiers_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<IGrantOwnersTiers_Max_Order_By>
  min?: InputMaybe<IGrantOwnersTiers_Min_Order_By>
  stddev?: InputMaybe<IGrantOwnersTiers_Stddev_Order_By>
  stddev_pop?: InputMaybe<IGrantOwnersTiers_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<IGrantOwnersTiers_Stddev_Samp_Order_By>
  sum?: InputMaybe<IGrantOwnersTiers_Sum_Order_By>
  var_pop?: InputMaybe<IGrantOwnersTiers_Var_Pop_Order_By>
  var_samp?: InputMaybe<IGrantOwnersTiers_Var_Samp_Order_By>
  variance?: InputMaybe<IGrantOwnersTiers_Variance_Order_By>
}

/** input type for inserting array relation for remote table "GrantOwnersTiers" */
export type IGrantOwnersTiers_Arr_Rel_Insert_Input = {
  data: Array<IGrantOwnersTiers_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<IGrantOwnersTiers_On_Conflict>
}

/** aggregate avg on columns */
export type IGrantOwnersTiers_Avg_Fields = {
  __typename?: 'GrantOwnersTiers_avg_fields'
  curationVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by avg() on columns of table "GrantOwnersTiers" */
export type IGrantOwnersTiers_Avg_Order_By = {
  curationVotes?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "GrantOwnersTiers". All fields are combined with a logical 'AND'. */
export type IGrantOwnersTiers_Bool_Exp = {
  _and?: InputMaybe<Array<IGrantOwnersTiers_Bool_Exp>>
  _not?: InputMaybe<IGrantOwnersTiers_Bool_Exp>
  _or?: InputMaybe<Array<IGrantOwnersTiers_Bool_Exp>>
  administrationRights?: InputMaybe<IBoolean_Comparison_Exp>
  curationVotes?: InputMaybe<INumeric_Comparison_Exp>
  description?: InputMaybe<IString_Comparison_Exp>
  extraFeatures?: InputMaybe<IJson_Comparison_Exp>
  grant?: InputMaybe<IGrants_Bool_Exp>
  grantId?: InputMaybe<IUuid_Comparison_Exp>
  id?: InputMaybe<IUuid_Comparison_Exp>
  name?: InputMaybe<IString_Comparison_Exp>
  owners?: InputMaybe<IGrantOwners_Bool_Exp>
}

/** unique or primary key constraints on table "GrantOwnersTiers" */
export enum GrantOwnersTiers_Constraint {
  /** unique or primary key constraint */
  GrantOwnersTiers_pkey = 'GrantOwnersTiers_pkey',
}

/** input type for incrementing numeric columns in table "GrantOwnersTiers" */
export type IGrantOwnersTiers_Inc_Input = {
  curationVotes?: InputMaybe<Scalars['numeric']>
}

/** input type for inserting data into table "GrantOwnersTiers" */
export type IGrantOwnersTiers_Insert_Input = {
  administrationRights?: InputMaybe<Scalars['Boolean']>
  curationVotes?: InputMaybe<Scalars['numeric']>
  description?: InputMaybe<Scalars['String']>
  extraFeatures?: InputMaybe<Scalars['json']>
  grant?: InputMaybe<IGrants_Obj_Rel_Insert_Input>
  grantId?: InputMaybe<Scalars['uuid']>
  id?: InputMaybe<Scalars['uuid']>
  name?: InputMaybe<Scalars['String']>
  owners?: InputMaybe<IGrantOwners_Arr_Rel_Insert_Input>
}

/** aggregate max on columns */
export type IGrantOwnersTiers_Max_Fields = {
  __typename?: 'GrantOwnersTiers_max_fields'
  curationVotes?: Maybe<FieldWrapper<Scalars['numeric']>>
  description?: Maybe<FieldWrapper<Scalars['String']>>
  grantId?: Maybe<FieldWrapper<Scalars['uuid']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  name?: Maybe<FieldWrapper<Scalars['String']>>
}

/** order by max() on columns of table "GrantOwnersTiers" */
export type IGrantOwnersTiers_Max_Order_By = {
  curationVotes?: InputMaybe<Order_By>
  description?: InputMaybe<Order_By>
  grantId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  name?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type IGrantOwnersTiers_Min_Fields = {
  __typename?: 'GrantOwnersTiers_min_fields'
  curationVotes?: Maybe<FieldWrapper<Scalars['numeric']>>
  description?: Maybe<FieldWrapper<Scalars['String']>>
  grantId?: Maybe<FieldWrapper<Scalars['uuid']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  name?: Maybe<FieldWrapper<Scalars['String']>>
}

/** order by min() on columns of table "GrantOwnersTiers" */
export type IGrantOwnersTiers_Min_Order_By = {
  curationVotes?: InputMaybe<Order_By>
  description?: InputMaybe<Order_By>
  grantId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  name?: InputMaybe<Order_By>
}

/** response of any mutation on the table "GrantOwnersTiers" */
export type IGrantOwnersTiers_Mutation_Response = {
  __typename?: 'GrantOwnersTiers_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<IGrantOwnersTiers>>
}

/** input type for inserting object relation for remote table "GrantOwnersTiers" */
export type IGrantOwnersTiers_Obj_Rel_Insert_Input = {
  data: IGrantOwnersTiers_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<IGrantOwnersTiers_On_Conflict>
}

/** on_conflict condition type for table "GrantOwnersTiers" */
export type IGrantOwnersTiers_On_Conflict = {
  constraint: GrantOwnersTiers_Constraint
  update_columns?: Array<GrantOwnersTiers_Update_Column>
  where?: InputMaybe<IGrantOwnersTiers_Bool_Exp>
}

/** Ordering options when selecting data from "GrantOwnersTiers". */
export type IGrantOwnersTiers_Order_By = {
  administrationRights?: InputMaybe<Order_By>
  curationVotes?: InputMaybe<Order_By>
  description?: InputMaybe<Order_By>
  extraFeatures?: InputMaybe<Order_By>
  grant?: InputMaybe<IGrants_Order_By>
  grantId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  name?: InputMaybe<Order_By>
  owners_aggregate?: InputMaybe<IGrantOwners_Aggregate_Order_By>
}

/** primary key columns input for table: GrantOwnersTiers */
export type IGrantOwnersTiers_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "GrantOwnersTiers" */
export enum GrantOwnersTiers_Select_Column {
  /** column name */
  administrationRights = 'administrationRights',
  /** column name */
  curationVotes = 'curationVotes',
  /** column name */
  description = 'description',
  /** column name */
  extraFeatures = 'extraFeatures',
  /** column name */
  grantId = 'grantId',
  /** column name */
  id = 'id',
  /** column name */
  name = 'name',
}

/** input type for updating data in table "GrantOwnersTiers" */
export type IGrantOwnersTiers_Set_Input = {
  administrationRights?: InputMaybe<Scalars['Boolean']>
  curationVotes?: InputMaybe<Scalars['numeric']>
  description?: InputMaybe<Scalars['String']>
  extraFeatures?: InputMaybe<Scalars['json']>
  grantId?: InputMaybe<Scalars['uuid']>
  id?: InputMaybe<Scalars['uuid']>
  name?: InputMaybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type IGrantOwnersTiers_Stddev_Fields = {
  __typename?: 'GrantOwnersTiers_stddev_fields'
  curationVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev() on columns of table "GrantOwnersTiers" */
export type IGrantOwnersTiers_Stddev_Order_By = {
  curationVotes?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type IGrantOwnersTiers_Stddev_Pop_Fields = {
  __typename?: 'GrantOwnersTiers_stddev_pop_fields'
  curationVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev_pop() on columns of table "GrantOwnersTiers" */
export type IGrantOwnersTiers_Stddev_Pop_Order_By = {
  curationVotes?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type IGrantOwnersTiers_Stddev_Samp_Fields = {
  __typename?: 'GrantOwnersTiers_stddev_samp_fields'
  curationVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev_samp() on columns of table "GrantOwnersTiers" */
export type IGrantOwnersTiers_Stddev_Samp_Order_By = {
  curationVotes?: InputMaybe<Order_By>
}

/** aggregate sum on columns */
export type IGrantOwnersTiers_Sum_Fields = {
  __typename?: 'GrantOwnersTiers_sum_fields'
  curationVotes?: Maybe<FieldWrapper<Scalars['numeric']>>
}

/** order by sum() on columns of table "GrantOwnersTiers" */
export type IGrantOwnersTiers_Sum_Order_By = {
  curationVotes?: InputMaybe<Order_By>
}

/** update columns of table "GrantOwnersTiers" */
export enum GrantOwnersTiers_Update_Column {
  /** column name */
  administrationRights = 'administrationRights',
  /** column name */
  curationVotes = 'curationVotes',
  /** column name */
  description = 'description',
  /** column name */
  extraFeatures = 'extraFeatures',
  /** column name */
  grantId = 'grantId',
  /** column name */
  id = 'id',
  /** column name */
  name = 'name',
}

/** aggregate var_pop on columns */
export type IGrantOwnersTiers_Var_Pop_Fields = {
  __typename?: 'GrantOwnersTiers_var_pop_fields'
  curationVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by var_pop() on columns of table "GrantOwnersTiers" */
export type IGrantOwnersTiers_Var_Pop_Order_By = {
  curationVotes?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type IGrantOwnersTiers_Var_Samp_Fields = {
  __typename?: 'GrantOwnersTiers_var_samp_fields'
  curationVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by var_samp() on columns of table "GrantOwnersTiers" */
export type IGrantOwnersTiers_Var_Samp_Order_By = {
  curationVotes?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type IGrantOwnersTiers_Variance_Fields = {
  __typename?: 'GrantOwnersTiers_variance_fields'
  curationVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by variance() on columns of table "GrantOwnersTiers" */
export type IGrantOwnersTiers_Variance_Order_By = {
  curationVotes?: InputMaybe<Order_By>
}

/** aggregated selection of "GrantOwners" */
export type IGrantOwners_Aggregate = {
  __typename?: 'GrantOwners_aggregate'
  aggregate?: Maybe<FieldWrapper<IGrantOwners_Aggregate_Fields>>
  nodes: Array<FieldWrapper<IGrantOwners>>
}

/** aggregate fields of "GrantOwners" */
export type IGrantOwners_Aggregate_Fields = {
  __typename?: 'GrantOwners_aggregate_fields'
  avg?: Maybe<FieldWrapper<IGrantOwners_Avg_Fields>>
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<IGrantOwners_Max_Fields>>
  min?: Maybe<FieldWrapper<IGrantOwners_Min_Fields>>
  stddev?: Maybe<FieldWrapper<IGrantOwners_Stddev_Fields>>
  stddev_pop?: Maybe<FieldWrapper<IGrantOwners_Stddev_Pop_Fields>>
  stddev_samp?: Maybe<FieldWrapper<IGrantOwners_Stddev_Samp_Fields>>
  sum?: Maybe<FieldWrapper<IGrantOwners_Sum_Fields>>
  var_pop?: Maybe<FieldWrapper<IGrantOwners_Var_Pop_Fields>>
  var_samp?: Maybe<FieldWrapper<IGrantOwners_Var_Samp_Fields>>
  variance?: Maybe<FieldWrapper<IGrantOwners_Variance_Fields>>
}

/** aggregate fields of "GrantOwners" */
export type IGrantOwners_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GrantOwners_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "GrantOwners" */
export type IGrantOwners_Aggregate_Order_By = {
  avg?: InputMaybe<IGrantOwners_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<IGrantOwners_Max_Order_By>
  min?: InputMaybe<IGrantOwners_Min_Order_By>
  stddev?: InputMaybe<IGrantOwners_Stddev_Order_By>
  stddev_pop?: InputMaybe<IGrantOwners_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<IGrantOwners_Stddev_Samp_Order_By>
  sum?: InputMaybe<IGrantOwners_Sum_Order_By>
  var_pop?: InputMaybe<IGrantOwners_Var_Pop_Order_By>
  var_samp?: InputMaybe<IGrantOwners_Var_Samp_Order_By>
  variance?: InputMaybe<IGrantOwners_Variance_Order_By>
}

/** input type for inserting array relation for remote table "GrantOwners" */
export type IGrantOwners_Arr_Rel_Insert_Input = {
  data: Array<IGrantOwners_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<IGrantOwners_On_Conflict>
}

/** aggregate avg on columns */
export type IGrantOwners_Avg_Fields = {
  __typename?: 'GrantOwners_avg_fields'
  availableVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by avg() on columns of table "GrantOwners" */
export type IGrantOwners_Avg_Order_By = {
  availableVotes?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "GrantOwners". All fields are combined with a logical 'AND'. */
export type IGrantOwners_Bool_Exp = {
  _and?: InputMaybe<Array<IGrantOwners_Bool_Exp>>
  _not?: InputMaybe<IGrantOwners_Bool_Exp>
  _or?: InputMaybe<Array<IGrantOwners_Bool_Exp>>
  availableVotes?: InputMaybe<INumeric_Comparison_Exp>
  id?: InputMaybe<IUuid_Comparison_Exp>
  tier?: InputMaybe<IGrantOwnersTiers_Bool_Exp>
  tierId?: InputMaybe<IUuid_Comparison_Exp>
  user?: InputMaybe<IUser_Bool_Exp>
  userId?: InputMaybe<IUuid_Comparison_Exp>
}

/** unique or primary key constraints on table "GrantOwners" */
export enum GrantOwners_Constraint {
  /** unique or primary key constraint */
  GrantOwners_pkey = 'GrantOwners_pkey',
}

/** input type for incrementing numeric columns in table "GrantOwners" */
export type IGrantOwners_Inc_Input = {
  availableVotes?: InputMaybe<Scalars['numeric']>
}

/** input type for inserting data into table "GrantOwners" */
export type IGrantOwners_Insert_Input = {
  availableVotes?: InputMaybe<Scalars['numeric']>
  id?: InputMaybe<Scalars['uuid']>
  tier?: InputMaybe<IGrantOwnersTiers_Obj_Rel_Insert_Input>
  tierId?: InputMaybe<Scalars['uuid']>
  user?: InputMaybe<IUser_Obj_Rel_Insert_Input>
  userId?: InputMaybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type IGrantOwners_Max_Fields = {
  __typename?: 'GrantOwners_max_fields'
  availableVotes?: Maybe<FieldWrapper<Scalars['numeric']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  tierId?: Maybe<FieldWrapper<Scalars['uuid']>>
  userId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** order by max() on columns of table "GrantOwners" */
export type IGrantOwners_Max_Order_By = {
  availableVotes?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  tierId?: InputMaybe<Order_By>
  userId?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type IGrantOwners_Min_Fields = {
  __typename?: 'GrantOwners_min_fields'
  availableVotes?: Maybe<FieldWrapper<Scalars['numeric']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  tierId?: Maybe<FieldWrapper<Scalars['uuid']>>
  userId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** order by min() on columns of table "GrantOwners" */
export type IGrantOwners_Min_Order_By = {
  availableVotes?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  tierId?: InputMaybe<Order_By>
  userId?: InputMaybe<Order_By>
}

/** response of any mutation on the table "GrantOwners" */
export type IGrantOwners_Mutation_Response = {
  __typename?: 'GrantOwners_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<IGrantOwners>>
}

/** on_conflict condition type for table "GrantOwners" */
export type IGrantOwners_On_Conflict = {
  constraint: GrantOwners_Constraint
  update_columns?: Array<GrantOwners_Update_Column>
  where?: InputMaybe<IGrantOwners_Bool_Exp>
}

/** Ordering options when selecting data from "GrantOwners". */
export type IGrantOwners_Order_By = {
  availableVotes?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  tier?: InputMaybe<IGrantOwnersTiers_Order_By>
  tierId?: InputMaybe<Order_By>
  user?: InputMaybe<IUser_Order_By>
  userId?: InputMaybe<Order_By>
}

/** primary key columns input for table: GrantOwners */
export type IGrantOwners_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "GrantOwners" */
export enum GrantOwners_Select_Column {
  /** column name */
  availableVotes = 'availableVotes',
  /** column name */
  id = 'id',
  /** column name */
  tierId = 'tierId',
  /** column name */
  userId = 'userId',
}

/** input type for updating data in table "GrantOwners" */
export type IGrantOwners_Set_Input = {
  availableVotes?: InputMaybe<Scalars['numeric']>
  id?: InputMaybe<Scalars['uuid']>
  tierId?: InputMaybe<Scalars['uuid']>
  userId?: InputMaybe<Scalars['uuid']>
}

/** aggregate stddev on columns */
export type IGrantOwners_Stddev_Fields = {
  __typename?: 'GrantOwners_stddev_fields'
  availableVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev() on columns of table "GrantOwners" */
export type IGrantOwners_Stddev_Order_By = {
  availableVotes?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type IGrantOwners_Stddev_Pop_Fields = {
  __typename?: 'GrantOwners_stddev_pop_fields'
  availableVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev_pop() on columns of table "GrantOwners" */
export type IGrantOwners_Stddev_Pop_Order_By = {
  availableVotes?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type IGrantOwners_Stddev_Samp_Fields = {
  __typename?: 'GrantOwners_stddev_samp_fields'
  availableVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev_samp() on columns of table "GrantOwners" */
export type IGrantOwners_Stddev_Samp_Order_By = {
  availableVotes?: InputMaybe<Order_By>
}

/** aggregate sum on columns */
export type IGrantOwners_Sum_Fields = {
  __typename?: 'GrantOwners_sum_fields'
  availableVotes?: Maybe<FieldWrapper<Scalars['numeric']>>
}

/** order by sum() on columns of table "GrantOwners" */
export type IGrantOwners_Sum_Order_By = {
  availableVotes?: InputMaybe<Order_By>
}

/** update columns of table "GrantOwners" */
export enum GrantOwners_Update_Column {
  /** column name */
  availableVotes = 'availableVotes',
  /** column name */
  id = 'id',
  /** column name */
  tierId = 'tierId',
  /** column name */
  userId = 'userId',
}

/** aggregate var_pop on columns */
export type IGrantOwners_Var_Pop_Fields = {
  __typename?: 'GrantOwners_var_pop_fields'
  availableVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by var_pop() on columns of table "GrantOwners" */
export type IGrantOwners_Var_Pop_Order_By = {
  availableVotes?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type IGrantOwners_Var_Samp_Fields = {
  __typename?: 'GrantOwners_var_samp_fields'
  availableVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by var_samp() on columns of table "GrantOwners" */
export type IGrantOwners_Var_Samp_Order_By = {
  availableVotes?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type IGrantOwners_Variance_Fields = {
  __typename?: 'GrantOwners_variance_fields'
  availableVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by variance() on columns of table "GrantOwners" */
export type IGrantOwners_Variance_Order_By = {
  availableVotes?: InputMaybe<Order_By>
}

/** columns and relationships of "GrantSubmissionReview" */
export type IGrantSubmissionReview = {
  __typename?: 'GrantSubmissionReview'
  created_at?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  curationVotes?: Maybe<FieldWrapper<Scalars['float8']>>
  feedback?: Maybe<FieldWrapper<Scalars['String']>>
  /** An object relationship */
  grantSubmission?: Maybe<FieldWrapper<IGrantSubmissions>>
  id: FieldWrapper<Scalars['uuid']>
  reviewVotes?: Maybe<FieldWrapper<Scalars['Int']>>
  /** An object relationship */
  reviewer?: Maybe<FieldWrapper<IUser>>
  reviewerId?: Maybe<FieldWrapper<Scalars['uuid']>>
  submissionId?: Maybe<FieldWrapper<Scalars['uuid']>>
  type: FieldWrapper<Scalars['String']>
}

/** aggregated selection of "GrantSubmissionReview" */
export type IGrantSubmissionReview_Aggregate = {
  __typename?: 'GrantSubmissionReview_aggregate'
  aggregate?: Maybe<FieldWrapper<IGrantSubmissionReview_Aggregate_Fields>>
  nodes: Array<FieldWrapper<IGrantSubmissionReview>>
}

/** aggregate fields of "GrantSubmissionReview" */
export type IGrantSubmissionReview_Aggregate_Fields = {
  __typename?: 'GrantSubmissionReview_aggregate_fields'
  avg?: Maybe<FieldWrapper<IGrantSubmissionReview_Avg_Fields>>
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<IGrantSubmissionReview_Max_Fields>>
  min?: Maybe<FieldWrapper<IGrantSubmissionReview_Min_Fields>>
  stddev?: Maybe<FieldWrapper<IGrantSubmissionReview_Stddev_Fields>>
  stddev_pop?: Maybe<FieldWrapper<IGrantSubmissionReview_Stddev_Pop_Fields>>
  stddev_samp?: Maybe<FieldWrapper<IGrantSubmissionReview_Stddev_Samp_Fields>>
  sum?: Maybe<FieldWrapper<IGrantSubmissionReview_Sum_Fields>>
  var_pop?: Maybe<FieldWrapper<IGrantSubmissionReview_Var_Pop_Fields>>
  var_samp?: Maybe<FieldWrapper<IGrantSubmissionReview_Var_Samp_Fields>>
  variance?: Maybe<FieldWrapper<IGrantSubmissionReview_Variance_Fields>>
}

/** aggregate fields of "GrantSubmissionReview" */
export type IGrantSubmissionReview_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GrantSubmissionReview_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "GrantSubmissionReview" */
export type IGrantSubmissionReview_Aggregate_Order_By = {
  avg?: InputMaybe<IGrantSubmissionReview_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<IGrantSubmissionReview_Max_Order_By>
  min?: InputMaybe<IGrantSubmissionReview_Min_Order_By>
  stddev?: InputMaybe<IGrantSubmissionReview_Stddev_Order_By>
  stddev_pop?: InputMaybe<IGrantSubmissionReview_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<IGrantSubmissionReview_Stddev_Samp_Order_By>
  sum?: InputMaybe<IGrantSubmissionReview_Sum_Order_By>
  var_pop?: InputMaybe<IGrantSubmissionReview_Var_Pop_Order_By>
  var_samp?: InputMaybe<IGrantSubmissionReview_Var_Samp_Order_By>
  variance?: InputMaybe<IGrantSubmissionReview_Variance_Order_By>
}

/** input type for inserting array relation for remote table "GrantSubmissionReview" */
export type IGrantSubmissionReview_Arr_Rel_Insert_Input = {
  data: Array<IGrantSubmissionReview_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<IGrantSubmissionReview_On_Conflict>
}

/** aggregate avg on columns */
export type IGrantSubmissionReview_Avg_Fields = {
  __typename?: 'GrantSubmissionReview_avg_fields'
  curationVotes?: Maybe<FieldWrapper<Scalars['Float']>>
  reviewVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by avg() on columns of table "GrantSubmissionReview" */
export type IGrantSubmissionReview_Avg_Order_By = {
  curationVotes?: InputMaybe<Order_By>
  reviewVotes?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "GrantSubmissionReview". All fields are combined with a logical 'AND'. */
export type IGrantSubmissionReview_Bool_Exp = {
  _and?: InputMaybe<Array<IGrantSubmissionReview_Bool_Exp>>
  _not?: InputMaybe<IGrantSubmissionReview_Bool_Exp>
  _or?: InputMaybe<Array<IGrantSubmissionReview_Bool_Exp>>
  created_at?: InputMaybe<ITimestamptz_Comparison_Exp>
  curationVotes?: InputMaybe<IFloat8_Comparison_Exp>
  feedback?: InputMaybe<IString_Comparison_Exp>
  grantSubmission?: InputMaybe<IGrantSubmissions_Bool_Exp>
  id?: InputMaybe<IUuid_Comparison_Exp>
  reviewVotes?: InputMaybe<IInt_Comparison_Exp>
  reviewer?: InputMaybe<IUser_Bool_Exp>
  reviewerId?: InputMaybe<IUuid_Comparison_Exp>
  submissionId?: InputMaybe<IUuid_Comparison_Exp>
  type?: InputMaybe<IString_Comparison_Exp>
}

/** unique or primary key constraints on table "GrantSubmissionReview" */
export enum GrantSubmissionReview_Constraint {
  /** unique or primary key constraint */
  GrantSubmissionReview_pkey = 'GrantSubmissionReview_pkey',
}

/** input type for incrementing numeric columns in table "GrantSubmissionReview" */
export type IGrantSubmissionReview_Inc_Input = {
  curationVotes?: InputMaybe<Scalars['float8']>
  reviewVotes?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "GrantSubmissionReview" */
export type IGrantSubmissionReview_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>
  curationVotes?: InputMaybe<Scalars['float8']>
  feedback?: InputMaybe<Scalars['String']>
  grantSubmission?: InputMaybe<IGrantSubmissions_Obj_Rel_Insert_Input>
  id?: InputMaybe<Scalars['uuid']>
  reviewVotes?: InputMaybe<Scalars['Int']>
  reviewer?: InputMaybe<IUser_Obj_Rel_Insert_Input>
  reviewerId?: InputMaybe<Scalars['uuid']>
  submissionId?: InputMaybe<Scalars['uuid']>
  type?: InputMaybe<Scalars['String']>
}

/** aggregate max on columns */
export type IGrantSubmissionReview_Max_Fields = {
  __typename?: 'GrantSubmissionReview_max_fields'
  created_at?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  curationVotes?: Maybe<FieldWrapper<Scalars['float8']>>
  feedback?: Maybe<FieldWrapper<Scalars['String']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  reviewVotes?: Maybe<FieldWrapper<Scalars['Int']>>
  reviewerId?: Maybe<FieldWrapper<Scalars['uuid']>>
  submissionId?: Maybe<FieldWrapper<Scalars['uuid']>>
  type?: Maybe<FieldWrapper<Scalars['String']>>
}

/** order by max() on columns of table "GrantSubmissionReview" */
export type IGrantSubmissionReview_Max_Order_By = {
  created_at?: InputMaybe<Order_By>
  curationVotes?: InputMaybe<Order_By>
  feedback?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  reviewVotes?: InputMaybe<Order_By>
  reviewerId?: InputMaybe<Order_By>
  submissionId?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type IGrantSubmissionReview_Min_Fields = {
  __typename?: 'GrantSubmissionReview_min_fields'
  created_at?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  curationVotes?: Maybe<FieldWrapper<Scalars['float8']>>
  feedback?: Maybe<FieldWrapper<Scalars['String']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  reviewVotes?: Maybe<FieldWrapper<Scalars['Int']>>
  reviewerId?: Maybe<FieldWrapper<Scalars['uuid']>>
  submissionId?: Maybe<FieldWrapper<Scalars['uuid']>>
  type?: Maybe<FieldWrapper<Scalars['String']>>
}

/** order by min() on columns of table "GrantSubmissionReview" */
export type IGrantSubmissionReview_Min_Order_By = {
  created_at?: InputMaybe<Order_By>
  curationVotes?: InputMaybe<Order_By>
  feedback?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  reviewVotes?: InputMaybe<Order_By>
  reviewerId?: InputMaybe<Order_By>
  submissionId?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
}

/** response of any mutation on the table "GrantSubmissionReview" */
export type IGrantSubmissionReview_Mutation_Response = {
  __typename?: 'GrantSubmissionReview_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<IGrantSubmissionReview>>
}

/** on_conflict condition type for table "GrantSubmissionReview" */
export type IGrantSubmissionReview_On_Conflict = {
  constraint: GrantSubmissionReview_Constraint
  update_columns?: Array<GrantSubmissionReview_Update_Column>
  where?: InputMaybe<IGrantSubmissionReview_Bool_Exp>
}

/** Ordering options when selecting data from "GrantSubmissionReview". */
export type IGrantSubmissionReview_Order_By = {
  created_at?: InputMaybe<Order_By>
  curationVotes?: InputMaybe<Order_By>
  feedback?: InputMaybe<Order_By>
  grantSubmission?: InputMaybe<IGrantSubmissions_Order_By>
  id?: InputMaybe<Order_By>
  reviewVotes?: InputMaybe<Order_By>
  reviewer?: InputMaybe<IUser_Order_By>
  reviewerId?: InputMaybe<Order_By>
  submissionId?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
}

/** primary key columns input for table: GrantSubmissionReview */
export type IGrantSubmissionReview_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "GrantSubmissionReview" */
export enum GrantSubmissionReview_Select_Column {
  /** column name */
  created_at = 'created_at',
  /** column name */
  curationVotes = 'curationVotes',
  /** column name */
  feedback = 'feedback',
  /** column name */
  id = 'id',
  /** column name */
  reviewVotes = 'reviewVotes',
  /** column name */
  reviewerId = 'reviewerId',
  /** column name */
  submissionId = 'submissionId',
  /** column name */
  type = 'type',
}

/** input type for updating data in table "GrantSubmissionReview" */
export type IGrantSubmissionReview_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>
  curationVotes?: InputMaybe<Scalars['float8']>
  feedback?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['uuid']>
  reviewVotes?: InputMaybe<Scalars['Int']>
  reviewerId?: InputMaybe<Scalars['uuid']>
  submissionId?: InputMaybe<Scalars['uuid']>
  type?: InputMaybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type IGrantSubmissionReview_Stddev_Fields = {
  __typename?: 'GrantSubmissionReview_stddev_fields'
  curationVotes?: Maybe<FieldWrapper<Scalars['Float']>>
  reviewVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev() on columns of table "GrantSubmissionReview" */
export type IGrantSubmissionReview_Stddev_Order_By = {
  curationVotes?: InputMaybe<Order_By>
  reviewVotes?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type IGrantSubmissionReview_Stddev_Pop_Fields = {
  __typename?: 'GrantSubmissionReview_stddev_pop_fields'
  curationVotes?: Maybe<FieldWrapper<Scalars['Float']>>
  reviewVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev_pop() on columns of table "GrantSubmissionReview" */
export type IGrantSubmissionReview_Stddev_Pop_Order_By = {
  curationVotes?: InputMaybe<Order_By>
  reviewVotes?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type IGrantSubmissionReview_Stddev_Samp_Fields = {
  __typename?: 'GrantSubmissionReview_stddev_samp_fields'
  curationVotes?: Maybe<FieldWrapper<Scalars['Float']>>
  reviewVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev_samp() on columns of table "GrantSubmissionReview" */
export type IGrantSubmissionReview_Stddev_Samp_Order_By = {
  curationVotes?: InputMaybe<Order_By>
  reviewVotes?: InputMaybe<Order_By>
}

/** aggregate sum on columns */
export type IGrantSubmissionReview_Sum_Fields = {
  __typename?: 'GrantSubmissionReview_sum_fields'
  curationVotes?: Maybe<FieldWrapper<Scalars['float8']>>
  reviewVotes?: Maybe<FieldWrapper<Scalars['Int']>>
}

/** order by sum() on columns of table "GrantSubmissionReview" */
export type IGrantSubmissionReview_Sum_Order_By = {
  curationVotes?: InputMaybe<Order_By>
  reviewVotes?: InputMaybe<Order_By>
}

/** update columns of table "GrantSubmissionReview" */
export enum GrantSubmissionReview_Update_Column {
  /** column name */
  created_at = 'created_at',
  /** column name */
  curationVotes = 'curationVotes',
  /** column name */
  feedback = 'feedback',
  /** column name */
  id = 'id',
  /** column name */
  reviewVotes = 'reviewVotes',
  /** column name */
  reviewerId = 'reviewerId',
  /** column name */
  submissionId = 'submissionId',
  /** column name */
  type = 'type',
}

/** aggregate var_pop on columns */
export type IGrantSubmissionReview_Var_Pop_Fields = {
  __typename?: 'GrantSubmissionReview_var_pop_fields'
  curationVotes?: Maybe<FieldWrapper<Scalars['Float']>>
  reviewVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by var_pop() on columns of table "GrantSubmissionReview" */
export type IGrantSubmissionReview_Var_Pop_Order_By = {
  curationVotes?: InputMaybe<Order_By>
  reviewVotes?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type IGrantSubmissionReview_Var_Samp_Fields = {
  __typename?: 'GrantSubmissionReview_var_samp_fields'
  curationVotes?: Maybe<FieldWrapper<Scalars['Float']>>
  reviewVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by var_samp() on columns of table "GrantSubmissionReview" */
export type IGrantSubmissionReview_Var_Samp_Order_By = {
  curationVotes?: InputMaybe<Order_By>
  reviewVotes?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type IGrantSubmissionReview_Variance_Fields = {
  __typename?: 'GrantSubmissionReview_variance_fields'
  curationVotes?: Maybe<FieldWrapper<Scalars['Float']>>
  reviewVotes?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by variance() on columns of table "GrantSubmissionReview" */
export type IGrantSubmissionReview_Variance_Order_By = {
  curationVotes?: InputMaybe<Order_By>
  reviewVotes?: InputMaybe<Order_By>
}

/** columns and relationships of "GrantSubmissions" */
export type IGrantSubmissions = {
  __typename?: 'GrantSubmissions'
  created_at: FieldWrapper<Scalars['timestamptz']>
  extraData?: Maybe<FieldWrapper<Scalars['json']>>
  /** An object relationship */
  grantCycle: FieldWrapper<IGrantCycles>
  grantCycleId: FieldWrapper<Scalars['uuid']>
  id: FieldWrapper<Scalars['uuid']>
  /** An object relationship */
  project: FieldWrapper<IProject>
  projectId: FieldWrapper<Scalars['uuid']>
  reviewState?: Maybe<FieldWrapper<Scalars['Int']>>
  /** An array relationship */
  reviews: Array<FieldWrapper<IGrantSubmissionReview>>
  /** An aggregate relationship */
  reviews_aggregate: FieldWrapper<IGrantSubmissionReview_Aggregate>
  status?: Maybe<FieldWrapper<Scalars['String']>>
  /** An object relationship */
  user?: Maybe<FieldWrapper<IUser>>
  userId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** columns and relationships of "GrantSubmissions" */
export type IGrantSubmissionsExtraDataArgs = {
  path?: InputMaybe<Scalars['String']>
}

/** columns and relationships of "GrantSubmissions" */
export type IGrantSubmissionsReviewsArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissionReview_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantSubmissionReview_Order_By>>
  where?: InputMaybe<IGrantSubmissionReview_Bool_Exp>
}

/** columns and relationships of "GrantSubmissions" */
export type IGrantSubmissionsReviews_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissionReview_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantSubmissionReview_Order_By>>
  where?: InputMaybe<IGrantSubmissionReview_Bool_Exp>
}

/** aggregated selection of "GrantSubmissions" */
export type IGrantSubmissions_Aggregate = {
  __typename?: 'GrantSubmissions_aggregate'
  aggregate?: Maybe<FieldWrapper<IGrantSubmissions_Aggregate_Fields>>
  nodes: Array<FieldWrapper<IGrantSubmissions>>
}

/** aggregate fields of "GrantSubmissions" */
export type IGrantSubmissions_Aggregate_Fields = {
  __typename?: 'GrantSubmissions_aggregate_fields'
  avg?: Maybe<FieldWrapper<IGrantSubmissions_Avg_Fields>>
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<IGrantSubmissions_Max_Fields>>
  min?: Maybe<FieldWrapper<IGrantSubmissions_Min_Fields>>
  stddev?: Maybe<FieldWrapper<IGrantSubmissions_Stddev_Fields>>
  stddev_pop?: Maybe<FieldWrapper<IGrantSubmissions_Stddev_Pop_Fields>>
  stddev_samp?: Maybe<FieldWrapper<IGrantSubmissions_Stddev_Samp_Fields>>
  sum?: Maybe<FieldWrapper<IGrantSubmissions_Sum_Fields>>
  var_pop?: Maybe<FieldWrapper<IGrantSubmissions_Var_Pop_Fields>>
  var_samp?: Maybe<FieldWrapper<IGrantSubmissions_Var_Samp_Fields>>
  variance?: Maybe<FieldWrapper<IGrantSubmissions_Variance_Fields>>
}

/** aggregate fields of "GrantSubmissions" */
export type IGrantSubmissions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GrantSubmissions_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "GrantSubmissions" */
export type IGrantSubmissions_Aggregate_Order_By = {
  avg?: InputMaybe<IGrantSubmissions_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<IGrantSubmissions_Max_Order_By>
  min?: InputMaybe<IGrantSubmissions_Min_Order_By>
  stddev?: InputMaybe<IGrantSubmissions_Stddev_Order_By>
  stddev_pop?: InputMaybe<IGrantSubmissions_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<IGrantSubmissions_Stddev_Samp_Order_By>
  sum?: InputMaybe<IGrantSubmissions_Sum_Order_By>
  var_pop?: InputMaybe<IGrantSubmissions_Var_Pop_Order_By>
  var_samp?: InputMaybe<IGrantSubmissions_Var_Samp_Order_By>
  variance?: InputMaybe<IGrantSubmissions_Variance_Order_By>
}

/** input type for inserting array relation for remote table "GrantSubmissions" */
export type IGrantSubmissions_Arr_Rel_Insert_Input = {
  data: Array<IGrantSubmissions_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<IGrantSubmissions_On_Conflict>
}

/** aggregate avg on columns */
export type IGrantSubmissions_Avg_Fields = {
  __typename?: 'GrantSubmissions_avg_fields'
  reviewState?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by avg() on columns of table "GrantSubmissions" */
export type IGrantSubmissions_Avg_Order_By = {
  reviewState?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "GrantSubmissions". All fields are combined with a logical 'AND'. */
export type IGrantSubmissions_Bool_Exp = {
  _and?: InputMaybe<Array<IGrantSubmissions_Bool_Exp>>
  _not?: InputMaybe<IGrantSubmissions_Bool_Exp>
  _or?: InputMaybe<Array<IGrantSubmissions_Bool_Exp>>
  created_at?: InputMaybe<ITimestamptz_Comparison_Exp>
  extraData?: InputMaybe<IJson_Comparison_Exp>
  grantCycle?: InputMaybe<IGrantCycles_Bool_Exp>
  grantCycleId?: InputMaybe<IUuid_Comparison_Exp>
  id?: InputMaybe<IUuid_Comparison_Exp>
  project?: InputMaybe<IProject_Bool_Exp>
  projectId?: InputMaybe<IUuid_Comparison_Exp>
  reviewState?: InputMaybe<IInt_Comparison_Exp>
  reviews?: InputMaybe<IGrantSubmissionReview_Bool_Exp>
  status?: InputMaybe<IString_Comparison_Exp>
  user?: InputMaybe<IUser_Bool_Exp>
  userId?: InputMaybe<IUuid_Comparison_Exp>
}

/** unique or primary key constraints on table "GrantSubmissions" */
export enum GrantSubmissions_Constraint {
  /** unique or primary key constraint */
  GrantSubmitions_pkey = 'GrantSubmitions_pkey',
}

/** input type for incrementing numeric columns in table "GrantSubmissions" */
export type IGrantSubmissions_Inc_Input = {
  reviewState?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "GrantSubmissions" */
export type IGrantSubmissions_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>
  extraData?: InputMaybe<Scalars['json']>
  grantCycle?: InputMaybe<IGrantCycles_Obj_Rel_Insert_Input>
  grantCycleId?: InputMaybe<Scalars['uuid']>
  id?: InputMaybe<Scalars['uuid']>
  project?: InputMaybe<IProject_Obj_Rel_Insert_Input>
  projectId?: InputMaybe<Scalars['uuid']>
  reviewState?: InputMaybe<Scalars['Int']>
  reviews?: InputMaybe<IGrantSubmissionReview_Arr_Rel_Insert_Input>
  status?: InputMaybe<Scalars['String']>
  user?: InputMaybe<IUser_Obj_Rel_Insert_Input>
  userId?: InputMaybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type IGrantSubmissions_Max_Fields = {
  __typename?: 'GrantSubmissions_max_fields'
  created_at?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  grantCycleId?: Maybe<FieldWrapper<Scalars['uuid']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  projectId?: Maybe<FieldWrapper<Scalars['uuid']>>
  reviewState?: Maybe<FieldWrapper<Scalars['Int']>>
  status?: Maybe<FieldWrapper<Scalars['String']>>
  userId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** order by max() on columns of table "GrantSubmissions" */
export type IGrantSubmissions_Max_Order_By = {
  created_at?: InputMaybe<Order_By>
  grantCycleId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  projectId?: InputMaybe<Order_By>
  reviewState?: InputMaybe<Order_By>
  status?: InputMaybe<Order_By>
  userId?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type IGrantSubmissions_Min_Fields = {
  __typename?: 'GrantSubmissions_min_fields'
  created_at?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  grantCycleId?: Maybe<FieldWrapper<Scalars['uuid']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  projectId?: Maybe<FieldWrapper<Scalars['uuid']>>
  reviewState?: Maybe<FieldWrapper<Scalars['Int']>>
  status?: Maybe<FieldWrapper<Scalars['String']>>
  userId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** order by min() on columns of table "GrantSubmissions" */
export type IGrantSubmissions_Min_Order_By = {
  created_at?: InputMaybe<Order_By>
  grantCycleId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  projectId?: InputMaybe<Order_By>
  reviewState?: InputMaybe<Order_By>
  status?: InputMaybe<Order_By>
  userId?: InputMaybe<Order_By>
}

/** response of any mutation on the table "GrantSubmissions" */
export type IGrantSubmissions_Mutation_Response = {
  __typename?: 'GrantSubmissions_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<IGrantSubmissions>>
}

/** input type for inserting object relation for remote table "GrantSubmissions" */
export type IGrantSubmissions_Obj_Rel_Insert_Input = {
  data: IGrantSubmissions_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<IGrantSubmissions_On_Conflict>
}

/** on_conflict condition type for table "GrantSubmissions" */
export type IGrantSubmissions_On_Conflict = {
  constraint: GrantSubmissions_Constraint
  update_columns?: Array<GrantSubmissions_Update_Column>
  where?: InputMaybe<IGrantSubmissions_Bool_Exp>
}

/** Ordering options when selecting data from "GrantSubmissions". */
export type IGrantSubmissions_Order_By = {
  created_at?: InputMaybe<Order_By>
  extraData?: InputMaybe<Order_By>
  grantCycle?: InputMaybe<IGrantCycles_Order_By>
  grantCycleId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  project?: InputMaybe<IProject_Order_By>
  projectId?: InputMaybe<Order_By>
  reviewState?: InputMaybe<Order_By>
  reviews_aggregate?: InputMaybe<IGrantSubmissionReview_Aggregate_Order_By>
  status?: InputMaybe<Order_By>
  user?: InputMaybe<IUser_Order_By>
  userId?: InputMaybe<Order_By>
}

/** primary key columns input for table: GrantSubmissions */
export type IGrantSubmissions_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "GrantSubmissions" */
export enum GrantSubmissions_Select_Column {
  /** column name */
  created_at = 'created_at',
  /** column name */
  extraData = 'extraData',
  /** column name */
  grantCycleId = 'grantCycleId',
  /** column name */
  id = 'id',
  /** column name */
  projectId = 'projectId',
  /** column name */
  reviewState = 'reviewState',
  /** column name */
  status = 'status',
  /** column name */
  userId = 'userId',
}

/** input type for updating data in table "GrantSubmissions" */
export type IGrantSubmissions_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>
  extraData?: InputMaybe<Scalars['json']>
  grantCycleId?: InputMaybe<Scalars['uuid']>
  id?: InputMaybe<Scalars['uuid']>
  projectId?: InputMaybe<Scalars['uuid']>
  reviewState?: InputMaybe<Scalars['Int']>
  status?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['uuid']>
}

/** aggregate stddev on columns */
export type IGrantSubmissions_Stddev_Fields = {
  __typename?: 'GrantSubmissions_stddev_fields'
  reviewState?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev() on columns of table "GrantSubmissions" */
export type IGrantSubmissions_Stddev_Order_By = {
  reviewState?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type IGrantSubmissions_Stddev_Pop_Fields = {
  __typename?: 'GrantSubmissions_stddev_pop_fields'
  reviewState?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev_pop() on columns of table "GrantSubmissions" */
export type IGrantSubmissions_Stddev_Pop_Order_By = {
  reviewState?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type IGrantSubmissions_Stddev_Samp_Fields = {
  __typename?: 'GrantSubmissions_stddev_samp_fields'
  reviewState?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev_samp() on columns of table "GrantSubmissions" */
export type IGrantSubmissions_Stddev_Samp_Order_By = {
  reviewState?: InputMaybe<Order_By>
}

/** aggregate sum on columns */
export type IGrantSubmissions_Sum_Fields = {
  __typename?: 'GrantSubmissions_sum_fields'
  reviewState?: Maybe<FieldWrapper<Scalars['Int']>>
}

/** order by sum() on columns of table "GrantSubmissions" */
export type IGrantSubmissions_Sum_Order_By = {
  reviewState?: InputMaybe<Order_By>
}

/** update columns of table "GrantSubmissions" */
export enum GrantSubmissions_Update_Column {
  /** column name */
  created_at = 'created_at',
  /** column name */
  extraData = 'extraData',
  /** column name */
  grantCycleId = 'grantCycleId',
  /** column name */
  id = 'id',
  /** column name */
  projectId = 'projectId',
  /** column name */
  reviewState = 'reviewState',
  /** column name */
  status = 'status',
  /** column name */
  userId = 'userId',
}

/** aggregate var_pop on columns */
export type IGrantSubmissions_Var_Pop_Fields = {
  __typename?: 'GrantSubmissions_var_pop_fields'
  reviewState?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by var_pop() on columns of table "GrantSubmissions" */
export type IGrantSubmissions_Var_Pop_Order_By = {
  reviewState?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type IGrantSubmissions_Var_Samp_Fields = {
  __typename?: 'GrantSubmissions_var_samp_fields'
  reviewState?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by var_samp() on columns of table "GrantSubmissions" */
export type IGrantSubmissions_Var_Samp_Order_By = {
  reviewState?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type IGrantSubmissions_Variance_Fields = {
  __typename?: 'GrantSubmissions_variance_fields'
  reviewState?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by variance() on columns of table "GrantSubmissions" */
export type IGrantSubmissions_Variance_Order_By = {
  reviewState?: InputMaybe<Order_By>
}

/** columns and relationships of "GrantTags" */
export type IGrantTags = {
  __typename?: 'GrantTags'
  /** An array relationship */
  bridgeWithGrant: Array<FieldWrapper<IGrantTagsBridge>>
  /** An aggregate relationship */
  bridgeWithGrant_aggregate: FieldWrapper<IGrantTagsBridge_Aggregate>
  id: FieldWrapper<Scalars['uuid']>
  label: FieldWrapper<Scalars['String']>
  value: FieldWrapper<Scalars['String']>
}

/** columns and relationships of "GrantTags" */
export type IGrantTagsBridgeWithGrantArgs = {
  distinct_on?: InputMaybe<Array<GrantTagsBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantTagsBridge_Order_By>>
  where?: InputMaybe<IGrantTagsBridge_Bool_Exp>
}

/** columns and relationships of "GrantTags" */
export type IGrantTagsBridgeWithGrant_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantTagsBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantTagsBridge_Order_By>>
  where?: InputMaybe<IGrantTagsBridge_Bool_Exp>
}

/** columns and relationships of "GrantTagsBridge" */
export type IGrantTagsBridge = {
  __typename?: 'GrantTagsBridge'
  /** An object relationship */
  grant: FieldWrapper<IGrants>
  grantId: FieldWrapper<Scalars['uuid']>
  id: FieldWrapper<Scalars['uuid']>
  /** An object relationship */
  tag: FieldWrapper<IGrantTags>
  tagId: FieldWrapper<Scalars['uuid']>
}

/** aggregated selection of "GrantTagsBridge" */
export type IGrantTagsBridge_Aggregate = {
  __typename?: 'GrantTagsBridge_aggregate'
  aggregate?: Maybe<FieldWrapper<IGrantTagsBridge_Aggregate_Fields>>
  nodes: Array<FieldWrapper<IGrantTagsBridge>>
}

/** aggregate fields of "GrantTagsBridge" */
export type IGrantTagsBridge_Aggregate_Fields = {
  __typename?: 'GrantTagsBridge_aggregate_fields'
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<IGrantTagsBridge_Max_Fields>>
  min?: Maybe<FieldWrapper<IGrantTagsBridge_Min_Fields>>
}

/** aggregate fields of "GrantTagsBridge" */
export type IGrantTagsBridge_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GrantTagsBridge_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "GrantTagsBridge" */
export type IGrantTagsBridge_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>
  max?: InputMaybe<IGrantTagsBridge_Max_Order_By>
  min?: InputMaybe<IGrantTagsBridge_Min_Order_By>
}

/** input type for inserting array relation for remote table "GrantTagsBridge" */
export type IGrantTagsBridge_Arr_Rel_Insert_Input = {
  data: Array<IGrantTagsBridge_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<IGrantTagsBridge_On_Conflict>
}

/** Boolean expression to filter rows from the table "GrantTagsBridge". All fields are combined with a logical 'AND'. */
export type IGrantTagsBridge_Bool_Exp = {
  _and?: InputMaybe<Array<IGrantTagsBridge_Bool_Exp>>
  _not?: InputMaybe<IGrantTagsBridge_Bool_Exp>
  _or?: InputMaybe<Array<IGrantTagsBridge_Bool_Exp>>
  grant?: InputMaybe<IGrants_Bool_Exp>
  grantId?: InputMaybe<IUuid_Comparison_Exp>
  id?: InputMaybe<IUuid_Comparison_Exp>
  tag?: InputMaybe<IGrantTags_Bool_Exp>
  tagId?: InputMaybe<IUuid_Comparison_Exp>
}

/** unique or primary key constraints on table "GrantTagsBridge" */
export enum GrantTagsBridge_Constraint {
  /** unique or primary key constraint */
  GrantTagsBridge_pkey = 'GrantTagsBridge_pkey',
}

/** input type for inserting data into table "GrantTagsBridge" */
export type IGrantTagsBridge_Insert_Input = {
  grant?: InputMaybe<IGrants_Obj_Rel_Insert_Input>
  grantId?: InputMaybe<Scalars['uuid']>
  id?: InputMaybe<Scalars['uuid']>
  tag?: InputMaybe<IGrantTags_Obj_Rel_Insert_Input>
  tagId?: InputMaybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type IGrantTagsBridge_Max_Fields = {
  __typename?: 'GrantTagsBridge_max_fields'
  grantId?: Maybe<FieldWrapper<Scalars['uuid']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  tagId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** order by max() on columns of table "GrantTagsBridge" */
export type IGrantTagsBridge_Max_Order_By = {
  grantId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  tagId?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type IGrantTagsBridge_Min_Fields = {
  __typename?: 'GrantTagsBridge_min_fields'
  grantId?: Maybe<FieldWrapper<Scalars['uuid']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  tagId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** order by min() on columns of table "GrantTagsBridge" */
export type IGrantTagsBridge_Min_Order_By = {
  grantId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  tagId?: InputMaybe<Order_By>
}

/** response of any mutation on the table "GrantTagsBridge" */
export type IGrantTagsBridge_Mutation_Response = {
  __typename?: 'GrantTagsBridge_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<IGrantTagsBridge>>
}

/** on_conflict condition type for table "GrantTagsBridge" */
export type IGrantTagsBridge_On_Conflict = {
  constraint: GrantTagsBridge_Constraint
  update_columns?: Array<GrantTagsBridge_Update_Column>
  where?: InputMaybe<IGrantTagsBridge_Bool_Exp>
}

/** Ordering options when selecting data from "GrantTagsBridge". */
export type IGrantTagsBridge_Order_By = {
  grant?: InputMaybe<IGrants_Order_By>
  grantId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  tag?: InputMaybe<IGrantTags_Order_By>
  tagId?: InputMaybe<Order_By>
}

/** primary key columns input for table: GrantTagsBridge */
export type IGrantTagsBridge_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "GrantTagsBridge" */
export enum GrantTagsBridge_Select_Column {
  /** column name */
  grantId = 'grantId',
  /** column name */
  id = 'id',
  /** column name */
  tagId = 'tagId',
}

/** input type for updating data in table "GrantTagsBridge" */
export type IGrantTagsBridge_Set_Input = {
  grantId?: InputMaybe<Scalars['uuid']>
  id?: InputMaybe<Scalars['uuid']>
  tagId?: InputMaybe<Scalars['uuid']>
}

/** update columns of table "GrantTagsBridge" */
export enum GrantTagsBridge_Update_Column {
  /** column name */
  grantId = 'grantId',
  /** column name */
  id = 'id',
  /** column name */
  tagId = 'tagId',
}

/** aggregated selection of "GrantTags" */
export type IGrantTags_Aggregate = {
  __typename?: 'GrantTags_aggregate'
  aggregate?: Maybe<FieldWrapper<IGrantTags_Aggregate_Fields>>
  nodes: Array<FieldWrapper<IGrantTags>>
}

/** aggregate fields of "GrantTags" */
export type IGrantTags_Aggregate_Fields = {
  __typename?: 'GrantTags_aggregate_fields'
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<IGrantTags_Max_Fields>>
  min?: Maybe<FieldWrapper<IGrantTags_Min_Fields>>
}

/** aggregate fields of "GrantTags" */
export type IGrantTags_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GrantTags_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "GrantTags". All fields are combined with a logical 'AND'. */
export type IGrantTags_Bool_Exp = {
  _and?: InputMaybe<Array<IGrantTags_Bool_Exp>>
  _not?: InputMaybe<IGrantTags_Bool_Exp>
  _or?: InputMaybe<Array<IGrantTags_Bool_Exp>>
  bridgeWithGrant?: InputMaybe<IGrantTagsBridge_Bool_Exp>
  id?: InputMaybe<IUuid_Comparison_Exp>
  label?: InputMaybe<IString_Comparison_Exp>
  value?: InputMaybe<IString_Comparison_Exp>
}

/** unique or primary key constraints on table "GrantTags" */
export enum GrantTags_Constraint {
  /** unique or primary key constraint */
  GrantTags_pkey = 'GrantTags_pkey',
  /** unique or primary key constraint */
  GrantTags_value_key = 'GrantTags_value_key',
}

/** input type for inserting data into table "GrantTags" */
export type IGrantTags_Insert_Input = {
  bridgeWithGrant?: InputMaybe<IGrantTagsBridge_Arr_Rel_Insert_Input>
  id?: InputMaybe<Scalars['uuid']>
  label?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
}

/** aggregate max on columns */
export type IGrantTags_Max_Fields = {
  __typename?: 'GrantTags_max_fields'
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  label?: Maybe<FieldWrapper<Scalars['String']>>
  value?: Maybe<FieldWrapper<Scalars['String']>>
}

/** aggregate min on columns */
export type IGrantTags_Min_Fields = {
  __typename?: 'GrantTags_min_fields'
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  label?: Maybe<FieldWrapper<Scalars['String']>>
  value?: Maybe<FieldWrapper<Scalars['String']>>
}

/** response of any mutation on the table "GrantTags" */
export type IGrantTags_Mutation_Response = {
  __typename?: 'GrantTags_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<IGrantTags>>
}

/** input type for inserting object relation for remote table "GrantTags" */
export type IGrantTags_Obj_Rel_Insert_Input = {
  data: IGrantTags_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<IGrantTags_On_Conflict>
}

/** on_conflict condition type for table "GrantTags" */
export type IGrantTags_On_Conflict = {
  constraint: GrantTags_Constraint
  update_columns?: Array<GrantTags_Update_Column>
  where?: InputMaybe<IGrantTags_Bool_Exp>
}

/** Ordering options when selecting data from "GrantTags". */
export type IGrantTags_Order_By = {
  bridgeWithGrant_aggregate?: InputMaybe<IGrantTagsBridge_Aggregate_Order_By>
  id?: InputMaybe<Order_By>
  label?: InputMaybe<Order_By>
  value?: InputMaybe<Order_By>
}

/** primary key columns input for table: GrantTags */
export type IGrantTags_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "GrantTags" */
export enum GrantTags_Select_Column {
  /** column name */
  id = 'id',
  /** column name */
  label = 'label',
  /** column name */
  value = 'value',
}

/** input type for updating data in table "GrantTags" */
export type IGrantTags_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>
  label?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
}

/** update columns of table "GrantTags" */
export enum GrantTags_Update_Column {
  /** column name */
  id = 'id',
  /** column name */
  label = 'label',
  /** column name */
  value = 'value',
}

/** columns and relationships of "Grants" */
export type IGrants = {
  __typename?: 'Grants'
  /** An array relationship */
  Likes: Array<FieldWrapper<ILikes>>
  /** An aggregate relationship */
  Likes_aggregate: FieldWrapper<ILikes_Aggregate>
  allowDonations: FieldWrapper<Scalars['Boolean']>
  /** An object relationship */
  author?: Maybe<FieldWrapper<IUser>>
  authorId?: Maybe<FieldWrapper<Scalars['uuid']>>
  /** An array relationship */
  categories: Array<FieldWrapper<IGrantCategoriesBridge>>
  /** An aggregate relationship */
  categories_aggregate: FieldWrapper<IGrantCategoriesBridge_Aggregate>
  created_at?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  descriptiveTextFields?: Maybe<FieldWrapper<Scalars['json']>>
  externalLink?: Maybe<FieldWrapper<Scalars['String']>>
  featured?: Maybe<FieldWrapper<Scalars['Boolean']>>
  /** An array relationship */
  follows: Array<FieldWrapper<IFollows>>
  /** An aggregate relationship */
  follows_aggregate: FieldWrapper<IFollows_Aggregate>
  /** An array relationship */
  grantCycles: Array<FieldWrapper<IGrantCycles>>
  /** An aggregate relationship */
  grantCycles_aggregate: FieldWrapper<IGrantCycles_Aggregate>
  heroImage?: Maybe<FieldWrapper<Scalars['String']>>
  id: FieldWrapper<Scalars['uuid']>
  length?: Maybe<FieldWrapper<Scalars['numeric']>>
  location?: Maybe<FieldWrapper<Scalars['String']>>
  /** An array relationship */
  ownersTiers: Array<FieldWrapper<IGrantOwnersTiers>>
  /** An aggregate relationship */
  ownersTiers_aggregate: FieldWrapper<IGrantOwnersTiers_Aggregate>
  projectSubmissionURL?: Maybe<FieldWrapper<Scalars['String']>>
  settings?: Maybe<FieldWrapper<Scalars['json']>>
  sponsors?: Maybe<FieldWrapper<Scalars['json']>>
  status?: Maybe<FieldWrapper<Scalars['String']>>
  submitionType?: Maybe<FieldWrapper<Scalars['String']>>
  /** An array relationship */
  tags: Array<FieldWrapper<IGrantTagsBridge>>
  /** An aggregate relationship */
  tags_aggregate: FieldWrapper<IGrantTagsBridge_Aggregate>
  timezone?: Maybe<FieldWrapper<Scalars['String']>>
  title: FieldWrapper<Scalars['String']>
  titleURL: FieldWrapper<Scalars['String']>
}

/** columns and relationships of "Grants" */
export type IGrantsLikesArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ILikes_Order_By>>
  where?: InputMaybe<ILikes_Bool_Exp>
}

/** columns and relationships of "Grants" */
export type IGrantsLikes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ILikes_Order_By>>
  where?: InputMaybe<ILikes_Bool_Exp>
}

/** columns and relationships of "Grants" */
export type IGrantsCategoriesArgs = {
  distinct_on?: InputMaybe<Array<GrantCategoriesBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantCategoriesBridge_Order_By>>
  where?: InputMaybe<IGrantCategoriesBridge_Bool_Exp>
}

/** columns and relationships of "Grants" */
export type IGrantsCategories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantCategoriesBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantCategoriesBridge_Order_By>>
  where?: InputMaybe<IGrantCategoriesBridge_Bool_Exp>
}

/** columns and relationships of "Grants" */
export type IGrantsDescriptiveTextFieldsArgs = {
  path?: InputMaybe<Scalars['String']>
}

/** columns and relationships of "Grants" */
export type IGrantsFollowsArgs = {
  distinct_on?: InputMaybe<Array<Follows_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IFollows_Order_By>>
  where?: InputMaybe<IFollows_Bool_Exp>
}

/** columns and relationships of "Grants" */
export type IGrantsFollows_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Follows_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IFollows_Order_By>>
  where?: InputMaybe<IFollows_Bool_Exp>
}

/** columns and relationships of "Grants" */
export type IGrantsGrantCyclesArgs = {
  distinct_on?: InputMaybe<Array<GrantCycles_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantCycles_Order_By>>
  where?: InputMaybe<IGrantCycles_Bool_Exp>
}

/** columns and relationships of "Grants" */
export type IGrantsGrantCycles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantCycles_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantCycles_Order_By>>
  where?: InputMaybe<IGrantCycles_Bool_Exp>
}

/** columns and relationships of "Grants" */
export type IGrantsOwnersTiersArgs = {
  distinct_on?: InputMaybe<Array<GrantOwnersTiers_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantOwnersTiers_Order_By>>
  where?: InputMaybe<IGrantOwnersTiers_Bool_Exp>
}

/** columns and relationships of "Grants" */
export type IGrantsOwnersTiers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantOwnersTiers_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantOwnersTiers_Order_By>>
  where?: InputMaybe<IGrantOwnersTiers_Bool_Exp>
}

/** columns and relationships of "Grants" */
export type IGrantsSettingsArgs = {
  path?: InputMaybe<Scalars['String']>
}

/** columns and relationships of "Grants" */
export type IGrantsSponsorsArgs = {
  path?: InputMaybe<Scalars['String']>
}

/** columns and relationships of "Grants" */
export type IGrantsTagsArgs = {
  distinct_on?: InputMaybe<Array<GrantTagsBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantTagsBridge_Order_By>>
  where?: InputMaybe<IGrantTagsBridge_Bool_Exp>
}

/** columns and relationships of "Grants" */
export type IGrantsTags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantTagsBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantTagsBridge_Order_By>>
  where?: InputMaybe<IGrantTagsBridge_Bool_Exp>
}

/** aggregated selection of "Grants" */
export type IGrants_Aggregate = {
  __typename?: 'Grants_aggregate'
  aggregate?: Maybe<FieldWrapper<IGrants_Aggregate_Fields>>
  nodes: Array<FieldWrapper<IGrants>>
}

/** aggregate fields of "Grants" */
export type IGrants_Aggregate_Fields = {
  __typename?: 'Grants_aggregate_fields'
  avg?: Maybe<FieldWrapper<IGrants_Avg_Fields>>
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<IGrants_Max_Fields>>
  min?: Maybe<FieldWrapper<IGrants_Min_Fields>>
  stddev?: Maybe<FieldWrapper<IGrants_Stddev_Fields>>
  stddev_pop?: Maybe<FieldWrapper<IGrants_Stddev_Pop_Fields>>
  stddev_samp?: Maybe<FieldWrapper<IGrants_Stddev_Samp_Fields>>
  sum?: Maybe<FieldWrapper<IGrants_Sum_Fields>>
  var_pop?: Maybe<FieldWrapper<IGrants_Var_Pop_Fields>>
  var_samp?: Maybe<FieldWrapper<IGrants_Var_Samp_Fields>>
  variance?: Maybe<FieldWrapper<IGrants_Variance_Fields>>
}

/** aggregate fields of "Grants" */
export type IGrants_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Grants_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "Grants" */
export type IGrants_Aggregate_Order_By = {
  avg?: InputMaybe<IGrants_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<IGrants_Max_Order_By>
  min?: InputMaybe<IGrants_Min_Order_By>
  stddev?: InputMaybe<IGrants_Stddev_Order_By>
  stddev_pop?: InputMaybe<IGrants_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<IGrants_Stddev_Samp_Order_By>
  sum?: InputMaybe<IGrants_Sum_Order_By>
  var_pop?: InputMaybe<IGrants_Var_Pop_Order_By>
  var_samp?: InputMaybe<IGrants_Var_Samp_Order_By>
  variance?: InputMaybe<IGrants_Variance_Order_By>
}

/** input type for inserting array relation for remote table "Grants" */
export type IGrants_Arr_Rel_Insert_Input = {
  data: Array<IGrants_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<IGrants_On_Conflict>
}

/** aggregate avg on columns */
export type IGrants_Avg_Fields = {
  __typename?: 'Grants_avg_fields'
  length?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by avg() on columns of table "Grants" */
export type IGrants_Avg_Order_By = {
  length?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "Grants". All fields are combined with a logical 'AND'. */
export type IGrants_Bool_Exp = {
  Likes?: InputMaybe<ILikes_Bool_Exp>
  _and?: InputMaybe<Array<IGrants_Bool_Exp>>
  _not?: InputMaybe<IGrants_Bool_Exp>
  _or?: InputMaybe<Array<IGrants_Bool_Exp>>
  allowDonations?: InputMaybe<IBoolean_Comparison_Exp>
  author?: InputMaybe<IUser_Bool_Exp>
  authorId?: InputMaybe<IUuid_Comparison_Exp>
  categories?: InputMaybe<IGrantCategoriesBridge_Bool_Exp>
  created_at?: InputMaybe<ITimestamptz_Comparison_Exp>
  descriptiveTextFields?: InputMaybe<IJson_Comparison_Exp>
  externalLink?: InputMaybe<IString_Comparison_Exp>
  featured?: InputMaybe<IBoolean_Comparison_Exp>
  follows?: InputMaybe<IFollows_Bool_Exp>
  grantCycles?: InputMaybe<IGrantCycles_Bool_Exp>
  heroImage?: InputMaybe<IString_Comparison_Exp>
  id?: InputMaybe<IUuid_Comparison_Exp>
  length?: InputMaybe<INumeric_Comparison_Exp>
  location?: InputMaybe<IString_Comparison_Exp>
  ownersTiers?: InputMaybe<IGrantOwnersTiers_Bool_Exp>
  projectSubmissionURL?: InputMaybe<IString_Comparison_Exp>
  settings?: InputMaybe<IJson_Comparison_Exp>
  sponsors?: InputMaybe<IJson_Comparison_Exp>
  status?: InputMaybe<IString_Comparison_Exp>
  submitionType?: InputMaybe<IString_Comparison_Exp>
  tags?: InputMaybe<IGrantTagsBridge_Bool_Exp>
  timezone?: InputMaybe<IString_Comparison_Exp>
  title?: InputMaybe<IString_Comparison_Exp>
  titleURL?: InputMaybe<IString_Comparison_Exp>
}

/** unique or primary key constraints on table "Grants" */
export enum Grants_Constraint {
  /** unique or primary key constraint */
  grant_pkey = 'grant_pkey',
  /** unique or primary key constraint */
  grant_titleURL_key = 'grant_titleURL_key',
  /** unique or primary key constraint */
  grant_title_key = 'grant_title_key',
}

/** input type for incrementing numeric columns in table "Grants" */
export type IGrants_Inc_Input = {
  length?: InputMaybe<Scalars['numeric']>
}

/** input type for inserting data into table "Grants" */
export type IGrants_Insert_Input = {
  Likes?: InputMaybe<ILikes_Arr_Rel_Insert_Input>
  allowDonations?: InputMaybe<Scalars['Boolean']>
  author?: InputMaybe<IUser_Obj_Rel_Insert_Input>
  authorId?: InputMaybe<Scalars['uuid']>
  categories?: InputMaybe<IGrantCategoriesBridge_Arr_Rel_Insert_Input>
  created_at?: InputMaybe<Scalars['timestamptz']>
  descriptiveTextFields?: InputMaybe<Scalars['json']>
  externalLink?: InputMaybe<Scalars['String']>
  featured?: InputMaybe<Scalars['Boolean']>
  follows?: InputMaybe<IFollows_Arr_Rel_Insert_Input>
  grantCycles?: InputMaybe<IGrantCycles_Arr_Rel_Insert_Input>
  heroImage?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['uuid']>
  length?: InputMaybe<Scalars['numeric']>
  location?: InputMaybe<Scalars['String']>
  ownersTiers?: InputMaybe<IGrantOwnersTiers_Arr_Rel_Insert_Input>
  projectSubmissionURL?: InputMaybe<Scalars['String']>
  settings?: InputMaybe<Scalars['json']>
  sponsors?: InputMaybe<Scalars['json']>
  status?: InputMaybe<Scalars['String']>
  submitionType?: InputMaybe<Scalars['String']>
  tags?: InputMaybe<IGrantTagsBridge_Arr_Rel_Insert_Input>
  timezone?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
  titleURL?: InputMaybe<Scalars['String']>
}

/** aggregate max on columns */
export type IGrants_Max_Fields = {
  __typename?: 'Grants_max_fields'
  authorId?: Maybe<FieldWrapper<Scalars['uuid']>>
  created_at?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  externalLink?: Maybe<FieldWrapper<Scalars['String']>>
  heroImage?: Maybe<FieldWrapper<Scalars['String']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  length?: Maybe<FieldWrapper<Scalars['numeric']>>
  location?: Maybe<FieldWrapper<Scalars['String']>>
  projectSubmissionURL?: Maybe<FieldWrapper<Scalars['String']>>
  status?: Maybe<FieldWrapper<Scalars['String']>>
  submitionType?: Maybe<FieldWrapper<Scalars['String']>>
  timezone?: Maybe<FieldWrapper<Scalars['String']>>
  title?: Maybe<FieldWrapper<Scalars['String']>>
  titleURL?: Maybe<FieldWrapper<Scalars['String']>>
}

/** order by max() on columns of table "Grants" */
export type IGrants_Max_Order_By = {
  authorId?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  externalLink?: InputMaybe<Order_By>
  heroImage?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  length?: InputMaybe<Order_By>
  location?: InputMaybe<Order_By>
  projectSubmissionURL?: InputMaybe<Order_By>
  status?: InputMaybe<Order_By>
  submitionType?: InputMaybe<Order_By>
  timezone?: InputMaybe<Order_By>
  title?: InputMaybe<Order_By>
  titleURL?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type IGrants_Min_Fields = {
  __typename?: 'Grants_min_fields'
  authorId?: Maybe<FieldWrapper<Scalars['uuid']>>
  created_at?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  externalLink?: Maybe<FieldWrapper<Scalars['String']>>
  heroImage?: Maybe<FieldWrapper<Scalars['String']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  length?: Maybe<FieldWrapper<Scalars['numeric']>>
  location?: Maybe<FieldWrapper<Scalars['String']>>
  projectSubmissionURL?: Maybe<FieldWrapper<Scalars['String']>>
  status?: Maybe<FieldWrapper<Scalars['String']>>
  submitionType?: Maybe<FieldWrapper<Scalars['String']>>
  timezone?: Maybe<FieldWrapper<Scalars['String']>>
  title?: Maybe<FieldWrapper<Scalars['String']>>
  titleURL?: Maybe<FieldWrapper<Scalars['String']>>
}

/** order by min() on columns of table "Grants" */
export type IGrants_Min_Order_By = {
  authorId?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  externalLink?: InputMaybe<Order_By>
  heroImage?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  length?: InputMaybe<Order_By>
  location?: InputMaybe<Order_By>
  projectSubmissionURL?: InputMaybe<Order_By>
  status?: InputMaybe<Order_By>
  submitionType?: InputMaybe<Order_By>
  timezone?: InputMaybe<Order_By>
  title?: InputMaybe<Order_By>
  titleURL?: InputMaybe<Order_By>
}

/** response of any mutation on the table "Grants" */
export type IGrants_Mutation_Response = {
  __typename?: 'Grants_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<IGrants>>
}

/** input type for inserting object relation for remote table "Grants" */
export type IGrants_Obj_Rel_Insert_Input = {
  data: IGrants_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<IGrants_On_Conflict>
}

/** on_conflict condition type for table "Grants" */
export type IGrants_On_Conflict = {
  constraint: Grants_Constraint
  update_columns?: Array<Grants_Update_Column>
  where?: InputMaybe<IGrants_Bool_Exp>
}

/** Ordering options when selecting data from "Grants". */
export type IGrants_Order_By = {
  Likes_aggregate?: InputMaybe<ILikes_Aggregate_Order_By>
  allowDonations?: InputMaybe<Order_By>
  author?: InputMaybe<IUser_Order_By>
  authorId?: InputMaybe<Order_By>
  categories_aggregate?: InputMaybe<IGrantCategoriesBridge_Aggregate_Order_By>
  created_at?: InputMaybe<Order_By>
  descriptiveTextFields?: InputMaybe<Order_By>
  externalLink?: InputMaybe<Order_By>
  featured?: InputMaybe<Order_By>
  follows_aggregate?: InputMaybe<IFollows_Aggregate_Order_By>
  grantCycles_aggregate?: InputMaybe<IGrantCycles_Aggregate_Order_By>
  heroImage?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  length?: InputMaybe<Order_By>
  location?: InputMaybe<Order_By>
  ownersTiers_aggregate?: InputMaybe<IGrantOwnersTiers_Aggregate_Order_By>
  projectSubmissionURL?: InputMaybe<Order_By>
  settings?: InputMaybe<Order_By>
  sponsors?: InputMaybe<Order_By>
  status?: InputMaybe<Order_By>
  submitionType?: InputMaybe<Order_By>
  tags_aggregate?: InputMaybe<IGrantTagsBridge_Aggregate_Order_By>
  timezone?: InputMaybe<Order_By>
  title?: InputMaybe<Order_By>
  titleURL?: InputMaybe<Order_By>
}

/** primary key columns input for table: Grants */
export type IGrants_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "Grants" */
export enum Grants_Select_Column {
  /** column name */
  allowDonations = 'allowDonations',
  /** column name */
  authorId = 'authorId',
  /** column name */
  created_at = 'created_at',
  /** column name */
  descriptiveTextFields = 'descriptiveTextFields',
  /** column name */
  externalLink = 'externalLink',
  /** column name */
  featured = 'featured',
  /** column name */
  heroImage = 'heroImage',
  /** column name */
  id = 'id',
  /** column name */
  length = 'length',
  /** column name */
  location = 'location',
  /** column name */
  projectSubmissionURL = 'projectSubmissionURL',
  /** column name */
  settings = 'settings',
  /** column name */
  sponsors = 'sponsors',
  /** column name */
  status = 'status',
  /** column name */
  submitionType = 'submitionType',
  /** column name */
  timezone = 'timezone',
  /** column name */
  title = 'title',
  /** column name */
  titleURL = 'titleURL',
}

/** input type for updating data in table "Grants" */
export type IGrants_Set_Input = {
  allowDonations?: InputMaybe<Scalars['Boolean']>
  authorId?: InputMaybe<Scalars['uuid']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  descriptiveTextFields?: InputMaybe<Scalars['json']>
  externalLink?: InputMaybe<Scalars['String']>
  featured?: InputMaybe<Scalars['Boolean']>
  heroImage?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['uuid']>
  length?: InputMaybe<Scalars['numeric']>
  location?: InputMaybe<Scalars['String']>
  projectSubmissionURL?: InputMaybe<Scalars['String']>
  settings?: InputMaybe<Scalars['json']>
  sponsors?: InputMaybe<Scalars['json']>
  status?: InputMaybe<Scalars['String']>
  submitionType?: InputMaybe<Scalars['String']>
  timezone?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
  titleURL?: InputMaybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type IGrants_Stddev_Fields = {
  __typename?: 'Grants_stddev_fields'
  length?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev() on columns of table "Grants" */
export type IGrants_Stddev_Order_By = {
  length?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type IGrants_Stddev_Pop_Fields = {
  __typename?: 'Grants_stddev_pop_fields'
  length?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev_pop() on columns of table "Grants" */
export type IGrants_Stddev_Pop_Order_By = {
  length?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type IGrants_Stddev_Samp_Fields = {
  __typename?: 'Grants_stddev_samp_fields'
  length?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev_samp() on columns of table "Grants" */
export type IGrants_Stddev_Samp_Order_By = {
  length?: InputMaybe<Order_By>
}

/** aggregate sum on columns */
export type IGrants_Sum_Fields = {
  __typename?: 'Grants_sum_fields'
  length?: Maybe<FieldWrapper<Scalars['numeric']>>
}

/** order by sum() on columns of table "Grants" */
export type IGrants_Sum_Order_By = {
  length?: InputMaybe<Order_By>
}

/** update columns of table "Grants" */
export enum Grants_Update_Column {
  /** column name */
  allowDonations = 'allowDonations',
  /** column name */
  authorId = 'authorId',
  /** column name */
  created_at = 'created_at',
  /** column name */
  descriptiveTextFields = 'descriptiveTextFields',
  /** column name */
  externalLink = 'externalLink',
  /** column name */
  featured = 'featured',
  /** column name */
  heroImage = 'heroImage',
  /** column name */
  id = 'id',
  /** column name */
  length = 'length',
  /** column name */
  location = 'location',
  /** column name */
  projectSubmissionURL = 'projectSubmissionURL',
  /** column name */
  settings = 'settings',
  /** column name */
  sponsors = 'sponsors',
  /** column name */
  status = 'status',
  /** column name */
  submitionType = 'submitionType',
  /** column name */
  timezone = 'timezone',
  /** column name */
  title = 'title',
  /** column name */
  titleURL = 'titleURL',
}

/** aggregate var_pop on columns */
export type IGrants_Var_Pop_Fields = {
  __typename?: 'Grants_var_pop_fields'
  length?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by var_pop() on columns of table "Grants" */
export type IGrants_Var_Pop_Order_By = {
  length?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type IGrants_Var_Samp_Fields = {
  __typename?: 'Grants_var_samp_fields'
  length?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by var_samp() on columns of table "Grants" */
export type IGrants_Var_Samp_Order_By = {
  length?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type IGrants_Variance_Fields = {
  __typename?: 'Grants_variance_fields'
  length?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by variance() on columns of table "Grants" */
export type IGrants_Variance_Order_By = {
  length?: InputMaybe<Order_By>
}

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IInt_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>
  _gt?: InputMaybe<Scalars['Int']>
  _gte?: InputMaybe<Scalars['Int']>
  _in?: InputMaybe<Array<Scalars['Int']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['Int']>
  _lte?: InputMaybe<Scalars['Int']>
  _neq?: InputMaybe<Scalars['Int']>
  _nin?: InputMaybe<Array<Scalars['Int']>>
}

/** columns and relationships of "Likes" */
export type ILikes = {
  __typename?: 'Likes'
  /** An object relationship */
  Grant?: Maybe<FieldWrapper<IGrants>>
  /** An object relationship */
  Project?: Maybe<FieldWrapper<IProject>>
  /** An object relationship */
  User: FieldWrapper<IUser>
  fromUserId: FieldWrapper<Scalars['uuid']>
  id: FieldWrapper<Scalars['uuid']>
  toGrantId?: Maybe<FieldWrapper<Scalars['uuid']>>
  toProjectId?: Maybe<FieldWrapper<Scalars['uuid']>>
  toUserId?: Maybe<FieldWrapper<Scalars['uuid']>>
  type: FieldWrapper<Scalars['String']>
  /** An object relationship */
  userByTouserid?: Maybe<FieldWrapper<IUser>>
}

/** aggregated selection of "Likes" */
export type ILikes_Aggregate = {
  __typename?: 'Likes_aggregate'
  aggregate?: Maybe<FieldWrapper<ILikes_Aggregate_Fields>>
  nodes: Array<FieldWrapper<ILikes>>
}

/** aggregate fields of "Likes" */
export type ILikes_Aggregate_Fields = {
  __typename?: 'Likes_aggregate_fields'
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<ILikes_Max_Fields>>
  min?: Maybe<FieldWrapper<ILikes_Min_Fields>>
}

/** aggregate fields of "Likes" */
export type ILikes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Likes_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "Likes" */
export type ILikes_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>
  max?: InputMaybe<ILikes_Max_Order_By>
  min?: InputMaybe<ILikes_Min_Order_By>
}

/** input type for inserting array relation for remote table "Likes" */
export type ILikes_Arr_Rel_Insert_Input = {
  data: Array<ILikes_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<ILikes_On_Conflict>
}

/** Boolean expression to filter rows from the table "Likes". All fields are combined with a logical 'AND'. */
export type ILikes_Bool_Exp = {
  Grant?: InputMaybe<IGrants_Bool_Exp>
  Project?: InputMaybe<IProject_Bool_Exp>
  User?: InputMaybe<IUser_Bool_Exp>
  _and?: InputMaybe<Array<ILikes_Bool_Exp>>
  _not?: InputMaybe<ILikes_Bool_Exp>
  _or?: InputMaybe<Array<ILikes_Bool_Exp>>
  fromUserId?: InputMaybe<IUuid_Comparison_Exp>
  id?: InputMaybe<IUuid_Comparison_Exp>
  toGrantId?: InputMaybe<IUuid_Comparison_Exp>
  toProjectId?: InputMaybe<IUuid_Comparison_Exp>
  toUserId?: InputMaybe<IUuid_Comparison_Exp>
  type?: InputMaybe<IString_Comparison_Exp>
  userByTouserid?: InputMaybe<IUser_Bool_Exp>
}

/** unique or primary key constraints on table "Likes" */
export enum Likes_Constraint {
  /** unique or primary key constraint */
  Likes_pkey = 'Likes_pkey',
}

/** input type for inserting data into table "Likes" */
export type ILikes_Insert_Input = {
  Grant?: InputMaybe<IGrants_Obj_Rel_Insert_Input>
  Project?: InputMaybe<IProject_Obj_Rel_Insert_Input>
  User?: InputMaybe<IUser_Obj_Rel_Insert_Input>
  fromUserId?: InputMaybe<Scalars['uuid']>
  id?: InputMaybe<Scalars['uuid']>
  toGrantId?: InputMaybe<Scalars['uuid']>
  toProjectId?: InputMaybe<Scalars['uuid']>
  toUserId?: InputMaybe<Scalars['uuid']>
  type?: InputMaybe<Scalars['String']>
  userByTouserid?: InputMaybe<IUser_Obj_Rel_Insert_Input>
}

/** aggregate max on columns */
export type ILikes_Max_Fields = {
  __typename?: 'Likes_max_fields'
  fromUserId?: Maybe<FieldWrapper<Scalars['uuid']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  toGrantId?: Maybe<FieldWrapper<Scalars['uuid']>>
  toProjectId?: Maybe<FieldWrapper<Scalars['uuid']>>
  toUserId?: Maybe<FieldWrapper<Scalars['uuid']>>
  type?: Maybe<FieldWrapper<Scalars['String']>>
}

/** order by max() on columns of table "Likes" */
export type ILikes_Max_Order_By = {
  fromUserId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  toGrantId?: InputMaybe<Order_By>
  toProjectId?: InputMaybe<Order_By>
  toUserId?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type ILikes_Min_Fields = {
  __typename?: 'Likes_min_fields'
  fromUserId?: Maybe<FieldWrapper<Scalars['uuid']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  toGrantId?: Maybe<FieldWrapper<Scalars['uuid']>>
  toProjectId?: Maybe<FieldWrapper<Scalars['uuid']>>
  toUserId?: Maybe<FieldWrapper<Scalars['uuid']>>
  type?: Maybe<FieldWrapper<Scalars['String']>>
}

/** order by min() on columns of table "Likes" */
export type ILikes_Min_Order_By = {
  fromUserId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  toGrantId?: InputMaybe<Order_By>
  toProjectId?: InputMaybe<Order_By>
  toUserId?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
}

/** response of any mutation on the table "Likes" */
export type ILikes_Mutation_Response = {
  __typename?: 'Likes_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<ILikes>>
}

/** on_conflict condition type for table "Likes" */
export type ILikes_On_Conflict = {
  constraint: Likes_Constraint
  update_columns?: Array<Likes_Update_Column>
  where?: InputMaybe<ILikes_Bool_Exp>
}

/** Ordering options when selecting data from "Likes". */
export type ILikes_Order_By = {
  Grant?: InputMaybe<IGrants_Order_By>
  Project?: InputMaybe<IProject_Order_By>
  User?: InputMaybe<IUser_Order_By>
  fromUserId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  toGrantId?: InputMaybe<Order_By>
  toProjectId?: InputMaybe<Order_By>
  toUserId?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
  userByTouserid?: InputMaybe<IUser_Order_By>
}

/** primary key columns input for table: Likes */
export type ILikes_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "Likes" */
export enum Likes_Select_Column {
  /** column name */
  fromUserId = 'fromUserId',
  /** column name */
  id = 'id',
  /** column name */
  toGrantId = 'toGrantId',
  /** column name */
  toProjectId = 'toProjectId',
  /** column name */
  toUserId = 'toUserId',
  /** column name */
  type = 'type',
}

/** input type for updating data in table "Likes" */
export type ILikes_Set_Input = {
  fromUserId?: InputMaybe<Scalars['uuid']>
  id?: InputMaybe<Scalars['uuid']>
  toGrantId?: InputMaybe<Scalars['uuid']>
  toProjectId?: InputMaybe<Scalars['uuid']>
  toUserId?: InputMaybe<Scalars['uuid']>
  type?: InputMaybe<Scalars['String']>
}

/** update columns of table "Likes" */
export enum Likes_Update_Column {
  /** column name */
  fromUserId = 'fromUserId',
  /** column name */
  id = 'id',
  /** column name */
  toGrantId = 'toGrantId',
  /** column name */
  toProjectId = 'toProjectId',
  /** column name */
  toUserId = 'toUserId',
  /** column name */
  type = 'type',
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  asc = 'asc',
  desc = 'desc',
}

/** columns and relationships of "Project" */
export type IProject = {
  __typename?: 'Project'
  /** An array relationship */
  GrantSubmitions: Array<FieldWrapper<IGrantSubmissions>>
  /** An aggregate relationship */
  GrantSubmitions_aggregate: FieldWrapper<IGrantSubmissions_Aggregate>
  /** An array relationship */
  Likes: Array<FieldWrapper<ILikes>>
  /** An aggregate relationship */
  Likes_aggregate: FieldWrapper<ILikes_Aggregate>
  /** An object relationship */
  ProjectTagBridge?: Maybe<FieldWrapper<IProjectTag>>
  activityId?: Maybe<FieldWrapper<Scalars['uuid']>>
  /** An object relationship */
  author?: Maybe<FieldWrapper<IUser>>
  author_id?: Maybe<FieldWrapper<Scalars['uuid']>>
  category?: Maybe<FieldWrapper<Scalars['String']>>
  created_at?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  currentInvested?: Maybe<FieldWrapper<Scalars['Int']>>
  description?: Maybe<FieldWrapper<Scalars['String']>>
  displayType?: Maybe<FieldWrapper<Scalars['String']>>
  featured: FieldWrapper<Scalars['Boolean']>
  gallery?: Maybe<FieldWrapper<Scalars['json']>>
  hideBudget?: Maybe<FieldWrapper<Scalars['Boolean']>>
  id: FieldWrapper<Scalars['uuid']>
  imageUrl?: Maybe<FieldWrapper<Scalars['String']>>
  /** An array relationship */
  members: Array<FieldWrapper<IProjectMembers>>
  /** An aggregate relationship */
  members_aggregate: FieldWrapper<IProjectMembers_Aggregate>
  onChainId?: Maybe<FieldWrapper<Scalars['Int']>>
  pitchDeck?: Maybe<FieldWrapper<Scalars['String']>>
  /** An array relationship */
  projectTags: Array<FieldWrapper<IProjectTagsBridge>>
  /** An aggregate relationship */
  projectTags_aggregate: FieldWrapper<IProjectTagsBridge_Aggregate>
  /** An array relationship */
  projectTypes: Array<FieldWrapper<IProjectTypeBridge>>
  /** An aggregate relationship */
  projectTypes_aggregate: FieldWrapper<IProjectTypeBridge_Aggregate>
  subdescription?: Maybe<FieldWrapper<Scalars['String']>>
  tagBridgeId?: Maybe<FieldWrapper<Scalars['uuid']>>
  title: FieldWrapper<Scalars['String']>
  titleURL: FieldWrapper<Scalars['String']>
  totalInvested?: Maybe<FieldWrapper<Scalars['Int']>>
  updated_at?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  videoHeroImg?: Maybe<FieldWrapper<Scalars['String']>>
  videoOverview?: Maybe<FieldWrapper<Scalars['String']>>
}

/** columns and relationships of "Project" */
export type IProjectGrantSubmitionsArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantSubmissions_Order_By>>
  where?: InputMaybe<IGrantSubmissions_Bool_Exp>
}

/** columns and relationships of "Project" */
export type IProjectGrantSubmitions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantSubmissions_Order_By>>
  where?: InputMaybe<IGrantSubmissions_Bool_Exp>
}

/** columns and relationships of "Project" */
export type IProjectLikesArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ILikes_Order_By>>
  where?: InputMaybe<ILikes_Bool_Exp>
}

/** columns and relationships of "Project" */
export type IProjectLikes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ILikes_Order_By>>
  where?: InputMaybe<ILikes_Bool_Exp>
}

/** columns and relationships of "Project" */
export type IProjectGalleryArgs = {
  path?: InputMaybe<Scalars['String']>
}

/** columns and relationships of "Project" */
export type IProjectMembersArgs = {
  distinct_on?: InputMaybe<Array<ProjectMembers_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectMembers_Order_By>>
  where?: InputMaybe<IProjectMembers_Bool_Exp>
}

/** columns and relationships of "Project" */
export type IProjectMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectMembers_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectMembers_Order_By>>
  where?: InputMaybe<IProjectMembers_Bool_Exp>
}

/** columns and relationships of "Project" */
export type IProjectProjectTagsArgs = {
  distinct_on?: InputMaybe<Array<ProjectTagsBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectTagsBridge_Order_By>>
  where?: InputMaybe<IProjectTagsBridge_Bool_Exp>
}

/** columns and relationships of "Project" */
export type IProjectProjectTags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectTagsBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectTagsBridge_Order_By>>
  where?: InputMaybe<IProjectTagsBridge_Bool_Exp>
}

/** columns and relationships of "Project" */
export type IProjectProjectTypesArgs = {
  distinct_on?: InputMaybe<Array<ProjectTypeBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectTypeBridge_Order_By>>
  where?: InputMaybe<IProjectTypeBridge_Bool_Exp>
}

/** columns and relationships of "Project" */
export type IProjectProjectTypes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectTypeBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectTypeBridge_Order_By>>
  where?: InputMaybe<IProjectTypeBridge_Bool_Exp>
}

/** columns and relationships of "ProjectMembers" */
export type IProjectMembers = {
  __typename?: 'ProjectMembers'
  admin: FieldWrapper<Scalars['Boolean']>
  created_at?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  id: FieldWrapper<Scalars['uuid']>
  /** An object relationship */
  project?: Maybe<FieldWrapper<IProject>>
  projectId?: Maybe<FieldWrapper<Scalars['uuid']>>
  role: FieldWrapper<Scalars['String']>
  titleonproject: FieldWrapper<Scalars['String']>
  /** An object relationship */
  user?: Maybe<FieldWrapper<IUser>>
  userId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** aggregated selection of "ProjectMembers" */
export type IProjectMembers_Aggregate = {
  __typename?: 'ProjectMembers_aggregate'
  aggregate?: Maybe<FieldWrapper<IProjectMembers_Aggregate_Fields>>
  nodes: Array<FieldWrapper<IProjectMembers>>
}

/** aggregate fields of "ProjectMembers" */
export type IProjectMembers_Aggregate_Fields = {
  __typename?: 'ProjectMembers_aggregate_fields'
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<IProjectMembers_Max_Fields>>
  min?: Maybe<FieldWrapper<IProjectMembers_Min_Fields>>
}

/** aggregate fields of "ProjectMembers" */
export type IProjectMembers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ProjectMembers_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "ProjectMembers" */
export type IProjectMembers_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>
  max?: InputMaybe<IProjectMembers_Max_Order_By>
  min?: InputMaybe<IProjectMembers_Min_Order_By>
}

/** input type for inserting array relation for remote table "ProjectMembers" */
export type IProjectMembers_Arr_Rel_Insert_Input = {
  data: Array<IProjectMembers_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<IProjectMembers_On_Conflict>
}

/** Boolean expression to filter rows from the table "ProjectMembers". All fields are combined with a logical 'AND'. */
export type IProjectMembers_Bool_Exp = {
  _and?: InputMaybe<Array<IProjectMembers_Bool_Exp>>
  _not?: InputMaybe<IProjectMembers_Bool_Exp>
  _or?: InputMaybe<Array<IProjectMembers_Bool_Exp>>
  admin?: InputMaybe<IBoolean_Comparison_Exp>
  created_at?: InputMaybe<ITimestamptz_Comparison_Exp>
  id?: InputMaybe<IUuid_Comparison_Exp>
  project?: InputMaybe<IProject_Bool_Exp>
  projectId?: InputMaybe<IUuid_Comparison_Exp>
  role?: InputMaybe<IString_Comparison_Exp>
  titleonproject?: InputMaybe<IString_Comparison_Exp>
  user?: InputMaybe<IUser_Bool_Exp>
  userId?: InputMaybe<IUuid_Comparison_Exp>
}

/** unique or primary key constraints on table "ProjectMembers" */
export enum ProjectMembers_Constraint {
  /** unique or primary key constraint */
  ProjectMembers_pkey = 'ProjectMembers_pkey',
}

/** input type for inserting data into table "ProjectMembers" */
export type IProjectMembers_Insert_Input = {
  admin?: InputMaybe<Scalars['Boolean']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  id?: InputMaybe<Scalars['uuid']>
  project?: InputMaybe<IProject_Obj_Rel_Insert_Input>
  projectId?: InputMaybe<Scalars['uuid']>
  role?: InputMaybe<Scalars['String']>
  titleonproject?: InputMaybe<Scalars['String']>
  user?: InputMaybe<IUser_Obj_Rel_Insert_Input>
  userId?: InputMaybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type IProjectMembers_Max_Fields = {
  __typename?: 'ProjectMembers_max_fields'
  created_at?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  projectId?: Maybe<FieldWrapper<Scalars['uuid']>>
  role?: Maybe<FieldWrapper<Scalars['String']>>
  titleonproject?: Maybe<FieldWrapper<Scalars['String']>>
  userId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** order by max() on columns of table "ProjectMembers" */
export type IProjectMembers_Max_Order_By = {
  created_at?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  projectId?: InputMaybe<Order_By>
  role?: InputMaybe<Order_By>
  titleonproject?: InputMaybe<Order_By>
  userId?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type IProjectMembers_Min_Fields = {
  __typename?: 'ProjectMembers_min_fields'
  created_at?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  projectId?: Maybe<FieldWrapper<Scalars['uuid']>>
  role?: Maybe<FieldWrapper<Scalars['String']>>
  titleonproject?: Maybe<FieldWrapper<Scalars['String']>>
  userId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** order by min() on columns of table "ProjectMembers" */
export type IProjectMembers_Min_Order_By = {
  created_at?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  projectId?: InputMaybe<Order_By>
  role?: InputMaybe<Order_By>
  titleonproject?: InputMaybe<Order_By>
  userId?: InputMaybe<Order_By>
}

/** response of any mutation on the table "ProjectMembers" */
export type IProjectMembers_Mutation_Response = {
  __typename?: 'ProjectMembers_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<IProjectMembers>>
}

/** on_conflict condition type for table "ProjectMembers" */
export type IProjectMembers_On_Conflict = {
  constraint: ProjectMembers_Constraint
  update_columns?: Array<ProjectMembers_Update_Column>
  where?: InputMaybe<IProjectMembers_Bool_Exp>
}

/** Ordering options when selecting data from "ProjectMembers". */
export type IProjectMembers_Order_By = {
  admin?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  project?: InputMaybe<IProject_Order_By>
  projectId?: InputMaybe<Order_By>
  role?: InputMaybe<Order_By>
  titleonproject?: InputMaybe<Order_By>
  user?: InputMaybe<IUser_Order_By>
  userId?: InputMaybe<Order_By>
}

/** primary key columns input for table: ProjectMembers */
export type IProjectMembers_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "ProjectMembers" */
export enum ProjectMembers_Select_Column {
  /** column name */
  admin = 'admin',
  /** column name */
  created_at = 'created_at',
  /** column name */
  id = 'id',
  /** column name */
  projectId = 'projectId',
  /** column name */
  role = 'role',
  /** column name */
  titleonproject = 'titleonproject',
  /** column name */
  userId = 'userId',
}

/** input type for updating data in table "ProjectMembers" */
export type IProjectMembers_Set_Input = {
  admin?: InputMaybe<Scalars['Boolean']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  id?: InputMaybe<Scalars['uuid']>
  projectId?: InputMaybe<Scalars['uuid']>
  role?: InputMaybe<Scalars['String']>
  titleonproject?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['uuid']>
}

/** update columns of table "ProjectMembers" */
export enum ProjectMembers_Update_Column {
  /** column name */
  admin = 'admin',
  /** column name */
  created_at = 'created_at',
  /** column name */
  id = 'id',
  /** column name */
  projectId = 'projectId',
  /** column name */
  role = 'role',
  /** column name */
  titleonproject = 'titleonproject',
  /** column name */
  userId = 'userId',
}

/** columns and relationships of "ProjectTag" */
export type IProjectTag = {
  __typename?: 'ProjectTag'
  /** An array relationship */
  Projects: Array<FieldWrapper<IProject>>
  /** An aggregate relationship */
  Projects_aggregate: FieldWrapper<IProject_Aggregate>
  id: FieldWrapper<Scalars['uuid']>
  label: FieldWrapper<Scalars['String']>
  /** An array relationship */
  projectTags: Array<FieldWrapper<IProjectTagsBridge>>
  /** An aggregate relationship */
  projectTags_aggregate: FieldWrapper<IProjectTagsBridge_Aggregate>
  value: FieldWrapper<Scalars['String']>
}

/** columns and relationships of "ProjectTag" */
export type IProjectTagProjectsArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProject_Order_By>>
  where?: InputMaybe<IProject_Bool_Exp>
}

/** columns and relationships of "ProjectTag" */
export type IProjectTagProjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProject_Order_By>>
  where?: InputMaybe<IProject_Bool_Exp>
}

/** columns and relationships of "ProjectTag" */
export type IProjectTagProjectTagsArgs = {
  distinct_on?: InputMaybe<Array<ProjectTagsBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectTagsBridge_Order_By>>
  where?: InputMaybe<IProjectTagsBridge_Bool_Exp>
}

/** columns and relationships of "ProjectTag" */
export type IProjectTagProjectTags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectTagsBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectTagsBridge_Order_By>>
  where?: InputMaybe<IProjectTagsBridge_Bool_Exp>
}

/** aggregated selection of "ProjectTag" */
export type IProjectTag_Aggregate = {
  __typename?: 'ProjectTag_aggregate'
  aggregate?: Maybe<FieldWrapper<IProjectTag_Aggregate_Fields>>
  nodes: Array<FieldWrapper<IProjectTag>>
}

/** aggregate fields of "ProjectTag" */
export type IProjectTag_Aggregate_Fields = {
  __typename?: 'ProjectTag_aggregate_fields'
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<IProjectTag_Max_Fields>>
  min?: Maybe<FieldWrapper<IProjectTag_Min_Fields>>
}

/** aggregate fields of "ProjectTag" */
export type IProjectTag_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ProjectTag_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "ProjectTag". All fields are combined with a logical 'AND'. */
export type IProjectTag_Bool_Exp = {
  Projects?: InputMaybe<IProject_Bool_Exp>
  _and?: InputMaybe<Array<IProjectTag_Bool_Exp>>
  _not?: InputMaybe<IProjectTag_Bool_Exp>
  _or?: InputMaybe<Array<IProjectTag_Bool_Exp>>
  id?: InputMaybe<IUuid_Comparison_Exp>
  label?: InputMaybe<IString_Comparison_Exp>
  projectTags?: InputMaybe<IProjectTagsBridge_Bool_Exp>
  value?: InputMaybe<IString_Comparison_Exp>
}

/** unique or primary key constraints on table "ProjectTag" */
export enum ProjectTag_Constraint {
  /** unique or primary key constraint */
  ProjectTag_pkey = 'ProjectTag_pkey',
  /** unique or primary key constraint */
  ProjectTag_value_key = 'ProjectTag_value_key',
}

/** input type for inserting data into table "ProjectTag" */
export type IProjectTag_Insert_Input = {
  Projects?: InputMaybe<IProject_Arr_Rel_Insert_Input>
  id?: InputMaybe<Scalars['uuid']>
  label?: InputMaybe<Scalars['String']>
  projectTags?: InputMaybe<IProjectTagsBridge_Arr_Rel_Insert_Input>
  value?: InputMaybe<Scalars['String']>
}

/** aggregate max on columns */
export type IProjectTag_Max_Fields = {
  __typename?: 'ProjectTag_max_fields'
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  label?: Maybe<FieldWrapper<Scalars['String']>>
  value?: Maybe<FieldWrapper<Scalars['String']>>
}

/** aggregate min on columns */
export type IProjectTag_Min_Fields = {
  __typename?: 'ProjectTag_min_fields'
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  label?: Maybe<FieldWrapper<Scalars['String']>>
  value?: Maybe<FieldWrapper<Scalars['String']>>
}

/** response of any mutation on the table "ProjectTag" */
export type IProjectTag_Mutation_Response = {
  __typename?: 'ProjectTag_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<IProjectTag>>
}

/** input type for inserting object relation for remote table "ProjectTag" */
export type IProjectTag_Obj_Rel_Insert_Input = {
  data: IProjectTag_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<IProjectTag_On_Conflict>
}

/** on_conflict condition type for table "ProjectTag" */
export type IProjectTag_On_Conflict = {
  constraint: ProjectTag_Constraint
  update_columns?: Array<ProjectTag_Update_Column>
  where?: InputMaybe<IProjectTag_Bool_Exp>
}

/** Ordering options when selecting data from "ProjectTag". */
export type IProjectTag_Order_By = {
  Projects_aggregate?: InputMaybe<IProject_Aggregate_Order_By>
  id?: InputMaybe<Order_By>
  label?: InputMaybe<Order_By>
  projectTags_aggregate?: InputMaybe<IProjectTagsBridge_Aggregate_Order_By>
  value?: InputMaybe<Order_By>
}

/** primary key columns input for table: ProjectTag */
export type IProjectTag_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "ProjectTag" */
export enum ProjectTag_Select_Column {
  /** column name */
  id = 'id',
  /** column name */
  label = 'label',
  /** column name */
  value = 'value',
}

/** input type for updating data in table "ProjectTag" */
export type IProjectTag_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>
  label?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
}

/** update columns of table "ProjectTag" */
export enum ProjectTag_Update_Column {
  /** column name */
  id = 'id',
  /** column name */
  label = 'label',
  /** column name */
  value = 'value',
}

/** columns and relationships of "ProjectTagsBridge" */
export type IProjectTagsBridge = {
  __typename?: 'ProjectTagsBridge'
  id: FieldWrapper<Scalars['uuid']>
  /** An object relationship */
  project?: Maybe<FieldWrapper<IProject>>
  projectId?: Maybe<FieldWrapper<Scalars['uuid']>>
  /** An object relationship */
  tag?: Maybe<FieldWrapper<IProjectTag>>
  tagId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** aggregated selection of "ProjectTagsBridge" */
export type IProjectTagsBridge_Aggregate = {
  __typename?: 'ProjectTagsBridge_aggregate'
  aggregate?: Maybe<FieldWrapper<IProjectTagsBridge_Aggregate_Fields>>
  nodes: Array<FieldWrapper<IProjectTagsBridge>>
}

/** aggregate fields of "ProjectTagsBridge" */
export type IProjectTagsBridge_Aggregate_Fields = {
  __typename?: 'ProjectTagsBridge_aggregate_fields'
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<IProjectTagsBridge_Max_Fields>>
  min?: Maybe<FieldWrapper<IProjectTagsBridge_Min_Fields>>
}

/** aggregate fields of "ProjectTagsBridge" */
export type IProjectTagsBridge_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ProjectTagsBridge_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "ProjectTagsBridge" */
export type IProjectTagsBridge_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>
  max?: InputMaybe<IProjectTagsBridge_Max_Order_By>
  min?: InputMaybe<IProjectTagsBridge_Min_Order_By>
}

/** input type for inserting array relation for remote table "ProjectTagsBridge" */
export type IProjectTagsBridge_Arr_Rel_Insert_Input = {
  data: Array<IProjectTagsBridge_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<IProjectTagsBridge_On_Conflict>
}

/** Boolean expression to filter rows from the table "ProjectTagsBridge". All fields are combined with a logical 'AND'. */
export type IProjectTagsBridge_Bool_Exp = {
  _and?: InputMaybe<Array<IProjectTagsBridge_Bool_Exp>>
  _not?: InputMaybe<IProjectTagsBridge_Bool_Exp>
  _or?: InputMaybe<Array<IProjectTagsBridge_Bool_Exp>>
  id?: InputMaybe<IUuid_Comparison_Exp>
  project?: InputMaybe<IProject_Bool_Exp>
  projectId?: InputMaybe<IUuid_Comparison_Exp>
  tag?: InputMaybe<IProjectTag_Bool_Exp>
  tagId?: InputMaybe<IUuid_Comparison_Exp>
}

/** unique or primary key constraints on table "ProjectTagsBridge" */
export enum ProjectTagsBridge_Constraint {
  /** unique or primary key constraint */
  ProjectTagsBridge_pkey = 'ProjectTagsBridge_pkey',
}

/** input type for inserting data into table "ProjectTagsBridge" */
export type IProjectTagsBridge_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>
  project?: InputMaybe<IProject_Obj_Rel_Insert_Input>
  projectId?: InputMaybe<Scalars['uuid']>
  tag?: InputMaybe<IProjectTag_Obj_Rel_Insert_Input>
  tagId?: InputMaybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type IProjectTagsBridge_Max_Fields = {
  __typename?: 'ProjectTagsBridge_max_fields'
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  projectId?: Maybe<FieldWrapper<Scalars['uuid']>>
  tagId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** order by max() on columns of table "ProjectTagsBridge" */
export type IProjectTagsBridge_Max_Order_By = {
  id?: InputMaybe<Order_By>
  projectId?: InputMaybe<Order_By>
  tagId?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type IProjectTagsBridge_Min_Fields = {
  __typename?: 'ProjectTagsBridge_min_fields'
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  projectId?: Maybe<FieldWrapper<Scalars['uuid']>>
  tagId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** order by min() on columns of table "ProjectTagsBridge" */
export type IProjectTagsBridge_Min_Order_By = {
  id?: InputMaybe<Order_By>
  projectId?: InputMaybe<Order_By>
  tagId?: InputMaybe<Order_By>
}

/** response of any mutation on the table "ProjectTagsBridge" */
export type IProjectTagsBridge_Mutation_Response = {
  __typename?: 'ProjectTagsBridge_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<IProjectTagsBridge>>
}

/** on_conflict condition type for table "ProjectTagsBridge" */
export type IProjectTagsBridge_On_Conflict = {
  constraint: ProjectTagsBridge_Constraint
  update_columns?: Array<ProjectTagsBridge_Update_Column>
  where?: InputMaybe<IProjectTagsBridge_Bool_Exp>
}

/** Ordering options when selecting data from "ProjectTagsBridge". */
export type IProjectTagsBridge_Order_By = {
  id?: InputMaybe<Order_By>
  project?: InputMaybe<IProject_Order_By>
  projectId?: InputMaybe<Order_By>
  tag?: InputMaybe<IProjectTag_Order_By>
  tagId?: InputMaybe<Order_By>
}

/** primary key columns input for table: ProjectTagsBridge */
export type IProjectTagsBridge_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "ProjectTagsBridge" */
export enum ProjectTagsBridge_Select_Column {
  /** column name */
  id = 'id',
  /** column name */
  projectId = 'projectId',
  /** column name */
  tagId = 'tagId',
}

/** input type for updating data in table "ProjectTagsBridge" */
export type IProjectTagsBridge_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>
  projectId?: InputMaybe<Scalars['uuid']>
  tagId?: InputMaybe<Scalars['uuid']>
}

/** update columns of table "ProjectTagsBridge" */
export enum ProjectTagsBridge_Update_Column {
  /** column name */
  id = 'id',
  /** column name */
  projectId = 'projectId',
  /** column name */
  tagId = 'tagId',
}

/** columns and relationships of "ProjectType" */
export type IProjectType = {
  __typename?: 'ProjectType'
  /** An array relationship */
  ProjectType: Array<FieldWrapper<IProjectTypeBridge>>
  /** An aggregate relationship */
  ProjectType_aggregate: FieldWrapper<IProjectTypeBridge_Aggregate>
  id: FieldWrapper<Scalars['uuid']>
  label: FieldWrapper<Scalars['String']>
  value: FieldWrapper<Scalars['String']>
}

/** columns and relationships of "ProjectType" */
export type IProjectTypeProjectTypeArgs = {
  distinct_on?: InputMaybe<Array<ProjectTypeBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectTypeBridge_Order_By>>
  where?: InputMaybe<IProjectTypeBridge_Bool_Exp>
}

/** columns and relationships of "ProjectType" */
export type IProjectTypeProjectType_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectTypeBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectTypeBridge_Order_By>>
  where?: InputMaybe<IProjectTypeBridge_Bool_Exp>
}

/** columns and relationships of "ProjectTypeBridge" */
export type IProjectTypeBridge = {
  __typename?: 'ProjectTypeBridge'
  id: FieldWrapper<Scalars['uuid']>
  /** An object relationship */
  project?: Maybe<FieldWrapper<IProject>>
  projectId?: Maybe<FieldWrapper<Scalars['uuid']>>
  /** An object relationship */
  type?: Maybe<FieldWrapper<IProjectType>>
  typeId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** aggregated selection of "ProjectTypeBridge" */
export type IProjectTypeBridge_Aggregate = {
  __typename?: 'ProjectTypeBridge_aggregate'
  aggregate?: Maybe<FieldWrapper<IProjectTypeBridge_Aggregate_Fields>>
  nodes: Array<FieldWrapper<IProjectTypeBridge>>
}

/** aggregate fields of "ProjectTypeBridge" */
export type IProjectTypeBridge_Aggregate_Fields = {
  __typename?: 'ProjectTypeBridge_aggregate_fields'
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<IProjectTypeBridge_Max_Fields>>
  min?: Maybe<FieldWrapper<IProjectTypeBridge_Min_Fields>>
}

/** aggregate fields of "ProjectTypeBridge" */
export type IProjectTypeBridge_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ProjectTypeBridge_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "ProjectTypeBridge" */
export type IProjectTypeBridge_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>
  max?: InputMaybe<IProjectTypeBridge_Max_Order_By>
  min?: InputMaybe<IProjectTypeBridge_Min_Order_By>
}

/** input type for inserting array relation for remote table "ProjectTypeBridge" */
export type IProjectTypeBridge_Arr_Rel_Insert_Input = {
  data: Array<IProjectTypeBridge_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<IProjectTypeBridge_On_Conflict>
}

/** Boolean expression to filter rows from the table "ProjectTypeBridge". All fields are combined with a logical 'AND'. */
export type IProjectTypeBridge_Bool_Exp = {
  _and?: InputMaybe<Array<IProjectTypeBridge_Bool_Exp>>
  _not?: InputMaybe<IProjectTypeBridge_Bool_Exp>
  _or?: InputMaybe<Array<IProjectTypeBridge_Bool_Exp>>
  id?: InputMaybe<IUuid_Comparison_Exp>
  project?: InputMaybe<IProject_Bool_Exp>
  projectId?: InputMaybe<IUuid_Comparison_Exp>
  type?: InputMaybe<IProjectType_Bool_Exp>
  typeId?: InputMaybe<IUuid_Comparison_Exp>
}

/** unique or primary key constraints on table "ProjectTypeBridge" */
export enum ProjectTypeBridge_Constraint {
  /** unique or primary key constraint */
  ProjectTypeBridge_pkey = 'ProjectTypeBridge_pkey',
}

/** input type for inserting data into table "ProjectTypeBridge" */
export type IProjectTypeBridge_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>
  project?: InputMaybe<IProject_Obj_Rel_Insert_Input>
  projectId?: InputMaybe<Scalars['uuid']>
  type?: InputMaybe<IProjectType_Obj_Rel_Insert_Input>
  typeId?: InputMaybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type IProjectTypeBridge_Max_Fields = {
  __typename?: 'ProjectTypeBridge_max_fields'
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  projectId?: Maybe<FieldWrapper<Scalars['uuid']>>
  typeId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** order by max() on columns of table "ProjectTypeBridge" */
export type IProjectTypeBridge_Max_Order_By = {
  id?: InputMaybe<Order_By>
  projectId?: InputMaybe<Order_By>
  typeId?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type IProjectTypeBridge_Min_Fields = {
  __typename?: 'ProjectTypeBridge_min_fields'
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  projectId?: Maybe<FieldWrapper<Scalars['uuid']>>
  typeId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** order by min() on columns of table "ProjectTypeBridge" */
export type IProjectTypeBridge_Min_Order_By = {
  id?: InputMaybe<Order_By>
  projectId?: InputMaybe<Order_By>
  typeId?: InputMaybe<Order_By>
}

/** response of any mutation on the table "ProjectTypeBridge" */
export type IProjectTypeBridge_Mutation_Response = {
  __typename?: 'ProjectTypeBridge_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<IProjectTypeBridge>>
}

/** on_conflict condition type for table "ProjectTypeBridge" */
export type IProjectTypeBridge_On_Conflict = {
  constraint: ProjectTypeBridge_Constraint
  update_columns?: Array<ProjectTypeBridge_Update_Column>
  where?: InputMaybe<IProjectTypeBridge_Bool_Exp>
}

/** Ordering options when selecting data from "ProjectTypeBridge". */
export type IProjectTypeBridge_Order_By = {
  id?: InputMaybe<Order_By>
  project?: InputMaybe<IProject_Order_By>
  projectId?: InputMaybe<Order_By>
  type?: InputMaybe<IProjectType_Order_By>
  typeId?: InputMaybe<Order_By>
}

/** primary key columns input for table: ProjectTypeBridge */
export type IProjectTypeBridge_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "ProjectTypeBridge" */
export enum ProjectTypeBridge_Select_Column {
  /** column name */
  id = 'id',
  /** column name */
  projectId = 'projectId',
  /** column name */
  typeId = 'typeId',
}

/** input type for updating data in table "ProjectTypeBridge" */
export type IProjectTypeBridge_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>
  projectId?: InputMaybe<Scalars['uuid']>
  typeId?: InputMaybe<Scalars['uuid']>
}

/** update columns of table "ProjectTypeBridge" */
export enum ProjectTypeBridge_Update_Column {
  /** column name */
  id = 'id',
  /** column name */
  projectId = 'projectId',
  /** column name */
  typeId = 'typeId',
}

/** aggregated selection of "ProjectType" */
export type IProjectType_Aggregate = {
  __typename?: 'ProjectType_aggregate'
  aggregate?: Maybe<FieldWrapper<IProjectType_Aggregate_Fields>>
  nodes: Array<FieldWrapper<IProjectType>>
}

/** aggregate fields of "ProjectType" */
export type IProjectType_Aggregate_Fields = {
  __typename?: 'ProjectType_aggregate_fields'
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<IProjectType_Max_Fields>>
  min?: Maybe<FieldWrapper<IProjectType_Min_Fields>>
}

/** aggregate fields of "ProjectType" */
export type IProjectType_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ProjectType_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "ProjectType". All fields are combined with a logical 'AND'. */
export type IProjectType_Bool_Exp = {
  ProjectType?: InputMaybe<IProjectTypeBridge_Bool_Exp>
  _and?: InputMaybe<Array<IProjectType_Bool_Exp>>
  _not?: InputMaybe<IProjectType_Bool_Exp>
  _or?: InputMaybe<Array<IProjectType_Bool_Exp>>
  id?: InputMaybe<IUuid_Comparison_Exp>
  label?: InputMaybe<IString_Comparison_Exp>
  value?: InputMaybe<IString_Comparison_Exp>
}

/** unique or primary key constraints on table "ProjectType" */
export enum ProjectType_Constraint {
  /** unique or primary key constraint */
  ProjectType_pkey = 'ProjectType_pkey',
  /** unique or primary key constraint */
  ProjectType_value_key = 'ProjectType_value_key',
}

/** input type for inserting data into table "ProjectType" */
export type IProjectType_Insert_Input = {
  ProjectType?: InputMaybe<IProjectTypeBridge_Arr_Rel_Insert_Input>
  id?: InputMaybe<Scalars['uuid']>
  label?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
}

/** aggregate max on columns */
export type IProjectType_Max_Fields = {
  __typename?: 'ProjectType_max_fields'
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  label?: Maybe<FieldWrapper<Scalars['String']>>
  value?: Maybe<FieldWrapper<Scalars['String']>>
}

/** aggregate min on columns */
export type IProjectType_Min_Fields = {
  __typename?: 'ProjectType_min_fields'
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  label?: Maybe<FieldWrapper<Scalars['String']>>
  value?: Maybe<FieldWrapper<Scalars['String']>>
}

/** response of any mutation on the table "ProjectType" */
export type IProjectType_Mutation_Response = {
  __typename?: 'ProjectType_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<IProjectType>>
}

/** input type for inserting object relation for remote table "ProjectType" */
export type IProjectType_Obj_Rel_Insert_Input = {
  data: IProjectType_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<IProjectType_On_Conflict>
}

/** on_conflict condition type for table "ProjectType" */
export type IProjectType_On_Conflict = {
  constraint: ProjectType_Constraint
  update_columns?: Array<ProjectType_Update_Column>
  where?: InputMaybe<IProjectType_Bool_Exp>
}

/** Ordering options when selecting data from "ProjectType". */
export type IProjectType_Order_By = {
  ProjectType_aggregate?: InputMaybe<IProjectTypeBridge_Aggregate_Order_By>
  id?: InputMaybe<Order_By>
  label?: InputMaybe<Order_By>
  value?: InputMaybe<Order_By>
}

/** primary key columns input for table: ProjectType */
export type IProjectType_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "ProjectType" */
export enum ProjectType_Select_Column {
  /** column name */
  id = 'id',
  /** column name */
  label = 'label',
  /** column name */
  value = 'value',
}

/** input type for updating data in table "ProjectType" */
export type IProjectType_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>
  label?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
}

/** update columns of table "ProjectType" */
export enum ProjectType_Update_Column {
  /** column name */
  id = 'id',
  /** column name */
  label = 'label',
  /** column name */
  value = 'value',
}

/** aggregated selection of "Project" */
export type IProject_Aggregate = {
  __typename?: 'Project_aggregate'
  aggregate?: Maybe<FieldWrapper<IProject_Aggregate_Fields>>
  nodes: Array<FieldWrapper<IProject>>
}

/** aggregate fields of "Project" */
export type IProject_Aggregate_Fields = {
  __typename?: 'Project_aggregate_fields'
  avg?: Maybe<FieldWrapper<IProject_Avg_Fields>>
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<IProject_Max_Fields>>
  min?: Maybe<FieldWrapper<IProject_Min_Fields>>
  stddev?: Maybe<FieldWrapper<IProject_Stddev_Fields>>
  stddev_pop?: Maybe<FieldWrapper<IProject_Stddev_Pop_Fields>>
  stddev_samp?: Maybe<FieldWrapper<IProject_Stddev_Samp_Fields>>
  sum?: Maybe<FieldWrapper<IProject_Sum_Fields>>
  var_pop?: Maybe<FieldWrapper<IProject_Var_Pop_Fields>>
  var_samp?: Maybe<FieldWrapper<IProject_Var_Samp_Fields>>
  variance?: Maybe<FieldWrapper<IProject_Variance_Fields>>
}

/** aggregate fields of "Project" */
export type IProject_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Project_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "Project" */
export type IProject_Aggregate_Order_By = {
  avg?: InputMaybe<IProject_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<IProject_Max_Order_By>
  min?: InputMaybe<IProject_Min_Order_By>
  stddev?: InputMaybe<IProject_Stddev_Order_By>
  stddev_pop?: InputMaybe<IProject_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<IProject_Stddev_Samp_Order_By>
  sum?: InputMaybe<IProject_Sum_Order_By>
  var_pop?: InputMaybe<IProject_Var_Pop_Order_By>
  var_samp?: InputMaybe<IProject_Var_Samp_Order_By>
  variance?: InputMaybe<IProject_Variance_Order_By>
}

/** input type for inserting array relation for remote table "Project" */
export type IProject_Arr_Rel_Insert_Input = {
  data: Array<IProject_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<IProject_On_Conflict>
}

/** aggregate avg on columns */
export type IProject_Avg_Fields = {
  __typename?: 'Project_avg_fields'
  currentInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Float']>>
  totalInvested?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by avg() on columns of table "Project" */
export type IProject_Avg_Order_By = {
  currentInvested?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
  totalInvested?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "Project". All fields are combined with a logical 'AND'. */
export type IProject_Bool_Exp = {
  GrantSubmitions?: InputMaybe<IGrantSubmissions_Bool_Exp>
  Likes?: InputMaybe<ILikes_Bool_Exp>
  ProjectTagBridge?: InputMaybe<IProjectTag_Bool_Exp>
  _and?: InputMaybe<Array<IProject_Bool_Exp>>
  _not?: InputMaybe<IProject_Bool_Exp>
  _or?: InputMaybe<Array<IProject_Bool_Exp>>
  activityId?: InputMaybe<IUuid_Comparison_Exp>
  author?: InputMaybe<IUser_Bool_Exp>
  author_id?: InputMaybe<IUuid_Comparison_Exp>
  category?: InputMaybe<IString_Comparison_Exp>
  created_at?: InputMaybe<ITimestamptz_Comparison_Exp>
  currentInvested?: InputMaybe<IInt_Comparison_Exp>
  description?: InputMaybe<IString_Comparison_Exp>
  displayType?: InputMaybe<IString_Comparison_Exp>
  featured?: InputMaybe<IBoolean_Comparison_Exp>
  gallery?: InputMaybe<IJson_Comparison_Exp>
  hideBudget?: InputMaybe<IBoolean_Comparison_Exp>
  id?: InputMaybe<IUuid_Comparison_Exp>
  imageUrl?: InputMaybe<IString_Comparison_Exp>
  members?: InputMaybe<IProjectMembers_Bool_Exp>
  onChainId?: InputMaybe<IInt_Comparison_Exp>
  pitchDeck?: InputMaybe<IString_Comparison_Exp>
  projectTags?: InputMaybe<IProjectTagsBridge_Bool_Exp>
  projectTypes?: InputMaybe<IProjectTypeBridge_Bool_Exp>
  subdescription?: InputMaybe<IString_Comparison_Exp>
  tagBridgeId?: InputMaybe<IUuid_Comparison_Exp>
  title?: InputMaybe<IString_Comparison_Exp>
  titleURL?: InputMaybe<IString_Comparison_Exp>
  totalInvested?: InputMaybe<IInt_Comparison_Exp>
  updated_at?: InputMaybe<ITimestamptz_Comparison_Exp>
  videoHeroImg?: InputMaybe<IString_Comparison_Exp>
  videoOverview?: InputMaybe<IString_Comparison_Exp>
}

/** unique or primary key constraints on table "Project" */
export enum Project_Constraint {
  /** unique or primary key constraint */
  Project_activityId_key = 'Project_activityId_key',
  /** unique or primary key constraint */
  Project_pkey = 'Project_pkey',
  /** unique or primary key constraint */
  Project_titleURL_key = 'Project_titleURL_key',
}

/** input type for incrementing numeric columns in table "Project" */
export type IProject_Inc_Input = {
  currentInvested?: InputMaybe<Scalars['Int']>
  onChainId?: InputMaybe<Scalars['Int']>
  totalInvested?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "Project" */
export type IProject_Insert_Input = {
  GrantSubmitions?: InputMaybe<IGrantSubmissions_Arr_Rel_Insert_Input>
  Likes?: InputMaybe<ILikes_Arr_Rel_Insert_Input>
  ProjectTagBridge?: InputMaybe<IProjectTag_Obj_Rel_Insert_Input>
  activityId?: InputMaybe<Scalars['uuid']>
  author?: InputMaybe<IUser_Obj_Rel_Insert_Input>
  author_id?: InputMaybe<Scalars['uuid']>
  category?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  currentInvested?: InputMaybe<Scalars['Int']>
  description?: InputMaybe<Scalars['String']>
  displayType?: InputMaybe<Scalars['String']>
  featured?: InputMaybe<Scalars['Boolean']>
  gallery?: InputMaybe<Scalars['json']>
  hideBudget?: InputMaybe<Scalars['Boolean']>
  id?: InputMaybe<Scalars['uuid']>
  imageUrl?: InputMaybe<Scalars['String']>
  members?: InputMaybe<IProjectMembers_Arr_Rel_Insert_Input>
  onChainId?: InputMaybe<Scalars['Int']>
  pitchDeck?: InputMaybe<Scalars['String']>
  projectTags?: InputMaybe<IProjectTagsBridge_Arr_Rel_Insert_Input>
  projectTypes?: InputMaybe<IProjectTypeBridge_Arr_Rel_Insert_Input>
  subdescription?: InputMaybe<Scalars['String']>
  tagBridgeId?: InputMaybe<Scalars['uuid']>
  title?: InputMaybe<Scalars['String']>
  titleURL?: InputMaybe<Scalars['String']>
  totalInvested?: InputMaybe<Scalars['Int']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  videoHeroImg?: InputMaybe<Scalars['String']>
  videoOverview?: InputMaybe<Scalars['String']>
}

/** aggregate max on columns */
export type IProject_Max_Fields = {
  __typename?: 'Project_max_fields'
  activityId?: Maybe<FieldWrapper<Scalars['uuid']>>
  author_id?: Maybe<FieldWrapper<Scalars['uuid']>>
  category?: Maybe<FieldWrapper<Scalars['String']>>
  created_at?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  currentInvested?: Maybe<FieldWrapper<Scalars['Int']>>
  description?: Maybe<FieldWrapper<Scalars['String']>>
  displayType?: Maybe<FieldWrapper<Scalars['String']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  imageUrl?: Maybe<FieldWrapper<Scalars['String']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Int']>>
  pitchDeck?: Maybe<FieldWrapper<Scalars['String']>>
  subdescription?: Maybe<FieldWrapper<Scalars['String']>>
  tagBridgeId?: Maybe<FieldWrapper<Scalars['uuid']>>
  title?: Maybe<FieldWrapper<Scalars['String']>>
  titleURL?: Maybe<FieldWrapper<Scalars['String']>>
  totalInvested?: Maybe<FieldWrapper<Scalars['Int']>>
  updated_at?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  videoHeroImg?: Maybe<FieldWrapper<Scalars['String']>>
  videoOverview?: Maybe<FieldWrapper<Scalars['String']>>
}

/** order by max() on columns of table "Project" */
export type IProject_Max_Order_By = {
  activityId?: InputMaybe<Order_By>
  author_id?: InputMaybe<Order_By>
  category?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  currentInvested?: InputMaybe<Order_By>
  description?: InputMaybe<Order_By>
  displayType?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  imageUrl?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
  pitchDeck?: InputMaybe<Order_By>
  subdescription?: InputMaybe<Order_By>
  tagBridgeId?: InputMaybe<Order_By>
  title?: InputMaybe<Order_By>
  titleURL?: InputMaybe<Order_By>
  totalInvested?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  videoHeroImg?: InputMaybe<Order_By>
  videoOverview?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type IProject_Min_Fields = {
  __typename?: 'Project_min_fields'
  activityId?: Maybe<FieldWrapper<Scalars['uuid']>>
  author_id?: Maybe<FieldWrapper<Scalars['uuid']>>
  category?: Maybe<FieldWrapper<Scalars['String']>>
  created_at?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  currentInvested?: Maybe<FieldWrapper<Scalars['Int']>>
  description?: Maybe<FieldWrapper<Scalars['String']>>
  displayType?: Maybe<FieldWrapper<Scalars['String']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  imageUrl?: Maybe<FieldWrapper<Scalars['String']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Int']>>
  pitchDeck?: Maybe<FieldWrapper<Scalars['String']>>
  subdescription?: Maybe<FieldWrapper<Scalars['String']>>
  tagBridgeId?: Maybe<FieldWrapper<Scalars['uuid']>>
  title?: Maybe<FieldWrapper<Scalars['String']>>
  titleURL?: Maybe<FieldWrapper<Scalars['String']>>
  totalInvested?: Maybe<FieldWrapper<Scalars['Int']>>
  updated_at?: Maybe<FieldWrapper<Scalars['timestamptz']>>
  videoHeroImg?: Maybe<FieldWrapper<Scalars['String']>>
  videoOverview?: Maybe<FieldWrapper<Scalars['String']>>
}

/** order by min() on columns of table "Project" */
export type IProject_Min_Order_By = {
  activityId?: InputMaybe<Order_By>
  author_id?: InputMaybe<Order_By>
  category?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  currentInvested?: InputMaybe<Order_By>
  description?: InputMaybe<Order_By>
  displayType?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  imageUrl?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
  pitchDeck?: InputMaybe<Order_By>
  subdescription?: InputMaybe<Order_By>
  tagBridgeId?: InputMaybe<Order_By>
  title?: InputMaybe<Order_By>
  titleURL?: InputMaybe<Order_By>
  totalInvested?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  videoHeroImg?: InputMaybe<Order_By>
  videoOverview?: InputMaybe<Order_By>
}

/** response of any mutation on the table "Project" */
export type IProject_Mutation_Response = {
  __typename?: 'Project_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<IProject>>
}

/** input type for inserting object relation for remote table "Project" */
export type IProject_Obj_Rel_Insert_Input = {
  data: IProject_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<IProject_On_Conflict>
}

/** on_conflict condition type for table "Project" */
export type IProject_On_Conflict = {
  constraint: Project_Constraint
  update_columns?: Array<Project_Update_Column>
  where?: InputMaybe<IProject_Bool_Exp>
}

/** Ordering options when selecting data from "Project". */
export type IProject_Order_By = {
  GrantSubmitions_aggregate?: InputMaybe<IGrantSubmissions_Aggregate_Order_By>
  Likes_aggregate?: InputMaybe<ILikes_Aggregate_Order_By>
  ProjectTagBridge?: InputMaybe<IProjectTag_Order_By>
  activityId?: InputMaybe<Order_By>
  author?: InputMaybe<IUser_Order_By>
  author_id?: InputMaybe<Order_By>
  category?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  currentInvested?: InputMaybe<Order_By>
  description?: InputMaybe<Order_By>
  displayType?: InputMaybe<Order_By>
  featured?: InputMaybe<Order_By>
  gallery?: InputMaybe<Order_By>
  hideBudget?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  imageUrl?: InputMaybe<Order_By>
  members_aggregate?: InputMaybe<IProjectMembers_Aggregate_Order_By>
  onChainId?: InputMaybe<Order_By>
  pitchDeck?: InputMaybe<Order_By>
  projectTags_aggregate?: InputMaybe<IProjectTagsBridge_Aggregate_Order_By>
  projectTypes_aggregate?: InputMaybe<IProjectTypeBridge_Aggregate_Order_By>
  subdescription?: InputMaybe<Order_By>
  tagBridgeId?: InputMaybe<Order_By>
  title?: InputMaybe<Order_By>
  titleURL?: InputMaybe<Order_By>
  totalInvested?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  videoHeroImg?: InputMaybe<Order_By>
  videoOverview?: InputMaybe<Order_By>
}

/** primary key columns input for table: Project */
export type IProject_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "Project" */
export enum Project_Select_Column {
  /** column name */
  activityId = 'activityId',
  /** column name */
  author_id = 'author_id',
  /** column name */
  category = 'category',
  /** column name */
  created_at = 'created_at',
  /** column name */
  currentInvested = 'currentInvested',
  /** column name */
  description = 'description',
  /** column name */
  displayType = 'displayType',
  /** column name */
  featured = 'featured',
  /** column name */
  gallery = 'gallery',
  /** column name */
  hideBudget = 'hideBudget',
  /** column name */
  id = 'id',
  /** column name */
  imageUrl = 'imageUrl',
  /** column name */
  onChainId = 'onChainId',
  /** column name */
  pitchDeck = 'pitchDeck',
  /** column name */
  subdescription = 'subdescription',
  /** column name */
  tagBridgeId = 'tagBridgeId',
  /** column name */
  title = 'title',
  /** column name */
  titleURL = 'titleURL',
  /** column name */
  totalInvested = 'totalInvested',
  /** column name */
  updated_at = 'updated_at',
  /** column name */
  videoHeroImg = 'videoHeroImg',
  /** column name */
  videoOverview = 'videoOverview',
}

/** input type for updating data in table "Project" */
export type IProject_Set_Input = {
  activityId?: InputMaybe<Scalars['uuid']>
  author_id?: InputMaybe<Scalars['uuid']>
  category?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  currentInvested?: InputMaybe<Scalars['Int']>
  description?: InputMaybe<Scalars['String']>
  displayType?: InputMaybe<Scalars['String']>
  featured?: InputMaybe<Scalars['Boolean']>
  gallery?: InputMaybe<Scalars['json']>
  hideBudget?: InputMaybe<Scalars['Boolean']>
  id?: InputMaybe<Scalars['uuid']>
  imageUrl?: InputMaybe<Scalars['String']>
  onChainId?: InputMaybe<Scalars['Int']>
  pitchDeck?: InputMaybe<Scalars['String']>
  subdescription?: InputMaybe<Scalars['String']>
  tagBridgeId?: InputMaybe<Scalars['uuid']>
  title?: InputMaybe<Scalars['String']>
  titleURL?: InputMaybe<Scalars['String']>
  totalInvested?: InputMaybe<Scalars['Int']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
  videoHeroImg?: InputMaybe<Scalars['String']>
  videoOverview?: InputMaybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type IProject_Stddev_Fields = {
  __typename?: 'Project_stddev_fields'
  currentInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Float']>>
  totalInvested?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev() on columns of table "Project" */
export type IProject_Stddev_Order_By = {
  currentInvested?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
  totalInvested?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type IProject_Stddev_Pop_Fields = {
  __typename?: 'Project_stddev_pop_fields'
  currentInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Float']>>
  totalInvested?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev_pop() on columns of table "Project" */
export type IProject_Stddev_Pop_Order_By = {
  currentInvested?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
  totalInvested?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type IProject_Stddev_Samp_Fields = {
  __typename?: 'Project_stddev_samp_fields'
  currentInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Float']>>
  totalInvested?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev_samp() on columns of table "Project" */
export type IProject_Stddev_Samp_Order_By = {
  currentInvested?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
  totalInvested?: InputMaybe<Order_By>
}

/** aggregate sum on columns */
export type IProject_Sum_Fields = {
  __typename?: 'Project_sum_fields'
  currentInvested?: Maybe<FieldWrapper<Scalars['Int']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Int']>>
  totalInvested?: Maybe<FieldWrapper<Scalars['Int']>>
}

/** order by sum() on columns of table "Project" */
export type IProject_Sum_Order_By = {
  currentInvested?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
  totalInvested?: InputMaybe<Order_By>
}

/** update columns of table "Project" */
export enum Project_Update_Column {
  /** column name */
  activityId = 'activityId',
  /** column name */
  author_id = 'author_id',
  /** column name */
  category = 'category',
  /** column name */
  created_at = 'created_at',
  /** column name */
  currentInvested = 'currentInvested',
  /** column name */
  description = 'description',
  /** column name */
  displayType = 'displayType',
  /** column name */
  featured = 'featured',
  /** column name */
  gallery = 'gallery',
  /** column name */
  hideBudget = 'hideBudget',
  /** column name */
  id = 'id',
  /** column name */
  imageUrl = 'imageUrl',
  /** column name */
  onChainId = 'onChainId',
  /** column name */
  pitchDeck = 'pitchDeck',
  /** column name */
  subdescription = 'subdescription',
  /** column name */
  tagBridgeId = 'tagBridgeId',
  /** column name */
  title = 'title',
  /** column name */
  titleURL = 'titleURL',
  /** column name */
  totalInvested = 'totalInvested',
  /** column name */
  updated_at = 'updated_at',
  /** column name */
  videoHeroImg = 'videoHeroImg',
  /** column name */
  videoOverview = 'videoOverview',
}

/** aggregate var_pop on columns */
export type IProject_Var_Pop_Fields = {
  __typename?: 'Project_var_pop_fields'
  currentInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Float']>>
  totalInvested?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by var_pop() on columns of table "Project" */
export type IProject_Var_Pop_Order_By = {
  currentInvested?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
  totalInvested?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type IProject_Var_Samp_Fields = {
  __typename?: 'Project_var_samp_fields'
  currentInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Float']>>
  totalInvested?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by var_samp() on columns of table "Project" */
export type IProject_Var_Samp_Order_By = {
  currentInvested?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
  totalInvested?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type IProject_Variance_Fields = {
  __typename?: 'Project_variance_fields'
  currentInvested?: Maybe<FieldWrapper<Scalars['Float']>>
  onChainId?: Maybe<FieldWrapper<Scalars['Float']>>
  totalInvested?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by variance() on columns of table "Project" */
export type IProject_Variance_Order_By = {
  currentInvested?: InputMaybe<Order_By>
  onChainId?: InputMaybe<Order_By>
  totalInvested?: InputMaybe<Order_By>
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type IString_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>
  _gt?: InputMaybe<Scalars['String']>
  _gte?: InputMaybe<Scalars['String']>
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>
  _in?: InputMaybe<Array<Scalars['String']>>
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>
  _is_null?: InputMaybe<Scalars['Boolean']>
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>
  _lt?: InputMaybe<Scalars['String']>
  _lte?: InputMaybe<Scalars['String']>
  _neq?: InputMaybe<Scalars['String']>
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>
  _nin?: InputMaybe<Array<Scalars['String']>>
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>
}

/** columns and relationships of "Swaps" */
export type ISwaps = {
  __typename?: 'Swaps'
  amount: FieldWrapper<Scalars['numeric']>
  id: FieldWrapper<Scalars['uuid']>
  state: FieldWrapper<Scalars['String']>
  txHash: FieldWrapper<Scalars['String']>
  userId: FieldWrapper<Scalars['uuid']>
}

/** aggregated selection of "Swaps" */
export type ISwaps_Aggregate = {
  __typename?: 'Swaps_aggregate'
  aggregate?: Maybe<FieldWrapper<ISwaps_Aggregate_Fields>>
  nodes: Array<FieldWrapper<ISwaps>>
}

/** aggregate fields of "Swaps" */
export type ISwaps_Aggregate_Fields = {
  __typename?: 'Swaps_aggregate_fields'
  avg?: Maybe<FieldWrapper<ISwaps_Avg_Fields>>
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<ISwaps_Max_Fields>>
  min?: Maybe<FieldWrapper<ISwaps_Min_Fields>>
  stddev?: Maybe<FieldWrapper<ISwaps_Stddev_Fields>>
  stddev_pop?: Maybe<FieldWrapper<ISwaps_Stddev_Pop_Fields>>
  stddev_samp?: Maybe<FieldWrapper<ISwaps_Stddev_Samp_Fields>>
  sum?: Maybe<FieldWrapper<ISwaps_Sum_Fields>>
  var_pop?: Maybe<FieldWrapper<ISwaps_Var_Pop_Fields>>
  var_samp?: Maybe<FieldWrapper<ISwaps_Var_Samp_Fields>>
  variance?: Maybe<FieldWrapper<ISwaps_Variance_Fields>>
}

/** aggregate fields of "Swaps" */
export type ISwaps_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Swaps_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type ISwaps_Avg_Fields = {
  __typename?: 'Swaps_avg_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** Boolean expression to filter rows from the table "Swaps". All fields are combined with a logical 'AND'. */
export type ISwaps_Bool_Exp = {
  _and?: InputMaybe<Array<ISwaps_Bool_Exp>>
  _not?: InputMaybe<ISwaps_Bool_Exp>
  _or?: InputMaybe<Array<ISwaps_Bool_Exp>>
  amount?: InputMaybe<INumeric_Comparison_Exp>
  id?: InputMaybe<IUuid_Comparison_Exp>
  state?: InputMaybe<IString_Comparison_Exp>
  txHash?: InputMaybe<IString_Comparison_Exp>
  userId?: InputMaybe<IUuid_Comparison_Exp>
}

/** unique or primary key constraints on table "Swaps" */
export enum Swaps_Constraint {
  /** unique or primary key constraint */
  Swaps_pkey = 'Swaps_pkey',
}

/** input type for incrementing numeric columns in table "Swaps" */
export type ISwaps_Inc_Input = {
  amount?: InputMaybe<Scalars['numeric']>
}

/** input type for inserting data into table "Swaps" */
export type ISwaps_Insert_Input = {
  amount?: InputMaybe<Scalars['numeric']>
  id?: InputMaybe<Scalars['uuid']>
  state?: InputMaybe<Scalars['String']>
  txHash?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type ISwaps_Max_Fields = {
  __typename?: 'Swaps_max_fields'
  amount?: Maybe<FieldWrapper<Scalars['numeric']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  state?: Maybe<FieldWrapper<Scalars['String']>>
  txHash?: Maybe<FieldWrapper<Scalars['String']>>
  userId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** aggregate min on columns */
export type ISwaps_Min_Fields = {
  __typename?: 'Swaps_min_fields'
  amount?: Maybe<FieldWrapper<Scalars['numeric']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  state?: Maybe<FieldWrapper<Scalars['String']>>
  txHash?: Maybe<FieldWrapper<Scalars['String']>>
  userId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** response of any mutation on the table "Swaps" */
export type ISwaps_Mutation_Response = {
  __typename?: 'Swaps_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<ISwaps>>
}

/** on_conflict condition type for table "Swaps" */
export type ISwaps_On_Conflict = {
  constraint: Swaps_Constraint
  update_columns?: Array<Swaps_Update_Column>
  where?: InputMaybe<ISwaps_Bool_Exp>
}

/** Ordering options when selecting data from "Swaps". */
export type ISwaps_Order_By = {
  amount?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  state?: InputMaybe<Order_By>
  txHash?: InputMaybe<Order_By>
  userId?: InputMaybe<Order_By>
}

/** primary key columns input for table: Swaps */
export type ISwaps_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "Swaps" */
export enum Swaps_Select_Column {
  /** column name */
  amount = 'amount',
  /** column name */
  id = 'id',
  /** column name */
  state = 'state',
  /** column name */
  txHash = 'txHash',
  /** column name */
  userId = 'userId',
}

/** input type for updating data in table "Swaps" */
export type ISwaps_Set_Input = {
  amount?: InputMaybe<Scalars['numeric']>
  id?: InputMaybe<Scalars['uuid']>
  state?: InputMaybe<Scalars['String']>
  txHash?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['uuid']>
}

/** aggregate stddev on columns */
export type ISwaps_Stddev_Fields = {
  __typename?: 'Swaps_stddev_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** aggregate stddev_pop on columns */
export type ISwaps_Stddev_Pop_Fields = {
  __typename?: 'Swaps_stddev_pop_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** aggregate stddev_samp on columns */
export type ISwaps_Stddev_Samp_Fields = {
  __typename?: 'Swaps_stddev_samp_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** aggregate sum on columns */
export type ISwaps_Sum_Fields = {
  __typename?: 'Swaps_sum_fields'
  amount?: Maybe<FieldWrapper<Scalars['numeric']>>
}

/** update columns of table "Swaps" */
export enum Swaps_Update_Column {
  /** column name */
  amount = 'amount',
  /** column name */
  id = 'id',
  /** column name */
  state = 'state',
  /** column name */
  txHash = 'txHash',
  /** column name */
  userId = 'userId',
}

/** aggregate var_pop on columns */
export type ISwaps_Var_Pop_Fields = {
  __typename?: 'Swaps_var_pop_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** aggregate var_samp on columns */
export type ISwaps_Var_Samp_Fields = {
  __typename?: 'Swaps_var_samp_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** aggregate variance on columns */
export type ISwaps_Variance_Fields = {
  __typename?: 'Swaps_variance_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** columns and relationships of "TopUpWallet" */
export type ITopUpWallet = {
  __typename?: 'TopUpWallet'
  /** An object relationship */
  User: FieldWrapper<IUser>
  amount: FieldWrapper<Scalars['numeric']>
  fee: FieldWrapper<Scalars['numeric']>
  id: FieldWrapper<Scalars['uuid']>
  originFund: FieldWrapper<Scalars['String']>
  state: FieldWrapper<Scalars['String']>
  timestamp?: Maybe<FieldWrapper<Scalars['bigint']>>
  transferId?: Maybe<FieldWrapper<Scalars['String']>>
  txHash?: Maybe<FieldWrapper<Scalars['String']>>
  url?: Maybe<FieldWrapper<Scalars['String']>>
  userId: FieldWrapper<Scalars['uuid']>
}

/** aggregated selection of "TopUpWallet" */
export type ITopUpWallet_Aggregate = {
  __typename?: 'TopUpWallet_aggregate'
  aggregate?: Maybe<FieldWrapper<ITopUpWallet_Aggregate_Fields>>
  nodes: Array<FieldWrapper<ITopUpWallet>>
}

/** aggregate fields of "TopUpWallet" */
export type ITopUpWallet_Aggregate_Fields = {
  __typename?: 'TopUpWallet_aggregate_fields'
  avg?: Maybe<FieldWrapper<ITopUpWallet_Avg_Fields>>
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<ITopUpWallet_Max_Fields>>
  min?: Maybe<FieldWrapper<ITopUpWallet_Min_Fields>>
  stddev?: Maybe<FieldWrapper<ITopUpWallet_Stddev_Fields>>
  stddev_pop?: Maybe<FieldWrapper<ITopUpWallet_Stddev_Pop_Fields>>
  stddev_samp?: Maybe<FieldWrapper<ITopUpWallet_Stddev_Samp_Fields>>
  sum?: Maybe<FieldWrapper<ITopUpWallet_Sum_Fields>>
  var_pop?: Maybe<FieldWrapper<ITopUpWallet_Var_Pop_Fields>>
  var_samp?: Maybe<FieldWrapper<ITopUpWallet_Var_Samp_Fields>>
  variance?: Maybe<FieldWrapper<ITopUpWallet_Variance_Fields>>
}

/** aggregate fields of "TopUpWallet" */
export type ITopUpWallet_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<TopUpWallet_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "TopUpWallet" */
export type ITopUpWallet_Aggregate_Order_By = {
  avg?: InputMaybe<ITopUpWallet_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<ITopUpWallet_Max_Order_By>
  min?: InputMaybe<ITopUpWallet_Min_Order_By>
  stddev?: InputMaybe<ITopUpWallet_Stddev_Order_By>
  stddev_pop?: InputMaybe<ITopUpWallet_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<ITopUpWallet_Stddev_Samp_Order_By>
  sum?: InputMaybe<ITopUpWallet_Sum_Order_By>
  var_pop?: InputMaybe<ITopUpWallet_Var_Pop_Order_By>
  var_samp?: InputMaybe<ITopUpWallet_Var_Samp_Order_By>
  variance?: InputMaybe<ITopUpWallet_Variance_Order_By>
}

/** input type for inserting array relation for remote table "TopUpWallet" */
export type ITopUpWallet_Arr_Rel_Insert_Input = {
  data: Array<ITopUpWallet_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<ITopUpWallet_On_Conflict>
}

/** aggregate avg on columns */
export type ITopUpWallet_Avg_Fields = {
  __typename?: 'TopUpWallet_avg_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
  fee?: Maybe<FieldWrapper<Scalars['Float']>>
  timestamp?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by avg() on columns of table "TopUpWallet" */
export type ITopUpWallet_Avg_Order_By = {
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
  timestamp?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "TopUpWallet". All fields are combined with a logical 'AND'. */
export type ITopUpWallet_Bool_Exp = {
  User?: InputMaybe<IUser_Bool_Exp>
  _and?: InputMaybe<Array<ITopUpWallet_Bool_Exp>>
  _not?: InputMaybe<ITopUpWallet_Bool_Exp>
  _or?: InputMaybe<Array<ITopUpWallet_Bool_Exp>>
  amount?: InputMaybe<INumeric_Comparison_Exp>
  fee?: InputMaybe<INumeric_Comparison_Exp>
  id?: InputMaybe<IUuid_Comparison_Exp>
  originFund?: InputMaybe<IString_Comparison_Exp>
  state?: InputMaybe<IString_Comparison_Exp>
  timestamp?: InputMaybe<IBigint_Comparison_Exp>
  transferId?: InputMaybe<IString_Comparison_Exp>
  txHash?: InputMaybe<IString_Comparison_Exp>
  url?: InputMaybe<IString_Comparison_Exp>
  userId?: InputMaybe<IUuid_Comparison_Exp>
}

/** unique or primary key constraints on table "TopUpWallet" */
export enum TopUpWallet_Constraint {
  /** unique or primary key constraint */
  topupWallet_pkey = 'topupWallet_pkey',
}

/** input type for incrementing numeric columns in table "TopUpWallet" */
export type ITopUpWallet_Inc_Input = {
  amount?: InputMaybe<Scalars['numeric']>
  fee?: InputMaybe<Scalars['numeric']>
  timestamp?: InputMaybe<Scalars['bigint']>
}

/** input type for inserting data into table "TopUpWallet" */
export type ITopUpWallet_Insert_Input = {
  User?: InputMaybe<IUser_Obj_Rel_Insert_Input>
  amount?: InputMaybe<Scalars['numeric']>
  fee?: InputMaybe<Scalars['numeric']>
  id?: InputMaybe<Scalars['uuid']>
  originFund?: InputMaybe<Scalars['String']>
  state?: InputMaybe<Scalars['String']>
  timestamp?: InputMaybe<Scalars['bigint']>
  transferId?: InputMaybe<Scalars['String']>
  txHash?: InputMaybe<Scalars['String']>
  url?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type ITopUpWallet_Max_Fields = {
  __typename?: 'TopUpWallet_max_fields'
  amount?: Maybe<FieldWrapper<Scalars['numeric']>>
  fee?: Maybe<FieldWrapper<Scalars['numeric']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  originFund?: Maybe<FieldWrapper<Scalars['String']>>
  state?: Maybe<FieldWrapper<Scalars['String']>>
  timestamp?: Maybe<FieldWrapper<Scalars['bigint']>>
  transferId?: Maybe<FieldWrapper<Scalars['String']>>
  txHash?: Maybe<FieldWrapper<Scalars['String']>>
  url?: Maybe<FieldWrapper<Scalars['String']>>
  userId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** order by max() on columns of table "TopUpWallet" */
export type ITopUpWallet_Max_Order_By = {
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  originFund?: InputMaybe<Order_By>
  state?: InputMaybe<Order_By>
  timestamp?: InputMaybe<Order_By>
  transferId?: InputMaybe<Order_By>
  txHash?: InputMaybe<Order_By>
  url?: InputMaybe<Order_By>
  userId?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type ITopUpWallet_Min_Fields = {
  __typename?: 'TopUpWallet_min_fields'
  amount?: Maybe<FieldWrapper<Scalars['numeric']>>
  fee?: Maybe<FieldWrapper<Scalars['numeric']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  originFund?: Maybe<FieldWrapper<Scalars['String']>>
  state?: Maybe<FieldWrapper<Scalars['String']>>
  timestamp?: Maybe<FieldWrapper<Scalars['bigint']>>
  transferId?: Maybe<FieldWrapper<Scalars['String']>>
  txHash?: Maybe<FieldWrapper<Scalars['String']>>
  url?: Maybe<FieldWrapper<Scalars['String']>>
  userId?: Maybe<FieldWrapper<Scalars['uuid']>>
}

/** order by min() on columns of table "TopUpWallet" */
export type ITopUpWallet_Min_Order_By = {
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  originFund?: InputMaybe<Order_By>
  state?: InputMaybe<Order_By>
  timestamp?: InputMaybe<Order_By>
  transferId?: InputMaybe<Order_By>
  txHash?: InputMaybe<Order_By>
  url?: InputMaybe<Order_By>
  userId?: InputMaybe<Order_By>
}

/** response of any mutation on the table "TopUpWallet" */
export type ITopUpWallet_Mutation_Response = {
  __typename?: 'TopUpWallet_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<ITopUpWallet>>
}

/** on_conflict condition type for table "TopUpWallet" */
export type ITopUpWallet_On_Conflict = {
  constraint: TopUpWallet_Constraint
  update_columns?: Array<TopUpWallet_Update_Column>
  where?: InputMaybe<ITopUpWallet_Bool_Exp>
}

/** Ordering options when selecting data from "TopUpWallet". */
export type ITopUpWallet_Order_By = {
  User?: InputMaybe<IUser_Order_By>
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  originFund?: InputMaybe<Order_By>
  state?: InputMaybe<Order_By>
  timestamp?: InputMaybe<Order_By>
  transferId?: InputMaybe<Order_By>
  txHash?: InputMaybe<Order_By>
  url?: InputMaybe<Order_By>
  userId?: InputMaybe<Order_By>
}

/** primary key columns input for table: TopUpWallet */
export type ITopUpWallet_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "TopUpWallet" */
export enum TopUpWallet_Select_Column {
  /** column name */
  amount = 'amount',
  /** column name */
  fee = 'fee',
  /** column name */
  id = 'id',
  /** column name */
  originFund = 'originFund',
  /** column name */
  state = 'state',
  /** column name */
  timestamp = 'timestamp',
  /** column name */
  transferId = 'transferId',
  /** column name */
  txHash = 'txHash',
  /** column name */
  url = 'url',
  /** column name */
  userId = 'userId',
}

/** input type for updating data in table "TopUpWallet" */
export type ITopUpWallet_Set_Input = {
  amount?: InputMaybe<Scalars['numeric']>
  fee?: InputMaybe<Scalars['numeric']>
  id?: InputMaybe<Scalars['uuid']>
  originFund?: InputMaybe<Scalars['String']>
  state?: InputMaybe<Scalars['String']>
  timestamp?: InputMaybe<Scalars['bigint']>
  transferId?: InputMaybe<Scalars['String']>
  txHash?: InputMaybe<Scalars['String']>
  url?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['uuid']>
}

/** aggregate stddev on columns */
export type ITopUpWallet_Stddev_Fields = {
  __typename?: 'TopUpWallet_stddev_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
  fee?: Maybe<FieldWrapper<Scalars['Float']>>
  timestamp?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev() on columns of table "TopUpWallet" */
export type ITopUpWallet_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
  timestamp?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type ITopUpWallet_Stddev_Pop_Fields = {
  __typename?: 'TopUpWallet_stddev_pop_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
  fee?: Maybe<FieldWrapper<Scalars['Float']>>
  timestamp?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev_pop() on columns of table "TopUpWallet" */
export type ITopUpWallet_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
  timestamp?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type ITopUpWallet_Stddev_Samp_Fields = {
  __typename?: 'TopUpWallet_stddev_samp_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
  fee?: Maybe<FieldWrapper<Scalars['Float']>>
  timestamp?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by stddev_samp() on columns of table "TopUpWallet" */
export type ITopUpWallet_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
  timestamp?: InputMaybe<Order_By>
}

/** aggregate sum on columns */
export type ITopUpWallet_Sum_Fields = {
  __typename?: 'TopUpWallet_sum_fields'
  amount?: Maybe<FieldWrapper<Scalars['numeric']>>
  fee?: Maybe<FieldWrapper<Scalars['numeric']>>
  timestamp?: Maybe<FieldWrapper<Scalars['bigint']>>
}

/** order by sum() on columns of table "TopUpWallet" */
export type ITopUpWallet_Sum_Order_By = {
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
  timestamp?: InputMaybe<Order_By>
}

/** update columns of table "TopUpWallet" */
export enum TopUpWallet_Update_Column {
  /** column name */
  amount = 'amount',
  /** column name */
  fee = 'fee',
  /** column name */
  id = 'id',
  /** column name */
  originFund = 'originFund',
  /** column name */
  state = 'state',
  /** column name */
  timestamp = 'timestamp',
  /** column name */
  transferId = 'transferId',
  /** column name */
  txHash = 'txHash',
  /** column name */
  url = 'url',
  /** column name */
  userId = 'userId',
}

/** aggregate var_pop on columns */
export type ITopUpWallet_Var_Pop_Fields = {
  __typename?: 'TopUpWallet_var_pop_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
  fee?: Maybe<FieldWrapper<Scalars['Float']>>
  timestamp?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by var_pop() on columns of table "TopUpWallet" */
export type ITopUpWallet_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
  timestamp?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type ITopUpWallet_Var_Samp_Fields = {
  __typename?: 'TopUpWallet_var_samp_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
  fee?: Maybe<FieldWrapper<Scalars['Float']>>
  timestamp?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by var_samp() on columns of table "TopUpWallet" */
export type ITopUpWallet_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
  timestamp?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type ITopUpWallet_Variance_Fields = {
  __typename?: 'TopUpWallet_variance_fields'
  amount?: Maybe<FieldWrapper<Scalars['Float']>>
  fee?: Maybe<FieldWrapper<Scalars['Float']>>
  timestamp?: Maybe<FieldWrapper<Scalars['Float']>>
}

/** order by variance() on columns of table "TopUpWallet" */
export type ITopUpWallet_Variance_Order_By = {
  amount?: InputMaybe<Order_By>
  fee?: InputMaybe<Order_By>
  timestamp?: InputMaybe<Order_By>
}

/** columns and relationships of "User" */
export type IUser = {
  __typename?: 'User'
  /** An array relationship */
  GrantOwners: Array<FieldWrapper<IGrantOwners>>
  /** An aggregate relationship */
  GrantOwners_aggregate: FieldWrapper<IGrantOwners_Aggregate>
  /** An array relationship */
  ProjectMembers: Array<FieldWrapper<IProjectMembers>>
  /** An aggregate relationship */
  ProjectMembers_aggregate: FieldWrapper<IProjectMembers_Aggregate>
  /** An array relationship */
  TopUpWallets: Array<FieldWrapper<ITopUpWallet>>
  /** An aggregate relationship */
  TopUpWallets_aggregate: FieldWrapper<ITopUpWallet_Aggregate>
  activityId?: Maybe<FieldWrapper<Scalars['uuid']>>
  bio?: Maybe<FieldWrapper<Scalars['String']>>
  company?: Maybe<FieldWrapper<Scalars['String']>>
  /** An array relationship */
  donations: Array<FieldWrapper<IDonations>>
  /** An aggregate relationship */
  donations_aggregate: FieldWrapper<IDonations_Aggregate>
  email: FieldWrapper<Scalars['String']>
  featured?: Maybe<FieldWrapper<Scalars['Boolean']>>
  firstName?: Maybe<FieldWrapper<Scalars['String']>>
  /** An array relationship */
  follows: Array<FieldWrapper<IFollows>>
  /** An aggregate relationship */
  follows_aggregate: FieldWrapper<IFollows_Aggregate>
  globalRole?: Maybe<FieldWrapper<Scalars['String']>>
  globalTitle?: Maybe<FieldWrapper<Scalars['String']>>
  /** An array relationship */
  grantSubmissionReviews: Array<FieldWrapper<IGrantSubmissionReview>>
  /** An aggregate relationship */
  grantSubmissionReviews_aggregate: FieldWrapper<IGrantSubmissionReview_Aggregate>
  /** An array relationship */
  grantSubmissions: Array<FieldWrapper<IGrantSubmissions>>
  /** An aggregate relationship */
  grantSubmissions_aggregate: FieldWrapper<IGrantSubmissions_Aggregate>
  /** An array relationship */
  grants: Array<FieldWrapper<IGrants>>
  /** An aggregate relationship */
  grants_aggregate: FieldWrapper<IGrants_Aggregate>
  id: FieldWrapper<Scalars['uuid']>
  issuer?: Maybe<FieldWrapper<Scalars['String']>>
  lastName?: Maybe<FieldWrapper<Scalars['String']>>
  /** An array relationship */
  likedBy: Array<FieldWrapper<ILikes>>
  /** An aggregate relationship */
  likedBy_aggregate: FieldWrapper<ILikes_Aggregate>
  /** An array relationship */
  likes: Array<FieldWrapper<ILikes>>
  /** An aggregate relationship */
  likes_aggregate: FieldWrapper<ILikes_Aggregate>
  linkedinLink?: Maybe<FieldWrapper<Scalars['String']>>
  profileImage?: Maybe<FieldWrapper<Scalars['String']>>
  /** An array relationship */
  projects: Array<FieldWrapper<IProject>>
  /** An aggregate relationship */
  projects_aggregate: FieldWrapper<IProject_Aggregate>
  publicAddress?: Maybe<FieldWrapper<Scalars['String']>>
  twitterLink?: Maybe<FieldWrapper<Scalars['String']>>
  website?: Maybe<FieldWrapper<Scalars['String']>>
}

/** columns and relationships of "User" */
export type IUserGrantOwnersArgs = {
  distinct_on?: InputMaybe<Array<GrantOwners_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantOwners_Order_By>>
  where?: InputMaybe<IGrantOwners_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserGrantOwners_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantOwners_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantOwners_Order_By>>
  where?: InputMaybe<IGrantOwners_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserProjectMembersArgs = {
  distinct_on?: InputMaybe<Array<ProjectMembers_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectMembers_Order_By>>
  where?: InputMaybe<IProjectMembers_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserProjectMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectMembers_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectMembers_Order_By>>
  where?: InputMaybe<IProjectMembers_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserTopUpWalletsArgs = {
  distinct_on?: InputMaybe<Array<TopUpWallet_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ITopUpWallet_Order_By>>
  where?: InputMaybe<ITopUpWallet_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserTopUpWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<TopUpWallet_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ITopUpWallet_Order_By>>
  where?: InputMaybe<ITopUpWallet_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserDonationsArgs = {
  distinct_on?: InputMaybe<Array<Donations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IDonations_Order_By>>
  where?: InputMaybe<IDonations_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserDonations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Donations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IDonations_Order_By>>
  where?: InputMaybe<IDonations_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserFollowsArgs = {
  distinct_on?: InputMaybe<Array<Follows_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IFollows_Order_By>>
  where?: InputMaybe<IFollows_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserFollows_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Follows_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IFollows_Order_By>>
  where?: InputMaybe<IFollows_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserGrantSubmissionReviewsArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissionReview_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantSubmissionReview_Order_By>>
  where?: InputMaybe<IGrantSubmissionReview_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserGrantSubmissionReviews_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissionReview_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantSubmissionReview_Order_By>>
  where?: InputMaybe<IGrantSubmissionReview_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserGrantSubmissionsArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantSubmissions_Order_By>>
  where?: InputMaybe<IGrantSubmissions_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserGrantSubmissions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantSubmissions_Order_By>>
  where?: InputMaybe<IGrantSubmissions_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserGrantsArgs = {
  distinct_on?: InputMaybe<Array<Grants_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrants_Order_By>>
  where?: InputMaybe<IGrants_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserGrants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Grants_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrants_Order_By>>
  where?: InputMaybe<IGrants_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserLikedByArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ILikes_Order_By>>
  where?: InputMaybe<ILikes_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserLikedBy_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ILikes_Order_By>>
  where?: InputMaybe<ILikes_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserLikesArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ILikes_Order_By>>
  where?: InputMaybe<ILikes_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserLikes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ILikes_Order_By>>
  where?: InputMaybe<ILikes_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserProjectsArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProject_Order_By>>
  where?: InputMaybe<IProject_Bool_Exp>
}

/** columns and relationships of "User" */
export type IUserProjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProject_Order_By>>
  where?: InputMaybe<IProject_Bool_Exp>
}

/** aggregated selection of "User" */
export type IUser_Aggregate = {
  __typename?: 'User_aggregate'
  aggregate?: Maybe<FieldWrapper<IUser_Aggregate_Fields>>
  nodes: Array<FieldWrapper<IUser>>
}

/** aggregate fields of "User" */
export type IUser_Aggregate_Fields = {
  __typename?: 'User_aggregate_fields'
  count: FieldWrapper<Scalars['Int']>
  max?: Maybe<FieldWrapper<IUser_Max_Fields>>
  min?: Maybe<FieldWrapper<IUser_Min_Fields>>
}

/** aggregate fields of "User" */
export type IUser_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "User". All fields are combined with a logical 'AND'. */
export type IUser_Bool_Exp = {
  GrantOwners?: InputMaybe<IGrantOwners_Bool_Exp>
  ProjectMembers?: InputMaybe<IProjectMembers_Bool_Exp>
  TopUpWallets?: InputMaybe<ITopUpWallet_Bool_Exp>
  _and?: InputMaybe<Array<IUser_Bool_Exp>>
  _not?: InputMaybe<IUser_Bool_Exp>
  _or?: InputMaybe<Array<IUser_Bool_Exp>>
  activityId?: InputMaybe<IUuid_Comparison_Exp>
  bio?: InputMaybe<IString_Comparison_Exp>
  company?: InputMaybe<IString_Comparison_Exp>
  donations?: InputMaybe<IDonations_Bool_Exp>
  email?: InputMaybe<IString_Comparison_Exp>
  featured?: InputMaybe<IBoolean_Comparison_Exp>
  firstName?: InputMaybe<IString_Comparison_Exp>
  follows?: InputMaybe<IFollows_Bool_Exp>
  globalRole?: InputMaybe<IString_Comparison_Exp>
  globalTitle?: InputMaybe<IString_Comparison_Exp>
  grantSubmissionReviews?: InputMaybe<IGrantSubmissionReview_Bool_Exp>
  grantSubmissions?: InputMaybe<IGrantSubmissions_Bool_Exp>
  grants?: InputMaybe<IGrants_Bool_Exp>
  id?: InputMaybe<IUuid_Comparison_Exp>
  issuer?: InputMaybe<IString_Comparison_Exp>
  lastName?: InputMaybe<IString_Comparison_Exp>
  likedBy?: InputMaybe<ILikes_Bool_Exp>
  likes?: InputMaybe<ILikes_Bool_Exp>
  linkedinLink?: InputMaybe<IString_Comparison_Exp>
  profileImage?: InputMaybe<IString_Comparison_Exp>
  projects?: InputMaybe<IProject_Bool_Exp>
  publicAddress?: InputMaybe<IString_Comparison_Exp>
  twitterLink?: InputMaybe<IString_Comparison_Exp>
  website?: InputMaybe<IString_Comparison_Exp>
}

/** unique or primary key constraints on table "User" */
export enum User_Constraint {
  /** unique or primary key constraint */
  User_email_key = 'User_email_key',
  /** unique or primary key constraint */
  User_pkey = 'User_pkey',
  /** unique or primary key constraint */
  User_publicAddress_key = 'User_publicAddress_key',
}

/** input type for inserting data into table "User" */
export type IUser_Insert_Input = {
  GrantOwners?: InputMaybe<IGrantOwners_Arr_Rel_Insert_Input>
  ProjectMembers?: InputMaybe<IProjectMembers_Arr_Rel_Insert_Input>
  TopUpWallets?: InputMaybe<ITopUpWallet_Arr_Rel_Insert_Input>
  activityId?: InputMaybe<Scalars['uuid']>
  bio?: InputMaybe<Scalars['String']>
  company?: InputMaybe<Scalars['String']>
  donations?: InputMaybe<IDonations_Arr_Rel_Insert_Input>
  email?: InputMaybe<Scalars['String']>
  featured?: InputMaybe<Scalars['Boolean']>
  firstName?: InputMaybe<Scalars['String']>
  follows?: InputMaybe<IFollows_Arr_Rel_Insert_Input>
  globalRole?: InputMaybe<Scalars['String']>
  globalTitle?: InputMaybe<Scalars['String']>
  grantSubmissionReviews?: InputMaybe<IGrantSubmissionReview_Arr_Rel_Insert_Input>
  grantSubmissions?: InputMaybe<IGrantSubmissions_Arr_Rel_Insert_Input>
  grants?: InputMaybe<IGrants_Arr_Rel_Insert_Input>
  id?: InputMaybe<Scalars['uuid']>
  issuer?: InputMaybe<Scalars['String']>
  lastName?: InputMaybe<Scalars['String']>
  likedBy?: InputMaybe<ILikes_Arr_Rel_Insert_Input>
  likes?: InputMaybe<ILikes_Arr_Rel_Insert_Input>
  linkedinLink?: InputMaybe<Scalars['String']>
  profileImage?: InputMaybe<Scalars['String']>
  projects?: InputMaybe<IProject_Arr_Rel_Insert_Input>
  publicAddress?: InputMaybe<Scalars['String']>
  twitterLink?: InputMaybe<Scalars['String']>
  website?: InputMaybe<Scalars['String']>
}

/** aggregate max on columns */
export type IUser_Max_Fields = {
  __typename?: 'User_max_fields'
  activityId?: Maybe<FieldWrapper<Scalars['uuid']>>
  bio?: Maybe<FieldWrapper<Scalars['String']>>
  company?: Maybe<FieldWrapper<Scalars['String']>>
  email?: Maybe<FieldWrapper<Scalars['String']>>
  firstName?: Maybe<FieldWrapper<Scalars['String']>>
  globalRole?: Maybe<FieldWrapper<Scalars['String']>>
  globalTitle?: Maybe<FieldWrapper<Scalars['String']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  issuer?: Maybe<FieldWrapper<Scalars['String']>>
  lastName?: Maybe<FieldWrapper<Scalars['String']>>
  linkedinLink?: Maybe<FieldWrapper<Scalars['String']>>
  profileImage?: Maybe<FieldWrapper<Scalars['String']>>
  publicAddress?: Maybe<FieldWrapper<Scalars['String']>>
  twitterLink?: Maybe<FieldWrapper<Scalars['String']>>
  website?: Maybe<FieldWrapper<Scalars['String']>>
}

/** aggregate min on columns */
export type IUser_Min_Fields = {
  __typename?: 'User_min_fields'
  activityId?: Maybe<FieldWrapper<Scalars['uuid']>>
  bio?: Maybe<FieldWrapper<Scalars['String']>>
  company?: Maybe<FieldWrapper<Scalars['String']>>
  email?: Maybe<FieldWrapper<Scalars['String']>>
  firstName?: Maybe<FieldWrapper<Scalars['String']>>
  globalRole?: Maybe<FieldWrapper<Scalars['String']>>
  globalTitle?: Maybe<FieldWrapper<Scalars['String']>>
  id?: Maybe<FieldWrapper<Scalars['uuid']>>
  issuer?: Maybe<FieldWrapper<Scalars['String']>>
  lastName?: Maybe<FieldWrapper<Scalars['String']>>
  linkedinLink?: Maybe<FieldWrapper<Scalars['String']>>
  profileImage?: Maybe<FieldWrapper<Scalars['String']>>
  publicAddress?: Maybe<FieldWrapper<Scalars['String']>>
  twitterLink?: Maybe<FieldWrapper<Scalars['String']>>
  website?: Maybe<FieldWrapper<Scalars['String']>>
}

/** response of any mutation on the table "User" */
export type IUser_Mutation_Response = {
  __typename?: 'User_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: FieldWrapper<Scalars['Int']>
  /** data from the rows affected by the mutation */
  returning: Array<FieldWrapper<IUser>>
}

/** input type for inserting object relation for remote table "User" */
export type IUser_Obj_Rel_Insert_Input = {
  data: IUser_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<IUser_On_Conflict>
}

/** on_conflict condition type for table "User" */
export type IUser_On_Conflict = {
  constraint: User_Constraint
  update_columns?: Array<User_Update_Column>
  where?: InputMaybe<IUser_Bool_Exp>
}

/** Ordering options when selecting data from "User". */
export type IUser_Order_By = {
  GrantOwners_aggregate?: InputMaybe<IGrantOwners_Aggregate_Order_By>
  ProjectMembers_aggregate?: InputMaybe<IProjectMembers_Aggregate_Order_By>
  TopUpWallets_aggregate?: InputMaybe<ITopUpWallet_Aggregate_Order_By>
  activityId?: InputMaybe<Order_By>
  bio?: InputMaybe<Order_By>
  company?: InputMaybe<Order_By>
  donations_aggregate?: InputMaybe<IDonations_Aggregate_Order_By>
  email?: InputMaybe<Order_By>
  featured?: InputMaybe<Order_By>
  firstName?: InputMaybe<Order_By>
  follows_aggregate?: InputMaybe<IFollows_Aggregate_Order_By>
  globalRole?: InputMaybe<Order_By>
  globalTitle?: InputMaybe<Order_By>
  grantSubmissionReviews_aggregate?: InputMaybe<IGrantSubmissionReview_Aggregate_Order_By>
  grantSubmissions_aggregate?: InputMaybe<IGrantSubmissions_Aggregate_Order_By>
  grants_aggregate?: InputMaybe<IGrants_Aggregate_Order_By>
  id?: InputMaybe<Order_By>
  issuer?: InputMaybe<Order_By>
  lastName?: InputMaybe<Order_By>
  likedBy_aggregate?: InputMaybe<ILikes_Aggregate_Order_By>
  likes_aggregate?: InputMaybe<ILikes_Aggregate_Order_By>
  linkedinLink?: InputMaybe<Order_By>
  profileImage?: InputMaybe<Order_By>
  projects_aggregate?: InputMaybe<IProject_Aggregate_Order_By>
  publicAddress?: InputMaybe<Order_By>
  twitterLink?: InputMaybe<Order_By>
  website?: InputMaybe<Order_By>
}

/** primary key columns input for table: User */
export type IUser_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "User" */
export enum User_Select_Column {
  /** column name */
  activityId = 'activityId',
  /** column name */
  bio = 'bio',
  /** column name */
  company = 'company',
  /** column name */
  email = 'email',
  /** column name */
  featured = 'featured',
  /** column name */
  firstName = 'firstName',
  /** column name */
  globalRole = 'globalRole',
  /** column name */
  globalTitle = 'globalTitle',
  /** column name */
  id = 'id',
  /** column name */
  issuer = 'issuer',
  /** column name */
  lastName = 'lastName',
  /** column name */
  linkedinLink = 'linkedinLink',
  /** column name */
  profileImage = 'profileImage',
  /** column name */
  publicAddress = 'publicAddress',
  /** column name */
  twitterLink = 'twitterLink',
  /** column name */
  website = 'website',
}

/** input type for updating data in table "User" */
export type IUser_Set_Input = {
  activityId?: InputMaybe<Scalars['uuid']>
  bio?: InputMaybe<Scalars['String']>
  company?: InputMaybe<Scalars['String']>
  email?: InputMaybe<Scalars['String']>
  featured?: InputMaybe<Scalars['Boolean']>
  firstName?: InputMaybe<Scalars['String']>
  globalRole?: InputMaybe<Scalars['String']>
  globalTitle?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['uuid']>
  issuer?: InputMaybe<Scalars['String']>
  lastName?: InputMaybe<Scalars['String']>
  linkedinLink?: InputMaybe<Scalars['String']>
  profileImage?: InputMaybe<Scalars['String']>
  publicAddress?: InputMaybe<Scalars['String']>
  twitterLink?: InputMaybe<Scalars['String']>
  website?: InputMaybe<Scalars['String']>
}

/** update columns of table "User" */
export enum User_Update_Column {
  /** column name */
  activityId = 'activityId',
  /** column name */
  bio = 'bio',
  /** column name */
  company = 'company',
  /** column name */
  email = 'email',
  /** column name */
  featured = 'featured',
  /** column name */
  firstName = 'firstName',
  /** column name */
  globalRole = 'globalRole',
  /** column name */
  globalTitle = 'globalTitle',
  /** column name */
  id = 'id',
  /** column name */
  issuer = 'issuer',
  /** column name */
  lastName = 'lastName',
  /** column name */
  linkedinLink = 'linkedinLink',
  /** column name */
  profileImage = 'profileImage',
  /** column name */
  publicAddress = 'publicAddress',
  /** column name */
  twitterLink = 'twitterLink',
  /** column name */
  website = 'website',
}

export type I_Block_ = {
  __typename?: '_Block_'
  /** The hash of the block */
  hash?: Maybe<FieldWrapper<Scalars['Bytes']>>
  /** The block number */
  number: FieldWrapper<Scalars['Int']>
}

/** The type for the top-level _meta field */
export type I_Meta_ = {
  __typename?: '_Meta_'
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: FieldWrapper<I_Block_>
  /** The deployment ID */
  deployment: FieldWrapper<Scalars['String']>
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: FieldWrapper<Scalars['Boolean']>
}

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  deny = 'deny',
}

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type IBigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']>
  _gt?: InputMaybe<Scalars['bigint']>
  _gte?: InputMaybe<Scalars['bigint']>
  _in?: InputMaybe<Array<Scalars['bigint']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['bigint']>
  _lte?: InputMaybe<Scalars['bigint']>
  _neq?: InputMaybe<Scalars['bigint']>
  _nin?: InputMaybe<Array<Scalars['bigint']>>
}

/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type IFloat8_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['float8']>
  _gt?: InputMaybe<Scalars['float8']>
  _gte?: InputMaybe<Scalars['float8']>
  _in?: InputMaybe<Array<Scalars['float8']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['float8']>
  _lte?: InputMaybe<Scalars['float8']>
  _neq?: InputMaybe<Scalars['float8']>
  _nin?: InputMaybe<Array<Scalars['float8']>>
}

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export type IJson_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['json']>
  _gt?: InputMaybe<Scalars['json']>
  _gte?: InputMaybe<Scalars['json']>
  _in?: InputMaybe<Array<Scalars['json']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['json']>
  _lte?: InputMaybe<Scalars['json']>
  _neq?: InputMaybe<Scalars['json']>
  _nin?: InputMaybe<Array<Scalars['json']>>
}

/** mutation root */
export type IMutation_Root = {
  __typename?: 'mutation_root'
  /** delete data from the table: "Donations" */
  delete_Donations?: Maybe<FieldWrapper<IDonations_Mutation_Response>>
  /** delete single row from the table: "Donations" */
  delete_Donations_by_pk?: Maybe<FieldWrapper<IDonations>>
  /** delete data from the table: "Follows" */
  delete_Follows?: Maybe<FieldWrapper<IFollows_Mutation_Response>>
  /** delete single row from the table: "Follows" */
  delete_Follows_by_pk?: Maybe<FieldWrapper<IFollows>>
  /** delete data from the table: "GrantCategories" */
  delete_GrantCategories?: Maybe<FieldWrapper<IGrantCategories_Mutation_Response>>
  /** delete data from the table: "GrantCategoriesBridge" */
  delete_GrantCategoriesBridge?: Maybe<FieldWrapper<IGrantCategoriesBridge_Mutation_Response>>
  /** delete single row from the table: "GrantCategoriesBridge" */
  delete_GrantCategoriesBridge_by_pk?: Maybe<FieldWrapper<IGrantCategoriesBridge>>
  /** delete single row from the table: "GrantCategories" */
  delete_GrantCategories_by_pk?: Maybe<FieldWrapper<IGrantCategories>>
  /** delete data from the table: "GrantCycles" */
  delete_GrantCycles?: Maybe<FieldWrapper<IGrantCycles_Mutation_Response>>
  /** delete single row from the table: "GrantCycles" */
  delete_GrantCycles_by_pk?: Maybe<FieldWrapper<IGrantCycles>>
  /** delete data from the table: "GrantOwners" */
  delete_GrantOwners?: Maybe<FieldWrapper<IGrantOwners_Mutation_Response>>
  /** delete data from the table: "GrantOwnersTiers" */
  delete_GrantOwnersTiers?: Maybe<FieldWrapper<IGrantOwnersTiers_Mutation_Response>>
  /** delete single row from the table: "GrantOwnersTiers" */
  delete_GrantOwnersTiers_by_pk?: Maybe<FieldWrapper<IGrantOwnersTiers>>
  /** delete single row from the table: "GrantOwners" */
  delete_GrantOwners_by_pk?: Maybe<FieldWrapper<IGrantOwners>>
  /** delete data from the table: "GrantSubmissionReview" */
  delete_GrantSubmissionReview?: Maybe<FieldWrapper<IGrantSubmissionReview_Mutation_Response>>
  /** delete single row from the table: "GrantSubmissionReview" */
  delete_GrantSubmissionReview_by_pk?: Maybe<FieldWrapper<IGrantSubmissionReview>>
  /** delete data from the table: "GrantSubmissions" */
  delete_GrantSubmissions?: Maybe<FieldWrapper<IGrantSubmissions_Mutation_Response>>
  /** delete single row from the table: "GrantSubmissions" */
  delete_GrantSubmissions_by_pk?: Maybe<FieldWrapper<IGrantSubmissions>>
  /** delete data from the table: "GrantTags" */
  delete_GrantTags?: Maybe<FieldWrapper<IGrantTags_Mutation_Response>>
  /** delete data from the table: "GrantTagsBridge" */
  delete_GrantTagsBridge?: Maybe<FieldWrapper<IGrantTagsBridge_Mutation_Response>>
  /** delete single row from the table: "GrantTagsBridge" */
  delete_GrantTagsBridge_by_pk?: Maybe<FieldWrapper<IGrantTagsBridge>>
  /** delete single row from the table: "GrantTags" */
  delete_GrantTags_by_pk?: Maybe<FieldWrapper<IGrantTags>>
  /** delete data from the table: "Grants" */
  delete_Grants?: Maybe<FieldWrapper<IGrants_Mutation_Response>>
  /** delete single row from the table: "Grants" */
  delete_Grants_by_pk?: Maybe<FieldWrapper<IGrants>>
  /** delete data from the table: "Likes" */
  delete_Likes?: Maybe<FieldWrapper<ILikes_Mutation_Response>>
  /** delete single row from the table: "Likes" */
  delete_Likes_by_pk?: Maybe<FieldWrapper<ILikes>>
  /** delete data from the table: "Project" */
  delete_Project?: Maybe<FieldWrapper<IProject_Mutation_Response>>
  /** delete data from the table: "ProjectMembers" */
  delete_ProjectMembers?: Maybe<FieldWrapper<IProjectMembers_Mutation_Response>>
  /** delete single row from the table: "ProjectMembers" */
  delete_ProjectMembers_by_pk?: Maybe<FieldWrapper<IProjectMembers>>
  /** delete data from the table: "ProjectTag" */
  delete_ProjectTag?: Maybe<FieldWrapper<IProjectTag_Mutation_Response>>
  /** delete single row from the table: "ProjectTag" */
  delete_ProjectTag_by_pk?: Maybe<FieldWrapper<IProjectTag>>
  /** delete data from the table: "ProjectTagsBridge" */
  delete_ProjectTagsBridge?: Maybe<FieldWrapper<IProjectTagsBridge_Mutation_Response>>
  /** delete single row from the table: "ProjectTagsBridge" */
  delete_ProjectTagsBridge_by_pk?: Maybe<FieldWrapper<IProjectTagsBridge>>
  /** delete data from the table: "ProjectType" */
  delete_ProjectType?: Maybe<FieldWrapper<IProjectType_Mutation_Response>>
  /** delete data from the table: "ProjectTypeBridge" */
  delete_ProjectTypeBridge?: Maybe<FieldWrapper<IProjectTypeBridge_Mutation_Response>>
  /** delete single row from the table: "ProjectTypeBridge" */
  delete_ProjectTypeBridge_by_pk?: Maybe<FieldWrapper<IProjectTypeBridge>>
  /** delete single row from the table: "ProjectType" */
  delete_ProjectType_by_pk?: Maybe<FieldWrapper<IProjectType>>
  /** delete single row from the table: "Project" */
  delete_Project_by_pk?: Maybe<FieldWrapper<IProject>>
  /** delete data from the table: "Swaps" */
  delete_Swaps?: Maybe<FieldWrapper<ISwaps_Mutation_Response>>
  /** delete single row from the table: "Swaps" */
  delete_Swaps_by_pk?: Maybe<FieldWrapper<ISwaps>>
  /** delete data from the table: "TopUpWallet" */
  delete_TopUpWallet?: Maybe<FieldWrapper<ITopUpWallet_Mutation_Response>>
  /** delete single row from the table: "TopUpWallet" */
  delete_TopUpWallet_by_pk?: Maybe<FieldWrapper<ITopUpWallet>>
  /** delete data from the table: "User" */
  delete_User?: Maybe<FieldWrapper<IUser_Mutation_Response>>
  /** delete single row from the table: "User" */
  delete_User_by_pk?: Maybe<FieldWrapper<IUser>>
  /** insert data into the table: "Donations" */
  insert_Donations?: Maybe<FieldWrapper<IDonations_Mutation_Response>>
  /** insert a single row into the table: "Donations" */
  insert_Donations_one?: Maybe<FieldWrapper<IDonations>>
  /** insert data into the table: "Follows" */
  insert_Follows?: Maybe<FieldWrapper<IFollows_Mutation_Response>>
  /** insert a single row into the table: "Follows" */
  insert_Follows_one?: Maybe<FieldWrapper<IFollows>>
  /** insert data into the table: "GrantCategories" */
  insert_GrantCategories?: Maybe<FieldWrapper<IGrantCategories_Mutation_Response>>
  /** insert data into the table: "GrantCategoriesBridge" */
  insert_GrantCategoriesBridge?: Maybe<FieldWrapper<IGrantCategoriesBridge_Mutation_Response>>
  /** insert a single row into the table: "GrantCategoriesBridge" */
  insert_GrantCategoriesBridge_one?: Maybe<FieldWrapper<IGrantCategoriesBridge>>
  /** insert a single row into the table: "GrantCategories" */
  insert_GrantCategories_one?: Maybe<FieldWrapper<IGrantCategories>>
  /** insert data into the table: "GrantCycles" */
  insert_GrantCycles?: Maybe<FieldWrapper<IGrantCycles_Mutation_Response>>
  /** insert a single row into the table: "GrantCycles" */
  insert_GrantCycles_one?: Maybe<FieldWrapper<IGrantCycles>>
  /** insert data into the table: "GrantOwners" */
  insert_GrantOwners?: Maybe<FieldWrapper<IGrantOwners_Mutation_Response>>
  /** insert data into the table: "GrantOwnersTiers" */
  insert_GrantOwnersTiers?: Maybe<FieldWrapper<IGrantOwnersTiers_Mutation_Response>>
  /** insert a single row into the table: "GrantOwnersTiers" */
  insert_GrantOwnersTiers_one?: Maybe<FieldWrapper<IGrantOwnersTiers>>
  /** insert a single row into the table: "GrantOwners" */
  insert_GrantOwners_one?: Maybe<FieldWrapper<IGrantOwners>>
  /** insert data into the table: "GrantSubmissionReview" */
  insert_GrantSubmissionReview?: Maybe<FieldWrapper<IGrantSubmissionReview_Mutation_Response>>
  /** insert a single row into the table: "GrantSubmissionReview" */
  insert_GrantSubmissionReview_one?: Maybe<FieldWrapper<IGrantSubmissionReview>>
  /** insert data into the table: "GrantSubmissions" */
  insert_GrantSubmissions?: Maybe<FieldWrapper<IGrantSubmissions_Mutation_Response>>
  /** insert a single row into the table: "GrantSubmissions" */
  insert_GrantSubmissions_one?: Maybe<FieldWrapper<IGrantSubmissions>>
  /** insert data into the table: "GrantTags" */
  insert_GrantTags?: Maybe<FieldWrapper<IGrantTags_Mutation_Response>>
  /** insert data into the table: "GrantTagsBridge" */
  insert_GrantTagsBridge?: Maybe<FieldWrapper<IGrantTagsBridge_Mutation_Response>>
  /** insert a single row into the table: "GrantTagsBridge" */
  insert_GrantTagsBridge_one?: Maybe<FieldWrapper<IGrantTagsBridge>>
  /** insert a single row into the table: "GrantTags" */
  insert_GrantTags_one?: Maybe<FieldWrapper<IGrantTags>>
  /** insert data into the table: "Grants" */
  insert_Grants?: Maybe<FieldWrapper<IGrants_Mutation_Response>>
  /** insert a single row into the table: "Grants" */
  insert_Grants_one?: Maybe<FieldWrapper<IGrants>>
  /** insert data into the table: "Likes" */
  insert_Likes?: Maybe<FieldWrapper<ILikes_Mutation_Response>>
  /** insert a single row into the table: "Likes" */
  insert_Likes_one?: Maybe<FieldWrapper<ILikes>>
  /** insert data into the table: "Project" */
  insert_Project?: Maybe<FieldWrapper<IProject_Mutation_Response>>
  /** insert data into the table: "ProjectMembers" */
  insert_ProjectMembers?: Maybe<FieldWrapper<IProjectMembers_Mutation_Response>>
  /** insert a single row into the table: "ProjectMembers" */
  insert_ProjectMembers_one?: Maybe<FieldWrapper<IProjectMembers>>
  /** insert data into the table: "ProjectTag" */
  insert_ProjectTag?: Maybe<FieldWrapper<IProjectTag_Mutation_Response>>
  /** insert a single row into the table: "ProjectTag" */
  insert_ProjectTag_one?: Maybe<FieldWrapper<IProjectTag>>
  /** insert data into the table: "ProjectTagsBridge" */
  insert_ProjectTagsBridge?: Maybe<FieldWrapper<IProjectTagsBridge_Mutation_Response>>
  /** insert a single row into the table: "ProjectTagsBridge" */
  insert_ProjectTagsBridge_one?: Maybe<FieldWrapper<IProjectTagsBridge>>
  /** insert data into the table: "ProjectType" */
  insert_ProjectType?: Maybe<FieldWrapper<IProjectType_Mutation_Response>>
  /** insert data into the table: "ProjectTypeBridge" */
  insert_ProjectTypeBridge?: Maybe<FieldWrapper<IProjectTypeBridge_Mutation_Response>>
  /** insert a single row into the table: "ProjectTypeBridge" */
  insert_ProjectTypeBridge_one?: Maybe<FieldWrapper<IProjectTypeBridge>>
  /** insert a single row into the table: "ProjectType" */
  insert_ProjectType_one?: Maybe<FieldWrapper<IProjectType>>
  /** insert a single row into the table: "Project" */
  insert_Project_one?: Maybe<FieldWrapper<IProject>>
  /** insert data into the table: "Swaps" */
  insert_Swaps?: Maybe<FieldWrapper<ISwaps_Mutation_Response>>
  /** insert a single row into the table: "Swaps" */
  insert_Swaps_one?: Maybe<FieldWrapper<ISwaps>>
  /** insert data into the table: "TopUpWallet" */
  insert_TopUpWallet?: Maybe<FieldWrapper<ITopUpWallet_Mutation_Response>>
  /** insert a single row into the table: "TopUpWallet" */
  insert_TopUpWallet_one?: Maybe<FieldWrapper<ITopUpWallet>>
  /** insert data into the table: "User" */
  insert_User?: Maybe<FieldWrapper<IUser_Mutation_Response>>
  /** insert a single row into the table: "User" */
  insert_User_one?: Maybe<FieldWrapper<IUser>>
  /** update data of the table: "Donations" */
  update_Donations?: Maybe<FieldWrapper<IDonations_Mutation_Response>>
  /** update single row of the table: "Donations" */
  update_Donations_by_pk?: Maybe<FieldWrapper<IDonations>>
  /** update data of the table: "Follows" */
  update_Follows?: Maybe<FieldWrapper<IFollows_Mutation_Response>>
  /** update single row of the table: "Follows" */
  update_Follows_by_pk?: Maybe<FieldWrapper<IFollows>>
  /** update data of the table: "GrantCategories" */
  update_GrantCategories?: Maybe<FieldWrapper<IGrantCategories_Mutation_Response>>
  /** update data of the table: "GrantCategoriesBridge" */
  update_GrantCategoriesBridge?: Maybe<FieldWrapper<IGrantCategoriesBridge_Mutation_Response>>
  /** update single row of the table: "GrantCategoriesBridge" */
  update_GrantCategoriesBridge_by_pk?: Maybe<FieldWrapper<IGrantCategoriesBridge>>
  /** update single row of the table: "GrantCategories" */
  update_GrantCategories_by_pk?: Maybe<FieldWrapper<IGrantCategories>>
  /** update data of the table: "GrantCycles" */
  update_GrantCycles?: Maybe<FieldWrapper<IGrantCycles_Mutation_Response>>
  /** update single row of the table: "GrantCycles" */
  update_GrantCycles_by_pk?: Maybe<FieldWrapper<IGrantCycles>>
  /** update data of the table: "GrantOwners" */
  update_GrantOwners?: Maybe<FieldWrapper<IGrantOwners_Mutation_Response>>
  /** update data of the table: "GrantOwnersTiers" */
  update_GrantOwnersTiers?: Maybe<FieldWrapper<IGrantOwnersTiers_Mutation_Response>>
  /** update single row of the table: "GrantOwnersTiers" */
  update_GrantOwnersTiers_by_pk?: Maybe<FieldWrapper<IGrantOwnersTiers>>
  /** update single row of the table: "GrantOwners" */
  update_GrantOwners_by_pk?: Maybe<FieldWrapper<IGrantOwners>>
  /** update data of the table: "GrantSubmissionReview" */
  update_GrantSubmissionReview?: Maybe<FieldWrapper<IGrantSubmissionReview_Mutation_Response>>
  /** update single row of the table: "GrantSubmissionReview" */
  update_GrantSubmissionReview_by_pk?: Maybe<FieldWrapper<IGrantSubmissionReview>>
  /** update data of the table: "GrantSubmissions" */
  update_GrantSubmissions?: Maybe<FieldWrapper<IGrantSubmissions_Mutation_Response>>
  /** update single row of the table: "GrantSubmissions" */
  update_GrantSubmissions_by_pk?: Maybe<FieldWrapper<IGrantSubmissions>>
  /** update data of the table: "GrantTags" */
  update_GrantTags?: Maybe<FieldWrapper<IGrantTags_Mutation_Response>>
  /** update data of the table: "GrantTagsBridge" */
  update_GrantTagsBridge?: Maybe<FieldWrapper<IGrantTagsBridge_Mutation_Response>>
  /** update single row of the table: "GrantTagsBridge" */
  update_GrantTagsBridge_by_pk?: Maybe<FieldWrapper<IGrantTagsBridge>>
  /** update single row of the table: "GrantTags" */
  update_GrantTags_by_pk?: Maybe<FieldWrapper<IGrantTags>>
  /** update data of the table: "Grants" */
  update_Grants?: Maybe<FieldWrapper<IGrants_Mutation_Response>>
  /** update single row of the table: "Grants" */
  update_Grants_by_pk?: Maybe<FieldWrapper<IGrants>>
  /** update data of the table: "Likes" */
  update_Likes?: Maybe<FieldWrapper<ILikes_Mutation_Response>>
  /** update single row of the table: "Likes" */
  update_Likes_by_pk?: Maybe<FieldWrapper<ILikes>>
  /** update data of the table: "Project" */
  update_Project?: Maybe<FieldWrapper<IProject_Mutation_Response>>
  /** update data of the table: "ProjectMembers" */
  update_ProjectMembers?: Maybe<FieldWrapper<IProjectMembers_Mutation_Response>>
  /** update single row of the table: "ProjectMembers" */
  update_ProjectMembers_by_pk?: Maybe<FieldWrapper<IProjectMembers>>
  /** update data of the table: "ProjectTag" */
  update_ProjectTag?: Maybe<FieldWrapper<IProjectTag_Mutation_Response>>
  /** update single row of the table: "ProjectTag" */
  update_ProjectTag_by_pk?: Maybe<FieldWrapper<IProjectTag>>
  /** update data of the table: "ProjectTagsBridge" */
  update_ProjectTagsBridge?: Maybe<FieldWrapper<IProjectTagsBridge_Mutation_Response>>
  /** update single row of the table: "ProjectTagsBridge" */
  update_ProjectTagsBridge_by_pk?: Maybe<FieldWrapper<IProjectTagsBridge>>
  /** update data of the table: "ProjectType" */
  update_ProjectType?: Maybe<FieldWrapper<IProjectType_Mutation_Response>>
  /** update data of the table: "ProjectTypeBridge" */
  update_ProjectTypeBridge?: Maybe<FieldWrapper<IProjectTypeBridge_Mutation_Response>>
  /** update single row of the table: "ProjectTypeBridge" */
  update_ProjectTypeBridge_by_pk?: Maybe<FieldWrapper<IProjectTypeBridge>>
  /** update single row of the table: "ProjectType" */
  update_ProjectType_by_pk?: Maybe<FieldWrapper<IProjectType>>
  /** update single row of the table: "Project" */
  update_Project_by_pk?: Maybe<FieldWrapper<IProject>>
  /** update data of the table: "Swaps" */
  update_Swaps?: Maybe<FieldWrapper<ISwaps_Mutation_Response>>
  /** update single row of the table: "Swaps" */
  update_Swaps_by_pk?: Maybe<FieldWrapper<ISwaps>>
  /** update data of the table: "TopUpWallet" */
  update_TopUpWallet?: Maybe<FieldWrapper<ITopUpWallet_Mutation_Response>>
  /** update single row of the table: "TopUpWallet" */
  update_TopUpWallet_by_pk?: Maybe<FieldWrapper<ITopUpWallet>>
  /** update data of the table: "User" */
  update_User?: Maybe<FieldWrapper<IUser_Mutation_Response>>
  /** update single row of the table: "User" */
  update_User_by_pk?: Maybe<FieldWrapper<IUser>>
}

/** mutation root */
export type IMutation_RootDelete_DonationsArgs = {
  where: IDonations_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_Donations_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_FollowsArgs = {
  where: IFollows_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_Follows_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_GrantCategoriesArgs = {
  where: IGrantCategories_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_GrantCategoriesBridgeArgs = {
  where: IGrantCategoriesBridge_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_GrantCategoriesBridge_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_GrantCategories_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_GrantCyclesArgs = {
  where: IGrantCycles_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_GrantCycles_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_GrantOwnersArgs = {
  where: IGrantOwners_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_GrantOwnersTiersArgs = {
  where: IGrantOwnersTiers_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_GrantOwnersTiers_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_GrantOwners_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_GrantSubmissionReviewArgs = {
  where: IGrantSubmissionReview_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_GrantSubmissionReview_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_GrantSubmissionsArgs = {
  where: IGrantSubmissions_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_GrantSubmissions_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_GrantTagsArgs = {
  where: IGrantTags_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_GrantTagsBridgeArgs = {
  where: IGrantTagsBridge_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_GrantTagsBridge_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_GrantTags_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_GrantsArgs = {
  where: IGrants_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_Grants_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_LikesArgs = {
  where: ILikes_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_Likes_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_ProjectArgs = {
  where: IProject_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_ProjectMembersArgs = {
  where: IProjectMembers_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_ProjectMembers_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_ProjectTagArgs = {
  where: IProjectTag_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_ProjectTag_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_ProjectTagsBridgeArgs = {
  where: IProjectTagsBridge_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_ProjectTagsBridge_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_ProjectTypeArgs = {
  where: IProjectType_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_ProjectTypeBridgeArgs = {
  where: IProjectTypeBridge_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_ProjectTypeBridge_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_ProjectType_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_Project_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_SwapsArgs = {
  where: ISwaps_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_Swaps_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_TopUpWalletArgs = {
  where: ITopUpWallet_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_TopUpWallet_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootDelete_UserArgs = {
  where: IUser_Bool_Exp
}

/** mutation root */
export type IMutation_RootDelete_User_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type IMutation_RootInsert_DonationsArgs = {
  objects: Array<IDonations_Insert_Input>
  on_conflict?: InputMaybe<IDonations_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_Donations_OneArgs = {
  object: IDonations_Insert_Input
  on_conflict?: InputMaybe<IDonations_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_FollowsArgs = {
  objects: Array<IFollows_Insert_Input>
  on_conflict?: InputMaybe<IFollows_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_Follows_OneArgs = {
  object: IFollows_Insert_Input
  on_conflict?: InputMaybe<IFollows_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_GrantCategoriesArgs = {
  objects: Array<IGrantCategories_Insert_Input>
  on_conflict?: InputMaybe<IGrantCategories_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_GrantCategoriesBridgeArgs = {
  objects: Array<IGrantCategoriesBridge_Insert_Input>
  on_conflict?: InputMaybe<IGrantCategoriesBridge_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_GrantCategoriesBridge_OneArgs = {
  object: IGrantCategoriesBridge_Insert_Input
  on_conflict?: InputMaybe<IGrantCategoriesBridge_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_GrantCategories_OneArgs = {
  object: IGrantCategories_Insert_Input
  on_conflict?: InputMaybe<IGrantCategories_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_GrantCyclesArgs = {
  objects: Array<IGrantCycles_Insert_Input>
  on_conflict?: InputMaybe<IGrantCycles_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_GrantCycles_OneArgs = {
  object: IGrantCycles_Insert_Input
  on_conflict?: InputMaybe<IGrantCycles_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_GrantOwnersArgs = {
  objects: Array<IGrantOwners_Insert_Input>
  on_conflict?: InputMaybe<IGrantOwners_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_GrantOwnersTiersArgs = {
  objects: Array<IGrantOwnersTiers_Insert_Input>
  on_conflict?: InputMaybe<IGrantOwnersTiers_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_GrantOwnersTiers_OneArgs = {
  object: IGrantOwnersTiers_Insert_Input
  on_conflict?: InputMaybe<IGrantOwnersTiers_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_GrantOwners_OneArgs = {
  object: IGrantOwners_Insert_Input
  on_conflict?: InputMaybe<IGrantOwners_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_GrantSubmissionReviewArgs = {
  objects: Array<IGrantSubmissionReview_Insert_Input>
  on_conflict?: InputMaybe<IGrantSubmissionReview_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_GrantSubmissionReview_OneArgs = {
  object: IGrantSubmissionReview_Insert_Input
  on_conflict?: InputMaybe<IGrantSubmissionReview_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_GrantSubmissionsArgs = {
  objects: Array<IGrantSubmissions_Insert_Input>
  on_conflict?: InputMaybe<IGrantSubmissions_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_GrantSubmissions_OneArgs = {
  object: IGrantSubmissions_Insert_Input
  on_conflict?: InputMaybe<IGrantSubmissions_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_GrantTagsArgs = {
  objects: Array<IGrantTags_Insert_Input>
  on_conflict?: InputMaybe<IGrantTags_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_GrantTagsBridgeArgs = {
  objects: Array<IGrantTagsBridge_Insert_Input>
  on_conflict?: InputMaybe<IGrantTagsBridge_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_GrantTagsBridge_OneArgs = {
  object: IGrantTagsBridge_Insert_Input
  on_conflict?: InputMaybe<IGrantTagsBridge_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_GrantTags_OneArgs = {
  object: IGrantTags_Insert_Input
  on_conflict?: InputMaybe<IGrantTags_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_GrantsArgs = {
  objects: Array<IGrants_Insert_Input>
  on_conflict?: InputMaybe<IGrants_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_Grants_OneArgs = {
  object: IGrants_Insert_Input
  on_conflict?: InputMaybe<IGrants_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_LikesArgs = {
  objects: Array<ILikes_Insert_Input>
  on_conflict?: InputMaybe<ILikes_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_Likes_OneArgs = {
  object: ILikes_Insert_Input
  on_conflict?: InputMaybe<ILikes_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_ProjectArgs = {
  objects: Array<IProject_Insert_Input>
  on_conflict?: InputMaybe<IProject_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_ProjectMembersArgs = {
  objects: Array<IProjectMembers_Insert_Input>
  on_conflict?: InputMaybe<IProjectMembers_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_ProjectMembers_OneArgs = {
  object: IProjectMembers_Insert_Input
  on_conflict?: InputMaybe<IProjectMembers_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_ProjectTagArgs = {
  objects: Array<IProjectTag_Insert_Input>
  on_conflict?: InputMaybe<IProjectTag_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_ProjectTag_OneArgs = {
  object: IProjectTag_Insert_Input
  on_conflict?: InputMaybe<IProjectTag_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_ProjectTagsBridgeArgs = {
  objects: Array<IProjectTagsBridge_Insert_Input>
  on_conflict?: InputMaybe<IProjectTagsBridge_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_ProjectTagsBridge_OneArgs = {
  object: IProjectTagsBridge_Insert_Input
  on_conflict?: InputMaybe<IProjectTagsBridge_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_ProjectTypeArgs = {
  objects: Array<IProjectType_Insert_Input>
  on_conflict?: InputMaybe<IProjectType_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_ProjectTypeBridgeArgs = {
  objects: Array<IProjectTypeBridge_Insert_Input>
  on_conflict?: InputMaybe<IProjectTypeBridge_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_ProjectTypeBridge_OneArgs = {
  object: IProjectTypeBridge_Insert_Input
  on_conflict?: InputMaybe<IProjectTypeBridge_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_ProjectType_OneArgs = {
  object: IProjectType_Insert_Input
  on_conflict?: InputMaybe<IProjectType_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_Project_OneArgs = {
  object: IProject_Insert_Input
  on_conflict?: InputMaybe<IProject_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_SwapsArgs = {
  objects: Array<ISwaps_Insert_Input>
  on_conflict?: InputMaybe<ISwaps_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_Swaps_OneArgs = {
  object: ISwaps_Insert_Input
  on_conflict?: InputMaybe<ISwaps_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_TopUpWalletArgs = {
  objects: Array<ITopUpWallet_Insert_Input>
  on_conflict?: InputMaybe<ITopUpWallet_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_TopUpWallet_OneArgs = {
  object: ITopUpWallet_Insert_Input
  on_conflict?: InputMaybe<ITopUpWallet_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_UserArgs = {
  objects: Array<IUser_Insert_Input>
  on_conflict?: InputMaybe<IUser_On_Conflict>
}

/** mutation root */
export type IMutation_RootInsert_User_OneArgs = {
  object: IUser_Insert_Input
  on_conflict?: InputMaybe<IUser_On_Conflict>
}

/** mutation root */
export type IMutation_RootUpdate_DonationsArgs = {
  _inc?: InputMaybe<IDonations_Inc_Input>
  _set?: InputMaybe<IDonations_Set_Input>
  where: IDonations_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_Donations_By_PkArgs = {
  _inc?: InputMaybe<IDonations_Inc_Input>
  _set?: InputMaybe<IDonations_Set_Input>
  pk_columns: IDonations_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_FollowsArgs = {
  _set?: InputMaybe<IFollows_Set_Input>
  where: IFollows_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_Follows_By_PkArgs = {
  _set?: InputMaybe<IFollows_Set_Input>
  pk_columns: IFollows_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_GrantCategoriesArgs = {
  _set?: InputMaybe<IGrantCategories_Set_Input>
  where: IGrantCategories_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_GrantCategoriesBridgeArgs = {
  _set?: InputMaybe<IGrantCategoriesBridge_Set_Input>
  where: IGrantCategoriesBridge_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_GrantCategoriesBridge_By_PkArgs = {
  _set?: InputMaybe<IGrantCategoriesBridge_Set_Input>
  pk_columns: IGrantCategoriesBridge_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_GrantCategories_By_PkArgs = {
  _set?: InputMaybe<IGrantCategories_Set_Input>
  pk_columns: IGrantCategories_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_GrantCyclesArgs = {
  _inc?: InputMaybe<IGrantCycles_Inc_Input>
  _set?: InputMaybe<IGrantCycles_Set_Input>
  where: IGrantCycles_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_GrantCycles_By_PkArgs = {
  _inc?: InputMaybe<IGrantCycles_Inc_Input>
  _set?: InputMaybe<IGrantCycles_Set_Input>
  pk_columns: IGrantCycles_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_GrantOwnersArgs = {
  _inc?: InputMaybe<IGrantOwners_Inc_Input>
  _set?: InputMaybe<IGrantOwners_Set_Input>
  where: IGrantOwners_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_GrantOwnersTiersArgs = {
  _inc?: InputMaybe<IGrantOwnersTiers_Inc_Input>
  _set?: InputMaybe<IGrantOwnersTiers_Set_Input>
  where: IGrantOwnersTiers_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_GrantOwnersTiers_By_PkArgs = {
  _inc?: InputMaybe<IGrantOwnersTiers_Inc_Input>
  _set?: InputMaybe<IGrantOwnersTiers_Set_Input>
  pk_columns: IGrantOwnersTiers_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_GrantOwners_By_PkArgs = {
  _inc?: InputMaybe<IGrantOwners_Inc_Input>
  _set?: InputMaybe<IGrantOwners_Set_Input>
  pk_columns: IGrantOwners_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_GrantSubmissionReviewArgs = {
  _inc?: InputMaybe<IGrantSubmissionReview_Inc_Input>
  _set?: InputMaybe<IGrantSubmissionReview_Set_Input>
  where: IGrantSubmissionReview_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_GrantSubmissionReview_By_PkArgs = {
  _inc?: InputMaybe<IGrantSubmissionReview_Inc_Input>
  _set?: InputMaybe<IGrantSubmissionReview_Set_Input>
  pk_columns: IGrantSubmissionReview_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_GrantSubmissionsArgs = {
  _inc?: InputMaybe<IGrantSubmissions_Inc_Input>
  _set?: InputMaybe<IGrantSubmissions_Set_Input>
  where: IGrantSubmissions_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_GrantSubmissions_By_PkArgs = {
  _inc?: InputMaybe<IGrantSubmissions_Inc_Input>
  _set?: InputMaybe<IGrantSubmissions_Set_Input>
  pk_columns: IGrantSubmissions_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_GrantTagsArgs = {
  _set?: InputMaybe<IGrantTags_Set_Input>
  where: IGrantTags_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_GrantTagsBridgeArgs = {
  _set?: InputMaybe<IGrantTagsBridge_Set_Input>
  where: IGrantTagsBridge_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_GrantTagsBridge_By_PkArgs = {
  _set?: InputMaybe<IGrantTagsBridge_Set_Input>
  pk_columns: IGrantTagsBridge_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_GrantTags_By_PkArgs = {
  _set?: InputMaybe<IGrantTags_Set_Input>
  pk_columns: IGrantTags_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_GrantsArgs = {
  _inc?: InputMaybe<IGrants_Inc_Input>
  _set?: InputMaybe<IGrants_Set_Input>
  where: IGrants_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_Grants_By_PkArgs = {
  _inc?: InputMaybe<IGrants_Inc_Input>
  _set?: InputMaybe<IGrants_Set_Input>
  pk_columns: IGrants_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_LikesArgs = {
  _set?: InputMaybe<ILikes_Set_Input>
  where: ILikes_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_Likes_By_PkArgs = {
  _set?: InputMaybe<ILikes_Set_Input>
  pk_columns: ILikes_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_ProjectArgs = {
  _inc?: InputMaybe<IProject_Inc_Input>
  _set?: InputMaybe<IProject_Set_Input>
  where: IProject_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_ProjectMembersArgs = {
  _set?: InputMaybe<IProjectMembers_Set_Input>
  where: IProjectMembers_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_ProjectMembers_By_PkArgs = {
  _set?: InputMaybe<IProjectMembers_Set_Input>
  pk_columns: IProjectMembers_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_ProjectTagArgs = {
  _set?: InputMaybe<IProjectTag_Set_Input>
  where: IProjectTag_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_ProjectTag_By_PkArgs = {
  _set?: InputMaybe<IProjectTag_Set_Input>
  pk_columns: IProjectTag_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_ProjectTagsBridgeArgs = {
  _set?: InputMaybe<IProjectTagsBridge_Set_Input>
  where: IProjectTagsBridge_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_ProjectTagsBridge_By_PkArgs = {
  _set?: InputMaybe<IProjectTagsBridge_Set_Input>
  pk_columns: IProjectTagsBridge_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_ProjectTypeArgs = {
  _set?: InputMaybe<IProjectType_Set_Input>
  where: IProjectType_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_ProjectTypeBridgeArgs = {
  _set?: InputMaybe<IProjectTypeBridge_Set_Input>
  where: IProjectTypeBridge_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_ProjectTypeBridge_By_PkArgs = {
  _set?: InputMaybe<IProjectTypeBridge_Set_Input>
  pk_columns: IProjectTypeBridge_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_ProjectType_By_PkArgs = {
  _set?: InputMaybe<IProjectType_Set_Input>
  pk_columns: IProjectType_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_Project_By_PkArgs = {
  _inc?: InputMaybe<IProject_Inc_Input>
  _set?: InputMaybe<IProject_Set_Input>
  pk_columns: IProject_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_SwapsArgs = {
  _inc?: InputMaybe<ISwaps_Inc_Input>
  _set?: InputMaybe<ISwaps_Set_Input>
  where: ISwaps_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_Swaps_By_PkArgs = {
  _inc?: InputMaybe<ISwaps_Inc_Input>
  _set?: InputMaybe<ISwaps_Set_Input>
  pk_columns: ISwaps_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_TopUpWalletArgs = {
  _inc?: InputMaybe<ITopUpWallet_Inc_Input>
  _set?: InputMaybe<ITopUpWallet_Set_Input>
  where: ITopUpWallet_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_TopUpWallet_By_PkArgs = {
  _inc?: InputMaybe<ITopUpWallet_Inc_Input>
  _set?: InputMaybe<ITopUpWallet_Set_Input>
  pk_columns: ITopUpWallet_Pk_Columns_Input
}

/** mutation root */
export type IMutation_RootUpdate_UserArgs = {
  _set?: InputMaybe<IUser_Set_Input>
  where: IUser_Bool_Exp
}

/** mutation root */
export type IMutation_RootUpdate_User_By_PkArgs = {
  _set?: InputMaybe<IUser_Set_Input>
  pk_columns: IUser_Pk_Columns_Input
}

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type INumeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>
  _gt?: InputMaybe<Scalars['numeric']>
  _gte?: InputMaybe<Scalars['numeric']>
  _in?: InputMaybe<Array<Scalars['numeric']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['numeric']>
  _lte?: InputMaybe<Scalars['numeric']>
  _neq?: InputMaybe<Scalars['numeric']>
  _nin?: InputMaybe<Array<Scalars['numeric']>>
}

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  asc = 'asc',
  /** in ascending order, nulls first */
  asc_nulls_first = 'asc_nulls_first',
  /** in ascending order, nulls last */
  asc_nulls_last = 'asc_nulls_last',
  /** in descending order, nulls first */
  desc = 'desc',
  /** in descending order, nulls first */
  desc_nulls_first = 'desc_nulls_first',
  /** in descending order, nulls last */
  desc_nulls_last = 'desc_nulls_last',
}

export type IQuery_Root = {
  __typename?: 'query_root'
  /** fetch data from the table: "Donations" */
  Donations: Array<FieldWrapper<IDonations>>
  /** fetch aggregated fields from the table: "Donations" */
  Donations_aggregate: FieldWrapper<IDonations_Aggregate>
  /** fetch data from the table: "Donations" using primary key columns */
  Donations_by_pk?: Maybe<FieldWrapper<IDonations>>
  /** fetch data from the table: "Follows" */
  Follows: Array<FieldWrapper<IFollows>>
  /** fetch aggregated fields from the table: "Follows" */
  Follows_aggregate: FieldWrapper<IFollows_Aggregate>
  /** fetch data from the table: "Follows" using primary key columns */
  Follows_by_pk?: Maybe<FieldWrapper<IFollows>>
  /** fetch data from the table: "GrantCategories" */
  GrantCategories: Array<FieldWrapper<IGrantCategories>>
  /** fetch data from the table: "GrantCategoriesBridge" */
  GrantCategoriesBridge: Array<FieldWrapper<IGrantCategoriesBridge>>
  /** fetch aggregated fields from the table: "GrantCategoriesBridge" */
  GrantCategoriesBridge_aggregate: FieldWrapper<IGrantCategoriesBridge_Aggregate>
  /** fetch data from the table: "GrantCategoriesBridge" using primary key columns */
  GrantCategoriesBridge_by_pk?: Maybe<FieldWrapper<IGrantCategoriesBridge>>
  /** fetch aggregated fields from the table: "GrantCategories" */
  GrantCategories_aggregate: FieldWrapper<IGrantCategories_Aggregate>
  /** fetch data from the table: "GrantCategories" using primary key columns */
  GrantCategories_by_pk?: Maybe<FieldWrapper<IGrantCategories>>
  /** fetch data from the table: "GrantCycles" */
  GrantCycles: Array<FieldWrapper<IGrantCycles>>
  /** fetch aggregated fields from the table: "GrantCycles" */
  GrantCycles_aggregate: FieldWrapper<IGrantCycles_Aggregate>
  /** fetch data from the table: "GrantCycles" using primary key columns */
  GrantCycles_by_pk?: Maybe<FieldWrapper<IGrantCycles>>
  /** An array relationship */
  GrantOwners: Array<FieldWrapper<IGrantOwners>>
  /** fetch data from the table: "GrantOwnersTiers" */
  GrantOwnersTiers: Array<FieldWrapper<IGrantOwnersTiers>>
  /** fetch aggregated fields from the table: "GrantOwnersTiers" */
  GrantOwnersTiers_aggregate: FieldWrapper<IGrantOwnersTiers_Aggregate>
  /** fetch data from the table: "GrantOwnersTiers" using primary key columns */
  GrantOwnersTiers_by_pk?: Maybe<FieldWrapper<IGrantOwnersTiers>>
  /** An aggregate relationship */
  GrantOwners_aggregate: FieldWrapper<IGrantOwners_Aggregate>
  /** fetch data from the table: "GrantOwners" using primary key columns */
  GrantOwners_by_pk?: Maybe<FieldWrapper<IGrantOwners>>
  /** fetch data from the table: "GrantSubmissionReview" */
  GrantSubmissionReview: Array<FieldWrapper<IGrantSubmissionReview>>
  /** fetch aggregated fields from the table: "GrantSubmissionReview" */
  GrantSubmissionReview_aggregate: FieldWrapper<IGrantSubmissionReview_Aggregate>
  /** fetch data from the table: "GrantSubmissionReview" using primary key columns */
  GrantSubmissionReview_by_pk?: Maybe<FieldWrapper<IGrantSubmissionReview>>
  /** fetch data from the table: "GrantSubmissions" */
  GrantSubmissions: Array<FieldWrapper<IGrantSubmissions>>
  /** fetch aggregated fields from the table: "GrantSubmissions" */
  GrantSubmissions_aggregate: FieldWrapper<IGrantSubmissions_Aggregate>
  /** fetch data from the table: "GrantSubmissions" using primary key columns */
  GrantSubmissions_by_pk?: Maybe<FieldWrapper<IGrantSubmissions>>
  /** fetch data from the table: "GrantTags" */
  GrantTags: Array<FieldWrapper<IGrantTags>>
  /** fetch data from the table: "GrantTagsBridge" */
  GrantTagsBridge: Array<FieldWrapper<IGrantTagsBridge>>
  /** fetch aggregated fields from the table: "GrantTagsBridge" */
  GrantTagsBridge_aggregate: FieldWrapper<IGrantTagsBridge_Aggregate>
  /** fetch data from the table: "GrantTagsBridge" using primary key columns */
  GrantTagsBridge_by_pk?: Maybe<FieldWrapper<IGrantTagsBridge>>
  /** fetch aggregated fields from the table: "GrantTags" */
  GrantTags_aggregate: FieldWrapper<IGrantTags_Aggregate>
  /** fetch data from the table: "GrantTags" using primary key columns */
  GrantTags_by_pk?: Maybe<FieldWrapper<IGrantTags>>
  /** fetch data from the table: "Grants" */
  Grants: Array<FieldWrapper<IGrants>>
  /** fetch aggregated fields from the table: "Grants" */
  Grants_aggregate: FieldWrapper<IGrants_Aggregate>
  /** fetch data from the table: "Grants" using primary key columns */
  Grants_by_pk?: Maybe<FieldWrapper<IGrants>>
  /** An array relationship */
  Likes: Array<FieldWrapper<ILikes>>
  /** An aggregate relationship */
  Likes_aggregate: FieldWrapper<ILikes_Aggregate>
  /** fetch data from the table: "Likes" using primary key columns */
  Likes_by_pk?: Maybe<FieldWrapper<ILikes>>
  /** fetch data from the table: "Project" */
  Project: Array<FieldWrapper<IProject>>
  /** An array relationship */
  ProjectMembers: Array<FieldWrapper<IProjectMembers>>
  /** An aggregate relationship */
  ProjectMembers_aggregate: FieldWrapper<IProjectMembers_Aggregate>
  /** fetch data from the table: "ProjectMembers" using primary key columns */
  ProjectMembers_by_pk?: Maybe<FieldWrapper<IProjectMembers>>
  /** fetch data from the table: "ProjectTag" */
  ProjectTag: Array<FieldWrapper<IProjectTag>>
  /** fetch aggregated fields from the table: "ProjectTag" */
  ProjectTag_aggregate: FieldWrapper<IProjectTag_Aggregate>
  /** fetch data from the table: "ProjectTag" using primary key columns */
  ProjectTag_by_pk?: Maybe<FieldWrapper<IProjectTag>>
  /** fetch data from the table: "ProjectTagsBridge" */
  ProjectTagsBridge: Array<FieldWrapper<IProjectTagsBridge>>
  /** fetch aggregated fields from the table: "ProjectTagsBridge" */
  ProjectTagsBridge_aggregate: FieldWrapper<IProjectTagsBridge_Aggregate>
  /** fetch data from the table: "ProjectTagsBridge" using primary key columns */
  ProjectTagsBridge_by_pk?: Maybe<FieldWrapper<IProjectTagsBridge>>
  /** fetch data from the table: "ProjectType" */
  ProjectType: Array<FieldWrapper<IProjectType>>
  /** fetch data from the table: "ProjectTypeBridge" */
  ProjectTypeBridge: Array<FieldWrapper<IProjectTypeBridge>>
  /** fetch aggregated fields from the table: "ProjectTypeBridge" */
  ProjectTypeBridge_aggregate: FieldWrapper<IProjectTypeBridge_Aggregate>
  /** fetch data from the table: "ProjectTypeBridge" using primary key columns */
  ProjectTypeBridge_by_pk?: Maybe<FieldWrapper<IProjectTypeBridge>>
  /** fetch aggregated fields from the table: "ProjectType" */
  ProjectType_aggregate: FieldWrapper<IProjectType_Aggregate>
  /** fetch data from the table: "ProjectType" using primary key columns */
  ProjectType_by_pk?: Maybe<FieldWrapper<IProjectType>>
  /** fetch aggregated fields from the table: "Project" */
  Project_aggregate: FieldWrapper<IProject_Aggregate>
  /** fetch data from the table: "Project" using primary key columns */
  Project_by_pk?: Maybe<FieldWrapper<IProject>>
  /** fetch data from the table: "Swaps" */
  Swaps: Array<FieldWrapper<ISwaps>>
  /** fetch aggregated fields from the table: "Swaps" */
  Swaps_aggregate: FieldWrapper<ISwaps_Aggregate>
  /** fetch data from the table: "Swaps" using primary key columns */
  Swaps_by_pk?: Maybe<FieldWrapper<ISwaps>>
  /** fetch data from the table: "TopUpWallet" */
  TopUpWallet: Array<FieldWrapper<ITopUpWallet>>
  /** fetch aggregated fields from the table: "TopUpWallet" */
  TopUpWallet_aggregate: FieldWrapper<ITopUpWallet_Aggregate>
  /** fetch data from the table: "TopUpWallet" using primary key columns */
  TopUpWallet_by_pk?: Maybe<FieldWrapper<ITopUpWallet>>
  /** fetch data from the table: "User" */
  User: Array<FieldWrapper<IUser>>
  /** fetch aggregated fields from the table: "User" */
  User_aggregate: FieldWrapper<IUser_Aggregate>
  /** fetch data from the table: "User" using primary key columns */
  User_by_pk?: Maybe<FieldWrapper<IUser>>
  /** Access to subgraph metadata */
  _meta?: Maybe<FieldWrapper<I_Meta_>>
  exampleEntities: Array<FieldWrapper<IExampleEntity>>
  exampleEntity?: Maybe<FieldWrapper<IExampleEntity>>
}

export type IQuery_RootDonationsArgs = {
  distinct_on?: InputMaybe<Array<Donations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IDonations_Order_By>>
  where?: InputMaybe<IDonations_Bool_Exp>
}

export type IQuery_RootDonations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Donations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IDonations_Order_By>>
  where?: InputMaybe<IDonations_Bool_Exp>
}

export type IQuery_RootDonations_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootFollowsArgs = {
  distinct_on?: InputMaybe<Array<Follows_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IFollows_Order_By>>
  where?: InputMaybe<IFollows_Bool_Exp>
}

export type IQuery_RootFollows_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Follows_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IFollows_Order_By>>
  where?: InputMaybe<IFollows_Bool_Exp>
}

export type IQuery_RootFollows_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootGrantCategoriesArgs = {
  distinct_on?: InputMaybe<Array<GrantCategories_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantCategories_Order_By>>
  where?: InputMaybe<IGrantCategories_Bool_Exp>
}

export type IQuery_RootGrantCategoriesBridgeArgs = {
  distinct_on?: InputMaybe<Array<GrantCategoriesBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantCategoriesBridge_Order_By>>
  where?: InputMaybe<IGrantCategoriesBridge_Bool_Exp>
}

export type IQuery_RootGrantCategoriesBridge_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantCategoriesBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantCategoriesBridge_Order_By>>
  where?: InputMaybe<IGrantCategoriesBridge_Bool_Exp>
}

export type IQuery_RootGrantCategoriesBridge_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootGrantCategories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantCategories_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantCategories_Order_By>>
  where?: InputMaybe<IGrantCategories_Bool_Exp>
}

export type IQuery_RootGrantCategories_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootGrantCyclesArgs = {
  distinct_on?: InputMaybe<Array<GrantCycles_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantCycles_Order_By>>
  where?: InputMaybe<IGrantCycles_Bool_Exp>
}

export type IQuery_RootGrantCycles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantCycles_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantCycles_Order_By>>
  where?: InputMaybe<IGrantCycles_Bool_Exp>
}

export type IQuery_RootGrantCycles_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootGrantOwnersArgs = {
  distinct_on?: InputMaybe<Array<GrantOwners_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantOwners_Order_By>>
  where?: InputMaybe<IGrantOwners_Bool_Exp>
}

export type IQuery_RootGrantOwnersTiersArgs = {
  distinct_on?: InputMaybe<Array<GrantOwnersTiers_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantOwnersTiers_Order_By>>
  where?: InputMaybe<IGrantOwnersTiers_Bool_Exp>
}

export type IQuery_RootGrantOwnersTiers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantOwnersTiers_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantOwnersTiers_Order_By>>
  where?: InputMaybe<IGrantOwnersTiers_Bool_Exp>
}

export type IQuery_RootGrantOwnersTiers_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootGrantOwners_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantOwners_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantOwners_Order_By>>
  where?: InputMaybe<IGrantOwners_Bool_Exp>
}

export type IQuery_RootGrantOwners_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootGrantSubmissionReviewArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissionReview_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantSubmissionReview_Order_By>>
  where?: InputMaybe<IGrantSubmissionReview_Bool_Exp>
}

export type IQuery_RootGrantSubmissionReview_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissionReview_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantSubmissionReview_Order_By>>
  where?: InputMaybe<IGrantSubmissionReview_Bool_Exp>
}

export type IQuery_RootGrantSubmissionReview_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootGrantSubmissionsArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantSubmissions_Order_By>>
  where?: InputMaybe<IGrantSubmissions_Bool_Exp>
}

export type IQuery_RootGrantSubmissions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantSubmissions_Order_By>>
  where?: InputMaybe<IGrantSubmissions_Bool_Exp>
}

export type IQuery_RootGrantSubmissions_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootGrantTagsArgs = {
  distinct_on?: InputMaybe<Array<GrantTags_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantTags_Order_By>>
  where?: InputMaybe<IGrantTags_Bool_Exp>
}

export type IQuery_RootGrantTagsBridgeArgs = {
  distinct_on?: InputMaybe<Array<GrantTagsBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantTagsBridge_Order_By>>
  where?: InputMaybe<IGrantTagsBridge_Bool_Exp>
}

export type IQuery_RootGrantTagsBridge_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantTagsBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantTagsBridge_Order_By>>
  where?: InputMaybe<IGrantTagsBridge_Bool_Exp>
}

export type IQuery_RootGrantTagsBridge_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootGrantTags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantTags_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantTags_Order_By>>
  where?: InputMaybe<IGrantTags_Bool_Exp>
}

export type IQuery_RootGrantTags_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootGrantsArgs = {
  distinct_on?: InputMaybe<Array<Grants_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrants_Order_By>>
  where?: InputMaybe<IGrants_Bool_Exp>
}

export type IQuery_RootGrants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Grants_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrants_Order_By>>
  where?: InputMaybe<IGrants_Bool_Exp>
}

export type IQuery_RootGrants_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootLikesArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ILikes_Order_By>>
  where?: InputMaybe<ILikes_Bool_Exp>
}

export type IQuery_RootLikes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ILikes_Order_By>>
  where?: InputMaybe<ILikes_Bool_Exp>
}

export type IQuery_RootLikes_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootProjectArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProject_Order_By>>
  where?: InputMaybe<IProject_Bool_Exp>
}

export type IQuery_RootProjectMembersArgs = {
  distinct_on?: InputMaybe<Array<ProjectMembers_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectMembers_Order_By>>
  where?: InputMaybe<IProjectMembers_Bool_Exp>
}

export type IQuery_RootProjectMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectMembers_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectMembers_Order_By>>
  where?: InputMaybe<IProjectMembers_Bool_Exp>
}

export type IQuery_RootProjectMembers_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootProjectTagArgs = {
  distinct_on?: InputMaybe<Array<ProjectTag_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectTag_Order_By>>
  where?: InputMaybe<IProjectTag_Bool_Exp>
}

export type IQuery_RootProjectTag_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectTag_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectTag_Order_By>>
  where?: InputMaybe<IProjectTag_Bool_Exp>
}

export type IQuery_RootProjectTag_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootProjectTagsBridgeArgs = {
  distinct_on?: InputMaybe<Array<ProjectTagsBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectTagsBridge_Order_By>>
  where?: InputMaybe<IProjectTagsBridge_Bool_Exp>
}

export type IQuery_RootProjectTagsBridge_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectTagsBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectTagsBridge_Order_By>>
  where?: InputMaybe<IProjectTagsBridge_Bool_Exp>
}

export type IQuery_RootProjectTagsBridge_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootProjectTypeArgs = {
  distinct_on?: InputMaybe<Array<ProjectType_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectType_Order_By>>
  where?: InputMaybe<IProjectType_Bool_Exp>
}

export type IQuery_RootProjectTypeBridgeArgs = {
  distinct_on?: InputMaybe<Array<ProjectTypeBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectTypeBridge_Order_By>>
  where?: InputMaybe<IProjectTypeBridge_Bool_Exp>
}

export type IQuery_RootProjectTypeBridge_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectTypeBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectTypeBridge_Order_By>>
  where?: InputMaybe<IProjectTypeBridge_Bool_Exp>
}

export type IQuery_RootProjectTypeBridge_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootProjectType_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectType_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectType_Order_By>>
  where?: InputMaybe<IProjectType_Bool_Exp>
}

export type IQuery_RootProjectType_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootProject_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProject_Order_By>>
  where?: InputMaybe<IProject_Bool_Exp>
}

export type IQuery_RootProject_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootSwapsArgs = {
  distinct_on?: InputMaybe<Array<Swaps_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ISwaps_Order_By>>
  where?: InputMaybe<ISwaps_Bool_Exp>
}

export type IQuery_RootSwaps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Swaps_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ISwaps_Order_By>>
  where?: InputMaybe<ISwaps_Bool_Exp>
}

export type IQuery_RootSwaps_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootTopUpWalletArgs = {
  distinct_on?: InputMaybe<Array<TopUpWallet_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ITopUpWallet_Order_By>>
  where?: InputMaybe<ITopUpWallet_Bool_Exp>
}

export type IQuery_RootTopUpWallet_AggregateArgs = {
  distinct_on?: InputMaybe<Array<TopUpWallet_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ITopUpWallet_Order_By>>
  where?: InputMaybe<ITopUpWallet_Bool_Exp>
}

export type IQuery_RootTopUpWallet_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IUser_Order_By>>
  where?: InputMaybe<IUser_Bool_Exp>
}

export type IQuery_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IUser_Order_By>>
  where?: InputMaybe<IUser_Bool_Exp>
}

export type IQuery_RootUser_By_PkArgs = {
  id: Scalars['uuid']
}

export type IQuery_Root_MetaArgs = {
  block?: InputMaybe<IBlock_Height>
}

export type IQuery_RootExampleEntitiesArgs = {
  block?: InputMaybe<IBlock_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ExampleEntity_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<IExampleEntity_Filter>
}

export type IQuery_RootExampleEntityArgs = {
  block?: InputMaybe<IBlock_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type ISubscription_Root = {
  __typename?: 'subscription_root'
  /** fetch data from the table: "Donations" */
  Donations: Array<FieldWrapper<IDonations>>
  /** fetch aggregated fields from the table: "Donations" */
  Donations_aggregate: FieldWrapper<IDonations_Aggregate>
  /** fetch data from the table: "Donations" using primary key columns */
  Donations_by_pk?: Maybe<FieldWrapper<IDonations>>
  /** fetch data from the table: "Follows" */
  Follows: Array<FieldWrapper<IFollows>>
  /** fetch aggregated fields from the table: "Follows" */
  Follows_aggregate: FieldWrapper<IFollows_Aggregate>
  /** fetch data from the table: "Follows" using primary key columns */
  Follows_by_pk?: Maybe<FieldWrapper<IFollows>>
  /** fetch data from the table: "GrantCategories" */
  GrantCategories: Array<FieldWrapper<IGrantCategories>>
  /** fetch data from the table: "GrantCategoriesBridge" */
  GrantCategoriesBridge: Array<FieldWrapper<IGrantCategoriesBridge>>
  /** fetch aggregated fields from the table: "GrantCategoriesBridge" */
  GrantCategoriesBridge_aggregate: FieldWrapper<IGrantCategoriesBridge_Aggregate>
  /** fetch data from the table: "GrantCategoriesBridge" using primary key columns */
  GrantCategoriesBridge_by_pk?: Maybe<FieldWrapper<IGrantCategoriesBridge>>
  /** fetch aggregated fields from the table: "GrantCategories" */
  GrantCategories_aggregate: FieldWrapper<IGrantCategories_Aggregate>
  /** fetch data from the table: "GrantCategories" using primary key columns */
  GrantCategories_by_pk?: Maybe<FieldWrapper<IGrantCategories>>
  /** fetch data from the table: "GrantCycles" */
  GrantCycles: Array<FieldWrapper<IGrantCycles>>
  /** fetch aggregated fields from the table: "GrantCycles" */
  GrantCycles_aggregate: FieldWrapper<IGrantCycles_Aggregate>
  /** fetch data from the table: "GrantCycles" using primary key columns */
  GrantCycles_by_pk?: Maybe<FieldWrapper<IGrantCycles>>
  /** An array relationship */
  GrantOwners: Array<FieldWrapper<IGrantOwners>>
  /** fetch data from the table: "GrantOwnersTiers" */
  GrantOwnersTiers: Array<FieldWrapper<IGrantOwnersTiers>>
  /** fetch aggregated fields from the table: "GrantOwnersTiers" */
  GrantOwnersTiers_aggregate: FieldWrapper<IGrantOwnersTiers_Aggregate>
  /** fetch data from the table: "GrantOwnersTiers" using primary key columns */
  GrantOwnersTiers_by_pk?: Maybe<FieldWrapper<IGrantOwnersTiers>>
  /** An aggregate relationship */
  GrantOwners_aggregate: FieldWrapper<IGrantOwners_Aggregate>
  /** fetch data from the table: "GrantOwners" using primary key columns */
  GrantOwners_by_pk?: Maybe<FieldWrapper<IGrantOwners>>
  /** fetch data from the table: "GrantSubmissionReview" */
  GrantSubmissionReview: Array<FieldWrapper<IGrantSubmissionReview>>
  /** fetch aggregated fields from the table: "GrantSubmissionReview" */
  GrantSubmissionReview_aggregate: FieldWrapper<IGrantSubmissionReview_Aggregate>
  /** fetch data from the table: "GrantSubmissionReview" using primary key columns */
  GrantSubmissionReview_by_pk?: Maybe<FieldWrapper<IGrantSubmissionReview>>
  /** fetch data from the table: "GrantSubmissions" */
  GrantSubmissions: Array<FieldWrapper<IGrantSubmissions>>
  /** fetch aggregated fields from the table: "GrantSubmissions" */
  GrantSubmissions_aggregate: FieldWrapper<IGrantSubmissions_Aggregate>
  /** fetch data from the table: "GrantSubmissions" using primary key columns */
  GrantSubmissions_by_pk?: Maybe<FieldWrapper<IGrantSubmissions>>
  /** fetch data from the table: "GrantTags" */
  GrantTags: Array<FieldWrapper<IGrantTags>>
  /** fetch data from the table: "GrantTagsBridge" */
  GrantTagsBridge: Array<FieldWrapper<IGrantTagsBridge>>
  /** fetch aggregated fields from the table: "GrantTagsBridge" */
  GrantTagsBridge_aggregate: FieldWrapper<IGrantTagsBridge_Aggregate>
  /** fetch data from the table: "GrantTagsBridge" using primary key columns */
  GrantTagsBridge_by_pk?: Maybe<FieldWrapper<IGrantTagsBridge>>
  /** fetch aggregated fields from the table: "GrantTags" */
  GrantTags_aggregate: FieldWrapper<IGrantTags_Aggregate>
  /** fetch data from the table: "GrantTags" using primary key columns */
  GrantTags_by_pk?: Maybe<FieldWrapper<IGrantTags>>
  /** fetch data from the table: "Grants" */
  Grants: Array<FieldWrapper<IGrants>>
  /** fetch aggregated fields from the table: "Grants" */
  Grants_aggregate: FieldWrapper<IGrants_Aggregate>
  /** fetch data from the table: "Grants" using primary key columns */
  Grants_by_pk?: Maybe<FieldWrapper<IGrants>>
  /** An array relationship */
  Likes: Array<FieldWrapper<ILikes>>
  /** An aggregate relationship */
  Likes_aggregate: FieldWrapper<ILikes_Aggregate>
  /** fetch data from the table: "Likes" using primary key columns */
  Likes_by_pk?: Maybe<FieldWrapper<ILikes>>
  /** fetch data from the table: "Project" */
  Project: Array<FieldWrapper<IProject>>
  /** An array relationship */
  ProjectMembers: Array<FieldWrapper<IProjectMembers>>
  /** An aggregate relationship */
  ProjectMembers_aggregate: FieldWrapper<IProjectMembers_Aggregate>
  /** fetch data from the table: "ProjectMembers" using primary key columns */
  ProjectMembers_by_pk?: Maybe<FieldWrapper<IProjectMembers>>
  /** fetch data from the table: "ProjectTag" */
  ProjectTag: Array<FieldWrapper<IProjectTag>>
  /** fetch aggregated fields from the table: "ProjectTag" */
  ProjectTag_aggregate: FieldWrapper<IProjectTag_Aggregate>
  /** fetch data from the table: "ProjectTag" using primary key columns */
  ProjectTag_by_pk?: Maybe<FieldWrapper<IProjectTag>>
  /** fetch data from the table: "ProjectTagsBridge" */
  ProjectTagsBridge: Array<FieldWrapper<IProjectTagsBridge>>
  /** fetch aggregated fields from the table: "ProjectTagsBridge" */
  ProjectTagsBridge_aggregate: FieldWrapper<IProjectTagsBridge_Aggregate>
  /** fetch data from the table: "ProjectTagsBridge" using primary key columns */
  ProjectTagsBridge_by_pk?: Maybe<FieldWrapper<IProjectTagsBridge>>
  /** fetch data from the table: "ProjectType" */
  ProjectType: Array<FieldWrapper<IProjectType>>
  /** fetch data from the table: "ProjectTypeBridge" */
  ProjectTypeBridge: Array<FieldWrapper<IProjectTypeBridge>>
  /** fetch aggregated fields from the table: "ProjectTypeBridge" */
  ProjectTypeBridge_aggregate: FieldWrapper<IProjectTypeBridge_Aggregate>
  /** fetch data from the table: "ProjectTypeBridge" using primary key columns */
  ProjectTypeBridge_by_pk?: Maybe<FieldWrapper<IProjectTypeBridge>>
  /** fetch aggregated fields from the table: "ProjectType" */
  ProjectType_aggregate: FieldWrapper<IProjectType_Aggregate>
  /** fetch data from the table: "ProjectType" using primary key columns */
  ProjectType_by_pk?: Maybe<FieldWrapper<IProjectType>>
  /** fetch aggregated fields from the table: "Project" */
  Project_aggregate: FieldWrapper<IProject_Aggregate>
  /** fetch data from the table: "Project" using primary key columns */
  Project_by_pk?: Maybe<FieldWrapper<IProject>>
  /** fetch data from the table: "Swaps" */
  Swaps: Array<FieldWrapper<ISwaps>>
  /** fetch aggregated fields from the table: "Swaps" */
  Swaps_aggregate: FieldWrapper<ISwaps_Aggregate>
  /** fetch data from the table: "Swaps" using primary key columns */
  Swaps_by_pk?: Maybe<FieldWrapper<ISwaps>>
  /** fetch data from the table: "TopUpWallet" */
  TopUpWallet: Array<FieldWrapper<ITopUpWallet>>
  /** fetch aggregated fields from the table: "TopUpWallet" */
  TopUpWallet_aggregate: FieldWrapper<ITopUpWallet_Aggregate>
  /** fetch data from the table: "TopUpWallet" using primary key columns */
  TopUpWallet_by_pk?: Maybe<FieldWrapper<ITopUpWallet>>
  /** fetch data from the table: "User" */
  User: Array<FieldWrapper<IUser>>
  /** fetch aggregated fields from the table: "User" */
  User_aggregate: FieldWrapper<IUser_Aggregate>
  /** fetch data from the table: "User" using primary key columns */
  User_by_pk?: Maybe<FieldWrapper<IUser>>
  /** Access to subgraph metadata */
  _meta?: Maybe<FieldWrapper<I_Meta_>>
  exampleEntities: Array<FieldWrapper<IExampleEntity>>
  exampleEntity?: Maybe<FieldWrapper<IExampleEntity>>
}

export type ISubscription_RootDonationsArgs = {
  distinct_on?: InputMaybe<Array<Donations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IDonations_Order_By>>
  where?: InputMaybe<IDonations_Bool_Exp>
}

export type ISubscription_RootDonations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Donations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IDonations_Order_By>>
  where?: InputMaybe<IDonations_Bool_Exp>
}

export type ISubscription_RootDonations_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootFollowsArgs = {
  distinct_on?: InputMaybe<Array<Follows_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IFollows_Order_By>>
  where?: InputMaybe<IFollows_Bool_Exp>
}

export type ISubscription_RootFollows_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Follows_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IFollows_Order_By>>
  where?: InputMaybe<IFollows_Bool_Exp>
}

export type ISubscription_RootFollows_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootGrantCategoriesArgs = {
  distinct_on?: InputMaybe<Array<GrantCategories_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantCategories_Order_By>>
  where?: InputMaybe<IGrantCategories_Bool_Exp>
}

export type ISubscription_RootGrantCategoriesBridgeArgs = {
  distinct_on?: InputMaybe<Array<GrantCategoriesBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantCategoriesBridge_Order_By>>
  where?: InputMaybe<IGrantCategoriesBridge_Bool_Exp>
}

export type ISubscription_RootGrantCategoriesBridge_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantCategoriesBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantCategoriesBridge_Order_By>>
  where?: InputMaybe<IGrantCategoriesBridge_Bool_Exp>
}

export type ISubscription_RootGrantCategoriesBridge_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootGrantCategories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantCategories_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantCategories_Order_By>>
  where?: InputMaybe<IGrantCategories_Bool_Exp>
}

export type ISubscription_RootGrantCategories_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootGrantCyclesArgs = {
  distinct_on?: InputMaybe<Array<GrantCycles_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantCycles_Order_By>>
  where?: InputMaybe<IGrantCycles_Bool_Exp>
}

export type ISubscription_RootGrantCycles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantCycles_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantCycles_Order_By>>
  where?: InputMaybe<IGrantCycles_Bool_Exp>
}

export type ISubscription_RootGrantCycles_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootGrantOwnersArgs = {
  distinct_on?: InputMaybe<Array<GrantOwners_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantOwners_Order_By>>
  where?: InputMaybe<IGrantOwners_Bool_Exp>
}

export type ISubscription_RootGrantOwnersTiersArgs = {
  distinct_on?: InputMaybe<Array<GrantOwnersTiers_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantOwnersTiers_Order_By>>
  where?: InputMaybe<IGrantOwnersTiers_Bool_Exp>
}

export type ISubscription_RootGrantOwnersTiers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantOwnersTiers_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantOwnersTiers_Order_By>>
  where?: InputMaybe<IGrantOwnersTiers_Bool_Exp>
}

export type ISubscription_RootGrantOwnersTiers_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootGrantOwners_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantOwners_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantOwners_Order_By>>
  where?: InputMaybe<IGrantOwners_Bool_Exp>
}

export type ISubscription_RootGrantOwners_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootGrantSubmissionReviewArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissionReview_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantSubmissionReview_Order_By>>
  where?: InputMaybe<IGrantSubmissionReview_Bool_Exp>
}

export type ISubscription_RootGrantSubmissionReview_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissionReview_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantSubmissionReview_Order_By>>
  where?: InputMaybe<IGrantSubmissionReview_Bool_Exp>
}

export type ISubscription_RootGrantSubmissionReview_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootGrantSubmissionsArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantSubmissions_Order_By>>
  where?: InputMaybe<IGrantSubmissions_Bool_Exp>
}

export type ISubscription_RootGrantSubmissions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantSubmissions_Order_By>>
  where?: InputMaybe<IGrantSubmissions_Bool_Exp>
}

export type ISubscription_RootGrantSubmissions_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootGrantTagsArgs = {
  distinct_on?: InputMaybe<Array<GrantTags_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantTags_Order_By>>
  where?: InputMaybe<IGrantTags_Bool_Exp>
}

export type ISubscription_RootGrantTagsBridgeArgs = {
  distinct_on?: InputMaybe<Array<GrantTagsBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantTagsBridge_Order_By>>
  where?: InputMaybe<IGrantTagsBridge_Bool_Exp>
}

export type ISubscription_RootGrantTagsBridge_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantTagsBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantTagsBridge_Order_By>>
  where?: InputMaybe<IGrantTagsBridge_Bool_Exp>
}

export type ISubscription_RootGrantTagsBridge_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootGrantTags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantTags_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrantTags_Order_By>>
  where?: InputMaybe<IGrantTags_Bool_Exp>
}

export type ISubscription_RootGrantTags_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootGrantsArgs = {
  distinct_on?: InputMaybe<Array<Grants_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrants_Order_By>>
  where?: InputMaybe<IGrants_Bool_Exp>
}

export type ISubscription_RootGrants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Grants_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IGrants_Order_By>>
  where?: InputMaybe<IGrants_Bool_Exp>
}

export type ISubscription_RootGrants_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootLikesArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ILikes_Order_By>>
  where?: InputMaybe<ILikes_Bool_Exp>
}

export type ISubscription_RootLikes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ILikes_Order_By>>
  where?: InputMaybe<ILikes_Bool_Exp>
}

export type ISubscription_RootLikes_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootProjectArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProject_Order_By>>
  where?: InputMaybe<IProject_Bool_Exp>
}

export type ISubscription_RootProjectMembersArgs = {
  distinct_on?: InputMaybe<Array<ProjectMembers_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectMembers_Order_By>>
  where?: InputMaybe<IProjectMembers_Bool_Exp>
}

export type ISubscription_RootProjectMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectMembers_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectMembers_Order_By>>
  where?: InputMaybe<IProjectMembers_Bool_Exp>
}

export type ISubscription_RootProjectMembers_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootProjectTagArgs = {
  distinct_on?: InputMaybe<Array<ProjectTag_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectTag_Order_By>>
  where?: InputMaybe<IProjectTag_Bool_Exp>
}

export type ISubscription_RootProjectTag_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectTag_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectTag_Order_By>>
  where?: InputMaybe<IProjectTag_Bool_Exp>
}

export type ISubscription_RootProjectTag_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootProjectTagsBridgeArgs = {
  distinct_on?: InputMaybe<Array<ProjectTagsBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectTagsBridge_Order_By>>
  where?: InputMaybe<IProjectTagsBridge_Bool_Exp>
}

export type ISubscription_RootProjectTagsBridge_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectTagsBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectTagsBridge_Order_By>>
  where?: InputMaybe<IProjectTagsBridge_Bool_Exp>
}

export type ISubscription_RootProjectTagsBridge_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootProjectTypeArgs = {
  distinct_on?: InputMaybe<Array<ProjectType_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectType_Order_By>>
  where?: InputMaybe<IProjectType_Bool_Exp>
}

export type ISubscription_RootProjectTypeBridgeArgs = {
  distinct_on?: InputMaybe<Array<ProjectTypeBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectTypeBridge_Order_By>>
  where?: InputMaybe<IProjectTypeBridge_Bool_Exp>
}

export type ISubscription_RootProjectTypeBridge_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectTypeBridge_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectTypeBridge_Order_By>>
  where?: InputMaybe<IProjectTypeBridge_Bool_Exp>
}

export type ISubscription_RootProjectTypeBridge_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootProjectType_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectType_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProjectType_Order_By>>
  where?: InputMaybe<IProjectType_Bool_Exp>
}

export type ISubscription_RootProjectType_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootProject_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IProject_Order_By>>
  where?: InputMaybe<IProject_Bool_Exp>
}

export type ISubscription_RootProject_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootSwapsArgs = {
  distinct_on?: InputMaybe<Array<Swaps_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ISwaps_Order_By>>
  where?: InputMaybe<ISwaps_Bool_Exp>
}

export type ISubscription_RootSwaps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Swaps_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ISwaps_Order_By>>
  where?: InputMaybe<ISwaps_Bool_Exp>
}

export type ISubscription_RootSwaps_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootTopUpWalletArgs = {
  distinct_on?: InputMaybe<Array<TopUpWallet_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ITopUpWallet_Order_By>>
  where?: InputMaybe<ITopUpWallet_Bool_Exp>
}

export type ISubscription_RootTopUpWallet_AggregateArgs = {
  distinct_on?: InputMaybe<Array<TopUpWallet_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<ITopUpWallet_Order_By>>
  where?: InputMaybe<ITopUpWallet_Bool_Exp>
}

export type ISubscription_RootTopUpWallet_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IUser_Order_By>>
  where?: InputMaybe<IUser_Bool_Exp>
}

export type ISubscription_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<IUser_Order_By>>
  where?: InputMaybe<IUser_Bool_Exp>
}

export type ISubscription_RootUser_By_PkArgs = {
  id: Scalars['uuid']
}

export type ISubscription_Root_MetaArgs = {
  block?: InputMaybe<IBlock_Height>
}

export type ISubscription_RootExampleEntitiesArgs = {
  block?: InputMaybe<IBlock_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ExampleEntity_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<IExampleEntity_Filter>
}

export type ISubscription_RootExampleEntityArgs = {
  block?: InputMaybe<IBlock_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type ITimestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>
  _gt?: InputMaybe<Scalars['timestamptz']>
  _gte?: InputMaybe<Scalars['timestamptz']>
  _in?: InputMaybe<Array<Scalars['timestamptz']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['timestamptz']>
  _lte?: InputMaybe<Scalars['timestamptz']>
  _neq?: InputMaybe<Scalars['timestamptz']>
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>
}

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type IUuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>
  _gt?: InputMaybe<Scalars['uuid']>
  _gte?: InputMaybe<Scalars['uuid']>
  _in?: InputMaybe<Array<Scalars['uuid']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['uuid']>
  _lte?: InputMaybe<Scalars['uuid']>
  _neq?: InputMaybe<Scalars['uuid']>
  _nin?: InputMaybe<Array<Scalars['uuid']>>
}

export type ISidebarDonatorsQueryVariables = Exact<{ [key: string]: never }>

export type ISidebarDonatorsQuery = {
  __typename?: 'query_root'
  Donations: Array<{
    __typename?: 'Donations'
    amount: any
    User: { __typename?: 'User'; firstName?: string | null; lastName?: string | null; profileImage?: string | null }
  }>
}

export type ICreateTopUpWalletMutationVariables = Exact<{
  data: ITopUpWallet_Insert_Input
}>

export type ICreateTopUpWalletMutation = {
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

export const SidebarDonatorsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SidebarDonators' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Donations' },
            arguments: [
              { kind: 'Argument', name: { kind: 'Name', value: 'limit' }, value: { kind: 'IntValue', value: '5' } },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'amount' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'User' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'profileImage' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ISidebarDonatorsQuery, ISidebarDonatorsQueryVariables>
export const CreateTopUpWalletDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createTopUpWallet' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'TopUpWallet_insert_input' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insert_TopUpWallet_one' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'object' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'originFund' } },
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ICreateTopUpWalletMutation, ICreateTopUpWalletMutationVariables>
