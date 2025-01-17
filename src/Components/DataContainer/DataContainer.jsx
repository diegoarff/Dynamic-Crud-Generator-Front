import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useEffect } from 'react';
import { TableContext } from '../../Context/TableContext';
import useQuery from '../../Hooks/useQuery';

export default function DataContainer() {
  const { selectedTable, setSelectedRowData } = useContext(TableContext);
  const { rows, columns, runQuery } = useQuery();

  useEffect(() => {
    async function fetchData() {
      await runQuery(`SELECT * FROM ${selectedTable}`);
    }
    if (selectedTable) fetchData();
  }, [selectedTable]);

  function handleRowClick(e) {
    setSelectedRowData(e.row);
  }

  return (
    <Box sx={{ height: 800, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={rows}
        onRowClick={handleRowClick}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
      />
    </Box>
  );
}
