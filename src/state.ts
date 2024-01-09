type Result = {
  title: string;
};

export type initalStateType = {
  loading: boolean;
  results: Result[];
  error: {
    message?: string;
  };
};

const initalState: initalStateType = {
  loading: true,
  results: [],
  error: {}
};
export default initalState;
