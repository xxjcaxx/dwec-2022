export { isInLE, inicializarUsuario, checkUsuario };

const isInLE = (item) => (localStorage.getItem(item) ? true : false);

const inicializarUsuario = () => {
  app.datosUsuario = {};
};

const checkUsuario = (rutaLogin) => {
  if (isInLE("user")) {
    inicializarUsuario();
  } else {
    router(rutaLogin);
  }
};
