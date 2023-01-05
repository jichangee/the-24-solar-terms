import "./App.css";
import { useEffect, useState } from "react";
import dayjs from 'dayjs'
import { currentYearSolarTermsData, solarTermsDescData } from "./lib/data";
import Scroll from 'react-scroll'

const Element  = Scroll.Element;
const scroller = Scroll.scroller;

const picList = [
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/0_ruffbt_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/1_j7qt85_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/2_rgikbc_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/3_a8x7sx_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/4_npxswk_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/5_9pny3n_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/6_va6cvx_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/7_wzfd6i_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/8_i26g6w_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/9_ampxpw_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/10_622vu4_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/11_0wermv_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/12_nkn2i7_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/13_7yy06r_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/14_aboq2c_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/15_y06oji_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/16_gjiu8i_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/17_fl9a2b_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/18_0eewc0_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/19_j10fjj_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/20_ce5onw_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/21_ibwygo_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/22_yzpbwj_.jpeg?raw=true',
  'https://cdn.jsdelivr.net/gh/jichangee/gallery@master/the-24-solar-terms/23_skzi8z_.jpeg?raw=true',
]

function SolarTermItem(props) {
  const handleClick = () => {
    props.onClick && props.onClick(props.index);
  };

  return (
    <Element
      name={`solar-term-item-${props.index}`}
      className={[
        "solar-term-item",
        props.selectedIndex === props.index ? "active" : undefined,
      ].join(' ')}
      style={{
        backgroundImage: `url(${picList[props.index]})`,
      }}
      onClick={handleClick}
    >
      <div className="name">{props.detail.name}</div>
      <div className="content">
        <div className="date">{props.detail.date}</div>
        <div className="desc">{props.desc}</div>
      </div>
    </Element>
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
    scroller.scrollTo(`solar-term-item-${selectedIndex}`, {
      duration: 600,
      smooth: true,
      offset: -200
    })
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
