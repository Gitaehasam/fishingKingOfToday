import { axiosApi } from "../util/commons";

const api = axiosApi();

function getBoardList() {
  api.get().then(success).catch(fail);
}

export { getBoardList };
