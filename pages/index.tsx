import type { NextPage } from 'next';
import { useReducer } from 'react';
import Table from '../components/Table';
import data from '../series.json';

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

const Home: NextPage = () => {
  const [selected, dispatch] = useReducer(reducer, []);

  return (
    <Table
      data={data || []}
      columns={[{ name: "select" },
      { name: "status" },
      { name: "name" },
      { name: "last_update" },
      { name: "series_id", label: "Series ID" },
      { name: "timepoints" }
      ]}
      selected={selected}
      dispatch={dispatch}
    />
  )
}

export default Home
