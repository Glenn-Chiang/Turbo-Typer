import { faBarsProgress, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type props = {
  id: 'mode' | 'time limit';
  options: string[] | number[];
  defaultValue: string;
  handleSelect: (mode: string) => void;
  enabled: boolean;
}

export default function SelectDropdown({id, options, defaultValue, handleSelect, enabled}: props) {
  const optionsElems = options.map((option, index) => {
    return (
      <option key={index} value={option}>
        {option}
      </option>
    )
  }) 

  return (
    <div className="flex gap-3">
      <label htmlFor={id} className="flex items-center gap-3">
        {id === 'mode' ? <FontAwesomeIcon icon={faBarsProgress}/> : <FontAwesomeIcon icon={faClock}/>}
        {id}
      </label>
      <select 
        id={id} 
        defaultValue={defaultValue} 
        onChange={event => handleSelect(event.target.value)} 
        className="text-sky-900 rounded capitalize"
        disabled={!enabled}
      >
        {optionsElems}
      </select>      
    </div>
  )
}