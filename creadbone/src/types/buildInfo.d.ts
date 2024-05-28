declare module './buildInfo.json' {
  interface BuildInfo {
    buildDateTime: string;
    version: string;
  }

  const value: BuildInfo;
  export default value;
}
