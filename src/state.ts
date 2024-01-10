import { FormattedArtWork } from "./utils/globalTypes";

export type initialStateType = {
  loading: boolean;
  results: FormattedArtWork[];
  error: {
    message?: string;
  };
};

const initialState: initialStateType = {
  loading: true,
  results: [],
  error: {
    message: ""
  }
};
export default initialState;
