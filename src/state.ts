import { FormattedArtWork } from "./utils/globalTypes";

export type initalStateType = {
  loading: boolean;
  results: FormattedArtWork[];
  error: {
    message?: string;
  };
};

const initalState: initalStateType = {
  loading: true,
  results: [],
  error: {
    message: ""
  }
};
export default initalState;
