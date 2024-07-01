import "./TimePicker.css";
import { useState } from "react";

function TimePicker() {
  const [hours, setHours] = useState(0);

  const hoursArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const minutesArr = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  const hourOptions = hoursArr.map((hour) => {
    return <option>{hour}</option>;
  });

  const pickHour = (hour) => {
    setHours(hour);
    console.log(hours);
  };

  return (
    <section>
      <select name="" id="">
        {hourOptions}
      </select>
    </section>
  );
}

export default TimePicker;
