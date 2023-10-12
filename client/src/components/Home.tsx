import { useState } from "react"
import { Search } from "./Search"
import { List } from "./List"

export const Home = ({ props }: { props: string }) => {
  const token = props
  const [data, setData] = useState<Object[]>([])

  const dataFromChild = (emittedData: Object) => {
    if (data) {
      setData((oldArr) => [...oldArr, emittedData])
    } else {
      setData([emittedData])
    }
  }

  return (
    <>
      <h1>Welcome!</h1>
      <Search props={token} dataFromChild={dataFromChild} />
      <List props={data} />
    </>
  )
}
