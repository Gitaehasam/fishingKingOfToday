import axios from "axios";

export const fetchRegion = async () => {
  try {
    const res = await axios.get(
      "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000"
    );

    return res.data.regcodes.filter((item) => item.name !== "제주특별자치도");
  } catch (error) {
    console.log(error);
  }
};
