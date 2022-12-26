import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'

// function getFecha(params) {
//   let fecha = params.row.fecha_pago
//   var info = fecha.split('-');
//   return `${info[2].substring(0,2)}/${info[1]}/${info[0]}`;
// }

function getTotal(params) {
  let comps = params.row.comprobantes;
  let total = 0;
  comps.forEach(comp => total += comp.monto);
  return `$${total}`;
}

function getPorPagar(params) {
  let comps = params.row.comprobantes;
  let total = 0;
  comps.forEach(comp => total += comp.monto);

  let arans = params.row.aranceles;
  let año_actual = 2022;
  let montoPorPagar = 0;
  arans.forEach(arancel => {
    if(arancel.año === año_actual) {
      montoPorPagar = arancel.valor - total;
      if(montoPorPagar < 0) montoPorPagar = 0;
    }
  });
  return `$${montoPorPagar}`;
}

// const columnsEst = [
//   { field: 'rut', headerName: 'Rut' },
//   { field: 'nombre', headerName: 'Nombre', width: 300 },
//   { field: 'correo', headerName: 'Correo', width: 600 },
//   { field: 'id_programa', headerName: 'ID programa', width: 600 },
// ]

// const columnsProg = [
//   { field: 'id', headerName: 'ID' },
//   { field: 'nombre_programa', headerName: 'Carrera', width: 300 },
//   { field: 'director', headerName: 'Director', width: 300 },
//   { field: 'correo_programa', headerName: 'Correo', width: 600 },
// ]

// const columnsComp = [
//   { field: 'num_boleta', headerName: 'Número de boleta' },
//   { field: 'monto', headerName: 'Monto', width: 300 },
//   { field: 'fecha_pago', headerName: 'Fecha', width: 600, valueGetter: getFecha },
//   { field: 'arancel_matricula', headerName: 'Tipo de pago', width: 600},
//   { field: 'enlace_foto', headerName: 'Comprobante', width: 600},
//   { field: 'rut_estudiante', headerName: 'Rut estudiante', width: 600}
// ]

const columsUser = [
  { field: 'rut', headerName: 'Rut' },
  { field: 'nombre', headerName: 'Nombre', width: 300 },
  { field: 'correo', headerName: 'Correo', width: 300 },
  { field: 'nombre_programa', headerName: 'Nombre Programa', width: 200 },
  { field: 'comprobantes', headerName: 'Total pagado', valueGetter: getTotal },
  { field: 'aranceles', headerName: 'Por pagar', valueGetter: getPorPagar },
]

const Tabla = () => {
  const [estData, setEstData] = useState([]);
  const [progData, setProgData] = useState([]);
  const [compData, setCompData] = useState([]);
  const [arancelData, setArancelData] = useState([]);

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

  useEffect(() => {
    const fetchArancelData = async () => {
      const data = await fetch("http://localhost:3000/api/arancel")
        .then((res) => res.json());
      setArancelData(data);
    }
  
    fetchArancelData();
  
  }, [])

  // console.log(arancelData);

  const est_prog = estData.map( est => {
    const matched = progData.find(prog => prog.id === est.id_programa)
    if(matched) {
      return {...est, ...matched}
    } else {
      return est
    }
  }
  );

  const findComprobantes = est_prog.map( est => {
    const matched = compData.filter(comp => comp.rut_estudiante === est.rut)
    if(matched) {
      return {...est, comprobantes: matched}
    } else {
      return est
    }
  }
  );
  
  // console.log(findComprobantes)


  const findArancel = findComprobantes.map( est => {
    const matched = arancelData.filter(arancel => arancel.id_programa === est.id_programa)
    if(matched) {
      return {...est, aranceles: matched}
    } else {
      return est
    }
  }
  );

  // console.log(findArancel)

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        className='datagrid'
        getRowId={(row) => row.rut}
        rows={findArancel}
        columns={columsUser}
      />
    </div>
  )
}

export default Tabla