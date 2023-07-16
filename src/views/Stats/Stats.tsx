import { faBarsProgress, faClock, faLineChart, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Stats() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl flex gap-3 items-center p-4">
        <FontAwesomeIcon icon={faLineChart}/>
        Stats
      </h1>
      <Overview/>
    </div>
  )
}


function Overview() {
  const modes = ['standard', 'advanced', 'expert'];
  const modeButtons = modes.map((mode, index) => {
    return (
      <button key={index} className="w-1/3 bg-cyan-500 rounded-xl p-2">
        {mode}
      </button>
    )
  })

  const timeLimits = [30,60,120];
  const timeButtons = timeLimits.map((time, index) => {
    return (
      <button key={index} className="w-1/3 bg-cyan-500 rounded-xl p-2">
        {time}
      </button>
    )
  })

  const highScore = 102;
  const averageScore = 98;

  return (
    <div className="w-4/6 bg-sky-950 p-4 rounded-xl flex">
      <div>
        <FontAwesomeIcon icon={faBarsProgress}/>
        Mode
        <div className="flex flex-col gap-3 items-center">
          {modeButtons}
        </div>
      </div>
      <div className="row-start-2">
        <FontAwesomeIcon icon={faClock}/>
        Time limit
        <div className="flex flex-col gap-3 items-center">
          {timeButtons}
        </div>
      </div>
      <div className="row-span-2 flex flex-col justify-center w-1/2 flex-1">
        <span className="text-2xl">
          <FontAwesomeIcon icon={faTrophy}/>
          HIGH SCORE
        </span>
        <span className="text-4xl text-cyan-400">{highScore}</span>
        <span>Average Score</span>
        <span className="text-2xl text-cyan-400">{averageScore}</span>
      </div>
    </div>
  )
}