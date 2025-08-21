import "./Table.css";

function Table({ columns = [], data = [], className = "" }) {
  return (
    <div className="table-container">
      <table className={`custom-table ${className}`}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col.header}</th>
            ))}
          </tr>
        </thead>

        <tbody className="tbdy">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {col.render 
                      ? col.render(row[col.accessor], row, rowIndex)
                      : row[col.accessor]}
                  </td>
                  
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="no-data">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
