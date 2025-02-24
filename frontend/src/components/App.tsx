import ResizableTable from './ResizableTable';
export default function App() {
    return (
      <div className="App">
        Resizable column table
        <ResizableTable resizable={true} resizeOptions={{}}>
          <thead>
          <tr>
            <th>#</th>
            <th>Make</th>
            <th>Modell</th>
            <th>Color</th>
            <th>Fuel</th>
            <th>Registration</th>
            <th>Drivetrain</th>
            <th>Company</th>
            <th>Contract</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
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