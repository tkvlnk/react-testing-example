const PARAM_PREFIX = ':';

export default function pathMaker<
  P extends { [key: string]: string | number } = {}
>(path: string) {
  return function createPath(params?: P) {
    return Object.entries(params || {}).reduce(
      (resultPath, [key, value]) =>
        resultPath.replace(
          new RegExp(`${PARAM_PREFIX}${key}`),
          value.toString()
        ),
      path
    );
  };
}
