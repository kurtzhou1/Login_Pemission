import React,{useState,useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import {dataArray} from '../libs//common';
import { Link } from 'react-router-dom';

const MeterTrend:React.FC<any> = (props) => {

  const dataKey = Object.keys(props.data);
  const [dataArray, setDataArray] = useState<dataArray[]>([]);
  const [test,settest] = useState<any[]>([]);

  useEffect(()=>{
    if(dataKey.length !== 0){
      let nine = props.data.parameters['9'].value; //庫內溫度
      let ten = props.data.parameters['10'].value; //蒸發器溫度
      console.log(nine,ten)
      let timestamp = props.data.timestamp;
      let timestampDate = dayjs(timestamp).format('YYYY-MM-DD');
      let timestampMin = dayjs(timestamp).format('HH:mm:ss');
      let tmpArr = {title:`${timestampDate} ${timestampMin}`,Warehouse_Temperature:nine,Evaporator_Temperature:ten};
      settest([...test,nine]) 
      //2021-03-17T07:48:18.656
      if(dataArray.length <= 19){
        setDataArray([...dataArray,tmpArr ]);
      }else{
        dataArray.shift();
        dataArray.push(tmpArr);
        setDataArray(dataArray);
      }
    }
  },[props.data])
  
  return(
      <>
        <ul>
          {/*Link組件中的to會改變網址，但不會刷新頁面*/}
          <li onClick={()=>{props.setIsLogin(false)}}>登出</li>
          <li><Link to="/">設備資料</Link></li>
          <li><Link to="/MeterTrend">溫度計資料</Link></li>
        </ul>
        <ResponsiveContainer width="100%" height="75%">
            <LineChart
                data={dataArray}
                margin={{
                top: 30,
                right: 20,
                left: 20,
                bottom: 50
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" angle={10} tick={{fontSize: 12, fontWeight:'bold'}}/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                type="monotone"
                dataKey="Warehouse_Temperature"
                stroke="#FE6B8B"
                activeDot={{ r: 8 }}
                strokeWidth={2.5}
                />
                <Line type="monotone" dataKey="Evaporator_Temperature" stroke="#FF8E53" strokeWidth={2.5}/>
            </LineChart>
        </ResponsiveContainer>
      </>
  )
}

export default MeterTrend