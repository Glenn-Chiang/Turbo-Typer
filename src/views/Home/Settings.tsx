import SelectDropdown from "../../components/SelectDropdown";
import { modes, timeLimits } from "../../constants/parameters";

type props = {
  updateMode: (mode: string) => void;
  updateTimeLimit: (time: string) => void;
  enabled: boolean;
}

export default function Settings({updateMode, updateTimeLimit, enabled}: props) {
  const modeDropdown = <SelectDropdown id="mode" defaultValue="standard" options={Object.keys(modes)} handleSelect={updateMode} enabled={enabled}/>
  const timeDropdown = <SelectDropdown id="time limit" defaultValue="30" options={timeLimits} handleSelect={updateTimeLimit} enabled={enabled}/>

  return (
    <div className="bg-sky-950 text-white p-4 rounded-xl capitalize">
      <form className="flex flex-col items-start gap-3">
        {modeDropdown}
        {timeDropdown}
      </form>
    </div>
  )
}

