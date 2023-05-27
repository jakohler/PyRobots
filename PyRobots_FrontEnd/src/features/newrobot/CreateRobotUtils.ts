export const isValidRobotName = (robotname: string): boolean => {
  if (robotname.length > robotname.trim().length) {
    alert("¡No se puede incluir espacios en blanco en el nombre!");
    return false;
  } else {
    return robotname.length >= 3 && robotname.length <= 12;
  }
};
