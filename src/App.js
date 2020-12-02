import * as GQL from "graphql";
import React, { useEffect, useState } from "react";
import Tree from "./components/Tree";
import { SCHEMA } from "./constants";
import { getTree } from "./utils";
import "./styles.css";

const { buildClientSchema } = GQL;

export default function App() {
  return (
    <div>
      <h1>from real schema</h1>
      <RSP source={SCHEMA}/>
    </div>
  );
}

const RSP = ({source}) => {
  const [datasource, setDatasource] = useState([]);
  const [schema, setSchema] = useState();
  useEffect(() => {
    if(!source)return
    const schema = buildClientSchema(source);
    window.SCHEMA = schema;
    window.GQL = GQL;
    setSchema(schema);
  }, [source]);

  useEffect(() => {
    // TODO filter other types and add to this array
    schema &&
      setDatasource([
        {
          name: "query_root",
          children: getTree(schema, "QUERY")
        },
        {
          name: "mutation_root",
          children: getTree(schema, "MUTATION")
        }
      ]);
  }, [schema]);
  return schema && datasource && datasource.length ? (
    <Tree {...{ datasource, schema, setDatasource }} />
  ) : (
      "Loading..."
    );
};
