import { ResultOf, VariablesOf } from "@graphql-typed-document-node/core";
import {
  InlineLaunchesQuery,
  Launches,
  LaunchesDocument,
  LaunchesQuery,
  LaunchesQueryVariables,
  NamedInlineLaunchesQuery,
} from "./generated/codegen.js";

// NOTE! imports need to be defines as .js with this project setup. Your environment might handle this for you.
import gql from "./utils/fakeTag.js";

// *** Raw graphlql string with custom function wrapper ****

console.log(Launches);

// Raw types

type RawResults = LaunchesQuery;
type RawVariables = LaunchesQueryVariables;

const LaunchesQueryResult = [] as unknown as LaunchesQuery;

// NOTE! This is purely to demonstrate type inference
const LaunchesPast = LaunchesQueryResult.launches?.map((launch) => {
  if (!launch) return;
  const { mission_name } = launch;
  return mission_name;
});

// *** TypedDocumentNode examples. Used by most graphql clients ***

// ResultOf util infers type from document
type LaunchesResult = ResultOf<typeof LaunchesDocument>;
// VariablesOf util infers variable's types from document
type LaunchesVariables = VariablesOf<typeof LaunchesDocument>;

const PageQueryQueryResultTyped = [] as unknown as LaunchesResult;

// NOTE! This is purely to demonstrate type inference
const LaunchesPastTypedDocument = PageQueryQueryResultTyped.launches?.map(
  (launch) => {
    if (!launch) return;
    const { mission_name } = launch;
    return mission_name;
  }
);

// // *** Inline graphql definition examples ***

// NOTE! gql`` is a function call so these might not be tree shakeable

// NOTE: Check that your bundler tree shakes these out
gql`
  fragment InlineRocketFragment on Rocket {
    name
    mass {
      kg
    }
    payload_weights {
      kg
    }
  }
`;

// // NOTE: Check that your bundler tree shakes these out
gql`
  query InlineLaunchesQuery($limit: Int!) {
    launches(limit: $limit) {
      mission_name
      rocket {
        rocket {
          ...InlineRocketFragment
        }
      }
    }
  }
`;

console.log("InlineLaunchesQuery", InlineLaunchesQuery);

// // NOTE! Could also be defined as
// // NOTE: Check that your bundler tree shakes these out
const NotWorkingNamedInlineLaunchesQuery = gql`
  query NamedInlineLaunchesQuery($limit: Int!) {
    launches(limit: $limit) {
      mission_name
      rocket {
        rocket {
          ...InlineRocketFragment
        }
      }
    }
  }
`;

// NOTE! You can't use defined query strings directly since used fragments will be missing from the query
console.log("*** WILL NOT WORK ***", NotWorkingNamedInlineLaunchesQuery);
// => Always use queries generated by codegen
console.log(NamedInlineLaunchesQuery);