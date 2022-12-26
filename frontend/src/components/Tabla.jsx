import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'

function getFecha(params) {
  let fecha = params.row.fecha_pago
  var info = fecha.split('-');
  return `${info[2].substring(0,2)}/${info[1]}/${info[0]}`;
}

const columnsEst = [
  { field: 'rut', headerName: 'Rut' },
  { field: 'nombre', headerName: 'Nombre', width: 300 },
  { field: 'correo', headerName: 'Correo', width: 600 },
  { field: 'id_programa', headerName: 'ID programa', width: 600 },
]

const columnsProg = [
  { field: 'id', headerName: 'ID' },
  { field: 'nombre_programa', headerName: 'Carrera', width: 300 },
  { field: 'director', headerName: 'Director', width: 300 },
  { field: 'correo_programa', headerName: 'Correo', width: 600 },
]

const columnsComp = [
  { field: 'num_boleta', headerName: 'Número de boleta' },
  { field: 'monto', headerName: 'Monto', width: 300 },
  { field: 'fecha_pago', headerName: 'Fecha', width: 600, valueGetter: getFecha },
  { field: 'arancel_matricula', headerName: 'Tipo de pago', width: 600},
  { field: 'enlace_foto', headerName: 'Comprobante', width: 600},
  { field: 'rut_estudiante', headerName: 'Rut estudiante', width: 600}
]

const columsUser = [
  { field: 'rut', headerName: 'Rut' },
  { field: 'nombre', headerName: 'Nombre', width: 300 },
  { field: 'correo', headerName: 'Correo', width: 600 },
  { field: 'nombre_programa', headerName: 'Nombre Programa', width: 300 },
  { field: 'director', headerName: 'Director', width: 300 },
  { field: 'correo_programa', headerName: 'Correo Programa', width: 600 }
]

const Tabla = () => {
  const [estData, setEstData] = useState([]);
  const [progData, setProgData] = useState([]);
  const [compData, setCompData] = useState([]);

  useEffect(() => {
    const fetchEstData = async () => {
      const data = await fetch("http://localhost:3000/api/estudiante")
        .then((res) => res.json());
        setEstData(data);
    }
  
    fetchEstData();
  
  }, [])

  useEffect(() => {
    const fetchProgData = async () => {
      const data = await fetch("http://localhost:3000/api/prog")
        .then((res) => res.json())
        .then((res) => res.map( item => {
          return { id: item.id , nombre_programa : item.nombre, director: item.director, correo_programa: item.correo }; 
        }));
      setProgData(data);
    }
  
    fetchProgData();
  
  }, [])

  useEffect(() => {
    const fetchCompData = async () => {
      const data = await fetch("http://localhost:3000/api/comp")
        .then((res) => res.json());
      setCompData(data);
    }
  
    fetchCompData();
  
  }, [])

  const mergeAB = estData.map( companyA => {
    const matched = progData.find(companyB => companyB.id === companyA.id_programa)
    if(matched) {
      return {...companyA, ...matched}
    } else {
      // return companyA element or customize it with your case
    }
  }
  );
  
  console.log(mergeAB)

  return (
    <div style={{ height: 700, width: '100%' }}>
      {/* <DataGrid
        getRowId={(row) => row.rut}
        rows={estData}
        columns={columnsEst}
        pageSize={12}
      />

      <DataGrid
        rows={progData}
        columns={columnsProg}
        pageSize={12}
      />

      <DataGrid
        getRowId={(row) => row.num_boleta}
        rows={compData}
        columns={columnsComp}
        pageSize={12}
      /> */}

      <DataGrid
        getRowId={(row) => row.rut}
        rows={mergeAB}
        columns={columsUser}
        pageSize={12}
      />
    </div>
  )
}

export default Tabla