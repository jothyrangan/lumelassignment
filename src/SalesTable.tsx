import React, { useState } from 'react';
import './styles.css';

const SalesTable = () => {
  const [data, setData] = useState([
    { label: 'Electronics', value: 1500, allocation: 0, variance: 0 },
    { label: '-- Phones', value: 800, allocation: 0, variance: 0 },
    { label: '-- Laptops', value: 700, allocation: 0, variance: 0 },
    { label: 'Furniture', value: 1000, allocation: 0, variance: 0 },
    { label: '-- Tables', value: 300, allocation: 0, variance: 0 },
    { label: '-- Chairs', value: 700, allocation: 0, variance: 0 },
  ]);
  
  const [inputField, setInputField] = useState(0);
  
  const updateAllocationPercentage = (index: any, percentage: any) => {
    const newData = [...data];
    const updatedValue = newData[index].value * (1 + percentage / 100);
    newData[index].value = updatedValue;

    const electronicsTotal = newData[1].value + newData[2].value;
    newData[0].value = electronicsTotal;
    
    const furnitureTotal = newData[4].value + newData[5].value;
    newData[3].value = furnitureTotal;

    if (index === 0) {
      const oldValue = newData[index].value;
      const check = oldValue;
      const old1 = newData[1].value
      const old2 = newData[2].value
      const phoneContribution = (newData[1].value/ check) * 100
      const lapContribution = (newData[2].value/check) * 100
      newData[0].value = newData[0].value * (1 + percentage / 100);
      newData[1].value = ( newData[0].value * phoneContribution ) / 100; 
      newData[2].value = ( newData[0].value * lapContribution ) / 100;  
      newData[1].variance = ((newData[1].value - old1) / old1) * 100;
      newData[2].variance = ((newData[2].value - old2) / old2) * 100;
    }
    if (index === 3) {
      const oldValue = newData[index].value;
      const check = oldValue;
      const old1 = newData[4].value
      const old2 = newData[5].value
      const tableContribution = (newData[4].value/ check) * 100
      const chairContribution = (newData[5].value/check) * 100
      newData[3].value = newData[3].value * (1 + percentage / 100);
      newData[4].value = ( newData[3].value * tableContribution ) / 100; 
      newData[5].value = ( newData[3].value * chairContribution ) / 100;  
      newData[4].variance = ((newData[4].value - old1) / old1) * 100;
      newData[5].variance = ((newData[5].value - old2) / old2) * 100;
        }
    
    newData[0].variance = ((newData[0].value - 1500) / 1500) * 100;
    newData[3].variance = ((newData[3].value - 1000) / 1000) * 100;
    newData[index].variance = ((updatedValue - (newData[index].value / (1 + percentage / 100))) / (newData[index].value / (1 + percentage / 100))) * 100;

    setData(newData);
  };
  
  const GrandTotal = () => {
    return data[0].value + data[3].value;
  };

  const updateAllocationValue = (index: any, newValue: any) => {
    const newData = [...data];
    const oldValue = newData[index].value;
    const check = oldValue;
    console.log(check)
    newData[index].value = newValue;
    newData[index].variance = ((newValue - oldValue) / oldValue) * 100;
    console.log(check)

    if (index === 0) {
      console.log("0", newData[0].value ,"1", newData[1].value)
      const old1 = newData[1].value
      const old2 = newData[2].value
      const phoneContribution = (newData[1].value/ check) * 100
      const lapContribution = (newData[2].value/check) * 100
      newData[1].value = ( newData[0].value * phoneContribution ) / 100; 
      newData[2].value = ( newData[0].value * lapContribution ) / 100;  
      newData[1].variance = ((newData[1].value - old1) / old1) * 100;
      newData[2].variance = ((newData[2].value - old2) / old2) * 100;
    }  
    
    if (index === 3) {
      console.log("0", newData[3].value ,"1", newData[4].value)
      const tableContribution = (newData[4].value/ check) * 100
      const chairContribution = (newData[5].value/check) * 100
      const old1 = newData[4].value
      const old2 = newData[5].value
      newData[4].value = ( newData[3].value * tableContribution ) / 100; 
      newData[5].value = ( newData[3].value * chairContribution ) / 100;  
      newData[4].variance = ((newData[4].value - old1) / old1) * 100;
      newData[5].variance = ((newData[5].value - old2) / old2) * 100;
    }
    
    setData(newData);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Variance %</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.label}</td>
              <td>{item.value.toFixed(2)}</td>
              {<td>
                <input 
                  type="number" 
                  onChange={(e) => setInputField(Number(e.target.value))} 
                />
                <button onClick={() => updateAllocationPercentage(index, inputField)}>Allocation %</button>
                <button onClick={() => updateAllocationValue(index, inputField)}>Allocation Val</button>
              </td>}
              <td>{item.variance.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Grand Total: {GrandTotal().toFixed(2)}</h2>
    </div>
  );
};

export default SalesTable;
