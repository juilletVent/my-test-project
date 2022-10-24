declare namespace CSS {
  // function registerProperty(opt: {
  //   name: any;
  //   syntax: any;
  //   inherits: any;
  //   initialValue: any;
  // }): void;
  const registerProperty:
    | undefined
    | ((opt: {
        name: any;
        syntax: any;
        inherits: any;
        initialValue: any;
      }) => void);
}
