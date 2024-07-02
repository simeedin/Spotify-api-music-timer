import "./TimePicker.css";
import Playlist from "./Playlist";
import { useState } from "react";

function TimePicker(props) {
  const { token } = props;
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [ms, setMs] = useState(0);
  const [generated, setGenerated] = useState(false);

  const hoursArr = [0, 1, 2, 3, 4, 5, 6];
  const minutesArr = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  const hourOptions = hoursArr.map((hour) => {
    return <option key={hour}>{hour}</option>;
  });

  const minuteOptions = minutesArr.map((minute) => {
    return <option key={minute}>{minute}</option>;
  });

  const pickHour = (event) => {
    setHours(parseInt(event.target.value));
  };

  const pickMinute = (event) => {
    setMinutes(parseInt(event.target.value));
  };

  const coverteToMs = () => {
    const totalMinutes = hours * 60 + minutes;
    const totalMs = totalMinutes * 60000;
    setMs(totalMs);
    setGenerated(true);
  };
  console.log(hours);
  console.log(minutes);
  console.log(ms);
  return (
    <section className="timer">
      <section className="timepicker">
        <section className="minutes">
          <p>Minutes</p>
          <select name="minutes" onChange={pickMinute}>
            {minuteOptions}
          </select>
        </section>
        <section className="hours">
          <p>Hours</p>
          <select name="hours" onChange={pickHour}>
            {hourOptions}
          </select>
        </section>
        <section className="gen">
          <button className="generate" onClick={coverteToMs}>
            Set Timer
          </button>
        </section>
      </section>
      <Playlist ms={ms} token={token} generated={generated} />
    </section>
  );
}

export default TimePicker;
