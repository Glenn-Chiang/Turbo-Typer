import SelectDropdown from "../../components/SelectDropdown";

type props = {
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setTimeLimit: React.Dispatch<React.SetStateAction<string>>;
  enabled: boolean;
}

export default function Settings({setMode, setTimeLimit, enabled}: props) {
  const modes = {
    standard: '100',
    advanced: '500',
    expert: '1000'
  };

  const modeDropdown = <SelectDropdown id="mode" defaultValue="standard" options={Object.keys(modes)} setOption={setMode} enabled={enabled}/>

  const timeLimits = ['30', '60', '120'];

  const timeDropdown = <SelectDropdown id="time limit" defaultValue="30" options={timeLimits} setOption={setTimeLimit} enabled={enabled}/>

  return (
    <div className="bg-sky-950 text-white p-4 rounded-xl">
      <form className="flex flex-col items-start gap-3">
        {modeDropdown}
        {timeDropdown}
      </form>
    </div>
  )
}

