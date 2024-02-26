import { DNA } from "react-loader-spinner";

const Loader = () => {
  return (
    <DNA
      visible={true}
      height="280"
      width="280"
      ariaLabel="dna-loading"
      wrapperStyle={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      wrapperClass="dna-wrapper"
    />
  );
};

export default Loader;
