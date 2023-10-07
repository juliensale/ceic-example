import type { NextPage } from 'next'
import Table from '../components/Table'

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
  return (
    <Table
      data={data}
      columns={["select", "status", "name"]}
    />
  )
}

export default Home
