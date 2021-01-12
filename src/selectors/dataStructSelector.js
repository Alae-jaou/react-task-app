import getVisibleData from './selectors';

const initState = (itemsFromBackend, { text, sorrtBy, startDate, endDate }, columnsFromBackend = {
  "0": {
    name: "Requested",
    items: []
  },
  "1": {
    name: "To do",
    items: []
  },
  "2": {
    name: "In Progress",
    items: []
  },
  "3": {
    name: "Done",
    items: []
  }
}) => {
  const filtredData = getVisibleData(itemsFromBackend, { text, sorrtBy, startDate, endDate })
  filtredData.forEach((item) => {
    columnsFromBackend[item.taskState.toString()].items.push(item)
  })
  return columnsFromBackend
}

export default initState;
