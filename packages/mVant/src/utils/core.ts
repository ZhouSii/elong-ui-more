// 数组转字符串
export function arrayToString(data: any, separator?: String): String {
  if (!Array.isArray(data) && !data.length) {
    return '';
  }

  return data.join(separator || ',');
}

// 字符串转数组
export function stringToArray(data: string, separator?: any): Array<any> {
  if (!data) {
    return [];
  }

  return data.split(separator || ',');
}

// 回显数据
export function selectDictLabels(
  options: unknown[],
  data: unknown[],
  separator?: string
): string {
  if (!options.length || !data.length) {
    return '';
  }

  const actions = [] as any;
  const currentSeparator = undefined === separator ? ',' : separator;

  data.some((val) => {
    Object.keys(options).some((key) => {
      if ('' + options[key].value === '' + val) {
        actions.push(options[key].text + currentSeparator);
      }
    });
  });

  return actions.join('').substring(0, actions.join('').length - 1);
}
