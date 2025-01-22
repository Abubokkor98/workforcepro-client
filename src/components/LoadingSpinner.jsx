import { CirclesWithBar } from "react-loader-spinner";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <CirclesWithBar
        height="100"
        width="100"
        color="#75939e"
        outerCircleColor="#b1aac4"
        innerCircleColor="#a691b2"
        barColor="#75939e"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
