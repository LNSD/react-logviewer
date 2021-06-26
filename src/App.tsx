import { useState } from "react";

import "react-filter-box/lib/react-filter-box.css";
import ReactFilterBox, {
  Expression,
  SimpleResultProcessing
} from "react-filter-box";

import { Table, Column, Cell } from "fixed-data-table";
import "fixed-data-table/dist/fixed-data-table.min.css";

import "./styles.scss";

// TODO Use axios or any other rest client to get the data
import logData from "./mock/output.json";

export default function App() {
  const [data, setData] = useState(logData);

  const options = [
    {
      columnText: "Level",
      columnField: "level",
      type: "selection"
    },
    {
      columnText: "Class",
      columnField: "loggerName",
      type: "text"
    },
    {
      columnText: "Message",
      columnField: "message",
      type: "text"
    }
  ];

  const onParseOk = (expressions: Expression[]) => {
    let newData = new SimpleResultProcessing(options).process(
      logData,
      expressions
    );
    setData(newData);
  };

  return (
    <div className="main-container">
      <ReactFilterBox data={data} options={options} onParseOk={onParseOk} />
      <Table
        rowHeight={50}
        rowsCount={data.length}
        width={800}
        height={300}
        headerHeight={50}
      >
        <Column
          header={<Cell>Level</Cell>}
          cell={({ rowIndex: index }) => <Cell>{data[index].level}</Cell>}
          width={200}
        />
        <Column
          header={<Cell>Class</Cell>}
          cell={({ rowIndex: index }) => <Cell>{data[index].loggerName}</Cell>}
          width={200}
        />
        <Column
          header={<Cell>Message</Cell>}
          cell={({ rowIndex: index }) => <Cell>{data[index].message}</Cell>}
          width={400}
        />
      </Table>
    </div>
  );
}
