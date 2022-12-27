import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function getFecha(params) {
  let fecha = params.fecha_pago
  var info = fecha.split('-');
  return `${info[2].substring(0,2)}/${info[1]}/${info[0]}`;
}

function getTotal(params) {
  let comps = params.comprobantes;
  let total = 0;
  comps.forEach(comp => total += comp.monto);
  return `$${total}`;
}

function getPorPagar(params) {
  let comps = params.comprobantes;
  let total = 0;
  comps.forEach(comp => total += comp.monto);

  let arans = params.aranceles;
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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.rut}
        </TableCell>
        <TableCell align="right">{row.nombre}</TableCell>
        <TableCell align="right">{row.correo}</TableCell>
        <TableCell align="right">{row.nombre_programa}</TableCell>
        <TableCell align="right">{getTotal(row)}</TableCell>
        <TableCell align="right">{getPorPagar(row)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Comprobantes
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Número de boleta</TableCell>
                    <TableCell>Monto</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Enlace comprobante</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* <h1>hola</h1> */}
                  {row.comprobantes.map((comp) => (
                    <TableRow key={comp.num_boleta}>
                      <TableCell component="th" scope="row">
                        {comp.num_boleta}
                      </TableCell>
                      <TableCell>{comp.monto}</TableCell>
                      <TableCell>{getFecha(comp)}</TableCell>
                      <TableCell>{comp.enlace_foto}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const CollapseTable = () => {

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
  
  findArancel.map((row) => (
    // <Row key={row.nombre} row={row.nombre_programa} />
    row.comprobantes.map((comp) => console.log(comp.num_boleta))
  ))

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Rut</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Correo</TableCell>
            <TableCell align="right">Programa</TableCell>
            <TableCell align="right">Total Pagado</TableCell>
            <TableCell align="right">Por pagar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            findArancel.map((row) => (
              <Row key={row.rut} row={row} />
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CollapseTable