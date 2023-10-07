import type { NextPage } from 'next';
import { useReducer } from 'react';
import Table from '../components/Table';

const reducer = (state: number[], action: { type: 'add' | 'remove' | 'selectAll' | 'removeAll', value?: number }) => {
  if (action.type === 'selectAll') return data.map(item => item.id);
  if (action.type === 'removeAll') return [];

  if (typeof action.value !== 'number') throw new Error("Value is not a number.")

  const set = new Set(state);
  if (action.type === 'add') {
    set.add(action.value)
  }
  if (action.type === 'remove') {
    set.delete(action.value)
  }

  return Array.from(set);
}

const data = [
  {
    id: 1,
    name: "test1",
    status: 2,
  },
  {
    id: 2,
    name: "test2",
    status: 1,
  },
  {
    id: 3,
    name: "test3",
    status: 3,
  }
]

const Home: NextPage = () => {
  const [selected, dispatch] = useReducer(reducer, []);

  return (
    <Table
      data={data}
      columns={["select", "status", "name"]}
      selected={selected}
      dispatch={dispatch}
    />
  )
}

export default Home
