function stringToArray(data, separator) {
  if (!data) {
    return [];
  }
  return data.split(separator || ",");
}
function selectDictLabels(options, data, separator) {
  if (!options.length || !data.length) {
    return "";
  }
  const actions = [];
  const currentSeparator = void 0 === separator ? "," : separator;
  data.some((val) => {
    Object.keys(options).some((key) => {
      if ("" + options[key].value === "" + val) {
        actions.push(options[key].text + currentSeparator);
      }
    });
  });
  return actions.join("").substring(0, actions.join("").length - 1);
}
export {
  selectDictLabels,
  stringToArray
};
