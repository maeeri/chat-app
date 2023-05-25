import { BallTriangle } from 'react-loader-spinner'

function Loader() {
  return (
    <div className="loading">
      <BallTriangle
        color="#ffcb05"
        className="ball-triangle"
        radius={5}
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
  )
}

export default Loader