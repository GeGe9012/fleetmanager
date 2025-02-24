import ResizableTable from "./ResizableTable";
export default function App() {
  const thStyle = {overflow: "hidden", whiteSpace: "nowrap"}
  return (
    <div>
      <ResizableTable resizable={true} resizeOptions={{}}>
        <thead>
          <tr >
            <th style={thStyle}>#</th>
            <th style={thStyle}>Make</th>
            <th style={thStyle}>Modell</th>
            <th style={thStyle}>Color</th>
            <th style={thStyle}>Fuel</th>
            <th style={thStyle}>Registration</th>
            <th style={thStyle}>Drivetrain</th>
            <th style={thStyle}>Warranty</th>
            <th style={thStyle}>Company</th>
            <th style={thStyle}>Contract</th>
            <th style={thStyle}>Contract duration</th>
          </tr>
        </thead>
        <tbody style={{ padding: "2px", textAlign: "center" }}>
          <tr>
            <td>12222222222222eweweeeeeeeeee</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
        </tbody>
      </ResizableTable>
    </div>
  );
}
