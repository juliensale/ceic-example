import axios from 'axios';
import type { NextPage } from 'next';
import { useMemo, useReducer, useState } from 'react';
import useSWR from 'swr';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import StatusChip, { Status } from '../components/StatusChip';
import Table from '../components/Table';
import { ColumnOrdering } from '../components/Table/ColumnTitle';

const getReducer = (data: TransformedDataObject[]) => (state: number[], action: { type: 'add' | 'remove' | 'selectAll' | 'removeAll', value?: number }) => {
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

type DataObject = {
  status: Status;
  id: number;
  name: string;
  last_update: string;
  series_id: number;
  timepoints: number;
}
type TransformedDataObject = {
  status: JSX.Element;
  id: number;
  name: string;
  last_update: string;
  series_id: number;
  timepoints: number;
}

const Home: NextPage = () => {
  const { data } = useSWR<DataObject[]>('/api/series', (url: string) => axios.get(url).then((res) => res.data))
  const transformedData: TransformedDataObject[] | undefined = useMemo(
    () => data?.map(item => ({ ...item, status: <StatusChip status={item.status} /> }))
    , [data]
  )

  const [order, setOrder] = useState<ColumnOrdering<TransformedDataObject>>({
    column: 'status',
    order: 'desc',
  })
  const [selected, dispatch] = useReducer(getReducer(transformedData || []), []);

  return (
    <>
      <SearchBar />
      <Filters />
      <Table
        data={transformedData}
        columns={[{ name: "select", width: "3rem" },
        { name: "status", width: '8rem' },
        { name: "name" },
        { name: "last_update" },
        { name: "series_id", label: "Series ID" },
        { name: "timepoints" }
        ]}
        order={order}
        setOrder={setOrder}
        selected={selected}
        dispatch={dispatch}
      />
    </>
  )
}

export default Home
