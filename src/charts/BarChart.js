import React, {useState , useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import {connect} from 'react-redux';

const BarChart = (props) => {

  const objData = {
    labels: ['ToDo List', 'In progress', 'Done'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: ['#FFAFAD', '#FFEA70', '#9DFF70'],
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: ['#fc0606', '#FFF70A', '#1BA611'],
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [props.toDoListTotal, props.inProgressTotal, props.finishedTotal]
      }
    ]
  };
  const [data, setData] = useState(objData);

  useEffect(() => {
    objData.datasets[0].data = [props.toDoListTotal, props.inProgressTotal, props.finishedTotal];
    setData(objData)
  }, [props]);

  return (
    <div>
      <Bar
        data={data}
        width={70}
        height={50}
        options={{}}
      />
    </div>

  )
}

const mapStateToProps = (state) => ({
  toDoListTotal: state.tasks.filter((task) => task.taskState === 1).length,
  inProgressTotal: state.tasks.filter((task) => task.taskState === 2).length,
  finishedTotal: state.tasks.filter((task) => task.taskState === 3).length,
})

export default connect(mapStateToProps)(BarChart);