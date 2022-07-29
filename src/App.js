import "./App.css";
import { useEffect, useState } from "react";
import dayjs from 'dayjs'
import { currentYearSolarTermsData, solarTermsDescData } from "./lib/data";

function SolarTermItem(props) {
  const handleClick = () => {
    props.onClick && props.onClick(props.index);
  };
  return (
    <div
      className={[
        "solar-term-item",
        props.selectedIndex === props.index ? "active" : undefined,
      ].join(' ')}
      style={{
        backgroundImage: `url(${require(`./assets/${props.index}.jpg`)})`,
      }}
      onClick={handleClick}
    >
      <div className="name">{props.detail.name}</div>
      <div className="content">
        <div className="date">{props.detail.date}</div>
        <div className="desc">{props.desc}</div>
      </div>
    </div>
  );
}

function App() {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  const getNearSolarTermsIndex = () => {
    const $dayjs = dayjs()
    const currentYear = $dayjs.year()
    let res = 0
    currentYearSolarTermsData.some((item, index) => {
      if ($dayjs.isBefore(dayjs(`${currentYear}年${item.date}`.replace(/[年月]/g, '-').replace('日', '')))) {
        res = index
        return true
      }
    })
    return res
  }

  useEffect(() => {
    const index = getNearSolarTermsIndex()
    setSelectedIndex(index)
  }, [])

  useEffect(() => {
    document.documentElement.scrollTop = (selectedIndex - 3) * 80
  }, [selectedIndex])
  return (
    <div className="App">
      {currentYearSolarTermsData.map((item, index) => (
        <SolarTermItem
          selectedIndex={selectedIndex}
          index={index}
          detail={item}
          desc={solarTermsDescData[index]}
          key={item.name}
          onClick={handleClick}
        />
      ))}
    </div>
  );
}

export default App;
