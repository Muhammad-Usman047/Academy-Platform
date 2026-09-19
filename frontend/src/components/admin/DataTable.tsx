interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: (row: T) => string | number;
  emptyMessage?: string;
}

export default function DataTable<T>({
  columns,
  data,
  keyField,
  emptyMessage = "No records found.",
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="bg-white border border-border rounded-xl p-12 text-center text-text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-surface border-b border-border">
          <tr>
            {columns.map((col) => (
              <th key={col.header} className="text-left px-6 py-3 font-medium text-text-muted">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={keyField(row)} className="border-b border-border last:border-0 hover:bg-surface/50">
              {columns.map((col) => (
                <td key={col.header} className="px-6 py-4 text-ink">
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}