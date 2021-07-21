
exports.respond =  (status, message, data = []) => {
  // exclude data from response if it's empty
  if (data.length < 1){
    return {status, message};
  }else{
    return {status, message, data};
  }
};