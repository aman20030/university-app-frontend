import React, { useEffect, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css"; 
import "react-tabulator/lib/css/tabulator_midnight.min.css"; 
import axios from "axios";
import "./UniversityTable.css"; /

const UniversityTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://university-app-wv67.onrender.com/api/universities")
      .then((res) => {
        const sorted = res.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setData(sorted);
      })
      .catch((err) => console.error("Error fetching universities", err));
  }, []);

  const columns = [
    { title: "Name", field: "name", headerSort: true },
    { title: "Country", field: "country" },
    {
      title: "Domain",
      field: "domains",
      formatter: "plaintext",
      accessorDownload: (row) => row.domains[0],
    },
    {
      title: "Website",
      field: "web_pages",
      formatter: (cell) => {
        const link = cell.getValue()[0];
        return `<a href="${link}" target="_blank" style="color:#33bbff">${link}</a>`;
      },
    },
  ];

  return (
    <div className="uni-table-wrapper">
      <h2 className="uni-heading">🎓 Universities (United States)</h2>
      <div className="uni-table">
        <ReactTabulator
          data={data}
          columns={columns}
          layout={"fitData"}
          pagination={"local"}
          paginationSize={7}
          options={{
            movableColumns: true,
            resizableRows: true,
          }}
          className="tabulator-midnight"
        />
      </div>
    </div>
  );
};

export default UniversityTable;
