import { useEffect, useRef, useState, useCallback } from "react";
import ColumnResizer from "column-resizer";
import { Table } from "react-bootstrap";

interface ResizableTableProps {
  children: React.ReactNode;
  resizable: boolean;
  resizeOptions: unknown;
}

const ResizableTable = ({
  children,
  resizable,
  resizeOptions,
}: ResizableTableProps) => {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [resize, setResize] = useState<ColumnResizer | null>(null);

  const enableResize = useCallback(() => {
    if (!resize && tableRef.current) {
      const resizeFn = new ColumnResizer(tableRef.current, resizeOptions);

      tableRef.current.className = tableRef.current.className.replace(
        "grip-padding",
        ""
      );

      setResize(resizeFn);
    } else {
      resize?.reset(resizeOptions);
    }
  }, [resize, resizeOptions]);

  const disableResize = useCallback(() => {
    if (resize) {
      resize.reset({ disable: true });
    }
  }, [resize]);

  useEffect(() => {
    if (tableRef.current && resizable) {
      enableResize();
    }
  }, [enableResize, resizable]);

  useEffect(() => {
    return () => disableResize();
  }, [disableResize]);

  return (
    <Table bordered responsive hover striped ref={tableRef}>
      {children}
    </Table>
  );
};

export default ResizableTable;
