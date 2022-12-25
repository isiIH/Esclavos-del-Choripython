import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'nombre', headerName: 'Carrera', width: 300 },
  { field: 'director', headerName: 'Nombre', width: 600 },
  { field: 'correo', headerName: 'Correo', width: 600 }
]

const Tabla = () => {

  const [tableData, setTableData] = useState([])
  const [progData, setProgData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((data) => data.json())
      .then((data) => setTableData(data))

  }, [])

  useEffect(() => {
    const fetchProgData = async () => {
      const data = await fetch("http://localhost:3000/api/prog")
        .then((res) => res.json());
      setProgData(data);
    }
  
    fetchProgData();
  
  }, [])

  console.log(tableData)

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={progData}
        columns={columns}
        pageSize={12}
      />
    </div>
  )
}

export default Tabla