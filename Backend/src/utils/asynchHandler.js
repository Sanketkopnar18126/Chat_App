const asynchHandler = (requestHandler) => {
   return (res, req, next) => {
      Promise.resolve(requestHandler(req, res, next)).catch((error) =>
         next(error)
      );
   };
};
export { asynchHandler };
