import { useEffect, useState } from "react";
import { monedaFormat } from "../utils";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Swal from "sweetalert2";

const ControlPresupuesto = ({
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;

    //Calcular porcentaje
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setDisponible(totalDisponible);
    setGastado(totalGastado);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);
  }, [gastos]);

  const handleResetApp = () => {
    Swal.fire({
      title: "¿Quieres eliminar todos los datos",
      //text: "You won't be able to revert this!",
      icon: "warning",
      iconColor: "#4FFF33",
      showCancelButton: true,
      cancelButtonColor: "blue",
      cancelButtonText: "NO",
      confirmButtonText: "Sí",
      confirmButtonColor: "#DC2626",
    }).then((result) => {
      if (result.isConfirmed) {
        setGastos([]);
        setPresupuesto(0);
        setIsValidPresupuesto(false);
        Swal.fire("Información", "App Riniciada", "success");
      }
    });
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "#1009fe",
            trailColor: "#F5F5F5",
            textColor: porcentaje > 100 ? "#DC2626" : "#1009fe",
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>

      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Borrar Datos
        </button>
        <p>
          <span>Presupuesto: </span>
          {monedaFormat(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span>
          {monedaFormat(disponible)}
        </p>
        <p>
          <span>Gastado: </span>
          {monedaFormat(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
