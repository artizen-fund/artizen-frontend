import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: any;
  float8: any;
  json: any;
  numeric: any;
  timestamptz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** columns and relationships of "Donations" */
export type Donations = {
  __typename?: 'Donations';
  /** An object relationship */
  User: User;
  amount: Scalars['numeric'];
  fee: Scalars['numeric'];
  id: Scalars['uuid'];
  state: Scalars['String'];
  topUpId: Scalars['uuid'];
  txHash?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userId: Scalars['uuid'];
};

/** aggregated selection of "Donations" */
export type Donations_Aggregate = {
  __typename?: 'Donations_aggregate';
  aggregate?: Maybe<Donations_Aggregate_Fields>;
  nodes: Array<Donations>;
};

/** aggregate fields of "Donations" */
export type Donations_Aggregate_Fields = {
  __typename?: 'Donations_aggregate_fields';
  avg?: Maybe<Donations_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Donations_Max_Fields>;
  min?: Maybe<Donations_Min_Fields>;
  stddev?: Maybe<Donations_Stddev_Fields>;
  stddev_pop?: Maybe<Donations_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Donations_Stddev_Samp_Fields>;
  sum?: Maybe<Donations_Sum_Fields>;
  var_pop?: Maybe<Donations_Var_Pop_Fields>;
  var_samp?: Maybe<Donations_Var_Samp_Fields>;
  variance?: Maybe<Donations_Variance_Fields>;
};


/** aggregate fields of "Donations" */
export type Donations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Donations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Donations" */
export type Donations_Aggregate_Order_By = {
  avg?: InputMaybe<Donations_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Donations_Max_Order_By>;
  min?: InputMaybe<Donations_Min_Order_By>;
  stddev?: InputMaybe<Donations_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Donations_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Donations_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Donations_Sum_Order_By>;
  var_pop?: InputMaybe<Donations_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Donations_Var_Samp_Order_By>;
  variance?: InputMaybe<Donations_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "Donations" */
export type Donations_Arr_Rel_Insert_Input = {
  data: Array<Donations_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Donations_On_Conflict>;
};

/** aggregate avg on columns */
export type Donations_Avg_Fields = {
  __typename?: 'Donations_avg_fields';
  amount?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "Donations" */
export type Donations_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Donations". All fields are combined with a logical 'AND'. */
export type Donations_Bool_Exp = {
  User?: InputMaybe<User_Bool_Exp>;
  _and?: InputMaybe<Array<Donations_Bool_Exp>>;
  _not?: InputMaybe<Donations_Bool_Exp>;
  _or?: InputMaybe<Array<Donations_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  fee?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  state?: InputMaybe<String_Comparison_Exp>;
  topUpId?: InputMaybe<Uuid_Comparison_Exp>;
  txHash?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "Donations" */
export enum Donations_Constraint {
  /** unique or primary key constraint */
  DonationsPkey = 'Donations_pkey'
}

/** input type for incrementing numeric columns in table "Donations" */
export type Donations_Inc_Input = {
  amount?: InputMaybe<Scalars['numeric']>;
  fee?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "Donations" */
export type Donations_Insert_Input = {
  User?: InputMaybe<User_Obj_Rel_Insert_Input>;
  amount?: InputMaybe<Scalars['numeric']>;
  fee?: InputMaybe<Scalars['numeric']>;
  id?: InputMaybe<Scalars['uuid']>;
  state?: InputMaybe<Scalars['String']>;
  topUpId?: InputMaybe<Scalars['uuid']>;
  txHash?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Donations_Max_Fields = {
  __typename?: 'Donations_max_fields';
  amount?: Maybe<Scalars['numeric']>;
  fee?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  state?: Maybe<Scalars['String']>;
  topUpId?: Maybe<Scalars['uuid']>;
  txHash?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "Donations" */
export type Donations_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  topUpId?: InputMaybe<Order_By>;
  txHash?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Donations_Min_Fields = {
  __typename?: 'Donations_min_fields';
  amount?: Maybe<Scalars['numeric']>;
  fee?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  state?: Maybe<Scalars['String']>;
  topUpId?: Maybe<Scalars['uuid']>;
  txHash?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "Donations" */
export type Donations_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  topUpId?: InputMaybe<Order_By>;
  txHash?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "Donations" */
export type Donations_Mutation_Response = {
  __typename?: 'Donations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Donations>;
};

/** on_conflict condition type for table "Donations" */
export type Donations_On_Conflict = {
  constraint: Donations_Constraint;
  update_columns?: Array<Donations_Update_Column>;
  where?: InputMaybe<Donations_Bool_Exp>;
};

/** Ordering options when selecting data from "Donations". */
export type Donations_Order_By = {
  User?: InputMaybe<User_Order_By>;
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  topUpId?: InputMaybe<Order_By>;
  txHash?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Donations */
export type Donations_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Donations" */
export enum Donations_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  Fee = 'fee',
  /** column name */
  Id = 'id',
  /** column name */
  State = 'state',
  /** column name */
  TopUpId = 'topUpId',
  /** column name */
  TxHash = 'txHash',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "Donations" */
export type Donations_Set_Input = {
  amount?: InputMaybe<Scalars['numeric']>;
  fee?: InputMaybe<Scalars['numeric']>;
  id?: InputMaybe<Scalars['uuid']>;
  state?: InputMaybe<Scalars['String']>;
  topUpId?: InputMaybe<Scalars['uuid']>;
  txHash?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Donations_Stddev_Fields = {
  __typename?: 'Donations_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "Donations" */
export type Donations_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Donations_Stddev_Pop_Fields = {
  __typename?: 'Donations_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "Donations" */
export type Donations_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Donations_Stddev_Samp_Fields = {
  __typename?: 'Donations_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "Donations" */
export type Donations_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Donations_Sum_Fields = {
  __typename?: 'Donations_sum_fields';
  amount?: Maybe<Scalars['numeric']>;
  fee?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "Donations" */
export type Donations_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
};

/** update columns of table "Donations" */
export enum Donations_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  Fee = 'fee',
  /** column name */
  Id = 'id',
  /** column name */
  State = 'state',
  /** column name */
  TopUpId = 'topUpId',
  /** column name */
  TxHash = 'txHash',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'userId'
}

/** aggregate var_pop on columns */
export type Donations_Var_Pop_Fields = {
  __typename?: 'Donations_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "Donations" */
export type Donations_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Donations_Var_Samp_Fields = {
  __typename?: 'Donations_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "Donations" */
export type Donations_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Donations_Variance_Fields = {
  __typename?: 'Donations_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "Donations" */
export type Donations_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
};

/** columns and relationships of "Follows" */
export type Follows = {
  __typename?: 'Follows';
  /** An object relationship */
  grant: Grants;
  grantId: Scalars['uuid'];
  id: Scalars['uuid'];
  type: Scalars['String'];
  /** An object relationship */
  user: User;
  userId: Scalars['uuid'];
};

/** aggregated selection of "Follows" */
export type Follows_Aggregate = {
  __typename?: 'Follows_aggregate';
  aggregate?: Maybe<Follows_Aggregate_Fields>;
  nodes: Array<Follows>;
};

/** aggregate fields of "Follows" */
export type Follows_Aggregate_Fields = {
  __typename?: 'Follows_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Follows_Max_Fields>;
  min?: Maybe<Follows_Min_Fields>;
};


/** aggregate fields of "Follows" */
export type Follows_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Follows_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Follows" */
export type Follows_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Follows_Max_Order_By>;
  min?: InputMaybe<Follows_Min_Order_By>;
};

/** input type for inserting array relation for remote table "Follows" */
export type Follows_Arr_Rel_Insert_Input = {
  data: Array<Follows_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Follows_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Follows". All fields are combined with a logical 'AND'. */
export type Follows_Bool_Exp = {
  _and?: InputMaybe<Array<Follows_Bool_Exp>>;
  _not?: InputMaybe<Follows_Bool_Exp>;
  _or?: InputMaybe<Array<Follows_Bool_Exp>>;
  grant?: InputMaybe<Grants_Bool_Exp>;
  grantId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "Follows" */
export enum Follows_Constraint {
  /** unique or primary key constraint */
  FollowsPkey = 'Follows_pkey'
}

/** input type for inserting data into table "Follows" */
export type Follows_Insert_Input = {
  grant?: InputMaybe<Grants_Obj_Rel_Insert_Input>;
  grantId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Follows_Max_Fields = {
  __typename?: 'Follows_max_fields';
  grantId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  type?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "Follows" */
export type Follows_Max_Order_By = {
  grantId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Follows_Min_Fields = {
  __typename?: 'Follows_min_fields';
  grantId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  type?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "Follows" */
export type Follows_Min_Order_By = {
  grantId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "Follows" */
export type Follows_Mutation_Response = {
  __typename?: 'Follows_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Follows>;
};

/** on_conflict condition type for table "Follows" */
export type Follows_On_Conflict = {
  constraint: Follows_Constraint;
  update_columns?: Array<Follows_Update_Column>;
  where?: InputMaybe<Follows_Bool_Exp>;
};

/** Ordering options when selecting data from "Follows". */
export type Follows_Order_By = {
  grant?: InputMaybe<Grants_Order_By>;
  grantId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Follows */
export type Follows_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Follows" */
export enum Follows_Select_Column {
  /** column name */
  GrantId = 'grantId',
  /** column name */
  Id = 'id',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "Follows" */
export type Follows_Set_Input = {
  grantId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "Follows" */
export enum Follows_Update_Column {
  /** column name */
  GrantId = 'grantId',
  /** column name */
  Id = 'id',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'userId'
}

/** columns and relationships of "GrantCategories" */
export type GrantCategories = {
  __typename?: 'GrantCategories';
  /** An array relationship */
  bridgeWithGrant: Array<GrantCategoriesBridge>;
  /** An aggregate relationship */
  bridgeWithGrant_aggregate: GrantCategoriesBridge_Aggregate;
  id: Scalars['uuid'];
  label: Scalars['String'];
  value: Scalars['String'];
};


/** columns and relationships of "GrantCategories" */
export type GrantCategoriesBridgeWithGrantArgs = {
  distinct_on?: InputMaybe<Array<GrantCategoriesBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantCategoriesBridge_Order_By>>;
  where?: InputMaybe<GrantCategoriesBridge_Bool_Exp>;
};


/** columns and relationships of "GrantCategories" */
export type GrantCategoriesBridgeWithGrant_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantCategoriesBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantCategoriesBridge_Order_By>>;
  where?: InputMaybe<GrantCategoriesBridge_Bool_Exp>;
};

/** columns and relationships of "GrantCategoriesBridge" */
export type GrantCategoriesBridge = {
  __typename?: 'GrantCategoriesBridge';
  /** An object relationship */
  category: GrantCategories;
  categoryId: Scalars['uuid'];
  /** An object relationship */
  grant: Grants;
  grantId: Scalars['uuid'];
  id: Scalars['uuid'];
};

/** aggregated selection of "GrantCategoriesBridge" */
export type GrantCategoriesBridge_Aggregate = {
  __typename?: 'GrantCategoriesBridge_aggregate';
  aggregate?: Maybe<GrantCategoriesBridge_Aggregate_Fields>;
  nodes: Array<GrantCategoriesBridge>;
};

/** aggregate fields of "GrantCategoriesBridge" */
export type GrantCategoriesBridge_Aggregate_Fields = {
  __typename?: 'GrantCategoriesBridge_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<GrantCategoriesBridge_Max_Fields>;
  min?: Maybe<GrantCategoriesBridge_Min_Fields>;
};


/** aggregate fields of "GrantCategoriesBridge" */
export type GrantCategoriesBridge_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GrantCategoriesBridge_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "GrantCategoriesBridge" */
export type GrantCategoriesBridge_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<GrantCategoriesBridge_Max_Order_By>;
  min?: InputMaybe<GrantCategoriesBridge_Min_Order_By>;
};

/** input type for inserting array relation for remote table "GrantCategoriesBridge" */
export type GrantCategoriesBridge_Arr_Rel_Insert_Input = {
  data: Array<GrantCategoriesBridge_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<GrantCategoriesBridge_On_Conflict>;
};

/** Boolean expression to filter rows from the table "GrantCategoriesBridge". All fields are combined with a logical 'AND'. */
export type GrantCategoriesBridge_Bool_Exp = {
  _and?: InputMaybe<Array<GrantCategoriesBridge_Bool_Exp>>;
  _not?: InputMaybe<GrantCategoriesBridge_Bool_Exp>;
  _or?: InputMaybe<Array<GrantCategoriesBridge_Bool_Exp>>;
  category?: InputMaybe<GrantCategories_Bool_Exp>;
  categoryId?: InputMaybe<Uuid_Comparison_Exp>;
  grant?: InputMaybe<Grants_Bool_Exp>;
  grantId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "GrantCategoriesBridge" */
export enum GrantCategoriesBridge_Constraint {
  /** unique or primary key constraint */
  GrantCategoriesBridgePkey = 'GrantCategoriesBridge_pkey'
}

/** input type for inserting data into table "GrantCategoriesBridge" */
export type GrantCategoriesBridge_Insert_Input = {
  category?: InputMaybe<GrantCategories_Obj_Rel_Insert_Input>;
  categoryId?: InputMaybe<Scalars['uuid']>;
  grant?: InputMaybe<Grants_Obj_Rel_Insert_Input>;
  grantId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type GrantCategoriesBridge_Max_Fields = {
  __typename?: 'GrantCategoriesBridge_max_fields';
  categoryId?: Maybe<Scalars['uuid']>;
  grantId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "GrantCategoriesBridge" */
export type GrantCategoriesBridge_Max_Order_By = {
  categoryId?: InputMaybe<Order_By>;
  grantId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type GrantCategoriesBridge_Min_Fields = {
  __typename?: 'GrantCategoriesBridge_min_fields';
  categoryId?: Maybe<Scalars['uuid']>;
  grantId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "GrantCategoriesBridge" */
export type GrantCategoriesBridge_Min_Order_By = {
  categoryId?: InputMaybe<Order_By>;
  grantId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "GrantCategoriesBridge" */
export type GrantCategoriesBridge_Mutation_Response = {
  __typename?: 'GrantCategoriesBridge_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GrantCategoriesBridge>;
};

/** on_conflict condition type for table "GrantCategoriesBridge" */
export type GrantCategoriesBridge_On_Conflict = {
  constraint: GrantCategoriesBridge_Constraint;
  update_columns?: Array<GrantCategoriesBridge_Update_Column>;
  where?: InputMaybe<GrantCategoriesBridge_Bool_Exp>;
};

/** Ordering options when selecting data from "GrantCategoriesBridge". */
export type GrantCategoriesBridge_Order_By = {
  category?: InputMaybe<GrantCategories_Order_By>;
  categoryId?: InputMaybe<Order_By>;
  grant?: InputMaybe<Grants_Order_By>;
  grantId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: GrantCategoriesBridge */
export type GrantCategoriesBridge_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "GrantCategoriesBridge" */
export enum GrantCategoriesBridge_Select_Column {
  /** column name */
  CategoryId = 'categoryId',
  /** column name */
  GrantId = 'grantId',
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "GrantCategoriesBridge" */
export type GrantCategoriesBridge_Set_Input = {
  categoryId?: InputMaybe<Scalars['uuid']>;
  grantId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "GrantCategoriesBridge" */
export enum GrantCategoriesBridge_Update_Column {
  /** column name */
  CategoryId = 'categoryId',
  /** column name */
  GrantId = 'grantId',
  /** column name */
  Id = 'id'
}

/** aggregated selection of "GrantCategories" */
export type GrantCategories_Aggregate = {
  __typename?: 'GrantCategories_aggregate';
  aggregate?: Maybe<GrantCategories_Aggregate_Fields>;
  nodes: Array<GrantCategories>;
};

/** aggregate fields of "GrantCategories" */
export type GrantCategories_Aggregate_Fields = {
  __typename?: 'GrantCategories_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<GrantCategories_Max_Fields>;
  min?: Maybe<GrantCategories_Min_Fields>;
};


/** aggregate fields of "GrantCategories" */
export type GrantCategories_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GrantCategories_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "GrantCategories". All fields are combined with a logical 'AND'. */
export type GrantCategories_Bool_Exp = {
  _and?: InputMaybe<Array<GrantCategories_Bool_Exp>>;
  _not?: InputMaybe<GrantCategories_Bool_Exp>;
  _or?: InputMaybe<Array<GrantCategories_Bool_Exp>>;
  bridgeWithGrant?: InputMaybe<GrantCategoriesBridge_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "GrantCategories" */
export enum GrantCategories_Constraint {
  /** unique or primary key constraint */
  GrantCategoriesPkey = 'GrantCategories_pkey',
  /** unique or primary key constraint */
  GrantCategoriesValueKey = 'GrantCategories_value_key'
}

/** input type for inserting data into table "GrantCategories" */
export type GrantCategories_Insert_Input = {
  bridgeWithGrant?: InputMaybe<GrantCategoriesBridge_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  label?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type GrantCategories_Max_Fields = {
  __typename?: 'GrantCategories_max_fields';
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type GrantCategories_Min_Fields = {
  __typename?: 'GrantCategories_min_fields';
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "GrantCategories" */
export type GrantCategories_Mutation_Response = {
  __typename?: 'GrantCategories_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GrantCategories>;
};

/** input type for inserting object relation for remote table "GrantCategories" */
export type GrantCategories_Obj_Rel_Insert_Input = {
  data: GrantCategories_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<GrantCategories_On_Conflict>;
};

/** on_conflict condition type for table "GrantCategories" */
export type GrantCategories_On_Conflict = {
  constraint: GrantCategories_Constraint;
  update_columns?: Array<GrantCategories_Update_Column>;
  where?: InputMaybe<GrantCategories_Bool_Exp>;
};

/** Ordering options when selecting data from "GrantCategories". */
export type GrantCategories_Order_By = {
  bridgeWithGrant_aggregate?: InputMaybe<GrantCategoriesBridge_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: GrantCategories */
export type GrantCategories_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "GrantCategories" */
export enum GrantCategories_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "GrantCategories" */
export type GrantCategories_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  label?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "GrantCategories" */
export enum GrantCategories_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  Value = 'value'
}

/** columns and relationships of "GrantCycles" */
export type GrantCycles = {
  __typename?: 'GrantCycles';
  awardDate?: Maybe<Scalars['timestamptz']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  currentInvested?: Maybe<Scalars['Int']>;
  finalistsDeadline?: Maybe<Scalars['timestamptz']>;
  goalInvested?: Maybe<Scalars['Int']>;
  /** An object relationship */
  grant: Grants;
  grantCycleId: Scalars['String'];
  grantId: Scalars['uuid'];
  id: Scalars['uuid'];
  numberOfFinalists?: Maybe<Scalars['Int']>;
  onChainId?: Maybe<Scalars['Int']>;
  openDate?: Maybe<Scalars['timestamptz']>;
  stage?: Maybe<Scalars['json']>;
  submissionDeadline?: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  submissions: Array<GrantSubmissions>;
  /** An aggregate relationship */
  submissions_aggregate: GrantSubmissions_Aggregate;
};


/** columns and relationships of "GrantCycles" */
export type GrantCyclesStageArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "GrantCycles" */
export type GrantCyclesSubmissionsArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantSubmissions_Order_By>>;
  where?: InputMaybe<GrantSubmissions_Bool_Exp>;
};


/** columns and relationships of "GrantCycles" */
export type GrantCyclesSubmissions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantSubmissions_Order_By>>;
  where?: InputMaybe<GrantSubmissions_Bool_Exp>;
};

/** aggregated selection of "GrantCycles" */
export type GrantCycles_Aggregate = {
  __typename?: 'GrantCycles_aggregate';
  aggregate?: Maybe<GrantCycles_Aggregate_Fields>;
  nodes: Array<GrantCycles>;
};

/** aggregate fields of "GrantCycles" */
export type GrantCycles_Aggregate_Fields = {
  __typename?: 'GrantCycles_aggregate_fields';
  avg?: Maybe<GrantCycles_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<GrantCycles_Max_Fields>;
  min?: Maybe<GrantCycles_Min_Fields>;
  stddev?: Maybe<GrantCycles_Stddev_Fields>;
  stddev_pop?: Maybe<GrantCycles_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<GrantCycles_Stddev_Samp_Fields>;
  sum?: Maybe<GrantCycles_Sum_Fields>;
  var_pop?: Maybe<GrantCycles_Var_Pop_Fields>;
  var_samp?: Maybe<GrantCycles_Var_Samp_Fields>;
  variance?: Maybe<GrantCycles_Variance_Fields>;
};


/** aggregate fields of "GrantCycles" */
export type GrantCycles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GrantCycles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "GrantCycles" */
export type GrantCycles_Aggregate_Order_By = {
  avg?: InputMaybe<GrantCycles_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<GrantCycles_Max_Order_By>;
  min?: InputMaybe<GrantCycles_Min_Order_By>;
  stddev?: InputMaybe<GrantCycles_Stddev_Order_By>;
  stddev_pop?: InputMaybe<GrantCycles_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<GrantCycles_Stddev_Samp_Order_By>;
  sum?: InputMaybe<GrantCycles_Sum_Order_By>;
  var_pop?: InputMaybe<GrantCycles_Var_Pop_Order_By>;
  var_samp?: InputMaybe<GrantCycles_Var_Samp_Order_By>;
  variance?: InputMaybe<GrantCycles_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "GrantCycles" */
export type GrantCycles_Arr_Rel_Insert_Input = {
  data: Array<GrantCycles_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<GrantCycles_On_Conflict>;
};

/** aggregate avg on columns */
export type GrantCycles_Avg_Fields = {
  __typename?: 'GrantCycles_avg_fields';
  currentInvested?: Maybe<Scalars['Float']>;
  goalInvested?: Maybe<Scalars['Float']>;
  numberOfFinalists?: Maybe<Scalars['Float']>;
  onChainId?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "GrantCycles" */
export type GrantCycles_Avg_Order_By = {
  currentInvested?: InputMaybe<Order_By>;
  goalInvested?: InputMaybe<Order_By>;
  numberOfFinalists?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "GrantCycles". All fields are combined with a logical 'AND'. */
export type GrantCycles_Bool_Exp = {
  _and?: InputMaybe<Array<GrantCycles_Bool_Exp>>;
  _not?: InputMaybe<GrantCycles_Bool_Exp>;
  _or?: InputMaybe<Array<GrantCycles_Bool_Exp>>;
  awardDate?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  currentInvested?: InputMaybe<Int_Comparison_Exp>;
  finalistsDeadline?: InputMaybe<Timestamptz_Comparison_Exp>;
  goalInvested?: InputMaybe<Int_Comparison_Exp>;
  grant?: InputMaybe<Grants_Bool_Exp>;
  grantCycleId?: InputMaybe<String_Comparison_Exp>;
  grantId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  numberOfFinalists?: InputMaybe<Int_Comparison_Exp>;
  onChainId?: InputMaybe<Int_Comparison_Exp>;
  openDate?: InputMaybe<Timestamptz_Comparison_Exp>;
  stage?: InputMaybe<Json_Comparison_Exp>;
  submissionDeadline?: InputMaybe<Timestamptz_Comparison_Exp>;
  submissions?: InputMaybe<GrantSubmissions_Bool_Exp>;
};

/** unique or primary key constraints on table "GrantCycles" */
export enum GrantCycles_Constraint {
  /** unique or primary key constraint */
  GrantCyclesPkey = 'GrantCycles_pkey'
}

/** input type for incrementing numeric columns in table "GrantCycles" */
export type GrantCycles_Inc_Input = {
  currentInvested?: InputMaybe<Scalars['Int']>;
  goalInvested?: InputMaybe<Scalars['Int']>;
  numberOfFinalists?: InputMaybe<Scalars['Int']>;
  onChainId?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "GrantCycles" */
export type GrantCycles_Insert_Input = {
  awardDate?: InputMaybe<Scalars['timestamptz']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  currentInvested?: InputMaybe<Scalars['Int']>;
  finalistsDeadline?: InputMaybe<Scalars['timestamptz']>;
  goalInvested?: InputMaybe<Scalars['Int']>;
  grant?: InputMaybe<Grants_Obj_Rel_Insert_Input>;
  grantCycleId?: InputMaybe<Scalars['String']>;
  grantId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  numberOfFinalists?: InputMaybe<Scalars['Int']>;
  onChainId?: InputMaybe<Scalars['Int']>;
  openDate?: InputMaybe<Scalars['timestamptz']>;
  stage?: InputMaybe<Scalars['json']>;
  submissionDeadline?: InputMaybe<Scalars['timestamptz']>;
  submissions?: InputMaybe<GrantSubmissions_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type GrantCycles_Max_Fields = {
  __typename?: 'GrantCycles_max_fields';
  awardDate?: Maybe<Scalars['timestamptz']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  currentInvested?: Maybe<Scalars['Int']>;
  finalistsDeadline?: Maybe<Scalars['timestamptz']>;
  goalInvested?: Maybe<Scalars['Int']>;
  grantCycleId?: Maybe<Scalars['String']>;
  grantId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  numberOfFinalists?: Maybe<Scalars['Int']>;
  onChainId?: Maybe<Scalars['Int']>;
  openDate?: Maybe<Scalars['timestamptz']>;
  submissionDeadline?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "GrantCycles" */
export type GrantCycles_Max_Order_By = {
  awardDate?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  currentInvested?: InputMaybe<Order_By>;
  finalistsDeadline?: InputMaybe<Order_By>;
  goalInvested?: InputMaybe<Order_By>;
  grantCycleId?: InputMaybe<Order_By>;
  grantId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  numberOfFinalists?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
  openDate?: InputMaybe<Order_By>;
  submissionDeadline?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type GrantCycles_Min_Fields = {
  __typename?: 'GrantCycles_min_fields';
  awardDate?: Maybe<Scalars['timestamptz']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  currentInvested?: Maybe<Scalars['Int']>;
  finalistsDeadline?: Maybe<Scalars['timestamptz']>;
  goalInvested?: Maybe<Scalars['Int']>;
  grantCycleId?: Maybe<Scalars['String']>;
  grantId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  numberOfFinalists?: Maybe<Scalars['Int']>;
  onChainId?: Maybe<Scalars['Int']>;
  openDate?: Maybe<Scalars['timestamptz']>;
  submissionDeadline?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "GrantCycles" */
export type GrantCycles_Min_Order_By = {
  awardDate?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  currentInvested?: InputMaybe<Order_By>;
  finalistsDeadline?: InputMaybe<Order_By>;
  goalInvested?: InputMaybe<Order_By>;
  grantCycleId?: InputMaybe<Order_By>;
  grantId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  numberOfFinalists?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
  openDate?: InputMaybe<Order_By>;
  submissionDeadline?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "GrantCycles" */
export type GrantCycles_Mutation_Response = {
  __typename?: 'GrantCycles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GrantCycles>;
};

/** input type for inserting object relation for remote table "GrantCycles" */
export type GrantCycles_Obj_Rel_Insert_Input = {
  data: GrantCycles_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<GrantCycles_On_Conflict>;
};

/** on_conflict condition type for table "GrantCycles" */
export type GrantCycles_On_Conflict = {
  constraint: GrantCycles_Constraint;
  update_columns?: Array<GrantCycles_Update_Column>;
  where?: InputMaybe<GrantCycles_Bool_Exp>;
};

/** Ordering options when selecting data from "GrantCycles". */
export type GrantCycles_Order_By = {
  awardDate?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  currentInvested?: InputMaybe<Order_By>;
  finalistsDeadline?: InputMaybe<Order_By>;
  goalInvested?: InputMaybe<Order_By>;
  grant?: InputMaybe<Grants_Order_By>;
  grantCycleId?: InputMaybe<Order_By>;
  grantId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  numberOfFinalists?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
  openDate?: InputMaybe<Order_By>;
  stage?: InputMaybe<Order_By>;
  submissionDeadline?: InputMaybe<Order_By>;
  submissions_aggregate?: InputMaybe<GrantSubmissions_Aggregate_Order_By>;
};

/** primary key columns input for table: GrantCycles */
export type GrantCycles_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "GrantCycles" */
export enum GrantCycles_Select_Column {
  /** column name */
  AwardDate = 'awardDate',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurrentInvested = 'currentInvested',
  /** column name */
  FinalistsDeadline = 'finalistsDeadline',
  /** column name */
  GoalInvested = 'goalInvested',
  /** column name */
  GrantCycleId = 'grantCycleId',
  /** column name */
  GrantId = 'grantId',
  /** column name */
  Id = 'id',
  /** column name */
  NumberOfFinalists = 'numberOfFinalists',
  /** column name */
  OnChainId = 'onChainId',
  /** column name */
  OpenDate = 'openDate',
  /** column name */
  Stage = 'stage',
  /** column name */
  SubmissionDeadline = 'submissionDeadline'
}

/** input type for updating data in table "GrantCycles" */
export type GrantCycles_Set_Input = {
  awardDate?: InputMaybe<Scalars['timestamptz']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  currentInvested?: InputMaybe<Scalars['Int']>;
  finalistsDeadline?: InputMaybe<Scalars['timestamptz']>;
  goalInvested?: InputMaybe<Scalars['Int']>;
  grantCycleId?: InputMaybe<Scalars['String']>;
  grantId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  numberOfFinalists?: InputMaybe<Scalars['Int']>;
  onChainId?: InputMaybe<Scalars['Int']>;
  openDate?: InputMaybe<Scalars['timestamptz']>;
  stage?: InputMaybe<Scalars['json']>;
  submissionDeadline?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type GrantCycles_Stddev_Fields = {
  __typename?: 'GrantCycles_stddev_fields';
  currentInvested?: Maybe<Scalars['Float']>;
  goalInvested?: Maybe<Scalars['Float']>;
  numberOfFinalists?: Maybe<Scalars['Float']>;
  onChainId?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "GrantCycles" */
export type GrantCycles_Stddev_Order_By = {
  currentInvested?: InputMaybe<Order_By>;
  goalInvested?: InputMaybe<Order_By>;
  numberOfFinalists?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type GrantCycles_Stddev_Pop_Fields = {
  __typename?: 'GrantCycles_stddev_pop_fields';
  currentInvested?: Maybe<Scalars['Float']>;
  goalInvested?: Maybe<Scalars['Float']>;
  numberOfFinalists?: Maybe<Scalars['Float']>;
  onChainId?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "GrantCycles" */
export type GrantCycles_Stddev_Pop_Order_By = {
  currentInvested?: InputMaybe<Order_By>;
  goalInvested?: InputMaybe<Order_By>;
  numberOfFinalists?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type GrantCycles_Stddev_Samp_Fields = {
  __typename?: 'GrantCycles_stddev_samp_fields';
  currentInvested?: Maybe<Scalars['Float']>;
  goalInvested?: Maybe<Scalars['Float']>;
  numberOfFinalists?: Maybe<Scalars['Float']>;
  onChainId?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "GrantCycles" */
export type GrantCycles_Stddev_Samp_Order_By = {
  currentInvested?: InputMaybe<Order_By>;
  goalInvested?: InputMaybe<Order_By>;
  numberOfFinalists?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type GrantCycles_Sum_Fields = {
  __typename?: 'GrantCycles_sum_fields';
  currentInvested?: Maybe<Scalars['Int']>;
  goalInvested?: Maybe<Scalars['Int']>;
  numberOfFinalists?: Maybe<Scalars['Int']>;
  onChainId?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "GrantCycles" */
export type GrantCycles_Sum_Order_By = {
  currentInvested?: InputMaybe<Order_By>;
  goalInvested?: InputMaybe<Order_By>;
  numberOfFinalists?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
};

/** update columns of table "GrantCycles" */
export enum GrantCycles_Update_Column {
  /** column name */
  AwardDate = 'awardDate',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurrentInvested = 'currentInvested',
  /** column name */
  FinalistsDeadline = 'finalistsDeadline',
  /** column name */
  GoalInvested = 'goalInvested',
  /** column name */
  GrantCycleId = 'grantCycleId',
  /** column name */
  GrantId = 'grantId',
  /** column name */
  Id = 'id',
  /** column name */
  NumberOfFinalists = 'numberOfFinalists',
  /** column name */
  OnChainId = 'onChainId',
  /** column name */
  OpenDate = 'openDate',
  /** column name */
  Stage = 'stage',
  /** column name */
  SubmissionDeadline = 'submissionDeadline'
}

/** aggregate var_pop on columns */
export type GrantCycles_Var_Pop_Fields = {
  __typename?: 'GrantCycles_var_pop_fields';
  currentInvested?: Maybe<Scalars['Float']>;
  goalInvested?: Maybe<Scalars['Float']>;
  numberOfFinalists?: Maybe<Scalars['Float']>;
  onChainId?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "GrantCycles" */
export type GrantCycles_Var_Pop_Order_By = {
  currentInvested?: InputMaybe<Order_By>;
  goalInvested?: InputMaybe<Order_By>;
  numberOfFinalists?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type GrantCycles_Var_Samp_Fields = {
  __typename?: 'GrantCycles_var_samp_fields';
  currentInvested?: Maybe<Scalars['Float']>;
  goalInvested?: Maybe<Scalars['Float']>;
  numberOfFinalists?: Maybe<Scalars['Float']>;
  onChainId?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "GrantCycles" */
export type GrantCycles_Var_Samp_Order_By = {
  currentInvested?: InputMaybe<Order_By>;
  goalInvested?: InputMaybe<Order_By>;
  numberOfFinalists?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type GrantCycles_Variance_Fields = {
  __typename?: 'GrantCycles_variance_fields';
  currentInvested?: Maybe<Scalars['Float']>;
  goalInvested?: Maybe<Scalars['Float']>;
  numberOfFinalists?: Maybe<Scalars['Float']>;
  onChainId?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "GrantCycles" */
export type GrantCycles_Variance_Order_By = {
  currentInvested?: InputMaybe<Order_By>;
  goalInvested?: InputMaybe<Order_By>;
  numberOfFinalists?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
};

/** columns and relationships of "GrantOwners" */
export type GrantOwners = {
  __typename?: 'GrantOwners';
  availableVotes: Scalars['numeric'];
  id: Scalars['uuid'];
  /** An object relationship */
  tier?: Maybe<GrantOwnersTiers>;
  tierId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  user: User;
  userId: Scalars['uuid'];
};

/** columns and relationships of "GrantOwnersTiers" */
export type GrantOwnersTiers = {
  __typename?: 'GrantOwnersTiers';
  administrationRights?: Maybe<Scalars['Boolean']>;
  curationVotes: Scalars['numeric'];
  description?: Maybe<Scalars['String']>;
  extraFeatures?: Maybe<Scalars['json']>;
  /** An object relationship */
  grant: Grants;
  grantId: Scalars['uuid'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An array relationship */
  owners: Array<GrantOwners>;
  /** An aggregate relationship */
  owners_aggregate: GrantOwners_Aggregate;
};


/** columns and relationships of "GrantOwnersTiers" */
export type GrantOwnersTiersExtraFeaturesArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "GrantOwnersTiers" */
export type GrantOwnersTiersOwnersArgs = {
  distinct_on?: InputMaybe<Array<GrantOwners_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantOwners_Order_By>>;
  where?: InputMaybe<GrantOwners_Bool_Exp>;
};


/** columns and relationships of "GrantOwnersTiers" */
export type GrantOwnersTiersOwners_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantOwners_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantOwners_Order_By>>;
  where?: InputMaybe<GrantOwners_Bool_Exp>;
};

/** aggregated selection of "GrantOwnersTiers" */
export type GrantOwnersTiers_Aggregate = {
  __typename?: 'GrantOwnersTiers_aggregate';
  aggregate?: Maybe<GrantOwnersTiers_Aggregate_Fields>;
  nodes: Array<GrantOwnersTiers>;
};

/** aggregate fields of "GrantOwnersTiers" */
export type GrantOwnersTiers_Aggregate_Fields = {
  __typename?: 'GrantOwnersTiers_aggregate_fields';
  avg?: Maybe<GrantOwnersTiers_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<GrantOwnersTiers_Max_Fields>;
  min?: Maybe<GrantOwnersTiers_Min_Fields>;
  stddev?: Maybe<GrantOwnersTiers_Stddev_Fields>;
  stddev_pop?: Maybe<GrantOwnersTiers_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<GrantOwnersTiers_Stddev_Samp_Fields>;
  sum?: Maybe<GrantOwnersTiers_Sum_Fields>;
  var_pop?: Maybe<GrantOwnersTiers_Var_Pop_Fields>;
  var_samp?: Maybe<GrantOwnersTiers_Var_Samp_Fields>;
  variance?: Maybe<GrantOwnersTiers_Variance_Fields>;
};


/** aggregate fields of "GrantOwnersTiers" */
export type GrantOwnersTiers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GrantOwnersTiers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "GrantOwnersTiers" */
export type GrantOwnersTiers_Aggregate_Order_By = {
  avg?: InputMaybe<GrantOwnersTiers_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<GrantOwnersTiers_Max_Order_By>;
  min?: InputMaybe<GrantOwnersTiers_Min_Order_By>;
  stddev?: InputMaybe<GrantOwnersTiers_Stddev_Order_By>;
  stddev_pop?: InputMaybe<GrantOwnersTiers_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<GrantOwnersTiers_Stddev_Samp_Order_By>;
  sum?: InputMaybe<GrantOwnersTiers_Sum_Order_By>;
  var_pop?: InputMaybe<GrantOwnersTiers_Var_Pop_Order_By>;
  var_samp?: InputMaybe<GrantOwnersTiers_Var_Samp_Order_By>;
  variance?: InputMaybe<GrantOwnersTiers_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "GrantOwnersTiers" */
export type GrantOwnersTiers_Arr_Rel_Insert_Input = {
  data: Array<GrantOwnersTiers_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<GrantOwnersTiers_On_Conflict>;
};

/** aggregate avg on columns */
export type GrantOwnersTiers_Avg_Fields = {
  __typename?: 'GrantOwnersTiers_avg_fields';
  curationVotes?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "GrantOwnersTiers" */
export type GrantOwnersTiers_Avg_Order_By = {
  curationVotes?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "GrantOwnersTiers". All fields are combined with a logical 'AND'. */
export type GrantOwnersTiers_Bool_Exp = {
  _and?: InputMaybe<Array<GrantOwnersTiers_Bool_Exp>>;
  _not?: InputMaybe<GrantOwnersTiers_Bool_Exp>;
  _or?: InputMaybe<Array<GrantOwnersTiers_Bool_Exp>>;
  administrationRights?: InputMaybe<Boolean_Comparison_Exp>;
  curationVotes?: InputMaybe<Numeric_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  extraFeatures?: InputMaybe<Json_Comparison_Exp>;
  grant?: InputMaybe<Grants_Bool_Exp>;
  grantId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  owners?: InputMaybe<GrantOwners_Bool_Exp>;
};

/** unique or primary key constraints on table "GrantOwnersTiers" */
export enum GrantOwnersTiers_Constraint {
  /** unique or primary key constraint */
  GrantOwnersTiersPkey = 'GrantOwnersTiers_pkey'
}

/** input type for incrementing numeric columns in table "GrantOwnersTiers" */
export type GrantOwnersTiers_Inc_Input = {
  curationVotes?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "GrantOwnersTiers" */
export type GrantOwnersTiers_Insert_Input = {
  administrationRights?: InputMaybe<Scalars['Boolean']>;
  curationVotes?: InputMaybe<Scalars['numeric']>;
  description?: InputMaybe<Scalars['String']>;
  extraFeatures?: InputMaybe<Scalars['json']>;
  grant?: InputMaybe<Grants_Obj_Rel_Insert_Input>;
  grantId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  owners?: InputMaybe<GrantOwners_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type GrantOwnersTiers_Max_Fields = {
  __typename?: 'GrantOwnersTiers_max_fields';
  curationVotes?: Maybe<Scalars['numeric']>;
  description?: Maybe<Scalars['String']>;
  grantId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "GrantOwnersTiers" */
export type GrantOwnersTiers_Max_Order_By = {
  curationVotes?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  grantId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type GrantOwnersTiers_Min_Fields = {
  __typename?: 'GrantOwnersTiers_min_fields';
  curationVotes?: Maybe<Scalars['numeric']>;
  description?: Maybe<Scalars['String']>;
  grantId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "GrantOwnersTiers" */
export type GrantOwnersTiers_Min_Order_By = {
  curationVotes?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  grantId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "GrantOwnersTiers" */
export type GrantOwnersTiers_Mutation_Response = {
  __typename?: 'GrantOwnersTiers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GrantOwnersTiers>;
};

/** input type for inserting object relation for remote table "GrantOwnersTiers" */
export type GrantOwnersTiers_Obj_Rel_Insert_Input = {
  data: GrantOwnersTiers_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<GrantOwnersTiers_On_Conflict>;
};

/** on_conflict condition type for table "GrantOwnersTiers" */
export type GrantOwnersTiers_On_Conflict = {
  constraint: GrantOwnersTiers_Constraint;
  update_columns?: Array<GrantOwnersTiers_Update_Column>;
  where?: InputMaybe<GrantOwnersTiers_Bool_Exp>;
};

/** Ordering options when selecting data from "GrantOwnersTiers". */
export type GrantOwnersTiers_Order_By = {
  administrationRights?: InputMaybe<Order_By>;
  curationVotes?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  extraFeatures?: InputMaybe<Order_By>;
  grant?: InputMaybe<Grants_Order_By>;
  grantId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owners_aggregate?: InputMaybe<GrantOwners_Aggregate_Order_By>;
};

/** primary key columns input for table: GrantOwnersTiers */
export type GrantOwnersTiers_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "GrantOwnersTiers" */
export enum GrantOwnersTiers_Select_Column {
  /** column name */
  AdministrationRights = 'administrationRights',
  /** column name */
  CurationVotes = 'curationVotes',
  /** column name */
  Description = 'description',
  /** column name */
  ExtraFeatures = 'extraFeatures',
  /** column name */
  GrantId = 'grantId',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "GrantOwnersTiers" */
export type GrantOwnersTiers_Set_Input = {
  administrationRights?: InputMaybe<Scalars['Boolean']>;
  curationVotes?: InputMaybe<Scalars['numeric']>;
  description?: InputMaybe<Scalars['String']>;
  extraFeatures?: InputMaybe<Scalars['json']>;
  grantId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type GrantOwnersTiers_Stddev_Fields = {
  __typename?: 'GrantOwnersTiers_stddev_fields';
  curationVotes?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "GrantOwnersTiers" */
export type GrantOwnersTiers_Stddev_Order_By = {
  curationVotes?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type GrantOwnersTiers_Stddev_Pop_Fields = {
  __typename?: 'GrantOwnersTiers_stddev_pop_fields';
  curationVotes?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "GrantOwnersTiers" */
export type GrantOwnersTiers_Stddev_Pop_Order_By = {
  curationVotes?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type GrantOwnersTiers_Stddev_Samp_Fields = {
  __typename?: 'GrantOwnersTiers_stddev_samp_fields';
  curationVotes?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "GrantOwnersTiers" */
export type GrantOwnersTiers_Stddev_Samp_Order_By = {
  curationVotes?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type GrantOwnersTiers_Sum_Fields = {
  __typename?: 'GrantOwnersTiers_sum_fields';
  curationVotes?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "GrantOwnersTiers" */
export type GrantOwnersTiers_Sum_Order_By = {
  curationVotes?: InputMaybe<Order_By>;
};

/** update columns of table "GrantOwnersTiers" */
export enum GrantOwnersTiers_Update_Column {
  /** column name */
  AdministrationRights = 'administrationRights',
  /** column name */
  CurationVotes = 'curationVotes',
  /** column name */
  Description = 'description',
  /** column name */
  ExtraFeatures = 'extraFeatures',
  /** column name */
  GrantId = 'grantId',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** aggregate var_pop on columns */
export type GrantOwnersTiers_Var_Pop_Fields = {
  __typename?: 'GrantOwnersTiers_var_pop_fields';
  curationVotes?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "GrantOwnersTiers" */
export type GrantOwnersTiers_Var_Pop_Order_By = {
  curationVotes?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type GrantOwnersTiers_Var_Samp_Fields = {
  __typename?: 'GrantOwnersTiers_var_samp_fields';
  curationVotes?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "GrantOwnersTiers" */
export type GrantOwnersTiers_Var_Samp_Order_By = {
  curationVotes?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type GrantOwnersTiers_Variance_Fields = {
  __typename?: 'GrantOwnersTiers_variance_fields';
  curationVotes?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "GrantOwnersTiers" */
export type GrantOwnersTiers_Variance_Order_By = {
  curationVotes?: InputMaybe<Order_By>;
};

/** aggregated selection of "GrantOwners" */
export type GrantOwners_Aggregate = {
  __typename?: 'GrantOwners_aggregate';
  aggregate?: Maybe<GrantOwners_Aggregate_Fields>;
  nodes: Array<GrantOwners>;
};

/** aggregate fields of "GrantOwners" */
export type GrantOwners_Aggregate_Fields = {
  __typename?: 'GrantOwners_aggregate_fields';
  avg?: Maybe<GrantOwners_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<GrantOwners_Max_Fields>;
  min?: Maybe<GrantOwners_Min_Fields>;
  stddev?: Maybe<GrantOwners_Stddev_Fields>;
  stddev_pop?: Maybe<GrantOwners_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<GrantOwners_Stddev_Samp_Fields>;
  sum?: Maybe<GrantOwners_Sum_Fields>;
  var_pop?: Maybe<GrantOwners_Var_Pop_Fields>;
  var_samp?: Maybe<GrantOwners_Var_Samp_Fields>;
  variance?: Maybe<GrantOwners_Variance_Fields>;
};


/** aggregate fields of "GrantOwners" */
export type GrantOwners_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GrantOwners_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "GrantOwners" */
export type GrantOwners_Aggregate_Order_By = {
  avg?: InputMaybe<GrantOwners_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<GrantOwners_Max_Order_By>;
  min?: InputMaybe<GrantOwners_Min_Order_By>;
  stddev?: InputMaybe<GrantOwners_Stddev_Order_By>;
  stddev_pop?: InputMaybe<GrantOwners_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<GrantOwners_Stddev_Samp_Order_By>;
  sum?: InputMaybe<GrantOwners_Sum_Order_By>;
  var_pop?: InputMaybe<GrantOwners_Var_Pop_Order_By>;
  var_samp?: InputMaybe<GrantOwners_Var_Samp_Order_By>;
  variance?: InputMaybe<GrantOwners_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "GrantOwners" */
export type GrantOwners_Arr_Rel_Insert_Input = {
  data: Array<GrantOwners_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<GrantOwners_On_Conflict>;
};

/** aggregate avg on columns */
export type GrantOwners_Avg_Fields = {
  __typename?: 'GrantOwners_avg_fields';
  availableVotes?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "GrantOwners" */
export type GrantOwners_Avg_Order_By = {
  availableVotes?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "GrantOwners". All fields are combined with a logical 'AND'. */
export type GrantOwners_Bool_Exp = {
  _and?: InputMaybe<Array<GrantOwners_Bool_Exp>>;
  _not?: InputMaybe<GrantOwners_Bool_Exp>;
  _or?: InputMaybe<Array<GrantOwners_Bool_Exp>>;
  availableVotes?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  tier?: InputMaybe<GrantOwnersTiers_Bool_Exp>;
  tierId?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "GrantOwners" */
export enum GrantOwners_Constraint {
  /** unique or primary key constraint */
  GrantOwnersPkey = 'GrantOwners_pkey'
}

/** input type for incrementing numeric columns in table "GrantOwners" */
export type GrantOwners_Inc_Input = {
  availableVotes?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "GrantOwners" */
export type GrantOwners_Insert_Input = {
  availableVotes?: InputMaybe<Scalars['numeric']>;
  id?: InputMaybe<Scalars['uuid']>;
  tier?: InputMaybe<GrantOwnersTiers_Obj_Rel_Insert_Input>;
  tierId?: InputMaybe<Scalars['uuid']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type GrantOwners_Max_Fields = {
  __typename?: 'GrantOwners_max_fields';
  availableVotes?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  tierId?: Maybe<Scalars['uuid']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "GrantOwners" */
export type GrantOwners_Max_Order_By = {
  availableVotes?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tierId?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type GrantOwners_Min_Fields = {
  __typename?: 'GrantOwners_min_fields';
  availableVotes?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  tierId?: Maybe<Scalars['uuid']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "GrantOwners" */
export type GrantOwners_Min_Order_By = {
  availableVotes?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tierId?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "GrantOwners" */
export type GrantOwners_Mutation_Response = {
  __typename?: 'GrantOwners_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GrantOwners>;
};

/** on_conflict condition type for table "GrantOwners" */
export type GrantOwners_On_Conflict = {
  constraint: GrantOwners_Constraint;
  update_columns?: Array<GrantOwners_Update_Column>;
  where?: InputMaybe<GrantOwners_Bool_Exp>;
};

/** Ordering options when selecting data from "GrantOwners". */
export type GrantOwners_Order_By = {
  availableVotes?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tier?: InputMaybe<GrantOwnersTiers_Order_By>;
  tierId?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: GrantOwners */
export type GrantOwners_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "GrantOwners" */
export enum GrantOwners_Select_Column {
  /** column name */
  AvailableVotes = 'availableVotes',
  /** column name */
  Id = 'id',
  /** column name */
  TierId = 'tierId',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "GrantOwners" */
export type GrantOwners_Set_Input = {
  availableVotes?: InputMaybe<Scalars['numeric']>;
  id?: InputMaybe<Scalars['uuid']>;
  tierId?: InputMaybe<Scalars['uuid']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type GrantOwners_Stddev_Fields = {
  __typename?: 'GrantOwners_stddev_fields';
  availableVotes?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "GrantOwners" */
export type GrantOwners_Stddev_Order_By = {
  availableVotes?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type GrantOwners_Stddev_Pop_Fields = {
  __typename?: 'GrantOwners_stddev_pop_fields';
  availableVotes?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "GrantOwners" */
export type GrantOwners_Stddev_Pop_Order_By = {
  availableVotes?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type GrantOwners_Stddev_Samp_Fields = {
  __typename?: 'GrantOwners_stddev_samp_fields';
  availableVotes?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "GrantOwners" */
export type GrantOwners_Stddev_Samp_Order_By = {
  availableVotes?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type GrantOwners_Sum_Fields = {
  __typename?: 'GrantOwners_sum_fields';
  availableVotes?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "GrantOwners" */
export type GrantOwners_Sum_Order_By = {
  availableVotes?: InputMaybe<Order_By>;
};

/** update columns of table "GrantOwners" */
export enum GrantOwners_Update_Column {
  /** column name */
  AvailableVotes = 'availableVotes',
  /** column name */
  Id = 'id',
  /** column name */
  TierId = 'tierId',
  /** column name */
  UserId = 'userId'
}

/** aggregate var_pop on columns */
export type GrantOwners_Var_Pop_Fields = {
  __typename?: 'GrantOwners_var_pop_fields';
  availableVotes?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "GrantOwners" */
export type GrantOwners_Var_Pop_Order_By = {
  availableVotes?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type GrantOwners_Var_Samp_Fields = {
  __typename?: 'GrantOwners_var_samp_fields';
  availableVotes?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "GrantOwners" */
export type GrantOwners_Var_Samp_Order_By = {
  availableVotes?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type GrantOwners_Variance_Fields = {
  __typename?: 'GrantOwners_variance_fields';
  availableVotes?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "GrantOwners" */
export type GrantOwners_Variance_Order_By = {
  availableVotes?: InputMaybe<Order_By>;
};

/** columns and relationships of "GrantSubmissionReview" */
export type GrantSubmissionReview = {
  __typename?: 'GrantSubmissionReview';
  created_at?: Maybe<Scalars['timestamptz']>;
  curationVotes?: Maybe<Scalars['float8']>;
  feedback?: Maybe<Scalars['String']>;
  /** An object relationship */
  grantSubmission?: Maybe<GrantSubmissions>;
  id: Scalars['uuid'];
  reviewVotes?: Maybe<Scalars['Int']>;
  /** An object relationship */
  reviewer?: Maybe<User>;
  reviewerId?: Maybe<Scalars['uuid']>;
  submissionId?: Maybe<Scalars['uuid']>;
  type: Scalars['String'];
};

/** aggregated selection of "GrantSubmissionReview" */
export type GrantSubmissionReview_Aggregate = {
  __typename?: 'GrantSubmissionReview_aggregate';
  aggregate?: Maybe<GrantSubmissionReview_Aggregate_Fields>;
  nodes: Array<GrantSubmissionReview>;
};

/** aggregate fields of "GrantSubmissionReview" */
export type GrantSubmissionReview_Aggregate_Fields = {
  __typename?: 'GrantSubmissionReview_aggregate_fields';
  avg?: Maybe<GrantSubmissionReview_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<GrantSubmissionReview_Max_Fields>;
  min?: Maybe<GrantSubmissionReview_Min_Fields>;
  stddev?: Maybe<GrantSubmissionReview_Stddev_Fields>;
  stddev_pop?: Maybe<GrantSubmissionReview_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<GrantSubmissionReview_Stddev_Samp_Fields>;
  sum?: Maybe<GrantSubmissionReview_Sum_Fields>;
  var_pop?: Maybe<GrantSubmissionReview_Var_Pop_Fields>;
  var_samp?: Maybe<GrantSubmissionReview_Var_Samp_Fields>;
  variance?: Maybe<GrantSubmissionReview_Variance_Fields>;
};


/** aggregate fields of "GrantSubmissionReview" */
export type GrantSubmissionReview_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GrantSubmissionReview_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "GrantSubmissionReview" */
export type GrantSubmissionReview_Aggregate_Order_By = {
  avg?: InputMaybe<GrantSubmissionReview_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<GrantSubmissionReview_Max_Order_By>;
  min?: InputMaybe<GrantSubmissionReview_Min_Order_By>;
  stddev?: InputMaybe<GrantSubmissionReview_Stddev_Order_By>;
  stddev_pop?: InputMaybe<GrantSubmissionReview_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<GrantSubmissionReview_Stddev_Samp_Order_By>;
  sum?: InputMaybe<GrantSubmissionReview_Sum_Order_By>;
  var_pop?: InputMaybe<GrantSubmissionReview_Var_Pop_Order_By>;
  var_samp?: InputMaybe<GrantSubmissionReview_Var_Samp_Order_By>;
  variance?: InputMaybe<GrantSubmissionReview_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "GrantSubmissionReview" */
export type GrantSubmissionReview_Arr_Rel_Insert_Input = {
  data: Array<GrantSubmissionReview_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<GrantSubmissionReview_On_Conflict>;
};

/** aggregate avg on columns */
export type GrantSubmissionReview_Avg_Fields = {
  __typename?: 'GrantSubmissionReview_avg_fields';
  curationVotes?: Maybe<Scalars['Float']>;
  reviewVotes?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "GrantSubmissionReview" */
export type GrantSubmissionReview_Avg_Order_By = {
  curationVotes?: InputMaybe<Order_By>;
  reviewVotes?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "GrantSubmissionReview". All fields are combined with a logical 'AND'. */
export type GrantSubmissionReview_Bool_Exp = {
  _and?: InputMaybe<Array<GrantSubmissionReview_Bool_Exp>>;
  _not?: InputMaybe<GrantSubmissionReview_Bool_Exp>;
  _or?: InputMaybe<Array<GrantSubmissionReview_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  curationVotes?: InputMaybe<Float8_Comparison_Exp>;
  feedback?: InputMaybe<String_Comparison_Exp>;
  grantSubmission?: InputMaybe<GrantSubmissions_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  reviewVotes?: InputMaybe<Int_Comparison_Exp>;
  reviewer?: InputMaybe<User_Bool_Exp>;
  reviewerId?: InputMaybe<Uuid_Comparison_Exp>;
  submissionId?: InputMaybe<Uuid_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "GrantSubmissionReview" */
export enum GrantSubmissionReview_Constraint {
  /** unique or primary key constraint */
  GrantSubmissionReviewPkey = 'GrantSubmissionReview_pkey'
}

/** input type for incrementing numeric columns in table "GrantSubmissionReview" */
export type GrantSubmissionReview_Inc_Input = {
  curationVotes?: InputMaybe<Scalars['float8']>;
  reviewVotes?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "GrantSubmissionReview" */
export type GrantSubmissionReview_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  curationVotes?: InputMaybe<Scalars['float8']>;
  feedback?: InputMaybe<Scalars['String']>;
  grantSubmission?: InputMaybe<GrantSubmissions_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  reviewVotes?: InputMaybe<Scalars['Int']>;
  reviewer?: InputMaybe<User_Obj_Rel_Insert_Input>;
  reviewerId?: InputMaybe<Scalars['uuid']>;
  submissionId?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type GrantSubmissionReview_Max_Fields = {
  __typename?: 'GrantSubmissionReview_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  curationVotes?: Maybe<Scalars['float8']>;
  feedback?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  reviewVotes?: Maybe<Scalars['Int']>;
  reviewerId?: Maybe<Scalars['uuid']>;
  submissionId?: Maybe<Scalars['uuid']>;
  type?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "GrantSubmissionReview" */
export type GrantSubmissionReview_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  curationVotes?: InputMaybe<Order_By>;
  feedback?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  reviewVotes?: InputMaybe<Order_By>;
  reviewerId?: InputMaybe<Order_By>;
  submissionId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type GrantSubmissionReview_Min_Fields = {
  __typename?: 'GrantSubmissionReview_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  curationVotes?: Maybe<Scalars['float8']>;
  feedback?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  reviewVotes?: Maybe<Scalars['Int']>;
  reviewerId?: Maybe<Scalars['uuid']>;
  submissionId?: Maybe<Scalars['uuid']>;
  type?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "GrantSubmissionReview" */
export type GrantSubmissionReview_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  curationVotes?: InputMaybe<Order_By>;
  feedback?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  reviewVotes?: InputMaybe<Order_By>;
  reviewerId?: InputMaybe<Order_By>;
  submissionId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "GrantSubmissionReview" */
export type GrantSubmissionReview_Mutation_Response = {
  __typename?: 'GrantSubmissionReview_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GrantSubmissionReview>;
};

/** on_conflict condition type for table "GrantSubmissionReview" */
export type GrantSubmissionReview_On_Conflict = {
  constraint: GrantSubmissionReview_Constraint;
  update_columns?: Array<GrantSubmissionReview_Update_Column>;
  where?: InputMaybe<GrantSubmissionReview_Bool_Exp>;
};

/** Ordering options when selecting data from "GrantSubmissionReview". */
export type GrantSubmissionReview_Order_By = {
  created_at?: InputMaybe<Order_By>;
  curationVotes?: InputMaybe<Order_By>;
  feedback?: InputMaybe<Order_By>;
  grantSubmission?: InputMaybe<GrantSubmissions_Order_By>;
  id?: InputMaybe<Order_By>;
  reviewVotes?: InputMaybe<Order_By>;
  reviewer?: InputMaybe<User_Order_By>;
  reviewerId?: InputMaybe<Order_By>;
  submissionId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: GrantSubmissionReview */
export type GrantSubmissionReview_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "GrantSubmissionReview" */
export enum GrantSubmissionReview_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurationVotes = 'curationVotes',
  /** column name */
  Feedback = 'feedback',
  /** column name */
  Id = 'id',
  /** column name */
  ReviewVotes = 'reviewVotes',
  /** column name */
  ReviewerId = 'reviewerId',
  /** column name */
  SubmissionId = 'submissionId',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "GrantSubmissionReview" */
export type GrantSubmissionReview_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  curationVotes?: InputMaybe<Scalars['float8']>;
  feedback?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  reviewVotes?: InputMaybe<Scalars['Int']>;
  reviewerId?: InputMaybe<Scalars['uuid']>;
  submissionId?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type GrantSubmissionReview_Stddev_Fields = {
  __typename?: 'GrantSubmissionReview_stddev_fields';
  curationVotes?: Maybe<Scalars['Float']>;
  reviewVotes?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "GrantSubmissionReview" */
export type GrantSubmissionReview_Stddev_Order_By = {
  curationVotes?: InputMaybe<Order_By>;
  reviewVotes?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type GrantSubmissionReview_Stddev_Pop_Fields = {
  __typename?: 'GrantSubmissionReview_stddev_pop_fields';
  curationVotes?: Maybe<Scalars['Float']>;
  reviewVotes?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "GrantSubmissionReview" */
export type GrantSubmissionReview_Stddev_Pop_Order_By = {
  curationVotes?: InputMaybe<Order_By>;
  reviewVotes?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type GrantSubmissionReview_Stddev_Samp_Fields = {
  __typename?: 'GrantSubmissionReview_stddev_samp_fields';
  curationVotes?: Maybe<Scalars['Float']>;
  reviewVotes?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "GrantSubmissionReview" */
export type GrantSubmissionReview_Stddev_Samp_Order_By = {
  curationVotes?: InputMaybe<Order_By>;
  reviewVotes?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type GrantSubmissionReview_Sum_Fields = {
  __typename?: 'GrantSubmissionReview_sum_fields';
  curationVotes?: Maybe<Scalars['float8']>;
  reviewVotes?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "GrantSubmissionReview" */
export type GrantSubmissionReview_Sum_Order_By = {
  curationVotes?: InputMaybe<Order_By>;
  reviewVotes?: InputMaybe<Order_By>;
};

/** update columns of table "GrantSubmissionReview" */
export enum GrantSubmissionReview_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurationVotes = 'curationVotes',
  /** column name */
  Feedback = 'feedback',
  /** column name */
  Id = 'id',
  /** column name */
  ReviewVotes = 'reviewVotes',
  /** column name */
  ReviewerId = 'reviewerId',
  /** column name */
  SubmissionId = 'submissionId',
  /** column name */
  Type = 'type'
}

/** aggregate var_pop on columns */
export type GrantSubmissionReview_Var_Pop_Fields = {
  __typename?: 'GrantSubmissionReview_var_pop_fields';
  curationVotes?: Maybe<Scalars['Float']>;
  reviewVotes?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "GrantSubmissionReview" */
export type GrantSubmissionReview_Var_Pop_Order_By = {
  curationVotes?: InputMaybe<Order_By>;
  reviewVotes?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type GrantSubmissionReview_Var_Samp_Fields = {
  __typename?: 'GrantSubmissionReview_var_samp_fields';
  curationVotes?: Maybe<Scalars['Float']>;
  reviewVotes?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "GrantSubmissionReview" */
export type GrantSubmissionReview_Var_Samp_Order_By = {
  curationVotes?: InputMaybe<Order_By>;
  reviewVotes?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type GrantSubmissionReview_Variance_Fields = {
  __typename?: 'GrantSubmissionReview_variance_fields';
  curationVotes?: Maybe<Scalars['Float']>;
  reviewVotes?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "GrantSubmissionReview" */
export type GrantSubmissionReview_Variance_Order_By = {
  curationVotes?: InputMaybe<Order_By>;
  reviewVotes?: InputMaybe<Order_By>;
};

/** columns and relationships of "GrantSubmissions" */
export type GrantSubmissions = {
  __typename?: 'GrantSubmissions';
  created_at: Scalars['timestamptz'];
  extraData?: Maybe<Scalars['json']>;
  /** An object relationship */
  grantCycle: GrantCycles;
  grantCycleId: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  project: Project;
  projectId: Scalars['uuid'];
  reviewState?: Maybe<Scalars['Int']>;
  /** An array relationship */
  reviews: Array<GrantSubmissionReview>;
  /** An aggregate relationship */
  reviews_aggregate: GrantSubmissionReview_Aggregate;
  status?: Maybe<Scalars['String']>;
  /** An object relationship */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['uuid']>;
};


/** columns and relationships of "GrantSubmissions" */
export type GrantSubmissionsExtraDataArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "GrantSubmissions" */
export type GrantSubmissionsReviewsArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissionReview_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantSubmissionReview_Order_By>>;
  where?: InputMaybe<GrantSubmissionReview_Bool_Exp>;
};


/** columns and relationships of "GrantSubmissions" */
export type GrantSubmissionsReviews_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissionReview_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantSubmissionReview_Order_By>>;
  where?: InputMaybe<GrantSubmissionReview_Bool_Exp>;
};

/** aggregated selection of "GrantSubmissions" */
export type GrantSubmissions_Aggregate = {
  __typename?: 'GrantSubmissions_aggregate';
  aggregate?: Maybe<GrantSubmissions_Aggregate_Fields>;
  nodes: Array<GrantSubmissions>;
};

/** aggregate fields of "GrantSubmissions" */
export type GrantSubmissions_Aggregate_Fields = {
  __typename?: 'GrantSubmissions_aggregate_fields';
  avg?: Maybe<GrantSubmissions_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<GrantSubmissions_Max_Fields>;
  min?: Maybe<GrantSubmissions_Min_Fields>;
  stddev?: Maybe<GrantSubmissions_Stddev_Fields>;
  stddev_pop?: Maybe<GrantSubmissions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<GrantSubmissions_Stddev_Samp_Fields>;
  sum?: Maybe<GrantSubmissions_Sum_Fields>;
  var_pop?: Maybe<GrantSubmissions_Var_Pop_Fields>;
  var_samp?: Maybe<GrantSubmissions_Var_Samp_Fields>;
  variance?: Maybe<GrantSubmissions_Variance_Fields>;
};


/** aggregate fields of "GrantSubmissions" */
export type GrantSubmissions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GrantSubmissions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "GrantSubmissions" */
export type GrantSubmissions_Aggregate_Order_By = {
  avg?: InputMaybe<GrantSubmissions_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<GrantSubmissions_Max_Order_By>;
  min?: InputMaybe<GrantSubmissions_Min_Order_By>;
  stddev?: InputMaybe<GrantSubmissions_Stddev_Order_By>;
  stddev_pop?: InputMaybe<GrantSubmissions_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<GrantSubmissions_Stddev_Samp_Order_By>;
  sum?: InputMaybe<GrantSubmissions_Sum_Order_By>;
  var_pop?: InputMaybe<GrantSubmissions_Var_Pop_Order_By>;
  var_samp?: InputMaybe<GrantSubmissions_Var_Samp_Order_By>;
  variance?: InputMaybe<GrantSubmissions_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "GrantSubmissions" */
export type GrantSubmissions_Arr_Rel_Insert_Input = {
  data: Array<GrantSubmissions_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<GrantSubmissions_On_Conflict>;
};

/** aggregate avg on columns */
export type GrantSubmissions_Avg_Fields = {
  __typename?: 'GrantSubmissions_avg_fields';
  reviewState?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "GrantSubmissions" */
export type GrantSubmissions_Avg_Order_By = {
  reviewState?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "GrantSubmissions". All fields are combined with a logical 'AND'. */
export type GrantSubmissions_Bool_Exp = {
  _and?: InputMaybe<Array<GrantSubmissions_Bool_Exp>>;
  _not?: InputMaybe<GrantSubmissions_Bool_Exp>;
  _or?: InputMaybe<Array<GrantSubmissions_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  extraData?: InputMaybe<Json_Comparison_Exp>;
  grantCycle?: InputMaybe<GrantCycles_Bool_Exp>;
  grantCycleId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  project?: InputMaybe<Project_Bool_Exp>;
  projectId?: InputMaybe<Uuid_Comparison_Exp>;
  reviewState?: InputMaybe<Int_Comparison_Exp>;
  reviews?: InputMaybe<GrantSubmissionReview_Bool_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "GrantSubmissions" */
export enum GrantSubmissions_Constraint {
  /** unique or primary key constraint */
  GrantSubmitionsPkey = 'GrantSubmitions_pkey'
}

/** input type for incrementing numeric columns in table "GrantSubmissions" */
export type GrantSubmissions_Inc_Input = {
  reviewState?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "GrantSubmissions" */
export type GrantSubmissions_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  extraData?: InputMaybe<Scalars['json']>;
  grantCycle?: InputMaybe<GrantCycles_Obj_Rel_Insert_Input>;
  grantCycleId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  project?: InputMaybe<Project_Obj_Rel_Insert_Input>;
  projectId?: InputMaybe<Scalars['uuid']>;
  reviewState?: InputMaybe<Scalars['Int']>;
  reviews?: InputMaybe<GrantSubmissionReview_Arr_Rel_Insert_Input>;
  status?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type GrantSubmissions_Max_Fields = {
  __typename?: 'GrantSubmissions_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  grantCycleId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  projectId?: Maybe<Scalars['uuid']>;
  reviewState?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "GrantSubmissions" */
export type GrantSubmissions_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  grantCycleId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  projectId?: InputMaybe<Order_By>;
  reviewState?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type GrantSubmissions_Min_Fields = {
  __typename?: 'GrantSubmissions_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  grantCycleId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  projectId?: Maybe<Scalars['uuid']>;
  reviewState?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "GrantSubmissions" */
export type GrantSubmissions_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  grantCycleId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  projectId?: InputMaybe<Order_By>;
  reviewState?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "GrantSubmissions" */
export type GrantSubmissions_Mutation_Response = {
  __typename?: 'GrantSubmissions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GrantSubmissions>;
};

/** input type for inserting object relation for remote table "GrantSubmissions" */
export type GrantSubmissions_Obj_Rel_Insert_Input = {
  data: GrantSubmissions_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<GrantSubmissions_On_Conflict>;
};

/** on_conflict condition type for table "GrantSubmissions" */
export type GrantSubmissions_On_Conflict = {
  constraint: GrantSubmissions_Constraint;
  update_columns?: Array<GrantSubmissions_Update_Column>;
  where?: InputMaybe<GrantSubmissions_Bool_Exp>;
};

/** Ordering options when selecting data from "GrantSubmissions". */
export type GrantSubmissions_Order_By = {
  created_at?: InputMaybe<Order_By>;
  extraData?: InputMaybe<Order_By>;
  grantCycle?: InputMaybe<GrantCycles_Order_By>;
  grantCycleId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project?: InputMaybe<Project_Order_By>;
  projectId?: InputMaybe<Order_By>;
  reviewState?: InputMaybe<Order_By>;
  reviews_aggregate?: InputMaybe<GrantSubmissionReview_Aggregate_Order_By>;
  status?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: GrantSubmissions */
export type GrantSubmissions_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "GrantSubmissions" */
export enum GrantSubmissions_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExtraData = 'extraData',
  /** column name */
  GrantCycleId = 'grantCycleId',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  ReviewState = 'reviewState',
  /** column name */
  Status = 'status',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "GrantSubmissions" */
export type GrantSubmissions_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  extraData?: InputMaybe<Scalars['json']>;
  grantCycleId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  projectId?: InputMaybe<Scalars['uuid']>;
  reviewState?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type GrantSubmissions_Stddev_Fields = {
  __typename?: 'GrantSubmissions_stddev_fields';
  reviewState?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "GrantSubmissions" */
export type GrantSubmissions_Stddev_Order_By = {
  reviewState?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type GrantSubmissions_Stddev_Pop_Fields = {
  __typename?: 'GrantSubmissions_stddev_pop_fields';
  reviewState?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "GrantSubmissions" */
export type GrantSubmissions_Stddev_Pop_Order_By = {
  reviewState?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type GrantSubmissions_Stddev_Samp_Fields = {
  __typename?: 'GrantSubmissions_stddev_samp_fields';
  reviewState?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "GrantSubmissions" */
export type GrantSubmissions_Stddev_Samp_Order_By = {
  reviewState?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type GrantSubmissions_Sum_Fields = {
  __typename?: 'GrantSubmissions_sum_fields';
  reviewState?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "GrantSubmissions" */
export type GrantSubmissions_Sum_Order_By = {
  reviewState?: InputMaybe<Order_By>;
};

/** update columns of table "GrantSubmissions" */
export enum GrantSubmissions_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExtraData = 'extraData',
  /** column name */
  GrantCycleId = 'grantCycleId',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  ReviewState = 'reviewState',
  /** column name */
  Status = 'status',
  /** column name */
  UserId = 'userId'
}

/** aggregate var_pop on columns */
export type GrantSubmissions_Var_Pop_Fields = {
  __typename?: 'GrantSubmissions_var_pop_fields';
  reviewState?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "GrantSubmissions" */
export type GrantSubmissions_Var_Pop_Order_By = {
  reviewState?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type GrantSubmissions_Var_Samp_Fields = {
  __typename?: 'GrantSubmissions_var_samp_fields';
  reviewState?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "GrantSubmissions" */
export type GrantSubmissions_Var_Samp_Order_By = {
  reviewState?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type GrantSubmissions_Variance_Fields = {
  __typename?: 'GrantSubmissions_variance_fields';
  reviewState?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "GrantSubmissions" */
export type GrantSubmissions_Variance_Order_By = {
  reviewState?: InputMaybe<Order_By>;
};

/** columns and relationships of "GrantTags" */
export type GrantTags = {
  __typename?: 'GrantTags';
  /** An array relationship */
  bridgeWithGrant: Array<GrantTagsBridge>;
  /** An aggregate relationship */
  bridgeWithGrant_aggregate: GrantTagsBridge_Aggregate;
  id: Scalars['uuid'];
  label: Scalars['String'];
  value: Scalars['String'];
};


/** columns and relationships of "GrantTags" */
export type GrantTagsBridgeWithGrantArgs = {
  distinct_on?: InputMaybe<Array<GrantTagsBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantTagsBridge_Order_By>>;
  where?: InputMaybe<GrantTagsBridge_Bool_Exp>;
};


/** columns and relationships of "GrantTags" */
export type GrantTagsBridgeWithGrant_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantTagsBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantTagsBridge_Order_By>>;
  where?: InputMaybe<GrantTagsBridge_Bool_Exp>;
};

/** columns and relationships of "GrantTagsBridge" */
export type GrantTagsBridge = {
  __typename?: 'GrantTagsBridge';
  /** An object relationship */
  grant: Grants;
  grantId: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  tag: GrantTags;
  tagId: Scalars['uuid'];
};

/** aggregated selection of "GrantTagsBridge" */
export type GrantTagsBridge_Aggregate = {
  __typename?: 'GrantTagsBridge_aggregate';
  aggregate?: Maybe<GrantTagsBridge_Aggregate_Fields>;
  nodes: Array<GrantTagsBridge>;
};

/** aggregate fields of "GrantTagsBridge" */
export type GrantTagsBridge_Aggregate_Fields = {
  __typename?: 'GrantTagsBridge_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<GrantTagsBridge_Max_Fields>;
  min?: Maybe<GrantTagsBridge_Min_Fields>;
};


/** aggregate fields of "GrantTagsBridge" */
export type GrantTagsBridge_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GrantTagsBridge_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "GrantTagsBridge" */
export type GrantTagsBridge_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<GrantTagsBridge_Max_Order_By>;
  min?: InputMaybe<GrantTagsBridge_Min_Order_By>;
};

/** input type for inserting array relation for remote table "GrantTagsBridge" */
export type GrantTagsBridge_Arr_Rel_Insert_Input = {
  data: Array<GrantTagsBridge_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<GrantTagsBridge_On_Conflict>;
};

/** Boolean expression to filter rows from the table "GrantTagsBridge". All fields are combined with a logical 'AND'. */
export type GrantTagsBridge_Bool_Exp = {
  _and?: InputMaybe<Array<GrantTagsBridge_Bool_Exp>>;
  _not?: InputMaybe<GrantTagsBridge_Bool_Exp>;
  _or?: InputMaybe<Array<GrantTagsBridge_Bool_Exp>>;
  grant?: InputMaybe<Grants_Bool_Exp>;
  grantId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  tag?: InputMaybe<GrantTags_Bool_Exp>;
  tagId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "GrantTagsBridge" */
export enum GrantTagsBridge_Constraint {
  /** unique or primary key constraint */
  GrantTagsBridgePkey = 'GrantTagsBridge_pkey'
}

/** input type for inserting data into table "GrantTagsBridge" */
export type GrantTagsBridge_Insert_Input = {
  grant?: InputMaybe<Grants_Obj_Rel_Insert_Input>;
  grantId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  tag?: InputMaybe<GrantTags_Obj_Rel_Insert_Input>;
  tagId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type GrantTagsBridge_Max_Fields = {
  __typename?: 'GrantTagsBridge_max_fields';
  grantId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  tagId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "GrantTagsBridge" */
export type GrantTagsBridge_Max_Order_By = {
  grantId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tagId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type GrantTagsBridge_Min_Fields = {
  __typename?: 'GrantTagsBridge_min_fields';
  grantId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  tagId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "GrantTagsBridge" */
export type GrantTagsBridge_Min_Order_By = {
  grantId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tagId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "GrantTagsBridge" */
export type GrantTagsBridge_Mutation_Response = {
  __typename?: 'GrantTagsBridge_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GrantTagsBridge>;
};

/** on_conflict condition type for table "GrantTagsBridge" */
export type GrantTagsBridge_On_Conflict = {
  constraint: GrantTagsBridge_Constraint;
  update_columns?: Array<GrantTagsBridge_Update_Column>;
  where?: InputMaybe<GrantTagsBridge_Bool_Exp>;
};

/** Ordering options when selecting data from "GrantTagsBridge". */
export type GrantTagsBridge_Order_By = {
  grant?: InputMaybe<Grants_Order_By>;
  grantId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tag?: InputMaybe<GrantTags_Order_By>;
  tagId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: GrantTagsBridge */
export type GrantTagsBridge_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "GrantTagsBridge" */
export enum GrantTagsBridge_Select_Column {
  /** column name */
  GrantId = 'grantId',
  /** column name */
  Id = 'id',
  /** column name */
  TagId = 'tagId'
}

/** input type for updating data in table "GrantTagsBridge" */
export type GrantTagsBridge_Set_Input = {
  grantId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  tagId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "GrantTagsBridge" */
export enum GrantTagsBridge_Update_Column {
  /** column name */
  GrantId = 'grantId',
  /** column name */
  Id = 'id',
  /** column name */
  TagId = 'tagId'
}

/** aggregated selection of "GrantTags" */
export type GrantTags_Aggregate = {
  __typename?: 'GrantTags_aggregate';
  aggregate?: Maybe<GrantTags_Aggregate_Fields>;
  nodes: Array<GrantTags>;
};

/** aggregate fields of "GrantTags" */
export type GrantTags_Aggregate_Fields = {
  __typename?: 'GrantTags_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<GrantTags_Max_Fields>;
  min?: Maybe<GrantTags_Min_Fields>;
};


/** aggregate fields of "GrantTags" */
export type GrantTags_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GrantTags_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "GrantTags". All fields are combined with a logical 'AND'. */
export type GrantTags_Bool_Exp = {
  _and?: InputMaybe<Array<GrantTags_Bool_Exp>>;
  _not?: InputMaybe<GrantTags_Bool_Exp>;
  _or?: InputMaybe<Array<GrantTags_Bool_Exp>>;
  bridgeWithGrant?: InputMaybe<GrantTagsBridge_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "GrantTags" */
export enum GrantTags_Constraint {
  /** unique or primary key constraint */
  GrantTagsPkey = 'GrantTags_pkey',
  /** unique or primary key constraint */
  GrantTagsValueKey = 'GrantTags_value_key'
}

/** input type for inserting data into table "GrantTags" */
export type GrantTags_Insert_Input = {
  bridgeWithGrant?: InputMaybe<GrantTagsBridge_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  label?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type GrantTags_Max_Fields = {
  __typename?: 'GrantTags_max_fields';
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type GrantTags_Min_Fields = {
  __typename?: 'GrantTags_min_fields';
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "GrantTags" */
export type GrantTags_Mutation_Response = {
  __typename?: 'GrantTags_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GrantTags>;
};

/** input type for inserting object relation for remote table "GrantTags" */
export type GrantTags_Obj_Rel_Insert_Input = {
  data: GrantTags_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<GrantTags_On_Conflict>;
};

/** on_conflict condition type for table "GrantTags" */
export type GrantTags_On_Conflict = {
  constraint: GrantTags_Constraint;
  update_columns?: Array<GrantTags_Update_Column>;
  where?: InputMaybe<GrantTags_Bool_Exp>;
};

/** Ordering options when selecting data from "GrantTags". */
export type GrantTags_Order_By = {
  bridgeWithGrant_aggregate?: InputMaybe<GrantTagsBridge_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: GrantTags */
export type GrantTags_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "GrantTags" */
export enum GrantTags_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "GrantTags" */
export type GrantTags_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  label?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "GrantTags" */
export enum GrantTags_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  Value = 'value'
}

/** columns and relationships of "Grants" */
export type Grants = {
  __typename?: 'Grants';
  /** An array relationship */
  Likes: Array<Likes>;
  /** An aggregate relationship */
  Likes_aggregate: Likes_Aggregate;
  allowDonations: Scalars['Boolean'];
  /** An object relationship */
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  categories: Array<GrantCategoriesBridge>;
  /** An aggregate relationship */
  categories_aggregate: GrantCategoriesBridge_Aggregate;
  created_at?: Maybe<Scalars['timestamptz']>;
  descriptiveTextFields?: Maybe<Scalars['json']>;
  externalLink?: Maybe<Scalars['String']>;
  featured?: Maybe<Scalars['Boolean']>;
  /** An array relationship */
  follows: Array<Follows>;
  /** An aggregate relationship */
  follows_aggregate: Follows_Aggregate;
  /** An array relationship */
  grantCycles: Array<GrantCycles>;
  /** An aggregate relationship */
  grantCycles_aggregate: GrantCycles_Aggregate;
  heroImage?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  length?: Maybe<Scalars['numeric']>;
  location?: Maybe<Scalars['String']>;
  /** An array relationship */
  ownersTiers: Array<GrantOwnersTiers>;
  /** An aggregate relationship */
  ownersTiers_aggregate: GrantOwnersTiers_Aggregate;
  projectSubmissionURL?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['json']>;
  sponsors?: Maybe<Scalars['json']>;
  status?: Maybe<Scalars['String']>;
  submitionType?: Maybe<Scalars['String']>;
  /** An array relationship */
  tags: Array<GrantTagsBridge>;
  /** An aggregate relationship */
  tags_aggregate: GrantTagsBridge_Aggregate;
  timezone?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  titleURL: Scalars['String'];
};


/** columns and relationships of "Grants" */
export type GrantsLikesArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};


/** columns and relationships of "Grants" */
export type GrantsLikes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};


/** columns and relationships of "Grants" */
export type GrantsCategoriesArgs = {
  distinct_on?: InputMaybe<Array<GrantCategoriesBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantCategoriesBridge_Order_By>>;
  where?: InputMaybe<GrantCategoriesBridge_Bool_Exp>;
};


/** columns and relationships of "Grants" */
export type GrantsCategories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantCategoriesBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantCategoriesBridge_Order_By>>;
  where?: InputMaybe<GrantCategoriesBridge_Bool_Exp>;
};


/** columns and relationships of "Grants" */
export type GrantsDescriptiveTextFieldsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "Grants" */
export type GrantsFollowsArgs = {
  distinct_on?: InputMaybe<Array<Follows_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Follows_Order_By>>;
  where?: InputMaybe<Follows_Bool_Exp>;
};


/** columns and relationships of "Grants" */
export type GrantsFollows_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Follows_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Follows_Order_By>>;
  where?: InputMaybe<Follows_Bool_Exp>;
};


/** columns and relationships of "Grants" */
export type GrantsGrantCyclesArgs = {
  distinct_on?: InputMaybe<Array<GrantCycles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantCycles_Order_By>>;
  where?: InputMaybe<GrantCycles_Bool_Exp>;
};


/** columns and relationships of "Grants" */
export type GrantsGrantCycles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantCycles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantCycles_Order_By>>;
  where?: InputMaybe<GrantCycles_Bool_Exp>;
};


/** columns and relationships of "Grants" */
export type GrantsOwnersTiersArgs = {
  distinct_on?: InputMaybe<Array<GrantOwnersTiers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantOwnersTiers_Order_By>>;
  where?: InputMaybe<GrantOwnersTiers_Bool_Exp>;
};


/** columns and relationships of "Grants" */
export type GrantsOwnersTiers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantOwnersTiers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantOwnersTiers_Order_By>>;
  where?: InputMaybe<GrantOwnersTiers_Bool_Exp>;
};


/** columns and relationships of "Grants" */
export type GrantsSettingsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "Grants" */
export type GrantsSponsorsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "Grants" */
export type GrantsTagsArgs = {
  distinct_on?: InputMaybe<Array<GrantTagsBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantTagsBridge_Order_By>>;
  where?: InputMaybe<GrantTagsBridge_Bool_Exp>;
};


/** columns and relationships of "Grants" */
export type GrantsTags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantTagsBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantTagsBridge_Order_By>>;
  where?: InputMaybe<GrantTagsBridge_Bool_Exp>;
};

/** aggregated selection of "Grants" */
export type Grants_Aggregate = {
  __typename?: 'Grants_aggregate';
  aggregate?: Maybe<Grants_Aggregate_Fields>;
  nodes: Array<Grants>;
};

/** aggregate fields of "Grants" */
export type Grants_Aggregate_Fields = {
  __typename?: 'Grants_aggregate_fields';
  avg?: Maybe<Grants_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Grants_Max_Fields>;
  min?: Maybe<Grants_Min_Fields>;
  stddev?: Maybe<Grants_Stddev_Fields>;
  stddev_pop?: Maybe<Grants_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Grants_Stddev_Samp_Fields>;
  sum?: Maybe<Grants_Sum_Fields>;
  var_pop?: Maybe<Grants_Var_Pop_Fields>;
  var_samp?: Maybe<Grants_Var_Samp_Fields>;
  variance?: Maybe<Grants_Variance_Fields>;
};


/** aggregate fields of "Grants" */
export type Grants_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Grants_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Grants" */
export type Grants_Aggregate_Order_By = {
  avg?: InputMaybe<Grants_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Grants_Max_Order_By>;
  min?: InputMaybe<Grants_Min_Order_By>;
  stddev?: InputMaybe<Grants_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Grants_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Grants_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Grants_Sum_Order_By>;
  var_pop?: InputMaybe<Grants_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Grants_Var_Samp_Order_By>;
  variance?: InputMaybe<Grants_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "Grants" */
export type Grants_Arr_Rel_Insert_Input = {
  data: Array<Grants_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Grants_On_Conflict>;
};

/** aggregate avg on columns */
export type Grants_Avg_Fields = {
  __typename?: 'Grants_avg_fields';
  length?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "Grants" */
export type Grants_Avg_Order_By = {
  length?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Grants". All fields are combined with a logical 'AND'. */
export type Grants_Bool_Exp = {
  Likes?: InputMaybe<Likes_Bool_Exp>;
  _and?: InputMaybe<Array<Grants_Bool_Exp>>;
  _not?: InputMaybe<Grants_Bool_Exp>;
  _or?: InputMaybe<Array<Grants_Bool_Exp>>;
  allowDonations?: InputMaybe<Boolean_Comparison_Exp>;
  author?: InputMaybe<User_Bool_Exp>;
  authorId?: InputMaybe<Uuid_Comparison_Exp>;
  categories?: InputMaybe<GrantCategoriesBridge_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  descriptiveTextFields?: InputMaybe<Json_Comparison_Exp>;
  externalLink?: InputMaybe<String_Comparison_Exp>;
  featured?: InputMaybe<Boolean_Comparison_Exp>;
  follows?: InputMaybe<Follows_Bool_Exp>;
  grantCycles?: InputMaybe<GrantCycles_Bool_Exp>;
  heroImage?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  length?: InputMaybe<Numeric_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  ownersTiers?: InputMaybe<GrantOwnersTiers_Bool_Exp>;
  projectSubmissionURL?: InputMaybe<String_Comparison_Exp>;
  settings?: InputMaybe<Json_Comparison_Exp>;
  sponsors?: InputMaybe<Json_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  submitionType?: InputMaybe<String_Comparison_Exp>;
  tags?: InputMaybe<GrantTagsBridge_Bool_Exp>;
  timezone?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  titleURL?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "Grants" */
export enum Grants_Constraint {
  /** unique or primary key constraint */
  GrantPkey = 'grant_pkey',
  /** unique or primary key constraint */
  GrantTitleUrlKey = 'grant_titleURL_key',
  /** unique or primary key constraint */
  GrantTitleKey = 'grant_title_key'
}

/** input type for incrementing numeric columns in table "Grants" */
export type Grants_Inc_Input = {
  length?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "Grants" */
export type Grants_Insert_Input = {
  Likes?: InputMaybe<Likes_Arr_Rel_Insert_Input>;
  allowDonations?: InputMaybe<Scalars['Boolean']>;
  author?: InputMaybe<User_Obj_Rel_Insert_Input>;
  authorId?: InputMaybe<Scalars['uuid']>;
  categories?: InputMaybe<GrantCategoriesBridge_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  descriptiveTextFields?: InputMaybe<Scalars['json']>;
  externalLink?: InputMaybe<Scalars['String']>;
  featured?: InputMaybe<Scalars['Boolean']>;
  follows?: InputMaybe<Follows_Arr_Rel_Insert_Input>;
  grantCycles?: InputMaybe<GrantCycles_Arr_Rel_Insert_Input>;
  heroImage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  length?: InputMaybe<Scalars['numeric']>;
  location?: InputMaybe<Scalars['String']>;
  ownersTiers?: InputMaybe<GrantOwnersTiers_Arr_Rel_Insert_Input>;
  projectSubmissionURL?: InputMaybe<Scalars['String']>;
  settings?: InputMaybe<Scalars['json']>;
  sponsors?: InputMaybe<Scalars['json']>;
  status?: InputMaybe<Scalars['String']>;
  submitionType?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<GrantTagsBridge_Arr_Rel_Insert_Input>;
  timezone?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  titleURL?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Grants_Max_Fields = {
  __typename?: 'Grants_max_fields';
  authorId?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  externalLink?: Maybe<Scalars['String']>;
  heroImage?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  length?: Maybe<Scalars['numeric']>;
  location?: Maybe<Scalars['String']>;
  projectSubmissionURL?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  submitionType?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  titleURL?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "Grants" */
export type Grants_Max_Order_By = {
  authorId?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  externalLink?: InputMaybe<Order_By>;
  heroImage?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  length?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  projectSubmissionURL?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  submitionType?: InputMaybe<Order_By>;
  timezone?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  titleURL?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Grants_Min_Fields = {
  __typename?: 'Grants_min_fields';
  authorId?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  externalLink?: Maybe<Scalars['String']>;
  heroImage?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  length?: Maybe<Scalars['numeric']>;
  location?: Maybe<Scalars['String']>;
  projectSubmissionURL?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  submitionType?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  titleURL?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "Grants" */
export type Grants_Min_Order_By = {
  authorId?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  externalLink?: InputMaybe<Order_By>;
  heroImage?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  length?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  projectSubmissionURL?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  submitionType?: InputMaybe<Order_By>;
  timezone?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  titleURL?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "Grants" */
export type Grants_Mutation_Response = {
  __typename?: 'Grants_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Grants>;
};

/** input type for inserting object relation for remote table "Grants" */
export type Grants_Obj_Rel_Insert_Input = {
  data: Grants_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Grants_On_Conflict>;
};

/** on_conflict condition type for table "Grants" */
export type Grants_On_Conflict = {
  constraint: Grants_Constraint;
  update_columns?: Array<Grants_Update_Column>;
  where?: InputMaybe<Grants_Bool_Exp>;
};

/** Ordering options when selecting data from "Grants". */
export type Grants_Order_By = {
  Likes_aggregate?: InputMaybe<Likes_Aggregate_Order_By>;
  allowDonations?: InputMaybe<Order_By>;
  author?: InputMaybe<User_Order_By>;
  authorId?: InputMaybe<Order_By>;
  categories_aggregate?: InputMaybe<GrantCategoriesBridge_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  descriptiveTextFields?: InputMaybe<Order_By>;
  externalLink?: InputMaybe<Order_By>;
  featured?: InputMaybe<Order_By>;
  follows_aggregate?: InputMaybe<Follows_Aggregate_Order_By>;
  grantCycles_aggregate?: InputMaybe<GrantCycles_Aggregate_Order_By>;
  heroImage?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  length?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  ownersTiers_aggregate?: InputMaybe<GrantOwnersTiers_Aggregate_Order_By>;
  projectSubmissionURL?: InputMaybe<Order_By>;
  settings?: InputMaybe<Order_By>;
  sponsors?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  submitionType?: InputMaybe<Order_By>;
  tags_aggregate?: InputMaybe<GrantTagsBridge_Aggregate_Order_By>;
  timezone?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  titleURL?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Grants */
export type Grants_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Grants" */
export enum Grants_Select_Column {
  /** column name */
  AllowDonations = 'allowDonations',
  /** column name */
  AuthorId = 'authorId',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DescriptiveTextFields = 'descriptiveTextFields',
  /** column name */
  ExternalLink = 'externalLink',
  /** column name */
  Featured = 'featured',
  /** column name */
  HeroImage = 'heroImage',
  /** column name */
  Id = 'id',
  /** column name */
  Length = 'length',
  /** column name */
  Location = 'location',
  /** column name */
  ProjectSubmissionUrl = 'projectSubmissionURL',
  /** column name */
  Settings = 'settings',
  /** column name */
  Sponsors = 'sponsors',
  /** column name */
  Status = 'status',
  /** column name */
  SubmitionType = 'submitionType',
  /** column name */
  Timezone = 'timezone',
  /** column name */
  Title = 'title',
  /** column name */
  TitleUrl = 'titleURL'
}

/** input type for updating data in table "Grants" */
export type Grants_Set_Input = {
  allowDonations?: InputMaybe<Scalars['Boolean']>;
  authorId?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  descriptiveTextFields?: InputMaybe<Scalars['json']>;
  externalLink?: InputMaybe<Scalars['String']>;
  featured?: InputMaybe<Scalars['Boolean']>;
  heroImage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  length?: InputMaybe<Scalars['numeric']>;
  location?: InputMaybe<Scalars['String']>;
  projectSubmissionURL?: InputMaybe<Scalars['String']>;
  settings?: InputMaybe<Scalars['json']>;
  sponsors?: InputMaybe<Scalars['json']>;
  status?: InputMaybe<Scalars['String']>;
  submitionType?: InputMaybe<Scalars['String']>;
  timezone?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  titleURL?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Grants_Stddev_Fields = {
  __typename?: 'Grants_stddev_fields';
  length?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "Grants" */
export type Grants_Stddev_Order_By = {
  length?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Grants_Stddev_Pop_Fields = {
  __typename?: 'Grants_stddev_pop_fields';
  length?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "Grants" */
export type Grants_Stddev_Pop_Order_By = {
  length?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Grants_Stddev_Samp_Fields = {
  __typename?: 'Grants_stddev_samp_fields';
  length?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "Grants" */
export type Grants_Stddev_Samp_Order_By = {
  length?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Grants_Sum_Fields = {
  __typename?: 'Grants_sum_fields';
  length?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "Grants" */
export type Grants_Sum_Order_By = {
  length?: InputMaybe<Order_By>;
};

/** update columns of table "Grants" */
export enum Grants_Update_Column {
  /** column name */
  AllowDonations = 'allowDonations',
  /** column name */
  AuthorId = 'authorId',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DescriptiveTextFields = 'descriptiveTextFields',
  /** column name */
  ExternalLink = 'externalLink',
  /** column name */
  Featured = 'featured',
  /** column name */
  HeroImage = 'heroImage',
  /** column name */
  Id = 'id',
  /** column name */
  Length = 'length',
  /** column name */
  Location = 'location',
  /** column name */
  ProjectSubmissionUrl = 'projectSubmissionURL',
  /** column name */
  Settings = 'settings',
  /** column name */
  Sponsors = 'sponsors',
  /** column name */
  Status = 'status',
  /** column name */
  SubmitionType = 'submitionType',
  /** column name */
  Timezone = 'timezone',
  /** column name */
  Title = 'title',
  /** column name */
  TitleUrl = 'titleURL'
}

/** aggregate var_pop on columns */
export type Grants_Var_Pop_Fields = {
  __typename?: 'Grants_var_pop_fields';
  length?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "Grants" */
export type Grants_Var_Pop_Order_By = {
  length?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Grants_Var_Samp_Fields = {
  __typename?: 'Grants_var_samp_fields';
  length?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "Grants" */
export type Grants_Var_Samp_Order_By = {
  length?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Grants_Variance_Fields = {
  __typename?: 'Grants_variance_fields';
  length?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "Grants" */
export type Grants_Variance_Order_By = {
  length?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** columns and relationships of "Likes" */
export type Likes = {
  __typename?: 'Likes';
  /** An object relationship */
  Grant?: Maybe<Grants>;
  /** An object relationship */
  Project?: Maybe<Project>;
  /** An object relationship */
  User: User;
  fromUserId: Scalars['uuid'];
  id: Scalars['uuid'];
  toGrantId?: Maybe<Scalars['uuid']>;
  toProjectId?: Maybe<Scalars['uuid']>;
  toUserId?: Maybe<Scalars['uuid']>;
  type: Scalars['String'];
  /** An object relationship */
  userByTouserid?: Maybe<User>;
};

/** aggregated selection of "Likes" */
export type Likes_Aggregate = {
  __typename?: 'Likes_aggregate';
  aggregate?: Maybe<Likes_Aggregate_Fields>;
  nodes: Array<Likes>;
};

/** aggregate fields of "Likes" */
export type Likes_Aggregate_Fields = {
  __typename?: 'Likes_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Likes_Max_Fields>;
  min?: Maybe<Likes_Min_Fields>;
};


/** aggregate fields of "Likes" */
export type Likes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Likes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Likes" */
export type Likes_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Likes_Max_Order_By>;
  min?: InputMaybe<Likes_Min_Order_By>;
};

/** input type for inserting array relation for remote table "Likes" */
export type Likes_Arr_Rel_Insert_Input = {
  data: Array<Likes_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Likes_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Likes". All fields are combined with a logical 'AND'. */
export type Likes_Bool_Exp = {
  Grant?: InputMaybe<Grants_Bool_Exp>;
  Project?: InputMaybe<Project_Bool_Exp>;
  User?: InputMaybe<User_Bool_Exp>;
  _and?: InputMaybe<Array<Likes_Bool_Exp>>;
  _not?: InputMaybe<Likes_Bool_Exp>;
  _or?: InputMaybe<Array<Likes_Bool_Exp>>;
  fromUserId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  toGrantId?: InputMaybe<Uuid_Comparison_Exp>;
  toProjectId?: InputMaybe<Uuid_Comparison_Exp>;
  toUserId?: InputMaybe<Uuid_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  userByTouserid?: InputMaybe<User_Bool_Exp>;
};

/** unique or primary key constraints on table "Likes" */
export enum Likes_Constraint {
  /** unique or primary key constraint */
  LikesPkey = 'Likes_pkey'
}

/** input type for inserting data into table "Likes" */
export type Likes_Insert_Input = {
  Grant?: InputMaybe<Grants_Obj_Rel_Insert_Input>;
  Project?: InputMaybe<Project_Obj_Rel_Insert_Input>;
  User?: InputMaybe<User_Obj_Rel_Insert_Input>;
  fromUserId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  toGrantId?: InputMaybe<Scalars['uuid']>;
  toProjectId?: InputMaybe<Scalars['uuid']>;
  toUserId?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Scalars['String']>;
  userByTouserid?: InputMaybe<User_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Likes_Max_Fields = {
  __typename?: 'Likes_max_fields';
  fromUserId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  toGrantId?: Maybe<Scalars['uuid']>;
  toProjectId?: Maybe<Scalars['uuid']>;
  toUserId?: Maybe<Scalars['uuid']>;
  type?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "Likes" */
export type Likes_Max_Order_By = {
  fromUserId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  toGrantId?: InputMaybe<Order_By>;
  toProjectId?: InputMaybe<Order_By>;
  toUserId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Likes_Min_Fields = {
  __typename?: 'Likes_min_fields';
  fromUserId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  toGrantId?: Maybe<Scalars['uuid']>;
  toProjectId?: Maybe<Scalars['uuid']>;
  toUserId?: Maybe<Scalars['uuid']>;
  type?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "Likes" */
export type Likes_Min_Order_By = {
  fromUserId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  toGrantId?: InputMaybe<Order_By>;
  toProjectId?: InputMaybe<Order_By>;
  toUserId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "Likes" */
export type Likes_Mutation_Response = {
  __typename?: 'Likes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Likes>;
};

/** on_conflict condition type for table "Likes" */
export type Likes_On_Conflict = {
  constraint: Likes_Constraint;
  update_columns?: Array<Likes_Update_Column>;
  where?: InputMaybe<Likes_Bool_Exp>;
};

/** Ordering options when selecting data from "Likes". */
export type Likes_Order_By = {
  Grant?: InputMaybe<Grants_Order_By>;
  Project?: InputMaybe<Project_Order_By>;
  User?: InputMaybe<User_Order_By>;
  fromUserId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  toGrantId?: InputMaybe<Order_By>;
  toProjectId?: InputMaybe<Order_By>;
  toUserId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  userByTouserid?: InputMaybe<User_Order_By>;
};

/** primary key columns input for table: Likes */
export type Likes_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Likes" */
export enum Likes_Select_Column {
  /** column name */
  FromUserId = 'fromUserId',
  /** column name */
  Id = 'id',
  /** column name */
  ToGrantId = 'toGrantId',
  /** column name */
  ToProjectId = 'toProjectId',
  /** column name */
  ToUserId = 'toUserId',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "Likes" */
export type Likes_Set_Input = {
  fromUserId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  toGrantId?: InputMaybe<Scalars['uuid']>;
  toProjectId?: InputMaybe<Scalars['uuid']>;
  toUserId?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Scalars['String']>;
};

/** update columns of table "Likes" */
export enum Likes_Update_Column {
  /** column name */
  FromUserId = 'fromUserId',
  /** column name */
  Id = 'id',
  /** column name */
  ToGrantId = 'toGrantId',
  /** column name */
  ToProjectId = 'toProjectId',
  /** column name */
  ToUserId = 'toUserId',
  /** column name */
  Type = 'type'
}

/** columns and relationships of "Project" */
export type Project = {
  __typename?: 'Project';
  /** An array relationship */
  GrantSubmitions: Array<GrantSubmissions>;
  /** An aggregate relationship */
  GrantSubmitions_aggregate: GrantSubmissions_Aggregate;
  /** An array relationship */
  Likes: Array<Likes>;
  /** An aggregate relationship */
  Likes_aggregate: Likes_Aggregate;
  /** An object relationship */
  ProjectTagBridge?: Maybe<ProjectTag>;
  activityId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  author?: Maybe<User>;
  author_id?: Maybe<Scalars['uuid']>;
  category?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  currentInvested?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  displayType?: Maybe<Scalars['String']>;
  featured: Scalars['Boolean'];
  gallery?: Maybe<Scalars['json']>;
  hideBudget?: Maybe<Scalars['Boolean']>;
  id: Scalars['uuid'];
  imageUrl?: Maybe<Scalars['String']>;
  /** An array relationship */
  members: Array<ProjectMembers>;
  /** An aggregate relationship */
  members_aggregate: ProjectMembers_Aggregate;
  onChainId?: Maybe<Scalars['Int']>;
  pitchDeck?: Maybe<Scalars['String']>;
  /** An array relationship */
  projectTags: Array<ProjectTagsBridge>;
  /** An aggregate relationship */
  projectTags_aggregate: ProjectTagsBridge_Aggregate;
  /** An array relationship */
  projectTypes: Array<ProjectTypeBridge>;
  /** An aggregate relationship */
  projectTypes_aggregate: ProjectTypeBridge_Aggregate;
  subdescription?: Maybe<Scalars['String']>;
  tagBridgeId?: Maybe<Scalars['uuid']>;
  title: Scalars['String'];
  titleURL: Scalars['String'];
  totalInvested?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  videoHeroImg?: Maybe<Scalars['String']>;
  videoOverview?: Maybe<Scalars['String']>;
};


/** columns and relationships of "Project" */
export type ProjectGrantSubmitionsArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantSubmissions_Order_By>>;
  where?: InputMaybe<GrantSubmissions_Bool_Exp>;
};


/** columns and relationships of "Project" */
export type ProjectGrantSubmitions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantSubmissions_Order_By>>;
  where?: InputMaybe<GrantSubmissions_Bool_Exp>;
};


/** columns and relationships of "Project" */
export type ProjectLikesArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};


/** columns and relationships of "Project" */
export type ProjectLikes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};


/** columns and relationships of "Project" */
export type ProjectGalleryArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "Project" */
export type ProjectMembersArgs = {
  distinct_on?: InputMaybe<Array<ProjectMembers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectMembers_Order_By>>;
  where?: InputMaybe<ProjectMembers_Bool_Exp>;
};


/** columns and relationships of "Project" */
export type ProjectMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectMembers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectMembers_Order_By>>;
  where?: InputMaybe<ProjectMembers_Bool_Exp>;
};


/** columns and relationships of "Project" */
export type ProjectProjectTagsArgs = {
  distinct_on?: InputMaybe<Array<ProjectTagsBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectTagsBridge_Order_By>>;
  where?: InputMaybe<ProjectTagsBridge_Bool_Exp>;
};


/** columns and relationships of "Project" */
export type ProjectProjectTags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectTagsBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectTagsBridge_Order_By>>;
  where?: InputMaybe<ProjectTagsBridge_Bool_Exp>;
};


/** columns and relationships of "Project" */
export type ProjectProjectTypesArgs = {
  distinct_on?: InputMaybe<Array<ProjectTypeBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectTypeBridge_Order_By>>;
  where?: InputMaybe<ProjectTypeBridge_Bool_Exp>;
};


/** columns and relationships of "Project" */
export type ProjectProjectTypes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectTypeBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectTypeBridge_Order_By>>;
  where?: InputMaybe<ProjectTypeBridge_Bool_Exp>;
};

/** columns and relationships of "ProjectMembers" */
export type ProjectMembers = {
  __typename?: 'ProjectMembers';
  admin: Scalars['Boolean'];
  created_at?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  /** An object relationship */
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['uuid']>;
  role: Scalars['String'];
  titleonproject: Scalars['String'];
  /** An object relationship */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "ProjectMembers" */
export type ProjectMembers_Aggregate = {
  __typename?: 'ProjectMembers_aggregate';
  aggregate?: Maybe<ProjectMembers_Aggregate_Fields>;
  nodes: Array<ProjectMembers>;
};

/** aggregate fields of "ProjectMembers" */
export type ProjectMembers_Aggregate_Fields = {
  __typename?: 'ProjectMembers_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<ProjectMembers_Max_Fields>;
  min?: Maybe<ProjectMembers_Min_Fields>;
};


/** aggregate fields of "ProjectMembers" */
export type ProjectMembers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ProjectMembers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "ProjectMembers" */
export type ProjectMembers_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ProjectMembers_Max_Order_By>;
  min?: InputMaybe<ProjectMembers_Min_Order_By>;
};

/** input type for inserting array relation for remote table "ProjectMembers" */
export type ProjectMembers_Arr_Rel_Insert_Input = {
  data: Array<ProjectMembers_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ProjectMembers_On_Conflict>;
};

/** Boolean expression to filter rows from the table "ProjectMembers". All fields are combined with a logical 'AND'. */
export type ProjectMembers_Bool_Exp = {
  _and?: InputMaybe<Array<ProjectMembers_Bool_Exp>>;
  _not?: InputMaybe<ProjectMembers_Bool_Exp>;
  _or?: InputMaybe<Array<ProjectMembers_Bool_Exp>>;
  admin?: InputMaybe<Boolean_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  project?: InputMaybe<Project_Bool_Exp>;
  projectId?: InputMaybe<Uuid_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  titleonproject?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "ProjectMembers" */
export enum ProjectMembers_Constraint {
  /** unique or primary key constraint */
  ProjectMembersPkey = 'ProjectMembers_pkey'
}

/** input type for inserting data into table "ProjectMembers" */
export type ProjectMembers_Insert_Input = {
  admin?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  project?: InputMaybe<Project_Obj_Rel_Insert_Input>;
  projectId?: InputMaybe<Scalars['uuid']>;
  role?: InputMaybe<Scalars['String']>;
  titleonproject?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type ProjectMembers_Max_Fields = {
  __typename?: 'ProjectMembers_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  projectId?: Maybe<Scalars['uuid']>;
  role?: Maybe<Scalars['String']>;
  titleonproject?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "ProjectMembers" */
export type ProjectMembers_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  projectId?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  titleonproject?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ProjectMembers_Min_Fields = {
  __typename?: 'ProjectMembers_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  projectId?: Maybe<Scalars['uuid']>;
  role?: Maybe<Scalars['String']>;
  titleonproject?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "ProjectMembers" */
export type ProjectMembers_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  projectId?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  titleonproject?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "ProjectMembers" */
export type ProjectMembers_Mutation_Response = {
  __typename?: 'ProjectMembers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ProjectMembers>;
};

/** on_conflict condition type for table "ProjectMembers" */
export type ProjectMembers_On_Conflict = {
  constraint: ProjectMembers_Constraint;
  update_columns?: Array<ProjectMembers_Update_Column>;
  where?: InputMaybe<ProjectMembers_Bool_Exp>;
};

/** Ordering options when selecting data from "ProjectMembers". */
export type ProjectMembers_Order_By = {
  admin?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project?: InputMaybe<Project_Order_By>;
  projectId?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  titleonproject?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: ProjectMembers */
export type ProjectMembers_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "ProjectMembers" */
export enum ProjectMembers_Select_Column {
  /** column name */
  Admin = 'admin',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  Role = 'role',
  /** column name */
  Titleonproject = 'titleonproject',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "ProjectMembers" */
export type ProjectMembers_Set_Input = {
  admin?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  projectId?: InputMaybe<Scalars['uuid']>;
  role?: InputMaybe<Scalars['String']>;
  titleonproject?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "ProjectMembers" */
export enum ProjectMembers_Update_Column {
  /** column name */
  Admin = 'admin',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  Role = 'role',
  /** column name */
  Titleonproject = 'titleonproject',
  /** column name */
  UserId = 'userId'
}

/** columns and relationships of "ProjectTag" */
export type ProjectTag = {
  __typename?: 'ProjectTag';
  /** An array relationship */
  Projects: Array<Project>;
  /** An aggregate relationship */
  Projects_aggregate: Project_Aggregate;
  id: Scalars['uuid'];
  label: Scalars['String'];
  /** An array relationship */
  projectTags: Array<ProjectTagsBridge>;
  /** An aggregate relationship */
  projectTags_aggregate: ProjectTagsBridge_Aggregate;
  value: Scalars['String'];
};


/** columns and relationships of "ProjectTag" */
export type ProjectTagProjectsArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Order_By>>;
  where?: InputMaybe<Project_Bool_Exp>;
};


/** columns and relationships of "ProjectTag" */
export type ProjectTagProjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Order_By>>;
  where?: InputMaybe<Project_Bool_Exp>;
};


/** columns and relationships of "ProjectTag" */
export type ProjectTagProjectTagsArgs = {
  distinct_on?: InputMaybe<Array<ProjectTagsBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectTagsBridge_Order_By>>;
  where?: InputMaybe<ProjectTagsBridge_Bool_Exp>;
};


/** columns and relationships of "ProjectTag" */
export type ProjectTagProjectTags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectTagsBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectTagsBridge_Order_By>>;
  where?: InputMaybe<ProjectTagsBridge_Bool_Exp>;
};

/** aggregated selection of "ProjectTag" */
export type ProjectTag_Aggregate = {
  __typename?: 'ProjectTag_aggregate';
  aggregate?: Maybe<ProjectTag_Aggregate_Fields>;
  nodes: Array<ProjectTag>;
};

/** aggregate fields of "ProjectTag" */
export type ProjectTag_Aggregate_Fields = {
  __typename?: 'ProjectTag_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<ProjectTag_Max_Fields>;
  min?: Maybe<ProjectTag_Min_Fields>;
};


/** aggregate fields of "ProjectTag" */
export type ProjectTag_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ProjectTag_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "ProjectTag". All fields are combined with a logical 'AND'. */
export type ProjectTag_Bool_Exp = {
  Projects?: InputMaybe<Project_Bool_Exp>;
  _and?: InputMaybe<Array<ProjectTag_Bool_Exp>>;
  _not?: InputMaybe<ProjectTag_Bool_Exp>;
  _or?: InputMaybe<Array<ProjectTag_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
  projectTags?: InputMaybe<ProjectTagsBridge_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "ProjectTag" */
export enum ProjectTag_Constraint {
  /** unique or primary key constraint */
  ProjectTagPkey = 'ProjectTag_pkey',
  /** unique or primary key constraint */
  ProjectTagValueKey = 'ProjectTag_value_key'
}

/** input type for inserting data into table "ProjectTag" */
export type ProjectTag_Insert_Input = {
  Projects?: InputMaybe<Project_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  label?: InputMaybe<Scalars['String']>;
  projectTags?: InputMaybe<ProjectTagsBridge_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type ProjectTag_Max_Fields = {
  __typename?: 'ProjectTag_max_fields';
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type ProjectTag_Min_Fields = {
  __typename?: 'ProjectTag_min_fields';
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "ProjectTag" */
export type ProjectTag_Mutation_Response = {
  __typename?: 'ProjectTag_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ProjectTag>;
};

/** input type for inserting object relation for remote table "ProjectTag" */
export type ProjectTag_Obj_Rel_Insert_Input = {
  data: ProjectTag_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<ProjectTag_On_Conflict>;
};

/** on_conflict condition type for table "ProjectTag" */
export type ProjectTag_On_Conflict = {
  constraint: ProjectTag_Constraint;
  update_columns?: Array<ProjectTag_Update_Column>;
  where?: InputMaybe<ProjectTag_Bool_Exp>;
};

/** Ordering options when selecting data from "ProjectTag". */
export type ProjectTag_Order_By = {
  Projects_aggregate?: InputMaybe<Project_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  projectTags_aggregate?: InputMaybe<ProjectTagsBridge_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: ProjectTag */
export type ProjectTag_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "ProjectTag" */
export enum ProjectTag_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "ProjectTag" */
export type ProjectTag_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  label?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "ProjectTag" */
export enum ProjectTag_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  Value = 'value'
}

/** columns and relationships of "ProjectTagsBridge" */
export type ProjectTagsBridge = {
  __typename?: 'ProjectTagsBridge';
  id: Scalars['uuid'];
  /** An object relationship */
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  tag?: Maybe<ProjectTag>;
  tagId?: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "ProjectTagsBridge" */
export type ProjectTagsBridge_Aggregate = {
  __typename?: 'ProjectTagsBridge_aggregate';
  aggregate?: Maybe<ProjectTagsBridge_Aggregate_Fields>;
  nodes: Array<ProjectTagsBridge>;
};

/** aggregate fields of "ProjectTagsBridge" */
export type ProjectTagsBridge_Aggregate_Fields = {
  __typename?: 'ProjectTagsBridge_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<ProjectTagsBridge_Max_Fields>;
  min?: Maybe<ProjectTagsBridge_Min_Fields>;
};


/** aggregate fields of "ProjectTagsBridge" */
export type ProjectTagsBridge_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ProjectTagsBridge_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "ProjectTagsBridge" */
export type ProjectTagsBridge_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ProjectTagsBridge_Max_Order_By>;
  min?: InputMaybe<ProjectTagsBridge_Min_Order_By>;
};

/** input type for inserting array relation for remote table "ProjectTagsBridge" */
export type ProjectTagsBridge_Arr_Rel_Insert_Input = {
  data: Array<ProjectTagsBridge_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ProjectTagsBridge_On_Conflict>;
};

/** Boolean expression to filter rows from the table "ProjectTagsBridge". All fields are combined with a logical 'AND'. */
export type ProjectTagsBridge_Bool_Exp = {
  _and?: InputMaybe<Array<ProjectTagsBridge_Bool_Exp>>;
  _not?: InputMaybe<ProjectTagsBridge_Bool_Exp>;
  _or?: InputMaybe<Array<ProjectTagsBridge_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  project?: InputMaybe<Project_Bool_Exp>;
  projectId?: InputMaybe<Uuid_Comparison_Exp>;
  tag?: InputMaybe<ProjectTag_Bool_Exp>;
  tagId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "ProjectTagsBridge" */
export enum ProjectTagsBridge_Constraint {
  /** unique or primary key constraint */
  ProjectTagsBridgePkey = 'ProjectTagsBridge_pkey'
}

/** input type for inserting data into table "ProjectTagsBridge" */
export type ProjectTagsBridge_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  project?: InputMaybe<Project_Obj_Rel_Insert_Input>;
  projectId?: InputMaybe<Scalars['uuid']>;
  tag?: InputMaybe<ProjectTag_Obj_Rel_Insert_Input>;
  tagId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type ProjectTagsBridge_Max_Fields = {
  __typename?: 'ProjectTagsBridge_max_fields';
  id?: Maybe<Scalars['uuid']>;
  projectId?: Maybe<Scalars['uuid']>;
  tagId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "ProjectTagsBridge" */
export type ProjectTagsBridge_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  projectId?: InputMaybe<Order_By>;
  tagId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ProjectTagsBridge_Min_Fields = {
  __typename?: 'ProjectTagsBridge_min_fields';
  id?: Maybe<Scalars['uuid']>;
  projectId?: Maybe<Scalars['uuid']>;
  tagId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "ProjectTagsBridge" */
export type ProjectTagsBridge_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  projectId?: InputMaybe<Order_By>;
  tagId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "ProjectTagsBridge" */
export type ProjectTagsBridge_Mutation_Response = {
  __typename?: 'ProjectTagsBridge_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ProjectTagsBridge>;
};

/** on_conflict condition type for table "ProjectTagsBridge" */
export type ProjectTagsBridge_On_Conflict = {
  constraint: ProjectTagsBridge_Constraint;
  update_columns?: Array<ProjectTagsBridge_Update_Column>;
  where?: InputMaybe<ProjectTagsBridge_Bool_Exp>;
};

/** Ordering options when selecting data from "ProjectTagsBridge". */
export type ProjectTagsBridge_Order_By = {
  id?: InputMaybe<Order_By>;
  project?: InputMaybe<Project_Order_By>;
  projectId?: InputMaybe<Order_By>;
  tag?: InputMaybe<ProjectTag_Order_By>;
  tagId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: ProjectTagsBridge */
export type ProjectTagsBridge_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "ProjectTagsBridge" */
export enum ProjectTagsBridge_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  TagId = 'tagId'
}

/** input type for updating data in table "ProjectTagsBridge" */
export type ProjectTagsBridge_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  projectId?: InputMaybe<Scalars['uuid']>;
  tagId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "ProjectTagsBridge" */
export enum ProjectTagsBridge_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  TagId = 'tagId'
}

/** columns and relationships of "ProjectType" */
export type ProjectType = {
  __typename?: 'ProjectType';
  /** An array relationship */
  ProjectType: Array<ProjectTypeBridge>;
  /** An aggregate relationship */
  ProjectType_aggregate: ProjectTypeBridge_Aggregate;
  id: Scalars['uuid'];
  label: Scalars['String'];
  value: Scalars['String'];
};


/** columns and relationships of "ProjectType" */
export type ProjectTypeProjectTypeArgs = {
  distinct_on?: InputMaybe<Array<ProjectTypeBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectTypeBridge_Order_By>>;
  where?: InputMaybe<ProjectTypeBridge_Bool_Exp>;
};


/** columns and relationships of "ProjectType" */
export type ProjectTypeProjectType_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectTypeBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectTypeBridge_Order_By>>;
  where?: InputMaybe<ProjectTypeBridge_Bool_Exp>;
};

/** columns and relationships of "ProjectTypeBridge" */
export type ProjectTypeBridge = {
  __typename?: 'ProjectTypeBridge';
  id: Scalars['uuid'];
  /** An object relationship */
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  type?: Maybe<ProjectType>;
  typeId?: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "ProjectTypeBridge" */
export type ProjectTypeBridge_Aggregate = {
  __typename?: 'ProjectTypeBridge_aggregate';
  aggregate?: Maybe<ProjectTypeBridge_Aggregate_Fields>;
  nodes: Array<ProjectTypeBridge>;
};

/** aggregate fields of "ProjectTypeBridge" */
export type ProjectTypeBridge_Aggregate_Fields = {
  __typename?: 'ProjectTypeBridge_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<ProjectTypeBridge_Max_Fields>;
  min?: Maybe<ProjectTypeBridge_Min_Fields>;
};


/** aggregate fields of "ProjectTypeBridge" */
export type ProjectTypeBridge_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ProjectTypeBridge_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "ProjectTypeBridge" */
export type ProjectTypeBridge_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ProjectTypeBridge_Max_Order_By>;
  min?: InputMaybe<ProjectTypeBridge_Min_Order_By>;
};

/** input type for inserting array relation for remote table "ProjectTypeBridge" */
export type ProjectTypeBridge_Arr_Rel_Insert_Input = {
  data: Array<ProjectTypeBridge_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ProjectTypeBridge_On_Conflict>;
};

/** Boolean expression to filter rows from the table "ProjectTypeBridge". All fields are combined with a logical 'AND'. */
export type ProjectTypeBridge_Bool_Exp = {
  _and?: InputMaybe<Array<ProjectTypeBridge_Bool_Exp>>;
  _not?: InputMaybe<ProjectTypeBridge_Bool_Exp>;
  _or?: InputMaybe<Array<ProjectTypeBridge_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  project?: InputMaybe<Project_Bool_Exp>;
  projectId?: InputMaybe<Uuid_Comparison_Exp>;
  type?: InputMaybe<ProjectType_Bool_Exp>;
  typeId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "ProjectTypeBridge" */
export enum ProjectTypeBridge_Constraint {
  /** unique or primary key constraint */
  ProjectTypeBridgePkey = 'ProjectTypeBridge_pkey'
}

/** input type for inserting data into table "ProjectTypeBridge" */
export type ProjectTypeBridge_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  project?: InputMaybe<Project_Obj_Rel_Insert_Input>;
  projectId?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<ProjectType_Obj_Rel_Insert_Input>;
  typeId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type ProjectTypeBridge_Max_Fields = {
  __typename?: 'ProjectTypeBridge_max_fields';
  id?: Maybe<Scalars['uuid']>;
  projectId?: Maybe<Scalars['uuid']>;
  typeId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "ProjectTypeBridge" */
export type ProjectTypeBridge_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  projectId?: InputMaybe<Order_By>;
  typeId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ProjectTypeBridge_Min_Fields = {
  __typename?: 'ProjectTypeBridge_min_fields';
  id?: Maybe<Scalars['uuid']>;
  projectId?: Maybe<Scalars['uuid']>;
  typeId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "ProjectTypeBridge" */
export type ProjectTypeBridge_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  projectId?: InputMaybe<Order_By>;
  typeId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "ProjectTypeBridge" */
export type ProjectTypeBridge_Mutation_Response = {
  __typename?: 'ProjectTypeBridge_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ProjectTypeBridge>;
};

/** on_conflict condition type for table "ProjectTypeBridge" */
export type ProjectTypeBridge_On_Conflict = {
  constraint: ProjectTypeBridge_Constraint;
  update_columns?: Array<ProjectTypeBridge_Update_Column>;
  where?: InputMaybe<ProjectTypeBridge_Bool_Exp>;
};

/** Ordering options when selecting data from "ProjectTypeBridge". */
export type ProjectTypeBridge_Order_By = {
  id?: InputMaybe<Order_By>;
  project?: InputMaybe<Project_Order_By>;
  projectId?: InputMaybe<Order_By>;
  type?: InputMaybe<ProjectType_Order_By>;
  typeId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: ProjectTypeBridge */
export type ProjectTypeBridge_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "ProjectTypeBridge" */
export enum ProjectTypeBridge_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  TypeId = 'typeId'
}

/** input type for updating data in table "ProjectTypeBridge" */
export type ProjectTypeBridge_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  projectId?: InputMaybe<Scalars['uuid']>;
  typeId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "ProjectTypeBridge" */
export enum ProjectTypeBridge_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  TypeId = 'typeId'
}

/** aggregated selection of "ProjectType" */
export type ProjectType_Aggregate = {
  __typename?: 'ProjectType_aggregate';
  aggregate?: Maybe<ProjectType_Aggregate_Fields>;
  nodes: Array<ProjectType>;
};

/** aggregate fields of "ProjectType" */
export type ProjectType_Aggregate_Fields = {
  __typename?: 'ProjectType_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<ProjectType_Max_Fields>;
  min?: Maybe<ProjectType_Min_Fields>;
};


/** aggregate fields of "ProjectType" */
export type ProjectType_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ProjectType_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "ProjectType". All fields are combined with a logical 'AND'. */
export type ProjectType_Bool_Exp = {
  ProjectType?: InputMaybe<ProjectTypeBridge_Bool_Exp>;
  _and?: InputMaybe<Array<ProjectType_Bool_Exp>>;
  _not?: InputMaybe<ProjectType_Bool_Exp>;
  _or?: InputMaybe<Array<ProjectType_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "ProjectType" */
export enum ProjectType_Constraint {
  /** unique or primary key constraint */
  ProjectTypePkey = 'ProjectType_pkey',
  /** unique or primary key constraint */
  ProjectTypeValueKey = 'ProjectType_value_key'
}

/** input type for inserting data into table "ProjectType" */
export type ProjectType_Insert_Input = {
  ProjectType?: InputMaybe<ProjectTypeBridge_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  label?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type ProjectType_Max_Fields = {
  __typename?: 'ProjectType_max_fields';
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type ProjectType_Min_Fields = {
  __typename?: 'ProjectType_min_fields';
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "ProjectType" */
export type ProjectType_Mutation_Response = {
  __typename?: 'ProjectType_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ProjectType>;
};

/** input type for inserting object relation for remote table "ProjectType" */
export type ProjectType_Obj_Rel_Insert_Input = {
  data: ProjectType_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<ProjectType_On_Conflict>;
};

/** on_conflict condition type for table "ProjectType" */
export type ProjectType_On_Conflict = {
  constraint: ProjectType_Constraint;
  update_columns?: Array<ProjectType_Update_Column>;
  where?: InputMaybe<ProjectType_Bool_Exp>;
};

/** Ordering options when selecting data from "ProjectType". */
export type ProjectType_Order_By = {
  ProjectType_aggregate?: InputMaybe<ProjectTypeBridge_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: ProjectType */
export type ProjectType_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "ProjectType" */
export enum ProjectType_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "ProjectType" */
export type ProjectType_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  label?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "ProjectType" */
export enum ProjectType_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  Value = 'value'
}

/** aggregated selection of "Project" */
export type Project_Aggregate = {
  __typename?: 'Project_aggregate';
  aggregate?: Maybe<Project_Aggregate_Fields>;
  nodes: Array<Project>;
};

/** aggregate fields of "Project" */
export type Project_Aggregate_Fields = {
  __typename?: 'Project_aggregate_fields';
  avg?: Maybe<Project_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Project_Max_Fields>;
  min?: Maybe<Project_Min_Fields>;
  stddev?: Maybe<Project_Stddev_Fields>;
  stddev_pop?: Maybe<Project_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Project_Stddev_Samp_Fields>;
  sum?: Maybe<Project_Sum_Fields>;
  var_pop?: Maybe<Project_Var_Pop_Fields>;
  var_samp?: Maybe<Project_Var_Samp_Fields>;
  variance?: Maybe<Project_Variance_Fields>;
};


/** aggregate fields of "Project" */
export type Project_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Project_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Project" */
export type Project_Aggregate_Order_By = {
  avg?: InputMaybe<Project_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Project_Max_Order_By>;
  min?: InputMaybe<Project_Min_Order_By>;
  stddev?: InputMaybe<Project_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Project_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Project_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Project_Sum_Order_By>;
  var_pop?: InputMaybe<Project_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Project_Var_Samp_Order_By>;
  variance?: InputMaybe<Project_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "Project" */
export type Project_Arr_Rel_Insert_Input = {
  data: Array<Project_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Project_On_Conflict>;
};

/** aggregate avg on columns */
export type Project_Avg_Fields = {
  __typename?: 'Project_avg_fields';
  currentInvested?: Maybe<Scalars['Float']>;
  onChainId?: Maybe<Scalars['Float']>;
  totalInvested?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "Project" */
export type Project_Avg_Order_By = {
  currentInvested?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
  totalInvested?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Project". All fields are combined with a logical 'AND'. */
export type Project_Bool_Exp = {
  GrantSubmitions?: InputMaybe<GrantSubmissions_Bool_Exp>;
  Likes?: InputMaybe<Likes_Bool_Exp>;
  ProjectTagBridge?: InputMaybe<ProjectTag_Bool_Exp>;
  _and?: InputMaybe<Array<Project_Bool_Exp>>;
  _not?: InputMaybe<Project_Bool_Exp>;
  _or?: InputMaybe<Array<Project_Bool_Exp>>;
  activityId?: InputMaybe<Uuid_Comparison_Exp>;
  author?: InputMaybe<User_Bool_Exp>;
  author_id?: InputMaybe<Uuid_Comparison_Exp>;
  category?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  currentInvested?: InputMaybe<Int_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  displayType?: InputMaybe<String_Comparison_Exp>;
  featured?: InputMaybe<Boolean_Comparison_Exp>;
  gallery?: InputMaybe<Json_Comparison_Exp>;
  hideBudget?: InputMaybe<Boolean_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  imageUrl?: InputMaybe<String_Comparison_Exp>;
  members?: InputMaybe<ProjectMembers_Bool_Exp>;
  onChainId?: InputMaybe<Int_Comparison_Exp>;
  pitchDeck?: InputMaybe<String_Comparison_Exp>;
  projectTags?: InputMaybe<ProjectTagsBridge_Bool_Exp>;
  projectTypes?: InputMaybe<ProjectTypeBridge_Bool_Exp>;
  subdescription?: InputMaybe<String_Comparison_Exp>;
  tagBridgeId?: InputMaybe<Uuid_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  titleURL?: InputMaybe<String_Comparison_Exp>;
  totalInvested?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  videoHeroImg?: InputMaybe<String_Comparison_Exp>;
  videoOverview?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "Project" */
export enum Project_Constraint {
  /** unique or primary key constraint */
  ProjectActivityIdKey = 'Project_activityId_key',
  /** unique or primary key constraint */
  ProjectPkey = 'Project_pkey',
  /** unique or primary key constraint */
  ProjectTitleUrlKey = 'Project_titleURL_key'
}

/** input type for incrementing numeric columns in table "Project" */
export type Project_Inc_Input = {
  currentInvested?: InputMaybe<Scalars['Int']>;
  onChainId?: InputMaybe<Scalars['Int']>;
  totalInvested?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "Project" */
export type Project_Insert_Input = {
  GrantSubmitions?: InputMaybe<GrantSubmissions_Arr_Rel_Insert_Input>;
  Likes?: InputMaybe<Likes_Arr_Rel_Insert_Input>;
  ProjectTagBridge?: InputMaybe<ProjectTag_Obj_Rel_Insert_Input>;
  activityId?: InputMaybe<Scalars['uuid']>;
  author?: InputMaybe<User_Obj_Rel_Insert_Input>;
  author_id?: InputMaybe<Scalars['uuid']>;
  category?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  currentInvested?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  displayType?: InputMaybe<Scalars['String']>;
  featured?: InputMaybe<Scalars['Boolean']>;
  gallery?: InputMaybe<Scalars['json']>;
  hideBudget?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['uuid']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  members?: InputMaybe<ProjectMembers_Arr_Rel_Insert_Input>;
  onChainId?: InputMaybe<Scalars['Int']>;
  pitchDeck?: InputMaybe<Scalars['String']>;
  projectTags?: InputMaybe<ProjectTagsBridge_Arr_Rel_Insert_Input>;
  projectTypes?: InputMaybe<ProjectTypeBridge_Arr_Rel_Insert_Input>;
  subdescription?: InputMaybe<Scalars['String']>;
  tagBridgeId?: InputMaybe<Scalars['uuid']>;
  title?: InputMaybe<Scalars['String']>;
  titleURL?: InputMaybe<Scalars['String']>;
  totalInvested?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  videoHeroImg?: InputMaybe<Scalars['String']>;
  videoOverview?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Project_Max_Fields = {
  __typename?: 'Project_max_fields';
  activityId?: Maybe<Scalars['uuid']>;
  author_id?: Maybe<Scalars['uuid']>;
  category?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  currentInvested?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  displayType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  imageUrl?: Maybe<Scalars['String']>;
  onChainId?: Maybe<Scalars['Int']>;
  pitchDeck?: Maybe<Scalars['String']>;
  subdescription?: Maybe<Scalars['String']>;
  tagBridgeId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
  titleURL?: Maybe<Scalars['String']>;
  totalInvested?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  videoHeroImg?: Maybe<Scalars['String']>;
  videoOverview?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "Project" */
export type Project_Max_Order_By = {
  activityId?: InputMaybe<Order_By>;
  author_id?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  currentInvested?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  displayType?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  imageUrl?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
  pitchDeck?: InputMaybe<Order_By>;
  subdescription?: InputMaybe<Order_By>;
  tagBridgeId?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  titleURL?: InputMaybe<Order_By>;
  totalInvested?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  videoHeroImg?: InputMaybe<Order_By>;
  videoOverview?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Project_Min_Fields = {
  __typename?: 'Project_min_fields';
  activityId?: Maybe<Scalars['uuid']>;
  author_id?: Maybe<Scalars['uuid']>;
  category?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  currentInvested?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  displayType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  imageUrl?: Maybe<Scalars['String']>;
  onChainId?: Maybe<Scalars['Int']>;
  pitchDeck?: Maybe<Scalars['String']>;
  subdescription?: Maybe<Scalars['String']>;
  tagBridgeId?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
  titleURL?: Maybe<Scalars['String']>;
  totalInvested?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  videoHeroImg?: Maybe<Scalars['String']>;
  videoOverview?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "Project" */
export type Project_Min_Order_By = {
  activityId?: InputMaybe<Order_By>;
  author_id?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  currentInvested?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  displayType?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  imageUrl?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
  pitchDeck?: InputMaybe<Order_By>;
  subdescription?: InputMaybe<Order_By>;
  tagBridgeId?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  titleURL?: InputMaybe<Order_By>;
  totalInvested?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  videoHeroImg?: InputMaybe<Order_By>;
  videoOverview?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "Project" */
export type Project_Mutation_Response = {
  __typename?: 'Project_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Project>;
};

/** input type for inserting object relation for remote table "Project" */
export type Project_Obj_Rel_Insert_Input = {
  data: Project_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Project_On_Conflict>;
};

/** on_conflict condition type for table "Project" */
export type Project_On_Conflict = {
  constraint: Project_Constraint;
  update_columns?: Array<Project_Update_Column>;
  where?: InputMaybe<Project_Bool_Exp>;
};

/** Ordering options when selecting data from "Project". */
export type Project_Order_By = {
  GrantSubmitions_aggregate?: InputMaybe<GrantSubmissions_Aggregate_Order_By>;
  Likes_aggregate?: InputMaybe<Likes_Aggregate_Order_By>;
  ProjectTagBridge?: InputMaybe<ProjectTag_Order_By>;
  activityId?: InputMaybe<Order_By>;
  author?: InputMaybe<User_Order_By>;
  author_id?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  currentInvested?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  displayType?: InputMaybe<Order_By>;
  featured?: InputMaybe<Order_By>;
  gallery?: InputMaybe<Order_By>;
  hideBudget?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  imageUrl?: InputMaybe<Order_By>;
  members_aggregate?: InputMaybe<ProjectMembers_Aggregate_Order_By>;
  onChainId?: InputMaybe<Order_By>;
  pitchDeck?: InputMaybe<Order_By>;
  projectTags_aggregate?: InputMaybe<ProjectTagsBridge_Aggregate_Order_By>;
  projectTypes_aggregate?: InputMaybe<ProjectTypeBridge_Aggregate_Order_By>;
  subdescription?: InputMaybe<Order_By>;
  tagBridgeId?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  titleURL?: InputMaybe<Order_By>;
  totalInvested?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  videoHeroImg?: InputMaybe<Order_By>;
  videoOverview?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Project */
export type Project_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Project" */
export enum Project_Select_Column {
  /** column name */
  ActivityId = 'activityId',
  /** column name */
  AuthorId = 'author_id',
  /** column name */
  Category = 'category',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurrentInvested = 'currentInvested',
  /** column name */
  Description = 'description',
  /** column name */
  DisplayType = 'displayType',
  /** column name */
  Featured = 'featured',
  /** column name */
  Gallery = 'gallery',
  /** column name */
  HideBudget = 'hideBudget',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'imageUrl',
  /** column name */
  OnChainId = 'onChainId',
  /** column name */
  PitchDeck = 'pitchDeck',
  /** column name */
  Subdescription = 'subdescription',
  /** column name */
  TagBridgeId = 'tagBridgeId',
  /** column name */
  Title = 'title',
  /** column name */
  TitleUrl = 'titleURL',
  /** column name */
  TotalInvested = 'totalInvested',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VideoHeroImg = 'videoHeroImg',
  /** column name */
  VideoOverview = 'videoOverview'
}

/** input type for updating data in table "Project" */
export type Project_Set_Input = {
  activityId?: InputMaybe<Scalars['uuid']>;
  author_id?: InputMaybe<Scalars['uuid']>;
  category?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  currentInvested?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  displayType?: InputMaybe<Scalars['String']>;
  featured?: InputMaybe<Scalars['Boolean']>;
  gallery?: InputMaybe<Scalars['json']>;
  hideBudget?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['uuid']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  onChainId?: InputMaybe<Scalars['Int']>;
  pitchDeck?: InputMaybe<Scalars['String']>;
  subdescription?: InputMaybe<Scalars['String']>;
  tagBridgeId?: InputMaybe<Scalars['uuid']>;
  title?: InputMaybe<Scalars['String']>;
  titleURL?: InputMaybe<Scalars['String']>;
  totalInvested?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  videoHeroImg?: InputMaybe<Scalars['String']>;
  videoOverview?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Project_Stddev_Fields = {
  __typename?: 'Project_stddev_fields';
  currentInvested?: Maybe<Scalars['Float']>;
  onChainId?: Maybe<Scalars['Float']>;
  totalInvested?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "Project" */
export type Project_Stddev_Order_By = {
  currentInvested?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
  totalInvested?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Project_Stddev_Pop_Fields = {
  __typename?: 'Project_stddev_pop_fields';
  currentInvested?: Maybe<Scalars['Float']>;
  onChainId?: Maybe<Scalars['Float']>;
  totalInvested?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "Project" */
export type Project_Stddev_Pop_Order_By = {
  currentInvested?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
  totalInvested?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Project_Stddev_Samp_Fields = {
  __typename?: 'Project_stddev_samp_fields';
  currentInvested?: Maybe<Scalars['Float']>;
  onChainId?: Maybe<Scalars['Float']>;
  totalInvested?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "Project" */
export type Project_Stddev_Samp_Order_By = {
  currentInvested?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
  totalInvested?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Project_Sum_Fields = {
  __typename?: 'Project_sum_fields';
  currentInvested?: Maybe<Scalars['Int']>;
  onChainId?: Maybe<Scalars['Int']>;
  totalInvested?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "Project" */
export type Project_Sum_Order_By = {
  currentInvested?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
  totalInvested?: InputMaybe<Order_By>;
};

/** update columns of table "Project" */
export enum Project_Update_Column {
  /** column name */
  ActivityId = 'activityId',
  /** column name */
  AuthorId = 'author_id',
  /** column name */
  Category = 'category',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurrentInvested = 'currentInvested',
  /** column name */
  Description = 'description',
  /** column name */
  DisplayType = 'displayType',
  /** column name */
  Featured = 'featured',
  /** column name */
  Gallery = 'gallery',
  /** column name */
  HideBudget = 'hideBudget',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'imageUrl',
  /** column name */
  OnChainId = 'onChainId',
  /** column name */
  PitchDeck = 'pitchDeck',
  /** column name */
  Subdescription = 'subdescription',
  /** column name */
  TagBridgeId = 'tagBridgeId',
  /** column name */
  Title = 'title',
  /** column name */
  TitleUrl = 'titleURL',
  /** column name */
  TotalInvested = 'totalInvested',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VideoHeroImg = 'videoHeroImg',
  /** column name */
  VideoOverview = 'videoOverview'
}

/** aggregate var_pop on columns */
export type Project_Var_Pop_Fields = {
  __typename?: 'Project_var_pop_fields';
  currentInvested?: Maybe<Scalars['Float']>;
  onChainId?: Maybe<Scalars['Float']>;
  totalInvested?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "Project" */
export type Project_Var_Pop_Order_By = {
  currentInvested?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
  totalInvested?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Project_Var_Samp_Fields = {
  __typename?: 'Project_var_samp_fields';
  currentInvested?: Maybe<Scalars['Float']>;
  onChainId?: Maybe<Scalars['Float']>;
  totalInvested?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "Project" */
export type Project_Var_Samp_Order_By = {
  currentInvested?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
  totalInvested?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Project_Variance_Fields = {
  __typename?: 'Project_variance_fields';
  currentInvested?: Maybe<Scalars['Float']>;
  onChainId?: Maybe<Scalars['Float']>;
  totalInvested?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "Project" */
export type Project_Variance_Order_By = {
  currentInvested?: InputMaybe<Order_By>;
  onChainId?: InputMaybe<Order_By>;
  totalInvested?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "Swaps" */
export type Swaps = {
  __typename?: 'Swaps';
  amount: Scalars['numeric'];
  id: Scalars['uuid'];
  state: Scalars['String'];
  txHash: Scalars['String'];
  userId: Scalars['uuid'];
};

/** aggregated selection of "Swaps" */
export type Swaps_Aggregate = {
  __typename?: 'Swaps_aggregate';
  aggregate?: Maybe<Swaps_Aggregate_Fields>;
  nodes: Array<Swaps>;
};

/** aggregate fields of "Swaps" */
export type Swaps_Aggregate_Fields = {
  __typename?: 'Swaps_aggregate_fields';
  avg?: Maybe<Swaps_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Swaps_Max_Fields>;
  min?: Maybe<Swaps_Min_Fields>;
  stddev?: Maybe<Swaps_Stddev_Fields>;
  stddev_pop?: Maybe<Swaps_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Swaps_Stddev_Samp_Fields>;
  sum?: Maybe<Swaps_Sum_Fields>;
  var_pop?: Maybe<Swaps_Var_Pop_Fields>;
  var_samp?: Maybe<Swaps_Var_Samp_Fields>;
  variance?: Maybe<Swaps_Variance_Fields>;
};


/** aggregate fields of "Swaps" */
export type Swaps_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Swaps_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Swaps_Avg_Fields = {
  __typename?: 'Swaps_avg_fields';
  amount?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "Swaps". All fields are combined with a logical 'AND'. */
export type Swaps_Bool_Exp = {
  _and?: InputMaybe<Array<Swaps_Bool_Exp>>;
  _not?: InputMaybe<Swaps_Bool_Exp>;
  _or?: InputMaybe<Array<Swaps_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  state?: InputMaybe<String_Comparison_Exp>;
  txHash?: InputMaybe<String_Comparison_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "Swaps" */
export enum Swaps_Constraint {
  /** unique or primary key constraint */
  SwapsPkey = 'Swaps_pkey'
}

/** input type for incrementing numeric columns in table "Swaps" */
export type Swaps_Inc_Input = {
  amount?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "Swaps" */
export type Swaps_Insert_Input = {
  amount?: InputMaybe<Scalars['numeric']>;
  id?: InputMaybe<Scalars['uuid']>;
  state?: InputMaybe<Scalars['String']>;
  txHash?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Swaps_Max_Fields = {
  __typename?: 'Swaps_max_fields';
  amount?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  state?: Maybe<Scalars['String']>;
  txHash?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Swaps_Min_Fields = {
  __typename?: 'Swaps_min_fields';
  amount?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  state?: Maybe<Scalars['String']>;
  txHash?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "Swaps" */
export type Swaps_Mutation_Response = {
  __typename?: 'Swaps_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Swaps>;
};

/** on_conflict condition type for table "Swaps" */
export type Swaps_On_Conflict = {
  constraint: Swaps_Constraint;
  update_columns?: Array<Swaps_Update_Column>;
  where?: InputMaybe<Swaps_Bool_Exp>;
};

/** Ordering options when selecting data from "Swaps". */
export type Swaps_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  txHash?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Swaps */
export type Swaps_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Swaps" */
export enum Swaps_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  Id = 'id',
  /** column name */
  State = 'state',
  /** column name */
  TxHash = 'txHash',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "Swaps" */
export type Swaps_Set_Input = {
  amount?: InputMaybe<Scalars['numeric']>;
  id?: InputMaybe<Scalars['uuid']>;
  state?: InputMaybe<Scalars['String']>;
  txHash?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Swaps_Stddev_Fields = {
  __typename?: 'Swaps_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Swaps_Stddev_Pop_Fields = {
  __typename?: 'Swaps_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Swaps_Stddev_Samp_Fields = {
  __typename?: 'Swaps_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Swaps_Sum_Fields = {
  __typename?: 'Swaps_sum_fields';
  amount?: Maybe<Scalars['numeric']>;
};

/** update columns of table "Swaps" */
export enum Swaps_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  Id = 'id',
  /** column name */
  State = 'state',
  /** column name */
  TxHash = 'txHash',
  /** column name */
  UserId = 'userId'
}

/** aggregate var_pop on columns */
export type Swaps_Var_Pop_Fields = {
  __typename?: 'Swaps_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Swaps_Var_Samp_Fields = {
  __typename?: 'Swaps_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Swaps_Variance_Fields = {
  __typename?: 'Swaps_variance_fields';
  amount?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "TopUpWallet" */
export type TopUpWallet = {
  __typename?: 'TopUpWallet';
  /** An object relationship */
  User: User;
  amount: Scalars['numeric'];
  fee: Scalars['numeric'];
  id: Scalars['uuid'];
  originFund: Scalars['String'];
  state: Scalars['String'];
  timestamp?: Maybe<Scalars['bigint']>;
  transferId?: Maybe<Scalars['String']>;
  txHash?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  userId: Scalars['uuid'];
};

/** aggregated selection of "TopUpWallet" */
export type TopUpWallet_Aggregate = {
  __typename?: 'TopUpWallet_aggregate';
  aggregate?: Maybe<TopUpWallet_Aggregate_Fields>;
  nodes: Array<TopUpWallet>;
};

/** aggregate fields of "TopUpWallet" */
export type TopUpWallet_Aggregate_Fields = {
  __typename?: 'TopUpWallet_aggregate_fields';
  avg?: Maybe<TopUpWallet_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<TopUpWallet_Max_Fields>;
  min?: Maybe<TopUpWallet_Min_Fields>;
  stddev?: Maybe<TopUpWallet_Stddev_Fields>;
  stddev_pop?: Maybe<TopUpWallet_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<TopUpWallet_Stddev_Samp_Fields>;
  sum?: Maybe<TopUpWallet_Sum_Fields>;
  var_pop?: Maybe<TopUpWallet_Var_Pop_Fields>;
  var_samp?: Maybe<TopUpWallet_Var_Samp_Fields>;
  variance?: Maybe<TopUpWallet_Variance_Fields>;
};


/** aggregate fields of "TopUpWallet" */
export type TopUpWallet_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<TopUpWallet_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "TopUpWallet" */
export type TopUpWallet_Aggregate_Order_By = {
  avg?: InputMaybe<TopUpWallet_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<TopUpWallet_Max_Order_By>;
  min?: InputMaybe<TopUpWallet_Min_Order_By>;
  stddev?: InputMaybe<TopUpWallet_Stddev_Order_By>;
  stddev_pop?: InputMaybe<TopUpWallet_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<TopUpWallet_Stddev_Samp_Order_By>;
  sum?: InputMaybe<TopUpWallet_Sum_Order_By>;
  var_pop?: InputMaybe<TopUpWallet_Var_Pop_Order_By>;
  var_samp?: InputMaybe<TopUpWallet_Var_Samp_Order_By>;
  variance?: InputMaybe<TopUpWallet_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "TopUpWallet" */
export type TopUpWallet_Arr_Rel_Insert_Input = {
  data: Array<TopUpWallet_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<TopUpWallet_On_Conflict>;
};

/** aggregate avg on columns */
export type TopUpWallet_Avg_Fields = {
  __typename?: 'TopUpWallet_avg_fields';
  amount?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
  timestamp?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "TopUpWallet" */
export type TopUpWallet_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "TopUpWallet". All fields are combined with a logical 'AND'. */
export type TopUpWallet_Bool_Exp = {
  User?: InputMaybe<User_Bool_Exp>;
  _and?: InputMaybe<Array<TopUpWallet_Bool_Exp>>;
  _not?: InputMaybe<TopUpWallet_Bool_Exp>;
  _or?: InputMaybe<Array<TopUpWallet_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  fee?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  originFund?: InputMaybe<String_Comparison_Exp>;
  state?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Bigint_Comparison_Exp>;
  transferId?: InputMaybe<String_Comparison_Exp>;
  txHash?: InputMaybe<String_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "TopUpWallet" */
export enum TopUpWallet_Constraint {
  /** unique or primary key constraint */
  TopupWalletPkey = 'topupWallet_pkey'
}

/** input type for incrementing numeric columns in table "TopUpWallet" */
export type TopUpWallet_Inc_Input = {
  amount?: InputMaybe<Scalars['numeric']>;
  fee?: InputMaybe<Scalars['numeric']>;
  timestamp?: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "TopUpWallet" */
export type TopUpWallet_Insert_Input = {
  User?: InputMaybe<User_Obj_Rel_Insert_Input>;
  amount?: InputMaybe<Scalars['numeric']>;
  fee?: InputMaybe<Scalars['numeric']>;
  id?: InputMaybe<Scalars['uuid']>;
  originFund?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['bigint']>;
  transferId?: InputMaybe<Scalars['String']>;
  txHash?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type TopUpWallet_Max_Fields = {
  __typename?: 'TopUpWallet_max_fields';
  amount?: Maybe<Scalars['numeric']>;
  fee?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  originFund?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['bigint']>;
  transferId?: Maybe<Scalars['String']>;
  txHash?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "TopUpWallet" */
export type TopUpWallet_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  originFund?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  transferId?: InputMaybe<Order_By>;
  txHash?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type TopUpWallet_Min_Fields = {
  __typename?: 'TopUpWallet_min_fields';
  amount?: Maybe<Scalars['numeric']>;
  fee?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  originFund?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['bigint']>;
  transferId?: Maybe<Scalars['String']>;
  txHash?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "TopUpWallet" */
export type TopUpWallet_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  originFund?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  transferId?: InputMaybe<Order_By>;
  txHash?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "TopUpWallet" */
export type TopUpWallet_Mutation_Response = {
  __typename?: 'TopUpWallet_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<TopUpWallet>;
};

/** on_conflict condition type for table "TopUpWallet" */
export type TopUpWallet_On_Conflict = {
  constraint: TopUpWallet_Constraint;
  update_columns?: Array<TopUpWallet_Update_Column>;
  where?: InputMaybe<TopUpWallet_Bool_Exp>;
};

/** Ordering options when selecting data from "TopUpWallet". */
export type TopUpWallet_Order_By = {
  User?: InputMaybe<User_Order_By>;
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  originFund?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  transferId?: InputMaybe<Order_By>;
  txHash?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: TopUpWallet */
export type TopUpWallet_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "TopUpWallet" */
export enum TopUpWallet_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  Fee = 'fee',
  /** column name */
  Id = 'id',
  /** column name */
  OriginFund = 'originFund',
  /** column name */
  State = 'state',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  TransferId = 'transferId',
  /** column name */
  TxHash = 'txHash',
  /** column name */
  Url = 'url',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "TopUpWallet" */
export type TopUpWallet_Set_Input = {
  amount?: InputMaybe<Scalars['numeric']>;
  fee?: InputMaybe<Scalars['numeric']>;
  id?: InputMaybe<Scalars['uuid']>;
  originFund?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['bigint']>;
  transferId?: InputMaybe<Scalars['String']>;
  txHash?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type TopUpWallet_Stddev_Fields = {
  __typename?: 'TopUpWallet_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
  timestamp?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "TopUpWallet" */
export type TopUpWallet_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type TopUpWallet_Stddev_Pop_Fields = {
  __typename?: 'TopUpWallet_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
  timestamp?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "TopUpWallet" */
export type TopUpWallet_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type TopUpWallet_Stddev_Samp_Fields = {
  __typename?: 'TopUpWallet_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
  timestamp?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "TopUpWallet" */
export type TopUpWallet_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type TopUpWallet_Sum_Fields = {
  __typename?: 'TopUpWallet_sum_fields';
  amount?: Maybe<Scalars['numeric']>;
  fee?: Maybe<Scalars['numeric']>;
  timestamp?: Maybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "TopUpWallet" */
export type TopUpWallet_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** update columns of table "TopUpWallet" */
export enum TopUpWallet_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  Fee = 'fee',
  /** column name */
  Id = 'id',
  /** column name */
  OriginFund = 'originFund',
  /** column name */
  State = 'state',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  TransferId = 'transferId',
  /** column name */
  TxHash = 'txHash',
  /** column name */
  Url = 'url',
  /** column name */
  UserId = 'userId'
}

/** aggregate var_pop on columns */
export type TopUpWallet_Var_Pop_Fields = {
  __typename?: 'TopUpWallet_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
  timestamp?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "TopUpWallet" */
export type TopUpWallet_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type TopUpWallet_Var_Samp_Fields = {
  __typename?: 'TopUpWallet_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
  timestamp?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "TopUpWallet" */
export type TopUpWallet_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type TopUpWallet_Variance_Fields = {
  __typename?: 'TopUpWallet_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
  timestamp?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "TopUpWallet" */
export type TopUpWallet_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** columns and relationships of "User" */
export type User = {
  __typename?: 'User';
  /** An array relationship */
  GrantOwners: Array<GrantOwners>;
  /** An aggregate relationship */
  GrantOwners_aggregate: GrantOwners_Aggregate;
  /** An array relationship */
  ProjectMembers: Array<ProjectMembers>;
  /** An aggregate relationship */
  ProjectMembers_aggregate: ProjectMembers_Aggregate;
  /** An array relationship */
  TopUpWallets: Array<TopUpWallet>;
  /** An aggregate relationship */
  TopUpWallets_aggregate: TopUpWallet_Aggregate;
  activityId?: Maybe<Scalars['uuid']>;
  bio?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  /** An array relationship */
  donations: Array<Donations>;
  /** An aggregate relationship */
  donations_aggregate: Donations_Aggregate;
  email: Scalars['String'];
  featured?: Maybe<Scalars['Boolean']>;
  firstName?: Maybe<Scalars['String']>;
  /** An array relationship */
  follows: Array<Follows>;
  /** An aggregate relationship */
  follows_aggregate: Follows_Aggregate;
  globalRole?: Maybe<Scalars['String']>;
  globalTitle?: Maybe<Scalars['String']>;
  /** An array relationship */
  grantSubmissionReviews: Array<GrantSubmissionReview>;
  /** An aggregate relationship */
  grantSubmissionReviews_aggregate: GrantSubmissionReview_Aggregate;
  /** An array relationship */
  grantSubmissions: Array<GrantSubmissions>;
  /** An aggregate relationship */
  grantSubmissions_aggregate: GrantSubmissions_Aggregate;
  /** An array relationship */
  grants: Array<Grants>;
  /** An aggregate relationship */
  grants_aggregate: Grants_Aggregate;
  id: Scalars['uuid'];
  issuer?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  /** An array relationship */
  likedBy: Array<Likes>;
  /** An aggregate relationship */
  likedBy_aggregate: Likes_Aggregate;
  /** An array relationship */
  likes: Array<Likes>;
  /** An aggregate relationship */
  likes_aggregate: Likes_Aggregate;
  linkedinLink?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
  /** An array relationship */
  projects: Array<Project>;
  /** An aggregate relationship */
  projects_aggregate: Project_Aggregate;
  publicAddress?: Maybe<Scalars['String']>;
  twitterLink?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};


/** columns and relationships of "User" */
export type UserGrantOwnersArgs = {
  distinct_on?: InputMaybe<Array<GrantOwners_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantOwners_Order_By>>;
  where?: InputMaybe<GrantOwners_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserGrantOwners_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantOwners_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantOwners_Order_By>>;
  where?: InputMaybe<GrantOwners_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserProjectMembersArgs = {
  distinct_on?: InputMaybe<Array<ProjectMembers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectMembers_Order_By>>;
  where?: InputMaybe<ProjectMembers_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserProjectMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectMembers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectMembers_Order_By>>;
  where?: InputMaybe<ProjectMembers_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserTopUpWalletsArgs = {
  distinct_on?: InputMaybe<Array<TopUpWallet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<TopUpWallet_Order_By>>;
  where?: InputMaybe<TopUpWallet_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserTopUpWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<TopUpWallet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<TopUpWallet_Order_By>>;
  where?: InputMaybe<TopUpWallet_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserDonationsArgs = {
  distinct_on?: InputMaybe<Array<Donations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Donations_Order_By>>;
  where?: InputMaybe<Donations_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserDonations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Donations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Donations_Order_By>>;
  where?: InputMaybe<Donations_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserFollowsArgs = {
  distinct_on?: InputMaybe<Array<Follows_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Follows_Order_By>>;
  where?: InputMaybe<Follows_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserFollows_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Follows_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Follows_Order_By>>;
  where?: InputMaybe<Follows_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserGrantSubmissionReviewsArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissionReview_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantSubmissionReview_Order_By>>;
  where?: InputMaybe<GrantSubmissionReview_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserGrantSubmissionReviews_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissionReview_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantSubmissionReview_Order_By>>;
  where?: InputMaybe<GrantSubmissionReview_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserGrantSubmissionsArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantSubmissions_Order_By>>;
  where?: InputMaybe<GrantSubmissions_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserGrantSubmissions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantSubmissions_Order_By>>;
  where?: InputMaybe<GrantSubmissions_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserGrantsArgs = {
  distinct_on?: InputMaybe<Array<Grants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Grants_Order_By>>;
  where?: InputMaybe<Grants_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserGrants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Grants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Grants_Order_By>>;
  where?: InputMaybe<Grants_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserLikedByArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserLikedBy_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserLikesArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserLikes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserProjectsArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Order_By>>;
  where?: InputMaybe<Project_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserProjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Order_By>>;
  where?: InputMaybe<Project_Bool_Exp>;
};

/** aggregated selection of "User" */
export type User_Aggregate = {
  __typename?: 'User_aggregate';
  aggregate?: Maybe<User_Aggregate_Fields>;
  nodes: Array<User>;
};

/** aggregate fields of "User" */
export type User_Aggregate_Fields = {
  __typename?: 'User_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<User_Max_Fields>;
  min?: Maybe<User_Min_Fields>;
};


/** aggregate fields of "User" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "User". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  GrantOwners?: InputMaybe<GrantOwners_Bool_Exp>;
  ProjectMembers?: InputMaybe<ProjectMembers_Bool_Exp>;
  TopUpWallets?: InputMaybe<TopUpWallet_Bool_Exp>;
  _and?: InputMaybe<Array<User_Bool_Exp>>;
  _not?: InputMaybe<User_Bool_Exp>;
  _or?: InputMaybe<Array<User_Bool_Exp>>;
  activityId?: InputMaybe<Uuid_Comparison_Exp>;
  bio?: InputMaybe<String_Comparison_Exp>;
  company?: InputMaybe<String_Comparison_Exp>;
  donations?: InputMaybe<Donations_Bool_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  featured?: InputMaybe<Boolean_Comparison_Exp>;
  firstName?: InputMaybe<String_Comparison_Exp>;
  follows?: InputMaybe<Follows_Bool_Exp>;
  globalRole?: InputMaybe<String_Comparison_Exp>;
  globalTitle?: InputMaybe<String_Comparison_Exp>;
  grantSubmissionReviews?: InputMaybe<GrantSubmissionReview_Bool_Exp>;
  grantSubmissions?: InputMaybe<GrantSubmissions_Bool_Exp>;
  grants?: InputMaybe<Grants_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  issuer?: InputMaybe<String_Comparison_Exp>;
  lastName?: InputMaybe<String_Comparison_Exp>;
  likedBy?: InputMaybe<Likes_Bool_Exp>;
  likes?: InputMaybe<Likes_Bool_Exp>;
  linkedinLink?: InputMaybe<String_Comparison_Exp>;
  profileImage?: InputMaybe<String_Comparison_Exp>;
  projects?: InputMaybe<Project_Bool_Exp>;
  publicAddress?: InputMaybe<String_Comparison_Exp>;
  twitterLink?: InputMaybe<String_Comparison_Exp>;
  website?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "User" */
export enum User_Constraint {
  /** unique or primary key constraint */
  UserEmailKey = 'User_email_key',
  /** unique or primary key constraint */
  UserPkey = 'User_pkey',
  /** unique or primary key constraint */
  UserPublicAddressKey = 'User_publicAddress_key'
}

/** input type for inserting data into table "User" */
export type User_Insert_Input = {
  GrantOwners?: InputMaybe<GrantOwners_Arr_Rel_Insert_Input>;
  ProjectMembers?: InputMaybe<ProjectMembers_Arr_Rel_Insert_Input>;
  TopUpWallets?: InputMaybe<TopUpWallet_Arr_Rel_Insert_Input>;
  activityId?: InputMaybe<Scalars['uuid']>;
  bio?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  donations?: InputMaybe<Donations_Arr_Rel_Insert_Input>;
  email?: InputMaybe<Scalars['String']>;
  featured?: InputMaybe<Scalars['Boolean']>;
  firstName?: InputMaybe<Scalars['String']>;
  follows?: InputMaybe<Follows_Arr_Rel_Insert_Input>;
  globalRole?: InputMaybe<Scalars['String']>;
  globalTitle?: InputMaybe<Scalars['String']>;
  grantSubmissionReviews?: InputMaybe<GrantSubmissionReview_Arr_Rel_Insert_Input>;
  grantSubmissions?: InputMaybe<GrantSubmissions_Arr_Rel_Insert_Input>;
  grants?: InputMaybe<Grants_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  issuer?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  likedBy?: InputMaybe<Likes_Arr_Rel_Insert_Input>;
  likes?: InputMaybe<Likes_Arr_Rel_Insert_Input>;
  linkedinLink?: InputMaybe<Scalars['String']>;
  profileImage?: InputMaybe<Scalars['String']>;
  projects?: InputMaybe<Project_Arr_Rel_Insert_Input>;
  publicAddress?: InputMaybe<Scalars['String']>;
  twitterLink?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'User_max_fields';
  activityId?: Maybe<Scalars['uuid']>;
  bio?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  globalRole?: Maybe<Scalars['String']>;
  globalTitle?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  issuer?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  linkedinLink?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
  publicAddress?: Maybe<Scalars['String']>;
  twitterLink?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'User_min_fields';
  activityId?: Maybe<Scalars['uuid']>;
  bio?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  globalRole?: Maybe<Scalars['String']>;
  globalTitle?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  issuer?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  linkedinLink?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
  publicAddress?: Maybe<Scalars['String']>;
  twitterLink?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "User" */
export type User_Mutation_Response = {
  __typename?: 'User_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User>;
};

/** input type for inserting object relation for remote table "User" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<User_On_Conflict>;
};

/** on_conflict condition type for table "User" */
export type User_On_Conflict = {
  constraint: User_Constraint;
  update_columns?: Array<User_Update_Column>;
  where?: InputMaybe<User_Bool_Exp>;
};

/** Ordering options when selecting data from "User". */
export type User_Order_By = {
  GrantOwners_aggregate?: InputMaybe<GrantOwners_Aggregate_Order_By>;
  ProjectMembers_aggregate?: InputMaybe<ProjectMembers_Aggregate_Order_By>;
  TopUpWallets_aggregate?: InputMaybe<TopUpWallet_Aggregate_Order_By>;
  activityId?: InputMaybe<Order_By>;
  bio?: InputMaybe<Order_By>;
  company?: InputMaybe<Order_By>;
  donations_aggregate?: InputMaybe<Donations_Aggregate_Order_By>;
  email?: InputMaybe<Order_By>;
  featured?: InputMaybe<Order_By>;
  firstName?: InputMaybe<Order_By>;
  follows_aggregate?: InputMaybe<Follows_Aggregate_Order_By>;
  globalRole?: InputMaybe<Order_By>;
  globalTitle?: InputMaybe<Order_By>;
  grantSubmissionReviews_aggregate?: InputMaybe<GrantSubmissionReview_Aggregate_Order_By>;
  grantSubmissions_aggregate?: InputMaybe<GrantSubmissions_Aggregate_Order_By>;
  grants_aggregate?: InputMaybe<Grants_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  issuer?: InputMaybe<Order_By>;
  lastName?: InputMaybe<Order_By>;
  likedBy_aggregate?: InputMaybe<Likes_Aggregate_Order_By>;
  likes_aggregate?: InputMaybe<Likes_Aggregate_Order_By>;
  linkedinLink?: InputMaybe<Order_By>;
  profileImage?: InputMaybe<Order_By>;
  projects_aggregate?: InputMaybe<Project_Aggregate_Order_By>;
  publicAddress?: InputMaybe<Order_By>;
  twitterLink?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** primary key columns input for table: User */
export type User_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "User" */
export enum User_Select_Column {
  /** column name */
  ActivityId = 'activityId',
  /** column name */
  Bio = 'bio',
  /** column name */
  Company = 'company',
  /** column name */
  Email = 'email',
  /** column name */
  Featured = 'featured',
  /** column name */
  FirstName = 'firstName',
  /** column name */
  GlobalRole = 'globalRole',
  /** column name */
  GlobalTitle = 'globalTitle',
  /** column name */
  Id = 'id',
  /** column name */
  Issuer = 'issuer',
  /** column name */
  LastName = 'lastName',
  /** column name */
  LinkedinLink = 'linkedinLink',
  /** column name */
  ProfileImage = 'profileImage',
  /** column name */
  PublicAddress = 'publicAddress',
  /** column name */
  TwitterLink = 'twitterLink',
  /** column name */
  Website = 'website'
}

/** input type for updating data in table "User" */
export type User_Set_Input = {
  activityId?: InputMaybe<Scalars['uuid']>;
  bio?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  featured?: InputMaybe<Scalars['Boolean']>;
  firstName?: InputMaybe<Scalars['String']>;
  globalRole?: InputMaybe<Scalars['String']>;
  globalTitle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  issuer?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  linkedinLink?: InputMaybe<Scalars['String']>;
  profileImage?: InputMaybe<Scalars['String']>;
  publicAddress?: InputMaybe<Scalars['String']>;
  twitterLink?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

/** update columns of table "User" */
export enum User_Update_Column {
  /** column name */
  ActivityId = 'activityId',
  /** column name */
  Bio = 'bio',
  /** column name */
  Company = 'company',
  /** column name */
  Email = 'email',
  /** column name */
  Featured = 'featured',
  /** column name */
  FirstName = 'firstName',
  /** column name */
  GlobalRole = 'globalRole',
  /** column name */
  GlobalTitle = 'globalTitle',
  /** column name */
  Id = 'id',
  /** column name */
  Issuer = 'issuer',
  /** column name */
  LastName = 'lastName',
  /** column name */
  LinkedinLink = 'linkedinLink',
  /** column name */
  ProfileImage = 'profileImage',
  /** column name */
  PublicAddress = 'publicAddress',
  /** column name */
  TwitterLink = 'twitterLink',
  /** column name */
  Website = 'website'
}

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']>;
  _gt?: InputMaybe<Scalars['bigint']>;
  _gte?: InputMaybe<Scalars['bigint']>;
  _in?: InputMaybe<Array<Scalars['bigint']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['bigint']>;
  _lte?: InputMaybe<Scalars['bigint']>;
  _neq?: InputMaybe<Scalars['bigint']>;
  _nin?: InputMaybe<Array<Scalars['bigint']>>;
};

/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['float8']>;
  _gt?: InputMaybe<Scalars['float8']>;
  _gte?: InputMaybe<Scalars['float8']>;
  _in?: InputMaybe<Array<Scalars['float8']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['float8']>;
  _lte?: InputMaybe<Scalars['float8']>;
  _neq?: InputMaybe<Scalars['float8']>;
  _nin?: InputMaybe<Array<Scalars['float8']>>;
};

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['json']>;
  _gt?: InputMaybe<Scalars['json']>;
  _gte?: InputMaybe<Scalars['json']>;
  _in?: InputMaybe<Array<Scalars['json']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['json']>;
  _lte?: InputMaybe<Scalars['json']>;
  _neq?: InputMaybe<Scalars['json']>;
  _nin?: InputMaybe<Array<Scalars['json']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "Donations" */
  delete_Donations?: Maybe<Donations_Mutation_Response>;
  /** delete single row from the table: "Donations" */
  delete_Donations_by_pk?: Maybe<Donations>;
  /** delete data from the table: "Follows" */
  delete_Follows?: Maybe<Follows_Mutation_Response>;
  /** delete single row from the table: "Follows" */
  delete_Follows_by_pk?: Maybe<Follows>;
  /** delete data from the table: "GrantCategories" */
  delete_GrantCategories?: Maybe<GrantCategories_Mutation_Response>;
  /** delete data from the table: "GrantCategoriesBridge" */
  delete_GrantCategoriesBridge?: Maybe<GrantCategoriesBridge_Mutation_Response>;
  /** delete single row from the table: "GrantCategoriesBridge" */
  delete_GrantCategoriesBridge_by_pk?: Maybe<GrantCategoriesBridge>;
  /** delete single row from the table: "GrantCategories" */
  delete_GrantCategories_by_pk?: Maybe<GrantCategories>;
  /** delete data from the table: "GrantCycles" */
  delete_GrantCycles?: Maybe<GrantCycles_Mutation_Response>;
  /** delete single row from the table: "GrantCycles" */
  delete_GrantCycles_by_pk?: Maybe<GrantCycles>;
  /** delete data from the table: "GrantOwners" */
  delete_GrantOwners?: Maybe<GrantOwners_Mutation_Response>;
  /** delete data from the table: "GrantOwnersTiers" */
  delete_GrantOwnersTiers?: Maybe<GrantOwnersTiers_Mutation_Response>;
  /** delete single row from the table: "GrantOwnersTiers" */
  delete_GrantOwnersTiers_by_pk?: Maybe<GrantOwnersTiers>;
  /** delete single row from the table: "GrantOwners" */
  delete_GrantOwners_by_pk?: Maybe<GrantOwners>;
  /** delete data from the table: "GrantSubmissionReview" */
  delete_GrantSubmissionReview?: Maybe<GrantSubmissionReview_Mutation_Response>;
  /** delete single row from the table: "GrantSubmissionReview" */
  delete_GrantSubmissionReview_by_pk?: Maybe<GrantSubmissionReview>;
  /** delete data from the table: "GrantSubmissions" */
  delete_GrantSubmissions?: Maybe<GrantSubmissions_Mutation_Response>;
  /** delete single row from the table: "GrantSubmissions" */
  delete_GrantSubmissions_by_pk?: Maybe<GrantSubmissions>;
  /** delete data from the table: "GrantTags" */
  delete_GrantTags?: Maybe<GrantTags_Mutation_Response>;
  /** delete data from the table: "GrantTagsBridge" */
  delete_GrantTagsBridge?: Maybe<GrantTagsBridge_Mutation_Response>;
  /** delete single row from the table: "GrantTagsBridge" */
  delete_GrantTagsBridge_by_pk?: Maybe<GrantTagsBridge>;
  /** delete single row from the table: "GrantTags" */
  delete_GrantTags_by_pk?: Maybe<GrantTags>;
  /** delete data from the table: "Grants" */
  delete_Grants?: Maybe<Grants_Mutation_Response>;
  /** delete single row from the table: "Grants" */
  delete_Grants_by_pk?: Maybe<Grants>;
  /** delete data from the table: "Likes" */
  delete_Likes?: Maybe<Likes_Mutation_Response>;
  /** delete single row from the table: "Likes" */
  delete_Likes_by_pk?: Maybe<Likes>;
  /** delete data from the table: "Project" */
  delete_Project?: Maybe<Project_Mutation_Response>;
  /** delete data from the table: "ProjectMembers" */
  delete_ProjectMembers?: Maybe<ProjectMembers_Mutation_Response>;
  /** delete single row from the table: "ProjectMembers" */
  delete_ProjectMembers_by_pk?: Maybe<ProjectMembers>;
  /** delete data from the table: "ProjectTag" */
  delete_ProjectTag?: Maybe<ProjectTag_Mutation_Response>;
  /** delete single row from the table: "ProjectTag" */
  delete_ProjectTag_by_pk?: Maybe<ProjectTag>;
  /** delete data from the table: "ProjectTagsBridge" */
  delete_ProjectTagsBridge?: Maybe<ProjectTagsBridge_Mutation_Response>;
  /** delete single row from the table: "ProjectTagsBridge" */
  delete_ProjectTagsBridge_by_pk?: Maybe<ProjectTagsBridge>;
  /** delete data from the table: "ProjectType" */
  delete_ProjectType?: Maybe<ProjectType_Mutation_Response>;
  /** delete data from the table: "ProjectTypeBridge" */
  delete_ProjectTypeBridge?: Maybe<ProjectTypeBridge_Mutation_Response>;
  /** delete single row from the table: "ProjectTypeBridge" */
  delete_ProjectTypeBridge_by_pk?: Maybe<ProjectTypeBridge>;
  /** delete single row from the table: "ProjectType" */
  delete_ProjectType_by_pk?: Maybe<ProjectType>;
  /** delete single row from the table: "Project" */
  delete_Project_by_pk?: Maybe<Project>;
  /** delete data from the table: "Swaps" */
  delete_Swaps?: Maybe<Swaps_Mutation_Response>;
  /** delete single row from the table: "Swaps" */
  delete_Swaps_by_pk?: Maybe<Swaps>;
  /** delete data from the table: "TopUpWallet" */
  delete_TopUpWallet?: Maybe<TopUpWallet_Mutation_Response>;
  /** delete single row from the table: "TopUpWallet" */
  delete_TopUpWallet_by_pk?: Maybe<TopUpWallet>;
  /** delete data from the table: "User" */
  delete_User?: Maybe<User_Mutation_Response>;
  /** delete single row from the table: "User" */
  delete_User_by_pk?: Maybe<User>;
  /** insert data into the table: "Donations" */
  insert_Donations?: Maybe<Donations_Mutation_Response>;
  /** insert a single row into the table: "Donations" */
  insert_Donations_one?: Maybe<Donations>;
  /** insert data into the table: "Follows" */
  insert_Follows?: Maybe<Follows_Mutation_Response>;
  /** insert a single row into the table: "Follows" */
  insert_Follows_one?: Maybe<Follows>;
  /** insert data into the table: "GrantCategories" */
  insert_GrantCategories?: Maybe<GrantCategories_Mutation_Response>;
  /** insert data into the table: "GrantCategoriesBridge" */
  insert_GrantCategoriesBridge?: Maybe<GrantCategoriesBridge_Mutation_Response>;
  /** insert a single row into the table: "GrantCategoriesBridge" */
  insert_GrantCategoriesBridge_one?: Maybe<GrantCategoriesBridge>;
  /** insert a single row into the table: "GrantCategories" */
  insert_GrantCategories_one?: Maybe<GrantCategories>;
  /** insert data into the table: "GrantCycles" */
  insert_GrantCycles?: Maybe<GrantCycles_Mutation_Response>;
  /** insert a single row into the table: "GrantCycles" */
  insert_GrantCycles_one?: Maybe<GrantCycles>;
  /** insert data into the table: "GrantOwners" */
  insert_GrantOwners?: Maybe<GrantOwners_Mutation_Response>;
  /** insert data into the table: "GrantOwnersTiers" */
  insert_GrantOwnersTiers?: Maybe<GrantOwnersTiers_Mutation_Response>;
  /** insert a single row into the table: "GrantOwnersTiers" */
  insert_GrantOwnersTiers_one?: Maybe<GrantOwnersTiers>;
  /** insert a single row into the table: "GrantOwners" */
  insert_GrantOwners_one?: Maybe<GrantOwners>;
  /** insert data into the table: "GrantSubmissionReview" */
  insert_GrantSubmissionReview?: Maybe<GrantSubmissionReview_Mutation_Response>;
  /** insert a single row into the table: "GrantSubmissionReview" */
  insert_GrantSubmissionReview_one?: Maybe<GrantSubmissionReview>;
  /** insert data into the table: "GrantSubmissions" */
  insert_GrantSubmissions?: Maybe<GrantSubmissions_Mutation_Response>;
  /** insert a single row into the table: "GrantSubmissions" */
  insert_GrantSubmissions_one?: Maybe<GrantSubmissions>;
  /** insert data into the table: "GrantTags" */
  insert_GrantTags?: Maybe<GrantTags_Mutation_Response>;
  /** insert data into the table: "GrantTagsBridge" */
  insert_GrantTagsBridge?: Maybe<GrantTagsBridge_Mutation_Response>;
  /** insert a single row into the table: "GrantTagsBridge" */
  insert_GrantTagsBridge_one?: Maybe<GrantTagsBridge>;
  /** insert a single row into the table: "GrantTags" */
  insert_GrantTags_one?: Maybe<GrantTags>;
  /** insert data into the table: "Grants" */
  insert_Grants?: Maybe<Grants_Mutation_Response>;
  /** insert a single row into the table: "Grants" */
  insert_Grants_one?: Maybe<Grants>;
  /** insert data into the table: "Likes" */
  insert_Likes?: Maybe<Likes_Mutation_Response>;
  /** insert a single row into the table: "Likes" */
  insert_Likes_one?: Maybe<Likes>;
  /** insert data into the table: "Project" */
  insert_Project?: Maybe<Project_Mutation_Response>;
  /** insert data into the table: "ProjectMembers" */
  insert_ProjectMembers?: Maybe<ProjectMembers_Mutation_Response>;
  /** insert a single row into the table: "ProjectMembers" */
  insert_ProjectMembers_one?: Maybe<ProjectMembers>;
  /** insert data into the table: "ProjectTag" */
  insert_ProjectTag?: Maybe<ProjectTag_Mutation_Response>;
  /** insert a single row into the table: "ProjectTag" */
  insert_ProjectTag_one?: Maybe<ProjectTag>;
  /** insert data into the table: "ProjectTagsBridge" */
  insert_ProjectTagsBridge?: Maybe<ProjectTagsBridge_Mutation_Response>;
  /** insert a single row into the table: "ProjectTagsBridge" */
  insert_ProjectTagsBridge_one?: Maybe<ProjectTagsBridge>;
  /** insert data into the table: "ProjectType" */
  insert_ProjectType?: Maybe<ProjectType_Mutation_Response>;
  /** insert data into the table: "ProjectTypeBridge" */
  insert_ProjectTypeBridge?: Maybe<ProjectTypeBridge_Mutation_Response>;
  /** insert a single row into the table: "ProjectTypeBridge" */
  insert_ProjectTypeBridge_one?: Maybe<ProjectTypeBridge>;
  /** insert a single row into the table: "ProjectType" */
  insert_ProjectType_one?: Maybe<ProjectType>;
  /** insert a single row into the table: "Project" */
  insert_Project_one?: Maybe<Project>;
  /** insert data into the table: "Swaps" */
  insert_Swaps?: Maybe<Swaps_Mutation_Response>;
  /** insert a single row into the table: "Swaps" */
  insert_Swaps_one?: Maybe<Swaps>;
  /** insert data into the table: "TopUpWallet" */
  insert_TopUpWallet?: Maybe<TopUpWallet_Mutation_Response>;
  /** insert a single row into the table: "TopUpWallet" */
  insert_TopUpWallet_one?: Maybe<TopUpWallet>;
  /** insert data into the table: "User" */
  insert_User?: Maybe<User_Mutation_Response>;
  /** insert a single row into the table: "User" */
  insert_User_one?: Maybe<User>;
  /** update data of the table: "Donations" */
  update_Donations?: Maybe<Donations_Mutation_Response>;
  /** update single row of the table: "Donations" */
  update_Donations_by_pk?: Maybe<Donations>;
  /** update data of the table: "Follows" */
  update_Follows?: Maybe<Follows_Mutation_Response>;
  /** update single row of the table: "Follows" */
  update_Follows_by_pk?: Maybe<Follows>;
  /** update data of the table: "GrantCategories" */
  update_GrantCategories?: Maybe<GrantCategories_Mutation_Response>;
  /** update data of the table: "GrantCategoriesBridge" */
  update_GrantCategoriesBridge?: Maybe<GrantCategoriesBridge_Mutation_Response>;
  /** update single row of the table: "GrantCategoriesBridge" */
  update_GrantCategoriesBridge_by_pk?: Maybe<GrantCategoriesBridge>;
  /** update single row of the table: "GrantCategories" */
  update_GrantCategories_by_pk?: Maybe<GrantCategories>;
  /** update data of the table: "GrantCycles" */
  update_GrantCycles?: Maybe<GrantCycles_Mutation_Response>;
  /** update single row of the table: "GrantCycles" */
  update_GrantCycles_by_pk?: Maybe<GrantCycles>;
  /** update data of the table: "GrantOwners" */
  update_GrantOwners?: Maybe<GrantOwners_Mutation_Response>;
  /** update data of the table: "GrantOwnersTiers" */
  update_GrantOwnersTiers?: Maybe<GrantOwnersTiers_Mutation_Response>;
  /** update single row of the table: "GrantOwnersTiers" */
  update_GrantOwnersTiers_by_pk?: Maybe<GrantOwnersTiers>;
  /** update single row of the table: "GrantOwners" */
  update_GrantOwners_by_pk?: Maybe<GrantOwners>;
  /** update data of the table: "GrantSubmissionReview" */
  update_GrantSubmissionReview?: Maybe<GrantSubmissionReview_Mutation_Response>;
  /** update single row of the table: "GrantSubmissionReview" */
  update_GrantSubmissionReview_by_pk?: Maybe<GrantSubmissionReview>;
  /** update data of the table: "GrantSubmissions" */
  update_GrantSubmissions?: Maybe<GrantSubmissions_Mutation_Response>;
  /** update single row of the table: "GrantSubmissions" */
  update_GrantSubmissions_by_pk?: Maybe<GrantSubmissions>;
  /** update data of the table: "GrantTags" */
  update_GrantTags?: Maybe<GrantTags_Mutation_Response>;
  /** update data of the table: "GrantTagsBridge" */
  update_GrantTagsBridge?: Maybe<GrantTagsBridge_Mutation_Response>;
  /** update single row of the table: "GrantTagsBridge" */
  update_GrantTagsBridge_by_pk?: Maybe<GrantTagsBridge>;
  /** update single row of the table: "GrantTags" */
  update_GrantTags_by_pk?: Maybe<GrantTags>;
  /** update data of the table: "Grants" */
  update_Grants?: Maybe<Grants_Mutation_Response>;
  /** update single row of the table: "Grants" */
  update_Grants_by_pk?: Maybe<Grants>;
  /** update data of the table: "Likes" */
  update_Likes?: Maybe<Likes_Mutation_Response>;
  /** update single row of the table: "Likes" */
  update_Likes_by_pk?: Maybe<Likes>;
  /** update data of the table: "Project" */
  update_Project?: Maybe<Project_Mutation_Response>;
  /** update data of the table: "ProjectMembers" */
  update_ProjectMembers?: Maybe<ProjectMembers_Mutation_Response>;
  /** update single row of the table: "ProjectMembers" */
  update_ProjectMembers_by_pk?: Maybe<ProjectMembers>;
  /** update data of the table: "ProjectTag" */
  update_ProjectTag?: Maybe<ProjectTag_Mutation_Response>;
  /** update single row of the table: "ProjectTag" */
  update_ProjectTag_by_pk?: Maybe<ProjectTag>;
  /** update data of the table: "ProjectTagsBridge" */
  update_ProjectTagsBridge?: Maybe<ProjectTagsBridge_Mutation_Response>;
  /** update single row of the table: "ProjectTagsBridge" */
  update_ProjectTagsBridge_by_pk?: Maybe<ProjectTagsBridge>;
  /** update data of the table: "ProjectType" */
  update_ProjectType?: Maybe<ProjectType_Mutation_Response>;
  /** update data of the table: "ProjectTypeBridge" */
  update_ProjectTypeBridge?: Maybe<ProjectTypeBridge_Mutation_Response>;
  /** update single row of the table: "ProjectTypeBridge" */
  update_ProjectTypeBridge_by_pk?: Maybe<ProjectTypeBridge>;
  /** update single row of the table: "ProjectType" */
  update_ProjectType_by_pk?: Maybe<ProjectType>;
  /** update single row of the table: "Project" */
  update_Project_by_pk?: Maybe<Project>;
  /** update data of the table: "Swaps" */
  update_Swaps?: Maybe<Swaps_Mutation_Response>;
  /** update single row of the table: "Swaps" */
  update_Swaps_by_pk?: Maybe<Swaps>;
  /** update data of the table: "TopUpWallet" */
  update_TopUpWallet?: Maybe<TopUpWallet_Mutation_Response>;
  /** update single row of the table: "TopUpWallet" */
  update_TopUpWallet_by_pk?: Maybe<TopUpWallet>;
  /** update data of the table: "User" */
  update_User?: Maybe<User_Mutation_Response>;
  /** update single row of the table: "User" */
  update_User_by_pk?: Maybe<User>;
};


/** mutation root */
export type Mutation_RootDelete_DonationsArgs = {
  where: Donations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Donations_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_FollowsArgs = {
  where: Follows_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Follows_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_GrantCategoriesArgs = {
  where: GrantCategories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_GrantCategoriesBridgeArgs = {
  where: GrantCategoriesBridge_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_GrantCategoriesBridge_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_GrantCategories_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_GrantCyclesArgs = {
  where: GrantCycles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_GrantCycles_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_GrantOwnersArgs = {
  where: GrantOwners_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_GrantOwnersTiersArgs = {
  where: GrantOwnersTiers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_GrantOwnersTiers_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_GrantOwners_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_GrantSubmissionReviewArgs = {
  where: GrantSubmissionReview_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_GrantSubmissionReview_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_GrantSubmissionsArgs = {
  where: GrantSubmissions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_GrantSubmissions_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_GrantTagsArgs = {
  where: GrantTags_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_GrantTagsBridgeArgs = {
  where: GrantTagsBridge_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_GrantTagsBridge_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_GrantTags_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_GrantsArgs = {
  where: Grants_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Grants_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_LikesArgs = {
  where: Likes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Likes_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ProjectArgs = {
  where: Project_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ProjectMembersArgs = {
  where: ProjectMembers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ProjectMembers_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ProjectTagArgs = {
  where: ProjectTag_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ProjectTag_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ProjectTagsBridgeArgs = {
  where: ProjectTagsBridge_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ProjectTagsBridge_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ProjectTypeArgs = {
  where: ProjectType_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ProjectTypeBridgeArgs = {
  where: ProjectTypeBridge_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ProjectTypeBridge_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ProjectType_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Project_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_SwapsArgs = {
  where: Swaps_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Swaps_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_TopUpWalletArgs = {
  where: TopUpWallet_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_TopUpWallet_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UserArgs = {
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_DonationsArgs = {
  objects: Array<Donations_Insert_Input>;
  on_conflict?: InputMaybe<Donations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Donations_OneArgs = {
  object: Donations_Insert_Input;
  on_conflict?: InputMaybe<Donations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_FollowsArgs = {
  objects: Array<Follows_Insert_Input>;
  on_conflict?: InputMaybe<Follows_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Follows_OneArgs = {
  object: Follows_Insert_Input;
  on_conflict?: InputMaybe<Follows_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GrantCategoriesArgs = {
  objects: Array<GrantCategories_Insert_Input>;
  on_conflict?: InputMaybe<GrantCategories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GrantCategoriesBridgeArgs = {
  objects: Array<GrantCategoriesBridge_Insert_Input>;
  on_conflict?: InputMaybe<GrantCategoriesBridge_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GrantCategoriesBridge_OneArgs = {
  object: GrantCategoriesBridge_Insert_Input;
  on_conflict?: InputMaybe<GrantCategoriesBridge_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GrantCategories_OneArgs = {
  object: GrantCategories_Insert_Input;
  on_conflict?: InputMaybe<GrantCategories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GrantCyclesArgs = {
  objects: Array<GrantCycles_Insert_Input>;
  on_conflict?: InputMaybe<GrantCycles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GrantCycles_OneArgs = {
  object: GrantCycles_Insert_Input;
  on_conflict?: InputMaybe<GrantCycles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GrantOwnersArgs = {
  objects: Array<GrantOwners_Insert_Input>;
  on_conflict?: InputMaybe<GrantOwners_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GrantOwnersTiersArgs = {
  objects: Array<GrantOwnersTiers_Insert_Input>;
  on_conflict?: InputMaybe<GrantOwnersTiers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GrantOwnersTiers_OneArgs = {
  object: GrantOwnersTiers_Insert_Input;
  on_conflict?: InputMaybe<GrantOwnersTiers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GrantOwners_OneArgs = {
  object: GrantOwners_Insert_Input;
  on_conflict?: InputMaybe<GrantOwners_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GrantSubmissionReviewArgs = {
  objects: Array<GrantSubmissionReview_Insert_Input>;
  on_conflict?: InputMaybe<GrantSubmissionReview_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GrantSubmissionReview_OneArgs = {
  object: GrantSubmissionReview_Insert_Input;
  on_conflict?: InputMaybe<GrantSubmissionReview_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GrantSubmissionsArgs = {
  objects: Array<GrantSubmissions_Insert_Input>;
  on_conflict?: InputMaybe<GrantSubmissions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GrantSubmissions_OneArgs = {
  object: GrantSubmissions_Insert_Input;
  on_conflict?: InputMaybe<GrantSubmissions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GrantTagsArgs = {
  objects: Array<GrantTags_Insert_Input>;
  on_conflict?: InputMaybe<GrantTags_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GrantTagsBridgeArgs = {
  objects: Array<GrantTagsBridge_Insert_Input>;
  on_conflict?: InputMaybe<GrantTagsBridge_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GrantTagsBridge_OneArgs = {
  object: GrantTagsBridge_Insert_Input;
  on_conflict?: InputMaybe<GrantTagsBridge_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GrantTags_OneArgs = {
  object: GrantTags_Insert_Input;
  on_conflict?: InputMaybe<GrantTags_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GrantsArgs = {
  objects: Array<Grants_Insert_Input>;
  on_conflict?: InputMaybe<Grants_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Grants_OneArgs = {
  object: Grants_Insert_Input;
  on_conflict?: InputMaybe<Grants_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_LikesArgs = {
  objects: Array<Likes_Insert_Input>;
  on_conflict?: InputMaybe<Likes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Likes_OneArgs = {
  object: Likes_Insert_Input;
  on_conflict?: InputMaybe<Likes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProjectArgs = {
  objects: Array<Project_Insert_Input>;
  on_conflict?: InputMaybe<Project_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProjectMembersArgs = {
  objects: Array<ProjectMembers_Insert_Input>;
  on_conflict?: InputMaybe<ProjectMembers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProjectMembers_OneArgs = {
  object: ProjectMembers_Insert_Input;
  on_conflict?: InputMaybe<ProjectMembers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProjectTagArgs = {
  objects: Array<ProjectTag_Insert_Input>;
  on_conflict?: InputMaybe<ProjectTag_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProjectTag_OneArgs = {
  object: ProjectTag_Insert_Input;
  on_conflict?: InputMaybe<ProjectTag_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProjectTagsBridgeArgs = {
  objects: Array<ProjectTagsBridge_Insert_Input>;
  on_conflict?: InputMaybe<ProjectTagsBridge_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProjectTagsBridge_OneArgs = {
  object: ProjectTagsBridge_Insert_Input;
  on_conflict?: InputMaybe<ProjectTagsBridge_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProjectTypeArgs = {
  objects: Array<ProjectType_Insert_Input>;
  on_conflict?: InputMaybe<ProjectType_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProjectTypeBridgeArgs = {
  objects: Array<ProjectTypeBridge_Insert_Input>;
  on_conflict?: InputMaybe<ProjectTypeBridge_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProjectTypeBridge_OneArgs = {
  object: ProjectTypeBridge_Insert_Input;
  on_conflict?: InputMaybe<ProjectTypeBridge_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProjectType_OneArgs = {
  object: ProjectType_Insert_Input;
  on_conflict?: InputMaybe<ProjectType_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Project_OneArgs = {
  object: Project_Insert_Input;
  on_conflict?: InputMaybe<Project_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SwapsArgs = {
  objects: Array<Swaps_Insert_Input>;
  on_conflict?: InputMaybe<Swaps_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Swaps_OneArgs = {
  object: Swaps_Insert_Input;
  on_conflict?: InputMaybe<Swaps_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TopUpWalletArgs = {
  objects: Array<TopUpWallet_Insert_Input>;
  on_conflict?: InputMaybe<TopUpWallet_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TopUpWallet_OneArgs = {
  object: TopUpWallet_Insert_Input;
  on_conflict?: InputMaybe<TopUpWallet_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserArgs = {
  objects: Array<User_Insert_Input>;
  on_conflict?: InputMaybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_OneArgs = {
  object: User_Insert_Input;
  on_conflict?: InputMaybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_DonationsArgs = {
  _inc?: InputMaybe<Donations_Inc_Input>;
  _set?: InputMaybe<Donations_Set_Input>;
  where: Donations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Donations_By_PkArgs = {
  _inc?: InputMaybe<Donations_Inc_Input>;
  _set?: InputMaybe<Donations_Set_Input>;
  pk_columns: Donations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_FollowsArgs = {
  _set?: InputMaybe<Follows_Set_Input>;
  where: Follows_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Follows_By_PkArgs = {
  _set?: InputMaybe<Follows_Set_Input>;
  pk_columns: Follows_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_GrantCategoriesArgs = {
  _set?: InputMaybe<GrantCategories_Set_Input>;
  where: GrantCategories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_GrantCategoriesBridgeArgs = {
  _set?: InputMaybe<GrantCategoriesBridge_Set_Input>;
  where: GrantCategoriesBridge_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_GrantCategoriesBridge_By_PkArgs = {
  _set?: InputMaybe<GrantCategoriesBridge_Set_Input>;
  pk_columns: GrantCategoriesBridge_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_GrantCategories_By_PkArgs = {
  _set?: InputMaybe<GrantCategories_Set_Input>;
  pk_columns: GrantCategories_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_GrantCyclesArgs = {
  _inc?: InputMaybe<GrantCycles_Inc_Input>;
  _set?: InputMaybe<GrantCycles_Set_Input>;
  where: GrantCycles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_GrantCycles_By_PkArgs = {
  _inc?: InputMaybe<GrantCycles_Inc_Input>;
  _set?: InputMaybe<GrantCycles_Set_Input>;
  pk_columns: GrantCycles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_GrantOwnersArgs = {
  _inc?: InputMaybe<GrantOwners_Inc_Input>;
  _set?: InputMaybe<GrantOwners_Set_Input>;
  where: GrantOwners_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_GrantOwnersTiersArgs = {
  _inc?: InputMaybe<GrantOwnersTiers_Inc_Input>;
  _set?: InputMaybe<GrantOwnersTiers_Set_Input>;
  where: GrantOwnersTiers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_GrantOwnersTiers_By_PkArgs = {
  _inc?: InputMaybe<GrantOwnersTiers_Inc_Input>;
  _set?: InputMaybe<GrantOwnersTiers_Set_Input>;
  pk_columns: GrantOwnersTiers_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_GrantOwners_By_PkArgs = {
  _inc?: InputMaybe<GrantOwners_Inc_Input>;
  _set?: InputMaybe<GrantOwners_Set_Input>;
  pk_columns: GrantOwners_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_GrantSubmissionReviewArgs = {
  _inc?: InputMaybe<GrantSubmissionReview_Inc_Input>;
  _set?: InputMaybe<GrantSubmissionReview_Set_Input>;
  where: GrantSubmissionReview_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_GrantSubmissionReview_By_PkArgs = {
  _inc?: InputMaybe<GrantSubmissionReview_Inc_Input>;
  _set?: InputMaybe<GrantSubmissionReview_Set_Input>;
  pk_columns: GrantSubmissionReview_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_GrantSubmissionsArgs = {
  _inc?: InputMaybe<GrantSubmissions_Inc_Input>;
  _set?: InputMaybe<GrantSubmissions_Set_Input>;
  where: GrantSubmissions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_GrantSubmissions_By_PkArgs = {
  _inc?: InputMaybe<GrantSubmissions_Inc_Input>;
  _set?: InputMaybe<GrantSubmissions_Set_Input>;
  pk_columns: GrantSubmissions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_GrantTagsArgs = {
  _set?: InputMaybe<GrantTags_Set_Input>;
  where: GrantTags_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_GrantTagsBridgeArgs = {
  _set?: InputMaybe<GrantTagsBridge_Set_Input>;
  where: GrantTagsBridge_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_GrantTagsBridge_By_PkArgs = {
  _set?: InputMaybe<GrantTagsBridge_Set_Input>;
  pk_columns: GrantTagsBridge_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_GrantTags_By_PkArgs = {
  _set?: InputMaybe<GrantTags_Set_Input>;
  pk_columns: GrantTags_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_GrantsArgs = {
  _inc?: InputMaybe<Grants_Inc_Input>;
  _set?: InputMaybe<Grants_Set_Input>;
  where: Grants_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Grants_By_PkArgs = {
  _inc?: InputMaybe<Grants_Inc_Input>;
  _set?: InputMaybe<Grants_Set_Input>;
  pk_columns: Grants_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_LikesArgs = {
  _set?: InputMaybe<Likes_Set_Input>;
  where: Likes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Likes_By_PkArgs = {
  _set?: InputMaybe<Likes_Set_Input>;
  pk_columns: Likes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ProjectArgs = {
  _inc?: InputMaybe<Project_Inc_Input>;
  _set?: InputMaybe<Project_Set_Input>;
  where: Project_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ProjectMembersArgs = {
  _set?: InputMaybe<ProjectMembers_Set_Input>;
  where: ProjectMembers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ProjectMembers_By_PkArgs = {
  _set?: InputMaybe<ProjectMembers_Set_Input>;
  pk_columns: ProjectMembers_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ProjectTagArgs = {
  _set?: InputMaybe<ProjectTag_Set_Input>;
  where: ProjectTag_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ProjectTag_By_PkArgs = {
  _set?: InputMaybe<ProjectTag_Set_Input>;
  pk_columns: ProjectTag_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ProjectTagsBridgeArgs = {
  _set?: InputMaybe<ProjectTagsBridge_Set_Input>;
  where: ProjectTagsBridge_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ProjectTagsBridge_By_PkArgs = {
  _set?: InputMaybe<ProjectTagsBridge_Set_Input>;
  pk_columns: ProjectTagsBridge_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ProjectTypeArgs = {
  _set?: InputMaybe<ProjectType_Set_Input>;
  where: ProjectType_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ProjectTypeBridgeArgs = {
  _set?: InputMaybe<ProjectTypeBridge_Set_Input>;
  where: ProjectTypeBridge_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ProjectTypeBridge_By_PkArgs = {
  _set?: InputMaybe<ProjectTypeBridge_Set_Input>;
  pk_columns: ProjectTypeBridge_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ProjectType_By_PkArgs = {
  _set?: InputMaybe<ProjectType_Set_Input>;
  pk_columns: ProjectType_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Project_By_PkArgs = {
  _inc?: InputMaybe<Project_Inc_Input>;
  _set?: InputMaybe<Project_Set_Input>;
  pk_columns: Project_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_SwapsArgs = {
  _inc?: InputMaybe<Swaps_Inc_Input>;
  _set?: InputMaybe<Swaps_Set_Input>;
  where: Swaps_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Swaps_By_PkArgs = {
  _inc?: InputMaybe<Swaps_Inc_Input>;
  _set?: InputMaybe<Swaps_Set_Input>;
  pk_columns: Swaps_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_TopUpWalletArgs = {
  _inc?: InputMaybe<TopUpWallet_Inc_Input>;
  _set?: InputMaybe<TopUpWallet_Set_Input>;
  where: TopUpWallet_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_TopUpWallet_By_PkArgs = {
  _inc?: InputMaybe<TopUpWallet_Inc_Input>;
  _set?: InputMaybe<TopUpWallet_Set_Input>;
  pk_columns: TopUpWallet_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UserArgs = {
  _set?: InputMaybe<User_Set_Input>;
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_By_PkArgs = {
  _set?: InputMaybe<User_Set_Input>;
  pk_columns: User_Pk_Columns_Input;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "Donations" */
  Donations: Array<Donations>;
  /** fetch aggregated fields from the table: "Donations" */
  Donations_aggregate: Donations_Aggregate;
  /** fetch data from the table: "Donations" using primary key columns */
  Donations_by_pk?: Maybe<Donations>;
  /** fetch data from the table: "Follows" */
  Follows: Array<Follows>;
  /** fetch aggregated fields from the table: "Follows" */
  Follows_aggregate: Follows_Aggregate;
  /** fetch data from the table: "Follows" using primary key columns */
  Follows_by_pk?: Maybe<Follows>;
  /** fetch data from the table: "GrantCategories" */
  GrantCategories: Array<GrantCategories>;
  /** fetch data from the table: "GrantCategoriesBridge" */
  GrantCategoriesBridge: Array<GrantCategoriesBridge>;
  /** fetch aggregated fields from the table: "GrantCategoriesBridge" */
  GrantCategoriesBridge_aggregate: GrantCategoriesBridge_Aggregate;
  /** fetch data from the table: "GrantCategoriesBridge" using primary key columns */
  GrantCategoriesBridge_by_pk?: Maybe<GrantCategoriesBridge>;
  /** fetch aggregated fields from the table: "GrantCategories" */
  GrantCategories_aggregate: GrantCategories_Aggregate;
  /** fetch data from the table: "GrantCategories" using primary key columns */
  GrantCategories_by_pk?: Maybe<GrantCategories>;
  /** fetch data from the table: "GrantCycles" */
  GrantCycles: Array<GrantCycles>;
  /** fetch aggregated fields from the table: "GrantCycles" */
  GrantCycles_aggregate: GrantCycles_Aggregate;
  /** fetch data from the table: "GrantCycles" using primary key columns */
  GrantCycles_by_pk?: Maybe<GrantCycles>;
  /** An array relationship */
  GrantOwners: Array<GrantOwners>;
  /** fetch data from the table: "GrantOwnersTiers" */
  GrantOwnersTiers: Array<GrantOwnersTiers>;
  /** fetch aggregated fields from the table: "GrantOwnersTiers" */
  GrantOwnersTiers_aggregate: GrantOwnersTiers_Aggregate;
  /** fetch data from the table: "GrantOwnersTiers" using primary key columns */
  GrantOwnersTiers_by_pk?: Maybe<GrantOwnersTiers>;
  /** An aggregate relationship */
  GrantOwners_aggregate: GrantOwners_Aggregate;
  /** fetch data from the table: "GrantOwners" using primary key columns */
  GrantOwners_by_pk?: Maybe<GrantOwners>;
  /** fetch data from the table: "GrantSubmissionReview" */
  GrantSubmissionReview: Array<GrantSubmissionReview>;
  /** fetch aggregated fields from the table: "GrantSubmissionReview" */
  GrantSubmissionReview_aggregate: GrantSubmissionReview_Aggregate;
  /** fetch data from the table: "GrantSubmissionReview" using primary key columns */
  GrantSubmissionReview_by_pk?: Maybe<GrantSubmissionReview>;
  /** fetch data from the table: "GrantSubmissions" */
  GrantSubmissions: Array<GrantSubmissions>;
  /** fetch aggregated fields from the table: "GrantSubmissions" */
  GrantSubmissions_aggregate: GrantSubmissions_Aggregate;
  /** fetch data from the table: "GrantSubmissions" using primary key columns */
  GrantSubmissions_by_pk?: Maybe<GrantSubmissions>;
  /** fetch data from the table: "GrantTags" */
  GrantTags: Array<GrantTags>;
  /** fetch data from the table: "GrantTagsBridge" */
  GrantTagsBridge: Array<GrantTagsBridge>;
  /** fetch aggregated fields from the table: "GrantTagsBridge" */
  GrantTagsBridge_aggregate: GrantTagsBridge_Aggregate;
  /** fetch data from the table: "GrantTagsBridge" using primary key columns */
  GrantTagsBridge_by_pk?: Maybe<GrantTagsBridge>;
  /** fetch aggregated fields from the table: "GrantTags" */
  GrantTags_aggregate: GrantTags_Aggregate;
  /** fetch data from the table: "GrantTags" using primary key columns */
  GrantTags_by_pk?: Maybe<GrantTags>;
  /** fetch data from the table: "Grants" */
  Grants: Array<Grants>;
  /** fetch aggregated fields from the table: "Grants" */
  Grants_aggregate: Grants_Aggregate;
  /** fetch data from the table: "Grants" using primary key columns */
  Grants_by_pk?: Maybe<Grants>;
  /** An array relationship */
  Likes: Array<Likes>;
  /** An aggregate relationship */
  Likes_aggregate: Likes_Aggregate;
  /** fetch data from the table: "Likes" using primary key columns */
  Likes_by_pk?: Maybe<Likes>;
  /** fetch data from the table: "Project" */
  Project: Array<Project>;
  /** An array relationship */
  ProjectMembers: Array<ProjectMembers>;
  /** An aggregate relationship */
  ProjectMembers_aggregate: ProjectMembers_Aggregate;
  /** fetch data from the table: "ProjectMembers" using primary key columns */
  ProjectMembers_by_pk?: Maybe<ProjectMembers>;
  /** fetch data from the table: "ProjectTag" */
  ProjectTag: Array<ProjectTag>;
  /** fetch aggregated fields from the table: "ProjectTag" */
  ProjectTag_aggregate: ProjectTag_Aggregate;
  /** fetch data from the table: "ProjectTag" using primary key columns */
  ProjectTag_by_pk?: Maybe<ProjectTag>;
  /** fetch data from the table: "ProjectTagsBridge" */
  ProjectTagsBridge: Array<ProjectTagsBridge>;
  /** fetch aggregated fields from the table: "ProjectTagsBridge" */
  ProjectTagsBridge_aggregate: ProjectTagsBridge_Aggregate;
  /** fetch data from the table: "ProjectTagsBridge" using primary key columns */
  ProjectTagsBridge_by_pk?: Maybe<ProjectTagsBridge>;
  /** fetch data from the table: "ProjectType" */
  ProjectType: Array<ProjectType>;
  /** fetch data from the table: "ProjectTypeBridge" */
  ProjectTypeBridge: Array<ProjectTypeBridge>;
  /** fetch aggregated fields from the table: "ProjectTypeBridge" */
  ProjectTypeBridge_aggregate: ProjectTypeBridge_Aggregate;
  /** fetch data from the table: "ProjectTypeBridge" using primary key columns */
  ProjectTypeBridge_by_pk?: Maybe<ProjectTypeBridge>;
  /** fetch aggregated fields from the table: "ProjectType" */
  ProjectType_aggregate: ProjectType_Aggregate;
  /** fetch data from the table: "ProjectType" using primary key columns */
  ProjectType_by_pk?: Maybe<ProjectType>;
  /** fetch aggregated fields from the table: "Project" */
  Project_aggregate: Project_Aggregate;
  /** fetch data from the table: "Project" using primary key columns */
  Project_by_pk?: Maybe<Project>;
  /** fetch data from the table: "Swaps" */
  Swaps: Array<Swaps>;
  /** fetch aggregated fields from the table: "Swaps" */
  Swaps_aggregate: Swaps_Aggregate;
  /** fetch data from the table: "Swaps" using primary key columns */
  Swaps_by_pk?: Maybe<Swaps>;
  /** fetch data from the table: "TopUpWallet" */
  TopUpWallet: Array<TopUpWallet>;
  /** fetch aggregated fields from the table: "TopUpWallet" */
  TopUpWallet_aggregate: TopUpWallet_Aggregate;
  /** fetch data from the table: "TopUpWallet" using primary key columns */
  TopUpWallet_by_pk?: Maybe<TopUpWallet>;
  /** fetch data from the table: "User" */
  User: Array<User>;
  /** fetch aggregated fields from the table: "User" */
  User_aggregate: User_Aggregate;
  /** fetch data from the table: "User" using primary key columns */
  User_by_pk?: Maybe<User>;
};


export type Query_RootDonationsArgs = {
  distinct_on?: InputMaybe<Array<Donations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Donations_Order_By>>;
  where?: InputMaybe<Donations_Bool_Exp>;
};


export type Query_RootDonations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Donations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Donations_Order_By>>;
  where?: InputMaybe<Donations_Bool_Exp>;
};


export type Query_RootDonations_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootFollowsArgs = {
  distinct_on?: InputMaybe<Array<Follows_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Follows_Order_By>>;
  where?: InputMaybe<Follows_Bool_Exp>;
};


export type Query_RootFollows_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Follows_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Follows_Order_By>>;
  where?: InputMaybe<Follows_Bool_Exp>;
};


export type Query_RootFollows_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGrantCategoriesArgs = {
  distinct_on?: InputMaybe<Array<GrantCategories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantCategories_Order_By>>;
  where?: InputMaybe<GrantCategories_Bool_Exp>;
};


export type Query_RootGrantCategoriesBridgeArgs = {
  distinct_on?: InputMaybe<Array<GrantCategoriesBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantCategoriesBridge_Order_By>>;
  where?: InputMaybe<GrantCategoriesBridge_Bool_Exp>;
};


export type Query_RootGrantCategoriesBridge_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantCategoriesBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantCategoriesBridge_Order_By>>;
  where?: InputMaybe<GrantCategoriesBridge_Bool_Exp>;
};


export type Query_RootGrantCategoriesBridge_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGrantCategories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantCategories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantCategories_Order_By>>;
  where?: InputMaybe<GrantCategories_Bool_Exp>;
};


export type Query_RootGrantCategories_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGrantCyclesArgs = {
  distinct_on?: InputMaybe<Array<GrantCycles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantCycles_Order_By>>;
  where?: InputMaybe<GrantCycles_Bool_Exp>;
};


export type Query_RootGrantCycles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantCycles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantCycles_Order_By>>;
  where?: InputMaybe<GrantCycles_Bool_Exp>;
};


export type Query_RootGrantCycles_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGrantOwnersArgs = {
  distinct_on?: InputMaybe<Array<GrantOwners_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantOwners_Order_By>>;
  where?: InputMaybe<GrantOwners_Bool_Exp>;
};


export type Query_RootGrantOwnersTiersArgs = {
  distinct_on?: InputMaybe<Array<GrantOwnersTiers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantOwnersTiers_Order_By>>;
  where?: InputMaybe<GrantOwnersTiers_Bool_Exp>;
};


export type Query_RootGrantOwnersTiers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantOwnersTiers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantOwnersTiers_Order_By>>;
  where?: InputMaybe<GrantOwnersTiers_Bool_Exp>;
};


export type Query_RootGrantOwnersTiers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGrantOwners_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantOwners_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantOwners_Order_By>>;
  where?: InputMaybe<GrantOwners_Bool_Exp>;
};


export type Query_RootGrantOwners_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGrantSubmissionReviewArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissionReview_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantSubmissionReview_Order_By>>;
  where?: InputMaybe<GrantSubmissionReview_Bool_Exp>;
};


export type Query_RootGrantSubmissionReview_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissionReview_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantSubmissionReview_Order_By>>;
  where?: InputMaybe<GrantSubmissionReview_Bool_Exp>;
};


export type Query_RootGrantSubmissionReview_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGrantSubmissionsArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantSubmissions_Order_By>>;
  where?: InputMaybe<GrantSubmissions_Bool_Exp>;
};


export type Query_RootGrantSubmissions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantSubmissions_Order_By>>;
  where?: InputMaybe<GrantSubmissions_Bool_Exp>;
};


export type Query_RootGrantSubmissions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGrantTagsArgs = {
  distinct_on?: InputMaybe<Array<GrantTags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantTags_Order_By>>;
  where?: InputMaybe<GrantTags_Bool_Exp>;
};


export type Query_RootGrantTagsBridgeArgs = {
  distinct_on?: InputMaybe<Array<GrantTagsBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantTagsBridge_Order_By>>;
  where?: InputMaybe<GrantTagsBridge_Bool_Exp>;
};


export type Query_RootGrantTagsBridge_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantTagsBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantTagsBridge_Order_By>>;
  where?: InputMaybe<GrantTagsBridge_Bool_Exp>;
};


export type Query_RootGrantTagsBridge_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGrantTags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantTags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantTags_Order_By>>;
  where?: InputMaybe<GrantTags_Bool_Exp>;
};


export type Query_RootGrantTags_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGrantsArgs = {
  distinct_on?: InputMaybe<Array<Grants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Grants_Order_By>>;
  where?: InputMaybe<Grants_Bool_Exp>;
};


export type Query_RootGrants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Grants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Grants_Order_By>>;
  where?: InputMaybe<Grants_Bool_Exp>;
};


export type Query_RootGrants_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootLikesArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};


export type Query_RootLikes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};


export type Query_RootLikes_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProjectArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Order_By>>;
  where?: InputMaybe<Project_Bool_Exp>;
};


export type Query_RootProjectMembersArgs = {
  distinct_on?: InputMaybe<Array<ProjectMembers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectMembers_Order_By>>;
  where?: InputMaybe<ProjectMembers_Bool_Exp>;
};


export type Query_RootProjectMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectMembers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectMembers_Order_By>>;
  where?: InputMaybe<ProjectMembers_Bool_Exp>;
};


export type Query_RootProjectMembers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProjectTagArgs = {
  distinct_on?: InputMaybe<Array<ProjectTag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectTag_Order_By>>;
  where?: InputMaybe<ProjectTag_Bool_Exp>;
};


export type Query_RootProjectTag_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectTag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectTag_Order_By>>;
  where?: InputMaybe<ProjectTag_Bool_Exp>;
};


export type Query_RootProjectTag_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProjectTagsBridgeArgs = {
  distinct_on?: InputMaybe<Array<ProjectTagsBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectTagsBridge_Order_By>>;
  where?: InputMaybe<ProjectTagsBridge_Bool_Exp>;
};


export type Query_RootProjectTagsBridge_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectTagsBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectTagsBridge_Order_By>>;
  where?: InputMaybe<ProjectTagsBridge_Bool_Exp>;
};


export type Query_RootProjectTagsBridge_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProjectTypeArgs = {
  distinct_on?: InputMaybe<Array<ProjectType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectType_Order_By>>;
  where?: InputMaybe<ProjectType_Bool_Exp>;
};


export type Query_RootProjectTypeBridgeArgs = {
  distinct_on?: InputMaybe<Array<ProjectTypeBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectTypeBridge_Order_By>>;
  where?: InputMaybe<ProjectTypeBridge_Bool_Exp>;
};


export type Query_RootProjectTypeBridge_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectTypeBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectTypeBridge_Order_By>>;
  where?: InputMaybe<ProjectTypeBridge_Bool_Exp>;
};


export type Query_RootProjectTypeBridge_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProjectType_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectType_Order_By>>;
  where?: InputMaybe<ProjectType_Bool_Exp>;
};


export type Query_RootProjectType_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProject_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Order_By>>;
  where?: InputMaybe<Project_Bool_Exp>;
};


export type Query_RootProject_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootSwapsArgs = {
  distinct_on?: InputMaybe<Array<Swaps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Swaps_Order_By>>;
  where?: InputMaybe<Swaps_Bool_Exp>;
};


export type Query_RootSwaps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Swaps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Swaps_Order_By>>;
  where?: InputMaybe<Swaps_Bool_Exp>;
};


export type Query_RootSwaps_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootTopUpWalletArgs = {
  distinct_on?: InputMaybe<Array<TopUpWallet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<TopUpWallet_Order_By>>;
  where?: InputMaybe<TopUpWallet_Bool_Exp>;
};


export type Query_RootTopUpWallet_AggregateArgs = {
  distinct_on?: InputMaybe<Array<TopUpWallet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<TopUpWallet_Order_By>>;
  where?: InputMaybe<TopUpWallet_Bool_Exp>;
};


export type Query_RootTopUpWallet_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "Donations" */
  Donations: Array<Donations>;
  /** fetch aggregated fields from the table: "Donations" */
  Donations_aggregate: Donations_Aggregate;
  /** fetch data from the table: "Donations" using primary key columns */
  Donations_by_pk?: Maybe<Donations>;
  /** fetch data from the table: "Follows" */
  Follows: Array<Follows>;
  /** fetch aggregated fields from the table: "Follows" */
  Follows_aggregate: Follows_Aggregate;
  /** fetch data from the table: "Follows" using primary key columns */
  Follows_by_pk?: Maybe<Follows>;
  /** fetch data from the table: "GrantCategories" */
  GrantCategories: Array<GrantCategories>;
  /** fetch data from the table: "GrantCategoriesBridge" */
  GrantCategoriesBridge: Array<GrantCategoriesBridge>;
  /** fetch aggregated fields from the table: "GrantCategoriesBridge" */
  GrantCategoriesBridge_aggregate: GrantCategoriesBridge_Aggregate;
  /** fetch data from the table: "GrantCategoriesBridge" using primary key columns */
  GrantCategoriesBridge_by_pk?: Maybe<GrantCategoriesBridge>;
  /** fetch aggregated fields from the table: "GrantCategories" */
  GrantCategories_aggregate: GrantCategories_Aggregate;
  /** fetch data from the table: "GrantCategories" using primary key columns */
  GrantCategories_by_pk?: Maybe<GrantCategories>;
  /** fetch data from the table: "GrantCycles" */
  GrantCycles: Array<GrantCycles>;
  /** fetch aggregated fields from the table: "GrantCycles" */
  GrantCycles_aggregate: GrantCycles_Aggregate;
  /** fetch data from the table: "GrantCycles" using primary key columns */
  GrantCycles_by_pk?: Maybe<GrantCycles>;
  /** An array relationship */
  GrantOwners: Array<GrantOwners>;
  /** fetch data from the table: "GrantOwnersTiers" */
  GrantOwnersTiers: Array<GrantOwnersTiers>;
  /** fetch aggregated fields from the table: "GrantOwnersTiers" */
  GrantOwnersTiers_aggregate: GrantOwnersTiers_Aggregate;
  /** fetch data from the table: "GrantOwnersTiers" using primary key columns */
  GrantOwnersTiers_by_pk?: Maybe<GrantOwnersTiers>;
  /** An aggregate relationship */
  GrantOwners_aggregate: GrantOwners_Aggregate;
  /** fetch data from the table: "GrantOwners" using primary key columns */
  GrantOwners_by_pk?: Maybe<GrantOwners>;
  /** fetch data from the table: "GrantSubmissionReview" */
  GrantSubmissionReview: Array<GrantSubmissionReview>;
  /** fetch aggregated fields from the table: "GrantSubmissionReview" */
  GrantSubmissionReview_aggregate: GrantSubmissionReview_Aggregate;
  /** fetch data from the table: "GrantSubmissionReview" using primary key columns */
  GrantSubmissionReview_by_pk?: Maybe<GrantSubmissionReview>;
  /** fetch data from the table: "GrantSubmissions" */
  GrantSubmissions: Array<GrantSubmissions>;
  /** fetch aggregated fields from the table: "GrantSubmissions" */
  GrantSubmissions_aggregate: GrantSubmissions_Aggregate;
  /** fetch data from the table: "GrantSubmissions" using primary key columns */
  GrantSubmissions_by_pk?: Maybe<GrantSubmissions>;
  /** fetch data from the table: "GrantTags" */
  GrantTags: Array<GrantTags>;
  /** fetch data from the table: "GrantTagsBridge" */
  GrantTagsBridge: Array<GrantTagsBridge>;
  /** fetch aggregated fields from the table: "GrantTagsBridge" */
  GrantTagsBridge_aggregate: GrantTagsBridge_Aggregate;
  /** fetch data from the table: "GrantTagsBridge" using primary key columns */
  GrantTagsBridge_by_pk?: Maybe<GrantTagsBridge>;
  /** fetch aggregated fields from the table: "GrantTags" */
  GrantTags_aggregate: GrantTags_Aggregate;
  /** fetch data from the table: "GrantTags" using primary key columns */
  GrantTags_by_pk?: Maybe<GrantTags>;
  /** fetch data from the table: "Grants" */
  Grants: Array<Grants>;
  /** fetch aggregated fields from the table: "Grants" */
  Grants_aggregate: Grants_Aggregate;
  /** fetch data from the table: "Grants" using primary key columns */
  Grants_by_pk?: Maybe<Grants>;
  /** An array relationship */
  Likes: Array<Likes>;
  /** An aggregate relationship */
  Likes_aggregate: Likes_Aggregate;
  /** fetch data from the table: "Likes" using primary key columns */
  Likes_by_pk?: Maybe<Likes>;
  /** fetch data from the table: "Project" */
  Project: Array<Project>;
  /** An array relationship */
  ProjectMembers: Array<ProjectMembers>;
  /** An aggregate relationship */
  ProjectMembers_aggregate: ProjectMembers_Aggregate;
  /** fetch data from the table: "ProjectMembers" using primary key columns */
  ProjectMembers_by_pk?: Maybe<ProjectMembers>;
  /** fetch data from the table: "ProjectTag" */
  ProjectTag: Array<ProjectTag>;
  /** fetch aggregated fields from the table: "ProjectTag" */
  ProjectTag_aggregate: ProjectTag_Aggregate;
  /** fetch data from the table: "ProjectTag" using primary key columns */
  ProjectTag_by_pk?: Maybe<ProjectTag>;
  /** fetch data from the table: "ProjectTagsBridge" */
  ProjectTagsBridge: Array<ProjectTagsBridge>;
  /** fetch aggregated fields from the table: "ProjectTagsBridge" */
  ProjectTagsBridge_aggregate: ProjectTagsBridge_Aggregate;
  /** fetch data from the table: "ProjectTagsBridge" using primary key columns */
  ProjectTagsBridge_by_pk?: Maybe<ProjectTagsBridge>;
  /** fetch data from the table: "ProjectType" */
  ProjectType: Array<ProjectType>;
  /** fetch data from the table: "ProjectTypeBridge" */
  ProjectTypeBridge: Array<ProjectTypeBridge>;
  /** fetch aggregated fields from the table: "ProjectTypeBridge" */
  ProjectTypeBridge_aggregate: ProjectTypeBridge_Aggregate;
  /** fetch data from the table: "ProjectTypeBridge" using primary key columns */
  ProjectTypeBridge_by_pk?: Maybe<ProjectTypeBridge>;
  /** fetch aggregated fields from the table: "ProjectType" */
  ProjectType_aggregate: ProjectType_Aggregate;
  /** fetch data from the table: "ProjectType" using primary key columns */
  ProjectType_by_pk?: Maybe<ProjectType>;
  /** fetch aggregated fields from the table: "Project" */
  Project_aggregate: Project_Aggregate;
  /** fetch data from the table: "Project" using primary key columns */
  Project_by_pk?: Maybe<Project>;
  /** fetch data from the table: "Swaps" */
  Swaps: Array<Swaps>;
  /** fetch aggregated fields from the table: "Swaps" */
  Swaps_aggregate: Swaps_Aggregate;
  /** fetch data from the table: "Swaps" using primary key columns */
  Swaps_by_pk?: Maybe<Swaps>;
  /** fetch data from the table: "TopUpWallet" */
  TopUpWallet: Array<TopUpWallet>;
  /** fetch aggregated fields from the table: "TopUpWallet" */
  TopUpWallet_aggregate: TopUpWallet_Aggregate;
  /** fetch data from the table: "TopUpWallet" using primary key columns */
  TopUpWallet_by_pk?: Maybe<TopUpWallet>;
  /** fetch data from the table: "User" */
  User: Array<User>;
  /** fetch aggregated fields from the table: "User" */
  User_aggregate: User_Aggregate;
  /** fetch data from the table: "User" using primary key columns */
  User_by_pk?: Maybe<User>;
};


export type Subscription_RootDonationsArgs = {
  distinct_on?: InputMaybe<Array<Donations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Donations_Order_By>>;
  where?: InputMaybe<Donations_Bool_Exp>;
};


export type Subscription_RootDonations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Donations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Donations_Order_By>>;
  where?: InputMaybe<Donations_Bool_Exp>;
};


export type Subscription_RootDonations_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootFollowsArgs = {
  distinct_on?: InputMaybe<Array<Follows_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Follows_Order_By>>;
  where?: InputMaybe<Follows_Bool_Exp>;
};


export type Subscription_RootFollows_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Follows_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Follows_Order_By>>;
  where?: InputMaybe<Follows_Bool_Exp>;
};


export type Subscription_RootFollows_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGrantCategoriesArgs = {
  distinct_on?: InputMaybe<Array<GrantCategories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantCategories_Order_By>>;
  where?: InputMaybe<GrantCategories_Bool_Exp>;
};


export type Subscription_RootGrantCategoriesBridgeArgs = {
  distinct_on?: InputMaybe<Array<GrantCategoriesBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantCategoriesBridge_Order_By>>;
  where?: InputMaybe<GrantCategoriesBridge_Bool_Exp>;
};


export type Subscription_RootGrantCategoriesBridge_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantCategoriesBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantCategoriesBridge_Order_By>>;
  where?: InputMaybe<GrantCategoriesBridge_Bool_Exp>;
};


export type Subscription_RootGrantCategoriesBridge_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGrantCategories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantCategories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantCategories_Order_By>>;
  where?: InputMaybe<GrantCategories_Bool_Exp>;
};


export type Subscription_RootGrantCategories_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGrantCyclesArgs = {
  distinct_on?: InputMaybe<Array<GrantCycles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantCycles_Order_By>>;
  where?: InputMaybe<GrantCycles_Bool_Exp>;
};


export type Subscription_RootGrantCycles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantCycles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantCycles_Order_By>>;
  where?: InputMaybe<GrantCycles_Bool_Exp>;
};


export type Subscription_RootGrantCycles_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGrantOwnersArgs = {
  distinct_on?: InputMaybe<Array<GrantOwners_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantOwners_Order_By>>;
  where?: InputMaybe<GrantOwners_Bool_Exp>;
};


export type Subscription_RootGrantOwnersTiersArgs = {
  distinct_on?: InputMaybe<Array<GrantOwnersTiers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantOwnersTiers_Order_By>>;
  where?: InputMaybe<GrantOwnersTiers_Bool_Exp>;
};


export type Subscription_RootGrantOwnersTiers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantOwnersTiers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantOwnersTiers_Order_By>>;
  where?: InputMaybe<GrantOwnersTiers_Bool_Exp>;
};


export type Subscription_RootGrantOwnersTiers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGrantOwners_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantOwners_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantOwners_Order_By>>;
  where?: InputMaybe<GrantOwners_Bool_Exp>;
};


export type Subscription_RootGrantOwners_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGrantSubmissionReviewArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissionReview_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantSubmissionReview_Order_By>>;
  where?: InputMaybe<GrantSubmissionReview_Bool_Exp>;
};


export type Subscription_RootGrantSubmissionReview_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissionReview_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantSubmissionReview_Order_By>>;
  where?: InputMaybe<GrantSubmissionReview_Bool_Exp>;
};


export type Subscription_RootGrantSubmissionReview_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGrantSubmissionsArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantSubmissions_Order_By>>;
  where?: InputMaybe<GrantSubmissions_Bool_Exp>;
};


export type Subscription_RootGrantSubmissions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantSubmissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantSubmissions_Order_By>>;
  where?: InputMaybe<GrantSubmissions_Bool_Exp>;
};


export type Subscription_RootGrantSubmissions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGrantTagsArgs = {
  distinct_on?: InputMaybe<Array<GrantTags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantTags_Order_By>>;
  where?: InputMaybe<GrantTags_Bool_Exp>;
};


export type Subscription_RootGrantTagsBridgeArgs = {
  distinct_on?: InputMaybe<Array<GrantTagsBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantTagsBridge_Order_By>>;
  where?: InputMaybe<GrantTagsBridge_Bool_Exp>;
};


export type Subscription_RootGrantTagsBridge_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantTagsBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantTagsBridge_Order_By>>;
  where?: InputMaybe<GrantTagsBridge_Bool_Exp>;
};


export type Subscription_RootGrantTagsBridge_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGrantTags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GrantTags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GrantTags_Order_By>>;
  where?: InputMaybe<GrantTags_Bool_Exp>;
};


export type Subscription_RootGrantTags_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGrantsArgs = {
  distinct_on?: InputMaybe<Array<Grants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Grants_Order_By>>;
  where?: InputMaybe<Grants_Bool_Exp>;
};


export type Subscription_RootGrants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Grants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Grants_Order_By>>;
  where?: InputMaybe<Grants_Bool_Exp>;
};


export type Subscription_RootGrants_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootLikesArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};


export type Subscription_RootLikes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};


export type Subscription_RootLikes_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProjectArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Order_By>>;
  where?: InputMaybe<Project_Bool_Exp>;
};


export type Subscription_RootProjectMembersArgs = {
  distinct_on?: InputMaybe<Array<ProjectMembers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectMembers_Order_By>>;
  where?: InputMaybe<ProjectMembers_Bool_Exp>;
};


export type Subscription_RootProjectMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectMembers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectMembers_Order_By>>;
  where?: InputMaybe<ProjectMembers_Bool_Exp>;
};


export type Subscription_RootProjectMembers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProjectTagArgs = {
  distinct_on?: InputMaybe<Array<ProjectTag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectTag_Order_By>>;
  where?: InputMaybe<ProjectTag_Bool_Exp>;
};


export type Subscription_RootProjectTag_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectTag_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectTag_Order_By>>;
  where?: InputMaybe<ProjectTag_Bool_Exp>;
};


export type Subscription_RootProjectTag_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProjectTagsBridgeArgs = {
  distinct_on?: InputMaybe<Array<ProjectTagsBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectTagsBridge_Order_By>>;
  where?: InputMaybe<ProjectTagsBridge_Bool_Exp>;
};


export type Subscription_RootProjectTagsBridge_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectTagsBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectTagsBridge_Order_By>>;
  where?: InputMaybe<ProjectTagsBridge_Bool_Exp>;
};


export type Subscription_RootProjectTagsBridge_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProjectTypeArgs = {
  distinct_on?: InputMaybe<Array<ProjectType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectType_Order_By>>;
  where?: InputMaybe<ProjectType_Bool_Exp>;
};


export type Subscription_RootProjectTypeBridgeArgs = {
  distinct_on?: InputMaybe<Array<ProjectTypeBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectTypeBridge_Order_By>>;
  where?: InputMaybe<ProjectTypeBridge_Bool_Exp>;
};


export type Subscription_RootProjectTypeBridge_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectTypeBridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectTypeBridge_Order_By>>;
  where?: InputMaybe<ProjectTypeBridge_Bool_Exp>;
};


export type Subscription_RootProjectTypeBridge_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProjectType_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ProjectType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ProjectType_Order_By>>;
  where?: InputMaybe<ProjectType_Bool_Exp>;
};


export type Subscription_RootProjectType_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProject_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Project_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Project_Order_By>>;
  where?: InputMaybe<Project_Bool_Exp>;
};


export type Subscription_RootProject_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootSwapsArgs = {
  distinct_on?: InputMaybe<Array<Swaps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Swaps_Order_By>>;
  where?: InputMaybe<Swaps_Bool_Exp>;
};


export type Subscription_RootSwaps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Swaps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Swaps_Order_By>>;
  where?: InputMaybe<Swaps_Bool_Exp>;
};


export type Subscription_RootSwaps_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootTopUpWalletArgs = {
  distinct_on?: InputMaybe<Array<TopUpWallet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<TopUpWallet_Order_By>>;
  where?: InputMaybe<TopUpWallet_Bool_Exp>;
};


export type Subscription_RootTopUpWallet_AggregateArgs = {
  distinct_on?: InputMaybe<Array<TopUpWallet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<TopUpWallet_Order_By>>;
  where?: InputMaybe<TopUpWallet_Bool_Exp>;
};


export type Subscription_RootTopUpWallet_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_By_PkArgs = {
  id: Scalars['uuid'];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type HomePageDonatorsQueryVariables = Exact<{ [key: string]: never; }>;


export type HomePageDonatorsQuery = { __typename?: 'query_root', Donations: Array<{ __typename?: 'Donations', amount: any, User: { __typename?: 'User', firstName?: string | null, lastName?: string | null, profileImage?: string | null } }> };

export type CreateTopUpWalletMutationVariables = Exact<{
  data: TopUpWallet_Insert_Input;
}>;


export type CreateTopUpWalletMutation = { __typename?: 'mutation_root', insert_TopUpWallet_one?: { __typename?: 'TopUpWallet', id: any, amount: any, originFund: string, state: string, userId: any, timestamp?: any | null } | null };


export const HomePageDonatorsDocument = gql`
    query HomePageDonators {
  Donations(limit: 5, order_by: {amount: desc}) {
    User {
      firstName
      lastName
      profileImage
    }
    amount
  }
}
    `;

/**
 * __useHomePageDonatorsQuery__
 *
 * To run a query within a React component, call `useHomePageDonatorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomePageDonatorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomePageDonatorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomePageDonatorsQuery(baseOptions?: Apollo.QueryHookOptions<HomePageDonatorsQuery, HomePageDonatorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomePageDonatorsQuery, HomePageDonatorsQueryVariables>(HomePageDonatorsDocument, options);
      }
export function useHomePageDonatorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomePageDonatorsQuery, HomePageDonatorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomePageDonatorsQuery, HomePageDonatorsQueryVariables>(HomePageDonatorsDocument, options);
        }
export type HomePageDonatorsQueryHookResult = ReturnType<typeof useHomePageDonatorsQuery>;
export type HomePageDonatorsLazyQueryHookResult = ReturnType<typeof useHomePageDonatorsLazyQuery>;
export type HomePageDonatorsQueryResult = Apollo.QueryResult<HomePageDonatorsQuery, HomePageDonatorsQueryVariables>;
export const CreateTopUpWalletDocument = gql`
    mutation createTopUpWallet($data: TopUpWallet_insert_input!) {
  insert_TopUpWallet_one(object: $data) {
    id
    amount
    originFund
    state
    userId
    timestamp
  }
}
    `;
export type CreateTopUpWalletMutationFn = Apollo.MutationFunction<CreateTopUpWalletMutation, CreateTopUpWalletMutationVariables>;

/**
 * __useCreateTopUpWalletMutation__
 *
 * To run a mutation, you first call `useCreateTopUpWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTopUpWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTopUpWalletMutation, { data, loading, error }] = useCreateTopUpWalletMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTopUpWalletMutation(baseOptions?: Apollo.MutationHookOptions<CreateTopUpWalletMutation, CreateTopUpWalletMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTopUpWalletMutation, CreateTopUpWalletMutationVariables>(CreateTopUpWalletDocument, options);
      }
export type CreateTopUpWalletMutationHookResult = ReturnType<typeof useCreateTopUpWalletMutation>;
export type CreateTopUpWalletMutationResult = Apollo.MutationResult<CreateTopUpWalletMutation>;
export type CreateTopUpWalletMutationOptions = Apollo.BaseMutationOptions<CreateTopUpWalletMutation, CreateTopUpWalletMutationVariables>;